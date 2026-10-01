import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  deterministicSquidexContentId,
  formatSquidexIfMatchVersion,
  type SquidexObservedContent,
} from "../../src/lib/content/squidex-import-concurrency";
import {
  assertSquidexDestination,
  computeSquidexDestinationHash,
} from "../../src/lib/content/squidex-import-destination";
import {
  createSquidexOperationJournalV2,
  getSquidexJournalBlockers,
  markSquidexOperationAmbiguous,
  markSquidexOperationConfirmed,
  markSquidexOperationInFlight,
} from "../../src/lib/content/squidex-import-operation-state";
import { assessSquidexOperationalReadiness } from "../../src/lib/content/squidex-import-operational-readiness";
import { computeSquidexPayloadHash } from "../../src/lib/content/squidex-import-reconciliation";
import {
  buildGuardedSquidexRollbackActions,
  createSquidexRollbackJournal,
  recordSquidexMutation,
} from "../../src/lib/content/squidex-import-rollback";
import {
  executeProtectedSquidexWrite,
  type SquidexProtectedMutationGateway,
} from "../../src/lib/content/squidex-protected-mutation";
import type { SquidexImportSchema } from "../../src/lib/content/squidex-import-readiness";

class MemoryGateway implements SquidexProtectedMutationGateway {
  readonly items = new Map<string, SquidexObservedContent>();
  failAfterWrite = false;

  async read(_schema: SquidexImportSchema, id: string): Promise<SquidexObservedContent | null> {
    return this.items.get(id) ?? null;
  }

  async create(schema: SquidexImportSchema, id: string, key: string, payload: unknown): Promise<SquidexObservedContent> {
    if (this.items.has(id)) throw new Error("409 conflict");
    const result = { schema, key, id, version: "1", payloadHash: computeSquidexPayloadHash(payload) };
    this.items.set(id, result);
    if (this.failAfterWrite) {
      this.failAfterWrite = false;
      throw new Error("transport timeout after accepted write");
    }
    return result;
  }

  async update(
    schema: SquidexImportSchema,
    id: string,
    key: string,
    payload: unknown,
    ifMatchVersion: string,
  ): Promise<SquidexObservedContent> {
    assert.equal(formatSquidexIfMatchVersion(ifMatchVersion), `"${ifMatchVersion}"`);
    const current = this.items.get(id);
    if (!current || current.version !== ifMatchVersion) throw new Error("412 precondition failed");
    const result = {
      schema,
      key,
      id,
      version: String(Number(current.version) + 1),
      payloadHash: computeSquidexPayloadHash(payload),
    };
    this.items.set(id, result);
    if (this.failAfterWrite) {
      this.failAfterWrite = false;
      throw new Error("transport timeout after accepted write");
    }
    return result;
  }
}

async function main(): Promise<void> {
  const themeId = deterministicSquidexContentId("guide-theme", "tema-x");
  assert.equal(themeId, deterministicSquidexContentId("guide-theme", "tema-x"));
  assert.notEqual(themeId, deterministicSquidexContentId("guide", "tema-x"));

  const destination = {
    apiBaseUrl: "https://cloud.squidex.io/",
    appName: "guias-dados-gov-pt-piloto",
    schemaIds: {
      "guide-theme": "50338650-f626-4892-b698-7ac37963aa4d",
      guide: "9661a079-d714-4847-88a8-2a65adc3e811",
      "guide-task": "6a2ce5f7-89a4-4796-91d5-1470ab448905",
    },
  } as const;
  const destinationHash = computeSquidexDestinationHash(destination);
  assert.match(destinationHash, /^[a-f0-9]{64}$/);
  assert.equal(assertSquidexDestination(destination, destinationHash), destinationHash);
  assert.throws(() => assertSquidexDestination(destination, "0".repeat(64)), /Destino Squidex divergente/);

  const gateway = new MemoryGateway();
  const payload = { key: "tema-x", title: { "pt-PT": "Tema X" } };
  const first = await executeProtectedSquidexWrite(
    { operationId: "create-theme:tema-x", schema: "guide-theme", key: "tema-x", payload },
    gateway,
  );
  assert.equal(first.status, "written");
  assert.equal(first.version, "1");

  const repeated = await executeProtectedSquidexWrite(
    { operationId: "create-theme:tema-x", schema: "guide-theme", key: "tema-x", payload },
    gateway,
  );
  assert.equal(repeated.status, "already-applied");

  gateway.failAfterWrite = true;
  const ambiguousPayload = { key: "tema-y", title: { "pt-PT": "Tema Y" } };
  const reconciled = await executeProtectedSquidexWrite(
    { operationId: "create-theme:tema-y", schema: "guide-theme", key: "tema-y", payload: ambiguousPayload },
    gateway,
  );
  assert.equal(reconciled.status, "reconciled-after-error");

  const current = await gateway.read("guide-theme", themeId);
  assert.ok(current);
  gateway.items.set(themeId, { ...current, version: "2" });
  await assert.rejects(
    () => executeProtectedSquidexWrite(
      {
        operationId: "update-theme:tema-x",
        schema: "guide-theme",
        key: "tema-x",
        payload: { key: "tema-x", title: { "pt-PT": "Novo" } },
        current,
      },
      gateway,
    ),
    /versão concorrente/,
  );

  const expected = {
    operationId: "create-theme:tema-z",
    schema: "guide-theme" as const,
    key: "tema-z",
    id: deterministicSquidexContentId("guide-theme", "tema-z"),
    payloadHash: computeSquidexPayloadHash({ key: "tema-z" }),
  };
  let journal = createSquidexOperationJournalV2("p".repeat(64), destinationHash, [expected.operationId]);
  journal = markSquidexOperationInFlight(journal, expected.operationId, expected);
  journal = markSquidexOperationAmbiguous(journal, expected.operationId, "timeout");
  assert.deepEqual(getSquidexJournalBlockers(journal), ["create-theme:tema-z:ambiguous"]);
  journal = markSquidexOperationConfirmed(journal, expected.operationId, "3");
  assert.deepEqual(getSquidexJournalBlockers(journal), []);

  let rollback = createSquidexRollbackJournal("p".repeat(64));
  rollback = recordSquidexMutation(rollback, {
    kind: "created",
    operationId: "create-theme:tema-x",
    schema: "guide-theme",
    key: "tema-x",
    id: themeId,
    writtenVersion: "2",
  });
  const actions = buildGuardedSquidexRollbackActions(rollback, "p".repeat(64), [
    { schema: "guide-theme", id: themeId, version: "2" },
  ]);
  assert.equal(actions[0].ifMatchVersion, "2");
  assert.throws(
    () => buildGuardedSquidexRollbackActions(rollback, "p".repeat(64), [
      { schema: "guide-theme", id: themeId, version: "3" },
    ]),
    /versão remota divergiu/,
  );

  const liveFixture = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "tests", "fixtures", "squidex-live-capability-d99.json"), "utf8"),
  );
  assert.equal(liveFixture.readOnlyProbe, true);
  assert.equal(liveFixture.version, "10");
  assert.equal(liveFixture.updateMethod, "PATCH");
  assert.equal(liveFixture.liveWriteRehearsal.stalePatchStatus, 412);
  assert.equal(liveFixture.liveWriteRehearsal.finalEqual, true);
  assert.equal(liveFixture.liveWriteRehearsal.finalStatus, "Draft");

  const readiness = assessSquidexOperationalReadiness({
    deterministicCreateIds: true,
    optimisticConcurrency: true,
    ambiguousWriteReconciliation: true,
    guardedRollback: true,
    destinationBinding: true,
    liveVersionMetadata: true,
    liveWriteRehearsal: true,
  });
  assert.equal(readiness.status, "TECHNICALLY_READY_NOT_AUTHORIZED");
  assert.equal(readiness.applyAuthorized, false);
  assert.equal(readiness.blockers.length, 0);

  console.log(
    `Squidex concurrency safety: OK; destinationHash=${destinationHash}; liveRehearsal=passed`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

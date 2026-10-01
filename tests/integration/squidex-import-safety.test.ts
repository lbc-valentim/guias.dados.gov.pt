import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { compareGuidesContent } from "../../src/lib/content/content-equivalence";
import {
  computeSquidexImportPlanHash,
  executeSquidexImportPlan,
  SQUIDEX_APPLY_CONFIRMATION,
  type SquidexImportMutationGateway,
} from "../../src/lib/content/squidex-import-executor";
import {
  appendCompletedOperation,
  buildSquidexImportOperationManifest,
  createEmptySquidexImportJournal,
  getPendingSquidexImportOperations,
} from "../../src/lib/content/squidex-import-journal";
import { buildSquidexImportPlan } from "../../src/lib/content/squidex-import-plan";
import {
  assessSquidexImportInventory,
  type SquidexInventoryItem,
} from "../../src/lib/content/squidex-import-readiness";
import {
  buildSquidexRollbackActions,
  createSquidexRollbackJournal,
  recordSquidexMutation,
} from "../../src/lib/content/squidex-import-rollback";
import { materializeSquidexImportPlan } from "../../src/lib/content/squidex-import-roundtrip";
import { mapProvisionalSquidexPayload } from "../../src/lib/content/squidex-mapper";
import { loadContent } from "../../src/lib/content/repository";

class FakeGateway implements SquidexImportMutationGateway {
  readonly calls: string[] = [];

  async createTheme(item: { key: string }): Promise<string> {
    this.calls.push(`create-theme:${item.key}`);
    return `id:${item.key}`;
  }

  async createTask(item: { key: string }): Promise<string> {
    this.calls.push(`create-task:${item.key}`);
    return `id:${item.key}`;
  }

  async createGuide(
    item: { key: string },
    refs: { themeId: string; taskIds: string[] },
  ): Promise<string> {
    assert.match(refs.themeId, /^id:/);
    assert.ok(refs.taskIds.every((id) => id.startsWith("id:")));
    this.calls.push(`create-guide:${item.key}`);
    return `id:${item.key}`;
  }

  async patchGuideRelations(
    item: { guideKey: string },
    relatedGuideIds: string[],
  ): Promise<void> {
    assert.ok(relatedGuideIds.every((id) => id.startsWith("id:")));
    this.calls.push(`patch-guide-relations:${item.guideKey}`);
  }

  async patchTaskNextRef(
    item: { taskKey: string },
    targetId: string,
  ): Promise<void> {
    assert.match(targetId, /^id:/);
    this.calls.push(`patch-task-next:${item.taskKey}`);
  }
}

async function main(): Promise<void> {
  const source = loadContent();
  const plan = buildSquidexImportPlan(source);
  const fixturePath = path.join(
    process.cwd(),
    "tests",
    "fixtures",
    "squidex-inventory-pilot.json",
  );
  const inventory = JSON.parse(
    fs.readFileSync(fixturePath, "utf8"),
  ) as SquidexInventoryItem[];

  const assessment = assessSquidexImportInventory(plan, inventory);
  assert.equal(assessment.knownPilotItems.length, 4);
  assert.equal(assessment.existingTargets.length, 0);
  assert.deepEqual(assessment.blockers, []);

  const hash = computeSquidexImportPlanHash(plan);
  assert.match(hash, /^[a-f0-9]{64}$/);

  const dryGateway = new FakeGateway();
  const dryRun = await executeSquidexImportPlan(plan, inventory, dryGateway);
  assert.equal(dryRun.mode, "dry-run");
  assert.equal(dryRun.writes, 0);
  assert.equal(dryGateway.calls.length, 0);
  assert.deepEqual(dryRun.blockers, []);

  await assert.rejects(
    () =>
      executeSquidexImportPlan(plan, inventory, new FakeGateway(), {
        mode: "apply",
        expectedPlanHash: hash,
      }),
    /confirmação explícita/,
  );

  await assert.rejects(
    () =>
      executeSquidexImportPlan(plan, inventory, new FakeGateway(), {
        mode: "apply",
        confirmation: SQUIDEX_APPLY_CONFIRMATION,
        expectedPlanHash: "0".repeat(64),
      }),
    /hash do plano/,
  );

  const applyGateway = new FakeGateway();
  const applied = await executeSquidexImportPlan(plan, inventory, applyGateway, {
    mode: "apply",
    confirmation: SQUIDEX_APPLY_CONFIRMATION,
    expectedPlanHash: hash,
  });
  assert.equal(applied.writes, 227);
  assert.equal(applyGateway.calls.length, 227);
  assert.equal(Object.keys(applied.createdIds).length, 118);

  const manifest = buildSquidexImportOperationManifest(plan);
  assert.equal(manifest.length, 227);
  assert.equal(new Set(manifest.map((item) => item.operationId)).size, 227);

  let journal = createEmptySquidexImportJournal(plan);
  assert.equal(getPendingSquidexImportOperations(plan, journal).length, 227);
  for (const item of manifest.slice(0, 10)) {
    journal = appendCompletedOperation(journal, item.operationId);
  }
  assert.equal(getPendingSquidexImportOperations(plan, journal).length, 217);

  let rollback = createSquidexRollbackJournal(hash);
  rollback = recordSquidexMutation(rollback, {
    kind: "created",
    operationId: manifest[0].operationId,
    schema: "guide-theme",
    key: "example-created",
    id: "created-id",
  });
  rollback = recordSquidexMutation(rollback, {
    kind: "updated",
    operationId: manifest[1].operationId,
    schema: "guide-task",
    key: "example-updated",
    id: "updated-id",
    before: { title: { "pt-PT": "antes" } },
  });
  const rollbackActions = buildSquidexRollbackActions(rollback, hash);
  assert.equal(rollbackActions[0].action, "restore-updated");
  assert.equal(rollbackActions[1].action, "delete-created");

  const roundTrip = mapProvisionalSquidexPayload(
    materializeSquidexImportPlan(plan),
  );
  const equivalent = compareGuidesContent(source, roundTrip);
  assert.equal(equivalent.equivalent, true, equivalent.differences.join("\n"));

  const changed = structuredClone(roundTrip);
  changed.guides[0].title = `${changed.guides[0].title} ALTERADO`;
  const difference = compareGuidesContent(source, changed);
  assert.equal(difference.equivalent, false);
  assert.ok(
    difference.differences.some((item) => item.includes("$.guides[0].title")),
  );

  console.log(
    `Squidex import safety: OK; planHash=${hash}; operations=227; roundTrip=equivalent`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

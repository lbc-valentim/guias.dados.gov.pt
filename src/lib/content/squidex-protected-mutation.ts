import {
  buildSquidexMutationPrecondition,
  type SquidexObservedContent,
} from "./squidex-import-concurrency";
import {
  computeSquidexPayloadHash,
  reconcileSquidexMutation,
} from "./squidex-import-reconciliation";
import type { SquidexImportSchema } from "./squidex-import-readiness";

export interface SquidexProtectedMutationGateway {
  read(schema: SquidexImportSchema, id: string): Promise<SquidexObservedContent | null>;
  create(
    schema: SquidexImportSchema,
    id: string,
    key: string,
    payload: unknown,
  ): Promise<SquidexObservedContent>;
  update(
    schema: SquidexImportSchema,
    id: string,
    key: string,
    payload: unknown,
    ifMatchVersion: string,
  ): Promise<SquidexObservedContent>;
}

export interface SquidexProtectedWriteInput {
  operationId: string;
  schema: SquidexImportSchema;
  key: string;
  payload: unknown;
  current?: SquidexObservedContent;
}

export interface SquidexProtectedWriteResult {
  status: "written" | "already-applied" | "reconciled-after-error";
  id: string;
  version: string;
  payloadHash: string;
}

export async function executeProtectedSquidexWrite(
  input: SquidexProtectedWriteInput,
  gateway: SquidexProtectedMutationGateway,
): Promise<SquidexProtectedWriteResult> {
  const precondition = buildSquidexMutationPrecondition(input.schema, input.key, input.current);
  const payloadHash = computeSquidexPayloadHash(input.payload);
  const expected = {
    operationId: input.operationId,
    schema: input.schema,
    key: input.key,
    id: precondition.id,
    payloadHash,
  };

  const before = await gateway.read(input.schema, precondition.id);
  if (before) {
    const reconciliation = reconcileSquidexMutation(expected, {
      exists: true,
      ...before,
    });
    if (reconciliation.status === "applied") {
      return {
        status: "already-applied",
        id: precondition.id,
        version: reconciliation.version,
        payloadHash,
      };
    }
    if (precondition.kind === "create-if-absent") {
      throw new Error(`Create bloqueado: ID determinístico já ocupado para ${input.operationId}`);
    }
    if (before.version !== precondition.version) {
      throw new Error(`Update bloqueado por versão concorrente em ${input.operationId}`);
    }
  } else if (precondition.kind === "update-if-version") {
    throw new Error(`Update bloqueado: conteúdo remoto ausente em ${input.operationId}`);
  }

  try {
    const result = precondition.kind === "create-if-absent"
      ? await gateway.create(input.schema, precondition.id, input.key, input.payload)
      : await gateway.update(
          input.schema,
          precondition.id,
          input.key,
          input.payload,
          precondition.version,
        );
    return assertApplied(expected, result, "written");
  } catch (error) {
    const after = await gateway.read(input.schema, precondition.id);
    if (after) {
      const reconciled = reconcileSquidexMutation(expected, { exists: true, ...after });
      if (reconciled.status === "applied") {
        return {
          status: "reconciled-after-error",
          id: precondition.id,
          version: reconciled.version,
          payloadHash,
        };
      }
    }
    throw error;
  }
}

function assertApplied(
  expected: { operationId: string; schema: SquidexImportSchema; key: string; id: string; payloadHash: string },
  result: SquidexObservedContent,
  status: SquidexProtectedWriteResult["status"],
): SquidexProtectedWriteResult {
  const reconciled = reconcileSquidexMutation(expected, { exists: true, ...result });
  if (reconciled.status !== "applied") {
    throw new Error(`Resposta Squidex não confirma ${expected.operationId}: ${reconciled.status}`);
  }
  return { status, id: expected.id, version: reconciled.version, payloadHash: expected.payloadHash };
}

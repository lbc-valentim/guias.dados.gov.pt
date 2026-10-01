import { createHash } from "node:crypto";
import type { SquidexImportSchema } from "./squidex-import-readiness";

export interface SquidexExpectedMutationState {
  operationId: string;
  schema: SquidexImportSchema;
  key: string;
  id: string;
  payloadHash: string;
}

export interface SquidexObservedMutationState {
  exists: boolean;
  schema?: SquidexImportSchema;
  key?: string;
  id?: string;
  version?: string;
  payloadHash?: string;
}

export type SquidexReconciliationResult =
  | { status: "applied"; version: string }
  | { status: "not-applied" }
  | { status: "conflict"; reason: string }
  | { status: "indeterminate"; reason: string };

export function computeSquidexPayloadHash(payload: unknown): string {
  return createHash("sha256").update(stableStringify(payload)).digest("hex");
}

export function reconcileSquidexMutation(
  expected: SquidexExpectedMutationState,
  observed: SquidexObservedMutationState,
): SquidexReconciliationResult {
  if (!observed.exists) return { status: "not-applied" };
  if (observed.id !== expected.id || observed.schema !== expected.schema || observed.key !== expected.key) {
    return { status: "conflict", reason: "Identidade remota divergente" };
  }
  if (!observed.payloadHash) {
    return { status: "indeterminate", reason: "Hash do payload remoto indisponível" };
  }
  if (observed.payloadHash !== expected.payloadHash) {
    return { status: "conflict", reason: "Payload remoto divergente do payload esperado" };
  }
  if (!observed.version) {
    return { status: "indeterminate", reason: "Versão remota indisponível" };
  }
  return { status: "applied", version: observed.version };
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, nested]) => `${JSON.stringify(key)}:${stableStringify(nested)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

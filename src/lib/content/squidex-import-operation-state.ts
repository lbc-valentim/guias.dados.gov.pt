import type { SquidexExpectedMutationState } from "./squidex-import-reconciliation";

export type SquidexOperationStatus = "pending" | "in-flight" | "confirmed" | "ambiguous";

export interface SquidexOperationState {
  operationId: string;
  status: SquidexOperationStatus;
  expected?: SquidexExpectedMutationState;
  confirmedVersion?: string;
  error?: string;
}

export interface SquidexOperationJournalV2 {
  planHash: string;
  destinationHash: string;
  operations: SquidexOperationState[];
}

export function createSquidexOperationJournalV2(
  planHash: string,
  destinationHash: string,
  operationIds: readonly string[],
): SquidexOperationJournalV2 {
  if (!planHash || !destinationHash) throw new Error("Journal v2 exige hashes de plano e destino");
  if (new Set(operationIds).size !== operationIds.length) throw new Error("operationId duplicado no journal v2");
  return {
    planHash,
    destinationHash,
    operations: operationIds.map((operationId) => ({ operationId, status: "pending" })),
  };
}

export function markSquidexOperationInFlight(
  journal: SquidexOperationJournalV2,
  operationId: string,
  expected: SquidexExpectedMutationState,
): SquidexOperationJournalV2 {
  return update(journal, operationId, (current) => {
    if (current.status !== "pending") throw new Error(`Operação ${operationId} não está pending`);
    return { operationId, status: "in-flight", expected };
  });
}

export function markSquidexOperationConfirmed(
  journal: SquidexOperationJournalV2,
  operationId: string,
  version: string,
): SquidexOperationJournalV2 {
  if (!version) throw new Error("Confirmação exige versão remota");
  return update(journal, operationId, (current) => {
    if (current.status !== "in-flight" && current.status !== "ambiguous") {
      throw new Error(`Operação ${operationId} não pode ser confirmada a partir de ${current.status}`);
    }
    return { ...current, status: "confirmed", confirmedVersion: version, error: undefined };
  });
}

export function markSquidexOperationAmbiguous(
  journal: SquidexOperationJournalV2,
  operationId: string,
  error: string,
): SquidexOperationJournalV2 {
  return update(journal, operationId, (current) => {
    if (current.status !== "in-flight") throw new Error(`Operação ${operationId} não está in-flight`);
    return { ...current, status: "ambiguous", error };
  });
}

export function getSquidexJournalBlockers(journal: SquidexOperationJournalV2): string[] {
  return journal.operations
    .filter((item) => item.status === "in-flight" || item.status === "ambiguous")
    .map((item) => `${item.operationId}:${item.status}`);
}

function update(
  journal: SquidexOperationJournalV2,
  operationId: string,
  mutate: (current: SquidexOperationState) => SquidexOperationState,
): SquidexOperationJournalV2 {
  let found = false;
  const operations = journal.operations.map((item) => {
    if (item.operationId !== operationId) return item;
    found = true;
    return mutate(item);
  });
  if (!found) throw new Error(`operationId desconhecido: ${operationId}`);
  return { ...journal, operations };
}

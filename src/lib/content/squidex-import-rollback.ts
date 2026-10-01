import type { SquidexImportSchema } from "./squidex-import-readiness";

export type SquidexImportMutationRecord =
  | {
      kind: "created";
      operationId: string;
      schema: SquidexImportSchema;
      key: string;
      id: string;
      writtenVersion?: string;
    }
  | {
      kind: "updated";
      operationId: string;
      schema: SquidexImportSchema;
      key: string;
      id: string;
      before: unknown;
      beforeVersion?: string;
      writtenVersion?: string;
    };

export interface SquidexRollbackJournal {
  planHash: string;
  mutations: SquidexImportMutationRecord[];
}

export type SquidexRollbackAction =
  | {
      action: "delete-created";
      operationId: string;
      schema: SquidexImportSchema;
      key: string;
      id: string;
      ifMatchVersion?: string;
    }
  | {
      action: "restore-updated";
      operationId: string;
      schema: SquidexImportSchema;
      key: string;
      id: string;
      data: unknown;
      ifMatchVersion?: string;
    };

export interface SquidexRollbackObservedVersion {
  schema: SquidexImportSchema;
  id: string;
  version: string;
}

export function createSquidexRollbackJournal(planHash: string): SquidexRollbackJournal {
  if (!planHash) throw new Error("Rollback journal exige planHash");
  return { planHash, mutations: [] };
}

export function recordSquidexMutation(
  journal: SquidexRollbackJournal,
  mutation: SquidexImportMutationRecord,
): SquidexRollbackJournal {
  if (journal.mutations.some((item) => item.operationId === mutation.operationId)) {
    throw new Error(`Mutação já registada: ${mutation.operationId}`);
  }
  return { planHash: journal.planHash, mutations: [...journal.mutations, mutation] };
}

export function buildSquidexRollbackActions(
  journal: SquidexRollbackJournal,
  expectedPlanHash: string,
): SquidexRollbackAction[] {
  assertPlanHash(journal, expectedPlanHash);
  return [...journal.mutations].reverse().map(toAction);
}

export function buildGuardedSquidexRollbackActions(
  journal: SquidexRollbackJournal,
  expectedPlanHash: string,
  observed: readonly SquidexRollbackObservedVersion[],
): SquidexRollbackAction[] {
  assertPlanHash(journal, expectedPlanHash);
  const versions = new Map(observed.map((item) => [`${item.schema}:${item.id}`, item.version]));

  return [...journal.mutations].reverse().map((mutation) => {
    if (!mutation.writtenVersion) {
      throw new Error(`Rollback bloqueado: writtenVersion ausente em ${mutation.operationId}`);
    }
    const current = versions.get(`${mutation.schema}:${mutation.id}`);
    if (!current) {
      throw new Error(`Rollback bloqueado: estado remoto ausente em ${mutation.operationId}`);
    }
    if (current !== mutation.writtenVersion) {
      throw new Error(`Rollback bloqueado: versão remota divergiu em ${mutation.operationId}`);
    }
    return { ...toAction(mutation), ifMatchVersion: current };
  });
}

function assertPlanHash(journal: SquidexRollbackJournal, expectedPlanHash: string): void {
  if (journal.planHash !== expectedPlanHash) {
    throw new Error("Rollback journal incompatível com o plano seleccionado");
  }
}

function toAction(mutation: SquidexImportMutationRecord): SquidexRollbackAction {
  if (mutation.kind === "created") {
    return {
      action: "delete-created",
      operationId: mutation.operationId,
      schema: mutation.schema,
      key: mutation.key,
      id: mutation.id,
    };
  }
  return {
    action: "restore-updated",
    operationId: mutation.operationId,
    schema: mutation.schema,
    key: mutation.key,
    id: mutation.id,
    data: mutation.before,
  };
}

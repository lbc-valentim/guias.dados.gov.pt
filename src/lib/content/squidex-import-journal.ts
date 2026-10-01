import { computeSquidexImportPlanHash } from "./squidex-import-executor";
import type { SquidexImportPlan } from "./squidex-import-plan";

export type SquidexImportOperationPhase =
  | "create-theme"
  | "create-task"
  | "create-guide"
  | "patch-guide-relations"
  | "patch-task-next";

export interface SquidexImportOperation {
  operationId: string;
  phase: SquidexImportOperationPhase;
  key: string;
}

export interface SquidexImportJournal {
  planHash: string;
  completedOperationIds: string[];
}

export function buildSquidexImportOperationManifest(
  plan: SquidexImportPlan,
): SquidexImportOperation[] {
  return [
    ...plan.phases.createThemes.map((item) => operation("create-theme", item.key)),
    ...plan.phases.createTasks.map((item) => operation("create-task", item.key)),
    ...plan.phases.createGuides.map((item) => operation("create-guide", item.key)),
    ...plan.phases.patchGuideRelations.map((item) =>
      operation("patch-guide-relations", item.guideKey),
    ),
    ...plan.phases.patchTaskNextRefs.map((item) =>
      operation("patch-task-next", item.taskKey),
    ),
  ];
}

export function createEmptySquidexImportJournal(
  plan: SquidexImportPlan,
): SquidexImportJournal {
  return {
    planHash: computeSquidexImportPlanHash(plan),
    completedOperationIds: [],
  };
}

export function getPendingSquidexImportOperations(
  plan: SquidexImportPlan,
  journal: SquidexImportJournal,
): SquidexImportOperation[] {
  const expectedHash = computeSquidexImportPlanHash(plan);
  if (journal.planHash !== expectedHash) {
    throw new Error("Journal incompatível com o hash do plano actual");
  }

  const manifest = buildSquidexImportOperationManifest(plan);
  const validIds = new Set(manifest.map((item) => item.operationId));
  const completed = new Set<string>();

  for (const id of journal.completedOperationIds) {
    if (!validIds.has(id)) {
      throw new Error(`Journal contém operationId desconhecido: ${id}`);
    }
    if (completed.has(id)) {
      throw new Error(`Journal contém operationId duplicado: ${id}`);
    }
    completed.add(id);
  }

  return manifest.filter((item) => !completed.has(item.operationId));
}

export function appendCompletedOperation(
  journal: SquidexImportJournal,
  operationId: string,
): SquidexImportJournal {
  if (journal.completedOperationIds.includes(operationId)) {
    throw new Error(`Operação já registada como concluída: ${operationId}`);
  }
  return {
    planHash: journal.planHash,
    completedOperationIds: [...journal.completedOperationIds, operationId],
  };
}

function operation(
  phase: SquidexImportOperationPhase,
  key: string,
): SquidexImportOperation {
  return {
    operationId: `${phase}:${key}`,
    phase,
    key,
  };
}

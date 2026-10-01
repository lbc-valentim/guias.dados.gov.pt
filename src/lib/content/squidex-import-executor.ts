import { createHash } from "node:crypto";
import type {
  SquidexGuideCreatePlan,
  SquidexGuideRelationsPatchPlan,
  SquidexImportPlan,
  SquidexTaskCreatePlan,
  SquidexTaskNextPatchPlan,
  SquidexThemeCreatePlan,
} from "./squidex-import-plan";
import {
  assessSquidexImportInventory,
  type SquidexInventoryItem,
} from "./squidex-import-readiness";

export const SQUIDEX_APPLY_CONFIRMATION = "APPLY-SQUIDEX-IMPORT";

export interface SquidexImportMutationGateway {
  createTheme(item: SquidexThemeCreatePlan): Promise<string>;
  createTask(item: SquidexTaskCreatePlan): Promise<string>;
  createGuide(
    item: SquidexGuideCreatePlan,
    refs: { themeId: string; taskIds: string[] },
  ): Promise<string>;
  patchGuideRelations(
    item: SquidexGuideRelationsPatchPlan,
    relatedGuideIds: string[],
  ): Promise<void>;
  patchTaskNextRef(
    item: SquidexTaskNextPatchPlan,
    targetId: string,
  ): Promise<void>;
}

export interface SquidexImportExecutionOptions {
  mode?: "dry-run" | "apply";
  confirmation?: string;
  expectedPlanHash?: string;
}

export interface SquidexImportExecutionResult {
  mode: "dry-run" | "apply";
  planHash: string;
  writes: number;
  createdIds: Record<string, string>;
  blockers: string[];
}

export function computeSquidexImportPlanHash(plan: SquidexImportPlan): string {
  return createHash("sha256").update(stableStringify(plan)).digest("hex");
}

export async function executeSquidexImportPlan(
  plan: SquidexImportPlan,
  inventory: readonly SquidexInventoryItem[],
  gateway: SquidexImportMutationGateway,
  options: SquidexImportExecutionOptions = {},
): Promise<SquidexImportExecutionResult> {
  const mode = options.mode ?? "dry-run";
  const planHash = computeSquidexImportPlanHash(plan);
  const assessment = assessSquidexImportInventory(plan, inventory);
  const blockers = [...assessment.blockers];

  if (assessment.existingTargets.length > 0) {
    blockers.push(
      `Existem ${assessment.existingTargets.length} targets já presentes; comparação de equivalência obrigatória antes de apply.`,
    );
  }

  if (mode === "dry-run") {
    return {
      mode,
      planHash,
      writes: 0,
      createdIds: {},
      blockers,
    };
  }

  if (blockers.length > 0) {
    throw new Error(`Importação bloqueada: ${blockers.join(" | ")}`);
  }
  if (options.confirmation !== SQUIDEX_APPLY_CONFIRMATION) {
    throw new Error("Importação apply sem confirmação explícita válida");
  }
  if (options.expectedPlanHash !== planHash) {
    throw new Error("Importação apply com hash do plano ausente ou divergente");
  }

  const createdIds = new Map<string, string>();
  let writes = 0;

  for (const item of plan.phases.createThemes) {
    createdIds.set(item.key, await gateway.createTheme(item));
    writes += 1;
  }
  for (const item of plan.phases.createTasks) {
    createdIds.set(item.key, await gateway.createTask(item));
    writes += 1;
  }
  for (const item of plan.phases.createGuides) {
    const themeId = requireId(createdIds, item.themeKey);
    const taskIds = item.taskKeys.map((key) => requireId(createdIds, key));
    createdIds.set(
      item.key,
      await gateway.createGuide(item, { themeId, taskIds }),
    );
    writes += 1;
  }
  for (const item of plan.phases.patchGuideRelations) {
    const relatedGuideIds = item.relatedGuideKeys.map((key) =>
      requireId(createdIds, key),
    );
    await gateway.patchGuideRelations(item, relatedGuideIds);
    writes += 1;
  }
  for (const item of plan.phases.patchTaskNextRefs) {
    const targetKey =
      item.nextType === "task" ? item.nextTaskKey : item.nextGuideKey;
    await gateway.patchTaskNextRef(item, requireId(createdIds, targetKey));
    writes += 1;
  }

  return {
    mode,
    planHash,
    writes,
    createdIds: Object.fromEntries(createdIds),
    blockers: [],
  };
}

function requireId(ids: ReadonlyMap<string, string>, key: string): string {
  const id = ids.get(key);
  if (!id) throw new Error(`ID Squidex ainda não resolvido para ${key}`);
  return id;
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, nested]) => `${JSON.stringify(key)}:${stableStringify(nested)}`);
    return `{${entries.join(",")}}`;
  }
  return JSON.stringify(value);
}

import type { SquidexImportPlan } from "./squidex-import-plan";

export type SquidexImportSchema = "guide-theme" | "guide" | "guide-task";

export interface SquidexInventoryItem {
  schema: SquidexImportSchema;
  id: string;
  key: string;
  status?: string;
}

export interface SquidexInventoryAssessment {
  plannedCounts: Record<SquidexImportSchema, number>;
  inventoryCount: number;
  existingTargets: SquidexInventoryItem[];
  knownPilotItems: SquidexInventoryItem[];
  unrelatedItems: SquidexInventoryItem[];
  duplicateKeys: string[];
  schemaCollisions: string[];
  blockers: string[];
}

const DEFAULT_PILOT_KEYS = new Set([
  "tema-piloto",
  "D99",
  "D99-T01",
  "D99-T02",
]);

export function assessSquidexImportInventory(
  plan: SquidexImportPlan,
  inventory: readonly SquidexInventoryItem[],
  knownPilotKeys: ReadonlySet<string> = DEFAULT_PILOT_KEYS,
): SquidexInventoryAssessment {
  const plannedBySchema = plannedKeys(plan);
  const allPlanned = new Map<string, SquidexImportSchema>();

  for (const [schema, keys] of Object.entries(plannedBySchema) as Array<
    [SquidexImportSchema, Set<string>]
  >) {
    for (const key of keys) {
      const previous = allPlanned.get(key);
      if (previous && previous !== schema) {
        throw new Error(`Plano inválido: key ${key} usada em ${previous} e ${schema}`);
      }
      allPlanned.set(key, schema);
    }
  }

  const duplicateKeys: string[] = [];
  const schemaCollisions: string[] = [];
  const existingTargets: SquidexInventoryItem[] = [];
  const knownPilotItems: SquidexInventoryItem[] = [];
  const unrelatedItems: SquidexInventoryItem[] = [];
  const seen = new Set<string>();

  for (const item of inventory) {
    const composite = `${item.schema}:${item.key}`;
    if (seen.has(composite)) duplicateKeys.push(composite);
    seen.add(composite);

    const expectedSchema = allPlanned.get(item.key);
    if (expectedSchema) {
      if (expectedSchema === item.schema) {
        existingTargets.push(item);
      } else {
        schemaCollisions.push(
          `${item.key}: esperado ${expectedSchema}, encontrado ${item.schema}`,
        );
      }
      continue;
    }

    if (knownPilotKeys.has(item.key)) {
      knownPilotItems.push(item);
    } else {
      unrelatedItems.push(item);
    }
  }

  const blockers = [
    ...duplicateKeys.map((value) => `Key duplicada no inventário: ${value}`),
    ...schemaCollisions.map((value) => `Colisão de schema: ${value}`),
  ];

  return {
    plannedCounts: {
      "guide-theme": plannedBySchema["guide-theme"].size,
      guide: plannedBySchema.guide.size,
      "guide-task": plannedBySchema["guide-task"].size,
    },
    inventoryCount: inventory.length,
    existingTargets,
    knownPilotItems,
    unrelatedItems,
    duplicateKeys: [...new Set(duplicateKeys)].sort(),
    schemaCollisions: [...new Set(schemaCollisions)].sort(),
    blockers,
  };
}

export function plannedKeys(
  plan: SquidexImportPlan,
): Record<SquidexImportSchema, Set<string>> {
  return {
    "guide-theme": new Set(plan.phases.createThemes.map((item) => item.key)),
    guide: new Set(plan.phases.createGuides.map((item) => item.key)),
    "guide-task": new Set(plan.phases.createTasks.map((item) => item.key)),
  };
}

import fs from "node:fs";
import path from "node:path";
import { LocalJsonRepository } from "../../src/lib/content/repository";
import { buildSquidexImportPlan } from "../../src/lib/content/squidex-import-plan";

const EXPECTED_BASELINE = {
  themes: 7,
  guides: 15,
  tasks: 96,
} as const;

const content = new LocalJsonRepository().load();
const plan = buildSquidexImportPlan(content);

assertBaseline(plan.sourceCounts);
assertPlanReferences(plan);

const outputDir = path.join(process.cwd(), ".build");
fs.mkdirSync(outputDir, { recursive: true });

const planPath = path.join(outputDir, "squidex-import-plan.json");
const reportPath = path.join(outputDir, "squidex-import-report.json");

fs.writeFileSync(planPath, `${JSON.stringify(plan, null, 2)}\n`, "utf8");

const report = {
  status: "OK",
  mode: "dry-run",
  networkCalls: 0,
  writesToSquidex: 0,
  locale: plan.locale,
  sourceCounts: plan.sourceCounts,
  phaseCounts: {
    createThemes: plan.phases.createThemes.length,
    createTasks: plan.phases.createTasks.length,
    createGuides: plan.phases.createGuides.length,
    patchGuideRelations: plan.phases.patchGuideRelations.length,
    patchTaskNextRefs: plan.phases.patchTaskNextRefs.length,
  },
  summary: plan.summary,
};

fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log("Squidex import dry-run: OK");
console.log(
  `source: themes=${plan.sourceCounts.themes}; guides=${plan.sourceCounts.guides}; tasks=${plan.sourceCounts.tasks}`,
);
console.log(
  `phases: createThemes=${report.phaseCounts.createThemes}; createTasks=${report.phaseCounts.createTasks}; createGuides=${report.phaseCounts.createGuides}; patchGuideRelations=${report.phaseCounts.patchGuideRelations}; patchTaskNextRefs=${report.phaseCounts.patchTaskNextRefs}`,
);
console.log(
  `links: guideTasks=${plan.summary.guideTaskLinks}; relatedGuides=${plan.summary.relatedGuideLinks}; nextTask=${plan.summary.nextTaskLinks}; nextGuide=${plan.summary.nextGuideLinks}`,
);
console.log(
  `components: steps=${plan.summary.stepComponents}; resources=${plan.summary.resourceComponents}; tables=${plan.summary.tables}`,
);
console.log(`operations=${plan.summary.operations}; networkCalls=0; writesToSquidex=0`);
console.log(`plan=${path.relative(process.cwd(), planPath)}`);
console.log(`report=${path.relative(process.cwd(), reportPath)}`);

function assertBaseline(counts: {
  themes: number;
  guides: number;
  tasks: number;
}): void {
  for (const key of Object.keys(EXPECTED_BASELINE) as Array<
    keyof typeof EXPECTED_BASELINE
  >) {
    if (counts[key] !== EXPECTED_BASELINE[key]) {
      throw new Error(
        `Baseline inesperada em ${key}: esperado ${EXPECTED_BASELINE[key]}, obtido ${counts[key]}`,
      );
    }
  }
}

function assertPlanReferences(
  plan: ReturnType<typeof buildSquidexImportPlan>,
): void {
  const themeKeys = new Set(plan.phases.createThemes.map((item) => item.key));
  const guideKeys = new Set(plan.phases.createGuides.map((item) => item.key));
  const taskKeys = new Set(plan.phases.createTasks.map((item) => item.key));

  if (themeKeys.size !== plan.sourceCounts.themes) {
    throw new Error("Plano contém keys de tema duplicadas");
  }
  if (guideKeys.size !== plan.sourceCounts.guides) {
    throw new Error("Plano contém keys de guia duplicadas");
  }
  if (taskKeys.size !== plan.sourceCounts.tasks) {
    throw new Error("Plano contém keys de tarefa duplicadas");
  }

  for (const guide of plan.phases.createGuides) {
    if (!themeKeys.has(guide.themeKey)) {
      throw new Error(`Guia ${guide.key}: themeKey não resolvida ${guide.themeKey}`);
    }
    for (const taskKey of guide.taskKeys) {
      if (!taskKeys.has(taskKey)) {
        throw new Error(`Guia ${guide.key}: taskKey não resolvida ${taskKey}`);
      }
    }
  }

  for (const patch of plan.phases.patchGuideRelations) {
    if (!guideKeys.has(patch.guideKey)) {
      throw new Error(`Patch de guia desconhecido: ${patch.guideKey}`);
    }
    for (const relatedGuideKey of patch.relatedGuideKeys) {
      if (!guideKeys.has(relatedGuideKey)) {
        throw new Error(
          `Patch ${patch.guideKey}: relatedGuideKey não resolvida ${relatedGuideKey}`,
        );
      }
    }
  }

  for (const patch of plan.phases.patchTaskNextRefs) {
    if (!taskKeys.has(patch.taskKey)) {
      throw new Error(`Patch de tarefa desconhecida: ${patch.taskKey}`);
    }
    if (patch.nextType === "task" && !taskKeys.has(patch.nextTaskKey)) {
      throw new Error(
        `Patch ${patch.taskKey}: nextTaskKey não resolvida ${patch.nextTaskKey}`,
      );
    }
    if (patch.nextType !== "task" && !guideKeys.has(patch.nextGuideKey)) {
      throw new Error(
        `Patch ${patch.taskKey}: nextGuideKey não resolvida ${patch.nextGuideKey}`,
      );
    }
  }

  if (plan.phases.patchTaskNextRefs.length !== plan.sourceCounts.tasks) {
    throw new Error("Nem todas as tarefas têm patch de continuidade planeado");
  }
}

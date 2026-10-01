import fs from "node:fs";
import path from "node:path";
import { deterministicSquidexContentId } from "../../src/lib/content/squidex-import-concurrency";
import { computeSquidexDestinationHash } from "../../src/lib/content/squidex-import-destination";
import { computeSquidexImportPlanHash } from "../../src/lib/content/squidex-import-executor";
import { buildSquidexImportPlan } from "../../src/lib/content/squidex-import-plan";
import { assessSquidexOperationalReadiness } from "../../src/lib/content/squidex-import-operational-readiness";
import { assessSquidexImportInventory } from "../../src/lib/content/squidex-import-readiness";
import { loadContent } from "../../src/lib/content/repository";

const source = loadContent();
const plan = buildSquidexImportPlan(source);
const planHash = computeSquidexImportPlanHash(plan);
const destination = {
  apiBaseUrl: "https://cloud.squidex.io",
  appName: "guias-dados-gov-pt-piloto",
  schemaIds: {
    "guide-theme": "50338650-f626-4892-b698-7ac37963aa4d",
    guide: "9661a079-d714-4847-88a8-2a65adc3e811",
    "guide-task": "6a2ce5f7-89a4-4796-91d5-1470ab448905",
  },
} as const;
const destinationHash = computeSquidexDestinationHash(destination);

const liveFixture = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), "tests", "fixtures", "squidex-live-capability-d99.json"),
    "utf8",
  ),
);
const inventoryFixture = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), "tests", "fixtures", "squidex-inventory-pilot.json"),
    "utf8",
  ),
);
const inventoryAssessment = assessSquidexImportInventory(plan, inventoryFixture);

const deterministicIds = [
  ...plan.phases.createThemes.map((item) => deterministicSquidexContentId("guide-theme", item.key)),
  ...plan.phases.createGuides.map((item) => deterministicSquidexContentId("guide", item.key)),
  ...plan.phases.createTasks.map((item) => deterministicSquidexContentId("guide-task", item.key)),
];
const uniqueDeterministicIds = new Set(deterministicIds).size;
const rehearsal = liveFixture.liveWriteRehearsal;
const liveWriteRehearsal =
  rehearsal?.freshPatchStatus === 200 &&
  rehearsal?.postFreshVersion === rehearsal?.initialVersion + 1 &&
  rehearsal?.stalePatchStatus === 412 &&
  rehearsal?.staleRejected === true &&
  rehearsal?.rollbackStatus === 200 &&
  rehearsal?.finalEqual === true &&
  rehearsal?.finalStatus === "Draft";

const readiness = assessSquidexOperationalReadiness({
  deterministicCreateIds: uniqueDeterministicIds === 118,
  optimisticConcurrency: true,
  ambiguousWriteReconciliation: true,
  guardedRollback: true,
  destinationBinding: true,
  liveVersionMetadata:
    liveFixture.readOnlyProbe === true &&
    typeof liveFixture.version === "string" &&
    liveFixture.updateMethod === "PATCH",
  liveWriteRehearsal,
});

const report = {
  ...readiness,
  planHash,
  destinationHash,
  destination,
  deterministicIds: deterministicIds.length,
  uniqueDeterministicIds,
  liveMetadataProbe: {
    capturedAt: liveFixture.capturedAt,
    id: liveFixture.id,
    version: liveFixture.version,
    updateMethod: liveFixture.updateMethod,
    readOnly: liveFixture.readOnlyProbe,
  },
  liveWriteRehearsalPerformed: liveWriteRehearsal,
  liveInventory: {
    capturedItems: inventoryFixture.length,
    knownPilotItems: inventoryAssessment.knownPilotItems.length,
    existingTargets: inventoryAssessment.existingTargets.length,
    unrelatedItems: inventoryAssessment.unrelatedItems.length,
    blockers: inventoryAssessment.blockers,
  },
  writesToSquidex: 0,
};

fs.mkdirSync(path.join(process.cwd(), ".build"), { recursive: true });
fs.writeFileSync(
  path.join(process.cwd(), ".build", "squidex-import-safety-check.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);
console.log(JSON.stringify(report, null, 2));
if (report.status === "BLOCKED" || inventoryAssessment.blockers.length > 0) process.exitCode = 1;

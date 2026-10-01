import fs from "node:fs";
import path from "node:path";
import { compareGuidesContent } from "../../src/lib/content/content-equivalence";
import { computeSquidexImportPlanHash } from "../../src/lib/content/squidex-import-executor";
import { buildSquidexImportOperationManifest } from "../../src/lib/content/squidex-import-journal";
import { buildSquidexImportPlan } from "../../src/lib/content/squidex-import-plan";
import {
  assessSquidexImportInventory,
  type SquidexInventoryItem,
} from "../../src/lib/content/squidex-import-readiness";
import { materializeSquidexImportPlan } from "../../src/lib/content/squidex-import-roundtrip";
import { mapProvisionalSquidexPayload } from "../../src/lib/content/squidex-mapper";
import { loadContent } from "../../src/lib/content/repository";

const source = loadContent();
const plan = buildSquidexImportPlan(source);
const planHash = computeSquidexImportPlanHash(plan);
const manifest = buildSquidexImportOperationManifest(plan);
const inventoryPath = path.join(
  process.cwd(),
  "tests",
  "fixtures",
  "squidex-inventory-pilot.json",
);
const inventory = JSON.parse(
  fs.readFileSync(inventoryPath, "utf8"),
) as SquidexInventoryItem[];
const assessment = assessSquidexImportInventory(plan, inventory);
const roundTrip = mapProvisionalSquidexPayload(materializeSquidexImportPlan(plan));
const equivalence = compareGuidesContent(source, roundTrip);

const blockers = [...assessment.blockers];
if (!equivalence.equivalent) {
  blockers.push(
    `Round trip divergente: ${equivalence.differences.slice(0, 5).join(" | ")}`,
  );
}
if (manifest.length !== plan.summary.operations) {
  blockers.push(
    `Manifesto inconsistente: ${manifest.length} != ${plan.summary.operations}`,
  );
}

const report = {
  status: blockers.length === 0 ? "PREPARED_NOT_AUTHORIZED" : "BLOCKED",
  applyAuthorized: false,
  writesToSquidex: 0,
  networkCalls: 0,
  inventorySource: "fixture-read-only-snapshot",
  requiresFreshLiveInventoryBeforeApply: true,
  planHash,
  sourceCounts: plan.sourceCounts,
  operations: manifest.length,
  uniqueOperationIds: new Set(manifest.map((item) => item.operationId)).size,
  knownPilotItems: assessment.knownPilotItems.length,
  existingTargets: assessment.existingTargets.length,
  unrelatedItems: assessment.unrelatedItems.length,
  roundTripEquivalent: equivalence.equivalent,
  blockers,
};

fs.mkdirSync(path.join(process.cwd(), ".build"), { recursive: true });
fs.writeFileSync(
  path.join(process.cwd(), ".build", "squidex-import-preflight.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify(report, null, 2));
if (report.status === "BLOCKED") process.exitCode = 1;

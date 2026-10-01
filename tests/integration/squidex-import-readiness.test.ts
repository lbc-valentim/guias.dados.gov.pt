import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { loadContent } from "../../src/lib/content/repository";
import { buildSquidexImportPlan } from "../../src/lib/content/squidex-import-plan";
import {
  assessSquidexImportInventory,
  type SquidexInventoryItem,
} from "../../src/lib/content/squidex-import-readiness";

const fixturePath = path.join(
  process.cwd(),
  "tests",
  "fixtures",
  "squidex-inventory-pilot.json",
);

const inventory = JSON.parse(
  fs.readFileSync(fixturePath, "utf8"),
) as SquidexInventoryItem[];

const plan = buildSquidexImportPlan(loadContent());
const assessment = assessSquidexImportInventory(plan, inventory);

assert.deepEqual(assessment.plannedCounts, {
  "guide-theme": 7,
  guide: 15,
  "guide-task": 96,
});
assert.equal(assessment.inventoryCount, 4);
assert.equal(assessment.knownPilotItems.length, 4);
assert.equal(assessment.existingTargets.length, 0);
assert.equal(assessment.unrelatedItems.length, 0);
assert.deepEqual(assessment.blockers, []);

const duplicateAssessment = assessSquidexImportInventory(plan, [
  ...inventory,
  inventory[0],
]);
assert.equal(duplicateAssessment.duplicateKeys.length, 1);
assert.match(duplicateAssessment.blockers[0], /Key duplicada/);

const collisionAssessment = assessSquidexImportInventory(plan, [
  ...inventory,
  {
    schema: "guide-task",
    id: "wrong-schema",
    key: "D01",
    status: "Draft",
  },
]);
assert.equal(collisionAssessment.schemaCollisions.length, 1);
assert.match(collisionAssessment.blockers[0], /Colisão de schema/);

console.log(
  "Inventário Squidex: piloto isolado; 118 targets sem colisões; blockers=0",
);

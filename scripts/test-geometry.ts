import { runGeometryUnitTests } from "../lib/site-feasibility/geometry";
import { runByeLawUnitTests } from "../lib/site-feasibility/byelaws";

console.log("Running Geometry Unit Tests...");
const geomResults = runGeometryUnitTests();
let geomFailed = 0;
for (const res of geomResults) {
  if (!res.passed) {
    geomFailed++;
    console.error(`FAIL: ${res.name} (Expected: ${res.expected}, Got: ${res.actual})`);
  } else {
    console.log(`PASS: ${res.name}`);
  }
}

console.log("\nRunning Bye-law Unit Tests...");
const byeLawResults = runByeLawUnitTests();
let byeLawFailed = 0;
for (const res of byeLawResults) {
  if (!res.passed) {
    byeLawFailed++;
    console.error(`FAIL: ${res.name} (Expected: ${res.expected}, Got: ${res.actual})`);
  } else {
    console.log(`PASS: ${res.name}`);
  }
}

console.log(`\nSummary: Geometry (${geomResults.length - geomFailed}/${geomResults.length} passed), Bye-laws (${byeLawResults.length - byeLawFailed}/${byeLawResults.length} passed)`);

if (geomFailed > 0 || byeLawFailed > 0) {
  process.exit(1);
} else {
  console.log("All tests passed successfully.");
  process.exit(0);
}

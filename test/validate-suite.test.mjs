import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import test from "node:test";

test("the complete skill suite passes its deterministic contract", () => {
  const result = spawnSync(process.execPath, [resolve("scripts/validate-suite.mjs")], { encoding: "utf8" });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /Suite validation passed/);
});

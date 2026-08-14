import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { appendFile, mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

const script = resolve("skills/setup-x-growth/scripts/init-workspace.mjs");

test("workspace initialisation is complete, idempotent, and non-overwriting", async (context) => {
  const project = await mkdtemp(join(tmpdir(), "x-growth-test-"));
  context.after(() => rm(project, { recursive: true, force: true }));

  const first = JSON.parse(execFileSync(process.execPath, [script, "--root", project, "--handle", "@example", "--goal", "qualified growth"], { encoding: "utf8" }));
  assert.equal(first.created.length, 6);
  assert.equal(first.skipped.length, 0);
  assert.match(await readFile(join(project, ".x-growth", "account.md"), "utf8"), /@example/);
  assert.equal(first.report_directory, join(project, ".x-growth", "reports"));
  assert.deepEqual(await readdir(first.report_directory), []);

  const decisions = join(project, ".x-growth", "decisions.md");
  await appendFile(decisions, "\nUSER EVIDENCE\n");
  const second = JSON.parse(execFileSync(process.execPath, [script, "--root", project], { encoding: "utf8" }));
  assert.equal(second.created.length, 0);
  assert.equal(second.skipped.length, 6);
  assert.match(await readFile(decisions, "utf8"), /USER EVIDENCE/);
});

test("workspace initialisation rejects unsafe roots", () => {
  const relative = spawnSync(process.execPath, [script, "--root", "relative"], { encoding: "utf8" });
  assert.notEqual(relative.status, 0);
  assert.match(relative.stderr, /absolute path/);

  const filesystemRoot = spawnSync(process.execPath, [script, "--root", "/"], { encoding: "utf8" });
  assert.notEqual(filesystemRoot.status, 0);
  assert.match(filesystemRoot.stderr, /Refusing/);
});

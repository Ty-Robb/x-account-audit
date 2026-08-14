#!/usr/bin/env node

import { constants } from "node:fs";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function parseArgs(argv) {
  const result = { root: "", handle: "", goal: "" };
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (!["--root", "--handle", "--goal"].includes(flag)) {
      throw new Error(`Unknown argument: ${flag}`);
    }
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for ${flag}`);
    }
    result[flag.slice(2)] = value;
    index += 1;
  }
  return result;
}

function validateRoot(input) {
  if (!input) throw new Error("--root is required");
  if (!isAbsolute(input)) throw new Error("--root must be an absolute path");
  const root = resolve(input);
  if (root === "/" || root === resolve(homedir())) {
    throw new Error("Refusing to initialise a broad system or home directory");
  }
  return root;
}

async function exists(path) {
  try {
    await readFile(path);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = validateRoot(args.root);
  const workspace = join(root, ".x-growth");
  const reportDirectory = join(workspace, "reports");
  const skillDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const templateDir = join(skillDir, "assets", "workspace");
  const files = [
    "account.md",
    "ledger.csv",
    "experiments.md",
    "series.md",
    "decisions.md",
    "workspace.json",
  ];

  await mkdir(workspace, { recursive: true });
  await mkdir(reportDirectory, { recursive: true });
  const created = [];
  const skipped = [];

  for (const name of files) {
    const destination = join(workspace, name);
    if (await exists(destination)) {
      skipped.push(name);
      continue;
    }

    if (name === "workspace.json") {
      const template = JSON.parse(await readFile(join(templateDir, name), "utf8"));
      const now = new Date().toISOString();
      template.created_at = now;
      template.last_reviewed_at = now;
      template.account_handle = args.handle || "Unknown";
      template.objective = args.goal || "Unknown";
      await writeFile(destination, `${JSON.stringify(template, null, 2)}\n`, { flag: "wx" });
    } else if (name === "account.md") {
      const template = await readFile(join(templateDir, name), "utf8");
      const rendered = template
        .replaceAll("{{HANDLE}}", args.handle || "Unknown")
        .replaceAll("{{GOAL}}", args.goal || "Unknown");
      await writeFile(destination, rendered, { flag: "wx" });
    } else {
      await copyFile(join(templateDir, name), destination, constants.COPYFILE_EXCL);
    }
    created.push(name);
  }

  console.log(JSON.stringify({ workspace, report_directory: reportDirectory, created, skipped }, null, 2));
}

main().catch((error) => {
  console.error(`setup-x-growth: ${error.message}`);
  process.exitCode = 1;
});

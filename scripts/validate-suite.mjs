#!/usr/bin/env node

import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const requiredSkills = [
  "setup-x-growth",
  "audit-x-account",
  "launch-x-account",
  "learn-x-account",
  "systemize-x-account",
  "compound-x-account",
];
const stageSkills = requiredSkills.slice(2);
const errors = [];

function fail(message) {
  errors.push(message);
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

function parseFrontmatter(contents, file) {
  if (!contents.startsWith("---\n")) {
    fail(`${file}: missing YAML frontmatter`);
    return {};
  }
  const end = contents.indexOf("\n---\n", 4);
  if (end === -1) {
    fail(`${file}: unclosed YAML frontmatter`);
    return {};
  }
  const values = {};
  for (const line of contents.slice(4, end).split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    values[line.slice(0, separator).trim()] = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
  }
  return values;
}

async function markdownFiles(path) {
  const result = [];
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const target = join(path, entry.name);
    if (entry.isDirectory()) result.push(...await markdownFiles(target));
    else if (entry.name.endsWith(".md")) result.push(target);
  }
  return result;
}

async function validateLinks(file, contents) {
  const pattern = /\]\(([^)]+)\)/g;
  for (const match of contents.matchAll(pattern)) {
    let target = match[1].trim().replace(/^<|>$/g, "").split("#")[0];
    if (!target || /^(https?:|mailto:|#)/.test(target)) continue;
    target = decodeURIComponent(target);
    const destination = resolve(dirname(file), target);
    if (!await exists(destination)) fail(`${file}: broken relative link ${match[1]}`);
  }
}

async function validateSkill(name) {
  const skillDir = join(root, "skills", name);
  const skillFile = join(skillDir, "SKILL.md");
  const agentFile = join(skillDir, "agents", "openai.yaml");
  if (!await exists(skillFile)) return fail(`${name}: missing SKILL.md`);
  if (!await exists(agentFile)) return fail(`${name}: missing agents/openai.yaml`);

  const skill = await readFile(skillFile, "utf8");
  const frontmatter = parseFrontmatter(skill, skillFile);
  if (frontmatter.name !== name) fail(`${skillFile}: frontmatter name must match directory`);
  if (!frontmatter.description || frontmatter.description.length < 80) {
    fail(`${skillFile}: description must state a specific trigger and boundary`);
  }
  if (skill.split("\n").length > 500) fail(`${skillFile}: keep SKILL.md under 500 lines`);
  if (/\b(?:TODO|FIXME)\b/i.test(skill)) fail(`${skillFile}: unresolved TODO or FIXME`);
  if (stageSkills.includes(name) && !skill.includes("## Use persistent state when present")) {
    fail(`${skillFile}: missing optional persistent-state contract`);
  }

  const agent = await readFile(agentFile, "utf8");
  const display = agent.match(/display_name:\s*["']([^"']+)["']/)?.[1];
  const short = agent.match(/short_description:\s*["']([^"']+)["']/)?.[1];
  const prompt = agent.match(/default_prompt:\s*["']([^"']+)["']/)?.[1];
  if (!display) fail(`${agentFile}: missing display_name`);
  if (!short || short.length < 25 || short.length > 64) {
    fail(`${agentFile}: short_description must contain 25–64 characters`);
  }
  if (!prompt?.includes(`$${name}`)) fail(`${agentFile}: default_prompt must invoke $${name}`);
  if (!/allow_implicit_invocation:\s*false/.test(agent)) {
    fail(`${agentFile}: every suite skill must remain explicit-only`);
  }

  for (const file of await markdownFiles(skillDir)) {
    const contents = await readFile(file, "utf8");
    await validateLinks(file, contents);
    if (file.includes(`${join("", "references")}`) && contents.split("\n").length > 100 && !contents.includes("## Contents")) {
      fail(`${file}: references over 100 lines need a Contents section`);
    }
  }
}

async function validateRegistry() {
  const file = join(root, "sources", "registry.json");
  const registry = JSON.parse(await readFile(file, "utf8"));
  if (!/^[a-f0-9]{40}$/.test(registry.algorithm?.pinned_commit || "")) {
    fail(`${file}: algorithm pinned_commit must be a full SHA`);
  }
  const ids = new Set();
  const urls = new Set();
  const groups = new Set();
  for (const source of registry.sources || []) {
    if (ids.has(source.id)) fail(`${file}: duplicate source id ${source.id}`);
    if (urls.has(source.url)) fail(`${file}: duplicate source URL ${source.url}`);
    ids.add(source.id);
    urls.add(source.url);
    groups.add(source.group);
    if (!source.surface || !source.url?.startsWith("https://")) fail(`${file}: invalid source ${source.id}`);
    if (source.content_sha256 !== null && !/^[a-f0-9]{64}$/.test(source.content_sha256)) {
      fail(`${file}: invalid content hash for ${source.id}`);
    }
  }
  for (const group of ["account", "publishing", "media", "discovery", "community", "creator", "measurement", "recommendations", "safety"]) {
    if (!groups.has(group)) fail(`${file}: missing ${group} source group`);
  }
  if ((registry.sources || []).filter((source) => source.content_sha256).length < 10) {
    fail(`${file}: fewer than ten official sources have content baselines`);
  }

  const surfaceMap = await readFile(join(root, "skills", "audit-x-account", "references", "x-surface-map.md"), "utf8");
  const mappedHelpUrls = new Set(surfaceMap.match(/https:\/\/help\.x\.com\/en\/[A-Za-z0-9_?&=./%-]+/g) || []);
  for (const url of mappedHelpUrls) {
    if (!urls.has(url)) fail(`${file}: surface-map URL is not monitored: ${url}`);
  }
}

async function validateEvals() {
  const file = join(root, "evals", "cases.json");
  const data = JSON.parse(await readFile(file, "utf8"));
  const ids = new Set();
  for (const item of data.cases || []) {
    if (ids.has(item.id)) fail(`${file}: duplicate case id ${item.id}`);
    ids.add(item.id);
    if (!requiredSkills.includes(item.expected_skill)) fail(`${file}: unknown skill in ${item.id}`);
    if (!item.prompt || !item.required_contracts?.length || !item.forbidden_claims?.length) {
      fail(`${file}: incomplete eval contract in ${item.id}`);
    }
  }
  for (const name of requiredSkills) {
    const count = (data.cases || []).filter((item) => item.expected_skill === name).length;
    if (count < 3) fail(`${file}: ${name} needs at least three routing cases`);
  }
}

async function main() {
  const skillRoot = join(root, "skills");
  const actualSkills = (await readdir(skillRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  for (const name of requiredSkills) {
    if (!actualSkills.includes(name)) fail(`skills: missing required skill ${name}`);
    else await validateSkill(name);
  }
  for (const name of actualSkills) {
    if (!requiredSkills.includes(name)) fail(`skills: unregistered skill directory ${name}`);
  }

  const readme = await readFile(join(root, "README.md"), "utf8");
  if (!readme.includes("## The six skills")) fail("README.md: skill count is stale");
  for (const name of requiredSkills) {
    if (!readme.includes(`$${name}`)) fail(`README.md: missing $${name}`);
  }
  const auditSkill = await readFile(join(root, "skills", "audit-x-account", "SKILL.md"), "utf8");
  const reportTemplate = await readFile(join(root, "skills", "audit-x-account", "references", "report-template.md"), "utf8");
  const htmlReportFile = join(root, "skills", "audit-x-account", "assets", "audit-report-template.html");
  if (!await exists(htmlReportFile)) fail("audit-x-account: missing bundled HTML report template");
  const htmlReport = await readFile(htmlReportFile, "utf8");
  for (const contract of ["Answer mode", "Audit report mode", "Report discussion mode"]) {
    if (!auditSkill.includes(contract)) fail(`audit-x-account: missing ${contract} response contract`);
  }
  for (const contract of [
    "| A1 |",
    "### Account cleanup register",
    "### Content direction",
    "**Start here:**",
    "### Execution board",
    "Agent / Owner / Joint",
    "Done / Ready / Needs input / Blocked",
    "### Ready-to-use outputs",
    "### Later only if",
    "### Discuss this report",
    "Do not automatically attach 15 fully drafted posts",
  ]) {
    if (!reportTemplate.includes(contract)) fail(`report-template.md: missing report contract ${contract}`);
  }
  for (const contract of [
    "Reusable audit-report presentation template",
    'id="evidence"',
    'id="assessment"',
    'id="findings"',
    'id="cleanup"',
    'id="content"',
    'id="plan"',
    'id="outputs"',
    'id="measurement"',
    "@media (max-width: 720px)",
    "@media print",
  ]) {
    if (!htmlReport.includes(contract)) fail(`audit-report-template.html: missing report contract ${contract}`);
  }
  for (const contract of ["assets/audit-report-template.html", "Replace every worked-example", "desktop and mobile"] ) {
    if (!auditSkill.includes(contract)) fail(`audit-x-account: missing HTML report contract ${contract}`);
  }
  const learnSkill = await readFile(join(root, "skills", "learn-x-account", "SKILL.md"), "utf8");
  const learningPlaybook = await readFile(join(root, "skills", "learn-x-account", "references", "learning-playbook.md"), "utf8");
  for (const contract of ["Start here", "first-sprint execution board", "Agent", "Owner", "Joint", "Done", "Ready", "Needs input", "Blocked"]) {
    if (!learnSkill.includes(contract)) fail(`learn-x-account: missing execution contract ${contract}`);
  }
  for (const contract of ["Ready-to-use outputs", "definition of done", "evidence trigger"]) {
    if (!learningPlaybook.includes(contract)) fail(`learning-playbook.md: missing execution contract ${contract}`);
  }
  const version = (await readFile(join(root, "VERSION"), "utf8")).trim();
  const packageFile = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
  if (version !== packageFile.version) fail("VERSION and package.json version differ");

  await validateRegistry();
  await validateEvals();
  for (const stage of ["day-zero", "learning", "repeatability", "compounding"]) {
    if (!await exists(join(root, "examples", `${stage}.md`))) fail(`examples: missing ${stage}.md`);
  }
  if (!await exists(join(root, "examples", "full-audit-report.html"))) fail("examples: missing full HTML audit report");

  if (errors.length) {
    console.error(`Suite validation failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Suite validation passed: ${requiredSkills.length} skills, ${packageFile.version}, ${(JSON.parse(await readFile(join(root, "evals", "cases.json"), "utf8"))).cases.length} routing contracts.`);
}

main().catch((error) => {
  console.error(`validate-suite: ${error.stack || error.message}`);
  process.exitCode = 1;
});

#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export function normaliseSource(raw) {
  return raw
    .replaceAll("\r\n", "\n")
    .replace(/^Title:.*$/gim, "")
    .replace(/^URL Source:.*$/gim, "")
    .replace(/^Published Time:.*$/gim, "")
    .replace(/^Markdown Content:\s*$/gim, "")
    .replace(/^Warning:.*$/gim, "")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function sourceDigest(raw) {
  return createHash("sha256").update(normaliseSource(raw)).digest("hex");
}

export function isRetrievalFailure(raw) {
  const text = raw.toLowerCase();
  return (
    text.length < 200 ||
    text.includes("enable javascript and cookies to continue") ||
    text.includes("target url returned error") ||
    text.includes("cloudflare") && text.includes("challenge") ||
    /^title:\s*(404|not found)/im.test(raw)
  );
}

function parseArgs(argv) {
  const args = {
    mode: "full",
    registry: resolve(root, "sources", "registry.json"),
    json: "",
    markdown: "",
    concurrency: 1,
    delay: 3500,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (!['--mode', '--registry', '--json', '--markdown', '--concurrency', '--delay'].includes(flag)) {
      throw new Error(`Unknown argument: ${flag}`);
    }
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${flag}`);
    args[flag.slice(2)] = value;
    index += 1;
  }

  if (!['algorithm', 'full'].includes(args.mode)) throw new Error("--mode must be algorithm or full");
  args.registry = resolve(args.registry);
  args.concurrency = Number(args.concurrency);
  if (!Number.isInteger(args.concurrency) || args.concurrency < 1 || args.concurrency > 8) {
    throw new Error("--concurrency must be an integer from 1 to 8");
  }
  args.delay = Number(args.delay);
  if (!Number.isInteger(args.delay) || args.delay < 0 || args.delay > 30_000) {
    throw new Error("--delay must be an integer from 0 to 30000 milliseconds");
  }
  return args;
}

async function fetchText(url, attempts = 2) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "x-account-audit-source-monitor/0.2 (+https://github.com/Ty-Robb/x-account-audit)" },
        signal: AbortSignal.timeout(30_000),
      });
      const body = await response.text();
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (isRetrievalFailure(body)) throw new Error("challenge, error page, or unexpectedly short response");
      return body;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((accept) => setTimeout(accept, 750 * attempt));
    }
  }
  throw lastError;
}

function checkUrl(source) {
  if (source.check_url) return source.check_url;
  if (source.url.startsWith("https://help.x.com/")) {
    return `https://r.jina.ai/http://${source.url.slice("https://".length)}`;
  }
  return source.url;
}

async function checkAlgorithm(config) {
  const api = `https://api.github.com/repos/${config.repository}/commits/${encodeURIComponent(config.branch)}`;
  try {
    const body = await fetchText(api);
    const data = JSON.parse(body);
    const actual = data.sha;
    if (!actual) throw new Error("GitHub response did not contain a commit SHA");
    return {
      id: "published-algorithm",
      surface: "Published X algorithm",
      url: `https://github.com/${config.repository}/commit/${actual}`,
      expected: config.pinned_commit,
      actual,
      status: actual === config.pinned_commit ? "unchanged" : "changed",
    };
  } catch (error) {
    return {
      id: "published-algorithm",
      surface: "Published X algorithm",
      url: `https://github.com/${config.repository}`,
      status: "warning",
      critical: true,
      message: error.message,
    };
  }
}

async function checkOfficialSource(source, sitemapUrls = new Set()) {
  if (!source.content_sha256) {
    if (sitemapUrls.has(source.url)) {
      return {
        id: source.id,
        group: source.group,
        surface: source.surface,
        url: source.url,
        critical: Boolean(source.critical),
        status: "inventory-only",
        message: "content hashing is unavailable; URL remains in the official X Help sitemap",
      };
    }
    return {
      id: source.id,
      group: source.group,
      surface: source.surface,
      url: source.url,
      critical: Boolean(source.critical),
      status: "warning",
      message: "source has no content baseline and is absent from the official X Help sitemap",
    };
  }
  try {
    const body = await fetchText(checkUrl(source));
    let actual = sourceDigest(body);
    if (actual !== source.content_sha256) {
      const confirmation = sourceDigest(await fetchText(checkUrl(source)));
      if (confirmation !== actual) {
        if (sitemapUrls.has(source.url)) {
          return {
            id: source.id,
            group: source.group,
            surface: source.surface,
            url: source.url,
            critical: Boolean(source.critical),
            status: "inventory-only",
            message: "content retrieval was unstable; URL remains in the official X Help sitemap",
          };
        }
        return {
          id: source.id,
          group: source.group,
          surface: source.surface,
          url: source.url,
          critical: Boolean(source.critical),
          status: "warning",
          message: `unstable retrieval produced ${actual} then ${confirmation}`,
        };
      }
      actual = confirmation;
    }
    let status = "unchanged";
    if (actual !== source.content_sha256) status = "changed";
    return {
      id: source.id,
      group: source.group,
      surface: source.surface,
      url: source.url,
      critical: Boolean(source.critical),
      expected: source.content_sha256,
      actual,
      status,
    };
  } catch (error) {
    if (sitemapUrls.has(source.url)) {
      return {
        id: source.id,
        group: source.group,
        surface: source.surface,
        url: source.url,
        critical: Boolean(source.critical),
        status: "inventory-only",
        message: "content retrieval unavailable; URL remains in the official X Help sitemap",
      };
    }
    return {
      id: source.id,
      group: source.group,
      surface: source.surface,
      url: source.url,
      critical: Boolean(source.critical),
      status: "warning",
      message: error.message,
    };
  }
}

async function mapConcurrent(items, concurrency, delay, operation) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await operation(items[index]);
      if (delay && items[index].content_sha256 && next < items.length) {
        await new Promise((accept) => setTimeout(accept, delay));
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

export function summarise(mode, checks) {
  const changes = checks.filter((item) => item.status === "changed");
  const warnings = checks.filter((item) => item.status === "warning");
  const unbaselined = checks.filter((item) => item.status === "unbaselined");
  const inventoryOnly = checks.filter((item) => item.status === "inventory-only");
  const unchanged = checks.filter((item) => item.status === "unchanged");
  const fingerprintPayload = [...changes, ...unbaselined, ...warnings]
    .map((item) => [item.id, item.status, item.actual || item.message])
    .sort((left, right) => left[0].localeCompare(right[0]));
  const fingerprint = createHash("sha256")
    .update(JSON.stringify(fingerprintPayload))
    .digest("hex")
    .slice(0, 12);
  return {
    schema_version: 1,
    checked_at: new Date().toISOString(),
    mode,
    status: changes.length || unbaselined.length || warnings.length ? "attention" : "current",
    fingerprint,
    counts: {
      checked: checks.length,
      changed: changes.length,
      unbaselined: unbaselined.length,
      warnings: warnings.length,
      critical_warnings: warnings.filter((item) => item.critical).length,
      inventory_only: inventoryOnly.length,
      unchanged: unchanged.length,
    },
    changes,
    unbaselined,
    warnings,
    inventory_only: inventoryOnly,
    checks,
  };
}

export function renderMarkdown(report) {
  const lines = [
    `# X source watch: ${report.status}`,
    "",
    `- Checked: ${report.checked_at}`,
    `- Mode: ${report.mode}`,
    `- Fingerprint: \`${report.fingerprint}\``,
    `- Results: ${report.counts.changed} changed, ${report.counts.unbaselined} unbaselined, ${report.counts.warnings} warnings, ${report.counts.inventory_only} inventory-only, ${report.counts.unchanged} unchanged`,
    "",
  ];

  const sections = [
    ["Changes requiring editorial review", report.changes],
    ["Sources without a baseline", report.unbaselined],
    ["Retrieval warnings", report.warnings],
    ["Inventory-only checks", report.inventory_only],
  ];
  for (const [heading, items] of sections) {
    if (!items.length) continue;
    lines.push(`## ${heading}`, "");
    for (const item of items) {
      const detail = item.message ? ` — ${item.message}` : ` — \`${item.expected || "none"}\` → \`${item.actual}\``;
      lines.push(`- [${item.surface}](${item.url}) (${item.id})${detail}`);
    }
    lines.push("");
  }

  lines.push(
    "## Review rule",
    "",
    "Do not automatically rewrite guidance from this report. Inspect the official change, identify affected claims and playbooks, update sources and tests, run the full validation suite, and record the editorial decision.",
    "",
    `<!-- source-watch:${report.fingerprint} -->`,
  );
  return `${lines.join("\n")}\n`;
}

async function writeOutput(path, contents) {
  if (!path) return;
  const destination = resolve(path);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, contents);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const registry = JSON.parse(await readFile(args.registry, "utf8"));
  const checks = [await checkAlgorithm(registry.algorithm)];
  if (args.mode === "full") {
    const sitemap = registry.sources.find((source) => source.kind === "sitemap");
    const otherSources = registry.sources.filter((source) => source !== sitemap);
    let sitemapUrls = new Set();
    if (sitemap) {
      try {
        const body = await fetchText(checkUrl(sitemap));
        const actual = sourceDigest(body);
        checks.push({
          id: sitemap.id,
          group: sitemap.group,
          surface: sitemap.surface,
          url: sitemap.url,
          critical: true,
          expected: sitemap.content_sha256,
          actual,
          status: !sitemap.content_sha256 ? "unbaselined" : actual === sitemap.content_sha256 ? "unchanged" : "changed",
        });
        sitemapUrls = new Set(body.match(/https:\/\/help\.x\.com\/en\/[A-Za-z0-9_?&=./%-]+/g) || []);
      } catch (error) {
        checks.push({
          id: sitemap.id,
          group: sitemap.group,
          surface: sitemap.surface,
          url: sitemap.url,
          critical: true,
          status: "warning",
          message: error.message,
        });
      }
    }
    checks.push(...await mapConcurrent(
      otherSources,
      args.concurrency,
      args.delay,
      (source) => checkOfficialSource(source, sitemapUrls),
    ));
  }
  const report = summarise(args.mode, checks);
  const markdown = renderMarkdown(report);
  await writeOutput(args.json, `${JSON.stringify(report, null, 2)}\n`);
  await writeOutput(args.markdown, markdown);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

if (resolve(process.argv[1] || "") === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`check-source-updates: ${error.message}`);
    process.exitCode = 1;
  });
}

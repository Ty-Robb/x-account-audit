import assert from "node:assert/strict";
import test from "node:test";
import { isRetrievalFailure, normaliseSource, renderMarkdown, sourceDigest } from "../scripts/check-source-updates.mjs";

test("source normalisation removes volatile reader headers", () => {
  const first = "Title: One\nURL Source: https://example.com\nPublished Time: today\nMarkdown Content:\n\nStable body with enough meaningful text ".repeat(5);
  const second = first.replace("Title: One", "Title: Two").replace("Published Time: today", "Published Time: tomorrow");
  assert.equal(sourceDigest(first), sourceDigest(second));
  assert.doesNotMatch(normaliseSource(first), /Published Time/);
});

test("challenge and short pages are retrieval failures", () => {
  assert.equal(isRetrievalFailure("Enable JavaScript and cookies to continue"), true);
  assert.equal(isRetrievalFailure("short"), true);
  assert.equal(isRetrievalFailure("Useful official content ".repeat(30)), false);
});

test("markdown report carries a deduplication marker", () => {
  const report = {
    status: "attention",
    checked_at: "2026-08-14T00:00:00.000Z",
    mode: "full",
    fingerprint: "abc123",
    counts: { changed: 1, unbaselined: 0, warnings: 0, inventory_only: 0, unchanged: 1 },
    changes: [{ id: "source", surface: "Source", url: "https://example.com", expected: "old", actual: "new" }],
    unbaselined: [],
    warnings: [],
    inventory_only: [],
  };
  const markdown = renderMarkdown(report);
  assert.match(markdown, /editorial review/);
  assert.match(markdown, /<!-- source-watch:abc123 -->/);
});

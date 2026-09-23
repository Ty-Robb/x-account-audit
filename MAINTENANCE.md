# Maintenance

This suite is designed to stay evidence-led as X changes. Automated checks detect change; a maintainer decides what the change means.

## Monitoring cadence

- **Daily at 07:17 UTC:** compare `xai-org/x-algorithm` `main` with the full commit pinned in `sources/registry.json`.
- **Weekly on Monday at 08:41 UTC:** repeat the algorithm check, hash retrievable official X Help sources, and verify every registered Help URL against X's official English sitemap.
- **On demand:** run the `Source watch` workflow in `full` or `algorithm` mode.

X Help can block automated content retrieval. Those pages are reported as `inventory-only` when their URL remains in the official sitemap. That verifies current existence, not unchanged wording. Review critical inventory-only pages manually whenever a related product claim is being published or revised.

## When a source issue opens

1. Open the linked official source and identify the actual change. A new hash is not, by itself, a strategic conclusion.
2. For an algorithm commit, inspect the diff from the pinned commit. Classify affected code by `Eligibility`, `Retrieval`, `Ranking`, `Slate`, `Visibility`, or `Abuse`.
3. Search the repository for the changed source, feature, coefficient, entitlement, or specification.
4. Update the smallest relevant reference or stage playbook. Preserve the evidence labels: `Published code`, `Official product guidance`, `Observed`, `Practice`, and `Unknown`.
5. Update `sources/registry.json` only after reviewing and accepting the new content. Pin algorithm links to the reviewed full commit.
6. Add or update an eval case when the change affects routing, output shape, a prohibited claim, or a stage gate.
7. Run `npm test`, `npm run validate`, and the complete installer smoke test.
8. Add a changelog entry. Release a patch for corrected facts, a minor version for compatible new coverage, or a major version for breaking skill/state contracts.
9. Close the source issue with the reviewed commit or explain why no guidance change was required.

Never update hashes merely to silence the monitor. Never automatically copy text from an official page into the skills.

## Weekly editorial review

Even when the monitor is clean:

- review open `source-update` issues;
- inspect the latest workflow report and its `inventory-only` list;
- manually spot-check any exact dimensions, upload limits, eligibility rules, Premium claims, analytics access, or automation policy used in current content;
- review new issues and pull requests for evidence corrections;
- run the tests on the default branch;
- record meaningful no-change or change decisions in the relevant issue or release notes.

## Adding coverage

Add a source when it materially affects organic account growth and is official, stable enough to cite, and mapped to a concrete workflow. Update all of:

1. `sources/registry.json`;
2. `skills/audit-x-account/references/x-surface-map.md`;
3. the relevant stage reference;
4. routing or output evals when applicable;
5. the changelog.

Paid advertising, private-message operations, developer API implementation, and general X support are outside the current suite. Add a dedicated skill before broadening into one of those domains; do not overload the audit router.

## Baseline procedure

Run:

```bash
node scripts/check-source-updates.mjs --mode full --json source-watch.json --markdown source-watch.md
```

For each `unbaselined` item, inspect the retrieved page and then copy its reported `actual` SHA-256 into the registry. A `null` hash deliberately selects inventory-only monitoring for a page that cannot be retrieved reliably; do not replace it with an unreviewed or unstable digest. Run the full check again. A healthy baseline has no changes, no unbaselined sources, and no critical warnings; inventory-only pages are an explicit limitation.

## Release procedure

1. Update `VERSION`, `package.json`, and `CHANGELOG.md` together.
2. Run `npm test` and `npm run validate`.
3. Verify full-suite and each individual skill installation locally.
4. Commit and push the reviewed change.
5. Create and push an annotated `vX.Y.Z` tag.
6. Confirm the release workflow publishes the archive and generated notes.

Do not release from a dirty or unreviewed working tree.

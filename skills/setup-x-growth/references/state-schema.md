# X growth workspace state

Use this reference when creating, reading, updating, or migrating `.x-growth/` account state.

## Principles

- Keep the state human-readable and editable without special software.
- Record observations and owner-supplied analytics separately from inference.
- Preserve dated decisions so a later agent can understand why the strategy changed.
- Use `Unknown` instead of filling gaps with plausible values.
- Store public professional evidence only unless the owner deliberately supplies private analytics.
- Keep secrets, credentials, cookies, direct-message content, and sensitive personal data out of the workspace.

## Files

### `workspace.json`

Machine-readable workspace identity:

- `schema_version` — integer migration boundary;
- `created_at` — ISO timestamp set once;
- `last_reviewed_at` — ISO timestamp updated after a meaningful review;
- `account_handle` — public handle or `Unknown`;
- `objective` — current primary objective;
- `current_stage` — `Day zero`, `Learning`, `Repeatability`, `Compounding`, or `Unknown`.

Preserve unknown keys when updating the file so later schema extensions are not destroyed.

### `account.md`

Single source of truth for strategy, positioning, conversion, capacity, and current stage. Update it only when evidence or the user's decision changes—not after every post.

### `ledger.csv`

One row per measured post. Preserve the header and leave unavailable fields blank. Use ISO dates and numeric counts without commas. Record the observation window explicitly.

Never compare rows with materially different windows as though they were equivalent. Keep public visible counts and owner-only metrics truthful.

### `experiments.md`

Track active questions and completed learning. Every experiment needs a control, one major changed variable, success evidence, guardrail, decision date, and final classification: `Retain`, `Revise`, `Stop`, or `Unresolved`.

### `series.md`

Track repeatable content mechanisms, not repeated wording. Maintain the evidence standard, variation grammar, outcome, audience quality, production cost, fatigue trigger, and status.

Use statuses `Candidate`, `Healthy`, `Watch`, `Revise`, and `Retire`.

### `decisions.md`

Record strategic choices with evidence, alternatives, tradeoffs, and a condition for reopening the decision. Append new entries rather than silently rewriting history. Mark superseded decisions accordingly.

### `reports/`

Store completed audit reports as `YYYY-MM-DD-handle-audit.md`. Use a descriptive suffix for comparisons, public teardowns, or multiple reports on the same date. Never overwrite a prior report.

Treat a report as a dated finding, not mutable live state. When new evidence materially changes the conclusion, add a dated addendum or create a new report and link the prior one. Discussion can reference stable finding IDs (`F1`, `F2`) and action IDs (`A1`, `A2`, `A3`).

## Stage access

- **Audit:** read all files; update stage only when the evidence supports it.
- **Day zero:** update account strategy; append launch posts to the ledger after publication.
- **Learning:** update the ledger and experiments; record retain/revise/stop decisions.
- **Repeatability:** update series, production decisions, and conversion changes.
- **Compounding:** update portfolio decisions, adjacency experiments, durable assets, partnerships, and regression triggers.

## Concurrency and integrity

Before writing, re-read the target file and preserve user edits. Make the smallest coherent change. Do not overwrite the workspace from a stale copy held in conversation context.

When a CSV field contains a comma, quote it according to CSV rules. Do not change the ledger schema without incrementing `schema_version` and documenting the migration in `decisions.md`.

## Completion check

A healthy workspace has:

- valid JSON in `workspace.json`;
- a writable `reports/` directory when persistent audits are used;
- the exact ledger header expected by the current schema;
- no unresolved template tokens such as `{{HANDLE}}`;
- a stage backed by evidence or explicitly marked `Unknown`;
- no secrets or unnecessary private data;
- a dated review point and a next action.

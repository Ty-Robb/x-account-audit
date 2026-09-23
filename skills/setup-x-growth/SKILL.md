---
name: setup-x-growth
description: Create or inspect the persistent local workspace used by the X account growth skill suite. Use when the user explicitly asks to set up ongoing account tracking, preserve an account strategy across sessions, initialise the post ledger, store experiments and series, or configure the suite for repeat use in a project directory. Preserve existing files and never require X credentials or an API key.
---

# Set Up an X Growth Workspace

Create a small, inspectable `.x-growth/` workspace so audits and stage playbooks can accumulate evidence instead of restarting every session.

## Inspect before writing

Resolve the intended workspace root. Default to the current project directory when it is clearly in scope. If no safe working directory is identifiable, ask where to create the workspace.

Check for an existing `.x-growth/` directory and read its files before proposing changes. Never overwrite existing records automatically.

## Load the state contract

Read [references/state-schema.md](references/state-schema.md) before creating, repairing, or interpreting the workspace.

## Initialise safely

Run the bundled initializer from this skill directory:

```bash
node scripts/init-workspace.mjs --root /absolute/path/to/project
```

Optionally pass known metadata:

```bash
node scripts/init-workspace.mjs --root /absolute/path/to/project --handle @example --goal "qualified audience growth"
```

The initializer creates missing files only. Treat `created` and `skipped` output as the completion check. Do not add a force-overwrite path.

## Configure the account

After initialisation, update `.x-growth/account.md` with user-confirmed information:

- public handle or profile URL;
- objective and intended audience;
- recurring promise and credible proof;
- constraints and preferred formats;
- current stage and evidence for that classification;
- profile, analytics, and publication-access notes.

Use `Unknown` rather than inventing missing values. Do not store passwords, cookies, API keys, private messages, private audience data, or sensitive personal information.

## Explain the operating loop

Tell the user which files were created or already existed and how the suite uses them:

- `account.md` — durable strategy and current stage;
- `ledger.csv` — comparable post-level evidence;
- `experiments.md` — hypotheses and retain/revise/stop decisions;
- `series.md` — repeatable pattern cards and fatigue status;
- `decisions.md` — dated strategic decisions and reversals;
- `workspace.json` — machine-readable schema and review metadata.
- `reports/` — dated audit reports and later addenda when the workspace is used for ongoing tracking.

Recommend `$audit-x-account` when the stage is unknown, then use the matching stage skill. Do not require persistent state for a one-off public audit.

## Finish with a check

Read every created file, confirm there are no unresolved template tokens other than intentional `Unknown` fields, and report the absolute workspace path. Never commit or publish account state without explicit user instruction.

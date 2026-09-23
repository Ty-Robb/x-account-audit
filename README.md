# X Account Growth Skills

[![CI](https://github.com/Ty-Robb/x-account-audit/actions/workflows/ci.yml/badge.svg)](https://github.com/Ty-Robb/x-account-audit/actions/workflows/ci.yml)
[![Source watch](https://github.com/Ty-Robb/x-account-audit/actions/workflows/source-watch.yml/badge.svg)](https://github.com/Ty-Robb/x-account-audit/actions/workflows/source-watch.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A free suite of AI-agent skills that turns a public X account into an evidence-based growth plan, then applies the right operating playbook for its current stage.

It audits the profile, recent posts, topic consistency, discovery inventory, likely engagement signals, and negative-feedback risks. It then recommends the highest-leverage changes and drafts the next 15 posts.

No signup. No API key. No tracking. No paid tier.

## The six skills

| Skill | Use it for |
| --- | --- |
| `$setup-x-growth` | Create an optional persistent workspace for strategy, post results, experiments, series, and decisions |
| `$audit-x-account` | Audit an account, identify the primary constraint, and select the correct stage |
| `$launch-x-account` | Build a Day-zero profile, positioning, first 15 posts, and launch measurement system |
| `$learn-x-account` | Run controlled content experiments before a dependable pattern exists |
| `$systemize-x-account` | Turn repeated winners into series, briefs, production, and conversion systems |
| `$compound-x-account` | Expand proven growth through adjacent audiences, durable assets, collaborations, and owned conversion |

Follower count alone does not select the stage. The suite uses content evidence, repeatability, audience quality, conversion, and production maturity.

## Install

```bash
npx skills@latest add Ty-Robb/x-account-audit
```

The installer will show the six available skills so you can install the full suite or only the workflow you need. To request one directly:

```bash
npx skills@latest add Ty-Robb/x-account-audit --skill launch-x-account
```

The install command needs Node.js/npm so `npx` is available. The skill itself has no runtime dependencies: no X API key, browser extension, Python environment, GPU, or local clone of X's algorithm repository is required.

## First run

The skills are explicit commands for your AI agent. They do not run automatically after installation or activate from ordinary conversation. Invoke one by typing its exact `$skill-name`:

```text
Use $audit-x-account to show me what it can do and help me choose the right analysis.
```

It will explain the available workflows, identify the account stage, and use the corresponding operating playbook when that stage skill is installed. The audit skill also contains a compact fallback method, so it still works independently. A public X handle and one growth goal are enough to begin; screenshots and analytics are optional.

For repeated use in one project, initialise the optional local workspace first:

```text
Use $setup-x-growth to create a persistent workspace for @example in this project.
```

The workspace keeps account strategy, a post ledger, experiments, repeatable series, and dated decisions in `.x-growth/`. It never stores X credentials and is not required for a one-off audit.

For an account you own, you can also supply analytics or an X Under the Hood report. Those increase confidence but are never required, and the published Under the Hood code does not make a full report available to fresh accounts.

## Skill command catalogue

| Invoke | Result |
| --- | --- |
| `$setup-x-growth` | Create or inspect optional persistent account records |
| `$audit-x-account` | Produce an account audit report, comparison, teardown, or focused answer |
| `$launch-x-account` | Build the Day-zero launch pack and first 15 posts |
| `$learn-x-account` | Design the next controlled learning cycle |
| `$systemize-x-account` | Turn repeated winners into series and a production system |
| `$compound-x-account` | Build the next compounding growth programme |

`npx skills@latest add Ty-Robb/x-account-audit` is the installation command. `$audit-x-account` and the other names are the installed AI-agent skills. Do not expect `/audit-x-account` or a terminal command to work unless a particular host independently converts installed skills into slash commands.

## Start directly

If you already know what you need, ask your agent:

```text
Use $audit-x-account to audit https://x.com/example for qualified follower growth.
```

For a new account:

```text
Use $launch-x-account to build a day-zero plan for this new X account. Start from 0 followers and give me the next 15 posts.
```

For an early account that needs evidence:

```text
Use $learn-x-account to design a controlled 15-post learning cycle from my recent results.
```

For an account with repeated winners:

```text
Use $systemize-x-account to turn my strongest patterns into repeatable series and a production system.
```

For an established account:

```text
Use $compound-x-account to choose the next compounding growth objective without diluting the audience.
```

For a public comparison:

```text
Use $audit-x-account to compare these three public X accounts and show the content patterns worth adapting without copying them.
```

## What it produces

- A dated, self-contained audit report for explicit account audits
- An optional responsive HTML report for visual previews and shareable audit files
- An audit score with an explicit confidence level when evidence is sufficient
- The account's single biggest growth constraint
- A profile and positioning rewrite
- Topic-coherence and original-post analysis
- Retrieval, ranking, visibility, and safety findings kept in their correct layers
- Three content pillars and a 30-day operating plan
- Fifteen concrete post briefs
- Stage-specific guidance for day zero, learning, repeatability, and compounding
- Post-craft, format, image, video, Article, and accessibility guidance with platform specifications separated from creative heuristics
- A measurement plan based on controllable signals
- A shareable summary for public teardowns

The score is a transparent audit heuristic. It is not an internal X score and does not claim to predict exact distribution.

Simple X questions receive direct answers rather than unnecessary reports. A full audit includes a `Start here` task, an owned first-sprint execution board, and the profile copy, content briefs, experiment card, or ledger needed to act. Its three outcomes use stable IDs so the user can discuss `A1`, `A2`, or `A3` without rerunning the audit. Extended post cycles, full post drafts, and later-stage programmes are added when requested.

Representative outputs are available for [setup](examples/setup.md), [audit handoff](examples/audit.md), [full HTML audit](examples/full-audit-report.html), [Day zero](examples/day-zero.md), [Learning](examples/learning.md), [Repeatability](examples/repeatability.md), and [Compounding](examples/compounding.md).

## X coverage

The suite covers the X surfaces that materially affect organic account growth: profiles and pins; originals, replies, quotes, reposts, threads, links, images, video, polls, Articles, Spaces, and Communities; Home, Search, Explore, Trends, notifications, conversations, account recommendations, and other discovery surfaces; analytics and creator tools; accessibility, recommendation eligibility, authenticity, duplicate content, automation, and safety.

The complete evidence and ownership map is in [x-surface-map.md](skills/audit-x-account/references/x-surface-map.md). Paid advertising, private-message operations, developer API implementation, and general platform support are intentionally out of scope.

## Why this is different

The method starts with X's published recommendation code, not recycled folklore. It separates:

1. what can be observed on the public account;
2. what the published code directly supports;
3. what remains a marketing inference;
4. what cannot be known from public data.

The code snapshot and interpretation are documented in [algorithm-signals.md](skills/audit-x-account/references/algorithm-signals.md). Runtime experiments and private systems can change behaviour, so the skill treats public defaults as evidence rather than promises.

## Why it exists

This is an open learning project by [Tyrone Robb](https://x.com/ty_auldric), who is building better marketing systems with AI. The goal is to make useful account analysis available to anyone and improve the method in public.

If the skill helps, share one useful before-and-after insight and tag [@ty_auldric](https://x.com/ty_auldric).

## Contributing

Issues and pull requests are welcome, especially for source corrections, clearer scoring rules, and anonymised examples. Please do not submit tactics based on manipulation, engagement pods, follow churn, harassment, or private data. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Staying current

The repository checks the published X algorithm daily and the complete official-source registry weekly. Detected changes create a deduplicated review issue; they never rewrite advice without human review. X Help pages that block automated content retrieval are still checked against the official sitemap and clearly reported as inventory-only.

The review and release process is documented in [MAINTENANCE.md](MAINTENANCE.md). Scheduled checks begin after these workflows are committed and pushed to GitHub.

## License

MIT

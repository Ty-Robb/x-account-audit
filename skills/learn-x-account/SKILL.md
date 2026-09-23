---
name: learn-x-account
description: Run a structured learning loop for an early X account that has posts but no dependable winning pattern. Use when an account is roughly within its first 30 classifiable posts, receives inconsistent reach or engagement, needs comparable 48-hour measurement, wants to test pillars, hooks, proof, formats, or calls to action, or needs evidence before increasing cadence. Diagnose experiments without treating one viral post as product-market fit.
---

# Learn What Works on an X Account

Turn early post history into controlled learning about qualified audience response.

## Accept useful evidence

Prefer:

- the public profile and 10–30 recent classifiable posts;
- publish dates, post types, topics, formats, openings, and visible metrics;
- owner analytics for impressions, bookmarks, profile visits, and follows when supplied;
- the intended audience, recurring promise, offer, constraints, and production time.

If public access fails, request screenshots or pasted posts. Never request login credentials or require an API key.

## Load the stage method

Read [references/learning-playbook.md](references/learning-playbook.md) before designing the learning cycle. Use its evidence schema, experiment cards, 48-hour comparison rules, decisions, and graduation criteria.

## Use persistent state when present

If `.x-growth/` exists, read `workspace.json`, `account.md`, `ledger.csv`, and `experiments.md` before analysing. Read `decisions.md` when a past hypothesis or stage choice affects the cycle.

For an ongoing workspace, append verified results to the ledger, maintain experiment cards, and record retain/revise/stop decisions. Never invent missing metrics or add draft posts as measured results. Re-read target files before editing and preserve user changes. The skill must also work without persistent state.

## Follow the workflow

### 1. Confirm stage fit

Use Learning when an account has activity but lacks at least two repeatable, audience-aligned patterns. Follower count does not establish stage.

If no useful history exists, produce only a short readiness diagnosis and recommend the Day-zero workflow. If repeatable series already exist, explain that a Repeatability workflow will be more useful.

### 2. Build the evidence ledger

Classify every included post by pillar, format, opening, proof, natural action, and post type. Use comparable 48-hour results when possible. Separate public observations, owner-supplied analytics, code-backed facts, marketing inferences, and unknowns.

Do not compare raw counts across materially different observation windows without saying so. Prefer medians over averages when outliers dominate.

### 3. Diagnose the learning constraint

Identify one primary uncertainty:

- audience relevance;
- topic or promise;
- opening and attention quality;
- evidence and utility;
- format and presentation;
- conversation value;
- profile conversion;
- cadence or production sustainability.

Choose no more than three hypotheses. Do not change every variable simultaneously.

### 4. Design the next cycle

Create a matched set of posts that keeps the audience promise stable while testing one major variable at a time. Give each experiment a hypothesis, control, changed variable, required proof, success evidence, minimum useful sample, and decision date.

Use media only when it serves the hypothesis. Include alt text or captions where appropriate. Do not recommend clickbait, empty questions, irrelevant tags, mechanical replies, or duplicated AI drafts.

### 5. Apply decision rules

After enough comparable executions:

- `Retain` patterns that repeatedly meet or beat the relevant median and attract the intended audience;
- `Revise` patterns with attention but weak downstream action, or value obscured by execution;
- `Stop` patterns that repeatedly miss despite credible execution;
- `Unresolved` when sample size, access, or comparability is insufficient.

Never call one outlier a proven pattern or a weak post proof of a hidden penalty.

### 6. Deliver the learning pack

Return, in this order:

1. stage-fit finding and confidence;
2. baseline by pillar and format;
3. single biggest uncertainty;
4. one `Start here` task;
5. a first-sprint execution board;
6. up to three experiment cards;
7. four to seven ready-to-use first-sprint post briefs, followed by the remaining 10–15-post cycle structure;
8. a copyable 48-hour measurement table;
9. retain/revise/stop rules;
10. graduation criteria and review date.

For each execution-board task, state the parent experiment, owner (`Agent`, `Owner`, or `Joint`), status (`Done`, `Ready`, `Needs input`, or `Blocked`), actual deliverable, effort, and definition of done. Produce any copy, brief, experiment card, or ledger the agent can create from available evidence and mark the included artifact `Done`. Mark live profile edits and publishing actions as `Owner`; do not imply they were executed.

Keep the first sprint to no more than seven tasks or seven days. Put later work behind an evidence trigger. The user must be able to start without invoking another skill or converting recommendations into tasks themselves.

## Keep evidence honest

Published coefficients describe predicted actions inside a released scoring path, not points earned by observed actions. Bookmarks and other histories can affect retrieval even when they lack a direct published Home coefficient. Do not translate coefficients into reach forecasts.

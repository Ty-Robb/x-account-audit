---
name: audit-x-account
description: Audit, diagnose, compare, or answer evidence-led questions about public X (formerly Twitter) accounts using observable evidence and X's published recommendation systems. Produce a structured audit report when the user explicitly asks to audit, review, compare, or create a teardown; do not generate a full report for simple X questions, capability guidance, or discussion of an existing report. Use for comprehensive account reviews, focused growth diagnoses, public competitor comparisons, publishable teardowns, evidence-based stage classification, or choosing the correct X growth workflow. Route stage execution to the matching stage skill.
---

# Audit an X Account

Produce a useful, evidence-led account audit without pretending to know X's private runtime state or an exact ranking score.

## Guide first-time users

Enter guidance mode when the user invokes the skill without a target account, asks what it can do, or asks how to use it. Do not browse, load the audit references, or begin scoring yet.

Briefly introduce these workflows:

1. **Full account audit** — diagnose the profile, recent content, main constraint, and next three priorities.
2. **Focused diagnosis** — investigate a specific problem such as low reach, weak conversion, unclear topics, or inconsistent content.
3. **Public account comparison** — compare up to three accounts using the same evidence window and extract adaptable patterns.
4. **Publishable teardown** — turn an audit into a concise, sourced article or X post without exposing private analytics.
5. **Stage execution** — route a Day-zero, Learning, Repeatability, or Compounding account to its dedicated playbook.
6. **Ongoing workspace** — explicitly use `$setup-x-growth` when the user wants strategy and results carried across sessions.

Explain that a public handle or URL plus one goal is enough to start. Mention that screenshots, analytics, or the owner's Under the Hood report improve confidence but are optional. State that the skill needs no X API key or separate runtime. Then ask for the handle or URL and the goal in one short question.

Offer copyable examples when helpful:

```text
Use $audit-x-account to audit https://x.com/example for qualified follower growth.
Use $audit-x-account to compare @account1 and @account2 for [audience].
Use $audit-x-account to explain why my recent posts are not converting profile visits into follows.
Use $launch-x-account to build a day-zero plan for my new account about [topic].
Use $setup-x-growth to track my account strategy and experiments in this project.
```

After the user chooses a mode or supplies a target, leave guidance mode and follow the audit workflow.

## Select the response mode

Choose the response contract before collecting evidence:

- **Answer mode:** for a simple X question, capability question, specification check, or narrow explanation. Answer directly with the relevant evidence boundary. Do not score the account, generate an audit report, or append an action plan unless the user asks.
- **Focused diagnosis:** for one specific account problem. Return a concise finding, evidence, limitation, and up to three next actions. Do not expand it into the full report unless the user asks for an audit or the question genuinely requires the complete account context.
- **Audit report mode:** for an explicit audit, comprehensive review, comparison, or teardown. Produce the complete, self-contained report from [references/report-template.md](references/report-template.md).
- **Report discussion mode:** when the user asks about a report already produced. Treat that report as the shared source of truth, refer to its section names and action IDs, and answer or expand only the requested point. Do not rerun the audit or regenerate the report unless material new evidence arrives or the user explicitly asks.

If intent is ambiguous but the user used the word `audit`, choose Audit report mode. Otherwise prefer the smallest response that answers the request.

## Start with the objective

Use the user's stated objective. If none is given, default to **qualified audience growth**: attract people who are likely to value the account's work, not the largest possible follower count.

Accept any useful combination of:

- a public X profile URL or handle;
- screenshots of the profile, posts, or analytics;
- an owner-supplied X Under the Hood report or screenshot, when eligible;
- pasted posts or an export;
- the intended audience, offer, and constraints.

Do not pause for clarification when the URL and objective are sufficient. State reasonable assumptions. If public access fails, ask for a profile screenshot and at least 10 recent posts rather than bypassing access controls or requiring login credentials.

## Load the method

Read these references before scoring:

- [references/algorithm-signals.md](references/algorithm-signals.md) for code-backed claims and their limits.
- [references/audit-rubric.md](references/audit-rubric.md) for evidence collection, scoring, confidence, and safety rules.

Read [references/report-template.md](references/report-template.md) only in Audit report mode or when the user asks to export or revise an existing report. When the requested deliverable is HTML, a visual report, or a browser preview, also use [assets/audit-report-template.html](assets/audit-report-template.html) as the presentation template.

Read [references/content-playbook.md](references/content-playbook.md) when the user asks for a day-zero plan, stage-specific advice, post drafts or rewrites, format or cadence choices, image or video guidance, profile assets, Articles, or the next 15 posts. Recheck its linked X Help sources when exact upload specifications matter.

Read [references/x-surface-map.md](references/x-surface-map.md) when the request concerns a particular X surface, feature, policy, or claim about what the suite covers.

When the corresponding stage skill is installed, use it for the full operating plan after classification:

- `$launch-x-account` for Day zero;
- `$learn-x-account` for Learning;
- `$systemize-x-account` for Repeatability;
- `$compound-x-account` for Compounding.

Do not require a stage skill to complete an audit. The bundled content playbook remains the fallback when only `$audit-x-account` is installed.

## Use persistent state when present

If the current project contains `.x-growth/`, read `.x-growth/workspace.json` and `.x-growth/account.md` before auditing. Read the ledger, experiments, series, and decisions only when relevant. Treat their contents as owner-supplied evidence, not platform truth.

After a meaningful audit, update the recorded stage, review date, and decisions only when the user is using the workspace for ongoing tracking. Re-read each target file immediately before editing, preserve unknown fields and user changes, and follow the schema installed by `$setup-x-growth`. A one-off public audit must still work without persistent state.

## Follow the audit workflow

### 1. Collect public evidence

Use available public browsing tools. Capture the date and record only what is visible. Gather, when available:

- name, handle, bio, banner, avatar, link, pinned post, follower and following counts;
- at least 10 recent posts, preferably 20–30;
- post type: original, quote, reply, repost, or community-only when observable;
- visible impressions and engagement counts, including bookmarks when owner analytics expose them;
- recurring topics, formats, hooks, claims, proof, and calls to action.

If the owner supplies an Under the Hood report, record its reporting period, eligibility checks, post labels, account labels, and stated effects. Never request credentials or attempt to retrieve an owner-only report for somebody else.

For another person's account, use public professional and content signals only. Do not infer protected or sensitive traits, private motivations, mental state, or hidden platform labels.

### 2. Build an evidence ledger

Classify every important finding as:

- **Observed** — directly visible in supplied or public data.
- **Code-backed** — directly supported by the published code snapshot.
- **Inference** — a marketing interpretation joining observations to code.
- **Unknown** — cannot be established with the available data.

Never turn an inference into a statement of platform fact.

For each code-backed finding, identify the affected layer: `Eligibility`, `Retrieval`, `Ranking`, `Slate`, or `Visibility`. Do not use a ranking coefficient to explain an eligibility or retrieval failure.

### 3. Analyse six dimensions

Use the rubric to assess:

1. profile conversion;
2. topic coherence;
3. discovery inventory;
4. predicted-action potential;
5. semantic variety;
6. trust and negative-feedback risk.

Treat the banner, avatar, link, and pinned post primarily as human conversion surfaces. Do not claim the published post-embedding renderer reads the banner.

### 4. Select the account stage

Classify the account as `Day zero`, `Learning`, `Repeatability`, or `Compounding` using the content playbook. Base the stage on the available evidence and repeatability of useful outcomes, not follower count alone. State the evidence used and lower confidence when analytics are missing.

### 5. Score transparently

Calculate the 100-point audit score only when enough evidence exists. Show the category points and confidence level. Call it an **audit score**, never an algorithm score.

If evidence is too thin, omit the total and use `Strong`, `Mixed`, `Weak`, or `Unknown` for each dimension. Never award assumed points for missing data.

### 6. Identify the constraint

State the single most consequential constraint in one sentence. Prioritise no more than three changes using impact, confidence, and effort. Prefer changes the account can execute immediately.

Translate every material recommendation into an observable account change. A recommendation is incomplete when it says only what should improve without showing what the owner should edit, publish, stop, test, or measure.

### 7. Build the cleanup and content registers

Before writing the three priorities, turn the diagnosis into two compact implementation registers when relevant:

- **Account cleanup:** classify each affected profile surface, recurring behaviour, or specific public post as `Keep`, `Change`, `Reframe`, or `Stop`. Name the target, give the exact change, and state what acceptable completion looks like. Do not recommend mass-deleting historical posts merely to manufacture topic coherence. Recommend deletion only for a specific trust, safety, accuracy, legal, or deliberate brand reason and leave the decision to the owner.
- **Content direction:** when content is part of the constraint, define no more than three connected pillars. For each, specify the intended audience problem, recurring promise, suitable post types, required proof, useful formats, and what does not belong. Include four to seven first-sprint briefs covering the recommended pillars so `publish more about X` cannot pass as a strategy.

If a profile change is recommended, provide usable replacement copy or a sufficiently concrete fill-in-the-blank draft for the bio, banner, link destination, and pinned post components that need changing. Never manufacture credentials, results, customers, or proof.

### 8. Build execution-ready audit actions

For a full audit, define exactly three outcomes labelled `A1`, `A2`, and `A3`, then convert them into a short execution board. The user should not need to interpret the report or invoke another skill to begin the first sprint.

Lead the action section with one `Start here` task. Sort the remaining tasks into `Now`, `Next`, and `Later only if`. For every task state:

- its parent action `A1`, `A2`, or `A3` and the evidence it addresses;
- the next physical action, not a category of work;
- the owner: `Agent`, `Owner`, or `Joint`;
- the status: `Done`, `Ready`, `Needs input`, or `Blocked`;
- the actual deliverable;
- realistic effort or timing;
- an observable definition of done.

Apply an artifact-first rule. When the agent can produce the copy, brief, checklist, experiment card, template, or ledger in the response or authorised workspace, produce it now instead of assigning the user to draft it. When an action requires the X account owner to edit the live profile, publish, pin, unpin, or delete, mark it `Owner`, supply the exact material, and do not imply it has been executed.

Keep the first sprint bounded—normally no more than seven tasks or seven days. Put conditional work under `Later only if` with the evidence that would trigger it. Do not turn every observation into a task.

When recommending an experiment, specify the control, changed variable, minimum useful sample, observation window, success evidence, and retain/revise/stop rule. When recommending content, specify the actual post types and proof sources rather than only a topic label.

Keep actions discussable, but do not use the stage handoff as a substitute for implementation detail. Do not bury the primary constraint inside a long content calendar.

### 9. Route the operating plan

Use the matching stage skill for the extended operating cycle when it is installed. Give that skill the audit evidence, objective, stage classification, confidence, primary constraint, action board, ready-to-use outputs, and relevant workspace state.

If the dedicated stage skill is unavailable, use the compact content playbook to complete the requested plan without implying that the fallback is the full stage system.

### 10. Add extended execution only when requested

Every audit report must include enough exact implementation detail to complete the first sprint for A1–A3, including relevant cleanup decisions, content types, and ready-to-use outputs. Do not automatically attach 15 fully drafted posts, a generic 30-day calendar, or a complete stage playbook. Those extended deliverables should follow agreement on the diagnosis or an explicit request.

When the user explicitly requested drafts, content architecture, or an execution plan as part of the same task, place it after the core audit report as an **Execution appendix**. Prefer the matching stage skill. Define three recognisable content pillars and draft or brief the requested original or quote posts across those pillars. Make every post useful on its own and vary angle, evidence, and format.

Adapt the plan to the selected stage. Use media because it adds proof, explanation, emotion, or demonstration—not because every post supposedly needs an image. When specifying assets, distinguish official platform specifications from practical working templates and test hypotheses. Include alt-text or caption guidance where relevant.

Optimise for honest reasons someone might reply, share, quote, or follow. Do not recommend engagement bait, coordinated engagement, follow churn, repetitive reply farming, impersonation, or automated spam.

For a zero-follower account, emphasise original discovery inventory, legible positioning, repeatable topics, authentic relevant conversations, and fast learning. Explain that the released cold-start rule is based on small-author status rather than account age, creates an opportunity rather than guaranteed reach, and can act only after a post reaches a candidate set. Treat the first authentic favourite as an indexing boundary, not a distribution promise.

When drafting posts or replies, vary the language, evidence, and cadence. Reject mechanically similar drafts, generic AI filler, duplicate replies, and volume targets that would reduce specificity.

### 11. Deliver and preserve the report

In Audit report mode, use the complete report template. Lead with the verdict, primary constraint, and action IDs—not a long explanation of the algorithm. Give the report a stable title and audit date so later messages can refer to it.

When the user requests HTML, a visual report, a browser preview, or a shareable report file, render the completed audit with `assets/audit-report-template.html`:

1. Complete the evidence-led audit before styling it. The HTML is a presentation layer for the same report, not permission to invent a second diagnosis.
2. Copy the asset to the authorised output location; never overwrite the bundled template.
3. Replace every worked-example fact, date, count, finding, recommendation, action, post brief, profile draft, link, and identity. The example account is not a default.
4. Preserve the decision-first hierarchy: report identity, verdict, evidence, assessment, findings, cleanup, content direction, action plan, ready-to-use outputs, and measurement.
5. Keep `Not scored`, the confidence label, source boundaries, and limitations prominent whenever evidence is below the rubric threshold.
6. Omit irrelevant rows and cards rather than padding the page. Add only evidence-supported rows or explicitly labelled unknowns.
7. Verify the rendered file at desktop and mobile widths. Check page-level horizontal overflow, clipped headings, unreadable tables, broken anchors, contrast, and print behaviour.
8. Return the report path and keep `A1`, `A2`, and `A3` identical between the conversational report, Markdown file, and HTML file.

Do not create a standalone HTML artifact for Answer mode, Focused diagnosis, or Report discussion mode unless the user explicitly asks to render an existing full audit. When a `.x-growth/` workspace is in use and HTML was requested, save the Markdown and HTML versions with the same dated stem. Without a workspace, create a file only when the user requested an artifact or provided an output location.

If an existing `.x-growth/` workspace is in use, save the report under `.x-growth/reports/YYYY-MM-DD-handle-audit.md` and return its path. Create the `reports/` directory if missing. Never overwrite an existing report; add a descriptive suffix when necessary. If no workspace exists, deliver the complete report in the response without creating persistent state automatically.

End the report by inviting the user to discuss `A1`, `A2`, or `A3`, change an assumption, or provide missing evidence. In follow-up messages, preserve the original report and record material revisions as an addendum rather than silently changing the historical finding.

For an external or shareable report, include the methodology footer from the template. Omit it from private working notes when the user asks.

## Apply hard limits

Do not:

- diagnose a shadowban or hidden account penalty from public performance;
- promise virality, impressions, ranking position, or follower growth;
- present configuration defaults as immutable production weights;
- confuse correlation with a platform rule;
- expose private information or recommend deceptive behaviour;
- copy another creator's wording or identity.

When comparing accounts, extract adaptable patterns and explain why they may work. Do not create a leaderboard of personal worth.

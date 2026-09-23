# X account Learning playbook

Use this playbook to replace early-stage guessing with comparable evidence and controlled content experiments.

Algorithm references pin `xai-org/x-algorithm` commit `a389166`.

## Contents

1. Stage contract
2. Evidence ledger
3. Establish the baseline
4. Diagnose the uncertainty
5. Design experiment cards
6. Build the next content cycle
7. Interpret outcomes
8. Measurement and review cadence
9. Graduation criteria
10. Failure modes
11. Deliverable template

## 1. Stage contract

### Enter Learning when

- the account has classifiable posts but no dependable, repeatable winner;
- reach, audience response, or conversion varies without a clear explanation;
- the creator needs to validate audience, pillars, proof, openings, or formats;
- a repositioned account has completed a Day-zero cycle but not established a baseline.

Roughly 1–30 recent posts is a useful starting description, not a rule. A larger account can return to Learning after a major change.

### Leave Learning when

- at least two patterns have worked across multiple comparable executions;
- those patterns attract the intended audience and an appropriate downstream action;
- the creator can reproduce them without copying the same wording;
- the next constraint is systemisation rather than basic uncertainty.

## 2. Evidence ledger

Collect 10–30 recent posts when available. For each, record:

| Field | Examples |
| --- | --- |
| Context | Date, URL, observation window, relevant event |
| Inventory | Original, substantive quote, reply, repost, community-only |
| Pillar | One of the account's connected subjects |
| Audience job | Teach, demonstrate, interpret, challenge, connect, convert |
| Opening | Result, claim, tension, observation, question, story |
| Proof | Example, data, screenshot, process, source, experience, none |
| Format | Text, single image, multi-image, video, thread, Article |
| Natural action | Save, share, substantive reply, quote, follow, destination action |
| Outcome | Impressions and visible or supplied actions |
| Audience quality | Relevant people, useful responses, unknown |
| Production | Time, difficulty, dependencies when known |

Label each important conclusion:

- `Observed` for visible or owner-supplied evidence;
- `Code-backed` for a fact in the pinned source;
- `Inference` for a marketing interpretation;
- `Unknown` when evidence cannot establish it.

## 3. Establish the baseline

Use a consistent 48-hour observation window where possible. The released Home pipeline defines a 48-hour maximum post age, but other surfaces and evergreen media can behave differently. See [Home age configuration](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/config.rs#L34-L40).

Calculate or describe:

- median impressions per comparable post;
- median actions by pillar and format;
- profile visits and follows when owner analytics provide them;
- audience-quality observations;
- original/quote discovery inventory;
- production cost and sustainability.

Prefer medians because one outlier can make an average misleading. Do not combine different observation windows silently. When impressions are unavailable, compare visible actions cautiously and lower confidence.

## 4. Diagnose the uncertainty

Choose the earliest unresolved constraint:

1. **Audience:** Is the intended person reacting?
2. **Promise:** Does the topic solve a recognisable problem?
3. **Inventory:** Are there enough stand-alone originals or substantive quotes?
4. **Opening:** Does the first line communicate a reason to continue?
5. **Proof:** Does the post earn trust and utility?
6. **Format:** Is the idea expressed in the right medium?
7. **Conversation:** Does it invite meaningful participation?
8. **Conversion:** Does the profile fulfil the post's promise?
9. **Sustainability:** Can the creator repeat the quality?

Test one major uncertainty before optimising downstream details.

## 5. Design experiment cards

Use this structure:

| Field | Requirement |
| --- | --- |
| Question | One uncertainty the cycle can reduce |
| Hypothesis | What should improve, for whom, and why |
| Control | What remains stable across the comparison |
| Variable | One major change: topic, opening, proof, format, or natural action |
| Executions | Enough comparable posts to avoid deciding from one outlier |
| Success evidence | Specific quantitative and qualitative evidence |
| Guardrail | Trust, audience quality, production time, or negative feedback |
| Decision date | After a consistent observation window |

Do not assign fake statistical significance to small samples. The goal is disciplined directional learning.

### Useful early experiments

- same pillar and proof, different opening;
- same idea and opening, text versus evidence-rich image;
- same format, abstract advice versus a concrete example;
- same topic, beginner versus advanced audience framing;
- same useful post, with and without an earned profile promise;
- original analysis versus substantive quote application.

Do not test a link-placement hack, hashtag quota, or posting-time superstition unless the account has a clear reason and can measure it.

## 6. Build the next content cycle

Create 10–15 posts with a deliberate split:

- enough controlled posts to compare the chosen variable;
- enough pillar coverage to maintain account coherence;
- a small number of clearly labelled exploratory posts;
- relationship replies kept outside broad discovery inventory.

For each post include pillar, hypothesis, controlled elements, changed variable, required proof, format, natural action, and measurement date.

Use images for proof, diagrams, comparisons, screenshots, or demonstrations. Add concise alt text; caption speech in video. Do not attach media solely because media is assumed to rank better.

## 7. Interpret outcomes

### Retain

Retain when a pattern repeatedly meets or exceeds the relevant account median, attracts the intended people, supports the account promise, and remains feasible to produce.

### Revise

Revise when:

- impressions are healthy but saves, shares, substantive replies, or follows are weak;
- readers value the idea but misunderstand the framing;
- the proof is strong but the opening or format obscures it;
- outcomes are useful but production cost is unsustainable.

### Stop

Stop when several credible, comparable executions underperform and qualitative evidence does not reveal a correctable issue.

### Unresolved

Use `Unresolved` when the sample is too small, windows differ, metrics are hidden, a major event distorted distribution, or several variables changed together.

## 8. Measurement and review cadence

Review posts at 48 hours for comparable Home-oriented learning, then preserve later outcomes separately for evergreen content.

Track actions individually rather than inventing an “algorithm score.” Published direct ranking coefficients are weights on predicted probabilities inside one scoring path; observed actions are not points awarded to a post. See [weight application](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/ranking_scorer.rs#L431-L510).

Bookmarks, favourites, replies, reposts, shares, original posts, photo expands, and qualified video views can enter recent viewer-signal hydration. A bookmark can matter to future retrieval context without having a direct published Home coefficient. See [explicit signals](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/query_hydrators/explicit_engagement_signals_query_hydrator.rs#L68-L111).

Use a weekly review to classify completed experiments and a longer review after 10–15 posts to update pillars or stage.

## 9. Graduation criteria

Move to Repeatability when all are true:

- two or more patterns have at least several comparable executions;
- their typical outcome beats the relevant account baseline;
- qualitative evidence suggests the intended audience values them;
- the profile and recurring promise convert that attention coherently;
- the creator can reproduce the mechanism with new examples and language.

Return to Day zero when the audience, promise, or proof remains fundamentally incoherent.

## 10. Failure modes

- **One-post certainty:** one viral or weak post determines the strategy.
- **Changing everything:** topic, format, opening, proof, and cadence all change together.
- **Vanity-only learning:** impressions rise while audience fit and conversion stay unknown.
- **Average distortion:** one outlier hides the typical result.
- **Unequal windows:** a two-hour post is compared with a seven-day post.
- **Format theatre:** media changes without a hypothesis about audience comprehension.
- **Premature scaling:** volume rises before useful patterns exist.
- **AI sameness:** controlled tests accidentally become duplicate posts.
- **Hidden-label diagnosis:** low reach is called a shadowban without owner evidence.

## 11. Deliverable template

Return:

1. **Stage fit and evidence confidence**
2. **Evidence ledger and baseline**
3. **Primary uncertainty**
4. **Start here** — one next physical action, owner, and effort
5. **First-sprint execution board** — no more than seven tasks with owner, status, deliverable, effort, and definition of done
6. **Up to three experiment cards**
7. **Ready-to-use outputs** — four to seven first-sprint post briefs plus any profile copy, creative brief, or ledger the evidence supports
8. **Remaining 10–15-post cycle structure**
9. **48-hour measurement table**
10. **Retain/revise/stop/unresolved decisions**
11. **Graduation criteria and review date**

Use `Agent`, `Owner`, or `Joint` ownership and `Done`, `Ready`, `Needs input`, or `Blocked` status. Produce artifacts instead of assigning their creation when enough evidence exists, and mark included artifacts `Done`. Put later work behind a stated evidence trigger.

Keep platform facts, code-backed facts, observations, and marketing inference distinct.

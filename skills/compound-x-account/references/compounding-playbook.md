# X account Compounding playbook

Use this playbook to expand a proven X account through adjacent audiences, durable assets, collaborations, and conversion without sacrificing coherence or trust.

Algorithm references pin `xai-org/x-algorithm` commit `a389166`. Platform specifications checked 14 August 2026 where stated.

## Contents

1. Stage contract
2. Choose the compounding objective
3. Map the portfolio
4. Use the adjacency ladder
5. Create durable assets and format systems
6. Design collaborations
7. Build conversion and owned leverage
8. Protect trust and resilience
9. Measure compounding quality
10. Regression triggers
11. Failure modes
12. Deliverable template

## 1. Stage contract

### Enter Compounding when

- at least two series remain repeatable across several review cycles;
- typical results and audience quality are understood;
- profile or destination conversion is dependable enough to diagnose;
- production can support core work plus bounded exploration;
- the next opportunity is leverage, adjacency, authority, or resilience.

Do not use follower count, Premium status, posting volume, or a single viral post as the gate.

### Stage objective

Create growth that leaves behind a stronger asset: a recognisable body of work, returning audience, trusted relationships, research, tools, subscriber base, customer path, or repeatable distribution system.

## 2. Choose the compounding objective

Pick one primary objective for each cycle:

| Objective | Use when | Evidence of progress |
| --- | --- | --- |
| Authority depth | The account wins with useful ideas but lacks a durable body of work | Citations, saves, qualified inbound, returning discussion |
| Audience adjacency | Core audience fit is strong and a nearby problem is credible | New relevant audience without core-series decline |
| Owned conversion | Reach is reliable but dependence on X is high | Qualified destination visits, subscriptions, enquiries, activation |
| Collaboration network | Complementary creators or experts can add proof and reach | Relevant shared audience and durable relationships |
| Format leverage | A deeper medium can explain or demonstrate more effectively | Series-level performance and sustainable production |
| Community depth | Returning participants create value for one another | Repeat participation, useful peer exchange, low moderation risk |

Do not pursue all objectives in the same cycle. State the tradeoff created by the chosen priority.

## 3. Map the portfolio

Inventory the current system:

- proven franchises and their audience jobs;
- adjacent topics and formats already tested;
- experimental ideas and their hypotheses;
- relationship and collaboration content;
- durable assets such as Articles, videos, research, tools, newsletters, or events;
- promotional inventory and conversion destinations.

For each item, record typical outcome, audience quality, production cost, conversion role, dependency, and fatigue signal.

Build a capacity-based allocation across:

- **Core:** proven franchises that uphold the account promise.
- **Adjacent:** one-step expansions with a clear link to core value.
- **Frontier:** bounded high-upside experiments.
- **Relationship:** substantive replies, quotes, interviews, and collaborations.
- **Durable:** assets that keep providing value beyond one feed window.

Do not use a universal percentage. A solo operator and a media team have different safe portfolios.

## 4. Use the adjacency ladder

Expand one rung at a time:

1. same audience, adjacent problem;
2. same problem, adjacent audience;
3. same promise, new format;
4. same evidence, deeper level of sophistication;
5. broader category or new distribution relationship.

For every adjacency define:

- why the current audience should care;
- the creator's credible right to participate;
- what remains recognisable;
- what new evidence is required;
- the core metric and audience-quality guardrail;
- the condition for stopping or moving to the next rung.

Expanding several rungs at once makes dilution difficult to diagnose.

## 5. Create durable assets and format systems

Choose the asset from the audience job:

| Asset | Best use | Feed support |
| --- | --- | --- |
| Article | Structured, durable argument or guide with embedded evidence | Insight excerpts, counterpoints, examples, and updates |
| Video | Demonstration, narrative, process, or personality | Clips with stand-alone lessons and accurate captions |
| Research | Original evidence or synthesis | Findings, charts, methodology, limitations, applications |
| Tool or template | Repeatable audience utility | Use cases, demonstrations, changes, and user learning |
| Event or Space | Live expertise and relationship depth | Agenda, key questions, highlights, follow-up resources |
| Newsletter or site | Owned continuity and conversion | Stand-alone feed value linked to a relevant deeper destination |

Build a release arc:

1. surface the audience question;
2. publish useful precursor insights;
3. release the durable asset;
4. answer early objections and applications;
5. repurpose through materially different examples or formats;
6. update the asset when new evidence appears.

Do not turn the feed into repeated links. The examined published scorer does not establish a universal “link in reply” advantage, so choose link placement for clarity and user experience.

X currently limits Article publishing to eligible Premium and Premium+ subscribers, Premium Businesses, and Premium Organizations. Its Article guidance recommends a clear purpose, specific title, strong opening, skimmable structure, evidence, visuals, and a decisive close. See [About Articles](https://help.x.com/en/using-x/articles).

## 6. Design collaborations

Select a collaborator only when all are true:

- audience overlap or adjacency is relevant;
- each party adds different proof, access, or perspective;
- the collaboration creates stand-alone value;
- claims and responsibilities are clear;
- the relationship remains useful without reciprocal engagement pressure.

Useful formats include joint analysis, interviews, debates with clear premises, shared research, case studies, tools, Spaces, and complementary tutorials.

Reject engagement pods, coordinated likes/reposts, irrelevant tagging, identity borrowing, or a collaboration chosen solely for follower count.

The published scorer applies a positive-score discount to out-of-network candidates and contains a mutual-follow treatment for qualifying original posts. These facts support building real relevance and relationships; they do not justify follow churn or reciprocal engagement schemes. See [out-of-network defaults](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/param.rs#L246-L270) and [mutual-follow eligibility](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/ranking_scorer.rs#L175-L193).

## 7. Build conversion and owned leverage

Map:

`Feed value → profile promise → pinned proof → destination promise → activation`

For each transition measure what is available and identify the largest leak. Use one primary next action per campaign or asset.

Keep promotional posts useful without the click. Match destination language to the post that earned attention. Protect user trust with clear claims, working links, transparent affiliation, and appropriate privacy expectations.

Do not present owned conversion as a direct X ranking factor.

## 8. Protect trust and resilience

Audit:

- claim sources, dates, assumptions, and limitations;
- generated media or text for authenticity and disclosure where relevant;
- accessible images, accurate captions, and readable charts;
- linked, quoted, parent, or reposted content for safety and context;
- hostile, misleading, or bait-and-switch patterns likely to create negative feedback;
- dependence on one series, collaborator, production person, or platform feature;
- capacity to respond to mistakes and update durable assets.

The released Home visibility path can evaluate the primary post and ancillary quoted, parent, or repost content. A wrapper can be removed when an ancillary item receives a drop verdict. See [ancillary checks](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/candidate_hydrators/vf_candidate_hydrator.rs#L69-L84) and [drop logic](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/candidate_hydrators/vf_candidate_hydrator.rs#L139-L168).

Do not infer hidden labels from reach. Use an owner-supplied report only when available and eligible.

## 9. Measure compounding quality

Track four groups:

### Core health

- series median and hit rate;
- intended-audience response;
- fatigue or decline;
- production cost and bottlenecks.

### Expansion quality

- relevant new audience participation;
- core audience retention during adjacency tests;
- new-format sustainability;
- collaboration quality rather than partner size alone.

### Durable leverage

- returning engagement;
- saves, citations, inbound requests, repeat visits, or asset reuse;
- owned subscriptions, enquiries, or activation when available;
- proportion of outcomes dependent on one post or partner.

### Trust guardrails

- negative feedback where owner analytics expose it;
- corrections, source quality, and claim failures;
- accessibility and moderation load;
- unsafe-link or partner concerns.

Use medians, trends, and concentration measures. Do not let total impressions conceal decay in audience quality or conversion.

## 10. Regression triggers

Return a part of the strategy to Repeatability when:

- a core series weakens across several credible executions;
- production quality or proof cannot sustain the portfolio;
- conversion breaks despite healthy attention;
- a new format remains promising but inconsistent.

Return an adjacency to Learning when:

- audience fit is unknown;
- several variables changed together;
- the experiment lacks a comparable baseline;
- high reach brings the wrong audience.

Regression is a diagnostic loop, not failure.

## 11. Failure modes

- **Expansion by follower count:** large adjacent accounts replace audience relevance.
- **Format accumulation:** Articles, video, Spaces, and newsletters are added without an audience job.
- **Promotion feed:** every post becomes a doorway rather than useful content.
- **Partner concentration:** results depend on one collaborator's distribution.
- **Core neglect:** exploration consumes the proof and time that sustain proven series.
- **Authority inflation:** claims outgrow the creator's evidence.
- **Premium mythology:** subscription status is treated as a published direct Home coefficient.
- **Scale spam:** automation creates duplicate posts, replies, or mechanical cadence.

## 12. Deliverable template

Return:

1. **Stage fit and evidence confidence**
2. **One compounding objective and tradeoff**
3. **Core/adjacent/frontier/relationship/durable portfolio**
4. **Adjacency ladder and experiment gate**
5. **Durable asset or collaboration plan**
6. **Next 15 supporting feed posts**
7. **Conversion and owned-leverage map**
8. **Trust and resilience controls**
9. **Compounding scorecard**
10. **Regression triggers and review date**

Keep every recommendation tied to audience value, credible proof, measurable outcomes, and sustainable capacity.

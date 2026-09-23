# X account Repeatability playbook

Use this playbook to turn repeated audience-aligned wins into a recognisable content, production, and conversion system.

Algorithm references pin `xai-org/x-algorithm` commit `a389166`.

## Contents

1. Stage contract
2. Evidence requirements
3. Extract pattern cards
4. Design recognisable series
5. Build the content portfolio
6. Create the production system
7. Connect attention to conversion
8. Measure series health
9. Graduation and regression criteria
10. Failure modes
11. Deliverable template

## 1. Stage contract

### Enter Repeatability when

- at least two content patterns have worked across multiple comparable executions;
- typical results, not only peaks, beat the account's relevant baseline;
- the intended audience responds or converts in a useful way;
- the creator understands enough of the mechanism to create new examples.

Thirty or more classifiable posts often provide a useful sample, but this is a practice heuristic rather than an X rule.

### Do not enter because

- the account has many followers;
- one post went viral;
- a borrowed format performed once;
- average impressions are high only because of one outlier;
- high activity produces no evidence of audience fit.

## 2. Evidence requirements

Create a comparable dataset with:

- post URL, date, and observation window;
- pillar, audience job, original/quote/reply classification;
- opening, proof, format, and natural action;
- series or pattern candidate;
- impressions, favourites, bookmarks, substantive replies, shares, reposts, quotes;
- profile visits, follows, and destination actions when owner analytics expose them;
- audience-quality notes and production cost.

Use medians by relevant group. Record the number of executions and how often each pattern meets or beats its baseline. Do not hide weak executions inside a successful series average.

Classify conclusions as `Observed`, `Code-backed`, `Inference`, or `Unknown`.

## 3. Extract pattern cards

Build a card for each candidate winner:

| Component | Question |
| --- | --- |
| Audience problem | Which recognisable need makes this relevant? |
| Promise | What recurring value does the pattern deliver? |
| Opening mechanism | Result, tension, claim, observation, story, or question? |
| Evidence mechanism | Example, process, data, source, screenshot, comparison, experience? |
| Format | Why does text, image, video, thread, quote, or Article serve this idea? |
| Natural action | Why might the right person save, share, reply, quote, follow, or convert? |
| Recognisable constants | What should remain familiar across executions? |
| Required variation | What must change to preserve novelty and specificity? |
| Production cost | What proof, time, or collaboration is required? |
| Evidence | Median, hit rate, audience quality, and exceptions |

Separate the mechanism from surface details. “Numbered hook” is not a useful mechanism when the real value came from proprietary data and a clear comparison.

## 4. Design recognisable series

Turn the best cards into two or three named series. Define a series grammar:

- **Constant promise:** the audience recognises why it exists.
- **Variable subject:** each instalment answers a materially different question.
- **Evidence standard:** every instalment meets a minimum proof bar.
- **Format range:** the idea can use the medium it needs without losing identity.
- **Voice constraints:** recognisable tone without a repeated template.
- **Stop condition:** fatigue, weak audience quality, or inability to add new value.

Generate variation using:

- new cases or examples;
- beginner, operator, and advanced applications;
- before/after or good/bad comparisons;
- counterarguments and boundary cases;
- updates after new evidence;
- compression into a framework or expansion into a deep dive;
- application to an adjacent but still relevant problem.

Do not reuse the same hook with substituted nouns, repost near-identical advice, or automate replies around the series.

## 5. Build the content portfolio

Use three buckets:

| Bucket | Job | Decision rule |
| --- | --- | --- |
| Proven | Deliver known audience value through validated series | Protect quality and watch for fatigue |
| Adjacent | Extend a proven mechanism to a nearby question, example, or format | Retain only if audience quality holds |
| Exploratory | Test a genuinely new hypothesis | Keep the learning question explicit |

Set the allocation from evidence, growth objective, production capacity, and risk. Do not impose a universal 70/20/10 formula.

Maintain topic coherence while adding semantic variety. The released topic processor considers recent engaged originals and quotes, while ranking can also apply author-diversity adjustments and later diversity re-ranking. See [topic processing](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/phoenix-rankall-strato/lib/eventProcessing.strato#L457-L525) and [author-diversity calculation](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/ranking_scorer.rs#L655-L684).

Interpretation: repeat the audience promise, not the exact post.

## 6. Create the production system

Define each stage of production:

1. **Capture:** collect audience questions, work evidence, examples, objections, and observations.
2. **Select:** assign an item to a series, adjacent test, or exploratory hypothesis.
3. **Brief:** state audience, promise, evidence, format job, and natural action.
4. **Draft:** preserve creator-specific language and proof.
5. **Review:** check truth, novelty, context, voice, accessibility, and link safety.
6. **Produce:** create only the media needed to explain or prove the idea.
7. **Publish:** use a sustainable schedule and preserve human conversation capacity.
8. **Measure:** record comparable 48-hour outcomes and later evergreen outcomes separately.
9. **Review:** update the pattern card, portfolio, and backlog.

Assign ownership and time budgets when a team is involved. The system should reduce avoidable effort without removing human judgment.

### Reusable brief

```text
Series:
Audience problem:
One-sentence promise:
New angle:
Required proof:
Opening options:
Format and why:
Natural action:
Claims/source check:
Alt text or captions:
Measurement date:
```

## 7. Connect attention to conversion

Map the path:

`Post promise → profile promise → pinned proof → next action`

Audit each transition:

- Does the profile confirm the topic that attracted the visitor?
- Does the pinned post demonstrate rather than merely claim value?
- Is the follow promise recurring and credible?
- Is the external destination relevant, safe, and ready for the visitor?
- Does a promotional post still provide stand-alone value?

Use profile visits and conversion as human funnel evidence. Do not claim a profile click directly increases ranking merely because the funnel matters.

## 8. Measure series health

Track:

- median 48-hour outcome per series;
- percentage of executions meeting or beating the relevant baseline;
- saves, shares, substantive replies, quotes, follows, and conversions individually;
- intended-audience participation;
- production time and evidence burden;
- topic and format concentration;
- recent trend versus the series' own earlier baseline;
- negative feedback when owner analytics expose it.

Use `Healthy`, `Watch`, `Revise`, or `Retire`:

- **Healthy:** repeated audience-aligned value at sustainable cost.
- **Watch:** still useful but outcome or novelty is weakening.
- **Revise:** mechanism remains valuable but execution, proof, or conversion is failing.
- **Retire:** repeated credible executions no longer justify the cost or dilute positioning.

The released Home path removes previously seen related posts and keeps only the highest-scored item from a conversation within a request. Do not count a long thread as many independent feed opportunities. See [seen-post filtering](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/filters/previously_seen_posts_filter.rs#L8-L34) and [conversation deduplication](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/filters/dedup_conversation_filter.rs#L6-L49).

## 9. Graduation and regression criteria

Move to Compounding when:

- multiple series remain healthy across several review cycles;
- the audience promise and conversion path are reliable;
- the account can fund exploration without destabilising core quality;
- the main opportunity is adjacent reach, durable authority, collaboration, or owned conversion.

Return to Learning when apparent patterns no longer repeat, the audience has changed, or a repositioning invalidates the old baseline.

## 10. Failure modes

- **Template factory:** efficiency creates near-duplicate hooks and claims.
- **Viral imitation:** a surface format is copied without its proof mechanism.
- **Series monoculture:** one franchise becomes the entire account.
- **No experiment budget:** proven work slowly decays without new learning.
- **No conversion fit:** reach attracts people the profile or offer cannot serve.
- **Production debt:** the cadence exceeds the evidence and review capacity.
- **Thread inflation:** conversation branches are mistaken for independent discovery inventory.
- **Premature team process:** tooling becomes more work than content.

## 11. Deliverable template

Return:

1. **Stage fit and confidence**
2. **Pattern cards with evidence**
3. **Two or three series definitions**
4. **Proven/adjacent/exploratory portfolio**
5. **Reusable briefs and next 15 posts**
6. **Production workflow and ownership**
7. **Profile-to-destination conversion map**
8. **Series-health scorecard**
9. **Graduation and regression triggers**

Keep recommendations executable and preserve the creator's real voice and proof.

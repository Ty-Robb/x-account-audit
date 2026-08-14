# Algorithm signals and limits

Use this reference to distinguish direct code evidence from practical interpretation.

## Scope

Source snapshot: [`xai-org/x-algorithm` commit `a389166`](https://github.com/xai-org/x-algorithm/tree/a389166f6cf5da70a286b568c87695d4dcdce3a1), retrieved 14 August 2026.

The repository exposes important parts of recommendation, retrieval, filtering, and scoring. It does not prove that every viewer receives these defaults. Feature switches, experiment buckets, later deployments, other products, and private systems can change runtime behaviour.

Use the following language:

- **Direct:** “The published code defines…”
- **Qualified:** “This suggests testing…”
- **Prohibited:** “X will definitely boost…”

## 1. New-author cold start

The published scorer considers posts eligible when they are not replies or reposts and their author has no more than the configured follower cap. It chooses the best eligible low-impression candidate in the request and can lift its score toward a target slot. [Eligibility and selection logic](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/author_cold_start.rs#L68-L83) [Cold-start application](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/author_cold_start.rs#L118-L183)

Published configuration defaults are:

- fewer than 1,000 impressions;
- no more than 1,000 author followers;
- slot range 15–16, which selects zero-based index 15 under these defaults—approximately the 16th position;
- maximum age of 86,400 seconds in the treatment-arm freshness check;
- at most one selected candidate per scorer request.

See the [configuration defaults](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/param.rs#L621-L661).

**Audit implication:** A small account is not necessarily invisible. Prioritise eligible original or quote posts that can earn real reactions when sampled.

**Do not claim:** every new post receives a guaranteed boost, a guaranteed 16th position, or a 24-hour window in every experiment arm.

## 2. Creation and favourite thresholds

The indexing processor emits a `post_creation` event for a candidate. It also emits a `1fav` event at one or more favourites and a `32fav` event at 32 or more favourites. [Creation index](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/phoenix-rankall-strato/columns/phoenix_rank_all/phoenixRankAllCandidateProcessor.strato#L267-L274) [Favourite indexes](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/phoenix-rankall-strato/columns/phoenix_rank_all/phoenixRankAllCandidateProcessor.strato#L62-L88)

**Audit implication:** The first genuine favourite is a concrete indexing boundary in this code. Make the initial audience and value proposition legible enough to earn authentic early engagement.

**Do not claim:** one like guarantees broad distribution, or 32 likes is a universal viral threshold.

## 3. Originals versus replies and reposts

The out-of-network filter removes replies and reposts from accounts the viewer does not follow; it keeps qualifying original posts. [Out-of-network reply/repost filter](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/filters/oon_retweet_reply_filter.rs#L7-L22)

**Audit implication:** Replies can build relationships and in-network context, but an account needs original or quote-post inventory for broad out-of-network discovery. Measure the mix instead of saying replies are useless.

## 4. Predicted actions and published weights

The scorer combines predicted action probabilities with configured weights. Published defaults include:

| Predicted action | Default weight |
| --- | ---: |
| Share via copy link | 20.0 |
| Reply | 5.0 |
| Share via DM | 5.0 |
| Quote | 5.0 |
| Follow author | 4.0 |
| Share | 2.0 |
| Repost | 1.0 |
| Favourite | 0.5 |
| Post click | 0.4 |
| Open link | 0.2 |
| Profile click | 0.0 |
| Not interested | -43.2 |
| Block author | -31.2 |
| Mute author | -58.8 |
| Report | -234.0 |
| Not dwelled | -0.02 |

See [weight configuration](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/param.rs#L278-L447) and [score application](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/ranking_scorer.rs#L467-L506).

The numbers are coefficients applied to predicted probabilities, not guaranteed points per observed action. They are defaults and can be overridden.

**Audit implication:** Test posts with honest reply, share, quote, and follow value. A zero direct profile-click weight does not make the profile irrelevant; the profile still converts human curiosity into follows.

**Do not claim:** copying a link gives a post 40 times the reach of a like, or the observed action mechanically adds the listed number to a public score.

## 5. Topic coherence

Topic processing examines up to 15 recent engaged original and quote posts, excluding ordinary reposts and replies. It calculates category percentages, and the published default topic filtering experiment is `PostBased50Pct`. [Recent-post topic calculation](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/phoenix-rankall-strato/lib/eventProcessing.strato#L457-L525) [Default topic mode](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/param.rs#L101-L111)

A public audit cannot reproduce the internal “recent engaged” set. Use the latest visible originals and quotes as a proxy and label it as an inference.

**Audit implication:** Build a recognisable cluster of related ideas across recent original and quote posts. Coherence means a stable audience promise, not repeating the same sentence or staying in one topic forever.

## 6. Author and semantic diversity

Author diversity applies a decaying multiplier to successive candidates from the same author, down to a configured floor. Published defaults enable the adjustment with a 0.5 decay and 0.25 floor. [Author-diversity calculation](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/ranking_scorer.rs#L655-L684) [Author-diversity defaults](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/param.rs#L221-L242)

A later ranker can use a determinantal point process over embeddings to trade some score for less similarity between neighbouring posts. [VMRanker and DPP overview](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/README.md#L260-L266)

**Audit implication:** Avoid floods of near-duplicate posts. Vary the evidence, format, hook, and angle while keeping the account's audience promise coherent.

## 7. What the semantic renderer can read

The published multimodal renderer constructs recommendation input from author name and handle, bio and account metadata, post text, images or sampled video frames, article title, link-card title, transcript, and quoted-post text. It strips dangling X media URLs from post text. [Renderer inputs](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/grox/flows/mm_emb/renderer_v82.py#L1-L182) [Article, card, video, and quote handling](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/grox/flows/mm_emb/renderer_v82.py#L280-L374)

**Audit implication:** Clear identity, explicit subject matter, useful media, and descriptive titles give the system legible context. Treat the banner as a human conversion surface unless later code directly establishes otherwise.

## Interpretation hierarchy

When evidence conflicts, use this order:

1. visible account and analytics data for what happened;
2. pinned source code for what the published system permits;
3. controlled marketing tests for causal learning;
4. anecdotes only as hypotheses.

Never infer hidden moderation state, experiment assignment, or viewer-level prediction values from public post performance.

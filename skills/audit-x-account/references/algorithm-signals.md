# Algorithm signals and limits

Use this reference to distinguish direct code evidence from practical interpretation.

## Scope

Source snapshot: [`xai-org/x-algorithm` commit `a389166`](https://github.com/xai-org/x-algorithm/tree/a389166f6cf5da70a286b568c87695d4dcdce3a1), retrieved 14 August 2026.

The repository exposes important parts of recommendation, retrieval, filtering, and scoring. It does not prove that every viewer receives these defaults. Feature switches, experiment buckets, later deployments, other products, and private systems can change runtime behaviour.

## Contents

1. Signal stack
2. Small-author cold start
3. Creation and favourite thresholds
4. Originals, replies, reposts, and communities
5. Predicted actions and published weights
6. Topic coherence
7. Author and semantic diversity
8. What the semantic renderer can read
9. Viewer history and retrieval
10. Freshness, re-exposure, and conversation competition
11. Out-of-network and mutual-follow treatment
12. Visibility, labels, and account health
13. Anti-spam systems
14. Important non-findings

Use the following language:

- **Direct:** “The published code defines…”
- **Qualified:** “This suggests testing…”
- **Prohibited:** “X will definitely boost…”

## 1. Signal stack

Do not treat the public weight table as the whole algorithm. The released pipeline has at least five distinct layers:

1. **Eligibility and indexing:** decide which posts enter a corpus.
2. **Retrieval:** find candidates for a particular viewer from follows, engagement history, topics, semantic IDs, and other sources.
3. **Ranking:** predict viewer actions and combine them with configurable coefficients.
4. **Slate shaping:** apply out-of-network factors, author diversity, semantic diversity, deduplication, and cold-start treatment.
5. **Visibility and enforcement:** remove or restrict posts and accounts for viewer controls, safety, spam, legal, or policy reasons.

**Audit implication:** Identify the likely bottleneck by layer. A good post cannot rank if it never enters a relevant candidate set, and a high predicted score cannot rescue a post removed by visibility filtering.

## 2. Small-author cold start

The published scorer considers posts eligible when they are not replies or reposts and their author has no more than the configured follower cap. It chooses the best eligible low-impression candidate in the request and can lift its score toward a target slot. [Eligibility and selection logic](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/author_cold_start.rs#L68-L83) [Cold-start application](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/author_cold_start.rs#L118-L183)

Published configuration defaults are:

- fewer than 1,000 impressions;
- no more than 1,000 author followers;
- slot range 15–16, which selects zero-based index 15 under these defaults—approximately the 16th position;
- maximum age of 86,400 seconds in the treatment-arm freshness check;
- at most one selected candidate per scorer request.

See the [configuration defaults](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/param.rs#L621-L661).

This is a **small-author** rule, not an account-age rule. The post must already be present in the viewer's candidate set and within the top configured position ratio before it can be selected.

**Audit implication:** A small account is not necessarily invisible, but the treatment is a constrained sampling opportunity. Prioritise eligible original or quote posts that are immediately legible to relevant viewers.

**Do not claim:** every new post receives a guaranteed boost, a guaranteed 16th position, or a 24-hour window in every experiment arm.

## 3. Creation and favourite thresholds

The indexing processor emits a `post_creation` event for a candidate. It also emits a `1fav` event at one or more favourites and a `32fav` event at 32 or more favourites. [Creation index](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/phoenix-rankall-strato/columns/phoenix_rank_all/phoenixRankAllCandidateProcessor.strato#L267-L274) [Favourite indexes](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/phoenix-rankall-strato/columns/phoenix_rank_all/phoenixRankAllCandidateProcessor.strato#L62-L88)

The released Home retrieval dataset points at the one-day `1fav` corpus. [Home retrieval corpus](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/phoenix/xrex/data/retrieval_dataset.py#L229-L235)

**Audit implication:** The first genuine favourite is a concrete indexing boundary in this code. Make the initial audience and value proposition legible enough to earn authentic early engagement.

**Do not claim:** one like guarantees broad distribution, or 32 likes is a universal viral threshold.

## 4. Originals, replies, reposts, and communities

The out-of-network filter removes replies and reposts from accounts the viewer does not follow; it keeps qualifying original posts. [Out-of-network reply/repost filter](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/filters/oon_retweet_reply_filter.rs#L7-L22)

The RankAll candidate processor also skips community posts, replies, and reposts from its general creation/favourite indexes. Quote posts remain distinct from reposts in this code. [Candidate indexing eligibility](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/phoenix-rankall-strato/columns/phoenix_rank_all/phoenixRankAllCandidateProcessor.strato#L428-L474)

**Audit implication:** Replies can build relationships and in-network context, but an account needs original or substantive quote-post inventory for broad out-of-network discovery. Classify community-only posts separately because this indexing path does not establish them as broad RankAll inventory.

**Do not claim:** replies or community posts receive no distribution anywhere on X; the evidence applies to these released Home and RankAll paths.

## 5. Predicted actions and published weights

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
| Photo expand | 0.05 |
| Video open | 0.05 |
| Video quality view | 0.05 |
| Quoted-post click | 0.05 |
| Profile click | 0.0 |
| Not interested | -43.2 |
| Block author | -31.2 |
| Mute author | -58.8 |
| Report | -234.0 |
| Not dwelled | -0.02 |

Continuous dwell time also has a small published coefficient. The video-quality-view term is gated by a published video-duration threshold of more than 10 seconds in this path. See [weight configuration](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/param.rs#L279-L385), [video threshold](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/param.rs#L677-L688), and [score application](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/ranking_scorer.rs#L431-L510).

The numbers are coefficients applied to predicted probabilities, not guaranteed points per observed action. They are defaults and can be overridden.

**Audit implication:** Test posts with honest reply, share, quote, save, and follow value. Use media when it improves the post, not to manufacture a threshold. A zero direct profile-click weight does not make the profile irrelevant; the profile still converts human curiosity into follows.

**Do not claim:** copying a link gives a post 40 times the reach of a like, or the observed action mechanically adds the listed number to a public score.

## 6. Topic coherence

Topic processing examines up to 15 recent engaged original and quote posts, excluding ordinary reposts and replies. It calculates category percentages, and the published default topic filtering experiment is `PostBased50Pct`. [Recent-post topic calculation](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/phoenix-rankall-strato/lib/eventProcessing.strato#L457-L525) [Default topic mode](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/param.rs#L101-L111)

A public audit cannot reproduce the internal “recent engaged” set. Use the latest visible originals and quotes as a proxy and label it as an inference.

**Audit implication:** Build a recognisable cluster of related ideas across recent original and quote posts. Coherence means a stable audience promise, not repeating the same sentence or staying in one topic forever.

## 7. Author and semantic diversity

Author diversity applies a decaying multiplier to successive candidates from the same author, down to a configured floor. Published defaults enable the adjustment with a 0.5 decay and 0.25 floor. [Author-diversity calculation](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/ranking_scorer.rs#L655-L684) [Author-diversity defaults](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/param.rs#L221-L242)

A later ranker can use a determinantal point process over embeddings to trade some score for less similarity between neighbouring posts. [VMRanker and DPP overview](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/README.md#L260-L266)

**Audit implication:** Avoid floods of near-duplicate posts. Vary the evidence, format, hook, and angle while keeping the account's audience promise coherent.

## 8. What the semantic renderer can read

The published multimodal renderer constructs recommendation input from author name and handle, bio and account metadata, post text, images or sampled video frames, article title, link-card title, transcript, and quoted-post text. It strips dangling X media URLs from post text. [Renderer inputs](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/grox/flows/mm_emb/renderer_v82.py#L1-L182) [Article, card, video, and quote handling](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/grox/flows/mm_emb/renderer_v82.py#L280-L374)

**Audit implication:** Clear identity, explicit subject matter, useful media, and descriptive titles give the system legible context. Treat the banner as a human conversion surface unless later code directly establishes otherwise.

## 9. Viewer history and retrieval

The released pipeline hydrates recent explicit signals—favourites, reposts, replies, bookmarks, shares, and original posts—and implicit signals including photo expands and qualified video views. Published defaults keep up to 15 recent items per signal type. [Explicit signals](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/query_hydrators/explicit_engagement_signals_query_hydrator.rs#L68-L111) [Implicit signals](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/query_hydrators/implicit_engagement_signals_query_hydrator.rs#L33-L95) [Signal defaults](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/param.rs#L705-L721)

SimClusters uses those signal-post IDs to retrieve recent, favourite-based cluster neighbours with cosine similarity, a 48-hour maximum candidate age, and a released minimum post score. It interleaves candidates across seeds rather than exhausting one seed first. [SimClusters source](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/sources/simclusters_source.rs#L24-L35) [Signal retrieval and interleaving](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/sources/simclusters_source.rs#L95-L135)

The Phoenix retrieval configuration uses long action histories and coarse viewer features such as language and country; the released Home two-tower has no learned user-ID embedding. Its Home positive training action is favourite, while the Immersive head uses a wider action set including bookmark, share, follow, and video quality view. [Retrieval configuration](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/phoenix/xrex/configs/xrecsys_two_tower.py#L260-L315)

**Audit implication:** Distribution is viewer-specific. Content is more likely to be useful when it is clear enough to match the histories and interests of the intended audience. Track bookmarks as retrieval/history evidence even though the released Home weight table does not give bookmark its own direct coefficient.

**Do not claim:** the identity of an engager has a published fixed multiplier, or that bookmarks have a direct Home ranking weight.

## 10. Freshness, re-exposure, and conversation competition

The Home pipeline defines a 48-hour maximum post age and filters candidates outside that window. It also removes related posts already seen or served to the viewer. [Age constant](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/config.rs#L34-L40) [Age filter](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/filters/age_filter.rs#L7-L34) [Seen-post filter](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/filters/previously_seen_posts_filter.rs#L8-L34)

A conversation deduplication filter keeps only the highest-scored candidate from a conversation in a request. [Conversation deduplication](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/filters/dedup_conversation_filter.rs#L6-L49)

**Audit implication:** Use a consistent 48-hour measurement window for apples-to-apples post comparisons and maintain a sustainable flow of new originals. Do not flood one thread expecting multiple slots; posts from the same conversation can compete.

**Do not claim:** a post can never receive attention after 48 hours. Other X surfaces and evergreen video indexes have different windows.

## 11. Out-of-network and mutual-follow treatment

The published scorer applies a default 0.75 multiplier to out-of-network candidates and a 0.5 factor in topic requests. [Out-of-network defaults](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/param.rs#L246-L270) The factor scales positive ranking terms, while negative terms remain negative. [Multiplier application](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/ranking_scorer.rs#L780-L800)

Original posts from mutually followed authors can receive an increased coefficient on predicted reply probability. The released defaults add 15 to the base reply coefficient of 5 when the candidate is neither a reply nor a repost and the author relationship is mutual. [Change explanation](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/docs/BIDIRECTIONAL_BOOST_CHANGE.md#L1-L11) [Eligibility and coefficient](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/ranking_scorer.rs#L175-L193)

**Audit implication:** A new creator needs originals that can overcome out-of-network discounting and authentic relationships that create in-network opportunity. Build real mutual connections through relevant work and conversation.

**Do not claim:** mass mutual-following or follow churn creates durable reach. The public code also contains inauthentic-behaviour detection, and runtime experiment values can differ.

## 12. Visibility, labels, and account health

Home recommendations apply stricter out-of-network visibility rules than the in-network Home policy. Released rules can drop posts or authors with spam, malicious-link, do-not-amplify, impersonation, compromised-account, abusive, and adult-content labels, among others. [Visibility policy registry](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/visibility-filtering/rules/registry.rs#L101-L169)

The candidate hydrator checks the primary post and its ancestors, quoted post, and repost source. A wrapper candidate can be removed when an ancillary item receives a drop verdict. [Ancillary visibility checks](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/candidate_hydrators/vf_candidate_hydrator.rs#L69-L84) [Ancillary drop logic](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/candidate_hydrators/vf_candidate_hydrator.rs#L139-L168)

X's owner-only “Under the Hood” report can expose allowlisted post and account labels and their stated effects. The released report requires an account at least one year old and at least 10 eligible posts in the prior month. [Report eligibility](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/under-the-hood/strato/columns/underTheHoodReport.User.strato#L15-L20) [Report gate](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/under-the-hood/strato/columns/underTheHoodReport.User.strato#L361-L389) [Public label descriptions](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/under-the-hood/strato/lib/underTheHoodLabels.strato#L3-L175)

**Audit implication:** For an owner audit, accept an Under the Hood screenshot or export as direct evidence. Treat account security, safe link destinations, original context, and policy-compliant media as discovery prerequisites—not optimisation tricks.

**Do not claim:** low reach proves a label or shadowban. A new account will not meet the released Under the Hood report eligibility gate.

## 13. Anti-spam systems

The released repository includes a behavioural transformer with heads for follow bots, like bots, engagement amplifiers, reply spam, post spam, repost bots, and multi-action bots. It explicitly models timing, burstiness, actions, surfaces, dwell, devices, and engagement targets. [Behavioural detector overview](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/bdsm/README.md#L17-L40)

Published enforcement paths can label LLM slop, gibberish, and fast-reply spam, while separate rules cluster duplicate text in posts and replies. [Post enforcement rules](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/abuse-enforcement-service/service-lib/rules/enforcement_post.yaml#L39-L69) [Duplicate-text rule](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/botmaker-rules/scarecrow/bot/BBQDuplicateTextProd.bot) [Duplicate-reply rule](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/botmaker-rules/scarecrow/bot/BBQDuplicateTextRepliesProd.bot)

**Audit implication:** Vary generated drafts substantially, add real evidence and judgment, and write replies specific to the conversation. Reject repetitive reply farming, coordinated engagement, mass following, and mechanical cadence.

## 14. Important non-findings

- The released Home ranker does not expose a direct “new account age” boost. The cold-start eligibility shown above uses author follower count, post type, impressions, corpus, pre-boost position, and sometimes freshness.
- The released direct Home weight table does not contain a Premium or verification coefficient. Verification and graph credibility appear in anti-abuse and enforcement paths, which is not evidence of a feed-ranking boost.
- The account-recommendation service that supplies Who to Follow candidates is called by Home Mixer but is not implemented in this repository. Do not claim the skill can diagnose why an account is or is not suggested to follow.
- The repository does not expose a public per-account algorithm score, a universal posting-time rule, or enough data to diagnose a hidden penalty from impressions alone.

## Interpretation hierarchy

When evidence conflicts, use this order:

1. visible account and analytics data for what happened;
2. pinned source code for what the published system permits;
3. controlled marketing tests for causal learning;
4. anecdotes only as hypotheses.

Never infer hidden moderation state, experiment assignment, or viewer-level prediction values from public post performance.

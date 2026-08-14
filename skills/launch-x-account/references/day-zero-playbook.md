# Day-zero X account playbook

Use this playbook to turn positioning and proof into a launch-ready account and its first measurable content cycle.

Platform specifications checked 14 August 2026. Algorithm references pin `xai-org/x-algorithm` commit `a389166`.

## Contents

1. Stage contract
2. Inputs and assumptions
3. Positioning spine
4. Profile and conversion setup
5. Content architecture
6. First-15 matrix
7. Launch cadence and conversation practice
8. Measurement ledger
9. Exit criteria
10. Failure modes
11. Deliverable template

## 1. Stage contract

### Enter Day zero when

- the account has no posts or no relevant post history;
- the account is being fully repositioned for a different audience;
- existing evidence is too sparse or incompatible to establish a baseline.

### Do not use follower count as the gate

An account can have followers and still be at Day zero for a new positioning. Conversely, a small account can have a repeatable system.

The released author cold-start scorer considers a small-author follower cap, but a candidate must already enter the request and meet other conditions before one eligible item can be lifted. It is an opportunity, not automatic new-account distribution. See [eligibility and selection](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/author_cold_start.rs#L68-L83) and [application logic](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/scorers/author_cold_start.rs#L118-L183).

### Exit Day zero when

- the profile and pinned post communicate one coherent promise;
- 15 classifiable original or substantive quote posts have been published or scheduled;
- outcomes are recorded on a consistent window;
- at least one evidence-backed question is ready for a Learning cycle.

Do not require a follower target to graduate.

## 2. Inputs and assumptions

Collect what exists:

| Input | What to establish | If missing |
| --- | --- | --- |
| Audience | A recognisable group with a shared problem or ambition | State a narrow working assumption |
| Recurring value | What they should expect repeatedly | Draft one concrete promise |
| Credible proof | Work, experience, examples, process, data, or informed observation | Use build-in-public evidence; never invent authority |
| Point of view | A useful belief, method, or distinction | Derive it from real choices and experience |
| Goal | Qualified followers, authority, community, leads, or learning | Default to qualified audience growth |
| Capacity | Sustainable writing, media, and conversation time | Choose the lightest credible operating tier |
| Destination | Website, newsletter, product, portfolio, or none | Use a simple profile follow path until one exists |

Label unsupported assumptions and make them easy to replace.

## 3. Positioning spine

Complete this sentence:

> For `[specific audience]`, this account provides `[recurring value]` about `[connected subject area]`, grounded in `[credible proof or perspective]`, so they can `[useful outcome]`.

Then define:

- **Audience boundary:** who this is not primarily for.
- **Topic boundary:** what tempting but unrelated subjects will be excluded.
- **Claim boundary:** what the creator cannot yet credibly promise.
- **Voice:** three natural qualities and two tones to avoid.

Quality test:

- Can a relevant stranger decide within seconds whether to follow?
- Can the promise generate at least 30 materially different useful posts?
- Can the creator support it with real evidence?

## 4. Profile and conversion setup

### Profile checklist

- **Display name:** recognisable identity; add a category cue only when natural.
- **Avatar:** clear at small size and consistent with the real creator or brand.
- **Bio:** audience, recurring value, proof where credible, and next action.
- **Banner:** reinforce the promise, proof, or destination; keep copy minimal.
- **Link:** send visitors to one current, trustworthy destination.
- **Pinned post:** introduce the promise and demonstrate value rather than merely announcing arrival.

### Pinned-post structure

1. Name the audience or problem.
2. State the useful point of view.
3. Show why the creator is exploring or qualified to help.
4. Preview the three recurring pillars.
5. Provide one useful example immediately.
6. Set an honest expectation for what follows.

### Current profile specifications

- Profile photo: `400 × 400` px recommended.
- Header/banner: `1500 × 500` px recommended.
- JPG, GIF, and PNG are accepted for profile assets; animated GIFs are not supported there.

Source: [X profile customisation](https://help.x.com/en/managing-your-account/how-to-customize-your-profile).

Treat profile assets as conversion surfaces. The examined post-embedding renderer does not establish the banner as a ranking input.

## 5. Content architecture

Choose three connected pillars. Give each a distinct audience job:

| Pillar role | Purpose | Useful proof forms |
| --- | --- | --- |
| Teach | Help the audience understand or do something | Framework, checklist, walkthrough, diagram |
| Demonstrate | Make the creator's work and reasoning visible | Example, teardown, experiment, before/after |
| Interpret | Apply a recognisable point of view | Commentary, comparison, prediction with assumptions |

These roles are a starting structure, not mandatory labels. Replace them when the account has a better evidence-led architecture.

The published topic-processing path examines recent engaged original and quote posts. Keep the first cycle coherent enough to be legible while varying examples, claims, and media. See [topic calculation](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/phoenix-rankall-strato/lib/eventProcessing.strato#L457-L525).

## 6. First-15 matrix

Create five posts for each pillar using different content jobs:

| Slot | Content job | Required ingredient |
| ---: | --- | --- |
| 1 | Principle or point of view | A specific claim and reasoning |
| 2 | Process or how-to | Steps, decision rule, or reusable tool |
| 3 | Proof or demonstration | Real example, screenshot, data, or observable work |
| 4 | Comparison or misconception | A meaningful distinction with consequences |
| 5 | Situation or decision | A concrete scenario that invites substantive perspective |

For every draft, specify:

- relevant stranger and problem;
- opening, one main idea, and evidence;
- why it belongs to the chosen pillar;
- natural action, if any;
- proof still needed from the creator;
- format and media job;
- alt text or captions when applicable.

Reject a draft if another creator could publish it unchanged, it depends on fake experience, or it exists only to ask for engagement.

### Working media templates

- Square post or chart: `1200 × 1200`.
- Landscape artwork: `1200 × 628`.
- Taller single-image post: `1080 × 1350`.
- Landscape video: `1920 × 1080`.
- Article header when the composer presents a 5:2 crop: `1500 × 600`, checked in preview.

These are production templates, not ranking advantages. X states that standard single-image aspect ratios from 2:1 through 3:4 display in full and currently permits 1–4 photos per post. See [X photo guidance](https://help.x.com/en/using-x/posting-gifs-and-pictures).

## 7. Launch cadence and conversation practice

Choose a capacity tier as a starting experiment:

- **Light:** three strong original or quote posts per week plus relevant conversation time on publish days.
- **Standard:** five strong posts per week plus a short daily conversation window.
- **Daily:** one strong post per day only when proof, specificity, and human review remain sustainable.

Cadence is a practice choice, not an algorithm rule. Reduce volume before quality or voice becomes mechanical.

Use replies to help people, test language, and learn audience questions. Do not treat replies as broad discovery inventory: the released out-of-network filter removes replies and reposts from nonfollowed authors in the examined Home path. See [filter logic](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/filters/oon_retweet_reply_filter.rs#L7-L22).

## 8. Measurement ledger

Record each post after a consistent 48-hour window when possible:

| Field | Record |
| --- | --- |
| Post | URL or identifier |
| Classification | Pillar, content job, format, original/quote/reply |
| Execution | Opening type, proof type, natural action |
| Outcome | Impressions, favourites, bookmarks, substantive replies, shares, reposts, quotes |
| Conversion | Profile visits, follows, destination action when available |
| Qualitative | Who responded, what they valued, objections, useful language |
| Decision | Retain, revise, stop, or unresolved after comparison |

The released Home path defines a 48-hour maximum candidate age, which makes 48 hours a useful comparison window for this audit method—not a complete account of every X surface. See [age configuration](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/home-mixer/params/config.rs#L34-L40).

The released indexing path contains `post_creation`, `1fav`, and `32fav` events. Treat the first authentic favourite as an indexing boundary in that path, never as a guaranteed distribution event. See [favourite indexes](https://github.com/xai-org/x-algorithm/blob/a389166f6cf5da70a286b568c87695d4dcdce3a1/phoenix-rankall-strato/columns/phoenix_rank_all/phoenixRankAllCandidateProcessor.strato#L62-L88).

## 9. Exit criteria

Move to Learning when all are true:

- positioning and profile are live;
- 15 posts provide a classifiable sample;
- the creator can maintain the chosen production tier;
- measurements use comparable windows;
- the next cycle can test a named uncertainty.

Remain at Day zero if the creator has not supplied the proof needed to publish safely or the positioning still changes from post to post.

## 10. Failure modes

- **Empty authority:** credentials or results are implied but unsupported.
- **Three unrelated niches:** pillars do not reinforce one promise.
- **Announcement feed:** posts describe intentions but deliver no value.
- **Audience-dependent prompts:** broad questions fail because no audience exists yet.
- **Decorative media:** every post gets an image regardless of informational value.
- **Template voice:** drafts repeat the same hook, cadence, or generic AI phrasing.
- **Activity hacks:** follow churn, engagement pods, bulk replies, or irrelevant tagging replace genuine work.
- **Premature optimisation:** posting time, hashtags, or tiny format choices distract from audience and proof.

## 11. Deliverable template

Return:

1. **Assumptions and objective**
2. **Positioning spine and boundaries**
3. **Profile copy and asset brief**
4. **Pinned post**
5. **Three-pillar table**
6. **First-15 table with proof and media requirements**
7. **30-day capacity-based routine**
8. **Measurement ledger**
9. **Exit criteria and first Learning hypothesis**

Label platform facts, code-backed facts, practices, experiments, and unknowns distinctly.

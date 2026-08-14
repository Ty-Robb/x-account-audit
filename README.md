# X Account Audit

A free AI-agent skill that turns a public X account into an evidence-based growth plan.

It audits the profile, recent posts, topic consistency, discovery inventory, likely engagement signals, and negative-feedback risks. It then recommends the highest-leverage changes and drafts the next 15 posts.

No signup. No API key. No tracking. No paid tier.

## Install

```bash
npx skills@latest add Ty-Robb/x-account-audit
```

Then ask your agent:

```text
Use $audit-x-account to audit https://x.com/example for qualified follower growth.
```

For a new account:

```text
Use $audit-x-account to build a day-zero plan for this new X account. Start from 0 followers and give me the next 15 posts.
```

For a public comparison:

```text
Use $audit-x-account to compare these three public X accounts and show the content patterns worth adapting without copying them.
```

## What it produces

- An audit score with an explicit confidence level
- The account's single biggest growth constraint
- A profile and positioning rewrite
- Topic-coherence and original-post analysis
- Three content pillars and a 30-day operating plan
- Fifteen concrete post briefs
- A measurement plan based on controllable signals
- A shareable summary for public teardowns

The score is a transparent audit heuristic. It is not an internal X score and does not claim to predict exact distribution.

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

Issues and pull requests are welcome, especially for source corrections, clearer scoring rules, and anonymised examples. Please do not submit tactics based on manipulation, engagement pods, follow churn, harassment, or private data.

## License

MIT


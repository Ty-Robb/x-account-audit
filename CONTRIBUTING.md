# Contributing

Corrections, clearer evidence boundaries, anonymised examples, new eval cases, and current official X sources are welcome.

## Evidence requirements

- Link platform facts to a current official X source or a pinned line in `xai-org/x-algorithm`.
- Separate platform specifications from creative practice and experiments.
- Treat published defaults as evidence, not guaranteed runtime behaviour.
- Do not diagnose hidden labels, penalties, or viewer-level scores from public results.
- Do not contribute manipulation, engagement pods, follow churn, purchased followers, deceptive automation, harassment, or private data.

## Pull requests

Keep changes focused. Explain the user problem, source or evidence, affected workflow, and important limitation. Add or update an eval when behaviour changes. Run:

```bash
npm test
npm run validate
npx skills@latest add . --list
```

Source-monitor changes must follow [MAINTENANCE.md](MAINTENANCE.md). The project has no runtime package dependencies by design.

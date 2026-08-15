# Guvna Core Realization Baseline

This directory is a derivative engineering-planning bundle created on
2026-08-15. It preserves a factual implementation baseline and normalized
implementation specifications for future work.

It is not doctrine, a Semantic Contract, an authority record, a Candidate
Contract, an Applicable Contract, or a replacement for any referenced source.
It cannot establish semantic meaning, applicability, acceptance, or authority.

## Scope

- `sources.yaml` records the canonical sources and source hashes.
- `baseline.md` records current implementation status at each architectural
  boundary.
- `extracts/` contains non-authoritative engineering extracts from detailed
  specifications.
- `conflicts-and-blockers.md` records known inconsistencies and absent inputs
  without resolving them.
- `realization-plan.md` sequences only the compiler-library work supported by
  existing evidence.

No doctrine or live production code is copied here. No Contract payload is
present in this directory.

## Baseline Verification

On 2026-08-15, the repository commands below completed successfully:

```text
pnpm build
pnpm typecheck
pnpm test
```

The test suite contained one test file with 21 passing tests for
`determineApplicability`. This is evidence for that narrow module only; it is
not evidence that Runtime, SDK, Host, projection, persistence, or transport
implementations exist.
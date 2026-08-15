# Executable Baseline Extract

**Status:** IMPLEMENTED, narrowly scoped.

**Sources:**

- [`core/src/compiler/applicability-determination.ts`](../../../core/src/compiler/applicability-determination.ts)
- [`core/tests/compiler/applicability-determination.test.ts`](../../../core/tests/compiler/applicability-determination.test.ts)
- [`core/package.json`](../../../core/package.json)
- [`core/tsconfig.json`](../../../core/tsconfig.json)
- [`core/vitest.config.mts`](../../../core/vitest.config.mts)

## Exported API

The production module exports:

- `ApplicabilityResult`: `applicable`, `not-applicable`, or `indeterminate`.
- `AuthorityDecision`: `applicable` or `not-applicable`.
- `EvidenceStatus`: `valid`, `invalid`, `ambiguous`, `conflicting`, `stale`,
  `revoked`, or `unsupported`.
- `AuthorityInput`, `Evidence`, `ApplicabilityInputs`,
  `ApplicabilityDetermination`, and `DeterminationProvenance`.
- `determineApplicability(inputs)`.

`determineApplicability` accepts externally supplied authority, governed and
subject scope, validation state, validity evidence, and effective-boundary
evidence. It checks required values, preserves available provenance, requires
the established governed scope, and fails closed to `indeterminate` for
missing/invalid input. An explicit `not-applicable` decision returns that
result; otherwise valid supplied input returns `applicable`.

The function does not mutate caller input.

## Verified Behavior

On 2026-08-15, `pnpm -C core test -- --reporter=verbose` completed with one
test file and 21 passing tests. Tests cover terminal outcomes, malformed
authority/evidence inputs, scope validation, provenance preservation, and
non-mutation.

`pnpm -C core build` emits:

```text
core/dist/src/compiler/applicability-determination.js
core/dist/src/compiler/applicability-determination.d.ts
```

The package uses TypeScript `NodeNext` modules and Vitest. The project-wide
commands are `pnpm build`, `pnpm typecheck`, and `pnpm test`.

## Boundary

This module does not:

- ratify or establish applicability;
- create, alter, or exercise an authority decision;
- load or validate a Contract artifact;
- consume repository knowledge or a governance projection;
- start Runtime, expose an SDK, communicate with a Host, or persist state.

Treat it as a supplied-input compiler primitive, not a Runtime implementation.
# Compiler Implementation Proposal

**Phase:** 3 - Build the Doctrine Compiler
**Authority gate:** Post-Gate 3 implementation scope review
**State:** APPROVED
**Governing approval:** Gate 3 - Compiler Authority Gate
**Semantic source:** `doctrine/core/**`
**Derived input:** Approved Gate 2 Semantic IR proposal

## Intended action

Approve a narrowly scoped implementation of only the approved Applicability
Determination capability within the Semantic IR/compiler boundary:

```text
authoritative inputs -> applicability determination -> result and provenance
```

Any Discover, Parse, Normalize, Resolve, Compile, or Validate behavior is
integration support only where strictly necessary to execute or test this
capability. No general implementation of those stages is authorized. The
implementation would produce the approved applicability result and
provenance evidence only. It would not establish semantic authority, create
an Applicable Contract, ratify a Candidate Contract, or modify Doctrine,
Runtime, SDK, Projection, repository truth, publication, or generated
artifacts.

## Gate 3 Applicability Determination Scope Reconciliation

**Reconciliation state:** APPROVED

The approved Gate 2 Applicability Determination decision permits the
Semantic IR/compiler to determine applicability from authoritative,
externally supplied ratification/authority inputs. The determination may
evaluate the already-established governed scope and required validity and
effective-boundary conditions and produce exactly `applicable`,
`not-applicable`, or `indeterminate`, preserving provenance and failing
closed.

This reconciles the former Gate 3 prohibition on applicability determination.
It does not authorize Candidate Semantic Contract ratification, creation or
alteration of authority decisions, delegation, revocation, or any other
unresolved Gate 2 capability. Ratification authority and governing authority
decisions remain external.

This reconciliation is approved for implementation of this specific
capability only, within the exact mutation paths and tests defined below.

## Proposed implementation boundaries

### Exact implementation path

The compiler implementation will live at:

- `core/src/compiler/`

The compiler is a module within the existing `guvna-core` package. No new workspace package is created.

### Exact package and module boundary

The only implementation module permitted is:

- `guvna-core` package: `core/src/compiler/**/*.ts`

The compiler may depend on TypeScript and Node.js APIs already available to `guvna-core`, and on modules within `core/src/compiler/` only. It may read approved `doctrine/core/**` inputs, but doctrine is input authority and is not a package dependency or mutation target. It must not depend on `core/runtime/`, `core/sdk/`, repository truth, generated artifacts, or any new workspace package. No dependency may be added to `core/package.json` by this proposal.

### Exact mutation boundary

Subject to implementation approval, the implementation agent may create or modify only these paths:

- `core/src/compiler/**/*.ts`
- `core/tests/compiler/**/*.test.ts`
- `core/tsconfig.json`
- `core/vitest.config.mts`
- `.guvna/agent-state/evidence/compiler/**/*.yaml`
- `.guvna/agent-state/evidence/compiler/**/*.md`

Every path not explicitly listed above is outside the requested authority, including `core/package.json`, `core/runtime/**`, `core/sdk/**`, `doctrine/**`, repository semantic inputs, publication locations, and generated-artifact locations.

### Exact test boundary

Compiler tests may be created or modified only under:

- `core/tests/compiler/**/*.test.ts`

That boundary must contain focused tests for `applicable`,
`not-applicable`, and `indeterminate` outcomes, fail-closed behavior,
authoritative-input enforcement, exact governed-scope evaluation,
validity/effective-boundary evaluation, provenance preservation, prohibition
on ratification or authority-decision mutation, and mutation-boundary
enforcement. Tests must also verify absence of unauthorized Runtime, SDK,
Projection, Contract, Doctrine, publication, and generated-artifact mutation.

### Exact evidence and provenance boundary

Compiler implementation evidence and provenance artifacts may be written only under:

- `.guvna/agent-state/evidence/compiler/**/*.yaml`
- `.guvna/agent-state/evidence/compiler/**/*.md`

Evidence must identify the source inputs, stage transformations, output artifacts, test results, and changed-path manifest. No evidence may be written into doctrine, `core/src/compiler/`, Runtime, SDK, publication, or generated-artifact locations.

### Deterministic enforcement

The current repository provides no configured filesystem sandbox, path allowlist hook, or mutation-enforcement script. Agent instructions alone are therefore insufficient to enforce this boundary. Before and after implementation, the supervising handoff must compare the repository changed-path manifest against the exact allowlist above using a deterministic `git diff --name-only` check; any path outside the allowlist fails the handoff and blocks acceptance of the implementation evidence. The implementation request is consequently limited to the listed paths and remains conditional on that external changed-path check.

Any supporting stage code must remain minimal and subordinate to the
Applicability Determination integration boundary. It may not generalize into
an independently usable Discover, Parse, Normalize, Resolve, Compile, or
Validate implementation.

## Required failure behavior

The implementation must fail closed for unresolved Semantic Gaps, unresolved references, authority ambiguity, invalid ownership, provenance loss, and other approved blocking conditions. It must preserve source claims and provenance in the resulting evidence.

The approved Applicability Determination algorithm is authorized. It evaluates authoritative external inputs against the established governed scope and required validity and effective-boundary conditions, producing exactly `applicable`, `not-applicable`, or `indeterminate` with provenance preservation and fail-closed behavior. The implementation must not ratify a Candidate Contract or create or alter authority decisions. It must not invent, define, or execute unresolved compatibility, serialization, hashing, ordering, version, lifecycle, transition, delegation, revocation, loading, caching, or any other unresolved applicability-related algorithm.

Determinism is required for identical authoritative inputs and identical
determination context. This proposal does not establish any unresolved
canonicalization, ordering, serialization, identity, or other algorithm.

## Proposed tests and evidence

Subject to approval, implementation evidence must demonstrate:

- approved applicability determination produces all three approved outcomes and fails closed for missing, ambiguous, conflicting, stale, revoked, or unsupported authoritative inputs;
- exact governed scope and validity/effective-boundary conditions are evaluated;
- applicability determination preserves authoritative-input provenance and rejects non-authoritative inference sources;
- Candidate Contract ratification and authority-decision creation or alteration are prohibited;
- mutation outside the approved compiler boundary is rejected;
- no Runtime, SDK, Projection, Contract, Doctrine, publication, or generated-artifact mutation occurs;
- the deterministic changed-path check rejects every path not explicitly listed above.

Tests may cover only the approved applicability determination and its required
integration boundary; they cannot assert or implement any unresolved Gate 2
capability or algorithm.

## Explicit exclusions

This proposal does not authorize:

- Doctrine mutation;
- Runtime or SDK implementation;
- Projection or Contract schema implementation;
- Candidate Contract ratification;
- applicability determination outside the approved authoritative-input boundary;
- repository truth selection or repair;
- publication or generated-artifact mutation;
- invention of unresolved semantic or implementation algorithms.

## Decision requested

This approved proposal establishes the exact applicability-only implementation scope, required
integration boundary, package/module boundary, dependency direction, mutation
boundary, test boundary, evidence/provenance boundary, and deterministic
changed-path enforcement condition. Approval would authorize only the
approved Applicability Determination capability and strictly necessary
supporting integration code within the listed paths. It would not authorize
general Discover, Parse, Normalize, Resolve, Compile, or Validate
implementation, Doctrine, Semantic IR, Runtime, SDK, Projection, Contract,
publication, or generated-artifact mutation, Candidate Contract ratification,
authority-decision creation or alteration, any other unresolved Gate 2
capability, or invention of unresolved algorithms.

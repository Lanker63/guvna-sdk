# Applicability Determination Execution Proposal

**Phase:** 3 - Build the Doctrine Compiler
**Authority gate:** Post-Gate 3 implementation scope review
**State:** APPROVED
**Governing approval:** Approved Gate 3 applicability-only implementation scope
**Derived input:** `.guvna/agent-state/proposals/compiler-implementation-proposal.yaml`

## Proposed action

Implement and test only the approved Applicability Determination capability
within the Semantic IR/compiler boundary.

The implementation may evaluate authoritative, externally supplied
ratification/authority inputs against the already-established governed scope
and required validity/effective-boundary conditions. It must produce exactly
`applicable`, `not-applicable`, or `indeterminate`, preserve provenance, and
fail closed.

Any supporting Discover, Parse, Normalize, Resolve, Compile, or Validate code
must be the minimum integration required to execute or test this capability.
Those stages are not independently authorized.

## Required behavior

- Accept authoritative external inputs only.
- Evaluate the exact established governed scope.
- Evaluate required validity and effective-boundary conditions.
- Produce exactly the three approved applicability outcomes.
- Return `indeterminate` for missing, ambiguous, conflicting, stale, revoked,
  or unsupported required inputs.
- Preserve the authority decision identity, authority reference, input
  provenance, scope, validity, effective-boundary data, and determination
  result.
- Reject or fail closed on non-authoritative inference sources.

## Authority protections

The implementation must not:

- ratify a Candidate Contract;
- create, alter, or exercise authority over a governing authority decision;
- implement delegation or revocation mechanics;
- determine repository applicability;
- implement compatibility or any other unresolved Gate 2 capability;
- modify Doctrine, Semantic IR, Runtime, SDK, Projection, Contract,
  publication, or generated artifacts.

## Tests and evidence

Tests must cover:

- `applicable`;
- `not-applicable`;
- `indeterminate`;
- fail-closed behavior;
- authoritative-input enforcement;
- exact governed-scope evaluation;
- validity/effective-boundary evaluation;
- provenance preservation;
- prohibition on ratification and authority-decision mutation;
- mutation-boundary enforcement.

Evidence must record inputs, determination context, result, provenance,
executed tests, and the changed-path manifest under the approved compiler
evidence paths only.

## Mutation boundary

The existing exact allowlist remains unchanged:

- `core/src/compiler/**/*.ts`
- `core/tests/compiler/**/*.test.ts`
- `core/tsconfig.json`
- `core/vitest.config.mts`
- `.guvna/agent-state/evidence/compiler/**/*.yaml`
- `.guvna/agent-state/evidence/compiler/**/*.md`

No implementation is performed by this proposal.

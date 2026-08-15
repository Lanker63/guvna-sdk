# Applicability Determination Implementation Handoff Proposal

**Phase:** 3 - Build the Doctrine Compiler
**Authority gate:** Post-Gate 3 implementation scope review
**State:** APPROVED
**Governing approval:** Post-Gate 3 Applicability Determination Execution Proposal

## Handoff scope

Hand off implementation of only the approved Applicability Determination
capability within the Semantic IR/compiler boundary.

The implementation may evaluate authoritative external inputs against the
already-established governed scope and required validity/effective-boundary
conditions, producing exactly `applicable`, `not-applicable`, or
`indeterminate`. It must preserve provenance and fail closed.

Supporting code from Discover, Parse, Normalize, Resolve, Compile, or Validate
is permitted only where strictly necessary for this capability. No general
compiler-stage implementation is authorized.

## Acceptance evidence

The implementation handoff must provide evidence of:

- all three approved applicability outcomes;
- fail-closed handling of missing, ambiguous, conflicting, stale, revoked, or
  unsupported authoritative inputs;
- authoritative-input enforcement;
- exact governed-scope evaluation;
- validity/effective-boundary evaluation;
- provenance preservation;
- prohibition on Candidate Contract ratification and authority-decision
  creation or alteration;
- mutation-boundary enforcement;
- no changes outside the approved allowlist.

## Prohibited scope

The handoff must not include:

- Candidate Contract ratification;
- creation or alteration of authority decisions;
- delegation or revocation;
- repository applicability;
- compatibility or other unresolved Gate 2 capabilities;
- general Discover, Parse, Normalize, Resolve, Compile, or Validate
  implementation;
- Runtime, SDK, Projection, Contract, Doctrine, publication, or generated
  artifact changes.

## Mutation allowlist

- `core/src/compiler/**/*.ts`
- `core/tests/compiler/**/*.test.ts`
- `core/tsconfig.json`
- `core/vitest.config.mts`
- `.guvna/agent-state/evidence/compiler/**/*.yaml`
- `.guvna/agent-state/evidence/compiler/**/*.md`

No implementation is performed by this proposal.

# Applicability Determination Conformance Review Proposal

**Phase:** 3 - Build the Doctrine Compiler
**Authority gate:** Post-implementation conformance review
**State:** APPROVED
**Governing scope:** Approved Applicability Determination implementation handoff

## Review scope

Review only the Semantic IR/compiler implementation of the approved
Applicability Determination capability.

The review must determine whether authoritative external inputs are evaluated
against the established governed scope and required validity/effective-boundary
conditions, producing exactly `applicable`, `not-applicable`, or
`indeterminate` with provenance preservation and fail-closed behavior.

## Required evidence

Review evidence must cover:

- each approved applicability outcome;
- missing, ambiguous, conflicting, stale, revoked, and unsupported input
  behavior;
- authoritative-input enforcement;
- exact governed-scope evaluation;
- validity/effective-boundary evaluation;
- provenance preservation;
- prohibition on Candidate Contract ratification;
- prohibition on authority-decision creation or alteration;
- mutation-boundary compliance;
- absence of unrelated compiler-stage implementation and unresolved Gate 2
  capability implementation.

## Review findings

Classify findings as:

- conformant;
- non-conformant;
- indeterminate due to missing or ambiguous evidence.

The review must fail closed when required evidence, provenance, scope, or
authority-boundary information is unavailable or contradictory.

## Exclusions

This review does not evaluate or authorize:

- Candidate Contract ratification;
- authority-decision creation or alteration;
- delegation or revocation;
- repository applicability;
- compatibility or other unresolved Gate 2 capabilities;
- general Discover, Parse, Normalize, Resolve, Compile, or Validate
  implementation;
- Runtime, SDK, Projection, Contract, Doctrine, publication, or generated
  artifact changes.

No implementation is performed by this proposal.

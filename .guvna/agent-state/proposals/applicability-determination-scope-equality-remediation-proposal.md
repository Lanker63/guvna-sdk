# Applicability Determination Scope Equality Remediation Proposal

**State:** `APPROVED`
**Authority gate:** Applicability Determination remediation review
**Governing finding:** Unauthorized `governedScope === subjectScope` implementation/specification seam

## Purpose and Boundary

This proposal addresses only the confirmed scope-equality seam identified in:

`.guvna/agent-state/proposals/applicability-scope-equality-reconciliation.md`

The approved semantics distinguish:

- the established governed semantic boundary;
- the supplied `governedScope` authority input; and
- the independent supplied `subjectScope` authority input.

The approved Applicability Determination authorizes exact evaluation of the
established governed scope. It does not authorize textual equality between
`governedScope` and `subjectScope`.

This proposal does not change applicability outcomes, authority boundaries,
Contract semantics, or the ratified Contract. It proposes only removal of the
unauthorized equality constraint and focused conformance coverage.

## Required Remediation

### 1. Remove the unauthorized equality constraint

Remove only the condition equivalent to:

```ts
governedScope === subjectScope
```

Do not compare `subjectScope` to `governedScope` as a substitute for the
approved governed-scope check.

### 2. Preserve exact governed-scope evaluation

Retain exact matching of the supplied authoritative `governedScope` against
the already-established governed semantic boundary:

`Guvna Semantic Contract semantic boundary`

The comparison must be exact. No trimming, case folding, normalization,
aliasing, widening, narrowing, mapping, or inferred equivalence is authorized.
An incorrect, missing, malformed, ambiguous, conflicting, stale, revoked, or
unsupported governed-scope input remains fail-closed as `indeterminate`.

The remediation must not invent a new scope value or modify the existing human
applicability authority decision.

### 3. Preserve independent subject-scope input

Retain `subjectScope` as an explicit independent authoritative input. A valid,
non-empty subject scope is required according to the approved authority-input
boundary, and its provenance must continue to be preserved where supplied.

A subject scope may be distinct from the governed scope. That distinction
alone must not produce `indeterminate`.

Missing, malformed, ambiguous, conflicting, stale, revoked, or unsupported
subject-scope input must remain fail-closed according to the approved
authority-input requirements. The remediation must not infer, replace,
canonicalize, or equate the subject scope with the governed scope.

### 4. Preserve all other determination semantics

The remediation must preserve:

- authoritative external decision inputs;
- attributable authority identity, decision identity, decision version or
  effective revision, and authority provenance;
- explicit validation state;
- explicit validity evidence and provenance;
- explicit effective-boundary evidence and provenance;
- fail-closed behavior;
- exactly one result: `applicable`, `not-applicable`, or `indeterminate`;
- the prohibition on creating, altering, or ratifying authority decisions;
- the prohibition on inferring applicability from identity, version,
  implementation, filesystem, process, or generated state.

## Focused Conformance Tests

Add only tests within the existing Applicability Determination test boundary.
The tests must demonstrate:

1. A supplied `governedScope` exactly equal to the established governed
   semantic boundary can proceed when all other approved inputs are valid.
2. A supplied `subjectScope` distinct from `governedScope` is accepted when it
   is present, well-formed, authoritative, and all other approved inputs are
   valid.
3. A distinct `subjectScope` alone does not produce `indeterminate`.
4. An incorrect supplied `governedScope` fails closed as `indeterminate`.
5. A missing or malformed `subjectScope` fails closed as `indeterminate`.
6. Invalid, ambiguous, conflicting, stale, revoked, or unsupported subject-scope
   evidence fails closed where represented by the approved authority-input
   boundary.
7. Existing `applicable`, `not-applicable`, provenance, validity,
   effective-boundary, mutation-prohibition, and fail-closed tests remain
   passing.

The tests must not silently replace the independent subject scope with the
 governed scope and must not alter the authority decision to make a test pass.

## Evidence and Validation

The implementation handoff must provide evidence that:

- only the unauthorized governed/subject equality predicate was removed or
  corrected;
- exact matching against the established governed scope remains;
- independent subject-scope validation remains;
- all three approved outcomes remain unchanged;
- provenance remains preserved for applicable, not-applicable, and
  indeterminate results;
- no authority decision, Contract, artifact, path, or downstream surface was
  modified.

Required focused verification:

- `pnpm -C core typecheck`
- `pnpm -C core test`
- changed-path and mutation-boundary verification

## Explicit Non-Authorization

This proposal does not authorize:

- changing the human applicability authority decision;
- changing the ratified Guvna Semantic Contract;
- changing governed scope or subject scope values;
- changing applicability result vocabulary or fail-closed semantics;
- creating or designating an Applicable Contract;
- creating, relocating, or designating a Contract artifact or workspace path;
- Runtime, SDK, Projection, Host, or downstream realization;
- general compiler implementation or unrelated remediation;
- executing or rerunning Applicability Determination before this proposal is
  separately approved.

## Requested Decision

**APPROVED:** authorize exactly the narrowly scoped remediation and focused
conformance tests described above. No other implementation or semantic change
is authorized. The implementation requires a separate authorized realization
handoff; this approval does not itself mutate `core/` files or execute tests.

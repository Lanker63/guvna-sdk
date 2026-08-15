# Applicability Determination Conformance Execution Proposal

**Phase:** 3 - Build the Doctrine Compiler
**Authority gate:** Post-implementation conformance review
**State:** APPROVED
**Governing approval:** Approved Applicability Determination Conformance Review

## Proposed review action

Execute the approved conformance review against the Applicability
Determination implementation and its compiler evidence.

The review must inspect only the approved capability: evaluation of
authoritative external inputs against established governed scope and required
validity/effective-boundary conditions, producing exactly `applicable`,
`not-applicable`, or `indeterminate` with provenance preservation and
fail-closed behavior.

## Review procedure

1. Confirm the changed-path manifest contains only approved paths.
2. Confirm the implementation accepts authoritative inputs only.
3. Exercise all three approved outcomes.
4. Exercise missing, ambiguous, conflicting, stale, revoked, and unsupported
   input cases and confirm fail-closed `indeterminate` behavior.
5. Verify exact governed-scope evaluation.
6. Verify validity and effective-boundary evaluation.
7. Verify provenance preservation from inputs through result.
8. Verify no Candidate Contract ratification or authority-decision mutation.
9. Verify no unrelated compiler-stage or unresolved capability implementation.
10. Record a finding as `conformant`, `non-conformant`, or `indeterminate`.

## Stop conditions

Stop and classify the review as `indeterminate` or `non-conformant` when
required evidence is missing, provenance is ambiguous, scope cannot be
matched exactly, authority boundaries are violated, or unrelated mutation is
found.

## Exclusions

This review execution does not authorize implementation, ratification,
authority-decision creation or alteration, delegation, revocation,
repository applicability, compatibility, other unresolved Gate 2 capabilities,
or general compiler-stage work.

## Evidence output

Write only review evidence under:

- `.guvna/agent-state/evidence/compiler/**/*.yaml`
- `.guvna/agent-state/evidence/compiler/**/*.md`

No implementation or governed artifact is modified by this proposal.

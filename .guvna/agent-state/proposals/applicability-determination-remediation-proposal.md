# Applicability Determination Remediation Proposal

**Phase:** 3 - Build the Doctrine Compiler
**Authority gate:** Post-implementation conformance remediation review
**State:** APPROVED
**Governing finding:** Applicability Determination conformance audit

## Remediation scope

This proposal addresses only the conformance findings against the approved
Applicability Determination realization. It does not expand the approved Gate
2 semantic boundary and does not authorize Runtime, SDK, Projection,
ratification, delegation, revocation, compatibility, or other unresolved Gate
2 work.

### 1. Authoritative-input validation

Validate, at the applicability boundary, that supplied authority inputs carry
an attributable authority identity, decision identity, decision version or
effective revision, and provenance sufficient to establish that the input is
externally supplied. Reject malformed, absent, ambiguous, conflicting, stale,
revoked, or unsupported authority inputs with `indeterminate`.

The implementation must consume the authority decision. It must not create,
alter, ratify, or infer that decision.

### 2. Validity and effective-boundary evaluation

Replace unchecked validity and effective-boundary assertions with explicit
input evidence that can be evaluated by the determination. The evaluation
must fail closed when validity evidence or effective-boundary evidence is
missing, ambiguous, conflicting, stale, revoked, or unsupported.

The existing exact governed-scope comparison remains required. A terminal
result must not bypass scope, validity, or effective-boundary evaluation.

### 3. Conformance tests

Add focused tests for:

- malformed or absent authority identity and decision provenance;
- invalid authority decision values;
- stale, revoked, conflicting, and unsupported authoritative inputs;
- `applicable`, `not-applicable`, and `indeterminate` outcomes;
- fail-closed behavior;
- exact governed-scope evaluation;
- validity/effective-boundary evaluation;
- provenance preservation for every result;
- prohibition on Candidate Contract ratification and authority-decision
  creation or alteration;
- mutation-boundary enforcement.

### 4. Process-state reconciliation

Update the stale compiler proposal process marker so its next action reflects
conformance remediation and review rather than initial implementation. This
is process evidence only and does not change semantic authority or mutation
scope.

## Workspace-reference item: separate prerequisite

The conformance report also noted that no concrete workspace artifact
identifying the ratified Applicable Semantic Contract was found. This is not
included as implementation remediation because the workspace has no approved
filesystem convention for compiled contracts, and creating or placing a
contract artifact would require a separate authority and location decision.

Before any future contract-dependent realization or conformance claim, human
authority should provide or explicitly designate an attributable, versioned
workspace reference to the ratified Applicable Semantic Contract. That item
is a prerequisite and review blocker, not an authorization to create or
relocate a contract artifact under this proposal.

## Preserved exclusions

This proposal does not authorize:

- Candidate Contract ratification;
- creation or alteration of authority decisions;
- delegation or revocation;
- Runtime, SDK, Projection, or Contract implementation;
- compatibility or other unresolved Gate 2 capability;
- general compiler-stage implementation;
- creation, relocation, or mutation of a ratified Applicable Contract artifact;
- Doctrine mutation, publication, or generated-artifact mutation.

This remediation scope is approved. Implementation remains blocked on the
separate workspace-reference prerequisite where contract-dependent
conformance requires it.

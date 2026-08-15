# Post-Conformance Applicability Determination Remediation Proposal

**Phase:** 3 - Build the Doctrine Compiler  
**Authority gate:** Post-conformance remediation review  
**State:** APPROVED  
**Governing finding:** Latest Applicability Determination conformance audit

## Remediation Scope

This proposal addresses only:

1. Preservation of validity and effective-boundary evidence provenance.
2. Missing adversarial test coverage.
3. Stale or inaccurate implementation and conformance evidence.

The conformance-auditor execution-boundary change is removed from this proposal and requires a separate tooling proposal.

## 1. Provenance Preservation

Update the Applicability Determination result so provenance from:

- authority input;
- validity evidence; and
- effective-boundary evidence

is preserved through the final result for `applicable`, `not-applicable`, and `indeterminate`.

The result must not retain only authority-level provenance.

The existing approved input/output boundary must be reused. This proposal does not authorize new provenance semantics, authority taxonomy, effective-boundary algorithms, or contract identity schemes.

## 2. Required Adversarial Tests

Add focused tests for:

- invalid authority decision values;
- absent or malformed decision identity;
- absent decision version or effective revision;
- absent attribution;
- absent authority provenance;
- invalid or missing validity evidence;
- invalid or missing effective-boundary evidence;
- prohibition on Candidate Contract ratification;
- prohibition on authority-decision creation or alteration;
- mutation-boundary enforcement.

Existing coverage for the following must remain:

- `applicable`;
- `not-applicable`;
- `indeterminate`;
- exact governed-scope matching;
- stale, revoked, conflicting, and unsupported authority inputs;
- fail-closed behavior;
- non-mutation of supplied inputs.

Tests remain limited to the Applicability Determination boundary.

## 3. Evidence Regeneration

Regenerate implementation and conformance evidence under:

- `.guvna/agent-state/evidence/compiler/**/*.yaml`
- `.guvna/agent-state/evidence/compiler/**/*.md`

Evidence must:

- report actual focused and package-wide test counts;
- report actual typecheck and validation results;
- include the complete changed-path manifest for authorized changes;
- remove stale validation claims;
- distinguish implementation evidence from conformance evidence;
- state that no Applicable Contract artifact was created, relocated, or mutated;
- state that contract-dependent claims remain `indeterminate` because the Applicable Contract reference is unresolved.

## Separate Tooling Proposal Required

The conformance-auditor execution boundary is implemented at:

- `.github/hooks/scripts/conformance-auditor-guard.py`

That hook contains the read-only command allowlist and is the precise path requiring modification to permit the already-approved verification commands.

This path is outside the current remediation mutation scope and must not be added to this proposal. A separate tooling proposal is required to authorize a narrowly scoped change that:

- allows only the explicitly approved read-only verification commands;
- preserves fail-closed behavior;
- preserves the auditor's mutation prohibition;
- preserves prohibition on Contract, Doctrine, Runtime, SDK, Projection, and authority-decision mutation;
- rejects commands outside the explicit read-only allowlist;
- does not authorize general shell execution or arbitrary commands.

No compiler implementation change may be used to work around this limitation.

## Preserved Authority Boundaries

This proposal does not authorize:

- changes to approved Applicability Determination semantics;
- authority-decision creation or alteration;
- Candidate Contract ratification;
- Applicable Contract creation, relocation, or mutation;
- resolution of the Applicable Contract workspace reference;
- delegation or revocation;
- compatibility implementation;
- other unresolved Gate 2 capabilities;
- general compiler work;
- Runtime, SDK, Projection, or Contract implementation;
- Doctrine, publication, or generated-artifact mutation;
- modification of `.github/hooks/scripts/conformance-auditor-guard.py`.

The Applicable Contract reference remains a separate prerequisite. Contract-dependent conformance claims remain `indeterminate`.

## Proposed Mutation Paths

Implementation and focused test changes:

- `core/src/compiler/**/*.ts`
- `core/tests/compiler/**/*.test.ts`

Evidence and process-state updates:

- `.guvna/agent-state/evidence/compiler/**/*.yaml`
- `.guvna/agent-state/evidence/compiler/**/*.md`
- `.guvna/agent-state/state.yaml`

No `.github/**` path is authorized by this proposal.

## Requested Decision

Human authority is requested to approve or revise this narrowly scoped remediation proposal.

The separate conformance-auditor tooling proposal must be reviewed independently. Implementation remains limited to the approved compiler, test, evidence, and process-state paths.

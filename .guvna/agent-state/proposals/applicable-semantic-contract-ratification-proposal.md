# Applicable Semantic Contract Ratification Proposal

**Phase:** Contract Ratification  
**Authority gate:** Human Contract Ratification  
**State:** REVIEW  
**Purpose:** Request human authority review of a Candidate Semantic Contract for ratification as the Applicable Semantic Contract.

## Ratification Boundary

Human Contract Ratification must establish whether a validated Candidate Semantic Contract becomes the applicable formal contract for its governed scope.

Ratification must be attributable and versioned. It must not create new Guvna meaning. Semantic IR, implementation evidence, generated output, agent-state records, and filesystem organization are not the Applicable Semantic Contract and are not proposed for ratification.

## Candidate Proposed for Ratification

No Candidate Semantic Contract is currently present in the repository or recorded in the process state.

The candidate identity, semantic version, governed scope, candidate artifact/reference, validation evidence, and candidate provenance are therefore unresolved:

```yaml
candidate:
  reference: null
  semantic_identity: null
  semantic_version: null
  governed_scope: null
  validation_evidence: null
  provenance: null
status: BLOCKED/UNRESOLVED
```

The approved Semantic IR proposal is not a Candidate Semantic Contract and must not be substituted for one. No implementation evidence, generated output, agent-state record, or filesystem path is proposed as the candidate.

## Proposed Ratification Decision

No ratification decision can be proposed while the Candidate Semantic Contract and its attributable validation/provenance record are absent.

```yaml
ratification:
  decision: null
  ratifying_authority: null
  ratification_reference: null
  ratified_contract_version: null
  effective_boundary: null
  provenance: null
status: BLOCKED/UNRESOLVED
```

Human authority must first provide or identify the validated Candidate Semantic Contract and its attributable provenance. Human authority must then decide whether to ratify it, reject it, or return it for revision. No decision is inferred from artifact existence, prior proposal approval, implementation success, or process-state records.

## Applicable Contract Prerequisite

The Applicable Semantic Contract remains intentionally unresolved:

```yaml
applicable_contract:
  reference: null
  version: null
  workspace_path: null
  status: BLOCKED/UNRESOLVED
  contract_dependent_claims: INDETERMINATE
```

This proposal does not create, relocate, designate, or mutate a Contract artifact or workspace path.

## Preserved Exclusions

This proposal does not authorize:

- Candidate Contract creation or alteration;
- Contract artifact creation, relocation, or mutation;
- ratification by an agent or implementation;
- inference of candidate identity, version, scope, authority, or provenance;
- Runtime, SDK, Projection, or compiler implementation;
- Doctrine or generated-artifact mutation;
- authority-decision creation, alteration, delegation, or revocation;
- resolution of unresolved Gate 2 algorithms.

## Requested Human Decision

Human authority is asked to provide the attributable, versioned validated Candidate Semantic Contract and its provenance, then decide the Contract Ratification outcome.

Until that authority decision occurs, the Applicable Contract reference remains `null`, its version remains `null`, its workspace path remains `null`, its status remains `BLOCKED/UNRESOLVED`, and contract-dependent claims remain `INDETERMINATE`.

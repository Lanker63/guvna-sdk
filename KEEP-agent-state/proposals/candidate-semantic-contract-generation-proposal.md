# Candidate Semantic Contract Generation Proposal

**Phase:** 4 - Compile the Candidate Semantic Contract  
**Authority gate:** Gate 4 - Candidate Contract Authority Gate  
**State:** APPROVED  
**Purpose:** Authorize the missing semantic-compilation step required to produce a validated Candidate Semantic Contract from already-approved semantic inputs.

## Missing Process Step

The governed process has approved the Semantic Model/Semantic IR meaning and Gate 3 compiler boundaries, but no Candidate Semantic Contract has yet been produced or designated.

The missing step is deterministic semantic compilation and Candidate Semantic Contract generation:

```text
Accepted Guvna Doctrine
        -> Approved Semantic Model / Semantic IR
        -> Normalize and Resolve
        -> Semantic Validate
        -> Compatibility and Semantic Delta analysis, where applicable
        -> Candidate Semantic Contract
        -> Human Contract Ratification Gate
```

This proposal stops at the Candidate Semantic Contract. It does not authorize ratification or applicability.

## Candidate Semantic Contract Definition

A Candidate Semantic Contract is a derived, non-applicable Guvna contract representation that:

- formally expresses accepted Guvna meaning;
- is compiled from the approved Semantic Model/Semantic IR and governing `doctrine/core/**` sources;
- contains the contract's semantic obligations and interpretation boundary, including applicable concepts, relationships, invariants, states, transitions, authority boundaries, provenance requirements, compatibility requirements, failure semantics, and realization obligations as applicable;
- is traceable to its source doctrine, semantic inputs, transformations, and validation results;
- has not been ratified and must not govern Runtime, SDK, Projection, or other downstream interpretation.

Semantic IR, implementation evidence, generated output, agent-state records, and filesystem organization are inputs, evidence, or realization records only. None constitutes the Candidate Semantic Contract by itself.

## Derivation Requirements

The semantic compiler must:

1. Read only accepted semantic sources and the already-approved Semantic Model/Semantic IR inputs.
2. Normalize only where approved semantic equivalence permits it; never infer missing meaning or insert defaults.
3. Resolve references, ownership, authority relationships, dependencies, conflicts, and provenance. Unresolved references and equal-authority conflicts remain explicit blocking findings.
4. Compile the approved Semantic IR content into the Candidate Semantic Contract representation.
5. Preserve source identity, transformations, conflicts, uncertainty, authority decisions, acceptance distinctions, and provenance.
6. Avoid filesystem order, implementation behavior, Runtime, SDK, repository behavior, generated output, or process state as semantic authority.
7. Fail closed when unresolved semantic gaps, invalid ownership, provenance loss, nondeterminism, or other blocking conditions affect meaning or deterministic output.

No approved Gate 2 decision may be changed, reopened, or replaced by this proposal.

## Candidate Identity, Version, and Provenance

The generated candidate must receive or preserve:

- a semantic identity derived from approved canonical semantic content and the approved identity-generation rules, never from filesystem location, process state, runtime address, timestamp, random value, or generated name;
- a semantic version represented according to the approved Semantic Versioning 2.0.0 rules and justified by the semantic evolution of the candidate relative to its semantic identity and any applicable predecessor;
- a governed semantic scope established by the compiled semantic inputs, not inferred from workspace location;
- provenance linking the candidate to accepted doctrine, Semantic Model/Semantic IR inputs, compilation transformations, validation results, compatibility analysis, and any semantic delta;
- an attributable record of whether identity was preserved or generated and the approved semantic inputs used for generation.

The compiler must not invent concrete identity, version, scope, or provenance values when the approved inputs do not establish them. Such absence or ambiguity is a blocking finding for candidate generation.

## Validation Before Ratification Review

Before presentation to human Contract Ratification, the candidate must have evidence of:

- structural conformance to the approved Semantic Model/Semantic IR shape;
- semantic conformance to accepted `doctrine/core/**` meaning;
- resolved references and valid ownership/authority relationships;
- preserved and complete provenance for material contract content and transformations;
- preserved distinctions among authority, acceptance, provenance, uncertainty, contradiction, lifecycle, ratification, applicability, supersession, rejection, and retirement;
- deterministic output for identical approved inputs;
- fail-closed handling of unresolved ambiguity, unsupported representation, invalid ownership, provenance loss, and nondeterminism;
- compatibility classification and Semantic Delta against a prior Applicable Semantic Contract when one is attributable and available; otherwise, that comparison remains `INDETERMINATE` and must not be inferred;
- explicit confirmation that the candidate is not ratified or applicable.

Validation establishes readiness for human review only. It does not establish authority, ratification, applicability, or downstream consumption rights.

## Candidate Representation and Artifact Boundary

The candidate is constituted by the validated Candidate Semantic Contract representation together with its attributable provenance, validation report, compatibility/Semantic Delta result where applicable, and deterministic generation evidence.

This proposal does not prescribe or invent a filesystem path, package location, generated-artifact location, or workspace convention. The candidate may be represented as an in-memory or review-bound compilation output until a separate authority decision establishes an approved persistence/reference convention.

No Candidate Semantic Contract artifact is created by this proposal.

## Human Contract Ratification Boundary

Only human Contract Ratification may:

- accept or reject the validated candidate for ratification review;
- authorize the candidate as the Applicable Semantic Contract;
- establish the ratification event, attributable authority, ratified contract version, effective boundary, applicable scope, and ratification provenance;
- establish supersession or retirement relationships as required by the governing process.

Semantic compilation, validation, implementation evidence, generated output, filesystem presence, and Runtime/SDK availability cannot perform any of these actions.

## Preserved Exclusions

This proposal does not authorize:

- While this proposal remains in `REVIEW`, no Candidate Semantic Contract is generated, persisted, designated, ratified, or treated as applicable.
- Human approval of this proposal authorizes subsequent execution of the Candidate Semantic Contract generation step only within the exact boundaries defined above.
- That execution may produce the validated Candidate Semantic Contract as an in-memory or review-bound compilation result, together with the required provenance, validation, compatibility/Semantic Delta, and deterministic-generation evidence.
- Execution must not ratify the candidate, establish applicability, create or alter authority decisions, designate a workspace path, create or relocate a Contract artifact, or establish downstream consumption rights.
- Contract Ratification or declaration of applicability;
- Applicable Contract creation, relocation, mutation, or workspace designation;
- invention or reopening of Gate 2 decisions;
- Runtime, SDK, Projection, Host, or general compiler realization work;
- authority-decision creation, alteration, delegation, or revocation;
- repository-specific semantic authority;
- Doctrine mutation, publication, or generated-artifact mutation.

The current Applicable Contract prerequisite remains:

```yaml
reference: null
version: null
workspace_path: null
status: BLOCKED/UNRESOLVED
contract_dependent_claims: INDETERMINATE
```

## Requested Decision

Human authority is asked to approve or revise this narrowly scoped Gate 4 Candidate Semantic Contract generation proposal.

No Candidate Semantic Contract will be generated, persisted, designated, ratified, or treated as applicable while this proposal remains in `REVIEW` state. Approval authorizes only the bounded generation execution described above; it does not authorize a filesystem path, package location, persistence convention, workspace reference, ratification, applicability, or downstream consumption.

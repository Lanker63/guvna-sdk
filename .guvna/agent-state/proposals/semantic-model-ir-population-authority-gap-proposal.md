# Semantic Model / Semantic IR Population Authority-Gap Proposal

**Phase:** 1-2 unblock process step  
**Authority gate:** Semantic Model / Semantic IR Population Authority Gate  
**State:** APPROVED  
**Purpose:** Define the missing bounded process step that produces an approved, populated Semantic Model/Semantic IR instance suitable as input to Gate 4 Candidate Semantic Contract compilation.

## Current Blocker

Gate 4 Candidate Semantic Contract generation is correctly blocked because no approved, populated Semantic Model/Semantic IR instance exists.

The Gate 1 artifact is a `REVIEW` conceptual design sketch with a semantic-gap inventory and no complete semantic instance. The Gate 2 artifact approves the generic IR boundary and decision rules, but does not populate the contract-specific semantic content. The approved Gate 4 decision groups provide lifecycle/acceptance, compatibility, and initial versioning rules, but do not themselves supply the candidate contract's obligations, scope, concepts, relationships, references, or identity-bearing canonical content.

This proposal does not treat the Gate 1 sketch as an approved instance and does not retry Candidate generation.

## Requested Human Decision

Approve or revise this narrowly scoped population process. Approval would authorize deterministic population/derivation and production of the review-bound populated Semantic Model/Semantic IR instance plus its completeness evidence from the listed accepted sources, subject to the fail-closed execution boundaries below. Approval of this proposal would not establish that the resulting populated instance is approved, complete, or suitable for Gate 4 input.

After population, the resulting instance and evidence must be returned to human authority for a separate explicit acceptance decision:

```text
APPROVE populated Semantic Model/Semantic IR as complete and suitable Gate 4 input
```

or:

```text
REVISE / BLOCK
```

Candidate Semantic Contract generation remains prohibited until the first decision is explicitly recorded. Approval of this proposal does not authorize Candidate Semantic Contract generation, Contract Ratification, applicability, Contract artifact creation, workspace-path designation, Runtime/SDK/Projection mutation, or reopening of Gate 2 or the three approved Gate 4 decision groups.

## Authoritative Inputs

Only these sources may provide semantic meaning:

1. Accepted doctrine under `doctrine/core/**`, including the constitutional, canonical, and architectural sources cited by the Gate 1 and Gate 4 authority-gap records.
2. The approved Gate 1 Semantic Model decisions and resolved semantic distinctions, used as modeling constraints and provenance-bearing structure. The Gate 1 `REVIEW` sketch itself is not treated as a populated instance or semantic authority.
3. The approved Gate 2 Semantic IR structure, canonicalization rules, identity rules, provenance obligations, authority/acceptance distinctions, and approved decision records.
4. The three approved Gate 4 decision groups:
   - Contract lifecycle and acceptance vocabulary/transition matrix;
   - Contract-specific compatibility requirements, predicates, result vocabulary, and comparison scope;
   - Candidate version-bearing subject, initial/no-predecessor status, authority-supplied version `1.0.0`, and initial Semantic Delta `not-applicable` / absent.

Process state, implementation code, Runtime/SDK behavior, filesystem organization, generated output, package metadata, timestamps, model recommendations, and existing evidence are not semantic authority. They may be used only as process or provenance evidence where the approved semantic rules permit.

## What Constitutes a Populated Semantic Model / Semantic IR Instance

A populated instance is a concrete, canonical, provenance-preserving representation whose required fields are present and whose material values are derived from authoritative inputs. It must contain, at minimum:

- semantic identity or an identity derivation record sufficient to deterministically derive identity from canonical content;
- semantic version context, including the approved Candidate subject and authority-supplied `1.0.0` initial version input;
- an explicitly established governed semantic scope;
- contract meaning and obligations;
- concepts/entities and their definitions;
- relationships and dependency direction;
- resolved semantic references, with dangling or ambiguous references retained as blockers;
- invariants/constraints and their provenance;
- authority boundaries, authority identities, acceptance context, and delegation distinctions where applicable;
- lifecycle and acceptance semantics from the approved Decision Group 1;
- compatibility requirements, predicates, supported subject/scope direction, and result semantics from the approved Decision Group 2;
- the initial/no-predecessor status and `Semantic Delta: not-applicable` / absent from approved Decision Group 3;
- derivations and transformations from doctrine/model input to IR;
- complete provenance for every material semantic object and transformation;
- explicit uncertainty, contradiction, and unresolved-gap records where applicable.

A populated instance is not merely a schema, a proposal, an implementation evidence file, a generated output, or a collection of approved decisions without their derived semantic content.

## Bounded Population Procedure

### 1. Discover and bind sources

Enumerate the accepted `doctrine/core/**` sources and the approved Gate 1/Gate 2/Gate 4 decision evidence. Record source identity and provenance. Exclude `doctrine/agentic/**` and all realization/process surfaces as semantic sources.

### 2. Extract doctrine-established meaning

For each concept, obligation, relationship, invariant, authority boundary, lifecycle rule, compatibility rule, version rule, and provenance requirement, record the exact governing source passage and semantic ownership. Silence remains a gap. No default, convenience value, implementation precedent, or inferred relationship may be inserted.

### 3. Assemble the Semantic Model

Populate the generic semantic-kernel concepts, relationships, constraints, transitions, derivations, contracts, realizations, authority/acceptance context, provenance graph, compatibility context, identity, version, scope, and meaning fields defined by the approved Gate 2 structure. Preserve distinctions and dependency direction; do not create domain-specific semantics beyond accepted doctrine.

### 4. Resolve references and ownership

Resolve every reference to a defined semantic concept or explicitly authoritative external input. Verify ownership, authority, scope, and dependency direction. Preserve equal-authority conflicts and unsupported ambiguity as blocking records; do not choose a target or precedence by inference.

### 5. Apply approved decision inputs

Apply the three approved Gate 4 decision groups exactly as semantic inputs:

- lifecycle and acceptance values/transitions remain distinct and attributable;
- compatibility is requirement-driven with the approved subjects, predicates, results, and fail-closed behavior;
- the candidate is the initial/no-predecessor contract subject with authority-supplied version `1.0.0` and initial Semantic Delta `not-applicable` / absent.

These decisions fill only their approved domains. They do not create obligations, relationships, scope, or other contract meaning absent from accepted doctrine.

### 6. Canonicalize without semantic invention

Use only the approved Gate 2 normalization, ordering, serialization, identity-preimage, and provenance rules. Normalize only meaning-preserving equivalences explicitly supported by approved rules. Do not sort, deduplicate, merge, split, default, resolve ambiguity, or generate identity values from filesystem/process data.

### 7. Produce the populated IR instance and evidence

Produce a review-bound populated Semantic Model/Semantic IR result with source manifest, semantic extraction map, reference/ownership report, provenance graph, unresolved-gap report, canonicalization result, and deterministic input digest/evidence. This result is a semantic compilation input, not a Candidate Semantic Contract and not a Contract artifact.

## Population of Required Semantic Content

### Governed scope

Scope must be explicitly supported by accepted doctrine and the approved semantic inputs. It must identify the semantic subject and boundary to which the model applies. Workspace location, package name, repository path, or process state cannot supply scope. If the sources do not establish scope, retain the gap and stop.

### Obligations and meaning

Obligations must be extracted from accepted doctrine and architectural contract definitions, with each obligation linked to its source passage and semantic owner. The approved Gate 4 lifecycle, compatibility, and version rules may constrain the relevant obligations but cannot invent domain obligations.

### Relationships and references

Relationships must follow the approved architectural dependency direction. Each reference must resolve to a defined concept or an explicitly attributable external authority input. Dangling, ambiguous, conflicting, or equal-authority unresolved references block completion.

### Invariants and constraints

Invariants must be drawn from accepted constitutional, canonical, and architectural doctrine. They must remain distinguishable from implementation checks and carry source provenance. No Runtime/SDK behavior may be promoted into an invariant.

### Authority boundaries

Authority identity, scope, capabilities, delegation, acceptance, ratification, applicability, and provenance must remain distinct. The model may represent externally approved authority inputs, but population cannot create authority decisions or grant ratification/applicability authority.

### Lifecycle and acceptance

Populate only the approved Decision Group 1 vocabulary and transition matrix. Preserve the distinction among lifecycle, acceptance, ratification, applicability, supersession, rejection, and retirement. No additional state or transition may be invented.

### Compatibility requirements

Populate only the approved Decision Group 2 requirement schema, subjects, predicates, comparison direction, result vocabulary, and fail-closed semantics. No predecessor comparison is available for this initial candidate; that absence remains explicitly non-comparative and does not become a compatibility result.

### Version and Semantic Delta

Populate the Guvna Semantic Contract as the version-bearing subject, bind the authority-supplied initial version `1.0.0`, record initial/no-predecessor status, and represent the initial Semantic Delta as `not-applicable` / absent. Preserve mandatory provenance to approved semantic inputs. Do not add major/minor/patch increment mappings.

## Completeness and Suitability Validation

The populated instance is complete and suitable as Gate 4 input only if all checks pass:

1. Every required structural field has a value or an explicitly permitted empty/absent representation.
2. Every material semantic value traces to accepted doctrine, an approved Gate 2 rule, or one of the three approved Gate 4 decision groups.
3. Every concept, obligation, relationship, invariant, transition, reference, scope, authority boundary, compatibility requirement, version value, and provenance record is attributable.
4. All references resolve; no ownership, authority, scope, or dependency-direction conflict remains unresolved.
5. No semantic gap affecting meaning, identity, scope, validation, or deterministic output remains hidden or guessed.
6. Lifecycle/acceptance, compatibility, version, ratification, applicability, provenance, uncertainty, contradiction, and realization distinctions remain explicit.
7. Canonicalization and identity derivation are deterministic for identical approved inputs and independent of filesystem/process order.
8. The initial/no-predecessor representation is explicit, with no predecessor comparison or compatibility claim and `Semantic Delta: not-applicable` / absent.
9. The result is a populated Semantic Model/Semantic IR input, not a Candidate Semantic Contract, Contract artifact, ratification record, or applicability decision.
10. A second deterministic run produces equivalent canonical content and provenance evidence.

Failure of any check yields `BLOCKED`; the process must report the exact missing or contradictory input and stop.

## Authority Versus Deterministic Derivation

### Requires human authority

- Acceptance of the populated Semantic Model/Semantic IR instance as complete and suitable Gate 4 input.
- Any semantic content not established by the listed doctrine or approved decisions.
- Any new concept, obligation, scope, relationship, invariant, authority rule, lifecycle state, compatibility rule, version value, or provenance interpretation.
- Resolution of equal-authority conflicts, ambiguous references, unsupported scope, or contradictory authoritative inputs.
- Any change to Gate 2 or the three approved Gate 4 decision groups.

### Deterministic compilation/derivation may perform

- Extract and normalize doctrine-established meaning under approved rules.
- Assemble the approved generic IR structure.
- Resolve references and ownership where the authoritative inputs determine a unique result.
- Apply the approved lifecycle, compatibility, and initial-version decisions without extending them.
- Derive canonical identity content and provenance records from approved semantic content.
- Validate completeness, conformance, provenance, and determinism.
- Report blockers and stop without filling gaps.

Deterministic derivation cannot ratify, establish applicability, create authority decisions, select a workspace path, or turn a populated model/IR into a Candidate Contract.

## Exact Boundary to Candidate Contract Generation

The population step ends when it has produced:

```text
Approved doctrine + approved decisions
        -> populated, validated Semantic Model/Semantic IR
        -> human authority review of population completeness
        -> STOP
```

Candidate Contract generation begins only as a separate later action:

```text
approved populated Semantic Model/Semantic IR
        -> Gate 4 normalize/resolve/validate
        -> Candidate Semantic Contract
        -> human Contract Ratification gate
```

The population step must not emit, designate, persist, or treat any result as a Candidate Semantic Contract. It must not perform Candidate Contract validation as a substitute for model/IR validation. The Candidate Contract generator remains unchanged and must not be retried by this proposal.

## Requested Decision

Human authority is asked to approve or revise this missing population process. Approval authorizes deterministic population/derivation and production of the review-bound populated Semantic Model/Semantic IR instance and its completeness evidence only. It does not approve, accept, or establish that the populated instance is complete or suitable for Gate 4. The resulting instance and evidence must return to human authority for the separate explicit `APPROVE populated Semantic Model/Semantic IR as complete and suitable Gate 4 input` or `REVISE / BLOCK` decision. If execution encounters unsupported meaning, unresolved references, conflicting authority, missing scope, or another blocking condition, it must fail closed and return the specific blocker rather than implicitly requesting or receiving a human resolution during execution. Candidate Semantic Contract generation remains prohibited until the separate acceptance decision is recorded. This proposal does not ratify or apply a contract, create an artifact, designate a workspace path, or alter any approved Gate 2 or Gate 4 decision.

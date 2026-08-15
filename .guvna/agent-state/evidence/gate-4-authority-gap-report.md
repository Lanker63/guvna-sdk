# Gate 4 Candidate Semantic Contract Generation Authority-Gap Report

**Status:** BLOCKED / HUMAN REVIEW REQUIRED  
**Scope:** Gate 4 Candidate Semantic Contract generation only  
**Purpose:** Identify the unresolved Semantic Model decisions that prevent deterministic Candidate Semantic Contract generation.

No Candidate Semantic Contract was generated. No generator or implementation code was modified. No Gate 2 decision was reopened. No Contract artifact, workspace path, applicability decision, or ratification event was created.

## Authority Boundary

Approved Gate 2 decisions establish generic structure, provenance preservation, deterministic identity and serialization rules, SemVer 2.0.0 syntax/precedence, and explicit-requirement compatibility comparison. They do not establish the artifact-specific lifecycle, compatibility predicates, version assignment, predecessor, or Semantic Delta values required to produce this candidate.

The process therefore remains fail-closed. Existing implementation behavior, process state, filesystem organization, generated output, or version convention cannot supply the missing meaning.

## Decision Gaps

### 1. Contract lifecycle vocabulary and transitions

**Exact semantic question**

Which lifecycle states and acceptance states apply to a Semantic Contract and its candidate, validated, ratified, applicable, superseded, rejected, and retired forms? Which `from -> operation -> to` transitions are permitted, and what preconditions, authority requirements, effective-boundary rules, scope rules, and provenance obligations govern each transition?

This includes whether acceptance has only the approved structural distinction from lifecycle or requires a richer state vocabulary, while preserving the distinction among acceptance, ratification, applicability, supersession, rejection, retirement, and lifecycle.

**Governing sources**

- [ARCHITECTURAL-INVARIANTS.md](../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md): the Candidate, Validated, Ratified, Applicable, Superseded, and Incompatible or Rejected states must remain distinguishable; compilation, validation, ratification, and applicability are separate boundaries.
- [SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md](../../doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md): lifecycle state is distinct from identity and the exact lifecycle vocabulary is governed by the applicable Semantic Contract.
- [REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md](../../doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md): state transitions require current state, operation, preconditions, authority context, and contract version; transitions must not be inferred.
- [gate-2-semantic-ir-proposal.yaml](../proposals/gate-2-semantic-ir-proposal.yaml): lifecycle and acceptance remain distinct, but exact enumerations and artifact-specific transition matrices remain unresolved; lifecycle and transition algorithms are excluded.
- [candidate-semantic-contract-generation-proposal.md](../proposals/candidate-semantic-contract-generation-proposal.md): the candidate must preserve lifecycle, ratification, applicability, supersession, rejection, and retirement distinctions and must fail closed when meaning is unresolved.

**Already implied or requires human authority?**

The distinctions and boundary rules are implied by approved doctrine and Gate 2. The exact state vocabulary, acceptance vocabulary, transition matrix, authority/precondition rules, effective-boundary semantics, and transition reference requirements are a genuine semantic gap requiring human authority.

**Minimum decision required to unblock generation**

Approve the applicable lifecycle and acceptance state sets and the artifact-specific transition matrix for the Candidate Semantic Contract. The decision must specify permitted transitions, required authority context, scope/effective-boundary conditions, provenance, rejection/supersession/retirement behavior, and the semantic role and requiredness of any transition authority reference. It must not ratify or establish applicability.

### 2. Compatibility requirements, scope, and result predicates

**Exact semantic question**

What authoritative compatibility-requirement set and semantic predicates apply to this contract scope and comparison subject? Which subject pairs and dependency directions are supported, and under what conditions does the result become `compatible`, `incompatible`, or `indeterminate`? Are broader classifications such as `Projection-compatible`, `Adaptable`, or `Migration-required` part of this Candidate Contract, or are they outside its contract scope?

**Governing sources**

- [gate-2-semantic-ir-proposal.yaml](../proposals/gate-2-semantic-ir-proposal.yaml): approved SemVer 2.0.0 parsing/precedence and explicit-requirement comparison; the requirement set must be authoritative and externally supplied; version-only and applicability inference are prohibited; missing, unresolved, ambiguous, unavailable, or unsupported requirements yield `indeterminate`.
- [REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md](../../doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md): defines contextual semantic compatibility classifications including `Compatible`, `Projection-compatible`, `Adaptable`, `Migration-required`, `Incompatible`, and `Indeterminate`.
- [ARCHITECTURAL-INVARIANTS.md](../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md): semantic evolution must identify compatibility implications and preserve an attributable Semantic Delta; compatibility cannot be inferred from implementation or version alone.
- [CONCEPTUAL-ARCHITECTURE.md](../../doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md): Guvna owns contract semantics while repository-specific meaning remains separately owned; compatibility is a contract-boundary concern, not a filesystem or implementation concern.
- [candidate-semantic-contract-generation-proposal.md](../proposals/candidate-semantic-contract-generation-proposal.md): compatibility comparison is required when an attributable prior Applicable Contract exists; otherwise it remains `INDETERMINATE` and must not be inferred.

**Already implied or requires human authority?**

The requirement-driven, contextual, provenance-preserving, fail-closed comparison model is already approved. The actual requirement schema, predicates, supported subject/scope matrix, directionality, classification vocabulary for this contract, and conditions for each result are genuine semantic gaps requiring human authority. No prior Applicable Contract is currently attributable, so no comparison may be invented.

**Minimum decision required to unblock generation**

Approve the compatibility requirement schema and predicates for the governed contract scope, including comparison subjects, dependency direction, scope, applicable result vocabulary, and the conditions yielding `compatible`, `incompatible`, or `indeterminate`. Explicitly record that the current predecessor comparison is unavailable/indeterminate unless an attributable prior Applicable Contract is separately supplied. This decision must not establish applicability.

### 3. Candidate version, version-bearing subject, predecessor, and Semantic Delta

**Exact semantic question**

What semantic subject receives the candidate version, what identity and governed scope does that version describe, and what attributable predecessor or initial-version decision applies? If a predecessor exists, which semantic changes constitute the Semantic Delta and how are they classified for versioning and compatibility purposes?

**Governing sources**

- [gate-2-semantic-ir-proposal.yaml](../proposals/gate-2-semantic-ir-proposal.yaml): SemVer 2.0.0 syntax and precedence are approved; version precedence does not establish authority, applicability, supersession, or compatibility. The approved identity rules require semantic inputs and fail closed on ambiguity.
- [CONCEPTUAL-ARCHITECTURE.md](../../doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md): a new contract version requires a material semantic-boundary change; implementation or documentation changes alone do not establish a new semantic version.
- [ARCHITECTURAL-INVARIANTS.md](../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md): semantic evolution requires an attributable delta and version dimensions remain distinct from authority, applicability, and compatibility.
- [candidate-semantic-contract-generation-proposal.md](../proposals/candidate-semantic-contract-generation-proposal.md): candidate identity, version, scope, provenance, and predecessor comparison must be established from approved semantic inputs; absent or ambiguous values block generation.
- [state.yaml](../state.yaml): process state records the Applicable Contract prerequisite as `BLOCKED/UNRESOLVED` with null reference, version, and workspace path. This is process evidence, not semantic authority.

**Already implied or requires human authority?**

SemVer 2.0.0 syntax/precedence, semantic identity provenance, and the separation of version from authority/applicability are already approved. The candidate's concrete version value, version-bearing subject, semantic-change classification, predecessor identity/version, and Semantic Delta representation are not established by the available approved semantic inputs. They require human authority or an attributable approved predecessor/input. No version may be inferred from filesystem state, process state, timestamps, generated names, or implementation changes.

**Minimum decision required to unblock generation**

Provide or approve the attributable predecessor and Semantic Delta inputs, or explicitly authorize an initial/no-predecessor candidate with its semantic identity, governed scope, and SemVer value. Approve the version-bearing subject and semantic-change classification rules needed for this contract. The decision must establish version/provenance inputs only; it must not ratify the candidate, establish applicability, designate a path, or create a Contract artifact.

## What Does Not Require a New Decision

The following approved Gate 2 decisions remain in force and are not reopened:

- compact UTF-8 JSON serialization and its deterministic primitive rules;
- meaning-preserving normalization with no inferred defaults;
- approved collection ordering behavior;
- identity preimage, encoding, and digest rules;
- distinction among authority, acceptance, provenance, uncertainty, and contradiction;
- SemVer 2.0.0 syntax and precedence;
- explicit-requirement compatibility comparison with `compatible`, `incompatible`, and `indeterminate` behavior as far as the approved generic protocol specifies;
- applicability determination only from authoritative external inputs, without ratification or authority mutation.

These rules become usable for Candidate compilation only after the contract-specific semantic gaps above are supplied by an attributable human authority decision or accepted approved input.

## Conclusion

Gate 4 cannot produce a validated Candidate Semantic Contract deterministically until human authority resolves the three decision groups above. The required next authority action is to review and decide the minimum lifecycle/transition, compatibility requirement/predicate, and version/predecessor/delta questions. No generator change or generation retry is authorized by this report.

**Current status remains:** `BLOCKED/UNRESOLVED`  
**Candidate Semantic Contract:** `null`  
**Applicable Contract:** `reference: null`, `version: null`, `workspace_path: null`  
**Ratification/applicability:** not performed

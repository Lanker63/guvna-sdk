# Canonical Models Realization Plan

## 1. Desired State and Scope

This plan tracks the phased realization of Guvna Core from Constitutional Doctrine through Applicable Semantic Contract, beginning with Canonical Models as the first node to realize.

Desired state:

- Constitutional Doctrine is realized in Canonical Models.
- Canonical Models are realized in Architectural Doctrine.
- Architectural Doctrine is realized in Semantic Contracts.
- Semantic Contracts are realized through Semantic Compilation into Candidate Semantic Contract.
- Candidate Semantic Contract is subjected to Semantic Validation.
- Validated candidate contracts are eligible for Contract Ratification.
- Ratified contracts become the Applicable Semantic Contract.
- The Applicable Semantic Contract governs downstream Runtime interpretation.

Scope:

- This is a phased realization plan for Guvna Core.
- Canonical Models are the first realization node.
- The plan is minimal and evolutionary.
- The plan does not invent new semantic meaning or propose speculative abstractions.
- The plan preserves the distinction between validation and ratification.

## 2. Authority and Requirement Ledger

Authoritative source basis:

- [doctrine/core/constitution/VISION.md](../../../doctrine/core/constitution/VISION.md)
- [doctrine/core/constitution/EPISTEMIC-INVARIANTS.md](../../../doctrine/core/constitution/EPISTEMIC-INVARIANTS.md)
- [doctrine/core/canonical/REPOSITORY-INTELLIGENCE-MODEL.md](../../../doctrine/core/canonical/REPOSITORY-INTELLIGENCE-MODEL.md)
- [doctrine/core/canonical/REPOSITORY-UNDERSTANDING-MODEL.md](../../../doctrine/core/canonical/REPOSITORY-UNDERSTANDING-MODEL.md)
- [doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md](../../../doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md)
- [doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md](../../../doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md)
- [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md)
- [doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md](../../../doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md)

Requirement ledger:

1. Canonical Models must be realized as explicit, attributable semantic source concepts before any architectural or contract realization can be treated as authoritative.
2. Architectural Doctrine must preserve dependency direction, ownership, and realization boundaries.
3. Semantic Contracts must formally express accepted Guvna meaning without inventing new meaning.
4. Semantic Compilation must produce candidate contracts that are structurally and semantically conformant to governing source.
5. Semantic Validation must determine conformance and fail closed when the source is insufficient.
6. Contract Ratification must be attributable, versioned, and distinct from validation.
7. Applicable Semantic Contract must be downstream of ratification and govern Runtime interpretation.

## 3. Current State

Current implementation evidence indicates that Guvna Core already has a substantial contract-governance substrate in [core/src/compiler](../../../core/src/compiler): SemanticIR, authority/acceptance/provenance structures, lifecycle evaluation, applicability, deterministic identity materialization, and serialization.

Current implementation evidence also indicates that the repository does not yet expose a complete repository-facing epistemic pipeline that operationalizes Repository Information -> Evidence -> Repository Intelligence -> Repository Wisdom -> Repository Authority -> Acceptance -> Repository Truth -> Repository Knowledge -> Repository Understanding.

Runtime and SDK realization boundaries are not present in the reviewed implementation surface.

## 4. Gaps, Blockers, and Assumptions

Gaps:

- Canonical Models are not yet fully realized as explicit semantic source concepts.
- The repository-facing epistemic pipeline is incomplete on the reviewed surface.
- Runtime and SDK realization boundaries are not yet present in the reviewed implementation surface.

Blockers:

- The plan cannot claim authoritative downstream realization until Canonical Models are explicit and attributable.
- The plan cannot treat validation as ratification.
- The plan cannot fill any missing authority decision by inference.

Assumptions:

- None beyond the provided authority basis and current-state summary.
- If a required semantic authority is missing or contradictory, the plan remains conditional or blocked rather than guessing.

## 5. Phased Plan

### Phase 1: Canonical Models Realization

Objective

Realize Canonical Models as explicit, attributable semantic source concepts drawn from accepted constitutional and canonical doctrine.

Inputs and prerequisites

- Constitutional Doctrine and canonical source documents listed in the authority basis.
- The current implementation surface in [core/src/compiler](../../../core/src/compiler) as evidence of what exists today.

Scope and concrete work items

- Make the canonical source concepts explicit in the canonical model surface.
- Preserve attribution to the governing source.
- Preserve semantic distinction among the canonical epistemic concepts.
- Preserve provenance and fail-closed behavior where source authority is insufficient.
- Keep canonical realization narrow: no expansion into architectural or contract authority.

Validation and evidence

- Evidence artifact: canonical model surface that explicitly names the realized canonical concepts and their attributable source basis.
- Evidence artifact: tests demonstrating that missing or insufficient source authority fails closed rather than inventing semantics.

Exit criteria

- Canonical Models are explicit, attributable, and source-bound.
- Canonical Models are sufficiently realized to serve as the semantic source for the next phase.

Stop conditions

- Any missing or contradictory authority needed to name or distinguish the canonical concepts.
- Any attempt to extend canonical vocabulary beyond established authority.

### Phase 2: Architectural Doctrine Realization

Objective

Realize Architectural Doctrine so that dependency direction, ownership, realization boundaries, and authority boundaries are preserved.

Inputs and prerequisites

- Phase 1 output: explicit Canonical Models.
- Architectural Doctrine and Architectural Invariants.

Scope and concrete work items

- Define the architectural boundary between doctrine, canonical models, semantic contracts, and realizations.
- Preserve Guvna ownership of Guvna semantics.
- Preserve the separation between Guvna-owned semantics and repository-specific meaning.
- Preserve the ratification boundary between candidate and applicable contract states.

Validation and evidence

- Evidence artifact: architectural model surface or tests showing dependency direction is preserved.
- Evidence artifact: tests showing realizations do not become semantic source.

Exit criteria

- Architectural Doctrine reflects the canonical source path without reversing dependency direction.
- Ownership and boundary distinctions are explicit and attributable.

Stop conditions

- Any architectural change that silently relocates authority.
- Any realization that collapses source, compilation, validation, and ratification into one undifferentiated step.

### Phase 3: Semantic Contract Realization

Objective

Realize Semantic Contracts as formal expressions of accepted Guvna meaning without inventing new meaning.

Inputs and prerequisites

- Phase 2 output: explicit architectural boundary and ownership model.
- Canonical and architectural source documents.

Scope and concrete work items

- Define the formal semantic boundary between accepted Guvna meaning and realization.
- Preserve semantic identity, version, lifecycle, provenance, and scope as attributable contract concerns.
- Ensure Semantic Contracts remain Guvna-owned and do not absorb repository-specific truth.

Validation and evidence

- Evidence artifact: semantic contract surface that is attributable to canonical and architectural source.
- Evidence artifact: tests verifying contracts do not invent meaning beyond source.

Exit criteria

- Semantic Contract meaning is formalized and attributable.
- The contract surface is ready to be compiled into a candidate contract.

Stop conditions

- Any attempt to treat implementation details as semantic source.
- Any semantic gap that cannot be derived unambiguously from accepted doctrine.

### Phase 4: Semantic Compilation

Objective

Compile accepted Guvna meaning into a Candidate Semantic Contract that is structurally and semantically conformant to governing source.

Inputs and prerequisites

- Phase 3 output: explicit Semantic Contract surface.
- Canonical and architectural source.

Scope and concrete work items

- Produce a candidate contract from accepted meaning.
- Preserve structural conformance to the governing semantic source.
- Preserve semantic conformance without adding new meaning.
- Preserve attributable provenance for the compilation result.

Validation and evidence

- Evidence artifact: candidate contract output from semantic compilation.
- Evidence artifact: deterministic checks that the candidate is derived from source rather than from runtime presence or file presence.

Exit criteria

- Candidate Semantic Contract exists and is attributable to accepted source.
- The candidate is ready for validation.

Stop conditions

- Any compilation step that silently creates new meaning.
- Any candidate produced without sufficient provenance.

### Phase 5: Semantic Validation

Objective

Determine whether the Candidate Semantic Contract is structurally and semantically conformant to governing source, and fail closed when the source is insufficient.

Inputs and prerequisites

- Phase 4 output: candidate contract.
- Governing source and authoritative requirement set.

Scope and concrete work items

- Validate conformance to source.
- Detect missing, ambiguous, or contradictory authority.
- Fail closed when the source is insufficient.
- Distinguish validation from ratification.

Validation and evidence

- Evidence artifact: validation result that states conformance or non-conformance.
- Evidence artifact: negative tests proving insufficient source does not pass validation.

Exit criteria

- Validation determines whether the candidate is eligible for ratification.
- Validation evidence is deterministic and attributable.

Stop conditions

- Any validation path that infers missing authority.
- Any acceptance of a candidate solely because it parses, exists, or was generated successfully.

### Phase 6: Contract Ratification

Objective

Ratify a validated contract as the formal contract eligible for applicability within the governed scope.

Inputs and prerequisites

- Phase 5 output: validated candidate contract.
- A valid authority context for ratification.

Scope and concrete work items

- Establish attributable ratification as distinct from validation.
- Preserve versioning.
- Preserve the scope of the ratifying authority.
- Ensure ratification does not become a new source of Guvna meaning.

Validation and evidence

- Evidence artifact: ratification record or equivalent attributable surface.
- Evidence artifact: tests showing ratification is distinct from validation and from compilation.

Exit criteria

- The validated contract is ratified.
- The ratified contract is eligible to become applicable.

Stop conditions

- Any ratification that is not attributable or versioned.
- Any ratification that attempts to redefine accepted Guvna meaning.

### Phase 7: Applicable Semantic Contract

Objective

Make the ratified contract the Applicable Semantic Contract that governs downstream Runtime interpretation.

Inputs and prerequisites

- Phase 6 output: ratified contract.
- Architectural and runtime realization boundaries.

Scope and concrete work items

- Mark the ratified contract as applicable for its governed scope.
- Ensure downstream runtime interpretation is governed only by the applicable contract state.
- Preserve the distinction among candidate, validated, ratified, applicable, superseded, rejected, and incompatible states where relevant to the implementation surface.

Validation and evidence

- Evidence artifact: applicable contract surface or resolution path used by downstream realization.
- Evidence artifact: tests proving that candidate or merely generated contracts do not govern downstream interpretation.

Exit criteria

- The Applicable Semantic Contract is downstream of ratification.
- Runtime interpretation is governed by the applicable contract rather than by candidate or validation state.

Stop conditions

- Any downstream consumer that treats a candidate, draft, or merely generated contract as applicable.
- Any path that bypasses ratification.

## 6. Certification Matrix

| Requirement | Authoritative source | Implementation/test surfaces to change | Deterministic validation |
|---|---|---|---|
| Canonical Models must be explicit, attributable semantic source concepts | [doctrine/core/constitution/VISION.md](../../../doctrine/core/constitution/VISION.md), [doctrine/core/constitution/EPISTEMIC-INVARIANTS.md](../../../doctrine/core/constitution/EPISTEMIC-INVARIANTS.md), [doctrine/core/canonical/REPOSITORY-INTELLIGENCE-MODEL.md](../../../doctrine/core/canonical/REPOSITORY-INTELLIGENCE-MODEL.md), [doctrine/core/canonical/REPOSITORY-UNDERSTANDING-MODEL.md](../../../doctrine/core/canonical/REPOSITORY-UNDERSTANDING-MODEL.md), [doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md](../../../doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md) | Canonical model surface and the existing compiler substrate in [core/src/compiler](../../../core/src/compiler) | Tests proving explicit attribution and fail-closed behavior for insufficient source |
| Architectural Doctrine must preserve dependency direction, ownership, and realization boundaries | [doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md](../../../doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md), [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md) | Architectural model surface and tests that guard dependency direction | Tests proving source precedes realization and realizations do not become semantic source |
| Semantic Contracts must formally express accepted Guvna meaning without inventing new meaning | [doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md](../../../doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md), [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md) | Semantic contract surface in [core/src/compiler](../../../core/src/compiler) | Tests proving no new meaning is introduced by contract realization |
| Semantic Compilation must produce candidate contracts that are structurally and semantically conformant to governing source | [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md) | Semantic compilation and serialization surfaces in [core/src/compiler](../../../core/src/compiler) | Deterministic candidate generation checks and structural/semantic conformance tests |
| Semantic Validation must determine conformance and fail closed when the source is insufficient | [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md), [doctrine/core/constitution/EPISTEMIC-INVARIANTS.md](../../../doctrine/core/constitution/EPISTEMIC-INVARIANTS.md) | Validation and applicability evaluation surfaces in [core/src/compiler](../../../core/src/compiler) | Negative tests for missing, ambiguous, or contradictory authority |
| Contract Ratification must be attributable, versioned, and distinct from validation | [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md), [doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md](../../../doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md) | Ratification and lifecycle surfaces in [core/src/compiler](../../../core/src/compiler) | Tests proving ratification is separate from compilation and validation |
| Applicable Semantic Contract must be downstream of ratification and govern Runtime interpretation | [doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md](../../../doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md), [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md) | Applicability resolution surfaces and downstream runtime-facing boundaries | Tests proving only the applicable state governs interpretation |

## 7. Open Authority Decisions

1. Whether and where canonical lifecycle vocabulary is extended for release or stability if needed.
2. First release does not require a separate persisted ratification artifact; the serializable ratification record in the Semantic IR/provenance model is the ratification evidence surface.
3. Whether any other authority gap must be preserved as a conditional or blocked decision to keep doctrine boundaries intact.

## 8. Planning Status

Status: conditional and authority-bound.

This plan is complete as a planning artifact, but it remains blocked wherever a required semantic authority is missing or contradictory. It intentionally preserves the provided assessment, phase gates, validation evidence, exit criteria, stop conditions, and open authority decisions in meaning while organizing them into a sequential realization plan.
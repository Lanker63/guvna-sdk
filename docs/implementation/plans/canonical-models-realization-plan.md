# Canonical Models Realization Plan

## 1. Desired State and Scope

This plan tracks the phased realization of Guvna Core from Constitutional Doctrine through Applicable Semantic Contract, beginning with Canonical Models as the first node to realize. Canonical Models are now accepted as complete based on the implemented, source-attributed model and its fail-closed validation tests.

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

Runtime realization remains a separate downstream boundary after applicability selection and is not yet present in the reviewed implementation surface.

## 4. Gaps, Blockers, and Assumptions

Gaps:

- Canonical Models are completely realized as explicit, attributable semantic source concepts in the current implementation.
- The repository-facing epistemic pipeline is incomplete on the reviewed surface.
- Runtime interpretation and execution are not yet realized as a downstream boundary consuming the Applicable Semantic Context.

Blockers:

- Downstream realization remains conditional on the completed Canonical Models source boundary and the requirements of each subsequent phase.
- The plan cannot treat validation as ratification.
- The plan cannot treat applicability selection as runtime interpretation or execution.
- The plan cannot fill any missing authority decision by inference.

Assumptions:

- None beyond the provided authority basis and current-state summary.
- If a required semantic authority is missing or contradictory, the plan remains conditional or blocked rather than guessing.

## 5. Phased Plan

### Phase 1: Canonical Models Realization — Complete

Objective

Realize Canonical Models as explicit, attributable semantic source concepts drawn from accepted constitutional and canonical doctrine. This phase is complete.

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

### Phase 8A: Runtime Applicability Boundary

Objective

Strengthen the runtime-facing applicability boundary so downstream runtime entry points accept only the selected Applicable Semantic Context and fail closed for absent, ambiguous, invalid, or non-applicable inputs.

Inputs and prerequisites

- Phase 7 output: Applicable Semantic Contract and the Applicable Semantic Context selected from it.
- The existing runtime-facing selection boundary in [core/src/runtime/applicable-semantic-context.ts](../../../core/src/runtime/applicable-semantic-context.ts).
- The ratified contract, applicability state, and governing scope.

Scope and concrete work items

- Preserve and strengthen `selectApplicableSemanticContext` as the fail-closed applicability selector.
- Add a typed runtime entry point that accepts only the selected Applicable Semantic Context.
- Make the combined `resolveApplicableSemanticContext` path the mandatory entry boundary for future Runtime interpretation: selection is followed by admission before any downstream consumer receives context.
- Keep `selectApplicableSemanticContext` exported for resolution and testability; future Runtime interpretation SHALL consume only `resolveApplicableSemanticContext` results.
- Ensure the runtime entry point rejects absent, ambiguous, invalid, non-applicable, or otherwise unavailable applicability inputs.
- Preserve the distinction between applicability selection and runtime interpretation.
- Keep runtime applicability narrow: no new semantic source, no contract ratification, and no bypass of the governing selection boundary.

Validation and evidence

- Evidence artifact: runtime-facing selection and entry surfaces that accept only the selected Applicable Semantic Context.
- Evidence artifact: tests proving selection and entry fail closed for missing, ambiguous, non-applicable, or invalid inputs.
- Evidence artifact: tests proving candidate, draft, validated-only, or otherwise non-applicable contract states do not reach the runtime entry point.

Exit criteria

- The runtime applicability boundary is explicit, typed, and fail-closed.
- Runtime accepts only the selected Applicable Semantic Context.
- Applicability selection remains distinct from runtime interpretation.

Stop conditions

- Any runtime path that infers meaning from a non-applicable contract state.
- Any runtime path that bypasses applicability selection or weakens fail-closed behavior.
- Any attempt to collapse runtime applicability selection into interpretation or execution.

### Phase 8B-1: Runtime Contract Schema Realization

Objective

Realize the approved field-level Runtime Contract schema as a structural contract surface, with typed unions, fail-closed result types, and attribution fields, without semantic interpretation or directive derivation beyond structural validation.

Inputs and prerequisites

- Phase 8A output: explicit, typed runtime applicability boundary.
- An approved Runtime Contract that defines operations, directives, execution context, authority, provenance, and failure semantics.
- The Applicable Semantic Context selected by the governing contract process.

Approved schema boundary

- Runtime Contract schema realization is limited to structural validation of the approved field-level shapes.
- The Runtime Contract SHALL use a typed discriminated operation union for `evaluate`, `produceDirective`, and `recordEvidence`.
- Runtime results SHALL use a fail-closed union with success values and failure kinds for missing, ambiguous, invalid, incompatible, and unauthorized inputs.
- Runtime directives SHALL use a typed discriminated union for `diagnostic`, `authorityRequired`, and `operationRequested`, with deterministic identity and source contract, scope, execution-context, authority, and provenance attribution.
- Mutation, filesystem actions, model selection, repository writes, Host execution, semantic interpretation, and directive derivation beyond structural validation are excluded from this phase.

Scope and concrete work items

- Implement the approved field-level Runtime Contract schema.
- Preserve the typed operation union, fail-closed result types, and attribution fields.
- Validate structure only; do not interpret meaning, derive directives, or infer behavior beyond the approved schema.
- Keep schema realization narrow: no new semantic source and no contract ratification authority.

Validation and evidence

- Evidence artifact: runtime contract schema surface or tests matching the approved field-level shapes.
- Evidence artifact: tests proving the schema validates structure and fails closed for missing, ambiguous, invalid, incompatible, or unauthorized structural inputs.
- Evidence artifact: tests proving semantic interpretation, directive derivation, and Host execution are not realized in this phase.

Exit criteria

- The approved Runtime Contract schema is realized as a structural surface.
- Typed unions, fail-closed result types, and attribution fields are present and validated structurally.
- Semantic interpretation and directive derivation remain out of scope for this phase.

Stop conditions

- Any schema realization that invents new meaning.
- Any schema realization that performs semantic interpretation, directive derivation, or Host execution.
- Any schema realization that extends authority beyond the approved field-level shapes.

### Phase 8B-2: Runtime Semantic Evaluation

Objective

Realize runtime operation behavior for `evaluate`, `produceDirective`, and `recordEvidence` only after the semantic rules for evaluation, directive derivation, and evidence recording are approved.

Inputs and prerequisites

- Phase 8A output: explicit, typed runtime applicability boundary.
- Phase 8B-1 output: approved Runtime Contract schema realization.
- The approved Runtime Contract semantic addendum in [runtime-contract-semantic-addendum.md](runtime-contract-semantic-addendum.md), plus contract-specific definitions for evaluation predicates, accepted evaluation results, authority-reference resolution, deterministic identity derivation, provenance completeness, evidence persistence, contradictory authority, and operation requests from indeterminate outcomes.
- The Applicable Semantic Context selected by the governing contract process.

Approved semantic boundary

- Runtime may interpret and produce directives only from an admitted Applicable Semantic Context plus explicitly supplied execution context and authority/provenance inputs.
- Missing, ambiguous, invalid, incompatible, or unauthorized inputs SHALL fail closed.
- The initial Runtime operation vocabulary is limited to `evaluate`, `produceDirective`, and `recordEvidence`.
- `execute` remains deferred until Host and execution semantics are separately authorized.
- The initial directive vocabulary is limited to `diagnostic`, `authorityRequired`, and `operationRequested`.
- Directives SHALL remain attributable to the source contract identity and version, applicable scope, provenance, authority basis, and execution-context reference.
- Mutation, filesystem actions, model selection, repository writes, and Host execution are excluded from the initial Runtime Contract.

Scope and concrete work items

- Implement runtime behavior for `evaluate`, `produceDirective`, and `recordEvidence` only after the semantic rules are approved.
- Use the approved semantic rules to define runtime operations, directive derivation, and evidence recording.
- Preserve the distinction between runtime interpretation and applicability selection.
- Keep runtime interpretation narrow: no new semantic source and no contract ratification authority.
- Do not add Host execution unless and until a separate authority decision explicitly authorizes it.

Validation and evidence

- Evidence artifact: [runtime-semantics.ts](../../../core/src/runtime/runtime-semantics.ts) and tests gated by the approved semantic rules.
- Evidence artifact: tests proving runtime interpretation does not proceed without the approved semantic rules.
- Evidence artifact: tests proving runtime interpretation does not expand authority beyond the approved semantic rules.

Exit criteria

- Runtime interpretation is realized only under approved semantic rules.
- Runtime interpretation remains downstream of applicability selection and distinct from it.
- Runtime interpretation does not overstate authority or introduce Host execution by default.

Implementation status

- Phase 8B-2 is realized through `runRuntimeOperation`.
- Contract-specific evaluation and directive rules remain injected through `RuntimeSemanticRules`; Runtime does not invent those predicates.
- Evidence is returned only and is not persisted by Runtime.
- Phase 8B-2 is complete within the approved contract-supplied rules boundary.

Stop conditions

- Any runtime interpretation path without approved semantic rules.
- Any runtime interpretation path that assumes authority, provenance, or failure semantics not explicitly authorized.
- Any attempt to authorize Host execution within this plan without a separate approved decision.

### Phase 9: SDK Contract Realization

Objective

Realize typed SDK Contracts that carry applicable Runtime operations and results across the Host boundary, preserving contract identity, version, scope, provenance, authority, and failure attribution, without becoming an alternate semantic source.

Inputs and prerequisites

- Phase 8B-1 output: the approved Runtime Contract schema.
- Phase 8B-2 output: realized Runtime operation and directive behavior under approved semantic rules.
- [doctrine/core/architecture/HOST-IMPLEMENTATION-ARCHITECTURE.md](../../../doctrine/core/architecture/HOST-IMPLEMENTATION-ARCHITECTURE.md), SDK Boundary and SDK as Compatibility Boundary sections.
- The `core/sdk` realization boundary and its governing instructions.

Approved schema boundary

- SDK Contracts SHALL be defined only for the Runtime operations and results already realized and applicable: `evaluate`, `produceDirective`, and `recordEvidence`.
- SDK Contracts SHALL preserve contract identity, semantic and contract version, applicable scope, provenance, authority basis, and failure-kind attribution carried by the underlying Runtime Contract and results.
- The SDK SHALL provide transport and serialization boundaries only; it SHALL NOT add semantic interpretation, directive derivation, or evaluation behavior beyond what Runtime already realized.
- SDK consumers SHALL NOT be able to obtain a Runtime result without passing through applicable-context admission (`resolveApplicableSemanticContext`); the SDK SHALL NOT expose a path that bypasses admission.
- The SDK SHALL remain deterministic and side-effect free: no Host execution, no repository mutation or writes, no filesystem discovery, no persistence, and no model selection.
- `execute`, mutation, filesystem actions, model selection, repository writes, Host execution, and any Runtime operation not already realized under Phase 8B-2 are excluded from this phase.

Scope and concrete work items

- Define typed SDK contract shapes for the applicable Runtime operations and results only.
- Preserve identity, version, scope, provenance, authority, and failure attribution through serialization/deserialization without loss or reinterpretation.
- Implement transport/serialization boundaries (e.g., encode/decode) without embedding new semantic rules.
- Ensure the SDK entry surface requires an admitted Applicable Semantic Context and rejects any attempt to construct or consume an SDK contract outside that admission path.
- Keep SDK realization narrow: no new Runtime operations, no new semantic meaning, and no independent SDK semantic authority.

Validation and evidence

- Evidence artifact: SDK contract surface in `core/sdk` covering the applicable Runtime operations and results only.
- Evidence artifact: tests proving identity, version, scope, provenance, authority, and failure attribution survive transport/serialization unchanged.
- Evidence artifact: tests proving SDK consumers cannot obtain a result without applicable-context admission.
- Evidence artifact: tests proving the SDK performs no Host execution, mutation, filesystem discovery, persistence, or model selection.

Exit criteria

- Typed SDK Contracts exist for the applicable Runtime operations and results only.
- Contract identity, version, scope, provenance, authority, and failure attribution are preserved end to end.
- The SDK is a deterministic, side-effect-free transport/serialization boundary that cannot be bypassed for applicable-context admission.

Stop conditions

- Any SDK surface that introduces new semantic meaning or a new Runtime operation.
- Any SDK path that allows a consumer to bypass applicable-context admission.
- Any SDK behavior that performs Host execution, repository mutation/writes, filesystem discovery, persistence, or model selection.
- Any SDK realization proceeding without the authority decision on RuntimeOperation exposure below.

## 6. Certification Matrix

| Requirement                                                                                                                                       | Authoritative source                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Implementation/test surfaces to change                                                                         | Deterministic validation                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Canonical Models must be explicit, attributable semantic source concepts                                                                          | [doctrine/core/constitution/VISION.md](../../../doctrine/core/constitution/VISION.md), [doctrine/core/constitution/EPISTEMIC-INVARIANTS.md](../../../doctrine/core/constitution/EPISTEMIC-INVARIANTS.md), [doctrine/core/canonical/REPOSITORY-INTELLIGENCE-MODEL.md](../../../doctrine/core/canonical/REPOSITORY-INTELLIGENCE-MODEL.md), [doctrine/core/canonical/REPOSITORY-UNDERSTANDING-MODEL.md](../../../doctrine/core/canonical/REPOSITORY-UNDERSTANDING-MODEL.md), [doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md](../../../doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md) | Canonical model surface and the existing compiler substrate in [core/src/compiler](../../../core/src/compiler) | Tests proving explicit attribution and fail-closed behavior for insufficient source                             |
| Architectural Doctrine must preserve dependency direction, ownership, and realization boundaries                                                  | [doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md](../../../doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md), [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md)                                                                                                                                                                                                                                                                                                                                                                                    | Architectural model surface and tests that guard dependency direction                                          | Tests proving source precedes realization and realizations do not become semantic source                        |
| Semantic Contracts must formally express accepted Guvna meaning without inventing new meaning                                                     | [doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md](../../../doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md), [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md)                                                                                                                                                                                                                                                                                                                                                                                    | Semantic contract surface in [core/src/compiler](../../../core/src/compiler)                                   | Tests proving no new meaning is introduced by contract realization                                              |
| Semantic Compilation must produce candidate contracts that are structurally and semantically conformant to governing source                       | [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Semantic compilation and serialization surfaces in [core/src/compiler](../../../core/src/compiler)             | Deterministic candidate generation checks and structural/semantic conformance tests                             |
| Semantic Validation must determine conformance and fail closed when the source is insufficient                                                    | [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md), [doctrine/core/constitution/EPISTEMIC-INVARIANTS.md](../../../doctrine/core/constitution/EPISTEMIC-INVARIANTS.md)                                                                                                                                                                                                                                                                                                                                                                                          | Validation and applicability evaluation surfaces in [core/src/compiler](../../../core/src/compiler)            | Negative tests for missing, ambiguous, or contradictory authority                                               |
| Contract Ratification must be attributable, versioned, and distinct from validation                                                               | [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md), [doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md](../../../doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md)                                                                                                                                                                                                                                                                                                                                                  | Ratification and lifecycle surfaces in [core/src/compiler](../../../core/src/compiler)                         | Tests proving ratification is separate from compilation and validation                                          |
| Applicable Semantic Contract must be downstream of ratification and govern Runtime interpretation                                                 | [doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md](../../../doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md), [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md)                                                                                                                                                                                                                                                                                                                                                                                    | Applicability resolution surfaces and downstream runtime-facing boundaries                                     | Tests proving only the applicable state governs interpretation                                                  |
| Runtime applicability boundary must consume only the selected Applicable Semantic Context and fail closed on invalid applicability inputs         | [doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md](../../../doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md), [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md)                                                                                                                                                                                                                                                                                                                                                                                    | Runtime applicability selection and typed runtime entry surfaces downstream of applicability selection         | Tests proving runtime refuses missing, ambiguous, non-applicable, or invalid contract/context inputs            |
| Runtime Contract schema realization must preserve the approved field-level shapes, typed unions, fail-closed result types, and attribution fields | [docs/implementation/plans/runtime-contract-schema-proposal.md](runtime-contract-schema-proposal.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Runtime contract schema surface and structural validation tests                                                | Tests proving the approved schema is realized structurally and fails closed for invalid structural inputs       |
| Runtime semantic evaluation must remain gated by approved semantic rules before operation behavior is realized                                    | [doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md](../../../doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md), [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md), [docs/implementation/plans/runtime-contract-schema-proposal.md](runtime-contract-schema-proposal.md)                                                                                                                                                                                                                                                                              | Runtime interpretation surfaces and any approved semantic rules surface                                        | Tests proving runtime interpretation does not proceed without approved semantic rules or exceed their authority |
| SDK Contract realization must preserve contract identity, version, scope, provenance, authority, and failure attribution and must not allow bypass of applicable-context admission               | [doctrine/core/architecture/HOST-IMPLEMENTATION-ARCHITECTURE.md](../../../doctrine/core/architecture/HOST-IMPLEMENTATION-ARCHITECTURE.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | SDK contract surface in `core/sdk` and its transport/serialization tests                                       | Tests proving attribution fields survive serialization and that no path bypasses applicable-context admission or performs Host execution, mutation, filesystem discovery, persistence, or model selection |

## 7. Authority Decisions

1. **Resolved:** canonical Semantic Contract lifecycle vocabulary is `candidate`, `validated`, `ratified`, `applicable`, `superseded`, `rejected`, and `retired`. Applicability is established only by the ratified-to-applicable transition with attributable authority, exact scope, and effective-boundary guards; lifecycle state does not independently establish Repository Truth or authority.
2. **Resolved for Phase 8A:** authority references are verified structurally at the Runtime boundary; full authority resolution remains the compiler/ratification responsibility.
3. **Resolved for Phase 8A:** semantic scope equality is compiler-owned, term-aware, and reused by Runtime; Runtime does not define a competing equality rule.
4. **Resolved:** the first release does not require a separate persisted ratification artifact; the serializable ratification record in the Semantic IR/provenance model is the ratification evidence surface.
5. **Resolved:** Runtime interpretation requires a separate approved Runtime Contract schema realization and separate approved semantic rules before operation behavior is realized.
6. **Resolved:** Host execution remains out of scope for this plan unless separately authorized.
7. **Approved gate:** Phase 8B-1 may proceed because the approved Runtime Contract schema is recorded in [runtime-contract-schema-proposal.md](runtime-contract-schema-proposal.md), using typed discriminated unions for operations, directives, and fail-closed results with explicit execution-context, authority, provenance, contract, scope, and deterministic identity fields.
8. **Resolved gate:** The Runtime Contract semantic addendum, approved initial semantic defaults, and approved contract-supplied rules ownership authorize Phase 8B-2 implementation. Any contract-specific rule that conflicts with these defaults requires a separate authority decision.
9. **Resolved boundary rule:** Runtime may interpret and produce directives only from an admitted Applicable Semantic Context plus explicitly supplied execution context and authority/provenance inputs; missing, ambiguous, invalid, incompatible, or unauthorized inputs fail closed.
10. **Approved initial Runtime vocabulary:** operations are limited to `evaluate`, `produceDirective`, and `recordEvidence`; directives are limited to `diagnostic`, `authorityRequired`, and `operationRequested`. `execute`, mutation, filesystem actions, model selection, repository writes, and Host execution remain deferred or excluded until separately authorized.
11. **Resolved:** SDK adapters may expose the approved `RuntimeOperation`, result, and directive types directly. SDK adds transport, serialization, and applicable-context admission only; it introduces no independent semantic projection or meaning.

## 8. Planning Status

Status: conditional and authority-bound.

This plan is complete as a planning artifact, but it remains blocked wherever a required semantic authority is missing or contradictory. Phase 7, Phase 8A, Phase 8B-1, and Phase 8B-2 are complete in their reviewed implementation scopes. Canonical lifecycle vocabulary is resolved by Authority Decision 1. Host execution remains outside this plan unless separately authorized. Phase 9 (SDK Contract Realization) is authorized under Authority Decision 11 and is realized by the pass-through SDK transport boundary in `core/sdk`.

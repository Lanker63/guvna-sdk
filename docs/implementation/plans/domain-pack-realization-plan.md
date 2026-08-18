# Domain Pack Doctrine Realization Plan

## Status

Conditional. This plan records the approved realization path for Domain Pack doctrine, but it is not certifiable because the runtime operation shape and manifest serialization choices are still unresolved realization decisions.

## 1. Desired State and Scope

Desired state:

- The accepted Domain Pack doctrine is realized as an Applicable Semantic Contract.
- The Applicable Semantic Contract is then incrementally realized by the compiler, Runtime, SDK, and host boundary.
- No parallel acceptance path is created outside the admitted semantic contract lifecycle.
- The host boundary remains transport, presentation, and lifecycle around SDK calls, not a semantic authority.

Scope:

- Domain Pack semantic meaning.
- Compiler realization of Domain Pack into the existing semantic contract lifecycle.
- Runtime evaluation boundary for pack-related operations.
- SDK transport and typing for ratified Runtime operations.
- Host presentation and installation boundary around SDK calls.
- Excluded: marketplace governance, monetization, curation, or any semantics not already ratified.

## 2. Authority and Requirement Ledger

Authoritative source basis:

- [doctrine/core/architecture/DOMAIN-PACK-INFORMATION-CONTRACT.md](../../../doctrine/core/architecture/DOMAIN-PACK-INFORMATION-CONTRACT.md)
- [doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md](../../../doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md)
- [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md)
- [docs/implementation/plans/core-sdk-runtime-protocol.md](core-sdk-runtime-protocol.md)
- [docs/implementation/plans/runtime-contract-semantic-addendum.md](runtime-contract-semantic-addendum.md)
- [guvna-vscode/.github/copilot-instructions.md](../../../guvna-vscode/.github/copilot-instructions.md)

Requirement ledger:

1. Domain Pack meaning must be realized only through the admitted semantic contract lifecycle.
2. Compiler output must preserve identity, version, scope, provenance, lifecycle, and authority boundary for Domain Pack contracts.
3. Runtime must remain pure and fail closed for missing, invalid, ambiguous, conflicting, or unauthorized inputs.
4. Runtime pack evaluation must not become a universal semantic source or a parallel acceptance path.
5. SDK types and transport must reflect ratified Runtime operations only and must not add semantics.
6. Host installation, discovery, and presentation must remain transport/presentation/lifecycle around SDK calls.
7. Host code must not infer applicability or acceptance locally.
8. UI work, if any, remains conditional on an approved design.

## 3. Current State

Current state facts:

- The compiler currently compiles a pre-shaped SemanticIR and candidate semantic contract, but there is no Domain Pack-specific realization.
- The Runtime boundary is pure, evaluate/produceDirective/recordEvidence oriented, and explicitly fail closed.
- The SDK/host boundary is protocol-driven and host-owned, but it does not yet expose a Domain Pack operation.
- The VS Code host is a separate realization boundary and must not infer applicability or acceptance locally.

## 4. Gaps, Blockers, and Assumptions

Gaps:

- No Domain Pack runtime operation exists.
- No Domain Pack manifest parser exists.
- No SDK surface for Domain Pack operations exists.
- No fixed manifest serialization/storage format has been ratified as the realization choice.
- Runtime operation names and result fields for pack evaluation remain unresolved authority decisions.

Blockers:

- Host UI for packs requires an approved design before implementation.
- Pack evaluation cannot proceed to transport or presentation until the Runtime operation shape is explicitly stated.
- Serialization/storage cannot be treated as authoritative until the manifest format decision is settled.

Assumptions:

- The plan follows the completed planning package as the source of truth.
- No new semantic meaning is introduced beyond what is already ratified.
- Any UI mention remains conditional on design approval.

## 5. Phased Plan

### Phase 1: Ratify and Compile the Domain Pack Doctrine into the Existing Semantic Contract Lifecycle

Objective

Realize Domain Pack doctrine as an attributable candidate contract artifact inside the existing semantic contract lifecycle, without creating a separate acceptance path.

Inputs and prerequisites

- Accepted Domain Pack doctrine.
- Existing semantic contract lifecycle and candidate contract fixtures.
- Authority for identity, version, scope, provenance, lifecycle, and authority boundary.

Scope and concrete work items

- Add the minimal Domain Pack candidate contract fixture needed to anchor the realization path.
- Compile Domain Pack doctrine into the existing semantic contract lifecycle.
- Preserve attributable identity, version, scope, provenance, and lifecycle state.
- Preserve the authority boundary between acceptance and realization.
- Keep the implementation narrow and fail closed.

Validation and evidence

- Deterministic tests for missing identity.
- Deterministic tests for invalid identity.
- Deterministic tests for missing provenance.
- Deterministic tests for fail-closed classification.
- Evidence artifact showing the candidate contract is attributable.

Exit criteria

- A minimal Domain Pack candidate contract exists and is attributable.
- The candidate flows through the existing semantic contract lifecycle.
- No parallel acceptance path has been introduced.

Stop conditions

- Any attempt to infer meaning not already ratified.
- Any change that blurs candidate contract, acceptance, and applicability boundaries.

### Phase 2: Extend Compiler Validation and IR Surface Only Where Required by Doctrine

Objective

Add compiler validation and IR surface support only to the extent required by Domain Pack doctrine.

Inputs and prerequisites

- Phase 1 output.
- Ratified Domain Pack meaning.
- Existing compiler validation and IR structures.

Scope and concrete work items

- Add manifest identity checks.
- Add manifest version checks.
- Add manifest provenance checks.
- Add manifest content-class checks only where doctrine requires them.
- Classify unresolved and ambiguous inputs deterministically.
- Preserve fail-closed handling for contradictory or insufficient evidence.

Validation and evidence

- Deterministic tests for ambiguous classification.
- Deterministic tests for conflicting accepted terms.
- Deterministic tests for invalid bundled-agent authority assumptions.
- Compiler validation tests proving no semantic invention occurs.

Exit criteria

- Compiler validation can distinguish valid, invalid, ambiguous, and unresolved Domain Pack inputs.
- The IR surface includes only what doctrine requires.
- No extra semantic fields are introduced.

Stop conditions

- Any compiler change that adds unratified meaning.
- Any attempt to normalize ambiguous doctrine into accepted doctrine without authority.

### Phase 3: Define Runtime Contract Operations for Pack Evaluation and Evidence Recording

Objective

Define Runtime operations for pack evaluation and evidence recording only after the required predicates and accepted-result shape are explicitly stated.

Inputs and prerequisites

- Phase 2 output.
- Ratified Runtime contract semantics.
- Explicit authority for operation names and result fields.

Scope and concrete work items

- Define the Runtime operation surface for pack evaluation.
- Define the accepted result shape for pack evaluation.
- Keep Runtime pure.
- Keep Runtime fail closed.
- Record evidence only through the Runtime boundary that already governs evidence production.

Validation and evidence

- Runtime tests proving missing, invalid, ambiguous, conflicting, and unauthorized inputs fail closed.
- Runtime tests proving the accepted result shape is explicit and stable.
- Evidence artifact showing Runtime does not reinterpret Domain Pack semantics.

Exit criteria

- Runtime operations are explicit and attributable.
- Runtime evaluation remains pure.
- Runtime does not become a semantic source.

Stop conditions

- Any Runtime operation that infers applicability locally.
- Any Runtime result shape that is not explicitly stated by authority.

### Phase 4: Add SDK Request and Result Types for Ratified Runtime Operations

Objective

Add SDK request/result types and transport plumbing only for ratified Runtime operations.

Inputs and prerequisites

- Phase 3 output.
- Existing protocol envelope and transport rules.

Scope and concrete work items

- Add SDK request and result types for the ratified pack operations.
- Add transport plumbing that preserves the protocol envelope.
- Preserve correlation, serialization, and type translation only.
- Avoid adding new semantics in the SDK layer.

Validation and evidence

- Typecheck for SDK request/result shapes.
- Tests for protocol envelope preservation.
- Tests proving the SDK does not reinterpret semantics.

Exit criteria

- SDK can carry the ratified Runtime operations through the protocol boundary.
- SDK remains transport and typing only.

Stop conditions

- Any SDK change that invents a Domain Pack meaning.
- Any protocol change that breaks the existing envelope without authority.

### Phase 5: Add Host-Side Installation, Discovery, and Presentation Around SDK Calls

Objective

Add host-side installation, discovery, and presentation only as transport, presentation, and lifecycle around SDK calls.

Inputs and prerequisites

- Phase 4 output.
- Approved UI design, if any UI is required.

Scope and concrete work items

- Add host-side wiring for pack discovery and installation flows.
- Keep all acceptance and applicability decisions on the SDK/Runtime side.
- Preserve host-owned process and lifecycle responsibilities.
- If UI is involved, implement only after design approval.

Validation and evidence

- Tests proving the host does not infer applicability or acceptance locally.
- Evidence artifact showing host behavior is limited to transport, presentation, and lifecycle.
- UI validation only if design approval exists.

Exit criteria

- Host functionality remains boundary-correct.
- Any UI work is design-approved and does not alter meaning.

Stop conditions

- Any host-local semantic inference.
- Any UI implementation without approved design.

## 6. Certification Matrix

| Criterion | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 |
| --- | --- | --- | --- | --- | --- |
| Deterministic tests for missing/invalid identity | Required | Carry forward | Carry forward | Carry forward | Carry forward |
| Deterministic tests for missing provenance | Required | Carry forward | Carry forward | Carry forward | Carry forward |
| Deterministic tests for ambiguous classification | Required | Required | Carry forward | Carry forward | Carry forward |
| Deterministic tests for conflicting accepted terms | Required | Required | Carry forward | Carry forward | Carry forward |
| Deterministic tests for invalid bundled-agent authority assumptions | Required | Required | Carry forward | Carry forward | Carry forward |
| Fail-closed behavior | Required | Required | Required | Required | Required |
| Typecheck/test coverage for touched slice | Required | Required | Required | Required | Required |
| Evidence that the candidate contract is attributable | Required | Carry forward | Carry forward | Carry forward | Carry forward |
| Evidence that runtime/SDK/host boundaries do not reinterpret semantics | Not yet | Not yet | Required | Required | Required |

## 7. Open Authority Decisions

1. What exact Runtime operation names and result fields are authorized for pack evaluation.
2. What manifest serialization and storage format is authorized as the realization choice.
3. Whether manifest content-class checks are required for all pack cases or only specific ratified cases.
4. Whether any host UI is required for the realization path, and if so, whether the design is approved.
5. Which evidence artifact format is authoritative for candidate attribution and boundary non-reinterpretation proofs.

## 8. Planning Status

This plan is conditional, not certifiable. It can guide implementation sequencing, but it cannot declare completion until the unresolved Runtime operation shape and manifest serialization decision are explicitly authorized.

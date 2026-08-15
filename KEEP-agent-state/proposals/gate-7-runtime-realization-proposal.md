# Gate 7 Runtime Realization Proposal

**State:** `APPROVED`
**Authority gate:** Gate 7 - Runtime Mutation
**Subject:** Applicable Guvna Semantic Contract `guvna-semantic-contract/1.0.0`
**Approved Runtime scope:** `Guvna runtime semantic-contract consumption`

## Governing Contract Binding

This proposal derives Runtime obligations only from the already-ratified and applicable Contract state. It does not modify or reopen that state.

- `identityKind`: `semantic-contract`
- Contract version: `1.0.0`
- Contract preimage SHA-256: `462e0f69750ec5379f2be64643032d0dd0d772faddb921843c23ae068c2e4439`
- Applicable Contract reference: `guvna-semantic-contract/1.0.0`
- Ratification: existing human Gate 5 `RATIFIED` decision
- Applicability decision: `applicability-20260815-001`
- Applicability result: `applicable`
- Approved artifact path: `.guvna/contracts/guvna-semantic-contract-1.0.0.yaml`

The Contract artifact and applicability authority decision are immutable inputs to this proposal. They are not regenerated, modified, or reinterpreted.

## Runtime Obligations and Provenance

| Obligation Runtime must realize | Required Runtime behavior | Contract dependency and provenance |
|---|---|---|
| Consume the applicable Guvna Semantic Contract as semantic authority. | Accept a supplied applicable-contract representation bound to reference `guvna-semantic-contract/1.0.0`, version `1.0.0`, identity kind `semantic-contract`, and the approved preimage digest. Do not substitute doctrine, filesystem layout, generated state, SDK behavior, or implementation precedent as semantic input. | Applicable Contract operationalization approval; Gate 5 ratification record; applicability decision `applicability-20260815-001`; Candidate validation evidence identifying the common realization obligation that downstream realizations honor the parent Semantic Contract. |
| Preserve the parent Contract boundary and obligations. | Runtime behavior must remain limited to semantic-contract consumption within the approved Runtime scope. It must not add independent Guvna meaning, weaken parent obligations, or reinterpret the Contract. | Accepted Semantic Model/IR population evidence: common realization obligations; Candidate validation evidence: ownership and authority boundaries; applicable Contract identity and scope. |
| Preserve lifecycle, authority, acceptance, provenance, compatibility, and failure distinctions. | Runtime must not collapse `candidate`, `validated`, `ratified`, and `applicable` states; must not treat acceptance, ratification, applicability, provenance, or compatibility as interchangeable; and must preserve attributable provenance and explicit failure/indeterminate outcomes where the supplied Contract representation requires them. | Candidate validation evidence: lifecycle and acceptance distinction, provenance preservation, ownership/authority boundaries, compatibility and failure semantics. |
| Reject or fail closed on unsupported Contract consumption. | If the supplied Contract cannot be established as the approved applicable Contract or required Contract-defined information is absent, ambiguous, contradictory, stale, invalid, or non-conformant, return a Contract-bounded failure/indeterminate outcome. Do not infer defaults or repair semantic inputs. | Candidate validation evidence: fail-closed behavior and required reference resolution; approved Semantic Model/IR population evidence: insufficiency, contradiction, ambiguity, invalidity, incompatibility, missing authority, and missing provenance failure meanings. |
| Preserve realization independence. | Runtime may consume the applicable Contract but must not establish ratification, applicability, authority, Repository Truth, SDK semantics, Projection content, or Host behavior. | Gate 2 authority/ownership decisions; Candidate generation/validation evidence; applicability decision exclusions; Runtime realization doctrine boundary. |

## Exact Runtime Behavior

Subject to Gate 7 approval, the Runtime realization must provide only the following behavior:

1. Load or receive the persistent Applicable Contract representation from the separately approved path `.guvna/contracts/guvna-semantic-contract-1.0.0.yaml`, without changing its content.
2. Verify the representation is bound to the approved Contract reference, identity kind, version, and preimage digest before consumption.
3. Consume only the Contract-defined semantic obligations within `Guvna runtime semantic-contract consumption`.
4. Preserve the Contract's authority, lifecycle, acceptance, applicability, provenance, compatibility, and failure distinctions at the Runtime boundary.
5. Fail closed when required Contract-defined information is missing, invalid, ambiguous, contradictory, stale, unsupported, or provenance-incomplete.
6. Expose no behavior that creates or changes authority decisions, ratifies or establishes applicability, changes the Contract, or authorizes another realization.

No concrete API shape, serialization algorithm, cache policy, loading mechanism, error schema, or Runtime-specific semantic beyond these obligations is established by this proposal. If implementation requires any such missing meaning, the realization must stop with `IMPLEMENTATION BLOCKED` and return to semantic/authority review.

## Exact Permitted Mutation Paths

Gate 7 approval is requested for exactly these paths:

- `core/runtime/semantic-contract-consumer.ts`
- `core/runtime/semantic-contract-consumer.test.ts`

The persistent Applicable Contract artifact path is separately designated and may be created only by the explicit operationalization authorization:

- `.guvna/contracts/guvna-semantic-contract-1.0.0.yaml`

No other `core/runtime/**` path, test path, package file, configuration file, generated artifact, or workspace path is included. The artifact must preserve the ratified Contract content exactly; it is not a Runtime implementation source.

## Required Tests and Verification

The Runtime realization must add focused conformance tests covering:

- acceptance of the exact approved Contract reference, identity kind, version, and preimage digest;
- rejection of altered Contract content or identity binding;
- contract-bounded consumption of the approved Runtime scope;
- preservation of lifecycle, acceptance, authority, applicability, provenance, compatibility, and failure distinctions;
- fail-closed behavior for missing, malformed, ambiguous, contradictory, stale, unsupported, or provenance-incomplete Contract input;
- no mutation of the Contract or authority decision;
- no ratification or applicability establishment by Runtime;
- no SDK, Projection, Host, or unrelated Runtime behavior.

Required verification:

- `pnpm -C core build`
- `pnpm -C core typecheck`
- `pnpm -C core test`
- deterministic changed-path verification against the exact allowlist;
- byte/content or equivalent canonical-integrity verification that the persisted Contract is unchanged from the ratified Contract representation;
- evidence recording of Contract dependency, implementation behavior, tests, verification, and changed paths under `.guvna/agent-state/evidence/`.

## Explicit Runtime Exclusions

This proposal does not authorize:

- Candidate regeneration or modification;
- ratified Contract modification, semantic reinterpretation, or version change;
- modification of applicability decision `applicability-20260815-001`;
- creation of a new authority decision or applicability decision;
- ratification or applicability by Runtime instruction or implementation;
- SDK realization;
- Projection realization;
- Host realization;
- repository truth selection, repair, or semantic promotion;
- doctrine, Semantic Model/IR, or Contract mutation;
- Runtime behavior outside `Guvna runtime semantic-contract consumption`;
- unspecified APIs, loading/caching algorithms, serialization rules, migration behavior, or fallback semantics;
- unrelated Runtime paths, package/configuration changes, publication, or generated-artifact mutation.

## Requested Human Decision

**APPROVED:** authorize only the exact Runtime behavior, mutation paths, tests,
and verification above. This approval does not authorize SDK, Projection, Host,
unrelated Runtime work, Contract mutation, or applicability/ratification
changes.

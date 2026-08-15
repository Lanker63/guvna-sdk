# Contract Lifecycle and Acceptance Authority Proposal

**Phase:** 4 - Unblock Candidate Semantic Contract Generation  
**Decision group:** 1 of 3 - Contract lifecycle and acceptance  
**State:** APPROVED  
**Scope:** Semantic Contract lifecycle vocabulary, acceptance distinction, and transition matrix only

## Requested Human Decision

Approve or revise the narrowly scoped lifecycle and acceptance rules below. This proposal does not decide compatibility, version assignment, predecessor selection, Semantic Delta rules, ratification, applicability, persistence, or workspace location.

## Governing Sources

This proposal uses only the sources identified by the Gate 4 authority-gap report:

- [ARCHITECTURAL-INVARIANTS.md](../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md): compilation, validation, ratification, and applicability are distinct; Candidate, Validated, Ratified, Applicable, Superseded, and Incompatible or Rejected states must remain distinguishable.
- [SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md](../../doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md): lifecycle state is distinct from identity, version, acceptance, provenance, and realization; exact lifecycle vocabulary is governed by the applicable Semantic Contract.
- [REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md](../../doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md): state transitions require current state, operation, preconditions, authority context, and contract version; authority decisions and acceptance remain distinguishable.
- [gate-2-semantic-ir-proposal.yaml](gate-2-semantic-ir-proposal.yaml): lifecycle, acceptance, ratification, applicability, supersession, rejection, and retirement remain distinct; exact enumerations and artifact-specific transition matrices remain unresolved and are not reopened here.
- [candidate-semantic-contract-generation-proposal.md](candidate-semantic-contract-generation-proposal.md): the Candidate must preserve lifecycle and authority distinctions and fail closed when required meaning is unresolved.

## Already Established

The following rules are not new decisions and are preserved unchanged:

1. Lifecycle state is distinct from semantic identity, semantic version, acceptance state, provenance, and filesystem realization.
2. Candidate generation, semantic validation, Contract Ratification, and applicability are separate stages.
3. A Candidate or merely generated/validated contract is not applicable solely because it exists, parses, or is consumed.
4. Contract Ratification is the human authority boundary that can recognize a validated candidate as applicable; compilation and validation cannot ratify.
5. Candidate, Validated, Ratified, Applicable, Superseded, and Incompatible or Rejected must remain distinguishable.
6. Authority Decision and Acceptance remain distinct; an acceptance event requires an attributable authority context and provenance.
7. Filesystem location, persistence, process state, and implementation behavior cannot establish lifecycle or acceptance.
8. Ambiguous or unsupported lifecycle meaning must fail closed.

## Proposed Lifecycle Vocabulary

The proposed contract-level lifecycle vocabulary is the smallest set needed to represent the source-established distinctions:

| State | Meaning | Source basis |
|---|---|---|
| `candidate` | Compiled non-applicable contract awaiting semantic validation or human review | Architectural compilation sequence; Gate 4 boundary |
| `validated` | Candidate that has passed structural and semantic validation but has not been ratified | Architectural compilation and validation sequence |
| `ratified` | Validated contract recognized by a human Contract Ratification event, but not necessarily within an effective applicable boundary | Ratification/applicability distinction |
| `applicable` | Ratified contract recognized for the governed scope and effective boundary | Contract Ratification and applicability doctrine |
| `superseded` | Contract no longer current because an attributable successor has replaced it for the relevant semantic evolution | Required distinguishability of superseded state |
| `rejected` | Candidate or validated contract explicitly not accepted for ratification | Required distinguishability of incompatible or rejected state; acceptance distinction |
| `retired` | Contract intentionally withdrawn from current lifecycle without being treated as applicable | Canonical lifecycle examples and Gate 2 distinction |

`proposed`, `provisional`, `accepted`, `active`, `deprecated`, and `historical` are not added as separate Contract lifecycle states by this proposal because the identified sources do not establish that they are required for this contract. Their absence is intentional and does not collapse the approved distinctions above.

## Proposed Acceptance Vocabulary

Acceptance is a separate dimension from lifecycle. The proposal uses these values only for the Contract acceptance context:

| Acceptance value | Meaning |
|---|---|
| `unaccepted` | No attributable acceptance decision recognizes the contract meaning |
| `accepted` | An attributable authority decision accepts the contract meaning for the decision scope; this does not alone establish Contract Ratification or applicability |
| `rejected` | An attributable authority decision rejects the contract meaning for the decision scope |

No `deferred`, `revoked`, or `withdrawn` acceptance values are proposed because the identified sources do not establish them as Contract acceptance semantics. A deferral or other decision may remain an attributable authority decision without being treated as acceptance.

## Proposed Transition Matrix

Every transition requires the current lifecycle state, operation, preconditions, attributable authority context where specified, contract identity/version context, scope, effective-boundary information where applicable, and provenance. Missing, conflicting, stale, or unsupported required inputs fail closed.

| From | Operation | To | Required conditions |
|---|---|---|---|
| `candidate` | `validate` | `validated` | Structural and semantic validation succeeds; provenance is complete; no blocking semantic gap remains; no ratification occurs |
| `candidate` | `reject` | `rejected` | Attributable authority decision explicitly rejects the candidate, or validation explicitly establishes incompatibility under an already-approved requirement set |
| `validated` | `ratify` | `ratified` | Human Contract Ratification event explicitly recognizes the validated contract; authority identity, decision scope, contract identity/version, and ratification provenance are present |
| `validated` | `reject` | `rejected` | Attributable authority decision explicitly rejects the validated contract |
| `ratified` | `apply` | `applicable` | A separate authoritative applicability determination recognizes the ratified contract for the exact governed scope and effective boundary; applicability is not inferred by compilation or version precedence |
| `applicable` | `supersede` | `superseded` | An attributable successor and supersession decision establish replacement for the relevant scope; version precedence alone is insufficient |
| `applicable` | `retire` | `retired` | An attributable retirement decision explicitly withdraws current applicability; retirement is not inferred from deletion, relocation, or absence |
| `ratified` | `reject` | `rejected` | An attributable authority decision rejects the ratified contract before or instead of applicability |
| `ratified` | `retire` | `retired` | An attributable retirement decision applies before current applicability is established |

No reverse transition, implicit transition, transition based solely on filesystem state, or transition based solely on version precedence is permitted by this proposal. A transition not listed above is unsupported and fails closed until separately authorized.

## Authority and Provenance Rules

- `validate` is a compiler/validator operation and cannot create an authority decision.
- `ratify`, `reject`, `supersede`, and `retire` require attributable human authority under the Contract process; their decision records are inputs, not compiler outputs.
- `apply` records or evaluates externally established applicability only; it does not ratify or create the authority decision.
- Every authority-bearing transition records authority identity, scope, decision identity, contract identity/version context, effective boundary where applicable, and provenance.
- Acceptance does not by itself establish ratification or applicability.
- Lifecycle state does not establish acceptance, authority, applicability, or semantic validity.

## Minimum Approval Needed to Unblock Gate 4

Human authority must approve or revise:

1. The seven-state lifecycle vocabulary: `candidate`, `validated`, `ratified`, `applicable`, `superseded`, `rejected`, `retired`.
2. The three-value acceptance vocabulary: `unaccepted`, `accepted`, `rejected`.
3. The listed transition operations and their preconditions.
4. The requirement that all authority-bearing transitions carry attributable authority, scope, decision, effective-boundary, and provenance data.
5. The fail-closed rule for every unlisted, ambiguous, conflicting, stale, or unsupported transition.

Approval of this proposal would authorize these lifecycle/acceptance meanings as semantic inputs for later Candidate compilation. It would not authorize Candidate generation in this proposal, decide the other two authority-gap groups, ratify a candidate, establish applicability, create a Contract artifact, or designate a workspace path.

## Explicit Exclusions

- No compatibility requirement, predicate, result vocabulary, or comparison scope decision.
- No candidate version, predecessor, initial-version, or Semantic Delta/versioning decision.
- No Gate 2 decision is reopened or changed.
- No Candidate Semantic Contract is generated.
- No Contract is ratified or made applicable.
- No Contract artifact, persistence convention, or workspace path is created or designated.

# Repository Adoption Acceptance-Record Contract Plan

## Status

Complete for the Core/SDK/Runtime scope. This plan documents a Semantic Contract realization for the
acceptance-record shape discussed and resolved across a
`/team-perspective` review session on Repository Authority, acceptance
lifecycle, and authority freshness. The conceptual obligations below (status
vocabulary, granularity, authority-is-human, freshness-precedes-acceptance,
manifest-identity) are governed by `doctrine/core`; only the concrete
JSON/TypeScript contract
shape is in scope for realization here. This plan does not itself ratify
doctrine and does not authorize Runtime execution, repository mutation, or
Acceptance by itself.

## 1. Desired State and Scope

Desired state:

- A ratified Semantic Contract artifact — the **Acceptance Record
  Contract** — that defines the concrete, versioned, cross-host shape for a
  Repository Authority acceptance record, parallel in role to
  [runtime-contract-semantic-addendum.md](runtime-contract-semantic-addendum.md)
  and [runtime-contract-schema-proposal.md](runtime-contract-schema-proposal.md).
- A shared representation of **Authority Context** and the
  **Acceptance Lifecycle Vocabulary** (`candidate`, `accepted`, `rejected`,
  `superseded`) available to the SDK/Runtime transport, with `superseded`
  treated as terminal for a given semantic subject.
- A JSON acceptance-record shape with:
  - `acceptanceRecordId` — a UUID, unique per record.
  - `subjectIdentity` — a non-ordinal, kebab-case, contextually relevant
    identifier for the artifact or change set under acceptance.
  - a file-level change manifest for change-set acceptances, with entries
    identified by **path + content hash** (post-change hash for `created`/
    `updated`, pre-removal hash for `removed`).
- Runtime-side authority-freshness and revocation checks that fail closed,
  performed at minimum at: user authority acquisition, at the moment of
  Repository Authority acceptance, and at any later point the web surface
  (`my.guvna.org`) is called from the local Runtime for authority
  resolution.

Scope:

- `core`/`sdk` representation of Authority Context and acceptance-record
  status vocabulary in the Semantic IR/SDK transport.
- The Acceptance Record Contract artifact itself (JSON Schema and/or
  TypeScript type), including the file-manifest identity scheme.
- Runtime-side freshness/revocation check points and their fail-closed
  semantics.
- Excluded: the doctrine ratification of the underlying concepts (owned by
  the human authority in `doctrine/core`); host-specific presentation,
  capture, or persistence flows (owned by each host implementation, e.g.
  [guvna-vscode/docs/implementation/plans/repository-adoption-acceptance-host-flow-plan.md](../../../guvna-vscode/docs/implementation/plans/repository-adoption-acceptance-host-flow-plan.md));
  and `my.guvna.org` identity/authority administration (owned by
  [guvna-web/docs/implementation/plans/my-guvna-authority-administration-plan.md](../../../guvna-web/docs/implementation/plans/my-guvna-authority-administration-plan.md)).

## 2. Authority and Requirement Ledger

Authoritative source basis:

- [doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md](../../doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md)
- [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md)
- [doctrine/core/canonical/REPOSITORY-UNDERSTANDING-MODEL.md](../../doctrine/core/canonical/REPOSITORY-UNDERSTANDING-MODEL.md)
- [doctrine/core/constitution/EPISTEMIC-INVARIANTS.md](../../doctrine/core/constitution/EPISTEMIC-INVARIANTS.md)
- [runtime-contract-semantic-addendum.md](runtime-contract-semantic-addendum.md)
- [runtime-contract-schema-proposal.md](runtime-contract-schema-proposal.md)
- Session-recorded resolutions (`/team-perspective` review, Repository
  Authority axioms and acceptance-record shape decisions)

Requirement ledger:

1. Repository Authority is realized only by a human principal; a delegated
   agent may act under explicit, scoped authorization but never itself
   constitutes Repository Authority.
2. Authority exists only within the Governed Repository for which it has
   been established; there is no default cross-repository authority.
3. The acceptance-lifecycle vocabulary is limited to `candidate`,
   `accepted`, `rejected`, `superseded`; hosts must not introduce a
   competing status vocabulary for the same semantic subject.
4. `superseded` is terminal for a given semantic subject.
5. Acceptance granularity is single-artifact (Guvna-generated artifacts:
   ADR, PRD, RFC, spec, plan) or change-set (repository realization
   mutations against a previously accepted plan/spec), determined by
   artifact kind, not host convenience.
6. `acceptanceRecordId` SHALL be a UUID; `subjectIdentity` SHALL be
   non-ordinal, kebab-case, and contextually relevant.
7. A change-set acceptance record SHALL preserve identity of its
   constituent file-level changes via path + content hash, using the
   pre-removal hash for `removed` entries.
8. Runtime SHALL revalidate authority freshness before finalizing an
   Acceptance transition; a stale or cached authority state is
   insufficient. Failure to revalidate fails closed.
9. Revocation invalidates only future Authority Decisions and Acceptance;
   it does not retroactively invalidate previously established Acceptance.
10. The concrete JSON/TypeScript contract shape is realization work owned
    by `core`/`sdk`, not doctrine text; doctrine states the conceptual
    obligation only.

## 3. Current State

- Core and SDK now define the acceptance-record contract, status vocabulary,
  repository-scoped authority context, strict manifest validation, and
  transport codecs. The SDK contract is released as `@guvna/sdk@0.4.0`.
- Runtime now exposes fail-closed authority acquisition, acceptance-time
  revalidation, later web-call revalidation boundaries, authority-decision
  precedence resolution, and versioned authority transport operations.
- Core and SDK validation covers malformed input, unknown versions, invalid
  statuses, ambiguous authority histories, and non-fresh acceptance attempts.

## 4. Gaps, Blockers, and Assumptions

Gaps outside this plan's scope:

- SDK transport validation mirrors the contract shape; Core remains the
  semantic validation owner.
- The web-owned live freshness interface and durable authority-change store
  still require implementation in the `my.guvna.org` plan.

Blockers: None for the Core/SDK/Runtime scope. Cached, stale, revoked,
ambiguous, malformed, and unknown-version authority results fail closed.

Assumptions:

- This plan proceeds on the basis that the conceptual obligations are
  authority-ratifiable as proposed in session and recorded in the approved
  authority ledger; the Semantic Contract artifact must not diverge from it.
- The Acceptance Record Contract follows the same Candidate → Validated →
  Ratified → Applicable pipeline as other Semantic Contracts in this repo.

## 5. Phased Plan

### Phase 1: Authority Context and Status Vocabulary Representation — Complete

Objective

Represent Authority Context and the `candidate`/`accepted`/`rejected`/
`superseded` vocabulary in the Semantic IR/SDK transport.

Inputs and prerequisites

- Ratified (or explicitly session-approved pending ratification) status
  vocabulary and Repository-Authority-is-human rule.

Scope and concrete work items

- Add an `AuthorityContext` type to the Semantic IR/SDK transport,
  scoped to a Governed Repository and identifying the acting principal.
- Add the four-value acceptance status enum, with `superseded` marked
  terminal in type and validation logic.
- Add tests asserting no fifth status value is accepted and that
  `superseded` cannot transition further.

Validation and evidence

- Unit tests for the type/enum and terminal-state validation.

Exit criteria

- Authority Context and status vocabulary are available to downstream
  contract and Runtime code with no additional status values reachable.

Stop conditions

- If doctrine ratification diverges from the vocabulary above, stop and
  reconcile before proceeding to Phase 2.

### Phase 2: Acceptance Record Contract Artifact — Complete

Objective

Define the versioned JSON/TypeScript Acceptance Record Contract.

Inputs and prerequisites

- Completed Phase 1.

Scope and concrete work items

- Define `acceptanceRecordId` (UUID), `subjectIdentity` (non-ordinal
  kebab-case), acceptance granularity discriminator (single-artifact vs.
  change-set), status, Authority Context reference, and provenance
  fields.
- Define the file-manifest entry shape for change-set acceptances:
  `path`, `changeKind` (`created` | `updated` | `removed`), and
  `contentHash` (post-change hash for `created`/`updated`, pre-removal
  hash for `removed`).
- Publish the contract as a versioned artifact in `core` or `sdk`,
  following the existing Candidate → Validated → Ratified → Applicable
  pipeline.
- Add schema validation tests, including rejection of ordinal or
  non-kebab-case `subjectIdentity` values and missing manifest hashes.

Validation and evidence

- Schema/type validation test suite.
- A worked example acceptance record for each granularity.

Exit criteria

- The contract can be validated against representative single-artifact
  and change-set acceptance records.

Stop conditions

- If the manifest identity scheme needs to change, stop and version the
  contract rather than silently altering the existing shape.

### Phase 3: Runtime Freshness and Revocation Checks — Complete

Objective

Add fail-closed authority-freshness and revocation checks at the required
Runtime check points.

Inputs and prerequisites

- Completed Phase 2.
- Ratified or session-approved Invariant 59a (Authority Freshness
  Precedes Acceptance) and Invariant 28b (Revocation Affects Only Future
  Acceptance).

Scope and concrete work items

- Add a Runtime-side freshness/revocation check performed at user
  authority acquisition.
- Add a Runtime-side freshness/revocation check performed immediately
  before finalizing Repository Authority acceptance.
- Add a Runtime-side freshness/revocation check performed at any later
  point the web surface (`my.guvna.org`) is called from the local
  Runtime to resolve or reconfirm authority.
- Ensure each check fails closed: a failed, missing, or ambiguous
  freshness check blocks Acceptance but does not block candidate
  generation or recommendation.
- Ensure revocation invalidates only future Authority Decisions and
  Acceptance, never previously accepted Repository Knowledge.

Validation and evidence

- Unit tests for each check point, including stale-authority and
  revoked-authority fail-closed cases.
- Tests confirming previously accepted records are unaffected by a later
  revocation.

Exit criteria

- All three check points are exercised and demonstrably fail closed.

Stop conditions

- Any design that allows Acceptance to proceed on cached or unconfirmed
  authority state blocks certification of this phase.

## 6. Certification Matrix

| Requirement | Phase 1 | Phase 2 | Phase 3 |
| --- | --- | --- | --- |
| Authority Context representable in Semantic IR/SDK transport | Complete | Complete | Complete |
| Four-value status vocabulary, `superseded` terminal | Complete | Complete | Complete |
| UUID `acceptanceRecordId` | N/A | Complete | Complete |
| Non-ordinal kebab-case `subjectIdentity` | N/A | Complete | Complete |
| Path + content-hash manifest identity, pre-removal hash for removed | N/A | Complete | Complete |
| Freshness check at user authority acquisition | N/A | N/A | Complete |
| Freshness check at Repository Authority acceptance | N/A | N/A | Complete |
| Freshness check on later web-surface calls from local Runtime | N/A | N/A | Complete |
| Revocation affects only future Acceptance | N/A | N/A | Complete |

## 7. Open Decisions and Risks

1. The approved live freshness interface and durable authority-change record
  schema remain owned by the web authority-administration plan.

## 8. Planning Status

The doctrine prerequisites and Core/SDK/Runtime realization are complete.
The SDK is released as `@guvna/sdk@0.4.0`, and downstream host integration
has been implemented against it. Web authority administration and its live
freshness service remain downstream work owned by the web plan.

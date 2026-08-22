# Domain Pack Licensing Entitlement Realization Plan

## Status

**Superseded (2026-08-21).** Outstanding work is consolidated into
[consolidated-outstanding-work-plan.md](consolidated-outstanding-work-plan.md).
This document is retained for its design proposal and requirement ledger
content; it is no longer tracked independently.

Conditional. No phase has started. This plan designs a proposed technical
mechanism for Domain Pack license entitlement enforcement; it has not been
through formal architectural approval. Nothing in this plan is implemented.

## 1. Desired State and Scope

Desired state:

- A Domain Pack license/entitlement is scoped to an organization or user,
  and is valid for use across any Governed Repository that org/user
  administers.
- A licensed Domain Pack must not be usable by an org/user other than the
  one it was licensed to, even if the pack artifact itself is copied.
- Enforcement must not depend on the host or the public SDK; it must be
  enforced by the licensed Runtime, which is the controlled, licensed
  component.

Scope:

- Design of an entitlement token/grant scoped to org/user identity, Domain
  Pack identity and version, permitted operation, repository
  identity/authorization scope, expiry, and revocation status.
- Runtime-side validation and refusal behavior for missing, expired,
  revoked, out-of-scope, or wrongly-scoped entitlements.
- Encrypted pack artifact packaging and the Runtime-only decryption
  boundary.
- Issuance, revocation, and audit logging touchpoints for entitlement
  grants.
- Excluded: pricing, revenue share, vendor commercial terms (see
  [../../BUSINESS-MODEL.md](../../BUSINESS-MODEL.md)); any change to Domain
  Pack semantics, admission, or Repository Authority mechanics; host UI
  design for licensing status presentation, unless separately designed and
  approved.

## 2. Authority and Requirement Ledger

Authoritative source basis:

- [doctrine/core/architecture/DOMAIN-PACK-INFORMATION-CONTRACT.md](../../../doctrine/core/architecture/DOMAIN-PACK-INFORMATION-CONTRACT.md)
- [docs/BUSINESS-MODEL.md](../../BUSINESS-MODEL.md)
- [docs/implementation/plans/domain-pack-realization-plan.md](domain-pack-realization-plan.md)

Ownership boundary carried forward unchanged from
`DOMAIN-PACK-INFORMATION-CONTRACT.md`:

- Guvna Core owns the definition of Domain Pack as a concept, permitted
  content classes, identity/version/provenance requirements, and the rule
  that bundled agents acquire no authority merely by inclusion or
  installation.
- The Governed Repository owns the decision to install a pack and all
  Authority Decisions on its content and bundled agents.
- The Host owns pack discovery, download presentation, and installation
  mechanics; it does not evaluate or interpret entitlement validity.

Entitlement enforcement is a new Runtime-side realization capability. It
does not shift, narrow, or reassign any of the ownership boundaries above.
It adds a licensing gate the licensed Runtime enforces before it will
decrypt or use pack content; it makes no claim on Domain Pack semantics,
admission, or Repository Authority.

Requirement ledger:

1. A license/entitlement is scoped to an org or user identity, not to a
   Governed Repository count.
2. A licensed pack must be usable across every Governed Repository the
   licensed org/user administers, without a separate per-repository grant.
3. A licensed pack copied to an unauthorized org/user must not be usable by
   that org/user.
4. Enforcement must be performed by the Runtime, not the Host and not the
   public SDK.
5. The Host must remain limited to discovery, download presentation, and
   installation mechanics; it must not evaluate entitlement validity.
6. Entitlement validation failure (missing, expired, revoked, wrong
   org/user, out of scope) must fail closed: the Runtime refuses to
   decrypt or use pack content.
7. Entitlement issuance and use must be logged with enough detail to
   support revocation and dispute resolution.
8. No pricing, revenue share, or vendor commercial terms are defined by
   this plan.

## 3. Current State

Current state facts:

- No entitlement token, grant, or validation mechanism exists.
- Domain Pack artifacts are not currently distributed in encrypted form.
- The Runtime's existing pack evaluation path (see
  [domain-pack-realization-plan.md](domain-pack-realization-plan.md)) has
  no licensing or entitlement gate.
- The Host's existing discovery/installation flow has no concept of
  licensee identity or entitlement scope.

## 4. Proposed Mechanism (Design Proposal, Not Yet Approved)

The following is presented as a design proposal for review, not as ratified
architecture:

- Domain Pack artifacts are distributed in an encrypted form. The Runtime
  is the only component that decrypts or uses pack content; the Host never
  holds decrypted pack content.
- Guvna issues a short-lived, signed installation/use entitlement grant
  scoped to: org or user identity, Domain Pack identity and version,
  permitted operation (install/use), repository identity or
  repository-authorization scope, expiry, and revocation status.
- The Host is responsible only for pack discovery, download presentation,
  and installation mechanics, consistent with its existing ownership
  boundary. It passes the encrypted artifact and any entitlement grant
  through to the Runtime; it does not evaluate or interpret entitlement
  validity itself.
- The Runtime validates the signed entitlement (issuer, signature, scope,
  expiry, revocation) before decrypting or using pack content, and refuses
  use if the entitlement is missing, expired, revoked, issued to a
  different org/user, or out of scope.
- Entitlement issuance and use are logged (pack identity, version,
  licensee, repository, timestamp) to support revocation and dispute
  resolution.

## 5. Explicit Non-Goals

- This plan does not alter Domain Pack semantics, admission, or Repository
  Authority mechanics defined in
  [doctrine/core/architecture/DOMAIN-PACK-INFORMATION-CONTRACT.md](../../../doctrine/core/architecture/DOMAIN-PACK-INFORMATION-CONTRACT.md).
- This plan does not claim that copying a licensed pack artifact is
  technically impossible. It only claims that unauthorized *use* is
  prevented via entitlement validation. This limitation is explicit: a
  fully offline Runtime with no entitlement check cannot enforce this, so
  the enforcement guarantee depends on the Runtime performing entitlement
  validation before use.
- No pricing or vendor/revenue-share mechanics are defined here; those
  belong to [docs/BUSINESS-MODEL.md](../../BUSINESS-MODEL.md) and future
  commercial-terms work.

## 6. Gaps, Blockers, and Assumptions

Gaps:

- No entitlement token format, signing scheme, or transport protocol
  exists yet.
- No encrypted pack artifact packaging or Runtime-side decryption boundary
  exists yet.
- No issuance, revocation, or audit service exists yet.

Blockers:

- Entitlement token format/protocol requires an authoritative decision
  before Phase 1 can be certified (Open Authority Decision 1).
- Online vs. offline/cached validation behavior requires an authoritative
  decision before Phase 2 can be certified (Open Authority Decision 2).
- Key management and signing authority requires an authoritative decision
  before Phase 1 and Phase 4 can be certified (Open Authority Decision 3).

Assumptions:

- The Runtime is the only trusted, licensed component capable of enforcing
  this boundary; the Host and public SDK are not trusted for entitlement
  evaluation.
- No new semantic meaning is introduced beyond what is already ratified in
  `DOMAIN-PACK-INFORMATION-CONTRACT.md`.

## 7. Phased Plan

### Phase 1: Entitlement Token Design and Schema

Objective

Design the entitlement grant's data shape and signing envelope, without
implementing issuance, validation, or transport.

Inputs and prerequisites

- Ratified Domain Pack identity/version conventions.
- An authoritative decision on entitlement token format/protocol (Open
  Authority Decision 1).
- An authoritative decision on key management and signing authority (Open
  Authority Decision 3).

Scope and concrete work items

- Define the entitlement grant's fields: org/user identity, Domain Pack
  identity and version, permitted operation, repository
  identity/authorization scope, expiry, and revocation status.
- Define the signing envelope and issuer identity format.
- Define serialization format for the grant.

Validation and evidence

- Schema fixtures covering valid, missing-field, and malformed grants.
- Evidence artifact showing the schema captures all fields listed above.

Exit criteria

- The entitlement grant schema is explicit, attributable, and reviewed.
- No issuance or validation logic has been implemented yet.

Stop conditions

- Any attempt to encode Domain Pack semantics into the entitlement schema.
- Any schema field that exceeds the scope listed above without authority.

Phase status

Not started.

### Phase 2: Runtime-Side Validation and Refusal Behavior

Objective

Implement the Runtime's entitlement validation and fail-closed refusal
behavior, using the Phase 1 schema, without wiring encryption or issuance.

Inputs and prerequisites

- Phase 1 output.
- An authoritative decision on online vs. offline/cached validation (Open
  Authority Decision 2).

Scope and concrete work items

- Validate issuer, signature, scope, expiry, and revocation status before
  permitting pack use.
- Refuse use for missing, expired, revoked, wrong-org/user, or
  out-of-scope entitlements.
- Keep the Runtime pure and fail closed, consistent with its existing
  evaluation boundary.

Validation and evidence

- Deterministic tests for missing entitlement.
- Deterministic tests for expired entitlement.
- Deterministic tests for revoked entitlement.
- Deterministic tests for wrong-org/user entitlement.
- Deterministic tests for out-of-scope repository/operation entitlement.

Exit criteria

- The Runtime deterministically refuses use for every invalid entitlement
  case above.
- No Host or SDK code performs entitlement evaluation.

Stop conditions

- Any entitlement check implemented in the Host or public SDK.
- Any fallback that permits use when validation is inconclusive.

Phase status

Not started.

### Phase 3: Encrypted Pack Artifact Packaging and Decryption Boundary

Objective

Package Domain Pack artifacts in encrypted form and confine decryption to
the Runtime, so the Host never holds decrypted pack content.

Inputs and prerequisites

- Phase 2 output.
- Existing Domain Pack artifact packaging conventions.

Scope and concrete work items

- Define the encrypted artifact container format.
- Wire Runtime-side decryption to occur only after successful entitlement
  validation from Phase 2.
- Ensure the Host's discovery/download/installation mechanics operate on
  the encrypted artifact only.

Validation and evidence

- Tests proving the Host never accesses decrypted pack content.
- Tests proving decryption is refused when entitlement validation fails.

Exit criteria

- Encrypted artifacts flow through the Host unchanged.
- Decryption occurs only in the Runtime, gated by entitlement validation.

Stop conditions

- Any Host-side decryption or plaintext pack content handling.
- Any decryption path that bypasses entitlement validation.

Phase status

Not started.

### Phase 4: Issuance, Revocation, and Audit Service Integration

Objective

Wire entitlement issuance, revocation, and audit logging using the Phase 1
schema and Phase 2 validation contract.

Inputs and prerequisites

- Phase 1, 2, and 3 output.
- An authoritative decision on key management and signing authority (Open
  Authority Decision 3), if not already resolved in Phase 1.

Scope and concrete work items

- Implement issuance of signed entitlement grants scoped as defined in
  Phase 1.
- Implement revocation status propagation.
- Log entitlement issuance and use events: pack identity, version,
  licensee, repository, timestamp.

Validation and evidence

- Tests proving issued grants validate successfully against Phase 2 logic.
- Tests proving revoked grants are refused by Phase 2 logic.
- Evidence artifact showing audit log entries capture the required fields.

Exit criteria

- Issuance and revocation are attributable and testable end to end against
  Runtime validation.
- Audit logging captures the fields required for dispute resolution.

Stop conditions

- Any issuance path that bypasses signing or scope requirements.
- Any audit log omission of a required field.

Phase status

Not started.

### Phase 5: End-to-End Certification

Objective

Certify the full entitlement lifecycle — issuance, encrypted distribution,
Runtime validation, decryption, refusal, revocation, and audit — as a
coherent, fail-closed mechanism.

Inputs and prerequisites

- Phase 1 through 4 output.

Scope and concrete work items

- Exercise the full lifecycle across valid, expired, revoked,
  wrong-org/user, and out-of-scope cases.
- Confirm the Host boundary performs no entitlement evaluation at any
  point in the lifecycle.
- Confirm no Domain Pack semantic, admission, or Repository Authority
  behavior changed as a result of this work.

Validation and evidence

- End-to-end deterministic test suite covering every case in the
  certification matrix below.
- Evidence artifact showing Domain Pack semantics are unchanged.

Exit criteria

- The full entitlement lifecycle is certifiable and fail-closed.
- All open authority decisions are either resolved or explicitly carried
  forward with no silent assumption.

Stop conditions

- Any certification claim made while an open authority decision remains
  unresolved and unacknowledged.

Phase status

Not started.

## 8. Certification Matrix

| Criterion | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 |
| --- | --- | --- | --- | --- | --- |
| Entitlement schema is explicit and attributable | Required | Carry forward | Carry forward | Carry forward | Carry forward |
| Deterministic tests for missing/expired/revoked entitlement | Not yet | Required | Carry forward | Carry forward | Carry forward |
| Deterministic tests for wrong-org/user and out-of-scope entitlement | Not yet | Required | Carry forward | Carry forward | Carry forward |
| Host never accesses decrypted pack content | Not yet | Not yet | Required | Carry forward | Carry forward |
| Decryption gated on successful entitlement validation | Not yet | Not yet | Required | Carry forward | Carry forward |
| Issuance/revocation attributable and testable against validation | Not yet | Not yet | Not yet | Required | Carry forward |
| Audit log captures pack identity, version, licensee, repository, timestamp | Not yet | Not yet | Not yet | Required | Carry forward |
| Fail-closed behavior | Required | Required | Required | Required | Required |
| No Domain Pack semantic/admission/Repository Authority change | Required | Required | Required | Required | Required |
| No Host or SDK entitlement evaluation | Required | Required | Required | Required | Required |

## 9. Open Authority Decisions

1. Exact entitlement token format/protocol is not yet specified.
2. Whether entitlement validation requires network connectivity (online
   check) or supports offline/cached validation with periodic refresh is
   not yet decided.
3. Key management and signing authority for entitlement issuance is not yet
   specified.

## 10. Planning Status

This plan is conditional, not certifiable. No phase has started. The
mechanism described in section 4 is a design proposal only and has not been
through formal architectural approval. All three open authority decisions in
section 9 must be resolved, or explicitly and knowingly carried forward,
before Phase 1 can begin.

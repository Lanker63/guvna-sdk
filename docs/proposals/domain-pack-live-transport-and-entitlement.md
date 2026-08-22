# Proposal: Domain Pack Live Transport and Entitlement Boundary

## Status

Proposed. Not ratified. This document requests architectural decisions; it does
not authorize implementation or change Guvna semantics.

## Purpose

Resolve the authority gaps blocking live Domain Pack discovery and licensing
realization in `consolidated-outstanding-work-plan.md`.

## Decisions Requested

1. Approve an HTTPS JSON transport provider for live Domain Pack discovery and
   installation execution.
2. Approve a signed, short-lived entitlement grant carried as an opaque token
   through the Host and public SDK and validated only by the licensed Runtime.
3. Require online validation for initial use, with a Runtime-owned bounded
   cache only if a later availability decision approves it.
4. Approve Runtime-managed signing keys and a key identifier in the grant so
   key rotation is possible without changing Domain Pack semantics.

## Proposed Transport Boundary

The Host sends the existing admitted SDK request envelope to a configured
transport adapter. The adapter performs HTTPS request/response delivery and
returns the existing correlated response envelope unchanged.

The transport adapter may handle bounded retries for transient failures. It
must not retry malformed, ambiguous, unauthorized, or otherwise non-success
responses. Any transport failure, malformed response, correlation mismatch, or
unsupported protocol version fails closed. There is no local manifest parsing,
applicability inference, acceptance path, or fallback behavior in the Host.

The provider contract is limited to:

- `discoverDomainPacks`: return an opaque discovery payload.
- `installDomainPack`: return the existing opaque installation response.
- preserve `protocolVersion`, `requestId`, operation, context, payload, and
  failure fields.

The provider does not become an authority for Guvna meaning. Runtime admission,
semantic validation, and Repository Authority decisions remain unchanged.

## Proposed Entitlement Boundary

The Runtime receives an encrypted Domain Pack artifact and an opaque signed
grant. Before decrypting or using the artifact, it validates:

- issuer and signing key identifier;
- organization or user licensee identity;
- Domain Pack identity and version;
- permitted operation;
- repository identity or approved repository-authorization scope;
- expiry and revocation status.

A missing, malformed, expired, revoked, wrongly scoped, or otherwise invalid
grant produces a refusal and no decrypted or usable pack content. The Host and
public SDK forward the artifact and grant but never evaluate entitlement
validity.

The grant should use a versioned JSON claims payload inside a signed envelope.
The exact cryptographic algorithm, claim names, and canonical serialization
remain subject to approval by the security/key-management authority before
implementation.

## Validation and Audit Requirements

Before implementation is certified, tests must prove:

- transport success preserves the existing envelope and correlation ID;
- transport failure, malformed response, ambiguity, and correlation mismatch
  fail closed;
- the Host performs no semantic or entitlement evaluation;
- missing, expired, revoked, wrong-licensee, wrong-pack, wrong-operation, and
  out-of-scope grants fail closed in the Runtime;
- valid grants work across Governed Repositories administered by the licensed
  org/user without per-repository licensing;
- copied artifacts cannot be used by an unauthorized org/user;
- issuance, revocation, and use audit entries include pack identity, version,
  licensee, repository, operation, and timestamp.

## Non-Goals

- No change to Domain Pack meaning, content classes, admission, or Repository
  Authority mechanics.
- No pricing, revenue-share, or commercial terms.
- No host licensing UI.
- No guarantee that copied encrypted artifacts cannot be possessed; the
  guarantee concerns Runtime-authorized use only.

## Approval Record

The following must be completed by the authorized reviewers before the related
work begins:

| Decision | Proposed answer | Approval | Date |
| --- | --- | --- | --- |
| Live discovery/install provider | HTTPS JSON transport adapter | Approved by user | 2026-08-21 |
| Entitlement format/protocol | Versioned signed opaque grant | Approved by user | 2026-08-21 |
| Online/offline validation | Online initial use; cache requires separate approval | Approved by user | 2026-08-21 |
| Signing/key authority | Runtime-managed rotating keys | Approved by user | 2026-08-21 |
| Evidence artifact format | Test fixtures plus boundary evidence report | Approved by user | 2026-08-21 |

These approvals unblock Phase 4 live transport and Phase 6 entitlement
realization, subject to the implementation constraints and validation
requirements above.

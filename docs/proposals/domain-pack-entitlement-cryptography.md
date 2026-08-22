# Proposal: Domain Pack Entitlement Cryptography

## Status

Proposed. Not ratified. This document refines the cryptographic details needed
before entitlement Runtime implementation begins.

## Decision Requested

Approve Ed25519 signatures over a canonical JSON claims payload, with public-key
verification performed by the licensed Runtime. The Host and public SDK carry
the opaque grant and never verify it.

## Grant Envelope

The serialized grant is a JSON object with three sections:

```json
{
  "version": "1",
  "keyId": "guvna-runtime-2026-01",
  "claims": { "...": "..." },
  "signature": "base64url..."
}
```

The signature covers the UTF-8 bytes of the RFC 8785 JSON Canonicalization
Scheme (JCS) serialization of `claims`, encoded using base64url without
padding. `version` and `keyId` select the verification contract and public key;
they are not included in the signed claims input.

## Claims

The claims payload contains only the approved entitlement scope:

- `licenseeKind`: `organization` or `user`;
- `licenseeId`;
- `packIdentity`;
- `packVersion`;
- `operations`: one or more permitted operations;
- `repositoryScope`: an explicitly defined repository authorization scope;
- `issuedAt` and `expiresAt` as UTC timestamps;
- `grantId` for audit and revocation lookup.

Revocation is checked by `grantId` against the Runtime's trusted revocation
source. Revocation is not represented as a mutable signed claim.

## Runtime Rules

The Runtime must reject the grant before decryption or use when the envelope,
canonical serialization, signature, key ID, claims, identity, operation,
repository scope, timestamps, or revocation lookup is missing, malformed,
expired, revoked, or inconsistent. Clock handling must use a Runtime-controlled
UTC clock and an explicitly approved small clock-skew tolerance, defaulting to
zero until that tolerance is approved.

Initial use requires online revocation validation. A cached positive validation
is not sufficient for initial use and may not be introduced without a separate
availability and revocation-risk decision.

## Key Management

The signing authority maintains the private keys. The Runtime is distributed
with a trusted public-key set and supports key rotation by `keyId`. A retired
key remains available for verification until all grants it signed have expired
or been explicitly revoked. Private signing material is never shipped to the
Host, SDK, or Domain Pack artifact.

## Security and Scope Constraints

- Ed25519 is used only for entitlement authenticity; it adds no Domain Pack
  semantics.
- The grant does not contain plaintext secrets or decrypted pack content.
- Encryption and decryption of pack artifacts remain a separate Runtime-owned
  design and must use an approved key-encryption mechanism.
- No offline-use guarantee is proposed.

## Certification Fixtures

Before implementation is certified, fixtures must cover a valid grant and each
of: unknown version, unknown key ID, malformed canonical payload, invalid
signature, missing claim, wrong licensee, wrong pack/version, wrong operation,
out-of-scope repository, expired grant, revoked grant, and unavailable
revocation validation. Every refusal must occur before decryption or use.

## Approval Record

| Decision | Proposed answer | Approval | Date |
| --- | --- | --- | --- |
| Signature algorithm | Ed25519 | Approved by user | 2026-08-21 |
| Canonical serialization | RFC 8785 JCS | Approved by user | 2026-08-21 |
| Revocation model | Online lookup by `grantId` | Approved by user | 2026-08-21 |
| Clock-skew tolerance | Zero until separately approved | Approved by user | 2026-08-21 |
| Pack-artifact encryption | Separate Runtime-owned decision | Approved by user | 2026-08-21 |

These decisions unblock entitlement schema and validation implementation,
subject to the Runtime-only boundary and certification requirements above.

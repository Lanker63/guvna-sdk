# Consolidated Outstanding Work Plan — guvna (Core/SDK)

## Status

Active. Created 2026-08-21 to consolidate all outstanding work remaining
across superseded plans in this repository. This plan does not define or
reinterpret Guvna semantics; it only sequences already-approved,
already-scoped implementation work that had not yet been completed in the
superseded plans below.

## 1. Superseded Sources Consolidated Here

- [domain-pack-licensing-entitlement-plan.md](domain-pack-licensing-entitlement-plan.md) — superseded 2026-08-21. Design proposal, not yet approved; no phase started.
- [domain-pack-realization-plan.md](domain-pack-realization-plan.md) — superseded 2026-08-21. Phases 1-5 complete; Phase 6 not started.
- [core-sdk-packaging-distribution-plan.md](core-sdk-packaging-distribution-plan.md) — superseded 2026-08-21. Phase 1 complete; Phases 2-5 not started.

Plans not carried forward here because they are complete with no outstanding
phases: [canonical-models-realization-plan.md](canonical-models-realization-plan.md),
[runtime-contract-semantic-addendum.md](runtime-contract-semantic-addendum.md),
[runtime-contract-schema-proposal.md](runtime-contract-schema-proposal.md),
[core-sdk-runtime-protocol.md](core-sdk-runtime-protocol.md),
[repository-adoption-acceptance-record-contract-plan.md](repository-adoption-acceptance-record-contract-plan.md),
and [host-implementation-guidelines.md](host-implementation-guidelines.md).

## 2. Desired State and Scope

Desired state: the public `@guvna/sdk` package is publishable independent of
`@guvna/core` at runtime, with release tooling that enforces that boundary;
and Domain Pack discovery/licensing progresses only through explicitly
approved, Runtime-enforced mechanisms.

Scope: SDK/Core packaging and release boundary hardening; Domain Pack live
discovery transport; Domain Pack licensing/entitlement design approval and
realization. Excluded: any new Guvna semantics, any change to ratified
Runtime/SDK contract meaning, and any host UI work (owned by each host
repository).

## 3. Requirement Ledger (carried forward, non-redundant)

1. `@guvna/sdk`'s published package must not require, import, or
   peer-depend on `@guvna/core` at runtime.
2. `@guvna/core` package metadata must remain private/non-publishable.
3. A host must be able to build and run against a packed/published
   `@guvna/sdk` tarball, never a workspace/local link, in production.
4. Domain Pack live external discovery transport must be wired without
   introducing a parallel acceptance path or host-side semantic inference.
5. Domain Pack licensing/entitlement enforcement must be Runtime-side only;
   the Host and public SDK must never evaluate entitlement validity.
6. Entitlement validation failure must fail closed (missing, expired,
   revoked, wrong org/user, out of scope).

## 4. Phased Plan

### Phase 1: SDK/Core Packaging Boundary Hardening

Objective: remove the `@guvna/core` runtime dependency from `@guvna/sdk` and
harden its publish boundary.

Work items (from core-sdk-packaging-distribution-plan.md Phases 2-3):

- Remove the `@guvna/core` runtime `dependencies` entry from
  `sdk/package.json`; confirm no `peerDependency` reintroduces it.
- Replace direct `@guvna/core` imports in `sdk/src/index.ts` with calls
  through the approved local runtime protocol boundary
  ([core-sdk-runtime-protocol.md](core-sdk-runtime-protocol.md)).
- Keep `@guvna/core` as a devDependency/workspace-only reference for local
  development and type-checking only.
- Add/update unit tests proving SDK admission/encode/decode functions work
  without `@guvna/core` installed as a runtime dependency.
- Add `license`, `repository`, `files`/`exports` allowlist, and
  `publishConfig` (`access: public`) to `sdk/package.json`.
- Retain `"private": true` on `core/package.json`.
- Add a CI/repo check that fails if `@guvna/core` appears in
  `sdk/package.json` `dependencies`/`peerDependencies`.

Exit criteria: `sdk/package.json` has no `@guvna/core` runtime dependency;
typecheck/test pass; no runtime import of `@guvna/core` remains in
`sdk/src/**`; publish metadata is present.

### Phase 2: Host Consumer Migration Validation

Objective: prove a real host builds against the published boundary.

Work items (from core-sdk-packaging-distribution-plan.md Phase 4):

- Re-validate [host-implementation-guidelines.md](host-implementation-guidelines.md)
  §3-§4 language remains accurate after Phase 1.
- Validate `guvna-vscode` (or an equivalent sample host) builds and runs
  against a packed/published `@guvna/sdk` tarball rather than a workspace
  link.

Exit criteria: host `package.json` shows a semver range dependency, not
`link:`/`file:`/`workspace:`; host build succeeds against the tarball.

### Phase 3: Release Validation and Publish Controls

Objective: make the packaging boundary enforceable at release time.

Work items (from core-sdk-packaging-distribution-plan.md Phase 5):

- Add a pre-publish pipeline step: `npm pack` for `@guvna/sdk`, inspect
  tarball contents, install into a clean temp project, smoke-test import
  with `@guvna/core` absent from `node_modules`.
- Add a pre-publish guard preventing `@guvna/core` from being published to
  the public registry.
- Document the `@guvna/sdk` release procedure (version bump, changelog,
  publish command, registry access).

Exit criteria: `pnpm --dir sdk validate:release` passes; publish guard
blocks `@guvna/core` from a public-publish dry run.

### Phase 4: Domain Pack Live Discovery Transport

Objective: wire live external Domain Pack discovery transport execution.

Work items (from domain-pack-realization-plan.md Phase 6):

- Implement the external discovery transport call behind the existing
  admitted SDK/host boundary.
- Preserve the existing rule that the host does not parse manifest meaning
  and does not create a parallel acceptance path.
- Add tests for discovery transport failure, ambiguous, and malformed
  responses failing closed.

Exit criteria: live discovery works end-to-end through the existing admitted
boundary without any new host-side semantic inference.

Implementation status: transport adapter and fail-closed retry tests are
implemented in `guvna-vscode`. Production composition remains outstanding:
the host has no configured provider endpoint or composition entrypoint yet.

### Phase 5: Domain Pack Licensing/Entitlement Design Approval

Objective: obtain formal architectural approval for the proposed
entitlement mechanism before any implementation begins.

Work items:

- Route the proposed mechanism in
  [domain-pack-licensing-entitlement-plan.md](domain-pack-licensing-entitlement-plan.md)
  Section 4 through formal architectural approval.
- Resolve the open authority decisions listed in that plan's Section 9.

Exit criteria: the proposed mechanism is either ratified (unblocking Phase 6
below) or rejected/revised with a recorded decision.

### Phase 6: Domain Pack Entitlement Realization

Objective: implement the approved entitlement mechanism.

Work items (from domain-pack-licensing-entitlement-plan.md Phases 1-5, all
"Not started"):

1. Entitlement token/grant design and schema (org/user identity, pack
   identity/version, permitted operation, repository scope, expiry,
   revocation status).
2. Runtime-side validation and fail-closed refusal behavior.
3. Encrypted pack artifact packaging and the Runtime-only decryption
   boundary.
4. Issuance, revocation, and audit logging integration.
5. End-to-end certification across all of the above.

Exit criteria: a licensed Domain Pack is usable only by its licensed
org/user across every Governed Repository they administer, is refused by
the Runtime if copied to an unauthorized org/user, and all issuance/
revocation/use is logged.

Stop condition: production composition must not proceed without the recorded
approval in `docs/proposals/domain-pack-entitlement-cryptography.md`.

Implementation status: approved Runtime schema/validation, encrypted artifact
handling, authorized-use ordering, issuance, revocation-store abstraction, and
audit adapter are implemented and tested. Production composition and
end-to-end database certification remain outstanding.

## 5. Open Authority Decisions

- Domain Pack entitlement mechanism approval (Phase 5).
- Licensing terms for the `@guvna/core` runtime (explicitly deferred to
  `docs/BUSINESS-MODEL.md`, not addressed by this plan).

## 6. Certification Matrix

| Phase | Certification Evidence |
| --- | --- |
| 1 | No `@guvna/core` in `sdk/package.json` dependencies; SDK tests pass without Core installed at runtime; publish metadata present. |
| 2 | Sample/actual host builds against a packed/published tarball with a semver dependency range. |
| 3 | `validate:release` passes; publish guard blocks `@guvna/core` public publish in a dry run. |
| 4 | Live discovery transport tests pass, including fail-closed cases. |
| 5 | Recorded approval or rejection decision for the entitlement mechanism. |
| 6 | Entitlement enforcement tests across issuance, validation, refusal, revocation, and audit. |

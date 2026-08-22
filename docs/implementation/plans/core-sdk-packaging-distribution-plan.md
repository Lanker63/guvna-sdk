# Core/SDK Packaging and Distribution Plan

## Status

**Superseded (2026-08-21).** Phase 2-5 outstanding work is consolidated into
[consolidated-outstanding-work-plan.md](consolidated-outstanding-work-plan.md).
This document is retained for the completed Phase 1 record and full phase
definitions; it is no longer tracked independently.

Implementation plan. Phase 1 delivery and protocol direction is approved and
recorded in [core-sdk-runtime-protocol.md](./core-sdk-runtime-protocol.md).
This plan is not doctrine and does not define or reinterpret Guvna semantics.
It realizes the business-model boundary described in
[docs/BUSINESS-MODEL.md](../../BUSINESS-MODEL.md) as a concrete packaging and
release plan for `@guvna/core` and `@guvna/sdk`.

## 1. Desired State and Scope

- `@guvna/sdk` is the **public developer artifact**: publicly installable
  (semver, public npm registry or equivalent), and is the only Guvna package
  third-party hosts consume.
- `@guvna/core` is a **private, licensed, compiled runtime** on the
  Guvna-owned side of the boundary. It is not a public dependency of any host
  or of the public SDK at runtime.
- The **preferred host exposure of the runtime is a stable local runtime
  protocol** — hosts interact with Core capability through the SDK/Runtime
  contract, not by importing `@guvna/core` directly.
- `@guvna/sdk` must not depend on, import, or peer-depend on `@guvna/core` at
  runtime in its published package.
- Scope is packaging, dependency, and release-boundary changes only. This plan
  does not redefine SDK/Runtime semantics, does not change the semantic
  content of admission/transport functions, and does not redefine the approved
  licensed-delivery mechanism for `@guvna/core` (see Section 7).

## 2. Authority and Requirement Ledger

| ID | Requirement | Source |
|---|---|---|
| R1 | The public SDK is the developer artifact for third-party host adoption. | [BUSINESS-MODEL.md](../../BUSINESS-MODEL.md) |
| R2 | `@guvna/core` is a licensed, compiled runtime on the Guvna-owned side of the boundary, monetized as a licensed product, not a public developer dependency. | [BUSINESS-MODEL.md](../../BUSINESS-MODEL.md) |
| R3 | The preferred host exposure of the runtime is a stable local runtime protocol. | [BUSINESS-MODEL.md](../../BUSINESS-MODEL.md) |
| R4 | A host repository consumes the free `guvna-sdk` package only; it does not vendor, fork, or reimplement Core semantics. | [host-implementation-guidelines.md §2](./host-implementation-guidelines.md) |
| R5 | Local linking (workspace path / package-manager link) is a development convenience only, never a distribution or release mechanism. | [host-implementation-guidelines.md §3](./host-implementation-guidelines.md) |
| R6 | Production host builds must depend on a published, versioned `guvna-sdk` package, not a local link or workspace reference, following semver compatibility. | [host-implementation-guidelines.md §4](./host-implementation-guidelines.md) |
| R7 | Core/SDK is the only place Guvna semantics are defined; hosts may only realize transport, presentation, lifecycle, and explicitly prescribed actions. | [host-implementation-guidelines.md §6](./host-implementation-guidelines.md) |
| R8 | A Host Implementation is downstream of the Semantic Contract, Runtime, and SDK; it does not become the semantic bridge to Core. | [HOST-IMPLEMENTATION-ARCHITECTURE.md](../../../doctrine/core/architecture/HOST-IMPLEMENTATION-ARCHITECTURE.md) |
| R9 | Repository Adoption information-contract ownership (semantics, provenance, normalization) remains with Guvna Core; hosts own only presentation, interaction, transport, and lifecycle realization. | [REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md](../../../doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md) |
| R10 (derived) | `@guvna/sdk`'s published package must not require, import, or peer-depend on `@guvna/core` at runtime. | Plan objective, consistent with R2/R3 |
| R11 (derived) | `@guvna/core` package metadata must mark it private/non-publishable (or otherwise licensed-gated) so it cannot be published to the public registry by mistake. | Plan objective, consistent with R2 |

## 3. Current State

- `core/package.json`: `name: "@guvna/core"`, `"private": true`, version
  `0.1.0`. Already private; no public registry metadata.
- `sdk/package.json`: `name: "@guvna/sdk"`, `"private": false`, version
  `0.1.0`. Has a **runtime `dependencies` entry** —
  `"@guvna/core": "workspace:*"` — not a `peerDependency`. No `files`,
  `license`, `repository`, `exports`, or publish-related metadata beyond
  `main`/`types`.
- `sdk/src/index.ts` imports directly from `@guvna/core`:
  `admitApplicableSemanticContext`, `validateRuntimeOperation`,
  `validateRuntimeOperationResult`, and the `ApplicableSemanticContext`,
  `RuntimeOperation`, `RuntimeOperationResult` types. All SDK admission and
  encode/decode functions are thin wrappers around these Core imports.
- [pnpm-workspace.yaml](../../../pnpm-workspace.yaml) includes both `core` and
  `sdk` as a workspace package; `workspace:*` resolves only within this
  monorepo.
- [host-implementation-guidelines.md](./host-implementation-guidelines.md)
  already requires published, versioned `guvna-sdk` in production and
  forbids link/file/workspace references in release, but this requirement is
  not yet enforced by any packaging, CI, or publish tooling in this repo.
- No `.npmignore`/`files` allowlist, no publish workflow, and no pack/clean-
  install validation currently exist for either package.

## 4. Gaps, Blockers, and Assumptions

### Gaps
- **Runtime coupling**: `@guvna/sdk` imports `@guvna/core` directly, so a
  public SDK published as-is would require `@guvna/core` to also be
  resolvable at install/runtime — violating R2/R10.
- **Public packaging metadata**: `@guvna/sdk`'s `package.json` is missing
  fields needed for a trustworthy public publish (`license`, `repository`,
  `files`/`exports` allowlist, `publishConfig` access level).
- **Release packaging/packing checks**: no `npm pack` or tarball-content
  verification step exists to catch accidental inclusion of `@guvna/core`
  source, workspace symlinks, or `workspace:*`/`link:`/`file:` specifiers in a
  published manifest.
- **Clean-install validation**: no automated step installs the packed SDK
  tarball in isolation (outside the pnpm workspace) to prove it resolves and
  runs without `@guvna/core`.
- **Protocol boundary definition**: the "stable local runtime protocol"
  referenced in the business model is not yet defined as a concrete
  interface/schema that the SDK can target instead of a direct Core import.
- **npm publication controls**: no CI/publish workflow, npm registry access
  configuration, or private-registry/licensing gate exists for either
  package.

### Blockers
- The SDK refactor (Phase 2) must implement the approved protocol boundary in
  [core-sdk-runtime-protocol.md](./core-sdk-runtime-protocol.md); no additional
  Phase 1 authority blocker remains.

### Assumptions (flag if incorrect)
- `@guvna/core`'s current in-repo TypeScript exports
  (`admitApplicableSemanticContext`, `validateRuntimeOperation`,
  `validateRuntimeOperationResult`) are the full current runtime surface the
  SDK depends on; no other Core exports are consumed by the SDK today.
- The workspace (`guvna` monorepo) will continue to build and test
  `@guvna/core` and `@guvna/sdk` together locally; only the **published**
  artifacts diverge in dependency shape.

### Resolved Authority Decision
> The approved delivery mechanism is a licensed compiled `@guvna/core` runtime
> exposed through a stable local runtime protocol. The protocol boundary and
> its initial compatibility rules are recorded in
> [core-sdk-runtime-protocol.md](./core-sdk-runtime-protocol.md).

## 5. Phased Plan

Each phase is independently certifiable (see Section 6) and should land as
its own reviewable change.

### Phase 1 — Boundary and Protocol Definition
- Resolved: `@guvna/core` is a licensed compiled runtime exposed through a
  stable local runtime protocol.
- Defined in [core-sdk-runtime-protocol.md](./core-sdk-runtime-protocol.md): the
  request/response schema, local transport assumption, lifecycle expectations,
  failure behavior, and versioning policy needed for Phase 2, without
  redefining existing Runtime/SDK semantics.
- Output delivered: the protocol/boundary note that Phase 2 implements
  against.

### Phase 2 — SDK Runtime-Dependency Removal
- Remove the `@guvna/core` runtime `dependencies` entry from
  `sdk/package.json` (no `peerDependency` currently exists to remove;
  confirm none is reintroduced).
- Replace direct imports in `sdk/src/index.ts` with calls through the
  Phase 1 protocol boundary (e.g., an injected/adapter interface), so no
  `@guvna/core` symbol is imported at the top level of published SDK source.
- Keep `@guvna/core` as a `devDependency`/workspace-only reference where
  needed strictly for local development, type-checking, or test fixtures —
  never in the published `dependencies`/`peerDependencies` fields.
- Update or add unit tests demonstrating the SDK's admission/encode/decode
  functions work against the protocol boundary without requiring
  `@guvna/core` to be installed as a runtime dependency.

### Phase 3 — Packaging Metadata and Publication Hardening
- `core/package.json`: confirm/retain `"private": true`; add explicit
  licensing metadata if a private-registry or licensed-binary mechanism is
  selected in Phase 1.
- `sdk/package.json`: add `license`, `repository`, `files` (or
  `exports`) allowlist limited to build output, and `publishConfig` (e.g.
  `"access": "public"`) reflecting public registry intent.
- Add a repository/CI check that fails if `@guvna/core` appears in
  `sdk/package.json` `dependencies` or `peerDependencies`.

### Phase 4 — Host Consumer Migration Checks
- Confirm [host-implementation-guidelines.md](./host-implementation-guidelines.md)
  §3–§4 language remains accurate (link/workspace dev-only, published semver
  in production) — no textual change expected, but re-validate after Phase 2.
- Validate the `guvna-vscode` host (or an equivalent sample host) builds and
  runs against a packed/published `@guvna/sdk` tarball rather than a
  workspace link, as a proof of the boundary.

### Phase 5 — Release Validation and Publish Controls
- Add a pre-publish pipeline step: `npm pack` for `@guvna/sdk`, inspect
  tarball contents, install into a clean temporary project, run a smoke
  import/test with `@guvna/core` absent from `node_modules`.
- Add a pre-publish guard preventing `@guvna/core` from being published to
  the public registry (e.g. `"private": true` retained plus a CI check on
  `npm publish` target).
- Document the release procedure for `@guvna/sdk` (version bump, changelog,
  publish command, registry access requirements).

### Phase 5 Release Commands

From the repository root, run:

```sh
pnpm --dir core check:publication-boundary
pnpm --dir sdk check:publication-boundary
pnpm --dir sdk validate:release
```

`validate:release` builds and packs the SDK, rejects unexpected tarball
contents and Core/local dependency references, installs the tarball in a
temporary project, and smoke-tests its public import. Publish only after these
checks pass:

```sh
pnpm --dir sdk publish --access public
```

## 6. Certification Matrix

| Phase | Certification Evidence |
|---|---|
| 1 | Authority decision recorded; protocol/boundary note reviewed and approved. |
| 2 | `sdk/package.json` has no `@guvna/core` entry in `dependencies`/`peerDependencies`; `pnpm --filter @guvna/sdk typecheck` and `pnpm --filter @guvna/sdk test` pass; `grep` for `@guvna/core` in `sdk/src/**` finds no runtime import. |
| 3 | `sdk/package.json` contains `license`, `repository`, `files`/`exports`, `publishConfig`; `core/package.json` retains `"private": true`; CI dependency-boundary check passes. |
| 4 | Sample/actual host (e.g. `guvna-vscode`) build succeeds using a packed or published `@guvna/sdk` tarball with no workspace/link reference; host `package.json` shows a semver range, not `link:`/`file:`/`workspace:`. |
| 5 | `npm pack` output inspected and free of `@guvna/core` source; clean-install-and-smoke-test succeeds with `@guvna/core` absent; publish guard blocks `@guvna/core` from public publish in a dry run. |

## 7. Open Authority Decisions

1. **Licensed delivery mechanism for `@guvna/core`** — resolved for this plan:
  a licensed compiled runtime exposed through a stable local runtime protocol.
  The protocol boundary is recorded in
  [core-sdk-runtime-protocol.md](./core-sdk-runtime-protocol.md).
2. **Licensing terms for the runtime** — explicitly stated in
   [BUSINESS-MODEL.md](../../BUSINESS-MODEL.md) as governed outside that
   document and not established there; not addressed by this plan.
3. **Registry/hosting choice for the public `@guvna/sdk` package** — resolved
  to the public npm-compatible package configuration represented by
  `publishConfig.access: "public"`. The SDK source repository is
  `https://github.com/Lanker63/guvna-sdk`.

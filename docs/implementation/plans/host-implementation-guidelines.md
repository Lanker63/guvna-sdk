# Host Implementation Guidelines

## 1. Purpose and Audience

This document guides teams building Guvna **host implementations** — independent
applications or services that consume the published `guvna-sdk` package. It is
intended for host developers and integrators, not for Core/SDK maintainers.

It does not define or reinterpret Guvna semantics. It describes how host
repositories should be structured, versioned, and developed against the SDK
boundary.

## 2. Repository Model

- Each host implementation lives in its **own separate git repository**.
- A host repository consumes the **free `guvna-sdk` package only**. It does not
  vendor, fork, or reimplement Core semantics.
- Multiple hosts may exist independently (different products, vendors, or
  licensing models) without coordinating repository structure with one another
  or with Guvna Core.

## 3. Local Development Setup

- Use a **VS Code multi-root workspace** to develop a host alongside the
  `guvna` repository locally. This allows editing SDK/Core and the host in the
  same editor session without merging repositories or histories.
- Local development may use a **linked local `guvna-sdk`** (e.g. via a
  workspace path dependency or package manager link) strictly as a development
  convenience.
- Local linking is **not** a distribution or release mechanism. It exists only
  to speed up iteration while Core/SDK changes are being developed against a
  host.

## 4. Dependency and Versioning Strategy

- Production host builds must depend on a **published, versioned `guvna-sdk`
  package**, not a local link or workspace reference.
- Follow **semver compatibility**: hosts pin or range-constrain `guvna-sdk`
  versions using standard semver rules (e.g. `^x.y.z`) so that Core/SDK can
  ship compatible updates without requiring host code changes, and breaking
  changes are signaled by a major version bump.
- Upgrading `guvna-sdk` in a host is a deliberate, reviewable dependency
  change like any other third-party dependency upgrade.

## 5. Host Autonomy

- Hosts retain full autonomy over their own:
  - licensing model,
  - monetization and packaging,
  - deployment topology,
  - product-specific features and branding.
- None of the above are Guvna Core or SDK concerns. The SDK boundary exists
  precisely so hosts can differ freely in these areas while relying on a
  single shared semantic foundation.

## 6. Boundary: What Hosts May and May Not Do

- **Core/SDK is the only place Guvna semantics are defined.** Hosts never
  define, extend, or reinterpret semantic meaning.
- A host may only **realize**:
  - **transport** — how data enters and leaves the host (APIs, CLI, UI, etc.),
  - **presentation** — how results are displayed or formatted for its users,
  - **lifecycle** — how the host manages process/session/runtime lifecycle
    around SDK calls,
  - **explicitly prescribed actions** — behavior the SDK/Runtime contract
    explicitly designates as host-realizable.
- A host may **not**:
  - redefine or reinterpret SDK or Runtime semantics,
  - bypass the SDK to reimplement Core logic locally,
  - treat host-side conventions as authoritative over SDK/Runtime contracts.

## 7. Open Items

- None identified from the source guidance provided. Any additional
  constraints on host repository structure, release cadence, or SDK
  compatibility policy should be raised as an explicit decision before being
  documented here.

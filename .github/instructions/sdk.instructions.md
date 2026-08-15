---
description: "Use when modifying files under core/sdk/. SDK is a realization boundary, not a semantic source."
applyTo: "core/sdk/**"
---
`core/sdk/` realizes accepted Semantic Contracts and SDK Contracts. It is a
realization boundary, not a semantic source (see
`doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md`, Invariants 5-6, and
`doctrine/core/architecture/HOST-IMPLEMENTATION-ARCHITECTURE.md`).

- The SDK does not become an alternate semantic source for Runtime, and
  Runtime is not an alternate semantic source for the SDK. Both realize the
  same applicable contract independently.
- If a required behavior is not specified by the governing contract, stop
  and report `IMPLEMENTATION BLOCKED` rather than inferring it from existing
  Runtime code, Host expectations, or precedent.

---
description: "Use when modifying files under core/runtime/. Runtime is a realization boundary, not a semantic source."
applyTo: "core/runtime/**"
---
`core/runtime/` realizes accepted Semantic Contracts and Runtime Contracts.
It is a realization boundary, not a semantic source (see
`doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md`, Invariants 5-6).

- Do not reconstruct doctrine at runtime from filesystem organization,
  filenames, implementation patterns, or model inference. Consume the
  applicable contract's canonical executable representation instead.
- If a required behavior is not specified by the governing contract, stop
  and report `IMPLEMENTATION BLOCKED` rather than inferring it — including
  from existing SDK code, which is not an alternate semantic source for
  Runtime.

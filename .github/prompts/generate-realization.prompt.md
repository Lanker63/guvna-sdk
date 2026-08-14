---
description: "Ask realization-engineer to implement a human-ratified contract as Runtime and/or SDK code. Only use after the relevant authority gate has actually been approved by a human."
agent: realization-engineer
argument-hint: "Which ratified contract/scope should be realized, and is it Runtime, SDK, or both?"
---
Implement the ratified contract/scope identified above, using
[runtime-realization](../skills/runtime-realization/SKILL.md) and/or
[sdk-realization](../skills/sdk-realization/SKILL.md) as applicable.

Before making any change, confirm: has a human actually approved the
relevant authority gate (Gate 7 for Runtime, Gate 8 for SDK) for this exact
scope? If this has not been confirmed to you, stop and ask, rather than
proceeding.

Implement only within `core/runtime/` and/or `core/sdk/`, only within the
approved scope. If the governing contract does not specify required
behavior, stop and report `IMPLEMENTATION BLOCKED` rather than inventing it.

Verify your work (`pnpm -C core build`, `pnpm -C core typecheck`,
`pnpm -C core test`) and summarize the evidence before handing off to
`conformance-auditor`.

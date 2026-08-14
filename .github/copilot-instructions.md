# Guvna Workspace

Guvna's agentic operation is governed by
[`doctrine/agentic/AGENT-OPERATING-MODEL.md`](../doctrine/agentic/AGENT-OPERATING-MODEL.md).
That document is authoritative for agent roles, authority, gates, and stop
conditions — it is not duplicated here.

## Roles

Six governed agents realize the model (`.github/agents/`): `guvna-steward`,
`doctrine-guardian`, `architecture-guardian`, `semantic-compiler`,
`realization-engineer`, `conformance-auditor`. Prefer `guvna-steward` when the
current phase or authority gate is unclear; otherwise pick the specialist that
matches the task.

## The one rule that matters everywhere

No agent may invent Guvna semantic meaning, ratify a Candidate Semantic
Contract, or expand its own mutation scope. When a required semantic or
authority decision is missing, **stop and report the gap** — do not infer and
continue.

## Governed doctrine vs. process state

`doctrine/` is human-ratified governed doctrine. `.guvna/agent-state/` is
process state and evidence only (`guvna-steward` writes there) — it is never
semantic authority, and approval is never inferred merely because a file
exists there.

## Build and test

- Whole workspace: `pnpm build`, `pnpm test`, `pnpm typecheck`, `pnpm lint`
  (each runs recursively via `pnpm -r`).
- `core` package only: `pnpm --filter guvna-core <script>`, or
  `pnpm -C core validate:platform` (typecheck + test).

## Realization scope

`core/runtime/` and `core/sdk/` are the only locations a mutation-capable
agent (`realization-engineer`) may change, and only within a human-approved
scope. `core/runtime/` and `core/sdk/` are currently placeholders.

## Note on agent model selection

[`doctrine/agentic/MODEL-PREFERENCES.md`](../doctrine/agentic/MODEL-PREFERENCES.md)
names preferred models by codename (`Luna`, `Terra`) that do not map to a
current model-picker identifier in this environment. Agent files intentionally
omit the `model:` field (falls back to the picker's current selection) until
that mapping is resolved by a human — see the implementation report for this
gap.

# Guvna Workspace — Copilot Instructions

Guvna is governed by doctrine under [doctrine/core/](../doctrine/core/). The normative agent authority model is [doctrine/agentic/AGENT-OPERATING-MODEL.md](../doctrine/agentic/AGENT-OPERATING-MODEL.md). Everything in this `.github/` folder realizes that model and is subordinate to it — it does not redefine agent authority.

## Core operating rule

No agent may convert implementation convenience, precedent, inference, or unstated assumption into Guvna semantic meaning. When required meaning or authority is missing or ambiguous, **stop and report the gap** — do not infer and continue.

## Agents

Use the specialist agents in [.github/agents/](./agents/): `guvna-steward` (coordinator), `doctrine-guardian` and `architecture-guardian` (read-only reviewers), `semantic-compiler` (doctrine → Candidate Semantic Contract), `realization-engineer` (approved contract → Runtime/SDK), `conformance-auditor` (read-only adversarial audit). Only `semantic-compiler` and `realization-engineer` have any mutation authority, and only within an explicitly approved scope — never assume approval just because an artifact exists.

## Process state

`.guvna/agent-state/` holds process state (phase, gate, proposals, evidence, authority ledger). It is process bookkeeping, not semantic authority.

## Build and test

- Workspace-wide (run from repo root): `pnpm build`, `pnpm test`, `pnpm typecheck`, `pnpm lint`.
- `core/` package directly: `pnpm -C core build|test|typecheck`.

## Required structure

`doctrine/core`, `core/runtime`, `core/sdk` are required top-level folders under the workspace, enforced by [core/tests/require-folders.test.ts](../core/tests/require-folders.test.ts). Do not remove them.

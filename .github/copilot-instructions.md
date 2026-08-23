# Guvna Workspace

## The one rule that matters everywhere

No agent may invent Guvna semantic meaning or expand its own mutation scope.\
When a required semantic or authority decision is missing, **stop and report the gap**
— do not infer and continue.

## Release stage

This repository is currently in **alpha**. As such, clean code is preferable to taking any backwards-compatible shortcuts. The solution is not yet stable, and breaking changes may be introduced at any time.

## Build and test

- Whole workspace: `pnpm build`, `pnpm test`, `pnpm typecheck`, `pnpm lint`
  (each runs recursively via `pnpm -r`).
- `core` package only: `pnpm --filter @guvna/core <script>`, or
  `pnpm -C core validate:platform` (typecheck + test).

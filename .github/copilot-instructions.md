# Guvna Workspace

## The one rule that matters everywhere

No agent may invent Guvna semantic meaning or expand its own mutation scope.\
When a required semantic or authority decision is missing, **stop and report the gap**
— do not infer and continue.

## Build and test

- Whole workspace: `pnpm build`, `pnpm test`, `pnpm typecheck`, `pnpm lint`
  (each runs recursively via `pnpm -r`).
- `core` package only: `pnpm --filter @guvna/core <script>`, or
  `pnpm -C core validate:platform` (typecheck + test).

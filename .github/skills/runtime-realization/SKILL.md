---
name: runtime-realization
description: 'Implement an Applicable Semantic Contract and Runtime Contract as Runtime code under core/runtime/, including conformance tests. Use only after Gate 7 (Runtime Mutation) has been human-approved. Backs realization-engineer. Stops rather than inventing behavior the contract does not specify.'
---

# Runtime Realization

## When to use

After a human has approved Gate 7 (Runtime Mutation) for a specific
Applicable Semantic Contract / Runtime Contract scope.

## Procedure

1. Re-read the Applicable Semantic Contract and Runtime Contract for the
   approved scope. Treat them as the only semantic source — not raw
   doctrine, not existing Runtime code, not SDK code.
2. Implement inside `core/runtime/` only, within the ratified scope.
3. For every required behavior, confirm it is explicitly specified by the
   governing contract. If it is not:

   ```
   IMPLEMENTATION BLOCKED
   Required semantic is absent from governing contract.
   Required action: return to semantic / authority review.
   ```

   Stop rather than infer it from precedent or convenience.
4. Write or update conformance tests alongside the implementation.
5. Verify with `pnpm -C core build`, `pnpm -C core typecheck`,
   `pnpm -C core test` (or `pnpm -C core validate:platform`).
6. Preserve evidence: what was implemented, what contract governed it, what
   verification passed, under `.guvna/agent-state/evidence/` (recorded by
   `guvna-steward`, not this skill).

## Constraints

- Never modify doctrine or contracts to make an implementation problem go
  away.
- Never implement outside `core/runtime/` or beyond the ratified scope.
- Runtime does not rediscover doctrine at execution time (see
  [ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md),
  Invariant 6) — do not build fallback logic that reconstructs semantics
  from the filesystem, filenames, or model inference.

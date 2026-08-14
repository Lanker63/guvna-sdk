---
name: sdk-realization
description: 'Implement an Applicable Semantic Contract and SDK Contract as SDK code under core/sdk/, including conformance tests. Use only after Gate 8 (SDK Mutation) has been human-approved. Backs realization-engineer. Stops rather than inventing behavior the contract does not specify.'
---

# SDK Realization

## When to use

After a human has approved Gate 8 (SDK Mutation) for a specific Applicable
Semantic Contract / SDK Contract scope.

## Procedure

1. Re-read the Applicable Semantic Contract and SDK Contract for the
   approved scope. Treat them as the only semantic source — the SDK does
   not derive semantics from Runtime implementation details, and Runtime
   does not derive semantics from SDK implementation details.
2. Implement inside `core/sdk/` only, within the ratified scope.
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
- Never implement outside `core/sdk/` or beyond the ratified scope.
- Never let the SDK become an alternate semantic source for Runtime, or
  treat Runtime as an alternate semantic source for the SDK (see
  [HOST-IMPLEMENTATION-ARCHITECTURE.md](../../../doctrine/core/architecture/HOST-IMPLEMENTATION-ARCHITECTURE.md)).

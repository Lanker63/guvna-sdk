# Conflicts And Blockers

This register records observed evidence without reconciling it. It is a
derivative planning artifact and cannot resolve any entry.

| Classification | Observation | Evidence | Smallest missing input or decision |
|---|---|---|---|
| UNRESOLVED | `.guvna/contracts/guvna-semantic-contract-1.0.0.yaml` is absent. | Filesystem inventory and [`gate-7-runtime-realization-blocked-2026-08-15.md`](../agent-state/evidence/gate-7-runtime-realization-blocked-2026-08-15.md) | Recoverable canonical contract representation and defined consumption interface. |
| UNRESOLVED | A recorded digest does not reconstruct canonical Contract content or preimage bytes. | Candidate/determinism evidence and absent artifact | The original canonical bytes or an independently verifiable authoritative representation. |
| HISTORICAL STALE STATE | Older evidence reports 16 focused tests; the runnable suite now has 21. | Compiler evidence versus current Vitest run | None for current code; future records must be refreshed independently. |
| HISTORICAL STALE STATE | Older applicability execution reported `indeterminate` due to governed/subject scope equality; current source explicitly accepts independent valid subject scope. | Older execution evidence versus current source/tests | None for current code; consumers must select current executable behavior over stale run evidence. |
| HISTORICAL STALE STATE | Runtime and SDK instructions claim placeholder directories and `require-folders.test.ts`; those paths are absent. | `.github/instructions/runtime.instructions.md`, `.github/instructions/sdk.instructions.md`, filesystem inventory | Updated instruction metadata, if someone elects to maintain it. |
| SPECIFICATION GAP | Runtime inputs, outputs, errors, Contract loader, projection schema, persistence, transport, and SDK bindings have no concrete implementation interface. | Architectural doctrine and repository inventory | A concrete Runtime/SDK/Projection interface specification; not derivable from this bundle. |
| EVIDENCE BOUNDARY | `.guvna/agent-state` contains process and historical records, not product-runtime evidence. | `.guvna/agent-state/README.md` and executable inventory | None; use source/tests/build output for software claims. |

## Rule For This Bundle

No missing Contract, authority state, repository meaning, or Runtime behavior
is inferred from a path, digest, proposal, process record, generated output, or
implementation convenience.
# Candidate Authority-State Reconciliation

- Date: 2026-08-15
- Authority source: `.guvna/agent-state/authority-ledger.yaml`
- Reconciliation result: ratification authority is authoritative; no new ratification created

## Authoritative Candidate State

The ledger records Gate 5 Contract Ratification as `RATIFIED` for:

- semantic version `1.0.0`
- `identityKind: semantic-contract`
- preimage SHA-256 `462e0f69750ec5379f2be64643032d0dd0d772faddb921843c23ae068c2e4439`
- Semantic Delta `absent/not-applicable`

The displayed `candidate` / `unaccepted` values came from historical review-bound generation evidence. That evidence is preserved as an execution record and was not rewritten.

## Cause of Stale Presentation

1. The generation evidence was intentionally immutable historical evidence produced before Gate 5 ratification.
2. `.guvna/agent-state/state.yaml` retained pre-ratification process routing: Gate 3, `candidate_contract: null`, and the old agent-definition realization `next_action`.
3. The applicability execution evidence is also historical: it recorded `indeterminate` because the evaluator still enforced the unauthorized `governedScope === subjectScope` predicate. It does not override the ledger's ratification decision.

## Reconciled Process Routing

Process state now reflects the ledger's ratified Candidate metadata and routes to the already-approved next action:

- approved scope-equality remediation handoff to `semantic-compiler`
- preserve the ratified Contract and recorded applicability authority decision
- verify mutation boundaries before any remediation mutation
- rerun only `applicability-20260815-001` through the corrected evaluator

No Candidate was regenerated. No ratification decision or authority ledger entry was altered. Applicability was not established by instruction.

## Remaining Boundary

The current applicability result remains historical `indeterminate` pending the separately authorized remediation and evaluator rerun. The authoritative applicability decision inputs remain unchanged.

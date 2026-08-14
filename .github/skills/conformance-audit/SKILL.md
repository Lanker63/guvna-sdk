---
name: conformance-audit
description: 'Adversarially audit a Runtime/SDK/Governance-Projection realization against its governing Applicable/Runtime/SDK/Projection Contract, looking for missing obligations, extra semantics, invariant violations, authority bypass, provenance loss, incompatibility, non-determinism, and Runtime/SDK divergence. Use after realization-engineer completes work. Backs conformance-auditor. Read-only: reports findings, never repairs them.'
---

# Conformance Audit

## When to use

After `realization-engineer` completes an implementation, before the human
gate that follows realization (Gate 9/10).

## Procedure

1. Identify the governing contract(s) for the realization under audit
   (Applicable Semantic Contract, Runtime Contract, SDK Contract, Projection
   Contract as applicable).
2. Check for **missing obligations**: contract requirements with no
   corresponding implementation or test.
3. Check for **extra semantics**: implemented behavior the contract does
   not specify — this is often where semantics get silently invented.
4. Check **invariants** from
   [ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md)
   (see also [contract-validation](../contract-validation/SKILL.md)).
5. Check for **authority bypass**: any mutation outside the ratified scope,
   or any place the realization treats itself as ratifying/approving
   something.
6. Check **provenance**: can each realized behavior be traced back to the
   contract clause that requires it?
7. Check **determinism**: run verification commands (e.g.
   `pnpm -C core test`, `pnpm -C core typecheck`) more than once if
   non-determinism is suspected.
8. Check **Runtime/SDK divergence** and **projection violations** where
   both exist for the same contract.
9. Report findings to `guvna-steward`. Do not edit the realization to fix
   what you find, even if the fix looks trivial.

## Constraints

This skill is read-only by nature and by mechanism when invoked from
`conformance-auditor` — see
[conformance-auditor-guard.py](../../hooks/scripts/conformance-auditor-guard.py).
It never grants edit authority.

---
name: conformance-audit
description: 'Adversarially audit a Runtime, SDK, or Governance Projection realization against its governing contract for missing/extra obligations, invariant violations, authority bypass, provenance loss, incompatibility, nondeterminism, and Runtime/SDK divergence. Use at Gate 9 (Conformance), read-only.'
---

# Conformance Audit

## When to Use

By `conformance-auditor` after `realization-engineer` reports an implementation complete, before Gate 9/10 human review.

## Procedure

1. Identify the governing contract(s): Applicable Semantic Contract, Runtime Contract, SDK Contract, Projection Contract.
2. Enumerate every obligation each contract imposes.
3. For each obligation, find evidence in the realization that it is met, partially met, or unmet. Look specifically for:
   - missing obligations;
   - extra semantics not authorized by the contract;
   - invariant violations (see [ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md));
   - authority bypass (a mutation outside its approved scope);
   - provenance loss (an artifact that cannot be traced to its governing contract);
   - incompatible or nondeterministic behavior;
   - divergence between Runtime and SDK realizations of the same contract.
4. Run existing verification (`pnpm -C core typecheck`, `pnpm -C core test`) as supporting evidence — do not edit anything to make it pass.
5. Compile findings without attempting to fix them.

## Output

A findings report to `guvna-steward`: each finding names the violated obligation, the governing contract clause, the affected artifact, and supporting evidence.

## Constraint

This skill is read-only. It never modifies the audited implementation, its tests, or its contracts.

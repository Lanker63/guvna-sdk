---
name: contract-validation
description: 'Validate a Semantic/Runtime/SDK/Projection Contract for structural and semantic conformance to governing doctrine, and check the architectural invariants and ownership boundaries a realization built on it must preserve. Use before presenting a contract at a human authority gate, or when auditing a realization against its contract. Backs architecture-guardian, semantic-compiler, and conformance-auditor.'
---

# Contract Validation

## When to use

- Before a Candidate Semantic Contract is presented at Gate 5 (Contract
  Ratification).
- When `architecture-guardian` checks a proposal for ownership or
  boundary violations.
- When `conformance-auditor` checks a realization against its governing
  contract.

## Procedure

1. Confirm the contract carries an explicit, referenceable Semantic
   Identity independent of its filesystem path (see
   [SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md](../../../doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md)).
2. Confirm the contract's lifecycle/acceptance state is explicit:
   Candidate, Validated, Ratified, Applicable, Superseded, or
   Incompatible/Rejected — never assumed from the fact that the file
   exists or parses.
3. Check the dependency direction the contract implies against the
   Architectural Dependency Principle
   ([ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md)):
   doctrine → canonical models → architectural doctrine → semantic
   contracts → compilation → ratification → realization. Flag any reverse
   dependency (Runtime defining doctrine, SDK defining Runtime semantics,
   Host defining SDK semantics, filesystem defining repository semantics).
4. Check ownership boundaries: Guvna owns the semantic model, the Governed
   Repository owns repository-specific content, the Host owns presentation
   and integration (see
   [HOST-IMPLEMENTATION-ARCHITECTURE.md](../../../doctrine/core/architecture/HOST-IMPLEMENTATION-ARCHITECTURE.md)).
5. Report every violation with the specific invariant or contract clause it
   breaks. Do not repair a violation you find — report it.

## Constraints

This skill supports validation and audit only. It never marks a contract as
ratified or applicable — only human authority does that.

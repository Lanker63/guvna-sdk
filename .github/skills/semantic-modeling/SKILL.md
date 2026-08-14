---
name: semantic-modeling
description: 'Derive an explicit Semantic Model from accepted Guvna doctrine as a step toward Semantic IR and a Candidate Semantic Contract. Use when starting semantic compilation (Gate 1) and doctrine has been analyzed but not yet expressed as an explicit conceptual model. Backs semantic-compiler.'
---

# Semantic Modeling

## When to use

At Gate 1 of the doctrine-to-Runtime/SDK plan, after
[doctrine-analysis](../doctrine-analysis/SKILL.md) has identified the
governing doctrine, and before Semantic IR (Gate 2) is produced.

## Procedure

1. Enumerate the concepts, relationships, and invariants the analyzed
   doctrine establishes (e.g. Repository Understanding, Repository
   Authority, Semantic Contract lifecycle states from
   [SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md](../../../doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md)).
2. Express each concept explicitly: identity, meaning, and the doctrine
   passage it derives from. Do not add a concept doctrine does not support.
3. Express relationships and dependency direction exactly as the
   Architectural Dependency Principle in
   [ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md)
   requires — do not reverse it for modeling convenience.
4. Preserve provenance: every modeled concept must trace to specific
   doctrine.
5. Where doctrine is silent on a needed concept, stop; that is a semantic
   gap, not a modeling decision to make unilaterally.

## Constraints

This skill produces a candidate representation only. It does not ratify
anything and does not grant mutation authority beyond what
`semantic-compiler`'s explicitly approved scope already permits.

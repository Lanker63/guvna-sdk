---
name: semantic-delta
description: 'Classify the compatibility relationship between a new Candidate Semantic Contract and the current Applicable Semantic Contract (compatible, incompatible, or indeterminate) and produce a Semantic Delta with provenance. Use during semantic compilation when a prior applicable contract already exists. Backs semantic-compiler.'
---

# Semantic Delta

## When to use

During [semantic-compilation](../semantic-compilation/SKILL.md), whenever a
prior Applicable Semantic Contract already exists for the scope being
compiled, to determine how the new candidate relates to it.

## Procedure

1. Identify the current Applicable Semantic Contract for the scope (per
   [SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md](../../../doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md),
   identity is independent of the file it happens to live in — locate it by
   identity, not by guessing a path).
2. Compare concept-by-concept: additions, removals, and changes in meaning
   (not merely in wording).
3. Classify the result as one of: compatible, incompatible, or
   indeterminate. Non-determinism in this classification (the same inputs
   producing different classifications) is a stop condition, not a
   judgment call to average out.
4. Record the delta with provenance linking each change back to the
   doctrine passage that motivated it.
5. A new contract version is warranted only when the contractual semantic
   boundary materially changed — documentation, generation mechanics, or
   serialization changes alone do not warrant one.

## Constraints

Producing a Semantic Delta is analysis, not ratification. It never
determines, by itself, that the new candidate becomes applicable.

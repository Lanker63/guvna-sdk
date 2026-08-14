---
name: semantic-compilation
description: 'Deterministically compile a Semantic Model/Semantic IR into a Candidate Semantic Contract with provenance. Use for Gates 2-4 of the doctrine-to-Runtime/SDK plan: normalization, reference resolution, semantic validation, and Candidate Semantic Contract generation. Backs semantic-compiler. Stops at the Candidate Contract — never ratifies it.'
---

# Semantic Compilation

## When to use

After [semantic-modeling](../semantic-modeling/SKILL.md) has produced a
Semantic Model, to carry it through Semantic IR and into a Candidate
Semantic Contract (Gates 2-4).

## Procedure

1. **Normalize**: resolve equivalent phrasings/structures in the Semantic
   Model into a single canonical representation, without changing meaning.
2. **Resolve references**: ensure every cross-reference between concepts
   resolves to a concept actually defined in the model; flag dangling
   references instead of guessing their target.
3. **Compile to Semantic IR**: produce the explicit intermediate
   representation the Candidate Semantic Contract will be generated from.
4. **Validate**: check the IR is structurally and semantically conformant
   to the governing doctrine (not merely internally consistent).
5. **Analyze compatibility**: classify the change against any prior
   applicable contract (see [semantic-delta](../semantic-delta/SKILL.md)).
6. **Generate the Candidate Semantic Contract** with an explicit contract
   version and full provenance back to source doctrine.
7. **Run deterministic verification** (e.g. `pnpm -C core typecheck`,
   `pnpm -C core test`) to confirm the compilation is reproducible.
8. Stop. Hand the Candidate Semantic Contract to `guvna-steward` for the
   Gate 5 human authority gate.

## Constraints

- Never modify Runtime or SDK to make compilation succeed.
- Never mark the output as validated, ratified, or applicable — those are
  distinct states (see
  [ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md),
  "Contract Ratification and Applicability").
- This skill cannot grant `semantic-compiler` (or any invoking agent)
  ratification authority; it has none.

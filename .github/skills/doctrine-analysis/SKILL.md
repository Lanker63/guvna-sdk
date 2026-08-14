---
name: doctrine-analysis
description: 'Locate and analyze Guvna doctrine (constitution, canonical models, architectural doctrine, the Agent Operating Model) to determine what accepted meaning does and does not say about a proposal. Use when checking whether a proposal follows from accepted doctrine, when tracing provenance for a claim, or when a semantic gap needs to be identified precisely. Backs doctrine-guardian and semantic-compiler.'
---

# Doctrine Analysis

## When to use

- Before classifying a `SEMANTIC GAP`, `SEMANTIC CONFLICT`,
  `UNSUPPORTED DERIVATION`, or `ONTOLOGICAL DRIFT` finding.
- Before compiling doctrine into a Semantic Model or Semantic IR.
- Whenever a claim needs to be traced back to its authoritative source.

## Procedure

1. Identify the doctrinal layer(s) implicated: `doctrine/core/constitution/`
   (constitutional invariants), `doctrine/core/canonical/` (canonical
   models), `doctrine/core/architecture/` (architectural doctrine), or
   `doctrine/agentic/` (agent operating model).
2. Read the relevant document(s) in full — do not rely on filenames or
   section titles alone; meaning may not be where the name suggests.
3. Extract the exact passage(s) that support or fail to support the
   proposal. Quote or precisely cite them.
4. If no passage supports the required meaning, that is a `SEMANTIC GAP` —
   do not fill it by inference, precedent, or convenience.
5. If two passages conflict, that is a `SEMANTIC CONFLICT` — report both,
   do not silently prefer one.
6. Record which documents were consulted so the finding is reproducible.

## Constraints

This skill only supports analysis. It does not grant its invoking agent any
mutation or ratification authority it does not already have — a read-only
agent using this skill remains read-only.

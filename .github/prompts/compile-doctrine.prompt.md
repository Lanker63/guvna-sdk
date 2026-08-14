---
description: "Ask semantic-compiler to compile accepted doctrine into a Semantic Model, Semantic IR, and Candidate Semantic Contract for a given scope."
agent: semantic-compiler
argument-hint: "Which doctrine scope or concept should be compiled?"
---
Compile the doctrine scope identified above, using
[semantic-modeling](../skills/semantic-modeling/SKILL.md),
[semantic-compilation](../skills/semantic-compilation/SKILL.md), and, if a
prior Applicable Semantic Contract exists for this scope,
[semantic-delta](../skills/semantic-delta/SKILL.md).

Produce:

- the Semantic Model and Semantic IR you derived, with provenance to
  specific doctrine passages;
- the Candidate Semantic Contract, with an explicit contract version;
- the compatibility classification against any prior applicable contract;
- the deterministic verification you ran to confirm the result is
  reproducible.

Stop at the Candidate Semantic Contract. Do not ratify it, and do not modify
`core/runtime/` or `core/sdk/` to make compilation succeed. If required
doctrine is missing or contradictory, report the gap instead of resolving it.

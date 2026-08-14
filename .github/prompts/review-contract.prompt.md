---
description: "Ask guvna-steward to coordinate doctrine-guardian and architecture-guardian to review a specific contract or proposal for semantic and architectural conformance."
agent: guvna-steward
argument-hint: "Which contract or proposal (file path or description) should be reviewed?"
---
Coordinate a review of the contract or proposal identified above:

1. Invoke `doctrine-guardian` to check it for `SEMANTIC GAP`,
   `SEMANTIC CONFLICT`, `UNSUPPORTED DERIVATION`, `AUTHORITY AMBIGUITY`, and
   `ONTOLOGICAL DRIFT`.
2. Invoke `architecture-guardian` to check it for semantic leakage,
   ownership violations, and contract-boundary bypasses, using
   [contract-validation](../skills/contract-validation/SKILL.md).
3. Present both sets of findings together, including any disagreement
   between them.
4. State plainly whether the contract/proposal is ready for its next
   authority gate, or what must change first.

Do not ratify, approve, or mark the contract applicable — that is a human
decision.

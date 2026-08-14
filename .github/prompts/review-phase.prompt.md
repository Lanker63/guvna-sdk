---
description: "Ask guvna-steward to determine the current phase and authority gate, and to coordinate the relevant specialists."
agent: guvna-steward
argument-hint: "What are you trying to do or resume? (optional)"
---
Determine the current phase and authority gate of the doctrine-to-Runtime/SDK
plan per [AGENT-OPERATING-MODEL.md](../../doctrine/agentic/AGENT-OPERATING-MODEL.md)
section 15, using `.guvna/agent-state/state.yaml` and
`.guvna/agent-state/authority-ledger.yaml` as your process-state record (not
as semantic authority).

Report:

- the current phase and gate, with its state (`REVIEW`/`APPROVED`/`REVISE`/
  `REJECTED`/`BLOCKED`);
- what specialist(s) should be consulted next and why;
- any outstanding proposal awaiting a human authority-gate decision;
- any authority conflict that needs to be surfaced rather than resolved.

Do not treat this review as itself an approval to proceed.

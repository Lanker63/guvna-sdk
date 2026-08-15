# Agent State

This directory holds Guvna agent process state and evidence as defined by
[`AGENT-OPERATING-MODEL.md`](../../doctrine/agentic/AGENT-OPERATING-MODEL.md)
sections 17–18.

- `state.yaml` — current phase/gate/status.
- `authority-ledger.yaml` — actual recorded human approval events.
- `proposals/` — proposals awaiting or having received an authority-gate
  decision.
- `evidence/` — verification evidence for completed mutations.

None of these files are semantic authority. They answer "where are we in the
governed process?", never "what does Guvna mean?". Only `guvna-steward`
writes here; other agents may read it for context.

Approval is never inferred merely because a proposal or evidence file
exists — only an entry in `authority-ledger.yaml` records an actual human
approval event.

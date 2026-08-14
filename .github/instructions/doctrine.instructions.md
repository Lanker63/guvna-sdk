---
description: "Use when reading, proposing changes to, or discussing anything under doctrine/. Doctrine is human-ratified governed doctrine, not implementation detail."
applyTo: "doctrine/**"
---
Files under `doctrine/` are governed doctrine ratified by human authority,
not implementation detail and not process state.

- No agent may edit these files to make a compilation, implementation, or
  test pass. If a change here seems necessary to unblock work, that is a
  semantic gap or an authority decision — stop and report it via
  `guvna-steward` rather than editing doctrine directly.
- Any edit to `doctrine/agentic/AGENT-OPERATING-MODEL.md` specifically
  requires the governance process in that document's own section 29
  (Governance of the Agent Operating Model); do not treat routine
  implementation work as license to change it.
- When interpreting doctrine, cite the specific passage. Do not treat
  silence as permission, and do not infer intended meaning from Runtime,
  SDK, or repository behavior (see
  `doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md`, Invariant 6).

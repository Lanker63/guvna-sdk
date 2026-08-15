---
description: "Use when reading, proposing changes to, or discussing anything under doctrine/. Doctrine is human-ratified governed doctrine, not implementation detail."
applyTo: "doctrine/**"
---
Files under `doctrine/` are governed doctrine ratified by human authority,
not implementation detail and not process state.

- No agent may edit these files to make a compilation, implementation, or
  test pass. If a change here seems necessary to unblock work, that is a
  semantic gap or an authority decision — stop and report it rather than editing doctrine directly.
- When interpreting doctrine, cite the specific passage. Do not treat
  silence as permission, and do not infer intended meaning from Runtime,
  SDK, or repository behavior (see
  `doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md`, Invariant 6).

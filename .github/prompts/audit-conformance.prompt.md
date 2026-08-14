---
description: "Ask conformance-auditor to adversarially audit a completed realization against its governing contract."
agent: conformance-auditor
argument-hint: "Which realization (files/scope) and which governing contract should be audited?"
---
Audit the realization identified above against its governing contract, using
[conformance-audit](../skills/conformance-audit/SKILL.md) and
[contract-validation](../skills/contract-validation/SKILL.md).

Report, explicitly:

- missing obligations;
- extra/invented semantics not required by the contract;
- invariant violations (see `doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md`);
- authority bypass or out-of-scope mutation;
- provenance loss;
- incompatible changes;
- non-determinism;
- Runtime/SDK divergence or projection violations, where relevant.

Do not modify the realization to fix anything you find. Report the findings
to `guvna-steward` for the human authority gate.

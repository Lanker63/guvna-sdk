# Semantic-Compiler Agent Definition Alignment Proposal

**State:** `APPROVED`
**Change class:** Agent-definition realization alignment only
**Target:** `.github/agents/semantic-compiler.agent.md`
**Governing authority:** `doctrine/agentic/AGENT-OPERATING-MODEL.md`, section 10

## Purpose

Align the static `semantic-compiler` agent realization with the already
established normative Semantic Compiler authority and the already-approved
Applicability Determination scope-equality remediation.

The normative model establishes that `semantic-compiler` is the primary
semantic compilation execution agent; may create or modify compiler artifacts
within approved scope; may run deterministic compilation tests; and has narrow,
phase-scoped mutation authority.

The existing static definition permits compiler/semantic-compilation artifacts
but does not expressly permit the already-approved remediation mutation paths
for `core/src/compiler/**` and `core/tests/compiler/**`. This omission causes
the current handoff authority conflict.

This proposal does not change Guvna semantic meaning, the Agent Operating
Model, the approved remediation, the ratified Contract, or the human
applicability authority decision.

## Approved Context Bound to the Alignment

The static definition may permit the additional compiler implementation/test
mutation only when all of the following are true:

1. An applicable authority gate and phase-scoped mutation authorization are
   already recorded.
2. A specific remediation proposal is `APPROVED`.
3. The remediation names the permitted compiler paths and verification
   obligations.
4. The invoked operation supplies that approved remediation as governing
   authorization.

For the current operation, the governing authorization is:

`.guvna/agent-state/proposals/applicability-determination-scope-equality-remediation-proposal.md`

It authorizes only the correction of the unauthorized
`governedScope === subjectScope` constraint and focused conformance tests.

## Proposed Static Definition Change

Add the following section after `## Mutation scope` in
`.github/agents/semantic-compiler.agent.md`:

```md
### Approved compiler remediation mutation

In addition to compiler/semantic-compilation artifacts, you may modify compiler
implementation and focused compiler tests only when an applicable authority
gate and a specific `APPROVED` remediation proposal explicitly authorize the
operation and paths.

The approved remediation must be supplied as governing authorization. Mutation
remains narrow, phase-scoped, proposal-gated, and limited to exactly the paths
named by that approval. Do not expand a path allowlist by implication.

For the approved Applicability Determination remediation, the permitted
paths are exactly:

- `core/src/compiler/**/*.ts`
- `core/tests/compiler/**/*.test.ts`
- `.guvna/agent-state/evidence/compiler/**/*.yaml`
- `.guvna/agent-state/evidence/compiler/**/*.md`

Before mutation, confirm the remediation state, applicable authority gate,
exact allowed paths, and required verification. After mutation, preserve
changed-path and verification evidence.

You must not modify Runtime, SDK, Projection, Host, Doctrine, Semantic
Contracts, authority decisions, publication surfaces, unrelated workspace
paths, or unrelated artifacts. You must not create or alter authority decisions, infer
missing semantic meaning, or establish applicability by instruction. An
applicability result may be recorded only as the output of the approved
evaluator applied to authoritative external inputs.

If the proposal, authority gate, mutation path, or requested operation is
missing, ambiguous, contradictory, or outside the approved scope, stop before
mutation and report the authority gap or conflict.
```

## Required Properties of the Alignment

The static agent definition must explicitly preserve:

- phase-scoped mutation authority;
- proposal and approval gating;
- the requirement that the approved remediation is supplied as governing
  authorization;
- exact mutation paths with no implied expansion;
- prohibition on Runtime, SDK, Projection, Host, Doctrine, Contract, authority
  decision, publication, workspace-path, and unrelated-artifact mutation;
- prohibition on establishing applicability by instruction;
- deterministic verification and changed-path evidence;
- the existing prohibition on ratification and semantic invention.

## Explicit Non-Authorization

This alignment does not authorize the scope-equality remediation by itself. It
does not modify:

- `.github/agents/semantic-compiler.agent.md` before this proposal receives
  separate approval;
- the approved applicability remediation;
- the ratified Contract;
- the human applicability authority decision;
- any semantic doctrine or normative authority;
- Runtime, SDK, Projection, Host, or downstream realization;
- a Candidate or Applicable Contract artifact, persistence location, or
  workspace path.

It does not convert the historical `indeterminate` determination into any
other result. It does not establish applicability.

## Validation After Any Approved Static Definition Change

The realization update must be limited to
`.github/agents/semantic-compiler.agent.md` and must be checked for valid YAML
frontmatter and the required explicit guardrails above. It must not modify any
other agent definition, instruction file, doctrine, Contract, authority
record, implementation, test, or evidence path.

## Requested Decision

**APPROVED:** authorize the agent-definition realization alignment exactly as
specified above. The target static agent definition may be updated only within
the stated boundary and validation requirements.

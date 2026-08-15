# Approved Agent-Definition Realization Boundary Proposal

**State:** `APPROVED`
**Authority gate:** Agent-definition realization boundary
**Change class:** Operational realization only; no semantic or Runtime/SDK authority change
**Approved target:** `.github/agents/semantic-compiler.agent.md`

## Finding

No existing authorized realization mechanism can implement the already-approved
change to `.github/agents/semantic-compiler.agent.md`:

- `guvna-steward` may record state and proposals only under
  `.guvna/agent-state/` and is expressly barred from `.github/` mutation.
- `semantic-compiler` has no current static authority to modify agent
  definitions.
- `realization-engineer` is limited to `core/runtime/**`, `core/sdk/**`, and
  their conformance tests.
- `conformance-auditor`, `doctrine-guardian`, and `architecture-guardian` are
  read-only.
- The current explicit handoffs address doctrine review, architecture review,
  semantic compilation, Runtime/SDK realization, and conformance audit; none
  realizes an approved `.github/agents/*.agent.md` change.

The Agent Operating Model section 19 topology is advisory rather than an
autonomous authority grant. Section 29 governs changes to the Agent Operating
Model itself; this proposal does not alter that governed doctrine. It only
establishes the operational realization and verification boundary for the
already-approved static Copilot agent-definition alignment.

## Proposed Minimal Mechanism

Authorize one explicit, human-selected **agent-definition realization
operation** to edit exactly this file:

```text
.github/agents/semantic-compiler.agent.md
```

The operation must be invoked only after both of these approvals are recorded:

1. `Semantic-Compiler Agent Definition Alignment` is `APPROVED`.
2. This agent-definition realization boundary is `APPROVED`.

The operation is a one-file realization mechanism, not a new semantic role,
not a Runtime/SDK realization role, and not a standing mutation authority.
It expires when the named target has been realized and verified.

## Exact Authorized Mutation

The operation may apply only the static-definition section specified in:

`.guvna/agent-state/proposals/semantic-compiler-agent-definition-alignment-proposal.md`

That section permits later `semantic-compiler` mutation of approved compiler
implementation/test paths only when an applicable authority gate and a named
`APPROVED` remediation proposal provide the governing authorization.

The operation may not alter the proposed text's guardrails, add paths, modify
frontmatter behavior beyond preserving valid YAML, or make any unrelated edit.

## Mandatory Verification

After the one-file edit, the operation must:

1. Validate `.github/agents/semantic-compiler.agent.md` frontmatter using the
   existing `.guvna/agent-state/evidence/frontmatter-validate.py` validator or
   an equivalent deterministic validation.
2. Verify that the only changed realization path is:

   ```text
   .github/agents/semantic-compiler.agent.md
   ```

3. Confirm the required guardrails are present:

   - phase-scoped and proposal/approval-gated mutation;
   - the approved remediation must be supplied as governing authorization;
   - exact allowlisted compiler and compiler-evidence paths only;
   - no Runtime, SDK, Projection, Host, Doctrine, Contract, authority-decision,
     publication, workspace-path, or unrelated-artifact mutation;
   - no applicability establishment by instruction;
   - required verification and changed-path evidence;
   - stop on missing, ambiguous, contradictory, or out-of-scope authority.

4. Record realization and validation evidence only under
   `.guvna/agent-state/evidence/`.

## Explicit Exclusions

This proposal does not authorize:

- modification of any agent definition other than
  `.github/agents/semantic-compiler.agent.md`;
- modification of `.github/agents/guvna-steward.agent.md` handoffs;
- modification of doctrine or the Agent Operating Model;
- creation of an agent, skill, hook, prompt, or standing cross-workspace
  mutation authority;
- modification of the approved applicability remediation, ratified Contract,
  human applicability authority decision, semantic model, or Contract state;
- Runtime, SDK, Projection, Host, or downstream realization;
- an Applicable Contract artifact or workspace path;
- execution of the Applicability Determination remediation itself.

The realization operation cannot establish applicability or alter any
authority decision. It merely makes the already-approved static agent
realization conform to existing normative and proposal-gated authority.

## Proposed Operation Prompt

```text
Realize the approved Semantic-Compiler Agent Definition Alignment.

Preconditions:
- Confirm the approval record for Semantic-Compiler Agent Definition Alignment.
- Confirm this Approved Agent-Definition Realization Boundary is APPROVED.
- Confirm the only target is .github/agents/semantic-compiler.agent.md.

Apply only the exact static-definition section specified by:
.guvna/agent-state/proposals/semantic-compiler-agent-definition-alignment-proposal.md

Do not edit any other file. Do not modify doctrine, the Agent Operating Model,
remediation, Contract, authority decision, Runtime, SDK, Projection, Host,
workspace path, or artifact. Do not execute the compiler remediation.

Validate frontmatter and confirm all required guardrails. Verify that the sole
changed path is .github/agents/semantic-compiler.agent.md. Record realization
and validation evidence under .guvna/agent-state/evidence/ and return the
changed-path result.
```

## Requested Decision

**APPROVED:** authorize the one-time, human-selected realization operation
exactly as bounded above. No other agent definition or artifact may be
modified.

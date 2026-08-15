# Semantic-Compiler Applicability Remediation Handoff Proposal

**State:** `APPROVED`
**Route:** `guvna-steward -> semantic-compiler -> verify -> rerun existing applicability decision`
**Purpose:** Replace the historical Candidate Semantic Contract compilation handoff with a prompt for the current approved Applicability Determination scope-equality remediation.

## Current Process State

The Candidate Semantic Contract has already been generated and ratified. It
must not be regenerated, modified, or presented as a new Candidate.

The current authorized work is the approved remediation in:

`.guvna/agent-state/proposals/applicability-determination-scope-equality-remediation-proposal.md`

The prior `indeterminate` applicability result is historical evidence of the
unauthorized `governedScope === subjectScope` implementation constraint. It is
not an authority decision and must not be replaced before remediation passes
independent verification.

## Handoff Preconditions

Before invoking `semantic-compiler`, `guvna-steward` must verify all of the
following:

1. The remediation proposal remains `APPROVED`.
2. The implementation is limited to the approved compiler mutation boundary:

   - `core/src/compiler/**/*.ts`
   - `core/tests/compiler/**/*.test.ts`
   - `.guvna/agent-state/evidence/compiler/**/*.yaml`
   - `.guvna/agent-state/evidence/compiler/**/*.md`

3. The recorded human applicability authority decision remains attributable,
   unmodified, and bound to the ratified Contract.
4. No Contract artifact, workspace path, Runtime, SDK, Projection, Host, or
   downstream realization work is included.

## AUTHORITY CONFLICT

The approved remediation and process-state mutation boundary authorize the
listed `core/src/compiler/**` and `core/tests/compiler/**` paths. The current
static `semantic-compiler` agent definition says it may modify only
compiler/semantic-compilation artifacts it produces and does not expressly
state authority to mutate the compiler implementation or tests.

This handoff proposal does not adjudicate or expand that authority. The
handoff may execute only when the invoked implementation-capable
`semantic-compiler` role has an effective mutation authorization covering the
approved paths above. Otherwise, stop before mutation and report this
**AUTHORITY CONFLICT** to the human authority; do not substitute a historical
Candidate-generation operation or modify agent files.

## Inputs Passed to the Handoff

### Approved remediation scope

- Remove only the unauthorized `governedScope === subjectScope` constraint.
- Preserve exact supplied `governedScope` matching against the established
  governed boundary: `Guvna Semantic Contract semantic boundary`.
- Preserve `subjectScope` as an independent authoritative input.
- Preserve authority-input validation, validity evaluation,
  effective-boundary evaluation, provenance preservation, fail-closed
  behavior, and exactly `applicable`, `not-applicable`, or `indeterminate`.
- Add only the approved focused conformance tests for distinct scopes,
  incorrect governed scope, and missing/invalid subject scope.

### Recorded applicability authority decision

```yaml
authorityIdentity: human-authority-guvna-contract
decisionIdentity: applicability-20260815-001
decision: applicable
decisionVersion: "1"
governedScope: "Guvna Semantic Contract semantic boundary"
subjectScope: "Guvna-owned Semantic Contract expressing accepted Guvna meaning"
status: valid
validity:
  status: valid
  provenance: "Human authority designation accompanying applicability decision applicability-20260815-001."
effectiveBoundary:
  status: valid
  provenance: "Human authority designation accompanying applicability decision applicability-20260815-001."
contract:
  identityKind: semantic-contract
  version: "1.0.0"
  preimageSha256: "462e0f69750ec5379f2be64643032d0dd0d772faddb921843c23ae068c2e4439"
  semanticDelta: absent/not-applicable
```

## Proposed Operation Prompt

```text
Execute the approved Applicability Determination scope-equality remediation.

Authority inputs:
- Approved remediation proposal:
  .guvna/agent-state/proposals/applicability-determination-scope-equality-remediation-proposal.md
- Recorded human applicability authority decision:
  .guvna/agent-state/evidence/compiler/human-applicability-authority-decision-applicability-20260815-001.yaml

First confirm that your effective authorized mutation scope includes only:
- core/src/compiler/**/*.ts
- core/tests/compiler/**/*.test.ts
- .guvna/agent-state/evidence/compiler/**/*.yaml
- .guvna/agent-state/evidence/compiler/**/*.md

If that authority is absent or contradictory, stop before mutation and report
AUTHORITY CONFLICT. Do not modify agent files or substitute Candidate Contract
generation.

Implement only the approved correction:
- remove the unauthorized governedScope === subjectScope condition;
- retain exact supplied governedScope matching against the established
  boundary "Guvna Semantic Contract semantic boundary";
- retain subjectScope as a required independent authoritative input;
- preserve all existing authority metadata, validation, validity,
  effective-boundary, provenance, fail-closed behavior, and result vocabulary.

Add only the approved focused tests covering:
- a distinct valid subjectScope does not itself yield indeterminate;
- incorrect governedScope fails closed;
- missing or invalid subjectScope fails closed.

Do not modify doctrine, the ratified Contract, the recorded applicability
authority decision, Runtime, SDK, Projection, Host, artifacts, workspace
paths, or downstream implementation. Do not regenerate or modify a Candidate
Semantic Contract. Do not create or alter authority decisions. Do not infer
scope values or establish applicability by instruction.

After the implementation passes focused tests, pnpm -C core typecheck,
pnpm -C core test, and changed-path/mutation-boundary inspection, rerun only
the unchanged recorded decision applicability-20260815-001 through the
corrected evaluator.

Record implementation, conformance, changed-path, and rerun evidence under
.guvna/agent-state/evidence/compiler/. Return the evaluator result exactly as
applicable, not-applicable, or indeterminate, with preserved provenance. Do
not create an Applicable Contract artifact or workspace path.
```

## Expected Outputs

The handoff must return:

1. Exact changed paths.
2. Focused-test, typecheck, and full core-test results.
3. Deterministic changed-path/mutation-boundary evidence.
4. Implementation and conformance evidence.
5. The corrected evaluator result for the unchanged decision
   `applicability-20260815-001`, with provenance.
6. Any remaining blocker.

## Explicit Exclusions

This proposal does not authorize:

- regeneration of the Candidate Semantic Contract;
- modification of the ratified Contract;
- modification of the human applicability authority decision;
- modification of `.github/agents/` or any agent file;
- bypassing or expanding the approved remediation;
- applicability establishment by instruction rather than evaluator result;
- Runtime, SDK, Projection, Host, or downstream realization;
- an Applicable Contract artifact or workspace path.

## Requested Decision

**APPROVED:** authorize this handoff-specific operation prompt exactly as
bounded above. No Candidate regeneration, Contract mutation, authority-decision
mutation, or applicability-by-instruction is authorized.

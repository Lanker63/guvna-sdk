# Applicability Scope Equality Reconciliation

**State:** `REVIEW`
**Conclusion:** **B. The equality requirement is NOT authorized, and the evaluator contains an implementation/specification seam requiring remediation.**

## Question

The Applicability Determination returned `indeterminate` because the evaluator
implemented:

```ts
governedScope === subjectScope
```

This reconciliation determines whether that equality requirement is
established by approved authority, accepted doctrine, or the approved
Applicability Determination specification.

## Approved Scope Semantics

### Governed scope

The approved Candidate A scope decision establishes the semantic boundary:

`Guvna Semantic Contract semantic boundary`

The approved scope decision also requires scope to remain explicit,
provenance-bearing, Guvna-owned, and distinct from Governed Repository content
and Repository Authority scope. It does not establish a second subject-scope
value or state that a subject scope must equal the governed scope.

Authoritative source:

`.guvna/agent-state/proposals/governed-semantic-scope-authority-proposal.md`

The applicable passage states that compatibility and applicability require an
explicit comparison/governed scope and exact scope matching. Its stated scope
consequence is that scope must be represented and that the concrete governed
scope is selected by authority. It does not define `subjectScope` equality.

### Subject scope

The approved Candidate A semantic subject is:

`Guvna-owned Semantic Contract expressing accepted Guvna meaning`

This identifies the semantic subject of the Contract. It is not established by
approved authority as a scope value that must be textually identical to the
governed semantic boundary.

The later human applicability decision supplied this value as `subjectScope`,
but supplying a value does not authorize a new equality rule. The decision
must be evaluated under the already-approved semantics; the evaluator cannot
add a semantic constraint merely because two fields are present.

## Applicability Specification Reconciliation

The approved Semantic IR Applicability Determination specification says:

- applicability is evaluated from authoritative external inputs;
- the determination evaluates inputs against the already-established governed
  scope and required validity/effective-boundary conditions;
- prerequisites include an explicit governing authority decision and an exact
  governed-scope match;
- `applicable` means authoritative inputs recognize the validated Contract for
  the exact governed scope;
- `indeterminate` applies when the required decision, validation state, scope
  match, provenance, effective boundary, or supported interpretation is absent,
  ambiguous, conflicting, stale, revoked, or unavailable.

Authoritative sources:

- `.guvna/agent-state/proposals/gate-2-semantic-ir-proposal.yaml`
- `.guvna/agent-state/proposals/gate-2-semantic-ir-proposal.md`

Neither source defines a `subjectScope` field or requires
`governedScope === subjectScope`.

The approved Applicability Determination execution proposal authorizes
“evaluate the established governed scope” and “exact governed-scope
evaluation.” It does not authorize a new equality relation between governed
scope and subject scope.

Authoritative source:

`.guvna/agent-state/proposals/applicability-determination-execution-proposal.yaml`

The approved remediation/conformance records likewise require exact
governed-scope evaluation, not equality of the two differently named fields.

Authoritative sources:

- `.guvna/agent-state/proposals/applicability-determination-remediation-proposal.md`
- `.guvna/agent-state/proposals/applicability-determination-remediation-proposal.yaml`
- `.guvna/agent-state/proposals/compiler-implementation-proposal.yaml`

## Finding

**Conclusion: B.** The implemented requirement `governedScope === subjectScope`
is not established by the approved authority decisions, accepted doctrine, or
Applicability Determination specification.

The authorized requirement is exact evaluation of the authoritative governed
scope against the Contract's established/applicability scope or equivalent
scope assertion. The approved materials do not establish that the semantic
subject description must be the same string as the governed scope.

The `indeterminate` result therefore reflects an implementation/specification
seam:

- the human authority supplied the approved governed scope;
- the human authority supplied a distinct subject-scope description;
- the evaluator converted the distinction into an unauthorized equality
  failure;
- no approved rule authorizes treating that distinction as a scope mismatch.

This is not conclusion A because the authority decision did not supply
incompatible values under an approved equality rule. It is not conclusion C
because the approved sources consistently identify governed scope as the
required comparison boundary; the unresolved point is the evaluator's extra
`subjectScope` equality relation, not an ambiguity in whether governed scope
must be explicit and exact.

## Required Handling

This reconciliation is `REVIEW` only. It does not authorize remediation,
evaluator modification, authority-decision alteration, or a rerun.

The current authority decision remains unchanged. The existing determination
remains recorded as `indeterminate` evidence from the implementation that was
run; this review does not reinterpret that historical execution as
`applicable`.

No scope value is invented or changed. No Contract artifact, Applicable
Contract, workspace path, or downstream realization is created.

## Explicit Non-Actions

- Do not modify `determineApplicability`.
- Do not modify the human applicability authority decision.
- Do not rerun Applicability Determination.
- Do not infer that governed and subject scopes are equal.
- Do not establish applicability.
- Do not create or designate an Applicable Contract artifact or workspace path.
- Do not begin Runtime, SDK, Projection, Host, or downstream realization.

# Contract State And Compatibility Extract

**Status:** SPECIFICATION ONLY. This derivative extract is not a Contract,
authority decision, lifecycle instance, or Runtime schema.

**Sources:**

- [`contract-lifecycle-and-acceptance-authority-proposal.md`](../../../.guvna/agent-state/proposals/contract-lifecycle-and-acceptance-authority-proposal.md)
- [`contract-compatibility-authority-proposal.md`](../../../.guvna/agent-state/proposals/contract-compatibility-authority-proposal.md)
- [`candidate-version-and-semantic-delta-authority-proposal.md`](../../../.guvna/agent-state/proposals/candidate-version-and-semantic-delta-authority-proposal.md)

## Lifecycle And Acceptance

Lifecycle values are `candidate`, `validated`, `ratified`, `applicable`,
`superseded`, `rejected`, and `retired`. Acceptance is a separate dimension:
`unaccepted`, `accepted`, or `rejected`.

Every transition requires current lifecycle state, operation, preconditions,
scope, contract identity/version context, provenance, and applicable authority
and effective-boundary input where specified. Missing, conflicting, stale, or
unsupported input fails closed.

| From | Operation | To | Required condition |
|---|---|---|---|
| `candidate` | `validate` | `validated` | Structural and semantic validation succeeds; provenance is complete; no blocking gap. |
| `candidate` | `reject` | `rejected` | Authority rejects, or validation establishes incompatibility under an approved requirement set. |
| `validated` | `ratify` | `ratified` | Human ratification input identifies authority, scope, contract identity/version, and provenance. |
| `validated` | `reject` | `rejected` | Attributable authority rejection. |
| `ratified` | `apply` | `applicable` | Separate applicability input recognizes exact governed scope and effective boundary. |
| `ratified` | `reject` | `rejected` | Attributable authority rejection. |
| `ratified` | `retire` | `retired` | Attributable retirement decision. |
| `applicable` | `supersede` | `superseded` | Attributable successor and supersession decision. |
| `applicable` | `retire` | `retired` | Attributable retirement decision. |

No reverse or implicit transition is permitted. Filesystem state, persistence,
and version precedence are not transition evidence.

## Compatibility Evaluation

Implement this record shape for each externally supplied requirement:

```text
CompatibilityRequirement
  requirementIdentity
  subjectKind
  priorSubjectIdentity
  candidateSubjectIdentity
  governedScope
  direction: prior-to-candidate
  predicateKind
  predicateInputs
  requiredInterpretation
  authorityReference
  provenance
```

Supported preservation predicates are:

1. `obligations-preserved`
2. `relationships-preserved`
3. `invariants-preserved`
4. `authority-boundaries-preserved`
5. `provenance-requirements-preserved`
6. `failure-semantics-preserved`
7. `lifecycle-semantics-preserved`
8. `scope-compatible`

Require an attributable prior applicable subject, candidate subject, exact
scope (or an explicit mapping), and authoritative requirement set. Evaluate
all applicable requirements in the prior-to-candidate direction. Return
`incompatible` for an explicit violation, `indeterminate` for an absent or
unresolved required input, and `compatible` only when every applicable
requirement is satisfied.

## Semantic Delta Shape

For predecessor-backed evolution, preserve:

```text
priorSemanticIdentity
targetSemanticIdentity
priorSemanticVersion
targetSemanticVersion
governedScope
changedMeaning
changedObligations
changedStatesAndTransitions
changedInvariants
changedAuthorityRequirements
changedProvenanceRequirements
changedCompatibilityRequirements
changedFailureSemantics
compatibilityImplications
affectedRealizationObligations
sourceProvenance
authorityAttribution
```

Classify documentation, formatting, compiler/generator mechanics, and
realization-only changes separately from material semantic-boundary changes.
No major/minor/patch increment mapping is supplied here.

## Not Specified Here

- A contract instance, prior subject, candidate subject, or authoritative
  requirement dataset.
- Predicate implementation semantics beyond the named preservation labels.
- Runtime/SDK compatibility rules, migrations, or transport behavior.
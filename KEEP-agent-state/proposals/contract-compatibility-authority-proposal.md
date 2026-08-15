# Contract-Specific Compatibility Authority Proposal

**Phase:** 4 - Unblock Candidate Semantic Contract Generation  
**Decision group:** 2 of 3 - Contract compatibility  
**State:** APPROVED  
**Scope:** Contract-specific compatibility requirements, predicates, result vocabulary, and comparison scope only

## Requested Human Decision

Approve or revise the narrowly scoped compatibility rules below. This proposal does not decide lifecycle, acceptance, candidate version assignment, predecessor selection, Semantic Delta/versioning rules, ratification, applicability, persistence, or workspace location.

## Governing Sources

- [gate-2-semantic-ir-proposal.yaml](gate-2-semantic-ir-proposal.yaml): SemVer 2.0.0 parsing/precedence and explicit-requirement compatibility comparison are approved; applicability is authoritative external input; version-only inference is prohibited; absent or unsupported requirements yield `indeterminate`.
- [REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md](../../doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md): compatibility is contextual and distinguishes `Compatible`, `Projection-compatible`, `Adaptable`, `Migration-required`, `Incompatible`, and `Indeterminate`.
- [ARCHITECTURAL-INVARIANTS.md](../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md): semantic evolution must identify compatibility implications and preserve an attributable Semantic Delta; implementation behavior and version precedence do not establish semantic authority.
- [CONCEPTUAL-ARCHITECTURE.md](../../doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md): Guvna owns contract semantics and contract boundaries; repository-specific meaning remains separately owned.
- [candidate-semantic-contract-generation-proposal.md](candidate-semantic-contract-generation-proposal.md): compatibility comparison is required when an attributable prior Applicable Contract exists; otherwise comparison remains `INDETERMINATE` and is not inferred.

## Already Established

The following approved meanings and mechanics are preserved and are not reopened:

1. Compatibility is contextual, requirement-driven, attributable, and potentially asymmetric.
2. Comparison requires a prior subject, candidate subject, comparison scope, and authoritative applicable compatibility requirements.
3. `compatible` means every applicable approved requirement is evaluated and satisfied.
4. `incompatible` means at least one applicable approved requirement is explicitly violated.
5. `indeterminate` means the authoritative requirement set, required input, predicate, scope, or interpretation is absent, unresolved, ambiguous, unavailable, or unsupported.
6. Version numbers, identity, implementation changes, Runtime/SDK behavior, filesystem state, and ordering cannot determine applicability or compatibility by inference.
7. SemVer 2.0.0 syntax and precedence remain the approved version basis, but this proposal does not assign a candidate version.
8. No comparison against an Applicable Contract may be fabricated while the Applicable Contract prerequisite remains `BLOCKED/UNRESOLVED`.

## Proposed Contract-Specific Compatibility Scope

The Candidate Semantic Contract's compatibility subject is the semantic contract itself and its governed semantic scope. The supported comparison is:

```text
prior contract subject + candidate contract subject + governed scope
        -> explicit contract-requirement evaluation
        -> compatibility result
```

The proposal authorizes comparison only for these subject relationships:

| Relationship | Supported by this proposal? | Meaning |
|---|---:|---|
| Prior Candidate/Validated Contract -> Candidate Contract | No | A non-applicable predecessor cannot be treated as the applicable baseline without an authoritative requirement/context. |
| Prior Applicable Semantic Contract -> Candidate Semantic Contract | Yes, when attributable and available | Compare semantic obligations within the same governed scope against explicit applicable requirements. |
| Candidate Contract -> Runtime/SDK/Projection implementation | No | Realizations are downstream and cannot be semantic authority or define this contract's compatibility. |
| Repository-specific meaning -> Candidate Contract | No | Repository-specific meaning is separately owned and cannot define Guvna contract compatibility. |
| Different governed scopes | No, unless a separately approved scope-mapping requirement exists | Scope mismatch is unsupported for this proposal and yields `indeterminate`, not an inferred incompatibility. |

The predecessor comparison direction is prior applicable subject to candidate subject. Reverse compatibility is not inferred.

## Proposed Requirement Schema

Each applicable compatibility requirement must be authoritative, attributable, and bound to a comparison scope. The proposed minimum requirement record is:

```text
CompatibilityRequirement:
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

Required rules:

- `requirementIdentity`, subject identities, scope, predicate kind, authority reference, and provenance are required.
- `predicateInputs` must be explicit and semantically supported; missing or unsupported inputs produce `indeterminate`.
- Requirements must not be derived from version precedence, implementation behavior, filesystem state, generated output, or process state.
- Equal-authority conflicts or contradictory applicable requirements remain explicit and produce `indeterminate` unless an already-approved authority rule resolves them.
- A requirement applies only within its authoritative governed scope and direction.
- An empty authoritative requirement set is not silently treated as universal compatibility; it produces `indeterminate` unless the authority explicitly establishes that no requirements apply.

## Proposed Predicate Vocabulary

The contract-specific predicate vocabulary is deliberately limited to the approved generic comparison meaning:

| Predicate | Result when satisfied | Result when explicitly violated |
|---|---|---|
| `obligations-preserved` | `compatible` | `incompatible` |
| `relationships-preserved` | `compatible` | `incompatible` |
| `invariants-preserved` | `compatible` | `incompatible` |
| `authority-boundaries-preserved` | `compatible` | `incompatible` |
| `provenance-requirements-preserved` | `compatible` | `incompatible` |
| `failure-semantics-preserved` | `compatible` | `incompatible` |
| `lifecycle-semantics-preserved` | `compatible` | `incompatible` |
| `scope-compatible` | `compatible` | `incompatible` |

A predicate is evaluated only when its authoritative requirement and all required inputs are present. These predicates express preservation of already-defined contract obligations; they do not add new obligations or define version increments.

No adaptation or migration predicate is included in this proposal because the identified sources list `Adaptable` and `Migration-required` as broader adoption compatibility classifications but do not establish their rules for this Candidate Contract.

## Proposed Result Vocabulary

For this Candidate Contract, the primary comparison result vocabulary is:

- `compatible`: all applicable approved predicates are evaluated and satisfied.
- `incompatible`: at least one applicable approved predicate is explicitly violated.
- `indeterminate`: any required requirement, predicate, subject, scope, authority interpretation, predecessor, or provenance is absent, ambiguous, contradictory, stale, unavailable, or unsupported.

The broader values `projection-compatible`, `adaptable`, and `migration-required` are not part of this contract-specific result vocabulary unless human authority explicitly adds them with predicates and transition meaning. They must not be inferred from `compatible`, version differences, or implementation behavior.

## Proposed Comparison Procedure

1. Require an attributable prior Applicable Semantic Contract and candidate subject.
2. Require exact governed-scope agreement, or an explicit approved scope-mapping requirement.
3. Resolve the authoritative applicable requirement set without inferring defaults.
4. Evaluate every applicable requirement in the approved prior-to-candidate direction.
5. Return `incompatible` on any explicit predicate violation.
6. Return `indeterminate` when any required input, requirement, scope, authority interpretation, predicate, or provenance is missing or unresolved.
7. Return `compatible` only when all applicable requirements are evaluated and satisfied.
8. Preserve requirement identity, authority, scope, predicate inputs, evaluation result, and provenance.

This procedure does not determine applicability, ratification, supersession, or version precedence.

## Minimum Approval Needed to Unblock Gate 4

Human authority must approve or revise:

1. The supported comparison subjects and prior-to-candidate direction.
2. The requirement record fields and authority/provenance obligations.
3. The eight preservation predicates listed above, or a revised predicate set.
4. The primary result vocabulary: `compatible`, `incompatible`, `indeterminate`.
5. The exclusion of `projection-compatible`, `adaptable`, and `migration-required` unless separately defined.
6. Exact-scope comparison and fail-closed behavior for missing, conflicting, stale, or unsupported inputs.

Approval of this proposal would authorize these compatibility meanings as inputs for later Candidate compilation. It would not authorize Candidate generation in this proposal, decide lifecycle or versioning, ratify a candidate, establish applicability, create a Contract artifact, or designate a workspace path.

## Explicit Exclusions

- No lifecycle or acceptance vocabulary or transition decision.
- No candidate version, predecessor, initial-version, or Semantic Delta/versioning decision.
- No reopening or alteration of approved Gate 2 decisions.
- No Candidate Semantic Contract generation.
- No Contract Ratification or applicability.
- No Contract artifact, persistence convention, or workspace path.

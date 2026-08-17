# Runtime Contract Semantic Addendum

Status: **Approved by user on 2026-08-17**

This addendum authorizes the semantic rules for the initial Runtime Contract. It does not authorize Host execution, repository mutation, filesystem actions, model selection, or repository writes.

## 1. Semantic Boundary

Runtime SHALL consume only:

- an admitted `ApplicableSemanticContext`;
- explicitly supplied execution context;
- explicitly supplied authority inputs; and
- explicitly supplied provenance inputs.

Runtime SHALL fail closed for missing, ambiguous, invalid, incompatible, or unauthorized inputs.

Runtime SHALL NOT infer doctrine or repository meaning, establish Repository Truth, perform Acceptance, create Authority Decisions, execute Host operations, mutate repositories, select models, or treat provenance, confidence, persistence, or successful execution as authority.

## 2. Evaluation

`evaluate` is pure and may inspect only the admitted semantic context, supplied execution state, supplied authority inputs, supplied provenance inputs, and contract-defined semantic references reachable from those inputs.

It SHALL NOT inspect filesystem state, Host state, model behavior, or undeclared repository inputs.

Evaluation outcomes are mutually exclusive:

- `conformant`: sufficient authorized evidence supports satisfaction of every required contract condition and no unresolved contradiction remains;
- `nonConformant`: sufficient authorized evidence affirmatively supports a violation of an applicable contract condition;
- `indeterminate`: required evidence is absent, ambiguous, conflicting, unauthorized, or insufficient to distinguish the other outcomes.

Runtime SHALL NOT infer conformity from missing findings, infer non-conformity from unsupported assumptions, collapse conflicting interpretations, or convert confidence into certainty.

The applicable Runtime Contract SHALL provide the domain-specific predicates that distinguish satisfaction from violation.

## 3. Directive Production

`produceDirective` is pure and may accept only an explicitly accepted evaluation result, as defined by the applicable Runtime Contract.

Directives SHALL be derived only from the evaluation and its attributable authority and provenance basis. They remain distinct from the evaluation and from Authority.

Directive meanings are:

- `diagnostic`: reports an attributable condition requiring attention;
- `authorityRequired`: identifies a missing or insufficient authority decision and its scope;
- `operationRequested`: requests a separately authorized operation but does not dispatch or execute it.

A directive SHALL NOT authorize Host execution, repository mutation, Acceptance, or creation of an Authority Decision by itself.

## 4. Evidence Recording

`recordEvidence` produces an evidence artifact describing the evaluated operation, resulting outcome, execution context, applicable contract attribution, and preserved provenance.

Recording evidence SHALL NOT establish Repository Truth, perform Acceptance, create Repository Knowledge automatically, alter authority state, mutate a repository, or silently revise an outcome.

Evidence for an `indeterminate` outcome SHALL preserve that uncertainty.

## 5. Authority Handling

Authority inputs SHALL be explicitly supplied, scoped, attributable, identity-resolvable, and compatible with the applicable contract and requested operation.

Runtime SHALL reject authority inputs that are absent when required, outside scope, contradictory without an authorized resolution, applicable to another contract version, or inferred solely from provenance or execution state.

A reference is not an Authority Decision unless the applicable contract defines how it resolves to one.

## 6. Provenance and Identity

Every evaluation, directive, and evidence artifact SHALL preserve source contract identity, contract version, applicable scope, execution context where relevant, authority basis where relevant, and source/transformation provenance.

Deterministic identity SHALL be derived from canonical contract-defined inputs. Runtime SHALL NOT use timestamps, randomness, filesystem paths, iteration order, or model output formatting as identity inputs.

## 7. Failure Semantics

Runtime SHALL use the approved failure kinds:

- `missing-input` for absent required input;
- `ambiguous-input` for multiple materially distinct unresolved matches or interpretations;
- `invalid-input` for structural or value violations;
- `incompatible-input` for inputs that cannot participate in the applicable contract;
- `unauthorized-input` for absent, invalid, or out-of-scope authority.

Failures SHALL preserve the relevant input identity and a deterministic reason. Runtime SHALL not return a fallback result after a failure.

## 8. Required Contract Definitions

Before operation behavior is implemented, the applicable Runtime Contract SHALL define:

1. the predicates for conformity and non-conformity;
2. what constitutes an explicitly accepted evaluation result;
3. authority-reference resolution rules;
4. deterministic identity derivation inputs;
5. required provenance completeness for each operation;
6. whether evidence is returned only or persisted through a separately authorized boundary;
7. contradictory-authority handling; and
8. whether operation requests may be emitted from indeterminate evaluations.

This addendum supplies the Runtime boundary rules. It does not authorize Runtime to invent any of these contract-specific definitions.

## 9. Approved Initial Semantic Defaults

The following defaults are approved for the initial Runtime semantic realization:

1. `conformant` requires every applicable contract requirement to be satisfied by supplied, authorized evidence.
2. `nonConformant` requires an applicable contract requirement to be explicitly violated.
3. Missing, ambiguous, conflicting, insufficient, or unauthorized evidence produces `indeterminate`.
4. An accepted evaluation is one produced by `evaluate`, validated against the applicable contract, with preserved attribution. Structural validity alone does not establish acceptance.
5. Authority references resolve only through explicitly supplied, scope-matching authority decisions for the same contract identity and version. Unresolved references fail as `unauthorized-input`.
6. Deterministic identity inputs are operation kind, source contract identity and version, scope, canonical input identities, outcome, and canonical provenance. Time, randomness, filesystem paths, iteration order, and model formatting are excluded.
7. Every result, directive, and evidence artifact requires complete contract attribution, execution context, authority basis where used, and source/transformation provenance.
8. Evidence is returned as a Runtime result only. Persistence requires a separately authorized boundary.
9. Contradictory authority fails as `ambiguous-input` unless the applicable contract provides an explicit resolution.
10. `operationRequested` SHALL NOT be emitted from an `indeterminate` evaluation unless the applicable contract explicitly authorizes that case.

## 10. Approved Rules Ownership

Runtime SHALL NOT implement a universal Guvna evaluation algorithm. Contract-specific semantic rules remain owned by the applicable Runtime Contract and are supplied through an adapter implementing:

```ts
interface RuntimeSemanticRules {
  evaluate(input: RuntimeEvaluationInput): RuntimeRuleEvaluation;
  acceptEvaluation(evaluation: RuntimeEvaluationResult): boolean;
  produceDirective(evaluation: RuntimeEvaluationResult): RuntimeDirective | RuntimeFailure;
}
```

The adapter SHALL:

- return `conformant` only when every applicable requirement is explicitly satisfied by authorized evidence;
- return `nonConformant` only when an applicable requirement is explicitly violated;
- return `indeterminate` for missing, conflicting, ambiguous, or insufficient evidence;
- resolve authority only through scope-matching records for the same contract identity and version;
- return `unauthorized-input` for unresolved or out-of-scope authority;
- derive `diagnostic` from attributable findings;
- derive `authorityRequired` when required authority is absent or insufficient; and
- omit `operationRequested` for `indeterminate` unless explicitly authorized by the applicable contract.

Runtime remains responsible for boundary validation, fail-closed dispatch, attribution, deterministic realization identities, and return-only evidence. It does not become the semantic source by hosting the adapter interface.

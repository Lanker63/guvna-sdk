# Proposed Runtime Contract Schema

Status: **Approved Runtime Contract schema**

This document records the approved field-level shapes for the initial Runtime Contract. Approval is limited to the semantics and exclusions stated here.

## Boundary

Runtime may interpret and produce directives only from:

- an admitted Applicable Semantic Context;
- explicitly supplied execution context;
- explicitly supplied authority inputs; and
- explicitly supplied provenance inputs.

Missing, ambiguous, invalid, incompatible, or unauthorized inputs fail closed.

This proposal excludes:

- execution;
- mutation;
- filesystem actions;
- model selection;
- repository writes; and
- Host behavior.

## Shared References

```ts
interface RuntimeContractAttribution {
  contractIdentity: SemanticIdentity;
  contractVersion: string;
  scope: SemanticScope;
  provenance: ProvenanceRef[];
}

interface RuntimeExecutionContext {
  identity: SemanticIdentity;
  state: JsonValue;
  provenance: ProvenanceRef[];
}

interface RuntimeAuthorityInput {
  identity: SemanticIdentity;
  decisions: SemanticRef[];
  scope: SemanticScope;
  provenance: ProvenanceRef[];
}

interface RuntimeProvenanceInput {
  identity: SemanticIdentity;
  sources: ProvenanceRef[];
  transformations: TransformationRef[];
}
```

`ApplicableSemanticContext`, `SemanticIdentity`, `SemanticScope`, `SemanticRef`, `ProvenanceRef`, `TransformationRef`, and `JsonValue` are existing implementation types referenced here for proposal purposes. Their use in this proposal does not itself authorize new semantics.

## Evaluation Input

```ts
interface RuntimeEvaluationInput {
  context: ApplicableSemanticContext;
  execution: RuntimeExecutionContext;
  authority: RuntimeAuthorityInput;
  provenance: RuntimeProvenanceInput;
}
```

The `context` MUST be produced by the approved runtime entry path. Runtime MUST NOT reconstruct it from filesystem state, filenames, implementation patterns, or model behavior.

## Operations

```ts
type RuntimeOperation =
  | {
      operationKind: 'evaluate';
      identity: SemanticIdentity;
      input: RuntimeEvaluationInput;
      attribution: RuntimeContractAttribution;
    }
  | {
      operationKind: 'produceDirective';
      identity: SemanticIdentity;
      evaluation: RuntimeEvaluationResult;
      attribution: RuntimeContractAttribution;
    }
  | {
      operationKind: 'recordEvidence';
      identity: SemanticIdentity;
      evaluation: RuntimeEvaluationResult;
      outcome: RuntimeOutcome;
      attribution: RuntimeContractAttribution;
    };
```

Proposed operation constraints:

- `evaluate` produces no side effect.
- `produceDirective` derives a directive from an accepted evaluation result.
- `recordEvidence` records what Runtime evaluated and the resulting outcome.
- No operation executes a Host action or mutates a repository.

## Directives

```ts
type RuntimeDirective =
  | {
      directiveKind: 'diagnostic';
      identity: SemanticIdentity;
      severity: 'error' | 'warning';
      code: string;
      message: string;
      attribution: RuntimeDirectiveAttribution;
    }
  | {
      directiveKind: 'authorityRequired';
      identity: SemanticIdentity;
      requiredDecision: SemanticRef;
      scope: SemanticScope;
      attribution: RuntimeDirectiveAttribution;
    }
  | {
      directiveKind: 'operationRequested';
      identity: SemanticIdentity;
      operation: SemanticRef;
      inputs: JsonValue;
      attribution: RuntimeDirectiveAttribution;
    };

interface RuntimeDirectiveAttribution extends RuntimeContractAttribution {
  executionContext: SemanticRef;
  authorityBasis: SemanticRef[];
}
```

Directives are derived outputs. They are not independent semantic authorities and do not authorize Host execution by themselves.

## Results

```ts
type RuntimeOperationResult =
  | { ok: true; value: RuntimeEvaluationResult | RuntimeDirective | RuntimeEvidence }
  | { ok: false; failure: RuntimeFailure };

type RuntimeFailure =
  | { failureKind: 'missing-input'; input: SemanticIdentity; reason: string }
  | { failureKind: 'ambiguous-input'; input: SemanticIdentity; reason: string }
  | { failureKind: 'invalid-input'; input: SemanticIdentity; reason: string }
  | { failureKind: 'incompatible-input'; input: SemanticIdentity; reason: string }
  | { failureKind: 'unauthorized-input'; input: SemanticIdentity; reason: string };
```

## Evaluation and Evidence

```ts
interface RuntimeEvaluationResult {
  identity: SemanticIdentity;
  outcome: RuntimeOutcome;
  attribution: RuntimeDirectiveAttribution;
}

type RuntimeOutcome =
  | { outcomeKind: 'conformant'; findings: SemanticRef[] }
  | { outcomeKind: 'nonConformant'; findings: SemanticRef[] }
  | { outcomeKind: 'indeterminate'; findings: SemanticRef[] };

interface RuntimeEvidence {
  identity: SemanticIdentity;
  operation: SemanticRef;
  outcome: RuntimeOutcome;
  attribution: RuntimeContractAttribution;
  executionContext: SemanticRef;
}
```

The outcome vocabulary above is proposed only. It requires explicit authority approval before implementation and must not be inferred from existing lifecycle or validation vocabulary.

## Approval Record

The proposal is approved for implementation with the following scope:

- each field and field type;
- the operation constraints;
- the directive meanings and payloads;
- the outcome vocabulary;
- the failure vocabulary;
- the attribution requirements; and
- the exclusion of Host execution and repository mutation.

The approval does not authorize Host execution, repository mutation, filesystem actions, model selection, or repository writes.

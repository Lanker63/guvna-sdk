import { serializeCompactJson } from '../compiler/ir-serializer.js';
import type {
  RuntimeDirective,
  RuntimeDirectiveAttribution,
  RuntimeEvaluationInput,
  RuntimeEvaluationResult,
  RuntimeFailure,
  RuntimeNoDirective,
  RuntimeOperation,
  RuntimeOperationResult,
  RuntimeOutcome,
  RuntimeEvidence,
} from './runtime-contract.js';
import {
  validateRuntimeDirective,
  validateRuntimeOperation,
  validateRuntimeOutcome,
} from './runtime-contract.js';
import { admitApplicableSemanticContext } from './applicable-semantic-context.js';

export interface RuntimeSemanticRules {
  evaluate(input: RuntimeEvaluationInput): RuntimeRuleEvaluationResult;
  acceptEvaluation(evaluation: RuntimeEvaluationResult): boolean;
  produceDirective(
    evaluation: RuntimeEvaluationResult,
  ): RuntimeDirective | RuntimeNoDirective | RuntimeFailure;
}

export interface RuntimeRuleEvaluation {
  outcome: RuntimeOutcome;
  authorityBasis: RuntimeEvaluationInput['authority']['decisions'];
}

export type RuntimeRuleEvaluationResult =
  { ok: true; value: RuntimeRuleEvaluation } | { ok: false; failure: RuntimeFailure };

export function runRuntimeOperation(
  operation: RuntimeOperation | null | undefined,
  rules: RuntimeSemanticRules | null | undefined,
): RuntimeOperationResult {
  if (!operation)
    return failure('missing-input', operationIdentity(operation), 'Runtime operation is absent');
  const operationValidation = validateRuntimeOperation(operation);
  if (!operationValidation.valid)
    return failure('invalid-input', operationIdentity(operation), operationValidation.reason);
  if (!rules)
    return failure('missing-input', operation.identity, 'Runtime semantic rules are absent');

  if (operation.operationKind === 'evaluate') return evaluate(operation, rules);
  if (operation.operationKind === 'produceDirective') return produceDirective(operation, rules);
  return recordEvidence(operation);
}

function evaluate(
  operation: Extract<RuntimeOperation, { operationKind: 'evaluate' }>,
  rules: RuntimeSemanticRules,
): RuntimeOperationResult {
  const admission = admitApplicableSemanticContext(operation.input.context);
  if (!admission.ok) return failure('unauthorized-input', operation.identity, admission.reason);
  const evaluation = rules.evaluate(operation.input);
  if (isFailureResult(evaluation)) return { ok: false, failure: evaluation.failure };
  if (!isRuleEvaluation(evaluation.value))
    return failure(
      'invalid-input',
      operation.identity,
      'Runtime semantic rules returned an invalid evaluation',
    );
  const attribution: RuntimeDirectiveAttribution = {
    ...operation.attribution,
    executionContext: { identity: operation.input.execution.identity },
    authorityBasis: evaluation.value.authorityBasis,
  };
  const result: RuntimeEvaluationResult = {
    identity: deterministicIdentity('runtime-evaluation', {
      operation: operation.operationKind,
      identity: operation.identity,
      input: operation.input,
      outcome: evaluation.value.outcome,
    }),
    outcome: evaluation.value.outcome,
    attribution,
  };
  return { ok: true, value: result };
}

function produceDirective(
  operation: Extract<RuntimeOperation, { operationKind: 'produceDirective' }>,
  rules: RuntimeSemanticRules,
): RuntimeOperationResult {
  if (!rules.acceptEvaluation(operation.evaluation))
    return failure(
      'unauthorized-input',
      operation.identity,
      'Runtime evaluation result is not accepted',
    );
  const directive = rules.produceDirective(operation.evaluation);
  if (isFailure(directive)) return { ok: false, failure: directive };
  if (isNoDirective(directive)) return { ok: true, value: directive };
  const validation = validateRuntimeDirective(directive);
  return validation.valid
    ? { ok: true, value: directive }
    : failure('invalid-input', operation.identity, validation.reason);
}

function recordEvidence(
  operation: Extract<RuntimeOperation, { operationKind: 'recordEvidence' }>,
): RuntimeOperationResult {
  if (
    operation.outcome.outcomeKind !== operation.evaluation.outcome.outcomeKind ||
    JSON.stringify(operation.outcome.findings) !==
      JSON.stringify(operation.evaluation.outcome.findings)
  ) {
    return failure(
      'invalid-input',
      operation.identity,
      'Evidence outcome does not match evaluation outcome',
    );
  }
  if (
    JSON.stringify(operation.attribution) !==
    JSON.stringify(sharedAttribution(operation.evaluation.attribution))
  ) {
    return failure(
      'invalid-input',
      operation.identity,
      'Evidence attribution does not match evaluation attribution',
    );
  }
  const evidence: RuntimeEvidence = {
    identity: deterministicIdentity('runtime-evidence', {
      operation: operation.operationKind,
      identity: operation.identity,
      evaluation: operation.evaluation,
      outcome: operation.outcome,
    }),
    operation: { identity: operation.identity },
    outcome: operation.outcome,
    attribution: operation.attribution,
    executionContext: operation.evaluation.attribution.executionContext,
  };
  return { ok: true, value: evidence };
}

function sharedAttribution(attribution: RuntimeEvaluationResult['attribution']) {
  return {
    contractIdentity: attribution.contractIdentity,
    contractVersion: attribution.contractVersion,
    scope: attribution.scope,
    provenance: attribution.provenance,
  };
}

function deterministicIdentity(identityKind: string, input: unknown) {
  const serialized = serializeCompactJson(canonicalize(input));
  return {
    identityKind,
    value: serialized.ok ? new TextDecoder().decode(serialized.bytes) : 'invalid',
  };
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (typeof value !== 'object' || value === null) return value;
  return Object.fromEntries(
    Object.keys(value as Record<string, unknown>)
      .sort()
      .map((key) => [key, canonicalize((value as Record<string, unknown>)[key])]),
  );
}

function isRuleEvaluation(value: unknown): value is RuntimeRuleEvaluation {
  return (
    typeof value === 'object' &&
    value !== null &&
    'outcome' in value &&
    'authorityBasis' in value &&
    Array.isArray(value.authorityBasis) &&
    validateRuntimeOutcome(value.outcome).valid &&
    value.authorityBasis.every(isSemanticRef)
  );
}

function isFailureResult(
  value: RuntimeRuleEvaluationResult,
): value is { ok: false; failure: RuntimeFailure } {
  return value.ok === false;
}

function isSemanticRef(value: unknown): boolean {
  if (typeof value !== 'object' || value === null || Array.isArray(value) || !('identity' in value))
    return false;
  const identity = value.identity;
  return (
    typeof identity === 'object' &&
    identity !== null &&
    !Array.isArray(identity) &&
    'identityKind' in identity &&
    'value' in identity &&
    typeof identity.identityKind === 'string' &&
    identity.identityKind.length > 0 &&
    typeof identity.value === 'string' &&
    identity.value.length > 0
  );
}

function isFailure(
  value: RuntimeDirective | RuntimeNoDirective | RuntimeFailure,
): value is RuntimeFailure {
  return 'failureKind' in value;
}

function isNoDirective(
  value: RuntimeDirective | RuntimeNoDirective | RuntimeFailure,
): value is RuntimeNoDirective {
  return 'resultKind' in value && value.resultKind === 'noDirective';
}

function operationIdentity(value: unknown) {
  if (
    typeof value === 'object' &&
    value !== null &&
    'identity' in value &&
    typeof value.identity === 'object' &&
    value.identity !== null
  )
    return value.identity as { identityKind: string; value: string };
  return { identityKind: 'runtime-operation', value: 'unknown' };
}

function failure(
  failureKind: RuntimeFailure['failureKind'],
  input: { identityKind: string; value: string },
  reason: string,
): RuntimeOperationResult {
  return { ok: false, failure: { failureKind, input, reason } };
}

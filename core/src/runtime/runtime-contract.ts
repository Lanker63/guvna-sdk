import type {
  JsonValue,
  ProvenanceRef,
  SemanticIdentity,
  SemanticRef,
  SemanticScope,
  TransformationRef,
} from '../compiler/semantic-ir.js';
import type { ApplicableSemanticContext } from './applicable-semantic-context.js';
import { admitApplicableSemanticContext } from './applicable-semantic-context.js';
import type { DomainPackManifest } from '../compiler/domain-pack-manifest.js';

export interface RuntimeContractAttribution {
  contractIdentity: SemanticIdentity;
  contractVersion: string;
  scope: SemanticScope;
  provenance: ProvenanceRef[];
}

export interface RuntimeExecutionContext {
  identity: SemanticIdentity;
  state: JsonValue;
  provenance: ProvenanceRef[];
}

export interface RuntimeAuthorityInput {
  identity: SemanticIdentity;
  decisions: SemanticRef[];
  scope: SemanticScope;
  provenance: ProvenanceRef[];
}

export interface RuntimeSemanticEvidence {
  identity: SemanticIdentity;
  ir: SemanticRef;
  scope: SemanticScope;
  provenance: ProvenanceRef[];
}

export interface RuntimeProvenanceInput {
  identity: SemanticIdentity;
  sources: ProvenanceRef[];
  transformations: TransformationRef[];
}

export interface RuntimeEvaluationInput {
  context: ApplicableSemanticContext;
  semanticEvidence: RuntimeSemanticEvidence;
  execution: RuntimeExecutionContext;
  authority: RuntimeAuthorityInput;
  provenance: RuntimeProvenanceInput;
  manifest?: DomainPackManifest;
  acceptedContent?: SemanticIdentity[];
  compatibility?: 'compatible' | 'incompatible' | 'indeterminate';
}

export type RuntimeOperation =
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

export interface RuntimeDirectiveAttribution extends RuntimeContractAttribution {
  executionContext: SemanticRef;
  authorityBasis: SemanticRef[];
}

export type RuntimeDirective =
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

export type RuntimeOperationResult =
  | {
      ok: true;
      value: RuntimeEvaluationResult | RuntimeDirective | RuntimeNoDirective | RuntimeEvidence;
    }
  | { ok: false; failure: RuntimeFailure };

export interface RuntimeNoDirective {
  resultKind: 'noDirective';
  identity: SemanticIdentity;
  attribution: RuntimeDirectiveAttribution;
}

export type RuntimeFailure =
  | { failureKind: 'missing-input'; input: SemanticIdentity; reason: string }
  | { failureKind: 'ambiguous-input'; input: SemanticIdentity; reason: string }
  | { failureKind: 'invalid-input'; input: SemanticIdentity; reason: string }
  | { failureKind: 'incompatible-input'; input: SemanticIdentity; reason: string }
  | { failureKind: 'unauthorized-input'; input: SemanticIdentity; reason: string };

export interface RuntimeEvaluationResult {
  identity: SemanticIdentity;
  outcome: RuntimeOutcome;
  attribution: RuntimeDirectiveAttribution;
}

export type RuntimeOutcome =
  | { outcomeKind: 'conformant'; findings: SemanticRef[] }
  | { outcomeKind: 'nonConformant'; findings: SemanticRef[] }
  | { outcomeKind: 'indeterminate'; findings: SemanticRef[] };

export interface RuntimeEvidence {
  identity: SemanticIdentity;
  operation: SemanticRef;
  outcome: RuntimeOutcome;
  attribution: RuntimeContractAttribution;
  executionContext: SemanticRef;
}

export type RuntimeSchemaValidationResult = { valid: true } | { valid: false; reason: string };

export function validateRuntimeOperation(value: unknown): RuntimeSchemaValidationResult {
  if (
    !isRecord(value) ||
    !isIdentity(value.identity) ||
    !isNonEmptyString(value.operationKind) ||
    !isAttribution(value.attribution)
  )
    return invalid('Runtime operation structure is invalid');
  if (value.operationKind === 'evaluate')
    return hasOnlyFields(value, ['operationKind', 'identity', 'input', 'attribution'], []) &&
      isEvaluationInput(value.input)
      ? valid()
      : invalid('Runtime evaluation input is invalid');
  if (value.operationKind === 'produceDirective')
    return hasOnlyFields(value, ['operationKind', 'identity', 'evaluation', 'attribution'], []) &&
      isEvaluationResult(value.evaluation)
      ? valid()
      : invalid('Runtime evaluation result is invalid');
  if (value.operationKind === 'recordEvidence')
    return hasOnlyFields(
      value,
      ['operationKind', 'identity', 'evaluation', 'outcome', 'attribution'],
      [],
    ) &&
      isEvaluationResult(value.evaluation) &&
      isOutcome(value.outcome)
      ? valid()
      : invalid('Runtime evidence input is invalid');
  return invalid('Runtime operation kind is invalid');
}

export function validateRuntimeEvaluationInput(value: unknown): RuntimeSchemaValidationResult {
  return isEvaluationInput(value) ? valid() : invalid('Runtime evaluation input is invalid');
}

export function validateRuntimeOutcome(value: unknown): RuntimeSchemaValidationResult {
  return isOutcome(value) ? valid() : invalid('Runtime outcome is invalid');
}

export function validateRuntimeDirective(value: unknown): RuntimeSchemaValidationResult {
  if (!isRecord(value) || !isIdentity(value.identity) || !isDirectiveAttribution(value.attribution))
    return invalid('Runtime directive structure is invalid');
  if (value.directiveKind === 'diagnostic')
    return hasOnlyFields(
      value,
      ['directiveKind', 'identity', 'severity', 'code', 'message', 'attribution'],
      [],
    ) &&
      (value.severity === 'error' || value.severity === 'warning')
      ? isNonEmptyString(value.code) && isNonEmptyString(value.message)
        ? valid()
        : invalid('Runtime diagnostic fields are invalid')
      : invalid('Runtime diagnostic severity is invalid');
  if (value.directiveKind === 'authorityRequired')
    return hasOnlyFields(
      value,
      ['directiveKind', 'identity', 'requiredDecision', 'scope', 'attribution'],
      [],
    ) &&
      isRef(value.requiredDecision) &&
      isScope(value.scope)
      ? valid()
      : invalid('Runtime authority directive fields are invalid');
  if (value.directiveKind === 'operationRequested')
    return hasOnlyFields(
      value,
      ['directiveKind', 'identity', 'operation', 'inputs', 'attribution'],
      [],
    ) &&
      isRef(value.operation) &&
      isJson(value.inputs)
      ? valid()
      : invalid('Runtime operation directive fields are invalid');
  return invalid('Runtime directive kind is invalid');
}

export function validateRuntimeOperationResult(value: unknown): RuntimeSchemaValidationResult {
  if (
    !isRecord(value) ||
    !hasOnlyFields(value, ['ok'], ['value', 'failure']) ||
    typeof value.ok !== 'boolean'
  )
    return invalid('Runtime operation result structure is invalid');
  if (value.ok)
    return hasOnlyFields(value, ['ok', 'value'], []) &&
      (isEvaluationResult(value.value) ||
        isDirective(value.value) ||
        isNoDirective(value.value) ||
        isEvidence(value.value))
      ? valid()
      : invalid('Runtime operation success value is invalid');
  return hasOnlyFields(value, ['ok', 'failure'], []) && isFailure(value.failure)
    ? valid()
    : invalid('Runtime operation failure is invalid');
}

export function validateRuntimeFailure(value: unknown): RuntimeSchemaValidationResult {
  return isFailure(value) ? valid() : invalid('Runtime failure is invalid');
}

function isEvaluationInput(value: unknown): value is RuntimeEvaluationInput {
  return (
    isRecord(value) &&
    isApplicableContext(value.context) &&
    isSemanticEvidence(value.semanticEvidence) &&
    isExecutionContext(value.execution) &&
    isAuthorityInput(value.authority) &&
    isProvenanceInput(value.provenance)
  );
}

function isNoDirective(value: unknown): value is RuntimeNoDirective {
  return (
    isRecord(value) &&
    hasOnlyFields(value, ['resultKind', 'identity', 'attribution'], []) &&
    value.resultKind === 'noDirective' &&
    isIdentity(value.identity) &&
    isDirectiveAttribution(value.attribution)
  );
}

function isSemanticEvidence(value: unknown): value is RuntimeSemanticEvidence {
  return (
    isRecord(value) &&
    hasOnlyFields(value, ['identity', 'ir', 'scope', 'provenance'], []) &&
    isIdentity(value.identity) &&
    isRef(value.ir) &&
    isScope(value.scope) &&
    isProvenanceRefs(value.provenance)
  );
}

function isEvaluationResult(value: unknown): value is RuntimeEvaluationResult {
  return (
    isRecord(value) &&
    hasOnlyFields(value, ['identity', 'outcome', 'attribution'], []) &&
    isIdentity(value.identity) &&
    isOutcome(value.outcome) &&
    isDirectiveAttribution(value.attribution)
  );
}

function isExecutionContext(value: unknown): value is RuntimeExecutionContext {
  return (
    isRecord(value) &&
    hasOnlyFields(value, ['identity', 'state', 'provenance'], []) &&
    isIdentity(value.identity) &&
    isJson(value.state) &&
    isProvenanceRefs(value.provenance)
  );
}
function isAuthorityInput(value: unknown): value is RuntimeAuthorityInput {
  return (
    isRecord(value) &&
    hasOnlyFields(value, ['identity', 'decisions', 'scope', 'provenance'], []) &&
    isIdentity(value.identity) &&
    isRefs(value.decisions) &&
    isScope(value.scope) &&
    isProvenanceRefs(value.provenance)
  );
}
function isProvenanceInput(value: unknown): value is RuntimeProvenanceInput {
  return (
    isRecord(value) &&
    hasOnlyFields(value, ['identity', 'sources', 'transformations'], []) &&
    isIdentity(value.identity) &&
    isProvenanceRefs(value.sources) &&
    isTransformations(value.transformations)
  );
}
function isOutcome(value: unknown): value is RuntimeOutcome {
  return (
    isRecord(value) &&
    hasOnlyFields(value, ['outcomeKind', 'findings'], []) &&
    ['conformant', 'nonConformant', 'indeterminate'].includes(value.outcomeKind as string) &&
    isRefs(value.findings)
  );
}
function isAttribution(value: unknown): value is RuntimeContractAttribution {
  return (
    isRecord(value) &&
    hasOnlyFields(value, ['contractIdentity', 'contractVersion', 'scope', 'provenance'], []) &&
    isIdentity(value.contractIdentity) &&
    isNonEmptyString(value.contractVersion) &&
    isScope(value.scope) &&
    isProvenanceRefs(value.provenance)
  );
}
function isDirectiveAttribution(value: unknown): value is RuntimeDirectiveAttribution {
  return (
    isRecord(value) &&
    hasOnlyFields(
      value,
      [
        'contractIdentity',
        'contractVersion',
        'scope',
        'provenance',
        'executionContext',
        'authorityBasis',
      ],
      [],
    ) &&
    isIdentity(value.contractIdentity) &&
    isNonEmptyString(value.contractVersion) &&
    isScope(value.scope) &&
    isProvenanceRefs(value.provenance) &&
    isRef(value.executionContext) &&
    isRefs(value.authorityBasis)
  );
}
function isDirective(value: unknown): value is RuntimeDirective {
  return validateRuntimeDirective(value).valid;
}
function isEvidence(value: unknown): value is RuntimeEvidence {
  return (
    isRecord(value) &&
    hasOnlyFields(
      value,
      ['identity', 'operation', 'outcome', 'attribution', 'executionContext'],
      [],
    ) &&
    isIdentity(value.identity) &&
    isRef(value.operation) &&
    isOutcome(value.outcome) &&
    isAttribution(value.attribution) &&
    isRef(value.executionContext)
  );
}
function isFailure(value: unknown): value is RuntimeFailure {
  return (
    isRecord(value) &&
    hasOnlyFields(value, ['failureKind', 'input', 'reason'], []) &&
    [
      'missing-input',
      'ambiguous-input',
      'invalid-input',
      'incompatible-input',
      'unauthorized-input',
    ].includes(value.failureKind as string) &&
    isIdentity(value.input) &&
    isNonEmptyString(value.reason)
  );
}
function isApplicableContext(value: unknown): value is ApplicableSemanticContext {
  return (
    isRecord(value) &&
    admitApplicableSemanticContext(value as unknown as ApplicableSemanticContext).ok
  );
}
function isScope(value: unknown): value is SemanticScope {
  return (
    isRecord(value) &&
    hasOnlyFields(value, ['identity', 'meaning'], []) &&
    isIdentity(value.identity) &&
    isRecord(value.meaning) &&
    hasOnlyFields(value.meaning, ['statement', 'terms'], []) &&
    isNonEmptyString(value.meaning.statement) &&
    isRefs(value.meaning.terms)
  );
}
function isRef(value: unknown): value is SemanticRef {
  return isRecord(value) && hasOnlyFields(value, ['identity'], []) && isIdentity(value.identity);
}
function isRefs(value: unknown): value is SemanticRef[] {
  return Array.isArray(value) && value.every(isRef);
}
function isProvenanceRef(value: unknown): value is ProvenanceRef {
  return (
    isRecord(value) &&
    hasOnlyFields(value, ['sourceIdentity'], ['sourcePath', 'sourceSection']) &&
    isIdentity(value.sourceIdentity) &&
    (!value.sourcePath || typeof value.sourcePath === 'string') &&
    (!value.sourceSection || typeof value.sourceSection === 'string')
  );
}
function isProvenanceRefs(value: unknown): value is ProvenanceRef[] {
  return Array.isArray(value) && value.every(isProvenanceRef);
}
function isTransformations(value: unknown): value is TransformationRef[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isRecord(item) &&
        hasOnlyFields(item, ['identity', 'kind', 'inputs', 'outputs'], []) &&
        isIdentity(item.identity) &&
        ['discover', 'parse', 'normalize', 'resolve', 'compile', 'project', 'realize'].includes(
          item.kind as string,
        ) &&
        isRefs(item.inputs) &&
        isRefs(item.outputs),
    )
  );
}
function isIdentity(value: unknown): value is SemanticIdentity {
  return (
    isRecord(value) &&
    hasOnlyFields(value, ['identityKind', 'value'], []) &&
    isNonEmptyString(value.identityKind) &&
    isNonEmptyString(value.value)
  );
}
function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function hasOnlyFields(
  value: Record<string, unknown>,
  required: string[],
  optional: string[],
): boolean {
  const keys = Object.keys(value);
  return (
    required.every((field) => field in value) &&
    keys.every((field) => required.includes(field) || optional.includes(field))
  );
}
function isJson(value: unknown): value is JsonValue {
  if (value === null || typeof value === 'boolean' || typeof value === 'string') return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (Array.isArray(value)) return value.every(isJson);
  return isRecord(value) && Object.values(value).every(isJson);
}
function valid(): RuntimeSchemaValidationResult {
  return { valid: true };
}
function invalid(reason: string): RuntimeSchemaValidationResult {
  return { valid: false, reason };
}

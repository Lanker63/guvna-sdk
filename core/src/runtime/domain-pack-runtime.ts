import type { DomainPackManifest } from '../compiler/domain-pack-manifest.js';
import { validateDomainPackManifest } from '../compiler/domain-pack-manifest.js';
import type { SemanticIdentity } from '../compiler/semantic-ir.js';
import type {
  RuntimeEvaluationInput,
  RuntimeFailure,
} from './runtime-contract.js';
import type { RuntimeRuleEvaluation, RuntimeRuleEvaluationResult } from './runtime-semantics.js';
import type { RuntimeSemanticRules as RuntimeRules } from './runtime-semantics.js';

export interface DomainPackRuntimeInput extends RuntimeEvaluationInput {
  manifest: DomainPackManifest;
  acceptedContent: SemanticIdentity[];
  compatibility: 'compatible' | 'incompatible' | 'indeterminate';
}

export function createDomainPackRuntimeRules(
  rules: Pick<RuntimeRules, 'acceptEvaluation' | 'produceDirective'>,
): RuntimeRules {
  return {
    evaluate(input) {
      if (!isDomainPackRuntimeInput(input))
        return failure('invalid-input', 'Domain Pack Runtime input is incomplete');
      return evaluateDomainPack(input);
    },
    acceptEvaluation: rules.acceptEvaluation,
    produceDirective: rules.produceDirective,
  };
}

export function isDomainPackRuntimeInput(
  input: RuntimeEvaluationInput,
): input is DomainPackRuntimeInput {
  const manifestValidation = validateDomainPackManifest(input.manifest);
  return (
    manifestValidation.valid &&
    Array.isArray(input.acceptedContent) &&
    input.acceptedContent.every(isSemanticIdentity) &&
    (input.compatibility === 'compatible' ||
      input.compatibility === 'incompatible' ||
      input.compatibility === 'indeterminate')
  );
}

export function evaluateDomainPack(
  input: DomainPackRuntimeInput | null | undefined,
): RuntimeRuleEvaluationResult {
  if (!input) return failure('missing-input', 'Domain Pack Runtime input is absent');

  if (isManifestRecord(input.manifest) && Array.isArray(input.manifest.contents)) {
    for (const content of input.manifest.contents) {
      if (isContentRecord(content) && content.contentClass === 'agent' && content.authorityClaim)
        return failure('unauthorized-input', 'Bundled Domain Pack agents cannot claim authority');
    }
  }

  const manifestValidation = validateDomainPackManifest(input.manifest);
  if (!manifestValidation.valid)
    return failure('invalid-input', `Domain Pack manifest is ${manifestValidation.status}`);

  for (const content of input.manifest.contents) {
    if (content.contentClass === 'agent' && content.authorityClaim)
      return failure('unauthorized-input', 'Bundled Domain Pack agents cannot claim authority');
  }

  if (input.compatibility === 'incompatible') return outcome('nonConformant');
  if (input.compatibility === 'indeterminate') return outcome('indeterminate');
  if (!Array.isArray(input.acceptedContent))
    return failure('missing-input', 'Accepted Domain Pack content is absent');

  const accepted = input.manifest.contents.every((content) =>
    input.acceptedContent.some(
      (candidate) =>
        content.identity.identityKind === candidate.identityKind &&
        content.identity.value === candidate.value,
    ),
  );
  return accepted ? outcome('conformant') : outcome('indeterminate');
}

function outcome(outcomeKind: RuntimeRuleEvaluation['outcome']['outcomeKind']): RuntimeRuleEvaluationResult {
  return { ok: true, value: { outcome: { outcomeKind, findings: [] }, authorityBasis: [] } };
}

function failure(failureKind: RuntimeFailure['failureKind'], reason: string): RuntimeRuleEvaluationResult {
  return {
    ok: false,
    failure: {
      failureKind,
      input: { identityKind: 'domain-pack-runtime', value: 'domain-pack' },
      reason,
    },
  };
}

function isManifestRecord(value: unknown): value is { contents: unknown[] } {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && 'contents' in value;
}

function isContentRecord(value: unknown): value is { contentClass: unknown; authorityClaim?: unknown } {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && 'contentClass' in value;
}

function isSemanticIdentity(value: unknown): value is SemanticIdentity {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    'identityKind' in value &&
    'value' in value &&
    typeof value.identityKind === 'string' &&
    value.identityKind.length > 0 &&
    typeof value.value === 'string' &&
    value.value.length > 0
  );
}
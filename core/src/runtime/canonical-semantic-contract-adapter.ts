import type { SemanticIR, SemanticIdentity, SemanticScope } from '../compiler/semantic-ir.js';
import {
  sameSemanticScope,
  validateSemanticContract,
  validateSemanticContractReferences,
} from '../compiler/semantic-contract.js';
import type {
  RuntimeDirective,
  RuntimeEvaluationInput,
  RuntimeEvaluationResult,
  RuntimeFailure,
  RuntimeNoDirective,
  RuntimeSemanticEvidence,
} from './runtime-contract.js';
import type {
  RuntimeRuleEvaluation,
  RuntimeRuleEvaluationResult,
  RuntimeSemanticRules,
} from './runtime-semantics.js';

export interface SemanticIRResolver {
  resolve(evidence: RuntimeSemanticEvidence): SemanticIR | RuntimeFailure;
}

export interface CanonicalSemanticContractAdapterOptions {
  contractIdentity: SemanticIdentity;
  contractVersion: string;
  scope: SemanticScope;
}

export function createCanonicalSemanticContractAdapter(
  resolver: SemanticIRResolver,
  options: CanonicalSemanticContractAdapterOptions,
): RuntimeSemanticRules {
  return {
    evaluate(input): RuntimeRuleEvaluationResult {
      const contractMatch = matchesConfiguredContract(input, options);
      if (!contractMatch)
        return invalidEvaluation(input, 'Runtime contract attribution is invalid');
      const resolved = resolver.resolve(input.semanticEvidence);
      if (isFailure(resolved)) return { ok: false, failure: resolved };
      if (!matchesEvidence(resolved, input.semanticEvidence))
        return invalidEvaluation(input, 'Resolved Semantic IR does not match semantic evidence');

      const contractValidation = validateSemanticContract(input.context.contract);
      if (!contractValidation.valid) return invalidEvaluation(input, contractValidation.reason);
      const referenceValidation = validateSemanticContractReferences(
        input.context.contract,
        resolved,
      );
      if (!referenceValidation.valid) return invalidEvaluation(input, referenceValidation.reason);

      const evaluation: RuntimeRuleEvaluation = {
        outcome: { outcomeKind: 'conformant', findings: [] },
        authorityBasis: input.authority.decisions,
      };
      return { ok: true, value: evaluation };
    },

    acceptEvaluation(evaluation): boolean {
      return (
        evaluation.attribution.contractIdentity.identityKind ===
          options.contractIdentity.identityKind &&
        evaluation.attribution.contractIdentity.value === options.contractIdentity.value &&
        evaluation.attribution.contractVersion === options.contractVersion &&
        sameSemanticScope(evaluation.attribution.scope, options.scope)
      );
    },

    produceDirective(evaluation): RuntimeDirective | RuntimeNoDirective {
      return {
        resultKind: 'noDirective',
        identity: {
          identityKind: 'runtime-no-directive',
          value: evaluation.identity.value,
        },
        attribution: evaluation.attribution,
      };
    },
  };
}

function matchesConfiguredContract(
  input: RuntimeEvaluationInput,
  options: CanonicalSemanticContractAdapterOptions,
): boolean {
  return (
    input.context.identity.identityKind === options.contractIdentity.identityKind &&
    input.context.identity.value === options.contractIdentity.value &&
    input.context.version === options.contractVersion &&
    sameSemanticScope(input.context.scope, options.scope)
  );
}

function matchesEvidence(ir: SemanticIR, evidence: RuntimeSemanticEvidence): boolean {
  return (
    ir.semanticIdentity.identityKind === evidence.ir.identity.identityKind &&
    ir.semanticIdentity.value === evidence.ir.identity.value &&
    sameSemanticScope(ir.semanticScope, evidence.scope)
  );
}

function invalidEvaluation(
  input: RuntimeEvaluationInput,
  reason: string,
): { ok: false; failure: RuntimeFailure } {
  return {
    ok: false,
    failure: {
      failureKind: 'invalid-input',
      input: input.semanticEvidence.identity,
      reason,
    },
  };
}

function isFailure(value: SemanticIR | RuntimeFailure): value is RuntimeFailure {
  return 'failureKind' in value;
}

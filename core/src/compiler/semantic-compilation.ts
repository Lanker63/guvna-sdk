import {
  validateSemanticIR,
  type LifecycleContext,
  type SemanticContractReference,
  type SemanticIR,
} from './semantic-ir.js';
import {
  validateSemanticContract,
  validateSemanticContractReferences,
} from './semantic-contract.js';
import { createIdentity } from './ir-identity.js';
import { serializeCompactJson } from './ir-serializer.js';
import type { ProvenanceRecord, TransformationRef } from './semantic-ir.js';

export type SemanticCompilationResult =
  | { ok: true; contract: SemanticContractReference; provenance: ProvenanceRecord }
  | { ok: false; reason: string; stage: 'compilation' };

export function compileCandidateSemanticContract(source: unknown): SemanticCompilationResult {
  const validation = validateSemanticIR(source);
  if (!validation.valid) return { ok: false, reason: validation.reason, stage: 'compilation' };
  const ir = source as SemanticIR;
  const contracts = ir.contracts.filter((candidate) => candidate.contractKind === 'semantic');
  if (contracts.length === 0)
    return { ok: false, reason: 'Semantic Contract source is absent', stage: 'compilation' };
  if (contracts.length > 1)
    return { ok: false, reason: 'Semantic Contract source is ambiguous', stage: 'compilation' };
  const contract = contracts[0];
  const contractValidation = validateSemanticContractReferences(contract, ir);
  if (!contractValidation.valid)
    return { ok: false, reason: contractValidation.reason, stage: 'compilation' };
  const candidate = candidateContract(contract);
  const candidateValidation = validateSemanticContract(candidate);
  if (!candidateValidation.valid)
    return { ok: false, reason: candidateValidation.reason, stage: 'compilation' };
  const provenance = compilationProvenance(ir, contract, candidate);
  if (!provenance.ok) return provenance;
  return { ok: true, contract: candidate, provenance: provenance.value };
}

function compilationProvenance(
  ir: SemanticIR,
  source: SemanticContractReference,
  candidate: SemanticContractReference,
): { ok: true; value: ProvenanceRecord } | { ok: false; reason: string; stage: 'compilation' } {
  const transformationContent = {
    kind: 'compile',
    sourceIdentity: source.identity,
    sourceVersion: source.version.value,
    outputIdentity: candidate.identity,
  };
  const serialized = serializeCompactJson(transformationContent);
  if (!serialized.ok) return { ok: false, reason: serialized.reason, stage: 'compilation' };
  const transformationIdentity = createIdentity({
    identityKind: 'semantic',
    bytes: serialized.bytes,
  });
  if (!transformationIdentity.ok)
    return { ok: false, reason: transformationIdentity.reason, stage: 'compilation' };
  const transformation: TransformationRef = {
    identity: transformationIdentity.identity,
    kind: 'compile',
    inputs: [{ identity: source.identity }],
    outputs: [{ identity: candidate.identity }],
  };
  return {
    ok: true,
    value: {
      identity: transformationIdentity.identity,
      subject: { identity: candidate.identity },
      sources: [...source.provenance, ...ir.provenance.records.flatMap((record) => record.sources)],
      transformations: [transformation],
    },
  };
}

function candidateContract(contract: SemanticContractReference): SemanticContractReference {
  const lifecycle: LifecycleContext = {
    lifecycleState: { identity: { identityKind: 'lifecycle', value: 'candidate' } },
    transitions: contract.lifecycle.transitions,
  };
  return {
    ...contract,
    lifecycle,
    applicability: {
      ...contract.applicability,
      applicable: 'indeterminate',
      authorityDecision: undefined,
    },
    ratification: { ...contract.ratification, ratified: false, authorityDecision: undefined },
  };
}

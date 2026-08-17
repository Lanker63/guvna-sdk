import { validateSemanticContract } from "./semantic-contract.js";
import { evaluateLifecycle } from "./contract-lifecycle.js";
import { validateSemanticIR, type ProvenanceRecord, type SemanticContractReference, type SemanticIR, type TransformationRef } from "./semantic-ir.js";
import { compileCandidateSemanticContract, type SemanticCompilationResult } from "./semantic-compilation.js";
import { createIdentity } from "./ir-identity.js";
import { serializeCompactJson } from "./ir-serializer.js";

export type SemanticValidationResult =
  | { valid: true; contract: SemanticContractReference; evidence: SemanticValidationEvidence }
  | { valid: false; reason: string; stage: "validation" };

export interface SemanticValidationEvidence {
  subjectIdentity: SemanticContractReference["identity"];
  sourceIdentity: SemanticContractReference["identity"];
  sourceVersion: string;
  result: "conformant";
  provenance: ProvenanceRecord;
}

export type CompileAndValidateResult =
  | { ok: true; contract: SemanticContractReference; evidence: SemanticValidationEvidence }
  | { ok: false; reason: string; stage: "compilation" | "validation" };

export function compileAndValidateCandidateSemanticContract(source: unknown): CompileAndValidateResult {
  const compilation: SemanticCompilationResult = compileCandidateSemanticContract(source);
  if (!compilation.ok) return compilation;
  const validation = validateCandidateSemanticContract(compilation.contract, source);
  if (!validation.valid) return { ok: false, reason: validation.reason, stage: "validation" };
  return { ok: true, contract: validation.contract, evidence: validation.evidence };
}

export function validateCandidateSemanticContract(
  candidate: unknown,
  governingSource: unknown,
): SemanticValidationResult {
  const candidateValidation = validateCandidate(candidate);
  if (!candidateValidation.valid) return candidateValidation;

  const sourceValidation = validateGoverningSource(governingSource);
  if (!sourceValidation.valid) return sourceValidation;

  const source = sourceValidation.source;
  const governingContract = sourceValidation.contract;
  if (!sameContractMeaning(candidateValidation.contract, governingContract)) {
    return invalid("Candidate Semantic Contract is not semantically conformant to governing source");
  }
  const lifecycle = evaluateLifecycle({
    state: "candidate",
    operation: "validate",
    contractIdentity: candidateValidation.contract.identity.value,
    contractVersion: candidateValidation.contract.version.value,
    scope: candidateValidation.contract.applicability.scope.identity.value,
    provenance: candidateValidation.contract.provenance,
    guards: {
      structuralAndSemanticValidation: true,
      completeProvenance: candidateValidation.contract.provenance.length > 0,
      noBlockingGap: source.authorityContext.uncertainty.length === 0,
    },
  });
  if (!lifecycle.permitted) return invalid(`Candidate Semantic Contract is not eligible for validation: ${lifecycle.reason}`);

  const validatedContract: SemanticContractReference = {
    ...candidateValidation.contract,
    lifecycle: {
      ...candidateValidation.contract.lifecycle,
      lifecycleState: { identity: { identityKind: "lifecycle", value: "validated" } },
    },
  };
  const evidence = validationEvidence(validatedContract, governingContract);
  if (!evidence.ok) return invalid(evidence.reason);
  return {
    valid: true,
    contract: validatedContract,
    evidence: evidence.value,
  };
}

function validationEvidence(
  candidate: SemanticContractReference,
  source: SemanticContractReference,
): { ok: true; value: SemanticValidationEvidence } | { ok: false; reason: string } {
  const content = {
    kind: "validate",
    sourceIdentity: source.identity,
    sourceVersion: source.version.value,
    subjectIdentity: candidate.identity,
    result: "conformant",
  };
  const serialized = serializeCompactJson(content);
  if (!serialized.ok) return serialized;
  const validationIdentity = createIdentity({ identityKind: "semantic", bytes: serialized.bytes });
  if (!validationIdentity.ok) return validationIdentity;
  const transformation: TransformationRef = {
    identity: validationIdentity.identity,
    kind: "resolve",
    inputs: [{ identity: source.identity }, { identity: candidate.identity }],
    outputs: [{ identity: candidate.identity }],
  };
  const provenance: ProvenanceRecord = {
    identity: validationIdentity.identity,
    subject: { identity: candidate.identity },
    sources: [...source.provenance, ...candidate.provenance],
    transformations: [transformation],
  };
  return {
    ok: true,
    value: {
      subjectIdentity: candidate.identity,
      sourceIdentity: source.identity,
      sourceVersion: source.version.value,
      result: "conformant",
      provenance,
    },
  };
}

function validateCandidate(value: unknown):
  | { valid: true; contract: SemanticContractReference }
  | { valid: false; reason: string; stage: "validation" } {
  const validation = validateSemanticContract(value);
  if (!validation.valid) return invalid(validation.reason);
  const contract = value as SemanticContractReference;
  if (contract.lifecycle.lifecycleState.identity.value !== "candidate") {
    return invalid("Candidate Semantic Contract lifecycle state is invalid");
  }
  if (contract.applicability.applicable !== "indeterminate" || contract.ratification.ratified) {
    return invalid("Candidate Semantic Contract has an invalid governance state");
  }
  return { valid: true, contract };
}

function validateGoverningSource(value: unknown):
  | { valid: true; contract: SemanticContractReference; source: SemanticIR }
  | { valid: false; reason: string; stage: "validation" } {
  if (!isRecord(value)) return invalid("Governing Semantic Contract source is insufficient");
  const suppliedContracts = Array.isArray(value.contracts)
    ? value.contracts.filter((contract): contract is SemanticContractReference =>
      isRecord(contract) && contract.contractKind === "semantic",
    )
    : [];
  if (suppliedContracts.length === 0) return invalid("Governing Semantic Contract source is absent");
  if (suppliedContracts.length > 1) return invalid("Governing Semantic Contract source is ambiguous");

  const sourceValidation = validateSemanticIR(value);
  if (!sourceValidation.valid) return invalid(`Governing Semantic Contract source is insufficient: ${sourceValidation.reason}`);
  const source = value as unknown as SemanticIR;
  const contract = suppliedContracts[0];
  const validation = validateSemanticContract(contract);
  if (!validation.valid) return invalid(validation.reason);
  if (source.authorityContext.contradictions.length > 0) {
    return invalid("Governing Semantic Contract authority is contradictory");
  }
  if (source.provenance.conflicts.length > 0) {
    return invalid("Governing Semantic Contract provenance is conflicting");
  }
  if (!hasSufficientAuthority(source, contract)) {
    return invalid("Governing Semantic Contract authority is insufficient");
  }
  return { valid: true, contract, source };
}

function hasSufficientAuthority(source: SemanticIR, contract: SemanticContractReference): boolean {
  const acceptance = source.authorityContext.acceptances.find((record) =>
    sameIdentity(record.subject.identity, contract.identity) &&
    sameScope(record.scope, contract.applicability.scope),
  );
  if (!acceptance) return false;
  const decision = source.authorityContext.authorityDecisions.find((candidate) =>
    sameIdentity(candidate.identity, acceptance.authorityDecision.identity),
  );
  return Boolean(
    decision &&
    decision.decision === "accept" &&
    sameIdentity(decision.subject.identity, contract.identity) &&
    sameScope(decision.scope, contract.applicability.scope) &&
    sameIdentity(decision.subjectContractIdentity, contract.identity) &&
    decision.subjectContractVersion === contract.version.value &&
    contract.ratification.ratified === false &&
    contract.ratification.authorityDecision === undefined,
  );
}

function sameContractMeaning(left: SemanticContractReference, right: SemanticContractReference): boolean {
  return left.contractKind === right.contractKind &&
    sameIdentity(left.identity, right.identity) &&
    left.version.value === right.version.value &&
    JSON.stringify(left.elements) === JSON.stringify(right.elements) &&
    JSON.stringify(left.lifecycle.transitions) === JSON.stringify(right.lifecycle.transitions) &&
    sameScope(left.version.scope, right.version.scope) &&
    sameScope(left.applicability.scope, right.applicability.scope) &&
    JSON.stringify(left.applicability.conditions) === JSON.stringify(right.applicability.conditions) &&
    JSON.stringify(left.provenance) === JSON.stringify(right.provenance);
}

function sameScope(left: SemanticContractReference["version"]["scope"], right: SemanticContractReference["version"]["scope"]): boolean {
  return sameIdentity(left.identity, right.identity) &&
    left.meaning.statement === right.meaning.statement &&
    left.meaning.terms.length === right.meaning.terms.length &&
    left.meaning.terms.every((term, index) => sameIdentity(term.identity, right.meaning.terms[index].identity));
}

function sameIdentity(left: { identityKind: string; value: string }, right: { identityKind: string; value: string }): boolean {
  return left.identityKind === right.identityKind && left.value === right.value;
}

function invalid(reason: string): { valid: false; reason: string; stage: "validation" } {
  return { valid: false, reason, stage: "validation" };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

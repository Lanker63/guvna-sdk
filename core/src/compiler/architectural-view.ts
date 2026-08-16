import { validateSemanticIR, type SemanticIR, type SemanticIRValidationResult } from "./semantic-ir.js";

export interface BoundedArchitecturalView {
  readonly semanticIdentity: SemanticIR["semanticIdentity"];
  readonly semanticVersion: SemanticIR["semanticVersion"];
  readonly semanticScope: SemanticIR["semanticScope"];
  readonly meaning: SemanticIR["meaning"];
  readonly concepts: SemanticIR["concepts"];
  readonly relationships: SemanticIR["relationships"];
  readonly constraints: SemanticIR["constraints"];
  readonly transitions: SemanticIR["transitions"];
  readonly derivations: SemanticIR["derivations"];
  readonly contracts: SemanticIR["contracts"];
  readonly realizations: SemanticIR["realizations"];
  readonly authorityContext: SemanticIR["authorityContext"];
  readonly provenance: SemanticIR["provenance"];
  readonly compatibility: SemanticIR["compatibility"];
}

export type ArchitecturalViewResult =
  | { ok: true; view: BoundedArchitecturalView }
  | { ok: false; reason: string; validation: SemanticIRValidationResult };

export type ArchitecturalViewValidationResult = { ok: true } | { ok: false; reason: string };

function collectArchitecturalIdentities(view: BoundedArchitecturalView): Set<string> {
  return new Set([
    view.semanticIdentity.value,
    view.semanticScope.identity.value,
    ...view.concepts.map((concept) => concept.identity.value),
    ...view.relationships.map((relationship) => relationship.identity.value),
    ...view.constraints.map((constraint) => constraint.identity.value),
    ...view.transitions.map((transition) => transition.identity.value),
    ...view.derivations.map((derivation) => derivation.identity.value),
    ...view.contracts.map((contract) => contract.identity.value),
    ...view.realizations.map((realization) => realization.identity.value),
    ...view.authorityContext.authorityDecisions.map((decision) => decision.identity.value),
    ...view.authorityContext.acceptances.map((acceptance) => acceptance.identity.value),
    ...view.authorityContext.uncertainty.map((uncertainty) => uncertainty.identity.value),
    ...view.authorityContext.contradictions.map((contradiction) => contradiction.identity.value),
    ...view.authorityContext.delegations.map((delegation) => delegation.identity.value),
    ...view.provenance.records.map((record) => record.identity.value),
    ...view.provenance.conflicts.map((conflict) => conflict.identity.value),
    ...view.compatibility.map((requirement) => requirement.identity.value),
    ...view.contracts.flatMap((contract) => [contract.version.semanticIdentity.identity.value, contract.version.scope.identity.value, contract.applicability.scope.identity.value, ...(contract.applicability.authorityDecision ? [contract.applicability.authorityDecision.identity.value] : []), ...(contract.ratification.authorityDecision ? [contract.ratification.authorityDecision.identity.value] : [])]),
    ...view.authorityContext.authorityDecisions.flatMap((decision) => [decision.authorityIdentity.identity.value, decision.authorityIdentity.principal.identity.value, decision.subjectContractIdentity.value, decision.scope.identity.value]),
    ...view.authorityContext.acceptances.flatMap((acceptance) => [acceptance.scope.identity.value]),
    ...view.authorityContext.delegations.flatMap((delegation) => [delegation.delegator.identity.value, delegation.delegator.principal.identity.value, delegation.delegate.identity.value, delegation.delegate.principal.identity.value, delegation.delegatedAuthorityIdentity.identity.value, delegation.delegatedAuthorityIdentity.principal.identity.value, delegation.scope.identity.value]),
  ]);
}

function collectProvenanceSources(view: BoundedArchitecturalView): string[] {
  return [
    ...view.concepts.flatMap((concept) => concept.provenance),
    ...view.relationships.flatMap((relationship) => relationship.provenance),
    ...view.constraints.flatMap((constraint) => constraint.provenance),
    ...view.transitions.flatMap((transition) => transition.provenance),
    ...view.derivations.flatMap((derivation) => derivation.provenance),
    ...view.contracts.flatMap((contract) => contract.provenance),
    ...view.realizations.flatMap((realization) => realization.provenance),
    ...view.realizations.flatMap((realization) => realization.compatibility.provenance),
    ...view.authorityContext.authorityDecisions.flatMap((decision) => decision.provenance),
    ...view.authorityContext.acceptances.flatMap((acceptance) => acceptance.provenance),
    ...view.authorityContext.uncertainty.flatMap((uncertainty) => uncertainty.provenance),
    ...view.authorityContext.contradictions.flatMap((contradiction) => contradiction.provenance),
    ...view.authorityContext.delegations.flatMap((delegation) => delegation.provenance),
    ...view.provenance.records.flatMap((record) => [...record.sources, ...record.transformations.flatMap((transformation) => transformation.inputs.concat(transformation.outputs).map((reference) => ({ sourceIdentity: reference.identity })))]),
    ...view.provenance.conflicts.flatMap((conflict) => conflict.sources),
  ].map((provenance) => provenance.sourceIdentity.value);
}

export function createBoundedArchitecturalView(ir: unknown): ArchitecturalViewResult {
  const validation = validateSemanticIR(ir);
  if (!validation.valid) return { ok: false, reason: validation.reason, validation };

  const semanticIR = ir as SemanticIR;
  const view = {
    semanticIdentity: semanticIR.semanticIdentity,
    semanticVersion: semanticIR.semanticVersion,
    semanticScope: semanticIR.semanticScope,
    meaning: semanticIR.meaning,
    concepts: semanticIR.concepts,
    relationships: semanticIR.relationships,
    constraints: semanticIR.constraints,
    transitions: semanticIR.transitions,
    derivations: semanticIR.derivations,
    contracts: semanticIR.contracts,
    realizations: semanticIR.realizations,
    authorityContext: semanticIR.authorityContext,
    provenance: semanticIR.provenance,
    compatibility: semanticIR.compatibility,
  } satisfies BoundedArchitecturalView;
  const viewValidation = validateBoundedArchitecturalView(view);
  if (!viewValidation.ok) return { ok: false, reason: viewValidation.reason, validation };
  return {
    ok: true,
    view,
  };
}

export function validateBoundedArchitecturalView(view: BoundedArchitecturalView): ArchitecturalViewValidationResult {
  const identities = collectArchitecturalIdentities(view);
  if (collectProvenanceSources(view).some((sourceIdentity) => !identities.has(sourceIdentity))) return { ok: false, reason: "Architectural view provenance references an unknown IR identity" };
  const references = [
    ...view.relationships.flatMap((relationship) => [relationship.subject, relationship.predicate, relationship.object, ...relationship.constraints]),
    ...view.constraints.map((constraint) => constraint.subject),
    ...view.transitions.flatMap((transition) => [transition.from, transition.operation, transition.to, transition.authorityReference]),
    ...view.realizations.flatMap((realization) => realization.compatibility.requirements),
    ...view.compatibility.flatMap((requirement) => [requirement.subject, ...(requirement.consumer ? [requirement.consumer] : []), ...(requirement.contract ? [requirement.contract] : []), ...(requirement.dependency ? [requirement.dependency] : [])]),
    ...view.authorityContext.authorityDecisions.flatMap((decision) => [decision.authorityIdentity.identity, decision.authorityIdentity.principal, decision.subject, decision.scope.identity, decision.subjectContractIdentity]),
    ...view.authorityContext.acceptances.flatMap((acceptance) => [acceptance.subject, acceptance.scope.identity, acceptance.authorityDecision]),
    ...view.authorityContext.uncertainty.map((uncertainty) => uncertainty.subject),
    ...view.authorityContext.contradictions.flatMap((contradiction) => [...contradiction.claims, contradiction.scope.identity]),
    ...view.authorityContext.delegations.flatMap((delegation) => [delegation.delegator.identity, delegation.delegator.principal, delegation.delegate.identity, delegation.delegate.principal, delegation.delegatedAuthorityIdentity.identity, delegation.delegatedAuthorityIdentity.principal, delegation.scope.identity, delegation.governingAuthority]),
    ...view.provenance.records.flatMap((record) => [record.subject, ...(record.authorityDecision ? [record.authorityDecision] : [])]),
    ...view.provenance.conflicts.flatMap((conflict) => [...conflict.sources.map((source) => source.sourceIdentity), ...(conflict.resolution ? [conflict.resolution] : [])]),
  ];
  if (references.some((reference) => !identities.has("identity" in reference ? reference.identity.value : reference.value))) return { ok: false, reason: "Architectural view references an unknown IR identity" };
  for (const derivation of view.derivations) {
    if (!identities.has(derivation.result.identity.value) || derivation.sources.some((source) => !identities.has(source.identity.value))) {
      return { ok: false, reason: "Architectural derivation references an unknown IR identity" };
    }
  }
  for (const realization of view.realizations) {
    if (!identities.has(realization.realizes.identity.value) || realization.conformsTo.some((contract) => !identities.has(contract.identity.value))) {
      return { ok: false, reason: "Architectural realization references an unknown IR identity" };
    }
  }
  return { ok: true };
}
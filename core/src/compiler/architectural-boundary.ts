import type { BoundedArchitecturalView } from './architectural-view.js';
import type { SemanticIdentity } from './semantic-ir.js';
import {
  validateCanonicalModel,
  type CanonicalConceptName,
  type CanonicalModel,
  type SourceAttribution,
} from './canonical-model.js';
import { architecturalModel, validateArchitecturalModel } from './architectural-model.js';

export const architecturalLayers = [
  'doctrine',
  'canonical',
  'architectural',
  'contract',
  'compilation',
  'candidate',
  'validation',
  'ratification',
  'applicable',
  'realization',
] as const;
export type ArchitecturalLayer = (typeof architecturalLayers)[number];
export const repositoryProjectionLayers = [
  'repository',
  'accepted-knowledge',
  'understanding',
  'governance',
  'projection-compilation',
  'governance-projection',
  'projection-contract',
  'runtime',
] as const;
export type RepositoryProjectionLayer = (typeof repositoryProjectionLayers)[number];
export type ArchitecturalPath = 'guvna' | 'repository';
export type SemanticOwner = 'guvna' | 'governed-repository' | 'runtime' | 'sdk' | 'host';
export type ArchitecturalBindingLayer = ArchitecturalLayer | RepositoryProjectionLayer;
const layerOrder = new Map<ArchitecturalBindingLayer, number>([
  ...architecturalLayers.map((layer, index) => [layer, index] as const),
  ...repositoryProjectionLayers.map((layer, index) => [layer, index] as const),
]);

export interface ArchitecturalBinding {
  identity: SemanticIdentity;
  path: ArchitecturalPath;
  layer: ArchitecturalBindingLayer;
  owner: SemanticOwner;
  contentOwner: SemanticOwner;
  provenance: readonly {
    sourceIdentity: SemanticIdentity;
    sourcePath?: string;
    sourceSection?: string;
  }[];
}

export interface ArchitecturalBoundaryInput {
  view: BoundedArchitecturalView;
  bindings: readonly ArchitecturalBinding[];
  canonicalModel: CanonicalModel;
  contractBoundary?: ArchitecturalContractBoundaryBinding;
}

export interface ArchitecturalContractBoundaryBinding {
  projectionContract: SemanticIdentity;
  guvnaContract: SemanticIdentity;
  provenance: readonly {
    sourceIdentity: SemanticIdentity;
    sourcePath?: string;
    sourceSection?: string;
  }[];
}

export interface ArchitecturalDependency {
  source: CanonicalConceptName | ArchitecturalLayer | RepositoryProjectionLayer;
  target: CanonicalConceptName | ArchitecturalLayer | RepositoryProjectionLayer;
  sourceAttributions: readonly SourceAttribution[];
}

export const architecturalDependencies: readonly ArchitecturalDependency[] = [
  ['doctrine', 'canonical'],
  ['canonical', 'architectural'],
  ['architectural', 'contract'],
  ['contract', 'compilation'],
  ['compilation', 'candidate'],
  ['candidate', 'validation'],
  ['validation', 'ratification'],
  ['ratification', 'applicable'],
  ['applicable', 'realization'],
].map(([source, target]) => ({
  source: source as ArchitecturalLayer,
  target: target as ArchitecturalLayer,
  sourceAttributions: [
    {
      source: 'doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md',
      section: 'Architectural Dependency Principle',
    },
  ],
}));

export const repositoryProjectionDependencies: readonly ArchitecturalDependency[] = [
  ['repository', 'accepted-knowledge'],
  ['accepted-knowledge', 'understanding'],
  ['understanding', 'governance'],
  ['governance', 'projection-compilation'],
  ['projection-compilation', 'governance-projection'],
  ['governance-projection', 'projection-contract'],
  ['projection-contract', 'runtime'],
].map(([source, target]) => ({
  source: source as RepositoryProjectionLayer,
  target: target as RepositoryProjectionLayer,
  sourceAttributions: [
    {
      source: 'doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md',
      section: 'Architectural Dependency Principle',
    },
  ],
}));

export type ArchitecturalBoundaryValidationResult = { ok: true } | { ok: false; reason: string };

export function validateArchitecturalDependencyProjection(): ArchitecturalBoundaryValidationResult {
  if (architecturalDependencies.length !== architecturalLayers.length - 1)
    return { ok: false, reason: 'Architectural dependency projection is incomplete' };
  for (const [index, dependency] of architecturalDependencies.entries()) {
    if (
      dependency.source !== architecturalLayers[index] ||
      dependency.target !== architecturalLayers[index + 1] ||
      dependency.sourceAttributions.length === 0 ||
      dependency.sourceAttributions.some(
        (attribution) => attribution.source.length === 0 || attribution.section?.length === 0,
      )
    )
      return { ok: false, reason: 'Architectural dependency projection is invalid' };
  }
  if (repositoryProjectionDependencies.length !== repositoryProjectionLayers.length - 1)
    return { ok: false, reason: 'Repository projection dependency projection is incomplete' };
  for (const [index, dependency] of repositoryProjectionDependencies.entries()) {
    if (
      dependency.source !== repositoryProjectionLayers[index] ||
      dependency.target !== repositoryProjectionLayers[index + 1] ||
      dependency.sourceAttributions.length === 0 ||
      dependency.sourceAttributions.some(
        (attribution) => attribution.source.length === 0 || attribution.section?.length === 0,
      )
    )
      return { ok: false, reason: 'Repository projection dependency projection is invalid' };
  }
  return { ok: true };
}

export type ValidatedArchitecturalBoundary =
  { ok: true; input: ArchitecturalBoundaryInput } | { ok: false; reason: string };

export function createValidatedArchitecturalBoundary(
  input: ArchitecturalBoundaryInput,
): ValidatedArchitecturalBoundary {
  const validation = validateArchitecturalBoundary(input);
  return validation.ok ? { ok: true, input } : validation;
}

export function validateArchitecturalBoundary(
  input: ArchitecturalBoundaryInput,
): ArchitecturalBoundaryValidationResult {
  const canonicalValidation = validateCanonicalModel(input.canonicalModel);
  if (!canonicalValidation.ok)
    return { ok: false, reason: `Canonical model is invalid: ${canonicalValidation.reason}` };
  const dependencyValidation = validateArchitecturalDependencyProjection();
  if (!dependencyValidation.ok) return dependencyValidation;
  const modelValidation = validateArchitecturalModel(architecturalModel, architecturalDependencies);
  if (!modelValidation.ok) return modelValidation;
  const identities = new Map<string, SemanticIdentity>();
  for (const identity of [
    input.view.semanticIdentity,
    input.view.semanticScope.identity,
    ...input.view.concepts.map((concept) => concept.identity),
    ...input.view.relationships.map((relationship) => relationship.identity),
    ...input.view.constraints.map((constraint) => constraint.identity),
    ...input.view.transitions.map((transition) => transition.identity),
    ...input.view.derivations.map((derivation) => derivation.identity),
    ...input.view.contracts.map((contract) => contract.identity),
    ...input.view.realizations.map((realization) => realization.identity),
    ...input.view.authorityContext.authorityDecisions.map((decision) => decision.identity),
    ...input.view.authorityContext.acceptances.map((acceptance) => acceptance.identity),
    ...input.view.authorityContext.uncertainty.map((uncertainty) => uncertainty.identity),
    ...input.view.authorityContext.contradictions.map((contradiction) => contradiction.identity),
    ...input.view.authorityContext.delegations.map((delegation) => delegation.identity),
    ...input.view.provenance.records.map((record) => record.identity),
    ...input.view.provenance.conflicts.map((conflict) => conflict.identity),
    ...input.view.compatibility.map((requirement) => requirement.identity),
  ])
    identities.set(identity.value, identity);
  const bindings = new Map<string, ArchitecturalBinding>();
  for (const binding of input.bindings) {
    if (
      !identities.has(binding.identity.value) ||
      bindings.has(binding.identity.value) ||
      binding.provenance.length === 0
    )
      return { ok: false, reason: 'Architectural binding is unknown, duplicated, or unattributed' };
    const expectedLayers =
      binding.path === 'guvna' ? architecturalLayers : repositoryProjectionLayers;
    if (!expectedLayers.includes(binding.layer as never))
      return { ok: false, reason: 'Architectural binding crosses semantic paths' };
    if (binding.path === 'guvna' && binding.layer !== 'realization' && binding.owner !== 'guvna')
      return { ok: false, reason: 'Guvna semantic meaning must be Guvna-owned' };
    if (
      binding.path === 'repository' &&
      binding.layer !== 'runtime' &&
      binding.owner !== 'governed-repository'
    )
      return {
        ok: false,
        reason: 'Repository projection meaning must be Governed Repository-owned',
      };
    if (binding.layer === 'runtime' && binding.owner !== 'guvna' && binding.owner !== 'runtime')
      return { ok: false, reason: 'Runtime semantics must remain Guvna-owned or Runtime-realized' };
    if (
      binding.layer !== 'realization' &&
      binding.layer !== 'runtime' &&
      binding.contentOwner !== binding.owner
    )
      return { ok: false, reason: 'Architectural content ownership must match semantic ownership' };
    if (binding.provenance.some((provenance) => !identities.has(provenance.sourceIdentity.value)))
      return { ok: false, reason: 'Architectural binding provenance is unresolved' };
    bindings.set(binding.identity.value, binding);
  }
  if (bindings.size !== identities.size)
    return { ok: false, reason: 'Architectural binding is missing' };
  const projectionContractBindings = [...bindings.values()].filter(
    (binding) => binding.path === 'repository' && binding.layer === 'projection-contract',
  );
  if (projectionContractBindings.length > 0) {
    const boundary = input.contractBoundary;
    const projectionBinding = boundary && bindings.get(boundary.projectionContract.value);
    const contractBinding = boundary && bindings.get(boundary.guvnaContract.value);
    if (
      !boundary ||
      !projectionBinding ||
      !contractBinding ||
      projectionBinding.path !== 'repository' ||
      projectionBinding.layer !== 'projection-contract' ||
      contractBinding.path !== 'guvna' ||
      contractBinding.layer !== 'contract' ||
      contractBinding.owner !== 'guvna' ||
      contractBinding.contentOwner !== 'guvna' ||
      boundary.provenance.length === 0 ||
      boundary.provenance.some((provenance) => !identities.has(provenance.sourceIdentity.value))
    )
      return {
        ok: false,
        reason: 'Repository projection contract has no attributable Guvna contract boundary',
      };
  }
  for (const derivation of input.view.derivations) {
    const result = bindings.get(derivation.result.identity.value);
    if (
      !result ||
      derivation.sources.some((source) => {
        const sourceBinding = bindings.get(source.identity.value);
        return (
          !sourceBinding ||
          sourceBinding.path !== result.path ||
          (layerOrder.get(sourceBinding.layer) ?? -1) > (layerOrder.get(result.layer) ?? -1)
        );
      })
    )
      return { ok: false, reason: 'Architectural dependency direction is invalid' };
  }
  for (const realization of input.view.realizations) {
    const realizationBinding = bindings.get(realization.identity.value);
    const sourceBinding = bindings.get(realization.realizes.identity.value);
    const contracts = input.view.contracts.filter((contract) =>
      realization.conformsTo.some(
        (reference) => reference.identity.value === contract.identity.value,
      ),
    );
    if (
      !realizationBinding ||
      !sourceBinding ||
      realizationBinding.layer !==
        (realizationBinding.path === 'guvna' ? 'realization' : 'runtime') ||
      sourceBinding.layer === realizationBinding.layer
    )
      return { ok: false, reason: 'Realization boundary is invalid' };
    const expectedOwner =
      realization.realizationKind === 'runtime'
        ? 'runtime'
        : realization.realizationKind === 'sdk'
          ? 'guvna'
          : realization.realizationKind === 'host'
            ? 'host'
            : 'governed-repository';
    if (realizationBinding.owner !== expectedOwner)
      return { ok: false, reason: 'Realization owner does not match realization kind' };
    const expectedContentOwner = realization.realizationKind === 'sdk' ? 'sdk' : expectedOwner;
    if (realizationBinding.contentOwner !== expectedContentOwner)
      return { ok: false, reason: 'Realization content ownership does not match realization kind' };
    if (
      contracts.some((contract) => {
        const decisions = input.view.authorityContext.authorityDecisions;
        if (
          contract.ratification.ratified &&
          !hasAuthorityDecision(
            decisions,
            contract.ratification.authorityDecision?.identity.value,
            'ratify',
            contract,
          )
        )
          return true;
        if (contract.applicability.applicable !== true) return false;
        if (
          !hasAuthorityDecision(
            decisions,
            contract.applicability.authorityDecision?.identity.value,
            'apply',
            contract,
          )
        )
          return true;
        const applicabilityDecision = decisions.find(
          (decision) =>
            decision.identity.value === contract.applicability.authorityDecision?.identity.value,
        );
        const ratificationDecision = decisions.find(
          (decision) =>
            decision.identity.value === contract.ratification.authorityDecision?.identity.value,
        );
        return (
          !applicabilityDecision ||
          !ratificationDecision ||
          applicabilityDecision.scope.identity.value !==
            contract.applicability.scope.identity.value ||
          ratificationDecision.scope.identity.value !== contract.applicability.scope.identity.value
        );
      })
    )
      return { ok: false, reason: 'Realization authority scope is not attributable' };
    if (
      contracts.length === 0 ||
      realization.compatibility.result !== 'compatible' ||
      contracts.some(
        (contract) => contract.applicability.applicable !== true || !contract.ratification.ratified,
      )
    )
      return { ok: false, reason: 'Realization contract applicability is invalid' };
  }
  return { ok: true };
}

function hasAuthorityDecision(
  decisions: readonly BoundedArchitecturalView['authorityContext']['authorityDecisions'][number][],
  identity: string | undefined,
  expectedDecision: 'ratify' | 'apply',
  contract: BoundedArchitecturalView['contracts'][number],
): boolean {
  const decision = decisions.find((candidate) => candidate.identity.value === identity);
  return Boolean(
    decision &&
    decision.decision === expectedDecision &&
    decision.subjectContractIdentity.value === contract.identity.value &&
    decision.subjectContractVersion === contract.version.value &&
    decision.scope.identity.value === contract.applicability.scope.identity.value,
  );
}

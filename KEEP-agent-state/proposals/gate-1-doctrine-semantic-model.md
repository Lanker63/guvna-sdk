# Gate 1 Doctrine Semantic Model Proposal

**Phase:** 1 - Define the Doctrine Semantic Model
**Authority gate:** Gate 1 - Semantic Model Authority Gate
**State:** REVIEW
**Semantic source:** `doctrine/core/**`
**Excluded:** `doctrine/agentic/**` (process guidance only)

## Intended action

Approve a candidate, provenance-aware conceptual model for later semantic compilation. This proposal does not create a core TypeScript artifact, Semantic IR, Candidate Contract, or realization. It does not ratify meaning.

## Candidate model

The following is a semantic design sketch, not an implementation authorization:

```ts
interface DoctrineModel {
  sourceScope: "doctrine/core/**";
  concepts: ConceptDefinition[];
  relationships: RelationshipDefinition[];
  invariants: InvariantDefinition[];
  ownership: OwnershipDefinition[];
  authorityBoundaries: AuthorityBoundaryDefinition[];
  provenanceRequirements: ProvenanceRequirement[];
  compatibilityRequirements: CompatibilityRequirement[];
  operations: OperationDefinition[];
  states: StateDefinition[];
  transitions: TransitionDefinition[];
  contracts: ContractDefinition[];
  derivations: DerivationDefinition[];
  semanticGaps: SemanticGap[];
}

interface ConceptDefinition {
  identity: string;
  meaning: string;
  source: DoctrineSourceRef[];
}

interface RelationshipDefinition {
  subject: string;
  predicate: string;
  object: string;
  source: DoctrineSourceRef[];
}

interface InvariantDefinition {
  identity: string;
  statement: string;
  source: DoctrineSourceRef[];
}

interface OwnershipDefinition {
  concern: string;
  semanticOwner: string;
  realizationBoundary: string;
  source: DoctrineSourceRef[];
}

interface AuthorityBoundaryDefinition {
  decision: string;
  authority: string;
  scope: string;
  delegation?: DelegationDefinition;
  prohibitedSubstitutes: string[];
  source: DoctrineSourceRef[];
}

interface DelegationDefinition {
  delegator: string;
  delegate: string;
  authorityIdentity: string;
  scope: string;
  capabilities: string[];
  conditions: string[];
  provenance: string[];
  source: DoctrineSourceRef[];
}

interface ProvenanceRequirement {
  subject: string;
  requiredLineage: string[];
  source: DoctrineSourceRef[];
}

interface CompatibilityRequirement {
  subject: string;
  requirement: string;
  source: DoctrineSourceRef[];
}

interface OperationDefinition {
  identity: string;
  meaning: string;
  source: DoctrineSourceRef[];
}

interface StateDefinition {
  identity: string;
  meaning: string;
  source: DoctrineSourceRef[];
}

interface TransitionDefinition {
  from: string;
  operation: string;
  to: string;
  authorityReference: string;
  source: DoctrineSourceRef[];
}

interface ContractDefinition {
  identity: string;
  lifecycleStates: string[];
  applicabilityRule: string;
  source: DoctrineSourceRef[];
}

interface DerivationDefinition {
  source: string;
  result: string;
  relation: string;
  sourceRefs: DoctrineSourceRef[];
}

interface DoctrineSourceRef {
  path: string;
  section: string;
}

interface SemanticGap {
  identity: string;
  missingMeaning: string;
  blockingImpact: string;
  requiredAuthority: string;
}
```

The field names are organizational labels for the candidate representation. They do not establish meaning beyond the doctrine-backed entries below.

## Doctrine-backed concepts and relationships

- Epistemic concepts: Repository Information, Evidence, Repository Intelligence, Repository Wisdom, Repository Authority, Authority Decision, Acceptance, Repository Truth, Repository Knowledge, Repository Understanding, Candidate Statements, Provenance, Uncertainty, Knowledge Manifestations, and Realizations. Source: `doctrine/core/constitution/EPISTEMIC-INVARIANTS.md`, `doctrine/core/canonical/REPOSITORY-INTELLIGENCE-MODEL.md`.
- Repository Understanding canonical core: Repository Identity, Domain, Mission, Vision, Operating Model, Authority Model, Governance Model, Knowledge System, Work System, and Success Model. Source: `doctrine/core/canonical/REPOSITORY-UNDERSTANDING-MODEL.md`.
- Architectural concepts: Governing Doctrine, Canonical Models, Architectural Doctrine, Semantic Contracts, Semantic Compilation, Contract Validation, Contract Ratification, Applicable Contracts, Projection Contracts, Runtime, SDK, Host, Governed Repository, Repository Projection Compilation, and Governance Projection. Source: `doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md`, `doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md`.
- Identity/lifecycle concepts: Semantic Identity, Semantic Version, Lifecycle State, Acceptance State, Provenance, Filesystem Realization, Compatibility, Migration, Supersession, and Retirement. Source: `doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md`.
- Adoption concepts and transitions: Authority Context, Repository Information, Evidence, Provisional Understanding, Candidate Statements, Authority Decision, Acceptance, Normalized Repository Knowledge, and Knowledge Projection. Source: `doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`.

The dependency direction is modeled with the Doctrine Semantic Model as the intermediate semantic boundary:

```text
Constitutional Doctrine -> Canonical Models -> Architectural Doctrine
-> Doctrine Semantic Model -> Semantic Compilation -> Candidate Contract
-> Validation -> Ratification -> Applicable Contract -> Realizations
```

The separate repository-owned path is modeled as:

```text
Governed Repository -> Accepted Repository Knowledge -> Repository Understanding
-> Repository Governance -> Projection Compilation -> Governance Projection
-> Runtime realization
```

The repository path does not directly derive Runtime semantics. The Governance Projection is consumed by a Runtime realization under the applicable Guvna contracts; Runtime remains downstream realization, not semantic authority.

## Explicit semantic gaps

These gaps block deterministic IR or contract compilation and are not resolved by this proposal:

1. Generic Semantic Model and Semantic IR schema.
2. Canonical serialization, ordering, normalization, and deterministic identity rules.
3. Complete schemas for concepts, authority decisions, acceptance records, provenance, uncertainty, and contradiction.
4. Complete lifecycle and acceptance transition matrices.
5. Semantic Version and compatibility algorithms.
6. Runtime/SDK dependency relationship: peer realizations versus Runtime-backed SDK.
7. Runtime Contract identity, lifecycle, applicability, and ratification relationship.
8. Projection compilation authority, validation, applicability, and stale/incompatible projection rejection.
9. Runtime's authoritative repository input boundary when repository artifacts disagree.
10. Conflict precedence among accepted doctrine sources.
11. Authority and delegation model: the complete schema for authority identity, delegator, delegate, scope, capabilities, conditions, and delegation provenance is not established. This blocks representing delegated agent authority without inventing semantics.

## Proposed file mutations

No files outside `.guvna/agent-state/` are proposed. No core realization files are proposed at this gate.

## Gate decision requested

Human approval or revision is requested for this candidate model scope and its provenance approach. Approval must not be interpreted as approval of Semantic IR, Candidate Contract, ratification, Runtime, SDK, projection, or publication work.

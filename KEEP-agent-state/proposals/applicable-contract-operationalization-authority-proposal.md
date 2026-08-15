# Applicable Contract Operationalization Authority Proposal

**State:** `APPROVED`
**Authority gate:** Post-applicability Applicable Contract Operationalization
**Subject:** Already-ratified and applicable Guvna Semantic Contract
**Purpose:** Request human designation of the persistent Applicable Contract reference, artifact location, artifact-creation authority, and any downstream realization scope.

## Existing Authoritative Contract State

This proposal does not modify or reopen the existing semantic or authority decisions.

- `identityKind`: `semantic-contract`
- Contract version: `1.0.0`
- Contract preimage SHA-256: `462e0f69750ec5379f2be64643032d0dd0d772faddb921843c23ae068c2e4439`
- Ratification decision: existing human Gate 5 `RATIFIED` decision recorded in `.guvna/agent-state/authority-ledger.yaml`
- Applicability decision identity: `applicability-20260815-001`
- Applicability decision authority: `human-authority-guvna-contract`
- Applicability result: `applicable`, produced by the corrected `determineApplicability` evaluator

Supporting evidence:

- `.guvna/agent-state/evidence/compiler/applicability-remediation-rerun-20260815-001.yaml`
- `.guvna/agent-state/evidence/post-applicability-process-reconciliation-2026-08-15.md`

The ratified Contract and applicability authority decision remain unchanged.

## Human Decisions Requested

Human authority is asked to provide explicit, attributable decisions for each item below.

### 1. Applicable Contract reference

Designate the authoritative reference that identifies the already-ratified and applicable Contract. The reference must bind to the existing Contract identity, version, ratification provenance, and applicability decision. No reference is inferred by this proposal.

Requested human input:

```yaml
applicableContractReference: "guvna-semantic-contract/1.0.0"
referenceAuthorityIdentity: human-authority-guvna-contract
referenceProvenance: human authority designation
```

### 2. Applicable Contract version

Confirm the Applicable Contract version as `1.0.0`. This proposal does not select or change a version. Any different value requires a separate human authority decision and must not be inferred from an artifact or path.

Requested human input:

```yaml
applicableContractVersion: "1.0.0"
versionAuthorityIdentity: human-authority-guvna-contract
versionProvenance: existing ratification decision
```

### 3. Approved workspace path

Designate the approved workspace path for the persistent Applicable Contract artifact. No path, package location, directory, filename, or persistence convention is proposed or inferred here.

Requested human input:

```yaml
applicableContractWorkspacePath: ".guvna/contracts/guvna-semantic-contract-1.0.0.yaml"
workspacePathAuthorityIdentity: human-authority-guvna-contract
workspacePathProvenance: human authority designation
```

### 4. Explicit artifact-creation authorization

Authorize or reject creation of the persistent Applicable Contract artifact at the human-designated path. Applicability alone is not artifact-creation authority.

Requested human input:

```yaml
createApplicableContractArtifact: true
artifactCreationAuthorityIdentity: human-authority-guvna-contract
artifactCreationProvenance: human authority designation
```

Any approved artifact creation must preserve the existing Contract identity, version, semantic content, ratification decision, applicability decision, and provenance exactly. It must not mutate or regenerate the Contract.

### 5. Explicit downstream realization scope

Authorize or reject each downstream realization independently. No Runtime, SDK, Projection, or Host scope is inferred from applicability.

Requested human input:

```yaml
runtimeRealizationScope: "Guvna runtime semantic-contract consumption"
sdkRealizationScope: null
projectionRealizationScope: null
hostRealizationScope: null
realizationAuthorityIdentity: human-authority-guvna-contract
realizationScopeProvenance: human authority designation
```

Any approved realization must identify its applicable contract dependency, exact mutation paths, required contract-specific obligations, verification requirements, and authority gate. Runtime and SDK remain independent realization boundaries.

## Preserved Exclusions

This review proposal does not authorize:

- modification or regeneration of the Candidate or ratified Contract;
- modification of the human applicability authority decision;
- creation of an Applicable Contract artifact before explicit approval and path designation;
- invention of a Contract reference, workspace path, persistence convention, or downstream scope;
- Runtime, SDK, Projection, or Host implementation;
- publication, generated-artifact mutation, or unrelated workspace changes;
- treating filesystem presence, process state, or downstream consumption as semantic or authority evidence.

## Required Human Authority Gate Outcome

Human authority should return one of:

- `APPROVED` with attributable values for the Contract reference, version confirmation, workspace path, artifact-creation authorization, and each requested realization scope;
- `REVISE` with explicit corrections;
- `REJECTED` with the reason and no mutation authority.

Until an `APPROVED` outcome is recorded, the authoritative Contract remains applicable in semantic state, but no persistent artifact is created or designated and no Runtime, SDK, Projection, or Host realization begins.

## Requested Decision

**APPROVED:** human authority designates and authorizes exactly the values
supplied above:

- Applicable Contract reference: `guvna-semantic-contract/1.0.0`
- Applicable Contract version: `1.0.0`
- Persistent artifact workspace path: `.guvna/contracts/guvna-semantic-contract-1.0.0.yaml`
- Artifact creation: authorized
- Runtime realization scope: `Guvna runtime semantic-contract consumption`
- SDK realization: not authorized
- Projection realization: not authorized
- Host realization: not authorized

This approval preserves the ratified Contract, Contract identity, Contract
version, ratification decision, applicability decision
`applicability-20260815-001`, and evaluator result `applicable`. It does not
authorize Contract mutation, Candidate regeneration, SDK/Projection/Host
realization, or any inferred scope expansion.

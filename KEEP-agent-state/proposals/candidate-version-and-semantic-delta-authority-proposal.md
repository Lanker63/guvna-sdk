# Candidate Version and Semantic Delta Authority Proposal

**Phase:** 4 - Unblock Candidate Semantic Contract Generation  
**Decision group:** 3 of 3 - Candidate version, predecessor, and semantic evolution  
**State:** APPROVED  
**Scope:** Candidate version-bearing subject, predecessor or initial-version decision, and Semantic Delta/versioning rules only

## Requested Human Decision

Approve or revise the narrowly scoped versioning rules below, and supply the authority decision required for the candidate's initial/predecessor status and concrete SemVer value. This proposal does not decide lifecycle, acceptance, compatibility predicates, ratification, applicability, persistence, or workspace location.

## Governing Sources

- [gate-2-semantic-ir-proposal.yaml](gate-2-semantic-ir-proposal.yaml): SemVer 2.0.0 syntax and precedence are approved; version precedence does not establish authority, applicability, supersession, or compatibility; compatibility remains explicit-requirement based.
- [CONCEPTUAL-ARCHITECTURE.md](../../doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md): a Semantic Contract receives a new semantic version only when its semantic boundary materially changes; documentation and implementation changes alone do not require a new version.
- [ARCHITECTURAL-INVARIANTS.md](../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md): semantic evolution requires an updated semantic source and attributable Semantic Delta; version dimensions remain distinct and version equality is not semantic equivalence.
- [SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md](../../doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md): Semantic Identity identifies the conceptual artifact, Semantic Version identifies its semantic form, and neither identity nor version establishes authority or applicability.
- [candidate-semantic-contract-generation-proposal.md](candidate-semantic-contract-generation-proposal.md): candidate identity must derive from approved semantic content; version must be justified relative to semantic evolution and an applicable predecessor when available; absent or ambiguous values block generation.
- [gate-4-authority-gap-report.md](../evidence/gate-4-authority-gap-report.md): the current Applicable Contract prerequisite has null reference/version/path and remains `BLOCKED/UNRESOLVED`.

## Already Established

The following rules are approved and are not reopened:

1. The version dimension is the **Guvna Semantic Contract Version**, distinct from Doctrine, Projection Contract, Runtime, SDK, Host, repository, and implementation versions.
2. SemVer 2.0.0 syntax and precedence apply; invalid syntax is a validation failure and build metadata does not affect precedence.
3. Version precedence cannot establish authority, acceptance, ratification, applicability, supersession, or compatibility.
4. A new Semantic Contract version requires a material semantic-boundary change.
5. Material changes include changed obligations, interpretation, states or transitions, invariants, authority requirements, provenance requirements, compatibility requirements, failure semantics, or other exposed contract meaning.
6. Documentation, formatting, compiler/generator mechanics, Runtime/SDK implementation, and other non-semantic changes do not by themselves require a new contract version.
7. Semantic evolution must preserve an attributable Semantic Delta; consumers must not infer evolution from implementation differences.
8. Semantic identity is derived from approved canonical semantic content and is independent of filesystem location, process state, timestamps, random values, generated names, and implementation behavior.
9. A version or identity does not establish applicability; the current Applicable Contract remains unavailable and cannot be invented.

## Proposed Version-Bearing Subject

The version-bearing subject is proposed to be:

```text
Guvna Semantic Contract
  semantic identity: identity of the compiled contract's conceptual meaning and role
  semantic version: version of that contract's semantic interpretation rules
  governed scope: scope explicitly established by approved semantic inputs
```

This excludes Runtime implementation versions, SDK versions, repository versions, projection versions, and generator versions. Those dimensions may be related in provenance but cannot supply or replace the Candidate Semantic Contract Version.

## Proposed Predecessor / Initial-Version Rule

The current evidence does not identify an attributable prior Applicable Semantic Contract. The proposal therefore presents this bounded decision:

```text
predecessor status: no attributable predecessor currently available
comparison status: INDETERMINATE, not inferred
candidate mode: initial/no-predecessor Candidate Semantic Contract
proposed initial version: 1.0.0
version authority: human-supplied approval required; not an inferred compiler value
```

This proposal explicitly treats the candidate as an initial/no-predecessor Candidate Semantic Contract. The proposed `1.0.0` value is an authority-supplied initial value for human approval; it is not a value the compiler may infer from process chronology, absence of a predecessor, filesystem state, or any implementation convention. This is not a claim that no predecessor exists. It records only that the current approved inputs do not identify an attributable one. If human authority identifies a predecessor instead, the authority decision must provide its semantic identity, semantic version, governed scope, applicable status, and provenance. A prior Candidate, Validated Contract, process-state record, implementation artifact, filesystem path, or generated output cannot be promoted to predecessor authority by inference.

For this initial candidate, no predecessor comparison is made and no compatibility claim is made. The absence of a predecessor is not classified as compatible, incompatible, or applicable.

## Proposed Candidate Version Rule

The candidate version must be the authority-supplied valid SemVer 2.0.0 value `1.0.0`, bound to the proposed Guvna Semantic Contract subject and governed semantic scope, if human authority approves this proposal.

The compiler may validate and preserve that value, but may not choose a numeric version from:

- process chronology;
- file or directory location;
- generator run count;
- implementation version;
- repository version;
- timestamps;
- generated names;
- or absent predecessor information.

The proposed `1.0.0` value is not established by the governing sources and must not be treated as compiler-derived. It becomes the candidate's version only through the explicit human approval requested by this proposal. If human authority declines the initial path and identifies an attributable predecessor instead, it must supply the predecessor and approve the target version justified by the Semantic Delta.

This is an authority input, not a request to ratify or apply the candidate.

## Proposed Semantic Delta Representation

For a predecessor-backed evolution, the Semantic Delta must preserve:

```text
SemanticDelta:
  priorSemanticIdentity
  targetSemanticIdentity
  priorSemanticVersion
  targetSemanticVersion
  governedScope
  changedMeaning
  changedObligations
  changedStatesAndTransitions
  changedInvariants
  changedAuthorityRequirements
  changedProvenanceRequirements
  changedCompatibilityRequirements
  changedFailureSemantics
  compatibilityImplications
  affectedRealizationObligations
  sourceProvenance
  authorityAttribution
```

Fields whose category did not change may be represented as explicitly unchanged only where the approved Semantic IR permits that representation; omission must not erase a material distinction. Every material change must link to accepted doctrine and approved Semantic Model/Semantic IR content. The delta must distinguish semantic changes from documentation, formatting, generator, Runtime, SDK, and other realization-only changes.

For the proposed initial/no-predecessor path, the Semantic Delta representation is explicitly:

```text
semanticDelta: not-applicable
prior: absent because no predecessor exists for this initial candidate
comparison: not-applicable; no predecessor comparison or compatibility claim is made
materialSemanticContent: linked to the approved semantic inputs
provenance: required for every material candidate field and transformation
```

`not-applicable` / absent is the complete initial-candidate Semantic Delta representation. It does not mean compatible, incompatible, superseded, ratified, or applicable. Provenance remains mandatory and must link the candidate's material semantic content and transformations to the accepted doctrine and approved Semantic Model/Semantic IR inputs.

The compiler must fail closed if a predecessor is required but unavailable, if the initial status is not explicitly authorized, if the target version is absent or invalid, or if the delta cannot attribute material changes.

## Proposed Version-Change Classification Rule

The following classification is proposed directly from the governing material-change rule:

- **No contract-version change:** documentation, formatting, compiler/generator mechanics, Runtime/SDK implementation, or other non-semantic realization change only.
- **Contract-version change required:** any material change to obligations, interpretation, states/transitions, invariants, authority requirements, provenance requirements, compatibility requirements, failure semantics, or other contract-exposed meaning.
- **Indeterminate:** the available semantic inputs cannot establish whether the boundary changed or cannot attribute the change to approved semantic sources.

This proposal does not assign major, minor, or patch increment semantics to categories because the identified governing sources do not provide those mappings. Human authority must approve any such mapping before it is used.

## Minimum Approval Needed to Unblock Gate 4

Human authority must approve or revise:

1. The Guvna Semantic Contract as the version-bearing subject.
2. The distinction among Guvna Semantic Contract Version and all other version dimensions.
3. Whether this candidate is explicitly an initial/no-predecessor candidate, or identify an attributable prior Applicable Semantic Contract.
4. The concrete valid SemVer 2.0.0 value `1.0.0` for the initial/no-predecessor candidate, or, if that path is rejected, the predecessor and target version pair.
5. The Semantic Delta fields and provenance obligations above for any predecessor-backed evolution.
6. The material-change versus non-semantic-change classification rule.
7. Whether any major/minor/patch increment mapping is authorized; absent approval, no increment mapping may be inferred.

Approval of this proposal would authorize these versioning inputs for later Candidate compilation. It would not authorize Candidate generation in this proposal, ratify a candidate, establish applicability, create a Contract artifact, designate a workspace path, or reopen lifecycle or compatibility decisions.

## Explicit Exclusions

- No lifecycle or acceptance vocabulary or transition decision.
- No compatibility requirement, predicate, result vocabulary, or comparison-scope decision.
- No reopening or alteration of approved Gate 2 decisions.
- No Candidate Semantic Contract generation.
- No Contract Ratification or applicability.
- No Contract artifact, persistence convention, or workspace path.

# Semantic Identity and Filesystem Realization

## Purpose

This document defines the canonical relationship between semantic identity and filesystem realization for Guvna-owned and Governed Repository-owned artifacts.

It establishes how authority-bearing and Runtime-consumable artifacts are:

- identified;
- referenced;
- versioned;
- discovered;
- resolved;
- relocated;
- superseded;
- and realized within a repository.

The fundamental principle is:

> **Semantic identity belongs to meaning. Filesystem location belongs to realization.**

Filesystem organization may provide convenient discovery and compatibility.

It SHALL NOT become the source of semantic identity or authority merely because an artifact occupies a particular path.

This doctrine is subordinate to the constitutional and canonical doctrine governing:

- Repository Authority;
- Repository Knowledge;
- Repository Understanding;
- Provenance;
- Acceptance;
- and semantic evolution.

---

# Canonical Principle

A semantic artifact has an identity independent of the filesystem representation through which it is stored.

The canonical relationship is:

```text
Semantic Identity
        │
        ▼
Accepted Meaning
        │
        ▼
Artifact
        │
        ▼
Filesystem Realization
```

The reverse relationship SHALL NOT be assumed:

```text
Filesystem Path
        ≠
Semantic Identity
```

A path may identify where an artifact is currently realized.

It does not, by itself, identify what the artifact means.

---

# Semantic Identity

Semantic Identity is the stable identity assigned to an artifact according to the meaning and semantic role the artifact represents.

A Semantic Identity SHALL be:

- semantic;
- stable;
- referenceable;
- unambiguous within its governing scope;
- independent of filesystem location;
- and suitable for provenance.

Semantic Identity SHOULD remain stable across:

- file rename;
- directory relocation;
- repository reorganization;
- migration;
- projection regeneration;
- and other non-semantic realization changes.

A semantic change MAY require a new semantic version or identity according to the applicable Semantic Contract.

For a Semantic Contract specifically, a new contract version SHALL be introduced only when the
contractual semantic boundary materially changes. Changes to documentation, implementation,
generation mechanics, serialization, or other non-semantic realization concerns SHALL NOT by
themselves create a new Semantic Contract version.

---

# Identity Is Not Authority

Semantic Identity establishes what an artifact represents.

It does not independently establish that the artifact is:

- accepted;
- current;
- authoritative;
- applicable;
- or valid.

The distinction is:

```text
Semantic Identity
        ≠
Acceptance
        ≠
Authority
        ≠
Current Applicability
```

An artifact may have a valid stable identity while being:

- provisional;
- rejected;
- superseded;
- historical;
- incompatible;
- or otherwise non-current.

---

# Identity Is Not Version

Semantic Identity identifies the conceptual artifact.

Semantic Version identifies the accepted semantic form or revision of that artifact.

Therefore:

```text
Semantic Identity
        │
        ├── Version 1
        ├── Version 2
        ├── Version 3
        └── ...
```

A semantic version SHALL NOT be treated as a new identity merely because the representation changed.

Conversely, a materially different semantic artifact SHALL NOT be disguised as a version-only change when the applicable Semantic Contract requires a distinct identity.

---

# Identity, Version, and Lifecycle

An artifact SHOULD be understood through at least these distinct dimensions:

| Dimension | Meaning |
|---|---|
| Semantic Identity | What conceptual artifact is this? |
| Semantic Version | Which semantic form is represented? |
| Lifecycle State | What is its current lifecycle status? |
| Acceptance State | Has the represented meaning been accepted? |
| Provenance | Where did the meaning originate and how did it evolve? |
| Realization | Where and how is it physically represented? |

These dimensions SHALL NOT be collapsed merely because a particular implementation stores them in one record.

---

# Lifecycle State

Lifecycle State describes the artifact's relationship to its semantic evolution.

Possible states MAY include:

- proposed;
- provisional;
- accepted;
- active;
- superseded;
- deprecated;
- rejected;
- retired;
- historical.

The exact lifecycle vocabulary is governed by the applicable Semantic Contract.

Lifecycle State does not itself establish Repository Truth.

Acceptance remains the epistemic mechanism through which accepted repository-specific meaning is established.

---

# Filesystem Realization

Filesystem paths, filenames, directory structures, and repository layout are realizations.

They MAY be used for:

- human navigation;
- compatibility;
- conventional organization;
- tooling discovery;
- repository ergonomics;
- and transport.

They SHALL NOT be treated as canonical semantic identity.

A path MAY change without changing Semantic Identity.

A filename MAY change without changing Semantic Identity.

A directory MAY change without changing Semantic Identity.

---

# Canonical Identity Must Be Carried by the Artifact

Authority-bearing artifacts SHALL carry or otherwise expose their canonical Semantic Identity on an authoritative surface.

The identity SHALL NOT depend solely on:

- filename;
- path;
- directory depth;
- creation chronology;
- insertion order;
- repository history;
- or filesystem position.

The authoritative surface MAY be:

- the artifact itself;
- a contract-defined metadata envelope;
- a structured document header;
- a canonical manifest;
- or another explicitly defined semantic surface.

An index or catalog may locate an artifact.

It does not replace the artifact's authoritative identity.

---

# Identity Resolution

A consumer SHALL resolve an artifact through Semantic Identity rather than through filesystem assumptions whenever the artifact participates in a semantic contract.

The canonical resolution relationship is:

```text
Semantic Identity
        │
        ▼
Resolution
        │
        ├────────► Current Path
        │
        ├────────► Historical Paths
        │
        └────────► Applicable Version
```

Resolution MAY use:

- indexes;
- manifests;
- catalogs;
- repository metadata;
- aliases;
- or contract-defined discovery mechanisms.

The resolution mechanism SHALL remain subordinate to the canonical identity.

---

# Resolution Is Not Authority

A resolver determines where an artifact can be found.

It does not determine whether the artifact is authoritative.

Therefore:

```text
Resolution
    ≠
Acceptance
```

A resolver MAY locate:

- accepted artifacts;
- provisional artifacts;
- superseded artifacts;
- historical artifacts;
- or invalid artifacts.

The consumer must evaluate the artifact's semantic and lifecycle metadata according to the applicable contract.

---

# Filesystem Aliases

A filesystem path MAY serve as a compatibility alias for a Semantic Identity.

An alias SHALL be explicitly distinguishable from the canonical identity.

For example:

```text
Semantic Identity:
    guvna.repository-understanding

Current realization:
    canonical/REPOSITORY-UNDERSTANDING-MODEL.md

Historical alias:
    canonical/02-repository-understanding.md
```

The path is a realization.

The Semantic Identity remains stable.

Aliases SHALL NOT become independent authority surfaces.

---

# Alias Resolution

An alias SHOULD resolve deterministically to a canonical Semantic Identity.

The relationship is:

```text
Alias
  │
  ▼
Semantic Identity
  │
  ▼
Canonical Artifact
```

An alias SHALL NOT resolve to multiple materially different semantic identities without an explicit disambiguation mechanism.

Ambiguous resolution SHALL be treated as an integrity failure.

---

# Ordinality

Ordinal naming SHALL NOT establish semantic identity or authority.

Examples include:

```text
01-vision.md
02-epistemic-invariants.md
03-repository-intelligence.md
```

The numeric prefix MAY be used for:

- transitional navigation;
- human readability;
- migration;
- compatibility;
- or presentation.

It SHALL NOT determine:

- authority;
- precedence;
- canonical identity;
- acceptance;
- or semantic dependency.

---

# Chronology

Chronology MAY be preserved as provenance.

Chronology SHALL NOT be treated as:

- identity;
- authority;
- precedence;
- acceptance;
- or semantic version.

The order in which artifacts were:

- created;
- committed;
- renamed;
- generated;
- accepted;
- or deployed

does not independently determine which artifact is canonical.

---

# Repository Organization

Authority-bearing artifacts SHOULD be organized according to semantic relationships rather than arbitrary sequence.

Useful organizational dimensions include:

- artifact family;
- doctrinal layer;
- lifecycle state;
- governance boundary;
- ownership;
- semantic relationship;
- and repository purpose.

Filesystem organization remains a realization.

A repository MAY reorganize its directories without changing semantic meaning, provided semantic identity and resolution remain intact.

---

# Discoverability

Discoverability SHALL be provided through explicit mechanisms.

Permitted mechanisms include:

- indexes;
- manifests;
- catalogs;
- registries;
- metadata;
- semantic search;
- contract-defined discovery;
- and filesystem conventions.

Discoverability mechanisms SHALL remain distinguishable from authority surfaces.

An index MAY be the primary navigation mechanism.

It SHALL NOT silently become the source of canonical meaning.

---

# Indexes

An index is a derived discovery representation.

An index MAY contain:

- Semantic Identity;
- Semantic Version;
- Lifecycle State;
- Acceptance State;
- current realization path;
- historical aliases;
- relationships;
- provenance;
- and compatibility information.

An index SHALL remain derivative of the authoritative artifact and accepted governance state.

If an index conflicts with the authoritative artifact, the index SHALL be treated as stale or invalid.

---

# Manifests

A manifest is a structured declaration of artifacts and their relationships.

A manifest MAY provide:

- artifact discovery;
- dependency relationships;
- semantic versions;
- compatibility information;
- projection metadata;
- generation metadata;
- and resolution information.

A manifest SHALL NOT become an independent source of Repository Truth merely because Runtime consumes it.

Where a manifest is itself authority-bearing, its authority SHALL derive from its explicit governing Semantic Contract and acceptance state.

---

# Registry

A registry is a structured collection of identities, relationships, or resolution metadata.

Registries MAY support:

- artifact discovery;
- version resolution;
- compatibility analysis;
- migration;
- dependency resolution;
- and Runtime loading.

Registry contents SHALL remain attributable to their semantic sources.

A registry SHALL NOT silently supersede the source artifact.

---

# Authority-Bearing Artifacts

An authority-bearing artifact is an artifact whose accepted content participates directly in repository governance or accepted repository meaning.

Authority-bearing status SHALL derive from an applicable Semantic Contract and accepted repository governance.

Filesystem placement does not make an artifact authority-bearing.

Filename convention does not make an artifact authority-bearing.

Presence in a registry does not make an artifact authority-bearing.

---

# Runtime-Consumable Artifacts

A Runtime-consumable artifact is an artifact whose representation is explicitly defined for Runtime consumption.

Runtime-consumable status SHALL derive from an applicable Semantic Contract.

Runtime SHALL NOT infer Runtime semantics merely from:

- file extension;
- directory location;
- filename;
- lexical structure;
- or arbitrary repository convention

unless those conventions are explicitly established by the applicable contract.

---

# Runtime Projection Identity

A Runtime-consumable Governance Projection SHOULD have an identity independent of:

- its generated filename;
- its filesystem path;
- its generation timestamp;
- or its deployment location.

A projection SHOULD expose:

- projection identity;
- source Repository Understanding identity;
- source Governance identity;
- source semantic versions;
- Guvna Semantic Contract identity and version;
- applicable Projection Contract identity and version;
- adopted Semantic Contract where repository adoption is relevant;
- generator version;
- generation provenance;
- applicability information;
- and compatibility information.

This enables Runtime to determine not merely:

> "Can I parse this?"

but:

> "What semantic state does this projection represent?"

---

# Generated Artifacts

Generated artifacts are realizations of their source semantics.

Generation SHALL preserve sufficient provenance to identify:

- source identity;
- source semantic version;
- generator identity;
- generator version;
- applicable Semantic Contract;
- generation time;
- and resulting artifact identity where applicable.

A generated artifact SHALL NOT silently become the canonical source of the meaning from which it was generated.

---

# Generated Runtime Code

Where Guvna generates Runtime code from doctrine, the generated code SHALL remain distinguishable from the doctrine that defines its semantics.

The relationship is:

```text
Accepted Guvna Doctrine
        │
        ▼
Semantic Compilation
        │
        ▼
Generated Runtime Code
```

Generated Runtime code is a realization.

It is not the source doctrine.

This distinction is essential to Runtime evolution.

---

# Runtime Version and Semantic Version

Runtime implementation version and semantic contract version SHALL remain distinct.

For example:

```text
Runtime:
    implementationVersion = 4.2.1

Semantic Contract:
    semanticVersion = 3.0.0
```

A Runtime implementation may change without changing semantic meaning.

A Semantic Contract may change while Runtime implementation remains temporarily compatible with multiple versions.

These are separate compatibility dimensions.

---

# SDK Version and Semantic Version

SDK implementation version SHALL remain distinct from Semantic Contract version.

The SDK may expose:

- multiple contract versions;
- compatibility adapters;
- migration utilities;
- or version negotiation.

The SDK SHALL NOT imply semantic compatibility merely because two SDK versions can exchange data.

Semantic compatibility must be established against the applicable contract.

---

# Host Version and Semantic Version

Host Implementations SHALL likewise distinguish:

- Host implementation version;
- SDK version;
- Runtime version;
- Semantic Contract version;
- and repository semantic version.

This distinction allows Hosts to evolve without accidentally becoming semantic authorities.

---

# Repository Version and Semantic Version

A Governed Repository may have its own implementation and release versions.

These SHALL remain distinct from:

- Repository Understanding Version;
- Governance Projection Version;
- Guvna Semantic Contract Version;
- Runtime Version;
- SDK Version;
- and Host Version.

The purpose is to prevent implementation chronology from being mistaken for semantic evolution.

---

# Semantic Compatibility

Compatibility SHALL be evaluated semantically.

Two artifacts may be:

- structurally compatible;
- syntactically compatible;
- operationally compatible;

while remaining semantically incompatible.

Semantic compatibility SHOULD evaluate:

- identity;
- version;
- lifecycle;
- accepted meaning;
- contract version;
- authority requirements;
- provenance requirements;
- and dependency relationships.

---

# Projection Contract Specialization

A Projection Contract is a strict specialization of a Semantic Contract.

A Projection Contract MAY:
- constrain semantics established by its parent Semantic Contract;
- specialize those semantics for a projection boundary;
- instantiate those semantics for a defined projection class; and
- define projection-specific obligations within that existing semantic boundary.

A Projection Contract SHALL NOT introduce independent Guvna semantics.

If a projection requires genuinely new Guvna semantics, those semantics SHALL first enter through
Semantic Contract evolution. A successor Projection Contract may then specialize the evolved
Semantic Contract.

The relationship is:

```text
Semantic Contract
        │
        ▼
Projection Contract
        │
        ▼
Governance Projection
```

The Projection Contract defines obligations for the projection realization. The Governance
Projection provides repository-owned meaning within those obligations.

---

# Version Compatibility

A consumer SHALL determine compatibility using the semantic version information defined by the applicable Semantic Contract.

The following SHALL NOT be treated as sufficient proof of semantic compatibility:

- identical filenames;
- identical filesystem paths;
- successful parsing;
- successful loading;
- successful execution;
- matching Git history;
- or identical schema shape alone.

---

# Supersession

An artifact MAY be superseded by a later semantic version or successor identity.

Supersession SHALL preserve:

- prior identity;
- successor identity;
- prior version;
- successor version;
- acceptance provenance;
- and the semantic relationship between them.

Supersession does not erase the prior artifact's historical identity.

---

# Relocation

An artifact MAY move within the filesystem without changing its Semantic Identity.

A relocation SHOULD preserve:

- identity;
- version;
- provenance;
- acceptance state;
- and resolution behavior.

Consumers SHOULD discover the artifact through semantic resolution rather than hard-coded paths where the applicable contract permits.

---

# Rename

Renaming a file is a realization change unless the applicable semantic contract explicitly defines the filename as semantic content.

A rename SHALL NOT be interpreted as semantic change merely because the path changed.

---

# Deletion

Deleting a filesystem realization does not necessarily delete the semantic artifact.

If the artifact remains semantically current but loses its required realization, the repository may have an invalid or incomplete realization.

Conversely, deleting an obsolete realization does not necessarily change Repository Knowledge.

Semantic deletion and filesystem deletion are distinct operations.

---

# Semantic Retirement

Semantic retirement is the governed transition by which an artifact ceases to be current.

Retirement SHALL be distinguishable from filesystem deletion.

A retired artifact MAY remain physically present for:

- history;
- provenance;
- compatibility;
- migration;
- audit;
- or reference.

---

# Migration

Migration is the governed process through which semantic artifacts or their realizations transition between versions, identities, contracts, or filesystem representations.

Migration SHOULD preserve:

- semantic identity;
- provenance;
- authority;
- compatibility;
- historical relationships;
- and deterministic resolution.

Migration SHALL NOT create a second semantic authority surface merely for convenience.

---

# Doctrine Evolution

When Guvna doctrine evolves, semantic identity SHALL be evaluated before filesystem changes are made.

A doctrine change does not by itself make a generated contract applicable. Semantic Compilation
produces a candidate contract; validation and Contract Ratification establish whether that
candidate becomes an applicable Semantic Contract.

The preferred sequence is:

```text
Doctrine Change
        │
        ▼
Semantic Identity Analysis
        │
        ├────────► Same Identity / No Semantic Contract Change
        │
        └────────► Semantic Delta
                         │
                         ▼
                  Semantic Compilation
                         │
                         ▼
                Candidate Semantic Contract
                         │
                         ▼
                  Contract Validation
                         │
                         ▼
                  Contract Ratification
                         │
                         ▼
               Applicable Semantic Contract
                         │
                         ▼
              Runtime / SDK / Projection
                  Contract Generation
```

Contract Ratification SHALL NOT introduce new Guvna meaning. It establishes a validated candidate
as the applicable formal expression of meaning already established by accepted Guvna doctrine.

Where required contract semantics cannot be derived unambiguously from accepted Guvna doctrine,
Semantic Compilation SHALL identify a semantic gap rather than resolve the gap through
implementation inference.

Filesystem changes are downstream realizations of the semantic decision.

# Contract Ratification and Applicability

Semantic Compilation produces a candidate Semantic Contract. It does not, by compilation alone,
make that contract applicable.

The canonical relationship is:

```text
Accepted Guvna Doctrine
        │
        ▼
Semantic Compilation
        │
        ▼
Candidate Semantic Contract
        │
        ▼
Contract Validation
        │
        ▼
Contract Ratification
        │
        ▼
Applicable Semantic Contract
```

Contract Ratification SHALL establish applicability of the validated contract without establishing
new Guvna meaning.

Contract Ratification SHALL preserve:
- source doctrine identity and version;
- Semantic Contract identity and version;
- semantic derivation/provenance;
- validation results;
- compatibility relationships; and
- ratification state.

Contract Ratification is distinct from Repository Acceptance.

```text
Guvna:
    Contract Ratification
        = establishes applicability of a validated Guvna contract

Governed Repository:
    Acceptance
        = establishes accepted repository-specific meaning
```

Neither process may silently substitute for the other.

If Semantic Compilation cannot derive a required contract semantic unambiguously from accepted
Guvna doctrine, the compiler SHALL report a semantic gap. It SHALL NOT invent or silently infer
the missing semantic.

---

# Runtime Evolution

Runtime evolution SHOULD follow semantic doctrine rather than filesystem conventions.

The conceptual sequence is:

```text
Accepted Guvna Doctrine
        │
        ▼
Semantic Compilation
        │
        ▼
Candidate Semantic Contract
        │
        ▼
Contract Validation
        │
        ▼
Contract Ratification
        │
        ▼
Applicable Semantic Contract
        │
        ├──────────────► Versioned Runtime Realization
        │
        ├──────────────► Versioned SDK Realization
        │
        └──────────────► Projection Contract Realization
                                  │
                                  ▼
                           Host Alignment
                                  │
                                  ▼
                    Governed Repository Alignment
```

Runtime implementation generation is downstream of the applicable Semantic Contract. Runtime
MAY perform bounded semantic interpretation, but only within the interpretation space established
by the applicable contract. Runtime SHALL NOT resolve an unspecified semantic gap by invention.

At every stage:
- semantic identity remains stable where meaning remains stable;
- semantic version changes when meaning changes;
- implementation versions remain distinct;
- provenance remains preserved.

# Governed Repository Alignment

When a new Guvna Semantic Contract or Runtime semantic version becomes available, an adopted
Governed Repository does not automatically become governed by the new contract.

The repository SHALL retain an explicit relationship to its currently adopted Semantic Contract.
A new contract becomes applicable to the repository only through the applicable governed
alignment process.

The repository alignment process SHOULD:
1. identify the repository's current semantic state;
2. identify the repository's currently adopted Semantic Contract;
3. identify the candidate successor Guvna Semantic Contract;
4. resolve semantic identities;
5. calculate semantic compatibility;
6. classify the result as Compatible, Projection-compatible, Migration-required, Incompatible,
   or Indeterminate;
7. identify affected repository-owned artifacts;
8. generate Candidate Changes where required;
9. preserve provenance;
10. submit required repository semantic changes to Repository Authority;
11. accept approved changes;
12. update the repository's adopted contract relationship where applicable;
13. regenerate required projections;
14. validate the resulting realization;
15. preserve historical state.

A new Guvna Semantic Contract SHALL NOT silently alter the accepted semantic state of an already
adopted Governed Repository.

If compatibility is Indeterminate, the repository SHALL NOT be treated as compatible or
incompatible by inference. The applicable process SHALL obtain the evidence or authority
required to resolve the uncertainty.

Filesystem migration is subordinate to semantic alignment.

# Compatibility Aliases

Compatibility aliases MAY remain during migration.

An alias SHOULD identify:

- the alias itself;
- target Semantic Identity;
- applicable version;
- lifecycle state;
- and migration status.

Aliases SHOULD have a defined retirement condition.

Aliases SHALL NOT become permanent competing authority surfaces.

---

# Multiple Governance Projections

A Governed Repository MAY maintain multiple Governance Projections simultaneously when their
semantic source, Projection Contract, consumer boundary, applicability, or explicit migration
state distinguishes them.

Each projection SHALL be identifiable by sufficient information to determine:
- the repository semantic source it represents;
- the Projection Contract to which it conforms;
- its own projection identity and version;
- its applicability or consumer boundary; and
- its provenance.

Multiple projections SHALL NOT constitute multiple authorities for the same repository semantic
scope.

If two projections claim the same semantic source, contract, applicability, and scope but contain
materially conflicting meaning, the condition SHALL be treated as an integrity failure rather than
as two competing semantic authorities.

A projection may be valid without being current, and may be current without being the only valid
projection maintained during a governed migration.

---

# Deterministic Resolution

Semantic resolution SHALL be deterministic where Runtime behavior depends upon it.

Given:

```text
Semantic Identity
+
Applicable Semantic Contract
+
Repository State
```

the resolution result SHALL be deterministic within the defined contract.

Ambiguous resolution SHALL fail closed where ambiguity could alter governance or execution semantics.

---

# Fail-Closed Resolution

If Runtime cannot determine the semantic identity or compatible version of a required authority-bearing artifact, it SHALL NOT silently infer meaning from:

- path;
- filename;
- chronology;
- lexical similarity;
- or arbitrary fallback.

It SHALL instead produce a governed diagnostic or enter the contract-defined failure state.

This is especially important for governance artifacts.

---

# Discovery Versus Interpretation

Discovery answers:

> **Where is the artifact?**

Interpretation answers:

> **What does the artifact mean?**

These concerns SHALL remain separate.

A discovery mechanism may locate an artifact.

The applicable Semantic Contract determines how that artifact is interpreted.

---

# Filesystem Convention Versus Semantic Contract

A repository MAY establish filesystem conventions.

For example:

```text
constitution/
canonical/
architecture/
```

Such conventions may improve:

- discoverability;
- organization;
- human comprehension;
- and tooling.

They SHALL NOT override the applicable Semantic Contract.

A file located outside the conventional path may remain semantically valid if the contract permits its resolution.

A file located at the conventional path may remain invalid if its identity, version, provenance, or acceptance state is incorrect.

---

# Canonical Artifact Surface

Every authority-bearing artifact SHOULD expose, directly or through a contract-defined metadata envelope:

- Semantic Identity;
- Semantic Version;
- Lifecycle State;
- Acceptance State;
- Provenance;
- and applicable governing contract.

The exact representation is implementation-specific.

The semantic information is not.

---

# Provenance

Semantic Identity SHALL participate in provenance.

Provenance SHOULD allow a consumer to determine:

```text
Artifact
   │
   ├── Identity
   ├── Version
   ├── Acceptance
   ├── Source
   ├── Transformation
   ├── Generator
   └── Realization
```

This permits an implementation to answer:

- What is this?
- Which version is this?
- Why does it exist?
- Who accepted it?
- What generated it?
- What source did it derive from?
- Where is it realized?
- Is it current?

---

# Identity Collisions

Two materially different semantic artifacts SHALL NOT share the same Semantic Identity within the same governing scope.

If an identity collision occurs, the repository SHALL treat it as an integrity failure.

Filesystem location does not resolve semantic identity collisions.

Ordinal naming does not resolve semantic identity collisions.

Chronology does not resolve semantic identity collisions.

---

# Identity Ambiguity

An artifact whose Semantic Identity cannot be determined unambiguously SHALL NOT be treated as an authority-bearing artifact.

The system MAY:

- request clarification;
- consult an explicit migration map;
- inspect a governing registry;
- or report a diagnostic.

It SHALL NOT silently guess.

---

# Authority Surface Integrity

There SHALL be one authoritative semantic source for an accepted artifact identity and meaning within the applicable scope.

Derived surfaces such as:

- indexes;
- manifests;
- caches;
- generated projections;
- summaries;
- diagrams;
- and Runtime structures

may duplicate information for operational purposes.

They SHALL remain derivative.

If derivative state conflicts with authoritative state, the derivative state is stale or invalid.

---

# Cache Semantics

A cache is a realization of previously resolved semantic information.

A cache SHALL preserve sufficient identity and version information to determine what semantic state it represents.

A cache SHALL NOT silently become authoritative because it is:

- faster;
- locally available;
- newer by timestamp;
- or easier to consume.

Cache invalidation SHALL be based on semantic identity and applicable versioning, not merely filesystem timestamps.

---

# Regeneration

Regeneration SHALL be deterministic to the extent required by the applicable Semantic Contract.

Given the same:

- semantic source;
- semantic version;
- contract version;
- generator version;
- and relevant generation inputs,

the generated realization SHOULD be reproducible.

Where exact byte-level reproducibility is not required, semantic equivalence SHALL remain testable.

---

# Generated Graphs and Visualizations

A graph or visualization derived from doctrine is a projection.

Its nodes and edges represent semantic relationships from accepted sources.

The graph does not become the source of those relationships merely because it visually represents them.

A regenerated graph MAY change when doctrine changes.

Its identity SHOULD remain distinct from the identity of the doctrine from which it was derived.

---

# Canonical Versus Derived

The following distinction SHALL remain explicit:

```text
Canonical Semantic Artifact
        │
        ├──► Filesystem Realization
        ├──► Index
        ├──► Manifest
        ├──► Projection
        ├──► Cache
        ├──► Graph
        └──► Generated Code
```

The downstream artifacts are realizations.

They SHALL preserve traceability to their source.

---

# Constitutional Relationship

This doctrine SHALL preserve the constitutional distinction among:

- Repository Information;
- Repository Knowledge;
- Repository Intelligence;
- Repository Wisdom;
- Repository Authority;
- Acceptance;
- Repository Truth;
- Repository Understanding;
- and Realization.

Semantic Identity concerns the identity of a representation.

It does not replace epistemic authority.

---

# Architectural Relationship

Architectural Doctrine SHALL use Semantic Identity to distinguish:

- canonical concepts;
- architectural concepts;
- generated artifacts;
- Runtime projections;
- SDK contracts;
- Host realizations;
- and repository-owned artifacts.

Architecture SHALL NOT use filesystem location as a substitute for semantic identity.

---

# Runtime Relationship

Runtime SHALL resolve governed artifacts through semantic identity and applicable contracts.

Runtime SHALL NOT infer authority from filesystem position.

Runtime MAY use filesystem conventions as a discovery optimization when the applicable contract explicitly permits them.

The resolved artifact remains authoritative only according to its semantic and acceptance state.

---

# SDK Relationship

The SDK SHOULD expose semantic identity explicitly.

SDK APIs SHOULD prefer concepts such as:

```text
getArtifact(identity, version)
resolveArtifact(identity)
getProjection(identity, version)
checkCompatibility(identity, version, contract)
```

over APIs whose semantics depend exclusively on paths.

The exact API surface is implementation-specific.

The semantic principle is not.

---

# Host Relationship

Hosts MAY use paths for navigation.

Hosts SHALL NOT infer repository semantics solely from:

- path;
- filename;
- directory;
- or UI placement.

Hosts SHOULD preserve Semantic Identity when presenting governed artifacts.

---

# Governed Repository Relationship

Governed Repositories own their repository-specific semantic artifacts.

They MAY establish:

- repository-specific identities;
- repository-specific aliases;
- repository-specific organization;
- and repository-specific lifecycle conventions

within the boundaries of applicable Guvna Semantic Contracts.

Repository-specific filesystem organization remains a realization.

---

# Canonical Invariants

The following additional invariants apply to contract-driven Runtime and projection resolution:

26. Contract Ratification is distinct from Semantic Compilation.
27. Contract Ratification establishes applicability and SHALL NOT introduce new Guvna meaning.
28. Semantic Contract versions change only when the contractual semantic boundary materially changes.
29. Projection Contracts are strict specializations and SHALL NOT introduce independent Guvna semantics.
30. Runtime interpretation SHALL remain bounded by the applicable Semantic Contract.
31. Runtime SHALL NOT resolve an unspecified semantic gap through invention.
32. A Governed Repository retains an explicit adopted Semantic Contract relationship.
33. A newly ratified Semantic Contract does not automatically alter an adopted repository's contract.
34. Compatibility classification SHALL distinguish Compatible, Projection-compatible, Migration-required,
    Incompatible, and Indeterminate where those states are applicable.
35. Indeterminate compatibility SHALL NOT be silently converted into compatibility or incompatibility.
36. Multiple Governance Projections MAY coexist when explicitly distinguished by contract,
    applicability, consumer boundary, or migration state.
37. Contract Ratification SHALL NOT be confused with Repository Acceptance.


This doctrine establishes the following invariants:

1. Semantic Identity is independent of filesystem location.
2. Semantic Identity identifies meaning, not authority.
3. Semantic Identity is distinct from Semantic Version.
4. Semantic Version is distinct from implementation version.
5. Lifecycle State is distinct from Acceptance State.
6. Filesystem paths are realizations.
7. Filenames are realizations.
8. Ordinality does not establish authority.
9. Chronology does not establish authority.
10. Resolution does not establish authority.
11. Indexes are derived navigation surfaces.
12. Manifests are derived or contract-defined resolution surfaces.
13. Generated artifacts remain attributable to their sources.
14. Runtime-consumable artifacts require explicit contract semantics.
15. Semantic compatibility is not established by structural compatibility alone.
16. Semantic relocation does not require semantic identity change.
17. Semantic change does not necessarily require filesystem relocation.
18. Supersession preserves historical identity.
19. Deletion of a realization does not necessarily delete semantic identity.
20. Ambiguous semantic resolution fails closed where governance could be affected.
21. Authority-bearing artifacts expose sufficient identity and provenance.
22. Derived surfaces SHALL NOT become competing authority surfaces.
23. Cache state SHALL remain attributable to semantic identity and version.
24. Generated Runtime code remains a realization of accepted semantics.
25. Doctrine remains the semantic source from which generated Runtime semantics derive.

---

# Canonical Resolution Model

The canonical resolution model is:

```text
Semantic Identity
        │
        ▼
Semantic Version
        │
        ▼
Applicable Semantic Contract
        │
        ▼
Resolution
        │
        ├────────► Canonical Artifact
        │
        ├────────► Current Realization
        │
        ├────────► Historical Realizations
        │
        └────────► Compatibility Metadata
```

The resolution result is then evaluated for:

```text
Acceptance
Lifecycle
Applicability
Provenance
Compatibility
```

Only after those conditions are satisfied may a consumer treat the resolved artifact as the applicable semantic source.

---

# Final Canonical Principle

> **Meaning owns identity.**
>
> **Acceptance establishes authority.**
>
> **Version identifies semantic form.**
>
> **Provenance preserves lineage.**
>
> **Contracts define bounded interpretation.**
>
> **Filesystem provides realization.**
>
> **Indexes provide discovery.**
>
> **Resolvers provide location.**
>
> **Caches provide acceleration.**
>
> **Generated artifacts provide realization.**
>
> **None of these downstream mechanisms silently becomes the source of meaning.**

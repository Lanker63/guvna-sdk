# Architectural Invariants

## Purpose

The Architectural Invariants define the immutable architectural laws governing how Guvna realizes accepted governing doctrine, canonical models, ratified Semantic Contracts, Runtime semantics, and Governed Repository semantics.

They preserve:

- dependency direction;
- semantic ownership;
- realization boundaries;
- projection boundaries;
- authority boundaries;
- provenance;
- version boundaries;
- compatibility boundaries;
- and the distinction between semantic source and executable realization.

All:

- Architectural Doctrine;
- Semantic Contracts;
- Projection Contracts;
- Semantic Compilation;
- Repository Projection Compilation;
- Runtime implementations;
- SDK implementations;
- Host Implementations;
- Repository Adoption;
- Repository Governance;
- repository projections;
- generated artifacts;
- workflows;
- and other realizations

SHALL preserve these invariants.

These invariants are architectural.

They do not establish constitutional ontology.

They do not redefine canonical epistemology or Repository Understanding.

They govern how accepted meaning is realized throughout Guvna.

---

# Architectural Dependency Principle

The architecture SHALL preserve the following dependency direction:

```text
Constitutional Doctrine
        │
        ▼
Canonical Models
        │
        ▼
Architectural Doctrine
        │
        ▼
Semantic Contracts
        │
        ▼
Guvna Semantic Compilation
        │
        ▼
Candidate Semantic Contract
        │
        ▼
Semantic Validation
        │
        ▼
Contract Ratification
        │
        ▼
Applicable Semantic Contract
        │
        ▼
Guvna-owned Realizations
        │
        ├──────────────► Runtime
        ├──────────────► SDK Contracts
        └──────────────► Compatibility Artifacts
```

Governed Repository semantics enter through a separate repository-owned path:

```text
Governed Repository
        │
        ▼
Accepted Repository Knowledge
        │
        ▼
Repository Understanding
        │
        ▼
Repository Governance
        │
        ▼
Repository Projection Compilation
        │
        ▼
Governance Projection
        │
        ▼
Projection Contract
        │
        ▼
Guvna Runtime
```

The architecture SHALL NOT create a reverse semantic dependency in which:

- Runtime defines doctrine;
- SDK defines Runtime semantics;
- Host defines SDK semantics;
- or filesystem organization defines repository semantics.

---

# Contract Ratification and Applicability

The architecture SHALL distinguish the semantic compilation of a contract from the ratification of that contract for applicability.

The canonical relationship is:

```text
Accepted Guvna Meaning
        │
        ▼
Semantic Compilation
        │
        ▼
Candidate Semantic Contract
        │
        ▼
Semantic Validation
        │
        ▼
Contract Ratification
        │
        ▼
Applicable Semantic Contract
```

Semantic Compilation SHALL formally express accepted Guvna meaning. It SHALL NOT silently create new meaning.

Semantic validation SHALL determine whether the candidate contract is structurally and semantically conformant to the governing source.

Contract Ratification SHALL establish that a validated contract is the applicable formal contract for the governed scope. Ratification SHALL remain attributable and versioned.

Contract Ratification SHALL NOT become a new source of Guvna meaning.

A downstream implementation SHALL NOT treat a candidate, draft, or merely generated contract as applicable solely because it parses, is present in the workspace, is generated successfully, or is consumed by Runtime.

An implementation SHALL be able to distinguish at least:

- Candidate Semantic Contract;
- Validated Semantic Contract;
- Ratified Semantic Contract;
- Applicable Semantic Contract;
- Superseded Semantic Contract;
- and Incompatible or Rejected Contract.

Only the contract state recognized as applicable by the governing contract process may govern downstream semantic interpretation.

---

# Invariant 1 — Semantic Source Precedes Realization

Accepted semantic meaning SHALL precede its architectural and operational realization, and a Semantic Contract SHALL become applicable only through the contract-ratification boundary defined by these invariants.

The conceptual relationship is:

```text
Accepted Meaning
        │
        ▼
Candidate Semantic Contract
        │
        ▼
Semantic Validation
        │
        ▼
Contract Ratification
        │
        ▼
Applicable Semantic Contract
        │
        ▼
Realization
```

A realization SHALL NOT become the semantic source of the meaning it realizes merely because it is:

- executable;
- persisted;
- generated;
- widely used;
- cached;
- or operationally successful.

---

# Invariant 2 — Guvna Owns Guvna Semantics

Guvna-owned semantics SHALL originate from accepted Guvna doctrine, canonical models, Architectural Doctrine, and applicable Semantic Contracts.

This includes:

- Runtime semantics;
- SDK semantics;
- adoption semantics;
- compatibility semantics;
- provenance semantics;
- directive semantics;
- Projection Contracts;
- and other semantics explicitly owned by Guvna.

Runtime, SDK, Host, generated code, and tooling SHALL realize these semantics.

They SHALL NOT invent them.

---

# Invariant 3 — Governed Repositories Own Repository-Specific Meaning

Governed Repositories own:

- repository-specific truth;
- accepted Repository Knowledge;
- Repository Understanding content;
- repository-specific governance;
- repository-specific constraints;
- and repository-owned semantic artifacts.

Guvna defines the contracts through which those semantics are consumed.

Guvna SHALL NOT silently become the authority over repository-specific meaning merely because Runtime interprets that meaning.

---

# Invariant 4 — Semantic Ownership and Content Ownership Are Distinct

Guvna Core MAY own:

- the semantic definition of Repository Understanding;
- the semantic definition of Repository Governance;
- the Adoption Contract;
- the Runtime Contract;
- the Projection Contract;
- the SDK contract;
- and other Guvna-owned semantic contracts.

The Governed Repository owns the actual repository-specific content expressed through those semantic models.

Therefore:

```text
Guvna owns the semantic model
        ≠
Guvna owns the repository content
```

This distinction SHALL remain explicit throughout all realizations.

---

# Invariant 5 — Runtime Is a Realization Boundary

Runtime is a realization of accepted Semantic Contracts.

Runtime SHALL NOT become the semantic source of:

- governing doctrine;
- canonical models;
- Semantic Contracts;
- Repository Understanding;
- Repository Governance;
- or Repository Truth.

Runtime MAY:

- evaluate;
- validate;
- enforce;
- resolve;
- dispatch;
- produce directives;
- record Evidence;
- and report diagnostics

according to accepted semantics.

---

# Invariant 6 — Runtime Does Not Rediscover Doctrine

Runtime SHALL NOT reconstruct Guvna semantics at execution time from:

- arbitrary doctrine files;
- filesystem organization;
- filenames;
- implementation patterns;
- historical accidents;
- Host presentation state;
- or model behavior

when the applicable semantic contract defines a canonical executable representation.

The preferred relationship is:

```text
Doctrine
    │
    ▼
Guvna Semantic Compilation
    │
    ▼
Semantic Contract / Runtime Semantics
    │
    ▼
Runtime
```

rather than:

```text
Runtime
    │
    ├── discovers doctrine
    ├── infers meaning
    ├── reconstructs architecture
    └── decides semantics
```

---

# Invariant 7 — Guvna Semantic Compilation Is Guvna-Owned

Guvna Semantic Compilation formally expresses accepted Guvna semantics as candidate semantic contracts and Guvna-owned executable realizations. It does not by itself make a candidate contract applicable.

It MAY produce:

- Candidate Semantic Contracts;
- validated Semantic Contracts;
- and ratification inputs;
- Projection Contracts;
- Runtime semantic artifacts;
- SDK contract artifacts;
- compatibility metadata;
- conformance artifacts;
- and other Guvna-owned semantic realizations.

It SHALL preserve:

- semantic identity;
- source version;
- contract version;
- generation provenance;
- and compatibility relationships.

It SHALL NOT establish repository-specific truth or independently ratify the applicability of a candidate contract.

---

# Invariant 8 — Repository Projection Compilation Is Repository-Semantic

Repository Projection Compilation transforms accepted repository-specific meaning into representations that conform to Guvna Semantic Contracts and applicable Projection Contracts.

It MAY produce:

- Governance Projections;
- Runtime-consumable repository policies;
- repository capability projections;
- repository-specific constraints;
- or other repository-owned derived representations.

It SHALL preserve:

- repository ownership;
- repository provenance;
- repository semantic identity;
- applicable Guvna contract version;
- applicable Projection Contract version;
- and projection version.

It SHALL NOT alter Guvna-owned semantic meaning.

---

# Invariant 9 — Compilation Responsibility Is Not Semantic Ownership

Guvna Semantic Compilation and Repository Projection Compilation MAY share:

- tooling;
- schemas;
- generators;
- validators;
- compiler infrastructure;
- serialization;
- or build systems.

Shared infrastructure does not merge semantic ownership.

The distinction SHALL remain:

```text
Guvna Semantic Compilation
    └── realizes Guvna meaning

Repository Projection Compilation
    └── realizes repository-specific meaning
```

A common implementation does not create common authority.

---

# Invariant 10 — Generated Artifacts Are Realizations

Generated Runtime code, SDK code, schemas, projections, graphs, indexes, and other generated artifacts are realizations.

Generation SHALL NOT confer semantic authority.

Generated artifacts SHALL remain traceable to their accepted sources.

If a generated artifact conflicts with its semantic source, the generated artifact is:

- stale;
- incorrectly generated;
- incorrectly implemented;
- or otherwise non-conformant.

The generated artifact SHALL NOT redefine its source.

---

# Invariant 11 — Generated Runtime Does Not Become Doctrine

Where Runtime code is generated from accepted doctrine and Semantic Contracts:

```text
Accepted Doctrine
        │
        ▼
Guvna Semantic Compilation
        │
        ▼
Generated Runtime
```

Generated Runtime remains downstream.

If generated Runtime code requires a semantic change, the semantic source SHALL be changed through the applicable doctrine and Semantic Contract process.

The architecture SHALL NOT treat generated Runtime code as a competing source of doctrine.

---

# Invariant 12 — Implementation Evolution and Semantic Evolution Are Distinct

An implementation MAY change while preserving semantic meaning.

Examples include:

- refactoring;
- optimization;
- dependency changes;
- infrastructure changes;
- code generation changes;
- implementation replacement.

Such changes do not necessarily alter the Semantic Contract.

A semantic change alters meaning or semantic obligation.

The distinction SHALL remain:

```text
Implementation Evolution
        ≠
Semantic Evolution
```

---

# Invariant 13 — Semantic Evolution Is Explicit

A semantic evolution SHALL be represented explicitly through an updated semantic source and an attributable Semantic Delta.

The semantic evolution SHOULD identify:

- prior semantic identity;
- target semantic identity where applicable;
- prior semantic version;
- target semantic version;
- changed meaning;
- changed obligations;
- compatibility implications;
- affected Runtime semantics;
- affected SDK semantics;
- affected Host obligations;
- affected Projection Contract requirements;
- affected projection semantics;
- and affected repository semantics.

Consumers SHALL NOT be required to infer semantic evolution from implementation differences alone.

---

# Invariant 14 — Version Dimensions Remain Distinct

The architecture SHALL distinguish at minimum:

- Doctrine Semantic Version;
- Semantic Contract Version;
- Projection Contract Version;
- Runtime Semantic Version;
- Runtime Implementation Version;
- SDK Version;
- Host Implementation Version;
- Repository Understanding Version;
- Repository Governance Version;
- Governance Projection Version;
- and Governed Repository implementation version.

These versions MAY evolve independently.

Version equality SHALL NOT be treated as proof of semantic equivalence.

---

# Invariant 15 — Semantic Contract Defines Interpretation

Semantic Contracts define how downstream realizations interpret Guvna-owned semantics and repository-specific inputs.

The relationship is:

```text
Guvna Semantic Contract
        │
        │ defines interpretation
        ▼
      Runtime
        ▲
        │
        │ provides repository-specific content
        │
Governance Projection
```

Runtime SHALL interpret the projection according to the applicable contract.

Runtime SHALL NOT invent additional repository semantics outside the applicable contract.

---

# Invariant 16 — Projection Contract Defines Projection Obligations

A Projection Contract is a Guvna-owned specialization of an applicable Semantic Contract.

A Projection Contract MAY define:

- required projection identity;
- source identity requirements;
- source semantic version;
- projection version;
- repository identity;
- applicable Guvna Semantic Contract;
- provenance requirements;
- supported projection features;
- lifecycle requirements;
- compatibility requirements;
- and validation requirements.

A Projection Contract defines what makes a projection contractually valid.

It SHALL NOT define the repository-specific meaning contained in the projection.

The distinction is:

```text
Projection Contract
        │
        └── defines projection obligations

Governance Projection
        │
        └── provides repository-specific meaning
```

---

# Invariant 17 — Governance Projection Is Derived

Governance Projections are derived representations of accepted repository governance.

The relationship is:

```text
Repository Understanding
        │
        ▼
Repository Governance
        │
        ▼
Repository Projection Compilation
        │
        ▼
Governance Projection
        │
        ▼
Projection Contract
        │
        ▼
Runtime
```

A Governance Projection SHALL NOT become the source of repository governance merely because Runtime consumes it.

If the projection conflicts with accepted repository governance, the projection is stale or invalid.

---

# Invariant 18 — Projection Traceability

Every repository-semantic projection SHALL trace back to accepted repository meaning.

Projection provenance SHOULD identify:

- source Repository Knowledge;
- source Repository Understanding;
- source Repository Governance;
- repository semantic version;
- applicable Guvna Semantic Contract;
- applicable Projection Contract;
- projection identity;
- projection version;
- compiler/generator;
- and generation provenance.

A projection without required provenance SHALL be treated as unverifiable where provenance is required.

---

# Invariant 19 — Projection Determinism

Where the applicable contract requires deterministic projection:

Given identical:

- semantic source;
- semantic version;
- repository state;
- Guvna Semantic Contract version;
- Projection Contract version;
- generator version;
- and relevant generation inputs,

projection compilation SHALL produce semantically equivalent output.

If byte-for-byte reproducibility is not required, semantic equivalence SHALL remain testable.

---

# Invariant 20 — Runtime Projection Compatibility Is Explicit

Runtime SHALL evaluate a Governance Projection for:

- identity;
- version;
- repository identity;
- applicable Projection Contract;
- Guvna Semantic Contract compatibility;
- provenance;
- lifecycle state;
- and semantic applicability.

A projection SHALL NOT be considered compatible merely because:

- it parses;
- it can be deserialized;
- it appears structurally similar;
- or it was produced by a known generator.

---

# Invariant 21 — Filesystem Organization Is a Realization

Filesystem organization SHALL remain a realization.

Filesystem path, filename, directory, ordering, and layout SHALL NOT establish semantic authority merely through existence.

The distinction SHALL remain:

```text
Semantic Identity
        ≠
Filesystem Location
```

Where a filesystem artifact has semantic meaning, that meaning derives from its applicable Semantic Contract, Projection Contract where applicable, and accepted semantic source.

---

# Invariant 22 — Discovery Does Not Establish Meaning

Discovery mechanisms MAY use:

- paths;
- filenames;
- indexes;
- manifests;
- catalogs;
- registries;
- or search.

Discovery answers:

> Where is the artifact?

The applicable semantic contract answers:

> What does the artifact mean?

The applicable Projection Contract answers:

> Does this projection conform to the required projection obligations?

Discovery SHALL NOT silently become semantic interpretation.

---

# Invariant 23 — No New Semantic Authority Surface

No implementation artifact may introduce a competing semantic authority surface.

This includes:

- Runtime;
- SDK;
- Host;
- cache;
- index;
- projection;
- generated source;
- workflow state;
- database state;
- filesystem organization;
- UI state;
- model output;
- or execution records.

An artifact may represent accepted meaning.

It SHALL NOT silently become an alternative source of meaning.

---

# Invariant 24 — SDK Is a Contract Realization

The SDK SHALL expose Core-owned capabilities and contracts without redefining them.

The SDK MAY:

- transport;
- validate;
- adapt;
- serialize;
- version;
- negotiate;
- and expose

semantic contracts.

The SDK SHALL NOT independently establish:

- Repository Truth;
- Repository Knowledge;
- Runtime semantics;
- or Repository Governance.

---

# Invariant 25 — Host Is a Realization Boundary

Host Implementations SHALL realize SDK and Runtime capabilities.

Hosts SHALL NOT:

- establish Repository Truth;
- establish Repository Knowledge;
- establish Repository Understanding;
- redefine Semantic Contracts;
- redefine Runtime semantics;
- or become an authority surface.

Host-specific presentation and interaction MAY differ.

Semantic meaning SHALL remain consistent.

---

# Invariant 26 — Runtime Directives Are Derived Outputs

Runtime Directives are derived from:

- Semantic Contracts;
- Runtime evaluation;
- applicable repository governance;
- and execution context.

Runtime Directives SHALL remain attributable to their semantic source.

They SHALL NOT become independent semantic authorities.

---

# Invariant 27 — Host Realizes Runtime Directives

Hosts SHALL realize Runtime Directives without changing their semantic meaning.

A Host MAY translate:

```text
Core:
    Request authority confirmation
```

into:

```text
Host:
    Dialog / command / interaction
```

It SHALL NOT transform the directive into a host-local semantic decision.

---

# Invariant 28 — Repository Authority Remains External to Runtime

Runtime MAY:

- validate authority state;
- require authority;
- enforce acceptance transitions.

Runtime SHALL NOT become Repository Authority merely by executing,
enforcing, or validating repository governance.

Repository-specific Acceptance remains attributable to the authorized
Repository Authority exercising authority within its declared scope.

That authority MAY be human or an explicitly authorized non-human authority,
including a delegated agent.

---

# Invariant 28a — Repository Authority Scope Is Repository-Bound

Repository Authority exists only within the Governed Repository for which it has been established. No default cross-repository authority exists. An organization-wide authority relationship is valid only where each affected Governed Repository's Authority Model explicitly recognizes that relationship.

---

# Invariant 28b — Revocation Affects Only Future Acceptance

Revocation of a principal's Repository Authority SHALL invalidate that principal's capacity for future Authority Decisions and Acceptance within the affected Governed Repository. Revocation SHALL NOT retroactively invalidate previously established Acceptance or previously accepted Repository Knowledge. Reversal of previously accepted knowledge requires a separate, explicit supersession process.

---

# Invariant 29 — Acceptance Is Not Implementation State

The following SHALL NOT be treated as equivalent to repository Acceptance:

- UI completion;
- database persistence;
- file creation;
- model output;
- workflow completion;
- successful execution;
- or Runtime state.

Acceptance remains an explicit epistemic transition.

---

# Invariant 30 — Evidence Remains Evidence

Realization artifacts MAY produce Evidence.

Evidence SHALL remain distinguishable from:

- Repository Knowledge;
- Repository Understanding;
- Repository Truth;
- Semantic Contracts;
- and Runtime semantics.

Execution success SHALL NOT establish semantic correctness.

---

# Invariant 31 — Provenance Crosses Architectural Boundaries

Provenance SHALL survive material transformations across:

```text
Doctrine
    ↓
Semantic Contract
    ↓
Runtime
    ↓
SDK
    ↓
Host
```

and:

```text
Repository Knowledge
    ↓
Repository Understanding
    ↓
Repository Governance
    ↓
Governance Projection
    ↓
Runtime
    ↓
Directive
    ↓
Execution
    ↓
Evidence
```

A realization SHALL NOT discard provenance required by the applicable contract.

---

# Invariant 32 — Semantic Compatibility Is Not Technical Compatibility

Compatibility SHALL be evaluated semantically.

The following SHALL NOT independently establish semantic compatibility:

- successful parsing;
- successful deserialization;
- matching file format;
- matching filename;
- successful transport;
- successful invocation;
- matching implementation version;
- or successful execution.

Semantic compatibility MAY require evaluation of:

- semantic identity;
- semantic version;
- Guvna Semantic Contract version;
- Projection Contract version;
- authority requirements;
- lifecycle;
- provenance;
- and repository-specific semantic obligations.

---

# Invariant 33 — Incompatibility Fails Closed

Where required semantic compatibility cannot be established, the realization SHALL:

- reject;
- pause;
- request alignment;
- request authority action;
- enter an explicitly defined compatible state;
- or produce a contract-defined failure.

It SHALL NOT silently infer compatibility.

---

# Invariant 34 — Semantic Delta Drives Impact Analysis

A Semantic Delta SHALL be evaluated against downstream consumers.

The conceptual relationship is:

```text
Semantic Delta
       │
       ├──────────────► Runtime Impact
       │
       ├──────────────► SDK Impact
       │
       ├──────────────► Host Impact
       │
       ├──────────────► Projection Contract Impact
       │
       └──────────────► Repository Impact
```

Each downstream realization MAY independently be:

- Compatible;
- Adaptable;
- Migration-required;
- Incompatible;
- or Indeterminate.

A semantic evolution SHALL NOT imply that every downstream realization must change.

---

# Invariant 35 — Runtime and SDK Are Not a Single Version Chain

Runtime and SDK versions SHALL remain independently versioned.

A Runtime implementation change does not necessarily imply SDK change.

An SDK implementation change does not necessarily imply Runtime semantic change.

A ratified Semantic Contract change MAY affect both.

The applicable Semantic Delta determines the impact.

---

# Invariant 36 — Host Alignment Is Contract-Based

Host alignment SHALL be evaluated against:

- applicable Semantic Contract;
- Runtime contract;
- SDK contract;
- Projection Contract where relevant;
- and relevant Runtime Directive semantics.

A Host SHALL NOT claim semantic conformance merely because its implementation compiles against an SDK.

---

# Invariant 37 — Repository Alignment Is Separate From Guvna Release

A new Guvna Runtime, SDK, Semantic Contract, or Projection Contract version SHALL NOT silently modify an adopted repository.

The repository may be:

- Compatible;
- Adaptable;
- Migration-required;
- Incompatible;
- or Indeterminate.

Repository alignment is a separate governed process.

---

# Invariant 38 — Repository Alignment Requires Repository Authority

Where a semantic evolution requires repository-specific meaning to change,
the applicable Repository Authority SHALL make or authorize the required
Authority Decision within its declared scope.

```text
Semantic Delta
       │
       ▼
Repository Impact Analysis
       │
       ▼
Candidate Repository Changes
       │
       ▼
Repository Authority
       │
       ▼
Authority Decision
       │
       ▼
Acceptance
       │
       ▼
Updated Repository Knowledge
       │
       ▼
Updated Repository Understanding
```

Repository Authority MAY be exercised by a human or by an explicitly
authorized non-human authority, including a delegated agent.

Where Repository Authority is delegated to an agent, the authority
relationship SHALL preserve the delegating authority, delegated scope,
permitted decision capabilities, applicable conditions, and sufficient
provenance to establish the authority under which the decision was made.

An agent SHALL NOT acquire broader Repository Authority merely through
execution capability, Runtime access, Host integration, model capability,
or participation in repository governance.

Guvna may generate alignment candidates.

It SHALL NOT silently accept them.

---

# Invariant 39 — Repository History Is Preserved

Repository semantic evolution and alignment SHALL preserve historical accepted state.

The Governed Repository SHALL retain sufficient information to distinguish:

- prior meaning;
- current meaning;
- supersession;
- migration;
- authority decision;
- acceptance;
- and provenance.

Repository history SHALL NOT be silently rewritten to reflect current semantics.

---

# Invariant 40 — Guvna Semantic History Is Preserved

Guvna semantic evolution SHALL preserve sufficient history to distinguish:

- prior doctrine;
- current doctrine;
- prior Semantic Contracts;
- current Semantic Contracts;
- prior Projection Contracts;
- current Projection Contracts;
- supersession;
- semantic deltas;
- and generation lineage.

Guvna history SHALL NOT be silently rewritten to reflect only current semantics.

---

# Invariant 41 — Guvna and Repository Histories Are Distinct

Guvna semantic history and Governed Repository semantic history SHALL remain distinct.

Guvna semantic history describes changes to Guvna-owned meaning.

Repository semantic history describes changes to repository-owned meaning.

Cross-boundary provenance MAY relate the two histories.

Cross-boundary provenance SHALL NOT merge ownership.

---

# Invariant 42 — Repository Semantic State Is Not a Guvna Contract Version

A Governed Repository does not become "Repository Contract N+1" merely because it aligns with Guvna Candidate Semantic Contract N+1
                        │
                        ▼
                 Contract Ratification.

The repository retains its own semantic versions, such as:

- Repository Understanding Version;
- Repository Governance Version;
- Governance Projection Version.

It conforms to or is compatible with a Guvna Semantic Contract.

This distinction preserves ownership.

---

# Invariant 43 — Semantic Compilation Does Not Modify Repository Truth

Guvna Semantic Compilation may change:

- Guvna contracts;
- Projection Contracts;
- Runtime semantics;
- SDK contracts;
- compatibility metadata;
- and Guvna realizations.

It SHALL NOT directly establish or modify repository-specific truth.

Repository-specific meaning changes only through its own authority and acceptance process.

---

# Invariant 44 — Runtime Complexity Does Not Become Semantic Authority

If Runtime implementation becomes complex because semantics are underspecified, the architecture SHALL prefer improving:

- doctrine;
- Semantic Contracts;
- Projection Contracts;
- semantic compilation;
- projection contracts;
- or other governing artifacts

rather than embedding undocumented semantic decisions into Runtime code.

Runtime complexity SHALL NOT become a substitute for semantic doctrine.

---

# Invariant 45 — Runtime Should Remain Lightweight Relative to Doctrine

Runtime SHOULD contain only the stable mechanisms required to:

- load contracts;
- validate contracts;
- resolve compatible projections;
- evaluate governed conditions;
- enforce lifecycle transitions;
- produce directives;
- preserve provenance;
- execute approved operations;
- and fail closed.

Evolving Guvna semantics SHOULD reside in versioned Semantic Contracts, Projection Contracts, and generated realizations.

Evolving repository semantics SHOULD reside in repository-owned Knowledge, Understanding, Governance, and projections.

---

# Invariant 46 — Semantic Compiler and Runtime Are Distinct

The Semantic Compiler defines or generates executable semantics.

Runtime realizes those semantics.

The relationship is:

```text
Semantic Compiler
        │
        ▼
Candidate / Validated Semantic Contract
        │
        ▼
Ratified Applicable Semantic Contract / Runtime Semantics
        │
        ▼
Runtime
```

Runtime SHALL NOT become the compiler's semantic source merely because it executes the generated result.

---

# Invariant 47 — Generated Code Is Reproducible

Where generation is expected to be reproducible, generated artifacts SHALL be reproducible from their declared semantic inputs.

Generation inputs SHOULD include:

- doctrine version;
- canonical model version where applicable;
- Semantic Contract version;
- Projection Contract version where applicable;
- generator version;
- generator configuration;
- and relevant source artifacts.

---

# Invariant 48 — Generated Graphs Are Projections

Graphs and visualizations generated from doctrine are projections.

They SHALL remain derivative of their semantic sources.

A graph SHALL NOT become the source of the relationships it visualizes.

---

# Invariant 49 — Operational Guidance Is Downstream

Runbooks, workflows, prompts, implementation guidance, and generated instructions SHALL remain downstream of accepted semantic meaning.

Operational guidance MAY describe how to realize a requirement.

It SHALL NOT redefine the requirement unless the governing semantic source is changed through the applicable doctrine process.

---

# Invariant 50 — Workflow State Is Not Semantic State

Workflow state SHALL remain distinct from:

- Repository Truth;
- Repository Knowledge;
- Repository Understanding;
- Semantic Contract state;
- Projection Contract state;
- and Runtime semantic state.

Workflow execution may produce Evidence.

Workflow completion does not independently establish semantic acceptance.

---

# Invariant 51 — Execution Is a Realization

Execution is the realization of accepted Runtime behavior.

Execution SHALL NOT establish:

- Repository Truth;
- Repository Knowledge;
- Repository Understanding;
- or Semantic Contract meaning.

Execution may produce Evidence.

Evidence may inform Repository Intelligence.

---

# Invariant 52 — Architecture Remains Host Independent

Architectural invariants SHALL remain independent of:

- programming language;
- Runtime framework;
- SDK framework;
- Host platform;
- database;
- transport;
- filesystem;
- model provider;
- operating system;
- deployment topology;
- and implementation language.

Implementations may vary.

The architectural invariants SHALL NOT.

---

# Invariant 53 — Architecture Remains Repository Independent

Guvna architecture SHALL remain capable of governing repositories in different Domains.

Repository-specific content MAY vary.

The architectural boundaries SHALL NOT depend upon one particular repository's:

- language;
- technology;
- workflow;
- filesystem organization;
- model provider;
- or implementation architecture.

---

# Invariant 54 — No Host-Specific Semantic Dependency

Guvna Core SHALL NOT depend semantically upon a specific Host Implementation.

The prohibited relationship is:

```text
Core Semantic Meaning
        │
        ▼
Specific Host
```

The required relationship is:

```text
Core Semantic Meaning
        │
        ▼
Semantic / SDK Contract
        │
        ▼
Any Compatible Host
```

---

# Invariant 55 — No Repository-Specific Runtime Fork Without Semantic Basis

Repository-specific governance SHOULD be represented through repository-owned projections conforming to Guvna Semantic Contracts.

A separate Runtime semantic fork SHALL NOT be created merely because a repository has specialized governance.

A Runtime semantic fork is justified only when the underlying Guvna semantic contract itself is intentionally different.

---

# Invariant 56 — Projection Identity Is Independent of Source Identity

A Governance Projection MAY have its own semantic identity.

That identity SHALL remain distinguishable from:

- Repository Understanding identity;
- Repository Governance identity;
- filesystem identity;
- Runtime identity;
- and implementation identity.

The projection identifies a realization.

The source identifies the meaning represented by that realization.

---

# Invariant 57 — Projection Version Is Independent of Repository Version

Governance Projection Version SHALL remain distinct from:

- Repository Understanding Version;
- Repository Governance Version;
- Guvna Semantic Contract Version;
- Projection Contract Version;
- Runtime Version;
- SDK Version;
- and Host Version.

A projection MAY be regenerated without changing repository meaning.

---

# Invariant 58 — Semantic Identity Is Independent of Location

Semantic Identity SHALL remain independent of:

- path;
- filename;
- directory;
- ordering;
- and Host navigation.

Artifacts MAY move without changing semantic identity.

---

# Invariant 59 — Resolution Does Not Establish Authority

A mechanism that resolves an artifact identifies where it can be found.

It does not establish:

- acceptance;
- authority;
- current applicability;
- or Repository Truth.

Resolution and authority SHALL remain distinct.

---

# Invariant 59a — Authority Freshness Precedes Acceptance

Before an Acceptance transition is finalized, the Runtime boundary SHALL revalidate that the acting principal currently holds Repository Authority for the affected Governed Repository. A stale or cached authority state SHALL NOT be treated as sufficient for Acceptance. Where revalidation cannot be performed or fails, Acceptance SHALL fail closed; recommendation and candidate generation MAY still proceed as non-authoritative activity.

---

# Invariant 60 — Cache State Is Derived

Caches MAY accelerate semantic resolution.

Caches SHALL preserve sufficient:

- semantic identity;
- semantic version;
- contract version;
- and repository context

to determine what state they represent.

A cache SHALL NOT become authority because it is:

- faster;
- local;
- newer by timestamp;
- or easier to access.

---

# Invariant 61 — Architectural Traceability

Every major architectural concept SHALL remain traceable to:

- constitutional doctrine;
- canonical model;
- Semantic Contract;
- Projection Contract;
- or another explicitly governing architectural concept.

Architecture SHALL NOT introduce unexplained semantic authority.

---

# Invariant 62 — Architectural Separation

Architectural Doctrine SHALL remain distinct from:

- constitutional ontology;
- canonical epistemology;
- implementation details;
- operational procedures;
- and generated source.

Architecture explains:

- structure;
- responsibility;
- dependency;
- boundaries;
- and realization.

It does not redefine the meaning of the concepts it realizes.

---

# Invariant 63 — Preservation

Architectural transformations SHALL preserve:

- semantic identity;
- semantic ownership;
- authority;
- provenance;
- version;
- compatibility;
- and realization boundaries.

No architectural transformation may silently collapse:

```text
Meaning
    ≠
Contract
    ≠
Implementation
    ≠
Execution
    ≠
Evidence
```

---

# Invariant 64 — Semantic Compilation Does Not Ratify

Semantic Compilation SHALL NOT, by compilation alone, establish a Semantic Contract as applicable.

Generation, successful validation, persistence, or Runtime availability SHALL NOT substitute for Contract Ratification.

---

# Invariant 65 — Candidate Contracts Are Non-Applicable

A Candidate Semantic Contract SHALL remain non-applicable until the governing ratification condition is satisfied.

A candidate MAY be inspected, validated, compared, tested, or used for impact analysis. It SHALL NOT silently govern Runtime interpretation.

---

# Invariant 66 — Ratification Is Attributable

Contract Ratification SHALL preserve sufficient provenance to determine:

- the semantic source;
- candidate contract identity;
- candidate contract version;
- validation result;
- ratification event;
- ratified contract version;
- applicable scope;
- and supersession or retirement relationships where applicable.

---

# Invariant 67 — Ratification Does Not Create Meaning

Contract Ratification establishes applicability of an already-defined semantic contract.

It SHALL NOT be used to introduce repository-specific truth or otherwise create Guvna meaning that is absent from the governing semantic source.

---

# Invariant 68 — Material Semantic Change Requires Semantic Versioning

A material change to contract meaning or semantic obligation SHALL be represented as a semantic contract evolution rather than disguised as an implementation-only change.

A representation-only or implementation-only change MAY preserve the existing semantic contract version when semantic equivalence is established.

---

# Invariant 69 — Projection Contracts Are Strict Specializations

A Projection Contract SHALL specialize an applicable Semantic Contract without weakening or redefining its governing semantic obligations.

A projection SHALL conform to both its applicable Semantic Contract and its applicable Projection Contract.

---

# Invariant 70 — Runtime Interpretation Is Contract-Bounded

Runtime MAY interpret governed inputs only within the semantics established by the applicable Semantic Contract and applicable Projection Contract.

Runtime SHALL NOT introduce new semantic obligations merely to accommodate an implementation convenience, an unexpected projection shape, or a missing contract rule.

---

# Invariant 71 — Adopted Semantic Contract Is Explicit

A Governed Repository SHALL be able to identify the Semantic Contract it has adopted for the applicable governed scope.

Adoption of a Guvna Semantic Contract SHALL remain distinct from Repository Acceptance.

Repository Acceptance establishes repository-specific meaning; contract adoption establishes which applicable Guvna semantic contract governs its interpretation.

---

# Invariant 72 — Compatibility Is Multi-Dimensional

Compatibility SHALL be evaluated across the applicable semantic dimensions rather than reduced to a single version comparison.

The canonical compatibility vocabulary SHALL distinguish:

- **Compatible** — the existing semantic state remains valid under the candidate contract without semantic change or explicit adaptation;
- **Projection-compatible** — repository meaning remains valid, but one or more derived projections require regeneration or realignment;
- **Adaptable** — the existing semantic state remains valid, but an explicit compatibility adaptation is required before conformance;
- **Migration-required** — the semantic state itself must change before the candidate contract can be adopted or the realization can conform;
- **Incompatible** — the existing semantic state cannot conform within the permitted semantic boundary without an unresolved substantive conflict;
- **Indeterminate** — available information or evidence is insufficient to establish one of the other classifications.

A compatibility classification SHALL be interpreted according to the semantic boundary being evaluated. Projection-compatible applies where derived projection state is the affected dimension; Migration-required applies where semantic state must change; Adaptable applies where explicit compatibility adaptation can preserve the existing semantic state.

Indeterminate compatibility SHALL NOT be treated as Compatible or Incompatible.

---

# Invariant 73 — Multiple Compatible Projections May Coexist

Multiple Governance Projections MAY coexist when each has an explicit identity, version, provenance, applicability, and compatibility relationship.

Coexistence SHALL NOT create ambiguity about which projection is applicable to a governed Runtime operation.

Runtime SHALL resolve the applicable projection deterministically according to the governing contract and repository state.

---

# Invariant 74 — Contract Ratification Is Distinct From Repository Acceptance

Contract Ratification and Repository Acceptance SHALL remain separate authority boundaries.

```text
Guvna Semantic Meaning
        │
        ▼
Semantic Contract
        │
        ▼
Contract Ratification
        │
        ▼
Applicable Contract

Repository-Specific Meaning
        │
        ▼
Repository Authority
        │
        ▼
Acceptance
        │
        ▼
Accepted Repository Meaning
```

Neither boundary may silently replace the other.

---

# Canonical Architectural Chain

The complete architecture is:

```text
                     GUVNA
                       │
               Governing Doctrine
                       │
                       ▼
                Canonical Models
                       │
                       ▼
             Architectural Doctrine
                       │
                       ▼
            Semantic Compilation
                       │
                       ▼
            Candidate Semantic Contract
                       │
                       ▼
              Semantic Validation
                       │
                       ▼
               Contract Ratification
                       │
                       ▼
            Applicable Semantic Contract
                       │
              ┌────────┴────────┐
              ▼                 ▼
      Runtime / SDK      Projection Contract
              │                 │
              ▼                 ▼
           Hosts        Governance Projection
                                │
                                ▼
                       Governed Repository
```

The repository-specific semantic path is:

```text
Repository Knowledge
        │
        ▼
Repository Understanding
        │
        ▼
Repository Governance
        │
        ▼
Repository Projection Compilation
        │
        ▼
Governance Projection
        │
        ▼
Projection Contract
        │
        ▼
Runtime
```

The Runtime Contract Boundary is where Guvna-owned interpretation meets repository-owned content.

---

# Semantic Evolution Chain

Semantic evolution SHALL be understood as an impact graph rather than a mandatory linear release chain.

The conceptual model is:

```text
                 Candidate Semantic Contract N+1
                              │
                              ▼
                     Semantic Validation
                              │
                              ▼
                      Contract Ratification
                              │
                              ▼
                 Applicable Semantic Contract N+1
                       /          |          \
                      /           |           \
                     ▼            ▼            ▼
                 Runtime    SDK Contract   Projection Contract
                    │           │                 │
                    ▼           ▼                 ▼
                  Hosts       Hosts        Governance Projection
                                                   │
                                                   ▼
                                            Governed Repository
```

The Semantic Delta determines which branches require change.

A compatible branch may remain unchanged.

---

# Repository Alignment Chain

Where repository-specific change is required:

```text
Semantic Delta
       │
       ▼
Repository Impact Analysis
       │
       ▼
Candidate Alignment
       │
       ▼
Repository Authority
       │
       ▼
Authority Decision
       │
       ▼
Acceptance
       │
       ▼
Updated Repository Knowledge
       │
       ▼
Updated Repository Understanding
       │
       ▼
Updated Repository Governance
       │
       ▼
Repository Projection Compilation
       │
       ▼
Updated Governance Projection
```

This chain SHALL preserve repository ownership.

---

# Final Architectural Principle

> **Meaning precedes realization.**
>
> **Guvna doctrine defines Guvna meaning.**
>
> **Semantic Contracts define executable obligations; ratification establishes which contract is applicable.**
>
> **Projection Contracts define the obligations of derived projection classes.**
>
> **Guvna Semantic Compilation formally expresses Guvna semantics; Contract Ratification establishes applicability.**
>
> **Governed Repositories own repository-specific meaning.**
>
> **Repository Projection Compilation realizes repository meaning within Guvna contracts.**
>
> **Runtime enforces contracts; it does not invent them.**
>
> **SDKs expose contracts; they do not own them.**
>
> **Hosts realize interaction; they do not become authorities.**
>
> **Execution produces Evidence; Evidence does not silently become truth.**
>
> **Semantic evolution produces an explicit Semantic Delta.**
>
> **Downstream impact is evaluated rather than assumed.**
>
> **Guvna semantic history and Governed Repository semantic history remain distinct.**
>
> **Cross-boundary provenance preserves their relationship without merging ownership.**
>
> **Repository alignment remains repository-owned and authority-governed.**
>
> **No realization becomes the source of meaning merely because it is executable, persistent, convenient, or first.**
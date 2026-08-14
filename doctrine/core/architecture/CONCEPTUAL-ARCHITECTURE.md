# Conceptual Architecture

## Purpose

This document is Architectural Doctrine.

It defines the enduring conceptual architecture through which Guvna Core realizes accepted governing doctrine and provides governed semantic capabilities to Governed Repositories and Host Implementations.

It defines the relationships among:

- governing doctrine;
- canonical models;
- architectural doctrine;
- Semantic Contracts;
- Projection Contracts;
- Semantic Compilation;
- Repository Projection Compilation;
- Runtime;
- SDK;
- Host Implementations;
- Governed Repositories;
- Repository Understanding;
- Repository Governance;
- semantic evolution;
- compatibility;
- repository alignment;
- evidence;
- provenance;
- and history.

It does not establish Repository Truth.

It does not redefine constitutional doctrine.

It does not redefine canonical models.

It does not prescribe:

- a programming language;
- a Runtime implementation;
- an SDK implementation;
- a Host technology;
- a persistence technology;
- a transport;
- a filesystem layout;
- a model provider;
- or a deployment topology.

It defines the conceptual boundaries within which those realizations SHALL operate.

---

# Architectural Status

Architectural Doctrine is subordinate to accepted governing doctrine and canonical models.

Architectural concepts are first-class concepts within this document.

Architectural concepts derive from accepted governing doctrine and canonical models but are not themselves constitutional ontology or canonical epistemology unless explicitly established by higher-order doctrine.

Architectural concepts SHALL:

- be explicitly defined;
- remain semantically attributable;
- preserve provenance;
- remain distinguishable from implementation concerns;
- and remain traceable to the accepted concepts they realize.

Architectural Doctrine SHALL NOT:

- silently introduce constitutional ontology;
- silently redefine canonical concepts;
- silently relocate Repository Authority;
- or silently transfer ownership between Guvna and a Governed Repository.

---

# Architectural Principle

The architecture preserves the distinction between:

> **what Guvna means;**

> **what a Governed Repository means;**

> **how Guvna meaning is expressed as executable contracts;**

> **how repository meaning is projected into those contracts;**

> **how those contracts are realized;**

> **and what actually occurs during execution.**

The primary architecture is therefore:

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
               Semantic Contracts
                       │
                       ▼
              Guvna Semantic Compilation
                       │
            ┌──────────┼───────────┐
            ▼          ▼           ▼
         Runtime      SDK      Contract Artifacts
            │
            ▼
       Runtime Directives
            │
            ▼
          Hosts
```

Repository-specific semantics enter through a distinct path:

```text
             GOVERNED REPOSITORY
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
             Runtime Contract
```

These two semantic paths meet at an explicit contract boundary.

The Governed Repository supplies repository-specific meaning.

Guvna supplies the semantic contract through which that meaning is interpreted and enforced.

Neither domain silently replaces the other.

---

# Semantic Ownership

The architecture SHALL preserve the following ownership model:

| Concern | Semantic Owner | Primary Realization |
|---|---|---|
| Governing doctrine | Guvna | Doctrine artifacts |
| Canonical models | Guvna | Canonical artifacts |
| Architectural doctrine | Guvna | Architectural artifacts |
| Semantic Contracts | Guvna | Versioned contracts |
| Projection Contracts | Guvna | Versioned contract specializations |
| Semantic Compilation | Guvna | Semantic compiler |
| Repository Projection Compilation | Governed Repository under Guvna contract | Projection compiler |
| Runtime semantics | Guvna | Runtime realizations |
| SDK contract semantics | Guvna | SDK contract |
| Host interaction | Host | Host Implementation |
| Repository-specific truth | Governed Repository | Accepted Repository Knowledge |
| Repository Understanding content | Governed Repository | Knowledge Manifestations |
| Repository Governance content | Governed Repository | Governance artifacts |
| Governance Projection | Governed Repository under Guvna contract | Runtime-consumable projection |
Repository-specific acceptance | Repository Authority | Authority process defined by the Repository Authority Model |
| Execution | Runtime / Host | Execution realization |
| Execution evidence | Runtime / Host | Evidence artifacts |
| Guvna semantic history | Guvna | Guvna history |
| Repository semantic history | Governed Repository | Repository history |
| Cross-boundary provenance | Guvna / Governed Repository according to source | Provenance records |

Ownership means ownership of meaning.

It does not imply ownership of every physical representation.

## Authority Realization

Repository Authority is an authority relationship, not an inherent
property of an actor type.

A Governed Repository MAY realize Repository Authority through:

- a human authority;
- an explicitly delegated agent;
- or another authority subject permitted by the applicable
  Authority Model.

The realization of Repository Authority SHALL preserve:

- authority identity;
- delegation provenance where applicable;
- authority scope;
- permitted decision capabilities;
- applicable constraints;
- and acceptance provenance.

An agent participating in repository governance does not acquire
Repository Authority merely through participation, execution, or
model capability.

A delegated agent may exercise Repository Authority only within the
authority explicitly granted to it.

---

# Semantic Ownership Versus Content Ownership

Guvna Core owns the semantics and contracts for concepts such as:

- Repository Understanding;
- Repository Governance;
- Repository Adoption;
- Repository Intelligence;
- Runtime;
- SDK;
- provenance;
- compatibility;
- and projection.

A Governed Repository owns the actual repository-specific content expressed through those concepts.

Therefore:

> Guvna defines what Repository Understanding means.

while:

> the Governed Repository defines what its own accepted Repository Understanding contains.

Likewise:

> Guvna defines what Repository Governance means.

while:

> the Governed Repository defines its own accepted governance content.

And:

> Guvna defines how repository-specific meaning is interpreted.

while:

> Repository Authority remains responsible for acceptance of repository-specific meaning.

This distinction is fundamental.

---

# Architectural Layers

The architecture consists of the following conceptual layers.

## 1. Governing Layer

Contains accepted doctrine that governs Guvna.

Representative concerns include:

- constitutional doctrine;
- epistemic invariants;
- canonical models;
- architectural invariants.

This layer establishes stable governing meaning.

---

## 2. Semantic Contract Layer

Contains explicit machine-consumable expressions of accepted Guvna semantics.

Representative concerns include:

- Runtime semantics;
- adoption semantics;
- SDK obligations;
- Host obligations;
- projection obligations;
- compatibility;
- provenance;
- versioning;
- and state transitions.

This layer defines semantic obligations for conforming realizations.

---

## 3. Semantic Compilation Layer

Transforms accepted Guvna doctrine and canonical meaning into versioned semantic contracts and Guvna-owned executable realizations.

Representative concerns include:

- semantic contract generation;
- semantic validation;
- Runtime semantic generation;
- SDK contract generation;
- compatibility metadata;
- Semantic Delta generation;
- and provenance.

This layer is Guvna-owned.

It SHALL NOT consume repository-specific truth merely to define Guvna semantics.

---

## 4. Repository Projection Layer

Transforms accepted repository-specific knowledge and governance into representations conforming to Guvna Semantic Contracts.

Representative concerns include:

- governance normalization;
- Repository Projection Compilation;
- Governance Projections;
- projection metadata;
- repository compatibility metadata;
- and repository-specific provenance.

This layer is repository-specific.

Its interpretation remains governed by Guvna Semantic Contracts.

---

## 5. Runtime Layer

Runtime realizes accepted Guvna Semantic Contracts and evaluates applicable Governed Repository projections.

Runtime is responsible for:

- contract interpretation;
- validation;
- compatibility enforcement;
- governance evaluation;
- lifecycle enforcement;
- directive production;
- provenance;
- diagnostics;
- execution control;
- and evidence generation.

Runtime SHALL NOT become the semantic source of the contracts it executes.

---

## 6. SDK Layer

The SDK exposes Core-owned contracts and Runtime capabilities to Host Implementations.

The SDK provides:

- typed contract bindings;
- capability interfaces;
- transport;
- lifecycle integration;
- capability discovery;
- compatibility information;
- diagnostics;
- provenance;
- and other host-facing realization mechanisms.

The SDK does not own Guvna semantics.

---

## 7. Host Layer

Host Implementations realize Guvna capabilities within a host environment.

Hosts may provide:

- conversational interaction;
- UI;
- editor integration;
- CLI integration;
- model binding;
- workspace integration;
- transport;
- host lifecycle;
- and environmental services.

Hosts SHALL NOT redefine Guvna semantics.

---

## 8. Governed Repository Layer

A Governed Repository supplies repository-specific accepted meaning and governance.

It may contain:

- Repository Knowledge;
- Repository Understanding;
- Repository Governance;
- Domain-specific understanding;
- repository-specific constraints;
- repository-owned Knowledge Manifestations;
- governed capability artifacts;
- and Runtime-consumable projections.

The Governed Repository does not redefine Guvna Runtime semantics.

---

## 9. Evidence and History Layer

Evidence and History preserve what was:

- observed;
- accepted;
- transformed;
- generated;
- executed;
- rejected;
- superseded;
- aligned;
- or evolved.

This layer includes separate but related histories.

### Guvna Semantic History

Guvna Semantic History preserves the evolution of:

- governing doctrine;
- canonical semantic models;
- Architectural Doctrine;
- Semantic Contracts;
- Projection Contracts;
- Runtime semantics;
- SDK semantics;
- and other Guvna-owned meaning.

### Governed Repository Semantic History

Governed Repository Semantic History preserves the evolution of:

- Repository Knowledge;
- Repository Understanding;
- Repository Governance;
- authority decisions;
- acceptance;
- repository projections;
- repository-specific constraints;
- and repository-owned semantic artifacts.

### Cross-Boundary Provenance

Cross-boundary provenance preserves the relationship between:

- Guvna semantic versions;
- repository semantic versions;
- applicable contracts;
- projections;
- Runtime versions;
- and resulting evidence.

These histories SHALL remain distinguishable.

Neither history replaces the other.

---

# Semantic Contract

A Semantic Contract is a versioned expression of accepted Guvna semantics that defines the obligations and interpretation rules required of downstream realizations.

A Semantic Contract is a formally compiled semantic boundary between accepted Guvna meaning and realization. It is authoritative for conformance because its authority derives from accepted Guvna doctrine and its ratification; it is not an independent source of the underlying meaning.

A Semantic Contract defines, as applicable:

- concepts;
- data structures;
- operations;
- states;
- transitions;
- invariants;
- authority boundaries;
- provenance requirements;
- compatibility requirements;
- failure behavior;
- and realization obligations.

A Semantic Contract is distinct from:

- governing doctrine;
- a candidate contract;
- Contract Ratification;
- implementation;
- Runtime state;
- SDK state;
- Host state;
- repository state;
- and repository-specific governance content.

The relationship is:

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
Contract Ratification
        │
        ▼
Applicable Semantic Contract
        │
        ▼
Conforming Realizations
```

A Semantic Contract SHALL NOT establish Repository Truth.

It establishes the Guvna semantic obligations that downstream realizations SHALL honor.

---

# Runtime Contract

A Runtime Contract is a strict semantic specialization of an applicable Semantic Contract that defines the obligations and interpretation boundary for Runtime behavior.

A Runtime Contract MAY define:

- Runtime operations;
- Runtime states and transitions;
- directive semantics;
- execution preconditions;
- authority requirements;
- provenance requirements;
- failure semantics;
- lifecycle requirements;
- compatibility requirements;
- and Runtime-specific conformance requirements.

A Runtime Contract SHALL:

- derive from an applicable Semantic Contract;
- remain within the semantic boundary established by that parent contract;
- preserve the parent contract’s semantic obligations;
- and NOT introduce independent Guvna semantics.

If Runtime behavior requires genuinely new Guvna semantics, those semantics SHALL first be established through Semantic Contract evolution and only then specialized by a Runtime Contract.

The relationship is:

```text
Semantic Contract
        │
        ├──────────────► Runtime Contract
        ├──────────────► Adoption Contract
        ├──────────────► SDK Contract
        └──────────────► Projection Contract
```

A Runtime Contract is therefore Guvna-owned. Runtime remains a realization of the applicable Runtime Contract and does not become its semantic source.

---

# Contract Ratification

Contract Ratification is the governed process through which a validated Candidate Semantic Contract becomes an applicable Guvna Semantic Contract.

Contract Ratification SHALL NOT establish new Guvna meaning. It establishes that the candidate contract is an applicable formal expression of meaning already established by accepted Guvna doctrine.

A Candidate Semantic Contract SHALL be traceable to:

- the accepted Guvna doctrine from which it was compiled;
- the applicable canonical meaning;
- the semantic compilation process;
- validation results;
- provenance;
- and compatibility analysis.

Contract Ratification SHALL be distinct from Repository Authority, Authority Decision, and Repository Acceptance. It does not establish Repository Truth and does not authorize repository-specific semantic change.

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
        ├── semantic validation
        ├── compatibility analysis
        └── provenance validation
        │
        ▼
Contract Ratification
        │
        ▼
Applicable Semantic Contract
```

Where required contract semantics cannot be derived unambiguously from accepted Guvna doctrine, Semantic Compilation SHALL identify a semantic gap rather than resolve it through implementation inference.

---

# Semantic Contract Ownership

Semantic Contracts are Guvna-owned.

Governed Repositories consume Semantic Contracts.

Governed Repositories MAY provide repository-specific inputs where the contract explicitly defines an extension or projection boundary.

A Governed Repository SHALL NOT redefine a Guvna-owned Semantic Contract through local configuration.

Repository-specific meaning SHALL enter through explicitly defined repository semantic inputs.

---

# Semantic Contract Versioning

A Semantic Contract SHALL receive a new semantic version only when its semantic boundary materially changes.

Material semantic change includes, as applicable:

- changed semantic obligations;
- changed interpretation;
- changed states or transitions;
- changed invariants;
- changed authority requirements;
- changed provenance requirements;
- changed compatibility requirements;
- changed failure semantics;
- or other changes to the meaning or obligations exposed by the contract.

The following SHALL NOT, by themselves, require a new Semantic Contract version:

- documentation changes;
- source formatting;
- compiler implementation changes;
- generator implementation changes;
- Runtime implementation changes;
- SDK implementation changes;
- or other non-semantic implementation changes.

A change in source doctrine SHALL therefore be semantically evaluated before a Semantic Contract version is changed.

---

# Projection Contract

A Projection Contract is a specialized Semantic Contract that defines the semantic obligations governing a particular class of derived repository projection.

A Projection Contract MAY define:

- required projection identity;
- source identity requirements;
- source semantic version requirements;
- projection version;
- repository identity;
- applicable Guvna Semantic Contract;
- required provenance;
- projection structure;
- supported semantic features;
- compatibility requirements;
- lifecycle requirements;
- and validation requirements.

A Projection Contract does not define the repository-specific meaning contained within a projection.

A Projection Contract is a strict specialization of its parent Semantic Contract. It MAY constrain, specialize, or instantiate semantics already established by the parent contract. It SHALL NOT introduce independent Guvna semantics.

If a projection requires new Guvna semantics, those semantics SHALL first be established through Semantic Contract evolution and only then specialized by a Projection Contract.

It defines the obligations that a conforming projection SHALL satisfy.

The relationship is:

```text
Semantic Contract
        │
        ├──────────────► Runtime Contract
        │
        ├──────────────► Adoption Contract
        │
        ├──────────────► SDK Contract
        │
        └──────────────► Projection Contract
```

A Projection Contract is therefore Guvna-owned.

A Governance Projection conforming to that contract remains repository-owned.

---

# Governance Projection

A Governance Projection is a concrete repository-owned realization that conforms to an applicable Projection Contract.

The relationship is:

```text
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

The Projection Contract defines:

> **what makes the projection contractually valid.**

The Governance Projection provides:

> **the repository-specific meaning being projected.**

The Runtime performs:

> **contract-defined interpretation and enforcement.**

---

# Guvna Semantic Compilation

Guvna Semantic Compilation is the governed transformation through which accepted Guvna doctrine is formally expressed as candidate Semantic Contracts and Guvna-owned realizations.

The conceptual transformation is:

```text
Accepted Guvna Doctrine
        │
        ▼
Canonical Meaning
        │
        ▼
Guvna Semantic Compilation
        │
        ├──────────────► Semantic Contract
        │
        ├──────────────► Runtime Semantics
        │
        ├──────────────► SDK Contract Artifacts
        │
        ├──────────────► Projection Contract
        │
        ├──────────────► Compatibility Metadata
        │
        └──────────────► Conformance Artifacts
```

Guvna Semantic Compilation SHALL preserve:

- source identity;
- source semantic version;
- contract version;
- generator identity;
- generator version;
- provenance;
- and compatibility relationships.

Guvna Semantic Compilation SHALL NOT silently introduce repository-specific truth.

Semantic Contracts SHALL be derivable from accepted Guvna semantics without introducing semantic meaning not established by those semantics.

Where required contract semantics cannot be derived unambiguously, Semantic Compilation SHALL identify a semantic gap rather than resolve it through implementation inference.

Compilation SHALL produce a Candidate Semantic Contract until the applicable Contract Ratification process establishes it as an applicable Semantic Contract.

---

# Repository Projection Compilation

Repository Projection Compilation is the governed transformation through which accepted Governed Repository meaning is represented in forms consumable by Guvna contracts.

The conceptual transformation is:

```text
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
```

Repository Projection Compilation SHALL:

- preserve repository ownership;
- preserve repository provenance;
- preserve repository semantic identity;
- conform to the applicable Projection Contract;
- preserve compatibility metadata;
- and avoid introducing Guvna-wide semantic meaning.

It does not establish Repository Truth.

It realizes accepted repository meaning.

---

# Compiler Relationship

Guvna Semantic Compilation and Repository Projection Compilation MAY share:

- compiler infrastructure;
- schemas;
- generators;
- validation engines;
- serialization;
- tooling;
- or implementation components.

They SHALL remain distinct in semantic responsibility.

The distinction is:

```text
Guvna Semantic Compilation
    └── formally expresses Guvna meaning

Repository Projection Compilation
    └── realizes repository-specific meaning
```

A common implementation does not imply common semantic ownership.

---

# Runtime

Runtime is the realization boundary through which Guvna evaluates and executes applicable ratified Semantic Contracts and evaluates applicable repository governance.

Runtime may perform semantic interpretation and evaluation, but that interpretation SHALL remain bounded by the interpretation space explicitly established by the applicable Semantic Contract. Runtime SHALL have no independent semantic discretion.

Where the applicable contract does not determine a valid interpretation, Runtime SHALL NOT invent one. It SHALL produce the contract-defined ambiguity, incompatibility, or failure outcome.


Runtime consumes:

1. Guvna Semantic Contracts.
2. Compatible Governed Repository projections.
3. Runtime inputs.
4. Execution context.
5. Applicable authority state.
6. Required provenance.

Runtime produces:

- Runtime Directives;
- execution decisions;
- diagnostics;
- Evidence;
- and execution history.

Runtime SHALL NOT become:

- Repository Authority;
- Repository Truth;
- the source of Guvna semantics;
- or the source of repository-specific semantics.

---

# Runtime Contract Boundary

The Runtime Contract Boundary is where Guvna-owned interpretation meets repository-owned content.

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
                       ▲
                       │
              Repository Governance
                       ▲
                       │
             Repository Understanding
```

The Runtime interprets repository content according to the applicable contract.

The repository supplies content according to that contract.

Neither side silently changes the semantic meaning owned by the other.

---

# Runtime Directives

Runtime Directives are outputs of Runtime evaluation.

A Runtime Directive communicates an authorized operation or required Host behavior under:

- the applicable Semantic Contract;
- the applicable repository governance;
- and the applicable execution context.

Runtime Directives SHALL be:

- attributable;
- contract-conformant;
- provenance-preserving;
- and semantically versioned where required.

The relationship is:

```text
Semantic Contract
        │
        +
Governance Projection
        │
        ▼
      Runtime
        │
        ▼
Runtime Directive
        │
        ▼
      Host
```

A Host realizes the directive.

It does not redefine the directive.

---

# SDK

The SDK is a realization and compatibility boundary between Core-owned semantic contracts and Host Implementations.

The SDK MAY provide:

- contract bindings;
- typed operations;
- Runtime capabilities;
- directives;
- diagnostics;
- provenance;
- compatibility information;
- capability discovery;
- lifecycle integration;
- and transport.

The SDK SHALL NOT become an independent semantic authority.

SDK convenience abstractions SHALL NOT alter semantic meaning.

---

# Host Implementation

A Host Implementation realizes Guvna capabilities within a host environment.

A Host MAY provide:

- user interaction;
- conversational interfaces;
- editor integration;
- command-line integration;
- model binding;
- presentation;
- transport;
- persistence;
- workspace integration;
- and environmental services.

A Host SHALL NOT:

- establish Repository Truth;
- establish Repository Knowledge;
- redefine Semantic Contracts;
- bypass Runtime governance;
- silently reinterpret Runtime Directives;
- or infer repository governance from host presentation state.

---

# Governed Repository

A Governed Repository is a repository whose repository-specific meaning is governed through accepted Repository Knowledge, Repository Understanding, Repository Governance, and applicable Guvna Semantic Contracts.

A Governed Repository may contain:

- accepted Repository Knowledge;
- Repository Understanding;
- Repository Governance;
- Domain-specific knowledge;
- capability artifacts;
- projections;
- Evidence;
- history;
- and migration information.

Repository-specific semantics remain repository-owned.

Guvna provides the semantic machinery through which those semantics are interpreted and executed.

---

# Repository Understanding

Repository Understanding represents the Governed Repository's current accepted understanding of itself.

Repository Understanding supplies repository-specific semantic context.

It may include:

- Repository Identity;
- Domain;
- Mission;
- Vision;
- Operating Model;
- Authority Model;
- Governance Model;
- Knowledge System;
- Work System;
- Success Model;
- and accepted Domain-specific Understanding.

Repository Understanding is not a definition of Guvna Runtime semantics.

It is a repository-owned semantic input to Guvna Runtime.

---

# Repository Governance

Repository Governance is the accepted repository-specific expression of governance derived from Repository Understanding and accepted Repository Knowledge.

Repository Governance MAY express:

- policies;
- rules;
- invariants;
- constraints;
- authority requirements;
- work constraints;
- capability declarations;
- and repository-specific operating requirements.

Repository Governance SHALL remain subordinate to applicable Guvna Semantic Contracts.

Repository Governance may specialize the application of applicable Guvna semantics within the repository’s governed scope.

It SHALL NOT redefine Guvna-owned semantics.

---

# Governance Projection

A Governance Projection is a versioned, derived, repository-owned semantic realization of accepted Repository Governance suitable for Runtime consumption.

A Governance Projection is semantically meaningful but epistemically subordinate to the accepted repository semantics from which it is derived. Projection validity establishes conformance of the realization; it does not establish or re-establish Repository Truth.


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

A Governance Projection SHALL:

- identify its source;
- identify its repository;
- identify its repository semantic version;
- identify the applicable Projection Contract;
- identify the applicable Guvna Semantic Contract;
- preserve provenance;
- preserve compatibility metadata;
- and remain semantically valid for the Runtime that consumes it.

A Governance Projection does not become the source of repository governance merely because Runtime consumes it.

---

# Projection Identity

A Governance Projection SHOULD have its own semantic identity.

Projection identity SHALL remain distinct from:

- source Repository Understanding identity;
- source Governance identity;
- source Knowledge identity;
- filesystem location;
- generation timestamp;
- Runtime version;
- and implementation version.

Projection identity answers:

> What projected artifact is this?

The source identities answer:

> What accepted repository meaning does this projection represent?

These SHALL remain distinguishable.

Multiple Governance Projections MAY coexist when they are explicitly distinguished by source semantic state, Projection Contract, consumer or applicability boundary, or migration state.

Multiple projections SHALL NOT constitute multiple authorities for the same semantic scope. Two projections claiming the same source semantic state and applicability but containing materially conflicting meaning SHALL be treated as an integrity failure rather than as competing valid authorities.

---

# Projection Version

A Projection Version identifies the representation of repository semantics produced for a specific consumer, Projection Contract, or semantic state.

Projection Version SHALL remain distinguishable from:

- Repository Understanding Version;
- Repository Governance Version;
- Guvna Semantic Contract Version;
- Projection Contract Version;
- Runtime Version;
- SDK Version;
- and Host Version.

A projection MAY change without the underlying repository semantics changing.

Conversely, repository semantics MAY change while the projection representation remains structurally compatible.

Semantic compatibility must therefore be evaluated explicitly.

---

# Repository Projection Validity

Runtime SHALL evaluate a Governance Projection for:

- identity;
- version;
- repository identity;
- applicable Projection Contract;
- Guvna Semantic Contract compatibility;
- provenance;
- lifecycle state;
- semantic applicability;
- and required source relationships.

A projection SHALL NOT be considered valid merely because it parses.

---

# Filesystem Realization

Filesystem organization is a realization.

It SHALL NOT become semantic authority merely because:

- a file exists;
- a file occupies a conventional path;
- a directory has a conventional name;
- a filename follows a convention;
- or an artifact appears first in a directory.

Semantic identity remains independent of filesystem location.

---

# Runtime Discovery

Runtime MAY use filesystem conventions as a discovery optimization where an applicable contract explicitly permits them.

Discovery SHALL remain separate from interpretation.

Discovery answers:

> Where is the artifact?

The applicable Semantic Contract and Projection Contract answer:

> What does the artifact mean, and does it conform?

Filesystem conventions SHALL NOT silently become semantic interpretation rules.

---

# Semantic Evolution

Semantic Evolution is the governed process through which Guvna semantic meaning changes.

The conceptual relationship is:

```text
Accepted Doctrine N
        │
        ▼
Guvna Semantic Compilation
        │
        ▼
Semantic Contract N
```

followed by:

```text
Accepted Doctrine N+1
        │
        ▼
Guvna Semantic Compilation
        │
        ▼
Semantic Contract N+1
        │
        ▼
Semantic Delta
```

The Semantic Delta identifies affected realizations.

It does not itself mutate those realizations.

---

# Semantic Delta

A Semantic Delta describes the semantic difference between two Guvna semantic states.

It MAY identify:

- additions;
- removals;
- changed semantics;
- superseded concepts;
- changed authority requirements;
- changed lifecycle rules;
- changed provenance requirements;
- changed Runtime behavior;
- changed SDK obligations;
- changed Host obligations;
- changed Projection Contract requirements;
- changed repository projection requirements;
- and changed repository compatibility requirements.

A Semantic Delta SHALL be attributable to its source and target semantic versions.

A consumer SHALL NOT be required to infer semantic change from implementation differences alone.

---

# Impact Analysis

A Semantic Delta SHALL be capable of being evaluated against downstream consumers.

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

Each downstream realization MAY independently be Compatible, Adaptable, Migration-required, Incompatible, or Indeterminate according to the applicable contract. Repository projection state MAY additionally be classified as Projection-compatible where repository meaning remains valid but a derived projection requires regeneration or realignment. Repository compatibility SHALL use the explicit compatibility classifications defined by this architecture.

A semantic evolution SHALL NOT imply that every downstream realization must change.

---

# Runtime Evolution

Runtime evolution SHALL distinguish semantic evolution from implementation evolution.

## Implementation Evolution

A Runtime implementation MAY change while preserving the same Semantic Contract.

Examples include:

- performance improvements;
- internal refactoring;
- dependency updates;
- implementation replacement;
- generated-code optimization;
- infrastructure changes.

Such changes do not necessarily require:

- SDK semantic change;
- Host alignment;
- or repository alignment.

## Semantic Evolution

A Runtime semantic change alters a Semantic Contract.

Examples include:

- new semantic operations;
- changed authority requirements;
- changed lifecycle semantics;
- changed provenance requirements;
- changed interpretation;
- changed failure behavior;
- or changed Runtime Directive semantics.

Semantic evolution MAY affect Runtime, SDK, Hosts, Projection Contracts, projections, and repositories according to the Semantic Delta.

---

# Runtime Generation

Where Runtime artifacts are generated from accepted Guvna doctrine and Semantic Contracts, generation SHALL preserve:

- doctrine version;
- canonical model version where applicable;
- Semantic Contract version;
- compiler version;
- generation configuration;
- Runtime implementation version;
- generated artifact identity;
- and provenance.

Generated Runtime remains a realization.

It does not become the semantic source.

---

# SDK Evolution

SDK evolution SHALL be determined by Semantic Contract impact.

A new Runtime implementation does not necessarily require a new SDK version.

A Semantic Contract change MAY require an SDK change.

The dependency is therefore:

```text
Semantic Contract
        │
        ├──────────────► Runtime
        │
        └──────────────► SDK
```

rather than:

```text
Runtime Version
        ↓
SDK Version
```

Runtime and SDK versions remain independent implementation dimensions.

---

# Host Alignment

Host Implementations SHALL align to the applicable:

- Semantic Contract;
- Runtime contract;
- SDK contract;
- Projection Contract where applicable;
- and Runtime Directive semantics.

A Host SHALL NOT silently emulate unsupported semantics.

If a Host cannot faithfully realize an applicable contract, it SHALL:

- reject the incompatible contract;
- use an explicitly supported compatibility realization;
- or fail according to the applicable contract.

Host alignment is a semantic conformance concern.

---

# Governed Repository Compatibility

An adopted Governed Repository SHALL be capable of determining whether its current semantic state remains compatible with a new Guvna Semantic Contract.

The conceptual relationship is:

```text
Current Repository Semantic State
             │
             ▼
New Guvna Semantic Contract
             │
             ▼
Compatibility Analysis
             │
       ┌─────┴─────┐
       ▼           ▼
  Compatible     Affected
                    │
                    ▼
              Alignment Analysis
```

Repository compatibility is distinct from:

- Runtime compatibility;
- SDK compatibility;
- Host compatibility;
- Projection Contract compatibility;
- and serialization compatibility.

---

# Adopted Semantic Contract

A Governed Repository SHALL have an explicit relationship to the Semantic Contract version under which its governed semantics are currently adopted for the applicable Guvna boundary.

Adopted Semantic Contract state is a relationship between the Governed Repository and a Guvna-owned contract. It does not transfer ownership of repository-specific meaning to Guvna.

A new ratified Semantic Contract SHALL NOT automatically become the adopted Semantic Contract of an existing Governed Repository merely because it has been released, generated, or made available.

The repository remains governed by its currently adopted Semantic Contract until a governed alignment transition establishes adoption of a successor contract.

---

# Compatibility Classification

Compatibility between a Governed Repository and a candidate Semantic Contract SHALL be evaluated as a semantic relationship rather than by version comparison alone.

The applicable compatibility classification SHALL distinguish, at minimum:

- **Compatible** — the current repository semantic state remains valid under the candidate contract without semantic change or explicit adaptation;
- **Projection-compatible** — repository meaning remains valid, but one or more derived projections must be regenerated or realigned;
- **Adaptable** — the current repository semantic state remains valid, but an explicit compatibility adaptation is required before the candidate contract can be adopted;
- **Migration-required** — repository-owned semantic change is required before the candidate contract can be adopted;
- **Incompatible** — the repository cannot conform to the candidate contract without an unresolved substantive semantic conflict;
- **Indeterminate** — available information or evidence is insufficient to establish compatibility.

Indeterminate SHALL NOT be silently converted into Compatible or Incompatible.

Projection-compatible SHALL NOT be treated as repository semantic migration merely because a projection must be regenerated.

Contract compatibility is distinct from repository compatibility. A pair of Guvna contracts MAY be compatible while a particular repository remains incompatible, adaptable, projection-compatible, or migration-required because of its repository-specific semantic state.

---

# Repository Alignment

Where a Semantic Delta affects an adopted Governed Repository, a governed alignment process MAY be required.

The alignment process MAY identify:

- affected Repository Knowledge;
- affected Repository Understanding;
- affected Repository Governance;
- affected Projection Contracts;
- affected Governance Projections;
- affected repository-owned artifacts;
- new semantic requirements;
- obsolete semantics;
- and required authority decisions.

The conceptual relationship is:

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
        │
        ▼
Updated Repository Governance
        │
        ▼
Updated Governance Projection
```

Guvna semantic evolution SHALL NOT silently rewrite repository-owned meaning.

---

# Repository Alignment Is Not Guvna Evolution

The distinction SHALL remain explicit:

```text
Guvna Semantic Evolution
        ≠
Repository Semantic Evolution
```

Guvna changes:

- Guvna doctrine;
- Guvna contracts;
- Runtime semantics;
- SDK semantics;
- Projection Contracts;
- or other Guvna-owned meaning.

Repository evolution changes:

- accepted Repository Knowledge;
- Repository Understanding;
- Repository Governance;
- repository-specific constraints;
- repository-specific projections;
- or repository-specific artifacts.

Repository evolution remains subject to Repository Authority.

---

# Repository Semantic Versions

A Governed Repository MAY maintain semantic versions for:

- Repository Understanding;
- Repository Governance;
- Knowledge Manifestations;
- Governance Projections;
- and other repository-owned semantic artifacts.

These versions SHALL remain distinct from Guvna versions.

A repository does not become:

> "Repository Contract N+1."

Rather, it has a repository semantic state that:

> **conforms to, is compatible with, or requires alignment to a Guvna Semantic Contract.**

This preserves ownership.

---

# Compatibility Graph

The architecture SHOULD reason about compatibility as a graph rather than a single version chain.

Conceptually:

```text
                     Semantic Contract N+1
                       /       |        \
                      /        |         \
                     ▼         ▼          ▼
                 Runtime   SDK Contract  Projection Contract
                    │          │                │
                    ▼          ▼                ▼
                  Hosts      Hosts       Governance Projection
                                                  │
                                                  ▼
                                           Governed Repository
```

Each edge represents an explicit compatibility relationship.

A version change in one artifact does not automatically imply a version change in all others.

---

# Semantic History

Semantic history SHALL remain partitioned according to semantic ownership.

## Guvna Semantic History

Preserves evolution of:

- governing doctrine;
- canonical models;
- Architectural Doctrine;
- Semantic Contracts;
- Projection Contracts;
- Runtime semantics;
- SDK semantics;
- and other Guvna-owned semantic artifacts.

## Governed Repository Semantic History

Preserves evolution of:

- Repository Knowledge;
- Repository Understanding;
- Repository Governance;
- authority decisions;
- acceptance;
- Knowledge Manifestations;
- Governance Projections;
- repository-specific constraints;
- and other repository-owned semantic artifacts.

## Cross-Boundary History

Cross-boundary history preserves relationships among:

- Guvna Semantic Contract versions;
- repository semantic versions;
- Projection Contract versions;
- projection generations;
- Runtime versions;
- SDK versions;
- Host versions;
- and repository alignment events.

The existence of a cross-boundary relationship SHALL NOT merge semantic ownership.

---

# Conformance

An implementation conforms to this architecture when:

- semantic ownership remains attributable;
- Guvna-owned and repository-owned meaning remain distinct;
- Semantic Contracts are explicit;
- Projection Contracts are explicit where required;
- Guvna Semantic Compilation is distinct from Repository Projection Compilation;
- Runtime consumes contracts rather than inventing semantics;
- Governance Projections are repository-owned derived realizations;
- SDKs expose rather than redefine semantics;
- Hosts realize rather than redefine semantics;
- provenance survives transformations;
- semantic versions are explicit;
- implementation versions remain distinct;
- compatibility is evaluated semantically;
- Semantic Deltas identify downstream impact;
- existing repositories can be evaluated for alignment;
- Guvna and repository semantic histories remain attributable;
- and historical accepted state remains preserved.

Technical functionality alone does not establish architectural conformance.

Semantic conformance is required.

---

# Architectural Invariants

The architecture SHALL preserve the following invariants.

1. Governing doctrine is the source of Guvna-owned meaning.
2. Canonical models define stable canonical concepts.
3. Architectural Doctrine organizes realization without redefining canonical ontology.
4. Semantic Contracts make Guvna semantics machine-consumable.
5. Projection Contracts specialize Semantic Contracts for projection classes.
6. Guvna Semantic Compilation transforms accepted Guvna semantics into Guvna-owned realizations.
7. Repository Projection Compilation transforms accepted repository semantics into contract-conformant projections.
8. Runtime realizes Semantic Contracts.
9. Runtime does not become the source of the semantics it executes.
10. SDK exposes Runtime and contract capabilities.
11. Hosts realize SDK and Runtime behavior.
12. Governed Repositories own repository-specific meaning.
13. Repository Governance is subordinate to Guvna Semantic Contracts.
14. Governance Projections are derived repository-specific inputs to Runtime.
15. Runtime does not become Repository Authority.
16. SDK does not become semantic authority.
17. Host does not become semantic authority.
18. Model output does not become semantic authority.
19. Filesystem organization does not become semantic authority.
20. Projection does not become authority merely through persistence or execution.
21. Execution Evidence does not establish semantic truth.
22. Provenance survives semantic transformations.
23. Semantic versions remain distinct from implementation versions.
24. Technical compatibility does not imply semantic compatibility.
25. Semantic evolution is explicit.
26. Semantic Deltas are attributable.
27. Runtime generation remains traceable to accepted Guvna semantics.
28. Repository projections remain traceable to accepted repository semantics.
29. Existing Governed Repositories are not silently rewritten by Guvna evolution.
30. Repository alignment preserves historical accepted state.
31. Repository-specific acceptance remains external to Guvna Runtime.
32. Guvna Runtime semantics and Governed Repository semantics remain distinct.
33. Conversational model selection does not determine Repository-Work Execution Strategy.
34. Implementation concerns remain replaceable without changing semantic ownership.
35. A semantic change does not automatically require every downstream realization to change.
36. Repository Projection Compilation does not become a source of Guvna semantics.
37. Guvna Semantic Compilation does not become a source of repository-specific truth.
38. Guvna semantic history and repository semantic history remain distinct.
39. A Projection Contract does not become the source of repository meaning.
40. A Governance Projection remains subordinate to its source repository semantics and applicable contracts.

---

# Relationship to Repository Understanding

Repository Understanding provides the repository-specific semantic context required for governed operation.

The relationship is:

```text
Repository Knowledge
        │
        ▼
Repository Understanding
        │
        ├──────────────► Repository Governance
        │
        ├──────────────► Repository Work
        │
        └──────────────► Repository Projections
```

Repository Understanding does not define:

- Guvna Runtime semantics;
- SDK semantics;
- Host semantics;
- Semantic Contract semantics;
- or Guvna execution semantics.

Those are Guvna-owned.

---

# Relationship to Repository Intelligence

Repository Intelligence MAY assist with:

- gathering evidence;
- identifying relationships;
- discovering contradictions;
- generating Candidate Statements;
- evaluating Semantic Deltas;
- assessing repository impact;
- and recommending alignment.

Repository Intelligence remains non-authoritative.

It does not redefine:

- Semantic Contracts;
- Projection Contracts;
- Runtime semantics;
- Repository Authority;
- or accepted Repository Knowledge.

---

# Relationship to Repository Governance

Repository Governance specializes the Governed Repository's accepted understanding.

It operates within Guvna Semantic Contracts.

The relationship is:

```text
Guvna Semantic Contract
        │
        │ constrains interpretation
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

Repository Governance therefore provides repository-specific policy without becoming Guvna-wide semantic doctrine.

---

# Relationship to Repository Adoption

Repository Adoption establishes the accepted repository-specific understanding consumed by this architecture.

The conceptual relationship is:

```text
Authority
    │
    ▼
Authority Decision
    │
    ▼
Acceptance
    │
    ▼
Repository Knowledge
    │
    ▼
Repository Understanding
    │
    ▼
Repository Governance
    │
    ▼
Governance Projection
    │
    ▼
Runtime
```

No downstream realization may bypass the authority boundary.

---

# Relationship to Evidence and History

Realization produces Evidence.

Evidence preserves provenance.

History preserves accepted evolution.

The relationship is:

```text
Semantic Contract
        │
        ▼
Realization
        │
        ▼
Execution
        │
        ▼
Evidence
        │
        ▼
History
```

Guvna semantic history and repository semantic history remain distinct according to semantic ownership.

---

# Relationship to Workspace

The Guvna Workspace is a realization environment for the architecture.

It may contain:

- doctrine;
- canonical models;
- Semantic Contracts;
- Projection Contracts;
- generated Runtime artifacts;
- SDK artifacts;
- projection tooling;
- tests;
- documentation;
- and other realization artifacts.

The physical organization of the workspace does not itself establish semantic authority.

The workspace realizes the architecture.

It does not redefine it.

---

# Architectural Evolution

Architectural Doctrine is intended to remain stable while allowing implementation and semantic contracts to evolve.

The architecture distinguishes:

### Doctrinal Evolution

Changes what Guvna means.

### Semantic Contract Evolution

Changes machine-consumable meaning or obligations.

### Implementation Evolution

Changes how a contract is realized without changing its meaning.

### Repository Evolution

Changes accepted repository-specific meaning.

### Projection Evolution

Changes a derived repository representation without necessarily changing the underlying repository semantics.

These evolutions SHALL remain distinguishable.

---

# Preferred Evolution Model

The preferred Guvna evolution model is:

```text
1. Accepted Doctrine Changes
        │
        ▼
2. Semantic Contract Changes
        │
        ▼
3. Semantic Delta
        │
        ├──────────────► Runtime Impact
        ├──────────────► SDK Impact
        ├──────────────► Host Impact
        ├──────────────► Projection Contract Impact
        └──────────────► Repository Impact
```

The corresponding Guvna realization process MAY be:

```text
Accepted Doctrine
    ↓
Semantic Compilation
    ↓
Candidate Semantic Contract
    ↓
Semantic Validation / Compatibility Analysis
    ↓
Contract Ratification
    ↓
Applicable Semantic Contract
    ↓
Runtime / SDK / Projection Contract Artifacts
    ↓
Validation
    ↓
Release
    ↓
Consumer Alignment
```

The repository side MAY be:

```text
Semantic Delta
    ↓
Repository Impact Analysis
    ↓
Candidate Alignment
    ↓
Repository Authority
    ↓
Acceptance
    ↓
Repository Projection Compilation
    ↓
Projection Regeneration
```

This is the architectural evolution model.

---

# Architectural Principle of Evolvability

Guvna SHALL prefer semantic evolution through versioned contracts and generated realizations over accumulating hardcoded semantic policy inside Runtime implementations.

The preferred architecture is:

```text
Doctrine
    ↓
Guvna Semantic Compilation
    ↓
Versioned Semantic Contract
    ↓
Generated / Realized Runtime
```

rather than:

```text
Doctrine
    ↓
Hardcoded Runtime Branches
    ↓
Accumulated Exceptions
    ↓
Unversioned Behavior
```

Runtime SHALL remain as small as practical while still enforcing:

- contract interpretation;
- semantic invariants;
- authority boundaries;
- provenance;
- compatibility;
- and execution safety.

Evolving Guvna semantics SHOULD be represented in versioned contracts and generated artifacts wherever practical.

Evolving repository semantics SHOULD remain in repository-owned Knowledge Manifestations and governed projections.

---

# Final Architectural Principle

> **Doctrine defines Guvna meaning.**
>
> **Canonical models define stable canonical concepts.**
>
> **Semantic Contracts define machine-consumable obligations within a ratified semantic boundary.**
>
> **Projection Contracts define the obligations of derived projection classes.**
>
> **Guvna Semantic Compilation formally expresses Guvna semantics.**
>
> **Governed Repositories provide repository-specific meaning.**
>
> **Repository Projection Compilation realizes repository meaning within Guvna contracts.**
>
> **Runtime enforces contracts; it does not invent them.**
>
> **SDKs expose contracts; they do not own them.**
>
> **Hosts provide interaction and environment realization; they do not become authorities.**
>
> **Evidence records what occurred.**
>
> **Guvna semantic history preserves Guvna evolution.**
>
> **Governed Repository semantic history preserves repository evolution.**
>
> **Cross-boundary provenance preserves their relationship without merging ownership.**
>
> **Semantic evolution produces explicit deltas.**
>
> **Downstream impact is evaluated rather than assumed.**
>
> **Repository alignment remains repository-owned and authority-governed.**
>
> **No realization becomes the source of meaning merely because it is executable, persistent, convenient, or first.**
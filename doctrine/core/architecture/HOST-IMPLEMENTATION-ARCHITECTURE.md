# Host Implementation Architecture

## Purpose

This document is Architectural Doctrine.

It defines the host-agnostic architectural position of Host Implementations within the Guvna Platform.

Host Implementations realize Guvna Core capabilities within host-specific environments while preserving:

- constitutional doctrine;
- canonical models;
- semantic contracts;
- authority boundaries;
- repository ownership;
- provenance;
- compatibility;
- and the distinction between semantic meaning and realization.

This doctrine does not define a particular host technology.

It does not privilege any specific Host Implementation.

It does not prescribe concrete SDK APIs.

It does not redefine Repository Adoption semantics.

It does not redefine Guvna Core semantics.

It does not make the first realized Host authoritative over subsequent Hosts.

A Host Implementation is a realization of the architecture.

It is not a source of the architecture.

---

# Architectural Position

A Host Implementation occupies the realization boundary between Guvna Core and a host environment.

The Host is responsible for realizing Core-provided capabilities within the interaction model and technical capabilities of the host.

The Host is therefore:

- downstream of Guvna semantic contracts;
- downstream of the applicable SDK contract;
- downstream of Runtime semantics;
- upstream of host-specific presentation and environment services;
- lateral to the Governed Repository;
- subordinate to Repository Authority where repository-specific acceptance is involved;
- independent of repository-specific semantic authority.

The fundamental relationship is:

```text
                    Guvna Core
                        │
                        ▼
                 Semantic Contract
                        │
                        ▼
                      Runtime
                        │
                        ▼
                       SDK
                        │
                        ▼
                Host Implementation
                   /           \
                  ▼             ▼
          Host Environment   User Interaction
```

The Governed Repository remains a separate semantic ownership boundary:

```text
Guvna Core
    │
    │ defines interpretation contract
    ▼
Runtime / SDK
    │
    │ consumes repository-specific semantics
    ▼
Governed Repository
    │
    └── owns repository-specific meaning
```

The Host does not become the semantic bridge between Guvna and the repository.

The applicable Guvna contracts provide that bridge.

---

# Fundamental Ownership Principle

Architectural responsibility follows semantic ownership.

The three primary ownership domains are:

| Domain | Owns |
|---|---|
| Guvna Core | Guvna semantics, canonical models, Semantic Contracts, Runtime semantics, SDK contracts, adoption semantics, provenance rules, compatibility semantics, and host-independent behavior |
| Governed Repository | repository-specific truth, accepted repository knowledge, repository-specific authority context, repository-specific governance content, and repository-owned semantic realizations |
| Host Implementation | host interaction, presentation, environment integration, lifecycle, transport, and host-specific realization |

The distinction is critical.

Guvna Core owns:

> **the semantic model and contract.**

The Governed Repository owns:

> **the repository-specific meaning expressed through that contract.**

The Host owns:

> **how those capabilities are presented and integrated into a host environment.**

---

# Semantic Ownership Versus Content Ownership

The following distinction SHALL be preserved:

```text
Guvna Core
    │
    ├── owns the semantics of
    │      Repository Understanding
    │      Repository Governance
    │      Repository Adoption
    │      Repository Intelligence
    │      Runtime
    │      SDK
    │
    ▼
Semantic Contract
    │
    ▼
Governed Repository
    │
    └── owns repository-specific content
```

Therefore:

> Guvna Core defines what Repository Understanding means.

It does not own the Governed Repository's actual understanding of itself.

Likewise:

> Guvna Core defines what Repository Governance means.

It does not own the Governed Repository's actual governance content.

And:

> Guvna Core defines how repository-specific meaning is interpreted.

It does not thereby become the authority for that repository-specific meaning.

---

# Host as Realization Boundary

Host Implementations are realization layers.

They MAY:

- present Core capabilities;
- collect user interaction;
- translate host events;
- invoke SDK operations;
- display Core results;
- integrate host services;
- manage host lifecycle;
- execute Core-prescribed host actions;
- and provide host-specific affordances.

They SHALL NOT:

- establish Repository Truth;
- independently establish Repository Knowledge;
- independently establish Repository Understanding;
- independently establish Repository Governance;
- redefine Semantic Contracts;
- redefine Runtime semantics;
- infer repository semantics from host organization;
- or transform Core semantics into host-local semantics without an attributable contract boundary.

The Host realizes.

It does not define.

---

# Host-Agnostic Principle

The architecture SHALL support multiple Host Implementations without changing:

- constitutional doctrine;
- canonical models;
- Semantic Contracts;
- Repository Adoption semantics;
- Runtime semantics;
- SDK contract semantics;
- or repository ownership boundaries.

A second Host Implementation SHALL be able to consume the same applicable contracts without requiring the first Host Implementation to become a semantic dependency.

The architecture SHALL permit:

- VS Code;
- JetBrains IDEs;
- CLI clients;
- web applications;
- desktop applications;
- CI/CD integrations;
- and future host environments

without changing Guvna semantics.

---

# First Host Has No Special Authority

The first realized Host Implementation does not acquire authority over:

- Guvna semantics;
- Runtime semantics;
- SDK semantics;
- Repository Understanding;
- Repository Governance;
- Repository Authority;
- or Governed Repository truth.

The first Host is evidence of realization.

It is not evidence of semantic ownership.

---

# Host Responsibilities

Host Implementations own:

- user interaction within the host;
- host-specific presentation;
- visualization;
- input capture;
- event handling;
- host lifecycle;
- host activation;
- host navigation;
- workspace integration;
- host-specific affordances;
- environment integration;
- transport;
- host service integration;
- adaptation of Core results to host-native presentation;
- execution of host-specific actions explicitly prescribed by Core;
- preservation of semantic provenance across the host boundary;
- and host-specific compatibility handling.

Host Implementations do not own:

- Repository Truth;
- accepted Repository Knowledge;
- Repository Authority;
- Repository Understanding content;
- Repository Governance content;
- Guvna Semantic Contracts;
- Runtime semantics;
- or SDK contract semantics.

---

# Core Responsibilities

Guvna Core owns:

- constitutional doctrine realization;
- canonical model realization;
- Architectural Doctrine;
- Semantic Contract semantics;
- Repository Intelligence semantics;
- Repository Understanding semantics;
- Repository Adoption semantics;
- Repository Adoption Information Contract;
- Repository Governance semantics;
- Runtime semantics;
- SDK contract semantics;
- provenance semantics;
- normalization semantics;
- projection contract semantics;
- compatibility semantics;
- workflow semantics;
- and all other host-independent Guvna behavior explicitly established by doctrine.

Core does not own:

- host UI;
- host event loops;
- host-specific navigation;
- host-specific presentation;
- host-specific lifecycle;
- host-specific environment integration;
- or repository-specific accepted content.

---

# Governed Repository Responsibilities

Governed Repositories own:

- repository-specific truth;
- accepted Repository Knowledge;
- repository-specific authority decisions;
- repository-specific authority context;
- repository-specific evidence;
- repository-specific Repository Understanding content;
- repository-specific Domain Understanding;
- repository-specific governance content;
- repository-owned Knowledge Manifestations;
- repository-owned capability artifacts;
- repository-specific constraints;
- repository-specific adoption outcomes;
- and repository-specific projections.

Governed Repositories do not own:

- Guvna constitutional semantics;
- Guvna Semantic Contracts;
- Guvna Runtime semantics;
- SDK semantics;
- or Host Implementation semantics.

---

# Semantic Boundary

The canonical ownership boundary is:

```text
                  GUVNA-OWNED
────────────────────────────────────────
Constitutional Doctrine
Canonical Models
Architectural Doctrine
Semantic Contracts
Runtime Semantics
SDK Semantics
Adoption Semantics
Compatibility Semantics
Provenance Semantics
                  │
                  │ semantic contract boundary
                  ▼
              REPOSITORY
────────────────────────────────────────
Repository Truth
Accepted Repository Knowledge
Repository Understanding Content
Repository Governance Content
Authority Context
Domain-Specific Knowledge
Repository-Owned Artifacts
                  │
                  │ realization boundary
                  ▼
                HOST
────────────────────────────────────────
Presentation
Interaction
Environment
Lifecycle
Transport
Host Affordances
```

The Host does not own the middle layer.

The Host realizes capabilities over it.

---

# SDK Boundary

The SDK is the primary programmatic boundary through which Host Implementations consume Guvna capabilities.

The relationship is:

```text
Guvna Core
    │
    ▼
Semantic Contract
    │
    ▼
SDK Contract
    │
    ▼
Host Implementation
```

The SDK SHOULD expose semantic concepts rather than implementation-specific structures.

The SDK MAY expose:

- Repository Identity;
- Repository Understanding;
- Repository Knowledge;
- Governance;
- Adoption;
- Runtime Directives;
- diagnostics;
- provenance;
- compatibility;
- semantic versions;
- contract versions;
- and host-facing interaction requests.

The SDK SHALL NOT require the Host to reconstruct Core semantics from low-level Runtime structures.

---

# SDK as Compatibility Boundary

The SDK is not merely a transport layer.

It is also a compatibility boundary.

The SDK SHALL make applicable compatibility information discoverable.

A Host SHALL be able to determine, where supported:

- which Semantic Contract versions are supported;
- which Runtime versions are supported;
- which SDK contract version is being consumed;
- which Runtime Directives are supported;
- and whether a required operation is semantically compatible.

Technical API compatibility alone does not establish semantic compatibility.

---

# Runtime Boundary

Runtime is a Core-owned realization of Guvna Semantic Contracts.

The relationship is:

```text
Accepted Guvna Semantics
        │
        ▼
Semantic Contract
        │
        ▼
Runtime
        │
        ▼
Runtime Directives
        │
        ▼
SDK
        │
        ▼
Host Implementation
```

The Host consumes Runtime Directives.

The Host does not reinterpret those directives into independent operational semantics.

---

# Runtime Directives

A Runtime Directive is a Core-produced instruction describing a host-realizable outcome.

A Runtime Directive MAY describe:

- an interaction;
- a presentation requirement;
- an execution request;
- a diagnostic;
- an adoption step;
- a repository alignment requirement;
- a user confirmation;
- a capability request;
- or another host-realizable action.

Runtime Directives SHALL preserve:

- semantic identity;
- applicable contract version;
- provenance;
- authority requirements;
- relevant repository context;
- and semantic status.

The Host realizes the directive.

It does not redefine the directive.

---

# Runtime Directive Interpretation

The Host MAY interpret a Runtime Directive to the extent necessary to realize it within the host.

For example:

```text
Core:
    Request repository authority confirmation.

Host:
    Render confirmation interaction.
```

The Host SHALL NOT reinterpret the directive as an independent semantic judgment:

```text
Host:
    Decide that the repository ought to accept.
```

The first is realization.

The second is semantic authority.

---

# Repository Context

A Host MAY provide repository context to Core.

Examples include:

- current repository;
- active workspace;
- selected resource;
- user interaction;
- repository location;
- host environment information;
- and requested capability.

The Host SHALL distinguish:

```text
Host Context
    ≠
Repository Meaning
```

Core determines the semantic significance of supplied context according to the applicable contract.

---

# Repository Access

Hosts MAY access repository resources through Core or SDK-defined mechanisms.

Direct host access MAY be necessary for:

- filesystem operations;
- editor APIs;
- terminal integration;
- host-native resource APIs;
- or other environment capabilities.

Such access SHALL NOT become an independent semantic authority.

Where a repository resource carries governed meaning, the Host SHALL preserve:

- semantic identity;
- semantic version where applicable;
- and provenance.

---

# Repository Adoption

Repository Adoption is a Core-owned semantic capability.

The Host realizes Repository Adoption through host interaction.

The Host does not define:

- adoption phases;
- information classes;
- acceptance semantics;
- evidence classification;
- provisional understanding;
- normalization semantics;
- projection semantics;
- or contract transitions.

The conceptual flow is:

```text
User
  │
  ▼
Host Interaction
  │
  ▼
SDK
  │
  ▼
Guvna Core Adoption
  │
  ├── Evidence
  ├── Provisional Understanding
  ├── Candidate Statements
  ├── Authority Decision
  ├── Acceptance
  ├── Acceptance Provenance
  ├── Normalized Knowledge
  └── Projection
  │
  ▼
SDK
  │
  ▼
Host Realization
```

The Host realizes the interaction.

Core owns the semantics.

Repository Authority owns repository-specific acceptance.

---

# Repository Adoption Host Responsibilities

During adoption, the Host MAY:

- present adoption questions;
- collect responses;
- display evidence;
- display Provisional Understanding;
- present Candidate Statements;
- request Authority Decisions;
- present acceptance interactions;
- show diagnostics;
- display accepted knowledge;
- and present normalized knowledge.

The Host SHALL NOT:

- silently modify adoption meaning;
- reinterpret acceptance;
- promote evidence to knowledge;
- treat Provisional Understanding as accepted;
- create acceptance independently;
- or establish Repository Authority.

---

# Acceptance Interaction

The Host may facilitate the interaction through which Repository Authority makes a decision.

The Host SHALL preserve the distinction:

```text
Authority Decision
        ≠
Acceptance
```

For example:

```text
Host:
    Present "Accept" action.

Repository Authority:
    Approves Candidate Statement.

Core:
    Apply Acceptance transition.

Repository:
    Gains accepted Repository Knowledge.
```

The Host does not perform the semantic transition merely because the Host rendered the control.

---

# Conversational Inference Model

A Host MAY bind a Conversational Inference Model for bounded conversational interaction.

The Conversational Inference Model may assist with:

- interpreting bounded authority responses;
- Candidate Statement generation;
- normalization support;
- conversational exchanges;
- clarification;
- and other Core-approved conversational tasks.

The model is not an authority.

The model does not independently establish:

- Repository Truth;
- Repository Knowledge;
- Repository Understanding;
- Repository Governance;
- or Repository-Work Execution Strategy.

The semantic boundary remains:

```text
Conversation
    │
    ▼
Conversational Model
    │
    ▼
Structured Interpretation
    │
    ▼
Core Validation / Normalization
    │
    ▼
Authority Boundary
    │
    ▼
Acceptance
```

---

# Conversational Model Versus Repository-Work Strategy

The Conversational Inference Model and Repository-Work Execution Strategy are separate semantic concerns.

The distinction SHALL remain explicit:

```text
Conversational Inference Model
        │
        └── conversation / bounded interpretation

Repository-Work Execution Strategy
        │
        └── planning / analysis / evaluation /
            implementation / mutation / validation
```

A Host MAY bind a concrete model for conversational inference.

A Host SHALL NOT allow that model selection to silently determine Repository-Work Execution Strategy.

Repository-Work Execution Strategy is resolved through Core Runtime and applicable repository governance.

The two MAY resolve to the same concrete model only when separate applicable policy produces that result.

---

# Model Selection

Model selection for conversational interaction is a Host realization concern when permitted by the applicable SDK contract.

Model selection for repository work is a Core-governed semantic concern.

The selections MAY happen to be identical.

That coincidence SHALL NOT collapse the semantic boundaries.

---

# Host Configuration

Host configuration MAY specify:

- provider credentials;
- model bindings;
- UI preferences;
- host integration settings;
- transport settings;
- environment-specific behavior;
- or host capabilities.

Host configuration SHALL NOT redefine:

- Semantic Contracts;
- Repository Authority;
- Repository Governance;
- Repository Understanding;
- Runtime semantics;
- or accepted repository knowledge.

---

# Host Extensions

A Host Implementation MAY provide host-specific extensions.

Extensions MAY include:

- commands;
- menus;
- views;
- editors;
- panels;
- notifications;
- workspace integrations;
- automation;
- and host-native actions.

Extensions SHALL remain downstream of Core semantics where they operate on governed repository meaning.

A Host extension SHALL NOT silently introduce a competing semantic authority surface.

---

# Multiple Hosts

Multiple Host Implementations MAY coexist.

A new Host SHALL consume the applicable Guvna contracts rather than requiring semantic changes merely to accommodate host conventions.

Differences in:

- presentation;
- navigation;
- interaction;
- lifecycle;
- transport;
- or environment

SHALL NOT create differences in repository meaning.

---

# Cross-Host Semantic Consistency

For equivalent:

- repository semantic state;
- Semantic Contract version;
- authority state;
- user intent;
- and applicable Runtime state,

different Hosts SHOULD produce semantically equivalent outcomes.

Presentation MAY differ.

Interaction mechanics MAY differ.

Semantic meaning SHALL NOT.

---

# Host Failure

Host failure SHALL NOT silently alter repository semantics.

Examples include:

- UI failure;
- host crash;
- network failure;
- transport failure;
- extension failure;
- rendering failure;
- or local cache corruption.

Host failures SHOULD preserve enough state and provenance for Core to determine whether an operation:

- did not begin;
- is incomplete;
- succeeded;
- failed;
- or requires recovery.

---

# Host Caching

Hosts MAY cache Core results for performance.

Cached state SHALL preserve sufficient:

- semantic identity;
- semantic version;
- contract version;
- repository identity;
- and lifecycle or validity state

to determine what semantic state the cache represents.

A Host cache SHALL NOT become an authority source merely because Core is temporarily unavailable.

Stale cached semantics SHALL be identifiable.

---

# Host Transport

Transport is a Host realization concern.

The transport mechanism MAY be:

- process communication;
- HTTP;
- WebSocket;
- local IPC;
- extension APIs;
- message passing;
- or another mechanism.

Transport SHALL preserve:

- semantic identity;
- provenance;
- contract version;
- request context;
- and response state.

Transport SHALL NOT redefine the meaning of transported objects.

---

# Host Lifecycle

Host lifecycle MAY determine when Core capabilities are:

- initialized;
- suspended;
- resumed;
- disconnected;
- or terminated.

Host lifecycle SHALL NOT determine semantic lifecycle.

For example:

```text
Host closed
    ≠
Repository Knowledge retired
```

and:

```text
Host restarted
    ≠
Repository Understanding changed
```

---

# Host Navigation

Host navigation is presentation state.

It MAY help users locate:

- repository artifacts;
- knowledge;
- governance;
- projections;
- diagnostics;
- or Runtime results.

Navigation SHALL NOT establish:

- semantic identity;
- authority;
- precedence;
- or acceptance.

The semantic identity of governed artifacts remains independent of Host navigation.

---

# Host Presentation

Host presentation MAY:

- summarize;
- visualize;
- format;
- group;
- filter;
- or otherwise render Core-provided information.

Presentation SHALL preserve epistemic status.

For example:

```text
Evidence
```

SHALL remain distinguishable from:

```text
Candidate Statement
```

and:

```text
Accepted Repository Knowledge
```

A Host SHALL NOT collapse these distinctions where doing so could change interpretation.

---

# Provenance Preservation

Hosts SHALL preserve provenance across semantic boundaries.

When a Host:

- displays;
- transports;
- stores;
- caches;
- or forwards

governed information, sufficient provenance SHALL remain available to identify its source and semantic status.

The Host SHALL NOT strip required provenance merely because the Host representation is simpler.

---

# Authority Preservation

Hosts SHALL preserve Repository Authority boundaries.

A Host MAY:

- request authority action;
- present an authority decision;
- capture an authority response;
- or facilitate acceptance.

A Host SHALL NOT:

- silently accept;
- silently reject;
- silently revise;
- or silently supersede

repository-specific meaning.

---

# Diagnostics

Host Implementations MAY render diagnostics produced by Core.

Diagnostics may include:

- incompatibility;
- missing information;
- stale projection;
- invalid transition;
- authority requirement;
- semantic conflict;
- or Runtime failure.

Diagnostics are non-authoritative.

They SHALL NOT silently modify repository semantics.

---

# Version Boundaries

A Host SHALL distinguish at minimum:

- Host Implementation Version;
- SDK Version;
- Runtime Implementation Version;
- Runtime Semantic Version where applicable;
- Guvna Semantic Contract Version;
- Repository Understanding Version;
- Repository Governance Version;
- and Governance Projection Version.

These versions MAY evolve independently.

Host implementation version SHALL NOT be treated as proof of semantic compatibility.

---

# Host Compatibility

Host compatibility SHALL be evaluated against the applicable:

- Semantic Contract;
- Runtime contract;
- SDK contract;
- Runtime Directive definitions;
- and Host realization requirements.

Technical API compatibility alone is insufficient.

A Host is semantically conformant only when it faithfully realizes the applicable contracts.

---

# Host Upgrade

A Host upgrade SHALL preserve compatibility with applicable semantic contracts.

A Host MAY upgrade independently when:

- host implementation changes;
- SDK compatibility remains intact;
- semantic meaning remains unchanged;
- and required Runtime Directives remain realizable.

A Host SHALL NOT silently reinterpret a new semantic contract as an older semantic contract.

---

# Semantic Contract Evolution

When a new Semantic Contract becomes available, the Host MAY be:

- compatible without change;
- compatible through a new SDK version;
- required to change;
- or incompatible.

The Semantic Delta determines the required action.

A Semantic Contract change does not automatically require every Host to change.

---

# Repository Alignment

A Host MAY participate in repository alignment workflows after Guvna semantic evolution.

The Host MAY:

- present impact analysis;
- present Candidate Changes;
- request authority interaction;
- display migration progress;
- display compatibility status;
- and expose diagnostics.

The Host SHALL NOT determine repository alignment independently.

The conceptual flow is:

```text
New Guvna Semantic Contract
        │
        ▼
Core Compatibility Analysis
        │
        ▼
SDK
        │
        ▼
Host
        │
        ▼
Repository Alignment Interaction
        │
        ▼
Repository Authority
        │
        ▼
Acceptance
        │
        ▼
Updated Repository State
```

Host participation remains realization.

Repository acceptance remains repository-owned.

---

# Repository-Work Execution

A Host MAY initiate repository work through the SDK.

The Host does not determine repository-work semantics independently.

The conceptual flow is:

```text
User Intent
    │
    ▼
Host
    │
    ▼
SDK
    │
    ▼
Core Runtime
    │
    ▼
Repository-Work Execution Strategy
    │
    ▼
Runtime Directives
    │
    ▼
Host Realization
```

The Host may provide:

- user intent;
- host context;
- selected resources;
- interaction state;
- and other host-owned inputs.

Core determines governed execution semantics.

---

# Mutation Boundary

Host Implementations SHALL NOT independently mutate governed repository state when that mutation is governed by Guvna semantics.

Where mutation requires Core governance, the Host SHALL invoke the applicable Core capability.

Runtime determines whether the mutation is:

- permitted;
- constrained;
- requires confirmation;
- requires authority;
- requires review;
- or prohibited.

The Host realizes the resulting directive.

---

# Host as Execution Surface

The Host is an execution surface, not an execution authority.

The architecture is:

```text
Runtime
    │
    ▼
Runtime Directive
    │
    ▼
Host
    │
    ▼
Host Execution
```

rather than:

```text
Host
    │
    ▼
Independent Semantic Interpretation
    │
    ▼
Mutation
```

---

# Host and Repository-owned Content

A Host MAY display or manipulate repository-owned content according to applicable Core contracts.

The Host SHALL preserve the distinction between:

```text
Repository-Owned Content
        ≠
Host-Owned Meaning
```

The Host may transform content for presentation.

It does not acquire semantic ownership through that transformation.

---

# Host and Semantic Identity

Hosts SHOULD preserve semantic identity when presenting governed artifacts.

A Host MAY navigate by:

- path;
- filename;
- search;
- index;
- semantic identity;
- or other mechanisms.

Navigation mechanism does not determine semantic identity.

The Host SHALL NOT infer canonical meaning solely from filesystem location.

---

# Host and Projections

Hosts MAY consume:

- Repository Understanding projections;
- Governance Projections;
- Knowledge Projections;
- Runtime Directives;
- indexes;
- summaries;
- and other derived artifacts.

Host consumption SHALL preserve the distinction between:

- source;
- projection;
- semantic version;
- provenance;
- and current applicability.

A Host SHALL NOT treat a projection as canonical merely because it is the most convenient representation.

---

# Host Conformance

A Host Implementation conforms to this architecture when it:

1. preserves Core semantic contracts;
2. preserves repository ownership;
3. faithfully realizes Runtime Directives;
4. preserves provenance;
5. preserves Repository Authority boundaries;
6. preserves epistemic status;
7. does not infer repository meaning from Host organization;
8. does not redefine Core contracts;
9. keeps conversational model binding separate from Repository-Work Execution Strategy;
10. handles incompatibility explicitly;
11. preserves semantic identity;
12. supports applicable contract versions;
13. remains replaceable by another Host without changing Guvna semantics;
14. does not silently mutate repository meaning;
15. and fails closed where required semantics cannot be faithfully realized.

---

# Architectural Invariants

Host Implementations SHALL preserve the following invariants:

1. Hosts are realization layers, not semantic authorities.
2. Guvna Core owns Guvna semantic contracts.
3. Governed Repositories own repository-specific meaning.
4. Hosts own host-specific presentation and environment realization.
5. Core defines the semantic model of Repository Understanding.
6. Core defines the semantic model of Repository Governance.
7. Repositories own their Repository Understanding content.
8. Repositories own their Repository Governance content.
9. Hosts do not establish Repository Truth.
10. Hosts do not establish Repository Knowledge.
11. Hosts do not establish Repository Authority.
12. Hosts do not independently establish Repository Understanding.
13. Hosts do not independently establish Repository Governance.
14. Hosts do not redefine Semantic Contracts.
15. Hosts realize Runtime Directives.
16. Hosts preserve Runtime Directive semantics.
17. Hosts preserve provenance.
18. Host presentation does not establish semantic status.
19. Host navigation does not establish semantic identity.
20. Host lifecycle does not establish semantic lifecycle.
21. Host cache state does not establish semantic authority.
22. Host configuration does not redefine Core semantics.
23. Host extensions do not establish competing semantic authority.
24. Conversational model selection does not determine Repository-Work Execution Strategy.
25. Host implementation version is distinct from semantic version.
26. SDK version is distinct from Runtime implementation version.
27. Repository semantic versions are distinct from Guvna semantic versions.
28. Technical API compatibility does not establish semantic compatibility.
29. Host upgrades do not automatically imply repository migration.
30. Repository alignment remains subject to Repository Authority.
31. Host failure does not silently alter repository meaning.
32. Multiple Hosts must remain semantically compatible.
33. Core must not depend semantically on a specific Host.
34. Repository-specific meaning must not become host-owned meaning.
35. Host-specific realization remains downstream of Core semantics.
36. Host participation in adoption remains subordinate to Repository Authority.
37. Host participation in repository alignment remains subordinate to Repository Authority.
38. Host mutation remains subordinate to Runtime governance.
39. Semantic identity remains independent of Host presentation.
40. A Host that cannot faithfully realize a required contract is not semantically conformant.

---

# Canonical Interaction Model

The complete Host interaction relationship is:

```text
                         User
                           │
                           ▼
                  Host Implementation
                           │
                           ▼
                          SDK
                           │
                           ▼
                    Guvna Core Runtime
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
       Repository      Repository    Repository
       Adoption       Intelligence   Governance
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                  Governed Repository
                           │
                           ▼
             Repository-specific meaning
```

The Host remains a realization surface.

Repository-specific meaning remains repository-owned.

Guvna semantic interpretation remains Core-owned.

---

# Host Evolution

Host Implementations SHALL be evolvable independently where semantic compatibility is preserved.

Host evolution MAY alter:

- UI;
- navigation;
- rendering;
- transport;
- lifecycle;
- interaction;
- model binding;
- workspace integration;
- or implementation technology.

Host evolution SHALL NOT silently alter:

- Semantic Contracts;
- Runtime semantics;
- Repository Authority;
- Repository-specific truth;
- or accepted Repository Knowledge.

---

# Architectural Principle

> **The Host is where Guvna is experienced, not where Guvna semantics are defined.**
>
> **Guvna Core defines semantic contracts and host-independent behavior.**
>
> **The Governed Repository owns its repository-specific truth, accepted knowledge, authority context, and governance content.**
>
> **The SDK carries Core contracts across the Host boundary.**
>
> **Runtime produces governed directives.**
>
> **The Host realizes those directives within its environment.**
>
> **Host interaction may facilitate authority, but it does not become authority.**
>
> **Host presentation may communicate meaning, but it does not become meaning.**
>
> **Host implementation may evolve independently when semantic compatibility is preserved.**
>
> **Repository alignment remains repository-owned and authority-governed.**
>
> **No Host Implementation becomes the source of meaning merely because it is the first, most visible, or most widely used realization.**
# Repository Adoption Information Contract

## Purpose

This document is Architectural Doctrine.

It defines the core-owned semantic information contract for Repository Adoption.

The contract specifies:

- the information exchanged during Repository Adoption;
- the semantic states through which adoption information progresses;
- the permitted transitions between those states;
- the authority boundary;
- provenance requirements;
- normalization requirements;
- projection requirements;
- compatibility requirements;
- and failure behavior.

The contract defines what information means and how that information may transition.

It does not prescribe:

- host UI mechanics;
- host-specific presentation;
- transport technology;
- programming language;
- storage technology;
- or implementation structure.

It does not establish Repository Truth.

It does not exercise Repository Authority.

It does not redefine the constitutional ontology of Repository Information, Repository Knowledge, Repository Intelligence, Repository Wisdom, Repository Truth, or Repository Authority.

It realizes those distinctions within the Repository Adoption boundary.

---

# Architectural Position

Repository Adoption is the governed process through which Guvna Core assists a Governed Repository in establishing or updating accepted Repository Understanding.

The architectural relationship is:

```text
Governed Repository
        │
        │ provides
        ▼
Authority Context + Repository Information
        │
        ▼
Repository Adoption
        │
        ├── Evidence
        ├── Provisional Understanding
        ├── Candidate Statements
        ├── Authority Decision
        ├── Acceptance
        ├── Acceptance Provenance
        ├── Normalized Repository Knowledge
        └── Knowledge Projection
        │
        ▼
Repository Understanding
```

The Host realizes the interaction.

Guvna Core owns the semantic contract.

Repository Authority owns repository-specific acceptance.

---

# Contract Ownership

Guvna Core owns:

- adoption semantics;
- information classes;
- semantic state definitions;
- transition rules;
- contract versioning;
- normalization semantics;
- provenance requirements;
- projection semantics;
- compatibility requirements;
- and fail-closed behavior.

The Governed Repository owns:

- repository-specific truth;
- authority context;
- repository-specific evidence;
- repository-specific decisions;
- accepted repository knowledge;
- and repository-specific Repository Understanding.

The Host owns:

- presentation;
- interaction;
- transport;
- host lifecycle;
- and host-specific realization.

---

# Fundamental Principle

> **The Host carries adoption information.**
>
> **Core defines what the information means.**
>
> **Repository Authority determines what becomes accepted.**

A Host SHALL NOT invent adoption semantics.

Guvna Core SHALL NOT become Repository Authority.

A model SHALL NOT become Repository Authority.

A Governed Repository MAY explicitly designate an authorized agent as
Repository Authority through its applicable Authority Model.

An agent designated as Repository Authority may exercise repository-specific
acceptance only within its declared authority scope, capabilities, and
conditions.

Agent participation, model capability, Runtime execution, or Host trust
does not independently establish Repository Authority.

A projection SHALL NOT become Repository Authority.

---

# Semantic Contract

This document defines a versioned Semantic Contract.

The contract version SHALL be explicit.

A contract version identifies the semantic interpretation rules governing:

- information classes;
- states;
- transitions;
- result kinds;
- provenance;
- compatibility;
- and failure behavior.

A contract version is distinct from:

- Runtime implementation version;
- SDK implementation version;
- Host implementation version;
- repository version;
- and model version.

---

# Contract Identity

A Repository Adoption Contract SHOULD expose:

- Contract Identity;
- Contract Version;
- Guvna Semantic Version;
- applicable Runtime Semantic Version;
- supported result kinds;
- supported transitions;
- and compatibility information.

Contract identity SHALL remain independent of:

- filename;
- filesystem location;
- Host Implementation;
- or SDK implementation version.

---

# Contract Applicability and Ratification

This document is a Semantic Contract. Its compilation, validation, and implementation are distinct
from its applicability.

The canonical Guvna-side relationship is:

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

Contract Ratification establishes that a validated candidate is the applicable formal expression
of already-established Guvna meaning.

Contract Ratification SHALL NOT:
- create new Guvna meaning;
- redefine accepted Guvna doctrine;
- establish repository-specific truth; or
- substitute for Repository Authority or Repository Acceptance.

Where this adoption contract is itself evolved, the candidate version SHALL remain non-applicable
until the applicable Guvna contract lifecycle establishes its applicability.

If required adoption semantics cannot be derived unambiguously from accepted Guvna doctrine, the
semantic compilation process SHALL identify a semantic gap rather than invent or silently infer
the missing semantics.

# Information Classes

The contract SHALL distinguish the following information classes.

## Authority Context

Authority Context identifies the repository-specific authority boundary participating in adoption.

It communicates:

- who may decide;
- what authority scope applies;
- what repository is governed;
- what decisions are permitted;
- and any repository-specific authority constraints.

Authority Context does not itself constitute a decision.

---

## Evidence

Evidence represents observed or declared information available to inform adoption.

Evidence MAY include:

- repository structure;
- source artifacts;
- configuration;
- documentation;
- execution records;
- declared practices;
- observed behavior;
- historical records;
- or other repository information.

Evidence MAY be:

- incomplete;
- contradictory;
- ambiguous;
- stale;
- or uncertain.

Evidence SHALL NOT establish Repository Truth by itself.

---

## Provisional Understanding

Provisional Understanding is a working synthesis derived from Evidence and interaction before Repository Authority acceptance.

It MAY contain:

- hypotheses;
- inferred relationships;
- candidate interpretations;
- unresolved questions;
- confidence;
- uncertainty;
- and supporting evidence.

Provisional Understanding SHALL remain explicitly non-authoritative.

It SHALL NOT be represented as accepted Repository Knowledge.

---

## Candidate Statements

Candidate Statements are proposed semantic statements prepared for Repository Authority review.

A Candidate Statement SHALL remain distinguishable from the Evidence supporting it.

A Candidate Statement MAY:

- summarize evidence;
- express a synthesized interpretation;
- identify a proposed repository invariant;
- propose a repository relationship;
- propose a repository constraint;
- or represent another candidate understanding.

A Candidate Statement does not become Repository Knowledge until the applicable Acceptance transition has occurred.

---

## Authority Decision

Authority Decision is the repository-specific decision made by Repository Authority regarding one or more Candidate Statements.

An Authority Decision MAY be:

- accept;
- reject;
- revise;
- defer;
- or otherwise resolve

a Candidate Statement according to the applicable contract.

Authority Decision is the authoritative judgment event.

Authority Decision and Acceptance SHALL remain distinguishable.

An Authority Decision of `accept` authorizes the Acceptance transition.

An Authority Decision of:

- `reject`;
- `defer`;
- or `revise`

does not establish Repository Truth for the affected Candidate Statement.

Authority Decision SHALL preserve:

- authority context;
- candidate identity;
- decision;
- provenance;
- and applicable semantic version.

---

## Acceptance

Acceptance is the semantic transition by which Repository Authority establishes that an accepted repository-specific meaning becomes Repository Truth.

Acceptance SHALL be explicit.

Acceptance SHALL be attributable to:

- the applicable Repository Authority;
- the relevant Authority Decision;
- the Candidate Statement or semantic subject being accepted;
- and the applicable contract version.

The canonical relationship is:

```text
Candidate Statement
        │
        ▼
Authority Decision
        │
        ├── reject
        ├── defer
        ├── revise
        │
        └── accept
                │
                ▼
            Acceptance
                │
                ▼
        Repository Truth
                │
                ▼
     Accepted Repository Knowledge
```

Acceptance SHALL NOT be inferred from:

- an `accept` label alone without an attributable authority transition;
- persistence;
- normalization;
- projection;
- execution;
- model confidence;
- consensus;
- or Host behavior.

Acceptance is the transition that establishes accepted repository-specific truth.

---

## Repository Authority Is Human

Repository Authority is realized only by a human principal, identified through an applicable authentication and authority-resolution surface external to Guvna Core.

A delegated agent MAY act under Repository Authority's explicit, scoped authorization. A delegated agent SHALL NOT itself constitute Repository Authority.

Authentication of a human principal is distinct from, and does not by itself establish, Repository Authority. Authority is established only by the applicable repository-specific recognition of that principal within a Governed Repository's Authority Context.

---

## Acceptance Provenance

Acceptance Provenance records how accepted Repository Knowledge was established.

It SHALL preserve the relationship among:

```text
Evidence
    │
    ▼
Candidate Statement
    │
    ▼
Authority Decision
    │
    ▼
Acceptance
    │
    ▼
Accepted Repository Knowledge
```

Acceptance Provenance SHOULD identify:

- source evidence;
- Candidate Statement identity;
- authority context;
- authority decision;
- acceptance identity;
- decision time;
- semantic contract version;
- and resulting accepted identity.

Acceptance Provenance SHALL remain distinct from the accepted knowledge itself.

It establishes lineage.

It does not independently establish authority.

---

## Acceptance Granularity

Acceptance SHALL apply at one of two granularities, determined by the nature of the subject:

- Single-artifact acceptance: applies to a single Guvna-generated Candidate Statement or artifact (for example, an ADR, PRD, RFC, spec, or plan) carrying its own semantic identity.
- Change-set acceptance: applies collectively to a set of repository realization mutations performed against a previously accepted plan or spec, where the mutations are accepted or rejected as one governed unit.

The applicable granularity SHALL be determined by the artifact or work's semantic identity and kind, not by Host convenience or transport batching.

---

## Normalized Repository Knowledge

Normalized Repository Knowledge is accepted repository knowledge represented in a canonical normalized form.

Normalization SHALL occur only after the applicable Acceptance transition has established acceptance.

Normalized Repository Knowledge MAY serve as the source for:

- Repository Understanding;
- governance artifacts;
- projections;
- Runtime-consumable representations;
- and other downstream realizations.

Normalization SHALL preserve provenance.

Normalization SHALL NOT silently change accepted meaning.

Where normalization requires semantic reinterpretation, the applicable authority process SHALL be invoked.

---

## Knowledge Projection

Knowledge Projection is a derived representation of normalized Repository Knowledge.

Examples include:

- prompts;
- summaries;
- guidance;
- indexes;
- host-facing views;
- generated documentation;
- Runtime-consumable representations;
- or other derived artifacts.

Knowledge Projection SHALL remain derivative.

It SHALL NOT become authoritative merely because it is:

- persisted;
- rendered;
- indexed;
- cached;
- executed;
- or consumed by Runtime.

Knowledge Projection SHALL preserve sufficient provenance to identify its source accepted knowledge and applicable contract version.

---

## Diagnostics

Diagnostics communicate:

- insufficiency;
- contradiction;
- ambiguity;
- invalid transition;
- incompatibility;
- missing authority;
- missing provenance;
- normalization failure;
- projection failure;
- or other contract violations.

Diagnostics SHALL preserve provenance.

Diagnostics SHALL NOT silently become Repository Knowledge.

---

# Semantic States

Repository Adoption SHALL distinguish information class from semantic lifecycle state.

The principal adoption states are:

```text
Unengaged
    │
    ▼
Authority Engaged
    │
    ▼
Evidence Gathered
    │
    ▼
Provisional Understanding
    │
    ▼
Candidate Statements
    │
    ▼
Authority Decision
    │
    ├───────────────┐
    │               │
    │ accept        │ reject / defer / revise
    ▼               │
Acceptance         │
    │               │
    ▼               │
Accepted Knowledge ◄┘
    │
    ▼
Normalized Knowledge
    │
    ▼
Projection
```

These states describe semantic status.

They are not required to correspond one-to-one with UI screens.

---

# Acceptance Lifecycle Vocabulary

The contract SHALL recognize the following statuses for a Candidate Statement or realization change set:

- candidate: proposed, not yet decided;
- accepted: Repository Authority has completed the Acceptance transition;
- rejected: Repository Authority has declined the Candidate Statement;
- superseded: a previously accepted status has been replaced by a later accepted status for the same semantic subject.

These four statuses are the minimum required vocabulary. A Host Implementation SHALL NOT introduce a competing status vocabulary for the same semantic subject.

---

# State Versus Information

A Host SHALL NOT assume that an information class and a state are the same thing.

For example:

```text
Evidence
```

is an information class.

```text
Evidence Gathered
```

is a state.

Likewise:

```text
Authority Decision
```

is an information class.

```text
Authority Decision Pending
```

is a state.

And:

```text
Acceptance
```

is a semantic transition rather than merely another representation of an Authority Decision.

This distinction allows the Runtime to reason about transitions without conflating the information carried by those states.

---

# Adoption Operations

The contract SHALL support the following semantic operations:

1. Engage Authority
2. Classify Interaction
3. Gather Evidence
4. Form Provisional Understanding
5. Prepare Candidate Statements
6. Request Authority Decision
7. Apply Acceptance
8. Record Acceptance Provenance
9. Normalize Accepted Knowledge
10. Project Knowledge
11. Route Follow-on Work

These operations describe semantic capabilities.

They do not prescribe how a Host presents them.

---

# Operation Identity

Each governed adoption operation SHOULD have an explicit semantic identity.

An operation identity SHOULD remain stable across implementation changes.

An operation version MAY change when the operation's semantics change.

This allows:

```text
Operation Identity
        +
Operation Version
        +
Contract Version
```

to determine the semantic interpretation of an operation.

---

# State Transitions

Transitions SHALL be explicit.

The contract SHALL distinguish:

```text
Current State
    +
Operation
    +
Required Preconditions
    +
Authority Context
    +
Contract Version
    =
Permitted Transition
```

A transition SHALL NOT be inferred merely from:

- UI state;
- Host state;
- successful parsing;
- model confidence;
- local implementation assumptions;
- or persistence.

---

# Required Adoption Phases

The contract SHALL organize Repository Adoption into the following semantic phases:

1. Engage repository authority.
2. Classify interaction intent.
3. Gather evidence and provisional understanding.
4. Prepare candidate statements.
5. Request authority decision.
6. Apply the resulting acceptance transition where authorized.
7. Record acceptance provenance.
8. Normalize accepted knowledge.
9. Project non-authoritative representations.
10. Route follow-on repository work.

The ordering is semantic.

It is not merely procedural.

---

# Phase 1 — Engage Repository Authority

The first semantic boundary is identification of the applicable Repository Authority.

The system SHALL establish sufficient Authority Context before treating repository-specific responses as authoritative.

The Host MAY facilitate this engagement.

The Host SHALL NOT invent Authority Context.

If required Authority Context cannot be established, adoption SHALL fail closed.

---

# Phase 2 — Classify Interaction Intent

Interaction SHALL be classified according to the applicable Core-defined semantic categories.

The purpose of classification is to determine what kind of semantic operation the interaction represents.

Classification MAY distinguish:

- clarification;
- evidence provision;
- correction;
- acceptance;
- rejection;
- deferral;
- revision;
- or other contract-defined intent.

Host-local classification SHALL NOT override Core-defined semantic categories.

---

# Phase 3 — Gather Evidence

Evidence SHALL be gathered without silently promoting it to accepted knowledge.

Evidence MAY be:

- collected;
- grouped;
- summarized;
- compared;
- correlated;
- or analyzed.

Such processing SHALL preserve the distinction between:

```text
Observed Evidence
        ≠
Derived Interpretation
```

---

# Phase 4 — Form Provisional Understanding

Core MAY synthesize Provisional Understanding from:

- Evidence;
- repository context;
- prior accepted knowledge;
- and bounded interaction.

Provisional Understanding SHALL remain explicitly non-authoritative.

Uncertainty SHALL be preserved.

Unsupported assumptions SHALL NOT be silently promoted to accepted meaning.

---

# Phase 5 — Prepare Candidate Statements

Candidate Statements SHALL express proposed repository meaning separately from the evidence supporting that meaning.

A Candidate Statement SHOULD identify:

- statement identity;
- semantic content;
- supporting evidence;
- uncertainty;
- provenance;
- and applicable authority context.

Candidate Statements SHALL remain mutable until authority resolution.

---

# Phase 6 — Request Authority Decision

Candidate Statements SHALL be presented to Repository Authority for decision.

The Host MAY:

- display;
- explain;
- collect;
- and relay

the Candidate Statement.

The Host SHALL NOT:

- accept;
- reject;
- revise;
- or defer

the Candidate Statement independently where those actions constitute Repository Authority.

---

# Phase 7 — Apply Acceptance

Where Repository Authority has issued an `accept` Authority Decision, the contract SHALL apply the corresponding Acceptance transition.

Acceptance SHALL:

- identify the accepted semantic subject;
- identify the Authority Decision;
- establish accepted Repository Truth;
- establish accepted Repository Knowledge;
- preserve provenance;
- and advance the adoption state.

Where the Authority Decision is:

- `reject`;
- `defer`;
- or `revise`;

the Acceptance transition SHALL NOT occur.

An Authority Decision SHALL therefore remain distinguishable from the resulting semantic state.

---

# Phase 8 — Record Acceptance Provenance

An accepted Candidate Statement SHALL produce Acceptance Provenance.

The provenance record SHALL establish:

```text
Source
  ↓
Evidence
  ↓
Candidate Statement
  ↓
Authority Context
  ↓
Authority Decision
  ↓
Acceptance
  ↓
Accepted Knowledge
```

Acceptance without sufficient provenance SHALL be treated as incomplete where provenance is required by the contract.

---

# Phase 9 — Normalize Accepted Knowledge

Normalization SHALL operate only on accepted repository knowledge.

Normalization MAY:

- canonicalize representation;
- assign semantic identity;
- establish normalized structure;
- resolve representation differences;
- or produce canonical forms.

Normalization SHALL NOT silently alter accepted meaning.

If normalization requires semantic reinterpretation, the applicable authority process SHALL be invoked.

---

# Phase 10 — Project Knowledge

Projection SHALL operate on normalized accepted knowledge.

Projection MAY generate:

- Host views;
- indexes;
- prompts;
- summaries;
- guidance;
- governance artifacts;
- Runtime-consumable projections;
- or other derived representations.

Projection SHALL preserve source identity and provenance.

---

# Phase 11 — Route Follow-on Work

Repository Adoption MAY produce follow-on work.

Follow-on work SHALL be derived from accepted semantics.

It SHALL NOT be generated solely from:

- Host heuristics;
- provisional understanding;
- model speculation;
- or unaccepted Candidate Statements.

Where work could mutate repository state, the applicable Repository Governance and Runtime contracts SHALL apply.

---

# State Machine

The conceptual state machine is:

```text
                    ┌──────────────────────┐
                    │      Unengaged       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Authority Engaged   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Evidence Gathered  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Provisional     │
                    │     Understanding    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Candidate Statements│
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Authority Decision  │
                    └───────┬──────┬───────┘
                            │      │
                    accept  │      │ reject / defer / revise
                            │      │
                            ▼      ▼
                  ┌──────────────────────┐
                  │      Acceptance      │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │ Accepted Knowledge   │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │ Normalized Knowledge │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │ Knowledge Projection │
                  └──────────────────────┘
```

The `reject`, `defer`, and `revise` outcomes do not transition to Acceptance.

They MAY transition to a contract-defined follow-up state.

The exact transition graph MAY be represented in a machine-readable contract artifact.

The semantic meaning of the transitions SHALL remain governed by this contract.

---

# Rejection

A rejected Candidate Statement SHALL NOT become accepted Repository Knowledge.

The rejected statement MAY remain as historical evidence or provenance.

Rejection SHALL preserve:

- Candidate Statement identity;
- authority context;
- decision;
- provenance;
- and applicable semantic version.

---

# Deferral

A deferred Candidate Statement SHALL remain unresolved.

Deferral SHALL NOT be interpreted as:

- acceptance;
- rejection;
- or permission to proceed as though accepted.

Follow-on work that requires the deferred meaning SHALL remain blocked or enter a contract-defined pending state.

---

# Revision

An Authority Decision MAY request revision.

Revision SHALL preserve the relationship between:

```text
Prior Candidate
        │
        ▼
Authority Feedback
        │
        ▼
Revised Candidate
```

Revision SHALL NOT erase the provenance of the prior Candidate Statement.

---

# Contradiction

If Evidence conflicts, the contract SHALL preserve the contradiction.

The system SHALL NOT silently choose one interpretation merely because:

- one source is easier to parse;
- one source is newer;
- one source is more convenient;
- or a model has higher confidence.

Contradiction MAY produce:

- diagnostics;
- additional evidence requests;
- Candidate Statements;
- or authority clarification.

---

# Uncertainty

Uncertainty SHALL be preserved where evidence does not support a definitive conclusion.

The system SHALL distinguish:

```text
Known
Unknown
Uncertain
Contradictory
Proposed
Accepted
```

These states SHALL NOT be collapsed for convenience.

---

# Conversational Inference Boundary

A Host MAY bind a Conversational Inference Model to assist with:

- bounded response interpretation;
- conversational interaction;
- normalization support;
- clarification;
- or other explicitly permitted operations.

The model is not an authority.

Raw model output SHALL remain non-authoritative.

Core SHALL own:

- prompt semantics;
- output schema;
- normalization;
- deterministic reduction;
- transition validation;
- and acceptance boundaries.

The Host SHALL preserve these boundaries.

---

# Model Output

Model output SHALL be treated as an intermediate representation unless the applicable contract explicitly defines another status.

The conceptual flow is:

```text
Authority Response
        │
        ▼
Conversational Model
        │
        ▼
Structured Interpretation
        │
        ▼
Deterministic Reduction
        │
        ▼
Contract Validation
        │
        ▼
Candidate / Decision Representation
```

A model SHALL NOT directly produce an accepted Repository Knowledge state.

---

# Model Failure

If model execution fails, parsing fails, reduction fails, or required provenance cannot be established, the system SHALL fail closed.

It SHALL NOT:

- guess;
- substitute a local rule;
- silently accept raw output;
- or advance the adoption state.

The Host SHALL surface a diagnostic.

---

# Conversational Model Versus Repository-Work Strategy

The Conversational Inference Model is distinct from Repository-Work Execution Strategy.

The distinction is mandatory:

```text
Conversational Inference
        │
        └── bounded interpretation

Repository-Work Execution Strategy
        │
        └── planning / analysis / evaluation /
            implementation / mutation / validation
```

Selecting a Conversational Inference Model SHALL NOT select Repository-Work Execution Strategy.

A concrete model MAY serve both roles only when separate applicable policies explicitly authorize that use.

---

# Host Obligations

Host Implementations SHALL:

- consume the contract as a governed input;
- preserve information classes;
- preserve semantic states;
- preserve authority trace;
- preserve evidence trace;
- preserve lifecycle state;
- preserve provenance;
- preserve contract version;
- fail closed when the contract is unavailable or incompatible;
- avoid inventing adoption semantics;
- avoid promoting presentation state into knowledge;
- and defer completion until required acceptance and provenance are established.

Hosts MAY change:

- layout;
- visual presentation;
- navigation;
- interaction mechanics;
- accessibility behavior;
- and host-native controls.

Such changes SHALL NOT alter semantic content.

---

# Host Projection Rule

Any Host representation of an adoption concept SHALL be treated as a projection of the contract.

Examples include:

- question;
- prompt;
- answer control;
- confirmation dialog;
- status indicator;
- adoption step;
- warning;
- or completion state.

The Host MAY change presentation.

It SHALL NOT change the underlying semantic meaning.

---

# Persistence

Persisted adoption state SHALL preserve sufficient information to resume or audit adoption.

Persisted state SHOULD include:

- contract identity;
- contract version;
- currently adopted Semantic Contract identity and version where applicable;
- repository identity;
- adoption state;
- information class;
- semantic identity;
- provenance;
- authority context;
- and relevant transition history.

Persistence SHALL NOT convert transient information into authoritative information merely because it is durable.

---

# Resume Semantics

A paused adoption flow MAY resume only if the persisted state remains semantically compatible with the active contract.

If the contract has changed incompatibly, the system SHALL:

- reject resume;
- migrate explicitly;
- or require a contract-defined recovery path.

The Host SHALL NOT silently reinterpret old state under new semantics.

---

# Version Compatibility

Contract compatibility SHALL be evaluated semantically before adoption advances across a semantic
boundary.

A Host, SDK, Runtime, and Adoption Contract form a compatible semantic set only when their
relationships are established by the applicable contracts.

Implementation version equality is not required.

Semantic compatibility SHALL distinguish, where applicable:

- **Compatible** — the existing semantic state remains valid under the candidate contract without semantic change or explicit adaptation;
- **Projection-compatible** — repository meaning remains valid, but one or more derived projections require regeneration or contract-specific realization changes;
- **Adaptable** — the existing semantic state remains valid, but an explicit compatibility adaptation is required before conformance;
- **Migration-required** — repository-owned semantic changes are required before adoption of the candidate contract;
- **Incompatible** — the existing state cannot satisfy the candidate contract within the permitted semantic boundary; and
- **Indeterminate** — available evidence is insufficient to establish one of the other outcomes.

`Indeterminate` SHALL NOT be silently converted into `Compatible` or `Incompatible`.

The compatibility result SHALL be attributable to:
- the compared contract identities and versions;
- the repository semantic state;
- relevant projection state;
- applicable authority requirements;
- provenance; and
- the evidence or rules supporting the classification.

# Contract Evolution

When this contract evolves, the evolution SHALL identify:

- changed information classes;
- changed state definitions;
- changed transitions;
- changed result kinds;
- changed provenance requirements;
- changed compatibility rules;
- and migration requirements.

A semantic contract change SHALL NOT be disguised as an implementation-only change.

---

# Backward Compatibility

A newer contract MAY support older compatible adoption states.

If compatibility is supported, the compatibility relationship SHALL be explicit and SHALL identify
the supported contract versions and semantic scope.

The system SHALL NOT silently interpret an older state according to new semantics where meaning
could change.

Backward compatibility of a Guvna contract does not automatically mean that every adopted
Governed Repository is compatible. Repository-specific compatibility remains a relationship
between the repository's semantic state and the candidate contract.

# Migration

Contract migration SHALL preserve:
- prior contract identity;
- prior contract version;
- prior adopted contract relationship;
- prior state;
- transition history;
- provenance;
- compatibility classification;
- and resulting state.

Migration SHALL be deterministic where the contract requires deterministic behavior.

Migration SHALL distinguish:
- migration of Guvna contract applicability;
- migration of repository-owned semantic state;
- migration of projection realization; and
- migration of implementation state.

These are related but distinct transitions.

A migration proposal MAY be generated by Guvna or a Host, but repository-owned semantic migration
SHALL remain subject to Repository Authority and Acceptance.

# Repository Alignment

A contract evolution MAY require alignment of adopted Governed Repositories.

An adopted Governed Repository SHALL retain an explicit relationship to its currently adopted
Semantic Contract. The existence, ratification, or release of a newer Guvna Semantic Contract
does not by itself change that relationship.

The alignment process SHALL distinguish:

```text
Candidate Guvna Contract
        │
        ▼
Repository Impact Analysis
        │
        ▼
Semantic Compatibility
        │
        ├── Compatible
        ├── Projection-compatible
        ├── Adaptable
        ├── Migration-required
        ├── Incompatible
        └── Indeterminate
```

Where repository-specific meaning must change, the change SHALL proceed through Repository
Authority and the applicable Acceptance transition.

Guvna SHALL NOT silently rewrite repository-owned meaning.

A repository SHALL remain governed by its currently adopted contract until a governed alignment
transition establishes adoption of a successor contract.

A Projection-compatible result SHALL NOT be treated as repository semantic migration merely because
a projection must be regenerated.

An Indeterminate result SHALL remain unresolved until sufficient evidence, contract analysis, or
authority establishes the applicable classification.

# Provenance Requirements

Every governed adoption interaction SHALL remain traceable to:

- contract identity;
- contract version;
- currently adopted Semantic Contract identity and version where applicable;
- repository identity;
- authority context;
- evidence;
- provisional understanding where applicable;
- Candidate Statement;
- authority decision;
- acceptance;
- acceptance provenance;
- normalized knowledge;
- and resulting projection.

Traceability SHALL survive:

- Host projection;
- persistence;
- transport;
- normalization;
- projection;
- and follow-on routing.

---

# Provenance Invariant

The following relationship SHALL remain reconstructable:

```text
Repository Information
        │
        ▼
Evidence
        │
        ▼
Provisional Understanding
        │
        ▼
Candidate Statement
        │
        ▼
Authority Decision
        │
        ▼
Acceptance
        │
        ▼
Accepted Repository Knowledge
        │
        ▼
Normalized Repository Knowledge
        │
        ▼
Knowledge Projection
```

If a downstream representation cannot be traced back through the applicable provenance chain, its semantic status SHALL be considered unverifiable where provenance is required.

---

# Fail-Closed Behavior

The contract SHALL fail closed when any required semantic prerequisite cannot be established.

Required failure conditions include:

- missing Authority Context;
- invalid Authority Context;
- insufficient Evidence;
- unresolved contradiction;
- missing Authority Decision where required;
- missing Acceptance where acceptance is required;
- missing Acceptance Provenance;
- normalization failure;
- projection failure;
- invalid transition;
- contract incompatibility;
- model interpretation failure;
- provenance loss;
- or unsupported state.

Fail-closed behavior SHALL NOT mean silent termination.

The system SHOULD produce a diagnostic identifying:

- the failed condition;
- current state;
- required condition;
- contract version;
- and permitted recovery path.

---

# No Fallback Doctrine

When the contract cannot be honored, the system SHALL NOT synthesize fallback doctrine from:

- Host behavior;
- model behavior;
- filesystem conventions;
- prior UI behavior;
- undocumented defaults;
- or implementation assumptions.

The absence of a valid contract is itself a semantic condition.

---

# Diagnostics Are Not Transitions

A Diagnostic reports a condition.

It does not itself advance adoption.

For example:

```text
Diagnostic:
    "Authority context missing."
```

does not mean:

```text
Authority Engaged
```

Likewise:

```text
Diagnostic:
    "Evidence insufficient."
```

does not mean:

```text
Evidence Accepted
```

Diagnostics remain outside the authoritative transition path.

---

# Acceptance Boundary

Acceptance is the central epistemic boundary.

The contract SHALL preserve:

```text
Before Acceptance
    │
    ├── Evidence
    ├── Provisional Understanding
    └── Candidate Statements
         │
         ▼
   Repository Authority
         │
         ▼
   Authority Decision
         │
         ├── reject
         ├── defer
         ├── revise
         │
         └── accept
                │
                ▼
            Acceptance
                │
                ▼
After Acceptance
    │
    ├── Accepted Repository Knowledge
    ├── Normalized Knowledge
    └── Derived Projections
```

Nothing in the pre-acceptance state becomes authoritative merely because it is:

- plausible;
- repeated;
- persisted;
- model-generated;
- displayed;
- or operationally useful.

---

# Normalization Boundary

Normalization SHALL NOT precede Acceptance where normalization would imply semantic acceptance.

The correct relationship is:

```text
Evidence
    ↓
Provisional Understanding
    ↓
Candidate Statement
    ↓
Authority Decision
    ↓
Acceptance
    ↓
Accepted Knowledge
    ↓
Normalization
```

A system MAY normalize raw representations for processing convenience before acceptance.

Such normalization SHALL NOT be confused with normalization of accepted Repository Knowledge.

---

# Projection Contract Boundary

A Runtime-consumable Governance Projection SHALL conform to an applicable Projection Contract
where the Guvna architecture defines one.

A Projection Contract is a strict specialization of a Semantic Contract. It MAY constrain,
specialize, or instantiate existing Guvna semantics for a projection boundary.

A Projection Contract SHALL NOT introduce independent Guvna semantics.

If projection behavior requires genuinely new Guvna semantics, those semantics SHALL first enter
through Semantic Contract evolution.

The Governance Projection remains repository-owned derived meaning. The Projection Contract
remains Guvna-owned semantic obligation.

```text
Guvna Semantic Contract
        │
        ▼
Projection Contract
        │
        ▼
Governance Projection
```

# Projection Boundary

Projection SHALL occur after normalized accepted knowledge unless another explicit contract permits a non-authoritative pre-acceptance projection.

Pre-acceptance projections SHALL remain clearly identified as provisional.

The Host SHALL NOT present a provisional projection as accepted knowledge.

---

# Follow-on Work Boundary

Follow-on repository work SHALL be derived from accepted semantics where the work depends on repository meaning.

Candidate or provisional understanding MAY inform work planning.

It SHALL NOT silently authorize mutation.

Where mutation is governed, the applicable Runtime and Repository Governance contracts SHALL apply.

---

# Adoption Completion

Repository Adoption SHALL NOT be considered semantically complete merely because:

- all UI steps have been displayed;
- all questions have been answered;
- a model returned output;
- files were generated;
- or a workflow reached its final screen.

Adoption completion requires the contract-defined semantic completion state.

Where applicable, that state requires:

- authority engagement;
- sufficient evidence;
- Authority Decision;
- Acceptance;
- acceptance provenance;
- normalized accepted knowledge;
- and successful required projections.

---

# Idempotence

Where the contract permits repeated operations, semantically equivalent repeated operations SHOULD be idempotent.

For example:

- re-reading evidence;
- re-projecting accepted knowledge;
- revalidating a projection;
- or reloading a compatible contract

SHOULD NOT silently create new semantic meaning.

Repeated operations SHALL preserve provenance.

---

# Determinism

Contract evaluation SHOULD be deterministic given the same:

- contract version;
- input information;
- repository semantic state;
- authority context;
- and explicit operation parameters.

Where model-assisted interpretation is involved, deterministic reduction SHALL occur before an adoption transition becomes authoritative.

---

# Semantic Equivalence

Different Host Implementations MAY produce different presentations.

They SHALL produce semantically equivalent adoption outcomes when given equivalent:

- repository state;
- authority decisions;
- contract version;
- and information.

Host presentation differences SHALL NOT create semantic divergence.

---

# Architectural Invariants

The Repository Adoption Information Contract establishes these invariants:

1. Adoption semantics are Core-owned.
2. Repository-specific truth remains repository-owned.
3. Repository Authority remains the authority for repository-specific acceptance.
4. Evidence is non-authoritative.
5. Provisional Understanding is non-authoritative.
6. Candidate Statements are non-authoritative.
7. Authority Decision records the authoritative judgment.
8. Acceptance is the transition that establishes accepted Repository Truth.
9. Acceptance SHALL remain distinct from Authority Decision.
10. Acceptance Provenance is required for accepted knowledge.
11. Normalization follows acceptance.
12. Projection follows normalization.
13. Diagnostics remain non-authoritative.
14. Host presentation is a projection of the contract.
15. Host Implementations SHALL NOT invent adoption semantics.
16. Contract version is explicit.
17. Semantic compatibility is required.
18. Invalid or incompatible contracts fail closed.
19. Model output is non-authoritative.
20. Conversational model selection does not determine Repository-Work Execution Strategy.
21. State transitions are explicit.
22. State SHALL NOT be inferred from presentation state.
23. Uncertainty SHALL be preserved.
24. Contradiction SHALL be preserved until resolved.
25. Rejection does not become acceptance.
26. Deferral does not become acceptance.
27. Revision preserves prior provenance.
28. Projection does not become authority through persistence.
29. Generated artifacts remain derived.
30. Adoption completion requires semantic completion, not UI completion.
31. Provenance SHALL survive Host projection and persistence.
32. Contract evolution SHALL remain distinguishable from implementation evolution.
33. Repository alignment remains subject to Repository Authority.
34. No fallback doctrine may be invented when the contract cannot be honored.
35. Contract Ratification is distinct from Semantic Compilation.
36. Contract Ratification establishes applicability and SHALL NOT introduce new Guvna meaning.
37. Semantic Contract versions change only when the contractual semantic boundary materially changes.
38. A Governed Repository retains an explicit adopted Semantic Contract relationship.
39. A newly ratified Semantic Contract does not automatically alter an adopted repository's contract.
40. Compatibility SHALL distinguish Compatible, Projection-compatible, Adaptable, Migration-required,
    Incompatible, and Indeterminate where applicable.
41. Indeterminate compatibility SHALL NOT be silently converted into compatibility or incompatibility.
42. Projection Contracts are strict specializations and SHALL NOT introduce independent Guvna semantics.
43. Repository-owned semantic migration remains subject to Repository Authority and Acceptance.

---

# Relationship to Runtime

Runtime consumes the semantic result of this contract.

Runtime SHALL NOT reconstruct adoption meaning from Host behavior, filesystem convention, or
implementation-specific fallback.

The relationship is:

```text
Applicable Repository Adoption Contract
        │
        ▼
Versioned Semantic Operations
        │
        ▼
Runtime
        │
        ▼
Runtime Directives
        │
        ▼
Host
```

Runtime interpretation SHALL remain bounded by the applicable contract.

If the contract does not establish a valid interpretation for a required condition, Runtime SHALL
fail according to the contract-defined failure state rather than inventing semantics.

This allows Runtime implementation to remain lightweight while preserving the full semantic
contract.

# Relationship to SDK

The SDK SHALL expose the adoption contract without redefining it.

The SDK MAY provide:

- typed operation surfaces;
- state representations;
- transition requests;
- result representations;
- compatibility checks;
- diagnostics;
- and provenance structures.

The SDK SHALL remain subordinate to the Semantic Contract.

---

# Relationship to Host

Hosts consume the contract through the SDK or another contract-defined capability boundary.

Hosts MAY:

- render;
- collect;
- relay;
- persist;
- and visualize

adoption information.

Hosts SHALL NOT:

- alter semantic meaning;
- bypass authority;
- invent transitions;
- promote evidence;
- or infer acceptance.

---

# Relationship to Governed Repository

The Governed Repository remains the owner of repository-specific semantic content.

The adoption contract provides the mechanism through which that content becomes accepted Repository Knowledge.

The contract does not own the repository's meaning.

It governs the boundary through which repository meaning is established.

---

# Semantic Evolution

When this contract changes, the evolution SHALL identify:
- changed information classes;
- changed state definitions;
- changed transitions;
- changed result kinds;
- changed provenance requirements;
- changed compatibility rules;
- changed authority requirements;
- and migration requirements.

A semantic contract change SHALL NOT be disguised as an implementation-only change.

The Guvna semantic evolution sequence is:

```text
1. Update accepted Guvna doctrine
        │
        ▼
2. Semantic Identity / Semantic Delta analysis
        │
        ▼
3. Compile candidate Semantic Contract
        │
        ▼
4. Validate candidate contract
        │
        ▼
5. Ratify applicable Semantic Contract
        │
        ▼
6. Generate / update Runtime semantics
        │
        ▼
7. Generate / align SDK
        │
        ▼
8. Align Host Implementations
        │
        ▼
9. Analyze adopted repository impact
        │
        ▼
10. Generate repository alignment candidates
        │
        ▼
11. Repository Authority decides and Acceptance occurs
          where repository-owned meaning changes
        │
        ▼
12. Regenerate required projections
```

No downstream implementation SHALL become the source of the semantic change.

# Final Canonical Principle

> **Repository Adoption is a semantic state transition system, not a UI workflow.**
>
> **Evidence informs.**
>
> **Provisional Understanding synthesizes.**
>
> **Candidate Statements propose.**
>
> **Repository Authority decides.**
>
> **Authority Decision records that judgment.**
>
> **Acceptance establishes accepted Repository Truth.**
>
> **Acceptance Provenance preserves why it became accepted.**
>
> **Normalization establishes canonical representation of accepted knowledge.**
>
> **Projection creates derived representations.**
>
> **Runtime consumes the resulting semantics.**
>
> **Hosts realize the interaction.**
>
> **Models may assist interpretation but never become authority.**
>
> **No implementation may invent a missing semantic transition.**
>
> **A new Guvna contract does not silently change an adopted repository.**
>
> **Contract Ratification establishes Guvna contract applicability; Repository Acceptance establishes repository-owned meaning.**
>
> **When semantic compatibility cannot be established, the system fails closed.**

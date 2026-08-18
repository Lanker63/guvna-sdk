# Domain Pack Information Contract

## Purpose

This document defines the core-owned semantic information contract for a **Domain
Pack**: a distributable, versioned bundle of candidate domain material
(ontology/terminology, agents, skills, templates, workflows) that a Governed
Repository may install as a new source of Evidence for its own Repository
Adoption and Repository Understanding Evolution.

This contract is scoped narrowly to Domain Pack. It does not generalize to
a broader "third-party-sourced Evidence bundle" concept. Should a second,
structurally distinct bundle concept emerge, a shared abstraction MAY be
extracted at that time from established precedent; it SHALL NOT be defined
in advance of that precedent.

The contract specifies:

- what a Domain Pack is and what it may contain;
- the semantic state a Domain Pack's contents hold before and after
  acceptance;
- how a Domain Pack's contents enter existing Repository Adoption / Evolution
  mechanics;
- the authority boundary, in particular for bundled agents;
- provenance requirements;
- identity and versioning requirements;
- and failure behavior.

It does not prescribe:

- marketplace UI, distribution, or web platform mechanics;
- monetization, curation, or contribution review;
- transport technology, storage technology, or implementation structure.

It does not establish Repository Truth, exercise Repository Authority, or
redefine the constitutional ontology of Repository Information, Repository
Knowledge, Repository Understanding, Repository Intelligence, or Repository
Authority.

It realizes those distinctions within the Domain Pack boundary.

---

# Architectural Position

A Domain Pack is not a new authority or acceptance mechanism. It is a new
Evidence source that enters the existing pipeline defined by Repository
Adoption and Repository Understanding Evolution.

The architectural relationship is:

```text
Domain Pack (external origin; distribution mechanics out of scope of this contract)
        │
        │ install
        ▼
Domain Pack (filesystem realization under the Governed Repository, e.g. .guvna/domain-packs/<pack>/)
        │
        │ indexed as
        ▼
Evidence  (observed/declared pack content; non-authoritative; presence alone establishes nothing)
        │
        ▼
Repository Intelligence
        │
        ▼
Provisional Understanding  (working synthesis; still non-authoritative)
        │
        ▼
Candidate Statements  (proposal-ready for Authority review)
        │
        ▼
Repository Authority
        │
        ├── Authority Decision (ontology, terminology, templates, workflows, skills,
        │                       and each agent's existence as a defined capability)
        └── Authority Decision (per accepted agent: explicit, scoped delegation or none)
        │
        ▼
Acceptance
        │
        ▼
Repository Knowledge → Repository Understanding
```

A Domain Pack SHALL enter Repository Adoption, where the repository has not
yet established initial Repository Understanding, or Repository
Understanding Evolution, where it has, through the same states, transitions,
and authority requirements already defined for those processes.

This contract introduces no parallel acceptance pathway.

Evidence, Provisional Understanding, and Candidate Statements remain
distinct information classes, as defined by
`doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`. A
Domain Pack's content SHALL progress through each in turn; it SHALL NOT be
treated as a single undifferentiated pre-acceptance state.

---

# Contract Ownership

Guvna Core owns:

- the definition of Domain Pack as a concept;
- the permitted content classes within a pack;
- the requirement that a Domain Pack carry identity and version information
  conformant with existing Semantic Identity and Filesystem Realization
  doctrine;
- provenance requirements for pack-sourced material;
- the rule that pack content SHALL progress through Evidence, Provisional
  Understanding, and Candidate Statements as distinct classes before it may
  be accepted;
- and the rule that bundled agents acquire no authority merely by inclusion
  or installation.

The Governed Repository owns:

- the decision to install a pack;
- review and Authority Decisions on the pack's ontology, terminology,
  templates, workflows, and skills;
- review and Authority Decisions on each bundled agent's existence as a
  defined capability in the repository;
- per-agent delegation decisions;
- and its own resulting Repository Knowledge and Repository Understanding.

The Host owns:

- pack discovery and download presentation;
- installation mechanics;
- and presenting Candidate Statements and Authority Decision interactions.

Any Guvna Marketplace or other external distribution channel is an
out-of-scope external origin for a Domain Pack. This contract makes no
ownership claim over it and does not define its distribution, contribution
intake, curation, or trust signaling; those remain separate, non-doctrinal
concerns.

None of these parties acquire authority over repository-specific acceptance
through this contract.

---

# Fundamental Principle

> **A Host installs a pack from wherever it originates.**
>
> **Core defines what a Domain Pack means and what it may contain.**
>
> **Repository Authority determines what becomes accepted, and separately,
> what agent authority, if any, is delegated.**

A Domain Pack SHALL NOT be treated as accepted Repository Knowledge merely by
being downloaded, installed, or present under the Governed Repository's
filesystem.

A bundled agent SHALL NOT acquire Repository Authority merely by being
included in a pack, installed, or invoked.

Agent authority requires an explicit, scoped Authority Decision, distinct
from acceptance of the pack's ontology, terminology, templates, workflows,
or skills, and distinct from acceptance of the agent's own existence as a
defined capability.

A Domain Pack SHALL NOT establish Repository Truth.

An external distribution channel's listing, rating, download count, or
contribution status SHALL NOT establish Repository Truth or substitute for
Repository Authority.

---

# Semantic Contract

This document defines a versioned Semantic Contract for Domain Pack content
and its entry into existing adoption/evolution mechanics.

The contract version SHALL be explicit and distinct from:

- the Domain Pack's own content version (for example, "Software Engineering
  Domain Pack v2.1");
- Runtime, SDK, or Host implementation versions;
- and repository version.

---

# Contract Applicability and Ratification

This document is a Semantic Contract. Its compilation, validation, and
implementation are distinct from its applicability.

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

Contract Ratification establishes that a validated candidate is the
applicable formal expression of already-established Guvna meaning.

Contract Ratification SHALL NOT:

- create new Guvna meaning;
- redefine accepted Guvna doctrine;
- establish repository-specific truth; or
- substitute for Repository Authority or Repository Acceptance.

Human approval of this document's text is necessary but not sufficient for
it to become an Applicable Semantic Contract: the document SHALL also pass
through Contract Validation and Contract Ratification before any Runtime,
SDK, or Host realizes behavior against it.

Where this contract is itself evolved, the candidate version SHALL remain
non-applicable until the applicable Guvna contract lifecycle establishes its
applicability.

If required Domain Pack semantics cannot be derived unambiguously from
accepted Guvna doctrine, the semantic compilation process SHALL identify a
semantic gap rather than invent or silently infer the missing semantics.

---

# Contract Identity

A Domain Pack SHOULD expose:

- Pack Identity, stable across versions;
- Pack Version;
- Guvna Semantic Version it targets;
- a content manifest identifying which ontology terms, agents, skills,
  templates, and workflows it contains;
- author/publisher provenance;
- and compatibility information.

Pack identity SHALL remain independent of filename, filesystem location,
Host Implementation, or marketplace listing metadata, consistent with
`doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md`.

Domain Pack identity and versioning are governed under that existing
canonical doctrine rather than a new, pack-specific versioning scheme.

Guvna Core owns the manifest's required semantic fields, listed above.
Guvna Core does not define the manifest's serialization format or storage
encoding; that realization detail is owned by Host/SDK implementation.

---

# Content Classes

## Ontology / Terminology

Proposed Domain-specific Understanding concepts and terms. Enters as
Evidence and Candidate Statements; becomes Repository Understanding only
through existing acceptance mechanics. Conflicts with already-accepted terms
SHALL be surfaced, not silently overwritten.

## Templates

Proposed response and document normalization templates, for example a PR
description, an ADR, or an incident report. Enters as Evidence and Candidate
Statements; becomes Repository Understanding only through the same
Authority Decision applied to ontology and terminology. Not authoritative
until accepted.

## Workflows

Proposed repository-work workflows. Enters as Evidence and Candidate
Statements; becomes Repository Understanding only through the same
Authority Decision applied to ontology, templates, and skills. SHALL NOT
establish Repository Knowledge merely by existing, consistent with
`doctrine/core/canonical/REPOSITORY-INTELLIGENCE-MODEL.md`.

## Skills

Proposed reusable capabilities supporting work. Enters as Evidence and
Candidate Statements; becomes Repository Understanding only through the same
Authority Decision applied to ontology, templates, and workflows. A skill's
presence confers no authority.

## Agents

Proposed specialty agents. An agent's existence in the repository, as a
defined, invocable capability, SHALL enter the same Evidence → Candidate
Statement → Authority Decision → Acceptance pipeline as ontology, templates,
workflows, and skills. An agent SHALL NOT be treated as present in the
repository, nor recorded as accepted Repository Understanding, without that
Authority Decision.

Delegation of Repository Authority to an accepted agent is a second,
separate Authority Decision, made only after the agent's existence has
itself been accepted. An accepted agent MAY remain with no delegated
authority.

Delegation, where granted, SHALL be explicit and scoped per
`doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md` and
`doctrine/core/canonical/REPOSITORY-UNDERSTANDING-MODEL.md`.

---

# Failure Behavior

Where a Domain Pack's content cannot be unambiguously classified into an
existing information class, or where its provenance or identity metadata is
missing or invalid, the pack SHALL be treated as unresolved Evidence
requiring explicit Repository Authority review.

It SHALL NOT be silently accepted and SHALL NOT be silently discarded.

---

# Scope Boundary

Marketplace governance, including curation, trust signaling, and
monetization, is out of scope of this contract, consistent with the
exclusions stated in Purpose. This is a standing boundary of what this
contract governs, not a pending decision: this contract SHALL NOT be read
to require, imply, or await any marketplace governance determination as a
condition of its own applicability.

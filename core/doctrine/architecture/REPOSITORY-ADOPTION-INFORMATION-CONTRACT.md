# Repository Adoption Information Contract

## Purpose

This document is Architectural Doctrine.

It outlines the core-owned information contract for Repository Adoption.

The contract defines how Guvna Core specifies the adoption information boundary that host implementations realize, rather than infer or originate.

The contract is a Knowledge Manifestation of accepted Repository Knowledge and is subordinate to the accepted architectural doctrine that already defines host realization boundaries.

It does not establish Repository Truth.
It does not redesign Repository Adoption.
It does not prescribe host UI mechanics or host-specific realization details.

---

## Architectural Position

The Repository Adoption Information Contract sits between canonical repository understanding and host realization.

It specifies the information that may be exchanged during adoption, the order in which that information is interpreted, and the points at which authority, acceptance, normalization, and projection remain distinct.

It also preserves the distinction between adoption information and the host presentation that carries it.

This contract is host-agnostic.

Host implementations may present, collect, relay, and persist information governed by this contract, but they do not own its meaning.

Host prompts, step labels, and answer classes are projections of this contract, not host-owned doctrine.

## Conversational Inference Boundary

A Host MAY bind a concrete **Conversational Inference Model** to interpret
Repository Authority language during adoption or basic Repository Conversation.
This model is a host-realized execution dependency, not an authority source.

Core owns the prompt, output schema, normalization, deterministic reduction, and
epistemic transition rules for any model-assisted interpretation covered by this
contract. Raw model output SHALL remain non-authoritative and SHALL NOT establish
Repository Truth, accepted Repository Knowledge, or an accepted adoption
transition. The Host SHALL preserve the Core-defined contract and SHALL fail
closed when model execution, parsing, reduction, or required provenance cannot be
completed.

The Conversational Inference Model is distinct from the Repository-Work
Execution Strategy used for planning, analysis, evaluation, implementation,
mutation, and validation. Selecting or binding the former SHALL NOT select,
authorize, or implicitly configure the latter. The Host SHALL NOT reuse the
conversational model as a universal repository-work model unless a separate
accepted execution policy explicitly governs that choice.

Each onboarding question SHALL include mandatory guidance. Guidance is a core-owned
inference aid that explains the kind of authoritative, bounded, and evidence-aware
response the question seeks. Hosts SHALL relay or project this guidance without
silently replacing it with host-local semantic rules.

---

## Relationship to Existing Doctrine

This outline specializes the accepted Repository Adoption architecture and the Repository Adoption SDK Transition Contract.

It is intended to make the adoption information boundary explicit without introducing a parallel semantic model.

The SDK Transition Contract names the governed operations and their permitted transitions.
This doctrine names the information classes, provenance expectations, ordering constraints, and compatibility obligations that those operations depend on.

It preserves the existing distinctions among:

- evidence;
- provisional understanding;
- accepted repository knowledge;
- normalized repository knowledge;
- knowledge projection;
- diagnostics.

---

## Core Principles

The contract SHALL preserve the following principles:

- Core-owned semantics. Guvna Core owns adoption meaning and adoption information rules.
- Host-owned realization. Host implementations own presentation and transport of the contract.
- Target-owned truth. Target repositories own repository-specific truth and authority context.
- Evidence is non-authoritative.
- Provisional understanding is transient.
- Acceptance requires Repository Authority.
- Normalization follows acceptance.
- Projection follows normalization.
- Diagnostics remain non-authoritative.
- Missing or incompatible contract information fails closed.

Host prompts and step labels may vary in presentation, but they SHALL preserve the core-owned adoption meaning.

---

## Information Boundary

The contract SHALL distinguish the following information classes:

### Authority Context

The information that identifies who may accept, correct, defer, or reject repository understanding.

Authority context includes the authority-bearing response source and any repository-specific constraints on who may decide.

### Evidence

Repository observations, topology, records, and declared practices that inform adoption without establishing truth.

Evidence may orient adoption, but it does not independently establish canonical understanding.

### Provisional Understanding

Working synthesis formed from evidence and dialogue before authority acceptance.

Provisional understanding remains transient until authority acceptance establishes a canonical result.

### Candidate Statements

Statements prepared for authority review, correction, or decision.

Candidate statements are deliberately separable from evidence so the authority can accept, revise, or reject the proposed meaning without conflating it with observation.

### Authority Decision

The repository authority response that accepts, rejects, defers, or revises the candidate understanding.

Authority decisions are the only route by which repository-specific understanding becomes acceptable for normalization.

### Acceptance Provenance

The trace that records how accepted understanding was established and from what source.

Acceptance provenance SHALL preserve the accepted source, lifecycle state, and the relationship between evidence, decision, and canonical understanding.

### Normalized Repository Knowledge

Accepted understanding represented in canonical normalized form.

Normalized repository knowledge is the core-owned canonical representation from which host projections and downstream governance artifacts may be derived.

### Knowledge Projection

Non-authoritative material derived from normalized accepted knowledge for host or repository use.

Knowledge projection may include prompts, summaries, guidance, generated content, or host-facing projections, but it does not become authoritative by being rendered or persisted.

### Diagnostics

Warnings, contradictions, insufficiency reports, and invalid-transition reports that preserve traceability without becoming knowledge.

Diagnostics may explain why a response was insufficient or why a transition failed, but they do not alter the adoption contract itself.

---

## Required Adoption Phases

The contract SHALL organize Repository Adoption into the following phases:

1. Engage repository authority.
2. Classify interaction intent.
3. Gather evidence and provisional understanding.
4. Request authority acceptance.
5. Normalize accepted knowledge.
6. Project non-authoritative representations.
7. Route follow-on repository work.

The ordering is semantic, not merely procedural.

Later phases MAY be revisited when diagnostics, corrections, or deferred decisions require it, but the contract SHALL preserve the distinction between provisional and accepted states.

---

## Normative Invariants

The contract SHALL preserve the following invariants:

- The host may ask questions, but the question set comes from core doctrine.
- The host may render answers, but it may not determine repository truth.
- Evidence does not become acceptance without authority.
- Acceptance and provenance are separate and both are required.
- Normalization requires accepted repository knowledge.
- Projection requires normalized repository knowledge.
- The host does not advance adoption from local heuristics alone.
- Model-assisted interpretation does not change the seven adoption operations,
  result kinds, phase ordering, or acceptance boundary.
- The contract version is explicit and must be compatible.

- The host may not widen, reorder, or reinterpret adoption meaning when doing so would change the accepted contract.

---

## Host Obligations

Host implementations SHALL:

- consume the contract as a governed input;
- preserve authority trace, evidence trace, and lifecycle state;
- fail closed when the contract is absent, invalid, or incompatible;
- avoid inventing local adoption semantics;
- avoid promoting host-local presentation state into knowledge;
- defer adoption completion until acceptance and provenance are established.

Host implementations SHALL treat any prompt, step label, or answer gate as a projection of this contract.

Where the host transforms the contract into a user-facing interaction, the transformation SHALL preserve the contract meaning and MAY only adjust presentation form, not semantic content.

---

## Failure Behavior

The contract SHALL define fail-closed behavior for the following conditions:

- missing authority context;
- insufficient evidence;
- missing acceptance;
- missing provenance;
- normalization failure;
- projection failure;
- contract version incompatibility.

In each case, the host SHALL surface diagnostics rather than synthesizing fallback doctrine.

The host SHALL NOT silently fall back to locally invented acceptance rules, step ordering, or answer classification when the contract cannot be honored.

---

## Versioning and Compatibility

The contract SHOULD be versioned as a stable core artifact.

Compatible host realizations SHALL detect the contract version before attempting adoption.

Version mismatch SHALL be treated as a contract failure, not as a host-local interpretation problem.

Compatibility checks SHALL occur before adoption advances past the authority-engagement boundary.

---

## Traceability

Every adoption interaction governed by this contract SHALL remain traceable to:

- the governing core doctrine version;
- the authority context that participated;
- the evidence that informed the interaction;
- the authority decision that was reached;
- the accepted provenance that established the canonical result.

Traceability SHALL survive host projection, persistence, and follow-on routing.

---

## Acceptance Criteria

This doctrine outline is sufficient only when:

- every adoption workflow step maps to a core-owned rule;
- host implementations can realize adoption without inventing meaning;
- multiple hosts can consume the same contract without changing semantics;
- the contract cleanly distinguishes evidence, provisional understanding, acceptance, normalization, and projection.

This doctrine is complete only when its relationship to the SDK Transition Contract, the host realization boundary, and the accepted provenance model is explicit enough that no host implementation needs to infer adoption meaning from local convention.

---

## Open Doctrine Items

The following details require fuller acceptance if this outline is promoted to accepted doctrine:

- the exact canonical contract schema;
- the versioning format;
- the precise authority decision kinds;
- the exact provenance record fields;
- the host compatibility policy;
- the relationship, if any, to existing SDK operation tables beyond this outline.

These items remain intentionally open so that acceptance can still refine the contract without changing its core boundary.

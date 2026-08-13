# Host Implementation Architecture

## Purpose

This document is Architectural Doctrine.

It defines the host-agnostic architectural position of Host Implementations within the Guvna Platform.

Host Implementations realize Guvna Core capabilities in a host-specific execution environment while preserving the repository-centric ontology, accepted authority boundaries, and provenance boundaries established by constitutional doctrine and canonical models.

- This doctrine does not design any specific host technology.
- It does not privilege any specific host.
- It does not prescribe SDK APIs.
- It does not alter Repository Adoption semantics.
- It does not redesign Guvna Core.

VS Code is the first realized Host Implementation, but it is only an instance of the architecture described here and does not shape the abstraction.

## Architectural Position

Host Implementations occupy the presentation and environment-integration boundary between Guvna Core and the external host environment in which a user works.

They are realization layers, not semantic authorities.

They exist to make Guvna Core capabilities available through a host's interaction model, UI conventions, event model, and platform integrations without relocating ownership of durable repository semantics into the host.

The architectural position of a Host Implementation is therefore:

- downstream of Guvna Core;
- upstream of the user-facing host environment;
- lateral to Governed Repositories;
- subordinate to accepted constitutional doctrine, canonical models, architectural doctrine, and repository governance;
- independent of any specific host technology.

## Architectural Principles

Host Implementations SHALL preserve the following principles:

- Host-agnostic architecture. The architecture must be realizable by multiple host technologies without modification to its governing semantics.
- Core-owned semantics. Guvna Core owns durable repository semantics, repository cognition, workflow semantics, runtime semantics, governance semantics, synthesis authority, and Repository Adoption semantics.
- Host-owned realization. Host Implementations own presentation, interaction, environment integration, and host-specific realization details.
- Governed Repository-owned truth. Governed Repositories own repository-specific truth, accepted repository knowledge, and repository-specific governance content.
- Provenance preservation. Host Implementations must preserve the provenance of accepted knowledge, evidence, diagnostics, and projections as they move across boundaries.
- Authority preservation. Host Implementations must not exercise Repository Authority on their own initiative.
- Boundary clarity. Host Implementations must distinguish authority, evidence, projection, and realization.
- Multiple-host support. The architecture must support multiple Host Implementations without revising the abstraction.
- First-host non-authority. The fact that VS Code is the first realized Host Implementation does not confer semantic authority over the architecture.

Host Implementations realize Runtime Directives produced by Guvna Core Runtime.

They do not infer repository semantics from local presentation state or host organization.

## Architectural Responsibilities

The Host Implementation architecture divides responsibility across three primary ownership domains:

| Domain | Responsibility |
|---|---|
| Guvna Core | Durable semantics, canonical models, Repository Adoption, Repository Intelligence, Repository Understanding, Repository Governance, Workflow Engine, Runtime, synthesis authority, SDK contract surfaces, provenance rules |
| Host Implementations | Presentation, interaction, environment integration, host-specific UI behavior, host lifecycle integration, host transport integration, host affordances, and realization of Core-provided capabilities within a host environment |
| Governed Repositories | Repository-specific truth, accepted repository knowledge, repository-local constraints, repository-specific authority context, repository-specific governance content, optional governed capability artifacts, and repository-specific adoption outcomes |

Architectural responsibility follows ownership, not convenience.

If a concern determines what repository semantics mean, it belongs in Guvna Core or the Governed Repository boundary depending on ownership.

If a concern determines how a host presents or transmits those semantics, it belongs in the Host Implementation.

## Guvna Core Responsibilities

Guvna Core exclusively owns:

- constitutional doctrine realization;
- canonical model realization;
- architectural doctrine;
- repository governance;
- Repository Intelligence;
- Repository Understanding;
- Repository Adoption semantics;
- Repository Adoption Information Contract;
- synthesis of runtime-prescribed directives from governed repository inputs;
- workflow semantics;
- runtime semantics;
- SDK contract semantics;
- provenance-preserving normalization and projection semantics;
- the durable meaning of evidence, diagnostics, accepted knowledge, and projections;
- any semantics that must remain host-independent.

Guvna Core does not own host UI concerns, host event loops, platform-specific presentation conventions, or environment-specific interaction mechanics.

## Host Implementation Responsibilities

Host Implementations exclusively own:

- user interaction within the host;
- presentation and visualization of Core outputs;
- host-specific input capture and event handling;
- transport and integration with the host environment;
- host lifecycle and activation behavior;
- host-specific affordances, navigation, and workspace integration;
- adaptation of host-native concepts into Core-requested interactions;
- marshalling Core results into host-appropriate displays or actions;
- preserving the distinction between host behavior and repository semantics;
- executing Core-prescribed directives without independently shaping operational intelligence;
- realizing the Repository Adoption flow through host-specific interaction without owning its semantics.

Host Implementations do not own accepted repository knowledge, repository truth, or the authority to establish either.

They do not own durable repository semantics.
They do not redefine Core contracts.
They do not own Governed Repository truth.

### Model-Selection Boundaries

Host Implementations may realize two separate model-selection boundaries:

- a **Conversational Inference Model** selected or bound for bounded
  Repository Authority response interpretation, adoption normalization support,
  and basic conversation; and
- a **Repository-Work Execution Strategy** resolved from Core Runtime and
  governance semantics for planning, analysis, evaluation, implementation,
  mutation, and validation.

The Conversational Inference Model is not an epistemic authority. Core owns the
prompt, schema, normalization, deterministic reduction, and acceptance boundary
for model-assisted interpretation. Runtime owns provider/model-agnostic
repository-work planning and execution strategy semantics. The Host may bind
concrete host providers or models at the realization boundary, with attributable
policy context, but SHALL NOT allow the conversational model choice to silently
become repository-work strategy.

Hosts SHALL preserve separate context, provenance, failure handling, and
configuration for these boundaries. They MAY resolve to the same concrete model
only when separately applicable policy produces that result.

## Governed Repository Responsibilities

Governed Repositories exclusively own:

- repository-specific truth;
- accepted repository knowledge;
- repository-specific authority decisions and acceptance context;
- repository-specific evidence as it becomes accepted or rejected under repository governance;
- repository-local constraints and facts;
- repository-specific governance content, including mission, vision, invariants, rules, and abstract repository-work execution constraints when the repository chooses to declare them; concrete provider/model configuration is excluded from this ownership;
- optional governed capability artifacts such as agents, skills, and workflows;
- the outcome of Repository Adoption for that repository;
- the repository's own durable knowledge manifestations.

Governed Repositories do not own the Host Implementation boundary.
They do not own Guvna Core semantics.
They do not determine host realization details.

## Repository Adoption Architecture

Repository Adoption is the architectural bridge between Guvna Core and a Governed Repository.

It is the capability by which Guvna Core establishes accepted Repository Understanding for a Governed Repository using governed evidence, authority interaction, normalization, and projection.

The core-owned Repository Adoption Information Contract defines the information boundary that the Host Implementation realizes within that bridge.

When Guvna Core synthesizes directives for a Governed Repository, the synthesis remains Core-owned and policy-governed; the Host Implementation receives those directives for realization and execution rather than independently shaping them.

In Host Implementations, Repository Adoption is realized as a host-mediated workflow that:

1. engages repository authority;
2. classifies the intent of the interaction;
3. gathers evidence and provisional understanding;
4. routes acceptance to Repository Authority;
5. normalizes accepted knowledge;
6. projects non-authoritative representations where needed;
7. routes follow-on work.

The Host Implementation may orchestrate the interaction steps, but it does not own the semantics of any step.

The adoption bridge therefore has three distinct ownership scopes:

- Guvna Core owns the adoption semantics, state model, and accepted result kinds;
- Host Implementations own the user-facing realization of the adoption flow;
- Governed Repositories own the authority context and repository-specific truth that the flow seeks to establish or preserve.

Repository Adoption SHALL remain host-agnostic.

No host may alter the adoption semantics merely because it is the first host to realize them.

## Repository Interaction Model

The interaction model between Guvna Core, Host Implementations, and Governed Repositories is directional and bounded.

### Interaction Flow

```text
User
  ↓
Host Implementation
  ↓
Guvna Core capability surface
  ↓
Repository Adoption / Repository Understanding / Repository Intelligence / Repository Governance / Workflow Engine / Runtime
  ↓
Governed Repository authority context and repository knowledge
```

### Interaction Rules

- The Host Implementation collects user intent and presents Core-derived outcomes.
- Guvna Core evaluates repository semantics and returns governed results.
- Governed Repository authority context supplies the repository-specific truth boundary for adoption and acceptance.
- Runtime and Workflow Engine act as Core-managed realization and execution boundaries.
- The Host Implementation does not bypass Core to reach Governed Repository semantics directly.
- The Host Implementation does not infer accepted knowledge from local presentation state.
- The Host Implementation may preserve, relay, and display evidence, but it does not authoritatively transform it.
- The Host Implementation may render the core-owned adoption information contract, but it does not author it.

### Interaction Surfaces

Host Implementations may interact with Guvna Core through:

- capability requests;
- repository adoption flows;
- workflow initiation or continuation;
- runtime-backed execution and diagnostics;
- evidence presentation and collection;
- authority-facing prompts and confirmations.

Those surfaces are host realizations of Core-owned semantics, not host-owned semantics themselves.

## Dependency Direction

Dependency direction SHALL remain one-way from Host Implementations toward Guvna Core semantics, never the reverse.

Guvna Core Runtime produces Runtime Directives for Host Implementations to realize.

The architectural dependency chain is:

```text
Host Implementation → Guvna Core Runtime → Runtime Directives
Host Implementation → Guvna Core → accepted constitutional doctrine and canonical models
Host Implementation → host environment services and UI primitives
Guvna Core → Governed Repository authority context and accepted repository knowledge boundaries
```
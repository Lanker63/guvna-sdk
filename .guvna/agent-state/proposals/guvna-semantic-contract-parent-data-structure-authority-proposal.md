# Guvna Semantic Contract Parent Data-Structure Meaning Proposal

**Phase:** Semantic Model / Semantic IR population blocker resolution  
**Decision group:** Guvna Semantic Contract parent data-structure meaning  
**State:** APPROVED  
**Approved scope:** Candidate A — Guvna Semantic Contract semantic boundary

## Scope and Exclusions

This proposal addresses only whether the approved Candidate A parent Semantic Contract has a concrete data-structure obligation and, if so, which doctrine-established structures may belong to it.

It does not address identity derivation, general reference resolution, operations, obligations outside data structures, Candidate Contract generation, ratification, applicability, artifacts, workspace paths, Runtime/SDK/Projection implementation, or repository-specific content.

No schema is invented or selected by this proposal.

## Accepted Sources and Concrete Structures

### 1. Parent Semantic Contract category

**Source:** `doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md`, **Semantic Contract**.

**Concrete statement:** A Semantic Contract defines, “as applicable,” concepts, data structures, operations, states, transitions, invariants, authority boundaries, provenance requirements, compatibility requirements, failure behavior, and realization obligations.

**Semantic purpose:** Establishes that data structures are a possible contract-content category when applicable.

**Parent versus specialization:** This is a parent-level category declaration, not a concrete data-structure definition. The phrase “as applicable” does not identify a structure or establish that a structure is required for Candidate A.

**Status:** Parent category permission only; not a parent data-structure obligation.

### 2. Repository Adoption information classes

**Source:** `doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`, **Information Classes** and **Semantic Contract**.

**Concrete structures/records named by the source:**

- Authority Context;
- Evidence;
- Provisional Understanding;
- Candidate Statements;
- Authority Decision;
- Acceptance;
- Acceptance Provenance;
- Normalized Repository Knowledge;
- Knowledge Projection;
- Diagnostics;
- and the contract-level identity/version/result/transition/compatibility information the source says a Repository Adoption Contract SHOULD expose.

**Semantic purpose:** These structures distinguish and carry information through the Repository Adoption process, including repository-specific authority, evidence, candidate meaning, acceptance, provenance, normalization, projections, diagnostics, and compatibility.

**Parent versus specialization:** This is a concrete Guvna-owned Repository Adoption Semantic Contract and therefore a specialization/domain contract, not evidence of a complete data-structure set for the general Candidate A parent Semantic Contract. Its structures may be included in Candidate A only as named concepts or parent obligations where the parent doctrine explicitly adopts them; their Repository Adoption payload meaning remains specialization-specific. Repository-specific content carried by these structures remains Governed Repository-owned.

**Status:** Concrete specialization structures; not automatically parent obligations.

### 3. Canonical artifact metadata surface

**Source:** `doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md`, **Canonical Artifact Surface**.

**Concrete semantic fields named:**

- Semantic Identity;
- Semantic Version;
- Lifecycle State;
- Acceptance State;
- Provenance; and
- applicable governing contract.

**Semantic purpose:** Defines the semantic information an authority-bearing artifact should expose directly or through a contract-defined metadata envelope.

**Parent versus specialization:** This is a semantic artifact-surface requirement, not a complete parent data-structure schema. The source explicitly says the exact representation is implementation-specific while the semantic information is not. Identity is outside the current approved population decision, so no identity work is authorized here.

**Status:** A doctrine-defined semantic surface; concrete representation/schema is not established.

### 4. Index

**Source:** `doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md`, **Index**.

**Concrete content named:** An index may contain Semantic Identity, Semantic Version, Lifecycle State, Acceptance State, current realization path, historical aliases, relationships, provenance, and compatibility information.

**Semantic purpose:** Derivative discovery and resolution support for an authoritative artifact and accepted governance state.

**Parent versus specialization:** The index is explicitly derivative and realization-adjacent. It is not the authoritative parent Semantic Contract data structure; filesystem paths and realization metadata cannot supply parent meaning.

**Status:** Derivative realization structure; excluded from Candidate A parent data-structure meaning.

### 5. Manifest

**Source:** `doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md`, **Manifests**.

**Concrete content named:** A manifest is a structured declaration of artifacts and their relationships and may provide artifact discovery, dependency relationships, semantic versions, compatibility information, projection metadata, generation metadata, and resolution information.

**Semantic purpose:** Artifact discovery, dependency, compatibility, projection, generation, and resolution support.

**Parent versus specialization:** A manifest is a realization/discovery structure. It is derivative unless authority-bearing under an explicit governing Semantic Contract and acceptance state. It is not established as the Candidate A parent contract schema.

**Status:** Derivative or explicitly governed artifact structure; not automatically a parent obligation.

### 6. Registry

**Source:** `doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md`, **Registry**.

**Concrete content named:** A registry is a structured collection of identities, relationships, or resolution metadata and may support discovery, version resolution, compatibility analysis, migration, dependency resolution, and Runtime loading.

**Semantic purpose:** Resolution and loading support.

**Parent versus specialization:** Registry contents remain attributable to their semantic sources and cannot silently supersede the source artifact. This is a derivative realization structure, not the parent Semantic Contract data structure.

**Status:** Derivative realization structure; excluded from Candidate A parent data-structure meaning.

### 7. Repository Understanding canonical structure

**Source:** `doctrine/core/canonical/REPOSITORY-UNDERSTANDING-MODEL.md`, **Canonical Structure**.

**Concrete structure named:** Repository Understanding consists of a canonical core, accepted Domain-specific Understanding, and accepted semantic relationships and provenance; derived projections are downstream realizations.

**Semantic purpose:** Structure of accepted repository-specific understanding.

**Parent versus specialization:** This is Governed Repository-owned semantic content and therefore outside the Guvna Semantic Contract parent data-structure boundary. The parent contract may define how such content is interpreted, but it does not own the repository-specific structure as Guvna parent meaning.

**Status:** Repository-specific canonical structure; excluded from Candidate A parent data-structure meaning.

### 8. Knowledge System structures

**Source:** `doctrine/core/canonical/REPOSITORY-UNDERSTANDING-MODEL.md`, **Knowledge System**.

**Concrete structures named:** Knowledge Manifestations, repositories of knowledge, indexes, provenance structures, historical records, relationships, and discovery mechanisms.

**Semantic purpose:** Preserve, discover, relate, version, evolve, and manifest Repository Knowledge.

**Parent versus specialization:** These are repository knowledge-system or realization structures. The source explicitly preserves distinctions among Repository Knowledge, Knowledge Manifestation, Projection, and Filesystem Realization. They are not established as Candidate A parent data structures.

**Status:** Repository-specific/derivative structures; excluded from Candidate A parent data-structure meaning.

### 9. Host/SDK structures

**Source:** `doctrine/core/architecture/HOST-IMPLEMENTATION-ARCHITECTURE.md`, SDK boundary.

**Concrete statement:** The SDK should expose semantic concepts rather than implementation-specific structures and may expose Repository Identity, Repository Understanding, Repository Knowledge, Governance, Adoption, Runtime Directives, diagnostics, provenance, compatibility, semantic versions, contract versions, and host-facing interaction requests.

**Semantic purpose:** Host-facing realization and transport of semantic concepts.

**Parent versus specialization:** This is an SDK/Host realization boundary. It explicitly rejects using low-level implementation structures as semantic authority and does not establish parent contract data structures.

**Status:** Realization guidance; excluded from Candidate A parent data-structure meaning.

## Determination

The accepted doctrine establishes:

- that data structures may be Semantic Contract content when applicable;
- several concrete structures for Repository Adoption, repository knowledge, artifact discovery, and Host/SDK realization;
- a semantic metadata surface for authority-bearing artifacts; and
- strict ownership and realization boundaries.

It does **not** establish a concrete, complete data-structure set for the approved Candidate A Guvna Semantic Contract parent boundary. In particular:

- Repository Adoption information classes are specialization structures, not automatically parent structures;
- Repository Understanding and Knowledge System structures are repository-specific or derivative;
- indexes, manifests, and registries are derivative realization structures;
- Host/SDK structures are realization guidance; and
- the canonical artifact surface states semantic information but leaves representation implementation-specific.

Therefore the current blocker is **C: a genuine semantic choice remains for human authority**. No parent schema is established by the accepted sources.

## Finite Doctrine-Grounded Alternatives

### Alternative 1 — No Parent Data-Structure Obligation (Recommended)

Treat the Candidate A parent Semantic Contract as having no separately required concrete data-structure schema at this stage. Retain the doctrine-established semantic elements abstractly in the populated Model/IR and preserve the named semantic metadata/provenance requirements without selecting a physical or structural representation.

- Repository Adoption structures remain Repository Adoption specialization structures.
- Repository Understanding, Knowledge System, index, manifest, registry, Host, SDK, Runtime, and Projection structures remain outside the parent data-structure category.
- The canonical artifact surface remains a semantic requirement, not a selected schema.

**Human decision required:** Approve that no concrete parent data-structure set is required for Candidate A and that the named structures remain specialization, repository, derivative, or realization structures as classified above.

### Alternative 2 — Parent Semantic Metadata Surface Only

Treat only the doctrine-defined authority-bearing artifact metadata surface as parent-level data-structure meaning: Semantic Identity, Semantic Version, Lifecycle State, Acceptance State, Provenance, and applicable governing contract. Do not select a representation or schema, and preserve identity as outside the current population decision.

**Human decision required:** Approve the metadata surface as a parent semantic structure while explicitly preserving the source's implementation-specific representation boundary and the current identity exclusion.

### Alternative 3 — Named Parent Structure Set by Explicit Source Mapping

Treat a selected set of the named structures as parent structures only where human authority explicitly identifies the accepted source passage and confirms that the structure's meaning is common to the Candidate A parent boundary rather than Repository Adoption, repository knowledge, derivative discovery, or a realization specialization.

**Human decision required:** Select the structures and provide the source-to-parent applicability mapping. No schema may be invented, and unmapped structures remain outside the parent model or explicit blockers.

## Recommendation

Recommend **Alternative 1 — No Parent Data-Structure Obligation**.

This is the narrowest doctrine-faithful choice because:

1. Candidate A is a parent semantic boundary, not Repository Adoption, Repository Understanding, an index/manifest/registry, or an SDK/Host realization.
2. The only parent-level doctrine statement says data structures apply “as applicable”; it does not establish a structure.
3. The canonical artifact surface explicitly leaves exact representation implementation-specific.
4. Selecting Repository Adoption or repository structures would promote specialization or repository meaning into the Guvna parent contract.
5. The approved Semantic IR generic kernel is a representation boundary, not semantic authority for a parent data-structure schema.
6. This preserves the already-approved scope and Alternative 3 rule without inventing a schema merely to satisfy a generic category.

The recommendation does not claim that data structures can never be added. A later Semantic Contract evolution may establish a parent structure through an accepted doctrine source or a separate human semantic decision.

## Human Decision Recorded

Human authority approved **Alternative 1 — No Parent Data-Structure Obligation**.

The approved Candidate A parent Guvna Semantic Contract does not require a separately defined concrete data-structure schema at this stage.

The following classifications remain in force:

- Repository Adoption structures remain specialization structures.
- Repository Understanding and Knowledge System structures remain repository-specific.
- Indexes, manifests, and registries remain derivative/realization structures.
- Host/SDK/Runtime/Projection structures remain realization or specialization structures.
- The canonical artifact metadata surface remains a semantic requirement without selecting a concrete representation.

No parent schema is invented or selected. This decision resolves only the current parent data-structure blocker and does not reopen Gate 2 or Gate 4 decisions.

Identity, general reference resolution, Candidate Contract generation, ratification, applicability, artifacts, workspace paths, and implementation changes remain excluded.

## Explicit Boundary

This proposal does not:

- derive identity;
- resolve general references;
- generate a Candidate Semantic Contract;
- ratify or establish applicability;
- create artifacts or workspace paths;
- modify implementation;
- reopen Gate 2 or Gate 4 decisions; or
- promote Repository Adoption, repository, derivative, Runtime, SDK, Host, or Projection structures into the parent contract by existence alone.

**Current status:** `REVIEW`

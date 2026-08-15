# Governed Semantic Scope Authority Proposal

**Phase:** Semantic Model / Semantic IR population blocker resolution  
**Decision group:** Governed semantic scope only  
**State:** APPROVED  
**Scope:** Determine the governed semantic scope for the populated Semantic Model/Semantic IR instance

## Requested Human Decision

Review the scope finding below and provide the minimum concrete governed-scope decision required for population. This proposal does not address obligations, identity, references, Candidate Contract generation, lifecycle, compatibility, versioning, ratification, applicability, artifacts, or workspace paths.

## Accepted Authoritative Sources

The following accepted `doctrine/core/**` sources establish or constrain governed semantic scope:

1. **[EPISTEMIC-INVARIANTS.md](../../doctrine/core/constitution/EPISTEMIC-INVARIANTS.md)**
   - Repository Authority is interpreted within its applicable scope.
   - Authority over one Governed Repository does not automatically establish authority over Guvna constitutional doctrine, Guvna Semantic Contracts, unrelated repositories, unrelated domains, Host Implementation, Runtime implementation, or SDK implementation.
   - Authority must not be generalized beyond its accepted scope.

   **Scope consequence:** Repository authority scope cannot be generalized into Guvna Semantic Contract scope. Repository and Guvna ownership boundaries must remain distinct.

2. **[CONCEPTUAL-ARCHITECTURE.md](../../doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md)**
   - A Semantic Contract is a formally compiled semantic boundary between accepted Guvna meaning and realization.
   - The Semantic Contract defines Guvna-owned obligations and interpretation rules; it does not establish Repository Truth.
   - Governed Repository meaning enters through a separate repository-owned path and meets Guvna meaning at an explicit contract boundary.
   - A Runtime Contract is a specialization of an applicable parent Semantic Contract and must remain within that parent boundary.

   **Scope consequence:** The scope must identify the Guvna-owned semantic boundary represented by this contract and must not silently absorb repository-specific meaning or downstream realization scope.

3. **[ARCHITECTURAL-INVARIANTS.md](../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md)**
   - Contract Ratification establishes applicability for the governed scope.
   - Semantic compilation expresses accepted Guvna meaning and must not silently create new meaning.
   - Runtime, SDK, Host, and filesystem realization are not semantic sources.
   - Semantic ownership and dependency direction must be preserved.

   **Scope consequence:** The population process may represent a governed scope supplied by authoritative semantic inputs, but cannot invent it from realization surfaces or make it applicable through compilation.

4. **[SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md](../../doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md)**
   - Semantic Identity is unambiguous within its governing scope.
   - Semantic identity and meaning are independent of filesystem location, path, filename, directory, chronology, and repository position.
   - Artifact identity resolution is subordinate to semantic identity and its governing scope.

   **Scope consequence:** A path, package, directory, generated location, or repository layout cannot establish the scope. Scope must be an explicit semantic value carried by or attributable to the semantic input.

5. **[REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md](../../doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md)**
   - Repository Authority owns repository-specific acceptance within its declared scope.
   - Guvna Core owns adoption semantics and contracts; the Governed Repository owns repository-specific content.
   - Compatibility and adoption classifications are interpreted according to the semantic boundary being evaluated and the applicable semantic scope.

   **Scope consequence:** Repository adoption scope and Guvna contract scope must be represented as related but distinct boundaries. Repository-specific scope cannot be promoted to the Guvna contract scope without an explicit contract-defined boundary.

6. **Approved Gate 1 Semantic Model record**
   - The Gate 1 proposal identifies scope as a required model dimension and records the source boundary `doctrine/core/**`.
   - It remains `REVIEW`, contains a semantic-gap inventory, and is not a populated semantic instance or independent authority.

   **Scope consequence:** Gate 1 establishes that scope must be represented and provenance-bearing, but does not supply this instance's concrete scope.

7. **Approved Gate 2 Semantic IR record**
   - Scope is a required Semantic IR dimension.
   - Identity generation uses semantic scope as an input.
   - Compatibility and applicability require an explicit comparison/governed scope and exact scope matching.
   - Missing, unresolved, ambiguous, or unsupported scope causes fail-closed behavior.

   **Scope consequence:** Gate 2 constrains the representation and validation of scope but does not name the concrete governed scope for this instance.

8. **Approved Gate 4 decision groups**
   - Lifecycle/acceptance requires scoped, attributable transitions.
   - Compatibility requires a comparison scope and exact governed-scope agreement.
   - Versioning binds the contract version to the Guvna Semantic Contract subject and its governed semantic scope.

   **Scope consequence:** The three decisions depend on scope but do not provide its value. They cannot be used to infer one.

## Uniqueness Determination

The accepted sources do **not** uniquely establish the concrete governed semantic scope for this Semantic Model/Semantic IR instance.

They establish only these constraints:

- the scope must be semantic, explicit, attributable, and provenance-bearing;
- it must identify the boundary of the Guvna-owned semantic meaning represented by the model/contract;
- it must remain distinct from Governed Repository content and Repository Authority scope;
- it must support exact scope matching for compatibility/applicability evaluation;
- it must be independent of filesystem, package, implementation, process, generated-output, and repository-layout surfaces; and
- it must not be inferred from the absence of an Applicable Contract or from the initial version.

No accepted source identifies whether this particular instance governs, for example, all Guvna Core contract semantics, a specific Semantic Contract subject, a specific contract family, a specific consumer boundary, or another narrower Guvna-owned scope. Those alternatives are not interchangeable and must not be selected by implementation convenience.

## Finite Scope Candidates for Human Selection

The accepted sources support the following finite candidate set. These are scope choices, not inferred facts about the current instance. Each candidate preserves the doctrine's ownership and realization boundaries.

### Candidate A — Guvna Semantic Contract Parent Boundary (Recommended)

```text
scope identity: Guvna Semantic Contract semantic boundary
semantic subject: a Guvna-owned Semantic Contract expressing accepted Guvna meaning
included boundary: the contract's Guvna-owned concepts, interpretation rules, states,
   transitions, invariants, authority boundaries, provenance, compatibility, failure,
   and realization obligations as established by accepted doctrine and approved inputs
excluded adjacent domains: Governed Repository truth/content, Repository Authority,
   Runtime implementation, SDK implementation, Host behavior, Projection content,
   filesystem realization, package/process state, and generated artifacts
ownership: Guvna
consumer/context boundary: downstream Guvna-owned realizations governed by this parent
   Semantic Contract; no specific Runtime, SDK, Host, or Projection specialization
```

**Supporting sources:** `CONCEPTUAL-ARCHITECTURE.md` defines the Semantic Contract as the formally compiled boundary between accepted Guvna meaning and realization, and assigns Semantic Contract ownership to Guvna. `ARCHITECTURAL-INVARIANTS.md` defines the doctrine-to-contract dependency direction and keeps compilation, validation, ratification, and applicability distinct. `SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md` requires semantic identity and scope to remain independent of realization. The approved Gate 4 version proposal names the Guvna Semantic Contract as the version-bearing subject.

**Semantic Model/IR consequence:** Populate one parent Guvna contract boundary and represent Runtime, SDK, Host, Projection, and repository paths only as related excluded or downstream boundaries. The model must not populate a specialization-specific consumer scope.

### Candidate B — Repository Adoption Semantic Contract Boundary

```text
scope identity: Guvna-owned Repository Adoption Semantic Contract boundary
semantic subject: the Semantic Contract governing Repository Adoption information
included boundary: adoption information classes, adoption states/transitions,
   authority boundary, acceptance/provenance, normalization, projection, compatibility,
   and failure semantics defined by the Repository Adoption Information Contract
excluded adjacent domains: repository-specific truth/content and Repository Authority
   decisions, general Guvna Contract semantics outside adoption, Runtime/SDK/Host
   implementations, filesystem realization, and generated artifacts
ownership: Guvna for adoption contract meaning; Governed Repository for repository-specific
   content and Repository Authority decisions
consumer/context boundary: Repository Adoption and its repository-facing contract boundary
```

**Supporting sources:** `REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md` explicitly defines a versioned Semantic Contract for Repository Adoption, assigns adoption semantics to Guvna Core, and preserves repository-specific acceptance ownership. `CONCEPTUAL-ARCHITECTURE.md` supports named Semantic Contract boundaries and separate repository ownership.

**Semantic Model/IR consequence:** Populate a narrower adoption-contract subject and exclude general Guvna contract semantics not established as part of Repository Adoption. This candidate is defensible only if the human authority identifies this population instance as the Repository Adoption contract rather than a general parent contract.

### Candidate C — Named Guvna Contract Specialization Boundary

```text
scope identity: an explicitly named Guvna-owned specialization of a parent Semantic Contract
semantic subject: the named Runtime Contract, SDK contract, Projection Contract, or other
   contract specialization
included boundary: only the specialization's contract-defined obligations and interpretation
   within the parent Semantic Contract boundary
excluded adjacent domains: parent-contract meaning not specialized here, other
   specializations, repository-specific content, unrelated consumer contexts, implementations,
   filesystem realization, and generated artifacts
ownership: Guvna for specialization semantics; repository ownership remains separate where
   repository projections are involved
consumer/context boundary: the explicitly named consumer or realization boundary
```

**Supporting sources:** `CONCEPTUAL-ARCHITECTURE.md` defines Runtime Contracts as strict specializations of an applicable parent Semantic Contract and states that Projection Contracts may specialize existing semantics but may not introduce independent Guvna semantics. `ARCHITECTURAL-INVARIANTS.md` preserves the parent-to-realization dependency direction.

**Semantic Model/IR consequence:** A parent contract identity and boundary must already be attributable, and the specialization must be explicitly named. Without those inputs this candidate cannot be populated uniquely. It is therefore a valid doctrinal category but not a viable default for the current instance.

## Recommended Candidate

**Recommend Candidate A — Guvna Semantic Contract Parent Boundary.**

It is the best fit because:

1. The approved versioning decision explicitly makes the Guvna Semantic Contract the version-bearing subject and supplies the initial `1.0.0` path.
2. The approved Semantic IR boundary is a generic, provenance-preserving representation of Guvna semantic meaning that compiles toward a Candidate Semantic Contract, not a Runtime/SDK implementation or repository projection.
3. The approved lifecycle/acceptance rules describe the Contract lifecycle itself, including Candidate, Validated, Ratified, Applicable, Superseded, Rejected, and Retired, without requiring a narrower consumer specialization.
4. The approved compatibility rules compare contract subjects within an explicitly governed scope and do not authorize choosing a Runtime, SDK, Projection, or repository scope by inference.
5. It preserves the doctrine's separation between Guvna-owned contract meaning and repository-owned content while leaving future specializations subordinate to the parent boundary.

This recommendation is not an approval or an inferred fact. Human authority must select and approve one candidate, including the candidate's concrete semantic identity and boundary wording, before it can be used as a scope input.

## Minimum Concrete Scope Decision Required

Human authority must select exactly one candidate above, or reject all candidates with a specific alternative grounded in accepted doctrine. The decision must record:

```text
selected candidate: A, B, or C
scope identity: the selected candidate's explicit semantic identity
semantic subject: the selected Guvna-owned contract subject
included boundary: the selected candidate's included semantic meaning
excluded adjacent domains: explicit exclusions and ownership boundaries
ownership: Guvna ownership and any separately related repository ownership
consumer/context boundary: the selected parent, adoption, or named specialization context
provenance: authoritative source passages and human decision record
```

Human authority is selecting a concrete semantic scope only. The decision must not create a Contract artifact, designate a workspace path, establish applicability, or ratify a Candidate Contract.

The decision need not create a Contract artifact, designate a workspace path, establish applicability, or ratify a Candidate Contract. It must only provide the semantic scope input required for population.

## Population Boundary After Scope Decision

Once an attributable concrete scope decision is supplied, the population process may deterministically:

- record the scope and its provenance in the review-bound Semantic Model/Semantic IR;
- validate that all populated scope references remain within the declared boundary;
- preserve related repository boundaries without merging ownership; and
- report any remaining scope conflict or unsupported content as a specific blocker.

The process may not use the scope decision to infer obligations, identity, reference targets, or Candidate Contract content. Those remain outside this proposal.

## Human Decision Requested

Selected and approved by human authority:

```text
candidate: A
scope identity: Guvna Semantic Contract semantic boundary
semantic subject: a Guvna-owned Semantic Contract expressing accepted Guvna meaning
ownership: Guvna
consumer/context boundary: downstream Guvna-owned realizations governed by this parent
   Semantic Contract; no specific Runtime, SDK, Host, or Projection specialization
```

The approved included and excluded boundaries are the Candidate A values stated above. This approval establishes only the governed semantic scope input. It does not approve the populated Semantic Model/Semantic IR as complete or suitable for Gate 4, and it does not authorize Candidate Contract generation, ratification, applicability, artifact creation, or workspace-path designation.

This proposal remains `REVIEW`. It does not modify implementation or semantic artifacts, execute population, generate a Candidate Semantic Contract, ratify or apply a contract, create an artifact, or designate a workspace path.

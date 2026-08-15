# Contract-Specific Obligations and Meaning Authority-Gap Proposal

**Phase:** Semantic Model / Semantic IR population blocker resolution  
**Decision group:** Guvna Semantic Contract obligations and meaning only  
**State:** APPROVED  
**Approved scope:** Candidate A — Guvna Semantic Contract semantic boundary

## Scope Boundary

This proposal addresses only the Guvna Semantic Contract's contract-specific obligations and meaning within the approved Candidate A scope:

- **Subject:** a Guvna-owned Semantic Contract expressing accepted Guvna meaning.
- **Included:** Guvna-owned concepts, interpretation rules, states, transitions, invariants, authority boundaries, provenance, compatibility, failure, and realization obligations established by accepted doctrine and approved inputs.
- **Excluded:** Governed Repository truth/content, Repository Authority, Runtime implementation, SDK implementation, Host behavior, Projection content, filesystem realization, package/process state, and generated artifacts.

This proposal does not address deterministic identity, general reference resolution, Candidate Semantic Contract generation, ratification, applicability, artifacts, or workspace paths.

## Accepted Authoritative Sources

### 1. `doctrine/core/architecture/CONCEPTUAL-ARCHITECTURE.md`

The Semantic Contract section establishes that a Semantic Contract is a versioned expression of accepted Guvna semantics defining obligations and interpretation rules for downstream realizations. It identifies the possible contract content categories:

- concepts;
- data structures;
- operations;
- states;
- transitions;
- invariants;
- authority boundaries;
- provenance requirements;
- compatibility requirements;
- failure behavior; and
- realization obligations.

It also establishes that the contract is a boundary between accepted Guvna meaning and realization, does not establish Repository Truth, and defines Guvna semantic obligations that downstream realizations must honor.

The Runtime Contract and Projection Contract sections constrain specializations: they derive from a parent contract, preserve its obligations, and may not introduce independent Guvna semantics.

### 2. `doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md`

The architectural dependency and ratification sections establish that:

- accepted doctrine precedes semantic compilation;
- semantic compilation formally expresses accepted meaning and must not silently create new meaning;
- semantic validation checks structural and semantic conformance to governing sources;
- Contract Ratification is distinct from compilation, validation, and applicability;
- Candidate, Validated, Ratified, Applicable, Superseded, and Incompatible or Rejected states remain distinct; and
- downstream realizations cannot become semantic sources.

The Guvna ownership, semantic evolution, projection specialization, Runtime interpretation, explicit adoption, compatibility, and ratification invariants further establish that contract obligations must remain attributable, version-bounded, contract-governed, and distinct from repository acceptance and implementation behavior.

### 3. `doctrine/core/canonical/SEMANTIC-IDENTITY-AND-FILESYSTEM-REALIZATION.md`

This source constrains contract meaning by distinguishing semantic meaning from realization. It establishes that:

- semantic identity and meaning are not supplied by filesystem location;
- lifecycle, acceptance, provenance, and realization are distinct dimensions;
- generated artifacts cannot silently become canonical semantic sources;
- Projection Contracts are strict specializations and cannot introduce independent Guvna semantics; and
- contract evolution concerns material semantic meaning or obligations, not implementation-only changes.

Identity content itself is intentionally excluded from this proposal.

### 4. `doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md`

This source is an accepted Guvna-owned Semantic Contract and provides concrete doctrine-grounded examples of contract obligations and meaning categories:

- information classes and their distinctions;
- authority context and Repository Authority boundary;
- evidence, provisional understanding, candidate statements, authority decisions, acceptance, provenance, normalization, projection, compatibility, and failure behavior;
- explicit state/transition preconditions and authority context; and
- separation of Guvna contract semantics from repository-specific accepted content.

It constrains the parent scope by demonstrating that repository-specific content is supplied by the Governed Repository and Repository Authority, while Guvna defines the contract through which that content is interpreted.

### 5. `doctrine/core/constitution/EPISTEMIC-INVARIANTS.md`

This source constrains meaning and obligation boundaries by establishing:

- authority scope;
- the distinction between Guvna semantic authority and Repository Authority;
- acceptance as the mechanism for accepted repository-specific meaning; and
- the prohibition on generalizing authority beyond its accepted scope.

It does not by itself enumerate a complete Guvna Semantic Contract obligation set.

### 6. Approved Gate 1 and Gate 2 semantic decisions

The approved decisions establish the generic semantic kernel and the distinctions that the populated model must preserve:

- concepts, relationships, constraints, transitions, derivations, contracts, realizations, scope, meaning, identity, version, and authority/acceptance context;
- distinct Authority Decision, Acceptance, Provenance, Uncertainty, and Contradiction;
- distinct lifecycle, acceptance, ratification, applicability, supersession, rejection, and retirement;
- semantic version and contextual compatibility as separate from authority and applicability;
- provenance preservation, conflict preservation, and fail-closed unresolved ambiguity; and
- Guvna-owned contract semantics separate from Runtime, SDK, Host, Projection, and repository realization.

The Gate 2 record supplies the representation boundary and semantic distinctions, not a fully populated contract obligation set.

### 7. Approved Gate 4 decision groups

The approved Gate 4 groups establish, within this scope:

- the lifecycle and acceptance vocabulary and transition matrix;
- the compatibility requirement schema, preservation predicates, result vocabulary, comparison direction, and fail-closed behavior; and
- the Guvna Semantic Contract as version-bearing subject, initial version `1.0.0`, initial/no-predecessor status, and Semantic Delta `not-applicable` / absent.

They constrain these dimensions but do not supply every other contract-specific obligation or interpretation.

## Doctrine-Established Obligations and Meaning

The following meaning is already established and must be populated without a new semantic choice:

1. The contract expresses accepted Guvna meaning; it is not an independent source of that meaning.
2. The contract defines machine-consumable obligations and interpretation rules for conforming downstream realizations.
3. The contract boundary is Guvna-owned and must not absorb Repository Truth, Repository Authority decisions, or implementation behavior.
4. Contract content must preserve the distinctions among concepts, states, transitions, invariants, authority, acceptance, provenance, uncertainty, contradiction, compatibility, failure, and realization.
5. Semantic compilation and validation cannot ratify or establish applicability.
6. Runtime, SDK, Host, Projection, filesystem, generated output, and tooling cannot supply missing contract meaning.
7. Runtime and Projection specializations must remain within the parent contract boundary and preserve parent obligations.
8. Lifecycle/acceptance semantics are the approved Decision Group 1 values and transitions.
9. Compatibility semantics are the approved Decision Group 2 requirements, predicates, results, direction, scope, and fail-closed rules.
10. Version semantics are the approved Decision Group 3 initial `1.0.0` input with no predecessor comparison and `Semantic Delta: not-applicable` / absent.
11. Contract evolution must distinguish material semantic change from implementation-only change and preserve attributable semantic provenance.

These are established obligations and boundaries, not optional alternatives.

## Genuinely Unresolved Meaning

The sources do not uniquely determine the following parent-contract content:

1. **Applicable obligation categories:** The Semantic Contract source says the listed categories apply “as applicable,” but no accepted source identifies which of concepts, data structures, operations, states, transitions, invariants, authority boundaries, provenance requirements, compatibility requirements, failure behavior, and realization obligations are in scope for this particular parent contract beyond the categories already explicitly approved by Gate 2 and Gate 4.
2. **Concrete interpretation rules:** The sources establish that the contract must define interpretation rules, but do not provide the complete machine-consumable interpretation of every Guvna-owned concept within this instance.
3. **Contract-level operation and data-structure meaning:** The architecture lists operations and data structures as possible contract content but does not identify a complete set or their precise semantic meanings for this parent boundary.
4. **Failure meaning beyond approved fail-closed rules:** The approved decisions establish fail-closed behavior for their own unresolved inputs, but do not establish every contract-level failure classification or response for other missing/invalid semantic content.
5. **Realization obligation coverage:** The parent contract must define obligations for conforming realizations, but the sources do not select the complete set of obligations common to all downstream Guvna realizations versus obligations reserved for later Runtime, SDK, Host, or Projection specializations.

These are semantic gaps. They cannot be filled from implementation structure, existing tests, Runtime/SDK behavior, repository content, or convenience.

## Finite Doctrine-Grounded Alternatives

The sources permit only these bounded ways to resolve the phrase “as applicable” for this parent scope:

### Alternative 1 — Parent Contract Kernel Only

Populate only the obligations explicitly common to the parent Guvna Semantic Contract boundary: interpretation boundary, authority/acceptance distinctions, provenance, lifecycle/acceptance, compatibility, failure, semantic evolution, and preservation obligations for downstream specializations. Leave data structures and operations to separately approved specializations unless accepted doctrine explicitly establishes them as parent obligations.

**Minimum human decision:** Approve this applicability rule and identify the accepted doctrine passages that make each included category common to the parent contract. Explicitly record that no additional operation/data-structure obligation is implied.

### Alternative 2 — Full Listed Parent Contract Categories

Populate every category listed by the Semantic Contract doctrine as applicable to this parent boundary: concepts, data structures, operations, states, transitions, invariants, authority boundaries, provenance requirements, compatibility requirements, failure behavior, and realization obligations. Each category must still be populated only from accepted doctrine and approved decisions; unsupported category content remains a blocker.

**Minimum human decision:** Approve the applicability of every listed category to the parent contract and provide or accept the doctrine-grounded semantic source for each category's concrete content. This does not authorize invented content.

### Alternative 3 — Parent Contract Plus Explicitly Named Doctrine-Defined Content

Populate the parent contract kernel and add only those additional categories or meanings that a human authority explicitly identifies as already established by a named accepted `doctrine/core/**` source. No category is included merely because it appears in the generic list.

**Minimum human decision:** Approve the exact category/source mapping, including which named doctrine passages establish each additional obligation or interpretation. Any unmapped category remains outside scope or blocked.

No alternative permits Runtime, SDK, Host, Projection, repository, filesystem, process, or generated output to define parent obligations.

## Recommended Decision

**Recommend Alternative 3 — Parent Contract Plus Explicitly Named Doctrine-Defined Content.**

It best preserves the governing rule that semantic compilation must express accepted meaning without silently creating it. It also preserves the approved generic Semantic IR boundary and the already-approved lifecycle, compatibility, and version decisions without assuming that every generic schema category is automatically a concrete parent obligation.

Under this recommendation:

- the parent contract kernel includes the doctrine-established boundary and the approved Gate 2/Gate 4 semantic decisions;
- each additional obligation or interpretation is included only with a named accepted source and provenance;
- unsupported or ambiguous content remains a specific blocker; and
- no implementation or realization behavior supplies missing meaning.

This recommendation is not an approval and does not populate the model by itself.

## Minimum Concrete Human-Authority Decision

Human authority must approve or revise:

1. Alternative 1, 2, or 3 above.
2. The exact applicable obligation-category set for the Candidate A parent contract.
3. For every included category, the accepted doctrine source passage establishing its concrete meaning or the explicit determination that the category remains unresolved and outside the current population.
4. The complete parent-versus-specialization boundary for realization obligations.
5. Any failure semantics beyond the already-approved fail-closed rules.
6. Any operation or data-structure semantics not already explicit in accepted doctrine.

The decision must preserve the already-approved Gate 2 and Gate 4 meanings and must not introduce new obligations by implementation inference.

## Execution Boundary

After this proposal is approved, population may extract and assemble only the authority-approved obligation/meaning set and its provenance. It must fail closed on unsupported or ambiguous content and return the specific blocker.

This proposal does not authorize deterministic identity derivation, general reference resolution, Candidate Semantic Contract generation, ratification, applicability, artifact creation, workspace-path designation, or implementation changes.

## Human Decision Recorded

Human authority approved **Alternative 3 — Parent Contract Plus Explicitly Named Doctrine-Defined Content**.

The approved rule is:

- Include the doctrine-established parent contract kernel and all already-approved Gate 2/Gate 4 semantic decisions.
- Include any additional obligation, interpretation, operation, data structure, failure meaning, or realization obligation only when its concrete meaning is established by a named accepted `doctrine/core/**` source.
- Preserve provenance for every included semantic element.
- Do not infer applicability merely because a category appears in the generic Semantic Contract category list.
- Unsupported or ambiguous categories remain outside the populated model or remain an explicit blocker.
- Runtime, SDK, Host, Projection, repository, filesystem, process, generated output, or implementation behavior may not supply missing meaning.

Population is authorized to extract and assemble the doctrine-grounded obligation/source mapping deterministically. It must not require human authority to manually enumerate every doctrine-established obligation before population proceeds. This approval does not approve the resulting populated instance as complete or suitable for Gate 4; that remains a separate human acceptance decision.

Identity, general reference resolution, Candidate Contract generation, ratification, applicability, artifact creation, workspace paths, and implementation changes remain excluded.

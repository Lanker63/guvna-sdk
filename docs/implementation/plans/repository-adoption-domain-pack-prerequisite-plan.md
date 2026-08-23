# Repository Adoption Domain Pack Prerequisite Plan

## Status

Conditional. This plan records the resolved implementation path for the session conclusion that repository adoption requires at least one entitled Domain Pack per repository before adoption can complete.

## 1. Desired State and Scope

Desired state:

- The intended end-user flow is: install the VS Code extension, open one or more not-yet-governed repositories, authenticate a principal through Guvna, obtain licensee-backed eligibility for at least one Domain Pack per repository, install the selected eligible pack, perform repository adoption with explicit Repository Authority review, persist acceptance and provenance, generate a version-pinned governance projection, and only then enable Runtime for governed operations.
- Multiple repositories in a workspace must each be adopted independently.
- Multiple packs may be installed.
- A pack update, removal, entitlement loss, or compatibility loss must trigger re-adoption.

Scope:

- Repository adoption prerequisites for Domain Pack installation and selection.
- Licensee-backed eligibility, compatibility reporting, and Repository Authority review.
- Repository-scoped adoption state, acceptance, provenance, and governance projection pinning.
- Runtime enablement only after adoption completes.
- Excluded: any new Doctrine meaning, any direct reinterpretation of Runtime authority, and any change that would make a pack optional for repository adoption.

## 2. Authority and Requirement Ledger

Approved requirements from the session resolution:

- At least one entitled Domain Pack is required per repository before adoption can complete.
- Multiple packs may be installed.
- Pack selection is performed by an authenticated Guvna principal, with eligibility granted by licensee entitlements through the web surface(s), whether Individual or Organization subscription.
- Ungoverned repositories may install only an approved and entitled pack.
- Pack incompatibility must be identified and its rationale shared with Repository Authority.
- Users do not inspect pack contents before installation; public pack metadata must still be available to Repository Authority.
- Installation must include whatever is required to enable full functionality, not merely the manifest.
- Removing or changing a pack requires re-adoption.
- Bundled agents or similar capabilities that can delegate authority or mutate repository files require separate Repository Authority approval.
- Bundled agents may later receive delegated authority only if the Domain Pack identifies them as capable.
- Domain Pack identity and version are pinned into the resulting governance projection.
- Future Domain Pack updates may require re-adoption to expose new capabilities or semantics.

Applicable authority sources already present in the workspace:

- [doctrine/core/architecture/DOMAIN-PACK-INFORMATION-CONTRACT.md](../../../doctrine/core/architecture/DOMAIN-PACK-INFORMATION-CONTRACT.md)
- [doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md](../../../doctrine/core/architecture/REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md)
- [doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md](../../../doctrine/core/architecture/ARCHITECTURAL-INVARIANTS.md)

Relevant implementation evidence:

- `guvna-vscode` currently exposes post-admission commands for Domain Pack discovery and installation, but those commands require an already admitted Runtime context.
- `guvna-vscode` currently persists only a pack manifest under `.guvna/domain-packs/<pack-id>/manifest.json` and has no pre-governance adoption workflow.
- `guvna-vscode` currently has an inert runtime transport unless `guvna.runtimeEndpoint` is configured.
- `guvna-web` already has authenticated licensee/session flows, repository authority overview/admin services, an optional signed adoption-completion ingress, and repository catalog storage, but it does not yet expose a complete entitlement-backed pack selection and adoption completion workflow to the extension.
- `core` already provides runtime-admission, applicable semantic context resolution, runtime projection export, Domain Pack manifest validation, and Runtime semantic rule execution, but it does not yet provide the pre-governance adoption boundary required by this resolution.

## 3. Current State

- The current VS Code Domain Pack install path assumes admitted Runtime context; it must be split so pre-governance adoption can install entitled packs without fabricated runtime admission.
- There is no complete entitlement-backed pack catalog selection flow between web licensee services and the VS Code host.
- The current storage model records only a manifest; the resolution requires a full-content realization sufficient for the pack’s functionality.
- The current host lacks a repository-scoped adoption state machine that records installed pack identity, version, compatibility, acceptance, delegation requirements, and re-adoption triggers.

## 4. Gaps, Blockers, and Assumptions

Blockers:

- The current VS Code Domain Pack install path assumes admitted Runtime context; this must be split so pre-governance adoption can install entitled packs without fabricated runtime admission.
- There is no complete entitlement-backed pack catalog selection flow between web licensee services and the VS Code host.
- The current storage model records only a manifest; the resolution requires a full-content realization sufficient for the pack’s functionality.
- The current host lacks a repository-scoped adoption state machine that records installed pack identity, version, compatibility, acceptance, delegation requirements, and re-adoption triggers.

Assumptions already resolved by the session:

- Every repository requires any one entitled pack; workspace-level coverage is insufficient.
- Pack selection comes from authenticated user or principal actions constrained by licensee entitlements.

## 5. Phased Plan

### Phase 1: Define the Pre-Governance Adoption Boundary

Objective

Separate repository adoption from Runtime admission so Domain Pack installation can occur before governance is complete.

Inputs and prerequisites

- Approved session resolution.
- Existing doctrine.
- Current core and SDK host contracts.

Scope and concrete work items

- Introduce or extend the adoption-facing SDK/Core contract surfaces needed to discover eligible packs, install packs pre-admission, and report compatibility and adoption status without requiring admitted Runtime context.
- Preserve fail-closed behavior.

Validation and evidence

- Focused unit tests for the new contract surfaces and rejection paths.
- Compile and typecheck for affected packages.

Exit criteria

- The adoption workflow can be initiated without runtime admission.
- Unauthorized or malformed inputs fail closed.

Stop conditions

- No fabricated applicable context.
- No entitlement or compatibility inference in the host.

### Phase 2: Implement Licensee-Backed Pack Entitlement and Selection

Objective

Make eligible packs discoverable and selectable only by authenticated principals through the web surface(s).

Inputs and prerequisites

- Session-authenticated principal.
- Repository catalog.
- Entitlement data.
- Current web auth services.

Scope and concrete work items

- Add or extend web-side services or endpoints so the licensee surface can present entitled packs for a repository.
- Reject unentitled packs.
- Return structured incompatibility rationale to Repository Authority.
- Keep public metadata available but do not expose raw contents to the end user.

Validation and evidence

- Integration tests covering auth, entitlement filtering, compatibility failure reporting, and non-leakage across organizations and repositories.

Exit criteria

- The web side can authoritatively say which packs are eligible for a principal and repository.
- The web side can explain incompatibility to Repository Authority.

Stop conditions

- No pack is installable without entitlement.
- No cross-organization leakage.

### Phase 3: Implement Pre-Governance Domain Pack Installation and Repository-Bound State

Objective

Install the full required pack realization into the target repository and persist repository-scoped state needed for adoption and re-adoption.

Inputs and prerequisites

- Phase 1 and Phase 2 complete.
- Chosen eligible pack.
- Repository identity.
- Pack provenance.

Scope and concrete work items

- Expand the host’s Domain Pack storage beyond manifest-only persistence to store whatever content is required for full functionality.
- Record pack identity, version, provenance, entitlement reference, compatibility result, and repository binding.
- Detect pack removal or change and mark re-adoption required.

Validation and evidence

- Host unit tests for installation, persistence, path safety, repository binding, and re-adoption invalidation.

Exit criteria

- A repository can contain an installed entitled pack whose installed state is durable and independently tracked.

Stop conditions

- Pack data must never be treated as governance acceptance.
- Repository binding must remain explicit.

### Phase 4: Complete Adoption Completion and Acceptance Flow

Objective

Turn installed pack-derived evidence into candidate statements, Repository Authority decisions, and persisted acceptance and provenance.

Inputs and prerequisites

- Installed eligible pack.
- Web authority services.
- Adoption completion ingress.
- Current authority context.

Scope and concrete work items

- Wire the adoption-completion ingress and host workflows so the acceptance flow can submit adoption results, record provenance, and apply explicit authority decisions.
- Add separate approval paths for bundled agents or mutation-capable content when present.

Validation and evidence

- End-to-end tests for signed adoption completion, authority review, acceptance persistence, and explicit delegation approval for agent-capable content.

Exit criteria

- Accepted pack-derived content is recorded and the repository becomes governed only after authority approval.

Stop conditions

- Bundled agents never gain authority by inclusion alone.
- Mutation-capable content never bypasses explicit approval.

### Phase 5: Generate and Pin the Governance Projection

Objective

Derive the repository’s governance projection from the accepted, version-pinned Domain Pack state.

Inputs and prerequisites

- Accepted adoption outcome.
- Approved pack identity and version.
- Current acceptance and provenance data.

Scope and concrete work items

- Compile the projection from the accepted repository state.
- Include the required provenance and compatibility metadata.
- Ensure pack updates or removals trigger re-adoption and projection refresh.

Validation and evidence

- Projection export tests.
- Freshness and currentness checks.
- Regression tests proving version pinning and re-adoption on pack change.

Exit criteria

- A current governance projection exists only for the accepted pack version or versions and fails stale when the pack state changes.

Stop conditions

- Runtime must not become the source of governance authority.

### Phase 6: Enable Runtime Only After Adoption Completes

Objective

Ensure runtime-gateway-host and VS Code runtime operations remain post-governance realization boundaries.

Inputs and prerequisites

- Current governance projection.
- Approved Runtime rules module.
- Configured runtime endpoint.

Scope and concrete work items

- Keep runtime-gateway-host as the post-governance host.
- Wire the VS Code runtime transport only to admitted, governed repositories.
- Maintain fail-closed behavior for missing or invalid runtime configuration.

Validation and evidence

- Runtime gateway tests.
- Host transport tests.
- Manual smoke checks against a governed repository only.

Exit criteria

- Runtime operations work only after adoption and projection are complete.

Stop conditions

- No runtime path is used to bootstrap adoption.

## 6. Certification Matrix

- Phase 1: unit tests and compile or typecheck for any new adoption-facing SDK/Core surfaces; failure paths for malformed or unauthorized inputs.
- Phase 2: web integration tests proving entitlement filtering, eligibility presentation, and incompatibility reporting.
- Phase 3: host tests proving full-content persistence, repository binding, and re-adoption invalidation.
- Phase 4: signed adoption-completion ingress tests and authority approval tests.
- Phase 5: projection export and freshness tests proving pinned governance projection behavior.
- Phase 6: runtime gateway and host transport tests proving Runtime is only reachable after governance exists.

## 7. Open Authority Decisions

- None remain for the session resolution itself; the required pack policy, entitlement source, compatibility reporting, content preview restrictions, delegation approval, and version pinning have been resolved.
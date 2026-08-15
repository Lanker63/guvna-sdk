# Phase 0 Baseline Review

**Phase:** 0 - Establish Baseline
**Authority gate:** Gate 0 - Baseline Authority Gate
**State:** APPROVED
**Plan status:** Proposed; awaiting explicit Phase 0 authorization

## Doctrine sources

Accepted doctrine currently includes:

- `doctrine/core/constitution/`: constitutional invariants and vision.
- `doctrine/core/canonical/`: Repository Intelligence, Repository Understanding, and semantic identity/filesystem realization.
- `doctrine/core/architecture/`: conceptual architecture, architectural invariants, host architecture, repository adoption information contract.
- `doctrine/agentic/*` is operational process guidance for agent coordination. It is not part of core doctrine and is excluded from core semantic realization inputs.

The attached implementation plan is a proposed process artifact, not semantic authority. The agent operating model is process authority only; neither it nor the implementation plan is a core semantic realization input.

## Semantic baseline

Doctrine establishes epistemic and authority distinctions, canonical repository concepts, semantic identity independent of filesystem location, contract lifecycle and ratification boundaries, provenance and compatibility requirements, and Runtime/SDK/Projection ownership boundaries.

`REPOSITORY-ADOPTION-INFORMATION-CONTRACT.md` is the most concrete current contract-like doctrine and defines information classes, states, transitions, provenance, compatibility, projection, and fail-closed behavior.

## Repository baseline

- `core/runtime/` contains only `.gitkeep`.
- `core/sdk/` contains only `.gitkeep`.
- No Semantic Model, Semantic IR, compiler, Candidate Contract, Applicable Contract, Runtime Contract, SDK Contract, Projection Contract, generator, or generated semantic artifact exists.
- `core/tests/require-folders.test.ts` only verifies the Runtime and SDK directories.
- `core/package.json` provides build, typecheck, test, and platform-validation scripts.
- No repository-specific Knowledge, Understanding, Governance, or Governance Projection artifacts were found.
- `.guvna/agent-state/` is process state/evidence only and is not semantic authority.

## Working boundaries

Guvna owns Guvna semantics, contracts, compilation, Runtime/SDK/Projection contract definitions, provenance, and compatibility. For core realization, the semantic source boundary is `doctrine/core/**`; `doctrine/agentic/**` is excluded. A Governed Repository owns repository-specific truth, accepted knowledge, governance, and repository projections. Runtime and SDK must be derived independently from a common applicable semantic parent.

## Unknowns and semantic gaps

- No accepted generic Semantic Model or Semantic IR schema exists.
- No accepted generic normalization, canonical ordering, serialization, or deterministic identity algorithm exists.
- The generic compiler vocabulary for operations, states, transitions, failure semantics, and realization obligations is not complete across all domains.
- The authoritative inclusion, version, digest, and applicability rule for the "current doctrine set" is unspecified.
- Conflict precedence among accepted doctrine sources is unspecified.
- No ratified/applicable Runtime or SDK contract exists.

These are explicit gaps. They must not be resolved by implementation inference.

## Conflicts

The doctrine guardians found no direct architectural conflict between the proposed plan and accepted doctrine. The principal risk is premature Runtime/SDK implementation, which would bypass semantic compilation and Contract Ratification.

## Proposed next action

Submit this baseline for explicit human approval at **Gate 0**. Until approval is recorded, perform no semantic-model, compiler, contract, Runtime, SDK, generator, projection, or publication mutation.

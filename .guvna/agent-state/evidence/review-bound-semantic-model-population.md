# Review-Bound Semantic Model Population Evidence

**Result:** REVIEW-BOUND POPULATION COMPLETE
**Model:** `.guvna/agent-state/review/review-bound-semantic-model.yaml`
**Authority boundary:** Approved Parent Semantic Selection only. This evidence
does not create semantic identities, a SemanticIR, a Contract, ratification,
applicability, an artifact, a workspace path, or downstream realization.

## Source-to-Record Mapping

| Source handle | Populated records |
|---|---|
| `src-conceptual-contract` | scope, Semantic Contract concept, contract interpretation relation |
| `src-semantic-identity` | Semantic Identity, Semantic Version, Lifecycle State, identity/realization relation, canonical identity reference obligation |
| `src-architectural-dependency` | Semantic Compilation concept, compilation/candidate relation |
| `src-architectural-ratification` | Accepted Guvna Meaning concept, Contract Ratification concept, accepted-meaning/compilation and ratification/ratified relations, non-invention and non-applicability constraints |
| `src-architectural-invariants` | source/realization, ownership, compatibility, realization, provenance, boundary, history, and fail-closed constraints |
| `src-epistemic-provenance` | Guvna Authority, Provenance, Uncertainty, authority separation, provenance, uncertainty, and compatibility-failure constraints |
| `src-lifecycle-compatibility` | seven states, six operations, nine transitions, three failure constraints, and eight compatibility capabilities |

## Populated Record Counts

| Category | Count |
|---|---:|
| Scope | 1 |
| Source records | 7 |
| Concepts | 10 |
| States | 7 |
| Operations | 6 |
| Relations | 5 |
| Constraints and obligations | 18 |
| Transitions | 9 |
| Compatibility capabilities | 8 |
| Explicit source attributions | 5 |
| Reference-resolution entries | 18 |
| Per-target dependency classifications | 64 |
| Ordering classifications | 9 |
| Transformation dependency chains | 0 |

## Review Handle Boundary

All `rbsm-*`, `src-*`, and `selection-*` values in the model are review-local
handles. They are unique within the model, are never SemanticIdentity values,
and are forbidden from identity preimages by the approved bridge/materializer
boundary.

## Reference Resolution

Every `rbsm-ref-*` entry resolves to an included scope, state, operation, or
concept handle. No reference targets a specialization, repository-specific
record, temporary process state, filesystem location, historical Contract
metadata, or unselected external meaning.

## Materialization Metadata

The YAML dependency classifications cover every populated target as a
scope-bootstrap, node, relation, constraint, transition, or
compatibility-capability target. They declare same-preimage self stripping and
explicit resolved independent dependencies without assigning any identity
value. Per-array classifications carry only approved provenance source-reference
and parent collection ordering. Empty compatibility requirements are a
non-comparative disposition, not an assertion of compatibility.

## Scope Representation

The model records the approved Guvna-owned semantic-contract boundary and
formal accepted-Guvna-meaning subject with source attribution. It intentionally
contains no scope SemanticIdentity. Scope bootstrap remains a later separately
authorized identity operation.

## Exclusions

Repository-Adoption specialization semantics, repository-specific meaning,
repository acceptance workflow, Runtime/SDK/Host/Projection behavior and
schemas, transport, persistence, model/provider integrations, implementation
details, and process state are excluded.

## Unresolved Inputs

None for review-bound population. Identity values, scope bootstrap, final
SemanticRefs, and materializer object-reference sets are intentionally later
identity-materialization outputs or execution inputs, not population gaps.
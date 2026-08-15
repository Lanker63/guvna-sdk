# Semantic IR Implementation Extract

**Status:** SPECIFICATION ONLY. This derivative extract does not instantiate a
Semantic IR, create a Contract, or establish semantic authority.

**Source:**
[`gate-2-semantic-ir-proposal.md`](../../../.guvna/agent-state/proposals/gate-2-semantic-ir-proposal.md),
sections "Proposed TypeScript structure", "Gate 2 Gap 2", "Gate 2 - Version
and Compatibility Comparison Proposal", and "Gate 2 - Applicability
Determination Proposal".

## Structural Kernel

Implement the following records directly from the source specification:

- `SemanticIR`: `irKind`, `irVersion`, `semanticIdentity`, optional
  `semanticVersion`, `semanticScope`, `meaning`, collections of concepts,
  relationships, constraints, transitions, derivations, contracts, and
  realizations, plus authority context, provenance graph, and compatibility
  requirements.
- `SemanticEntity`: identity, kind (`concept`, `artifact`, `actor`, `scope`, or
  `state`), meaning, attributes, lifecycle, acceptance, and provenance.
- `SemanticRelationship`, `SemanticConstraint`, `SemanticTransition`, and
  `SemanticDerivation`: identity-bearing relationship, rule, transition, and
  derivation records with explicit references, scope, and provenance.
- `SemanticContractReference` and `RealizationReference`: a contract's
  lifecycle/applicability/ratification context and a realization's conformance
  and compatibility context.
- `AuthorityAcceptanceContext`: authority decisions, acceptance records,
  uncertainty, contradictions, and delegations remain separate collections.
- `ProvenanceGraph`: `ProvenanceRecord` and `ConflictProvenance` collections.
- `SemanticIdentity`, `SemanticVersion`, `SemanticScope`, `MeaningContext`,
  `SemanticAttribute`, and `SemanticRef` are the shared identity/reference
  primitives.

All required fields occur exactly once. Required arrays occur exactly once and
may be empty. Optional properties have cardinality `0..1`.

## Deterministic Representation

### Serialization

Implement compact UTF-8 JSON without a byte-order mark. Object member names
are exact TypeScript field names and appear in interface-field order. Omit
absent optional properties; emit required empty collections as `[]`; never
emit `undefined`.

Strings preserve Unicode scalar values without normalization. Escape quotes,
backslashes, and control characters according to the source rules; reject
unpaired UTF-16 surrogates. Numbers must be finite IEEE-754 binary64 values;
serialize negative zero as `0`, reject non-finite values and non-JSON `unknown`
values, and use the specified shortest round-trip decimal representation.

### Normalization

Normalization is recursive and meaning-preserving. It may transform only under
an already-established equivalence rule. It must not create, remove, infer,
sort, merge, split, default, or reinterpret semantic content. Preserve
provenance for every permitted transformation. If requested normalization would
require choosing among ambiguous, contradictory, or unresolved meanings, fail
closed.

### Unordered Collection Ordering

Order a collection only when a semantic rule already classifies it as
unordered. The key is compact-JSON UTF-8 serialization of each element's
`SemanticIdentity`; compare keys lexicographically as unsigned bytes. Preserve
multiplicity. If equal identity keys have non-identical serialized content, or
an element has no resolved identity, fail closed. Semantically ordered
collections retain supplied order.

### Identity and Digest

Generate an identity preimage as an acyclic projection containing explicit
`identityKind`, projected semantic scope, and projected object content.
Exclude the identity being generated and every identity derived from the same
preimage. Serialize the projection with the above encoding.

`SemanticIdentity.value` is unpadded RFC 4648 base64url encoding of the
preimage bytes. It is not a digest. When a digest is required, calculate
SHA-256 over those exact bytes and encode the 32-byte result as 64 lowercase
hexadecimal ASCII characters.

## Version, Compatibility, and Applicability

Parse and compare `SemanticVersion.value` under SemVer 2.0.0. Reject invalid
syntax; preserve build metadata without using it for precedence. Compatibility
is evaluated only against an externally supplied authoritative requirement set:

- `compatible`: every supplied applicable requirement was evaluated and
  satisfied.
- `incompatible`: at least one supplied applicable requirement was explicitly
  violated.
- `indeterminate`: a required input, requirement, predicate, scope, or
  authoritative interpretation is absent or unresolved.

Applicability has exactly `applicable`, `not-applicable`, and `indeterminate`
outcomes. It must be derived only from supplied authoritative input, exact
governed scope, validation, validity, effective-boundary, and provenance
conditions. It must not be inferred from artifact presence, implementation,
version, compatibility, filesystem state, or generated output.

## Not Specified Here

- A populated Semantic IR instance or a Contract payload.
- Which collections are semantically unordered.
- Semantic equivalence rules usable by normalization.
- Reference-resolution, source-selection, loading, caching, delegation, or
  revocation mechanics.
- Runtime, SDK, Host, projection, persistence, or transport interfaces.
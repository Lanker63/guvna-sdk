# SemanticIR Identity-Materialization Implementation Assessment

**State:** REVIEW
**Scope:** Assess whether the current compiler implementation can perform the
governing identity-materialization procedure. No compiler code or test is
modified.

## Question

Can the current implementation perform:

```text
SemanticIR/reference graph
    -> identity preimage projection
    -> canonical serialization
    -> identity value
    -> SHA-256 digest
```

## Current Implementation Capability

| Component | What it can do | What it does not do |
|---|---|---|
| `core/src/compiler/semantic-ir.ts` | Defines and validates a fully identity-bearing SemanticIR shape; rejects missing/empty identities | Does not construct an IR, derive identities, resolve references, or classify collection ordering. |
| `core/src/compiler/ir-serializer.ts` | Serializes a valid supplied IR in declared field order; serializes compact JSON; rejects invalid JSON/string values and cycles | Does not build an identity preimage projection, remove generated or derived identities, or apply semantic collection ordering. |
| `core/src/compiler/ir-identity.ts` | Base64url-encodes supplied bytes as `SemanticIdentity.value` and computes SHA-256 of the same supplied bytes | Does not obtain, project, canonicalize, validate, or interpret preimage bytes; it accepts arbitrary supplied bytes. |
| `core/tests/compiler/foundations.test.ts` | Tests field ordering, compact JSON, and hash/base64url behavior for supplied fixture bytes | Does not test a populated SemanticIR reference graph, recursive projection, identity stripping, collection ordering, or deterministic graph identity materialization. |

## Governing Procedure

`.guvna/newplan/extracts/semantic-ir.md`, `Identity and Digest`, requires an
acyclic identity preimage containing explicit identity kind, projected semantic
scope, and projected object content. It requires exclusion of the identity
being generated and every nested identity derived from the same preimage.

The same extract requires canonical serialization and says unordered
collections sort by canonical SemanticIdentity serialization only after a
semantic ordering classification exists. It requires fail-closed behavior for
unresolved identities and conflicting equal identity keys.

## Missing Behavior

The current compiler lacks an identity-materialization operation that can:

1. accept an approved populated Semantic Model/IR graph and its source
   ordering classifications;
2. identify which identity is being generated;
3. recursively project semantic scope and object content;
4. exclude the generated identity and nested identities derived from the same
   preimage;
5. retain independently established identities only when their provenance
   proves independence;
6. classify every encountered collection as ordered or unordered, then apply
   the approved ordering rule only where authorized;
7. reject unresolved identity dependencies, cycles, missing ordering policy,
   and equal identity keys with non-identical content; and
8. pass the resulting exact canonical preimage bytes to the existing
   `createIdentity` utility.

## Assessment

**Implementation gap:** YES. The governing procedure is not implemented. The
existing identity utility is a byte encoder/hasher, not an identity-preimage
constructor.

**Specification gap:** PARTIAL. The governing extract defines the required
projection behavior, exclusions, serialization, and fail-closed conditions.
It leaves collection classifications and semantic equivalence rules as inputs;
those are semantic-input gaps, not a reason to alter the procedure.

**Necessary stage:** The missing behavior is required for SemanticIR
materialization because the current SemanticIR requires non-empty identity
values throughout the root and nested reference graph. It is not only a later
Contract identity-generation concern. Contract generation remains a distinct
downstream stage.

## Smallest Future Implementation Boundary

When separately authorized, the smallest compiler addition is a pure
identity-preimage projection and materialization module under
`core/src/compiler/`. It would:

- accept only a fully selected semantic graph plus explicit ordering and
  identity-kind inputs;
- produce canonical preimage bytes or a fail-closed blocker result;
- delegate base64url identity-value and SHA-256 computation to existing
  `createIdentity`; and
- not discover doctrine, select semantic content, create authority decisions,
  materialize Contracts, load artifacts, or perform Runtime/SDK/Host/Projection
  work.

This is an implementation boundary only. It requires separate implementation
authorization after the remaining semantic input decisions are resolved.

## Preserved Boundaries

This assessment generates no identity values, preimages, digests, SemanticIR,
Contract, ratification, applicability determination, artifact, workspace path,
or realization. It changes no compiler source or tests and does not use or
reconstruct historical Contract `1.0.0`.
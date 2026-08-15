# SemanticIR Recursive Identity-Preimage Materializer Conformance Review

**Result:** PASS-WITH-FINDINGS
**Scope:** Review-only conformance audit of
`core/src/compiler/ir-identity-materializer.ts` and its synthetic tests. No
approved Semantic Model input was supplied to the materializer.

## Changed-Path Conformance

| Path | Status | Boundary |
|---|---|---|
| `core/src/compiler/ir-identity-materializer.ts` | Conformant | Authorized pure materializer module. |
| `core/tests/compiler/ir-identity-materializer.test.ts` | Conformant | Authorized focused synthetic tests. |
| `core/src/compiler/ir-serializer.ts` | Conformant | Approved partial-record serializer remediation. |
| `core/tests/compiler/foundations.test.ts` | Conformant | Approved focused serializer regression tests. |

No changed compiler path outside the approved materializer and serializer
boundaries was found. Review/proposal/evidence documents are process records,
not compiler implementation.

## Identity-Kind Conformance

**PASS.** `IdentityMaterializationInput.identityKind` is restricted to
`"semantic"`; runtime validation rejects every other value. No role-derived
identity taxonomy is introduced. The module contains no hard-coded semantic
identity value; values originate only from `createIdentity` over supplied
synthetic inputs during tests.

## Semantic-Input Neutrality

**PASS.** The module accepts semantic scope, object content, derived identity
relation, independent-identity evidence, collection classifications, and
temporary review references as caller-supplied inputs. It does not read
doctrine, filesystem state, timestamps, process state, discovery output,
historical Contract data, or authority state.

## Identity Stripping and Independent Identities

**PASS WITH TEST GAP.** `project` omits any identity object listed in
`derivedIdentities`; it retains an identity only when listed in
`independentIdentities`; otherwise it returns `Identity dependency is
unresolved`. The target is stripped when the caller declares its identity as
derived from the target preimage.

**Required correction.** Add a synthetic test with a distinct nested
same-preimage identity, rather than testing only the target identity, to prove
recursive stripping at more than one nesting level.

Temporary review IDs are rejected whenever an encountered string belongs to
`temporaryReviewReferences`; the tests cover `C01`.

## Ordering Conformance

**PASS WITH TEST GAP.** Every encountered array requires an explicit entry in
`collectionOrderings`; missing entries fail closed. Ordered arrays retain their
supplied sequence. Unordered arrays use compact serialization of each member's
resolved `SemanticIdentity`, compare unsigned bytes, preserve multiplicity,
and fail when equal keys have different projected content.

The module does not infer ordering from traversal, insertion, filesystem,
discovery, timestamp, or lexical name order. Approved provenance source
collections are handled as unordered only when the caller supplies the
approved `"unordered"` classification; transformation dependencies remain
explicitly caller-classified as ordered.

**Required correction.** Add a synthetic reversed-input test proving that the
same unordered members in a different supplied array order yield identical
preimage bytes, identities, and digests.

## Fail-Closed Conformance

| Condition | Implementation result | Audit |
|---|---|---|
| Invalid identity kind | Rejects non-`semantic` at runtime | PASS; test gap below. |
| Missing ordering classification | `Collection ordering is unresolved` | PASS. |
| Unresolved encountered identity | `Identity dependency is unresolved` | PASS. |
| Missing independent identity evidence | Same unresolved-identity blocker | PASS. |
| Object graph cycle | `Identity projection contains a cycle` | PASS. |
| Unordered member with no resolved identity | `Unordered collection member identity is unresolved` | PASS. |
| Equal unordered keys with different content | Explicit blocker | PASS. |
| Invalid/non-serializable projected value | Primitive/object gate or corrected serializer rejects it | PASS in code; test gap below. |
| Missing required SemanticIR identity field | No structural record validation in the module | REQUIRED CORRECTION. |
| Unresolved graph reference | No explicit SemanticRef/reference validation in the module | REQUIRED CORRECTION. |

The last two findings prevent a full PASS. The module accepts generic records,
so an object that structurally resembles a SemanticIR record but omits a
required `identity` or contains an incomplete reference can be projected unless
it happens to encounter an unapproved identity-shaped value. The approved
proposal requires failure for missing required identities and unresolved graph
references, not only for identity objects already encountered.

## Serializer Boundary

**PASS.** The materializer consumes `serializeCompactJson`; the approved
serializer remediation now retains declared order among present fields, omits
absent optional fields, and rejects actual `undefined`. No unrelated serializer
behavior was modified. `foundations.test.ts` covers partial `ProvenanceRef`,
present optional-field order, omitted root `semanticVersion`, and actual
`undefined` rejection.

## Determinism and Dependency Handling

**PASS WITH TEST GAP.** Identical synthetic inputs produce deep-equal results,
including equal preimage bytes, identity, and digest. The module does not
construct a topological order; it traverses only caller-supplied content and
uses `derivedIdentities` as the caller-supplied same-preimage relation.

Object-reference cycles fail closed. However, the implementation does not
model or validate a named identity-derivation dependency graph beyond the
supplied derived-identity set. This is acceptable only if the caller supplies
an already acyclic relation; a future structural validation boundary is needed
to prove that condition before production materialization.

## Scope and Boundary Preservation

**PASS WITH REQUIRED CORRECTION.** The module projects supplied scope without
mutating or selecting its meaning. It does not ratify, determine
applicability, alter inventory, create workspace artifacts, or initiate
Runtime/SDK/Host/Projection work.

The scope is currently required only to be a record. Before production use,
the module or its authorized caller must validate that the supplied scope has
the required resolved SemanticIR identity/reference shape; otherwise an
identity-stripped or malformed scope can pass projection.

## Test Assessment

| Required coverage | Status |
|---|---|
| Target identity stripping | Covered. |
| Same-preimage nested identity stripping | Missing distinct nested case. |
| Independent identity retention | Covered. |
| Approved unordered provenance references | Covered with synthetic `sourceIdentity` references. |
| Ordered transformation dependencies | Covered. |
| Missing ordering classification | Covered. |
| Unresolved references | Missing explicit SemanticRef/reference case. |
| Identity dependency cycles | Object cycle covered; named derivation-cycle case not modeled. |
| Divergent duplicate unordered keys | Covered. |
| Deterministic equivalent inputs | Identical fixtures covered; reversed unordered input missing. |
| Temporary review IDs excluded | Covered. |
| Invalid identity kind | Runtime code covered; focused test missing. |
| Serializer partial-record behavior | Covered in `foundations.test.ts`, not materializer test. |

## Findings

### Required Correction

1. Define and enforce the minimal structural reference/identity validation
   boundary for the materializer's accepted graph inputs, including a resolved
   supplied semantic scope and SemanticRef-like references.
2. Add focused synthetic tests for nested same-preimage stripping, unresolved
   references, reversed unordered input determinism, invalid identity kind,
   and invalid projected content.

### Recommended Improvement

Document the caller contract for the supplied derivation relation as explicitly
acyclic, or add an authorized structural derivation-graph validator before a
production materialization operation.

### Informational Observation

Synthetic tests invoke `createIdentity` and therefore produce test-only values
and digests. No approved Semantic Model or production input was materialized.

## Conclusion

The materializer is a bounded, input-neutral implementation with correct core
projection, sorting, serializer, and identity-utility delegation behavior.
It is not ready for a separately authorized production materialization
operation until the required structural validation and test corrections are
implemented and independently reviewed.

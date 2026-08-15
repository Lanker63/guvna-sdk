# Gate 2 Semantic IR Proposal

**Phase:** 2 - Define the Guvna Semantic IR
**Authority gate:** Gate 2 - Semantic IR Authority Gate
**State:** APPROVED
**Semantic source:** `doctrine/core/**` plus the approved Gate 2 decisions for Gaps 1-11
**Excluded:** `doctrine/agentic/**` (process guidance only)

## Intended action

Approve this candidate concrete Semantic IR structure for subsequent implementation and deterministic compilation design. The IR is a derived, normalized, provenance-preserving representation of meaning. It is not semantic authority, a ratification mechanism, an Applicable Contract, or an implementation model.

No core TypeScript artifact, serializer, compiler, Runtime, SDK, projection, or generated artifact is created by this proposal.

## Proposed TypeScript structure

This revision resolves only the TypeScript representation, field
cardinality, and field optionality of the already-approved generic kernel.
It does not resolve serialization, normalization, canonical ordering,
deterministic identity, compatibility or applicability algorithms,
lifecycle or transition algorithms, or delegation or revocation algorithms.

Every non-optional field below is present exactly once. Every array field is
present exactly once and has cardinality `0..*`; an empty array represents no
members. Every field marked `?` has cardinality `0..1`. These are structural
representation rules, not semantic applicability or algorithm rules.

```ts
interface SemanticIR {
  irKind: "guvna-semantic-ir";
  irVersion: string;
  semanticIdentity: SemanticIdentity;
  semanticVersion?: SemanticVersion;
  semanticScope: SemanticScope;
  meaning: MeaningContext;
  concepts: SemanticEntity[];
  relationships: SemanticRelationship[];
  constraints: SemanticConstraint[];
  transitions: SemanticTransition[];
  derivations: SemanticDerivation[];
  contracts: SemanticContractReference[];
  realizations: RealizationReference[];
  authorityContext: AuthorityAcceptanceContext;
  provenance: ProvenanceGraph;
  compatibility: CompatibilityRequirement[];
}

interface SemanticEntity {
  identity: SemanticIdentity;
  kind: "concept" | "artifact" | "actor" | "scope" | "state";
  meaning: MeaningContext;
  attributes: SemanticAttribute[];
  lifecycle: LifecycleContext;
  acceptance: AcceptanceContext;
  provenance: ProvenanceRef[];
}

interface SemanticRelationship {
  identity: SemanticIdentity;
  subject: SemanticRef;
  predicate: SemanticRef;
  object: SemanticRef;
  scope: SemanticScope;
  constraints: SemanticRef[];
  provenance: ProvenanceRef[];
}

interface SemanticConstraint {
  identity: SemanticIdentity;
  subject: SemanticRef;
  kind: "invariant" | "compatibility" | "authority" | "condition" | "ambiguity";
  meaning: MeaningContext;
  enforcementScope: SemanticScope;
  provenance: ProvenanceRef[];
}

interface SemanticTransition {
  identity: SemanticIdentity;
  from: SemanticRef;
  operation: SemanticRef;
  to: SemanticRef;
  authorityReference: SemanticRef;
  scope: SemanticScope;
  provenance: ProvenanceRef[];
}

interface SemanticDerivation {
  identity: SemanticIdentity;
  sources: SemanticRef[];
  result: SemanticRef;
  relation: "derives" | "projects" | "realizes" | "compiles" | "normalizes";
  transformation: MeaningContext;
  provenance: ProvenanceRef[];
}

interface SemanticContractReference {
  identity: SemanticIdentity;
  contractKind: "semantic" | "runtime" | "sdk" | "projection";
  lifecycle: LifecycleContext;
  applicability: ApplicabilityContext;
  ratification: RatificationContext;
  provenance: ProvenanceRef[];
}

interface RealizationReference {
  identity: SemanticIdentity;
  realizationKind: "runtime" | "sdk" | "host" | "governance-projection";
  realizes: SemanticRef;
  conformsTo: SemanticRef[];
  compatibility: CompatibilityContext;
  provenance: ProvenanceRef[];
}

interface AuthorityAcceptanceContext {
  authorityDecisions: AuthorityDecision[];
  acceptances: AcceptanceRecord[];
  uncertainty: UncertaintyRecord[];
  contradictions: ContradictionRecord[];
  delegations: DelegationRecord[];
}

interface AcceptanceContext {
  accepted: boolean;
  scope: SemanticScope;
  authorityDecision?: SemanticRef;
  provenance: ProvenanceRef[];
}

interface AuthorityDecision {
  identity: SemanticIdentity;
  authorityIdentity: AuthorityIdentity;
  subject: SemanticRef;
  scope: SemanticScope;
  decision: "accept" | "reject" | "ratify" | "supersede" | "retire" | "delegate";
  provenance: ProvenanceRef[];
}

interface AcceptanceRecord {
  identity: SemanticIdentity;
  subject: SemanticRef;
  scope: SemanticScope;
  authorityDecision: SemanticRef;
  provenance: ProvenanceRef[];
}

interface DelegationRecord {
  identity: SemanticIdentity;
  delegator: AuthorityIdentity;
  delegate: AuthorityIdentity;
  delegatedAuthorityIdentity: AuthorityIdentity;
  scope: SemanticScope;
  capabilities: CapabilityRef[];
  conditions: ConditionRef[];
  governingAuthority: SemanticRef;
  provenance: ProvenanceRef[];
}

interface AuthorityIdentity {
  identity: SemanticIdentity;
  principal: SemanticRef;
  provenance: ProvenanceRef[];
}

interface CapabilityRef {
  identity: SemanticIdentity;
  capability: SemanticRef;
}

interface ConditionRef {
  identity: SemanticIdentity;
  condition: MeaningContext;
  provenance: ProvenanceRef[];
}

interface UncertaintyRecord {
  identity: SemanticIdentity;
  subject: SemanticRef;
  meaning: MeaningContext;
  provenance: ProvenanceRef[];
}

interface ContradictionRecord {
  identity: SemanticIdentity;
  claims: SemanticRef[];
  scope: SemanticScope;
  interpretation: MeaningContext;
  provenance: ProvenanceRef[];
}

interface LifecycleContext {
  lifecycleState: SemanticRef;
  transitions: SemanticRef[];
}

interface ApplicabilityContext {
  applicable: boolean | "indeterminate";
  scope: SemanticScope;
  conditions: ConditionRef[];
  authorityDecision?: SemanticRef;
  provenance: ProvenanceRef[];
}

interface RatificationContext {
  ratified: boolean;
  authorityDecision?: SemanticRef;
  requiresHumanAuthority: boolean;
  provenance: ProvenanceRef[];
}

interface SemanticIdentity {
  identityKind: string;
  value: string;
}

interface SemanticVersion {
  value: string;
  semanticIdentity: SemanticRef;
  scope: SemanticScope;
}

interface SemanticScope {
  identity: SemanticIdentity;
  meaning: MeaningContext;
}

interface MeaningContext {
  statement: string;
  terms: SemanticRef[];
}

interface SemanticAttribute {
  identity: SemanticIdentity;
  meaning: MeaningContext;
  value: unknown;
}

interface SemanticRef {
  identity: SemanticIdentity;
}

interface ProvenanceGraph {
  records: ProvenanceRecord[];
  conflicts: ConflictProvenance[];
}

interface ProvenanceRecord {
  identity: SemanticIdentity;
  subject: SemanticRef;
  sources: ProvenanceRef[];
  transformations: TransformationRef[];
  authorityDecision?: SemanticRef;
}

interface ProvenanceRef {
  sourceIdentity: SemanticIdentity;
  sourcePath?: string;
  sourceSection?: string;
}

interface TransformationRef {
  identity: SemanticIdentity;
  kind: "discover" | "parse" | "normalize" | "resolve" | "compile" | "project" | "realize";
  inputs: SemanticRef[];
  outputs: SemanticRef[];
}

interface ConflictProvenance {
  identity: SemanticIdentity;
  sources: ProvenanceRef[];
  resolution?: SemanticRef;
}

interface CompatibilityRequirement {
  identity: SemanticIdentity;
  subject: SemanticRef;
  consumer?: SemanticRef;
  contract?: SemanticRef;
  dependency?: SemanticRef;
  scope: SemanticScope;
  meaning: MeaningContext;
}

interface CompatibilityContext {
  requirements: SemanticRef[];
  result: "compatible" | "incompatible" | "indeterminate";
  provenance: ProvenanceRef[];
}

```

The TypeScript definitions above are the complete proposed constructible
structure. The structural decision does not establish that a value is
applicable, accepted, ratified, compatible, or valid; those meanings remain
governed by the already-approved distinctions and unresolved algorithms.

`requiresHumanAuthority` reflects the applicable authority model for the represented domain; it does not establish a universal Semantic IR rule that ratification requires human authority.

The interfaces are a candidate structural decision for human review. They do
not authorize runtime validation behavior, serialization format, or any
algorithm left unresolved by the other Gate 2 gaps.

## Domain-neutral kernel

Repository, Runtime, SDK, Host, Contract, Projection, and Agent are represented as `SemanticEntity`, `SemanticContractReference`, `RealizationReference`, `AuthorityIdentity`, or related generic kernel records. No domain-specific IR type is required by this proposal.

## Semantic invariants represented

- Semantic Identity and Scope are distinct from filesystem, package, generation, persistence, and implementation identity.
- Semantic Version describes evolution of meaning and does not establish authority, acceptance, applicability, or supersession.
- Lifecycle, acceptance, ratification, applicability, supersession, rejection, and retirement remain distinct dimensions.
- Authority Decision, Acceptance, Provenance, Uncertainty, and Contradiction remain distinct and are not collapsed.
- Runtime and SDK are independent realizations of the applicable Semantic Contract with distinct compatibility relationships.
- Runtime Contracts are Guvna-owned; Candidate, Ratified, and Applicable states remain distinct.
- Projection compilation is governed by an applicable Projection Contract and remains subordinate to Repository Authority.
- Accepted Repository Knowledge is the authoritative semantic basis for Runtime repository meaning.
- Equal-authority conflicts without established precedence remain explicit and block deterministic compilation.
- Authority delegation is contained by the delegator's authority and does not imply Contract Ratification authority.
- Unresolved ambiguity remains explicit and blocks deterministic canonicalization or compilation.

## Canonicalization and deterministic identity

Canonicalization rules govern transformation and canonicalization of the IR rather than semantic content represented by each IR instance. Canonical representation must be independent of filesystem location, insertion/discovery/generation/execution order, implementation language, and incidental serialization details. Normalization may remove representational variance but may not infer or alter meaning. Serialization encodes canonical content; it does not establish identity. Identity derives from canonical semantic content. Unresolved semantic ambiguity blocks canonicalization.

## Gate 2 Gap 2 — Serialization Proposal

**Status:** APPROVED

This proposal resolves only the concrete serialization representation and
encoding of the approved `SemanticIR` structure. It does not resolve
normalization, canonical ordering of collections, deterministic identity or
hashing, compatibility, applicability, lifecycle, delegation, revocation, or
compiler implementation.

### Representation and encoding

- The serialized representation is a JSON value whose root is a JSON object
  corresponding to `SemanticIR`.
- The byte encoding is UTF-8 without a byte-order mark.
- JSON is emitted in compact form: no insignificant whitespace, comments, or
  trailing data.
- Object member names are the exact TypeScript field names and are emitted
  using JSON string escaping.
- Object member order is the fixed order of fields in the approved TypeScript
  interface definitions. This concerns object encoding only; it does not
  define ordering for any collection.
- Arrays are serialized in their supplied order. Serialization does not sort,
  deduplicate, or otherwise reorder collections.

### Optional and empty values

- An absent optional TypeScript property is omitted from its JSON object.
- A present optional property is serialized normally.
- `undefined` is never serialized.
- Every required array property is emitted, including when empty; an empty
  array is serialized as `[]`.
- Every required object property is emitted, including when its collections
  are empty.
- Serialization supplies no defaults and removes no required empty values.

### Primitive values

- Strings are serialized as a quotation mark, followed by the string's
  Unicode scalar values encoded in order, followed by a quotation mark. No
  Unicode normalization is performed.
- Within a string, quotation mark (`U+0022`) is encoded as `\\"`, and reverse
  solidus/backslash (`U+005C`) is encoded as `\\\\`.
- Control characters `U+0000` through `U+001F` are escaped. The short forms
  `\\b`, `\\t`, `\\n`, `\\f`, and `\\r` are used for `U+0008`, `U+0009`,
  `U+000A`, `U+000C`, and `U+000D`. All other control characters use
  `\\u` followed by exactly four uppercase hexadecimal digits.
- All other Unicode scalar values, including non-ASCII characters and
  non-BMP characters, are emitted as their direct UTF-8 encoding. They are
  not emitted as `\\u` escapes.
- Unpaired UTF-16 surrogate code points (`U+D800` through `U+DFFF`) and any
  invalid Unicode scalar value are serialization errors. A conforming input
  string therefore consists only of Unicode scalar values.
- Booleans serialize as `true` or `false`.
- `null` serializes as `null` only where the approved TypeScript type permits
  `null`.
- Numbers are finite IEEE-754 binary64 values. `NaN`, positive infinity,
  negative infinity, `bigint`, and other non-finite values are serialization
  errors. Negative zero serializes as `0`.
- Non-negative and negative integers are serialized in base ten without a
  leading plus sign or leading zeroes; zero is `0`.
- Every non-zero number is first represented by the shortest base-ten decimal
  whose round-trip conversion under IEEE-754 binary64 produces the identical
  value. If two shortest representations have the same digit count, choose
  the one whose final significand digit is even; if that does not distinguish
  them, choose the lexicographically smaller significand digit sequence.
- The shortest representation is written in plain decimal form when its
  decimal exponent is in the inclusive range `-6` through `20`; otherwise it
  is written in scientific form. In scientific form, the mantissa has one
  non-zero digit before the decimal point, the decimal point is omitted when
  there are no fractional digits, and the exponent uses lowercase `e`, no
  leading zeroes, and `+` only for a positive exponent.
- In either form, the decimal point is emitted only when fractional digits
  remain, and the mantissa has no leading or trailing fractional zeroes.
- The permitted numeric range is the finite IEEE-754 binary64 range; integer
  precision is therefore limited to values representable by that type. No
  decimal or integer value is widened, rounded, or converted during
  serialization.
- String literal unions serialize as their exact literal strings.
- `unknown` attribute values must be recursively JSON-compatible values.
  Functions, symbols, class instances, dates, maps, sets, `undefined`, and
  other non-JSON values are serialization errors and are not coerced.

These rules define one deterministic encoding for a supplied IR value. They
do not determine semantic equivalence, collection order, identity, hashing,
compatibility, applicability, validity, or ratification.

## Gate 2 Gap 2 — Normalization Proposal

**Status:** APPROVED

This proposal resolves only normalization of the approved `SemanticIR`
structure. Normalization is a meaning-preserving transformation performed
before serialization. It does not resolve canonical ordering of collections,
deterministic identity or hashing, compatibility, applicability, lifecycle,
delegation, revocation, or compiler implementation.

### Normalization rules

- Normalization operates recursively on the approved IR fields and preserves
  the approved TypeScript structure, field cardinality, and optionality.
- If no approved semantic equivalence rule applies to a value, normalization
  is an identity operation for that value: the value is preserved exactly.
- A value may be transformed only when an already-approved semantic rule
  explicitly establishes the source and target representations as
  semantically equivalent.
- Normalization does not use heuristic, conventional, language-specific, or
  implementation-defined rules.
- No semantic concept, relationship, constraint, transition, derivation,
  authority decision, acceptance, provenance record, uncertainty record,
  contradiction, or compatibility requirement may be created, removed, or
  inferred by normalization.
- Normalization does not resolve references, select authority, resolve
  conflicts, establish acceptance, determine applicability, or determine
  compatibility.
- Absent optional fields remain absent. Normalization does not insert
  defaults, convert absent fields to `null`, or remove present values.
- Empty required collections remain present and empty. Normalization does not
  sort, deduplicate, merge, split, or otherwise reorder collections.
- Object-member order is not a semantic input to normalization and is handled
  only by the approved serialization rule.
- Primitive values are preserved exactly as values. Normalization does not
  perform Unicode normalization, numeric widening, numeric rounding, or
  conversion between textual and numeric representations.
- Provenance is preserved for every transformed value. Each permitted
  transformation records its source and target references and the approved
  equivalence rule that authorizes it.
- If equivalence is absent, ambiguous, contradictory, or not attributable to
  an approved rule, the value is preserved without transformation or
  normalization fails closed when producing the requested normalized form
  requires choosing among meanings.

The permitted transformation set is exactly the set of transformations
explicitly authorized by approved semantic equivalence rules. No implicit
normalization rules exist. If producing the requested normalized form
requires choosing between semantically distinct, ambiguous, contradictory,
or otherwise unresolved representations, normalization fails closed rather
than choosing one.

### Scope of this decision

These rules define when normalization may transform representation. They do
not define which collections are semantically unordered, how collections are
ordered, how identity is derived, or whether an IR is valid, compatible,
applicable, ratified, or semantically authoritative.

## Gate 2 Gap 2 — Canonical Collection Ordering Proposal

**Status:** APPROVED

This proposal resolves only ordering for collections already established by
an approved semantic rule to be unordered. It does not resolve normalization,
semantic identity generation, deterministic identity, hashing, compatibility,
applicability, lifecycle, delegation, revocation, or compiler implementation.

### Ordering rules

- A collection is canonically ordered only when an approved semantic rule
  identifies that collection as semantically unordered.
- Collections that are semantically ordered retain their supplied order.
  Serialization does not reorder them.
- Each element in an unordered collection must expose the approved
  `SemanticIdentity` structure. The ordering key is the approved compact JSON
  UTF-8 serialization of that element's `SemanticIdentity`.
- Ordering compares ordering-key bytes lexicographically as unsigned byte
  sequences. No locale, host-language string collation, filesystem order, or
  implementation-defined comparison is permitted.
- Equal ordering keys represent equal semantic identities. Elements with an
  equal key and byte-identical serialized content retain multiplicity and are
  interchangeable for ordering.
- If equal identity keys have different serialized element content, ordering
  fails closed. The ordering procedure does not invent a secondary key or
  infer semantic precedence between them.
- Empty unordered collections remain empty. Ordering does not add, remove,
  deduplicate, merge, or split elements.
- Ordering does not generate, alter, or hash semantic identities. If an
  element lacks an identity or its identity is unresolved, ordering fails
  closed.

These rules define canonical ordering only for collections whose unordered
status is already established. They do not determine which identity a value
receives or establish deterministic identity or hashing.

## Gate 2 Gap 2 — Identity Generation Proposal

**Status:** APPROVED

This proposal resolves only the generation inputs and authority rules for the
approved `SemanticIdentity` structure. It does not resolve the deterministic
identity value algorithm, hashing, compatibility, applicability, lifecycle,
delegation, revocation, or compiler implementation.

### Identity-generation rules

- An explicitly supplied, authoritative `SemanticIdentity` is preserved
  exactly. Generation does not replace, reinterpret, or merge it.
- A derived IR object without an explicit identity may receive a generated
  identity only from its approved semantic identity preimage. The preimage
  consists of the object's `identityKind`, applicable semantic scope, and
  canonical serialized semantic content after approved normalization and
  collection ordering.
- Provenance, source paths, filesystem locations, document positions,
  discovery order, process order, package names, runtime addresses, random
  values, timestamps, counters, and generated names are not identity inputs.
- Identity generation is content- and scope-sensitive. Two objects with
  different approved semantic content or scope must not be treated as the
  same identity solely because their representations share an incidental
  label.
- Semantically equivalent content uses the same identity preimage. An
  unresolved equivalence or semantic ambiguity prevents identity generation
  rather than permitting a best-effort identity.
- Identity generation preserves the approved `SemanticIdentity` shape:
  `identityKind` identifies the identity category and `value` carries the
  resulting identity value. It does not add fields or introduce a new
  identity concept.
- Identity generation is attributable. The provenance graph records whether
  the identity was preserved or generated and records the semantic inputs
  used for the generation decision.
- If the required semantic content, scope, identity kind, or authoritative
  source is absent or unresolved, identity generation fails closed.

The deterministic encoding of the identity preimage uses the approved
serialization and collection-ordering rules. The algorithm that converts
that preimage into `SemanticIdentity.value`, including any digest or hash
mechanism, remains outside this proposal and unresolved.

## Gate 2 Gap 2 — Deterministic Identity-Value Algorithm Proposal

**Status:** APPROVED

This proposal resolves only the deterministic algorithm that produces
`SemanticIdentity.value` from an approved identity preimage. It does not
resolve hashing or digest selection, compatibility, applicability, lifecycle,
delegation, revocation, or compiler implementation.

### Identity-preimage projection

The identity preimage is an acyclic projection, not the serialization of the
identified object including its identity. It is constructed as the tuple
`identityKind`, projected semantic scope, and projected object content.

- `identityKind` is the explicit identity category supplied for the object;
  it is not read from the identity value being generated.
- Projected object content includes every field of the object being
  identified except identity-bearing fields.
- The object's generated `identity` or `semanticIdentity` field is excluded
  completely, including both `identityKind` and `value` when that field is
  the identity being generated.
- Any other identity-bearing field whose value is derived from the same
  preimage is also excluded completely. This includes nested `identity` or
  `semanticIdentity` fields and identity values inside nested structures.
- Nested structures are projected recursively. Non-identity fields remain in
  their approved structure; identity-bearing fields are removed before the
  projection is serialized. A `SemanticRef` contributes no identity value to
  this preimage when its identity is derived from the same preimage.
- An independently authoritative nested identity may be included only when
  its provenance establishes that it is not derived from the preimage being
  generated. Otherwise it is excluded and identity generation fails closed
  if its exclusion would require choosing or inferring semantic meaning.
- The projected semantic scope is treated by the same recursive rule: its
  identity-bearing fields are excluded when generated from this preimage,
  while its non-identity semantic content remains.
- No identity field is replaced with a placeholder, generated name, object
  address, traversal index, or other derived value.

The projection cannot depend directly or indirectly on the identity value
being generated. Its fields are fully determined by approved semantic
content, normalization, canonical collection ordering, and serialization
rules.

### Algorithm

1. Construct the identity-preimage projection defined above from `identityKind`,
  projected semantic scope, and projected object content.
2. Serialize that projection using the approved compact JSON representation
  and UTF-8 encoding. The resulting bytes are the identity-preimage bytes.
3. Encode the identity-preimage bytes using RFC 4648 base64url encoding with
   the padding characters removed. The resulting ASCII string is the
   `SemanticIdentity.value`.
4. Preserve the approved `identityKind` unchanged alongside that value.

This is a reversible, non-hashing content encoding. Two identical preimage
byte sequences produce identical identity values. Two different preimage byte
sequences produce different identity values because base64url encoding is
injective. No truncation, salting, randomization, case folding, or additional
escaping is applied.

### Failure and provenance rules

- Identity-value generation fails closed if the preimage is missing,
  unresolved, ambiguous, or cannot be produced by the approved serialization
  and ordering rules.
- Identity-value generation does not repair, normalize, reorder, or infer the
  preimage.
- Provenance records the identity-preimage inputs and identifies the value as
  an encoding rather than a digest.
- The algorithm does not define or require a cryptographic hash or digest.
  Any future digest-based identity representation requires a separate
  authority decision and is not interchangeable with this value algorithm.

## Gate 2 Gap 2 — Hash or Digest Selection Proposal

**Status:** APPROVED

This proposal resolves only the hash/digest algorithm and representation for
the approved identity-preimage bytes. It does not replace or alter the
approved `SemanticIdentity.value` algorithm, and it does not resolve
compatibility, applicability, lifecycle, delegation, revocation, or compiler
implementation.

### Digest rules

- When a digest is required for an approved artifact or evidence record, the
  input is exactly the approved identity-preimage bytes. No additional
  framing, whitespace, metadata, timestamp, path, or identity value is
  included.
- The digest algorithm is SHA-256 as specified by FIPS 180-4.
- The digest output is the 32-byte SHA-256 result encoded as 64 lowercase
  hexadecimal ASCII characters.
- Digest input and output are byte-exact. No Unicode normalization, text
  recoding, truncation, salting, keying, or implementation-defined conversion
  is permitted.
- A digest is an integrity and comparison artifact. It does not establish
  semantic authority, applicability, acceptance, ratification, or identity.
- The approved `SemanticIdentity.value` remains the un-hashed RFC 4648
  base64url encoding of the identity-preimage bytes. The digest is not
  substituted for, embedded in, or used to shorten that value.
- Digest generation fails closed when the approved identity-preimage bytes
  cannot be produced or are unresolved.

This proposal selects SHA-256 and its representation only. It does not
change the approved preimage projection, serialization, normalization,
collection ordering, or identity-value algorithm.

## Provenance and conflict handling

Every material semantic object carries provenance references. The provenance graph records source lineage and transformations and preserves conflicting source history. Precedence follows established authority ordering: Constitutional Doctrine, Canonical Models, Architectural Doctrine, then downstream realization. Equal-authority conflicts remain unresolved until an attributable authority decision resolves them.

## Runtime, SDK, and Projection boundaries

Runtime and SDK independently conform to applicable contracts and do not provide semantic authority to each other. Runtime consumes accepted Repository Knowledge and, where required, only applicable, conformant, compatible, traceable Governance Projections. Stale, invalid, incompatible, or non-conformant inputs produce contract-defined outcomes; Runtime does not repair or select repository meaning.

## Implementation decisions intentionally left open

- No further serialization rule is open within this proposal; implementation
  remains unauthorized until this decision is approved.
- No further normalization rule is open within this proposal; implementation
  remains unauthorized until this decision is approved.
- No further canonical collection-ordering rule is open within this proposal;
  implementation remains unauthorized until this decision is approved.
- No further deterministic identity-value rule is open within this proposal;
  hash or digest selection remains separately open.
- Version and compatibility comparison algorithms.
- Lifecycle and acceptance enumerations and artifact-specific transition matrices.
- Runtime Contract and Projection Contract schemas.
- Applicability, validation, stale-detection, conflict-detection, source-selection, loading, caching, delegation lifecycle, and revocation algorithms.
- Package/API dependency graphs and TypeScript implementation details.

## Proposed mutations and Gate 2 decision requested

Proposed mutations are limited to `.guvna/agent-state/`:

- `.guvna/agent-state/proposals/gate-2-semantic-ir-proposal.md`
- `.guvna/agent-state/proposals/gate-2-semantic-ir-proposal.yaml`

This revised Gap 1 structural decision is approved. The approval authorizes
only the exact TypeScript structure and its stated cardinality and optionality;
it does not resolve any other Gate 2 gap, ratify a contract, or authorize
compiler, Runtime, SDK, projection, or publication mutation.

The Gap 2 serialization proposal above is approved. This approval is limited
to deterministic primitive serialization and the stated JSON/UTF-8 rules; it
does not resolve any excluded Gate 2 decision.

The Gap 2 normalization proposal above is approved. This approval is limited
to the stated identity-preserving, explicitly authorized, and fail-closed
normalization rules; it does not resolve any excluded Gate 2 decision.

The Gap 2 canonical collection-ordering proposal above is approved. This
approval is limited to the stated ordering and fail-closed rules; it does not
resolve identity generation, deterministic identity, hashing, or any excluded
Gate 2 decision.

The Gap 2 identity-generation proposal above is approved. This approval is
limited to identity preservation, preimage inputs, excluded incidental inputs,
provenance, and fail-closed behavior; it does not resolve the identity-value
algorithm. Hash/digest selection is resolved by the separate approved proposal
above.

The Gap 2 deterministic identity-value algorithm proposal above is approved.
This approval is limited to the acyclic preimage projection and existing
base64url encoding; hash or digest selection remains unresolved.

The Gap 2 hash or digest selection proposal above is approved. This approval
is limited to SHA-256 and its stated representation and input rules; it does
not alter the approved identity-value algorithm or resolve any later Gate 2
decision.

## Gate 2 — Version and Compatibility Comparison Proposal

**Status:** APPROVED

This proposal resolves only semantic-version parsing/comparison and the
compatibility comparison protocol. It does not resolve applicability,
ratification, lifecycle, delegation, revocation, or compiler implementation.

### Semantic version rules

- `SemanticVersion.value` uses Semantic Versioning 2.0.0 syntax.
- A version has `major`, `minor`, `patch`, optional pre-release identifiers,
  and optional build metadata. Leading zeroes are rejected in numeric
  identifiers except for the value `0`.
- Build metadata is preserved as provenance but does not affect version
  precedence or compatibility comparison.
- Version precedence follows Semantic Versioning 2.0.0: compare major,
  minor, and patch numerically; a normal release has precedence over its
  pre-release; pre-release identifiers compare numerically when numeric and
  lexically when non-numeric, with numeric identifiers lower than non-numeric
  identifiers.
- Invalid version syntax is a validation failure and cannot be compared.
- Version precedence does not establish authority, acceptance, ratification,
  applicability, supersession, or compatibility.

### Compatibility comparison protocol

- Compatibility comparison requires a prior subject, a candidate subject,
  the comparison scope, and a compatibility-requirement set already
  established as applicable for that scope by an authoritative upstream
  decision or context.
- The comparison algorithm evaluates only the supplied authoritative
  applicable-requirement set. It does not determine applicability or expand,
  reduce, select, or reinterpret that set.
- The result is `compatible` only when every supplied applicable approved
  requirement is evaluated and satisfied.
- The result is `incompatible` when at least one supplied applicable approved
  requirement is explicitly evaluated and violated.
- The result is `indeterminate` when the authoritative applicable-requirement
  set is absent, unresolved, ambiguous, unavailable, or lacks a required
  comparison input, semantic predicate, or authoritative interpretation.
  Indeterminate is not converted to compatible or incompatible.
- A version change alone never determines the compatibility result. A major,
  minor, patch, or pre-release change may be compatible or incompatible only
  according to the explicit approved requirements.
- Applicability is never inferred from version numbers, requirement type,
  subject or candidate identity, implementation changes, Runtime or SDK
  behavior, filesystem or document state, ordering, or precedence
  assumptions.
- Compatibility comparison preserves the compared identities, versions,
  requirements, scope, result, and provenance. It does not establish
  applicability or ratification.

This protocol is fail-closed with respect to unresolved semantic meaning and
upstream applicability: it can classify only the supplied applicable
requirement outcomes and otherwise returns `indeterminate`.

The proposal does not define domain-specific compatibility predicates,
Runtime/SDK compatibility rules, applicability conditions, or migration
semantics; those require their own approved contracts or decisions.

The version and compatibility proposal above is approved. This approval is
limited to SemVer parsing/precedence and comparison over an authoritative
applicable-requirement set; it does not resolve applicability or any excluded
Gate 2 decision.

## Gate 2 - Applicability Determination Proposal

**Status:** APPROVED

This proposal defines a determination boundary. The Semantic IR/compiler may
determine applicability from authoritative, externally supplied
ratification/authority inputs, but it does not exercise ratification
authority or create or alter the governing authority decision.

The authority decision is established externally by the governing
authority/contract process. The applicability determination evaluates those
authoritative inputs against the already-established governed scope and the
required validity and effective-boundary conditions. The resulting
applicability result is derived from those inputs, preserves their provenance,
and is fail-closed.

### Applicability prerequisites

The determination evaluates a contract that is structurally and semantically
validated against an explicit, attributable, versioned ratification or
authority decision supplied by the governing contract process. The governed
scope is already established by that authoritative input; the determination
checks the exact scope match and required validity and effective-boundary
conditions. A Candidate or Validated Contract is not applicable merely
because it parses, is present, is generated successfully, is persisted, or is
consumed by Runtime or SDK.

The applicability record must preserve:

- the subject contract identity and semantic version;
- the governed scope;
- the ratification or authority-decision identity;
- the decision issuer or attributable authority reference;
- the decision version or effective revision;
- the decision timestamp or declared effective boundary when supplied;
- the source and provenance of each decision input.

### Determination result

The applicability result is exactly one of:

- `applicable`: the authoritative inputs satisfy the required validation,
  exact-scope, and effective-boundary conditions;
- `not-applicable`: the authoritative inputs establish that the contract is
  not applicable for the already-established governed scope;
- `indeterminate`: the required decision, validation state, scope match,
  provenance, or effective-boundary information is absent, ambiguous,
  conflicting, stale, revoked, or unsupported.

`indeterminate` is fail-closed and must not be converted to either other
result. Applicability is never inferred from semantic identity, version
precedence, compatibility results, implementation behavior, filesystem or
document state, package or cache state, repository acceptance, or generated
artifact presence.

### Ownership and exclusions

The Semantic IR and compiler may evaluate the authoritative inputs, produce
the applicability result, and preserve and propagate its provenance. They
must not create, alter, or ratify the authority decision. Runtime, SDK,
projection, and compatibility comparison may consume an applicable contract
only after this determination produces `applicable` from the authoritative
inputs.

This proposal does not define ratification actors, authority predicates,
delegation or revocation mechanics, conflict precedence, supersession rules,
effective-time algorithms, repository applicability, domain-specific
applicability conditions, or implementation behavior. Those remain separate
authority decisions.

The applicability determination proposal above is approved. This approval is
limited to determining applicability from authoritative, externally supplied
inputs and producing the stated provenance-preserving, fail-closed result; it
does not create or alter authority, ratify contracts, or resolve any listed
exclusion.

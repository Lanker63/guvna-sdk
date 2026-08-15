# Gate 3 Compiler Authority Proposal

**Phase:** 3 - Build the Doctrine Compiler
**Authority gate:** Gate 3 - Compiler Authority Gate
**State:** APPROVED
**Semantic source:** `doctrine/core/**`
**Approved semantic input:** Gate 2 Semantic IR proposal and its recorded approval
**Excluded:** `doctrine/agentic/**` as semantic input; Runtime, SDK, Host, repository truth, and generated artifacts as semantic authority

## Intended action

Approve the compiler architecture, stage boundaries, Semantic Gap behavior, provenance obligations, and proposed mutation scope required to compile accepted `doctrine/core/**` into the approved derived Semantic IR. This proposal does not authorize Candidate Semantic Contract ratification, applicability, Runtime or SDK mutation, projection mutation, doctrine mutation, or publication.

The compiler remains a realization of accepted semantic obligations. It may not invent meaning, resolve authority conflicts by implementation convenience, or treat deterministic output as semantic authority.

## Compiler architecture

The compiler is a staged, deterministic pipeline:

```text
Discover -> Parse -> Normalize -> Resolve -> Compile -> Validate
```

Each stage receives explicit inputs, preserves source identity and provenance, emits a typed intermediate result, and reports blocking failures without silently repairing or selecting meaning.

- **Discover** establishes the approved source boundary, source identities, source sections, and a reproducible source manifest for `doctrine/core/**`.
- **Parse** extracts structured claims and references while preserving source locations and rejecting malformed or unsupported source structures.
- **Normalize** removes representational variance only where semantic equivalence is established. It does not infer meaning, precedence, cardinality, optionality, algorithms, or lifecycle enumerations that remain unresolved.
- **Resolve** binds references and checks definitions, ownership, authority relationships, dependencies, conflicts, and provenance. Equal-authority conflicts and unresolved references remain explicit and block deterministic compilation.
- **Compile** constructs the approved generic Semantic IR and records transformations from source claims through the pipeline. It does not create an Applicable Contract or establish repository truth.
- **Validate** checks structural consistency, semantic distinctions, authority boundaries, provenance completeness, compatibility and applicability requirements, determinism, and mutation scope before accepting derived output. It may validate that compatibility and applicability requirements are present, structurally valid, internally consistent, and represented according to the approved Semantic IR. It does not invent, define, or execute concrete compatibility or applicability algorithms that remain unresolved from Gate 2. An indeterminate result under an unresolved algorithm is not itself a compiler semantic failure unless an already-approved semantic rule requires that result to block compilation.

## Semantic Gap and failure behavior

A missing or ambiguous semantic is represented as a process finding with:

```text
SEMANTIC-GAP
ID:
Source:
Missing semantic:
Impact:
Required authority:
```

Compilation fails closed when a Semantic Gap or any equivalent blocking condition could affect meaning or deterministic output. The compiler must preserve source claims and provenance and must not select defaults, infer precedence, use document or filesystem order as authority, or consult Runtime, SDK, Host, repository behavior, or generated artifacts to fill the gap.

The following conditions are blocking unless an applicable approved semantic rule resolves them:

- semantic ambiguity or unresolved references;
- equal-authority conflict without attributable precedence;
- invalid ownership or authority relationship;
- provenance loss or untraceable material output;
- absent, structurally invalid, or internally inconsistent compatibility or applicability requirements;
- non-deterministic output for identical approved inputs;
- mutation outside the approved compiler mutation boundary.

## Provenance and determinism obligations

Every material Semantic IR object must remain traceable to accepted doctrine sources and recorded transformations. Conflicting claims, uncertainty, authority decisions, and attributable resolutions remain distinguishable and preserved.

The compiler may apply only approved canonicalization obligations from Gate 2. Gate 3 determinism means the compiler architecture SHALL admit deterministic compilation for identical approved inputs once the approved canonicalization, ordering, serialization, and identity algorithms are provided. Gate 3 does not itself establish those algorithms. Concrete serialization, hashing, ordering, version, compatibility, lifecycle, transition, loading, caching, delegation, and revocation algorithms remain unresolved and cannot be invented by this proposal or its implementation.

## Proposed mutation scope

Subject to Gate 3 approval, mutations are limited to compiler proposal and implementation artifacts under `.guvna/agent-state/` until a concrete implementation scope is separately approved. This proposal itself creates only:

- `.guvna/agent-state/proposals/gate-3-compiler-proposal.md`
- `.guvna/agent-state/proposals/gate-3-compiler-proposal.yaml`

No mutation is authorized by this proposal in:

- `doctrine/**`;
- `core/runtime/**`;
- `core/sdk/**`;
- repository semantic inputs;
- Runtime, SDK, Projection, or Contract artifacts;
- publication or generated output locations.

## Gate 3 decision requested

Approve or revise this compiler architecture, its stage boundaries, fail-closed Semantic Gap behavior, provenance and determinism obligations, and the explicitly limited mutation scope. Approval would authorize the next compiler implementation proposal only within the approved scope. It would not ratify a Candidate Semantic Contract or authorize Runtime, SDK, projection, publication, or doctrine mutation.

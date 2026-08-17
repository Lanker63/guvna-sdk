# Guvna Doctrine-to-Runtime-and-SDK AI Agent Plan

**Status:** Proposed --- awaiting Phase 0 authorization\
**Execution:** Local AI agents under explicit human authority gates\
**Design language:** TypeScript

## Mission

Implement a deterministic, governed process that transforms accepted
Guvna doctrine into ratified Semantic Contracts and then into conforming
Runtime, SDK, and conformance artifacts.

The required semantic path is:

```text
Accepted Guvna Doctrine
        ↓
Doctrine Semantic Model
        ↓
Guvna Semantic IR
        ↓
Semantic Compilation
        ↓
Candidate Semantic Contract
        ↓
Validation / Compatibility / Provenance
        ↓
Contract Ratification
        ↓
Applicable Semantic Contract
        ├── Runtime Contract → Runtime
        └── SDK Contract → SDK
```

Repository-specific meaning remains separately owned by the Governed
Repository.

---

# 1. Non-Negotiable Rules

1.  **Doctrine remains authoritative.** Markdown doctrine is the
    human-authoritative expression of Guvna meaning.
2.  **Semantic compilation is mandatory.** Never translate doctrine
    directly into Runtime or SDK source.
3.  **Missing semantics become Semantic Gaps.** Never resolve ambiguity
    by implementation inference.
4.  **Candidate contracts are not automatically applicable.** Explicit
    Contract Ratification is required.
5.  **Runtime and SDK share a semantic parent.** Neither is derived
    semantically from the other's implementation.
6.  **Runtime is not semantic authority.**
7.  **SDK is not semantic authority.**
8.  **Repository truth is not a source of Guvna semantics.**
9.  **Compilation must be deterministic.**
10. **Every semantic artifact must preserve provenance.**

---

# 2. Authority-Gate Protocol

Every phase follows this exact protocol:

1.  Inspect inputs.
2.  Analyze without mutation.
3.  Produce an intended-action report.
4.  List proposed file mutations.
5.  List semantic decisions and assumptions.
6.  List unresolved gaps and authority questions.
7.  STOP at the phase gate.
8.  Wait for explicit human approval.
9.  Perform only the approved action.
10. Verify the result.
11. Produce a completion report.
12. Proceed only when the next gate permits it.

Approval of one phase never authorizes a later phase.

### Gate vocabulary

- `REVIEW` --- analysis/proposal only.
- `APPROVE` --- explicit authorization to perform the presented
  action.
- `REVISE` --- revise the proposal and return to the same gate.
- `REJECT` --- do not perform the proposed action.
- `BLOCKED` --- required authority or semantic information is absent.

---

# 3. Phase 0 --- Establish Baseline

## Objective

Establish the exact doctrine and repository baseline.

## Inspect

- current doctrine set;
- canonical models;
- architectural artifacts;
- TypeScript structure;
- existing Runtime;
- existing SDK;
- existing generators;
- tests/build configuration;
- generated artifacts.

## Produce

```text
BASELINE REVIEW
Doctrine sources:
Canonical sources:
Semantic artifacts:
Runtime:
SDK:
Generators:
Tests/build:
Existing generated artifacts:
Working boundaries:
Unknowns:
Potential conflicts:
```

**No mutations.**

### Gate 0 --- Baseline Authority Gate

Human approves the baseline and scope.

---

# 4. Phase 1 --- Define the Doctrine Semantic Model

## Objective

Create the machine-oriented representation between doctrine and
compilation without replacing doctrine.

Minimum concepts:

```text
Concept
Relationship
Invariant
Ownership
Authority Boundary
Provenance Requirement
Compatibility Requirement
Operation
State
Transition
Contract
Derivation
Semantic Reference
```

TypeScript is the semantic design language.

Illustrative starting shape:

```ts
interface DoctrineModel {
  doctrineVersion: SemanticVersion;
  sources: DoctrineSource[];
  concepts: ConceptDefinition[];
  relationships: RelationshipDefinition[];
  invariants: InvariantDefinition[];
  ownership: OwnershipDefinition[];
  contracts: ContractDefinition[];
  derivations: DerivationDefinition[];
  provenance: ProvenanceRecord[];
}
```

The final model must be derived from doctrine rather than invented to
complete the interface.

## Gate 1 --- Semantic Model Authority Gate

Present:

- complete proposed TypeScript model;
- doctrine-to-model mapping;
- unresolved semantic gaps;
- examples;
- validation rules;
- proposed file mutations.

**Stop until approved.**

---

# 5. Phase 2 --- Define the Guvna Semantic IR

## Objective

Define the compiler's canonical intermediate representation.

The IR must be:

- explicit;
- typed;
- deterministic;
- serializable;
- versioned;
- provenance-aware;
- independent of Runtime implementation;
- independent of SDK implementation;
- independent of repository-specific truth.

Recommended separation:

```text
TypeScript = semantic design language
JSON       = machine-consumable serialized IR
Markdown   = human doctrine
```

## Gate 2 --- Semantic IR Authority Gate

Present:

- TypeScript IR;
- serialized example;
- identity/reference rules;
- canonical ordering;
- versioning;
- provenance;
- determinism strategy;
- unresolved gaps;
- proposed mutations.

**Stop until approved.**

---

# 6. Phase 3 --- Build the Doctrine Compiler

## Objective

Compile accepted doctrine into Semantic IR.

Required stages:

```text
Discover
  ↓
Parse
  ↓
Normalize
  ↓
Resolve
  ↓
Compile
  ↓
Validate
```

### Discover

Establish source identity and doctrine scope.

### Parse

Extract structured semantic claims without silently inventing meaning.

### Normalize

Convert equivalent semantic expressions into canonical forms.

### Resolve

Detect:

- undefined concepts;
- circular dependencies;
- conflicting definitions;
- invalid ownership;
- invalid authority relationships;
- unresolved references.

### Compile

Construct Semantic IR.

### Validate

Verify structural and semantic consistency.

### Semantic Gap

When doctrine does not establish a required semantic:

```text
SEMANTIC-GAP
ID:
Source:
Missing semantic:
Impact:
Required authority:
```

Compilation fails closed on unresolved semantic gaps.

### Gate 3 --- Compiler Authority Gate

Before implementation, approve:

- compiler architecture;
- stage boundaries;
- Semantic Gap behavior;
- mutation scope.

After implementation verify:

- current doctrine compiles;
- output is deterministic;
- unresolved semantics fail closed.

---

# 7. Phase 4 --- Compile the Candidate Semantic Contract

## Objective

Transform accepted doctrine and Semantic IR into a Candidate Semantic
Contract.

```text
Accepted Doctrine
      ↓
Semantic IR
      ↓
Semantic Compilation
      ↓
Candidate Semantic Contract
```

The candidate must include, as applicable:

- semantic identity;
- version;
- parent references;
- concepts;
- operations;
- states;
- transitions;
- invariants;
- authority boundaries;
- provenance requirements;
- compatibility requirements;
- failure semantics;
- realization obligations.

Required analyses:

1.  semantic validation;
2.  compatibility analysis;
3.  provenance validation;
4.  Semantic Delta from the previous applicable contract, when
    applicable.

## Gate 4 --- Candidate Contract Authority Gate

Present:

```text
CANDIDATE CONTRACT REVIEW

Identity:
Version:
Parent:
Source doctrine:
Semantic changes:
New concepts:
Removed concepts:
Changed concepts:
New/changed obligations:
Changed invariants:
Authority changes:
Provenance changes:
Compatibility classification:
Semantic gaps:
Runtime impact:
SDK impact:
Projection impact:
Generated artifacts:
```

**No ratification or code generation before approval.**

---

# 8. Phase 5 --- Contract Ratification

## Objective

Convert the validated Candidate Semantic Contract into an Applicable
Semantic Contract.

Ratification establishes applicability. It does not invent Guvna
meaning.

### Gate 5 --- RATIFICATION AUTHORITY GATE

Present:

- exact candidate identity/version;
- candidate digest;
- validation report;
- compatibility report;
- provenance report;
- Semantic Delta.

Human must explicitly authorize:

```text
RATIFY CONTRACT <identity>@<version>
```

Without this authorization:

- no Applicable Contract;
- no Runtime generation;
- no SDK generation;
- no publication.

Record the ratification provenance after approval.

---

# 9. Phase 6 --- Specialize the Applicable Contract

Produce:

```text
Applicable Semantic Contract
        ├── Runtime Contract
        ├── SDK Contract
        └── Projection Contract
```

## Runtime Contract

May define:

- operations;
- states/transitions;
- directive semantics;
- execution preconditions;
- authority requirements;
- provenance requirements;
- failure semantics;
- lifecycle requirements;
- compatibility requirements.

It must remain within the parent semantic boundary.

## SDK Contract

Defines the public/programmatic realization obligations exposed to SDK
consumers.

It must be derived independently from the common semantic parent.

## Projection Contract

Defines the contract governing repository-facing projections.

### Gate 6 --- Contract Specialization Authority Gate

Present all three specialized contracts, derivation traceability,
cross-contract consistency, Semantic Delta, and unresolved gaps.

**Stop until approved.**

---

# 10. Phase 7 --- Generate Runtime

## Objective

Generate/update Runtime semantics from the approved Runtime Contract.

Preferred architecture:

```text
Stable Runtime Kernel
        +
Versioned Generated Runtime Semantics
        +
Governance Projection
```

The kernel may provide generic execution mechanisms, but it must not
silently introduce Guvna semantics absent from the contract.

Generated semantics may provide:

- operations;
- states;
- transitions;
- constraints;
- directives;
- authority requirements;
- provenance requirements;
- compatibility rules.

### Gate 7 --- Runtime Mutation Authority Gate

Before mutation present:

- exact files;
- replacements;
- preserved files;
- generated source;
- contract version;
- semantic-to-code traceability;
- behavioral impact;
- tests;
- migration implications.

Human explicitly approves Runtime mutation.

---

# 11. Phase 8 --- Generate SDK

## Objective

Generate the SDK from the approved SDK Contract.

The SDK must:

- reflect the SDK Contract;
- expose contract-defined capabilities;
- preserve semantic identity/version;
- preserve required states/errors;
- preserve provenance where required.

The SDK generator must not inspect Runtime implementation to discover
public semantics.

### Gate 8 --- SDK Mutation Authority Gate

Present:

- exact SDK files;
- generated types;
- operations;
- public API changes;
- breaking changes;
- version implications;
- conformance tests;
- contract traceability.

Human explicitly approves SDK mutation.

---

# 12. Phase 9 --- Generate Conformance Tests

## Objective

Generate tests from contract obligations.

```text
Applicable Contract
       ├── Runtime Generator
       ├── SDK Generator
       └── Conformance Generator
```

Test at least:

- structural conformance;
- semantic behavior;
- state transitions;
- invariants;
- authority boundaries;
- provenance;
- compatibility;
- failure behavior;
- version behavior.

### Gate 9 --- Conformance Authority Gate

Present generated tests, contract-obligation coverage, expected results,
exclusions, and known failures.

---

# 13. Phase 10 --- Verification and Determinism

Verify:

```text
Contract Validation
      ↓
Runtime Conformance
      ↓
SDK Conformance
      ↓
Determinism
      ↓
Provenance
      ↓
Build/Test
```

Compile identical inputs repeatedly and verify identical:

- Semantic IR;
- Candidate Contract;
- Applicable Contract;
- Semantic Delta;
- generated semantic artifacts.

### Gate 10 --- Release Verification Gate

Present:

```text
Contract:
Runtime:
SDK:
Semantic conformance:
Determinism:
Provenance:
Compatibility:
Build:
Tests:
Known limitations:
```

Human approval required before publication.

---

# 14. Phase 11 --- Publish Versioned Artifacts

Conceptually:

```text
contracts/
  candidate/
  ratified/

runtime/
  vX.Y.Z/

sdk/
  vX.Y.Z/

conformance/
  vX.Y.Z/

deltas/
  vX.Y.Z/
```

Every publication preserves:

- semantic version;
- contract identity;
- provenance;
- doctrine digest;
- compiler version;
- artifact digest;
- conformance result.

### Gate 11 --- Publication Authority Gate

Present the exact publication manifest.

No publication without explicit approval.

---

# 15. Phase 12 --- Repository Impact / Adoption Handoff

Provide the Governed Repository with:

- Applicable Semantic Contract;
- Semantic Delta;
- compatibility classification;
- migration requirements;
- projection impact;
- SDK impact;
- Runtime impact;
- provenance.

Do not automatically modify repository-specific meaning.

Do not collapse Contract Ratification into Repository Acceptance.

### Gate 12 --- Repository Adoption Handoff Gate

Present:

```text
REPOSITORY IMPACT REPORT

Applicable Contract:
Previous Contract:
Semantic Delta:
Compatibility:
Required migration:
Projection impact:
Repository obligations:
Potential repository semantic conflicts:
Required repository authority:
```

This gate does not authorize repository semantic mutation.

---

# 16. Phase 13 --- Governance Projection Regeneration

Where an adopted contract requires a repository projection change:

```text
Accepted Repository Knowledge
        +
Repository Governance
        +
Projection Contract
        ↓
Repository Projection Compilation
        ↓
Governance Projection
```

The projection remains repository-owned; Guvna owns the semantic
contract governing its interpretation.

### Gate 13 --- Projection Mutation Authority Gate

Present:

- source repository artifacts;
- projection inputs;
- Projection Contract version;
- proposed projection;
- semantic diff;
- runtime impact;
- provenance.

Human explicitly approves projection mutation.

---

# 17. Phase 14 --- Final System Acceptance

Final architecture must demonstrate:

```text
Doctrine
   ↓
Semantic Model
   ↓
Semantic IR
   ↓
Candidate Contract
   ↓
Ratified Contract
   ↓
Runtime Contract → Runtime
   │
   └── Conformance

Ratified Contract
   ↓
SDK Contract → SDK
   │
   └── Conformance

Repository Knowledge
   +
Repository Governance
   +
Projection Contract
   ↓
Governance Projection
   ↓
Runtime
```

### Gate 14 --- Final System Acceptance Gate

Provide the complete evidence package:

- doctrine baseline;
- Semantic Model;
- Semantic IR;
- Candidate Contract;
- validation;
- compatibility;
- provenance;
- ratification record;
- Runtime Contract;
- SDK Contract;
- Projection Contract;
- Runtime artifacts;
- SDK artifacts;
- conformance results;
- Semantic Delta;
- determinism results;
- repository impact report;
- projection verification.

Human explicitly accepts completion.

---

# 18. Mandatory Stop Conditions

The agent must stop and report rather than improvise when it encounters:

- semantic ambiguity;
- authority ambiguity;
- ownership conflict;
- contract inconsistency;
- provenance failure;
- compatibility indeterminacy;
- non-determinism;
- unexpected mutation;
- generated-artifact drift.

A stop condition is an authority/semantic boundary, not an
implementation inconvenience.

---

# 19. Required Phase Report

Every phase produces both human-readable and machine-readable evidence.

Minimum machine-readable shape:

```yaml
phase:
status:
authority_gate:
inputs:
outputs:
proposed_mutations:
completed_mutations:
semantic_decisions:
authority_decisions:
semantic_gaps:
compatibility:
provenance:
validation:
tests:
next_phase:
requires_approval: true
```

The agent must never report proposed work as completed work.

---

# 20. Required Artifact Lineage

Every generated semantic artifact must be traceable:

```text
Doctrine Source
      ↓
Doctrine Model
      ↓
Semantic IR
      ↓
Candidate Contract
      ↓
Ratification
      ↓
Applicable Contract
      ↓
Specialized Contract
      ↓
Generated Artifact
      ↓
Conformance Evidence
```

An artifact without this lineage is non-conforming.

---

# 21. Suggested Repository Layout

Do not adopt this blindly; compare it against the Phase 0 baseline.

```text
guvna/
├── doctrine/
├── compiler/
│   ├── discovery/
│   ├── parsing/
│   ├── normalization/
│   ├── resolution/
│   ├── semantic/
│   ├── validation/
│   ├── compatibility/
│   ├── ratification/
│   └── provenance/
├── semantic-ir/
├── contracts/
│   ├── candidate/
│   ├── ratified/
│   └── deltas/
├── generators/
│   ├── runtime/
│   ├── sdk/
│   ├── conformance/
│   └── projection/
├── runtime/
│   ├── kernel/
│   └── generated/
├── sdk/
└── conformance/
```

---

# 22. Definition of Done

The implementation is complete only when:

- [ ] Doctrine is baselined.
- [ ] Doctrine Semantic Model exists.
- [ ] Semantic IR exists.
- [ ] Doctrine compiles deterministically into Semantic IR.
- [ ] Semantic IR compiles into Candidate Semantic Contract.
- [ ] Semantic gaps fail closed.
- [ ] Candidate validation succeeds.
- [ ] Compatibility analysis succeeds.
- [ ] Provenance is complete.
- [ ] Candidate Contract is explicitly ratified.
- [ ] Applicable Semantic Contract exists.
- [ ] Runtime Contract exists.
- [ ] SDK Contract exists.
- [ ] Projection Contract exists.
- [ ] Runtime is generated/updated from the Runtime Contract.
- [ ] SDK is generated/updated from the SDK Contract.
- [ ] Runtime is not the semantic source for SDK generation.
- [ ] SDK is not the semantic source for Runtime generation.
- [ ] Conformance tests exist.
- [ ] Runtime conforms.
- [ ] SDK conforms.
- [ ] Compilation is deterministic.
- [ ] Provenance is preserved end-to-end.
- [ ] Semantic Delta is generated.
- [ ] Repository impact is reported.
- [ ] Projection changes pass their own authority gate.
- [ ] Final evidence package is complete.
- [ ] Human final acceptance is explicit.

---

# 23. Final Agent Directive

Treat this document as a **governed implementation process**, not as
permission to implement everything immediately.

The agent's responsibility is to:

1.  establish current state;
2.  derive a proposed action;
3.  stop at the appropriate authority gate;
4.  obtain explicit authorization;
5.  perform only the authorized action;
6.  verify the result;
7.  preserve provenance;
8.  report completion;
9.  continue to the next gate.

The agent SHALL NEVER:

- invent missing Guvna semantics;
- infer authority from implementation convenience;
- bypass a gate;
- combine separate authority boundaries;
- silently mutate outside approved scope;
- treat generated code as doctrine;
- treat Runtime behavior as semantic authority;
- treat SDK behavior as semantic authority;
- treat repository-specific truth as a source of Guvna semantics;
- declare a Candidate Contract applicable without explicit
  ratification.

## Desired End State

```text
                         GUVNA
                           │
                   Accepted Doctrine
                           │
                           ▼
                  Doctrine Semantic Model
                           │
                           ▼
                    Semantic IR
                           │
                           ▼
                Semantic Compilation
                           │
                           ▼
             Candidate Semantic Contract
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
          Validation  Compatibility  Provenance
              └────────────┼────────────┘
                           ▼
                   Contract Ratification
                           │
                           ▼
              Applicable Semantic Contract
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
       Runtime Contract SDK Contract Projection Contract
             │             │             │
             ▼             ▼             ▼
          Runtime         SDK      Governance Projection
             │             │             │
             └─────────────┴─────────────┘
                           │
                     Conformance
                           │
                           ▼
                 Verified Realization
```

**No semantic shortcut exists between doctrine and realization.**

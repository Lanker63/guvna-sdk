# Human Authority Applicability Decision Proposal

**State:** `APPROVED`
**Authority gate:** Separate Human Authority Applicability Decision
**Subject:** Ratified Guvna Semantic Contract
**Purpose:** Define the exact upstream authority input required before the approved Applicability Determination may produce `applicable` or `not-applicable` rather than `indeterminate`.

## Ratified Contract Subject

The proposal applies only to the already ratified Contract:

- **Semantic version:** `1.0.0`
- **Identity kind:** `semantic-contract`
- **Identity/preimage SHA-256:** `462e0f69750ec5379f2be64643032d0dd0d772faddb921843c23ae068c2e4439`
- **Semantic Delta:** absent / `not-applicable`
- **Approved semantic governed scope:** `Guvna Semantic Contract semantic boundary`
- **Semantic subject:** `Guvna-owned Semantic Contract expressing accepted Guvna meaning`
- **Ownership:** `Guvna`
- **Lifecycle:** `ratified`

This proposal does not modify the ratified Contract or its representation.

## Current Determination

The approved Applicability Determination returned `indeterminate` because the required authoritative applicability inputs were not supplied. The execution evidence is:

`.guvna/agent-state/evidence/compiler/ratified-contract-applicability-determination.yaml`

The evaluator must receive authoritative external inputs. Ratification, version, identity, semantic scope, process state, filesystem state, or implementation state cannot be treated as an applicability decision or as a substitute for missing evidence.

## Input-by-Input Authority Assessment

| Required input | Established by approved decision or accepted doctrine? | Authoritative source and exact value | Minimum human-authority action required |
|---|---|---|---|
| Applicability authority/decision identity | **No.** Ratification identity is not an applicability decision identity. | None supplied. The Gate 5 ratification record identifies the ratification event, not an applicability decision. | Designate a unique applicability decision identity attributable to this Contract and decision. |
| Attributable issuer/authority | **No.** Contract ownership by Guvna does not identify the issuer of an applicability decision. | Approved ownership value: `Guvna`; this establishes semantic ownership only, not an applicability issuer. | Designate the attributable authority identity/issuer authorized to decide applicability for the stated scope. |
| Decision version or effective revision | **No.** Contract version `1.0.0` is the semantic Contract version, not the applicability decision revision. | Ratified Contract version: `1.0.0`; not an applicability-decision version. | Designate the applicability decision version or effective revision. |
| Exact governed scope | **Partially established as semantic scope, not yet supplied as an evaluator input.** Candidate A establishes the approved semantic boundary. | Approved Candidate A scope decision: `Guvna Semantic Contract semantic boundary`. | Confirm this exact string as the governed scope in the attributable applicability decision, or designate a different exact governed scope with authority and provenance. No normalization or expansion is permitted. |
| Exact subject scope | **Not established merely by Candidate A scope.** The approved Candidate A scope describes the parent semantic boundary and subject, but does not itself constitute an external applicability subject-scope assertion. | Approved semantic subject: `Guvna-owned Semantic Contract expressing accepted Guvna meaning`; no exact evaluator subject-scope value supplied. | Designate the exact subject scope for this ratified Contract, with authority and provenance. Do not assume it equals the governed scope without an explicit authority assertion. |
| Validity evidence | **No.** Ratification does not establish current validity for applicability evaluation. | None supplied. | Provide attributable, explicit evidence that the applicability decision and Contract subject are valid for evaluation. Evidence must be marked valid and include provenance. |
| Effective-boundary evidence | **No.** Contract version and ratification date do not establish an effective boundary for applicability. | None supplied. | Provide attributable, explicit effective-boundary evidence, including the boundary needed by the approved evaluator, marked valid and with provenance. |
| Decision provenance | **No.** Existing Contract provenance records compilation and ratification provenance, not the provenance of an applicability decision. | Candidate provenance and Gate 5 ratification evidence are not applicability-decision provenance. | Provide provenance linking the applicability decision to its authority, decision identity, version/revision, scope assertions, validity evidence, and effective-boundary evidence. |

## Minimum Upstream Authority Package

Human authority must provide one attributable applicability decision package containing:

```yaml
authority:
  authorityIdentity: <explicit attributable issuer/authority identity>
  decisionIdentity: <unique applicability decision identity>
  decisionVersion: <decision version or effective revision>
  attribution: <attributable issuer record>
  decision: applicable | not-applicable
  provenance: <decision provenance>
  status: valid

governedScope: "Guvna Semantic Contract semantic boundary"
subjectScope: <explicit exact subject scope>
validated: true
validity:
  status: valid
  provenance: <validity evidence provenance>
effectiveBoundary:
  status: valid
  provenance: <effective-boundary evidence provenance>
```

The `decision` value must be explicitly selected as either `applicable` or
`not-applicable`. Human authority must not select a value solely to make the
Contract applicable. If any input is absent, malformed, stale, revoked,
conflicting, ambiguous, unsupported, or non-authoritative, the evaluator must
remain fail-closed and return `indeterminate`.

The package must explicitly assert the exact governed scope and exact subject
scope. The approved Candidate A scope is sufficient to identify the semantic
boundary proposed for `governedScope`; it does not, by itself, establish the
external authority assertion or the `subjectScope` value.

## Authority Boundaries

### Human authority designation

Human authority supplies and attributes the applicability decision package. It
may designate `applicable` or `not-applicable`, the authority identity, decision
identity, decision version/effective revision, exact scopes, validity evidence,
effective-boundary evidence, and provenance.

This proposal does not create that decision and does not infer any of its
values.

### Compiler determination

The approved pure `determineApplicability` evaluator consumes the externally
supplied package and returns exactly one of:

- `applicable`
- `not-applicable`
- `indeterminate`

It checks required authority metadata, exact governed-scope equality, validated
status, valid validity evidence, and valid effective-boundary evidence. It does
not create, alter, or ratify the authority decision.

### Resulting state

The evaluator result is a determination output, not a new authority decision:

- `applicable` means the supplied valid external authority decision is
  `applicable` and all approved conditions pass.
- `not-applicable` means the supplied valid external authority decision is
  `not-applicable` and all approved conditions pass.
- `indeterminate` means an approved condition or required authoritative input
  is missing, invalid, stale, revoked, conflicting, ambiguous, unsupported, or
  fails exact scope/evidence validation.

No result establishes a persistent Applicable Contract artifact, workspace
path, or downstream realization right.

## Explicit Exclusions

This proposal does not authorize:

- execution of Applicability Determination;
- creation or alteration of the applicability authority decision;
- modification of the ratified Contract;
- creation, relocation, or designation of a Contract artifact or workspace path;
- Runtime, SDK, Projection, Host, or downstream realization;
- inference of authority, identity, version, scope, validity, effective boundary,
  provenance, or applicability;
- conversion of ratification into applicability.

The current prerequisite remains:

```yaml
reference: null
version: null
workspace_path: null
status: BLOCKED/UNRESOLVED
contract_dependent_claims: INDETERMINATE
```

## Requested Human Decision

**APPROVED:** this narrowly scoped proposal defines
the required upstream applicability authority package.

This approval authorizes preparation and recording of one attributable human
applicability authority decision only after human authority supplies or
explicitly designates every required input. It does not itself establish
applicability. No applicability determination will be executed until that
decision is recorded with complete inputs.

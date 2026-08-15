# SemanticIR Materialization Blocked: Review Model Adapter Absent

**Result:** BLOCKED
**Operation:** Approved ReviewBoundSemanticModel to identity-bearing SemanticIR
materialization
**Date:** 2026-08-15

## Blocking Determination

No identity operation was executed. The approved review-bound YAML model cannot
be passed to the implemented identity-free bridge without an unapproved,
missing model-adapter/loader implementation.

The bridge accepts only the in-memory `ReviewBoundSemanticModel` TypeScript
shape defined in `core/src/compiler/review-bound-semantic-model.ts`. No YAML
loader, parser, or adapter from the approved YAML model to that TypeScript shape
exists in `core/src`.

## Exact Structural Mismatches

| Approved YAML representation | Bridge-required input | Why materialization cannot proceed |
|---|---|---|
| `governed_scope.meaning`, `subject_meaning`, source-handle list | `governedScope.content: Record`, `sourceAttributions: SourceAttribution[]` | No authorized conversion maps declarative scope/attribution fields to bridge content. |
| Nodes/relations/constraints/transitions with `meaning`, `category`, `sources`, and review handles | `ReviewNode.content` plus source-attribution objects | No conversion mapping exists; constructing it ad hoc would be a new adapter implementation. |
| YAML `reference_resolution_map` | `ReadonlyMap<ReviewHandle, ReviewHandle>` and review-reference objects inside node content | No loader or representation conversion exists. |
| `per_target_dependency_classifications` | `materializationPlans: ReadonlyMap<ReviewHandle, IdentityMaterializationPlan>` | The YAML uses target groups and explicit dependency classifications; the bridge requires one executable plan per target. |
| `collection_ordering_policy_map` | `collections: ReviewCollectionEntry[]` with concrete array instances | The bridge requires actual collection values and per-instance ordering; YAML holds policy labels only. |
| 64 target assignments | Scope bootstrap followed by a correctly ordered identity-materialization execution plan | No approved execution orchestrator exists to turn assignments into a deterministic sequence of bridge/materializer calls. |

## Boundary Preserved

The materialization operation did not create:

- scope bootstrap output;
- identity values, preimages, or digests;
- SemanticIR;
- Contract or Contract artifact;
- authority, ratification, or applicability record;
- workspace path; or
- Runtime, SDK, Host, or Projection realization.

Review handles were not transformed into semantic identities or preimage
inputs. No semantic content was inferred from YAML field layout or
implementation convenience.

## Required Next Input

A separately authorized implementation boundary is required for a deterministic
YAML-to-`ReviewBoundSemanticModel` loader/adapter and a target execution
orchestrator. It must consume only the approved YAML content and explicit
metadata; it must not select semantic content, identity policy, ordering,
scope meaning, references, or derivation relationships.

Only after that implementation is reviewed and verified can the existing
bridge/materializer be executed against the approved model.
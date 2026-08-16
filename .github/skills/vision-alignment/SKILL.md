---
name: vision-alignment
description: 'Evaluate Guvna implementation against the human-ratified constitution, canon, and architecture in doctrine/core. Use for vision alignment reviews covering strengths, weaknesses, gaps, and out-of-scope behavior without using documentation as implementation evidence.'
argument-hint: 'Specify the implementation path, feature, or change to evaluate.'
user-invocable: true
disable-model-invocation: false
---

# Guvna Vision Alignment

## Purpose

Evaluate an implementation against Guvna's indoctrinated vision using `doctrine/core/*` as the governing semantic and architectural rubric. The implementation under review is the only implementation evidence. Do not use documentation, plans, generated artifacts, tests, commit history, or unstated intent as substitutes for what the implementation actually does.

This is a read-only assessment. Do not edit doctrine, implementation, tests, documentation, or authority records.

## When to Use

Use this skill when asked whether Guvna implementation aligns with:

- the Guvna vision and constitutional purpose;
- canonical concepts, invariants, and semantic boundaries;
- the prescribed architecture and realization boundaries;
- the strengths, weaknesses, gaps, or out-of-scope behavior of an implementation.

## Governing Boundaries

- Read the applicable instruction files before reviewing governed paths.
- Read the relevant files under `doctrine/core/` before judging alignment. Doctrine is the authority, not implementation precedent.
- Inspect only the requested implementation and the smallest neighboring implementation surface needed to understand its behavior.
- Do not treat documentation as evidence of implementation behavior. If documentation is requested as a separate subject, report that it is outside this skill's scope.
- Do not invent, extend, ratify, or silently reconcile Guvna meaning.
- If doctrine is missing, ambiguous, or contradictory, identify the exact authority gap and stop the affected conclusion rather than guessing.
- Keep the review focused on alignment. Do not turn it into a general code-quality review unless a quality issue directly affects vision, canon, or architecture.
- Do not run commands, tests, builds, formatters, or external searches.

## Procedure

1. Establish the review target.
   - Identify the implementation path, symbols, behavior, and requested scope.
   - If no concrete implementation target is supplied, ask for one before reviewing.
   - Record explicit exclusions, including documentation if the user requests implementation-only analysis.

2. Load the governing rubric.
   - Read the applicable files under `doctrine/core/constitution/` for vision and constitutional obligations.
   - Read the applicable files under `doctrine/core/canonical/` for canonical concepts, invariants, and semantic constraints.
   - Read the applicable files under `doctrine/core/architecture/` for boundaries, dependency direction, and realization obligations.
   - Use only the doctrine passages relevant to the target; do not broaden the review without reason.

3. Inspect implementation evidence.
   - Read the target implementation and its direct callers, dependencies, or tests only when needed to establish actual behavior.
   - Distinguish observed behavior from inferred intent.
   - Note mutation scope, validation, normalization, ordering, failure behavior, authority handling, and boundary crossings when relevant to the doctrine rubric.

4. Build an alignment ledger.
   For each applicable doctrine requirement, record:
   - the doctrine source and requirement;
   - the implementation behavior that supports, conflicts with, or fails to address it;
   - the classification: aligned, partially aligned, misaligned, unimplemented, or unassessable;
   - the resulting consequence for vision, canon, or architecture.

5. Perform the four requested assessments.
   - **Strengths:** concrete implementation behavior that advances or preserves an established requirement.
   - **Weaknesses:** concrete behavior that is fragile, incomplete, or only partially aligned, without overstating it as a doctrine violation.
   - **Gaps:** required doctrine behavior absent, untestable from the implementation, or blocked by missing authority. Separate implementation gaps from authority gaps.
   - **Outside the scope:** behavior, semantics, or recommendations not established by the requested doctrine or implementation scope. Include documentation findings here when documentation was excluded.

6. Apply adversarial checks.
   - Confirm that no implementation convenience is being mistaken for semantic authority.
   - Check for category errors between vision, canonical meaning, and architecture.
   - Check whether the implementation crosses a realization boundary or expands mutation scope without authority.
   - Separate confirmed conflicts from uncertainty and review limits.

7. Conclude with status.
   - `ALIGNED` when the assessed requirements are implemented without confirmed conflicts.
   - `CONDITIONAL` when alignment depends on explicit assumptions or unverified behavior.
   - `BLOCKED` when a required doctrine decision is missing or contradictory.
   - `MISALIGNED` when confirmed implementation behavior conflicts with applicable doctrine.

## Output Format

Start with `Vision Alignment Assessment`.

Use these sections:

1. `Review target and evidence boundary`
2. `Vision`
3. `Canon`
4. `Architecture`
5. `Strengths`
6. `Weaknesses`
7. `Gaps`
8. `Outside the scope`
9. `Open authority decisions`
10. `Review limits`

For each material finding, include:

- **Classification:** aligned, partially aligned, misaligned, unimplemented, or unassessable.
- **Source:** the relevant doctrine document and axiom, invariant, or requirement.
- **Implementation evidence:** the concrete symbol or behavior observed.
- **Assessment:** why the evidence aligns or conflicts.
- **Impact:** the consequence for Guvna's vision, canon, or architecture.

Use `Confirmed`, `Evidence`, `Interpretation`, `Assumption`, and `Open authority decision` labels where useful. Do not present an interpretation or recommendation as an approved semantic decision.

End with exactly one status line:

`Alignment status: ALIGNED | CONDITIONAL | BLOCKED | MISALIGNED`

Follow it with one concise reason. Mention any pre-existing or unrelated issues only under `Review limits`; do not fix them.

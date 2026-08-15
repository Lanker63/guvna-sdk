# Candidate Semantic Contract Deterministic Generation (Rerun)

**Result:** `PASS-REVIEW-BOUND`

The input set, source order, member order, approved collection ordering,
meaning-preserving normalization, compact JSON representation, UTF-8 encoding,
identity preimage projection, base64url encoding, and SHA-256 digest procedure
are fixed by approved decisions. The preimage digest is:

`462e0f69750ec5379f2be64643032d0dd0d772faddb921843c23ae068c2e4439`

The same approved inputs therefore produce the same canonical preimage,
identity encoding, digest, candidate content, provenance, validation result,
and initial/no-predecessor delta result. No incidental ordering, path,
timestamp, process state, or generated value is used. Dangling or ambiguous
references would fail closed; none is present in the approved bounded content.

## Verification commands

- `pnpm -C core typecheck`: PASS
- `pnpm -C core test`: PASS, 1 test file and 16 tests
- `git diff --check`: PASS

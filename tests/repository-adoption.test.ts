import { describe, expect, it } from 'vitest';
import {
  decodeRepositoryAdoptionRecord,
  decodeRepositoryAdoptionAcceptanceTransitionResult,
  decodeRepositoryAdoptionReplayResult,
  decodeRepositoryAdoptionResult,
  encodeRepositoryAdoptionRecord,
  encodeRepositoryAdoptionAcceptanceTransitionResult,
  encodeRepositoryAdoptionReplayResult,
  encodeRepositoryAdoptionResult,
  type RepositoryAdoptionWireAcceptanceTransitionResult,
  type RepositoryAdoptionWireEvidence,
} from '../src/repository-adoption.js';

const evidence: RepositoryAdoptionWireEvidence = {
  kind: 'evidence',
  identity: { identityKind: 'evidence', value: 'architecture-doc' },
  meaning: { statement: 'The architecture document describes module boundaries.', terms: [] },
  provenance: [{ sourceIdentity: { identityKind: 'file', value: 'README.md' } }],
};

describe('Repository Adoption SDK wire contract', () => {
  it('round-trips Core-owned records without semantic reinterpretation', () => {
    const encoded = encodeRepositoryAdoptionRecord(evidence);
    expect(encoded.ok).toBe(true);
    expect(encoded.ok && decodeRepositoryAdoptionRecord(encoded.value)).toEqual({
      ok: true,
      value: evidence,
    });

    const acceptance = {
      kind: 'acceptance' as const,
      identity: { identityKind: 'acceptance', value: 'accept-boundaries' },
      candidateStatement: { identity: { identityKind: 'candidate', value: 'explicit-boundaries' } },
      authorityDecision: { identity: { identityKind: 'decision', value: 'accept-boundaries' } },
      acceptedIdentity: { identityKind: 'knowledge', value: 'explicit-boundaries' },
      provenance: evidence.provenance,
    };
    const acceptanceEncoded = encodeRepositoryAdoptionRecord(acceptance);
    expect(acceptanceEncoded.ok && decodeRepositoryAdoptionRecord(acceptanceEncoded.value)).toEqual({
      ok: true,
      value: acceptance,
    });

    const acceptanceProvenance = {
      kind: 'acceptance-provenance' as const,
      identity: { identityKind: 'acceptance-provenance', value: 'accept-boundaries' },
      sourceEvidence: [evidence.provenance[0] && { identity: evidence.identity }],
      candidateStatement: acceptance.candidateStatement,
      authorityContext: { identity: { identityKind: 'authority-context', value: 'repository-authority' } },
      authorityDecision: acceptance.authorityDecision,
      acceptance: { identity: acceptance.identity },
      acceptedIdentity: acceptance.acceptedIdentity,
      applicableSemanticVersion: {
        value: '1.0.0',
        semanticIdentity: { identity: { identityKind: 'contract', value: 'repository-adoption' } },
        scope: {
          identity: { identityKind: 'scope', value: 'repository-adoption' },
          meaning: { statement: 'Repository adoption contract', terms: [] },
        },
      },
      provenance: evidence.provenance,
    };
    const transitionResult: RepositoryAdoptionWireAcceptanceTransitionResult = {
      ok: true,
      acceptance,
      acceptanceProvenance,
      chain: {
        evidence: [evidence],
        provisionalUnderstanding: {
          kind: 'provisional-understanding',
          identity: { identityKind: 'understanding', value: 'boundary-understanding' },
          meaning: evidence.meaning,
          supportingEvidence: [{ identity: evidence.identity }],
          provenance: evidence.provenance,
        },
        candidateStatement: {
          kind: 'candidate-statement',
          identity: acceptance.candidateStatement.identity,
          meaning: evidence.meaning,
          supportingEvidence: [{ identity: evidence.identity }],
          lifecycleStatus: 'accepted',
          authorityContext: acceptanceProvenance.authorityContext,
          authorityDecision: acceptance.authorityDecision,
          provenance: evidence.provenance,
        },
        authorityDecision: {
          kind: 'authority-decision',
          identity: acceptance.authorityDecision.identity,
          authorityContext: acceptanceProvenance.authorityContext,
          candidateStatement: acceptance.candidateStatement,
          decision: 'accept',
          applicableSemanticVersion: acceptanceProvenance.applicableSemanticVersion,
          provenance: evidence.provenance,
        },
        acceptanceProvenance,
        acceptedIdentity: acceptance.acceptedIdentity,
      },
    };
    const transitionEncoded = encodeRepositoryAdoptionAcceptanceTransitionResult(transitionResult);
    expect(transitionEncoded.ok && decodeRepositoryAdoptionAcceptanceTransitionResult(transitionEncoded.value)).toEqual({
      ok: true,
      value: transitionResult,
    });

    const projection = {
      kind: 'repository-adoption-projection' as const,
      identity: { identityKind: 'projection', value: 'boundary-provisional' },
      projectionKind: 'provisional' as const,
      sourceCandidate: { identity: { identityKind: 'candidate', value: 'explicit-boundaries' } },
      sourceEvidence: [{ identity: evidence.identity }],
      sourceContract: acceptanceProvenance.applicableSemanticVersion,
      projectionStatus: 'non-authoritative' as const,
      provenance: evidence.provenance,
    };
    const projectionEncoded = encodeRepositoryAdoptionRecord(projection);
    expect(projectionEncoded.ok && decodeRepositoryAdoptionRecord(projectionEncoded.value)).toEqual({ ok: true, value: projection });

    const replayResult = { ok: false as const, replayIdentity: 'replay-1', failure: 'conflicting-replay' as const, reason: 'different result bytes' };
    const replayEncoded = encodeRepositoryAdoptionReplayResult(replayResult);
    expect(replayEncoded.ok && decodeRepositoryAdoptionReplayResult(replayEncoded.value)).toEqual({ ok: true, value: replayResult });

    const compatibility = {
      kind: 'compatibility-requirement-set' as const,
      identity: { identityKind: 'requirement-set', value: 'repository-adoption' },
      priorContract: { identity: { identityKind: 'contract', value: 'repository-adoption-previous' } },
      candidateContract: { identity: { identityKind: 'contract', value: 'repository-adoption' } },
      governedScope: acceptanceProvenance.applicableSemanticVersion.scope,
      requirements: [{
        identity: { identityKind: 'requirement', value: 'lifecycle' },
        predicateKind: 'lifecycle-semantics-preserved',
        authorityReference: { identityKind: 'decision', value: 'compatibility' },
        provenance: evidence.provenance,
      }],
      provenance: evidence.provenance,
    };
    const compatibilityEncoded = encodeRepositoryAdoptionRecord(compatibility);
    expect(compatibilityEncoded.ok && decodeRepositoryAdoptionRecord(compatibilityEncoded.value)).toEqual({ ok: true, value: compatibility });
  });

  it('round-trips explicit transport failure results', () => {
    const result = {
      ok: false as const,
      failure: { kind: 'missing-input' as const, reason: 'Authority context is absent' },
    };
    const encoded = encodeRepositoryAdoptionResult(result);
    expect(encoded.ok).toBe(true);
    expect(encoded.ok && decodeRepositoryAdoptionResult(encoded.value)).toEqual({
      ok: true,
      value: result,
    });
  });

  it('fails closed for malformed records and unsupported failure kinds', () => {
    expect(decodeRepositoryAdoptionRecord('{')).toEqual({
      ok: false,
      reason: 'SDK Repository Adoption record is invalid',
    });
    expect(
      decodeRepositoryAdoptionRecord(JSON.stringify({ ...evidence, kind: 'unknown' })),
    ).toEqual({
      ok: false,
      reason: 'SDK Repository Adoption record is invalid',
    });
    expect(
      decodeRepositoryAdoptionResult(
        JSON.stringify({
          ok: false,
          failure: { kind: 'unknown', reason: 'unsupported' },
        }),
      ),
    ).toEqual({
      ok: false,
      reason: 'SDK Repository Adoption result is invalid',
    });
    expect(
      decodeRepositoryAdoptionAcceptanceTransitionResult(JSON.stringify({
        ok: false,
        diagnostics: [{ code: 'unsupported', message: 'unsupported' }],
      })),
    ).toEqual({
      ok: false,
      reason: 'SDK Repository Adoption acceptance transition result is invalid',
    });
  });
});

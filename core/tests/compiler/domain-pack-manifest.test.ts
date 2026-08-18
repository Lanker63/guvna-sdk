import { describe, expect, it } from 'vitest';
import { validateDomainPackManifest } from '../../src/compiler/domain-pack-manifest.js';

const identity = { identityKind: 'semantic', value: 'domain-pack-1' };
const scope = { identity: { identityKind: 'scope', value: 'scope-1' }, meaning: { statement: 'scope', terms: [] } };
const version = { value: '1.0.0', semanticIdentity: { identity }, scope };
const provenance = [{ sourceIdentity: identity }];
const manifest = {
  packIdentity: identity,
  packVersion: version,
  targetGuvnaSemanticVersion: version,
  contents: [{ identity, contentClass: 'skill' as const, provenance }],
  provenance,
  compatibility: [],
};

describe('Domain Pack semantic manifest', () => {
  it('accepts the approved semantic field set', () => {
    expect(validateDomainPackManifest(manifest)).toEqual({ valid: true, manifest });
  });

  it.each([
    ['invalid identity', { ...manifest, packIdentity: { identityKind: 'semantic' } }, 'invalid'],
    ['invalid version', { ...manifest, packVersion: undefined }, 'invalid'],
    ['missing content class', { ...manifest, contents: [{ identity, provenance }] }, 'unresolved'],
    ['ambiguous content class', { ...manifest, contents: [{ identity, contentClass: ['agent', 'skill'], provenance }] }, 'ambiguous'],
    ['missing content provenance', { ...manifest, contents: [{ identity, contentClass: 'skill' }] }, 'unresolved'],
    ['malformed compatibility', { ...manifest, compatibility: [{}] }, 'invalid'],
    [
      'bundled agent authority claim',
      { ...manifest, contents: [{ identity, contentClass: 'agent', provenance, authorityClaim: identity }] },
      'invalid',
    ],
  ])('classifies %s without accepting it', (_name, value, status) => {
    const result = validateDomainPackManifest(value);

    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.status).toBe(status);
  });

  it('classifies accepted terminology conflicts as unresolved', () => {
    const result = validateDomainPackManifest(
      { ...manifest, contents: [{ identity, contentClass: 'ontology-terminology', provenance }] },
      {
      acceptedRepositoryTermIdentities: [identity],
      },
    );

    expect(result).toEqual({
      valid: false,
      status: 'unresolved',
      reason: 'Domain Pack content conflicts with accepted repository terminology',
    });
  });
});
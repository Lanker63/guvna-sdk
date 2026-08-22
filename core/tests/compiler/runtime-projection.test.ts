import { describe, expect, it } from 'vitest';
import { exportRuntimeProjection } from '../../src/compiler/runtime-projection.js';

describe('runtime projection export', () => {
  it('exports a deterministic versioned artifact from approved contracts', () => {
    const result = exportRuntimeProjection({
      governedRepositoryIdentity: { identityKind: 'repository', value: 'repo-1' },
      projectionIdentity: { identityKind: 'projection', value: 'projection-1' },
      projectionVersion: '1.0.0',
      compiledAt: '2026-08-22T00:00:00Z',
      freshness: { status: 'current', checkedAt: '2026-08-22T00:00:00Z', currentProjectionVersion: '1.0.0' },
      contracts: [],
    });
    expect(result).toEqual({
      ok: true,
      artifact: {
        artifactVersion: '1',
        governedRepositoryIdentity: { identityKind: 'repository', value: 'repo-1' },
        projectionIdentity: { identityKind: 'projection', value: 'projection-1' },
        projectionVersion: '1.0.0',
        compiledAt: '2026-08-22T00:00:00Z',
        freshness: { status: 'current', checkedAt: '2026-08-22T00:00:00Z', currentProjectionVersion: '1.0.0' },
        contracts: [],
      },
    });
  });

  it('rejects unratified contracts', () => {
    expect(exportRuntimeProjection({
      governedRepositoryIdentity: { identityKind: 'repository', value: 'repo-1' },
      projectionIdentity: { identityKind: 'projection', value: 'projection-1' },
      projectionVersion: '1.0.0',
      compiledAt: '2026-08-22T00:00:00Z',
      freshness: { status: 'current', checkedAt: '2026-08-22T00:00:00Z', currentProjectionVersion: '1.0.0' },
      contracts: [{} as never],
    })).toEqual({ ok: false, reason: 'Runtime projection contains an invalid contract' });
  });
});

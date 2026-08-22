import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { FileRuntimeGatewayProjectionSource } from '../src/projection-source.js';

const projection = {
  artifactVersion: '1',
  governedRepositoryIdentity: { identityKind: 'repository', value: 'repo-1' },
  projectionIdentity: { identityKind: 'projection', value: 'projection-1' },
  projectionVersion: '1.0.0',
  compiledAt: '2026-08-22T00:00:00Z',
  freshness: { status: 'current', checkedAt: '2026-08-22T00:00:00Z', currentProjectionVersion: '1.0.0' },
  contracts: [],
};

describe('FileRuntimeGatewayProjectionSource', () => {
  it('loads a valid projection artifact', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'guvna-projection-'));
    const filePath = join(directory, 'projection.json');
    await writeFile(filePath, JSON.stringify(projection));
    try {
      await expect(new FileRuntimeGatewayProjectionSource(filePath).getProjection()).resolves.toEqual(projection);
    } finally {
      await rm(directory, { recursive: true });
    }
  });

  it('fails closed for malformed or unratified projection artifacts', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'guvna-projection-'));
    const filePath = join(directory, 'projection.json');
    await writeFile(filePath, '{');
    try {
      await expect(new FileRuntimeGatewayProjectionSource(filePath).getProjection()).rejects.toThrow('projection artifact is invalid');
    } finally {
      await rm(directory, { recursive: true });
    }
  });

  it('rejects a projection that is not current', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'guvna-projection-'));
    const filePath = join(directory, 'projection.json');
    await writeFile(filePath, JSON.stringify({ ...projection, freshness: { ...projection.freshness, status: 'superseded' } }));
    try {
      await expect(new FileRuntimeGatewayProjectionSource(filePath).getProjection()).rejects.toThrow('not current');
    } finally {
      await rm(directory, { recursive: true });
    }
  });
});

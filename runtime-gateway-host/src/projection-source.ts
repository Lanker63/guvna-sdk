import { readFile } from 'node:fs/promises';
import type { RuntimeGatewayContextSource, RuntimeGatewayProjection } from '@guvna/core';
import { resolveApplicableSemanticContext } from '@guvna/core';

export class FileRuntimeGatewayProjectionSource implements RuntimeGatewayContextSource {
  public constructor(private readonly filePath: string) {}

  public async getProjection(): Promise<RuntimeGatewayProjection> {
    const artifact = await readJson(this.filePath);
    if (!isProjectionArtifact(artifact)) throw new Error('Runtime projection artifact is invalid');
    if (artifact.freshness.status !== 'current'
      || artifact.freshness.currentProjectionVersion !== undefined
      && artifact.freshness.currentProjectionVersion !== artifact.projectionVersion) {
      throw new Error('Runtime projection artifact is not current');
    }
    for (const contract of artifact.contracts) {
      const result = resolveApplicableSemanticContext([contract], {
        contractIdentity: contract.identity,
        contractVersion: contract.version.value,
        scope: contract.applicability.scope.identity,
      });
      if (!result.ok) throw new Error('Runtime projection artifact is invalid');
    }
    return artifact;
  }
}

async function readJson(filePath: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    throw new Error('Runtime projection artifact is invalid');
  }
}

function isProjectionArtifact(value: unknown): value is RuntimeGatewayProjection & { artifactVersion: '1' } {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const artifact = value as Record<string, unknown>;
  return artifact.artifactVersion === '1'
    && isIdentity(artifact.governedRepositoryIdentity)
    && isIdentity(artifact.projectionIdentity)
    && isNonEmptyString(artifact.projectionVersion)
    && isNonEmptyString(artifact.compiledAt)
    && isFreshness(artifact.freshness)
    && Array.isArray(artifact.contracts);
}

function isFreshness(value: unknown): value is RuntimeGatewayProjection['freshness'] {
  if (typeof value !== 'object' || value === null) return false;
  const freshness = value as Record<string, unknown>;
  return freshness.status === 'current' || freshness.status === 'superseded'
    || freshness.status === 'revoked' || freshness.status === 'unknown';
}

function isIdentity(value: unknown): value is { identityKind: string; value: string } {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const identity = value as Record<string, unknown>;
  return isNonEmptyString(identity.identityKind) && isNonEmptyString(identity.value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

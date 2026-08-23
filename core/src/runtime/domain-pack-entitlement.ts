import { verify } from 'node:crypto';

export interface DomainPackEntitlementClaims {
  licenseeKind: 'organization' | 'user';
  licenseeId: string;
  packIdentity: string;
  packVersion: string;
  operations: string[];
  repositoryScope: string;
  issuedAt: string;
  expiresAt: string;
  grantId: string;
}

export interface DomainPackEntitlementEnvelope {
  version: '1';
  keyId: string;
  algorithm: 'ECDSA_SHA_256';
  claims: DomainPackEntitlementClaims;
  signature: string;
}

export interface DomainPackEntitlementRequest {
  grant: string;
  licenseeKind: DomainPackEntitlementClaims['licenseeKind'];
  licenseeId: string;
  packIdentity: string;
  packVersion: string;
  operation: string;
  repositoryId: string;
  now: string;
}

export interface DomainPackEntitlementDependencies {
  publicKeys: ReadonlyMap<string, string | Buffer>;
  isRevoked(grantId: string): Promise<boolean>;
  isRepositoryInScope(scope: string, repositoryId: string): boolean;
}

export type DomainPackEntitlementResult =
  | { ok: true; claims: DomainPackEntitlementClaims }
  | { ok: false; reason: string };

export async function validateDomainPackEntitlement(
  request: DomainPackEntitlementRequest | null | undefined,
  dependencies: DomainPackEntitlementDependencies,
): Promise<DomainPackEntitlementResult> {
  if (!request) return failure('entitlement request is absent');
  const envelope = parseEnvelope(request.grant);
  if (!envelope) return failure('entitlement envelope is invalid');
  const publicKey = dependencies.publicKeys.get(envelope.keyId);
  if (!publicKey) return failure('entitlement signing key is unknown');
  const signatureValid = (() => {
    try {
      return verify('sha256', Buffer.from(canonicalize(envelope.claims)), publicKey, decodeSignature(envelope.signature));
    } catch {
      return false;
    }
  })();
  if (!signatureValid) {
    return failure('entitlement signature is invalid');
  }

  const claims = envelope.claims;
  if (claims.licenseeKind !== request.licenseeKind || claims.licenseeId !== request.licenseeId
    || claims.packIdentity !== request.packIdentity || claims.packVersion !== request.packVersion
    || !claims.operations.includes(request.operation)
    || !dependencies.isRepositoryInScope(claims.repositoryScope, request.repositoryId)) {
    return failure('entitlement is out of scope');
  }
  const now = Date.parse(request.now);
  const issuedAt = Date.parse(claims.issuedAt);
  const expiresAt = Date.parse(claims.expiresAt);
  if (!Number.isFinite(now) || !Number.isFinite(issuedAt) || !Number.isFinite(expiresAt)
    || now < issuedAt || now >= expiresAt) return failure('entitlement is expired or not yet valid');
  if (await dependencies.isRevoked(claims.grantId)) return failure('entitlement is revoked');
  return { ok: true, claims };
}

function parseEnvelope(value: string): DomainPackEntitlementEnvelope | undefined {
  try {
    const parsed: unknown = JSON.parse(value);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return undefined;
    const envelope = parsed as Record<string, unknown>;
    const claims = envelope.claims;
    if (envelope.version !== '1' || envelope.algorithm !== 'ECDSA_SHA_256'
      || typeof envelope.keyId !== 'string' || !envelope.keyId
      || typeof envelope.signature !== 'string' || !envelope.signature
      || typeof claims !== 'object' || claims === null || Array.isArray(claims)) return undefined;
    const candidate = claims as Record<string, unknown>;
    if ((candidate.licenseeKind !== 'organization' && candidate.licenseeKind !== 'user')
      || typeof candidate.licenseeId !== 'string' || typeof candidate.packIdentity !== 'string'
      || typeof candidate.packVersion !== 'string' || !Array.isArray(candidate.operations)
      || !candidate.operations.every((item) => typeof item === 'string')
      || typeof candidate.repositoryScope !== 'string' || typeof candidate.issuedAt !== 'string'
      || typeof candidate.expiresAt !== 'string' || typeof candidate.grantId !== 'string') return undefined;
    return {
      version: '1', algorithm: 'ECDSA_SHA_256', keyId: envelope.keyId,
      claims: candidate as unknown as DomainPackEntitlementClaims, signature: envelope.signature,
    };
  } catch {
    return undefined;
  }
}

function decodeSignature(value: string): Buffer {
  return Buffer.from(value, 'base64url');
}

function canonicalize(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  return `{${Object.keys(value as object).sort().map((key) => `${JSON.stringify(key)}:${canonicalize((value as Record<string, unknown>)[key])}`).join(',')}}`;
}

function failure(reason: string): { ok: false; reason: string } {
  return { ok: false, reason };
}

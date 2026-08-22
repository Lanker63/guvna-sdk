import { sign, type KeyObject } from 'node:crypto';
import type {
  DomainPackEntitlementClaims,
  DomainPackEntitlementEnvelope,
} from './domain-pack-entitlement.js';

export interface DomainPackEntitlementAuditEvent {
  eventKind: 'issued' | 'revoked' | 'used';
  grantId: string;
  packIdentity: string;
  packVersion: string;
  licenseeId: string;
  repositoryId?: string;
  operation?: string;
  timestamp: string;
}

export interface DomainPackEntitlementIssuer {
  keyId: string;
  privateKey: KeyObject;
  audit(event: DomainPackEntitlementAuditEvent): Promise<void>;
}

export interface DomainPackEntitlementRevocationStore {
  isRevoked(grantId: string): Promise<boolean>;
  revoke(grantId: string): Promise<void>;
}

export interface DomainPackEntitlementRevocationPersistence {
  has(grantId: string): Promise<boolean>;
  add(grantId: string): Promise<void>;
}

export class PersistentDomainPackEntitlementRevocationStore implements DomainPackEntitlementRevocationStore {
  constructor(private readonly persistence: DomainPackEntitlementRevocationPersistence) {}

  isRevoked(grantId: string): Promise<boolean> {
    return this.persistence.has(grantId);
  }

  revoke(grantId: string): Promise<void> {
    return this.persistence.add(grantId);
  }
}

export interface DomainPackEntitlementIssueInput {
  licenseeKind: DomainPackEntitlementClaims['licenseeKind'];
  licenseeId: string;
  packIdentity: string;
  packVersion: string;
  operations: string[];
  repositoryScope: string;
  issuedAt: string;
  expiresAt: string;
  grantId: string;
}

export class DomainPackEntitlementService {
  constructor(
    private readonly issuer: DomainPackEntitlementIssuer,
    private readonly revocations: DomainPackEntitlementRevocationStore,
  ) {}

  async issue(input: DomainPackEntitlementIssueInput): Promise<string> {
    const claims: DomainPackEntitlementClaims = { ...input };
    const signature = sign(null, Buffer.from(canonicalize(claims)), this.issuer.privateKey).toString('base64url');
    const envelope: DomainPackEntitlementEnvelope = {
      version: '1', keyId: this.issuer.keyId, claims, signature,
    };
    await this.issuer.audit({
      eventKind: 'issued', grantId: claims.grantId, packIdentity: claims.packIdentity,
      packVersion: claims.packVersion, licenseeId: claims.licenseeId, timestamp: claims.issuedAt,
    });
    return JSON.stringify(envelope);
  }

  async revoke(grantId: string, claims: Pick<DomainPackEntitlementClaims, 'packIdentity' | 'packVersion' | 'licenseeId'>, timestamp: string): Promise<void> {
    await this.revocations.revoke(grantId);
    await this.issuer.audit({
      eventKind: 'revoked', grantId, packIdentity: claims.packIdentity,
      packVersion: claims.packVersion, licenseeId: claims.licenseeId, timestamp,
    });
  }

  async isRevoked(grantId: string): Promise<boolean> {
    return this.revocations.isRevoked(grantId);
  }

  async recordUse(claims: Pick<DomainPackEntitlementClaims, 'grantId' | 'packIdentity' | 'packVersion' | 'licenseeId'>, repositoryId: string, operation: string, timestamp: string): Promise<void> {
    await this.issuer.audit({
      eventKind: 'used', grantId: claims.grantId, packIdentity: claims.packIdentity,
      packVersion: claims.packVersion, licenseeId: claims.licenseeId,
      repositoryId, operation, timestamp,
    });
  }
}

function canonicalize(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  return `{${Object.keys(value as object).sort().map((key) => `${JSON.stringify(key)}:${canonicalize((value as Record<string, unknown>)[key])}`).join(',')}}`;
}

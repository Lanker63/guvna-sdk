import type {
  DomainPackEntitlementDependencies,
  DomainPackEntitlementRequest,
} from './domain-pack-entitlement.js';
import { validateDomainPackEntitlement } from './domain-pack-entitlement.js';
import { decryptDomainPackArtifact } from './domain-pack-artifact.js';
import type { DomainPackEntitlementService } from './domain-pack-entitlement-service.js';
import type { DomainPackArtifactKey } from './domain-pack-artifact.js';

export async function decryptAuthorizedDomainPackArtifact(
  artifact: string,
  key: DomainPackArtifactKey,
  entitlement: DomainPackEntitlementRequest,
  validation: DomainPackEntitlementDependencies,
  service: Pick<DomainPackEntitlementService, 'recordUse'>,
): Promise<string> {
  const result = await validateDomainPackEntitlement(entitlement, validation);
  if (!result.ok) throw new Error(`Domain Pack entitlement refused: ${result.reason}`);
  const plaintext = decryptDomainPackArtifact(artifact, key);
  await service.recordUse(result.claims, entitlement.repositoryId, entitlement.operation, entitlement.now);
  return plaintext;
}

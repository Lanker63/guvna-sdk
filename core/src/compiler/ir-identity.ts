import { createHash } from 'node:crypto';
import type { SemanticIdentity } from './semantic-ir.js';

export interface IdentityPreimage {
  identityKind: string;
  bytes: Uint8Array;
}
export type IdentityResult =
  | { ok: true; identity: SemanticIdentity; digest: string; bytes: Uint8Array }
  | { ok: false; reason: string };

export function createIdentity(preimage: IdentityPreimage): IdentityResult {
  if (typeof preimage.identityKind !== 'string' || preimage.identityKind.length === 0)
    return { ok: false, reason: 'identityKind is required' };
  if (!(preimage.bytes instanceof Uint8Array) || preimage.bytes.length === 0)
    return { ok: false, reason: 'Canonical preimage bytes are required' };
  const bytes = new Uint8Array(preimage.bytes);
  return {
    ok: true,
    identity: {
      identityKind: preimage.identityKind,
      value: Buffer.from(bytes).toString('base64url'),
    },
    digest: createHash('sha256').update(bytes).digest('hex'),
    bytes,
  };
}

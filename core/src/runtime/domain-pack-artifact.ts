import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

export interface EncryptedDomainPackArtifact {
  version: '1';
  keyId: string;
  nonce: string;
  ciphertext: string;
  tag: string;
}

export interface DomainPackArtifactKey {
  keyId: string;
  key: Buffer;
}

export function encryptDomainPackArtifact(plaintext: string, key: DomainPackArtifactKey): string {
  if (!key.keyId || key.key.length !== 32) throw new Error('Domain Pack artifact key is invalid');
  const nonce = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key.key, nonce);
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  return JSON.stringify({
    version: '1', keyId: key.keyId,
    nonce: nonce.toString('base64url'), ciphertext: ciphertext.toString('base64url'),
    tag: cipher.getAuthTag().toString('base64url'),
  } satisfies EncryptedDomainPackArtifact);
}

export function decryptDomainPackArtifact(
  artifact: string,
  key: DomainPackArtifactKey,
): string {
  try {
    const parsed: unknown = JSON.parse(artifact);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) throw new Error('invalid');
    const value = parsed as Record<string, unknown>;
    if (value.version !== '1' || value.keyId !== key.keyId
      || typeof value.nonce !== 'string' || typeof value.ciphertext !== 'string' || typeof value.tag !== 'string'
      || key.key.length !== 32) throw new Error('invalid');
    const nonce = Buffer.from(value.nonce, 'base64url');
    const ciphertext = Buffer.from(value.ciphertext, 'base64url');
    const tag = Buffer.from(value.tag, 'base64url');
    if (nonce.length !== 12 || tag.length !== 16) throw new Error('invalid');
    const decipher = createDecipheriv('aes-256-gcm', key.key, nonce);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
  } catch {
    throw new Error('Domain Pack artifact decryption failed');
  }
}

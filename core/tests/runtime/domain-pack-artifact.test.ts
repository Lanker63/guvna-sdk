import { randomBytes } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  decryptDomainPackArtifact,
  encryptDomainPackArtifact,
} from '../../src/runtime/index.js';

const key = { keyId: 'pack-key-1', key: randomBytes(32) };

describe('Domain Pack artifact encryption', () => {
  it('round-trips plaintext inside the Runtime boundary', () => {
    const artifact = encryptDomainPackArtifact('{"opaque":true}', key);
    expect(decryptDomainPackArtifact(artifact, key)).toBe('{"opaque":true}');
  });

  it('rejects tampering and key mismatches', () => {
    const artifact = JSON.parse(encryptDomainPackArtifact('secret', key)) as Record<string, string>;
    artifact.ciphertext = `${artifact.ciphertext.slice(0, -1)}${artifact.ciphertext.endsWith('A') ? 'B' : 'A'}`;
    expect(() => decryptDomainPackArtifact(JSON.stringify(artifact), key)).toThrow('decryption failed');
    expect(() => decryptDomainPackArtifact(encryptDomainPackArtifact('secret', key), {
      keyId: 'other-key', key: key.key,
    })).toThrow('decryption failed');
  });

  it('rejects malformed envelopes and invalid keys', () => {
    expect(() => decryptDomainPackArtifact('{', key)).toThrow('decryption failed');
    expect(() => encryptDomainPackArtifact('secret', { keyId: '', key: randomBytes(32) })).toThrow('key is invalid');
    expect(() => encryptDomainPackArtifact('secret', { keyId: 'bad', key: randomBytes(16) })).toThrow('key is invalid');
  });
});

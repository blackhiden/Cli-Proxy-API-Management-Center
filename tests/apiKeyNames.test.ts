import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { createHash } from 'node:crypto';
import { apiKeyNameFingerprint, readLegacyAPIKeyNames } from '../src/features/config/apiKeyNames';
import { obfuscatedStorage } from '../src/services/storage/secureStorage';

const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
let values: Map<string, string>;

beforeEach(() => {
  values = new Map();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => values.delete(key),
    },
  });
});

afterEach(() => {
  if (originalStorage) Object.defineProperty(globalThis, 'localStorage', originalStorage);
  else Reflect.deleteProperty(globalThis, 'localStorage');
});

describe('legacy local API-key name migration', () => {
  test('reads valid fingerprinted labels without exposing credential values', () => {
    const apiBase = 'https://one.test';
    const apiKey = 'sk-fixture-not-a-real-credential';
    const fingerprint = apiKeyNameFingerprint(apiBase, apiKey);
    obfuscatedStorage.setItem(`api-key-names:v1:${apiBase}`, { [fingerprint]: 'Fixture' });

    expect(readLegacyAPIKeyNames(apiBase)).toEqual({ [fingerprint]: 'Fixture' });
    expect(JSON.stringify(obfuscatedStorage.getItem(`api-key-names:v1:${apiBase}`))).not.toContain(
      apiKey
    );
    expect(fingerprint).toBe(
      createHash('sha256')
        .update(JSON.stringify(['api-key-name', apiBase, apiKey]))
        .digest('hex')
    );
  });

  test('isolates fingerprints by server and ignores malformed entries', () => {
    const fingerprint = apiKeyNameFingerprint('server', 'valid');
    obfuscatedStorage.setItem('api-key-names:v1:server', {
      [fingerprint]: 'Name',
      ['a'.repeat(64)]: 4,
      ['b'.repeat(64)]: '',
      'not-a-fingerprint': 'Invalid',
    });
    expect(readLegacyAPIKeyNames('server')).toEqual({ [fingerprint]: 'Name' });
    expect(apiKeyNameFingerprint('other-server', 'valid')).not.toBe(fingerprint);

    values.set('api-key-names:v1:server', '{invalid');
    expect(readLegacyAPIKeyNames('server')).toEqual({});
  });

  test('returns an empty mapping when browser storage is unavailable', () => {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('Storage blocked');
      },
    });
    expect(readLegacyAPIKeyNames('server')).toEqual({});
  });
});

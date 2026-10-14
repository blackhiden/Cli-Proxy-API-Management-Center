import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex } from '@noble/hashes/utils.js';
import { obfuscatedStorage } from '@/services/storage/secureStorage';

const STORAGE_PREFIX = 'api-key-names:v1:';

export function apiKeyNameFingerprint(apiBase: string, apiKey: string): string {
  const input = JSON.stringify(['api-key-name', apiBase, apiKey]);
  return bytesToHex(sha256(new TextEncoder().encode(input)));
}

// Legacy browser labels are imported into the configuration draft and are never updated here.
export function readLegacyAPIKeyNames(apiBase: string): Record<string, string> {
  try {
    const stored = obfuscatedStorage.getItem<unknown>(STORAGE_PREFIX + apiBase);
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {};
    return Object.fromEntries(
      Object.entries(stored).filter(
        (entry): entry is [string, string] =>
          /^[a-f0-9]{64}$/.test(entry[0]) && typeof entry[1] === 'string' && !!entry[1].trim()
      )
    );
  } catch {
    return {};
  }
}

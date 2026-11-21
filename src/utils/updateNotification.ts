import type { ConnectionStatus } from '@/types';

interface InitialUpdateCheckInput {
  hasChecked: boolean;
  connectionStatus: ConnectionStatus;
}

export interface UpdateAvailabilityInput {
  latestVersion?: string | null;
  currentVersion?: string | null;
}

export interface UpdateAvailability {
  updateAvailable: boolean;
  comparison: number | null;
}

export function shouldCheckInitialUpdate({
  hasChecked,
  connectionStatus,
}: InitialUpdateCheckInput): boolean {
  return !hasChecked && connectionStatus === 'connected';
}

export function parseVersionSegments(version?: string | null): number[] | null {
  if (!version) return null;
  const cleaned = version.trim().replace(/^v/i, '');
  if (!cleaned) return null;
  const parts = cleaned
    .split(/[^0-9]+/)
    .filter(Boolean)
    .map((segment) => Number.parseInt(segment, 10))
    .filter(Number.isFinite);
  return parts.length ? parts : null;
}

/** Returns 1 when latest is newer, -1 when current is newer, 0 when equal, and null when unparsable. */
export function compareVersions(latest?: string | null, current?: string | null): number | null {
  const latestParts = parseVersionSegments(latest);
  const currentParts = parseVersionSegments(current);
  if (!latestParts || !currentParts) return null;
  const length = Math.max(latestParts.length, currentParts.length);
  for (let i = 0; i < length; i++) {
    const l = latestParts[i] || 0;
    const c = currentParts[i] || 0;
    if (l > c) return 1;
    if (l < c) return -1;
  }
  return 0;
}

/**
 * Update availability is based on semantic version order only. Commit hashes are
 * display metadata: a fork's build commit will differ from the upstream commit
 * even when the fork is already on a newer release.
 */
export function resolveUpdateAvailability({
  latestVersion,
  currentVersion,
}: UpdateAvailabilityInput): UpdateAvailability {
  const comparison = compareVersions(latestVersion, currentVersion);
  return { updateAvailable: comparison === 1, comparison };
}

export interface ParsedSemanticVersion {
  major: number;
  minor: number;
  patch: number;
  prerelease: string[];
  build: string[];
}

const SEMVER =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;

export function parseSemanticVersion(value: string): ParsedSemanticVersion | undefined {
  const match = SEMVER.exec(value);
  if (!match) return undefined;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4]?.split('.') ?? [],
    build: match[5]?.split('.') ?? [],
  };
}

export function compareSemanticVersions(left: string, right: string): number | undefined {
  const leftVersion = parseSemanticVersion(left);
  const rightVersion = parseSemanticVersion(right);
  if (!leftVersion || !rightVersion) return undefined;
  for (const field of ['major', 'minor', 'patch'] as const)
    if (leftVersion[field] !== rightVersion[field])
      return leftVersion[field] > rightVersion[field] ? 1 : -1;
  if (leftVersion.prerelease.length === 0 || rightVersion.prerelease.length === 0)
    return leftVersion.prerelease.length === rightVersion.prerelease.length
      ? 0
      : leftVersion.prerelease.length === 0
        ? 1
        : -1;
  for (
    let index = 0;
    index < Math.max(leftVersion.prerelease.length, rightVersion.prerelease.length);
    index += 1
  ) {
    const leftPart = leftVersion.prerelease[index];
    const rightPart = rightVersion.prerelease[index];
    if (leftPart === undefined || rightPart === undefined) return leftPart === undefined ? -1 : 1;
    if (leftPart === rightPart) continue;
    const leftNumeric = /^\d+$/.test(leftPart);
    const rightNumeric = /^\d+$/.test(rightPart);
    if (leftNumeric && rightNumeric) return Number(leftPart) > Number(rightPart) ? 1 : -1;
    if (leftNumeric !== rightNumeric) return leftNumeric ? -1 : 1;
    return leftPart > rightPart ? 1 : -1;
  }
  return 0;
}

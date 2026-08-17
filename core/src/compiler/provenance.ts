export function preserveProvenance<T>(provenance: readonly T[]): T[] {
  return [...provenance];
}

export function appendProvenance<T>(provenance: readonly T[], entry: T): T[] {
  return [...provenance, entry];
}

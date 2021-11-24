export const uniq = <T>(arr: T[]): T[] => [...new Set(arr)]

export const chunkArray = <T>(arr: T[], size: number): T[][] =>
  arr.length > size
    ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
    : [arr];

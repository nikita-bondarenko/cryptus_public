export const roundTo8 = (num: number | null | undefined): number | null => {
  if (num === null || num === undefined) return null;
  return Math.round(num * 1e8) / 1e8;
}; 
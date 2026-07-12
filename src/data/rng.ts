// Deterministic, seedable RNG (mulberry32) so the synthetic dataset — and every
// benchmark computed from it — is fully reproducible across runs and machines.

export function makeRng(seed: number) {
  let a = seed >>> 0;
  return function next(): number {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Rng = () => number;

export const rnd = (r: Rng, min: number, max: number) => min + r() * (max - min);
export const rndInt = (r: Rng, min: number, max: number) =>
  Math.floor(rnd(r, min, max + 1));
export const pick = <T>(r: Rng, arr: readonly T[]): T => arr[Math.floor(r() * arr.length)];
export const chance = (r: Rng, p: number) => r() < p;

// Gaussian-ish jitter via central limit; clamped to [min,max].
export function jitter(r: Rng, mean: number, spread: number, min = -Infinity, max = Infinity) {
  const g = (r() + r() + r()) / 3 - 0.5; // ~[-0.5,0.5], bell-shaped
  return Math.min(max, Math.max(min, mean + g * 2 * spread));
}

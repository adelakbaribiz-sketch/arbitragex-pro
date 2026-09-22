// Deterministic seeded PRNG (mulberry32) so demo data is reproducible across
// server and client renders instead of using Math.random(). This keeps the
// "simulated" figures throughout the app actually computed and stable rather
// than hand-typed magic numbers. See docs/DEMO.md — all output from this
// module is DEMO / SIMULATED data, never real market or trading data.
export function mulberry32(seed: number) {
  let a = seed;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededBetween(rng: () => number, min: number, max: number) {
  return min + rng() * (max - min);
}

export function seededPick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

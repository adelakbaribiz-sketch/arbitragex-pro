import { generateDemoDataset } from "./generators";

// Module-level cache so the same simulated dataset is reused across API
// route calls within a server lifetime, instead of regenerating (and
// silently drifting) on every request.
let cached: ReturnType<typeof generateDemoDataset> | null = null;

export function getDemoDataset() {
  if (!cached) cached = generateDemoDataset();
  return cached;
}

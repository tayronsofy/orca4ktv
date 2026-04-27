// Resumable progress tracking. Each rewriter writes its completed item IDs to .manifest.json
// so re-running the script picks up where the previous run left off.

import { promises as fs } from 'fs';
import { MANIFEST_PATH } from './paths.js';

interface ManifestData {
  [bucket: string]: {
    completed: (string | number)[];
    failed: (string | number)[];
    lastRun: string;
  };
}

let cache: ManifestData | null = null;

async function load(): Promise<ManifestData> {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(MANIFEST_PATH, 'utf-8');
    cache = JSON.parse(raw);
    return cache!;
  } catch {
    cache = {};
    return cache;
  }
}

async function save(data: ManifestData): Promise<void> {
  cache = data;
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(data, null, 2));
}

export async function isCompleted(bucket: string, id: string | number): Promise<boolean> {
  const data = await load();
  return data[bucket]?.completed.includes(id) ?? false;
}

export async function markCompleted(bucket: string, id: string | number): Promise<void> {
  const data = await load();
  if (!data[bucket]) {
    data[bucket] = { completed: [], failed: [], lastRun: new Date().toISOString() };
  }
  if (!data[bucket].completed.includes(id)) {
    data[bucket].completed.push(id);
  }
  data[bucket].lastRun = new Date().toISOString();
  // Drop from failed list if it was there
  data[bucket].failed = data[bucket].failed.filter((x) => x !== id);
  await save(data);
}

export async function markFailed(bucket: string, id: string | number): Promise<void> {
  const data = await load();
  if (!data[bucket]) {
    data[bucket] = { completed: [], failed: [], lastRun: new Date().toISOString() };
  }
  if (!data[bucket].failed.includes(id)) {
    data[bucket].failed.push(id);
  }
  data[bucket].lastRun = new Date().toISOString();
  await save(data);
}

export async function resetBucket(bucket: string): Promise<void> {
  const data = await load();
  delete data[bucket];
  await save(data);
}

export async function getStats(bucket: string) {
  const data = await load();
  return data[bucket] ?? { completed: [], failed: [], lastRun: 'never' };
}

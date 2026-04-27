// Auto-backup helper. Copies originals to _backup/<relative-path> before any overwrite.

import { promises as fs } from 'fs';
import path from 'path';
import { PROJECT_ROOT, BACKUP_ROOT } from './paths.js';

/** Backup a file before it's about to be overwritten. Idempotent: skip if already backed up. */
export async function backupFile(absoluteSourcePath: string): Promise<void> {
  const rel = path.relative(PROJECT_ROOT, absoluteSourcePath);
  if (rel.startsWith('..')) {
    throw new Error(`backupFile refusing to back up file outside project: ${absoluteSourcePath}`);
  }
  const dest = path.join(BACKUP_ROOT, rel);

  // Skip if backup already exists (preserve original — never overwrite a backup)
  try {
    await fs.access(dest);
    return;
  } catch {
    // doesn't exist — proceed
  }

  await fs.mkdir(path.dirname(dest), { recursive: true });

  try {
    await fs.copyFile(absoluteSourcePath, dest);
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      // source doesn't exist (e.g., blog images that haven't been generated yet) — nothing to back up
      return;
    }
    throw e;
  }
}

export function getBackupRoot() {
  return BACKUP_ROOT;
}

// Project-relative paths. All scripts assume they're run from the project root via npm scripts.

import path from 'path';

export const PROJECT_ROOT = process.cwd();
export const DATA_DIR = path.join(PROJECT_ROOT, 'data');
export const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
export const APP_DIR = path.join(PROJECT_ROOT, 'app');
export const COMPONENTS_DIR = path.join(PROJECT_ROOT, 'components');
export const BACKUP_ROOT = path.join(PROJECT_ROOT, '_backup');
export const MANIFEST_PATH = path.join(PROJECT_ROOT, 'scripts', 'regenerate', '.manifest.json');

export const POSTS_PATH = path.join(DATA_DIR, 'posts.json');
export const MATCHES_PATH = path.join(DATA_DIR, 'matches.json');
export const PLANS_PATH = path.join(DATA_DIR, 'shopPlans.ts');

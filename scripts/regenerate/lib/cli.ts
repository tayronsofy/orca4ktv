// Tiny CLI flag parser shared across rewriters.
// Supports: --dry-run, --limit=N, --max-cost=N, --reset (clears manifest for the bucket)

export interface CliFlags {
  dryRun: boolean;
  limit: number | null;
  maxCost: number | null;
  reset: boolean;
}

export function parseFlags(argv: string[] = process.argv.slice(2)): CliFlags {
  const flags: CliFlags = {
    dryRun: false,
    limit: null,
    maxCost: null,
    reset: false,
  };

  for (const arg of argv) {
    if (arg === '--dry-run') flags.dryRun = true;
    else if (arg === '--reset') flags.reset = true;
    else if (arg.startsWith('--limit=')) {
      flags.limit = Number(arg.split('=')[1]);
    } else if (arg.startsWith('--max-cost=')) {
      flags.maxCost = Number(arg.split('=')[1]);
    }
  }

  return flags;
}

export function logBanner(title: string, flags: CliFlags) {
  const parts: string[] = [];
  if (flags.dryRun) parts.push('DRY RUN');
  if (flags.limit) parts.push(`limit=${flags.limit}`);
  if (flags.maxCost) parts.push(`max-cost=$${flags.maxCost}`);
  if (flags.reset) parts.push('reset manifest');
  const flagStr = parts.length ? ` [${parts.join(' | ')}]` : '';
  console.log(`\n=== ${title}${flagStr} ===\n`);
}

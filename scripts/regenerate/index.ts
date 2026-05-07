// scripts/regenerate/index.ts
// CLI dispatcher for content + image regeneration via Gemini API.
//
// Usage (via npm scripts in package.json):
//   npm run regen           # everything (text + images)
//   npm run regen:text      # all text rewrites (no images)
//   npm run regen:images    # all image generations (no text)
//   npm run regen:blog      # blog posts text + featured images
//   npm run regen:matches   # match descriptions only
//   npm run regen:plans     # shopPlans.ts only
//
// Common flags (all subcommands):
//   --dry-run        Log proposed changes, write nothing
//   --limit=N        Process at most N items
//   --reset          Clear the manifest bucket for this command before running
//   --max-cost=N     (Reserved - preflight cost gate; not yet enforced)

// Load env from .env.local first (Next.js convention), then .env as fallback
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { parseFlags, logBanner } from './lib/cli.js';
import { getUsageReport, resetUsage } from './lib/gemini.js';
import { getImageUsageReport, resetImageUsage } from './lib/imagen.js';
import { getOpenAIImageUsageReport, resetOpenAIImageUsage } from './lib/openai-image.js';
import { runBlogPostsRewrite } from './text/rewrite-blog-posts.js';
import { runMatchesRewrite } from './text/rewrite-matches.js';
import { runPlansRewrite } from './text/rewrite-plans.js';
import { runBlogImagesGenerate } from './images/generate-blog.js';
import { runMarketingImagesGenerate } from './images/generate-marketing.js';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const subFlags = args.slice(1);
  const flags = parseFlags(subFlags);

  if (!command) {
    printHelp();
    process.exit(1);
  }

  resetUsage();
  resetImageUsage();
  resetOpenAIImageUsage();
  const start = Date.now();

  try {
    switch (command) {
      case 'all':
        logBanner('REGEN: ALL (text + images)', flags);
        await runBlogPostsRewrite(flags);
        await runMatchesRewrite(flags);
        await runPlansRewrite(flags);
        await runBlogImagesGenerate(flags);
        await runMarketingImagesGenerate(flags);
        break;

      case 'text':
        logBanner('REGEN: TEXT', flags);
        await runBlogPostsRewrite(flags);
        await runMatchesRewrite(flags);
        await runPlansRewrite(flags);
        break;

      case 'images':
        logBanner('REGEN: IMAGES', flags);
        await runBlogImagesGenerate(flags);
        await runMarketingImagesGenerate(flags);
        break;

      case 'blog':
        logBanner('REGEN: BLOG (text + images)', flags);
        await runBlogPostsRewrite(flags);
        await runBlogImagesGenerate(flags);
        break;

      case 'matches':
        logBanner('REGEN: MATCHES', flags);
        await runMatchesRewrite(flags);
        break;

      case 'plans':
        logBanner('REGEN: PLANS', flags);
        await runPlansRewrite(flags);
        break;

      case 'pages':
      case 'faq':
        console.log(`\n[${command}] rewriter not yet implemented in this build.`);
        console.log(`Coming next: AST-safe rewriting of TSX metadata + FAQ arrays.`);
        process.exit(2);

      case '--help':
      case '-h':
        printHelp();
        return;

      default:
        console.error(`Unknown command: ${command}`);
        printHelp();
        process.exit(1);
    }
  } catch (e: any) {
    console.error(`\n✗ Fatal error: ${e.message}`);
    if (e.stack) console.error(e.stack);
    process.exit(1);
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  const tu = getUsageReport();
  const iu = getImageUsageReport();
  const ou = getOpenAIImageUsageReport();

  console.log(`\n══════════════════════════════════════════════`);
  console.log(`Done in ${elapsed}s`);
  console.log(`Text:           ${tu.inputTokens.toLocaleString()} in / ${tu.outputTokens.toLocaleString()} out → ~$${tu.estimatedCostUSD.toFixed(3)}`);
  console.log(`Images (Imagen):  ${iu.imagesGenerated} generated, ${iu.imagesFailed} failed → ~$${iu.estimatedCostUSD.toFixed(2)}`);
  console.log(`Images (OpenAI):  ${ou.imagesGenerated} generated, ${ou.imagesFailed} failed → ~$${ou.estimatedCostUSD.toFixed(2)}`);
  console.log(`Total estimated cost: ~$${(tu.estimatedCostUSD + iu.estimatedCostUSD + ou.estimatedCostUSD).toFixed(2)}`);
  if (flags.dryRun) console.log(`(DRY RUN - no files were written)`);
  console.log(`══════════════════════════════════════════════\n`);
}

function printHelp() {
  console.log(`
Orca 4K TV - Content & Image Regeneration

Commands:
  all        Run everything (text + images)
  text       Run all text rewrites (blog + matches + plans)
  images     Run all image generators (blog + marketing)
  blog       Blog posts: text + featured images
  matches    Match descriptions
  plans      shopPlans.ts content
  pages      [TODO] page metadata + body prose
  faq        [TODO] FAQ arrays

Flags:
  --dry-run        Log changes, write nothing
  --limit=N        Process at most N items
  --reset          Clear the manifest bucket for this command before running

Environment (read from .env.local):
  GEMINI_API_KEY        required
  GEMINI_TEXT_MODEL     default: gemini-2.5-pro
  IMAGEN_MODEL          default: imagen-4.0-generate-001
  REGEN_CONCURRENCY     default: 3 (max parallel API calls)
`);
}

main();

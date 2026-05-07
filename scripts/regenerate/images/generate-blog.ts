// Generates a brand-illustrated featured image for every blog post in data/posts.json.
// Output: public/blog/images/<slug>.jpg (matches imageUrl field in posts.json).

import { promises as fs } from 'fs';
import path from 'path';
import { generateImage } from '../lib/imagen.js';
import { buildImagePrompt } from '../lib/prompts.js';
import { limit } from '../lib/concurrency.js';
import { isCompleted, markCompleted, markFailed, resetBucket, getStats } from '../lib/manifest.js';
import { PROJECT_ROOT, POSTS_PATH, PUBLIC_DIR } from '../lib/paths.js';
import type { CliFlags } from '../lib/cli.js';

const BUCKET = 'blog-images';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category?: string;
  imageUrl?: string;
}

function deriveSubject(post: BlogPost): string {
  // Use the post title as the primary subject hint, lightly anonymized.
  // Strip "How to" / "Best" / dates for cleaner subject prompts.
  const cleaned = post.title
    .replace(/^How to /i, '')
    .replace(/\bBest\b/gi, '')
    .replace(/\b20\d\d\b/g, '')
    .replace(/-|-/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return `Abstract editorial illustration evoking "${cleaned}". Show streaming-related visual metaphors (TV / channel / sports / cinema / device silhouette) without showing any text or readable letters. Stylized, conceptual, never literal screenshots.`;
}

function resolveOutputPath(imageUrl: string): string {
  // imageUrl is like "/blog/images/foo.jpg" → public/blog/images/foo.jpg
  const cleaned = imageUrl.replace(/^\//, '');
  return path.join(PUBLIC_DIR, cleaned);
}

export async function runBlogImagesGenerate(flags: CliFlags) {
  const raw = await fs.readFile(POSTS_PATH, 'utf-8');
  const posts: BlogPost[] = JSON.parse(raw);

  if (flags.reset) {
    await resetBucket(BUCKET);
    console.log(`✓ Manifest bucket "${BUCKET}" reset`);
  }

  // Only process posts that have an imageUrl set
  const haveImageUrl = posts.filter((p) => p.imageUrl && p.imageUrl.startsWith('/blog/images/'));
  const stats = await getStats(BUCKET);
  const todo = haveImageUrl.filter((p) => !stats.completed.includes(p.id));
  const subset = flags.limit ? todo.slice(0, flags.limit) : todo;

  console.log(
    `Blog images: ${haveImageUrl.length} expected, ${stats.completed.length} already done, ${todo.length} todo, processing ${subset.length} this run.`
  );

  if (subset.length === 0) {
    console.log('Nothing to do.');
    return;
  }

  await Promise.all(
    subset.map((post) =>
      limit(async () => {
        try {
          const subject = deriveSubject(post);
          const prompt = buildImagePrompt(subject, '16:9');
          const outputPath = resolveOutputPath(post.imageUrl!);

          console.log(`  → ${post.slug} → ${path.relative(PROJECT_ROOT, outputPath)}`);

          if (flags.dryRun) {
            console.log(`    DRY-RUN prompt: ${subject.slice(0, 200)}...`);
          } else {
            await generateImage({ prompt, aspectRatio: '16:9', outputPath });
            await markCompleted(BUCKET, post.id);
          }
        } catch (e: any) {
          console.error(`  ✗ FAILED ${post.slug}: ${e.message}`);
          await markFailed(BUCKET, post.id);
        }
      })
    )
  );

  console.log(`\nBlog images done.`);
}

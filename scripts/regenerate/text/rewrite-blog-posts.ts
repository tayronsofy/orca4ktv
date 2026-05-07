// Rewrites every entry in data/posts.json: title, excerpt, content (HTML body).
// Preserves seoKeywords, category, slug, imageUrl, dates, author, etc.

import { promises as fs } from 'fs';
import { rewrite } from '../lib/gemini.js';
import { backupFile } from '../lib/backup.js';
import { limit } from '../lib/concurrency.js';
import { isCompleted, markCompleted, markFailed, resetBucket, getStats } from '../lib/manifest.js';
import { POSTS_PATH } from '../lib/paths.js';
import type { CliFlags } from '../lib/cli.js';

const BUCKET = 'blog-posts';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  contentFormat?: string;
  date: string;
  readTime?: string;
  author?: string;
  authorRole?: string;
  imageUrl?: string;
  category?: string;
  seoKeywords?: string;
  status?: string;
}

function parseKeywords(seoKeywords?: string): string[] {
  if (!seoKeywords) return [];
  return seoKeywords
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 8); // top 8 keywords; otherwise the prompt gets bloated
}

async function rewritePost(post: BlogPost): Promise<BlogPost> {
  const keywords = parseKeywords(post.seoKeywords);

  // Rewrite title (short, headline-style)
  const newTitle = await rewrite(post.title, {
    keywords,
    extraContext: `This is a blog post title. Keep it under 80 characters, headline-style, click-worthy but factual.`,
    temperature: 0.85,
  });

  // Rewrite excerpt (1-2 sentences)
  const newExcerpt = await rewrite(post.excerpt, {
    keywords,
    extraContext: `This is the excerpt/teaser for the blog post titled "${newTitle}". Keep it 1-2 sentences, ~150 chars.`,
    temperature: 0.85,
  });

  // Rewrite content (the long HTML body - the most duplicate-content-sensitive piece)
  const newContent = await rewrite(post.content, {
    keywords,
    extraContext: `This is the full HTML body of a blog post titled "${newTitle}". The output MUST remain valid HTML with the exact same tag structure (paragraphs, tables, headings, links, inline styles). Only rewrite the human-readable text inside tags. Preserve all <table>, <thead>, <tbody>, <tr>, <td>, <a href="...">, style="...", etc. exactly.`,
    temperature: 0.75,
  });

  return {
    ...post,
    title: newTitle,
    excerpt: newExcerpt,
    content: newContent,
  };
}

export async function runBlogPostsRewrite(flags: CliFlags) {
  const raw = await fs.readFile(POSTS_PATH, 'utf-8');
  const posts: BlogPost[] = JSON.parse(raw);

  if (flags.reset) {
    await resetBucket(BUCKET);
    console.log(`✓ Manifest bucket "${BUCKET}" reset`);
  }

  const stats = await getStats(BUCKET);
  const todo = posts.filter((p) => !stats.completed.includes(p.id));
  const subset = flags.limit ? todo.slice(0, flags.limit) : todo;

  console.log(
    `Blog posts: ${posts.length} total, ${stats.completed.length} already done, ${todo.length} todo, processing ${subset.length} this run.`
  );

  if (subset.length === 0) {
    console.log('Nothing to do.');
    return;
  }

  if (!flags.dryRun) {
    await backupFile(POSTS_PATH);
  }

  // Read current posts.json fresh each time we write so other parallel rewrites don't clobber
  const updates = new Map<number, BlogPost>();

  await Promise.all(
    subset.map((post) =>
      limit(async () => {
        const idx = posts.findIndex((p) => p.id === post.id);
        try {
          console.log(`  → rewriting [${idx + 1}/${posts.length}] ${post.slug}`);
          const newPost = await rewritePost(post);

          if (flags.dryRun) {
            console.log(`    DRY-RUN sample (title): ${newPost.title}`);
            console.log(`    DRY-RUN sample (excerpt): ${newPost.excerpt.slice(0, 120)}...`);
          } else {
            updates.set(post.id, newPost);
            // Persist after each completion so a crash mid-batch doesn't lose progress
            const cur: BlogPost[] = JSON.parse(await fs.readFile(POSTS_PATH, 'utf-8'));
            const idxCur = cur.findIndex((p) => p.id === post.id);
            if (idxCur >= 0) cur[idxCur] = newPost;
            await fs.writeFile(POSTS_PATH, JSON.stringify(cur, null, 2));
            await markCompleted(BUCKET, post.id);
          }
        } catch (e: any) {
          console.error(`  ✗ FAILED ${post.slug}: ${e.message}`);
          await markFailed(BUCKET, post.id);
        }
      })
    )
  );

  const finalStats = await getStats(BUCKET);
  console.log(
    `\nBlog posts done. Completed: ${finalStats.completed.length}/${posts.length}. Failed: ${finalStats.failed.length}.`
  );
}

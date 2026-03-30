import fs from 'fs';
import path from 'path';

const dirsToScan = ['.'];
const extsToScan = ['.tsx', '.ts', '.html', '.css', '.json', '.md'];
const ignoreDirs = ['node_modules', 'dist', '.git'];

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (ignoreDirs.includes(file)) continue;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else {
      const ext = path.extname(file);
      if (extsToScan.includes(ext) || file === '.env' || file === '.env.example') {
        processFile(fullPath);
      }
    }
  }
}

function processFile(filePath) {
  if (filePath === 'remove_iptv.mjs' || filePath === 'replace.mjs') return;

  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Replace base path in vite.config.ts
  if (filePath.endsWith('vite.config.ts')) {
    newContent = newContent.replace(/base:\s*['"]\/iptv\/['"]/, "base: '/'");
  }

  // Replace image, video, and API URLs globally
  // Note: we replace "/iptv/" with "/" when it's part of a URL path like "/iptv/images" -> "/images"
  newContent = newContent.replace(/\/iptv\/images\//g, '/images/');
  newContent = newContent.replace(/\/iptv\/assets\//g, '/assets/');
  newContent = newContent.replace(/\/iptv\/api\//g, '/api/');

  // Replace site URLs globally (e.g., in index.html, deployment docs)
  newContent = newContent.replace(/smart4k\.io\/iptv\//g, 'smart4k.io/');
  newContent = newContent.replace(/smart4k\.io\/iptv/g, 'smart4k.io');

  // Replace specific relative or path string like `/iptv/` when used in logic or canonicals
  newContent = newContent.replace(/href="https:\/\/smart4k\.io\/iptv\/"/, 'href="https://smart4k.io/"');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

dirsToScan.forEach(scanDir);
console.log('Done removing /iptv routing.');

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
  if (filePath === 'replace.mjs') return;

  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Replace tvsmarter.io domains first
  newContent = newContent.replace(/tvsmarter\.io/g, 'smart4k.io');
  newContent = newContent.replace(/TVSMARTER\.io/g, 'SMART4K.io');

  // Replace brand text
  newContent = newContent.replace(/TV SMARTER/g, 'SMART 4K');
  newContent = newContent.replace(/TVSMARTER/g, 'SMART4K');
  newContent = newContent.replace(/TV Smarter/g, 'SMART 4K');
  newContent = newContent.replace(/TVSmarter/g, 'SMART4K');
  newContent = newContent.replace(/tv smarter/g, 'smart 4k');
  newContent = newContent.replace(/tvsmarter/g, 'smart4k');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

dirsToScan.forEach(scanDir);
console.log('Done replacing terms.');

// Node.js script to ensure sequence frames are present in public/sequence/
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const targetDir = path.join(rootDir, 'public', 'sequence');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(rootDir);
let copied = 0;

for (const file of files) {
  if (file.startsWith('frame_') && (file.endsWith('.png') || file.endsWith('.webp'))) {
    const srcPath = path.join(rootDir, file);
    const destPath = path.join(targetDir, file);
    fs.copyFileSync(srcPath, destPath);
    copied++;
  }
}

console.log(`Successfully synced ${copied} frame files to public/sequence/`);

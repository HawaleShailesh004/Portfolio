const fs = require('fs');
const path = require('path');

const root = path.join(__dirname);
const dist = path.join(root, 'dist');
const src = path.join(root, 'src');
const publicDir = path.join(root, 'public');

// Clean and create dist
if (fs.existsSync(dist)) fs.rmSync(dist, { recursive: true });
fs.mkdirSync(dist, { recursive: true });

// Copy src files
['index.html', 'styles.css', 'index.js'].forEach((file) => {
  fs.copyFileSync(path.join(src, file), path.join(dist, file));
});

// Copy public folder to dist/public
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, path.join(dist, 'public'), { recursive: true });
}

// Fix asset paths in index.html: ../public/ -> public/
let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
html = html.replace(/\.\.\/public\//g, 'public/');
fs.writeFileSync(path.join(dist, 'index.html'), html);

console.log('Build done. Output in dist/');

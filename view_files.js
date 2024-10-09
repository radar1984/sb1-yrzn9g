const fs = require('fs');
const path = require('path');

function viewFile(filePath) {
  console.log(`\n--- Content of ${filePath} ---\n`);
  console.log(fs.readFileSync(filePath, 'utf8'));
}

const files = [
  'package.json',
  'src/main.js',
  'src/App.vue',
  'src/pages/index/index.vue',
  'server/server.js',
  'server/package.json'
];

files.forEach(file => viewFile(path.join(process.cwd(), file)));
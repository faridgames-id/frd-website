const fs = require('fs');
const path = 'c:\\WEB DAN APLIKASI\\WEBSITE JUBEL\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /<img src="\/logo\.png"/g,
  '<img src="/logo.jpg"'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Logo extension updated to jpg');

const fs = require('fs');
const path = 'c:\\WEB DAN APLIKASI\\WEBSITE JUBEL\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

const imgTag = '<img src="/logo.png" alt="Farid Shop Game" style={{ width: "30px", height: "30px", borderRadius: "8px", objectFit: "cover", flexShrink: 0, boxShadow: "0 0 16px rgba(79,142,247,0.4)" }} />';

content = content.replace(
  '<div className="nav-logo-mark">F</div>',
  imgTag
);
content = content.replace(
  '<div className="nav-logo-mark">F</div>',
  imgTag
);

fs.writeFileSync(path, content, 'utf8');
console.log('Logo replaced');

const fs = require('fs');
const path = 'c:\\WEB DAN APLIKASI\\WEBSITE JUBEL\\app\\globals.css';
let content = fs.readFileSync(path, 'utf8');

const cssToAppend = `
/* Hide Spline Viewer Watermark */
spline-viewer::part(logo) {
  display: none !important;
}
a[href*="spline.design"] {
  display: none !important;
}
`;

fs.writeFileSync(path, content + cssToAppend, 'utf8');
console.log('Spline logo hidden');

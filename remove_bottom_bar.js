const fs = require('fs');

// 1. Remove Mobile Bottom Action Bar from page.tsx
let page = fs.readFileSync('app/page.tsx', 'utf-8');
const bottomBarRegex = /\s*\{\/\* ── MOBILE BOTTOM ACTION BAR ── \*\/\}\s*<div className="fixed bottom-0 left-0 w-full z-\[100\].*?<\/div>/s;
page = page.replace(bottomBarRegex, '');
fs.writeFileSync('app/page.tsx', page);

// 2. Remove extra padding from globals.css
let css = fs.readFileSync('app/globals.css', 'utf-8');
css = css.replace(/padding: 24px 16px 80px !important;/g, 'padding: 24px 16px !important;');
css = css.replace(/padding-bottom: 80px !important;/g, '');
fs.writeFileSync('app/globals.css', css);

console.log("Floating Action Bar removed.");

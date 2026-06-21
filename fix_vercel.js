const fs = require('fs');

// Fix page.tsx
let page = fs.readFileSync('app/page.tsx', 'utf-8');
if(!page.includes('namespace JSX')) {
  page = `declare global {\n  namespace JSX {\n    interface IntrinsicElements {\n      'spline-viewer': any;\n    }\n  }\n}\n\n` + page;
}
page = page.replace(/initBorderGlow\(el\)/g, 'initBorderGlow(el as HTMLElement)');
page = page.replace(/initBorderGlow\(element\)/g, 'initBorderGlow(element as HTMLElement)');
fs.writeFileSync('app/page.tsx', page);

// Fix spotlight-card.tsx
let spotlight = fs.readFileSync('components/ui/spotlight-card.tsx', 'utf-8');
spotlight = spotlight.replace(/gsap\.QuickSetterFunc/g, 'Function');
fs.writeFileSync('components/ui/spotlight-card.tsx', spotlight);

// Clean up Vite leftovers and backups
if(fs.existsSync('app/page_backup.tsx')) fs.renameSync('app/page_backup.tsx', 'app/page_backup.txt');
if(fs.existsSync('farid-shop-landing.tsx')) fs.renameSync('farid-shop-landing.tsx', 'farid-shop-landing.txt');
if(fs.existsSync('src/components/ui/splite.tsx')) fs.unlinkSync('src/components/ui/splite.tsx');
if(fs.existsSync('src/main.tsx')) fs.renameSync('src/main.tsx', 'src/main.txt');
if(fs.existsSync('vite.config.ts')) fs.renameSync('vite.config.ts', 'vite.config.txt');

console.log("Fixes applied!");

const fs = require('fs');

// Add @ts-ignore to spline-viewer
let page = fs.readFileSync('app/page.tsx', 'utf-8');
page = page.replace(/<spline-viewer/g, '{/* @ts-ignore */}\n          <spline-viewer');
fs.writeFileSync('app/page.tsx', page);

// Delete src folder completely
fs.rmSync('src', { recursive: true, force: true });

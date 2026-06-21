const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

content = content.replace(/function initBorderGlow\(element\)/g, 'function initBorderGlow(element: HTMLElement)');
content = content.replace(/element\.addEventListener\('mousemove', \(e\)/g, "element.addEventListener('mousemove', (e: MouseEvent)");

fs.writeFileSync('app/page.tsx', content);

const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// Fix implicitly any time parameter
content = content.replace(/function raf\(time\)/g, 'function raf(time: number)');

// Remove force3D from snap config
content = content.replace(/ease: "power2\.out", force3D: true/g, 'ease: "power2.out"');

fs.writeFileSync('app/page.tsx', content);
console.log("Types fixed!");

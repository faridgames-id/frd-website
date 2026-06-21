const fs = require('fs');

let page = fs.readFileSync('app/page.tsx', 'utf-8');

// Remove the declare global block that was added to the top
const declareGlobalBlock = `declare global {\n  namespace JSX {\n    interface IntrinsicElements {\n      'spline-viewer': any;\n    }\n  }\n}\n\n`;
if(page.startsWith(declareGlobalBlock)) {
  page = page.substring(declareGlobalBlock.length);
}

fs.writeFileSync('app/page.tsx', page);

console.log("Fixed use client position");

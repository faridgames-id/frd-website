const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// Fix Hamburger
content = content.replace(/\s*\/\/\s*── Hamburger ──\s*\);\s*\}/g, "\n      // ── Hamburger removed ──");

// Fix line 289 which is probably also caused by the Hamburger replacement failure
// Wait, why would 289 have an error? Let's fix Hamburger first.
// The hamburger replace regex that caused the issue initially was:
// page.replace(/const hamburger = document\.getElementById\('hamburger'\);[\s\S]*?\}\);[\s\S]*?\}/, '');
// Wait, if that regex ran initially, it removed everything from `const hamburger...` to the first `}); }`.
// The remaining part is what was left at 198.
// Let's just fix the specific leftover text.

fs.writeFileSync('app/page.tsx', content);
console.log("Syntax fixed via Regex");

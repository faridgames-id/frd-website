const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf-8');

// Fix the RESTORED NAV STYLES to be responsive by removing !important from nav-links and wrapping them in media queries
// Let's just remove the !important from display: flex for nav-links in RESTORED NAV STYLES
css = css.replace(/\.nav-links \{\s*display: flex !important;/g, '.nav-links {\n  display: flex;');
css = css.replace(/\.nav-cta \{\s*display: flex !important;/g, '.nav-cta {\n  display: flex;');

// Also remove duplicate blocks at the top
const duplicateBlockRegex = /\/\* ── Global ambient ── \*\/[\s\S]*?\/\* ───────────── NAV ───────────── \*\/[\s\S]*?\.btn-ghost \{\s*padding: 7px 16px;\s*\}/;
css = css.replace(duplicateBlockRegex, '');

fs.writeFileSync('app/globals.css', css);

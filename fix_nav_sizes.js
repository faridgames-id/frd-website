const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf-8');

// Fix nav logo text wrapping
css = css.replace(/\.nav-logo span \{/g, '.nav-logo span {\n        white-space: nowrap;');

// Fix mobile menu sizes
css = css.replace(/\.mobile-menu a \{[\s\S]*?padding: 12px 14px;[\s\S]*?font-size: 15px;/g, '.mobile-menu a {\n      padding: 8px 12px;\n      font-size: 13px;');

// Also add a mobile specific media query for the nav-logo span to be a bit smaller
css = css.replace(/@media \(max-width: 860px\) \{/g, '@media (max-width: 860px) {\n  .nav-logo span { font-size: 13px !important; }\n  nav { height: 56px !important; top: 12px !important; }');

fs.writeFileSync('app/globals.css', css);
console.log("Nav sizes adjusted.");

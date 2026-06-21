const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf-8');

// Remove the line that hides the logo text
css = css.replace(/\.nav-logo span \{ display: none !important; \}/g, '');

fs.writeFileSync('app/globals.css', css);
console.log("Text restored.");

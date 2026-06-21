const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf-8');

// Find the line: nav { height: 56px !important; top: 12px !important; border-radius: 16px !important; }
// and replace it with: nav { height: 64px !important; top: 24px !important; border-radius: 100px !important; }

css = css.replace(/nav\s*\{\s*height:\s*56px\s*!important;\s*top:\s*12px\s*!important;\s*border-radius:\s*16px\s*!important;\s*\}/g, 
  'nav { height: 64px !important; top: 24px !important; border-radius: 100px !important; }');

// Just in case it was written slightly differently
css = css.replace(/nav\s*\{\s*height:\s*56px\s*!important;\s*top:\s*12px\s*!important;\s*\}/g,
  'nav { height: 64px !important; top: 24px !important; border-radius: 100px !important; }');

fs.writeFileSync('app/globals.css', css);
console.log("Nav styling updated.");

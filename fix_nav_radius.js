const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf-8');

// Update the mobile nav to have a square/cool curve instead of pill
if (css.includes('nav { height: 56px !important; top: 12px !important; }')) {
    css = css.replace('nav { height: 56px !important; top: 12px !important; }', 'nav { height: 56px !important; top: 12px !important; border-radius: 16px !important; }');
} else if (css.includes('nav { padding: 0 16px !important; }')) {
    css = css.replace('nav { padding: 0 16px !important; }', 'nav { padding: 0 16px !important; border-radius: 16px !important; }');
} else {
    // If we can't find the exact previous string, just append it
    css = css.replace(/@media \(max-width: 860px\) \{/, '@media (max-width: 860px) {\n  nav { border-radius: 16px !important; }');
}

fs.writeFileSync('app/globals.css', css);
console.log("Nav border radius updated.");

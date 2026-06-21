const fs = require('fs');

// 1. Fix globals.css footer flex-start override
let css = fs.readFileSync('app/globals.css', 'utf-8');
css = css.replace(/\.footer-inner\s*\{\s*flex-direction:\s*column;\s*align-items:\s*flex-start;\s*\}/g, '');
fs.writeFileSync('app/globals.css', css);

// 2. Fix page.tsx nav-logo in footer
let page = fs.readFileSync('app/page.tsx', 'utf-8');
page = page.replace(/<a className="nav-logo" href="#" style=\{\{'textDecoration': 'none'\}\}>/g, '<a className="nav-logo justify-center md:justify-start w-full md:w-auto" href="#" style={{textDecoration: "none"}}>');

fs.writeFileSync('app/page.tsx', page);

console.log("Footer alignment fixed.");

const fs=require('fs');
let c=fs.readFileSync('app/page.tsx','utf8');
const regex = /<div className="mobile-menu" id="mobileMenu">[\s\S]*?(<div className="mobile-menu" id="mobileMenu">)/;
c = c.replace(regex, '$1');
fs.writeFileSync('app/page.tsx', c);
console.log('Fixed syntax error!');

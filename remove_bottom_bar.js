const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// 1. Remove the mobile bottom action bar
const bottomBarRegex = /\s*\{\/\*\s*──\s*MOBILE BOTTOM ACTION BAR\s*──\s*\*\/\}\s*<div className="fixed bottom-0 left-0 w-full z-50 md:hidden[^>]+>\s*<a href="#services"[^>]+>Katalog<\/a>\s*<a href="https:\/\/wa\.me\/6287814897713"[^>]+>Chat WA Admin<\/a>\s*<\/div>/g;

content = content.replace(bottomBarRegex, "");

// 2. Adjust footer padding from pb-32 to pb-12
content = content.replace(/pb-32 md:pb-12/g, "pb-12");

fs.writeFileSync('app/page.tsx', content);
console.log("Removed bottom action bar and adjusted footer padding");

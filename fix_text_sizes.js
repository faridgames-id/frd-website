const fs = require('fs');

// 1. Update page.tsx text sizing
let page = fs.readFileSync('app/page.tsx', 'utf-8');

// Replace standard description text sizes
page = page.replace(/text-\[15px\] md:text-base/g, 'text-sm md:text-base');
page = page.replace(/text-base md:text-lg/g, 'text-sm md:text-base');

// Add text-sm md:text-base to hero-sub if not already there
page = page.replace(/className="hero-sub mt-4 max-w-\[500px\]"/g, 'className="hero-sub mt-4 max-w-[500px] text-sm md:text-base"');

fs.writeFileSync('app/page.tsx', page);

// 2. Remove hardcoded font-size in globals.css for .hero-sub
let css = fs.readFileSync('app/globals.css', 'utf-8');
css = css.replace(/font-size:\s*16px;?\s*/g, ''); 
// Just in case, replace specifically for hero-sub
css = css.replace(/\.hero-sub\s*\{[^}]*font-size:\s*\d+px;?/g, match => match.replace(/font-size:\s*\d+px;?/, ''));

fs.writeFileSync('app/globals.css', css);

console.log("Text sizing refined for mobile.");

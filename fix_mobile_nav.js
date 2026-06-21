const fs = require('fs');

// 1. Fix SpotlightCard bubble size
let spotlight = fs.readFileSync('components/ui/spotlight-card.tsx', 'utf-8');
spotlight = spotlight.replace(/const glassSize = 160;/g, 'const glassSize = typeof window !== "undefined" && window.innerWidth < 768 ? 90 : 160;');
fs.writeFileSync('components/ui/spotlight-card.tsx', spotlight);

// 2. Fix Navbar responsive issues by appending to the end of globals.css
let css = fs.readFileSync('app/globals.css', 'utf-8');
const responsiveCSS = `
/* --- MOBILE NAV FIXES --- */
@media (max-width: 860px) {
  .nav-links, .nav-cta { display: none !important; }
  .hamburger { display: flex !important; }
  .nav-logo span { display: none !important; }
  nav { padding: 0 16px !important; }
}
`;
fs.writeFileSync('app/globals.css', css + responsiveCSS);

console.log("Fixes applied.");

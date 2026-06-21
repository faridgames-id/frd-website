const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const brokenRegex = /\/\/ ── Hamburger ──\s*const hamburger = document\.getElementById\('hamburger'\);\s*const mobileMenu = document\.getElementById\('mobileMenu'\);\s*document\.querySelectorAll\('\.filter-btn'\)/s;

const fixedPart = `      // ── Hamburger ──
      const hamburger = document.getElementById('hamburger');
      const mobileMenu = document.getElementById('mobileMenu');
      if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
          mobileMenu.classList.toggle('open');
        });
        mobileMenu.querySelectorAll('a').forEach(a => {
          a.addEventListener('click', () => mobileMenu.classList.remove('open'));
        });
      }

      // ── Filter buttons ──
      document.querySelectorAll('.filter-btn')`;

if (brokenRegex.test(content)) {
    content = content.replace(brokenRegex, fixedPart);
    fs.writeFileSync('app/page.tsx', content);
    console.log("Hamburger restored!");
} else {
    console.log("Not found.");
}

const fs = require('fs');
const path = require('path');

const dir = 'c:\\WEB DAN APLIKASI\\WEBSITE JUBEL\\app';

// 1. Restore globals.css with snap classes appended
let oldCss = fs.readFileSync(path.join(dir, 'globals_backup.css'), 'utf8');
const snapCss = `
/* ── Scroll Snap Architecture ── */
.snap-container {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}
.slide-section {
  min-height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;
fs.writeFileSync(path.join(dir, 'globals.css'), oldCss + snapCss, 'utf8');

// 2. Restore page.tsx and inject snap wrappers
let pageTsx = fs.readFileSync(path.join(dir, 'page_backup.tsx'), 'utf8');

// Wrap everything from the first section to just before the footer
pageTsx = pageTsx.replace('<section className="hero">', '<main className="snap-container">\n<section className="hero slide-section flex-col">');

// Make other sections slide-sections
pageTsx = pageTsx.replace(/<section className="py-16 lg:py-24"/g, '<section className="slide-section py-16 lg:py-24 flex-col"');
pageTsx = pageTsx.replace('<section className="section" id="contact">', '<section className="slide-section section flex-col" id="contact">');

// Close the main tag before footer
pageTsx = pageTsx.replace('<footer>', '</main>\n<footer>');

fs.writeFileSync(path.join(dir, 'page.tsx'), pageTsx, 'utf8');
console.log('Restoration complete!');

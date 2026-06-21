const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

// The classes to remove. I will use regex to remove block by block.
const classesToRemove = [
  /\\.catalog-list \\{[\\s\\S]*?\\}/g,
  /\\.catalog-hero-grid \\{[\\s\\S]*?\\}/g,
  /\\.features-grid \\{[\\s\\S]*?\\}/g,
  /\\.services-grid \\{[\\s\\S]*?\\}/g,
  /\\.trust-grid \\{[\\s\\S]*?\\}/g,
  /\\.flow-grid \\{[\\s\\S]*?\\}/g,
  /\\.flow-left \\{[\\s\\S]*?\\}/g,
  /\\.flow-right \\{[\\s\\S]*?\\}/g,
  /\\.section-header \\{[\\s\\S]*?\\}/g,
  /\\.catalog-hero-card \\{[\\s\\S]*?\\}/g,
  /\\.catalog-list-card \\{[\\s\\S]*?\\}/g,
  /\\.feature-card \\{[\\s\\S]*?\\}/g,
  /\\.service-card \\{[\\s\\S]*?\\}/g,
  /\\.trust-card \\{[\\s\\S]*?\\}/g,
  /\\.flow-card \\{[\\s\\S]*?\\}/g,
  /\\.catalog-filter \\{[\\s\\S]*?\\}/g,
  /\\.filter-btn \\{[\\s\\S]*?\\}/g,
  /\\.filter-btn\\.active \\{[\\s\\S]*?\\}/g,
];

classesToRemove.forEach(regex => {
  css = css.replace(regex, '');
});

fs.writeFileSync('app/globals.css', css);

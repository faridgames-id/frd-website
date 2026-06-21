const fs = require('fs');

let css = fs.readFileSync('app/globals.css', 'utf8');

// 1. Typography Refactor
css = css.replace(/h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6,\s*\.section-title,\s*\.hero-card-name,\s*\.hero-card-title,\s*\.step-name\s*\{[\s\S]*?\}/, `h1, h2, h3, h4, h5, h6, .section-title, .hero-card-name, .hero-card-title, .step-name {
  font-family: var(--font-orbitron), 'Orbitron', sans-serif !important;
  font-weight: 800;
  letter-spacing: 1px;
}`);

css = css.replace(/body\s*\{[\s\S]*?font-family:\s*'Inter'[^}]*\}/, `body {
  font-family: var(--font-inter), 'Inter', system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  background: var(--bg);
  color: #E2E8F0;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  min-height: 100vh;
}`);

// 2. Color Palette (Black-Blue-White)
// Remove or change --gold and related colors to blue or white
css = css.replace(/--bg:\s*#060910;/g, '--bg: #0A0C14;');
css = css.replace(/--gold:\s*#F7C948;/g, '--gold: #1e3a8a;'); // just map gold to dark blue to be safe
css = css.replace(/--gold-glow:\s*rgba\(247,201,72,0\.25\);/g, '--gold-glow: rgba(30,58,138,0.25);');

// Replace .btn-primary gold with blue #1e3a8a
css = css.replace(/\.btn-primary\s*\{[\s\S]*?\}/, `.btn-primary {
  padding: 7px 16px;
  font-size: 13px; font-weight: 600; color: #ffffff;
  background: #1e3a8a;
  border: none; border-radius: 99px; cursor: pointer;
  text-decoration: none;
  transition: all 0.22s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 0 0 0 0 rgba(30,58,138,0.25);
  position: relative;
  overflow: hidden;
}`);
css = css.replace(/\.btn-primary:hover\s*\{[\s\S]*?\}/, `.btn-primary:hover {
  background: #1d4ed8; /* blue-700 */
  opacity: 1;
  box-shadow: 0 4px 20px rgba(30,58,138,0.4), 0 0 15px rgba(30,58,138,0.3);
  transform: translateY(-1px);
}`);

// Change all text-2 to text-slate-200 just in case
css = css.replace(/color:\s*var\(--text-2\)/g, 'color: #E2E8F0');

// General blue replacing gold for accents
css = css.replace(/rgba\(247,201,72,/g, 'rgba(30,58,138,');
css = css.replace(/#F7C948/g, '#1e3a8a');
css = css.replace(/#FBBF24/g, '#3b82f6'); // lighter blue for gradients

fs.writeFileSync('app/globals.css', css);
console.log('CSS updated successfully');

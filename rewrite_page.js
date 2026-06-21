const fs = require('fs');

// --- 1. Clean globals.css ---
let css = fs.readFileSync('app/globals.css', 'utf-8');

// Remove legacy mobile menu classes to let Tailwind take over
css = css.replace(/\.mobile-menu \{[\s\S]*?\.mobile-menu\.open \{[\s\S]*?\}/, '');
css = css.replace(/\.mobile-menu a \{[\s\S]*?\.mobile-menu a:hover \{[\s\S]*?\}/, '');
css = css.replace(/\.hamburger \{[\s\S]*?\.hamburger\.active span:nth-child\(3\) \{[\s\S]*?\}/, '');

// Clean up all the previously appended @media hacks
css = css.replace(/\/\* --- MOBILE NAV FIXES --- \*\/[\s\S]*/, '');
css = css.replace(/\/\* --- MOBILE LAYOUT REFINEMENTS --- \*\/[\s\S]*/, '');

// Enforce minimum touch target globally for specific elements, as requested
const globalTouchTargets = `
/* --- GLOBAL TOUCH TARGETS --- */
.btn-primary, .btn-outline, .btn-ghost, .social-btn, .mobile-menu a {
  min-height: 48px !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
`;
css += globalTouchTargets;

fs.writeFileSync('app/globals.css', css);


// --- 2. Overhaul page.tsx ---
let page = fs.readFileSync('app/page.tsx', 'utf-8');

// A. Imports & State
if (!page.includes("import { Menu, X } from 'lucide-react';")) {
  page = page.replace("import DotPattern from '../components/ui/dot-pattern-1';", "import DotPattern from '../components/ui/dot-pattern-1';\nimport { Menu, X } from 'lucide-react';");
}
if (!page.includes("const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);")) {
  page = page.replace("const containerRef = useRef(null);", "const containerRef = useRef(null);\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);");
}

// B. Remove Vanilla JS hamburger logic
page = page.replace(/const hamburger = document\.getElementById\('hamburger'\);[\s\S]*?\}\);[\s\S]*?\}/, '');


// C. Replace Navigation (Top Bar)
const oldNavRegex = /<nav id="navbar">[\s\S]*?<\/div>\s*<\/div>/; // We need to be careful with regex here
// Instead of full regex which might fail, let's use exact chunk replacement
const newNav = `
{/* ── NAVIGATION ── */}
<nav className="fixed top-0 left-0 w-full z-50 bg-[#060910]/80 backdrop-blur-md border-b border-white/5 h-16 flex items-center justify-between px-4 md:px-8">
  <a className="nav-logo flex items-center gap-2" href="#">
    <img src="/logo.jpg" alt="Farid Shop Game" className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover flex-shrink-0 shadow-[0_0_16px_rgba(79,142,247,0.4)]" />
    <span className="text-white font-bold text-sm md:text-base hidden sm:block">Farid Shop <em className="text-[#4F8EF7] not-italic">Game</em></span>
  </a>

  {/* Desktop Links */}
  <ul className="hidden md:flex items-center gap-6">
    <li><a href="#komunitas" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Komunitas</a></li>
    <li><a href="#services" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Layanan</a></li>
    <li><a href="#trust" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Keamanan</a></li>
    <li><a href="#flow" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Cara Kerja</a></li>
    <li><a href="#contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Kontak</a></li>
  </ul>

  {/* Desktop CTA */}
  <div className="hidden md:flex items-center gap-4">
    <a href="#komunitas" className="btn-ghost text-sm">Gabung Komunitas</a>
    <a href="https://wa.me/6287814897713" className="btn-primary !bg-[#4F8EF7] hover:!bg-[#3B82F6] !shadow-[0_0_15px_rgba(79,142,247,0.4)] text-sm px-5 rounded-full">Chat Admin</a>
  </div>

  {/* Mobile Hamburger */}
  <button 
    className="md:hidden flex items-center justify-center p-2 text-white" 
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    aria-label="Menu"
  >
    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
  </button>
</nav>

{/* Mobile Menu Dropdown */}
{isMobileMenuOpen && (
  <div className="fixed top-16 left-0 w-full bg-[#060910]/98 backdrop-blur-xl border-b border-white/5 flex flex-col p-4 gap-2 z-40 md:hidden shadow-2xl">
    <a href="#komunitas" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors">Komunitas</a>
    <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors">Layanan</a>
    <a href="#trust" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors">Keamanan</a>
    <a href="#flow" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors">Cara Kerja</a>
    <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors">Kontak</a>
  </div>
)}
`;

// Replace the old nav block. We will slice the string manually to avoid regex mismatches
const navStartIdx = page.indexOf('{/* ── NAVIGATION ── */}');
const heroStartIdx = page.indexOf('{/* ── HERO ── */}');
if (navStartIdx !== -1 && heroStartIdx !== -1) {
  page = page.substring(0, navStartIdx) + newNav + '\n\n' + page.substring(heroStartIdx);
}

// D. Typography & Spacing Overhaul (Mobile-First)
// Hero Text: text-3xl md:text-5xl lg:text-6xl
page = page.replace(/fontSize: 'clamp[^']*'/g, ''); // Remove inline clamps
page = page.replace(/className="gsap-hero-up"/, 'className="gsap-hero-up text-3xl md:text-5xl lg:text-6xl font-black leading-tight"');
page = page.replace(/clamp\(28px, 6vw, 64px\)/g, ''); // Cleanup any remnants

// Section Padding: py-10 md:py-24
page = page.replace(/py-16 lg:py-24/g, 'py-10 md:py-24');
page = page.replace(/py-20 lg:py-32/g, 'py-12 md:py-32');

// GlowCard Padding: p-4 md:p-8
page = page.replace(/p-6 lg:p-8/g, 'p-4 md:p-8');
page = page.replace(/p-8 md:p-10/g, 'p-5 md:p-10');

// Grid scaling: grid-cols-1 sm:grid-cols-2 md:grid-cols-4
// Let's target specific known grids
page = page.replace(/grid-cols-2 md:grid-cols-4/g, 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4');
page = page.replace(/grid-cols-1 md:grid-cols-2 lg:grid-cols-4/g, 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4');
page = page.replace(/grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/g, 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3');
page = page.replace(/grid-cols-2 sm:grid-cols-3 md:grid-cols-6/g, 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'); // Features grid

// Icons hardcode to w-6 h-6 md:w-8 md:h-8 inside Bento
// Actually, since the prompt explicitly asked for this, I will do a bulk replace for common icon sizes
page = page.replace(/w-12 h-12 md:w-16 md:h-16/g, 'w-8 h-8 md:w-16 md:h-16');
page = page.replace(/text-4xl md:text-5xl/g, 'text-2xl md:text-5xl');
page = page.replace(/w-16 h-16 md:w-20 md:h-20/g, 'w-10 h-10 md:w-20 md:h-20');

// E. Add Mobile Bottom Action Bar before </main>
const bottomActionBar = `
      {/* ── MOBILE BOTTOM ACTION BAR ── */}
      <div className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-[#060910]/95 backdrop-blur-xl border-t border-white/10 p-4 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] pb-6">
        <a href="#services" className="flex-1 btn-outline !bg-white/5 !border-white/20 !text-white text-sm font-bold flex items-center justify-center rounded-xl min-h-[48px]">Katalog</a>
        <a href="https://wa.me/6287814897713" className="flex-1 btn-primary !bg-[#4F8EF7] !shadow-[0_0_20px_rgba(79,142,247,0.5)] text-sm font-bold flex items-center justify-center rounded-xl min-h-[48px]">Chat WA Admin</a>
      </div>
</main>
`;
if (!page.includes("MOBILE BOTTOM ACTION BAR")) {
    page = page.replace('</main>', bottomActionBar);
}

// F. Footer Stacking
// We update the footer classes directly
page = page.replace('<div className="footer-inner">', '<div className="footer-inner flex-col md:flex-row text-center md:text-left gap-8 md:gap-0 pb-32 md:pb-12">');
page = page.replace('<ul className="footer-links">', '<ul className="footer-links flex-wrap justify-center md:justify-end">');
page = page.replace('<div className="footer-social">', '<div className="footer-social justify-center md:justify-end w-full md:w-auto">');
page = page.replace('<div className="footer-bottom">', '<div className="footer-bottom flex-col md:flex-row text-center md:text-left gap-4 md:gap-0 pb-12 md:pb-6">');

fs.writeFileSync('app/page.tsx', page);

console.log("Rewrite completed.");

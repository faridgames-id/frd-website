const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// 1. Remove backdrop blurs and saturates
content = content.replace(/\s*!?backdrop-blur-[\[a-zA-Z0-9\]-]+\s*/g, ' ');
content = content.replace(/\s*!?backdrop-saturate-[\[a-zA-Z0-9\]-]+\s*/g, ' ');

// 2. Opaque backgrounds
content = content.replace(/bg-\[#0d1326\]\/80/g, 'bg-[#0d1326]/95');
content = content.replace(/!bg-white\/\[0\.03\]/g, '!bg-black/85');

// 3. GSAP force3D and easing
content = content.replace(/useGSAP\(\(\) => \{/, 'useGSAP(() => {\n    gsap.config({ force3D: true });');

content = content.replace(/\{([^{}]*duration:[^{}]+)\}/g, (match, p1) => {
    if (p1.includes('force3D')) return match;
    return `{${p1}, force3D: true }`;
});

content = content.replace(/back\.out\([^)]*\)/g, 'power2.out');
content = content.replace(/back\.out/g, 'power2.out');
content = content.replace(/stagger:\s*0\.15/g, 'stagger: 0.1');
content = content.replace(/stagger:\s*0\.2/g, 'stagger: 0.1');
content = content.replace(/,\s*filter:\s*'blur\([^)]+\)'/g, '');
content = content.replace(/filter:\s*'blur\([^)]+\)'\s*,/g, '');

// 4. Background DOM Optimizations
// GSAP Grid
content = content.replace(/gsap-bg-parallax absolute -z-10 w-full/g, 'gsap-bg-parallax absolute -z-10 w-full pointer-events-none will-change-transform');
content = content.replace(/gsap-bg gsap-bg-parallax absolute -z-10 w-full/g, 'gsap-bg gsap-bg-parallax absolute -z-10 w-full pointer-events-none will-change-transform');

// Radial gradients
content = content.replace(/w-full h-full absolute inset-0 z-0 bg-\[radial-gradient/g, 'w-full h-full absolute inset-0 z-0 pointer-events-none will-change-transform bg-[radial-gradient');
// Particles
content = content.replace(/<Particles \/>/g, '<div className="absolute inset-0 z-0 pointer-events-none will-change-transform"><Particles /></div>');

fs.writeFileSync('app/page.tsx', content);
console.log('Optimization applied!');

const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Add imports
code = code.replace(`import React, { useEffect } from 'react';`, `import React, { useEffect, useRef } from 'react';\nimport gsap from 'gsap';\nimport { useGSAP } from '@gsap/react';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\ngsap.registerPlugin(ScrollTrigger);`);

// 2. Add useGSAP hook inside Home component
code = code.replace(`export default function Home() {`, `export default function Home() {\n  const containerRef = useRef<HTMLElement>(null);\n  useGSAP(() => {\n    // Cinematic Entrance Timeline\n    const tl = gsap.timeline();\n    tl.fromTo('.gsap-bg', { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' });\n    tl.fromTo('.gsap-hero-up', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }, '-=1.5');\n\n    // Parallax & Slide Effects\n    gsap.utils.toArray('.slide-section').forEach((slide) => {\n      gsap.to((slide as Element).querySelector('.gsap-bg-parallax'), {\n        yPercent: 30,\n        ease: 'none',\n        scrollTrigger: {\n          trigger: slide as Element,\n          start: 'top bottom',\n          end: 'bottom top',\n          scrub: true\n        }\n      });\n    });\n  }, { scope: containerRef });\n`);

// 3. Update main wrapper
code = code.replace(`<main className="snap-container">`, `<main className="snap-container relative w-full bg-black" ref={containerRef as React.RefObject<HTMLDivElement>}>`);

// 4. Update the HERO section (Slide 1)
code = code.replace(`<section className="hero slide-section flex-col">`, `<section className="hero slide-section flex-col min-h-[100dvh] w-full relative overflow-hidden flex justify-center items-center snap-center bg-gradient-to-b from-[#000000] to-[#1A1A1A]">
  <div className="gsap-bg gsap-bg-parallax absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(79,142,247,0.15) 0%, transparent 70%), url("data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M30 0l25.98 15v30L30 60 4.02 45V15z\\' fill-opacity=\\'0.05\\' fill=\\'%234F8EF7\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E")' }}></div>
  <div className="w-full h-full absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0A0C14]/80 to-[#0A0C14]"></div>`);

// Also add gsap-hero-up classes to hero elements
code = code.replace(`<div className="badge`, `<div className="badge gsap-hero-up`);
code = code.replace(`<h1 style=`, `<h1 className="gsap-hero-up" style=`);
code = code.replace(`<p className="hero-sub`, `<p className="hero-sub gsap-hero-up`);
code = code.replace(`<div className="hero-actions`, `<div className="hero-actions gsap-hero-up`);

// Replace remaining slide sections
// Slide 2: Trust
code = code.replace(`<section className="slide-section py-16 lg:py-24 flex-col" id="trust">`, `<section className="slide-section py-16 lg:py-24 flex-col min-h-[100dvh] w-full relative overflow-hidden flex justify-center items-center snap-center bg-gradient-to-b from-[#0B0C10] to-[#1F2833]" id="trust">
  <div className="gsap-bg-parallax absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\'100\\' height=\\'100\\' viewBox=\\'0 0 100 100\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M10 10h80v80H10z\\' fill=\\'none\\' stroke=\\'%23FFF\\' strokeWidth=\\'1\\'/%3E%3C/svg%3E")' }}></div>`);

// Slide 3: Services
code = code.replace(`<section className="slide-section py-16 lg:py-24 flex-col" id="services">`, `<section className="slide-section py-16 lg:py-24 flex-col min-h-[100dvh] w-full relative overflow-hidden flex justify-center items-center snap-center bg-gradient-to-b from-[#050505] to-[#000B18]" id="services">
  <div className="gsap-bg-parallax absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Ccircle cx=\\'2\\' cy=\\'2\\' r=\\'1\\' fill=\\'%23FFF\\'/%3E%3C/svg%3E")' }}></div>`);

// Slide 4: Flow
code = code.replace(`<section className="slide-section py-16 lg:py-24 flex-col" id="flow">`, `<section className="slide-section py-16 lg:py-24 flex-col min-h-[100dvh] w-full relative overflow-hidden flex justify-center items-center snap-center bg-gradient-to-b from-[#121212] to-[#1B1B1B]" id="flow">
  <div className="gsap-bg-parallax absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>`);

// Komunitas
code = code.replace(`<section className="slide-section py-16 lg:py-24 flex-col" id="komunitas">`, `<section className="slide-section py-16 lg:py-24 flex-col min-h-[100dvh] w-full relative overflow-hidden flex justify-center items-center snap-center bg-gradient-to-b from-[#121212] to-[#1B1B1B]" id="komunitas">
  <div className="gsap-bg-parallax absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>`);

// Contact
code = code.replace(`<section className="slide-section section flex-col" id="contact">`, `<section className="slide-section py-16 lg:py-24 flex-col min-h-[100dvh] w-full relative overflow-hidden flex justify-center items-center snap-center bg-gradient-to-t from-[#0A0C14] to-[#121212]" id="contact">`);

// Add mobile sticky bar at the end
const mobileBar = `
      {/* ── MOBILE STICKY ACTION BAR ── */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#0A0C14]/90 backdrop-blur-xl border-t border-blue-500/20 px-4 py-3 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <a href="#services" className="flex flex-col items-center justify-center text-slate-300 hover:text-blue-400 min-h-[48px] min-w-[48px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
          <span className="text-[10px] mt-1 font-medium font-space-grotesk">Katalog</span>
        </a>
        <a href="https://wa.me/6287814897713" className="flex items-center gap-2 bg-[#4F8EF7] hover:bg-[#3B82F6] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(79,142,247,0.4)] min-h-[48px] will-change-transform active:scale-95 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Chat Admin
        </a>
      </div>
    </main>
  );
}`;
code = code.replace(`</main>\n  );\n}`, mobileBar);

fs.writeFileSync('app/page.tsx', code);
console.log('Successfully updated page.tsx with GSAP, slides, and mobile bar.');

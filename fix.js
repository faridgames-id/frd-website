const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const brokenRegex = /\s*\/\/\s*PPTX Snap Style\s*ScrollTrigger\.create\(\{\s*trigger:\s*containerRef\.current,\s*start:\s*"top top",\s*hamburger\.addEventListener\('click',\s*\(\)\s*=>\s*\{/s;

const fixedPart = `
    // PPTX Snap Style
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: (progress) => {
          let panels = gsap.utils.toArray('.slide-section');
          let maxScroll = ScrollTrigger.maxScroll(window);
          if (maxScroll === 0) return progress;
          let offsets = panels.map(p => (p as HTMLElement).offsetTop / maxScroll);
          
          let closest = offsets.reduce((prev, curr) => {
            return (Math.abs(curr - progress) < Math.abs(prev - progress) ? curr : prev);
          });
          return closest;
        },
        duration: { min: 0.4, max: 0.8 },
        delay: 0.1,
        ease: "power2.out", force3D: true
      }
    });
  }, { scope: containerRef });

  useEffect(() => {
      // ── GSAP-like Smooth Scroll (Lenis) ──
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    
      // ── Nav scroll effect ──
      const navbar = document.getElementById('navbar');
      window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });

      // ── Hamburger ──
      const hamburger = document.getElementById('hamburger');
      const mobileMenu = document.getElementById('mobileMenu');
      if (hamburger) {
        hamburger.addEventListener('click', () => {`;

if (brokenRegex.test(content)) {
    content = content.replace(brokenRegex, fixedPart);
    fs.writeFileSync('app/page.tsx', content);
    console.log("Fixed!");
} else {
    console.log("Not found.");
}

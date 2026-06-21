const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// 1. Lenis Smooth Scroll Integration
const oldLenis = /const lenis = new Lenis\(\{\s*duration: 1\.2,\s*easing: \(t\) => Math\.min\(1, 1\.001 - Math\.pow\(2, -10 \* t\)\)\s*\}\);\s*function raf\(time: number\) \{\s*lenis\.raf\(time\);\s*requestAnimationFrame\(raf\);\s*\}\s*requestAnimationFrame\(raf\);/s;

const newLenis = `const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);`;

if(oldLenis.test(content)) {
    content = content.replace(oldLenis, newLenis);
    console.log("Lenis updated.");
} else {
    console.log("Lenis match failed.");
}

// 2. Parallax Background
const oldParallax = /const bg = \(slide as Element\)\.querySelector\('\.gsap-bg-parallax'\);\s*if \(bg\) \{\s*gsap\.to\(bg, \{\s*yPercent: 80,\s*ease: 'none',\s*scrollTrigger: \{\s*trigger: slide as Element,\s*start: 'top bottom',\s*end: 'bottom top',\s*scrub: 1\.5\s*\}\s*\}\);\s*\}/s;

const newParallax = `const bg = (slide as Element).querySelector('.gsap-bg-parallax');
      if (bg) {
        gsap.set(bg, { scale: 1.2, transformOrigin: "center center", force3D: true });
        gsap.fromTo(bg, 
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: slide as Element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }`;

if(oldParallax.test(content)) {
    content = content.replace(oldParallax, newParallax);
    console.log("Parallax updated.");
} else {
    console.log("Parallax match failed.");
}

// 3. PPTX-style animations
const oldPPTX = /gsap\.fromTo\(innerItems, \{\s*y: 40,\s*opacity: 0\s*\}, \{\s*y: 0,\s*opacity: 1,\s*stagger: 0\.1,\s*duration: 0\.6,\s*ease: "power3\.out",\s*scrollTrigger: \{\s*trigger: slide as Element,\s*start: "top 75%",\s*\}\s*\}\);/s;

const newPPTX = `gsap.fromTo(innerItems, {
            y: 40,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: slide as Element,
              start: "top 75%",
              toggleActions: "play reverse play reverse",
            }
          });`;

if(oldPPTX.test(content)) {
    content = content.replace(oldPPTX, newPPTX);
    console.log("PPTX updated.");
} else {
    console.log("PPTX match failed.");
}

// 4. BorderGlow 3D Effect
const oldBorderGlow = /function initBorderGlow\(element\) \{[\s\S]*?element\.addEventListener\('mouseleave', \(\) => \{\s*element\.style\.setProperty\('--edge-proximity', '0'\);\s*\}\);\s*\}/s;

const newBorderGlow = `function initBorderGlow(element) {
        if (!element) return;
    
        if (!element.querySelector('.glow-border')) {
          const glowBorder = document.createElement('div');
          glowBorder.className = 'glow-border';
          element.appendChild(glowBorder);
        }
        
        element.style.transformStyle = "preserve-3d";
        if (element.parentElement) {
          element.parentElement.style.perspective = "1000px";
        }
        
        const setEdge = gsap.quickSetter(element, "--edge-proximity");
        const setAngle = gsap.quickSetter(element, "--cursor-angle");
        const setRotateX = gsap.quickTo(element, "rotateX", { duration: 0.3, ease: "power2.out" });
        const setRotateY = gsap.quickTo(element, "rotateY", { duration: 0.3, ease: "power2.out" });
    
        element.addEventListener('mousemove', (e) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const dx = x - cx;
          const dy = y - cy;
          
          let kx = Infinity, ky = Infinity;
          if (dx !== 0) kx = cx / Math.abs(dx);
          if (dy !== 0) ky = cy / Math.abs(dy);
          const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
          
          let angle = 0;
          if (dx !== 0 || dy !== 0) {
            angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            if (angle < 0) angle += 360;
          }
          
          setEdge(\`\${(edge * 100).toFixed(1)}\`);
          setAngle(\`\${angle.toFixed(1)}deg\`);
          
          setRotateX((-(y - cy) / cy) * 8);
          setRotateY(((x - cx) / cx) * 8);
        });
    
        element.addEventListener('mouseleave', () => {
          setEdge('0');
          setRotateX(0);
          setRotateY(0);
        });
      }`;

if(oldBorderGlow.test(content)) {
    content = content.replace(oldBorderGlow, newBorderGlow);
    console.log("BorderGlow updated.");
} else {
    console.log("BorderGlow match failed.");
}

fs.writeFileSync('app/page.tsx', content);

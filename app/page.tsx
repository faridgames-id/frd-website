"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import Head from 'next/head';
import Script from 'next/script';
import DotPattern from '../components/ui/dot-pattern-1';
import { Menu, X } from 'lucide-react';
import { SpotlightCard } from '../components/ui/spotlight-card';
import { AdminContactDropdown } from '../components/ui/admin-contact-dropdown';
import Lenis from '@studio-freight/lenis';

const GlowCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative group isolate rounded-2xl w-full flex flex-col p-[1px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(79,142,247,0.3)] ${className || ''}`}>
    {/* Animated gradient border */}
    <div className="absolute inset-[-100%] -z-10 opacity-40 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg_at_50%_50%,#0A0C14_0%,#4F8EF7_20%,#ffffff_50%,#4F8EF7_80%,#0A0C14_100%)] animate-[spin_5s_linear_infinite] will-change-transform"></div>
    
    {/* Card inner background */}
    <div className="h-full w-full bg-gradient-to-br from-[#0d1326]/95 to-[#050811]/95 rounded-[15px] p-4 md:p-8 relative z-10 flex flex-col justify-between items-start border border-blue-500/20 group-hover:border-blue-400/50 transition-colors shadow-2xl">
      {/* Subtle top glare effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
      
      {/* Radial glow on hover */}
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[15px]"></div>
      
      <div className="relative z-20 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  </div>
);
const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let i = 0;
    
    timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(intervalId);
        }
      }, 30);
      
      return () => clearInterval(intervalId);
    }, delay);
    
    return () => clearTimeout(timeoutId);
  }, [text, delay]);

  return <span className={className}>{displayedText}<span className="animate-pulse opacity-50 inline-block ml-1">|</span></span>;
};

const Particles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(40)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-[#60a5fa] shadow-[0_0_12px_rgba(96,165,250,0.8)] blur-[0.5px]"
          style={{
            width: Math.random() * 3.5 + 1.5 + 'px',
            height: Math.random() * 3.5 + 1.5 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `float-particle ${Math.random() * 15 + 15}s linear infinite`,
            animationDelay: `-${Math.random() * 15}s`
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.config({ force3D: true });
    // Cinematic Entrance Timeline
    const tl = gsap.timeline();
    
    // 1. Background grid scales down smoothly with blur fade-in
    tl.fromTo('.gsap-bg', 
      { scale: 1.1, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' , force3D: true }
    );
    
    // 2. Badge pops in from above
    tl.fromTo('.badge.gsap-hero-up', 
      { y: -30, opacity: 0, scale: 0.8 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' , force3D: true }, 
      '-=0.8'
    );
    
    // 3. Staggered cinematic reveal for the main title lines
    tl.fromTo('h1.gsap-hero-up span', 
      { x: -40, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1.2, stagger: 0.3, ease: 'expo.out' , force3D: true }, 
      '-=0.6'
    );
    
    // 4. Action buttons slide in from bottom
    tl.fromTo('.hero-actions.gsap-hero-up', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' , force3D: true }, 
      '-=0.6'
    );

    // 5. Marquee wrapper fades in quickly
    tl.fromTo('.marquee-section',
      { opacity: 0 },
      { opacity: 1, duration: 0.4 , force3D: true },
      '-=0.4'
    );
    // 6. Marquee items pop in one by one (stagger)
    tl.fromTo('.marquee-item',
      { y: 40, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.05, ease: 'power2.out' , force3D: true },
      '-=0.2'
    );

    // Inner items stagger and Parallax
    gsap.utils.toArray('.slide-section').forEach((slide) => {
      // Background parallax
      const bg = (slide as Element).querySelector('.gsap-bg-parallax');
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
      }

      // Inner items stagger
      if (!(slide as Element).classList.contains('hero')) {
        // Query elements directly without escaping the slash since we are in a normal string here, wait, querySelector needs escaping for CSS
        const innerItems = (slide as Element).querySelectorAll('h2, h3, p, .feature-card, .service-card, .trust-card, .flow-step, .btn-primary, .btn-outline, .catalog-list-card, .group\\/trustbox, .group\\/badge, .stats-inner');
        if (innerItems.length > 0) {
          gsap.fromTo(innerItems, {
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
          });
        }
      }
    });

  }, { scope: containerRef });

  useEffect(() => {
      // ── GSAP-like Smooth Scroll (Lenis) ──
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    
      // ── Nav scroll effect ──
      const navbar = document.getElementById('navbar');
      window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });

            // ── Hamburger ──
      );
      }

      // ── Filter buttons ──
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    
      
    
      // ── Smooth active nav ──
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-links a');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            navLinks.forEach(a => {
              a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
            });
          }
        });
      }, { threshold: 0.3 });
      sections.forEach(s => io.observe(s));
    
      // ── BorderGlow Effect ──
      function initBorderGlow(element: HTMLElement) {
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
    
        element.addEventListener('mousemove', (e: MouseEvent) => {
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
          
          setEdge(`${(edge * 100).toFixed(1)}`);
          setAngle(`${angle.toFixed(1)}deg`);
          
          setRotateX((-(y - cy) / cy) * 8);
          setRotateY(((x - cx) / cx) * 8);
        });
    
        element.addEventListener('mouseleave', () => {
          setEdge('0');
          setRotateX(0);
          setRotateY(0);
        });
      }
    
      // Apply glow effect to specific cards
      const glowElements = document.querySelectorAll(
        '.hero-card, .feature-card, .service-card, .catalog-hero-card, .trust-card, .flow-card, .hero-badge-tag, .hero-budget, .stats-inner'
      );
      glowElements.forEach(el => {
        el.classList.add('glow-card');
        initBorderGlow(el as HTMLElement);
      });
    
        }, []);

  return (
    <>
      
      

{/* Ambient background */}
<div className="ambient" aria-hidden="true"></div>

{/* Robot moved to hero section */}


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


{/* ── HERO ── */}
<main className="snap-container relative z-0 w-full bg-[#000000]" ref={containerRef as React.RefObject<HTMLDivElement>}>
<section className="hero slide-section flex-col min-h-[100dvh] w-full relative overflow-hidden flex justify-center items-center snap-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0022ff]/50 via-[#000a55]/25 to-transparent">
  
  <div className="absolute inset-0 z-0 pointer-events-none will-change-transform"><Particles /></div>
  <div className="gsap-bg gsap-bg-parallax absolute -z-10 w-full pointer-events-none will-change-transform pointer-events-none will-change-transform h-[200%] -top-[50%] left-0 pointer-events-none bg-[linear-gradient(to_right,#4f8ef710_1px,transparent_1px),linear-gradient(to_bottom,#4f8ef710_1px,transparent_1px)] bg-[size:48px_48px]"></div>
  <div className="w-full h-full absolute inset-0 z-0 pointer-events-none will-change-transform bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent"></div>
  <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full z-20 relative">
    <div className="hero-content -mt-20">
      <div className="badge gsap-hero-up !bg-black/85 %] !border-white/10 !text-white !shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_20px_rgba(0,0,0,0.2)]">
        <span className="badge-dot !bg-white shadow-none"></span>
        Terpercaya &amp; Bergaransi
      </div>
  
      <h1 className="gsap-hero-up text-3xl md:text-5xl lg:text-6xl font-black leading-tight" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontWeight: 800, letterSpacing: '2px', lineHeight: '1.1', , textTransform: 'uppercase', textAlign: 'left' }}>
        <span className="text-[#4F8EF7] inline-block">FARID SHOP GAME</span><br/>
        <span className="text-white inline-block mt-1">COMMUNITY STORE</span>
      </h1>
  
      <p className="hero-sub mt-4 max-w-[500px] text-sm md:text-base">
        <TypewriterText text="Pusat jual beli akun game terpercaya. Free Fire, Mobile Legends, dan lainnya - spek sultan, harga jujur, garansi anti hackback." delay={1200} />
      </p>
  
      <div className="hero-actions gsap-hero-up">
        <AdminContactDropdown buttonText="Hubungi Admin via WA" />
        <a href="#komunitas" className="btn-outline !bg-black/85 %] !border !border-white/10 !text-white hover:!bg-white/10 hover:!scale-105 hover:-translate-y-1 active:!scale-95 !shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(0,0,0,0.3)] hover:!shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-300">Gabung Komunitas</a>
      </div>
    </div>
  </div>
{/* End of Hero Content */}
{/* -- STATS BAR -- */}
<div className="hidden stats-bar lg:absolute lg:top-[55%] lg:left-[2%] xl:left-[5%] lg:-translate-y-1/2 z-30 lg:w-[500px]">
  <div className="w-full px-4 mt-6 lg:mt-0">
    <GlowCard className="w-full !p-[1px]">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 text-center bg-[#0d1326]/95 rounded-[14px]">
        <div className="flex flex-col items-center justify-center p-2 py-4 border-b border-r border-slate-800/50 md:border-b-0">
          <div className="font-orbitron text-xl font-bold text-white mb-1">500<span className="text-[#0EA5E9]">+</span></div>
          <div className="text-[10px] text-slate-200 font-inter tracking-wide font-medium whitespace-nowrap">Transaksi Sukses</div>
        </div>
        <div className="flex flex-col items-center justify-center p-2 py-4 border-b border-slate-800/50 md:border-b-0 md:border-r">
          <div className="font-orbitron text-xl font-bold text-white mb-1">50<span className="text-[#0EA5E9]">+</span></div>
          <div className="text-[10px] text-slate-200 font-inter tracking-wide font-medium whitespace-nowrap">Akun Stok Ready</div>
        </div>
        <div className="flex flex-col items-center justify-center p-2 py-4 border-r border-slate-800/50 md:border-b-0">
          <div className="font-orbitron text-xl font-bold text-white mb-1">100<span className="text-[#0EA5E9]">%</span></div>
          <div className="text-[10px] text-slate-200 font-inter tracking-wide font-medium whitespace-nowrap">Anti Hackback</div>
        </div>
        <div className="flex flex-col items-center justify-center p-2 py-4 md:border-b-0">
          <div className="font-orbitron text-xl font-bold text-white mb-1">24<span className="text-[#0EA5E9]">/7</span></div>
          <div className="text-[10px] text-slate-200 font-inter tracking-wide font-medium whitespace-nowrap">Admin Aktif</div>
        </div>
      </div>
    </GlowCard>
  </div>
</div>

{/* -- MARQUEE -- */}
<div className="marquee-section" aria-hidden="true">
  <div className="marquee-track" id="marqueeTrack">
    {/* Set 1 */}
    <div className="marquee-item"><div className="marquee-icon icon-ff">FF</div><span className="marquee-label">Free Fire</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-ml">ML</div><span className="marquee-label">Mobile Legends</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-pubg">PUBG</div><span className="marquee-label">PUBG Mobile</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-val">VAL</div><span className="marquee-label">Valorant</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-gi">GI</div><span className="marquee-label">Genshin Impact</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#22c55e,#16a34a)'}}>✓</div><span className="marquee-label">Amanah 100%</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#3b82f6,#6366F1)'}}>🛡</div><span className="marquee-label">Anti Hackback</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#1e3a8a,#1e3a8a)'}}>🤝</div><span className="marquee-label">Rekber Ready</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#ffffff,#1e3a8a)', 'color': '#0a0e1a'}}>⚡</div><span className="marquee-label">Respon Cepat</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#0EA5E9,#0284C7)'}}>💰</div><span className="marquee-label">Harga Jujur</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#8B5CF6,#6D28D9)'}}>⭐</div><span className="marquee-label">Joki Rank</span></div>
    {/* Set 2 */}
    <div className="marquee-item"><div className="marquee-icon icon-ff">FF</div><span className="marquee-label">Free Fire</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-ml">ML</div><span className="marquee-label">Mobile Legends</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-pubg">PUBG</div><span className="marquee-label">PUBG Mobile</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-val">VAL</div><span className="marquee-label">Valorant</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-gi">GI</div><span className="marquee-label">Genshin Impact</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#22c55e,#16a34a)'}}>✓</div><span className="marquee-label">Amanah 100%</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#3b82f6,#6366F1)'}}>🛡</div><span className="marquee-label">Anti Hackback</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#1e3a8a,#1e3a8a)'}}>🤝</div><span className="marquee-label">Rekber Ready</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#ffffff,#1e3a8a)', 'color': '#0a0e1a'}}>⚡</div><span className="marquee-label">Respon Cepat</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#0EA5E9,#0284C7)'}}>💰</div><span className="marquee-label">Harga Jujur</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#8B5CF6,#6D28D9)'}}>⭐</div><span className="marquee-label">Joki Rank</span></div>
    {/* Set 3 */}
    <div className="marquee-item"><div className="marquee-icon icon-ff">FF</div><span className="marquee-label">Free Fire</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-ml">ML</div><span className="marquee-label">Mobile Legends</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-pubg">PUBG</div><span className="marquee-label">PUBG Mobile</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-val">VAL</div><span className="marquee-label">Valorant</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-gi">GI</div><span className="marquee-label">Genshin Impact</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#22c55e,#16a34a)'}}>✓</div><span className="marquee-label">Amanah 100%</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#3b82f6,#6366F1)'}}>🛡</div><span className="marquee-label">Anti Hackback</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#1e3a8a,#1e3a8a)'}}>🤝</div><span className="marquee-label">Rekber Ready</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#ffffff,#1e3a8a)', 'color': '#0a0e1a'}}>⚡</div><span className="marquee-label">Respon Cepat</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#0EA5E9,#0284C7)'}}>💰</div><span className="marquee-label">Harga Jujur</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#8B5CF6,#6D28D9)'}}>⭐</div><span className="marquee-label">Joki Rank</span></div>
    {/* Set 4 */}
    <div className="marquee-item"><div className="marquee-icon icon-ff">FF</div><span className="marquee-label">Free Fire</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-ml">ML</div><span className="marquee-label">Mobile Legends</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-pubg">PUBG</div><span className="marquee-label">PUBG Mobile</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-val">VAL</div><span className="marquee-label">Valorant</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-gi">GI</div><span className="marquee-label">Genshin Impact</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#22c55e,#16a34a)'}}>✓</div><span className="marquee-label">Amanah 100%</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#3b82f6,#6366F1)'}}>🛡</div><span className="marquee-label">Anti Hackback</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#1e3a8a,#1e3a8a)'}}>🤝</div><span className="marquee-label">Rekber Ready</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#ffffff,#1e3a8a)', 'color': '#0a0e1a'}}>⚡</div><span className="marquee-label">Respon Cepat</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#0EA5E9,#0284C7)'}}>💰</div><span className="marquee-label">Harga Jujur</span></div>
    <div className="marquee-item"><div className="marquee-icon" style={{'background': 'linear-gradient(135deg,#8B5CF6,#6D28D9)'}}>⭐</div><span className="marquee-label">Joki Rank</span></div>
  </div>
</div>

  {/* Shadow overlay to fade out robot legs */}
  <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
</section>

<hr className="divider" />

{/* ── CATALOG ── */}

<section className="slide-section py-10 md:py-24 flex-col min-h-[100dvh] w-full relative overflow-hidden flex justify-center items-center snap-center bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#0018cc]/50 via-[#000744]/25 to-transparent" id="komunitas">
  <div className="absolute inset-0 z-0 pointer-events-none will-change-transform"><Particles /></div>
  <div className="gsap-bg-parallax absolute -z-10 w-full pointer-events-none will-change-transform h-[200%] -top-[50%] left-0 pointer-events-none bg-[linear-gradient(to_right,#4f8ef70f_1px,transparent_1px),linear-gradient(to_bottom,#4f8ef70f_1px,transparent_1px)] bg-[size:48px_48px]"></div>
  <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full z-20 relative">
    <div className="mb-12">
      <div className="eyebrow text-center mb-3 text-[13px] md:text-[14px] tracking-[0.2em]">Komunitas Jual Beli Akun</div>
      <h2 className="text-center font-orbitron uppercase text-[32px] md:text-[40px] lg:text-[46px] font-black text-white mb-6 leading-tight">Bergabung dengan<br/>Komunitas Kami</h2>
      <p className="font-inter text-sm md:text-base text-slate-300 leading-relaxed text-center mx-auto max-w-2xl">Temukan berbagai grup, saluran, dan sosial media resmi Farid Shop Game untuk update stock, transaksi aman, dan info terbaru.</p>
    </div>

    {/* GRUP JUAL BELI */}
    <div className="mb-14">
      <h3 className="font-orbitron text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-2xl md:text-3xl drop-shadow-md">👥</span>
        <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">Grup Jual Beli</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 w-full">
        {[
          { name: "Grup 1", url: "https://chat.whatsapp.com/Ih0JMO3tHUiLXADlfWebUY?mode=gi_t" },
          { name: "Grup 2", url: "https://chat.whatsapp.com/FcUdaACZ9c6BGCyPq3bm0e?mode=gi_t" },
          { name: "Grup 3", url: "https://chat.whatsapp.com/LIGZeUUAiUQDL9IsV7dNjL?mode=gi_t" },
          { name: "Grup 4", url: "https://chat.whatsapp.com/D1tOLIFEq5jClNemVFcIAZ?mode=gi_t" },
          { name: "Grup 5", url: "https://chat.whatsapp.com/LQWspTwEgI76HxBpcJftcZ?mode=gi_t" },
          { name: "Grup 6", url: "https://chat.whatsapp.com/Io5k4E6HAXGL7BQZkKofyy?mode=gi_t" },
          { name: "GB Umum", url: "https://chat.whatsapp.com/KBuqEc0jqkiKwTIJ2Vmcxa?mode=gi_t" }
        ].map((item, idx) => (
          <a key={'grup-'+idx} href={item.url} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-between p-4 md:p-5 bg-[#0d1320] ring-1 ring-white/10 rounded-[20px] transition-all duration-300 hover:-translate-y-1 overflow-hidden hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5),0_0_15px_rgba(59,130,246,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-b from-blue-500 to-blue-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_0_10px_rgba(59,130,246,0.2)] ring-1 ring-white/10 rounded-xl flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_5px_15px_rgba(59,130,246,0.4)] transition-all duration-300 flex-shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="drop-shadow-md relative z-10">💬</span>
              </div>
              <span className="font-orbitron font-bold text-sm md:text-base text-slate-200 group-hover:text-white transition-colors tracking-wide">{item.name}</span>
            </div>
            
            <div className="relative z-10 bg-transparent text-blue-400 text-[10px] md:text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full ring-1 ring-blue-500/50 group-hover:ring-white/20 group-hover:bg-gradient-to-b group-hover:from-blue-500 group-hover:to-blue-700 group-hover:text-white transition-all duration-300 flex items-center gap-1 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_4px_10px_rgba(59,130,246,0.4)] whitespace-nowrap ml-2">
              GABUNG <svg className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </a>
        ))}
      </div>
    </div>

    {/* SALURAN JUAL BELI */}
    <div className="mb-14">
      <h3 className="font-orbitron text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-2xl md:text-3xl drop-shadow-md">📢</span>
        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(96,165,250,0.5)]">Saluran Jual Beli</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-5 w-full">
        {[
          { name: "Saluran Jubel Utama", url: "https://whatsapp.com/channel/0029Vaqx2ZwGpLHI6ojo9m1g" },
          { name: "Saluran Khusus Stok", url: "https://whatsapp.com/channel/0029VbAsdPwG8l59cKXjOm2n" },
          { name: "Saluran Testimonial", url: "https://whatsapp.com/channel/0029VbCHXTbBKfi3J8REei2o" },
          { name: "Saluran Jual Akun", url: "https://whatsapp.com/channel/0029Vb72jnl4yltI81JEng2Q" }
        ].map((item, idx) => (
          <a key={'saluran-'+idx} href={item.url} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-between p-4 md:p-5 bg-[#0d1320] ring-1 ring-white/10 rounded-[20px] transition-all duration-300 hover:-translate-y-1 overflow-hidden hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5),0_0_15px_rgba(59,130,246,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-b from-blue-500 to-blue-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_0_10px_rgba(59,130,246,0.2)] ring-1 ring-white/10 rounded-xl flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_5px_15px_rgba(59,130,246,0.4)] transition-all duration-300 flex-shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="drop-shadow-md relative z-10">📣</span>
              </div>
              <span className="font-orbitron font-bold text-sm md:text-base text-slate-200 group-hover:text-white transition-colors tracking-wide">{item.name}</span>
            </div>
            
            <div className="relative z-10 bg-transparent text-blue-400 text-[10px] md:text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full ring-1 ring-blue-500/50 group-hover:ring-white/20 group-hover:bg-gradient-to-b group-hover:from-blue-500 group-hover:to-blue-700 group-hover:text-white transition-all duration-300 flex items-center gap-1 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_4px_10px_rgba(59,130,246,0.4)] whitespace-nowrap ml-2">
              GABUNG <svg className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </a>
        ))}
      </div>
    </div>

    {/* SOSIAL MEDIA */}
    <div>
      <h3 className="font-orbitron text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-2xl md:text-3xl drop-shadow-md">📱</span>
        <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(192,132,252,0.5)]">Sosial Media</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-5 w-full">
        <a href="https://www.tiktok.com/@faridsturr" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-between p-4 md:p-5 bg-[#0d1320] ring-1 ring-white/10 rounded-[20px] transition-all duration-300 hover:-translate-y-1 overflow-hidden hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5),0_0_15px_rgba(168,85,247,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-b from-purple-500 to-purple-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_0_10px_rgba(168,85,247,0.2)] ring-1 ring-white/10 rounded-xl flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_5px_15px_rgba(168,85,247,0.4)] transition-all duration-300 flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="drop-shadow-md relative z-10">🎵</span>
            </div>
            <span className="font-orbitron font-bold text-sm md:text-base text-slate-200 group-hover:text-white transition-colors tracking-wide">TikTok</span>
          </div>
          
          <div className="relative z-10 bg-transparent text-purple-400 text-[10px] md:text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full ring-1 ring-purple-500/50 group-hover:ring-white/20 group-hover:bg-gradient-to-b group-hover:from-purple-500 group-hover:to-purple-700 group-hover:text-white transition-all duration-300 flex items-center gap-1 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_4px_10px_rgba(168,85,247,0.4)] whitespace-nowrap ml-2">
            FOLLOW <svg className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </div>
        </a>
        
        <a href="https://www.instagram.com/faridwithai?igsh=YzNwYjhkeWRnYnJ1&utm_source=qr" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-between p-4 md:p-5 bg-[#0d1320] ring-1 ring-white/10 rounded-[20px] transition-all duration-300 hover:-translate-y-1 overflow-hidden hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5),0_0_15px_rgba(236,72,153,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-pink-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-b from-pink-500 to-pink-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_0_10px_rgba(236,72,153,0.2)] ring-1 ring-white/10 rounded-xl flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_5px_15px_rgba(236,72,153,0.4)] transition-all duration-300 flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="drop-shadow-md relative z-10">📸</span>
            </div>
            <span className="font-orbitron font-bold text-sm md:text-base text-slate-200 group-hover:text-white transition-colors tracking-wide">Instagram</span>
          </div>
          
          <div className="relative z-10 bg-transparent text-pink-400 text-[10px] md:text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full ring-1 ring-pink-500/50 group-hover:ring-white/20 group-hover:bg-gradient-to-b group-hover:from-pink-500 group-hover:to-pink-700 group-hover:text-white transition-all duration-300 flex items-center gap-1 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_4px_10px_rgba(236,72,153,0.4)] whitespace-nowrap ml-2">
            FOLLOW <svg className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </div>
        </a>
      </div>
    </div>

  </div>
</section>


<hr className="divider" />


{/* ── SERVICES ── */}
<section className="slide-section py-10 md:py-24 flex-col min-h-[100dvh] w-full relative overflow-hidden flex justify-center items-center snap-center bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-[#002bff]/50 via-[#000d77]/25 to-transparent" id="services">
  <div className="absolute inset-0 z-0 pointer-events-none will-change-transform"><Particles /></div>
  <div className="gsap-bg-parallax absolute -z-10 w-full pointer-events-none will-change-transform h-[200%] -top-[50%] left-0 pointer-events-none bg-[linear-gradient(to_right,#4f8ef70e_1px,transparent_1px),linear-gradient(to_bottom,#4f8ef70e_1px,transparent_1px)] bg-[size:48px_48px]"></div>
  <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full z-20 relative">
    <div className="mb-10">
      <div className="eyebrow text-center mb-3 text-[13px] md:text-[14px] tracking-[0.2em]">Layanan Kami</div>
      <h2 className="text-center font-orbitron uppercase text-[32px] md:text-[40px] lg:text-[46px] font-black text-white mb-10 leading-tight">Lebih Dari Sekedar<br/>Jual Beli Akun</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* 1. Jual Akun Game */}
      <div className="group animate-floating relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0d1326]/90 to-[#050811]/90 border border-slate-800/80 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="absolute -right-6 -bottom-6 text-8xl opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">🛒</div>
        
        <div className="relative p-4 md:p-8 z-10 flex flex-col h-full">
          <div className="w-14 h-14 bg-gradient-to-b from-blue-500 to-blue-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_0_15px_rgba(59,130,246,0.3)] ring-1 ring-white/10 rounded-[18px] flex items-center justify-center text-2xl mb-6 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_5px_20px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="drop-shadow-md relative z-10">🛒</span>
          </div>
          <h3 className="font-orbitron text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Jual Akun Game</h3>
          <p className="font-inter text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors flex-grow">
            Pusat akun game sultan dan berkualitas dengan harga yang kompetitif. Tersedia berbagai pilihan game populer dari Free Fire hingga Mobile Legends.
          </p>
          <div className="mt-6 flex items-center text-blue-400 text-sm font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-75 cursor-pointer">
            Lihat Katalog <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </div>
        </div>
      </div>

      {/* 2. Menampung Akun Game */}
      <div className="group animate-floating relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0d1326]/90 to-[#050811]/90 border border-slate-800/80 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.3)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="absolute -right-6 -bottom-6 text-8xl opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">💰</div>
        
        <div className="relative p-4 md:p-8 z-10 flex flex-col h-full">
          <div className="w-14 h-14 bg-gradient-to-b from-amber-500 to-amber-600 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_0_15px_rgba(245,158,11,0.3)] ring-1 ring-white/10 rounded-[18px] flex items-center justify-center text-2xl mb-6 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_5px_20px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="drop-shadow-md relative z-10">💰</span>
          </div>
          <h3 className="font-orbitron text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">Tampung Akun Game</h3>
          <p className="font-inter text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors flex-grow">
            Kami siap menampung atau membeli akun game Anda dengan penawaran harga terbaik. Proses verifikasi kilat dan pencairan dana langsung cair.
          </p>
          <div className="mt-6 flex items-center text-amber-400 text-sm font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-75 cursor-pointer">
            Jual Akunmu <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </div>
        </div>
      </div>

      {/* 3. Jasa Pengamanan Akun / Rebind */}
      <div className="group animate-floating relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0d1326]/90 to-[#050811]/90 border border-slate-800/80 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="absolute -right-6 -bottom-6 text-8xl opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">🛡️</div>
        
        <div className="relative p-4 md:p-8 z-10 flex flex-col h-full">
          <div className="w-14 h-14 bg-gradient-to-b from-emerald-500 to-emerald-600 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_0_15px_rgba(16,185,129,0.3)] ring-1 ring-white/10 rounded-[18px] flex items-center justify-center text-2xl mb-6 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_5px_20px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="drop-shadow-md relative z-10">🛡️</span>
          </div>
          <h3 className="font-orbitron text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">Jasa Pengamanan</h3>
          <p className="font-inter text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors flex-grow">
            Mengamankan akun Anda dari risiko hackback. Melayani jasa pergantian data (rebind) akun secara profesional, transparan, dan terjamin aman 100%.
          </p>
          <div className="mt-6 flex items-center text-emerald-400 text-sm font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-75 cursor-pointer">
            Amankan Akun <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </div>
        </div>
      </div>

      {/* 4. Program Reseller */}
      <div className="group animate-floating relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0d1326]/90 to-[#050811]/90 border border-slate-800/80 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.3)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="absolute -right-6 -bottom-6 text-8xl opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">🤝</div>
        
        <div className="relative p-4 md:p-8 z-10 flex flex-col h-full">
          <div className="w-14 h-14 bg-gradient-to-b from-purple-500 to-purple-600 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-white/10 rounded-[18px] flex items-center justify-center text-2xl mb-6 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_5px_20px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="drop-shadow-md relative z-10">🤝</span>
          </div>
          <h3 className="font-orbitron text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">Program Reseller</h3>
          <p className="font-inter text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors flex-grow">
            Dapatkan harga khusus! Bergabunglah menjadi mitra resmi Farid Shop Game dan raih penghasilan tambahan tanpa ribet. Modalnya cuma niat.
          </p>
          <div className="mt-6 flex items-center text-purple-400 text-sm font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-75 cursor-pointer">
            Daftar Reseller <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<hr className="divider" />

{/* ── TRANSACTION FLOW ── */}
<section className="slide-section py-10 md:py-24 flex-col min-h-[100dvh] w-full relative overflow-hidden flex justify-center items-center snap-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0022ff]/50 via-[#000a55]/25 to-transparent" id="flow">
  <div className="absolute inset-0 z-0 pointer-events-none will-change-transform"><Particles /></div>
  <div className="gsap-bg-parallax absolute -z-10 w-full pointer-events-none will-change-transform h-[200%] -top-[50%] left-0 pointer-events-none bg-[linear-gradient(to_right,#4f8ef70d_1px,transparent_1px),linear-gradient(to_bottom,#4f8ef70d_1px,transparent_1px)] bg-[size:48px_48px]"></div>
  <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full z-20 relative">
    <div className="mb-10">
      <div className="eyebrow text-center mb-2">Cara Kerja</div>
      <h2 className="text-center font-orbitron uppercase text-3xl lg:text-4xl font-black text-white mb-10">Transaksi Aman,<br/>Terstruktur & Bergaransi</h2>
    </div>

    <GlowCard>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Info */}
        <div className="flex flex-col items-start w-full">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-1.5 mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wide">100% Anti Hackback</span>
          </div>
          <h2 className="font-orbitron text-xl lg:text-3xl font-bold text-white mb-4 leading-snug">Alur Transaksi<br/>Jelas & Terjamin</h2>
          <p className="font-inter text-sm text-slate-300 leading-relaxed mb-6">
            Setiap transaksi kami jalani dengan prosedur ketat — dari verifikasi akun, pembayaran aman, hingga serah terima & garansi purna jual.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/6287814897713" className="bg-[#1e3a8a] hover:bg-blue-600 text-white font-inter text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(30,58,138,0.5)]">Proses Sekarang</a>
            <button className="bg-transparent border border-[#1e3a8a] text-white hover:bg-[#1e3a8a]/20 font-inter text-sm font-bold px-5 py-2.5 rounded-xl transition-all">Pelajari Alur</button>
          </div>
        </div>
        
        {/* Right Steps */}
        <div className="flex flex-col gap-3 lg:gap-4 w-full">
          {/* STEP 1 */}
          <div className="group relative flex items-center gap-4 bg-[#0d1320] ring-1 ring-white/10 p-4 lg:p-5 rounded-[20px] transition-all duration-300 hover:-translate-x-2 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5),0_0_15px_rgba(59,130,246,0.2)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            <div className="relative z-10 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-b from-[#111827] to-[#0A0C14] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_10px_rgba(59,130,246,0.2)] ring-1 ring-white/10 rounded-[14px] flex items-center justify-center text-lg lg:text-xl font-black font-orbitron text-blue-400 group-hover:scale-110 group-hover:text-blue-300 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_5px_15px_rgba(59,130,246,0.4)] transition-all duration-300 flex-shrink-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 drop-shadow-md">01</span>
            </div>
            
            <div className="relative z-10">
              <div className="font-orbitron text-white text-base lg:text-lg font-bold tracking-wide group-hover:text-blue-200 transition-colors">Hubungi Admin</div>
              <div className="font-inter text-xs lg:text-sm text-slate-400 mt-1 group-hover:text-slate-300 transition-colors">Chat WA, kirim spek & screenshoot akun</div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="group relative flex items-center gap-4 bg-[#0d1320] ring-1 ring-white/10 p-4 lg:p-5 rounded-[20px] transition-all duration-300 hover:-translate-x-2 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5),0_0_15px_rgba(59,130,246,0.2)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            <div className="relative z-10 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-b from-[#111827] to-[#0A0C14] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_10px_rgba(59,130,246,0.2)] ring-1 ring-white/10 rounded-[14px] flex items-center justify-center text-lg lg:text-xl font-black font-orbitron text-blue-400 group-hover:scale-110 group-hover:text-blue-300 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_5px_15px_rgba(59,130,246,0.4)] transition-all duration-300 flex-shrink-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 drop-shadow-md">02</span>
            </div>
            
            <div className="relative z-10">
              <div className="font-orbitron text-white text-base lg:text-lg font-bold tracking-wide group-hover:text-blue-200 transition-colors">Negosiasi Harga</div>
              <div className="font-inter text-xs lg:text-sm text-slate-400 mt-1 group-hover:text-slate-300 transition-colors">Admin cek & berikan penawaran harga terbaik</div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="group relative flex items-center gap-4 bg-[#0d1320] ring-1 ring-white/10 p-4 lg:p-5 rounded-[20px] transition-all duration-300 hover:-translate-x-2 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5),0_0_15px_rgba(59,130,246,0.2)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            <div className="relative z-10 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-b from-[#111827] to-[#0A0C14] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_10px_rgba(59,130,246,0.2)] ring-1 ring-white/10 rounded-[14px] flex items-center justify-center text-lg lg:text-xl font-black font-orbitron text-blue-400 group-hover:scale-110 group-hover:text-blue-300 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_5px_15px_rgba(59,130,246,0.4)] transition-all duration-300 flex-shrink-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 drop-shadow-md">03</span>
            </div>
            
            <div className="relative z-10">
              <div className="font-orbitron text-white text-base lg:text-lg font-bold tracking-wide group-hover:text-blue-200 transition-colors">Transaksi via Rekber</div>
              <div className="font-inter text-xs lg:text-sm text-slate-400 mt-1 group-hover:text-slate-300 transition-colors">Pembayaran aman melalui rekening bersama</div>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="group relative flex items-center gap-4 bg-[#0d1320] ring-1 ring-white/10 p-4 lg:p-5 rounded-[20px] transition-all duration-300 hover:-translate-x-2 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5),0_0_15px_rgba(16,185,129,0.2)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            <div className="relative z-10 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-b from-[#111827] to-[#0A0C14] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_10px_rgba(16,185,129,0.2)] ring-1 ring-white/10 rounded-[14px] flex items-center justify-center text-lg lg:text-xl font-black font-orbitron text-emerald-400 group-hover:scale-110 group-hover:text-emerald-300 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_5px_15px_rgba(16,185,129,0.4)] transition-all duration-300 flex-shrink-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 drop-shadow-md">04</span>
            </div>
            
            <div className="relative z-10">
              <div className="font-orbitron text-white text-base lg:text-lg font-bold tracking-wide group-hover:text-emerald-200 transition-colors">Garansi Aktif</div>
              <div className="font-inter text-xs lg:text-sm text-slate-400 mt-1 group-hover:text-slate-300 transition-colors">Garansi anti hackback setelah serah terima</div>
            </div>
          </div>
        </div>
      </div>
    </GlowCard>
  </div>
</section>



<hr className="divider" />

{/* ── TRUST ── */}
<section className="slide-section py-10 md:py-24 flex-col min-h-[100dvh] w-full relative overflow-hidden flex justify-center items-center snap-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0018cc]/50 via-[#000744]/25 to-transparent" id="trust">
  <div className="absolute inset-0 z-0 pointer-events-none will-change-transform"><Particles /></div>
  <div className="gsap-bg-parallax absolute -z-10 w-full pointer-events-none will-change-transform h-[200%] -top-[50%] left-0 pointer-events-none bg-[linear-gradient(to_right,#4f8ef70c_1px,transparent_1px),linear-gradient(to_bottom,#4f8ef70c_1px,transparent_1px)] bg-[size:48px_48px]"></div>
  <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full z-20 relative">
    <div className="mb-10">
      <div className="eyebrow text-center mb-2">Mengapa Kami</div>
      <h2 className="text-center font-orbitron uppercase text-3xl lg:text-4xl font-black text-white mb-10">Keamanan & Kepercayaan<br/>adalah Prioritas Utama</h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
      {/* TRUST 1 */}
      <div className="group animate-floating relative overflow-hidden rounded-[24px] bg-[#0d1320] ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5),0_0_20px_rgba(16,185,129,0.2)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="absolute -right-4 -bottom-4 text-7xl opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">🛡️</div>
        
        <div className="relative p-6 z-10 flex flex-col h-full items-start text-left">
          <div className="w-14 h-14 bg-gradient-to-b from-emerald-500 to-emerald-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_0_15px_rgba(16,185,129,0.3)] ring-1 ring-white/10 rounded-[18px] flex items-center justify-center text-2xl mb-5 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_5px_20px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-all duration-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="drop-shadow-md relative z-10">🛡️</span>
          </div>
          <h3 className="font-orbitron text-lg font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">Anti Hackback</h3>
          <p className="font-inter text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
            Setiap akun yang terjual dilindungi dengan garansi anti hackback dari admin.
          </p>
        </div>
      </div>

      {/* TRUST 2 */}
      <div className="group animate-floating relative overflow-hidden rounded-[24px] bg-[#0d1320] ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.2)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="absolute -right-4 -bottom-4 text-7xl opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">✅</div>
        
        <div className="relative p-6 z-10 flex flex-col h-full items-start text-left">
          <div className="w-14 h-14 bg-gradient-to-b from-blue-500 to-blue-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_0_15px_rgba(59,130,246,0.3)] ring-1 ring-white/10 rounded-[18px] flex items-center justify-center text-2xl mb-5 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_5px_20px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-all duration-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="drop-shadow-md relative z-10">✅</span>
          </div>
          <h3 className="font-orbitron text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Spek Valid & Jelas</h3>
          <p className="font-inter text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
            Seluruh informasi akun ditampilkan jujur — skin, rank, season, dan harga tanpa tipu muslihat.
          </p>
        </div>
      </div>

      {/* TRUST 3 */}
      <div className="group animate-floating relative overflow-hidden rounded-[24px] bg-[#0d1320] ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5),0_0_20px_rgba(245,158,11,0.2)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="absolute -right-4 -bottom-4 text-7xl opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">⚡</div>
        
        <div className="relative p-6 z-10 flex flex-col h-full items-start text-left">
          <div className="w-14 h-14 bg-gradient-to-b from-amber-500 to-amber-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_0_15px_rgba(245,158,11,0.3)] ring-1 ring-white/10 rounded-[18px] flex items-center justify-center text-2xl mb-5 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_5px_20px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-all duration-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="drop-shadow-md relative z-10">⚡</span>
          </div>
          <h3 className="font-orbitron text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">Respon 24/7</h3>
          <p className="font-inter text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
            Admin aktif sepanjang hari, responsif, ramah, dan siap membantu segala kebutuhan transaksimu.
          </p>
        </div>
      </div>

      {/* TRUST 4 */}
      <div className="group animate-floating relative overflow-hidden rounded-[24px] bg-[#0d1320] ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5),0_0_20px_rgba(249,115,22,0.2)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="absolute -right-4 -bottom-4 text-7xl opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">💎</div>
        
        <div className="relative p-6 z-10 flex flex-col h-full items-start text-left">
          <div className="w-14 h-14 bg-gradient-to-b from-orange-500 to-orange-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_0_15px_rgba(249,115,22,0.3)] ring-1 ring-white/10 rounded-[18px] flex items-center justify-center text-2xl mb-5 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_5px_20px_rgba(249,115,22,0.5)] group-hover:scale-110 transition-all duration-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="drop-shadow-md relative z-10">💎</span>
          </div>
          <h3 className="font-orbitron text-lg font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">Harga Terjangkau</h3>
          <p className="font-inter text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
            Harga kompetitif dan wajar. Kami tidak markup berlebihan, buyer dan seller sama-sama untung.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<hr className="divider" />

{/* ── CTA / NEWSLETTER ── */}
<section className="slide-section py-10 md:py-24 flex-col min-h-[100dvh] w-full relative overflow-hidden flex justify-center items-center snap-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#002bff]/50 via-[#000d77]/25 to-transparent" id="contact">
  <div className="absolute inset-0 z-0 pointer-events-none will-change-transform"><Particles /></div>
  <div className="max-w-3xl mx-auto w-full z-20 relative">
    <SpotlightCard className="relative flex flex-col items-center w-full border-t border-b border-l border-r border-transparent bg-[#0A0C14]/80 overflow-hidden shadow-[0_0_40px_rgba(79,142,247,0.15)]" style={{ borderImage: 'linear-gradient(to right, #4F8EF7, rgba(79,142,247,0.1)) 1' }}>
      <DotPattern width={20} height={20} cx={1} cy={1} cr={1.5} className="fill-[#4F8EF7]/10" />

      {/* Corner squares */}
      <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-[#4F8EF7] shadow-[0_0_10px_rgba(79,142,247,0.8)] z-20" />
      <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-[#4F8EF7] shadow-[0_0_10px_rgba(79,142,247,0.8)] z-20" />
      <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-[#4F8EF7] shadow-[0_0_10px_rgba(79,142,247,0.8)] z-20" />
      <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-[#4F8EF7] shadow-[0_0_10px_rgba(79,142,247,0.8)] z-20" />

      <div className="w-full flex flex-col items-center text-center p-6 md:p-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(59,130,246,0.15)] animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Tunggu Apa Lagi?
          </div>
          <h2 style={{ fontFamily: 'var(--font-geist), sans-serif' }} className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 leading-[1.2] uppercase tracking-tight">
            <span className="text-white drop-shadow-sm">
              Gass buruan temukan akun
            </span><br/>
            <span className="text-[#4F8EF7]">
              barumu di farid shop game
            </span>
          </h2>
        <div className="flex justify-center gap-4 flex-wrap w-full">
          <AdminContactDropdown buttonText="Chat Admin Langsung" className="!px-8 !py-3 !text-[15px]" />
          <a href="#komunitas" className="btn-outline !bg-black/85 %] !border !border-white/10 !text-white hover:!bg-white/10 hover:!scale-105 hover:-translate-y-1 active:!scale-95 !shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(0,0,0,0.3)] hover:!shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-300 !px-8 !py-3 !text-[15px]">Gabung Grup Komunitas</a>
        </div>
      </div>
    </SpotlightCard>
    
    {/* ── TRUST & PAYMENT INFO ── */}
    {/* ── TRUST & PAYMENT INFO ── */}
    <div className="group/trustbox mt-12 md:mt-16 w-full bg-gradient-to-b from-[#0d1326]/90 to-[#050811]/90 border border-blue-500/20 rounded-[32px] p-6 md:p-8 flex flex-col items-center gap-8 md:gap-10 relative overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.05),0_0_20px_rgba(59,130,246,0.15)] transition-all duration-700 hover:border-blue-400/50 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.1),0_0_35px_rgba(59,130,246,0.25)]">
      
      {/* Subtle top light reflection for the container */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Floating cart icon on hover */}
      <div className="absolute -right-8 -bottom-8 text-9xl opacity-0 group-hover/trustbox:opacity-[0.05] transition-all duration-700 group-hover/trustbox:scale-110 group-hover/trustbox:-rotate-12 pointer-events-none drop-shadow-[0_0_30px_rgba(255,255,255,1)]">🛒</div>
      
      {/* 1. TRUST BADGES (TOP SECTION) */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-16 relative z-10 w-full">
        <div className="flex items-center gap-4 group/badge hover:-translate-y-1 transition-transform duration-300 cursor-default">
          <div className="w-8 h-8 md:w-16 md:h-16 rounded-[20px] bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_8px_16px_rgba(0,0,0,0.4)] ring-1 ring-blue-400/50 group-hover/badge:shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
            <span className="text-3xl md:text-4xl drop-shadow-md group-hover/badge:scale-110 transition-transform duration-300 relative z-10">🛡️</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-sm md:text-base uppercase tracking-widest drop-shadow-sm group-hover/badge:text-blue-300 transition-colors">Aman 100%</span>
            <span className="text-slate-400 text-xs md:text-sm mt-1 font-medium group-hover/badge:text-slate-300 transition-colors">Garansi Anti Hackback</span>
          </div>
        </div>

        <div className="flex items-center gap-4 group/badge hover:-translate-y-1 transition-transform duration-300 cursor-default">
          <div className="w-8 h-8 md:w-16 md:h-16 rounded-[20px] bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_8px_16px_rgba(0,0,0,0.4)] ring-1 ring-blue-400/50 group-hover/badge:shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
            <span className="text-3xl md:text-4xl drop-shadow-md group-hover/badge:scale-110 transition-transform duration-300 relative z-10">⚡</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-sm md:text-base uppercase tracking-widest drop-shadow-sm group-hover/badge:text-blue-300 transition-colors">Proses Kilat</span>
            <span className="text-slate-400 text-xs md:text-sm mt-1 font-medium group-hover/badge:text-slate-300 transition-colors">1-5 Menit Langsung Cair</span>
          </div>
        </div>
      </div>
      
      {/* HORIZONTAL DIVIDER */}
      <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-10"></div>
      
      {/* 2. PAYMENT METHODS (BOTTOM SECTION) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 relative z-10 w-full">
        <div className="text-center sm:text-right">
           <h4 className="text-white font-black text-xl md:text-2xl tracking-wide mb-1 leading-tight">Metode<br className="hidden sm:block"/>Pembayaran</h4>
           <p className="text-slate-400 text-xs md:text-sm max-w-[200px] leading-relaxed font-medium mx-auto sm:mx-0">Mendukung pembayaran via Dana, Sea Bank, Gopay, dan QRIS.</p>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-3 md:gap-4">
           {/* DANA */}
           <div className="w-[52px] h-[52px] md:w-[72px] md:h-[72px] rounded-[12px] md:rounded-[20px] bg-gradient-to-b from-[#118EEA] to-[#0A66C2] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_6px_12px_rgba(0,0,0,0.4)] ring-1 ring-white/20 hover:-translate-y-1 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer group/icon relative overflow-hidden flex-shrink-0 flex flex-col items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
             <div className="w-5 h-5 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center mb-1 group-hover/icon:scale-105 transition-transform duration-300 shadow-sm relative z-10">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#118EEA]" fill="currentColor"><path d="M20.5 4h-17C2.12 4 1 5.12 1 6.5v11C1 18.88 2.12 20 3.5 20h17c1.38 0 2.5-1.12 2.5-2.5v-11C23 5.12 21.88 4 20.5 4zm-17 2h17c.28 0 .5.22.5.5v1.27c-1.46.66-2.5 2.1-2.5 3.73s1.04 3.07 2.5 3.73v1.27c0 .28-.22.5-.5.5h-17c-.28 0-.5-.22-.5-.5v-11c0-.28.22-.5.5-.5z"/></svg>
             </div>
             <span className="text-white font-bold text-[9px] md:text-[10px] tracking-wide drop-shadow-sm relative z-10">DANA</span>
           </div>

           {/* SEA Bank */}
           <div className="w-[52px] h-[52px] md:w-[72px] md:h-[72px] rounded-[12px] md:rounded-[20px] bg-gradient-to-b from-[#8B5CF6] to-[#6D28D9] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_6px_12px_rgba(0,0,0,0.4)] ring-1 ring-white/20 hover:-translate-y-1 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer group/icon relative overflow-hidden flex-shrink-0 flex flex-col items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
             <div className="w-5 h-5 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center mb-1 group-hover/icon:scale-105 transition-transform duration-300 shadow-sm relative z-10">
               <span className="text-[#8B5CF6] font-black text-sm md:text-base">S</span>
             </div>
             <span className="text-white font-bold text-[9px] md:text-[10px] tracking-wide drop-shadow-sm relative z-10">SEA Bank</span>
           </div>

           {/* GoPay */}
           <div className="w-[52px] h-[52px] md:w-[72px] md:h-[72px] rounded-[12px] md:rounded-[20px] bg-gradient-to-b from-[#00AED6] to-[#0096B9] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_6px_12px_rgba(0,0,0,0.4)] ring-1 ring-white/20 hover:-translate-y-1 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer group/icon relative overflow-hidden flex-shrink-0 flex flex-col items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
             <div className="w-5 h-5 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center mb-1 group-hover/icon:scale-105 transition-transform duration-300 shadow-sm relative z-10">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00AED6]" fill="currentColor"><path d="M19 7H5C3.89 7 3 7.89 3 9v8c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V9c0-1.11-.89-2-2-2zm-3 7h-2v-2h2v2z"/></svg>
             </div>
             <span className="text-white font-bold text-[9px] md:text-[10px] tracking-wide drop-shadow-sm relative z-10">gopay</span>
           </div>

           {/* QRIS */}
           <div className="w-[52px] h-[52px] md:w-[72px] md:h-[72px] rounded-[12px] md:rounded-[20px] bg-gradient-to-b from-[#EF4444] to-[#B91C1C] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2),0_6px_12px_rgba(0,0,0,0.4)] ring-1 ring-white/20 hover:-translate-y-1 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer group/icon relative overflow-hidden flex-shrink-0 flex flex-col items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
             <div className="w-5 h-5 md:w-8 md:h-8 bg-white rounded-xl flex items-center justify-center mb-1 group-hover/icon:scale-105 transition-transform duration-300 shadow-sm p-1 relative z-10">
               <div className="w-full h-full border-[1.5px] border-[#EF4444] grid grid-cols-2 gap-[1px] p-[1px]">
                 <div className="bg-[#EF4444]"></div><div className="bg-[#EF4444]"></div>
                 <div className="bg-[#EF4444]"></div><div className="border border-[#EF4444]"></div>
               </div>
             </div>
             <span className="text-white font-bold text-[9px] md:text-[10px] tracking-wide drop-shadow-sm relative z-10">QRIS</span>
           </div>
        </div>
      </div>
    </div>

  </div>
</section>

{/* ── FOOTER ── */}

      {/* ── MOBILE BOTTOM ACTION BAR ── */}
      <div className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-[#060910]/95 backdrop-blur-xl border-t border-white/10 p-4 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] pb-6">
        <a href="#services" className="flex-1 btn-outline !bg-white/5 !border-white/20 !text-white text-sm font-bold flex items-center justify-center rounded-xl min-h-[48px]">Katalog</a>
        <a href="https://wa.me/6287814897713" className="flex-1 btn-primary !bg-[#4F8EF7] !shadow-[0_0_20px_rgba(79,142,247,0.5)] text-sm font-bold flex items-center justify-center rounded-xl min-h-[48px]">Chat WA Admin</a>
      </div>
</main>


<footer>
  <div className="footer-inner flex-col md:flex-row text-center md:text-left gap-8 md:gap-0 pb-32 md:pb-12">
    <a className="nav-logo" href="#" style={{'textDecoration': 'none'}}>
      <img src="/logo.jpg" alt="Farid Shop Game" style={{ width: "30px", height: "30px", borderRadius: "8px", objectFit: "cover", flexShrink: 0, boxShadow: "0 0 16px rgba(79,142,247,0.4)" }} />
      <span style={{'fontSize': '14px', 'fontWeight': '700', 'color': 'var(--text)'}}>Farid Shop <em style={{'color': '#4F8EF7', 'fontStyle': 'normal'}}>Game</em></span>
    </a>

    <ul className="footer-links flex-wrap justify-center md:justify-end">
      <li><a href="#">Syarat &amp; Ketentuan</a></li>
      <li><a href="#">Kebijakan Privasi</a></li>
      <li><a href="#">Garansi Akun</a></li>
      <li><a href="https://wa.me/6287814897713">Hubungi Kami</a></li>
    </ul>

    <div className="footer-social justify-center md:justify-end w-full md:w-auto">
      {/* X / Twitter */}
      <a href="#" className="social-btn" aria-label="Twitter">
        <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      {/* Discord */}
      <a href="#" className="social-btn" aria-label="Discord">
        <svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
      </a>
      {/* YouTube */}
      <a href="#" className="social-btn" aria-label="YouTube">
        <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
    </div>

    <p className="footer-copy">© 2025 Farid Shop Game. Hak cipta dilindungi.</p>
  </div>
</footer>

{/* WA Float Removed per user request */}


    </>
  );
}

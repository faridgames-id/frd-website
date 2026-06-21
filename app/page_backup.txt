"use client";
import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import DotPattern from '../components/ui/dot-pattern-1';


const GlowCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative group isolate rounded-2xl w-full flex flex-col p-[1px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(79,142,247,0.3)] ${className || ''}`}>
    {/* Animated gradient border */}
    <div className="absolute inset-[-100%] -z-10 opacity-40 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg_at_50%_50%,#0A0C14_0%,#4F8EF7_20%,#ffffff_50%,#4F8EF7_80%,#0A0C14_100%)] animate-[spin_5s_linear_infinite] will-change-transform"></div>
    
    {/* Card inner background */}
    <div className="h-full w-full bg-gradient-to-br from-[#0d1326]/95 to-[#050811]/95 backdrop-blur-md rounded-[15px] p-6 lg:p-8 relative z-10 flex flex-col justify-between items-start border border-blue-500/20 group-hover:border-blue-400/50 transition-colors shadow-2xl">
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
export default function Home() {
  useEffect(() => {
    
      // ── Nav scroll effect ──
      const navbar = document.getElementById('navbar');
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });
    
      // ── Hamburger ──
      const hamburger = document.getElementById('hamburger');
      const mobileMenu = document.getElementById('mobileMenu');
      hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });
      mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => mobileMenu.classList.remove('open'));
      });
    
      // ── Duplicate marquee ──
      const track = document.getElementById('marqueeTrack');
      const clone = track.innerHTML;
      track.innerHTML += clone;
    
      // ── Filter buttons ──
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    
      // ── Intersection Observer fade-in ──
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
    
      document.querySelectorAll('.feature-card, .service-card, .trust-card, .flow-step, .catalog-list-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
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
      function initBorderGlow(element) {
        if (!element) return;
    
        // Create glow border element
        if (!element.querySelector('.glow-border')) {
          const glowBorder = document.createElement('div');
          glowBorder.className = 'glow-border';
          element.appendChild(glowBorder);
        }
    
        function getCenterOfElement(el) {
          const rect = el.getBoundingClientRect();
          return [rect.width / 2, rect.height / 2];
        }
    
        function getEdgeProximity(el, x, y) {
          const rect = el.getBoundingClientRect();
          const [cx, cy] = [rect.width / 2, rect.height / 2];
          const dx = x - cx;
          const dy = y - cy;
          let kx = Infinity;
          let ky = Infinity;
          if (dx !== 0) kx = cx / Math.abs(dx);
          if (dy !== 0) ky = cy / Math.abs(dy);
          return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
        }
    
        function getCursorAngle(el, x, y) {
          const rect = el.getBoundingClientRect();
          const [cx, cy] = [rect.width / 2, rect.height / 2];
          const dx = x - cx;
          const dy = y - cy;
          if (dx === 0 && dy === 0) return 0;
          const radians = Math.atan2(dy, dx);
          let degrees = radians * (180 / Math.PI) + 90;
          if (degrees < 0) degrees += 360;
          return degrees;
        }
    
        let ticking = false;
        element.addEventListener('mousemove', (e) => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              const rect = element.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const edge = getEdgeProximity(element, x, y);
              const angle = getCursorAngle(element, x, y);
              element.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(1)}`);
              element.style.setProperty('--cursor-angle', `${angle.toFixed(1)}deg`);
              ticking = false;
            });
            ticking = true;
          }
        });
    
        element.addEventListener('mouseleave', () => {
          element.style.setProperty('--edge-proximity', '0');
        });
      }
    
      // Apply glow effect to specific cards
      const glowElements = document.querySelectorAll(
        '.hero-card, .feature-card, .service-card, .catalog-hero-card, .trust-card, .flow-card, .hero-badge-tag, .hero-budget, .stats-inner'
      );
      glowElements.forEach(el => {
        el.classList.add('glow-card');
        initBorderGlow(el);
      });
    
        }, []);

  return (
    <>
      <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.3/build/spline-viewer.js" strategy="lazyOnload" />
      <Script id="remove-spline-logo" strategy="afterInteractive">
        {`
          setInterval(() => {
            const viewers = document.querySelectorAll('spline-viewer');
            viewers.forEach(viewer => {
              if (viewer && viewer.shadowRoot) {
                const logo = viewer.shadowRoot.querySelector('#logo');
                if (logo) logo.style.display = 'none';
                
                // Also hide by tag name just in case
                const link = viewer.shadowRoot.querySelector('a');
                if (link && link.href.includes('spline.design')) link.style.display = 'none';
              }
            });
          }, 1000);
        `}
      </Script>

{/* Ambient background */}
<div className="ambient" aria-hidden="true"></div>

{/* ── GIANT ROBOT 3D BACKGROUND (SLIDE 1 ONLY) ── */}
<div style={{'position': 'absolute', 'top': '0', 'left': '0', 'width': '100%', 'height': '100vh', 'zIndex': '0', 'pointerEvents': 'none', 'overflow': 'hidden', 'transform': 'translateX(0%)'}}>
  <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.3/build/spline-viewer.js"></script>
  <spline-viewer url="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" events-target="global" style={{'width': '100%', 'height': '100%', 'display': 'block'}}></spline-viewer>
</div>

{/* ── NAVIGATION ── */}
<nav id="navbar">
  <a className="nav-logo" href="#">
    <img src="/logo.jpg" alt="Farid Shop Game" style={{ width: "30px", height: "30px", borderRadius: "8px", objectFit: "cover", flexShrink: 0, boxShadow: "0 0 16px rgba(79,142,247,0.4)" }} />
    <span>Farid Shop <em>Game</em></span>
  </a>

  <ul className="nav-links">
    <li><a href="#komunitas" className="active">Komunitas</a></li>
    <li><a href="#services">Layanan</a></li>
    <li><a href="#trust">Keamanan</a></li>
    <li><a href="#flow">Cara Kerja</a></li>
    <li><a href="#contact">Kontak</a></li>
  </ul>

  <div className="nav-cta">
    <a href="#komunitas" className="btn-ghost">Gabung Komunitas</a>
    <a href="https://wa.me/6287814897713" className="btn-primary !bg-[#4F8EF7] hover:!bg-[#3B82F6] !shadow-[0_0_15px_rgba(79,142,247,0.4)]">Chat Admin</a>
  </div>

  <button className="hamburger" id="hamburger" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>

{/* Mobile menu */}
<div className="mobile-menu" id="mobileMenu">
  <a href="#komunitas">Komunitas</a>
  <a href="#services">Layanan</a>
  <a href="#trust">Keamanan</a>
  <a href="#flow">Cara Kerja</a>
  <a href="#contact">Kontak</a>
  <a href="https://wa.me/6287814897713" className="btn-primary !bg-[#4F8EF7] hover:!bg-[#3B82F6] !shadow-[0_0_15px_rgba(79,142,247,0.4)]">Chat Admin via WhatsApp</a>
</div>

{/* ── HERO ── */}
<section className="hero">
  <div className="hero-content relative z-20 lg:-ml-8 xl:-ml-12">
    <div className="badge !bg-white/10 !backdrop-blur-md !border-white/20 !text-white shadow-none">
      <span className="badge-dot !bg-white shadow-none"></span>
      Terpercaya &amp; Bergaransi
    </div>

    <h1 style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontWeight: 800, letterSpacing: '2px', lineHeight: '1.1', fontSize: 'clamp(36px, 5vw, 64px)', textTransform: 'uppercase', textAlign: 'left', maxWidth: '600px' }}>
      <span className="text-[#4F8EF7]">FARID SHOP GAME</span><br/>
      <span className="text-white">COMMUNITY STORE</span>
    </h1>

    <p className="hero-sub mt-4 max-w-[500px]">
      Pusat jual beli akun game terpercaya. Free Fire, Mobile Legends, Roblox, dan lainnya — spek sultan, harga jujur, garansi anti hackback.
    </p>



    <div className="hero-actions">
      <a href="https://wa.me/6287814897713" className="btn-blue">Hubungi Admin via WA</a>
      <a href="#komunitas" className="btn-outline !bg-white/10 !backdrop-blur-lg !border !border-white/30 !text-white hover:!bg-white/20 !shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all">Gabung Komunitas</a>
    </div>
  </div>
</section>

{/* -- STATS BAR -- */}
<div className="stats-bar">
  <div className="max-w-[1160px] mx-auto px-6">
    <GlowCard className="w-full !p-[1px]">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-0 text-center">
        <div className="flex flex-col items-center justify-center p-6 border-b border-r border-slate-800/50 md:border-b-0">
          <div className="font-orbitron text-3xl font-bold text-white mb-2">500<span className="text-[#0EA5E9]">+</span></div>
          <div className="text-[15px] text-slate-200 font-inter tracking-wide font-medium">Transaksi Sukses</div>
        </div>
        <div className="flex flex-col items-center justify-center p-6 border-b border-slate-800/50 md:border-b-0 md:border-r">
          <div className="font-orbitron text-3xl font-bold text-white mb-2">50<span className="text-[#0EA5E9]">+</span></div>
          <div className="text-[15px] text-slate-200 font-inter tracking-wide font-medium">Akun Stok Ready</div>
        </div>
        <div className="flex flex-col items-center justify-center p-6 border-r border-slate-800/50 md:border-b-0">
          <div className="font-orbitron text-3xl font-bold text-white mb-2">100<span className="text-[#0EA5E9]">%</span></div>
          <div className="text-[15px] text-slate-200 font-inter tracking-wide font-medium">Anti Hackback</div>
        </div>
        <div className="flex flex-col items-center justify-center p-6 md:border-b-0">
          <div className="font-orbitron text-3xl font-bold text-white mb-2">24<span className="text-[#0EA5E9]">/7</span></div>
          <div className="text-[15px] text-slate-200 font-inter tracking-wide font-medium">Admin Aktif</div>
        </div>
      </div>
    </GlowCard>
  </div>
</div>

{/* -- MARQUEE -- */}
<div className="marquee-section" aria-hidden="true">
  <div className="marquee-track" id="marqueeTrack">
    {/* will be duplicated by JS */}
    <div className="marquee-item"><div className="marquee-icon icon-ff">FF</div><span className="marquee-label">Free Fire</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-ml">ML</div><span className="marquee-label">Mobile Legends</span></div>
    <div className="marquee-item"><div className="marquee-icon icon-rbx">RBX</div><span className="marquee-label">Roblox</span></div>
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

{/* ── CATALOG ── */}

<section className="py-16 lg:py-24" id="komunitas">
  <div className="max-w-7xl mx-auto px-4 lg:px-8">
    <div className="mb-12">
      <div className="eyebrow text-center mb-2">Komunitas Jual Beli Akun</div>
      <h2 className="text-center font-orbitron uppercase text-3xl lg:text-4xl font-black text-white mb-6">Bergabung dengan<br/>Komunitas Kami</h2>
      <p className="font-inter text-sm text-slate-300 leading-relaxed text-center mx-auto max-w-2xl">Temukan berbagai grup, saluran, dan sosial media resmi Farid Shop Game untuk update stock, transaksi aman, dan info terbaru.</p>
    </div>

    {/* GRUP JUAL BELI - 6 Kolom */}
    <div className="mb-12">
      <h3 className="font-orbitron text-xl font-bold text-[#60A5FA] mb-6 flex items-center gap-2">
        <span className="text-2xl">👥</span> Grup Jual Beli
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
        {[
          "Grup 1", "Grup 2", "Grup 3", "Grup 4", "Grup 5", "GB Umum"
        ].map((name, idx) => (
          <GlowCard key={'grup-'+idx} className="!p-[1px]">
            <div className="w-full flex flex-col items-center justify-center p-5 text-center bg-[#0d1326]/80 rounded-[14px]">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-2xl mb-3">
                💬
              </div>
              <h4 className="font-inter text-sm font-bold text-white mb-2">{name}</h4>
              <a href="#" className="text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded-full transition-colors w-full">GABUNG</a>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>

    {/* SALURAN JUAL BELI - 4 Kolom */}
    <div className="mb-12">
      <h3 className="font-orbitron text-xl font-bold text-[#38BDF8] mb-6 flex items-center gap-2">
        <span className="text-2xl">📢</span> Saluran Jual Beli
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {[
          "Saluran Jubel Utama",
          "Saluran Kusus Stock",
          "Saluran Testimonial",
          "Saluran Jual Akun"
        ].map((name, idx) => (
          <GlowCard key={'saluran-'+idx} className="!p-[1px]">
            <div className="w-full flex flex-col items-center justify-center p-5 text-center bg-[#0d1326]/80 rounded-[14px]">
              <div className="w-12 h-12 bg-sky-500/10 rounded-full flex items-center justify-center text-2xl mb-3">
                📣
              </div>
              <h4 className="font-inter text-sm font-bold text-white mb-2">{name}</h4>
              <a href="#" className="text-[11px] font-bold text-white bg-sky-600 hover:bg-sky-500 px-4 py-1.5 rounded-full transition-colors w-full">GABUNG</a>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>

    {/* SOSIAL MEDIA */}
    <div>
      <h3 className="font-orbitron text-xl font-bold text-[#C084FC] mb-6 flex items-center gap-2">
        <span className="text-2xl">📱</span> Sosial Media
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <GlowCard className="!p-[1px]">
          <div className="w-full flex flex-col items-center justify-center p-5 text-center bg-[#0d1326]/80 rounded-[14px]">
            <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center text-2xl mb-3">
              🎵
            </div>
            <h4 className="font-inter text-sm font-bold text-white mb-2">TikTok</h4>
            <a href="#" className="text-[11px] font-bold text-white bg-purple-600 hover:bg-purple-500 px-4 py-1.5 rounded-full transition-colors w-full">FOLLOW</a>
          </div>
        </GlowCard>
        <GlowCard className="!p-[1px]">
          <div className="w-full flex flex-col items-center justify-center p-5 text-center bg-[#0d1326]/80 rounded-[14px]">
            <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center text-2xl mb-3">
              📸
            </div>
            <h4 className="font-inter text-sm font-bold text-white mb-2">Instagram</h4>
            <a href="#" className="text-[11px] font-bold text-white bg-pink-600 hover:bg-pink-500 px-4 py-1.5 rounded-full transition-colors w-full">FOLLOW</a>
          </div>
        </GlowCard>
      </div>
    </div>

  </div>
</section>


<hr className="divider" />


{/* ── SERVICES ── */}
<section className="py-16 lg:py-24" id="services">
  <div className="max-w-7xl mx-auto px-4 lg:px-8">
    <div className="mb-10">
      <div className="eyebrow text-center mb-2">Layanan Kami</div>
      <h2 className="text-center font-orbitron uppercase text-3xl lg:text-4xl font-black text-white mb-10">Lebih Dari Sekedar<br/>Jual Beli Akun</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* 1. Jual Akun Game */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-3xl mb-4 bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">🛒</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wide">Jual Akun Game</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed">
              Pusat akun game sultan dan berkualitas dengan harga yang kompetitif. Tersedia berbagai pilihan game populer.
            </p>
         </div>
      </GlowCard>

      {/* 2. Menampung Akun Game */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-3xl mb-4 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)]">💰</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wide">Menampung Akun Game</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed">
              Kami siap menampung atau membeli akun game Anda dengan budget yang fleksibel dan proses pencairan cepat.
            </p>
         </div>
      </GlowCard>

      {/* 3. Jasa Pengamanan Akun / Rebind */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-3xl mb-4 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]">🛡️</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wide">Jasa Pengamanan &amp; Rebind</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed">
              Mengamankan akun Anda dari risiko hackback, serta melayani jasa pergantian data (rebind) akun secara profesional dan aman.
            </p>
         </div>
      </GlowCard>

      {/* 4. Program Reseller */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-3xl mb-4 bg-purple-500/10 p-3 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]">🤝</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wide">Program Reseller</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed">
              Bergabunglah menjadi mitra resmi kami dan dapatkan penghasilan tambahan dengan menjadi reseller akun game terpercaya.
            </p>
         </div>
      </GlowCard>
    </div>
  </div>
</section>



{/* ── TRANSACTION FLOW ── */}
<section className="py-16 lg:py-24" id="flow">
  <div className="max-w-7xl mx-auto px-4 lg:px-8">
    <div className="mb-10">
      <div className="eyebrow text-center mb-2">Cara Kerja</div>
      <h2 className="text-center font-orbitron uppercase text-3xl lg:text-4xl font-black text-white mb-10">Transaksi Aman,<br/>Terstruktur & Bergaransi</h2>
    </div>

    <GlowCard>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Info */}
        <div className="flex flex-col items-start w-full">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2 mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span className="text-xs font-bold text-blue-400">100% Anti Hackback</span>
          </div>
          <h2 className="font-orbitron text-2xl lg:text-3xl font-bold text-white mb-4 leading-snug">Alur Transaksi<br/>Jelas & Terjamin</h2>
          <p className="font-inter text-sm text-slate-300 leading-relaxed mb-8">
            Setiap transaksi kami jalani dengan prosedur ketat — dari verifikasi akun, pembayaran aman, hingga serah terima & garansi purna jual.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://wa.me/6287814897713" className="bg-[#1e3a8a] hover:bg-blue-600 text-white font-inter text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(30,58,138,0.5)]">Proses Sekarang</a>
            <button className="bg-transparent border border-[#1e3a8a] text-white hover:bg-[#1e3a8a]/20 font-inter text-sm font-bold px-6 py-3 rounded-xl transition-all">Pelajari Alur</button>
          </div>
        </div>
        
        {/* Right Steps */}
        <div className="flex flex-col gap-4 w-full">
          {/* STEP 1 */}
          <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
            <div className="text-blue-500 font-mono text-xl font-bold bg-blue-500/10 h-12 w-12 flex items-center justify-center rounded-lg border border-blue-500/20">01</div>
            <div>
              <div className="font-orbitron text-white font-bold tracking-wide">Hubungi Admin</div>
              <div className="font-inter text-xs text-slate-400 mt-1">Chat WA, kirim spek & screenshoot akun</div>
            </div>
          </div>
          {/* STEP 2 */}
          <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
            <div className="text-blue-500 font-mono text-xl font-bold bg-blue-500/10 h-12 w-12 flex items-center justify-center rounded-lg border border-blue-500/20">02</div>
            <div>
              <div className="font-orbitron text-white font-bold tracking-wide">Negosiasi Harga</div>
              <div className="font-inter text-xs text-slate-400 mt-1">Admin cek & berikan penawaran harga terbaik</div>
            </div>
          </div>
          {/* STEP 3 */}
          <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
            <div className="text-blue-500 font-mono text-xl font-bold bg-blue-500/10 h-12 w-12 flex items-center justify-center rounded-lg border border-blue-500/20">03</div>
            <div>
              <div className="font-orbitron text-white font-bold tracking-wide">Transaksi via Rekber</div>
              <div className="font-inter text-xs text-slate-400 mt-1">Pembayaran aman melalui rekening bersama</div>
            </div>
          </div>
          {/* STEP 4 */}
          <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
            <div className="text-blue-500 font-mono text-xl font-bold bg-blue-500/10 h-12 w-12 flex items-center justify-center rounded-lg border border-blue-500/20">04</div>
            <div>
              <div className="font-orbitron text-white font-bold tracking-wide">Garansi Aktif</div>
              <div className="font-inter text-xs text-slate-400 mt-1">Garansi anti hackback setelah serah terima</div>
            </div>
          </div>
        </div>
      </div>
    </GlowCard>
  </div>
</section>



{/* ── SERVICES ── */}
<section className="py-16 lg:py-24" id="services">
  <div className="max-w-7xl mx-auto px-4 lg:px-8">
    <div className="mb-10">
      <div className="eyebrow text-center mb-2">Layanan</div>
      <h2 className="text-center font-orbitron uppercase text-3xl lg:text-4xl font-black text-white mb-6">Lebih dari Sekedar<br/>Jual Beli Akun</h2>
      <p className="font-inter text-sm text-slate-300 leading-relaxed text-center mx-auto max-w-2xl">Kami hadir lengkap — top-up, joki, rekber, hingga komunitas gamer aktif.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
      {/* SERVICE 1 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-sm font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full mb-4 border border-amber-400/20">Top-Up</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wide">Top-Up Game Murah & Legal</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed mb-6">
              Diamond, UC, Robux, dan mata uang game lainnya via ID resmi — proses dalam menit, 100% legal & aman.
            </p>
         </div>
      </GlowCard>

      {/* SERVICE 2 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-sm font-bold text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full mb-4 border border-purple-400/20">Joki Rank</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wide">Jasa Joki Rank Cepat</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed mb-6">
              Push rank FF, ML, PUBG oleh player berpengalaman. Target rank tercapai, garansi tidak drop.
            </p>
         </div>
      </GlowCard>

      {/* SERVICE 3 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-sm font-bold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full mb-4 border border-blue-400/20">Rekber</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wide">Jasa Rekening Bersama</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed mb-6">
              Farid Shop Game siap menjadi perantara transaksi jual beli akun sesama gamer — aman dan terpercaya.
            </p>
         </div>
      </GlowCard>

      {/* SERVICE 4 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-sm font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full mb-4 border border-emerald-400/20">Reseller</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wide">Program Reseller Resmi</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed mb-6">
              Ingin penghasilan tambahan? Gabung jadi reseller akun game bersama Farid Shop Game dan mulai cuan.
            </p>
         </div>
      </GlowCard>
    </div>
  </div>
</section>



{/* ── TRUST ── */}
<section className="py-16 lg:py-24" id="trust">
  <div className="max-w-7xl mx-auto px-4 lg:px-8">
    <div className="mb-10">
      <div className="eyebrow text-center mb-2">Mengapa Kami</div>
      <h2 className="text-center font-orbitron uppercase text-3xl lg:text-4xl font-black text-white mb-10">Keamanan & Kepercayaan<br/>adalah Prioritas Utama</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
      {/* TRUST 1 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-3xl mb-4 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">🛡️</div>
            <h3 className="font-orbitron text-lg font-bold text-white mb-3 tracking-wide">Anti Hackback</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed">
              Setiap akun yang terjual dilindungi dengan garansi anti hackback dari admin.
            </p>
         </div>
      </GlowCard>

      {/* TRUST 2 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-3xl mb-4 bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">✅</div>
            <h3 className="font-orbitron text-lg font-bold text-white mb-3 tracking-wide">Spek Valid & Jelas</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed">
              Seluruh informasi akun ditampilkan jujur — skin, rank, season, dan harga tanpa tipu muslihat.
            </p>
         </div>
      </GlowCard>

      {/* TRUST 3 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-3xl mb-4 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">⚡</div>
            <h3 className="font-orbitron text-lg font-bold text-white mb-3 tracking-wide">Respon 24/7</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed">
              Admin aktif sepanjang hari, responsif, ramah, dan siap membantu segala kebutuhan transaksimu.
            </p>
         </div>
      </GlowCard>

      {/* TRUST 4 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-3xl mb-4 bg-orange-500/10 p-3 rounded-xl border border-orange-500/20">💎</div>
            <h3 className="font-orbitron text-lg font-bold text-white mb-3 tracking-wide">Harga Terjangkau</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed">
              Harga kompetitif dan wajar. Kami tidak markup berlebihan, buyer dan seller sama-sama untung.
            </p>
         </div>
      </GlowCard>
    </div>
  </div>
</section>




{/* ── CTA / NEWSLETTER ── */}
<section className="section" id="contact">
  <div className="max-w-3xl mx-auto w-full">
    <div className="relative flex flex-col items-center w-full border-t border-b border-l border-r border-transparent bg-[#0A0C14]/80 backdrop-blur-md overflow-hidden shadow-[0_0_40px_rgba(79,142,247,0.15)]" style={{ borderImage: 'linear-gradient(to right, #4F8EF7, rgba(79,142,247,0.1)) 1' }}>
      <DotPattern width={20} height={20} cx={1} cy={1} cr={1.5} className="fill-[#4F8EF7]/10" />

      {/* Corner squares */}
      <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-[#4F8EF7] shadow-[0_0_10px_rgba(79,142,247,0.8)] z-20" />
      <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-[#4F8EF7] shadow-[0_0_10px_rgba(79,142,247,0.8)] z-20" />
      <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-[#4F8EF7] shadow-[0_0_10px_rgba(79,142,247,0.8)] z-20" />
      <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-[#4F8EF7] shadow-[0_0_10px_rgba(79,142,247,0.8)] z-20" />

      <div className="w-full flex flex-col items-center text-center p-12 md:p-16 relative z-10">
          <h2 style={{ fontFamily: 'var(--font-geist), sans-serif' }} className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 leading-[1.2] uppercase tracking-tight">
            <span className="text-white drop-shadow-sm">
              Gass buruan temukan akun
            </span><br/>
            <span className="text-[#4F8EF7]">
              barumu di farid shop game
            </span>
          </h2>
        <div className="flex justify-center gap-4 flex-wrap w-full">
          <a href="https://wa.me/6287814897713" className="btn-blue !px-8 !py-3 !text-[15px] shadow-[0_0_15px_rgba(56,189,248,0.4)]">Chat Admin Langsung</a>
          <a href="#komunitas" className="btn-outline !bg-white/10 !backdrop-blur-lg !border !border-white/30 !text-white hover:!bg-white/20 !shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all !px-8 !py-3 !text-[15px]">Gabung Grup Komunitas</a>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ── FOOTER ── */}
<footer>
  <div className="footer-inner">
    <a className="nav-logo" href="#" style={{'textDecoration': 'none'}}>
      <img src="/logo.jpg" alt="Farid Shop Game" style={{ width: "30px", height: "30px", borderRadius: "8px", objectFit: "cover", flexShrink: 0, boxShadow: "0 0 16px rgba(79,142,247,0.4)" }} />
      <span style={{'fontSize': '14px', 'fontWeight': '700', 'color': 'var(--text)'}}>Farid Shop <em style={{'color': '#4F8EF7', 'fontStyle': 'normal'}}>Game</em></span>
    </a>

    <ul className="footer-links">
      <li><a href="#">Syarat &amp; Ketentuan</a></li>
      <li><a href="#">Kebijakan Privasi</a></li>
      <li><a href="#">Garansi Akun</a></li>
      <li><a href="https://wa.me/6287814897713">Hubungi Kami</a></li>
    </ul>

    <div className="footer-social">
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

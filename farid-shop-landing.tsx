'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Shield, Zap, Users, Star, ChevronRight, MessageCircle, Instagram,
  ShoppingCart, TrendingUp, Lock, Repeat, Swords, ArrowRight,
  CheckCircle2, Clock, Handshake, DollarSign, Menu, X, ExternalLink,
  Flame, Crown, Target, Award, Play, ChevronDown
} from 'lucide-react';

// ─── Utility: useInView hook ─────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Marquee Component ───────────────────────────────────────────────────────
const TICKER_ITEMS = [
  { icon: '💎', label: 'Harga Jujur' },
  { icon: '⚔️', label: 'Joki Rank' },
  { icon: '🛡️', label: 'Anti Hackback' },
  { icon: '🤝', label: 'Rekber Ready' },
  { icon: '⚡', label: 'Proses Kilat' },
  { icon: '✅', label: 'Spek Valid' },
  { icon: '🎮', label: 'All Game' },
  { icon: '👑', label: 'Sultan Level' },
];

function Marquee() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="w-full overflow-hidden py-3 select-none">
      <div className="flex gap-0 animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-6 text-sm font-semibold text-slate-300 shrink-0">
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
            <span className="ml-6 text-blue-500/40">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Animated Section Wrapper ─────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Glowing Card ─────────────────────────────────────────────────────────────
function GlowCard({ children, color = 'blue', className = '', onClick }: {
  children: React.ReactNode; color?: string; className?: string; onClick?: () => void;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const glowMap: Record<string, string> = {
    blue: 'rgba(59,130,246,0.35)',
    purple: 'rgba(139,92,246,0.35)',
    emerald: 'rgba(16,185,129,0.35)',
    amber: 'rgba(245,158,11,0.35)',
    red: 'rgba(239,68,68,0.35)',
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const borderColor = {
    blue: 'border-blue-500/40 hover:border-blue-400/80',
    purple: 'border-purple-500/40 hover:border-purple-400/80',
    emerald: 'border-emerald-500/40 hover:border-emerald-400/80',
    amber: 'border-amber-500/40 hover:border-amber-400/80',
    red: 'border-red-500/40 hover:border-red-400/80',
  }[color] ?? 'border-blue-500/40 hover:border-blue-400/80';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0d1326]/90 to-[#050811]/90 backdrop-blur-xl border ${borderColor} transition-all duration-300 cursor-pointer group ${className}`}
      style={{
        boxShadow: hovered
          ? `0 0 40px ${glowMap[color]}, 0 20px 40px -15px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`
          : `0 0 15px ${glowMap[color].replace('0.35', '0.12')}, 0 8px 20px -8px rgba(0,0,0,0.5)`,
      }}
    >
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, ${glowMap[color].replace('0.35', '0.08')}, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ─── Service Icon Box ─────────────────────────────────────────────────────────
function IconBox({ icon: Icon, color }: { icon: React.ElementType; color: string }) {
  const gradients: Record<string, string> = {
    blue: 'from-blue-500 to-blue-700',
    purple: 'from-purple-500 to-purple-700',
    emerald: 'from-emerald-500 to-emerald-700',
    amber: 'from-amber-500 to-amber-700',
    red: 'from-red-500 to-red-700',
    cyan: 'from-cyan-500 to-cyan-700',
  };
  return (
    <div
      className={`w-14 h-14 rounded-[18px] bg-gradient-to-b ${gradients[color] ?? gradients.blue} flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300 ring-1 ring-white/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.2),0_4px_12px_rgba(0,0,0,0.3)] overflow-hidden relative`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon className="w-6 h-6 text-white drop-shadow-md relative z-10" strokeWidth={2} />
    </div>
  );
}

// ─── Eyebrow Label ────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-5">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
      </span>
      {children}
    </div>
  );
}

// ─── Step Card ────────────────────────────────────────────────────────────────
function StepCard({ number, title, desc, color = 'blue', delay = 0 }: {
  number: string; title: string; desc: string; color?: string; delay?: number;
}) {
  const { ref, inView } = useInView(0.3);
  const colors: Record<string, { text: string; shadow: string; ring: string }> = {
    blue: { text: 'text-blue-400', shadow: '0_0_20px_rgba(59,130,246,0.5)', ring: 'ring-white/10' },
    emerald: { text: 'text-emerald-400', shadow: '0_0_20px_rgba(16,185,129,0.5)', ring: 'ring-white/10' },
  };
  const c = colors[color] ?? colors.blue;
  return (
    <div
      ref={ref}
      className={`group relative flex items-center gap-4 p-4 lg:p-5 rounded-[20px] transition-all duration-500 ${inView ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-8'}`}
      style={{
        transitionDelay: `${delay}ms`,
        background: inView ? 'rgba(13,19,32,0.95)' : 'rgba(13,19,32,0.4)',
        boxShadow: inView ? `0 15px 30px -10px rgba(0,0,0,0.5), ${c.shadow}` : 'none',
        border: `1px solid rgba(255,255,255,${inView ? '0.1' : '0.04'})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px] pointer-events-none" />
      <div
        className={`relative z-10 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-b from-[#111827] to-[#0A0C14] ${c.ring} ring-1 rounded-[14px] flex items-center justify-center text-lg lg:text-xl font-black font-mono ${c.text} flex-shrink-0 overflow-hidden transition-all duration-300 group-hover:scale-110`}
        style={{ boxShadow: `inset 0 2px 4px rgba(255,255,255,0.1), ${c.shadow.replace('0.5', '0.2')}` }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10 drop-shadow-md">{number}</span>
      </div>
      <div className="relative z-10">
        <div className={`font-bold text-white text-base lg:text-lg tracking-wide group-hover:${c.text} transition-colors`}>{title}</div>
        <div className="text-slate-400 text-xs lg:text-sm mt-1 group-hover:text-slate-300 transition-colors">{desc}</div>
      </div>
    </div>
  );
}

// ─── Main Landing Page Component ──────────────────────────────────────────────
export default function FaridShopLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('jual-beli');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Layanan', href: '#services' },
    { label: 'Keamanan', href: '#trust' },
    { label: 'Cara Kerja', href: '#workflow' },
    { label: 'Komunitas', href: '#community' },
  ];

  const tabs = [
    { id: 'jual-beli', label: 'Grup Jual Beli', icon: ShoppingCart },
    { id: 'saluran', label: 'Saluran', icon: MessageCircle },
    { id: 'sosmed', label: 'Sosial Media', icon: Instagram },
  ];

  const tabContent: Record<string, { icon: string; label: string; sub: string; color: string; href: string }[]> = {
    'jual-beli': [
      { icon: '🎮', label: 'Grup FF Jual Beli', sub: 'Free Fire Community', color: 'from-orange-500 to-orange-700', href: '#' },
      { icon: '⚔️', label: 'Grup ML Jual Beli', sub: 'Mobile Legends Community', color: 'from-blue-500 to-blue-700', href: '#' },
      { icon: '🧱', label: 'Grup Roblox', sub: 'Roblox Traders', color: 'from-red-500 to-red-700', href: '#' },
    ],
    'saluran': [
      { icon: '📢', label: 'Channel Update Stok', sub: 'Info akun terbaru', color: 'from-blue-500 to-blue-700', href: '#' },
      { icon: '📣', label: 'Channel Promo', sub: 'Harga spesial & diskon', color: 'from-purple-500 to-purple-700', href: '#' },
    ],
    'sosmed': [
      { icon: '📸', label: 'Instagram @faridshopgame', sub: '3.2K Followers', color: 'from-pink-500 to-purple-600', href: '#' },
      { icon: '🎵', label: 'TikTok @faridshopgame', sub: 'Konten gaming', color: 'from-slate-700 to-slate-900', href: '#' },
    ],
  };

  return (
    <div className="min-h-screen bg-[#020711] text-white font-sans antialiased overflow-x-hidden">
      {/* ── CSS Animations ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; }
        h1,h2,h3,h4 { font-family: 'Space Grotesk', system-ui, sans-serif; }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .animate-marquee { animation: marquee 28s linear infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(59,130,246,0.3)} 50%{box-shadow:0 0 40px rgba(59,130,246,0.6)} }
        .animate-pulse-glow { animation: pulse-glow 2.5s ease-in-out infinite; }
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        .shimmer::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent); animation:shimmer 3s ease-in-out infinite; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ── NAVBAR ───────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#020711]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-b from-blue-500 to-blue-700 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),0_4px_12px_rgba(59,130,246,0.4)] ring-1 ring-white/10">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Farid<span className="text-blue-400">Shop</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/6287814897713"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-b from-blue-500 to-blue-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_30px_rgba(59,130,246,0.7)] hover:-translate-y-0.5 transition-all duration-200 ring-1 ring-white/10"
            >
              <MessageCircle className="w-4 h-4" />
              Chat Admin
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/[0.06] bg-[#020711]/95 backdrop-blur-2xl px-4 py-4 flex flex-col gap-2">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/5 font-medium transition-all">
                {l.label}
              </a>
            ))}
            <a href="https://wa.me/6287814897713" className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-b from-blue-500 to-blue-700 text-white">
              <MessageCircle className="w-4 h-4" /> Chat Admin
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
        {/* BG Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-800/8 rounded-full blur-[80px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-700/8 rounded-full blur-[100px]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 lg:px-8 text-center flex flex-col items-center gap-6 z-10">
          {/* Badge */}
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-xs font-bold tracking-[0.15em] uppercase animate-pulse-glow">
              <Crown className="w-3.5 h-3.5" />
              Marketplace Akun Game Terpercaya #1
              <Crown className="w-3.5 h-3.5" />
            </div>
          </FadeUp>

          {/* Headline */}
          <FadeUp delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight uppercase">
              <span className="text-white drop-shadow-sm">GASS BURUAN</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
                TEMUKAN AKUN
              </span>
              <br />
              <span className="text-white drop-shadow-sm">BARUMU DI</span>{' '}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">FARID SHOP</span>
            </h1>
          </FadeUp>

          {/* Subtitle */}
          <FadeUp delay={200}>
            <p className="text-slate-400 text-base lg:text-xl max-w-2xl leading-relaxed">
              Pusat jual beli akun game terpercaya.{' '}
              <span className="text-slate-200 font-semibold">Free Fire, Mobile Legends, Roblox</span>{' '}
              — spek sultan, harga jujur, garansi anti hackback.
            </p>
          </FadeUp>

          {/* CTA Buttons */}
          <FadeUp delay={300}>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/6287814897713"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-b from-blue-500 to-blue-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.2),0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.35),0_0_50px_rgba(59,130,246,0.8)] hover:-translate-y-1 active:scale-95 transition-all duration-200 ring-1 ring-white/15 text-base relative overflow-hidden shimmer"
              >
                <MessageCircle className="w-5 h-5" />
                Chat Admin Langsung
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#community"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold border border-white/10 bg-white/[0.03] backdrop-blur-md text-white hover:bg-white/[0.08] hover:-translate-y-1 active:scale-95 transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.3)] text-base"
              >
                <Users className="w-5 h-5 text-blue-400" />
                Gabung Komunitas
              </a>
            </div>
          </FadeUp>

          {/* Stats Row */}
          <FadeUp delay={400}>
            <div className="flex items-center gap-6 sm:gap-10 mt-2">
              {[
                { num: '5,000+', label: 'Transaksi' },
                { num: '100%', label: 'Anti Hackback' },
                { num: '24/7', label: 'Admin Aktif' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-extrabold text-white">{s.num}</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 inset-x-0 border-t border-white/[0.06] bg-gradient-to-r from-[#020711]/60 via-[#040e20]/60 to-[#020711]/60 backdrop-blur-sm">
          <Marquee />
        </div>
      </section>

      {/* ── TRUST BADGES ─────────────────────────────────────────────────────── */}
      <section id="trust" className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <FadeUp>
            <div className="text-center mb-12">
              <Eyebrow>Mengapa Kami</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight">
                Keamanan & Kepercayaan<br />
                <span className="text-blue-400">adalah Prioritas Utama</span>
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Shield, color: 'emerald', title: 'Anti Hackback', desc: 'Garansi anti hackback dari admin setelah serah terima akun.', delay: 0 },
              { icon: CheckCircle2, color: 'blue', title: 'Spek Valid & Jelas', desc: 'Semua info akun ditampilkan jujur: skin, rank, season, harga.', delay: 100 },
              { icon: Clock, color: 'amber', title: 'Respon 24/7', desc: 'Admin aktif sepanjang hari, responsif, dan ramah.', delay: 200 },
              { icon: DollarSign, color: 'purple', title: 'Harga Terjangkau', desc: 'Harga kompetitif dan wajar. Tidak ada markup berlebihan.', delay: 300 },
            ].map((item) => (
              <FadeUp key={item.title} delay={item.delay}>
                <GlowCard color={item.color} className="h-full animate-float p-6">
                  <IconBox icon={item.icon} color={item.color} />
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES BENTO GRID ───────────────────────────────────────────────── */}
      <section id="services" className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <FadeUp>
            <div className="text-center mb-12">
              <Eyebrow>Layanan Kami</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight">
                Lebih Dari Sekedar<br />
                <span className="text-blue-400">Jual Beli Akun</span>
              </h2>
            </div>
          </FadeUp>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Large: Jual Akun Game */}
            <FadeUp delay={0} className="sm:col-span-2 lg:col-span-2">
              <GlowCard color="blue" className="h-full min-h-[220px]">
                <div className="p-6 lg:p-8 flex flex-col h-full relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 text-8xl opacity-[0.04] group-hover:opacity-[0.1] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none select-none">🛒</div>
                  <IconBox icon={ShoppingCart} color="blue" />
                  <h3 className="text-2xl font-extrabold text-white mb-3 group-hover:text-blue-300 transition-colors">Jual Akun Game</h3>
                  <p className="text-sm text-slate-400 leading-relaxed flex-grow group-hover:text-slate-300 transition-colors">Pusat akun game sultan dan berkualitas dengan harga yang kompetitif. Tersedia berbagai pilihan game populer dari Free Fire hingga Mobile Legends.</p>
                  <a href="https://wa.me/6287814897713" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                    Lihat Katalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </GlowCard>
            </FadeUp>

            {/* Menampung Akun */}
            <FadeUp delay={100}>
              <GlowCard color="emerald" className="h-full min-h-[220px]">
                <div className="p-6 flex flex-col h-full relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 text-7xl opacity-[0.04] group-hover:opacity-[0.1] transition-all duration-700 group-hover:-rotate-12 pointer-events-none select-none">📦</div>
                  <IconBox icon={Repeat} color="emerald" />
                  <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-emerald-300 transition-colors">Menampung Akun</h3>
                  <p className="text-sm text-slate-400 leading-relaxed flex-grow group-hover:text-slate-300 transition-colors">Jual akun game Anda dengan aman dan cepat. Proses penilaian transparan dan pembayaran langsung.</p>
                  <a href="https://wa.me/6287814897713" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                    Jual Sekarang <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </GlowCard>
            </FadeUp>

            {/* Small cards */}
            {[
              { icon: Zap, color: 'amber', title: 'Top-Up Game', desc: 'Diamond, UC, ML, dan semua mata uang game favorit.', emoji: '⚡', delay: 150 },
              { icon: Target, color: 'red', title: 'Jasa Joki Rank', desc: 'Push rank cepat dan aman oleh booster profesional.', emoji: '🎯', delay: 200 },
              { icon: Handshake, color: 'blue', title: 'Rekber', desc: 'Rekening bersama untuk transaksi yang aman di kedua pihak.', emoji: '🤝', delay: 250 },
              { icon: Lock, color: 'purple', title: 'Jasa Pengamanan', desc: 'Rebind dan pengamanan akun secara profesional & terjamin.', emoji: '🔒', delay: 300 },
            ].map(item => (
              <FadeUp key={item.title} delay={item.delay}>
                <GlowCard color={item.color} className="h-full">
                  <div className="p-5 flex flex-col h-full relative overflow-hidden">
                    <div className="absolute -right-3 -bottom-3 text-6xl opacity-[0.04] group-hover:opacity-[0.1] transition-all duration-700 group-hover:-rotate-12 pointer-events-none select-none">{item.emoji}</div>
                    <IconBox icon={item.icon} color={item.color} />
                    <h3 className="font-bold text-white mb-1.5 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKFLOW ──────────────────────────────────────────────────────────── */}
      <section id="workflow" className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/5 via-transparent to-blue-950/5 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <FadeUp>
            <div className="text-center mb-14">
              <Eyebrow>Cara Kerja</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight">
                Alur Transaksi Jelas<br />
                <span className="text-blue-400">& Terjamin Aman</span>
              </h2>
              <p className="text-slate-400 mt-4 text-sm lg:text-base max-w-xl mx-auto">
                Setiap transaksi kami jalani dengan prosedur ketat — dari verifikasi akun, pembayaran aman, hingga serah terima & garansi purna jual.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Steps */}
            <div className="flex flex-col gap-3">
              <StepCard number="01" title="Hubungi Admin" desc="Chat WA, kirim spek & screenshot akun yang diinginkan" delay={0} />
              <StepCard number="02" title="Negosiasi Harga" desc="Admin cek & berikan penawaran harga terbaik" delay={150} />
              <StepCard number="03" title="Transaksi via Rekber" desc="Pembayaran aman melalui rekening bersama terpercaya" delay={300} />
              <StepCard number="04" title="Garansi Aktif" desc="Garansi anti hackback setelah serah terima akun" color="emerald" delay={450} />
            </div>

            {/* Right: Info card */}
            <FadeUp delay={200}>
              <GlowCard color="blue" className="h-full">
                <div className="p-7 lg:p-9 flex flex-col gap-5">
                  <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-1.5 w-fit">
                    <Shield className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wide">100% Anti Hackback</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-extrabold text-white leading-snug">
                    Transaksi Aman,<br />Pembeli & Penjual Sama-sama Untung
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Sistem rekber kami memastikan tidak ada pihak yang dirugikan. Dana pembeli ditahan hingga akun diserahkan dan diverifikasi aman.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {['Verifikasi akun sebelum transaksi', 'Dana ditahan admin selama proses', 'Garansi 1x24 jam setelah serah terima'].map(item => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://wa.me/6287814897713"
                    className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white text-sm bg-gradient-to-b from-blue-500 to-blue-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_35px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 transition-all duration-200 ring-1 ring-white/10"
                  >
                    <MessageCircle className="w-4 h-4" /> Mulai Transaksi
                  </a>
                </div>
              </GlowCard>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY HUB ─────────────────────────────────────────────────────── */}
      <section id="community" className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <FadeUp>
            <div className="text-center mb-10">
              <Eyebrow>Komunitas</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight">
                Gabung Komunitas<br />
                <span className="text-blue-400">Farid Shop Game</span>
              </h2>
              <p className="text-slate-400 mt-3 text-sm max-w-md mx-auto">
                Bergabunglah dengan ribuan gamer yang sudah bertransaksi aman bersama kami.
              </p>
            </div>
          </FadeUp>

          {/* Tabs */}
          <FadeUp delay={100}>
            <div className="flex items-center justify-center gap-2 mb-8 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-1.5 w-fit mx-auto">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeTab === t.id
                      ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex flex-col gap-3">
              {(tabContent[activeTab] ?? []).map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center justify-between p-4 md:p-5 bg-[#0d1320] backdrop-blur-2xl ring-1 ring-white/10 rounded-[20px] hover:ring-blue-500/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-300 hover:-translate-x-1"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-[14px] bg-gradient-to-b ${item.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.15)] ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-bold text-white group-hover:text-blue-300 transition-colors">{item.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
                    </div>
                  </div>
                  <span className="shrink-0 px-4 py-1.5 rounded-xl text-xs font-bold text-blue-400 border border-blue-500/30 bg-blue-500/10 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all flex items-center gap-1.5">
                    GABUNG <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER / FINAL CTA ────────────────────────────────────────────────── */}
      <section id="cta" className="py-20 lg:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-[#020711] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 lg:px-8 relative z-10">
          <FadeUp>
            <div
              className="rounded-3xl border border-blue-500/40 bg-gradient-to-b from-[#0d1326]/90 to-[#050811]/90 backdrop-blur-2xl p-10 lg:p-16 text-center relative overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              {/* Corner dots */}
              {['-top-1.5 -left-1.5', '-top-1.5 -right-1.5', '-bottom-1.5 -left-1.5', '-bottom-1.5 -right-1.5'].map(p => (
                <div key={p} className={`absolute ${p} h-3 w-3 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] z-20`} />
              ))}

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                <span className="animate-ping w-1.5 h-1.5 bg-blue-400 rounded-full" />
                Tunggu Apa Lagi?
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] uppercase tracking-tight mb-6">
                GASS BURUAN TEMUKAN<br />
                <span className="text-blue-400">AKUN BARUMU</span><br />
                DI FARID SHOP GAME
              </h2>

              <p className="text-slate-400 text-sm lg:text-base max-w-lg mx-auto mb-8">
                Bergabung dengan 5,000+ gamer yang sudah transaksi aman. Admin siap 24/7 membantu Anda menemukan akun impian.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/6287814897713"
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-b from-blue-500 to-blue-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.35),0_0_60px_rgba(59,130,246,0.8)] hover:-translate-y-1 active:scale-95 transition-all duration-200 ring-1 ring-white/15 text-base relative overflow-hidden shimmer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat Admin Sekarang
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#community"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold border border-white/10 bg-white/[0.03] backdrop-blur-md text-white hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-200 text-base"
                >
                  <Users className="w-5 h-5 text-blue-400" />
                  Gabung Komunitas
                </a>
              </div>
            </div>
          </FadeUp>

          {/* Footer Note */}
          <FadeUp delay={200}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <span>© 2025 Farid Shop Game. All rights reserved.</span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-blue-500/50" /> Transaksi 100% Aman & Terpercaya
              </span>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}

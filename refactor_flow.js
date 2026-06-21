const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const newFlowSection = `
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
`;

code = code.replace(/\{\/\*\s*──\s*TRANSACTION FLOW\s*──\s*\*\/\}\s*<section className="section" id="flow"[\s\S]*?<\/section>/, newFlowSection);
fs.writeFileSync('app/page.tsx', code);

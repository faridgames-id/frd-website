const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const newFeaturesSection = `
{/* ── FEATURES ── */}
<section className="py-16 lg:py-24" id="features">
  <div className="max-w-7xl mx-auto px-4 lg:px-8">
    <div className="mb-10">
      <div className="eyebrow text-center mb-2">Spesialisasi</div>
      <h2 className="text-center font-orbitron uppercase text-3xl lg:text-4xl font-black text-white mb-10">Tiga Pilar Utama<br/>Farid Shop Game</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
      {/* FEATURE 1 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-3xl mb-4 bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">🔫</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wide">Free Fire (FF)</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed mb-6">
              Spesialis menampung dan menjual spek sultan: OPM, Lumut, Rapper, S1, S2, Poker, Cluber, FJOK, dan banyak lagi.
            </p>
            <div className="w-full mt-auto pt-4 border-t border-slate-800/50">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">Stok Tersedia</span>
                <span className="text-blue-400 font-bold">Banyak</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
         </div>
      </GlowCard>

      {/* FEATURE 2 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-3xl mb-4 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)]">⚔️</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wide">Mobile Legends</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed mb-6">
              Tersedia akun Ternama, Terhormat, Juragan, Sultan, Collab banyak, Legend, hingga akun rare terbatas.
            </p>
            <div className="w-full mt-auto pt-4 border-t border-slate-800/50">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">Pilihan Rank</span>
                <span className="text-amber-400 font-bold">Premium</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
         </div>
      </GlowCard>

      {/* FEATURE 3 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start h-full">
            <div className="text-3xl mb-4 bg-sky-500/10 p-3 rounded-xl border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.3)]">💰</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wide">Budget Tampung</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed mb-6">
              Kami menerima titip dan jual akun game Anda. Budget tampung mulai Rp 100.000 hingga Rp 10.000.000.
            </p>
            <div className="w-full mt-auto pt-4 border-t border-slate-800/50">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">Range Harga</span>
                <span className="text-sky-400 font-bold">Fleksibel</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
         </div>
      </GlowCard>
    </div>
  </div>
</section>
`;

code = code.replace(/\{\/\*\s*──\s*FEATURES\s*──\s*\*\/\}\s*<section className="section" id="features"[\s\S]*?<\/section>/, newFeaturesSection);
fs.writeFileSync('app/page.tsx', code);

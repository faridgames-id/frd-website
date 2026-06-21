const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const newServicesSection = `
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
`;

code = code.replace(/\{\/\*\s*──\s*SERVICES\s*──\s*\*\/\}\s*<section className="section" id="services"[\s\S]*?<\/section>/, newServicesSection);

const newTrustSection = `
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
`;

code = code.replace(/\{\/\*\s*──\s*TRUST\s*──\s*\*\/\}\s*<section className="section" id="trust"[\s\S]*?<\/section>/, newTrustSection);
fs.writeFileSync('app/page.tsx', code);

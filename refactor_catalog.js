const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const newCatalogSection = `
<section className="py-16 lg:py-24" id="catalog">
  <div className="max-w-7xl mx-auto px-4 lg:px-8">
    <div className="mb-10">
      <div className="eyebrow text-center mb-2">Katalog</div>
      <h2 className="text-center font-orbitron uppercase text-3xl lg:text-4xl font-black text-white mb-6">Temukan Akun<br/>Sultan Impianmu</h2>
      <p className="font-inter text-sm text-slate-300 leading-relaxed text-center mx-auto max-w-2xl">Berbagai spek sultan siap jual dengan harga transparan dan spesifikasi lengkap.</p>
    </div>
    
    <div className="flex justify-center mb-10">
      <SearchComponent />
    </div>

    <div className="catalog-filter justify-center mb-10 flex flex-wrap gap-2">
      <button className="filter-btn active">Semua Game</button>
      <button className="filter-btn">Free Fire</button>
      <button className="filter-btn">Mobile Legends</button>
      <button className="filter-btn">Roblox</button>
      <button className="filter-btn">PUBG Mobile</button>
      <button className="filter-btn">Valorant</button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
      
      {/* CARD 1 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start">
            <div className="text-3xl mb-4">🔫</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-2 tracking-wide">Free Fire Sultan</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed line-clamp-3">
               OPM, Lumut, Rapper, S1/S2 Old — spek langka, harga transparan.
            </p>
         </div>
         <div className="w-full mt-6 pt-4 border-t border-slate-800/50 flex flex-row justify-between items-center">
            <span className="font-mono text-lg font-bold text-[#00E5FF] drop-shadow-[0_0_5px_rgba(30,58,138,0.8)]">Rp 150.000</span>
            <button className="bg-[#1e3a8a] text-white font-inter text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Beli</button>
         </div>
      </GlowCard>

      {/* CARD 2 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start">
            <div className="text-3xl mb-4">⚔️</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-2 tracking-wide">MLBB Mythic Glory</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed line-clamp-3">
               Akun Terhormat, Collab banyak, WR tinggi, skin Legend & KOF.
            </p>
         </div>
         <div className="w-full mt-6 pt-4 border-t border-slate-800/50 flex flex-row justify-between items-center">
            <span className="font-mono text-lg font-bold text-[#00E5FF] drop-shadow-[0_0_5px_rgba(30,58,138,0.8)]">Rp 350.000</span>
            <button className="bg-[#1e3a8a] text-white font-inter text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Beli</button>
         </div>
      </GlowCard>

      {/* CARD 3 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start">
            <div className="text-sm font-bold text-[#EA580C] bg-[#EA580C]/10 px-3 py-1 rounded-full mb-4 border border-[#EA580C]/20">FF</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-2 tracking-wide">Akun S1 Old</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed line-clamp-3">
               Set Old Lengkap · OPM · Langka
            </p>
         </div>
         <div className="w-full mt-6 pt-4 border-t border-slate-800/50 flex flex-row justify-between items-center">
            <span className="font-mono text-lg font-bold text-[#00E5FF] drop-shadow-[0_0_5px_rgba(30,58,138,0.8)]">Rp 500.000</span>
            <button className="bg-[#1e3a8a] text-white font-inter text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Beli</button>
         </div>
      </GlowCard>

      {/* CARD 4 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start">
            <div className="text-sm font-bold text-[#EAB308] bg-[#EAB308]/10 px-3 py-1 rounded-full mb-4 border border-[#EAB308]/20">ML</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-2 tracking-wide">Akun Sultan</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed line-clamp-3">
               Skin Legend & KOF · Win Rate Tinggi
            </p>
         </div>
         <div className="w-full mt-6 pt-4 border-t border-slate-800/50 flex flex-row justify-between items-center">
            <span className="font-mono text-lg font-bold text-[#00E5FF] drop-shadow-[0_0_5px_rgba(30,58,138,0.8)]">Rp 750.000</span>
            <button className="bg-[#1e3a8a] text-white font-inter text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Beli</button>
         </div>
      </GlowCard>

      {/* CARD 5 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start">
            <div className="text-sm font-bold text-[#0EA5E9] bg-[#0EA5E9]/10 px-3 py-1 rounded-full mb-4 border border-[#0EA5E9]/20">RBX</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-2 tracking-wide">Roblox Blox Fruits</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed line-clamp-3">
               Level Max & Gamepass Lengkap
            </p>
         </div>
         <div className="w-full mt-6 pt-4 border-t border-slate-800/50 flex flex-row justify-between items-center">
            <span className="font-mono text-lg font-bold text-[#00E5FF] drop-shadow-[0_0_5px_rgba(30,58,138,0.8)]">Rp 200.000</span>
            <button className="bg-[#1e3a8a] text-white font-inter text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Beli</button>
         </div>
      </GlowCard>

      {/* CARD 6 */}
      <GlowCard>
         <div className="w-full flex flex-col items-start">
            <div className="text-sm font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full mb-4 border border-[#F59E0B]/20">PUBG</div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-2 tracking-wide">PUBG Mobile</h3>
            <p className="font-inter text-sm text-slate-300 leading-relaxed line-clamp-3">
               Conqueror & Full Skin M4 Glacier
            </p>
         </div>
         <div className="w-full mt-6 pt-4 border-t border-slate-800/50 flex flex-row justify-between items-center">
            <span className="font-mono text-lg font-bold text-[#00E5FF] drop-shadow-[0_0_5px_rgba(30,58,138,0.8)]">Rp 1.200.000</span>
            <button className="bg-[#1e3a8a] text-white font-inter text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Beli</button>
         </div>
      </GlowCard>
      
    </div>

    <div className="mt-12 flex justify-center gap-4 flex-wrap">
      <a href="https://faridshopgame.vercel.app" className="bg-[#1e3a8a] hover:bg-blue-600 text-white font-inter text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(30,58,138,0.5)]">Lihat Katalog Lengkap →</a>
      <a href="https://wa.me/6287814897713" className="bg-transparent border border-[#1e3a8a] text-white hover:bg-[#1e3a8a]/20 font-inter text-sm font-bold px-6 py-3 rounded-xl transition-all">Tawarkan Akunmu</a>
    </div>
  </div>
</section>
`;

code = code.replace(/<section className="section" id="catalog">[\s\S]*?<\/section>/, newCatalogSection);
fs.writeFileSync('app/page.tsx', code);

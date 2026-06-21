const fs = require('fs');
const path = 'c:\\WEB DAN APLIKASI\\WEBSITE JUBEL\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /\{\/\* ── FEATURES ── \*\/\}\n<section className="py-16 lg:py-24" id="features">[\s\S]*?<\/section>/;

const newSection = `{/* ── SERVICES ── */}
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
</section>`;

if(regex.test(content)) {
  content = content.replace(regex, newSection);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully replaced features section with new services section.');
} else {
  console.log('Regex did not match. Trying alternate regex...');
  const regex2 = /<section className="py-16 lg:py-24" id="features">[\s\S]*?<\/section>/;
  if(regex2.test(content)) {
    content = content.replace(regex2, newSection);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully replaced features section with new services section.');
  } else {
    console.log('Alternate regex also failed.');
  }
}

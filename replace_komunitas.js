const fs = require('fs');
const path = 'c:\\WEB DAN APLIKASI\\WEBSITE JUBEL\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /<section className="py-16 lg:py-24" id="catalog">[\s\S]*?<\/section>/;

const newSection = `<section className="py-16 lg:py-24" id="komunitas">
  <div className="max-w-7xl mx-auto px-4 lg:px-8">
    <div className="mb-12">
      <div className="eyebrow text-center mb-2">Komunitas Jual Beli Akun</div>
      <h2 className="text-center font-orbitron uppercase text-3xl lg:text-4xl font-black text-white mb-6">Bergabung dengan<br/>Komunitas Kami</h2>
      <p className="font-inter text-sm text-slate-300 leading-relaxed text-center mx-auto max-w-2xl">Temukan berbagai grup, saluran, dan sosial media resmi Farid Shop Game untuk update stock, transaksi aman, dan info terbaru.</p>
    </div>

    {/* GRUP JUAL BELI - 6 Kolom */}
    <div className="mb-12">
      <h3 className="font-orbitron text-xl font-bold text-[#4F8EF7] mb-6 flex items-center gap-2">
        <span className="text-2xl">👥</span> Grup Jual Beli
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <GlowCard key={'grup-'+i} className="!p-[1px]">
            <div className="w-full flex flex-col items-center justify-center p-5 text-center bg-[#0d1326]/80 rounded-[14px]">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-2xl mb-3">
                💬
              </div>
              <h4 className="font-inter text-sm font-bold text-white mb-2">Grup {i}</h4>
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
        {[1, 2, 3, 4].map((i) => (
          <GlowCard key={'saluran-'+i} className="!p-[1px]">
            <div className="w-full flex flex-col items-center justify-center p-5 text-center bg-[#0d1326]/80 rounded-[14px]">
              <div className="w-12 h-12 bg-sky-500/10 rounded-full flex items-center justify-center text-2xl mb-3">
                📣
              </div>
              <h4 className="font-inter text-sm font-bold text-white mb-2">Saluran {i}</h4>
              <a href="#" className="text-[11px] font-bold text-white bg-sky-600 hover:bg-sky-500 px-4 py-1.5 rounded-full transition-colors w-full">GABUNG</a>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>

    {/* SOSIAL MEDIA */}
    <div>
      <h3 className="font-orbitron text-xl font-bold text-[#A78BFA] mb-6 flex items-center gap-2">
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
</section>`;

if(regex.test(content)) {
  content = content.replace(regex, newSection);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully replaced catalog section with community section.');
} else {
  console.log('Regex did not match.');
}

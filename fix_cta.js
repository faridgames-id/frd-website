const fs=require('fs');
let c=fs.readFileSync('app/page.tsx','utf8');
const searchStr = `<div className="cta-card">\r\n    <h2>Selalu Update Stok Akun Sultan</h2>\r\n    <p>Daftarkan nomor WhatsApp-mu dan dapatkan notifikasi stok terbaru, promo top-up, dan diskon spesial.</p>\r\n    <div className="cta-form">\r\n      <input type="text" placeholder="Nomor WhatsApp (contoh: 0812xxx)" />\r\n      <button>Kirim</button>\r\n    </div>\r\n    <div style={{'marginTop': '20px', 'display': 'flex', 'justifyContent': 'center', 'gap': '12px', 'flexWrap': 'wrap'}}>\r\n      <a href="https://wa.me/6287814897713" className="btn-blue" style={{'fontSize': '13px', 'padding': '9px 22px'}}>Chat Langsung Admin</a>\r\n      <a href="https://faridshopgame.vercel.app" className="btn-outline" style={{'fontSize': '13px', 'padding': '9px 22px'}}>Gabung Grup Komunitas</a>\r\n    </div>\r\n  </div>`;

const searchStrUnix = searchStr.replace(/\r\n/g, '\n');
let index = c.indexOf(searchStr);
let useStr = searchStr;
if (index === -1) {
  index = c.indexOf(searchStrUnix);
  useStr = searchStrUnix;
}

if (index !== -1) {
  const replacement = `<div className="max-w-3xl mx-auto w-full">\n    <GlowCard className="w-full !p-[1px]">\n      <div className="w-full flex flex-col items-center text-center p-4 md:p-8">\n        <h2 className="font-orbitron text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] leading-tight uppercase tracking-wide">\n          Gass buruan temukan akun<br/><span className="text-[#0EA5E9]">barumu di farid shop game</span>\n        </h2>\n        <div className="flex justify-center gap-4 flex-wrap w-full">\n          <a href="https://wa.me/6287814897713" className="btn-blue !px-8 !py-3 !text-[15px] shadow-[0_0_15px_rgba(56,189,248,0.4)]">Chat Admin Langsung</a>\n          <a href="https://faridshopgame.vercel.app" className="btn-outline !px-8 !py-3 !text-[15px]">Gabung Grup Komunitas</a>\n        </div>\n      </div>\n    </GlowCard>\n  </div>`;
  c = c.substring(0, index) + replacement + c.substring(index + useStr.length);
  fs.writeFileSync('app/page.tsx', c);
  console.log('Successfully replaced the CTA card!');
} else {
  console.log('Search string not found. Trying regex fallback...');
  const reg = /<div className=\"cta-card\">[\s\S]*?Gabung Grup Komunitas<\/a>\s*<\/div>\s*<\/div>/;
  if(reg.test(c)) {
    const replacement = `<div className="max-w-3xl mx-auto w-full">\n    <GlowCard className="w-full !p-[1px]">\n      <div className="w-full flex flex-col items-center text-center p-4 md:p-8">\n        <h2 className="font-orbitron text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] leading-tight uppercase tracking-wide">\n          Gass buruan temukan akun<br/><span className="text-[#0EA5E9]">barumu di farid shop game</span>\n        </h2>\n        <div className="flex justify-center gap-4 flex-wrap w-full">\n          <a href="https://wa.me/6287814897713" className="btn-blue !px-8 !py-3 !text-[15px] shadow-[0_0_15px_rgba(56,189,248,0.4)]">Chat Admin Langsung</a>\n          <a href="https://faridshopgame.vercel.app" className="btn-outline !px-8 !py-3 !text-[15px]">Gabung Grup Komunitas</a>\n        </div>\n      </div>\n    </GlowCard>\n  </div>`;
    c = c.replace(reg, replacement);
    fs.writeFileSync('app/page.tsx', c);
    console.log('Successfully replaced the CTA card via regex!');
  } else {
    console.log('Regex fallback failed as well.');
  }
}

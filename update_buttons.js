const fs = require('fs');
const path = 'c:\\WEB DAN APLIKASI\\WEBSITE JUBEL\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Update Hero Gabung Komunitas button
content = content.replace(
  '<a href="https://faridshopgame.vercel.app" className="btn-outline">Gabung Komunitas</a>',
  '<a href="#komunitas" className="btn-outline !bg-white/10 !backdrop-blur-lg !border !border-white/30 !text-white hover:!bg-white/20 !shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all">Gabung Komunitas</a>'
);

// Update Bottom CTA Gabung Komunitas button
content = content.replace(
  '<a href="https://faridshopgame.vercel.app" className="btn-outline !px-8 !py-3 !text-[15px]">Gabung Grup Komunitas</a>',
  '<a href="#komunitas" className="btn-outline !bg-white/10 !backdrop-blur-lg !border !border-white/30 !text-white hover:!bg-white/20 !shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all !px-8 !py-3 !text-[15px]">Gabung Grup Komunitas</a>'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Buttons updated');

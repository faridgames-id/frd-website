const fs = require('fs');
const path = 'c:\\WEB DAN APLIKASI\\WEBSITE JUBEL\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Grup Jual Beli
content = content.replace(
  'text-[#4F8EF7] mb-6 flex items-center gap-2',
  'text-[#60A5FA] drop-shadow-[0_0_10px_rgba(96,165,250,0.8)] mb-6 flex items-center gap-2'
);

// 2. Saluran Jual Beli
content = content.replace(
  'text-[#38BDF8] mb-6 flex items-center gap-2',
  'text-[#38BDF8] drop-shadow-[0_0_10px_rgba(56,189,248,0.8)] mb-6 flex items-center gap-2'
);

// 3. Sosial Media
content = content.replace(
  'text-[#A78BFA] mb-6 flex items-center gap-2',
  'text-[#C084FC] drop-shadow-[0_0_10px_rgba(192,132,252,0.8)] mb-6 flex items-center gap-2'
);

// 4. Komunitas Kami Title
content = content.replace(
  'text-white mb-6">Bergabung dengan<br/>Komunitas Kami',
  'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-6">Bergabung dengan<br/>Komunitas Kami'
);

// 5. Transaksi Aman Title
content = content.replace(
  'text-white mb-10">Transaksi Aman,<br/>Terstruktur & Bergaransi',
  'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-10">Transaksi Aman,<br/>Terstruktur & Bergaransi'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully brightened texts.');

const fs = require('fs');
const path = 'c:\\WEB DAN APLIKASI\\WEBSITE JUBEL\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Remove the drop-shadows I added
content = content.replace(/ drop-shadow-\[.*?\]/g, '');

// Also ensure the other headings are plain text-white without opacity or shadow
// "Keamanan & Kepercayaan Adalah Prioritas Utama"
// "Lebih Dari Sekedar Jual Beli Akun"
// "Transaksi Aman, Terstruktur & Bergaransi"

content = content.replace(
  'text-slate-200 mb-10">Keamanan & Kepercayaan',
  'text-white mb-10">Keamanan & Kepercayaan'
);

content = content.replace(
  'text-slate-200 mb-10">Lebih Dari Sekedar',
  'text-white mb-10">Lebih Dari Sekedar'
);

content = content.replace(
  'text-slate-200 mb-10">Transaksi Aman,',
  'text-white mb-10">Transaksi Aman,'
);

// If any were text-slate-300, change to text-white
content = content.replace(
  'text-slate-300 mb-10">Keamanan',
  'text-white mb-10">Keamanan'
);

// Let's replace any text-slate-300 or text-slate-200 on those specific H2s just in case
content = content.replace(/text-center font-orbitron uppercase text-3xl lg:text-4xl font-black (text-[a-z0-9-]+) mb-/g, function(match, p1) {
    if (p1 !== 'text-white' && p1 !== 'text-[#4F8EF7]') {
        return match.replace(p1, 'text-white');
    }
    return match;
});

// For "Grup Jual Beli", "Saluran Jual Beli", "Sosial Media"
// I will keep the bright colors I set: #60A5FA, #38BDF8, #C084FC. 
// Without drop-shadow, they will be very crisp and bright.

fs.writeFileSync(path, content, 'utf8');
console.log('Removed glow and brightened headers.');

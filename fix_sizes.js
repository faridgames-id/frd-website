const fs = require('fs');
let page = fs.readFileSync('app/page.tsx', 'utf-8');

// Fix Hero Text clamp
page = page.replace(/clamp\(36px, 5vw, 64px\)/g, 'clamp(28px, 6vw, 64px)');

// Fix Aman 100% / Proses Kilat sizes
page = page.replace(/w-14 h-14 md:w-16 md:h-16/g, 'w-12 h-12 md:w-16 md:h-16');

// Fix Payment Method icons sizes (DANA, SEA Bank, GoPay, QRIS)
page = page.replace(/w-\[64px\] h-\[64px\] md:w-\[72px\] md:h-\[72px\] rounded-\[16px\] md:rounded-\[20px\]/g, 'w-[52px] h-[52px] md:w-[72px] md:h-[72px] rounded-[12px] md:rounded-[20px]');
page = page.replace(/w-7 h-7 md:w-8 md:h-8/g, 'w-5 h-5 md:w-8 md:h-8');

fs.writeFileSync('app/page.tsx', page);
console.log("Sizes adjusted.");

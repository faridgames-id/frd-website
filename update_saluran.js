const fs = require('fs');
const path = 'c:\\WEB DAN APLIKASI\\WEBSITE JUBEL\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
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
      </div>`;

const targetStrUnix = targetStr.replace(/\r\n/g, '\n');

const replacement = `      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {[
          "Saluran Jubel Utama",
          "Saluran Kusus Stock",
          "Saluran Testimonial",
          "Saluran Jual Akun"
        ].map((name, idx) => (
          <GlowCard key={'saluran-'+idx} className="!p-[1px]">
            <div className="w-full flex flex-col items-center justify-center p-5 text-center bg-[#0d1326]/80 rounded-[14px]">
              <div className="w-12 h-12 bg-sky-500/10 rounded-full flex items-center justify-center text-2xl mb-3">
                📣
              </div>
              <h4 className="font-inter text-sm font-bold text-white mb-2">{name}</h4>
              <a href="#" className="text-[11px] font-bold text-white bg-sky-600 hover:bg-sky-500 px-4 py-1.5 rounded-full transition-colors w-full">GABUNG</a>
            </div>
          </GlowCard>
        ))}
      </div>`;

let newContent = content.replace(targetStr, replacement);
if (newContent === content) {
    newContent = content.replace(targetStrUnix, replacement);
}

fs.writeFileSync(path, newContent, 'utf8');
console.log('Saluran names updated!');

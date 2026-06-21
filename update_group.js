const fs = require('fs');
const path = 'c:\\WEB DAN APLIKASI\\WEBSITE JUBEL\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `        {[1, 2, 3, 4, 5, 6].map((i) => (
          <GlowCard key={'grup-'+i} className="!p-[1px]">
            <div className="w-full flex flex-col items-center justify-center p-5 text-center bg-[#0d1326]/80 rounded-[14px]">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-2xl mb-3">
                💬
              </div>
              <h4 className="font-inter text-sm font-bold text-white mb-2">Grup {i}</h4>
              <a href="#" className="text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded-full transition-colors w-full">GABUNG</a>
            </div>
          </GlowCard>
        ))}`;

const targetStrUnix = targetStr.replace(/\r\n/g, '\n');

const replacement = `        {[
          "Grup 1", "Grup 2", "Grup 3", "Grup 4", "Grup 5", "GB Umum"
        ].map((name, idx) => (
          <GlowCard key={'grup-'+idx} className="!p-[1px]">
            <div className="w-full flex flex-col items-center justify-center p-5 text-center bg-[#0d1326]/80 rounded-[14px]">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-2xl mb-3">
                💬
              </div>
              <h4 className="font-inter text-sm font-bold text-white mb-2">{name}</h4>
              <a href="#" className="text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded-full transition-colors w-full">GABUNG</a>
            </div>
          </GlowCard>
        ))}`;

let newContent = content.replace(targetStr, replacement);
if (newContent === content) {
    newContent = content.replace(targetStrUnix, replacement);
}

fs.writeFileSync(path, newContent, 'utf8');
console.log('Group names updated!');

const fs=require('fs');
let c=fs.readFileSync('app/page.tsx','utf8');

c = c.replace(
  "import SearchComponent from '../components/ui/animated-glowing-search-bar';",
  "import SearchComponent from '../components/ui/animated-glowing-search-bar';\nimport DotPattern from '../components/ui/dot-pattern-1';"
);

const searchStr = `<GlowCard className="w-full !p-[1px]">\r\n      <div className="w-full flex flex-col items-center text-center p-4 md:p-8">\r\n          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 leading-[1.2] uppercase tracking-tight">`;
const searchStrUnix = `<GlowCard className="w-full !p-[1px]">\n      <div className="w-full flex flex-col items-center text-center p-4 md:p-8">\n          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 leading-[1.2] uppercase tracking-tight">`;

let index = c.indexOf(searchStr);
let useStr = searchStr;
if (index === -1) {
  index = c.indexOf(searchStrUnix);
  useStr = searchStrUnix;
}

if (index !== -1) {
  const replacement = `<div className="relative flex flex-col items-center w-full border border-sky-500/40 bg-[#0A0C14]/80 backdrop-blur-md overflow-hidden shadow-[0_0_40px_rgba(14,165,233,0.15)]">\n      <DotPattern width={20} height={20} cx={1} cy={1} cr={1.5} className="fill-sky-500/10" />\n\n      {/* Corner squares */}\n      <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)] z-20" />\n      <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)] z-20" />\n      <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)] z-20" />\n      <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)] z-20" />\n\n      <div className="w-full flex flex-col items-center text-center p-12 md:p-16 relative z-10">\n          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 leading-[1.2] uppercase tracking-tight">`;
  
  c = c.substring(0, index) + replacement + c.substring(index + useStr.length);
  
  // also fix closing tag
  c = c.replace(
    "      </div>\r\n    </GlowCard>\r\n  </div>\r\n</section>",
    "      </div>\r\n    </div>\r\n  </div>\r\n</section>"
  );
  c = c.replace(
    "      </div>\n    </GlowCard>\n  </div>\n</section>",
    "      </div>\n    </div>\n  </div>\n</section>"
  );

  fs.writeFileSync('app/page.tsx', c);
  console.log('Successfully changed border to DotPattern style!');
} else {
  console.log('Search string not found!');
}

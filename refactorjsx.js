const fs = require('fs');

let page = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Inject GlowCard component
const glowCardComponent = `
const GlowCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={"relative group isolate rounded-2xl w-full h-full p-[1px] overflow-hidden " + (className || '')}>
    <div className="absolute inset-[-50%] -z-10 blur-[4px] opacity-60 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg_at_50%_50%,#0A0C14_0%,#1e3a8a_25%,#ffffff_50%,#1e3a8a_75%,#0A0C14_100%)] animate-[spin_4s_linear_infinite]"></div>
    <div className="h-full w-full bg-[#0A0C14] rounded-2xl p-6 relative z-10 flex flex-col items-start justify-start border border-[#161925]/50 hover:bg-[#0A0C14]/90 transition-colors">
      {children}
    </div>
  </div>
);
`;

if (!page.includes('const GlowCard')) {
  page = page.replace('export default function Home() {', glowCardComponent + '\\nexport default function Home() {');
}

// 2. Change "COMMUNITY STORE" to white
// The original HTML had: <span style={{'color': '#F97316', 'background': 'linear-gradient(90deg, #F97316 0%, #F59E0B 50%, #F7C948 100%)', '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent'}}>COMMUNITY STORE</span>
page = page.replace(/<span style=\{\{'color': '#F97316'[^>]*\}\}>COMMUNITY STORE<\/span>/g, '<span className="text-white drop-shadow-[0_0_10px_rgba(30,58,138,0.8)]">COMMUNITY STORE</span>');

// 3. Format numbers to font-mono
// Let's replace stats and price manually:
page = page.replace(/<div className="stat-num">([^<]+)<span className="accent">([^<]+)<\/span><\/div>/g, '<div className="stat-num font-mono">$1<span className="accent font-mono">$2</span></div>');

// 4. Wrap the cards by replacing <div className="...card..."> with <GlowCard className="...card...">
// We need to replace the opening tag and its matching closing tag.
const cardClasses = [
  'catalog-hero-card ff',
  'catalog-hero-card ml',
  'catalog-list-card',
  'feature-card accent-blue',
  'feature-card accent-gold',
  'feature-card accent-sky',
  'service-card',
  'trust-card',
  'flow-card'
];

function replaceTag(str, openingClass) {
  let result = str;
  let searchStr = '<div className="' + openingClass + '">';
  let idx = 0;
  
  while ((idx = result.indexOf(searchStr, idx)) !== -1) {
    // Found an opening tag. Now find the matching closing tag.
    let balance = 1;
    let curr = idx + searchStr.length;
    let closingIdx = -1;
    
    while (curr < result.length) {
      if (result.startsWith('<div', curr)) {
        balance++;
      } else if (result.startsWith('</div>', curr)) {
        balance--;
        if (balance === 0) {
          closingIdx = curr;
          break;
        }
      }
      curr++;
    }
    
    if (closingIdx !== -1) {
      // Replace opening
      result = result.substring(0, idx) + '<GlowCard className="' + openingClass + '">' + result.substring(idx + searchStr.length);
      // Because we replaced <div...> (variable length) with <GlowCard...> (variable length), indices shift.
      // But searchStr length is predictable. Let's calculate the shift.
      let shift = ('<GlowCard className="' + openingClass + '">').length - searchStr.length;
      closingIdx += shift;
      
      // Replace closing
      result = result.substring(0, closingIdx) + '</GlowCard>' + result.substring(closingIdx + 6);
      
      idx = closingIdx + '</GlowCard>'.length;
    } else {
      idx += searchStr.length; // Just in case it fails, move forward
    }
  }
  return result;
}

for (const cc of cardClasses) {
  page = replaceTag(page, cc);
}

// 5. Replace arbitrary orange/yellow gradients
page = page.replace(/#F97316|#EF4444|#F59E0B/g, '#1e3a8a');
page = page.replace(/#F7C948/g, '#ffffff');
page = page.replace(/#4F8EF7/g, '#3b82f6'); // adjust standard blues
page = page.replace(/var\(--gold\)/g, '#ffffff'); // some inline styles might use var(--gold)

fs.writeFileSync('app/page.tsx', page);
console.log('Page updated successfully');

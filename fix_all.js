const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// 1. Fix Hamburger leftover
content = content.replace(/\s*\/\/\s*── Hamburger ──\s*\);\s*\}/g, "\n      // ── Hamburger removed ──");

// 2. Fix JSX syntax error
content = content.replace(
  `lineHeight: '1.1', , textTransform: 'uppercase'`,
  `lineHeight: '1.1', textTransform: 'uppercase'`
);

// 3. Inject useState
content = content.replace(
  `export default function Home() {`,
  `export default function Home() {\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);`
);

fs.writeFileSync('app/page.tsx', content);
console.log("All syntax errors fixed");

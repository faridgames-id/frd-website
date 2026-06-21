const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

content = content.replace(
`            // ── Hamburger ──
      );
      }`, 
`            // ── Hamburger removed ──`
);

content = content.replace(
`lineHeight: '1.1', , textTransform: 'uppercase'`,
`lineHeight: '1.1', textTransform: 'uppercase'`
);

fs.writeFileSync('app/page.tsx', content);
console.log("Syntax fixed");

const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// 1. Unhide the text on mobile
content = content.replace(
  '<span className="text-white font-bold text-sm md:text-base hidden sm:block">Farid Shop',
  '<span className="text-white font-bold text-sm md:text-base block">Farid Shop'
);

// 2. Make the logo square (rounded-sm instead of rounded-lg)
content = content.replace(
  'className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover',
  'className="w-8 h-8 md:w-10 md:h-10 rounded-md object-cover'
);

fs.writeFileSync('app/page.tsx', content);
console.log("Navbar logo and text updated");

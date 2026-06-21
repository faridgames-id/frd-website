const fs = require('fs');
const path = require('path');
const filePath = 'c:\\WEB DAN APLIKASI\\WEBSITE JUBEL\\app\\page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Make the stats bar smaller
let newContent = content.replace(
  /<div className="max-w-\[1160px\] mx-auto px-6">/g,
  '<div className="max-w-[800px] mx-auto px-4 mt-6">'
);

// We need to replace all instances of p-6 to p-3, text-3xl to text-2xl, mb-2 to mb-1, text-[15px] to text-[12px]
// But only within the stats bar.
const statsBarStart = newContent.indexOf('<div className="stats-bar">');
const statsBarEnd = newContent.indexOf('</div>', newContent.indexOf('</GlowCard>', statsBarStart));

let statsHtml = newContent.substring(statsBarStart, statsBarEnd);
statsHtml = statsHtml.replace(/p-6/g, 'p-3 py-3');
statsHtml = statsHtml.replace(/text-3xl/g, 'text-2xl');
statsHtml = statsHtml.replace(/mb-2/g, 'mb-1');
statsHtml = statsHtml.replace(/text-\[15px\]/g, 'text-[12px]');

newContent = newContent.substring(0, statsBarStart) + statsHtml + newContent.substring(statsBarEnd);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Stats bar resized!');

const fs = require('fs');
let page = fs.readFileSync('app/page.tsx', 'utf-8');

// Target 1
page = page.replace(/<Script type="module" src="https:\/\/unpkg\.com\/@splinetool\/viewer@1\.9\.3\/build\/spline-viewer\.js" strategy="lazyOnload" \/>/, '');

// Target 2
const removeSplineLogoRegex = /<Script id="remove-spline-logo" strategy="afterInteractive">[\s\S]*?<\/Script>/;
page = page.replace(removeSplineLogoRegex, '');

// Target 3
const giantRobotRegex = /{\/\* ── GIANT ROBOT 3D BACKGROUND.*?── \*\/}\s*<div style={{'display': 'block', 'position': 'absolute', 'top': '0', 'left': '0', 'width': '100%', 'height': '100%', 'zIndex': '0', 'pointerEvents': 'none', 'overflow': 'hidden'}}>\s*<script type="module" src="https:\/\/unpkg\.com\/@splinetool\/viewer@1\.9\.3\/build\/spline-viewer\.js"><\/script>\s*{\/\* @ts-ignore \*\/}\s*<spline-viewer.*?><\/spline-viewer>\s*<\/div>/g;
page = page.replace(giantRobotRegex, '');

fs.writeFileSync('app/page.tsx', page);
console.log("Spline removed.");

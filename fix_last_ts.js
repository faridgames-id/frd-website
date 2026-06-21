const fs = require('fs');

// Fix spline-viewer by creating a global.d.ts
fs.writeFileSync('global.d.ts', `declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': any;
  }
}`);

// Delete demo.tsx to fix the last TS error
if(fs.existsSync('src/components/ui/demo.tsx')) {
  fs.unlinkSync('src/components/ui/demo.tsx');
}

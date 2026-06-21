const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf-8');

const moreMobileCss = `
@media (max-width: 860px) {
  nav { 
    height: 54px !important; 
    border-radius: 20px !important;
  }
  .nav-logo img { width: 26px !important; height: 26px !important; border-radius: 8px !important; }
  .nav-logo span { font-size: 12px !important; margin-left: 6px !important; letter-spacing: 0px !important; }
  .hamburger { padding: 4px !important; }
  .hamburger span { width: 18px !important; height: 1.5px !important; }
}
`;
fs.writeFileSync('app/globals.css', css + moreMobileCss);
console.log("Navbar sizes fixed");

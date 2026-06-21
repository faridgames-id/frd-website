const fs = require('fs');

// 1. Remove the Chat Admin button from mobile menu in page.tsx
let page = fs.readFileSync('app/page.tsx', 'utf-8');
const btnRegex = /<a href="https:\/\/wa\.me\/6287814897713"[^>]*>Chat Admin via WhatsApp<\/a>/g;
page = page.replace(btnRegex, '');
fs.writeFileSync('app/page.tsx', page);

// 2. Reduce mobile menu sizing in globals.css
let css = fs.readFileSync('app/globals.css', 'utf-8');
// Remove .mobile-menu a from the 48px touch targets
css = css.replace('.btn-primary, .btn-outline, .btn-ghost, .social-btn, .mobile-menu a', '.btn-primary, .btn-outline, .btn-ghost, .social-btn');
// Add explicit smaller styles for mobile menu items
css += `
@media (max-width: 860px) {
  .mobile-menu { gap: 0 !important; padding: 12px 16px 16px !important; }
  .mobile-menu a { min-height: 36px !important; padding: 8px 12px !important; font-size: 13px !important; margin-bottom: 2px !important; display: block !important; }
}
`;
fs.writeFileSync('app/globals.css', css);

console.log("Sidebar refined.");

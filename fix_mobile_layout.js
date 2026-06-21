const fs = require('fs');

// --- 1. Modify page.tsx ---
let page = fs.readFileSync('app/page.tsx', 'utf-8');

// A. Insert the Mobile Bottom Action Bar right before </main>
const bottomActionBar = `
      {/* ── MOBILE BOTTOM ACTION BAR ── */}
      <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden bg-black/80 backdrop-blur-md border-t border-white/10 p-3 flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] pb-5">
        <a href="#services" className="flex-1 btn-outline !bg-white/5 !border-white/20 !text-white !text-sm !py-3 flex justify-center items-center font-bold rounded-xl h-[48px]">Katalog</a>
        <a href="https://wa.me/6287814897713" className="flex-1 btn-primary !bg-[#4F8EF7] !shadow-[0_0_15px_rgba(79,142,247,0.4)] !text-sm !py-3 flex justify-center items-center font-bold rounded-xl h-[48px]">Chat WA Admin</a>
      </div>
</main>
`;
page = page.replace('</main>', bottomActionBar);

// B. Spacing & Padding
page = page.replace(/py-16 lg:py-24/g, 'py-10 md:py-24');
page = page.replace(/p-6 lg:p-8/g, 'p-4 md:p-8');
page = page.replace(/p-12 md:p-16/g, 'p-6 md:p-16');

fs.writeFileSync('app/page.tsx', page);


// --- 2. Modify globals.css ---
let css = fs.readFileSync('app/globals.css', 'utf-8');

const additionalCSS = `
/* --- MOBILE LAYOUT REFINEMENTS --- */
@media (max-width: 860px) {
  /* Footer */
  .footer-inner {
    flex-direction: column !important;
    text-align: center !important;
    gap: 20px !important;
    padding: 24px 16px 80px !important; /* Extra bottom padding for floating bar */
  }
  .footer-links {
    justify-content: center !important;
    flex-wrap: wrap !important;
  }
  .footer-bottom {
    flex-direction: column !important;
    gap: 12px !important;
    text-align: center !important;
    padding-bottom: 80px !important;
  }
  
  /* Touch targets */
  .btn-primary, .btn-outline, .btn-ghost, .social-btn, .mobile-menu a {
    min-height: 48px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  
  /* Bento Grid Icons Scaling */
  .services-grid .w-16, .catalog-list .w-16 { width: 40px !important; height: 40px !important; }
  .services-grid .h-16, .catalog-list .h-16 { height: 40px !important; }
  .services-grid .text-4xl, .catalog-list .text-4xl { font-size: 24px !important; }
  
  /* Feature Grid Layout */
  .features-grid {
    grid-template-columns: 1fr !important;
  }
}
`;

css += additionalCSS;
fs.writeFileSync('app/globals.css', css);

console.log("Refinements applied.");

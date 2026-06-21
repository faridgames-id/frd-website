const fs = require('fs');
const path = 'c:\\WEB DAN APLIKASI\\WEBSITE JUBEL\\app\\globals.css';
let content = fs.readFileSync(path, 'utf8');

const target = `    /* ───────────── NAV ───────────── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    }
    .nav-links a:hover { color: var(--text); background: var(--surface-2); }`;

const replacement = `    /* ───────────── NAV ───────────── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 0 24px;
      height: 60px;
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(6,9,16,0.85);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border);
      transition: background var(--transition);
    }
    nav.scrolled { background: rgba(6,9,16,0.9); }

    .nav-logo {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none;
    }
    .nav-logo-mark {
      width: 30px; height: 30px;
      background: linear-gradient(135deg, #4F8EF7, #8BB8FF);
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-weight: 900; font-size: 15px; color: #fff;
      box-shadow: 0 0 16px rgba(79,142,247,0.4);
      flex-shrink: 0;
      font-family: var(--font-orbitron), 'Orbitron', sans-serif;
    }
    .nav-logo span {
      font-size: 15px; font-weight: 800; color: var(--text);
      letter-spacing: 0.5px;
      font-family: var(--font-orbitron), 'Orbitron', sans-serif;
      text-transform: uppercase;
    }
    .nav-logo em { color: var(--blue); font-style: normal; }

    .nav-links {
      display: flex; gap: 2px;
      list-style: none;
    }
    .nav-links a {
      display: block; padding: 6px 14px;
      font-size: 13.5px; font-weight: 500; color: #E2E8F0;
      text-decoration: none; border-radius: var(--radius-sm);
      transition: color var(--transition), background var(--transition);
    }
    .nav-links a:hover { color: var(--text); background: var(--surface-2); }`;

content = content.replace(target.replace(/\r\n/g, '\n'), replacement.replace(/\r\n/g, '\n'));
// handle CRLF if needed
content = content.replace(target, replacement);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed CSS');

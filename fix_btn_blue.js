const fs = require('fs');
const path = 'c:\\WEB DAN APLIKASI\\WEBSITE JUBEL\\app\\globals.css';
let content = fs.readFileSync(path, 'utf8');

const replacement = `
    .btn-primary:hover {
      background: #3B82F6;
      opacity: 1;
      box-shadow: 0 4px 20px rgba(79,142,247,0.4), 0 0 15px rgba(79,142,247,0.3);
      transform: translateY(-1px);
    }

    .btn-blue {
      padding: 10px 22px;
      font-size: 14px; font-weight: 600; color: #fff;
      background: var(--blue);
      border: none; border-radius: 99px; cursor: pointer;
      text-decoration: none;
      transition: opacity var(--transition), box-shadow var(--transition), transform var(--transition);
      box-shadow: 0 0 0 0 var(--blue-glow);
      position: relative;
      overflow: hidden;
    }

    .hero-visual {`;

content = content.replace('    .hero-visual {', replacement);

fs.writeFileSync(path, content, 'utf8');
console.log('Restored btn-blue CSS');

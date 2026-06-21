const fs = require('fs');

const html = fs.readFileSync('Wweb.html', 'utf8');

// Extract style
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  let styleContent = styleMatch[1];
  // Remove :root since we might use Tailwind or keep it
  fs.appendFileSync('app/globals.css', '\n' + styleContent);
}

// Extract body
const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
if (bodyMatch) {
  let bodyContent = bodyMatch[1];
  
  // Convert class= to className=
  bodyContent = bodyContent.replace(/class=/g, 'className=');
  
  // Convert for= to htmlFor=
  bodyContent = bodyContent.replace(/for=/g, 'htmlFor=');
  
  // Convert aria-hidden="true" (keep as is)
  // Convert inline styles to objects (basic regex, not perfect but works for most)
  bodyContent = bodyContent.replace(/style="([^"]*)"/g, (match, styles) => {
    const styleObj = styles.split(';').reduce((acc, style) => {
      if (!style.trim()) return acc;
      let [key, value] = style.split(':');
      if (key && value) {
        key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        acc.push(`${key}: '${value.trim()}'`);
      }
      return acc;
    }, []);
    return `style={{${styleObj.join(', ')}}}`;
  });

  // Convert HTML comments to JSX comments
  bodyContent = bodyContent.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

  // Fix unclosed tags like <br>, <hr>, <img>, <input>
  bodyContent = bodyContent.replace(/<br>/g, '<br/>');
  bodyContent = bodyContent.replace(/<hr>/g, '<hr/>');
  bodyContent = bodyContent.replace(/<input([^>]*[^/])>/g, '<input$1/>');
  bodyContent = bodyContent.replace(/<img([^>]*[^/])>/g, '<img$1/>');

  // Remove <script> tags for now as we'll handle them via React effects or Next.js next/script
  bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  const tsxContent = `
import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      ${bodyContent}
    </>
  );
}
  `;

  fs.writeFileSync('app/page.tsx', tsxContent);
}

console.log('Conversion done.');

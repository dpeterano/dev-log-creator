// Script temporaire pour créer des icônes basiques
const fs = require('fs');
const path = require('path');

// Créer un fichier SVG simple pour l'icône
const svgIcon = `<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="256" height="256" rx="24" ry="24" fill="url(#grad1)"/>
  <text x="128" y="140" font-family="Arial, sans-serif" font-size="120" text-anchor="middle" fill="white">📝</text>
  <text x="128" y="190" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" fill="white">DEV LOG</text>
</svg>`;

// Créer le dossier assets s'il n'existe pas
const assetsDir = path.join(__dirname, 'app', 'assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Écrire le fichier SVG
fs.writeFileSync(path.join(assetsDir, 'icon.svg'), svgIcon);

console.log('✅ Icône SVG créée dans app/assets/icon.svg');
console.log('ℹ️  Pour une vraie icône PNG/ICO, utilisez un outil de conversion ou créez-en une manuellement.');

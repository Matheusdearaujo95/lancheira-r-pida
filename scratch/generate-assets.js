import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

// 1. Hero SVG
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FAF7F2"/>
      <stop offset="50%" stop-color="#F4EFE6"/>
      <stop offset="100%" stop-color="#EBE3D5"/>
    </linearGradient>
    <linearGradient id="boxGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#A2B997"/>
      <stop offset="100%" stop-color="#8DA682"/>
    </linearGradient>
    <linearGradient id="boxInner" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#FBF8F3"/>
    </linearGradient>
    <linearGradient id="breadGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F3DCB3"/>
      <stop offset="100%" stop-color="#E2BA7A"/>
    </linearGradient>
    <linearGradient id="bottleGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FF8A73"/>
      <stop offset="100%" stop-color="#E76A52"/>
    </linearGradient>
    <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#554433" flood-opacity="0.14"/>
    </filter>
    <filter id="innerShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.06"/>
    </filter>
  </defs>

  <!-- Mesa acolhedora com textura suave -->
  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  
  <!-- Linhas sutis de madeira na mesa -->
  <path d="M0 180 Q600 170 1200 180" stroke="#E5DAC9" stroke-width="1.5" opacity="0.6" fill="none"/>
  <path d="M0 360 Q600 370 1200 360" stroke="#E5DAC9" stroke-width="1.5" opacity="0.5" fill="none"/>
  <path d="M0 540 Q600 530 1200 540" stroke="#E5DAC9" stroke-width="1.5" opacity="0.6" fill="none"/>

  <!-- Guardanapo de pano sob a lancheira -->
  <rect x="220" y="80" width="760" height="515" rx="36" fill="#FFFBF5" opacity="0.85" transform="rotate(-1.5 600 337)" filter="url(#softShadow)"/>
  <rect x="235" y="95" width="730" height="485" rx="28" fill="none" stroke="#EFE4D2" stroke-dasharray="8 8" stroke-width="2" transform="rotate(-1.5 600 337)"/>

  <!-- Sombra principal da lancheira -->
  <g filter="url(#softShadow)">
    <!-- Base externa da lancheira (estilo Bento aberta) -->
    <rect x="260" y="115" width="540" height="440" rx="34" fill="url(#boxGrad)"/>
    <rect x="275" y="130" width="510" height="410" rx="26" fill="url(#boxInner)"/>
  </g>

  <!-- Compartimento Principal Esquerdo (Sanduíche de queijo e tomate) -->
  <g filter="url(#innerShadow)">
    <rect x="295" y="150" width="230" height="370" rx="18" fill="#FBF8F2" stroke="#EFE8DC" stroke-width="2"/>
  </g>
  
  <!-- Sanduíche cortado na diagonal -->
  <g transform="translate(315, 175)">
    <!-- Fatia de baixo -->
    <polygon points="10,300 180,300 180,130" fill="#DFC088" rx="8"/>
    <polygon points="12,298 178,298 178,134" fill="url(#breadGrad)"/>
    <!-- Queijo branco derretido/fresco -->
    <polygon points="8,260 190,260 190,240 8,240" fill="#FFFDEB" rx="4"/>
    <!-- Rodelas de tomate cereja -->
    <circle cx="60" cy="245" r="14" fill="#E85D4E"/>
    <circle cx="100" cy="242" r="14" fill="#E85D4E"/>
    <circle cx="140" cy="248" r="14" fill="#E85D4E"/>
    <!-- Folhas de alface suaves -->
    <path d="M20 250 Q40 238 60 252 Q80 236 100 252 Q120 238 140 252 Q160 238 180 250" fill="#93B874"/>
    <!-- Fatia de cima -->
    <polygon points="10,240 180,240 180,70" fill="#CFA86A" rx="8"/>
    <polygon points="12,238 178,238 178,74" fill="url(#breadGrad)"/>
    <!-- Grãos de gergelim no pão -->
    <ellipse cx="70" cy="190" rx="3" ry="1.5" fill="#FFF4DE" transform="rotate(25 70 190)"/>
    <ellipse cx="110" cy="180" rx="3" ry="1.5" fill="#FFF4DE" transform="rotate(-15 110 180)"/>
    <ellipse cx="140" cy="150" rx="3" ry="1.5" fill="#FFF4DE" transform="rotate(35 140 150)"/>
    <ellipse cx="100" cy="210" rx="3" ry="1.5" fill="#FFF4DE" transform="rotate(10 100 210)"/>
  </g>

  <!-- Compartimento Superior Direito (Frutas frescas: morangos e uvas) -->
  <g filter="url(#innerShadow)">
    <rect x="545" y="150" width="220" height="175" rx="18" fill="#FBF8F2" stroke="#EFE8DC" stroke-width="2"/>
  </g>
  
  <!-- Frutas: Morangos apetitosos -->
  <g transform="translate(565, 170)">
    <!-- Morango 1 -->
    <path d="M40 50 C20 50 15 80 40 105 C65 80 60 50 40 50 Z" fill="#E84A3B"/>
    <path d="M30 46 C35 40 45 40 50 46 C45 44 35 44 30 46 Z" fill="#5F8C48"/>
    <circle cx="34" cy="65" r="1.5" fill="#FFD1BA"/>
    <circle cx="44" cy="72" r="1.5" fill="#FFD1BA"/>
    <circle cx="38" cy="85" r="1.5" fill="#FFD1BA"/>
    <circle cx="46" cy="90" r="1.5" fill="#FFD1BA"/>
    
    <!-- Morango 2 (cortado) -->
    <path d="M85 55 C65 55 60 85 85 110 C110 85 105 55 85 55 Z" fill="#E84A3B"/>
    <path d="M75 51 C80 45 90 45 95 51 Z" fill="#5F8C48"/>
    <circle cx="78" cy="70" r="1.5" fill="#FFD1BA"/>
    <circle cx="88" cy="75" r="1.5" fill="#FFD1BA"/>
    <circle cx="82" cy="88" r="1.5" fill="#FFD1BA"/>

    <!-- Uvas sem semente -->
    <circle cx="140" cy="55" r="18" fill="#885A89"/>
    <circle cx="165" cy="68" r="17" fill="#754776"/>
    <circle cx="132" cy="82" r="17" fill="#6B3F6C"/>
    <circle cx="158" cy="95" r="18" fill="#885A89"/>
    <!-- Brilhos nas uvas -->
    <ellipse cx="135" cy="50" rx="4" ry="2" fill="#BA8DBB" opacity="0.7"/>
    <ellipse cx="160" cy="63" rx="4" ry="2" fill="#BA8DBB" opacity="0.7"/>
    <ellipse cx="127" cy="77" rx="4" ry="2" fill="#BA8DBB" opacity="0.7"/>
    <ellipse cx="153" cy="90" rx="4" ry="2" fill="#BA8DBB" opacity="0.7"/>
  </g>

  <!-- Compartimento Inferior Direito (Potinho com cubinhos de queijo e palitinhos) -->
  <g filter="url(#innerShadow)">
    <rect x="545" y="345" width="220" height="175" rx="18" fill="#FBF8F2" stroke="#EFE8DC" stroke-width="2"/>
  </g>
  
  <g transform="translate(565, 365)">
    <!-- Potinho de silicone amarelo manteiga -->
    <rect x="10" y="10" width="180" height="135" rx="14" fill="#FEECC3" stroke="#F6DE9E" stroke-width="2"/>
    
    <!-- Cubos de queijo meia cura -->
    <rect x="30" y="30" width="34" height="34" rx="4" fill="#FCE59F" stroke="#E6CD81" stroke-width="1.5"/>
    <rect x="74" y="26" width="34" height="34" rx="4" fill="#FCE59F" stroke="#E6CD81" stroke-width="1.5"/>
    <rect x="118" y="32" width="34" height="34" rx="4" fill="#FCE59F" stroke="#E6CD81" stroke-width="1.5"/>
    <rect x="50" y="70" width="34" height="34" rx="4" fill="#FCE59F" stroke="#E6CD81" stroke-width="1.5"/>
    <rect x="96" y="68" width="34" height="34" rx="4" fill="#FCE59F" stroke="#E6CD81" stroke-width="1.5"/>
    
    <!-- Palito decorativo fofinho em formato de coração -->
    <line x1="68" y1="20" x2="68" y2="70" stroke="#7CB97A" stroke-width="2.5"/>
    <path d="M68 20 C63 15 58 17 58 22 C58 27 68 33 68 33 C68 33 78 27 78 22 C78 17 73 15 68 20 Z" fill="#E85D4E"/>
  </g>

  <!-- Garrafinha de Água Térmica Acolhedora ao lado -->
  <g filter="url(#softShadow)" transform="translate(830, 130)">
    <!-- Tampa da garrafa -->
    <rect x="42" y="10" width="56" height="38" rx="10" fill="#7FA176"/>
    <rect x="55" y="0" width="30" height="15" rx="6" fill="#6A8D60"/>
    <path d="M48 20 Q70 12 92 20" stroke="#6A8D60" stroke-width="2" fill="none"/>
    
    <!-- Corpo da garrafa coral suave -->
    <rect x="25" y="48" width="90" height="360" rx="30" fill="url(#bottleGrad)"/>
    
    <!-- Faixa decorativa clara -->
    <rect x="25" y="160" width="90" height="80" fill="#FFF4EE" opacity="0.9"/>
    <!-- Ícone de carinho na garrafa -->
    <path d="M70 195 C65 188 56 190 56 198 C56 206 70 216 70 216 C70 216 84 206 84 198 C84 190 75 188 70 195 Z" fill="#FF8A73"/>
    
    <!-- Brilho no corpo -->
    <path d="M38 75 L38 375" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity="0.3"/>
  </g>

  <!-- Detalhe acolhedor: Pequeno bilhete carinhoso de mãe para filho -->
  <g filter="url(#softShadow)" transform="translate(190, 430) rotate(-6)">
    <rect width="130" height="90" rx="8" fill="#FFFDEC" stroke="#EFE6CB" stroke-width="1.5"/>
    <line x1="20" y1="30" x2="110" y2="30" stroke="#8CA086" stroke-width="2" stroke-linecap="round"/>
    <line x1="20" y1="46" x2="95" y2="46" stroke="#8CA086" stroke-width="2" stroke-linecap="round"/>
    <line x1="20" y1="62" x2="75" y2="62" stroke="#8CA086" stroke-width="2" stroke-linecap="round"/>
    <!-- Mini coração no bilhete -->
    <path d="M100 60 C97 56 92 57 92 61 C92 65 100 70 100 70 C100 70 108 65 108 61 C108 57 103 56 100 60 Z" fill="#E85D4E"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(rootDir, "public/images/hero-lancheira.svg"), heroSvg);
console.log("Hero SVG criado com sucesso!");

// 2. Combos SVG Generator
const categoryColors = {
  "Tenho 5 minutos": { bg: "#FFEDE9", accent: "#E85D4E", tag: "5 min", box: "#FFE2DB" },
  "Preparar antes": { bg: "#EFF5EC", accent: "#709765", tag: "Preparar antes", box: "#DFECE0" },
  "Sem geladeira": { bg: "#FFF9E6", accent: "#D19A29", tag: "Sem geladeira", box: "#FEF0CB" },
  "Doces e salgados para variar": {
    bg: "#EBF4F9",
    accent: "#4E88A8",
    tag: "Variar",
    box: "#D7E9F4",
  },
};

const comboIcons = [
  "🥪",
  "🧀",
  "🌯",
  "🥞",
  "🍳",
  "🥣",
  "🍞",
  "🧀",
  "🫓",
  "🐟",
  "🥞",
  "🍕",
  "🧁",
  "🍳",
  "🥞",
  "🍎",
  "🧀",
  "🥟",
  "🥧",
  "🥪",
  "🍌",
  "🍪",
  "🥧",
  "🧇",
  "🧀",
  "🍰",
  "🍪",
  "🍞",
  "🧁",
  "🍪",
  "🥖",
  "🥕",
  "🍙",
  "🥧",
  "🍞",
  "🧀",
];

for (let i = 1; i <= 36; i++) {
  let cat = "Tenho 5 minutos";
  if (i >= 13 && i <= 24) cat = "Preparar antes";
  else if (i >= 25 && i <= 32) cat = "Sem geladeira";
  else if (i >= 33) cat = "Doces e salgados para variar";

  const pal = categoryColors[cat];
  const emoji = comboIcons[i - 1] || "🍱";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
    <defs>
      <linearGradient id="bg_${i}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${pal.bg}"/>
        <stop offset="100%" stop-color="${pal.box}"/>
      </linearGradient>
      <filter id="sh_${i}" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#403020" flood-opacity="0.08"/>
      </filter>
    </defs>
    <rect width="600" height="400" fill="url(#bg_${i})"/>
    
    <!-- Lancheira desenhada -->
    <g filter="url(#sh_${i})">
      <rect x="80" y="50" width="440" height="300" rx="32" fill="#FFFFFF"/>
      <rect x="95" y="65" width="410" height="270" rx="24" fill="#FAF7F2" stroke="#EFE9DE" stroke-width="2"/>
    </g>

    <!-- Compartimentos internos -->
    <!-- Principal -->
    <rect x="115" y="85" width="220" height="230" rx="18" fill="#FFFFFF" stroke="#F2EDE4" stroke-width="2"/>
    <!-- Menor superior -->
    <rect x="350" y="85" width="135" height="105" rx="16" fill="#FFFFFF" stroke="#F2EDE4" stroke-width="2"/>
    <!-- Menor inferior -->
    <rect x="350" y="205" width="135" height="110" rx="16" fill="#FFFFFF" stroke="#F2EDE4" stroke-width="2"/>

    <!-- Elementos visuais -->
    <text x="225" y="215" font-size="78" text-anchor="middle" dominant-baseline="central">${emoji}</text>
    <text x="417" y="137" font-size="44" text-anchor="middle" dominant-baseline="central">🍇</text>
    <text x="417" y="260" font-size="44" text-anchor="middle" dominant-baseline="central">💧</text>

    <!-- Tag visual discreta no topo -->
    <rect x="120" y="95" width="60" height="24" rx="12" fill="${pal.box}"/>
    <text x="150" y="111" font-size="11" font-family="system-ui, sans-serif" font-weight="bold" fill="${pal.accent}" text-anchor="middle">#${i}</text>
  </svg>`;

  fs.writeFileSync(path.join(rootDir, `public/images/combos/combo-${i}.svg`), svg);
}
console.log("36 Combos SVGs criados com sucesso!");

// 3. Guias SVGs
const guiasList = [
  { slug: "ganhar-tempo-no-domingo", icon: "📅", color: "#709765", bg: "#EFF5EC" },
  { slug: "lancheira-em-5-minutos", icon: "⏱️", color: "#E85D4E", bg: "#FFEDE9" },
  { slug: "preparar-na-noite-anterior", icon: "🌙", color: "#4E88A8", bg: "#EBF4F9" },
  { slug: "evitar-mandar-sempre-a-mesma-coisa", icon: "✨", color: "#D19A29", bg: "#FFF9E6" },
  { slug: "trocas-simples", icon: "🔄", color: "#709765", bg: "#EFF5EC" },
  { slug: "checklist-antes-de-fechar", icon: "✅", color: "#E85D4E", bg: "#FFEDE9" },
];

for (const g of guiasList) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 350" width="100%" height="100%">
    <defs>
      <linearGradient id="bg_${g.slug}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${g.bg}"/>
        <stop offset="100%" stop-color="#FFFFFF"/>
      </linearGradient>
    </defs>
    <rect width="600" height="350" fill="url(#bg_${g.slug})"/>
    <circle cx="300" cy="175" r="95" fill="#FFFFFF" opacity="0.9"/>
    <circle cx="300" cy="175" r="85" fill="${g.bg}"/>
    <text x="300" y="185" font-size="75" text-anchor="middle" dominant-baseline="central">${g.icon}</text>
  </svg>`;

  fs.writeFileSync(path.join(rootDir, `public/images/guias/${g.slug}.svg`), svg);
}
console.log("6 Guias SVGs criados com sucesso!");

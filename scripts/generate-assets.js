const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const kuchPaths = `
  <path d="M50.2297 29.2815L78.8655 2.06188H50.6455L30.3431 20.6002L21.0455 20.5826L21.0278 2.06188L0 2V56.846H21.0367L21.0544 37.9717L30.3519 37.9628L50.5925 56.846L78.662 56.8371L50.2297 29.2815Z"/>
  <path d="M131.625 2.01768L131.607 31.474C131.607 38.4225 123.256 40.615 115.586 40.615C115.551 40.615 115.515 40.615 115.48 40.615C107.81 40.615 99.4593 38.4314 99.4593 31.474L99.4416 2.01768L78.0068 2V33.1802C78.0068 47.4309 89.0913 55.1398 103.334 57.288C107.165 57.8626 111.313 58.1986 115.542 58.2074C119.771 58.1986 123.92 57.8626 127.75 57.288C141.984 55.1398 153.068 47.4309 153.068 33.1802V2L131.642 2.01768H131.625Z"/>
  <path d="M199.331 0C211.459 0.84868 224.286 2.88198 230.682 14.6044C232.195 17.3803 232.743 20.5628 233.124 23.7807H211.114C208.336 16.178 195.889 16.4785 188.255 17.7692C186.008 18.1494 183.77 19.1484 182.151 20.5893C179.718 22.7552 179.665 25.7787 179.532 28.7667C179.347 33.1958 181.266 37.0502 185.628 38.5266C188.839 39.6139 192.2 39.8791 195.677 39.8615C202.02 39.8261 208.646 39.2692 211.132 33.1604L233.097 33.1781C231.983 47.7029 221.862 54.3951 208.115 56.4991C199.622 57.7987 191.121 57.781 182.646 56.4107C171.279 54.5808 161.043 49.029 158.761 37.2889C157.469 30.6321 157.478 19.9617 160.69 14.3215C166.272 4.51745 176.878 1.2907 187.795 0.362461L192.032 0H199.339H199.331Z"/>
  <path d="M313.124 56.2435L291.654 56.2258L291.707 37.3515H259.391L259.382 56.2347H237.956L237.965 1.48595L259.373 1.42407L259.382 19.9536L291.698 19.9801L291.707 1.45059H313.124V56.2435Z"/>
`

// 1. OpenGraph Image SVG (1200x630)
const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#09090B"/>
  <circle cx="250" cy="180" r="350" fill="#FF007A" opacity="0.15"/>
  <circle cx="1000" cy="500" r="300" fill="#0055FF" opacity="0.1"/>
  <rect x="40" y="40" width="1120" height="550" rx="24" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none"/>
  <g transform="translate(100, 130) scale(1.75)" fill="#FF007A">
    ${kuchPaths}
  </g>
  <text x="100" y="325" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="42">МАРКЕТИНГОВОЕ АГЕНТСТВО</text>
  <text x="100" y="380" fill="rgba(255, 255, 255, 0.75)" font-family="system-ui, -apple-system, sans-serif" font-size="24">МЫ НЕ БОИМСЯ СЛОЖНОГО. Стратегии, брендинг и перформанс.</text>
  <rect x="100" y="435" width="210" height="44" rx="22" fill="#FF007A" opacity="0.2"/>
  <rect x="100" y="435" width="210" height="44" rx="22" stroke="#FF007A" stroke-width="2" fill="none"/>
  <text x="205" y="463" text-anchor="middle" fill="#FF007A" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="16" letter-spacing="1">KUCH-GROUP.UZ</text>
</svg>`

// 2. Favicon SVG (334x100 - optimized aspect ratio for browser tabs so KUCH logo is crisp and readable)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 334 100" fill="none">
  <rect width="334" height="100" rx="20" fill="#09090B"/>
  <g transform="translate(10, 20.9)" fill="#FF007A">
    ${kuchPaths}
  </g>
</svg>`

// 3. Square Icon SVG (512x512)
const squareIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <rect width="512" height="512" rx="96" fill="#09090B"/>
  <g transform="translate(48, 192) scale(1.33)" fill="#FF007A">
    ${kuchPaths}
  </g>
</svg>`

async function main() {
  const ogDir = path.join(__dirname, '../public/og')
  if (!fs.existsSync(ogDir)) {
    fs.mkdirSync(ogDir, { recursive: true })
  }

  // Generate public/og/default.png
  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(__dirname, '../public/og/default.png'))
  console.log('✓ Created public/og/default.png')

  // Generate app/opengraph-image.png
  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(__dirname, '../app/opengraph-image.png'))
  console.log('✓ Created app/opengraph-image.png')

  // Write SVGs
  fs.writeFileSync(path.join(__dirname, '../public/icon.svg'), faviconSvg)
  fs.writeFileSync(path.join(__dirname, '../app/icon.svg'), faviconSvg)
  console.log('✓ Updated public/icon.svg and app/icon.svg')

  // Generate PNG icons
  await sharp(Buffer.from(squareIconSvg)).resize(512, 512).png().toFile(path.join(__dirname, '../public/icon-512.png'))
  await sharp(Buffer.from(squareIconSvg)).resize(192, 192).png().toFile(path.join(__dirname, '../public/icon-192.png'))
  await sharp(Buffer.from(squareIconSvg)).resize(180, 180).png().toFile(path.join(__dirname, '../public/apple-touch-icon.png'))
  await sharp(Buffer.from(squareIconSvg)).resize(180, 180).png().toFile(path.join(__dirname, '../app/apple-icon.png'))
  await sharp(Buffer.from(faviconSvg)).resize(64, 64).toFile(path.join(__dirname, '../public/favicon.ico'))
  await sharp(Buffer.from(faviconSvg)).resize(64, 64).toFile(path.join(__dirname, '../app/favicon.ico'))
  console.log('✓ Generated high-res PNG icons & favicons')
}

main().catch(console.error)

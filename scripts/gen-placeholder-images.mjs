/**
 * Generates brand-colored placeholder images for all data/* asset paths.
 * Renders an SVG (solid brand-color background + KUCH wordmark + label) to PNG via sharp.
 *
 * Team photos: 3:4 → 600×800
 * Cases posters, Blog covers, Talks posters: 16:9 → 1200×675
 * OG default: already exists, skip if present.
 */

import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '../public')

// Brand palette
const COLORS = {
  pink: '#FF61E5',
  black: '#101010',
  blue: '#95B1FF',
  coral: '#FF618E',
  red: '#FF0048',
  pinkLight: '#FFBEF4',
  white: '#FFFFFF',
}

// Determine text color for contrast
function textColor(bg) {
  // Light backgrounds → black text; dark/vibrant → white
  const light = ['#FFBEF4', '#FFFFFF', '#95B1FF']
  return light.includes(bg) ? '#101010' : '#FFFFFF'
}

/**
 * Build SVG string for a placeholder image.
 * @param {number} w - width
 * @param {number} h - height
 * @param {string} bg - background hex color
 * @param {string} label - short label text
 */
function makeSvg(w, h, bg, label) {
  const fg = textColor(bg)
  const wordmarkSize = Math.round(Math.min(w, h) * 0.12)
  const labelSize = Math.round(Math.min(w, h) * 0.05)
  const wordmarkY = Math.round(h * 0.45)
  const labelY = Math.round(h * 0.62)

  // Escape XML entities in label
  const safeLabel = label
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <text
    x="${w / 2}" y="${wordmarkY}"
    font-family="system-ui, sans-serif"
    font-weight="900"
    font-size="${wordmarkSize}"
    fill="${fg}"
    text-anchor="middle"
    dominant-baseline="middle"
    letter-spacing="4"
  >KUCH</text>
  <text
    x="${w / 2}" y="${labelY}"
    font-family="system-ui, sans-serif"
    font-weight="400"
    font-size="${labelSize}"
    fill="${fg}"
    text-anchor="middle"
    dominant-baseline="middle"
    opacity="0.8"
  >${safeLabel}</text>
</svg>`
}

async function writeImage(relPath, w, h, bg, label) {
  const outPath = path.join(publicDir, relPath)
  // Skip if already a real image (> 5kb) — don't clobber existing assets
  if (fs.existsSync(outPath)) {
    const stat = fs.statSync(outPath)
    if (stat.size > 5000) {
      console.log(`  skip (exists, ${stat.size}b): ${relPath}`)
      return
    }
  }
  const dir = path.dirname(outPath)
  fs.mkdirSync(dir, { recursive: true })

  const svg = makeSvg(w, h, bg, label)
  await sharp(Buffer.from(svg))
    .resize(w, h)
    .jpeg({ quality: 85 })
    .toFile(outPath)
  console.log(`  wrote: ${relPath}`)
}

// ──────────────────────────────────────────────
// TEAM photos — 3:4 → 600×800
// ──────────────────────────────────────────────
const teamImages = [
  { file: 'images/team/mohitobonu.jpg', bg: COLORS.pink,      label: 'CEO / Бренд-стратег' },
  { file: 'images/team/doni.jpg',       bg: COLORS.black,     label: 'Head of Production' },
  { file: 'images/team/alisher.jpg',    bg: COLORS.blue,      label: 'Marketing Director' },
  { file: 'images/team/aziz.jpg',       bg: COLORS.coral,     label: 'Art Director' },
  { file: 'images/team/kamola.jpg',     bg: COLORS.pink,      label: 'Strategy Lead' },
  { file: 'images/team/timur.jpg',      bg: COLORS.black,     label: 'Account Director' },
]

// ──────────────────────────────────────────────
// CASES posters — 16:9 → 1200×675
// ──────────────────────────────────────────────
const caseImages = [
  { file: 'images/cases/wellco.jpg',       bg: COLORS.pink,      label: 'KUCH × Wellco' },
  { file: 'images/cases/gravity.jpg',      bg: COLORS.black,     label: 'KUCH × GRAVITY' },
  { file: 'images/cases/urban-taste.jpg',  bg: COLORS.coral,     label: 'KUCH × Urban Taste' },
  { file: 'images/cases/nomad-tech.jpg',   bg: COLORS.blue,      label: 'KUCH × Nomad Tech' },
  { file: 'images/cases/bloom-beauty.jpg', bg: COLORS.pinkLight, label: 'KUCH × Bloom Beauty' },
  { file: 'images/cases/atlas-finance.jpg',bg: COLORS.black,     label: 'KUCH × Atlas Finance' },
  { file: 'images/cases/green-market.jpg', bg: COLORS.pink,      label: 'KUCH × Green Market' },
]

// ──────────────────────────────────────────────
// BLOG covers — 16:9 → 1200×675
// ──────────────────────────────────────────────
const blogImages = [
  { file: 'images/blog/brand-strategy.jpg',   bg: COLORS.pink,  label: 'Бренд-стратегия' },
  { file: 'images/blog/marketing-trends.jpg', bg: COLORS.blue,  label: 'Тренды маркетинга' },
  { file: 'images/blog/visual-identity.jpg',  bg: COLORS.coral, label: 'Визуальная идентичность' },
  { file: 'images/blog/marketing-metrics.jpg',bg: COLORS.black, label: 'Метрики маркетинга' },
]

// ──────────────────────────────────────────────
// TALKS posters — 16:9 → 1200×675
// ──────────────────────────────────────────────
const talksImages = [
  { file: 'images/talks/talk-01.jpg', bg: COLORS.pink,  label: 'Kuch Talks #01' },
  { file: 'images/talks/talk-02.jpg', bg: COLORS.black, label: 'Kuch Talks #02' },
  { file: 'images/talks/talk-03.jpg', bg: COLORS.blue,  label: 'Kuch Talks #03' },
]

async function main() {
  console.log('Generating team photos (600×800)...')
  for (const img of teamImages) {
    await writeImage(img.file, 600, 800, img.bg, img.label)
  }

  console.log('Generating case posters (1200×675)...')
  for (const img of caseImages) {
    await writeImage(img.file, 1200, 675, img.bg, img.label)
  }

  console.log('Generating blog covers (1200×675)...')
  for (const img of blogImages) {
    await writeImage(img.file, 1200, 675, img.bg, img.label)
  }

  console.log('Generating talks posters (1200×675)...')
  for (const img of talksImages) {
    await writeImage(img.file, 1200, 675, img.bg, img.label)
  }

  console.log('Done.')
}

main().catch(err => { console.error(err); process.exit(1) })

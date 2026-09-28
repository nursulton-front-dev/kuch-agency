// Tailwind CSS v4 installed (not v3).
// v4 is CSS-first: theme tokens belong in `app/globals.css` under `@theme { ... }`.
// This file is intentionally a no-op stub — do NOT add v3-style `theme.extend.colors` here.
// Task 2 MUST add brand color tokens via @theme in globals.css, not in this file.
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
}

export default config

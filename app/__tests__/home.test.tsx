import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

test('home renders the slogan and the cases + about + services anchors', () => {
  const { container } = render(<Home />)
  // Slogan is split into a censor poster + an sr-only readable copy (Hero & Ton of voice).
  expect(screen.getAllByText(/мы не боимся сложного/i).length).toBeGreaterThan(0)
  expect(container.querySelector('#cases')).toBeInTheDocument()
  expect(container.querySelector('#about')).toBeInTheDocument()
  expect(container.querySelector('#services')).toBeInTheDocument()
  expect(container.querySelector('#pricing')).toBeInTheDocument()
})

test('home composes the landing sections', () => {
  const { container } = render(<Home />)
  expect(container.querySelectorAll('section').length).toBeGreaterThan(8)
  // Flagship case + service title appear (each may recur across sections).
  expect(screen.getAllByText('Маркетинговая стратегия').length).toBeGreaterThan(0)
  expect(screen.getAllByText(/KUCH × Fido/).length).toBeGreaterThan(0)
})

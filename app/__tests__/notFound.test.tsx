import { render, screen } from '@testing-library/react'
import NotFound from '@/app/not-found'
import { LanguageProvider } from '@/lib/context/LanguageContext'

describe('NotFound page', () => {
  it('renders 404 title, badge and action links', () => {
    render(
      <LanguageProvider>
        <NotFound />
      </LanguageProvider>
    )

    expect(screen.getAllByText('404').length).toBeGreaterThan(0)
    expect(screen.getByText(/ERROR 404/i)).toBeInTheDocument()
    expect(screen.getByText('МЫ БЕРЁМСЯ ЗА СЛОЖНОЕ, НО ЭТОЙ СТРАНИЦЫ ЗДЕСЬ НЕТ')).toBeInTheDocument()
    expect(screen.getByText('На главную')).toBeInTheDocument()
    expect(screen.getByText('Онлайн Бриф')).toBeInTheDocument()
  })
})

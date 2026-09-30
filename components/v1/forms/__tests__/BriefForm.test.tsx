import { render, screen, fireEvent } from '@testing-library/react'
import { BriefForm } from '../BriefForm'

test('BriefForm step by step navigation and completion', async () => {
  render(<BriefForm />)

  // Step 1: Select project type
  const projectTypeBtn = screen.getByText('Бренд-стратегия')
  fireEvent.click(projectTypeBtn)

  const nextBtn = screen.getByText('Далее')
  fireEvent.click(nextBtn)

  // Step 2: Fill task
  const taskTextarea = screen.getByPlaceholderText(/Расскажите о проекте/i)
  fireEvent.change(taskTextarea, { target: { value: 'Разработка новой бренд-стратегии для компании' } })
  fireEvent.click(screen.getByText('Далее'))

  // Step 3: Select budget (options check)
  expect(screen.getByText('от $6 000')).toBeInTheDocument()
  expect(screen.getByText('$6 000 — $10 000')).toBeInTheDocument()
  expect(screen.getByText('$10 000 — $30 000')).toBeInTheDocument()
  expect(screen.getByText('от $30 000')).toBeInTheDocument()
  expect(screen.getByText('Не определён')).toBeInTheDocument()

  fireEvent.click(screen.getByText('$6 000 — $10 000'))
  fireEvent.click(screen.getByText('Далее'))

  // Step 4: Select timeline (options check)
  expect(screen.queryByText('Срочно (до 2 недель)')).toBeNull()
  expect(screen.getByText('1 месяц')).toBeInTheDocument()
  expect(screen.getByText('2–3 месяца')).toBeInTheDocument()
  expect(screen.getByText('3–6 месяцев')).toBeInTheDocument()
  expect(screen.getByText('Гибко')).toBeInTheDocument()

  fireEvent.click(screen.getByText('1 месяц'))
  fireEvent.click(screen.getByText('Далее'))

  // Step 5: Fill contact details and submit
  fireEvent.change(screen.getByPlaceholderText('Ваше имя'), { target: { value: 'Тест' } })
  fireEvent.change(screen.getByPlaceholderText('info@kuch-group.uz или +998 97 719 94 47'), {
    target: { value: 'info@kuch-group.uz' },
  })

  fireEvent.click(screen.getByText('Отправить бриф'))

  expect(await screen.findByText('Бриф принят!')).toBeInTheDocument()
})

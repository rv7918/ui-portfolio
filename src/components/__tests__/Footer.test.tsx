import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Footer from '../Footer'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Footer', () => {
  it('renders Home link', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
  })

  it('renders Contact link', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders LinkedIn link', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
  })

  it('has correct footer structure', () => {
    const { container } = renderWithRouter(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('w-full', 'bg-[#faf9f7]')
  })
})


import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../Navbar'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Navbar', () => {
  it('renders the brand name', () => {
    renderWithRouter(<Navbar />)
    expect(screen.getByText(/design &/i)).toBeInTheDocument()
    expect(screen.getByText(/develop/i)).toBeInTheDocument()
  })

  it('renders Home link', () => {
    renderWithRouter(<Navbar />)
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/home')
  })

  it('renders About link', () => {
    renderWithRouter(<Navbar />)
    const aboutLink = screen.getByRole('link', { name: /about/i })
    expect(aboutLink).toBeInTheDocument()
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('has correct navigation structure', () => {
    const { container } = renderWithRouter(<Navbar />)
    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass('w-full', 'bg-zinc-800')
  })

  it('renders all navigation links', () => {
    renderWithRouter(<Navbar />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThanOrEqual(3) // Brand + Home + About
  })
})


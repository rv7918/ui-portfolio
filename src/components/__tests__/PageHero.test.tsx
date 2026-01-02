import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PageHero from '../PageHero'

describe('PageHero', () => {
  const mockData = {
    title: 'Test Title',
    summaryLong: 'Test summary text',
  }

  it('renders title when provided', () => {
    render(<PageHero data={mockData} />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders summary when provided', () => {
    render(<PageHero data={mockData} />)
    expect(screen.getByText('Test summary text')).toBeInTheDocument()
  })

  it('handles missing data gracefully', () => {
    const { container } = render(<PageHero data={null} />)
    // Should not throw error
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('handles undefined data', () => {
    const { container } = render(<PageHero data={undefined} />)
    // Should not throw error
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('has correct section structure', () => {
    const { container } = render(<PageHero data={mockData} />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('w-full', 'bg-sky-100')
  })
})


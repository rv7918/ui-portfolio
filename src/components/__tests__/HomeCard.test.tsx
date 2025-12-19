import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HomeCard from '../HomeCard'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('HomeCard', () => {
  const mockCaseStudy = {
    sys: { id: '123' },
    title: 'Test Case Study',
    summary: 'This is a test summary',
    slug: 'test-case-study',
    thumbnail: {
      url: 'https://example.com/image.jpg',
    },
  }

  it('renders case study title', () => {
    renderWithRouter(<HomeCard caseStudy={mockCaseStudy} />)
    expect(screen.getByText('Test Case Study')).toBeInTheDocument()
  })

  it('renders case study summary', () => {
    renderWithRouter(<HomeCard caseStudy={mockCaseStudy} />)
    expect(screen.getByText('This is a test summary')).toBeInTheDocument()
  })

  it('renders thumbnail image with correct alt text', () => {
    renderWithRouter(<HomeCard caseStudy={mockCaseStudy} />)
    const image = screen.getByAltText('Test Case Study')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('links to correct case study detail page', () => {
    renderWithRouter(<HomeCard caseStudy={mockCaseStudy} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/case/test-case-study')
  })

  it('handles missing thumbnail gracefully', () => {
    const caseStudyWithoutThumbnail = {
      ...mockCaseStudy,
      thumbnail: null,
    }
    renderWithRouter(<HomeCard caseStudy={caseStudyWithoutThumbnail} />)
    const image = screen.getByAltText('Test Case Study')
    expect(image).toBeInTheDocument()
  })

  it('has correct card structure', () => {
    const { container } = renderWithRouter(<HomeCard caseStudy={mockCaseStudy} />)
    const card = container.querySelector('div')
    expect(card).toHaveClass('border', 'rounded-lg', 'p-6')
  })
})


import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Hero from '../Hero'
import * as homepageApi from '../../api/homepage.graphql'

// Mock the API
vi.mock('../../api/homepage.graphql', () => ({
  getHomepageData: vi.fn(),
}))

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
}

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('Hero', () => {
  it('renders loading state', () => {
    vi.mocked(homepageApi.getHomepageData).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    renderWithQueryClient(<Hero />)
    expect(screen.getByText(/Loading/i)).toBeInTheDocument()
  })

  it('renders error state', async () => {
    vi.mocked(homepageApi.getHomepageData).mockRejectedValue(
      new Error('API Error')
    )

    renderWithQueryClient(<Hero />)
    // Wait for error state
    expect(await screen.findByText(/Error/i)).toBeInTheDocument()
  })

  it('renders headline and subheadline when data is loaded', async () => {
    const mockData = {
      siteIntroCollection: {
        items: [
          {
            headline: 'Test Headline',
            subheadline: 'Test Subheadline',
          },
        ],
      },
    }

    vi.mocked(homepageApi.getHomepageData).mockResolvedValue(mockData)

    renderWithQueryClient(<Hero />)
    
    expect(await screen.findByText('Test Headline')).toBeInTheDocument()
    expect(await screen.findByText('Test Subheadline')).toBeInTheDocument()
  })

  it('has correct section structure', async () => {
    const mockData = {
      siteIntroCollection: {
        items: [
          {
            headline: 'Test Headline',
            subheadline: 'Test Subheadline',
          },
        ],
      },
    }

    vi.mocked(homepageApi.getHomepageData).mockResolvedValue(mockData)

    const { container } = renderWithQueryClient(<Hero />)
    await screen.findByText('Test Headline')
    
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('w-full', 'bg-sky-800')
  })
})


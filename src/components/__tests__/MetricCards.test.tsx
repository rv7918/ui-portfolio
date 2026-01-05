import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MetricCards from '../MetricCards'

describe('MetricCards', () => {
  const mockMetrics = [
    {
      title: 'Data load speed',
      metric: '2.4s → 1.2s',
      description: '↑50%',
    },
    {
      title: 'User engagement',
      metric: '+30%',
      description: 'dashboard interaction',
    },
    {
      title: 'Error reduction',
      metric: '-25%',
    },
  ]

  it('renders title when provided', () => {
    render(<MetricCards title="Validation Results" metrics={mockMetrics} />)
    expect(screen.getByText('Validation Results')).toBeInTheDocument()
  })

  it('does not render title when not provided', () => {
    const { container } = render(<MetricCards metrics={mockMetrics} />)
    const title = container.querySelector('h2')
    expect(title).not.toBeInTheDocument()
  })

  it('renders all metric cards', () => {
    render(<MetricCards metrics={mockMetrics} />)
    expect(screen.getByText('Data load speed')).toBeInTheDocument()
    expect(screen.getByText('User engagement')).toBeInTheDocument()
    expect(screen.getByText('Error reduction')).toBeInTheDocument()
  })

  it('renders metric values', () => {
    render(<MetricCards metrics={mockMetrics} />)
    expect(screen.getByText('2.4s → 1.2s')).toBeInTheDocument()
    expect(screen.getByText('+30%')).toBeInTheDocument()
    expect(screen.getByText('-25%')).toBeInTheDocument()
  })

  it('renders descriptions when provided', () => {
    render(<MetricCards metrics={mockMetrics} />)
    expect(screen.getByText('↑50%')).toBeInTheDocument()
    expect(screen.getByText('dashboard interaction')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    render(<MetricCards metrics={mockMetrics} />)
    const errorReductionCard = screen.getByText('Error reduction').closest('div')
    const description = errorReductionCard?.querySelector('p.text-blue-600')
    expect(description).not.toBeInTheDocument()
  })

  it('applies correct grid columns class for 2 columns', () => {
    const { container } = render(<MetricCards metrics={mockMetrics} columns={2} />)
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2')
  })

  it('applies correct grid columns class for 4 columns', () => {
    const { container } = render(<MetricCards metrics={mockMetrics} columns={4} />)
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4')
  })

  it('applies correct grid columns class for 1 column', () => {
    const { container } = render(<MetricCards metrics={mockMetrics} columns={1} />)
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1')
  })

  it('applies correct grid columns class for 3 columns', () => {
    const { container } = render(<MetricCards metrics={mockMetrics} columns={3} />)
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
  })

  it('renders correct number of metric cards', () => {
    const { container } = render(<MetricCards metrics={mockMetrics} />)
    const cards = container.querySelectorAll('.bg-white.rounded-lg')
    expect(cards).toHaveLength(3)
  })

  it('has correct card structure and styling', () => {
    const { container } = render(<MetricCards metrics={mockMetrics} />)
    const card = container.querySelector('.bg-white.rounded-lg')
    expect(card).toHaveClass(
      'bg-white',
      'rounded-lg',
      'p-6',
      'shadow-sm',
      'border',
      'border-gray-100',
      'h-55',
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'text-center'
    )
  })

  it('handles empty metrics array', () => {
    const { container } = render(<MetricCards metrics={[]} />)
    const cards = container.querySelectorAll('.bg-white.rounded-lg')
    expect(cards).toHaveLength(0)
  })

  it('renders metric titles with correct styling', () => {
    render(<MetricCards metrics={mockMetrics} />)
    const title = screen.getByText('Data load speed')
    expect(title).toHaveClass('text-base', 'font-medium', 'text-gray-900', 'mb-2')
  })

  it('renders metric values with correct styling', () => {
    const { container } = render(<MetricCards metrics={mockMetrics} />)
    const metricValue = container.querySelector('.text-2xl.font-bold')
    expect(metricValue).toBeInTheDocument()
    expect(metricValue).toHaveClass('text-2xl', 'font-bold', 'text-gray-900')
  })

  it('renders descriptions with correct styling', () => {
    const { container } = render(<MetricCards metrics={mockMetrics} />)
    const description = container.querySelector('.text-sm.text-blue-600')
    expect(description).toBeInTheDocument()
    expect(description).toHaveClass('text-sm', 'text-blue-600')
  })
})


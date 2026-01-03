import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import RichText from '../RichText'

describe('RichText', () => {
  const mockContent = {
    nodeType: 'document',
    data: {},
    content: [
      {
        nodeType: 'paragraph',
        data: {},
        content: [
          {
            nodeType: 'text',
            value: 'Test paragraph text',
            marks: [],
            data: {},
          },
        ],
      },
    ],
  }

  it('renders content when provided', () => {
    render(<RichText content={mockContent} />)
    expect(screen.getByText('Test paragraph text')).toBeInTheDocument()
  })

  it('returns null when content is not provided', () => {
    const { container } = render(<RichText content={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('returns null when content is undefined', () => {
    const { container } = render(<RichText content={undefined} />)
    expect(container.firstChild).toBeNull()
  })

  it('applies default className', () => {
    const { container } = render(<RichText content={mockContent} />)
    const div = container.querySelector('div')
    expect(div).toHaveClass('prose', 'max-w-none', 'text-gray-700')
  })

  it('applies custom className when provided', () => {
    const { container } = render(
      <RichText content={mockContent} className="custom-class" />
    )
    const div = container.querySelector('div')
    expect(div).toHaveClass('custom-class')
  })

  it('handles line breaks in text', () => {
    const contentWithBreaks = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Line 1\nLine 2',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    }
    render(<RichText content={contentWithBreaks} />)
    expect(screen.getByText(/Line 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Line 2/i)).toBeInTheDocument()
  })

  it('handles paragraph with no children', () => {
    const contentWithEmptyParagraph = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [],
        },
      ],
    }
    const { container } = render(<RichText content={contentWithEmptyParagraph} />)
    expect(container.querySelector('p')).toBeInTheDocument()
  })

  it('handles paragraph with single child (not array)', () => {
    const contentWithSingleChild = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Single child text',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    }
    render(<RichText content={contentWithSingleChild} />)
    expect(screen.getByText('Single child text')).toBeInTheDocument()
  })

  it('handles text without line breaks', () => {
    const contentWithoutBreaks = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Simple text without breaks',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    }
    render(<RichText content={contentWithoutBreaks} />)
    expect(screen.getByText('Simple text without breaks')).toBeInTheDocument()
  })

  it('handles multiple line breaks in text', () => {
    const contentWithMultipleBreaks = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Line 1\nLine 2\nLine 3',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    }
    render(<RichText content={contentWithMultipleBreaks} />)
    expect(screen.getByText(/Line 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Line 2/i)).toBeInTheDocument()
    expect(screen.getByText(/Line 3/i)).toBeInTheDocument()
  })

  it('handles non-string children in paragraph', () => {
    const contentWithNonString = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Text with ',
              marks: [],
              data: {},
            },
            {
              nodeType: 'text',
              value: 'multiple parts',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    }
    render(<RichText content={contentWithNonString} />)
    expect(screen.getByText(/Text with/i)).toBeInTheDocument()
    expect(screen.getByText(/multiple parts/i)).toBeInTheDocument()
  })

  it('handles paragraph with string child that has no line breaks (parts.length === 1)', () => {
    const contentWithSinglePart = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Simple text',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    }
    render(<RichText content={contentWithSinglePart} />)
    expect(screen.getByText('Simple text')).toBeInTheDocument()
  })

  it('handles paragraph with string child that has line breaks (parts.length > 1)', () => {
    const contentWithLineBreaks = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'First line\nSecond line',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    }
    const { container } = render(<RichText content={contentWithLineBreaks} />)
    expect(screen.getByText(/First line/i)).toBeInTheDocument()
    expect(screen.getByText(/Second line/i)).toBeInTheDocument()
    // Check that br tags are rendered
    const brTags = container.querySelectorAll('br')
    expect(brTags.length).toBeGreaterThan(0)
  })

  it('covers branch when parts.length === 1 (no line breaks in string)', () => {
    // This test specifically targets the branch where parts.length === 1
    const contentNoBreaks = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Single line text',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    }
    render(<RichText content={contentNoBreaks} />)
    expect(screen.getByText('Single line text')).toBeInTheDocument()
  })

  it('covers branch when parts.length > 1 (has line breaks)', () => {
    // This test specifically targets the branch where parts.length > 1
    const contentWithBreaks = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Line1\nLine2',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    }
    const { container } = render(<RichText content={contentWithBreaks} />)
    // Verify br tags are created when parts.length > 1
    const brTags = container.querySelectorAll('br')
    expect(brTags.length).toBeGreaterThan(0)
  })

  it('covers branch when node is not a string', () => {
    // This test covers the branch where typeof node !== 'string'
    const contentWithNonString = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Text',
              marks: [{ type: 'bold' }],
              data: {},
            },
          ],
        },
      ],
    }
    render(<RichText content={contentWithNonString} />)
    expect(screen.getByText('Text')).toBeInTheDocument()
  })

  it('handles paragraph with array of children containing strings with and without breaks', () => {
    const contentWithMixed = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'No breaks',
              marks: [],
              data: {},
            },
            {
              nodeType: 'text',
              value: 'Has\nbreaks',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    }
    render(<RichText content={contentWithMixed} />)
    expect(screen.getByText(/No breaks/i)).toBeInTheDocument()
    expect(screen.getByText(/Has/i)).toBeInTheDocument()
    expect(screen.getByText(/breaks/i)).toBeInTheDocument()
  })
})


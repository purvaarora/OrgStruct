import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { UserTree } from './userTree'
import { type UserNode } from '../../utils/heirarchy'

// Mock sample data for testing
const mockUserNodes: UserNode[] = [
  {
    id: 1,
    email: 'john.doe@company.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password123',
    photo: 'https://example.com/john.jpg',
    children: [
      {
        id: 2,
        email: 'jane.smith@company.com',
        firstName: 'Jane',
        lastName: 'Smith',
        password: 'password456',
        managerId: 1,
        children: [
          {
            id: 4,
            email: 'bob.wilson@company.com',
            firstName: 'Bob',
            lastName: 'Wilson',
            password: 'password789',
            photo: 'https://example.com/bob.jpg',
            managerId: 2,
            children: [],
          },
        ],
      },
      {
        id: 3,
        email: 'alice.johnson@company.com',
        firstName: 'Alice',
        lastName: 'Johnson',
        password: 'password101',
        managerId: 1,
        children: [],
      },
    ],
  },
  {
    id: 5,
    email: 'mike.brown@company.com',
    firstName: 'Mike',
    lastName: 'Brown',
    password: 'password202',
    photo: 'https://example.com/mike.jpg',
    children: [
      {
        id: 6,
        email: 'sarah.davis@company.com',
        firstName: 'Sarah',
        lastName: 'Davis',
        password: 'password303',
        managerId: 5,
        children: [],
      },
    ],
  },
]

const emptyNodes: UserNode[] = []

const singleNode: UserNode[] = [
  {
    id: 1,
    email: 'single.user@company.com',
    firstName: 'Single',
    lastName: 'User',
    password: 'password123',
    photo: undefined,
    managerId: undefined,
    children: [],
  },
]

describe('UserTree', () => {
  it('renders nothing when nodes array is empty', () => {
    const { container } = render(<UserTree nodes={emptyNodes} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a single user node', () => {
    render(<UserTree nodes={singleNode} />)

    expect(screen.getByText(/single.user@company.com/)).toBeInTheDocument()
  })

  it('renders multiple root level users with children', () => {
    render(<UserTree nodes={mockUserNodes} />)

    expect(screen.getByText(/john.doe@company.com/)).toBeInTheDocument()
    expect(screen.getByText(/mike.brown@company.com/)).toBeInTheDocument()

    expect(screen.getByText(/jane.smith@company.com/)).toBeInTheDocument()
    expect(screen.getByText(/alice.johnson@company.com/)).toBeInTheDocument()
    expect(screen.getByText(/sarah.davis@company.com/)).toBeInTheDocument()
  })

  it('renders user initials when photo is not available', () => {
    render(<UserTree nodes={mockUserNodes} />)

    // Check for initials
    expect(screen.getByText('JS')).toBeInTheDocument() // Jane Smith
    expect(screen.getByText('AJ')).toBeInTheDocument() // Alice Johnson
    expect(screen.getByText('SD')).toBeInTheDocument() // Sarah Davis
  })
})

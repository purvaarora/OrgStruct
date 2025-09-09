import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { type DB, type User } from './types/db'

vi.mock('./hooks/useDB', () => ({ useDB: vi.fn() }))
vi.mock('./hooks/useAuth.hook', () => ({ useAuth: vi.fn() }))
vi.mock('./components/common/loadingSpinner', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}))

import { useDB } from './hooks/useDB'
import { useAuth } from './hooks/useAuth.hook'

const mockUseDB = vi.mocked(useDB)
const mockUseAuth = vi.mocked(useAuth)

const mockUser: User = {
  id: 1,
  firstName: 'Purva',
  lastName: 'Arora',
  email: 'purva.arora@example.com',
  password: 'test12345',
}

const renderApp = () =>
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )

describe('App', () => {
  const mockLogin = vi.fn()
  const mockLogout = vi.fn()

  const unauthenticatedUser = (overrides = {}) =>
    mockUseAuth.mockReturnValue({
      user: null,
      login: mockLogin,
      logout: mockLogout,
      error: '',
      loading: false,
      ...overrides,
    })

  const authenticatedUser = (overrides = {}) =>
    mockUseAuth.mockReturnValue({
      user: mockUser,
      login: mockLogin,
      logout: mockLogout,
      error: '',
      loading: false,
      ...overrides,
    })

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseDB.mockReturnValue({ loading: false, db: {} as DB, error: null })
    unauthenticatedUser()
  })

  it('redirects logged out users to login page', async () => {
    window.history.pushState({}, '', '/')
    renderApp()
    expect(
      await screen.findByRole('button', { name: /login/i }),
    ).toBeInTheDocument()
  })

  it('redirects logged in users to heirarchy page', async () => {
    authenticatedUser()
    window.history.pushState({}, '', '/')
    renderApp()
    expect(await screen.findByText(/Heirarchy Tree/i)).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { LoginForm } from './loginForm'

describe('LoginForm', () => {
  const mockHandleLogin = vi.fn()

  beforeEach(() => {
    mockHandleLogin.mockClear()
  })

  const defaultProps = {
    handleLogin: mockHandleLogin,
    error: '',
    loading: false,
  }

  it('renders login form with email and password fields', () => {
    render(<LoginForm {...defaultProps} />)

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('renders error message when error prop is provided', () => {
    const errorMessage = 'Invalid credentials'
    render(<LoginForm {...defaultProps} error={errorMessage} />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(screen.getByText(errorMessage)).toHaveClass('error')
  })

  it('calls handleLogin with correct credentials when form is submitted', async () => {
    const user = userEvent.setup()
    render(<LoginForm {...defaultProps} />)

    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    expect(mockHandleLogin).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
    )
    expect(mockHandleLogin).toHaveBeenCalledTimes(1)
  })

  it('requires email and password fields', async () => {
    const user = userEvent.setup()

    render(<LoginForm {...defaultProps} />)

    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.click(submitButton)

    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })

  it('validates email field', async () => {
    const user = userEvent.setup()

    render(<LoginForm {...defaultProps} />)

    const emailInput = screen.getByLabelText(/email address/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, 'test1234')
    await user.click(submitButton)

    expect(screen.getByText('Enter a valid email')).toBeInTheDocument()
  })
})

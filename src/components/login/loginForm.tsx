import { useState } from 'react'
import './loginForm.css'

type LoginFormProps = {
  handleLogin: (email: string, password: string) => Promise<void>
  error: string
  loading: boolean
}

export const LoginForm = ({ handleLogin, error, loading }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // Basic email validation for required and pattern
  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError('Email is required')
      return false
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setEmailError('Enter a valid email')
      return false
    }
    setEmailError('')
    return true
  }
  
  // Basic password validation for required
  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError('Password is required')
      return false
    }
    setPasswordError('')
    return true
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isEmailValid = validateEmail()
    const isPasswordValid = validatePassword()
    if (!isEmailValid || !isPasswordValid) return
    handleLogin(email, password)
  }

  return (
    <div className="login-container">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">email address:</label>
          <div className="input-wrapper">
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError('')
              }}
              onBlur={validateEmail}
            />
            {emailError && <div className="field-error">{emailError}</div>}
          </div>

        </div>

        <div className="form-group">
          <label htmlFor="password">password:</label>
          <div className="input-wrapper">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (passwordError) setPasswordError('')
              }}
              onBlur={validatePassword}
            />
            {passwordError && <div className="field-error">{passwordError}</div>}
          </div>
        </div>

        <div className="button-container">
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  )
}

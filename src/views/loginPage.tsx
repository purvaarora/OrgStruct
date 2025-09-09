/**
 * Login page component that displays login form
 */

import { LoginForm } from '../components/login/loginForm'

type LoginPageProps = {
  handleLogin: (email: string, password: string) => Promise<void>
  error: string
  loading: boolean
}

export const LoginPage = ({ handleLogin, error, loading }: LoginPageProps) => {
  return (
    <>
      <LoginForm handleLogin={handleLogin} error={error} loading={loading} />
    </>
  )
}

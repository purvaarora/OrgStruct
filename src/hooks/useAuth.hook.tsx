import { useEffect, useState } from 'react'
import { useDB } from './useDB'
import { type User } from '../types/db'
import { getUserBySecret } from '../services/userService'
import { encode } from '../utils/encode'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { db } = useDB()

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User)
    }
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError('')

    try {
      if (!db) {
        setError('Database not loaded. Please try again.')
        return
      }

      const loggedInUser = getUserBySecret(db, encode(email, password))
      if (loggedInUser) {
        setUser(loggedInUser);
        setError('');
        sessionStorage.setItem('user', JSON.stringify(loggedInUser));
      } else {
        setError('Invalid Credentials!')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('user')
  }

  return { user, login, logout, loading, error }
}

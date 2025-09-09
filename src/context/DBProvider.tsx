import { useEffect, useState, type ReactNode } from 'react'
import { DBContext } from './DBContext'
import { API_ENDPOINTS } from '../constants/constants'
import { type DB } from '../types/db'

interface DBProviderProps {
  children: ReactNode
}

export const DBProvider = ({ children }: DBProviderProps) => {
  const [db, setDb] = useState<DB | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(API_ENDPOINTS.USERS)
        if (!res.ok) throw new Error('Failed to fetch DB')
        const data: DB = await res.json()
        setDb(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <DBContext.Provider value={{ db, loading, error }}>
      {children}
    </DBContext.Provider>
  )
}

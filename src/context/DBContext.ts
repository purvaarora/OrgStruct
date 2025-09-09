import { createContext } from 'react'
import { type DB } from '../types/db'

interface DBContextType {
  db: DB | null
  loading: boolean
  error: Error | null
}

export const DBContext = createContext<DBContextType>({
  db: null,
  loading: true,
  error: null,
})

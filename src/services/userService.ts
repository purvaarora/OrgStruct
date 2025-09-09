// services/userService.ts
import { type DB, type User } from '../types/db'

export const getUserById = (db: DB | null, id: number): User | undefined =>
  db?.users.find((u) => u.id === id)

export const getUserBySecret = (
  db: DB | null,
  secret: string,
): User | undefined => {
  if (!db) return undefined
  const userId = db.secrets[secret]
  if (!userId) return undefined
  return getUserById(db, userId)
}

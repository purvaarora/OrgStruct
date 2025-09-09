/**
 * User service functions for authentication and user management
 */
import { type DB, type User } from '../types/db'

/**
 * Retrieves a user by their id from database
 * @param db The database object
 * @param id The user id to search for
 * @returns user object or undefined
 */

export const getUserById = (db: DB | null, id: number): User | undefined =>
  db?.users.find((u) => u.id === id)

/**
 * Retrieves a user by their auth secret
 * @param db The database object
 * @param secret The auth secret
 * @returns user object or undefined
 */

export const getUserBySecret = (
  db: DB | null,
  secret: string,
): User | undefined => {
  if (!db) return undefined
  const userId = db.secrets[secret]
  if (!userId) return undefined
  return getUserById(db, userId)
}

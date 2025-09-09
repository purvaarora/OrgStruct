export type User = {
  email: string
  firstName: string
  id: number
  lastName: string
  password: string
  photo?: string
  managerId?: number
}

export type DB = {
  secrets: Record<string, number>
  users: Array<User>
}

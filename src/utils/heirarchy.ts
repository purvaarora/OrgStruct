import { type User } from '../types/db'

export type UserNode = User & { children: Array<UserNode> }

export function returnHeirarchyTree(users: User[]): UserNode[] {
  const roots: Array<UserNode> = []
  const usersMap: Record<number, UserNode> = {}

  users.forEach((user) => {
    usersMap[user.id] = {
      ...user,
      children: [],
    }
  })

  users.forEach((user) => {
    if (user.managerId) {
      const manager = usersMap[user.managerId]
      if (manager) {
        manager.children.push(usersMap[user.id])
      }
    } else {
      roots.push(usersMap[user.id])
    }
  })

  return roots
}

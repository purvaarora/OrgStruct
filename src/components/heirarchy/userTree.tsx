import React from 'react'
import { type UserNode } from '../../utils/heirarchy'
import { UserItem } from './userItem'

type UserTreeProps = {
  nodes: Array<UserNode>
}

export const UserTree: React.FC<UserTreeProps> = ({ nodes }) => {
  if (!nodes.length) return null

  return (
    <ul className='heirarchy-list'>
      {nodes.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  )
}

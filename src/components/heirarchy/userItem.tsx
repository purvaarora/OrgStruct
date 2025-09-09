/**
 * Individual user item component in the hierarchy tree
 */

import React, { useState, useMemo } from 'react'
import { type UserNode } from '../../utils/heirarchy'
import { UserTree } from './userTree'
import { FaMinus, FaPlus } from 'react-icons/fa'
import './userItem.css'
import { UserAvatar } from './userAvatar'

type UserItemProps = {
  user: UserNode
}

export const UserItem: React.FC<UserItemProps> = React.memo(({ user }) => {
  const [expanded, setExpanded] = useState(true)
  const hasChildren = user.children.length > 0

  const userInitials = useMemo(
    () => `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`,
    [user.firstName, user.lastName],
  )

  const onToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded((prev) => !prev)
  }

  return (
    <li style={{ listStyle: 'none' }}>
      <div className="user-item">
        <span className="user-icon">
          {hasChildren ? (
            <FaPlus onClick={onToggle} />
          ) : (
            <FaMinus className="disabled" />
          )}
        </span>
        <span className="user-avatar">
          <UserAvatar userPhoto={user.photo} altText={userInitials} />
        </span>
        <span className="user-details">
          {user.firstName} {user.lastName} {user.email}
        </span>
      </div>

      {expanded && hasChildren && (
        <div className="user-item-children">
          <UserTree nodes={user.children} />
        </div>
      )}
    </li>
  )
})

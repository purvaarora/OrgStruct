/**
 * Heirarchy page component that displays organizational tree
 */
import { useMemo } from 'react'
import { UserTree } from '../components/heirarchy/userTree'
import { returnHeirarchyTree } from '../utils/heirarchy'
import { useDB } from '../hooks/useDB'

export const HeirarchyPage = () => {
  const { db } = useDB()
  const heirarchy = useMemo(
    // Memoize heirarchy tree to avoid unnecessary re-renders
    () => returnHeirarchyTree(db?.users ?? []),
    [db?.users],
  )
  return (
    <>
      <UserTree nodes={heirarchy} />
    </>
  )
}

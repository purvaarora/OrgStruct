import { useMemo } from 'react'
import { UserTree } from '../components/heirarchy/userTree'
import { returnHeirarchyTree } from '../utils/heirarchy'
import { useDB } from '../hooks/useDB'

export const HeirarchyPage = () => {
  const { db } = useDB()
  const hierarchy = useMemo(
    () => returnHeirarchyTree(db?.users ?? []),
    [db?.users],
  )
  return (
    <>
      <UserTree nodes={hierarchy} />
    </>
  )
}

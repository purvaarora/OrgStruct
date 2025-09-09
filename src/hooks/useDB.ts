import { useContext } from 'react'
import { DBContext } from '../context/DBContext'

export const useDB = () => useContext(DBContext)

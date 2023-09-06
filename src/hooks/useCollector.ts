import { useContext } from 'react'
import { CollectorContext } from '../context/CollectorContext'

export const useCollector = () => {
  return useContext(CollectorContext)
}

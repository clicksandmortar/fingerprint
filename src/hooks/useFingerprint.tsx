import { useContext } from 'react'
import { FingerprintContext } from '../context/FingerprintContext'

// @todo update based on refactor of FingerprintContext
export const useFingerprint = () => {
  const { booted } = useContext(FingerprintContext)

  return {
    booted
  }
}

import { useContext } from 'react'
import { FingerprintContext } from '../context/FingerprintContext'

export const useFingerprint = () => {
  const { session } = useContext(FingerprintContext)

  return {
    session
  }
}

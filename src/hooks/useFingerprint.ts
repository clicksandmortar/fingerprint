import { useContext } from 'react'
import { FingerprintContext } from '../context/FingerprintContext'

export const useFingerprint = () => {
  return useContext(FingerprintContext)
}

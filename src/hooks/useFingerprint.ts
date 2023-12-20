import { useDifiStore } from '../beautifulSugar/store'

// TODO: remove re-export
export const useFingerprint = () => useDifiStore((s) => s.difiProps)

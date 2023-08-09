import { uuidValidateV4 } from '../utils/uuid'

export const validVisitorId = (id: string) => {
  return uuidValidateV4(id)
}

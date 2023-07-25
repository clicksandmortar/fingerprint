import { validate as uuidValidate, version as uuidVersion } from 'uuid'

export const uuidValidateV4 = (uuid: string) => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4
}

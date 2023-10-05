import { v4 as uuidv4 } from 'uuid'
import { Visitor } from './types'
import { validVisitorId } from './utils'
import { getCookie, setCookie } from '../utils/cookies'
import { cookieAccountJWT } from '../context/FingerprintContext'

export const bootstrapVisitor = ({
  setVisitor
}: {
  setVisitor: (session: Visitor) => void
}) => {
  const visitor: Visitor = {
    id: undefined
  }

  if (getCookie(cookieAccountJWT)) {
    visitor.jwt = getCookie(cookieAccountJWT)
  }

  if (!getCookie('_cm_id') || !validVisitorId(getCookie('_cm_id') as string)) {
    const visitorId = uuidv4()

    setCookie('_cm_id', visitorId, 365)

    visitor.id = visitorId

    setVisitor(visitor)

    return
  }

  if (getCookie('_cm_id')) {
    visitor.id = getCookie('_cm_id')

    setVisitor(visitor)
  }
}

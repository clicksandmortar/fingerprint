import { v4 as uuidv4 } from 'uuid'
import { Visitor } from './types'
import { validVisitorId } from './utils'
import { getCookie, setCookie } from '../utils/cookies'
import { Session } from '../sessions/types'

export const bootstrapVisitor = ({
  setVisitor,
  session,
  setSession
}: {
  setVisitor: (session: Visitor) => void
  session: Session
  setSession: (session: Session) => void
}) => {
  const visitor: Visitor = {
    id: undefined
  }

  if (!getCookie('_cm_id') || !validVisitorId(getCookie('_cm_id') as string)) {
    const visitorId = uuidv4()

    const { sessionId, endTime } = getSessionIdAndEndTime(getCookie('_cm_id'))

    setCookie(
      '_cm_id',
      `${visitorId}|${sessionId}|${endTime.toISOString()}.`,
      365
    )

    visitor.id = visitorId
    session.id = sessionId
    session.endTime = endTime
    setSession(session)

    setVisitor(visitor)

    return
  }

  if (getCookie('_cm_id')) {
    const c = getCookie('_cm_id') as string
    const [visitorId] = c.split('|')
    const { sessionId, endTime } = getSessionIdAndEndTime(getCookie('_cm_id'))

    setCookie(
      '_cm_id',
      `${visitorId}|${sessionId}|${endTime.toISOString()}.`,
      365
    )

    visitor.id = visitorId
    setVisitor(visitor)

    session.id = sessionId
    session.endTime = endTime
    setSession(session)
  }
}

const getSessionIdAndEndTime = (
  cookieData: string | undefined
): { sessionId: string; endTime: Date } => {
  const t = new Date()
  t.setMinutes(t.getMinutes() + 30)

  let sessionId
  const endTime = t
  // Handle session cookie pices
  if (!cookieData || hasCookieValueExpired(cookieData)) {
    sessionId = uuidv4()
  } else {
    const c = cookieData as string
    const [, sessId] = c.split('|')
    sessionId = sessId
  }

  return {
    sessionId,
    endTime
  }
}

const hasCookieValueExpired = (cookieData: string | undefined): Boolean => {
  if (!cookieData) return true
  const cookieSplit = cookieData.split('|')
  if (cookieSplit.length > 1) {
    const timestampString = cookieSplit[cookieSplit.length - 1]
    const expiryTimeEpoch = Date.parse(timestampString)
    const expiryTime = new Date()
    expiryTime.setTime(expiryTimeEpoch)
    const n = new Date()
    if (n > expiryTime) {
      return true
    }
  }
  return false
}

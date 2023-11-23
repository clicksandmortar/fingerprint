import { v4 as uuidv4 } from 'uuid'
import { cookieAccountJWT } from '../context/FingerprintContext'
import { Session } from '../sessions/types'
import { getCookie } from '../utils/cookies'
import { Visitor } from './types'
import { validVisitorId } from './utils'

export const buildCookie = ({ visitorId }: { visitorId: string }) => {
  const { sessionId, endTime } = getSessionIdAndEndTime(getCookie('_cm_id'))

  return `${visitorId}|${sessionId}|${endTime.toISOString()}`
}

const updateUUID = (
  cookieData: string | undefined,
  uuid: string
): string | null => {
  if (!cookieData) return null

  const cookieSplit = cookieData.split('|')

  if (cookieSplit.length <= 2) return null

  const visitorId = cookieSplit[0]
  if (visitorId === uuid) return null

  const sessionId = cookieSplit[1]
  const endTime = cookieSplit[2]

  return `${uuid}|${sessionId}|${endTime}`
}

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

  if (getCookie(cookieAccountJWT)) {
    visitor.jwt = getCookie(cookieAccountJWT)
  }

  if (typeof window !== 'undefined') {
    // Check if `v_id` is in the query parameters
    const urlParams = new URLSearchParams(window.location.search)
    const vid = urlParams.get('v_id')
    if (vid) {
      visitor.id = vid
    }
  }

  if (
    (!visitor.id && !getCookie('_cm_id')) ||
    !validVisitorId(getCookie('_cm_id') as string)
  ) {
    const visitorId = uuidv4()
    visitor.id = visitorId
  }

  if (!visitor.id && getCookie('_cm_id')) {
    const c = getCookie('_cm_id') as string
    const [visitorId] = c.split('|')
    visitor.id = visitorId
  }

  const { sessionId, endTime } = getSessionIdAndEndTime(getCookie('_cm_id'))

  const combinedCookie = buildCookie({ visitorId: visitor.id as string })

  session.id = sessionId
  session.endTime = endTime
  setSession(session)

  setVisitor(visitor)
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
    let [, sessId] = c.split('|')
    if (sessId === 'undefined' || sessId === undefined) {
      sessId = uuidv4()
    }
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

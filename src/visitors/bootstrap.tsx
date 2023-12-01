import { v4 as uuidv4 } from 'uuid'
import { cookieAccountJWT } from '../context/FingerprintContext'
import { Session } from '../sessions/types'
import { getCookie, setCookie } from '../utils/cookies'
import { uuidValidateV4 } from '../utils/uuid'
import { Visitor } from './types'
import { validVisitorId } from './utils'

export const CnMCookie = '_cm_id'

// sort of temporary. We can remove this once all cookies have been updated with domains
export function interceptFixCookieForSubdomains() {
  const cookie = getCookie(CnMCookie)
  if (!cookie) return

  const splitHostname = location.host.split('.')

  // one.two.three. ... .site.com => .site.com
  const cookieSiteName =
    '.' + splitHostname.splice(splitHostname.length - 2, Infinity).join('.')

  console.log('BOOT: setting cookie to ', {
    CnMCookie,
    cookie,
    domain: cookieSiteName
  })

  return setCookie(CnMCookie, cookie, 365, { domain: cookieSiteName })
}

export const buildCookie = ({ visitorId }: { visitorId: string }) => {
  const { sessionId, endTime } = getSessionIdAndEndTime(getCookie(CnMCookie))

  return `${visitorId}|${sessionId}|${endTime.toISOString()}`
}

const updateCookieUUID = (
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

export const updateCookie = (uuid: string) => {
  if (!uuidValidateV4(uuid)) return

  const cookie = getCookie(CnMCookie)
  const newCookie = updateCookieUUID(cookie, uuid)
  if (!newCookie) return

  setCookie(CnMCookie, newCookie, 365)
  console.log('BOOT: in updateCookie')
  interceptFixCookieForSubdomains()
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
    if (vid) visitor.id = vid

    const sourceId = urlParams.get('source_id')
    if (sourceId) visitor.sourceId = sourceId
  }

  if (
    (!visitor.id && !getCookie(CnMCookie)) ||
    !validVisitorId(getCookie(CnMCookie) as string)
  ) {
    const visitorId = uuidv4()
    visitor.id = visitorId
  }

  if (!visitor.id && getCookie(CnMCookie)) {
    const c = getCookie(CnMCookie) as string
    const [visitorId] = c.split('|')
    visitor.id = visitorId
  }

  const combinedCookie = buildCookie({ visitorId: visitor.id as string })
  setCookie(CnMCookie, combinedCookie, 365)
  // backwards compatibility baby!
  interceptFixCookieForSubdomains()

  const { sessionId, endTime } = getSessionIdAndEndTime(getCookie(CnMCookie))
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

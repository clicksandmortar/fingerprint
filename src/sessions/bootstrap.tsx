import { Session } from './types'
import { getCookie, setCookie } from '../utils/cookies'
import { v4 as uuidv4 } from 'uuid'


export const bootstrapSession = ({
  appId,
  setSession
}: {
  appId: string
  setSession: (session: Session) => void
}) => {
  const session: Session = {
    firstVisit: undefined,
  }
  const t = new Date()
  t.setMinutes(t.getMinutes() + 30)

  // Handle session cookie pices
  if (!getCookie('_cm_session') || hasCookieValueExpired(getCookie('_cm_session'))) {
    session.id = uuidv4()
  } else {
    const c = getCookie('_cm_session') as string;
    const [sessionId] = c.split('-')
    session.id = sessionId;
  }

  session.endTime = t
  setCookie('_cm_session', `${session.id}-${session.endTime.toISOString()}`, undefined)

  if (!getCookie('_cm') || getCookie('_cm') !== appId) {
    setCookie('_cm', appId, 365)

    setSession(session)

    return
  }

  if (getCookie('_cm') && getCookie('_cm') === appId) {
    session.firstVisit = false

    setSession(session)
  }
}
const hasCookieValueExpired = (cookieData: string | undefined): Boolean => {
  if (!cookieData) return true;
  const [, timestampString] = cookieData.split('-');
  const expiryTimeEpoch = Date.parse(timestampString);
  const expiryTime = new Date()
  expiryTime.setTime(expiryTimeEpoch)
  const n = new Date()
  if (n > expiryTime) {
    return true
  }
  return false
}

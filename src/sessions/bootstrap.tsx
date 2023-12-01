import { getCookie, setCookie } from '../utils/cookies'
import { interceptFixCookieForSubdomains } from '../visitors/bootstrap'
import { Session } from './types'

export const bootstrapSession = ({
  appId,
  setSession
}: {
  appId: string
  setSession: (session: Session) => void
}) => {
  const session: Session = {
    firstVisit: undefined
  }

  if (!getCookie('_cm') || getCookie('_cm') !== appId) {
    setCookie('_cm', appId, 365)
    interceptFixCookieForSubdomains()

    setSession(session)

    return
  }

  if (getCookie('_cm') && getCookie('_cm') === appId) {
    session.firstVisit = false

    setSession(session)
  }
}

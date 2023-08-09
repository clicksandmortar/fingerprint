import { Session } from './types'
import { getCookie, setCookie } from '../utils/cookies'

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
    setCookie('_cm', appId)

    setSession(session)

    return
  }

  if (getCookie('_cm') && getCookie('_cm') === appId) {
    session.firstVisit = false

    setSession(session)
  }
}

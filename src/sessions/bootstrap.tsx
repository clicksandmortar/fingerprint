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
    id: uuidv4()
  }

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

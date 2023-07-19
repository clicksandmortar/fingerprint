import Cookies from 'js-cookie'
import { SessionState } from './types'

export const bootstrapSession = ({
  appId,
  setSession
}: {
  appId: string
  setSession: (session: SessionState) => void
}) => {
  const session: SessionState = {
    firstVisit: undefined
  }

  // If the user has never visited the site before (or has cleared their cookies)
  // then we'll set the firstVisit boolean to true. This is also the case if the
  // user has visited before but for some reason the App ID has been changed.
  if (!Cookies.get('_cm') || Cookies.get('_cm') !== appId) {
    alert('new user')
    Cookies.set('_cm', appId, { expires: 365 })
    session.firstVisit = true

    setSession(session)

    return
  }

  // If the user has visited the site before and the App ID is the same as the
  // one stored in the cookie, then we'll set the firstVisit boolean to false.
  if (Cookies.get('_cm') && Cookies.get('_cm') === appId) {
    session.firstVisit = false

    console.log('setting firstVisit to false')

    setSession(session)
  }
}

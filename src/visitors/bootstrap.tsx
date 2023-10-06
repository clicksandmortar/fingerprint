import { Visitor } from './types'
import { validVisitorId } from './utils'
import { getCookie, setCookie } from '../utils/cookies'

export const bootstrapVisitor = ({
  setVisitor
}: {
  setVisitor: (session: Visitor) => void
}) => {
  const visitor: Visitor = {
    id: undefined
  }

  if (!getCookie('_cm_id') || !validVisitorId(getCookie('_cm_id') as string)) {
    // make a call to the /collector endpoint to get a new visitor id
    fetch('https://af.eu.ngrok.io/collector/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then(async (response: any) => {
      const data = await response.json()
      visitor.id = data.visitorId

      if (!visitor.id) throw new Error('No visitor ID returned from collector')

      setCookie('_cm_id', visitor.id, 365)
      setVisitor(visitor)
    })
    return
  }

  if (getCookie('_cm_id')) {
    visitor.id = getCookie('_cm_id')
    setVisitor(visitor)
  }
}

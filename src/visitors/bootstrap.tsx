import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'
import { VisitorState } from './types'
import { validVisitorId } from './utils'

export const bootstrapVisitor = ({
  setVisitor
}: {
  setVisitor: (session: VisitorState) => void
}) => {
  const visitor: VisitorState = {
    id: undefined
  }

  if (
    !Cookies.get('_cm_id') ||
    !validVisitorId(Cookies.get('_cm_id') as string)
  ) {
    const visitorId = uuidv4()

    Cookies.set('_cm_id', visitorId, { expires: 365 })

    visitor.id = visitorId

    setVisitor(visitor)

    return
  }

  if (Cookies.get('_cm_id')) {
    visitor.id = Cookies.get('_cm_id')

    setVisitor(visitor)
  }
}

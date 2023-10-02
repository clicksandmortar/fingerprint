import React, { PropsWithChildren, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type Props = PropsWithChildren<{ enabled: boolean }>

const FollowContext = React.createContext({ enabled: false })

const generateFollowFunc = (session: string) => (e: MouseEvent) => {
  // const payload = { session,}
}

const FollowProvider = ({ children, enabled, config }: Props) => {
  const [session, setSession] = useState<null | string>(null)

  useEffect(() => {
    setSession(uuidv4())
  }, [])

  React.useEffect(() => {
    if (!session) return

    document.addEventListener('click', generateFollowFunc(session))
  }, [])

  return (
    <FollowContext.Provider value={{ enabled }}>
      {children}
    </FollowContext.Provider>
  )
}

export default FollowProvider

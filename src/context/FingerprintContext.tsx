import React, { createContext, useEffect, useState } from 'react'
import { bootstrapSession } from '../sessions/bootstrap'
import { VisitorState } from '../visitors/types'
import { SessionState } from '../sessions/types'
import { bootstrapVisitor } from '../visitors/bootstrap'
import { bootstrapSettings } from '../settings/bootstrap'

interface FingerprintContextInterface {
  session: SessionState
  visitor: VisitorState
}

export type FingerprintProviderProps = {
  appId: string
  children: React.ReactNode
  debug?: boolean
}

export type FingerprintState = {
  session: SessionState
  visitor: VisitorState
}

const defaultFingerprintState: FingerprintState = {
  session: {
    firstVisit: undefined
  },
  visitor: {
    id: undefined
  }
}

export const FingerprintProvider = (props: FingerprintProviderProps) => {
  const { appId, children, debug } = props
  const [booted, setBooted] = useState(false)
  const [fingerprint, setFingerprint] = useState<FingerprintState>(
    defaultFingerprintState
  )

  const setSession = (session: SessionState) => {
    console.log('setting session', session, fingerprint)
    setFingerprint({
      ...fingerprint,
      session
    })
  }

  const setVisitor = (visitor: VisitorState) => {
    console.log('setting visitor', visitor, fingerprint)
    setFingerprint({
      ...fingerprint,
      visitor
    })
  }

  useEffect(() => {
    if (!appId) {
      throw new Error('C&M Fingerprint: appId is required')
    }

    if (booted) {
      return
    }

    const performBoot = async () => {
      await bootstrapSettings()

      await bootstrapSession({
        appId,
        setSession
      })

      await bootstrapVisitor({
        setVisitor
      })

      if (debug) {
        console.log('C&M Fingerprint Booted')
      }

      setBooted(true)
    }

    performBoot()
  }, [])

  useEffect(() => {
    if (debug) {
      console.log('C&M Fingerprint: ', fingerprint)
    }
  }, [fingerprint])

  return (
    <FingerprintContext.Provider
      value={{
        ...fingerprint
      }}
    >
      {children}
    </FingerprintContext.Provider>
  )
}

export const FingerprintContext = createContext<FingerprintContextInterface>({
  ...defaultFingerprintState
})

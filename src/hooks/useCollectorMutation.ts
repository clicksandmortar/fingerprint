import { useMutation } from '@tanstack/react-query'
import { CollectorUpdate } from '../client/types'
import { useLogging } from '../context/LoggingContext'
import { useVisitor } from '../context/VisitorContext'
import { request } from '../utils/http'
import { useFingerprint } from './useFingerprint'
import { useHostname } from './useHostname'
import { useEnvVars } from './useEnvVars'

export const useCollectorMutation = () => {
  const { log, error } = useLogging()
  const { appId } = useFingerprint()
  const { visitor, session } = useVisitor()
  const { FINGERPRINT_API_HOSTNAME } = useEnvVars()
  const requestHost = useHostname()

  return useMutation<Response, unknown, CollectorUpdate, unknown>(
    (data: CollectorUpdate) => {
      return request
        .post(FINGERPRINT_API_HOSTNAME + '/collector/' + visitor?.id, {
          ...data,
          appId,
          visitor,
          sessionId: session?.id,
          hostname: requestHost
        })
        .then((response) => {
          log('Collector API response', response)
          return response
        })
        .catch((err) => {
          error('Collector API error', err)
          return err
        })
    },
    {
      onSuccess: () => {}
    }
  )
}

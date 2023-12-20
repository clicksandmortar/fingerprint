import { useMutation } from '@tanstack/react-query'
import { CollectorUpdate } from '../../client/types'
import { deviceInfo } from '../../utils/device'
import { hostname, request } from '../../utils/http'
import { useVisitor } from '../init/useInitVisitor'
import { useFingerprint } from '../useFingerprint'
import { useHostname } from '../useHostname'
import { useLogging } from '../useLogging'

export const useCollectorMutation = () => {
  const { log, error } = useLogging()
  const { appId } = useFingerprint()
  const { visitor, session } = useVisitor()

  const requestHost = useHostname()

  return useMutation<Response, unknown, CollectorUpdate, unknown>(
    (data: CollectorUpdate) => {
      return request
        .post(hostname + '/collector/' + visitor?.id, {
          ...data,
          appId,
          visitor,
          sessionId: session?.id,
          hostname: requestHost,
          device: deviceInfo
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
      // TODO: merge this and collecor callback into one thing when we no longer require
      // setting intently - thats the only differentiator between the callbacks
      onSuccess: () => {}
    }
  )
}

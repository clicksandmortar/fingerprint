import { useMutation } from '@tanstack/react-query'
import { useDifiStore } from '../../beautifulSugar/store'
import { CollectorUpdate } from '../../client/types'
import { deviceInfo } from '../../utils/device'
import { hostname, request } from '../../utils/http'
import { useVisitor } from '../init/useInitVisitor'
import useCollectorCallback from '../useCollectorCallback'
import { useHostname } from '../useHostname'
import { useLogging } from '../useLogging'

export const useCollectorMutation = () => {
  const { log, error } = useLogging()
  const { appId } = useDifiStore((s) => s.difiProps)
  const { visitor, session } = useVisitor()

  const requestHost = useHostname()

  const collectorCallback = useCollectorCallback()

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
      onSuccess: collectorCallback
    }
  )
}

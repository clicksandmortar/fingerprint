import { useMutation } from '@tanstack/react-query'
import { Trigger } from '../client/types'
import { useLogging } from '../context/LoggingContext'
import { useVisitor } from '../context/VisitorContext'
import { request } from '../utils/http'
import { useFingerprint } from './useFingerprint'
import { useEnvVars } from './useEnvVars'

export const useSeenMutation = () => {
  const { log, error } = useLogging()
  const { appId } = useFingerprint()
  const { visitor } = useVisitor()
  const { FINGERPRINT_API_HOSTNAME } = useEnvVars()

  return useMutation<Response, {}, Trigger, unknown>(
    (trigger: Trigger) => {
      return request
        .put(
          `${FINGERPRINT_API_HOSTNAME}/triggers/${appId}/${visitor.id}/seen`,
          {
            seenTriggerIDs: [trigger.id]
          }
        )
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
      mutationKey: ['seen'],
      onSuccess: () => {}
    }
  )
}

import { useMutation } from '@tanstack/react-query'
import { Trigger } from '../client/types'
import { useLogging } from '../context/LoggingContext'
import { useVisitor } from '../context/VisitorContext'
import { hostname, request } from '../utils/http'
import { useFingerprint } from './useFingerprint'

export const useSeenMutation = () => {
  const { log, error } = useLogging()
  const { appId } = useFingerprint()
  const { visitor } = useVisitor()

  return useMutation<Response, {}, unknown, unknown>(
    (trigger: Trigger) => {
      return request
        .put(`${hostname}/triggers/${appId}/${visitor.id}/seen`, {
          seenTriggerIDs: [trigger.id]
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
      mutationKey: ['seen'],
      onSuccess: () => {}
    }
  )
}

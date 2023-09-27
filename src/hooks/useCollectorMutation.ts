import { useMutation } from '@tanstack/react-query'
import { CollectorUpdate } from '../client/types'
import { hostname, request } from '../utils/http'
import { useLogging } from '../context/LoggingContext'

export const useCollectorMutation = () => {
  const { log, error } = useLogging()

  return useMutation<Response, unknown, CollectorUpdate, unknown>(
    (data: CollectorUpdate) => {
      return request
        .post(hostname + '/collector/' + data?.visitor?.id, data)
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

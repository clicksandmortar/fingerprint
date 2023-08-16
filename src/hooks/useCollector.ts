import { useMutation } from '@tanstack/react-query'
import { CollectorResponse, CollectorUpdate } from '../client/types'
import { hostname, request } from '../utils/http'
import { useLogging } from '../context/LoggingContext'

export const useCollector = () => {
  const { log, error } = useLogging()

  return useMutation<CollectorResponse, unknown, CollectorUpdate, unknown>(
    (data: CollectorUpdate) => {
      console.log('Sending CollectorUpdate to Collector API', data)

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

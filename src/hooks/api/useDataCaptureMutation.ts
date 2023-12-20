import { useMutation } from '@tanstack/react-query'
import { hostname, request } from '../../utils/http'
import { useVisitor } from '../init/useInitVisitor'
import { useFingerprint } from '../useFingerprint'
import { useLogging } from '../useLogging'

// if this mutation needs to change, make this more dynamic. For now, we only use it for /form,
// so ok to hardcode here:
export const useDataCaptureMutation = <B extends {} = any>() => {
  const { log, error } = useLogging()
  const { appId } = useFingerprint()
  const { visitor } = useVisitor()

  return useMutation(
    (data: B) => {
      return request

        .post(hostname + '/collector/' + visitor?.id + '/form', {
          ...data,
          appId
        })
        .then((response) => {
          log('Trigger API response', response)
          return response
        })
        .catch((err) => {
          error('Trigger API error', err)
          return err
        })
    },
    {
      onSuccess: () => {}
    }
  )
}

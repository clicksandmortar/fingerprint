import { useMutation } from '@tanstack/react-query'
import { sendEvent } from '../client/handler'
import { CollectorResponse, CollectorUpdate } from '../client/types'
// import axios, { AxiosResponse } from 'axios'

// export const useCollector = () => {
//   // @ts-ignore
//   const api = axios.create({
//     // @todo up date this to use env
//     baseURL: 'http://localhost:3000/api',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     }
//   })

//   return useMutation<
//     AxiosResponse<any, any>,
//     unknown,
//     CollectorUpdate,
//     unknown
//   >((data: CollectorUpdate) => api.patch(`/collect`, data), {
//     onSuccess: () => {
//       // console.log(response.data)
//     }
//   })
// }

// Local implementation of collector which does not make a network request
export const useCollector = () => {
  return useMutation<CollectorResponse, unknown, CollectorUpdate, unknown>(
    (data: CollectorUpdate) => {
      console.log('Sending CollectorUpdate to Mock Collector API', data)
      return Promise.resolve(sendEvent(data))
    },
    {
      onSuccess: () => {
        // console.log(response.data)
      }
    }
  )
}

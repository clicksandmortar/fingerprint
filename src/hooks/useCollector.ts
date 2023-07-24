import { useMutation } from '@tanstack/react-query'
// import axios, { AxiosResponse } from 'axios'

// type CollectorUpdate = {}

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
  return useMutation<unknown, unknown, any, unknown>(
    (data: any) => {
      console.log(data)
      return data
    },
    {
      onSuccess: () => {
        // console.log(response.data)
      }
    }
  )
}

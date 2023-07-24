import { useMutation } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'

type UpdateCollector = {}

export const useUpdateCollector = () => {
  const api = axios.create({
    // @todo up date this to use env
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  return useMutation<
    AxiosResponse<any, any>,
    unknown,
    UpdateCollector,
    unknown
  >((data: UpdateCollector) => api.patch(`/collect`, data), {
    onSuccess: (response) => {
      // console.log(response.data)
    }
  })
}

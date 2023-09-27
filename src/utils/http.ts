const headers = { 'Content-Type': 'application/json' }

export const hostname = 'https://target-engine-api.starship-staging.com'
// process.env.FINGERPRINT_API_HOSTNAME || 'http://localhost'

export const request = {
  get: async (url: string, params: any) => {
    return await fetch(url + '?' + new URLSearchParams(params), {
      method: 'GET',
      headers
    })
  },
  post: async (url: string, body: any) => {
    return await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
  },
  patch: async (url: string, body: any) => {
    return await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    })
  },
  put: async (url: string, body: any) => {
    return await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    })
  },
  delete: async (url: string) => {
    return await fetch(url, {
      method: 'DELETE',
      headers
    })
  }
}

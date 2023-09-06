import Cookies from 'js-cookie'

export const setCookie = (
  name: string,
  value: string,
  expires: number | undefined
) => {
  return Cookies.set(name, value, {
    expires: expires || 365,
    sameSite: 'strict'
  })
}

export const getCookie = (name: string) => {
  return Cookies.get(name)
}

export const onCookieChanged = (
  callback: ({
    oldValue,
    newValue
  }: {
    oldValue: string
    newValue: string
  }) => void,
  interval = 1000
) => {
  let lastCookie = document.cookie
  setInterval(() => {
    const cookie = document.cookie
    if (cookie !== lastCookie) {
      try {
        // eslint-disable-next-line standard/no-callback-literal
        callback({ oldValue: lastCookie, newValue: cookie })
      } finally {
        lastCookie = cookie
      }
    }
  }, interval)
}

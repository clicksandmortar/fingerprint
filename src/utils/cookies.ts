import Cookies, { CookieAttributes } from 'js-cookie'
import { getCookieDomain } from '../visitors/bootstrap'

export const setCookie = (
  name: string,
  value: string,
  expires: number | undefined,
  options?: CookieAttributes
) => {
  return Cookies.set(name, value, {
    expires: expires,
    sameSite: 'strict',
    domain: getCookieDomain() || undefined,
    ...options
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

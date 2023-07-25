import Cookies from 'js-cookie'

export const setCookie = (name: string, value: string) => {
  return Cookies.set(name, value, {
    expires: 365,
    sameSite: 'strict'
  })
}

export const getCookie = (name: string) => {
  return Cookies.get(name)
}

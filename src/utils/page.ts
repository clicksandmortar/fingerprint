// @TODO: find out, is there a way to use global window rather than pass it as o?
export function isUndefined(o?: any): o is undefined {
  return typeof o === 'undefined'
}

export function getReducedSearchParams(): Record<string, string | undefined> {
  if (isUndefined(window)) return {}

  return new URLSearchParams(window.location.search)
    .toString()
    .split('&')
    .reduce((acc, cur) => {
      const [key, value] = cur.split('=')
      if (!key) return acc
      acc[key] = value
      return acc
    }, {})
}

/** gets page data to be sent to collecto endpoints */
export function getPagePayload() {
  if (isUndefined(window)) return null

  const params: any = getReducedSearchParams()
  const hash: string = window.location.hash.substring(2)

  return {
    url: window.location.href,
    path: window.location.pathname,
    title: document.title,
    hash,
    params
  }
}

export function getReferrer() {
  const params = getReducedSearchParams()

  return {
    url: document.referrer,
    title: '',
    utm: {
      // eslint-disable-next-line camelcase
      source: params?.utm_source,
      // eslint-disable-next-line camelcase
      medium: params?.utm_medium,
      // eslint-disable-next-line camelcase
      campaign: params?.utm_campaign,
      // eslint-disable-next-line camelcase
      term: params?.utm_term,
      // eslint-disable-next-line camelcase
      content: params?.utm_content
    }
  }
}

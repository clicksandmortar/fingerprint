// Please dont let this become a pattern. This is a one off and should be moved to backend as soon as possible.

import { Config } from '../client/types'

///.... and it is becoming a pattern. 🙈
export type SupportedBrand =
  | 'Browns'
  | 'Stonehouse'
  | 'C&M'
  | 'Sizzling'
  | 'All Bar One'
  | 'Ember'

// eslint-disable-next-line camelcase
const TEMP_isCNMBrand = () => {
  if (typeof window === 'undefined') return false

  const isCnMBookingDomain =
    /^book\.[A-Za-z0-9.!@#$%^&*()-_+=~{}[\]:;<>,?/|]+\.co\.uk$/.test(
      window.location.host
    )

  return isCnMBookingDomain
}

export const _LEGACY_getBrand = (): SupportedBrand | null => {
  if (typeof window === 'undefined') return null

  if (TEMP_isCNMBrand()) return 'C&M'

  //  keep for testing. for now.
  if (window.location.host.startsWith('localhost')) return 'C&M'

  if (window.location.host.includes('stonehouserestaurants.co.uk'))
    return 'Stonehouse'
  if (window.location.host.includes('browns-restaurants.co.uk')) return 'Browns'

  if (window.location.host.includes('sizzlingpubs.co.uk')) return 'Sizzling'
  if (window.location.host.includes('emberinns.co.uk')) return 'Ember'

  if (window.location.host.includes('allbarone.co.uk')) return 'All Bar One'

  return 'C&M'
}

/**
 * By default all brand colors are set to #000000.
 */
export const haveBrandColorsBeenConfigured = (
  colors: Config['brand']['colors']
) => {
  if (!colors) return false
  if (typeof colors !== 'object') return false
  if (Object.keys(colors).length === 0) return false
  if (Object.values(colors).every((color) => color === '#000000')) return false

  // being optimistic here.
  return true
}

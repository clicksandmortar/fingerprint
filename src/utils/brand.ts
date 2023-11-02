// Please dont let this become a pattern. This is a one off and should be moved to backend as soon as possible.

///.... and it is becoming a pattern. 🙈
export type SupportedBrand = 'Browns' | 'Stonehouse' | 'C&M'

// eslint-disable-next-line camelcase
const TEMP_isCNMBrand = () => {
  if (typeof window === 'undefined') return false

  const isCnMBookingDomain =
    /^book\.[A-Za-z0-9.!@#$%^&*()-_+=~{}[\]:;<>,?/|]+\.co\.uk$/.test(
      window.location.host
    )

  return isCnMBookingDomain
}

export const getBrand = (): SupportedBrand | null => {
  if (typeof window === 'undefined') return null

  if (TEMP_isCNMBrand()) return 'C&M'

  //  keep for testing. for now.
  if (window.location.host.startsWith('localhost')) return 'C&M'

  if (window.location.host.includes('stonehouserestaurants.co.uk'))
    return 'Stonehouse'
  if (window.location.host.includes('browns-restaurants.co.uk')) return 'Browns'

  return null
}

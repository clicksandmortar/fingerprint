// Please dont let this become a pattern. This is a one off and should be moved to backend as soon as possible.

export type SupportedBrand =
  | 'Browns'
  | 'Stonehouse'
  | 'C&M Booking'
  | 'C&M Gift cards'

// thanks cat yee pee tea
// again, temp. BE will handle this soon enough
function checkForCnMBookingDomain(arg: string) {
  // passes book.ANYTHING.co.uk
  return /^book\.[A-Za-z0-9.!@#$%^&*()-_+=~{}[\]:;<>,?/|]+\.co\.uk$/.test(arg)
}

export const getBrand = (): SupportedBrand | null => {
  if (typeof window === 'undefined') return null

  if (checkForCnMBookingDomain(window.location.host)) return 'C&M Booking'

  //  keep for testing. for now.
  if (window.location.host.startsWith('localhost')) return 'Stonehouse'

  // MAB domains
  if (window.location.host.includes('gift.thediningoutgiftcard.co.uk'))
    return 'C&M Gift cards'
  if (window.location.host.includes('stonehouserestaurants.co.uk'))
    return 'Stonehouse'
  if (window.location.host.includes('browns-restaurants.co.uk')) return 'Browns'

  return null
}

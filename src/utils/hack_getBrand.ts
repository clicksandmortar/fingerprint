// Please dont let this become a pattern. This is a one off and should be moved to backend as soon as possible.

export type SupportedBrand = 'Browns' | 'Stonehouse'

export const getBrand = (): SupportedBrand | null => {
  if (typeof window === 'undefined') return null

  //  keep for testing. for now.
  if (window.location.host === 'localhost:3000') return 'Stonehouse'

  if (window.location.host === 'www.stonehouserestaurants.co.uk')
    return 'Stonehouse'
  if (window.location.host === 'www.browns-restaurants.co.uk') return 'Browns'

  return null
}

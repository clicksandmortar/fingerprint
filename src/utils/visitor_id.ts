export const hasVisitorIDInURL = (): boolean => {
  if (typeof window !== 'undefined') {
    // Check if `v_id` is in the query parameters
    const urlParams = new URLSearchParams(window.location.search)
    const vid = urlParams.get('v_id')
    if (vid) {
      return true
    }
  }

  return false
}

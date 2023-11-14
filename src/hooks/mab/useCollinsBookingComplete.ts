import React from 'react'
import { useLogging } from '../../context/LoggingContext'
import { useMixpanel } from '../../context/MixpanelContext'
import { SupportedBrand, getBrand } from '../../utils/brand'

// if a brand is not present in this map, skip tracking via this method (other ones should pick it up)
const collinBrandsPathConversionMap: Partial<{
  [K in SupportedBrand]: string
}> = {
  Stonehouse: '/tablebooking/enquiry-form-completed',
  'All Bar One': '/bookings/dmnc-complete',
  Sizzling: '/tablebooking/enquiry-form-completed'
}

/**
 * Track MAB Collins sites conversions. Special case for Stonehouse at the moment
 * Necessary since registerWatcher doesn't work on Collins sites
 */
export function useCollinsBookingComplete() {
  const { trackEvent } = useMixpanel()
  const { log } = useLogging()

  const checkCollinsBookingComplete = React.useCallback(() => {
    // might want to add these checks as part of skip condition in `useRunOnPathChange`
    const brand = getBrand()
    if (!brand) return

    const conversionPathForBrand = collinBrandsPathConversionMap[brand]
    if (!conversionPathForBrand) return

    const isConversionPath = window.location.pathname
      .toLowerCase()
      .includes(conversionPathForBrand.toLowerCase())
    if (!isConversionPath) return

    log(
      `useCollinsBookingComplete: Collins booking complete based on path ${conversionPathForBrand} and brand ${brand}`
    )

    trackEvent('booking_complete', {})
  }, [trackEvent, log])

  return { checkCollinsBookingComplete }
}

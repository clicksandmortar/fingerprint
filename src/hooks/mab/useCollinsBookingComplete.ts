import React from 'react'
import { useMixpanel } from '../../context/MixpanelContext'
import { SupportedBrand } from '../../utils/brand'
import { useBrand } from '../useBrandConfig'
import { useLogging } from '../useLogging'

// if a brand is not present in this map, skip tracking via this method (other ones should pick it up)
const collinBrandsPathConversionMap: Partial<{
  [K in SupportedBrand]: string
}> = {
  Stonehouse: '/tablebooking/enquiry-form-completed',
  'All Bar One': '/bookings/dmnc-complete',
  Sizzling: '/tablebooking/enquiry-form-completed',
  Ember: '/tablebooking/enquiry-form-completed'
}

/**
 * Track MAB Collins sites conversions. Special case for Stonehouse at the moment
 * Necessary since registerWatcher doesn't work on Collins sites
 */
export function useCollinsBookingComplete() {
  const {
    trackEvent,
    state: { initiated }
  } = useMixpanel()
  const { log } = useLogging()
  const brand = useBrand()

  const checkCollinsBookingComplete = React.useCallback(() => {
    log('useCollinsBookingComplete: checking for Collins booking complete')
    // might want to add these checks as part of skip condition in `useRunOnPathChange`
    if (!initiated) {
      log('useCollinsBookingComplete, mixpanel not initiated')
      return
    }
    if (!brand) {
      log('useCollinsBookingComplete, no brand')
      return
    }

    const conversionPathForBrand = collinBrandsPathConversionMap[brand]
    if (!conversionPathForBrand) {
      log('useCollinsBookingComplete: no path for brand variable')
      return
    }

    const isConversionPath = window.location.pathname
      .toLowerCase()
      .includes(conversionPathForBrand.toLowerCase())

    if (!isConversionPath) {
      log('useCollinsBookingComplete: not a conversion path')
      return
    }

    log(
      `useCollinsBookingComplete: Collins booking complete based on path ${conversionPathForBrand} and brand ${brand}`
    )

    trackEvent('booking_complete', {})
  }, [trackEvent, log, brand, initiated])

  return { checkCollinsBookingComplete }
}

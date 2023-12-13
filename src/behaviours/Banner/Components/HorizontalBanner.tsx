import React, { useEffect, useRef } from 'react'
import CloseButton from '../../../components/CloseButton'
import useCountdown from '../../../hooks/useCountdown'
import { getInterpolate } from '../../../hooks/useInterpolate'
import { useBannerStyles } from '../Banner.styles'
import { BannerProps } from '../Banner.types'
import {
  getCanBeDismissed,
  getIsBannerFullyClickable,
  Position,
  resetPad,
  useBannerContainerStyles
} from '../utils'

const HorizontalBanner = ({
  handleAction,
  handleClose,
  trigger
}: BannerProps) => {
  const styles = useBannerStyles()
  const container = useRef<HTMLDivElement | null>(null)
  const isFullyClickable = getIsBannerFullyClickable(trigger)

  const canBeDismissed = getCanBeDismissed()

  const containerStyles = useBannerContainerStyles({
    element: {
      width: container.current?.clientWidth || 0,
      height: container.current?.clientHeight || 0
    },
    trigger
  })

  const interpolate = getInterpolate(trigger.data || {})

  // TODO: This is still the old, what turned out to be terrible, interpolation thing we will fix
  const { formattedCountdown: text } = useCountdown({
    onZero: () => handleClose({}),
    initialTimestamp:
      //  trigger.data?.countdownEndTime ?
      new Date(trigger.data?.countdownEndTime || ''),
    // : undefined,

    interpolate: {
      text: trigger.data?.marketingText || trigger.data?.buttonText || '',
      structure: trigger.data as Record<string, unknown>
    }
  })

  const position = trigger.data?.position as Position

  useEffect(() => {
    const bannerHeight = container.current?.clientHeight

    if (position === 'top') {
      document.body.style.paddingTop = `${bannerHeight}px`
    } else if (position === 'bottom') {
      document.body.style.paddingBottom = `${bannerHeight}px`
    }

    return resetPad
  }, [container, position])

  return (
    <div
      ref={container}
      style={containerStyles}
      data-testid={`cnm-horizontal-banner-${trigger.id}`}
    >
      <div
        onClick={isFullyClickable ? handleAction : undefined}
        style={styles.contentContainer}
      >
        <span style={styles.text}>{text}</span>
        <button onClick={handleAction} style={styles.button}>
          {interpolate(trigger.data?.buttonText || '')}
        </button>
      </div>
      {canBeDismissed && (
        <CloseButton onClick={handleClose} style={styles.closeButton} />
      )}
    </div>
  )
}

export default HorizontalBanner

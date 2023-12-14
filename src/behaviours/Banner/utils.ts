import React from 'react'
import { useBrandColors } from '../../hooks/useBrandConfig'
import { BannerTrigger } from './Banner.types'

export type Position = 'top' | 'bottom' | 'left' | 'right'

export const resetPad = () => {
  document.body.style.paddingTop = 'inherit'
}

export const getCanBeDismissed = () => {
  // TODO: implement if needed
  return true
}

export const getIsBannerFullyClickable = (trigger: BannerTrigger) => {
  const isFullyClickable = !trigger.data?.marketingText
  return isFullyClickable
}

/**
 * Styles extracted from the Banner component
 * Relies on brand colors from useBrandColors,
 * so has to be a hook
 */
export const useBannerContainerStyles = ({
  trigger,
  element: { width, height }
}: {
  trigger: BannerTrigger
  element: { width: number; height: number }
}) => {
  const position = trigger.data?.position as Position
  const isFullyClickable = getIsBannerFullyClickable(trigger)

  const { backgroundPrimary, textPrimary } = useBrandColors()

  const mutualStyles: React.CSSProperties = {
    fontFamily: 'sans-serif',
    position: 'fixed',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    color: textPrimary,
    backgroundColor: backgroundPrimary,
    cursor: isFullyClickable ? 'pointer' : 'default'
  }

  // since the rotation position is pivoting around a corner, we need to calculate
  // the width of the container and then use that to offset the translate slightly to center it properly
  const offset = 0.5 * width + 0.5 * height

  switch (position) {
    case 'left':
      return {
        ...mutualStyles,
        translate: `0 -${offset}px`,
        rotate: '90deg',
        transformOrigin: '0% 50%',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        borderRadius: '10px 10px 0 0'
      }
    case 'right':
      return {
        ...mutualStyles,
        translate: `0 -${offset}px`,
        rotate: '270deg',
        transformOrigin: '100% 50%',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        borderRadius: '10px 10px 0 0'
      }

    case 'top':
    case 'bottom':
      return {
        ...mutualStyles,
        [position]: 0,
        left: 0,
        width: '100%'
      }
    default:
      return {} as never
  }
}

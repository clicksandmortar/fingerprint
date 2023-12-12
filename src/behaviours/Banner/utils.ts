import React from 'react'
import { useBrandColors } from '../../hooks/useBrandConfig'

export type Position = 'top' | 'bottom' | 'left' | 'right'

export const resetPad = () => {
  document.body.style.paddingTop = 'inherit'
}

/**
 * Styles extracted from the Banner component
 * Relies on brand colors from useBrandColors,
 * so has to be a hook
 */
export const useBannerContainerStyles = ({
  position,
  element: { width, height }
}: {
  position: Position
  element: { width: number; height: number }
}) => {
  const { backgroundPrimary, textPrimary } = useBrandColors()

  // since the rotation position is pivoting around a corner, we need to calculate
  // the width of the container and then use that to offset the translate slightly to center it properly
  const offset = 0.5 * width + 0.5 * height

  const mutualStyles: React.CSSProperties = {
    fontFamily: 'sans-serif',
    position: 'fixed',
    padding: '5px',
    color: textPrimary,
    backgroundColor: backgroundPrimary,
    display: 'flex',
    alignItems: 'center'
  }

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

import { CSSProperties, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Trigger } from '../../../client/types'

export type ModalSize = 'small' | 'medium' | 'large' | 'full'
export type ButtonPosition = 'left' | 'center' | 'right'

export const getModalStylesBySize = (size: ModalSize): CSSProperties => {
  switch (size) {
    case 'small': {
      return { width: '90%', maxWidth: 400, minHeight: 300 }
    }
    case 'medium': {
      return { width: '90%', maxWidth: 800, minHeight: 400 }
    }
    case 'large': {
      return { width: '90%', maxWidth: 1200, minHeight: 400 }
    }
    case 'full': {
      return { width: '100vw', height: '100vh' }
    }
  }
}

export const getModalButtonStylesBySize = (size: ModalSize): CSSProperties => {
  // TODO: think if we can make it better :)
  switch (size) {
    case 'small': {
      return {
        fontSize: '1.3rem',
        padding: '0.3rem 1rem'
      }
    }
    case 'medium': {
      return {
        fontSize: '1.3rem',
        padding: '0.3rem 1rem'
      }
    }
    case 'large': {
      return {
        fontSize: '1.3rem',
        padding: '0.3rem 1rem'
      }
    }
    case 'full': {
      return {
        fontSize: '1.5rem',
        padding: '0.5rem 1.2rem'
      }
    }
  }
}

export const getModalButtonFlexPosition = (
  position: ButtonPosition
): CSSProperties => {
  switch (position) {
    case 'left':
      return { justifyContent: 'flex-start' }
    case 'right':
      return { justifyContent: 'flex-end' }
    case 'center':
      return { justifyContent: 'center' }
  }
}

export const randomHash = 'cnm-behaviour'

export const prependClass = (className: string) => `${randomHash}-${className}`

// if no button text provided, make the entire modal clickable and dont render the button
export const getIsModalFullyClickable = ({ trigger }: { trigger: Trigger }) => {
  return !trigger?.data?.buttonText
}

const getModalSizing = (img: HTMLImageElement) => {
  const imageRealHeight = img.height
  const imageRealWidth = img.width

  const aspectRatio = imageRealWidth / imageRealHeight

  // chose an arbitrary 5% side margins
  const getMaxWidth = (num: number) =>
    window.innerWidth * 0.9 > num ? num : window.innerWidth * 0.9
  const getMaxHeight = (num: number) =>
    window.innerHeight * 0.9 > num ? num : window.innerHeight * 0.9

  const deviceSizeLimits = isMobile
    ? // also somewhat arbitrary, based on historic assets for both device types
      { height: getMaxHeight(1000), width: getMaxWidth(640) }
    : { height: getMaxHeight(490), width: getMaxWidth(819) }

  const widthToUse = Math.min(imageRealWidth, deviceSizeLimits.width)
  const heightToUse = widthToUse / aspectRatio

  return {
    height: heightToUse,
    width: widthToUse
  }
}

export const useModalDimensionsBasedOnImage = ({
  imageURL
}: {
  imageURL: string
}) => {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const img = new Image()
    img.src = imageURL

    // repeatedly attempt to get the bloody image size. Once it loads and we get a proper value,
    // remove the interval. No, image.onload() is not predictable enough to be considered
    const id = setInterval(() => {
      const modalSize = getModalSizing(img)

      if (modalSize.height || modalSize.width) {
        setImageDimensions(modalSize)
        clearInterval(id)
      }
    }, 50)

    return () => {
      clearInterval(id)
    }
  }, [imageURL])

  return { imageDimensions, setImageDimensions }
}

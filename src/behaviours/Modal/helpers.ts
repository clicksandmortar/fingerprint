import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { v4 as uuidv4 } from 'uuid'
import { Trigger } from '../../client/types'
import { DataCaptureTrigger } from './Modal.types'

export const randomHash = 'f' + uuidv4().split('-')[0]

export const prependClass = (className: string) => `f${randomHash}-${className}`

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

export const isModalDataCaptureModal = (
  trigger: any
): trigger is DataCaptureTrigger => {
  if (!trigger) return false
  if (!trigger.data) return false

  // TODO: currently uses the presense of successText to determine if it's a data capture modal
  // if this becomes a new behaviours, we should address this
  if (!trigger.data.successText) return false

  return true
}

import React, { useEffect } from 'react';
import { useEntireStore } from '../beautifulSugar/store';
import { useLogging } from './useLogging';

// built with Copilot-chat
function isValidImageUrl(url: string): boolean {
  // Regular expression to match common image file extensions
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;

  // Check if the URL matches the image file extension pattern
  if (imageExtensions.test(url)) {
    // Check if the URL starts with a valid protocol (http:// or https://)
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return true;
    }
  }

  return false;
}

/**
 * Cache the images and make for a better UX on slower connections.
 * 
 * Preloads trigger images into picture tags and shoves into a 1x1 pixel at the bottom right
 * of the page. Many browsers don't pre-load 'invisible' images with `display: none` etc, so this hack is used.
 * 
 */
const useImagePreload = () => {
  const { pageTriggers } = useEntireStore()
  const { log } = useLogging();
  const [imagesToPreload, setImagesToPreload] = React.useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = React.useState<number>(0);

  const allImagesLoaded = pageTriggers.length > 0 ? imagesToPreload === imagesLoaded && imagesToPreload !== 0 && imagesLoaded !== 0 : true;

  const preloadImagesIntoPictureTag = (images: string[]) => {
    log('useImgPreload - images to preload:', { images })
    images.forEach((image) => {
      const picture = document.createElement('picture')
      const source = document.createElement('source')
      source.srcset = image
      picture.appendChild(source)
      const img = document.createElement('img')
      img.src = image;

      img.style.height = '1px'
      img.style.width = '1px'
      img.style.position = 'absolute'
      img.style.bottom = '0'
      img.style.right = '0'

      picture.appendChild(img)
      document.body.appendChild(picture)
      img.onload = () => {
        log('useImgPreload - loaded image', { image, img })
        setImagesLoaded(prev => prev + 1)
      }
    })

  }

  useEffect(() => {
    if (pageTriggers.length === 0) return;

    const images = pageTriggers.reduce((arr, pageTrigger) => {
      if (typeof pageTrigger.data !== 'object') return arr;

      const validUrls = Object.values(pageTrigger.data).filter(potentiallyAURL => {
        return isValidImageUrl(potentiallyAURL)
      })

      return arr = [...arr, ...validUrls]
    }, [] as string[])

    setImagesToPreload(images.length)
    preloadImagesIntoPictureTag(images)
  }, [pageTriggers])

  return { allImagesLoaded };
}


export default useImagePreload
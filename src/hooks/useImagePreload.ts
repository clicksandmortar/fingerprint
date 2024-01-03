import React, { useEffect } from 'react';
import { useEntireStore } from '../beautifulSugar/store';
import { Trigger } from '../client/types';
import { useLogging } from './useLogging';

/**
 * Checks if an image is potentially valid based on its URL
 * // built with Copilot-chat
 */
function isValidImageUrl(url: string): boolean {
  // Regular expression to match common image file extensions
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;

  // Check if the URL matches the image file extension pattern
  if (imageExtensions.test(url)) {
    // Check if the URL starts with a valid protocol (http:// or https://)
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return true;
    }
  }

  return false;
}

/** Pulls out all urls from trigger.data regardless of key name and returns as an string[] */
const getImageUrls = (pageTriggers: Trigger[]) => {
  const images = pageTriggers.reduce((arr, pageTrigger) => {
    if (typeof pageTrigger.data !== 'object') return arr;

    const validUrls = Object.values(pageTrigger.data).filter((potentiallyAURL) => isValidImageUrl(potentiallyAURL));

    // eslint-disable-next-line no-param-reassign, no-return-assign
    return (arr = [...arr, ...validUrls]);
  }, [] as string[]);
  return images;
};

/**
 * Cache the images and make for a better UX on slower connections.
 *
 * Preloads trigger images into picture tags and shoves into a 1x1 pixel at the bottom right
 * of the page. Many browsers don't pre-load 'invisible' images with `display: none` etc, so this hack is used.
 *
 */
const useImagePreload = () => {
  const {
    pageTriggers,
    utility: { imagesPreloaded: stateImagesHavePreloaded, setImagesHaveLoaded },
  } = useEntireStore();
  const { log } = useLogging();
  const [imagesToPreload, setImagesToPreload] = React.useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = React.useState<number>(0);

  const shouldPreloadImages = stateImagesHavePreloaded !== 'skip';

  const preloadImagesIntoPictureTag = React.useCallback(
    (images: string[]) => {
      /** we want the state to be updated regardless of whether the image
       is loaded, if it errored, or anything else. Not doing so can prevent triggers from showing
        */
      const onAnything = () => {
        setImagesLoaded((prev) => prev + 1);
      };

      log('useImgPreload - images to preload:', { images });
      images.forEach((image) => {
        const picture = document.createElement('picture');
        const source = document.createElement('source');
        source.srcset = image;
        picture.appendChild(source);
        const img = document.createElement('img');
        img.src = image;

        img.style.height = '1px';
        img.style.width = '1px';
        img.style.position = 'absolute';
        img.style.bottom = '0';
        img.style.right = '0';

        picture.appendChild(img);
        document.body.appendChild(picture);

        img.onload = onAnything;
        img.onabort = onAnything;
        img.onerror = onAnything;
      });
    },
    [log],
  );

  useEffect(() => {
    if (!shouldPreloadImages) return;
    if (pageTriggers.length === 0) return;

    const images = getImageUrls(pageTriggers);

    setImagesToPreload(images.length);
    preloadImagesIntoPictureTag(images);
  }, [pageTriggers, preloadImagesIntoPictureTag, shouldPreloadImages]);

  const allImagesLoaded = imagesToPreload === imagesLoaded
  && imagesToPreload !== 0 && imagesLoaded !== 0 && shouldPreloadImages;

  console.log({ stateImagesHavePreloaded, shouldPreloadImages, imagesLoaded });

  useEffect(() => {
    if (!allImagesLoaded) return;

    setImagesHaveLoaded(true);
  }, [allImagesLoaded, setImagesHaveLoaded]);
};

export default useImagePreload;

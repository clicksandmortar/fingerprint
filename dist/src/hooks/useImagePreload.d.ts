/**
 * Cache the images and make for a better UX on slower connections.
 *
 * Preloads trigger images into picture tags and shoves into a 1x1 pixel at the bottom right
 * of the page. Many browsers don't pre-load 'invisible' images with `display: none` etc, so this hack is used.
 *
 */
declare const useImagePreload: () => {
    allImagesLoaded: boolean;
};
export default useImagePreload;

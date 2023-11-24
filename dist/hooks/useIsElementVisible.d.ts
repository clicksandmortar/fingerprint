/**
 * if we ever care about whether the element is in viewport or not, we can use this:
 element.getBoundingClientRect() - https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 */
declare const getIsVisible: (selector: string) => boolean;
export default getIsVisible;

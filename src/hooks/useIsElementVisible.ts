/**
 * if we ever care about whether the element is in viewport or not, we can use this:
 element.getBoundingClientRect() - https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 */

const getIsVisible = (selector: string) => {
  const element = document.querySelector(selector);

  if (!element) return false;
  // visibility
  if (window.getComputedStyle(element).visibility === 'hidden') return false;
  // display
  if (window.getComputedStyle(element).display === 'none') return false;
  // opacity
  if (window.getComputedStyle(element).opacity === '0') return false;

  // @TODO: do we want these checks in place?
  // height
  // if (window.getComputedStyle(element).height === '0px') return false
  // width
  // if (window.getComputedStyle(element).width === '0px') return false

  return true;
};

export default getIsVisible;

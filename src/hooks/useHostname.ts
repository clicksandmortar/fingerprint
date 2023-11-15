export const useHostname = (): string => {
  if (window === undefined) return ''
  if (window?.location !== undefined) {
    return window.location.hostname;
  }
  return '';
}

export const useHostname = (): string => {
  if (window?.location !== undefined) {
    return window.location.hostname;
  }
  return '';
}

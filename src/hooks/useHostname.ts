export const useHostname = (): Location | null => {
  if (window?.location !== undefined) {
    return window.location.hostname;
  }
  return null;
}

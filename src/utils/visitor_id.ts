export const getVisitorId = (): string | null => {
  if (typeof window === 'undefined') return null;

  const urlParams = new URLSearchParams(window.location.search);
  const vid = urlParams.get('v_id');

  return vid;
};

export const hasVisitorIDInURL = (): boolean => getVisitorId() !== null;

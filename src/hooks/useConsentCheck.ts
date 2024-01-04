import { useEffect, useState } from 'react';
import { useLogging } from './useLogging';

export const useConsentCheck = (consent: boolean, consentCallback: any) => {
  const [consentGiven, setConsentGiven] = useState(consent);
  const { log } = useLogging();
  /**
   * Effect checks for user consent either via direct variable or a callback.
   * in any case, once one of the conditions is met, the single state gets set to true, allowing the logic to flow.
   * TODO: Think if it makes sense to memoize / derive that state instead? Gonna be tricky with an interval involved.
   */
  useEffect(() => {
    if (consent) {
      setConsentGiven((prev) => (prev === consent ? prev : consent));
      return;
    }

    log('Fingerprint Widget Consent: ', consent);

    if (!consentCallback) return;
    const consentGivenViaCallback = consentCallback();

    const interval = setInterval(() => {
      setConsentGiven(consent);
    }, 1000);

    // if the user has consented, no reason to continue pinging every sec.
    if (consentGivenViaCallback) {
      clearInterval(interval);
    }

    // clear on onmount
    return () => clearInterval(interval);
  }, [consentCallback, consent]);

  return consentGiven;
};

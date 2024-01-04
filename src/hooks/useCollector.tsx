import React, { useEffect } from 'react';
import { useEntireStore } from '../beautifulSugar/store';
import { getPagePayload, getReferrer } from '../utils/page';
import { hasVisitorIDInURL } from '../utils/visitor_id';
import { useCollectorMutation } from './api/useCollectorMutation';
import { useBrand } from './useBrandConfig';
import { useLogging } from './useLogging';
import useRunOnPathChange from './useRunOnPathChange';
import { useTracking } from './useTracking';

export function useCollector() {
  const { log, error } = useLogging();

  const {
    tracking: { initiated: mixpanelBooted },
    setIntently,
    visitor,
    difiProps: { initialDelay, booted },
  } = useEntireStore();
  const { trackEvent } = useTracking();
  const { mutateAsync: collect } = useCollectorMutation();

  const brand = useBrand();

  useEffect(() => {
    if (!mixpanelBooted) return;

    if (hasVisitorIDInURL()) {
      log('Collector: visitor ID in URL, collecting data');
      trackEvent('abandoned_journey_landing', {
        from_email: true,
      });
    }
  }, [trackEvent, log, mixpanelBooted]);

  // THIS should stay in collector...
  const collectAndApplyVisitorInfo = React.useCallback(() => {
    if (!visitor.id) {
      log('Collector: Not yet collecting, awaiting visitor ID');
      return;
    }
    log('Collector: collecting data');

    const hash: string = window.location.hash.substring(3);

    const hashParams = hash.split('&').reduce((result: any, item: any) => {
      const parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});

    if (hashParams.id_token) {
      log('Collector: user logged in event fired');
      trackEvent('user_logged_in', {
        brand,
      });

      collect({
        account: {
          token: hashParams.id_token,
        },
      });
    }

    collect({
      page: getPagePayload() || undefined,
      referrer: getReferrer() || undefined,
    })
      .then((response: Response) => {
        // as part of removing intently, remove this check. It is no longer relevant.
        // check with the team if we want to do something on 204 instead and if should sit inside the `colletorCallback`
        if (response.status === 204) {
          setIntently(true);
        }
      })

      .catch((err) => {
        error('failed to store collected data', err);
      });
  }, [visitor, brand, log, collect, trackEvent, error, setIntently]);

  useRunOnPathChange(collectAndApplyVisitorInfo, {
    skip: !booted,
    delay: initialDelay,
    name: 'collectAndApplyVisitorInfo',
  });
}

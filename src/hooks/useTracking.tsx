import mixpanel, { Callback } from 'mixpanel-browser';
import React from 'react';
import { useDifiStore } from '../beautifulSugar/store';
import { RegistrableUserProperties } from '../utils/types';
import { useLogging } from './useLogging';

const trackEvent = (event: string, props: any, callback?: Callback): void => mixpanel.track(event, props, callback);

export const useTracking = () => {
  const { initiated } = useDifiStore((s) => s.tracking);
  const { log } = useLogging();

  const registerUserData = React.useCallback(
    (properties: RegistrableUserProperties) => {
      log(
        `Mixpanel: attempting to'register/override properties: ${Object.keys(
          properties,
        ).join(', ')}`,
      );

      mixpanel.people.set(properties);
    },
    [log],
  );

  return {
    trackEvent,
    registerUserData,
    state: {
      initiated,
    },
  };
};

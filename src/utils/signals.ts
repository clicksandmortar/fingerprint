import { FESignal } from '../client/types';
import { getFuncByOperator } from '../hooks/useConversions';
import getIsVisible from '../hooks/useIsElementVisible';
/*
  Scans through the conversion signals and returns true if all of them are true
*/
export const validateSignalChain = (signals: FESignal[]) => {
  // if (typeof window === 'undefined') return false

  const signalPattern = signals.map((signal) => {
    if (signal.op === 'IsOnPath') {
      const [operator, route] = signal.parameters;

      return getFuncByOperator(operator, route)(window.location.pathname);
    }

    if (signal.op === 'CanSeeElementOnPage') {
      const [itemQuerySelector, operator, route] = signal.parameters;
      const isSignalOnCorrectRoute = getFuncByOperator(
        operator,
        route,
      )(window.location.pathname);

      if (!isSignalOnCorrectRoute) return false;

      const isVisible = getIsVisible(itemQuerySelector);
      return isVisible;
    }
    if (signal.op === 'IsOnDomain') {
      return window.location.hostname === signal.parameters[0];
    }

    // in case the signal is mis-configured
    return false;
  });

  return signalPattern.every(Boolean);
};

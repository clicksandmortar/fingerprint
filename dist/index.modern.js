import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React__default, { useContext, createContext, useEffect, useState, useCallback, useMemo, useRef, createElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ReactDOM from 'react-dom';
import mixpanel from 'mixpanel-browser';
import Cookies from 'js-cookie';
import { validate, version, v4 } from 'uuid';
import uniqueBy from 'lodash.uniqby';
import { IdleTimerProvider } from 'react-idle-timer';
import { useExitIntent } from 'use-exit-intent';
import { useForm } from 'react-hook-form';
import { isMobile } from 'react-device-detect';

const closeButtonStyles = {
  borderRadius: '100%',
  backgroundColor: 'white',
  width: '2rem',
  border: 'none',
  height: '2rem',
  margin: 10,
  color: 'black',
  fontSize: '1.2rem',
  fontWeight: 300,
  cursor: 'pointer',
  display: 'grid',
  placeContent: 'center'
};
const CloseButton = ({
  onClick,
  style
}) => {
  const buttonStyle = {
    ...closeButtonStyles,
    ...style
  };
  return React__default.createElement("button", {
    style: buttonStyle,
    onClick: onClick
  }, React__default.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '16',
    height: '16',
    viewBox: '0 0 16 16'
  }, React__default.createElement("path", {
    fill: buttonStyle.color || buttonStyle.fill,
    fillRule: 'evenodd',
    d: 'M8.707 8l3.647-3.646a.5.5 0 0 0-.708-.708L8 7.293 4.354 3.646a.5.5 0 1 0-.708.708L7.293 8l-3.647 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8z'
  })));
};

const useFingerprint = () => {
  return useContext(FingerprintContext);
};

function getEnvVars() {
  var _window, _window$location, _window$location$host, _window2, _window2$location, _window2$location$hos, _window3, _window3$location, _window4, _window4$location, _window5, _window5$location;
  let isDev = false;
  switch (true) {
    case typeof window === 'undefined':
    case (_window = window) === null || _window === void 0 ? void 0 : (_window$location = _window.location) === null || _window$location === void 0 ? void 0 : (_window$location$host = _window$location.host) === null || _window$location$host === void 0 ? void 0 : _window$location$host.includes('localhost'):
    case (_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$location = _window2.location) === null || _window2$location === void 0 ? void 0 : (_window2$location$hos = _window2$location.host) === null || _window2$location$hos === void 0 ? void 0 : _window2$location$hos.includes('clicksandmortar.tech'):
    case (_window3 = window) === null || _window3 === void 0 ? void 0 : (_window3$location = _window3.location) === null || _window3$location === void 0 ? void 0 : _window3$location.host.startsWith('stage65-az'):
    case (_window4 = window) === null || _window4 === void 0 ? void 0 : (_window4$location = _window4.location) === null || _window4$location === void 0 ? void 0 : _window4$location.host.startsWith('test65-az'):
    case (_window5 = window) === null || _window5 === void 0 ? void 0 : (_window5$location = _window5.location) === null || _window5$location === void 0 ? void 0 : _window5$location.host.includes('vercel.app'):
      isDev = true;
      break;
    default:
      isDev = false;
  }
  if (isDev) return {
    FINGERPRINT_API_HOSTNAME: 'https://target-engine-api.starship-staging.com',
    MIXPANEL_TOKEN: 'd122fa924e1ea97d6b98569440c65a95'
  };
  return {
    FINGERPRINT_API_HOSTNAME: 'https://target-engine-api.starship-production.com',
    MIXPANEL_TOKEN: 'cfca3a93becd5735a4f04dc8e10ede27'
  };
}

const LoggingProvider = ({
  debug,
  children
}) => {
  const log = (...message) => {
    if (debug) {
      console.log(...message);
    }
  };
  const warn = (...message) => {
    if (debug) {
      console.warn(...message);
    }
  };
  const error = (...message) => {
    if (debug) {
      console.error(...message);
    }
  };
  const info = (...message) => {
    if (debug) {
      console.info(...message);
    }
  };
  useEffect(() => {
    if (!debug) return;
    log('LoggingProvider: In Debug Mode');
  });
  return React__default.createElement(LoggingContext.Provider, {
    value: {
      log,
      warn,
      error,
      info
    }
  }, children);
};
const LoggingContext = createContext({
  log: () => {},
  warn: () => {},
  error: () => {},
  info: () => {}
});
const useLogging = () => {
  return useContext(LoggingContext);
};

const setCookie = (name, value, expires) => {
  return Cookies.set(name, value, {
    expires: expires,
    sameSite: 'strict'
  });
};
const getCookie = name => {
  return Cookies.get(name);
};
const onCookieChanged = (callback, interval = 1000) => {
  let lastCookie = document.cookie;
  setInterval(() => {
    const cookie = document.cookie;
    if (cookie !== lastCookie) {
      try {
        callback({
          oldValue: lastCookie,
          newValue: cookie
        });
      } finally {
        lastCookie = cookie;
      }
    }
  }, interval);
};

const bootstrapSession = ({
  appId,
  setSession
}) => {
  const session = {
    firstVisit: undefined
  };
  if (!getCookie('_cm') || getCookie('_cm') !== appId) {
    setCookie('_cm', appId, 365);
    setSession(session);
    return;
  }
  if (getCookie('_cm') && getCookie('_cm') === appId) {
    session.firstVisit = false;
    setSession(session);
  }
};

const uuidValidateV4 = uuid => {
  return validate(uuid) && version(uuid) === 4;
};

const validVisitorId = id => {
  const splitCookie = id.split('|');
  return uuidValidateV4(splitCookie[0]);
};

const bootstrapVisitor = ({
  setVisitor,
  session,
  setSession
}) => {
  const visitor = {
    id: undefined
  };
  if (getCookie(cookieAccountJWT)) {
    visitor.jwt = getCookie(cookieAccountJWT);
  }
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const vid = urlParams.get('v_id');
    if (vid) {
      visitor.id = vid;
    }
  }
  if (!visitor.id && !getCookie('_cm_id') || !validVisitorId(getCookie('_cm_id'))) {
    const visitorId = v4();
    visitor.id = visitorId;
  }
  if (!visitor.id && getCookie('_cm_id')) {
    const c = getCookie('_cm_id');
    const [visitorId] = c.split('|');
    visitor.id = visitorId;
  }
  const {
    sessionId,
    endTime
  } = getSessionIdAndEndTime(getCookie('_cm_id'));
  setCookie('_cm_id', `${visitor.id}|${sessionId}|${endTime.toISOString()}`, 365);
  session.id = sessionId;
  session.endTime = endTime;
  setSession(session);
  setVisitor(visitor);
};
const getSessionIdAndEndTime = cookieData => {
  const t = new Date();
  t.setMinutes(t.getMinutes() + 30);
  let sessionId;
  const endTime = t;
  if (!cookieData || hasCookieValueExpired(cookieData)) {
    sessionId = v4();
  } else {
    const c = cookieData;
    let [, sessId] = c.split('|');
    if (sessId === 'undefined' || sessId === undefined) {
      sessId = v4();
    }
    sessionId = sessId;
  }
  return {
    sessionId,
    endTime
  };
};
const hasCookieValueExpired = cookieData => {
  if (!cookieData) return true;
  const cookieSplit = cookieData.split('|');
  if (cookieSplit.length > 1) {
    const timestampString = cookieSplit[cookieSplit.length - 1];
    const expiryTimeEpoch = Date.parse(timestampString);
    const expiryTime = new Date();
    expiryTime.setTime(expiryTimeEpoch);
    const n = new Date();
    if (n > expiryTime) {
      return true;
    }
  }
  return false;
};

const VisitorProvider = ({
  children
}) => {
  const {
    appId,
    booted
  } = useFingerprint();
  const {
    log
  } = useLogging();
  const [session, setSession] = useState({});
  const [visitor, setVisitor] = useState({});
  useEffect(() => {
    if (!booted) {
      log('VisitorProvider: not booted');
      return;
    }
    log('VisitorProvider: booting');
    const boot = async () => {
      await bootstrapSession({
        appId,
        setSession
      });
      await bootstrapVisitor({
        setVisitor,
        session,
        setSession
      });
    };
    boot();
    log('VisitorProvider: booted', session, visitor);
  }, [appId, booted]);
  const setVisitorData = React__default.useCallback(prop => {
    setVisitor(visitor => ({
      ...visitor,
      ...prop
    }));
  }, [setVisitor]);
  return React__default.createElement(VisitorContext.Provider, {
    value: {
      session,
      visitor,
      setVisitor: setVisitorData
    }
  }, children);
};
const VisitorContext = createContext({
  session: {},
  visitor: {},
  setVisitor: () => console.error('VisitorContext: setVisitor not setup properly. Check your Context order.')
});
const useVisitor = () => {
  return useContext(VisitorContext);
};

const init = cfg => {
  mixpanel.init(getEnvVars().MIXPANEL_TOKEN, {
    debug: cfg.debug,
    track_pageview: true,
    persistence: 'localStorage'
  });
};
const trackEvent = (event, props, callback) => {
  return mixpanel.track(event, props, callback);
};
const MixpanelProvider = ({
  children
}) => {
  const {
    appId
  } = useFingerprint();
  const {
    visitor
  } = useVisitor();
  const {
    log
  } = useLogging();
  const [initiated, setInitiated] = useState(false);
  useEffect(() => {
    if (!appId || !visitor.id) {
      return;
    }
    log('MixpanelProvider: booting');
    init({
      debug: true
    });
    setInitiated(true);
    log('MixpanelProvider: registering visitor ' + visitor.id + ' to mixpanel');
    mixpanel.identify(visitor.id);
  }, [appId, visitor === null || visitor === void 0 ? void 0 : visitor.id]);
  useEffect(() => {
    if (!(visitor !== null && visitor !== void 0 && visitor.cohort)) {
      log('Able to register user cohort, but none provided. ');
      return;
    }
    registerUserData({
      u_cohort: visitor.cohort
    });
  }, [visitor, setInitiated]);
  const registerUserData = React__default.useCallback(properties => {
    log(`Mixpanel: attempting to'register/override properties: ${Object.keys(properties).join(', ')}`);
    mixpanel.people.set(properties);
  }, [log]);
  return React__default.createElement(MixpanelContext.Provider, {
    value: {
      trackEvent,
      registerUserData,
      state: {
        initiated
      }
    }
  }, children);
};
const MixpanelContext = createContext({
  trackEvent: () => console.error('Mixpanel: trackEvent not setup properly. Check your Context order.'),
  registerUserData: () => console.error('Mixpanel: registerUserData not setup properly. Check your Context order.'),
  state: {
    initiated: false
  }
});
const useMixpanel = () => {
  return useContext(MixpanelContext);
};

const TEMP_isCNMBrand = () => {
  if (typeof window === 'undefined') return false;
  const isCnMBookingDomain = /^book\.[A-Za-z0-9.!@#$%^&*()-_+=~{}[\]:;<>,?/|]+\.co\.uk$/.test(window.location.host);
  return isCnMBookingDomain;
};
const getBrand = () => {
  if (typeof window === 'undefined') return null;
  if (TEMP_isCNMBrand()) return 'C&M';
  if (window.location.host.startsWith('localhost')) return 'C&M';
  if (window.location.host.includes('stonehouserestaurants.co.uk')) return 'Stonehouse';
  if (window.location.host.includes('browns-restaurants.co.uk')) return 'Browns';
  if (window.location.host.includes('sizzlingpubs.co.uk')) return 'Sizzling';
  if (window.location.host.includes('emberinns.co.uk')) return 'Ember';
  if (window.location.host.includes('allbarone.co.uk')) return 'All Bar One';
  return 'C&M';
};

const collinBrandsPathConversionMap = {
  Stonehouse: '/tablebooking/enquiry-form-completed',
  'All Bar One': '/bookings/dmnc-complete',
  Sizzling: '/tablebooking/enquiry-form-completed',
  Ember: '/tablebooking/enquiry-form-completed'
};
function useCollinsBookingComplete() {
  const {
    trackEvent
  } = useMixpanel();
  const {
    log
  } = useLogging();
  const checkCollinsBookingComplete = React__default.useCallback(() => {
    const brand = getBrand();
    if (!brand) return;
    const conversionPathForBrand = collinBrandsPathConversionMap[brand];
    if (!conversionPathForBrand) return;
    const isConversionPath = window.location.pathname.toLowerCase().includes(conversionPathForBrand.toLowerCase());
    if (!isConversionPath) return;
    log(`useCollinsBookingComplete: Collins booking complete based on path ${conversionPathForBrand} and brand ${brand}`);
    trackEvent('booking_complete', {});
  }, [trackEvent, log]);
  return {
    checkCollinsBookingComplete
  };
}

const headers = {
  'Content-Type': 'application/json'
};
const hostname = getEnvVars().FINGERPRINT_API_HOSTNAME;
const request = {
  get: async (url, params) => {
    return await fetch(url + '?' + new URLSearchParams(params), {
      method: 'GET',
      headers
    });
  },
  post: async (url, body) => {
    return await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
  },
  patch: async (url, body) => {
    return await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });
  },
  put: async (url, body) => {
    return await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
  },
  delete: async url => {
    return await fetch(url, {
      method: 'DELETE',
      headers
    });
  }
};

const useHostname = () => {
  var _window;
  if (((_window = window) === null || _window === void 0 ? void 0 : _window.location) !== undefined) {
    return window.location.hostname;
  }
  return '';
};

const useCollectorMutation = () => {
  const {
    log,
    error
  } = useLogging();
  const {
    appId
  } = useFingerprint();
  const {
    visitor,
    session
  } = useVisitor();
  const requestHost = useHostname();
  return useMutation(data => {
    return request.post(hostname + '/collector/' + (visitor === null || visitor === void 0 ? void 0 : visitor.id), {
      ...data,
      appId,
      visitor,
      sessionId: session === null || session === void 0 ? void 0 : session.id,
      hostname: requestHost
    }).then(response => {
      log('Collector API response', response);
      return response;
    }).catch(err => {
      error('Collector API error', err);
      return err;
    });
  }, {
    onSuccess: () => {}
  });
};

const useExitIntentDelay = (delay = 0) => {
  const {
    log
  } = useLogging();
  const [hasDelayPassed, setHasDelayPassed] = useState(false);
  useEffect(() => {
    log(`Exit intents are suspended because of initiation delay of ${delay}ms`);
    setTimeout(() => {
      setHasDelayPassed(true);
      log('Exit intents can be issued again.');
    }, delay);
  }, [delay]);
  return {
    hasDelayPassed
  };
};

const selectorRateMs = 100;
function useTrackIntentlyModal({
  intently
}) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    trackEvent,
    state: {
      initiated
    }
  } = useMixpanel();
  const {
    log,
    error
  } = useLogging();
  useEffect(() => {
    if (!initiated) return;
    if (!intently) return;
    const id = setInterval(() => {
      const intentlyOuterContainer = document.querySelector('smc-overlay-outer');
      if (!intentlyOuterContainer) {
        return;
      }
      const isIntentlyOuterVisible = window.getComputedStyle(intentlyOuterContainer).display === 'block';
      if (!isIntentlyOuterVisible) {
        return;
      }
      const intentlyInnerOverlay = document.querySelector('smc-overlay-inner');
      if (!intentlyInnerOverlay) {
        return;
      }
      log('useTrackIntentlyModal: Located Intently modal. Measuring performance');
      setIsVisible(true);
      trackEvent('trigger_displayed', {
        triggerId: 'Intently',
        triggerType: 'INVOCATION_EXIT_INTENT',
        triggerBehaviour: 'BEHAVIOUR_MODAL',
        time: new Date().toISOString(),
        brand: getBrand()
      });
      clearInterval(id);
    }, selectorRateMs);
    return () => {
      clearInterval(id);
    };
  }, [intently, log, setIsVisible, trackEvent, initiated]);
  const getHandleTrackAction = action => () => {
    log(`useTrackIntentlyModal: user clicked ${action} button`);
    trackEvent(`user_clicked_${action}_button`, {});
  };
  useEffect(() => {
    if (!isVisible) return;
    const closeBtn = document.querySelector('[data-close-type="x_close"]');
    const exitHandler = getHandleTrackAction('exit');
    const ctaBtn = document.querySelector('smc-input-group > span');
    const ctaHandler = getHandleTrackAction('CTA');
    if (closeBtn) closeBtn.addEventListener('click', exitHandler);else error('useTrackIntentlyModal: Could not locate close button, skipping tracking performance.');
    if (ctaBtn) ctaBtn.addEventListener('click', ctaHandler);else error('useTrackIntentlyModal: Could not locate CTA button, skipping tracking performance.');
    return () => {
      ctaBtn === null || ctaBtn === void 0 ? void 0 : ctaBtn.removeEventListener('click', ctaHandler);
      closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.removeEventListener('click', exitHandler);
    };
  }, [error, getHandleTrackAction, isVisible]);
  return {
    isVisible,
    setIsVisible
  };
}
const useRemoveIntently = ({
  intently
}) => {
  const {
    log
  } = useLogging();
  useEffect(() => {
    if (intently) return;
    log('useRemoveIntently: removing intently overlay');
    const runningInterval = setInterval(() => {
      const locatedIntentlyScript = document.querySelectorAll('div[id^=smc-v5-overlay-]');
      Array.prototype.forEach.call(locatedIntentlyScript, node => {
        node.parentNode.removeChild(node);
        log('useRemoveIntently: successfully removed intently overlay');
        clearInterval(runningInterval);
      });
    }, selectorRateMs);
    return () => {
      clearInterval(runningInterval);
    };
  }, [intently, log]);
};
function useIntently() {
  const [intently, setIntently] = useState(true);
  useRemoveIntently({
    intently
  });
  useTrackIntentlyModal({
    intently
  });
  return {
    setIntently,
    intently
  };
}

const useRunOnPathChange = (func, config) => {
  const [lastCollectedPath, setLastCollectedPath] = useState();
  const [lastCollectedHash, setLastCollectedHash] = useState('');
  const [lastCollectedQuery, setLastCollectedQuery] = useState('');
  const {
    log
  } = useLogging();
  useEffect(() => {
    if (config !== null && config !== void 0 && config.skip) {
      log('useRunOnPathChange: skip configured, not capturing');
      return;
    }
    if (!location.pathname) {
      log('useRunOnPathChange: no pathname on location object: ', location);
      return;
    }
    if (location.pathname === lastCollectedPath && location.hash === lastCollectedHash && location.search === lastCollectedQuery) {
      log('useRunOnPathChange: location pathname and last collected are the same ', location.pathname, lastCollectedPath);
      return;
    }
    log('useRunOnPathChange: running for path: ', location.pathname);
    setLastCollectedPath(location.pathname);
    setLastCollectedHash(location.hash);
    setLastCollectedQuery(location.search);
    func();
    return () => {
      log('useRunOnPathChange: clearing 300ms timeout', location.pathname, lastCollectedPath);
    };
  }, [location.pathname, location.hash, location.search, func, setLastCollectedPath, setLastCollectedHash, setLastCollectedQuery, config]);
};

const defaultTriggerCooldown = 60 * 1000;
function useTriggerDelay(cooldownMs = defaultTriggerCooldown) {
  const [lastTriggerTimeStamp, setLastTriggerTimeStamp] = useState(null);
  const startCooldown = React__default.useCallback(() => {
    const currentTimeStamp = Number(new Date());
    setLastTriggerTimeStamp(currentTimeStamp);
  }, [setLastTriggerTimeStamp]);
  const getRemainingCooldownMs = React__default.useCallback(() => {
    if (!lastTriggerTimeStamp) return 0;
    const currentTime = Number(new Date());
    const remainingMS = lastTriggerTimeStamp + cooldownMs - currentTime;
    if (remainingMS < 0) return 0;
    return remainingMS;
  }, [lastTriggerTimeStamp, cooldownMs]);
  const canNextTriggerOccur = React__default.useCallback(() => {
    return getRemainingCooldownMs() === 0;
  }, [getRemainingCooldownMs]);
  return {
    startCooldown,
    canNextTriggerOccur,
    getRemainingCooldownMs
  };
}

function isUndefined(o) {
  return typeof o === 'undefined';
}
function getReducedSearchParams() {
  if (isUndefined(window)) return {};
  return new URLSearchParams(window.location.search).toString().split('&').reduce((acc, cur) => {
    const [key, value] = cur.split('=');
    if (!key) return acc;
    acc[key] = value;
    return acc;
  }, {});
}
function getPagePayload() {
  if (isUndefined(window)) return null;
  const params = getReducedSearchParams();
  return {
    url: window.location.href,
    path: window.location.pathname,
    title: document.title,
    params
  };
}
function getReferrer() {
  const params = getReducedSearchParams();
  return {
    url: document.referrer,
    title: '',
    utm: {
      source: params === null || params === void 0 ? void 0 : params.utm_source,
      medium: params === null || params === void 0 ? void 0 : params.utm_medium,
      campaign: params === null || params === void 0 ? void 0 : params.utm_campaign,
      term: params === null || params === void 0 ? void 0 : params.utm_term,
      content: params === null || params === void 0 ? void 0 : params.utm_content
    }
  };
}

const getVisitorId = () => {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  const vid = urlParams.get('v_id');
  return vid;
};
const hasVisitorIDInURL = () => {
  return getVisitorId() !== null;
};

const defaultIdleStatusDelay = 5 * 1000;
function CollectorProvider({
  children,
  handlers = []
}) {
  const {
    log,
    error
  } = useLogging();
  const {
    booted,
    initialDelay,
    exitIntentTriggers,
    idleTriggers,
    pageLoadTriggers,
    config
  } = useFingerprint();
  const configIdleDelay = config === null || config === void 0 ? void 0 : config.idleDelay;
  const {
    visitor,
    session,
    setVisitor
  } = useVisitor();
  const {
    canNextTriggerOccur,
    startCooldown,
    getRemainingCooldownMs
  } = useTriggerDelay(config === null || config === void 0 ? void 0 : config.triggerCooldown);
  const {
    trackEvent
  } = useMixpanel();
  const {
    mutateAsync: collect
  } = useCollectorMutation();
  const {
    checkCollinsBookingComplete
  } = useCollinsBookingComplete();
  const {
    registerHandler,
    resetState: reRegisterExitIntent
  } = useExitIntent({
    cookie: {
      key: '_cm_exit',
      daysToExpire: 0
    }
  });
  const getIdleStatusDelay = React__default.useCallback(() => {
    const idleDelay = configIdleDelay || defaultIdleStatusDelay;
    const cooldownDelay = getRemainingCooldownMs();
    const delayAdjustedForCooldown = idleDelay + cooldownDelay;
    log(`Setting idle delay at ${delayAdjustedForCooldown}ms (cooldown ${cooldownDelay}ms + config.delay ${idleDelay}ms)`);
    return delayAdjustedForCooldown;
  }, [configIdleDelay, getRemainingCooldownMs, log]);
  const [idleTimeout, setIdleTimeout] = useState(getIdleStatusDelay());
  const [pageTriggers, setPageTriggersState] = useState([]);
  const {
    setIntently
  } = useIntently();
  const [displayTriggers, setDisplayedTriggers] = useState([]);
  const [foundWatchers, setFoundWatchers] = useState(new Map());
  const setPageTriggers = React__default.useCallback(triggers => {
    setPageTriggersState(prev => {
      const nonDismissed = prev.filter(tr => displayTriggers.includes(tr.id));
      return uniqueBy([...(triggers || []), ...nonDismissed], 'id');
    });
  }, [setPageTriggersState, displayTriggers]);
  const getHandlerForTrigger = React__default.useCallback(_trigger => {
    const potentialHandler = handlers === null || handlers === void 0 ? void 0 : handlers.find(handler => handler.behaviour === _trigger.behaviour);
    if (!potentialHandler) return null;
    return potentialHandler;
  }, [handlers]);
  const removeActiveTrigger = useCallback(id => {
    log(`CollectorProvider: removing id:${id} from displayTriggers`);
    const refreshedTriggers = displayTriggers.filter(triggerId => triggerId !== id);
    setDisplayedTriggers(refreshedTriggers);
    setPageTriggersState(prev => prev.filter(trigger => trigger.id !== id));
  }, [displayTriggers, log, setPageTriggers]);
  const TriggerComponent = React__default.useCallback(() => {
    if (!displayTriggers) return null;
    const activeTriggers = pageTriggers.filter(trigger => displayTriggers.includes(trigger.id));
    if (!activeTriggers) {
      error(`No trigger found for displayTriggers`, displayTriggers);
      return null;
    }
    log('CollectorProvider: available handlers include: ', handlers);
    log('CollectorProvider: activeTriggers to match are: ', activeTriggers);
    log('CollectorProvider: attempting to show trigger', activeTriggers);
    return activeTriggers.map(trigger => {
      var _handler$invoke;
      const handler = getHandlerForTrigger(trigger);
      if (!handler) {
        log('No handler found for trigger', trigger);
        return null;
      }
      if (!handler.invoke) {
        log('No invoke method found for handler', handler);
        return null;
      }
      const potentialComponent = (_handler$invoke = handler.invoke) === null || _handler$invoke === void 0 ? void 0 : _handler$invoke.call(handler, trigger);
      if (potentialComponent && React__default.isValidElement(potentialComponent)) {
        log('CollectorProvider: Potential component for trigger is valid. Mounting');
        return potentialComponent;
      }
      log('CollectorProvider: Potential component for trigger invalid. Running as regular func.');
      return null;
    });
  }, [displayTriggers, pageTriggers, log, handlers, error, getHandlerForTrigger]);
  const getIsBehaviourVisible = React__default.useCallback(type => {
    if (displayTriggers.length === 0) return false;
    if (displayTriggers.find(triggerId => {
      var _pageTriggers$find;
      return ((_pageTriggers$find = pageTriggers.find(trigger => trigger.id === triggerId)) === null || _pageTriggers$find === void 0 ? void 0 : _pageTriggers$find.behaviour) === type;
    })) return true;
    return false;
  }, [displayTriggers, pageTriggers]);
  const setDisplayedTriggerByInvocation = React__default.useCallback(invocation => {
    const invokableTrigger = pageTriggers.find(trigger => trigger.invocation === invocation);
    if (!invokableTrigger) {
      log('CollectorProvider: Trigger not invokable ', invokableTrigger);
      return;
    }
    if (getIsBehaviourVisible(invokableTrigger.behaviour)) {
      log('CollectorProvider: Behaviour already visible, not showing trigger', invokableTrigger);
      return;
    }
    setDisplayedTriggers(ts => [...ts, invokableTrigger.id]);
  }, [pageTriggers, setDisplayedTriggers, getIsBehaviourVisible]);
  const fireIdleTrigger = useCallback(() => {
    if (!idleTriggers) return;
    log('CollectorProvider: attempting to fire idle time trigger');
    setDisplayedTriggerByInvocation('INVOCATION_IDLE_TIME');
    startCooldown();
  }, [idleTriggers, log, setDisplayedTriggerByInvocation, startCooldown]);
  const {
    hasDelayPassed
  } = useExitIntentDelay(config === null || config === void 0 ? void 0 : config.exitIntentDelay);
  const fireExitTrigger = React__default.useCallback(() => {
    if (!hasDelayPassed) {
      log(`Unable to launch exit intent, because of the exit intent delay hasn't passed yet.`);
      log('Re-registering handler');
      reRegisterExitIntent();
      return;
    }
    if (!canNextTriggerOccur()) {
      log(`Tried to launch EXIT trigger, but can't because of cooldown, ${getRemainingCooldownMs()}ms remaining. 
        I will attempt again when the same signal occurs after this passes.`);
      log('Re-registering handler');
      reRegisterExitIntent();
      return;
    }
    log('CollectorProvider: attempting to fire exit trigger');
    setDisplayedTriggerByInvocation('INVOCATION_EXIT_INTENT');
    startCooldown();
  }, [displayTriggers === null || displayTriggers === void 0 ? void 0 : displayTriggers.length, hasDelayPassed, canNextTriggerOccur, log, setDisplayedTriggerByInvocation, startCooldown, reRegisterExitIntent, getRemainingCooldownMs]);
  useEffect(() => {
    if (!exitIntentTriggers) return;
    log('CollectorProvider: attempting to register exit trigger');
    registerHandler({
      id: 'clientTrigger',
      handler: fireExitTrigger
    });
  }, [exitIntentTriggers, fireExitTrigger, log, registerHandler]);
  const fireOnLoadTriggers = useCallback(() => {
    if (!pageLoadTriggers) return;
    if (!(pageTriggers !== null && pageTriggers !== void 0 && pageTriggers.length)) return;
    log('CollectorProvider: attempting to fire on-page-load trigger');
    setDisplayedTriggerByInvocation('INVOCATION_PAGE_LOAD');
  }, [pageLoadTriggers, log, setDisplayedTriggerByInvocation]);
  const collectAndApplyVisitorInfo = React__default.useCallback(() => {
    if (!visitor.id) {
      log('CollectorProvider: Not yet collecting, awaiting visitor ID');
      return;
    }
    log('CollectorProvider: collecting data');
    if (hasVisitorIDInURL()) {
      trackEvent('abandoned_journey_landing', {
        from_email: true
      });
    }
    const hash = window.location.hash.substring(3);
    const hashParams = hash.split('&').reduce((result, item) => {
      const parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});
    if (hashParams.id_token) {
      log('CollectorProvider: user logged in event fired');
      trackEvent('user_logged_in', {});
      collect({
        account: {
          token: hashParams.id_token
        }
      }).then(async response => {
        const payload = await response.json();
        log('Sent login collector data, retrieved:', payload);
      }).catch(err => {
        error('failed to store collected data', err);
      });
    }
    collect({
      page: getPagePayload() || undefined,
      referrer: getReferrer() || undefined
    }).then(async response => {
      if (response.status === 204) {
        setIntently(true);
        return;
      }
      const payload = await response.json();
      log('Sent collector data, retrieved:', payload);
      setIdleTimeout(getIdleStatusDelay());
      setPageTriggers(payload === null || payload === void 0 ? void 0 : payload.pageTriggers);
      const cohort = payload.intently ? 'intently' : 'fingerprint';
      if (visitor.cohort !== cohort) setVisitor({
        cohort
      });
      if (!payload.intently) {
        log('CollectorProvider: user is in Fingerprint cohort');
        setIntently(false);
      } else {
        log('CollectorProvider: user is in Intently cohort');
        setIntently(true);
      }
    }).catch(err => {
      error('failed to store collected data', err);
    });
    log('CollectorProvider: collected data');
  }, [collect, log, error, setVisitor, visitor, handlers, getIdleStatusDelay, setIdleTimeout, trackEvent, setPageTriggers]);
  const registerWatcher = React__default.useCallback((configuredSelector, configuredSearch) => {
    const intervalId = setInterval(() => {
      const inputs = document.querySelectorAll(configuredSelector);
      let found = false;
      inputs.forEach(element => {
        if (configuredSearch === '' && window.getComputedStyle(element).display !== 'none') {
          found = true;
        } else if (element.textContent === configuredSearch) {
          found = true;
        }
        if (found && !foundWatchers[configuredSelector]) {
          trackEvent('booking_complete', {});
          foundWatchers[configuredSelector] = true;
          setFoundWatchers(foundWatchers);
          collect({
            elements: [{
              path: window.location.pathname,
              selector: configuredSelector
            }]
          }).then(async response => {
            const payload = await response.json();
            log('Sent collector data, retrieved:', payload);
            setIdleTimeout(getIdleStatusDelay());
            setPageTriggers(payload === null || payload === void 0 ? void 0 : payload.pageTriggers);
          }).catch(err => {
            error('failed to store collected data', err);
          });
          clearInterval(intervalId);
        }
      });
    }, 500);
    return intervalId;
  }, [collect, error, foundWatchers, getIdleStatusDelay, log, session, setIdleTimeout, trackEvent, visitor]);
  useEffect(() => {
    if (!visitor.id) return;
    const intervalIds = [registerWatcher('.stage-5', '')];
    return () => {
      intervalIds.forEach(intervalId => clearInterval(intervalId));
    };
  }, [registerWatcher, visitor]);
  const setActiveTrigger = React__default.useCallback(trigger => {
    log('CollectorProvider: manually setting trigger', trigger);
    setPageTriggers([trigger]);
    setDisplayedTriggerByInvocation(trigger.invocation);
  }, [log, setDisplayedTriggerByInvocation, setPageTriggers]);
  const collectorContextVal = React__default.useMemo(() => ({
    setPageTriggers,
    removeActiveTrigger,
    setActiveTrigger,
    trackEvent
  }), [setPageTriggers, removeActiveTrigger, setActiveTrigger, trackEvent]);
  useEffect(() => {
    fireOnLoadTriggers();
  }, [fireOnLoadTriggers]);
  useRunOnPathChange(checkCollinsBookingComplete, {
    skip: !booted,
    delay: initialDelay
  });
  useRunOnPathChange(collectAndApplyVisitorInfo, {
    skip: !booted,
    delay: initialDelay
  });
  const onPresenseChange = React__default.useCallback(presence => {
    log('presence changed', presence);
  }, [log]);
  return React__default.createElement(IdleTimerProvider, {
    timeout: idleTimeout,
    onPresenceChange: onPresenseChange,
    onIdle: fireIdleTrigger
  }, React__default.createElement(CollectorContext.Provider, {
    value: collectorContextVal
  }, children, TriggerComponent()));
}
const CollectorContext = createContext({
  setPageTriggers: () => {
    console.error('setPageTriggers not implemented correctly');
  },
  removeActiveTrigger: () => {
    console.error('removeActiveTrigger not implemented correctly');
  },
  setActiveTrigger: () => {
    console.error('setActiveTrigger not implemented correctly');
  },
  trackEvent: () => {
    console.error('trackEvent not implemented correctly');
  }
});

const useCollector = () => {
  return useContext(CollectorContext);
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol = _root.Symbol;

var _Symbol = Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol_1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/* Built-in method references that are verified to be native. */
var Map$1 = _getNative(_root, 'Map');

var _Map = Map$1;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache;

var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize_1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = _memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }
  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }
  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = _castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get;

const defualtFormatString = val => val;
const getInterpolate = structure => {
  const interpolate = (text, formatString = defualtFormatString) => {
    const replacedText = text.replace(/\{\{\s*\.?([\w]+)\s*\}\}/g, (match, keys) => {
      let value = get_1(structure, keys);
      if (formatString) value = formatString(value);
      return value !== undefined ? value : match;
    });
    return replacedText;
  };
  return interpolate;
};

const getPositiveDateDiffInSec = (date1, date2) => {
  return Math.abs(Math.floor((date2.getTime() - date1.getTime()) / 1000));
};
function formatTimeStamp(targetDate) {
  const durationInSeconds = getPositiveDateDiffInSec(new Date(), targetDate);
  const days = Math.floor(durationInSeconds / (60 * 60 * 24));
  const hours = Math.floor(durationInSeconds % (60 * 60 * 24) / (60 * 60));
  const minutes = Math.floor(durationInSeconds % (60 * 60) / 60);
  const seconds = durationInSeconds % 60;
  const parts = [];
  if (days > 0) {
    parts.push(`${days} day${days > 1 ? 's' : ''}`);
  }
  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  }
  if (seconds > 0) {
    parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
  }
  if (parts.length === 0) {
    return '0 sec';
  }
  if (parts.length === 1) {
    return parts[0];
  }
  const lastPart = parts.pop();
  const formattedDuration = parts.join(' ') + ` and ${lastPart}`;
  return formattedDuration;
}
const useCountdown = ({
  onZero,
  initialTimestamp,
  interpolate
}) => {
  const {
    error
  } = useLogging();
  const [timestamp, setTimeStamp] = useState(initialTimestamp || null);
  const [countdown, setCountdown] = useState('');
  const [intId, setIntId] = useState();
  useEffect(() => {
    if (timestamp === null) return;
    const id = setInterval(() => {
      const result = formatTimeStamp(new Date(timestamp));
      setCountdown(result);
    }, 1000);
    setIntId(id);
    return () => clearInterval(id);
  }, [timestamp]);
  useEffect(() => {
    if (!onZero) return;
    if (timestamp === null) return;
    const currentDate = new Date();
    const diff = getPositiveDateDiffInSec(currentDate, new Date(timestamp));
    if (diff <= 0) {
      onZero();
      clearInterval(intId);
    }
  }, [onZero, timestamp, intId]);
  const interpolatefunc = useMemo(() => getInterpolate(interpolate === null || interpolate === void 0 ? void 0 : interpolate.structure), [interpolate]);
  const formattedCountdown = useMemo(() => {
    if (!interpolate) {
      error('No interpolation provided to timer. Rendering just countdown.');
      return countdown;
    }
    if (!interpolatefunc) {
      error("interpolatefunc couldn't be created. Rendering just countdown.");
      return countdown;
    }
    if (!(interpolate !== null && interpolate !== void 0 && interpolate.text)) {
      error('No text provided to timer interpolation. Rendering just countdown.');
      return countdown;
    }
    const formatVal = val => formatTimeStamp(new Date(val));
    const interpoaltedVal = interpolatefunc(interpolate.text, formatVal);
    return interpoaltedVal;
  }, [countdown, interpolate, interpolatefunc]);
  return {
    countdown,
    setTimeStamp,
    formattedCountdown
  };
};

const useSeenMutation = () => {
  const {
    log,
    error
  } = useLogging();
  const {
    appId
  } = useFingerprint();
  const {
    trackEvent
  } = useMixpanel();
  const {
    setPageTriggers
  } = useCollector();
  const {
    visitor
  } = useVisitor();
  const trackTriggerSeen = React__default.useCallback(trigger => {
    trackEvent('trigger_displayed', {
      triggerId: trigger.id,
      triggerType: trigger.invocation,
      triggerBehaviour: trigger.behaviour,
      time: new Date().toISOString(),
      brand: getBrand()
    });
  }, [trackEvent]);
  return useMutation(trigger => {
    trackTriggerSeen(trigger);
    return request.put(`${hostname}/triggers/${appId}/${visitor.id}/seen`, {
      seenTriggerIDs: [trigger.id],
      visitor,
      page: getPagePayload()
    }).then(response => {
      log('Seen mutation: response', response);
      return response;
    }).catch(err => {
      error('Seen mutation: error', err);
      return err;
    });
  }, {
    mutationKey: ['seen'],
    onSuccess: async res => {
      const r = await res.json();
      log('Seen mutation: replacing triggers with:', r.pageTriggers);
      setPageTriggers(r.pageTriggers);
      return r;
    }
  });
};

const resetPad = () => {
  document.body.style.paddingTop = 'inherit';
};
const Banner = ({
  trigger
}) => {
  var _trigger$data3, _trigger$data4, _trigger$data5;
  const container = useRef(null);
  const {
    removeActiveTrigger
  } = useCollector();
  const {
    trackEvent
  } = useMixpanel();
  const [open, setOpen] = useState(true);
  const [hasFired, setHasFired] = useState(false);
  const {
    mutate: runSeen,
    isSuccess,
    isLoading
  } = useSeenMutation();
  useEffect(() => {
    if (!open) return;
    if (hasFired) return;
    if (isSuccess) return;
    if (isLoading) return;
    const tId = setTimeout(() => {
      runSeen(trigger);
    }, 500);
    setHasFired(true);
    return () => {
      clearTimeout(tId);
    };
  }, [open, isSuccess, isLoading]);
  const handleClickCallToAction = e => {
    var _trigger$data, _trigger$data2;
    e.preventDefault();
    trackEvent('user_clicked_button', trigger);
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_blank');
    setOpen(false);
    resetPad();
  };
  const handleClose = () => {
    trackEvent('user_closed_trigger', trigger);
    removeActiveTrigger(trigger.id);
    setOpen(false);
    resetPad();
  };
  const {
    formattedCountdown
  } = useCountdown({
    onZero: handleClose,
    initialTimestamp: new Date(((_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.countdownEndTime) || ''),
    interpolate: {
      text: (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.marketingText,
      structure: trigger.data
    }
  });
  const interpolate = React__default.useMemo(() => getInterpolate(trigger.data || {}), [trigger.data]);
  useEffect(() => {
    var _container$current;
    const bannerHeight = (_container$current = container.current) === null || _container$current === void 0 ? void 0 : _container$current.clientHeight;
    document.body.style.paddingTop = `${bannerHeight}px`;
    return resetPad;
  }, [container, formattedCountdown]);
  if (!open) return null;
  if (!formattedCountdown) return null;
  return React__default.createElement("div", {
    ref: container,
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      background: 'linear-gradient(90deg, rgba(200,41,223,1) 0%, #1f62ff 100%)',
      display: 'flex',
      alignItems: 'center'
    }
  }, React__default.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '1000px',
      margin: '0 auto'
    }
  }, React__default.createElement("p", {
    style: {
      lineHeight: '30px',
      margin: '10px',
      color: 'white',
      fontWeight: 600
    }
  }, formattedCountdown), React__default.createElement("button", {
    onClick: handleClickCallToAction,
    style: {
      border: 'none',
      color: 'white',
      backgroundColor: '#EA3385',
      padding: '5px 10px',
      margin: '10px 0',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  }, interpolate(((_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.buttonText) || ''))),  React__default.createElement(CloseButton, {
    onClick: handleClose,
    style: {
      background: 'transparent',
      color: 'white'
    }
  }));
};
const TriggerBanner = ({
  trigger
}) => {
  return ReactDOM.createPortal(React__default.createElement(Banner, {
    trigger: trigger
  }), document.body);
};

const baseUrl = 'https://bookings-bff.starship-staging.com';
const makeFullUrl = (resource, params = {}) => {
  if (resource.startsWith('/')) {
    resource = resource.substring(1);
  }
  const fullUri = `${baseUrl}/${resource}`;
  if (Object.keys(params).length === 0) {
    return fullUri;
  }
  return `${fullUri}?${new URLSearchParams(params).toString()}`;
};
const Button = ({
  children,
  className,
  onClick,
  disabled,
  colour: _colour = 'primary'
}) => {
  let builtButtonClasses = `btn step-button bg-${_colour} border-${_colour} text-white hover:bg-${_colour}/80 disabled:text-${_colour}/50 disabled:border-${_colour}/50` + (className ? ' ' + className : '');
  if (disabled) {
    builtButtonClasses += ' disabled';
  }
  return createElement("button", {
    disabled: disabled,
    className: builtButtonClasses,
    onClick: onClick
  }, children);
};
const Voucher = ({
  details
}) => {
  return createElement("div", null, createElement("h3", null, "Terms of Voucher"), createElement("p", {
    className: 'text-sm'
  }, details.termsAndConditions));
};
const TriggerInverse = ({}) => {
  const landingPage = {};
  const form = {};
  const location = {};
  const [open, setOpen] = useState(true);
  if (!open) {
    return null;
  }
  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm();
  const initialState = {
    busy: false,
    complete: false,
    voucher: null,
    error: null,
    responseStatusCode: 0
  };
  const [state, setState] = useState(initialState);
  async function submitVoucher(data) {
    const reqData = {
      ...data,
      bookingLink: `${location === null || location === void 0 ? void 0 : location.origin}/${landingPage === null || landingPage === void 0 ? void 0 : landingPage.slug}`
    };
    const response = await fetch(makeFullUrl(`campaigns/${form === null || form === void 0 ? void 0 : form.campaign}/voucher?locationID=${landingPage === null || landingPage === void 0 ? void 0 : landingPage.identifier}`), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(reqData)
    });
    response.json().then(responseData => {
      if (response.ok) {
        setState({
          busy: false,
          complete: true,
          voucher: responseData.voucher
        });
      } else {
        setState({
          busy: false,
          error: responseData,
          responseStatusCode: response.status
        });
      }
    });
  }
  async function onSubmit(data) {
    setState({
      busy: true
    });
    try {
      if (form.campaign !== '') {
        submitVoucher(data).then(() => {
          const eventData = {
            item_name: landingPage === null || landingPage === void 0 ? void 0 : landingPage.name,
            affiliation: 'Booking Flow'
          };
          console.log(eventData);
        });
      }
    } catch (e) {}
  }
  if (state.complete === true) {
    return createElement("div", {
      className: 'container'
    }, createElement("h2", null, "Voucher Sent!"), createElement("p", {
      className: 'text-md'
    }, "Good news! We've sent your voucher to the email provided!"), state.voucher && createElement("div", {
      className: 'col-12 mt-3'
    }, createElement(Voucher, {
      details: state.voucher
    })));
  }
  if (state.responseStatusCode === 409) {
    return createElement("div", {
      className: 'container'
    }, createElement("h2", {
      className: 'mt-3'
    }, "Uh-oh!"), createElement("p", null, "It seems that you already received this voucher. Please get in touch if this doesn't seem right:\u00A0", createElement("a", {
      href: '/help',
      className: 'underline font-serif tracking-wide',
      onClick: () => setOpen(false)
    }, "contact us")));
  }
  return createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999
    }
  }, createElement("main", {
    className: 'flex-grow flex flex-col justify-center container relative'
  }, createElement("div", {
    className: 'w-full'
  }, createElement("div", {
    className: 'cms-content text-center md:text-left'
  }, createElement("h2", null, "Get Your Voucher"), createElement("p", null, "To receive your voucher, we just need a few details from you."), createElement("h3", {
    className: `bar-title border-l-4 border-solid border-${landingPage === null || landingPage === void 0 ? void 0 : landingPage.colour}`
  }, "Contact Info"), createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("div", {
    className: 'grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2'
  }, createElement("div", null, createElement("label", {
    htmlFor: 'first_name'
  }, "First Name*"), createElement("input", Object.assign({}, register('firstName', {
    required: true,
    minLength: 2,
    maxLength: 30,
    validate: value => value.trim().length >= 2
  }), {
    type: 'text',
    className: 'form-input',
    id: 'firstName'
  }))), createElement("div", null, createElement("label", {
    htmlFor: 'last_name'
  }, "Last Name*"), createElement("input", Object.assign({}, register('lastName', {
    required: true,
    minLength: 2,
    maxLength: 30,
    validate: value => value.trim().length >= 2
  }), {
    type: 'text',
    className: 'form-input',
    id: 'lastName'
  }))), createElement("div", null, createElement("label", {
    htmlFor: 'email'
  }, "Email*"), createElement("input", Object.assign({}, register('emailAddress', {
    required: true
  }), {
    type: 'email',
    className: 'form-input',
    id: 'email'
  })))), createElement("div", null, createElement("p", null, "* Required Field")), createElement("div", {
    className: 'flex gap-x-6 gap-y-2 items-center flex-wrap justify-center lg:justify-start'
  }, createElement("div", {
    className: 'form-check'
  }, createElement("input", Object.assign({
    type: 'checkbox'
  }, register('terms', {
    required: true
  }), {
    className: 'form-check-input',
    id: 'terms'
  })), ' ', createElement("label", {
    htmlFor: 'terms',
    className: 'form-check-label'
  }, "I confirm that I have read & agreed with the", ' ', createElement("a", {
    href: landingPage === null || landingPage === void 0 ? void 0 : landingPage.privacyPolicy,
    target: '_blank',
    rel: 'noreferrer'
  }, "Privacy Policy"), "*")), createElement(Button, {
    className: 'btn mt-2 md:mt-0',
    type: 'submit',
    colour: landingPage === null || landingPage === void 0 ? void 0 : landingPage.colour,
    disabled: state.busy || isSubmitting
  }, isSubmitting || state.busy ? 'Sending Voucher...' : 'Get My Voucher')), state.error && state.responseStatusCode !== 409 && createElement("div", {
    className: `alert mt-5 bg-${landingPage === null || landingPage === void 0 ? void 0 : landingPage.colour}/20`
  }, "There was a problem sending your voucher. Please check your details and try again."))))));
};

const getModalStylesBySize = size => {
  switch (size) {
    case 'small':
      {
        return {
          width: '90%',
          maxWidth: 400,
          minHeight: 300
        };
      }
    case 'medium':
      {
        return {
          width: '90%',
          maxWidth: 800,
          minHeight: 400
        };
      }
    case 'large':
      {
        return {
          width: '90%',
          maxWidth: 1200,
          minHeight: 400
        };
      }
    case 'full':
      {
        return {
          width: '100vw',
          height: '100vh'
        };
      }
  }
};
const getModalButtonStylesBySize = size => {
  switch (size) {
    case 'small':
      {
        return {
          fontSize: '1.3rem',
          padding: '0.3rem 1rem'
        };
      }
    case 'medium':
      {
        return {
          fontSize: '1.3rem',
          padding: '0.3rem 1rem'
        };
      }
    case 'large':
      {
        return {
          fontSize: '1.3rem',
          padding: '0.3rem 1rem'
        };
      }
    case 'full':
      {
        return {
          fontSize: '1.5rem',
          padding: '0.5rem 1.2rem'
        };
      }
  }
};
const getModalButtonFlexPosition = position => {
  switch (position) {
    case 'left':
      return {
        justifyContent: 'flex-start'
      };
    case 'right':
      return {
        justifyContent: 'flex-end'
      };
    case 'center':
      return {
        justifyContent: 'center'
      };
  }
};
const randomHash = 'f' + v4().split('-')[0];
const prependClass = className => `f${randomHash}-${className}`;

const FullyClickableModal = ({
  handleClickCallToAction,
  handleCloseModal,
  style,
  imageURL
}) => {
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const {
    height,
    width
  } = style;
  const appendResponsiveBehaviour = React__default.useCallback(() => {
    return isMobile ? `.${prependClass('modal')} {
      max-width: 95%;
      max-height: 95%;
    }` : `

@media screen and (max-width: 1400px) {
  .${prependClass('modal')} {
    height: ${0.8 * height}px;
    width: ${0.8 * width}px;
  }
}
@media screen and (max-width: 1100px) {
  .${prependClass('modal')} {
    height: ${0.6 * height}px;
    width: ${0.6 * width}px;
  }
}

@media screen and (max-width: 450px) {
  .${prependClass('modal')} {
    height: ${0.4 * height}px;
    width: ${0.4 * width}px;
  }
}

`;
  }, [style]);
  useEffect(() => {
    const cssToApply = `
  
    .${prependClass('overlay')} {
      background-color: rgba(0, 0, 0, 0.7);
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      font-style: normal;
    }
    
    .${prependClass('modal')} {
      height: ${height}px;
      width: ${width}px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-shadow: var(--text-shadow);
      ${ 'transition: all 0.3s ease-in-out;' }
      ${ 'cursor: pointer;' }
    }

    ${ `.${prependClass('modal')}:hover {
      filter: brightness(1.05);
      box-shadow: 0.1rem 0.1rem 10px #7b7b7b;
    }` }
    
    
    .${prependClass('text-center')} {
      text-align: center;
    }
  
    .${prependClass('text-container')} {
      flex-direction: column;
      flex: 1;
      text-shadow: var(--text-shadow);
      display: grid;
      place-content: center;
    }
    
    .${prependClass('main-text')} {
      font-weight: 500;
      font-size: 2rem;
      font-style: normal;
      text-align: center;
      margin-bottom: 1rem;
      fill: var(--secondary);
      text-shadow: var(--text-shadow);
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    
    }
    
    .${prependClass('sub-text')} {
      margin: auto;
      font-weight: 600;
      font-size: 1.2rem;
    
      text-align: center;
      text-transform: uppercase;
    }

    .${prependClass('close-button')} {
      border-radius: 100%;
      background-color: white;
      width: 2rem;
      border: none;
      height: 2rem;
      position: absolute;
      margin: 10px;
      top: 0px;
      right: 0px;
      color: black;
      font-size: 1.2rem;
      font-weight: 300;
      cursor: pointer;
      display: grid;
      place-content: center;
    }
    
    .${prependClass('close-button:hover')} {
      transition: all 0.3s;
      filter: brightness(0.95);
    }
    
    .${prependClass('image-darken')} {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      padding: 2rem 1.5rem 1.5rem 1.5rem;
    }
    
    .${prependClass('text-shadow')} {
      text-shadow: var(--text-shadow);
    }
    
    .${prependClass('box-shadow')} {
      box-shadow: var(--text-shadow);
    }

    ${appendResponsiveBehaviour()}
    `;
    const styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(cssToApply));
    document.head.appendChild(styles);
    setTimeout(() => {
      setStylesLoaded(true);
    }, 500);
    return () => {
      document.head.removeChild(styles);
    };
  }, [style, appendResponsiveBehaviour]);
  const handleModalAction = React__default.useCallback(e => {
    e.stopPropagation();
    return handleClickCallToAction(e);
  }, [handleClickCallToAction]);
  const handleClickClose = React__default.useCallback(e => {
    e.stopPropagation();
    return handleCloseModal(e);
  }, [handleCloseModal]);
  if (!stylesLoaded) {
    return null;
  }
  return React__default.createElement("div", {
    className: prependClass('overlay')
  }, React__default.createElement("div", {
    className: prependClass('modal'),
    onClick: handleModalAction,
    style: {
      background: `url(${imageURL})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative'
    }
  }, React__default.createElement("div", {
    className: prependClass('close-button')
  }, React__default.createElement(CloseButton, {
    onClick: handleClickClose
  }))));
};

const defaultElementSize = 'medium';
const defaultButtonPosition = 'right';
const CnMStandardModal = ({
  trigger,
  handleClickCallToAction,
  handleCloseModal
}) => {
  var _useFingerprint$confi, _useFingerprint$confi2, _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  const modalConfig = (_useFingerprint$confi = useFingerprint().config) === null || _useFingerprint$confi === void 0 ? void 0 : (_useFingerprint$confi2 = _useFingerprint$confi.triggerConfig) === null || _useFingerprint$confi2 === void 0 ? void 0 : _useFingerprint$confi2.modal;
  const elementSize = (modalConfig === null || modalConfig === void 0 ? void 0 : modalConfig.size) || defaultElementSize;
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const modalSizeStyle = getModalStylesBySize(elementSize);
  const buttonSizeStyle = getModalButtonStylesBySize(elementSize);
  useEffect(() => {
    const cssToApply = `
    :root {
      --primary: white;
      --secondary: grey;
      --text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    a,
    span {
      line-height: 1.2;
      font-family: Arial, Helvetica, sans-serif;
    
    }
    
    .${prependClass('overlay')} {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      font-style: normal;
    }
    
    .${prependClass('modal')} {
      width: 80%;
      height: 500px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-shadow: var(--text-shadow);
    }
    
    
    .${prependClass('text-center')} {
      text-align: center;
    }
  
    .${prependClass('text-container')} {
      flex-direction: column;
      flex: 1;
      text-shadow: var(--text-shadow);
      display: grid;
      place-content: center;
    }
    
    .${prependClass('main-text')} {
      font-weight: 500;
      font-size: 2rem;
      font-style: normal;
      text-align: center;
      margin-bottom: 1rem;
      fill: var(--secondary);
      text-shadow: var(--text-shadow);
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    
    }
    
    .${prependClass('sub-text')} {
      margin: auto;
      font-weight: 600;
      font-size: 1.2rem;
    
      text-align: center;
      text-transform: uppercase;
    }
    
    .${prependClass('cta')} {
      cursor: pointer;
      background-color: var(--secondary);
      border-radius: 2px;
      display: block;
      font-size: 1.3rem;
      color: var(--primary);
      text-align: center;
      text-transform: uppercase;
      margin: 0 auto;
      text-decoration: none;
      box-shadow: 0.3rem 0.3rem white;
    }
    
    .${prependClass('cta:hover')} {
      transition: all 0.3s;
      filter: brightness(0.95);
    }
    
    .${prependClass('close-button')} {
      border-radius: 100%;
      background-color: white;
      width: 2rem;
      border: none;
      height: 2rem;
      position: absolute;
      margin: 10px;
      top: 0px;
      right: 0px;
      color: black;
      font-size: 1.2rem;
      font-weight: 300;
      cursor: pointer;
      display: grid;
      place-content: center;
    }
    
    .${prependClass('close-button:hover')} {
      transition: all 0.3s;
      filter: brightness(0.95);
    }
    
    .${prependClass('image-darken')} {
      background: rgba(0, 0, 0, 0.1);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      padding: 2rem 1.5rem 1.5rem 1.5rem;
    }
    
    .${prependClass('text-shadow')} {
      text-shadow: var(--text-shadow);
    }
    
    .${prependClass('box-shadow')} {
      box-shadow: var(--text-shadow);
    }
    `;
    const styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(cssToApply));
    document.head.appendChild(styles);
    setTimeout(() => {
      setStylesLoaded(true);
    }, 500);
  }, []);
  if (!stylesLoaded) {
    return null;
  }
  return React__default.createElement("div", {
    className: prependClass('overlay')
  }, React__default.createElement("div", {
    className: prependClass('modal'),
    style: {
      background: `url(${trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      ...modalSizeStyle
    }
  }, React__default.createElement("div", {
    className: prependClass('image-darken')
  }, React__default.createElement("button", {
    className: prependClass('close-button'),
    onClick: handleCloseModal
  }, React__default.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '20',
    height: '20',
    viewBox: '0 0 16 16'
  }, React__default.createElement("path", {
    fill: '#000',
    fillRule: 'evenodd',
    d: 'M8.707 8l3.647-3.646a.5.5 0 0 0-.708-.708L8 7.293 4.354 3.646a.5.5 0 1 0-.708.708L7.293 8l-3.647 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8z'
  }))), React__default.createElement("div", {
    className: prependClass('text-container')
  }, React__default.createElement("h1", {
    className: prependClass('main-text')
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.heading), React__default.createElement("p", {
    className: prependClass('sub-text')
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.paragraph)), React__default.createElement("div", {
    style: {
      display: 'flex',
      ...getModalButtonFlexPosition((modalConfig === null || modalConfig === void 0 ? void 0 : modalConfig.buttonPosition) || defaultButtonPosition)
    }
  }, React__default.createElement("div", null, React__default.createElement("a", {
    href: trigger === null || trigger === void 0 ? void 0 : (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.buttonURL,
    className: prependClass('cta'),
    onClick: handleClickCallToAction,
    style: buttonSizeStyle
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.buttonText))))));
};

const CurlyText = ({
  randomHash,
  text
}) => {
  return React__default.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    version: '1.1',
    viewBox: '0 0 500 500',
    className: 'f' + randomHash + '-curlyText'
  }, React__default.createElement("defs", null, React__default.createElement("path", {
    id: 'textPath',
    d: 'M 0 500 A 175,100 0 0 1 500,500'
  })), React__default.createElement("text", {
    x: '0',
    y: '0',
    textAnchor: 'middle'
  }, React__default.createElement("textPath", {
    xlinkHref: '#textPath',
    fill: 'white',
    startOffset: '50%'
  }, text)));
};
const BrownsModal = ({
  trigger,
  handleClickCallToAction,
  handleCloseModal
}) => {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const randomHash = useMemo(() => {
    return v4().split('-')[0];
  }, []);
  useEffect(() => {
    const css = `
      @import url("https://p.typekit.net/p.css?s=1&k=olr0pvp&ht=tk&f=25136&a=50913812&app=typekit&e=css");

@font-face {
  font-family: "proxima-nova";
  src: url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"), url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"), url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 500;
  font-stretch: normal;
}

:root {
  --primary: #b6833f;
  --secondary: white;
  --text-shadow: 1px 1px 10px rgba(0,0,0,1);
}

.tk-proxima-nova {
  font-family: "proxima-nova", sans-serif;
}

.f` + randomHash + `-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "proxima-nova", sans-serif !important;
  font-weight: 500;
  font-style: normal;
}

.f` + randomHash + `-modal {
  width: 80%;
  max-width: 400px;
  height: 500px;
  overflow: hidden;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
}

@media screen and (min-width: 768px) {
  .f` + randomHash + `-modal {
    width: 50%;
    max-width: 600px;
  }
}

.f` + randomHash + `-modalImage {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}


@media screen and (max-width:768px) {
  .f` + randomHash + `-modal {
    width: 100vw;
  }
}


.f` + randomHash + `-curlyText {
  font-family: "proxima-nova", sans-serif;
  font-weight: 500;
  font-style: normal;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 2pt;
  fill: var(--secondary);
  text-shadow: var(--text-shadow);
  margin-top: -150px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.f` + randomHash + `-curlyText text {
  font-size: 1.3rem;
}


.f` + randomHash + `-mainText {
  font-weight: 200;
  font-family: "proxima-nova", sans-serif;
  color: var(--secondary);
  font-size: 2.1rem;
  text-shadow: var(--text-shadow);
  display: inline-block;
  text-align: center;
  margin-top: -4.5rem;
}


@media screen and (min-width: 768px) {
  .f` + randomHash + `-curlyText {
    margin-top: -200px;
  }
}

@media screen and (min-width: 1024px) {
  .f` + randomHash + `-curlyText {
    margin-top: -200px;
  }

  .f` + randomHash + `-mainText {
    font-size: 2.4rem;
  }
}

@media screen and (min-width: 1150px) {
  .f` + randomHash + `-mainText {
    font-size: 2.7rem;
  }
}

.f` + randomHash + `-cta {
  font-family: "proxima-nova", sans-serif;
  cursor: pointer;
  background-color: var(--secondary);
  padding: 0.75rem 3rem;
  border-radius: 8px;
  display: block;
  font-size: 1.3rem;
  color: var(--primary);
  text-align: center;
  text-transform: uppercase;
  max-width: 400px;
  margin: 0 auto;
  text-decoration: none;
}

.f` + randomHash + `-cta:hover {
  transition: all 0.3s;
  filter: brightness(0.95);
}

.f` + randomHash + `-close-button {
  position: absolute;
  top: 0px;
  right: 0px;
}

.f` + randomHash + `-close-button:hover {
  transition: all 0.3s;
  filter: brightness(0.95);
}


.f` + randomHash + `-button-container {
  flex: 1;
  display: grid;
  place-content: center;
}

.f` + randomHash + `-image-darken {
  background: rgba(0,0,0,0.2);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}
    `;
    const styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(css));
    document.head.appendChild(styles);
    setStylesLoaded(true);
  }, [randomHash]);
  if (!stylesLoaded) {
    return null;
  }
  return React__default.createElement("div", {
    className: 'f' + randomHash + '-overlay'
  }, React__default.createElement("div", {
    className: 'f' + randomHash + '-modal',
    style: {
      background: `url(${trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      height: 500
    }
  }, React__default.createElement("div", {
    className: 'f' + randomHash + '-image-darken'
  }, React__default.createElement("div", {
    className: 'f' + randomHash + '-close-button'
  }, React__default.createElement(CloseButton, {
    onClick: handleCloseModal
  })), React__default.createElement(CurlyText, {
    text: trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.heading,
    randomHash: randomHash
  }), React__default.createElement("div", {
    style: {
      flex: 1
    },
    className: 'f' + randomHash + '--spacer'
  }), React__default.createElement("div", {
    style: {
      flex: 1,
      marginTop: -150,
      textTransform: 'uppercase',
      textAlign: 'center',
      letterSpacing: '2pt'
    }
  }, React__default.createElement("span", {
    className: 'f' + randomHash + '-mainText'
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.paragraph)), React__default.createElement("div", {
    className: 'f' + randomHash + '-buttonContainer'
  }, React__default.createElement("a", {
    href: trigger === null || trigger === void 0 ? void 0 : (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.buttonURL,
    className: 'f' + randomHash + '-cta',
    onClick: handleClickCallToAction
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.buttonText)))));
};

const primaryColor = `rgb(33,147,174)`;
const secondaryColor = `#e0aa00`;
const callToActionColor = 'rgb(235,63,43)';
const mainGrey = 'rgb(70,70,70)';
const scaleBg = scale => {
  const imageWidth = 800;
  const imageHeight = 700;
  return {
    height: imageHeight * scale,
    width: imageWidth * scale
  };
};
const StonehouseModal = ({
  trigger,
  handleClickCallToAction,
  handleCloseModal
}) => {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  const [stylesLoaded, setStylesLoaded] = useState(false);
  useEffect(() => {
    const cssToApply = `
      @font-face{
        font-family: "Gotham Bold";
        src: url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.eot?#iefix") format("embedded-opentype"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.woff") format("woff"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.woff2") format("woff2"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.ttf") format("truetype"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.svg#Gotham-Bold") format("svg");
            font-display: auto;
            font-style: normal;
            font-weight: 500;
            font-stretch: normal;
    }
     

      :root {
        --text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      }
  

      .${prependClass('overlay')} {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Gotham Bold';
        font-weight: 500;
        font-style: normal;
      }

      .${prependClass('modal')} {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        box-shadow: var(--text-shadow);
        height: ${scaleBg(0.7).height}px;
        width: ${scaleBg(0.7).width}px;
      }

      .${prependClass('gotham-bold')} {
        font-family: 'Gotham Bold';
      }

      .${prependClass('text-center')} {
        text-align: center;
      }

      .${prependClass('main-text')} {
        line-height: 1.2;
        font-family: 'Gotham Bold';
        font-weight: 500;
        font-style: normal;
        text-transform: uppercase;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
        margin-bottom: -1.5rem;
        font-size: 4.5rem;
      }

      .${prependClass('text-container')} {
        display: grid;
        place-content: center;
        flex: 1;
      }

      .${prependClass('sub-text')} {
        line-height: 1;
        margin: auto;
        font-weight: 600;
        font-family: 'Gotham Bold';
        color: ${secondaryColor};
        letter-spacing: 2pt;
        display: inline-block;
        text-align: center;
        font-size: 2.4rem;
      }

      .${prependClass('cta')} {
        line-height: 1.2;
        font-family: 'Gotham Bold';
        cursor: pointer;
        background-color: ${callToActionColor};
        border-radius: 2px;
        display: block;
        color: white;
        text-align: center;
        text-transform: uppercase;
        margin: 0 auto;
        text-decoration: none;
        box-shadow: -2px 2px 8px black;
        padding: 1.2rem 1.2rem 0.2rem 1.2rem;  
        font-size: 1.3rem;
      }

      .${prependClass('cta:hover')} {
        transition: all 0.3s;
        filter: brightness(0.95);
      }

      .${prependClass('close-button')} {
        position: absolute;
        top: 0px;
        right: 0px;
      }
      .${prependClass('close-button')}:hover {
        transition: all 0.3s;
        filter: brightness(0.95);
      }
      

      .${prependClass('image-container')} {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        padding: 4rem 1.5rem 2rem 1.5rem;
      }

      .${prependClass('text-shadow')} {
        text-shadow: var(--text-shadow);
      }

      .${prependClass('box-shadow')} {
        box-shadow: var(--text-shadow);
      }
      
      @media screen and (max-width: 550px) {
        .${prependClass('modal')} {
          height: ${scaleBg(0.4).height}px;
          width: ${scaleBg(0.4).width}px;
        }
        .${prependClass('main-text')}{
          font-size: 2.5rem;
          margin-bottom: -0.6rem;
        }
        .${prependClass('sub-text')}{
          font-size: 1.9rem;
          letter-spacing: 1.2pt;

        }
        .${prependClass('cta')}{
          padding: 0.8rem 0.8rem 0rem 0.8rem;  
          font-size: 0.8rem;
        }
        .${prependClass('image-container')} {
          padding: 2rem 1.5rem 1rem 1.5rem;
        }
      }
    `;
    const styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(cssToApply));
    document.head.appendChild(styles);
    setTimeout(() => {
      setStylesLoaded(true);
    }, 500);
    return () => {
      document.head.removeChild(styles);
    };
  }, []);
  const textColorByRoute = React__default.useMemo(() => {
    if (location.href.includes('tablebooking')) return {
      heading: {
        color: 'white'
      },
      paragraph: {
        color: secondaryColor
      }
    };
    return {
      heading: {
        color: primaryColor,
        WebkitTextStroke: `2px ${mainGrey}`
      },
      paragraph: {
        color: mainGrey
      }
    };
  }, []);
  if (!stylesLoaded) {
    return null;
  }
  return React__default.createElement("div", {
    className: prependClass('overlay')
  }, React__default.createElement("div", {
    className: prependClass('modal'),
    style: {
      background: `url(${trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative'
    }
  }, React__default.createElement("div", {
    className: prependClass('image-container')
  }, React__default.createElement("div", {
    className: prependClass('close-button')
  }, React__default.createElement(CloseButton, {
    onClick: handleCloseModal
  })), React__default.createElement("div", {
    className: prependClass('text-container')
  }, React__default.createElement("h1", {
    className: prependClass('main-text'),
    style: textColorByRoute.heading
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.heading), React__default.createElement("span", {
    className: prependClass('sub-text'),
    style: textColorByRoute.paragraph
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.paragraph)), React__default.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, React__default.createElement("div", null, React__default.createElement("a", {
    href: trigger === null || trigger === void 0 ? void 0 : (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.buttonURL,
    className: prependClass('cta'),
    onClick: handleClickCallToAction
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.buttonText))))));
};

const Modal = ({
  trigger
}) => {
  const {
    removeActiveTrigger
  } = useCollector();
  const {
    trackEvent
  } = useMixpanel();
  const [open, setOpen] = useState(true);
  const [hasFired, setHasFired] = useState(false);
  const brand = React__default.useMemo(() => {
    return getBrand();
  }, []);
  const {
    mutate: runSeen,
    isSuccess,
    isLoading
  } = useSeenMutation();
  useEffect(() => {
    if (!open) return;
    if (hasFired) return;
    if (isSuccess) return;
    if (isLoading) return;
    const tId = setTimeout(() => {
      runSeen(trigger);
      setHasFired(true);
    }, 1500);
    return () => {
      clearTimeout(tId);
    };
  }, [open, isSuccess, isLoading]);
  if (!open) {
    return null;
  }
  const handleClickCallToAction = e => {
    var _trigger$data, _trigger$data2;
    e.preventDefault();
    trackEvent('user_clicked_button', trigger);
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_self');
  };
  const handleCloseModal = () => {
    trackEvent('user_closed_trigger', trigger);
    removeActiveTrigger(trigger.id);
    setOpen(false);
  };
  const modalProps = {
    trigger: trigger,
    handleClickCallToAction: handleClickCallToAction,
    handleCloseModal: handleCloseModal
  };
  switch (brand) {
    case 'Ember':
      {
        let image = isMobile ? 'https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-booknow-m.jpg' : 'https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-booknow.jpg';
        if (window.location.href.includes('nationalsearch')) image = isMobile ? `https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-findoutmore-m.jpg` : `https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-findoutmore.jpg`;
        const style = isMobile ? {
          height: 1000,
          width: 640
        } : {
          width: 813,
          height: 490
        };
        return React__default.createElement(FullyClickableModal, Object.assign({}, modalProps, {
          style: style,
          imageURL: image
        }));
      }
    case 'Sizzling':
      {
        let image = isMobile ? `https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-booknow-m.jpg` : `https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-booknow.jpg`;
        if (window.location.href.includes('signup')) image = isMobile ? `https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-findoutmore-m.jpg` : `https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-findoutmore.jpg`;
        const style = isMobile ? {
          height: 1000,
          width: 640
        } : {
          width: 819,
          height: 490
        };
        return React__default.createElement(FullyClickableModal, Object.assign({}, modalProps, {
          style: style,
          imageURL: image
        }));
      }
    case 'Stonehouse':
      return React__default.createElement(StonehouseModal, Object.assign({}, modalProps));
    case 'Browns':
      return React__default.createElement(BrownsModal, Object.assign({}, modalProps));
    case 'C&M':
    default:
      return React__default.createElement(CnMStandardModal, Object.assign({}, modalProps));
  }
};
const TriggerModal = ({
  trigger
}) => {
  return ReactDOM.createPortal(React__default.createElement(Modal, {
    trigger: trigger
  }), document.body);
};

const Youtube = ({
  trigger
}) => {
  var _trigger$brand, _trigger$brand2, _trigger$brand3, _trigger$brand4, _trigger$data;
  const [open, setOpen] = useState(true);
  if (!open) {
    return null;
  }
  return React__default.createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999
    }
  }, React__default.createElement("div", {
    style: {
      background: "#fff url('" + (trigger === null || trigger === void 0 ? void 0 : (_trigger$brand = trigger.brand) === null || _trigger$brand === void 0 ? void 0 : _trigger$brand.backgroundImage) + "') no-repeat center center",
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      backgroundColor: '#fff',
      borderRadius: '0.5rem',
      padding: 0,
      boxShadow: '0 0 1rem rgba(0,0,0,0.5)',
      border: '3px solid white',
      zIndex: 9999
    }
  }, React__default.createElement("div", {
    style: {
      backgroundColor: trigger === null || trigger === void 0 ? void 0 : (_trigger$brand2 = trigger.brand) === null || _trigger$brand2 === void 0 ? void 0 : _trigger$brand2.overlayColor,
      maxWidth: '600px',
      padding: '2rem',
      borderRadius: '0.5rem'
    }
  }, React__default.createElement("button", {
    onClick: () => {
      setOpen(false);
    },
    style: {
      position: 'absolute',
      top: '0.5rem',
      right: '0.5rem',
      fontSize: '2rem',
      backgroundColor: trigger === null || trigger === void 0 ? void 0 : (_trigger$brand3 = trigger.brand) === null || _trigger$brand3 === void 0 ? void 0 : _trigger$brand3.fontColor,
      color: trigger === null || trigger === void 0 ? void 0 : (_trigger$brand4 = trigger.brand) === null || _trigger$brand4 === void 0 ? void 0 : _trigger$brand4.primaryColor,
      border: 'none',
      borderRadius: '0.5rem',
      padding: '0 1rem'
    }
  }, "\u00D7"), React__default.createElement("iframe", {
    src: trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.url,
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    style: {
      width: '500px',
      height: '260px',
      marginTop: '1rem'
    }
  }))));
};
const TriggerYoutube = ({
  trigger
}) => {
  return ReactDOM.createPortal(React__default.createElement(Youtube, {
    trigger: trigger
  }), document.body);
};

const clientHandlers = [{
  id: 'modal_v1',
  behaviour: 'BEHAVIOUR_MODAL',
  invoke: trigger => React__default.createElement(TriggerModal, {
    key: trigger.id,
    trigger: trigger
  })
}, {
  id: 'youtube_v1',
  behaviour: 'BEHAVIOUR_YOUTUBE',
  invoke: trigger => React__default.createElement(TriggerYoutube, {
    key: trigger.id,
    trigger: trigger
  })
}, {
  id: 'inverse_v1',
  behaviour: 'BEHAVIOUR_INVERSE_FLOW',
  invoke: trigger => React__default.createElement(TriggerInverse, {
    key: trigger.id,
    trigger: trigger
  })
}, {
  id: 'banner_v1',
  behaviour: 'BEHAVIOUR_BANNER',
  invoke: trigger => React__default.createElement(TriggerBanner, {
    key: trigger.id,
    trigger: trigger
  })
}];

const queryClient = new QueryClient();
const cookieAccountJWT = 'b2c_token';
const useConsentCheck = (consent, consentCallback) => {
  const [consentGiven, setConsentGiven] = useState(consent);
  const {
    log
  } = useLogging();
  useEffect(() => {
    if (consent) {
      setConsentGiven(consent);
      return;
    }
    log('Fingerprint Widget Consent: ', consent);
    if (!consentCallback) return;
    const consentGivenViaCallback = consentCallback();
    const interval = setInterval(() => {
      setConsentGiven(consent);
    }, 1000);
    if (consentGivenViaCallback) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [consentCallback, consent]);
  return consentGiven;
};
const FingerprintProvider = ({
  appId,
  children,
  consent: _consent = false,
  consentCallback,
  debug,
  defaultHandlers,
  initialDelay: _initialDelay = 0,
  exitIntentTriggers: _exitIntentTriggers = true,
  idleTriggers: _idleTriggers = true,
  pageLoadTriggers: _pageLoadTriggers = true,
  config
}) => {
  const [booted, setBooted] = useState(false);
  const [handlers, setHandlers] = useState(defaultHandlers || clientHandlers);
  const consentGiven = useConsentCheck(_consent, consentCallback);
  const addAnotherHandler = React__default.useCallback(trigger => {
    setHandlers(handlers => {
      return [...handlers, trigger];
    });
  }, [setHandlers]);
  useEffect(() => {
    if (!appId) throw new Error('C&M Fingerprint: appId is required');
    if (booted) return;
    if (!consentGiven) return;
    const performBoot = async () => {
      setBooted(true);
    };
    performBoot();
  }, [consentGiven]);
  if (!appId) {
    return null;
  }
  if (!consentGiven) {
    return children;
  }
  return React__default.createElement(LoggingProvider, {
    debug: debug
  }, React__default.createElement(QueryClientProvider, {
    client: queryClient
  }, React__default.createElement(FingerprintContext.Provider, {
    value: {
      appId,
      booted,
      currentTrigger: null,
      registerHandler: addAnotherHandler,
      trackEvent: () => {
        alert('trackEvent not implemented');
      },
      trackPageView: () => {
        alert('trackPageView not implemented');
      },
      unregisterHandler: () => {
        alert('unregisterHandler not implemented');
      },
      initialDelay: _initialDelay,
      idleTriggers: _idleTriggers,
      pageLoadTriggers: _pageLoadTriggers,
      exitIntentTriggers: _exitIntentTriggers,
      config
    }
  }, React__default.createElement(VisitorProvider, null, React__default.createElement(MixpanelProvider, null, React__default.createElement(CollectorProvider, {
    handlers: handlers
  }, React__default.createElement(ErrorBoundary, {
    onError: (error, info) => console.error(error, info),
    fallback: React__default.createElement("div", null, "An application error occurred.")
  }, children)))))));
};
const defaultFingerprintState = {
  appId: '',
  booted: false,
  consent: false,
  currentTrigger: null,
  exitIntentTriggers: false,
  idleTriggers: false,
  pageLoadTriggers: false,
  initialDelay: 0,
  registerHandler: () => {},
  trackEvent: () => {},
  trackPageView: () => {},
  unregisterHandler: () => {},
  config: {
    idleDelay: undefined,
    triggerCooldown: 60 * 1000,
    exitIntentDelay: 0
  }
};
const FingerprintContext = createContext({
  ...defaultFingerprintState
});

export { CollectorContext, CollectorProvider, FingerprintContext, FingerprintProvider, onCookieChanged, useCollector, useFingerprint };
//# sourceMappingURL=index.modern.js.map

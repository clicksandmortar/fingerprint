import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React__default, { useContext, createContext, useState, useEffect, useCallback, useMemo, useRef, memo, createElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ReactDOM from 'react-dom';
import mixpanel from 'mixpanel-browser';
import Cookies from 'js-cookie';
import psl from 'psl';
import { validate, version, v4 } from 'uuid';
import { isMobile } from 'react-device-detect';
import uniqueBy from 'lodash.uniqby';
import { IdleTimerProvider } from 'react-idle-timer';
import { useExitIntent } from 'use-exit-intent';
import transcend from 'lodash.get';
import { useForm } from 'react-hook-form';

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

const TEMP_isCNMBrand = () => {
  if (typeof window === 'undefined') return false;
  const isCnMBookingDomain = /^book\.[A-Za-z0-9.!@#$%^&*()-_+=~{}[\]:;<>,?/|]+\.co\.uk$/.test(window.location.host);
  return isCnMBookingDomain;
};
const _LEGACY_getBrand = () => {
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
const haveBrandColorsBeenConfigured = colors => {
  if (!colors) return false;
  if (typeof colors !== 'object') return false;
  if (Object.keys(colors).length === 0) return false;
  if (Object.values(colors).every(color => color === '#000000')) return false;
  return true;
};

const defaultColors = {
  backgroundPrimary: '#2a3d6d',
  backgroundPrimaryDimmed: 'rgb(27,233,237)',
  backgroundSecondary: 'rgb(226,226,226)',
  shadeOfGrey: 'rgb(13,14,49)',
  textPrimary: '#ffffff',
  greyText: '#40404b'
};
const defaultConfig = {
  script: {
    debugMode: false
  },
  trigger: {
    userIdleThresholdSecs: 5,
    displayTriggerAfterSecs: 5,
    triggerCooldownSecs: 60
  },
  brand: {
    name: _LEGACY_getBrand() || 'C&M',
    colors: defaultColors
  }
};
const LEGACY_merge_config = (config, legacy_config) => ({
  displayTriggerAfterSecs: ((legacy_config === null || legacy_config === void 0 ? void 0 : legacy_config.exitIntentDelay) || 0) / 1000 || config.trigger.displayTriggerAfterSecs,
  triggerCooldownSecs: ((legacy_config === null || legacy_config === void 0 ? void 0 : legacy_config.triggerCooldown) || 0) / 1000 || config.trigger.triggerCooldownSecs,
  userIdleThresholdSecs: ((legacy_config === null || legacy_config === void 0 ? void 0 : legacy_config.idleDelay) || 0) / 1000 || config.trigger.userIdleThresholdSecs
});
const objStringtoObjNum = obj => {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    newObj[key] = Number(obj[key]);
  });
  return newObj;
};
function ConfigProvider({
  children,
  legacy_config
}) {
  const [config, setConfigState] = useState(defaultConfig);
  const log = React__default.useCallback((...params) => {
    if (config.script.debugMode) {
      console.log('[ConfigProvider]', ...params);
    }
  }, [config, legacy_config]);
  const setConfig = React__default.useCallback(updatedConfigEntries => {
    var _updatedConfigEntries;
    const argColors = updatedConfigEntries === null || updatedConfigEntries === void 0 ? void 0 : (_updatedConfigEntries = updatedConfigEntries.brand) === null || _updatedConfigEntries === void 0 ? void 0 : _updatedConfigEntries.colors;
    const shouldUpdateColors = haveBrandColorsBeenConfigured(argColors);
    if (shouldUpdateColors) log('setConfig: setting brand colors from portal config', argColors);else log('setConfig: keeping colors in state || fallback to default');
    setConfigState(prev => {
      return {
        ...prev,
        ...updatedConfigEntries,
        brand: {
          ...prev.brand,
          ...updatedConfigEntries.brand,
          colors: shouldUpdateColors ? {
            ...(prev.brand.colors || defaultColors),
            ...(argColors || {})
          } : prev.brand.colors
        },
        trigger: {
          ...prev.trigger,
          ...objStringtoObjNum(LEGACY_merge_config(prev, legacy_config))
        }
      };
    });
  }, [setConfigState]);
  const value = {
    config,
    setConfig
  };
  useEffect(() => {
    log('config in use:', config);
  }, [config]);
  return React__default.createElement(ConfigContext.Provider, {
    value: value
  }, children);
}
const ConfigContext = createContext({
  config: defaultConfig,
  setConfig: () => {
    console.error('ConfigContext: setConfig not implemented');
  }
});

const useConfig = () => React__default.useContext(ConfigContext);
const useBrand = () => {
  const configBrandName = useConfig().config.brand.name;
  if (configBrandName) return configBrandName;
  return _LEGACY_getBrand();
};
const useTriggerConfig = () => useConfig().config.trigger;
const useBrandColors = () => {
  return useConfig().config.brand.colors || defaultColors;
};

const LoggingProvider = ({
  children
}) => {
  const debug = useConfig().config.script.debugMode;
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

const uuidValidateV4 = uuid => {
  return validate(uuid) && version(uuid) === 4;
};

const validVisitorId = id => {
  const splitCookie = id.split('|');
  return uuidValidateV4(splitCookie[0]);
};

const cookieValidDays = 365;
const CnMCookie = '_cm';
const CnMIDCookie = '_cm_id';
function getCookieDomain() {
  const parsedUrl = psl.parse(location.host);
  let cookieDomain = null;
  if (!parsedUrl.error) cookieDomain = parsedUrl.domain || null;
  return cookieDomain;
}
function correctCookieSubdomain() {
  let cookie = getCookie(CnMIDCookie);
  if (!cookie) return;
  Cookies.remove(CnMIDCookie);
  setCookie(CnMIDCookie, cookie, cookieValidDays);
  return cookie;
}
const buildCookie = ({
  visitorId
}) => {
  const {
    sessionId,
    endTime
  } = getSessionIdAndEndTime(getCookie(CnMIDCookie));
  return `${visitorId}|${sessionId}|${endTime.toISOString()}`;
};
const updateCookieUUID = (cookieData, uuid) => {
  if (!cookieData) return null;
  const cookieSplit = cookieData.split('|');
  if (cookieSplit.length <= 2) return null;
  const visitorId = cookieSplit[0];
  if (visitorId === uuid) return null;
  const sessionId = cookieSplit[1];
  const endTime = cookieSplit[2];
  return `${uuid}|${sessionId}|${endTime}`;
};
const updateCookie = uuid => {
  if (!uuidValidateV4(uuid)) return;
  const cookie = getCookie(CnMIDCookie);
  const newCookie = updateCookieUUID(cookie, uuid);
  if (!newCookie) return;
  setCookie(CnMIDCookie, newCookie, cookieValidDays);
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
    let vidParam = urlParams.get('v_id');
    let visitorId = vidParam || undefined;
    if (vidParam && vidParam.includes('?')) {
      visitorId = vidParam.split('?')[0];
    }
    visitor.id = visitorId;
    setCookie(cookieAccountJWT, visitorId || '', cookieValidDays);
    const sourceId = urlParams.get('source_id');
    if (sourceId) visitor.sourceId = sourceId;
  }
  if (!visitor.id && !getCookie(CnMIDCookie) || !validVisitorId(getCookie(CnMIDCookie) || '')) {
    const visitorId = v4();
    visitor.id = visitorId;
  }
  if (!visitor.id && getCookie(CnMIDCookie)) {
    const c = getCookie(CnMIDCookie);
    const [visitorId] = c.split('|');
    visitor.id = visitorId;
  }
  const combinedCookie = buildCookie({
    visitorId: visitor.id
  });
  setCookie(CnMIDCookie, combinedCookie, cookieValidDays);
  const {
    sessionId,
    endTime
  } = getSessionIdAndEndTime(getCookie(CnMIDCookie));
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

const setCookie = (name, value, expires, options) => {
  return Cookies.set(name, value, {
    expires: expires,
    sameSite: 'strict',
    domain: getCookieDomain() || undefined,
    ...options
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
  if (!getCookie(CnMCookie) || getCookie(CnMCookie) !== appId) {
    setCookie(CnMCookie, appId, cookieValidDays);
    setSession(session);
    return;
  }
  if (getCookie(CnMCookie) && getCookie(CnMCookie) === appId) {
    session.firstVisit = false;
    setSession(session);
  }
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
      const updatedCookie = correctCookieSubdomain();
      log('FingerprintContext: Correcting cookie domain to', updatedCookie);
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
  const registerUserData = React__default.useCallback(properties => {
    log(`Mixpanel: attempting to'register/override properties: ${Object.keys(properties).join(', ')}`);
    mixpanel.people.set(properties);
  }, [log]);
  useEffect(() => {
    if (!visitor.cohort) {
      log('Able to register user cohort, but none provided. ');
      return;
    }
    registerUserData({
      u_cohort: visitor.cohort
    });
  }, [visitor, registerUserData]);
  useEffect(() => {
    if (!visitor.sourceId) return;
    registerUserData({
      sourceId: visitor.sourceId
    });
  }, [visitor, registerUserData]);
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

const deviceInfo = {
  type: isMobile ? 'mobile' : 'desktop'
};

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
  const hash = window.location.hash.substring(2);
  return {
    url: window.location.href,
    path: window.location.pathname,
    title: document.title,
    hash,
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

const useHostname = () => {
  var _window, _window$location;
  return ((_window = window) === null || _window === void 0 ? void 0 : (_window$location = _window.location) === null || _window$location === void 0 ? void 0 : _window$location.hostname) || '';
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
      hostname: requestHost,
      device: deviceInfo
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

const collinBrandsPathConversionMap = {
  Stonehouse: '/tablebooking/enquiry-form-completed',
  'All Bar One': '/bookings/dmnc-complete',
  Sizzling: '/tablebooking/enquiry-form-completed',
  Ember: '/tablebooking/enquiry-form-completed'
};
function useCollinsBookingComplete() {
  const {
    trackEvent,
    state: {
      initiated
    }
  } = useMixpanel();
  const {
    log
  } = useLogging();
  const brand = useBrand();
  const checkCollinsBookingComplete = React__default.useCallback(() => {
    log('useCollinsBookingComplete: checking for Collins booking complete');
    if (!initiated) {
      log('useCollinsBookingComplete, mixpanel not initiated');
      return;
    }
    if (!brand) {
      log('useCollinsBookingComplete, no brand');
      return;
    }
    const conversionPathForBrand = collinBrandsPathConversionMap[brand];
    if (!conversionPathForBrand) {
      log('useCollinsBookingComplete: no path for brand variable');
      return;
    }
    const isConversionPath = window.location.pathname.toLowerCase().includes(conversionPathForBrand.toLowerCase());
    if (!isConversionPath) {
      log('useCollinsBookingComplete: not a conversion path');
      return;
    }
    log(`useCollinsBookingComplete: Collins booking complete based on path ${conversionPathForBrand} and brand ${brand}`);
    trackEvent('booking_complete', {});
  }, [trackEvent, log, brand, initiated]);
  return {
    checkCollinsBookingComplete
  };
}

const getRecursivelyPotentialButton = el => {
  var _el$nodeName;
  if (!el) return null;
  if (((_el$nodeName = el.nodeName) === null || _el$nodeName === void 0 ? void 0 : _el$nodeName.toLowerCase()) === 'button') return el;
  if (el.parentElement) return getRecursivelyPotentialButton(el.parentElement);
  return null;
};
function useButtonCollector() {
  const {
    mutateAsync: collect
  } = useCollectorMutation();
  const {
    visitor
  } = useVisitor();
  const {
    log
  } = useLogging();
  const {
    trackEvent
  } = useMixpanel();
  useEffect(() => {
    if (isUndefined('document')) return;
    if (!visitor.id) return;
    const buttonClickListener = e => {
      if (!e.target) return;
      const potentialButton = getRecursivelyPotentialButton(e.target);
      if (!potentialButton) return;
      const button = potentialButton;
      if (button.type === 'submit') return;
      log('useButtonCollector: button clicked', {
        button
      });
      trackEvent('button_clicked', button);
      collect({
        button: {
          id: button.id,
          selector: button.innerText
        }
      });
    };
    document.addEventListener('click', buttonClickListener);
    return () => {
      document.removeEventListener('click', buttonClickListener);
    };
  }, [visitor]);
}

const getIsVisible = selector => {
  const element = document.querySelector(selector);
  if (!element) return false;
  if (window.getComputedStyle(element).visibility === 'hidden') return false;
  if (window.getComputedStyle(element).display === 'none') return false;
  if (window.getComputedStyle(element).opacity === '0') return false;
  return true;
};

const validateSignalChain = signals => {
  const signalPattern = signals.map(signal => {
    if (signal.op === 'IsOnPath') {
      const [operator, route] = signal.parameters;
      return getFuncByOperator(operator, route)(window.location.pathname);
    }
    if (signal.op === 'CanSeeElementOnPage') {
      const [itemQuerySelector, operator, route] = signal.parameters;
      const isSignalOnCorrectRoute = getFuncByOperator(operator, route)(window.location.pathname);
      if (!isSignalOnCorrectRoute) return false;
      const isVisible = getIsVisible(itemQuerySelector);
      return isVisible;
    }
    if (signal.op === 'IsOnDomain') {
      return window.location.hostname === signal.parameters[0];
    }
    return false;
  });
  return signalPattern.every(Boolean);
};

const getFuncByOperator = (operator, compareWith) => {
  switch (operator) {
    case 'starts_with':
      return comparison => {
        return comparison.toLowerCase().startsWith(compareWith.toLowerCase());
      };
    case 'contains':
      return comparison => {
        return comparison.toLowerCase().includes(compareWith.toLowerCase());
      };
    case 'ends_with':
      return comparison => {
        return comparison.toLowerCase().endsWith(compareWith.toLowerCase());
      };
    case 'eq':
      return comparison => {
        return comparison.toLowerCase() === compareWith.toLowerCase();
      };
    default:
      return () => {
        console.error('getOperator: unknown operator', operator);
        return false;
      };
  }
};
const scanInterval = 500;
const useConversions = () => {
  const [conversions, setConversions] = useState([]);
  const {
    mutate: collect
  } = useCollectorMutation();
  const removeById = React__default.useCallback(id => {
    setConversions(prev => {
      if (!(prev !== null && prev !== void 0 && prev.length)) return prev;
      return prev.filter(conversion => conversion.identifier !== id);
    });
  }, [setConversions]);
  const scan = React__default.useCallback(() => {
    conversions.forEach(conversion => {
      const hasHappened = validateSignalChain(conversion.signals);
      if (!hasHappened) return;
      collect({
        conversion: {
          id: conversion.identifier
        }
      });
      removeById(conversion.identifier);
    });
  }, [collect, conversions, removeById]);
  useEffect(() => {
    if (!(conversions !== null && conversions !== void 0 && conversions.length)) return;
    const intId = setInterval(scan, scanInterval);
    return () => clearInterval(intId);
  }, [scan]);
  return {
    conversions,
    setConversions
  };
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

const cnmFormPrefix = 'cnm-form';
const CnMForm = props => {
  return React__default.createElement("form", Object.assign({}, props, {
    id: `${cnmFormPrefix}-${props.id}`
  }));
};

const stringIsSubstringOf = (a, b) => {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.toLowerCase().includes(b.toLowerCase());
};
const defaultBannedTypes = ['password', 'submit'];
const defaultBannedFieldPartialNames = ['expir', 'cvv', 'cvc', 'csv', 'csc', 'pin', 'pass', 'card'];
const getFormEntries = (form, {
  bannedFieldPartialNames: _bannedFieldPartialNames = defaultBannedFieldPartialNames,
  bannedTypes: _bannedTypes = defaultBannedTypes
}) => {
  const elements = Array.from(form.elements).filter(el => {
    if (_bannedTypes.includes(el === null || el === void 0 ? void 0 : el.type)) return false;
    if (_bannedFieldPartialNames.find(partialName => {
      if (stringIsSubstringOf(el.name, partialName)) return true;
      if (stringIsSubstringOf(el.id, partialName)) return true;
      if (stringIsSubstringOf(el.placeholder, partialName)) return true;
      return false;
    })) return false;
    return true;
  });
  const data = elements.reduce((result, item) => {
    let fieldName = item.name;
    if (!fieldName) {
      if (item.id) {
        console.error('getFormEntries: form field has no name, falling back to id', {
          item
        });
        fieldName = item.id;
      } else if (item.placeholder) {
        console.error('getFormEntries: form field has no name or id, falling back to placeholder', {
          item
        });
        fieldName = item.placeholder;
      } else {
        console.error('getFormEntries: form field has no name, id or placeholder, fallback to type', {
          item
        });
        fieldName = item.type;
      }
    }
    result[fieldName] = item.value;
    return result;
  }, {});
  return data;
};

function useFormCollector() {
  const {
    mutateAsync: collect
  } = useCollectorMutation();
  const {
    visitor
  } = useVisitor();
  const {
    log
  } = useLogging();
  const {
    trackEvent
  } = useMixpanel();
  useEffect(() => {
    if (isUndefined('document')) return;
    if (!visitor.id) return;
    const formSubmitListener = e => {
      var _e$target$nodeName, _form$getAttribute;
      if (((_e$target$nodeName = e.target.nodeName) === null || _e$target$nodeName === void 0 ? void 0 : _e$target$nodeName.toLowerCase()) !== 'form') return;
      const form = e === null || e === void 0 ? void 0 : e.target;
      if ((_form$getAttribute = form.getAttribute('id')) !== null && _form$getAttribute !== void 0 && _form$getAttribute.includes(cnmFormPrefix)) {
        log('Skipping form collection since this is a C&M form');
        return;
      }
      const data = getFormEntries(form, {
        bannedFieldPartialNames: [],
        bannedTypes: []
      });
      log('useFormCollector: form submitted', {
        data
      });
      trackEvent('form_submitted', {
        id: form.id,
        name: form.name
      });
      collect({
        form: {
          data
        }
      });
    };
    document.removeEventListener('submit', formSubmitListener);
    document.addEventListener('submit', formSubmitListener);
    return () => {
      document.removeEventListener('submit', formSubmitListener);
    };
  }, [visitor]);
}

const interval = 250;
const useIncompleteTriggers = () => {
  const [incompleteTriggers, setIncompleteTriggers] = useState([]);
  const [visibleTriggers, setVisibleTriggers] = useState([]);
  const scan = React__default.useCallback(() => {
    const validTriggers = incompleteTriggers.filter(trigger => {
      const shouldTrigger = validateSignalChain(trigger.signals);
      if (!shouldTrigger) return false;
      return true;
    });
    setVisibleTriggers(prev => {
      if (!validTriggers.length) return prev;
      return validTriggers;
    });
  }, [setVisibleTriggers, incompleteTriggers]);
  useEffect(() => {
    if (!incompleteTriggers.length) return;
    const intId = setInterval(scan, interval);
    return () => {
      clearInterval(intId);
    };
  }, [incompleteTriggers, getIsVisible, setVisibleTriggers]);
  return {
    incompleteTriggers,
    setIncompleteTriggers,
    setVisibleTriggers,
    visibleTriggers
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
  const brand = useBrand();
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
        brand
      });
      clearInterval(id);
    }, selectorRateMs);
    return () => {
      clearInterval(id);
    };
  }, [intently, log, setIsVisible, trackEvent, initiated, brand]);
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
const brandsThatSupportIntentlyRemoval = ['Browns'];
const useRemoveIntently = ({
  intently
}) => {
  const {
    log
  } = useLogging();
  const brand = useBrand();
  useEffect(() => {
    if (intently) return;
    if (brand && !brandsThatSupportIntentlyRemoval.includes(brand)) {
      log(`useRemoveIntently: Intently is ${intently}, but skipping overlay removal for brand`, {
        brand
      });
      return;
    }
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
  }, [intently, brand, log]);
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

const reattemptIntervalMs = 500;
const useRunOnPathChange = (func, config) => {
  const [lastCollectedHref, setLastCollectedHref] = useState('');
  const {
    log
  } = useLogging();
  const run = React__default.useCallback(() => {
    if (config !== null && config !== void 0 && config.skip) return;
    if (!location.href) return;
    if (location.href === lastCollectedHref) return;
    log('useRunOnPathChange: running' + (config === null || config === void 0 ? void 0 : config.name));
    setLastCollectedHref(location.href);
    func();
  }, [func, config, lastCollectedHref]);
  useEffect(() => {
    log(`useRunOnPathChange: running for every path change with ${reattemptIntervalMs} MS`);
    const iId = setInterval(run, reattemptIntervalMs);
    return () => clearInterval(iId);
  }, [run]);
};

function useTriggerDelay() {
  const [lastTriggerTimeStamp, setLastTriggerTimeStamp] = useState(null);
  const triggerConfig = useTriggerConfig();
  const cooldownMs = triggerConfig.triggerCooldownSecs * 1000;
  const idleDelay = triggerConfig.userIdleThresholdSecs * 1000;
  const {
    log
  } = useLogging();
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
  const getIdleStatusDelay = React__default.useCallback(() => {
    const cooldownDelay = getRemainingCooldownMs();
    const delayAdjustedForCooldown = idleDelay + cooldownDelay;
    log(`Setting idle delay at ${delayAdjustedForCooldown}ms (cooldown ${cooldownDelay}ms + idleDelay ${idleDelay}ms)`);
    return delayAdjustedForCooldown;
  }, [idleDelay, getRemainingCooldownMs, log]);
  return {
    startCooldown,
    canNextTriggerOccur,
    getRemainingCooldownMs,
    getIdleStatusDelay
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
    pageLoadTriggers
  } = useFingerprint();
  const {
    setConfig,
    config: {
      trigger: config
    }
  } = useConfig();
  const {
    visitor,
    setVisitor
  } = useVisitor();
  const {
    canNextTriggerOccur,
    startCooldown,
    getRemainingCooldownMs,
    getIdleStatusDelay
  } = useTriggerDelay();
  const {
    trackEvent,
    state: {
      initiated: mixpanelBooted
    }
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
  const [idleTimeout, setIdleTimeout] = useState(getIdleStatusDelay());
  const [pageTriggers, setPageTriggersState] = useState([]);
  const {
    setIntently
  } = useIntently();
  const [displayTriggers, setDisplayedTriggers] = useState([]);
  const [foundWatchers, setFoundWatchers] = useState(new Map());
  const {
    setConversions
  } = useConversions();
  const brand = useBrand();
  const {
    setIncompleteTriggers,
    setVisibleTriggers,
    visibleTriggers: visibleIncompleteTriggers
  } = useIncompleteTriggers();
  const combinedTriggers = React__default.useMemo(() => [...pageTriggers, ...visibleIncompleteTriggers], [pageTriggers, visibleIncompleteTriggers]);
  const getIsBehaviourVisible = React__default.useCallback(type => {
    if (displayTriggers.length === 0) return false;
    if (displayTriggers.find(triggerId => {
      var _combinedTriggers$fin;
      return ((_combinedTriggers$fin = combinedTriggers.find(trigger => trigger.id === triggerId)) === null || _combinedTriggers$fin === void 0 ? void 0 : _combinedTriggers$fin.behaviour) === type;
    })) return true;
    return false;
  }, [displayTriggers, combinedTriggers]);
  const setDisplayedTriggerByInvocation = React__default.useCallback((invocation, shouldAllowMultipleSimultaneous = false) => {
    const appendTrigger = invokableTrigger => {
      setDisplayedTriggers(prev => {
        if (prev.includes(invokableTrigger.id)) return prev;
        return [...prev, invokableTrigger.id];
      });
    };
    const invokableTriggers = combinedTriggers.filter(trigger => trigger.invocation === invocation);
    invokableTriggers.forEach(invokableTrigger => {
      if (!invokableTrigger) {
        log('CollectorProvider: Trigger not invokable ', invokableTrigger);
        return;
      }
      if (invokableTrigger.behaviour === 'BEHAVIOUR_BANNER') {
        log('Banners can be stacked up, setting as visible.', invokableTrigger);
        appendTrigger(invokableTrigger);
        return;
      }
      if (!shouldAllowMultipleSimultaneous && getIsBehaviourVisible(invokableTrigger.behaviour)) {
        log('CollectorProvider: Behaviour already visible, not showing trigger', invokableTrigger);
        return;
      }
      log('CollectorProvider: Triggering behaviour', invokableTrigger);
      appendTrigger(invokableTrigger);
    });
  }, [combinedTriggers, getIsBehaviourVisible, log]);
  useEffect(() => {
    if (!(visibleIncompleteTriggers !== null && visibleIncompleteTriggers !== void 0 && visibleIncompleteTriggers.length)) return;
    setDisplayedTriggerByInvocation('INVOCATION_ELEMENT_VISIBLE');
  }, [visibleIncompleteTriggers, setPageTriggersState, setDisplayedTriggerByInvocation]);
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
    setIncompleteTriggers(prev => prev.filter(trigger => trigger.id !== id));
    setVisibleTriggers(prev => prev.filter(trigger => trigger.id !== id));
    setPageTriggersState(prev => prev.filter(trigger => trigger.id !== id));
  }, [displayTriggers, log, setIncompleteTriggers, setVisibleTriggers, setPageTriggersState, combinedTriggers]);
  const TriggerComponent = React__default.useCallback(() => {
    if (!displayTriggers) return null;
    const activeTriggers = combinedTriggers.filter(trigger => displayTriggers.includes(trigger.id));
    if (!activeTriggers) {
      error(`CollectorProvider - TriggerComponent: No trigger found for displayTriggers`, displayTriggers);
      return null;
    }
    log('CollectorProvider - TriggerComponent: available handlers include: ', handlers);
    log('CollectorProvider - TriggerComponent: activeTriggers to match are: ', activeTriggers);
    log('CollectorProvider - TriggerComponent: attempting to show trigger', activeTriggers);
    return activeTriggers.map(trigger => {
      var _handler$invoke;
      const handler = getHandlerForTrigger(trigger);
      if (!handler) {
        log('CollectorProvider - TriggerComponent: No handler found for trigger', trigger);
        return null;
      }
      if (!handler.invoke) {
        log('CollectorProvider - TriggerComponent: No invoke method found for handler', handler);
        return null;
      }
      const isTriggerOfSameBehaviourAlreadyVisible = getIsBehaviourVisible(trigger.behaviour);
      if (!displayTriggers.includes(trigger.id) && isTriggerOfSameBehaviourAlreadyVisible && !handler.multipleOfSameBehaviourSupported) {
        log(`CollectorProvider - TriggerComponent: Behaviour ${trigger.behaviour} (triggerId: ${trigger.id}) is already visible and does NOT support multiple triggers. Not showing.`, trigger.id);
        return null;
      }
      const potentialComponent = (_handler$invoke = handler.invoke) === null || _handler$invoke === void 0 ? void 0 : _handler$invoke.call(handler, trigger);
      if (potentialComponent && React__default.isValidElement(potentialComponent)) {
        log('CollectorProvider - TriggerComponent: Potential component for trigger is valid. Mounting');
        return potentialComponent;
      }
      log('CollectorProvider: Potential component for trigger invalid. Running as regular func.');
      return null;
    });
  }, [displayTriggers, log, handlers, error, getHandlerForTrigger, getIsBehaviourVisible, combinedTriggers]);
  useEffect(() => {
    if (!(visibleIncompleteTriggers !== null && visibleIncompleteTriggers !== void 0 && visibleIncompleteTriggers.length)) return;
    setDisplayedTriggerByInvocation('INVOCATION_ELEMENT_VISIBLE');
  }, [setDisplayedTriggerByInvocation, visibleIncompleteTriggers]);
  const fireIdleTrigger = useCallback(() => {
    if (!idleTriggers) return;
    log('CollectorProvider: attempting to fire idle time trigger');
    setDisplayedTriggerByInvocation('INVOCATION_IDLE_TIME');
    startCooldown();
  }, [idleTriggers, log, setDisplayedTriggerByInvocation, startCooldown]);
  const {
    hasDelayPassed
  } = useExitIntentDelay((config === null || config === void 0 ? void 0 : config.displayTriggerAfterSecs) * 1000);
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
  }, [hasDelayPassed, canNextTriggerOccur, log, setDisplayedTriggerByInvocation, startCooldown, reRegisterExitIntent, getRemainingCooldownMs]);
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
    if (!(combinedTriggers !== null && combinedTriggers !== void 0 && combinedTriggers.length)) return;
    log('CollectorProvider: attempting to fire on-page-load trigger');
    setDisplayedTriggerByInvocation('INVOCATION_PAGE_LOAD', true);
  }, [pageLoadTriggers, combinedTriggers, log, setDisplayedTriggerByInvocation]);
  const collectorCallback = React__default.useCallback(async response => {
    var _payload$identifiers;
    const payload = await response.json();
    log('Sent collector data, retrieved:', payload);
    const retrievedUserId = (_payload$identifiers = payload.identifiers) === null || _payload$identifiers === void 0 ? void 0 : _payload$identifiers.main;
    if (retrievedUserId) {
      updateCookie(retrievedUserId);
      setVisitor({
        id: retrievedUserId
      });
    }
    setIdleTimeout(getIdleStatusDelay());
    setPageTriggers(payload === null || payload === void 0 ? void 0 : payload.pageTriggers);
    setConfig(payload.config);
    setIncompleteTriggers((payload === null || payload === void 0 ? void 0 : payload.incompleteTriggers) || []);
    setConversions((payload === null || payload === void 0 ? void 0 : payload.conversions) || []);
    const cohort = payload.intently ? 'intently' : 'fingerprint';
    if (visitor.cohort !== cohort) setVisitor({
      cohort
    });
    log('CollectorProvider: collected data');
    if (!payload.intently) {
      log('CollectorProvider: user is in Fingerprint cohort');
      setIntently(false);
    } else {
      log('CollectorProvider: user is in Intently cohort');
      setIntently(true);
    }
  }, [log, getIdleStatusDelay, setPageTriggers, setConfig, setIncompleteTriggers, visitor.cohort, setConversions, setVisitor, setIntently]);
  useEffect(() => {
    if (!mixpanelBooted) return;
    if (hasVisitorIDInURL()) {
      log('CollectorProvider: visitor ID in URL, collecting data');
      trackEvent('abandoned_journey_landing', {
        from_email: true
      });
    }
  }, [trackEvent, log, mixpanelBooted]);
  const collectAndApplyVisitorInfo = React__default.useCallback(() => {
    if (!visitor.id) {
      log('CollectorProvider: Not yet collecting, awaiting visitor ID');
      return;
    }
    log('CollectorProvider: collecting data');
    const hash = window.location.hash.substring(3);
    const hashParams = hash.split('&').reduce((result, item) => {
      const parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});
    if (hashParams.id_token) {
      log('CollectorProvider: user logged in event fired');
      trackEvent('user_logged_in', {
        brand
      });
      collect({
        account: {
          token: hashParams.id_token
        }
      }).then(collectorCallback).catch(err => {
        error('failed to store collected data', err);
      });
    }
    collect({
      page: getPagePayload() || undefined,
      referrer: getReferrer() || undefined
    }).then(response => {
      if (response.status === 204) {
        setIntently(true);
        return;
      }
      collectorCallback(response);
    }).catch(err => {
      error('failed to store collected data', err);
    });
  }, [visitor.id, brand, log, collect, trackEvent, error, collectorCallback, setIntently]);
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
          }).then(collectorCallback).catch(err => {
            error('failed to store collected data', err);
          });
          clearInterval(intervalId);
        }
      });
    }, 500);
    return intervalId;
  }, [collect, collectorCallback, error, foundWatchers, trackEvent]);
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
    setIncompleteTriggers,
    trackEvent,
    setConversions
  }), [setPageTriggers, removeActiveTrigger, setActiveTrigger, trackEvent, setIncompleteTriggers, setConversions]);
  useEffect(() => {
    fireOnLoadTriggers();
  }, [fireOnLoadTriggers]);
  useRunOnPathChange(checkCollinsBookingComplete, {
    skip: !booted,
    delay: 0,
    name: 'checkCollinsBookingComplete'
  });
  useRunOnPathChange(collectAndApplyVisitorInfo, {
    skip: !booted,
    delay: initialDelay,
    name: 'collectAndApplyVisitorInfo'
  });
  useRunOnPathChange(fireOnLoadTriggers, {
    skip: !booted,
    delay: initialDelay,
    name: 'fireOnLoadTriggers'
  });
  useFormCollector();
  useButtonCollector();
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
  setIncompleteTriggers: () => {
    console.error('setIncompleteTriggers not implemented correctly');
  },
  setActiveTrigger: () => {
    console.error('setActiveTrigger not implemented correctly');
  },
  setConversions: () => {
    console.error('setConversions not implemented correctly');
  },
  trackEvent: () => {
    console.error('trackEvent not implemented correctly');
  }
});

const useCollector = () => {
  return useContext(CollectorContext);
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
    setPageTriggers,
    setIncompleteTriggers,
    setConversions
  } = useCollector();
  const {
    visitor,
    setVisitor
  } = useVisitor();
  const brand = useBrand();
  const trackTriggerSeen = React__default.useCallback(trigger => {
    trackEvent('trigger_displayed', {
      triggerId: trigger.id,
      triggerType: trigger.invocation,
      triggerBehaviour: trigger.behaviour,
      time: new Date().toISOString(),
      brand
    });
  }, [trackEvent, brand]);
  return useMutation(trigger => {
    trackTriggerSeen(trigger);
    return request.put(`${hostname}/triggers/${appId}/${visitor.id}/seen`, {
      seenTriggerIDs: [trigger.id],
      visitor,
      page: getPagePayload(),
      device: deviceInfo
    }).then(response => {
      log('Seen mutation: response', response);
      return response;
    }).catch(err => {
      error('Seen mutation: error', err);
      return err;
    });
  }, {
    onSuccess: async res => {
      var _r$identifiers;
      const r = await res.json();
      log('Seen mutation: replacing triggers with:', r.pageTriggers);
      setPageTriggers(r.pageTriggers);
      setConversions(r.conversions || []);
      const retrievedUserId = (_r$identifiers = r.identifiers) === null || _r$identifiers === void 0 ? void 0 : _r$identifiers.main;
      if (retrievedUserId) {
        updateCookie(retrievedUserId);
        setVisitor({
          id: retrievedUserId
        });
      }
      log('Seen mutation: replacing incomplete Triggers with:', r.incompleteTriggers);
      setIncompleteTriggers(r.incompleteTriggers || []);
      return r;
    }
  });
};
const useSeen = ({
  trigger,
  skip
}) => {
  const [hasFired, setHasFired] = useState(false);
  const {
    mutate: runSeen,
    ...mutationRest
  } = useSeenMutation();
  useEffect(() => {
    if (skip) return;
    if (hasFired) return;
    if (mutationRest.isSuccess) return;
    if (mutationRest.isLoading) return;
    const tId = setTimeout(() => {
      runSeen(trigger);
      setHasFired(true);
    }, 500);
    return () => {
      clearTimeout(tId);
    };
  }, [mutationRest, skip, hasFired, runSeen, setHasFired]);
  return mutationRest;
};

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

const getDiffInDHMS = (targetDate, initialDate = new Date()) => {
  const diffInSeconds = getPositiveDateDiffInSec(targetDate, initialDate);
  const days = Math.floor(diffInSeconds / (24 * 60 * 60));
  const hours = Math.floor(diffInSeconds % (24 * 60 * 60) / (60 * 60));
  const minutes = Math.floor(diffInSeconds % (60 * 60) / 60);
  const seconds = diffInSeconds % 60;
  return {
    days,
    minutes,
    hours,
    seconds
  };
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

const defualtFormatString = val => val;
const getInterpolate = (structure, hideMissingValues = true) => {
  const interpolate = (text, formatString = defualtFormatString) => {
    const replacedText = text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, keys) => {
      let value = transcend(structure, keys);
      if (formatString) value = formatString(value);
      if (!!match && !value && hideMissingValues) return '';
      return value !== undefined ? value : match;
    });
    return replacedText;
  };
  return interpolate;
};

const useCountdown = ({
  onZero,
  initialTimestamp,
  interpolate,
  formatDate: _formatDate = formatTimeStamp
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
  const interpolatefunc = useMemo(() => getInterpolate((interpolate === null || interpolate === void 0 ? void 0 : interpolate.structure) || {}), [interpolate]);
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
    const formatVal = val => _formatDate(new Date(val));
    const interpoaltedVal = interpolatefunc(interpolate.text, formatVal);
    return interpoaltedVal;
  }, [countdown, interpolate, interpolatefunc]);
  return {
    countdown,
    setTimeStamp,
    formattedCountdown
  };
};

const useBannerStyles = () => {
  const {
    textPrimary,
    backgroundPrimaryDimmed
  } = useBrandColors();
  const styles = {
    contentContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '1000px',
      margin: '0 auto'
    },
    text: {
      lineHeight: '1.2rem',
      margin: '0px 10px',
      color: textPrimary,
      fontWeight: 400,
      fontSize: '1rem'
    },
    iconContainer: {
      marginLeft: 5
    },
    button: {
      border: 'none',
      color: textPrimary,
      backgroundColor: backgroundPrimaryDimmed,
      padding: '5px 10px',
      margin: '0px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 600
    },
    closeButton: {
      background: 'transparent',
      color: textPrimary,
      margin: 0
    }
  };
  return styles;
};

const resetPad = () => {
  document.body.style.paddingTop = 'inherit';
};
const getIsBannerFullyClickable = trigger => {
  var _trigger$data;
  const isFullyClickable = !((_trigger$data = trigger.data) !== null && _trigger$data !== void 0 && _trigger$data.marketingText);
  return isFullyClickable;
};
const useBannerContainerStyles = ({
  trigger,
  element: {
    width,
    height
  }
}) => {
  var _trigger$data2;
  const position = (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.position;
  const isFullyClickable = getIsBannerFullyClickable(trigger);
  const {
    backgroundPrimary,
    textPrimary
  } = useBrandColors();
  const mutualStyles = {
    fontFamily: 'sans-serif',
    position: 'fixed',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    color: textPrimary,
    backgroundColor: backgroundPrimary,
    cursor: isFullyClickable ? 'pointer' : 'default'
  };
  const offset = 0.5 * width + 0.5 * height;
  switch (position) {
    case 'left':
      return {
        ...mutualStyles,
        translate: `0 -${offset}px`,
        rotate: '90deg',
        transformOrigin: '0% 50%',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        borderRadius: '10px 10px 0 0'
      };
    case 'right':
      return {
        ...mutualStyles,
        translate: `0 -${offset}px`,
        rotate: '270deg',
        transformOrigin: '100% 50%',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        borderRadius: '10px 10px 0 0'
      };
    case 'top':
    case 'bottom':
      return {
        ...mutualStyles,
        [position]: 0,
        left: 0,
        width: '100%'
      };
    default:
      return {};
  }
};

const HorizontalBanner = ({
  handleAction,
  handleClose,
  trigger
}) => {
  var _container$current, _container$current2, _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  const styles = useBannerStyles();
  const container = useRef(null);
  const isFullyClickable = getIsBannerFullyClickable(trigger);
  const containerStyles = useBannerContainerStyles({
    element: {
      width: ((_container$current = container.current) === null || _container$current === void 0 ? void 0 : _container$current.clientWidth) || 0,
      height: ((_container$current2 = container.current) === null || _container$current2 === void 0 ? void 0 : _container$current2.clientHeight) || 0
    },
    trigger
  });
  const interpolate = getInterpolate(trigger.data || {});
  const {
    formattedCountdown: text
  } = useCountdown({
    onZero: () => handleClose({}),
    initialTimestamp: new Date(((_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.countdownEndTime) || ''),
    interpolate: {
      text: ((_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.marketingText) || ((_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.buttonText) || '',
      structure: trigger.data
    }
  });
  const position = (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.position;
  useEffect(() => {
    var _container$current3;
    const bannerHeight = (_container$current3 = container.current) === null || _container$current3 === void 0 ? void 0 : _container$current3.clientHeight;
    if (position === 'top') {
      document.body.style.paddingTop = `${bannerHeight}px`;
    } else if (position === 'bottom') {
      document.body.style.paddingBottom = `${bannerHeight}px`;
    }
    return resetPad;
  }, [container, position]);
  return React__default.createElement("div", {
    ref: container,
    style: containerStyles,
    "data-testid": `cnm-horizontal-banner-${trigger.id}`
  }, React__default.createElement("div", {
    onClick: isFullyClickable ? handleAction : undefined,
    style: styles.contentContainer
  }, React__default.createElement("span", {
    style: styles.text
  }, text), React__default.createElement("button", {
    onClick: handleAction,
    style: styles.button
  }, interpolate(((_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.buttonText) || ''))),  React__default.createElement(CloseButton, {
    onClick: handleClose,
    style: styles.closeButton
  }));
};

const Ticket = props => React__default.createElement("svg", Object.assign({
  xmlns: 'http://www.w3.org/2000/svg',
  height: '16',
  width: '18',
  viewBox: '0 0 576 512'
}, props), React__default.createElement("path", {
  d: 'M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z'
}));
const Exclamation = props => React__default.createElement("svg", Object.assign({
  xmlns: 'http://www.w3.org/2000/svg',
  height: '16',
  width: '16',
  viewBox: '0 0 512 512'
}, props), React__default.createElement("path", {
  d: 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z'
}));
const Heart = props => React__default.createElement("svg", Object.assign({
  xmlns: 'http://www.w3.org/2000/svg',
  height: '16',
  width: '16',
  viewBox: '0 0 512 512'
}, props), React__default.createElement("path", {
  d: 'M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z'
}));
const iconList = {
  exclamation: Exclamation,
  ticket: Ticket,
  heart: Heart
};
const Icon = ({
  icon,
  ...props
}) => {
  const {
    error
  } = useLogging();
  const IconComponent = iconList[icon];
  if (!icon) return null;
  if (icon && !IconComponent) {
    error('BannerIcon: iconName is not valid');
    return null;
  }
  return React__default.createElement(IconComponent, Object.assign({}, props));
};

const BannerIcon = ({
  iconName,
  IconProps
}) => {
  const {
    error
  } = useLogging();
  const {
    textPrimary
  } = useBrandColors();
  if (!iconName) {
    error('BannerIcon: iconName not provided');
    return null;
  }
  return React__default.createElement(Icon, Object.assign({
    icon: iconName,
    height: 16,
    width: 16,
    fill: textPrimary
  }, IconProps));
};

const SideBanner = ({
  handleAction,
  handleClose,
  trigger
}) => {
  var _trigger$data, _container$current, _container$current2, _trigger$data2, _trigger$data3;
  const container = useRef(null);
  const isFullyClickable = getIsBannerFullyClickable(trigger);
  const shouldRenderIcon = !!((_trigger$data = trigger.data) !== null && _trigger$data !== void 0 && _trigger$data.buttonIcon);
  const styles = useBannerStyles();
  const containerStyles = useBannerContainerStyles({
    element: {
      width: ((_container$current = container.current) === null || _container$current === void 0 ? void 0 : _container$current.clientWidth) || 0,
      height: ((_container$current2 = container.current) === null || _container$current2 === void 0 ? void 0 : _container$current2.clientHeight) || 0
    },
    trigger
  });
  return React__default.createElement("div", {
    ref: container,
    style: containerStyles,
    "data-testid": `cnm-side-banner-${trigger.id}`
  }, React__default.createElement("div", {
    onClick: isFullyClickable ? handleAction : undefined,
    style: styles.contentContainer
  }, shouldRenderIcon && React__default.createElement("div", {
    style: styles.iconContainer
  }, React__default.createElement(BannerIcon, {
    iconName: (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonIcon
  })), React__default.createElement("span", {
    style: styles.text
  }, (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.buttonText)),  React__default.createElement(CloseButton, {
    onClick: handleClose,
    style: styles.closeButton
  }));
};

const Banner = ({
  trigger
}) => {
  var _trigger$data3;
  const {
    removeActiveTrigger
  } = useCollector();
  const {
    trackEvent
  } = useMixpanel();
  const [open, setOpen] = useState(true);
  useSeen({
    trigger,
    skip: !open
  });
  if (!open) return null;
  const handleClickCallToAction = e => {
    var _trigger$data, _trigger$data2;
    e.preventDefault();
    trackEvent('user_clicked_button', trigger);
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_blank');
    setOpen(false);
    resetPad();
  };
  const handleClose = e => {
    e === null || e === void 0 ? void 0 : e.stopPropagation();
    trackEvent('user_closed_trigger', trigger);
    removeActiveTrigger(trigger.id);
    setOpen(false);
    resetPad();
  };
  const props = {
    handleClose: handleClose,
    handleAction: handleClickCallToAction,
    trigger: trigger
  };
  const position = (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.position;
  if (position === 'left' || position === 'right') return React__default.createElement(SideBanner, Object.assign({}, props));
  return React__default.createElement(HorizontalBanner, Object.assign({}, props));
};
const TriggerBanner = ({
  trigger
}) => {
  return ReactDOM.createPortal(React__default.createElement(Banner, {
    trigger: trigger
  }), document.body);
};

const randomHash = 'f' + v4().split('-')[0];
const prependClass = className => `f${randomHash}-${className}`;
const getIsModalFullyClickable = ({
  trigger
}) => {
  var _trigger$data;
  return !(trigger !== null && trigger !== void 0 && (_trigger$data = trigger.data) !== null && _trigger$data !== void 0 && _trigger$data.buttonText);
};
const getModalSizing = img => {
  const imageRealHeight = img.height;
  const imageRealWidth = img.width;
  const aspectRatio = imageRealWidth / imageRealHeight;
  const getMaxWidth = num => window.innerWidth * 0.9 > num ? num : window.innerWidth * 0.9;
  const getMaxHeight = num => window.innerHeight * 0.9 > num ? num : window.innerHeight * 0.9;
  const deviceSizeLimits = isMobile ? {
    height: getMaxHeight(1000),
    width: getMaxWidth(640)
  } : {
    height: getMaxHeight(490),
    width: getMaxWidth(819)
  };
  const widthToUse = Math.min(imageRealWidth, deviceSizeLimits.width);
  const heightToUse = widthToUse / aspectRatio;
  return {
    height: heightToUse,
    width: widthToUse
  };
};
const useModalDimensionsBasedOnImage = ({
  imageURL
}) => {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0
  });
  useEffect(() => {
    const img = new Image();
    img.src = imageURL;
    const id = setInterval(() => {
      const modalSize = getModalSizing(img);
      if (modalSize.height || modalSize.width) {
        setImageDimensions(modalSize);
        clearInterval(id);
      }
    }, 50);
    return () => {
      clearInterval(id);
    };
  }, [imageURL]);
  return {
    imageDimensions,
    setImageDimensions
  };
};
const isModalDataCaptureModal = trigger => {
  if (!trigger) return false;
  if (!trigger.data) return false;
  if (!trigger.data.successText) return false;
  return true;
};
function splitSenseOfUrgencyText(text) {
  const split = text.split(/\{\{\s*countdownEndTime\s*\}\}/i);
  return split;
}
const buildTextWithPotentiallyCountdown = text => {
  let hasCountdown = false;
  let text1 = '';
  let text2 = '';
  const split = splitSenseOfUrgencyText(text);
  text1 = split[0];
  if (split.length > 1) {
    text2 = split[1];
    hasCountdown = true;
    return {
      hasCountdown,
      text1,
      text2
    };
  } else {
    return {
      text: text1
    };
  }
};

const useDataCaptureMutation = () => {
  const {
    log,
    error
  } = useLogging();
  const {
    appId
  } = useFingerprint();
  const {
    visitor
  } = useVisitor();
  return useMutation(data => {
    return request.post(hostname + '/collector/' + (visitor === null || visitor === void 0 ? void 0 : visitor.id) + '/form', {
      ...data,
      appId
    }).then(response => {
      log('Trigger API response', response);
      return response;
    }).catch(err => {
      error('Trigger API error', err);
      return err;
    });
  }, {
    onSuccess: () => {}
  });
};

const isViewBlockingModal = false;
const fields = [{
  name: 'name',
  label: 'Name',
  type: 'text',
  required: true
}, {
  name: 'phone',
  label: 'Phone',
  type: 'text',
  required: false
}, {
  name: 'email',
  label: 'Email',
  type: 'email',
  required: true
}];
const getOuterLayer = ({
  isViewBlockingModal
}) => {
  if (isViewBlockingModal) {
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
      display: 'grid',
      placeContent: 'center'
    };
  }
  return {
    zIndex: 999,
    position: 'fixed',
    right: '3vw',
    top: '50%',
    transform: 'translateY(-50%)'
  };
};
const DataCaptureModal = ({
  trigger
}) => {
  var _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  const [error, setError] = React__default.useState('');
  const [retainedHeight, setRetainedHeight] = React__default.useState(0);
  const {
    trackEvent
  } = useMixpanel();
  const {
    log
  } = useLogging();
  const ref = React__default.useRef(null);
  const {
    removeActiveTrigger
  } = useCollector();
  const [invocationTimeStamp, setInvocationTimeStamp] = useState(null);
  const {
    isSuccess: isSeenSuccess,
    isLoading: isSeenLoading
  } = useSeen({
    trigger,
    skip: !open
  });
  const {
    mutate: submit,
    isSuccess: isSubmissionSuccess,
    isLoading: isSubmissionLoading
  } = useDataCaptureMutation();
  useEffect(() => {
    if (!open) return;
    if (invocationTimeStamp) return;
    if (isSeenSuccess) return;
    if (isSeenLoading) return;
    const tId = setTimeout(() => {
      if (!invocationTimeStamp) {
        setInvocationTimeStamp(new Date().toISOString());
      }
    }, 500);
    return () => {
      clearTimeout(tId);
    };
  }, [open, isSeenSuccess, isSeenLoading]);
  const handleCloseModal = () => {
    removeActiveTrigger(trigger.id);
    if (!isSubmissionSuccess) trackEvent('user_closed_trigger', trigger);
  };
  const handleSubmit = e => {
    var _ref$current;
    e.preventDefault();
    setRetainedHeight(((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.clientHeight) || 0);
    setError('');
    const entries = getFormEntries(e.target, {});
    trackEvent('user_submitted_data_capture', trigger);
    const haveAllRequiredFieldsBeenSubmitted = fields.every(field => {
      return e.target[field.name].value;
    });
    if (!haveAllRequiredFieldsBeenSubmitted) setError('Please make sure all required fields are filled in.');
    log('DataCaptureModal', 'handleSubmit', 'submit', entries);
    submit({
      formData: entries
    });
  };
  const isButtonDisaled = isSubmissionLoading;
  const {
    backgroundPrimary,
    textPrimary
  } = useBrandColors();
  const Wrapper = ({
    children
  }) => {
    var _trigger$data;
    return React__default.createElement("div", {
      style: getOuterLayer({
        isViewBlockingModal
      })
    }, React__default.createElement("div", {
      ref: ref,
      style: {
        height: retainedHeight || undefined,
        background: `url(${(_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '16px',
        width: '400px',
        maxWidth: '94vw',
        position: 'relative'
      }
    }, React__default.createElement("div", {
      style: {
        position: 'absolute',
        top: 5,
        right: 5
      }
    }, React__default.createElement(CloseButton, {
      onClick: handleCloseModal
    })), React__default.createElement("div", {
      style: {
        borderRadius: '16px',
        background: 'rgba(0, 0, 0, 0.45)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem'
      }
    }, children)));
  };
  if (isSubmissionSuccess) return React__default.createElement(Wrapper, null, React__default.createElement("h1", null, (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.successText));
  return React__default.createElement(Wrapper, null, React__default.createElement("h1", {
    style: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      textTransform: 'uppercase',
      color: textPrimary
    }
  }, (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.heading), React__default.createElement("p", {
    style: {
      fontSize: '0.9rem',
      lineHeight: 1.5,
      marginBottom: '1rem',
      color: textPrimary
    }
  }, (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.paragraph), React__default.createElement(CnMForm, {
    onSubmit: handleSubmit,
    style: {
      display: 'grid'
    },
    id: trigger.id
  }, fields.map(field => React__default.createElement("input", {
    key: field.name,
    name: field.name,
    placeholder: field.label + (field.required ? ' *' : ''),
    type: field.type,
    required: field.required,
    style: {
      backgroundColor: 'white',
      color: '#222',
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '1rem 0.4rem',
      fontSize: '0.8rem',
      outline: 'none',
      marginBottom: '0.4rem'
    }
  })), React__default.createElement("button", {
    style: {
      marginTop: '0.7rem',
      backgroundColor: backgroundPrimary,
      filter: isButtonDisaled ? 'brightness(0.7)' : 'brightness(1)',
      color: textPrimary,
      borderRadius: '4px',
      padding: '1rem 0.4rem',
      fontSize: '0.8rem',
      outline: 'none',
      cursor: 'pointer',
      border: 'none',
      letterSpacing: '0.05rem',
      textTransform: 'uppercase'
    },
    disabled: isButtonDisaled,
    type: 'submit'
  }, isButtonDisaled ? '...' : (_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.buttonText)), error && React__default.createElement("p", {
    style: {
      fontSize: '0.9rem',
      lineHeight: 1.5,
      marginBottom: '1rem',
      color: '#aa2f2f'
    }
  }, error));
};
var DataCaptureModal$1 = memo(({
  trigger
}) => {
  return ReactDOM.createPortal(React__default.createElement(DataCaptureModal, {
    trigger: trigger
  }), document.body);
});

const FullyClickableModal = ({
  handleClickCallToAction,
  handleCloseModal,
  trigger
}) => {
  var _trigger$data;
  const imageURL = (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL) || '';
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const {
    imageDimensions: {
      height,
      width
    }
  } = useModalDimensionsBasedOnImage({
    imageURL
  });
  const isImageBrokenDontShowModal = !width || !height;
  useSeen({
    trigger,
    skip: !stylesLoaded || isImageBrokenDontShowModal
  });
  const appendResponsiveBehaviour = React__default.useCallback(() => {
    return isMobile ? `.${prependClass('modal')} {

    }` : `
@media screen and (max-width: 1400px) {
  .${prependClass('modal')} {
    height: ${1 * height}px;
    width: ${1 * width}px;
  }
}

@media screen and (max-width: 850px) {
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
  }, [height, width]);
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
  }, [height, width, appendResponsiveBehaviour]);
  const handleModalAction = React__default.useCallback(e => {
    return handleClickCallToAction(e);
  }, [handleClickCallToAction]);
  const handleClickClose = React__default.useCallback(e => {
    e.stopPropagation();
    return handleCloseModal(e);
  }, [handleCloseModal]);
  if (!stylesLoaded) {
    return null;
  }
  if (isImageBrokenDontShowModal) {
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
const BrownsCustomModal = props => {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  const {
    trigger,
    handleClickCallToAction,
    handleCloseModal
  } = props;
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
  useSeen({
    trigger,
    skip: !open || !stylesLoaded
  });
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
const BrownsModal = props => {
  const {
    trigger
  } = props;
  const isFullyClickable = getIsModalFullyClickable({
    trigger
  });
  if (!isFullyClickable) return React__default.createElement(BrownsCustomModal, Object.assign({}, props));
  return React__default.createElement(FullyClickableModal, Object.assign({}, props));
};

const fontSize = '2em';
const cardFontScaleFactor = 1.5;
const AnimatedCard = ({
  animation,
  digit
}) => {
  return React__default.createElement("div", {
    className: `flipCard ${animation}`
  }, React__default.createElement("span", null, digit));
};
const StaticCard = ({
  position,
  digit
}) => {
  return React__default.createElement("div", {
    className: position
  }, React__default.createElement("span", null, digit));
};
const FlipUnitContainer = ({
  digit,
  shuffle,
  unit
}) => {
  let currentDigit = digit;
  let previousDigit = digit + 1;
  if (unit !== 'hours') {
    previousDigit = previousDigit === -1 ? 59 : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit;
  }
  if (currentDigit < 10) {
    currentDigit = `0${currentDigit}`;
  }
  if (previousDigit < 10) {
    previousDigit = `0${previousDigit}`;
  }
  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = !shuffle ? previousDigit : currentDigit;
  const animation1 = shuffle ? 'fold' : 'unfold';
  const animation2 = !shuffle ? 'fold' : 'unfold';
  return React__default.createElement("div", {
    className: 'flipUnitContainer'
  }, React__default.createElement(StaticCard, {
    position: 'upperCard',
    digit: currentDigit
  }), React__default.createElement(StaticCard, {
    position: 'lowerCard',
    digit: previousDigit
  }), React__default.createElement(AnimatedCard, {
    digit: digit1,
    animation: animation1
  }), React__default.createElement(AnimatedCard, {
    digit: digit2,
    animation: animation2
  }));
};
class FlipClock extends React__default.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      hoursShuffle: true,
      days: 0,
      daysShuffle: true,
      minutes: 0,
      minutesShuffle: true,
      seconds: 0,
      secondsShuffle: true,
      haveStylesLoaded: false
    };
  }
  componentDidMount() {
    const {
      textPrimary,
      backgroundPrimary
    } = this.props.colorConfig;
    const CSS = `
    @import url("https://fonts.googleapis.com/css?family=Droid+Sans+Mono");
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
    }
    
    .flipClock {
      display: flex;
      justify-content: space-between;
    }
    
    .flipUnitContainer {
      display: block;
      position: relative;
      width: calc(${fontSize} * ${cardFontScaleFactor});
      height: calc(${fontSize} * ${cardFontScaleFactor});
      perspective-origin: 50% 50%;
      perspective: 300px;
      background-color: ${backgroundPrimary};
      border-radius: 3px;
      box-shadow: 0px 10px 10px -10px grey;
    }
    
    .upperCard, .lowerCard {
      display: flex;
      position: relative;
      justify-content: center;
      width: 100%;
      height: 50%;
      overflow: hidden;
      border: 1px solid ${backgroundPrimary};
    }
    
    .upperCard span, .lowerCard span {
      font-size: ${fontSize};
      font-family: "Droid Sans Mono", monospace;
      font-weight: lighter;
      color: ${textPrimary};
    }
    
    .upperCard {
      align-items: flex-end;
      border-bottom: 0.5px solid ${backgroundPrimary};
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
    .upperCard span {
      transform: translateY(50%);
    }
    
    .lowerCard {
      align-items: flex-start;
      border-top: 0.5px solid ${backgroundPrimary};
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    .lowerCard span {
      transform: translateY(-50%);
    }
    
    .flipCard {
      display: flex;
      justify-content: center;
      position: absolute;
      left: 0;
      width: 100%;
      height: 50%;
      overflow: hidden;
      -webkit-backface-visibility: hidden;
              backface-visibility: hidden;
    }
    .flipCard span {
      font-family: "Droid Sans Mono", monospace;
      font-size: ${fontSize};
      font-weight: lighter;
      color: ${textPrimary};
    }

    .flipCard.unfold {
      top: 50%;
      align-items: flex-start;
      transform-origin: 50% 0%;
      transform: rotateX(180deg);
      background-color: ${backgroundPrimary};
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      border: 0.5px solid ${backgroundPrimary};
      border-top: 0.5px solid ${backgroundPrimary};
    }
    .flipCard.unfold span {
      transform: translateY(-50%);
    }
    .flipCard.fold {
      top: 0%;
      align-items: flex-end;
      transform-origin: 50% 100%;
      transform: rotateX(0deg);
      background-color: ${backgroundPrimary};
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      border: 0.5px solid ${backgroundPrimary};
      border-bottom: 0.5px solid ${backgroundPrimary};
    }
    .flipCard.fold span {
      transform: translateY(50%);
    }
    
    .fold {
      -webkit-animation: fold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;
              animation: fold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;
      transform-style: preserve-3d;
    }
    
    .unfold {
      -webkit-animation: unfold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;
              animation: unfold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;
      transform-style: preserve-3d;
    }
    
    @-webkit-keyframes fold {
      0% {
        transform: rotateX(0deg);
      }
      100% {
        transform: rotateX(-180deg);
      }
    }
    
    @keyframes fold {
      0% {
        transform: rotateX(0deg);
      }
      100% {
        transform: rotateX(-180deg);
      }
    }
    @-webkit-keyframes unfold {
      0% {
        transform: rotateX(180deg);
      }
      100% {
        transform: rotateX(0deg);
      }
    }
    @keyframes unfold {
      0% {
        transform: rotateX(180deg);
      }
      100% {
        transform: rotateX(0deg);
      }
    }
    @media screen and (max-width: 850px) {
      .flipClock {
        scale: 0.8
      }
    }
    @media screen and (max-width: 450px) {
      .flipClock {
        scale: 0.5
      }
    }
    `;
    this.timerID = setInterval(() => this.updateTime(), 50);
    this.styles = document.createElement('style');
    this.styles.appendChild(document.createTextNode(CSS));
    document.head.appendChild(this.styles);
    setTimeout(() => {
      this.setState({
        haveStylesLoaded: true
      });
    }, 500);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
    document.head.removeChild(this.styles);
  }
  updateTime() {
    const startDate = this.props.startDate || new Date();
    const diff = getDiffInDHMS(startDate, this.props.targetDate);
    const {
      days,
      hours,
      minutes,
      seconds
    } = diff;
    if (days !== this.state.days) {
      const daysShuffle = !this.state.daysShuffle;
      this.setState({
        days,
        daysShuffle
      });
    }
    if (hours !== this.state.hours) {
      const hoursShuffle = !this.state.hoursShuffle;
      this.setState({
        hours,
        hoursShuffle
      });
    }
    if (hours !== this.state.hours) {
      const hoursShuffle = !this.state.hoursShuffle;
      this.setState({
        hours,
        hoursShuffle
      });
    }
    if (minutes !== this.state.minutes) {
      const minutesShuffle = !this.state.minutesShuffle;
      this.setState({
        minutes,
        minutesShuffle
      });
    }
    if (seconds !== this.state.seconds) {
      const secondsShuffle = !this.state.secondsShuffle;
      this.setState({
        seconds,
        secondsShuffle
      });
    }
  }
  render() {
    const {
      hours,
      minutes,
      seconds,
      days,
      daysShuffle,
      hoursShuffle,
      minutesShuffle,
      secondsShuffle
    } = this.state;
    if (!this.state.haveStylesLoaded) return null;
    const {
      textPrimary
    } = this.props.colorConfig;
    const Separator = () => React__default.createElement("h1", {
      style: {
        color: textPrimary
      }
    }, ":");
    return React__default.createElement("div", {
      className: 'flipClock'
    }, React__default.createElement(FlipUnitContainer, {
      unit: 'days',
      digit: days,
      shuffle: daysShuffle
    }), React__default.createElement(Separator, null), React__default.createElement(FlipUnitContainer, {
      unit: 'hours',
      digit: hours,
      shuffle: hoursShuffle
    }), React__default.createElement(Separator, null), React__default.createElement(FlipUnitContainer, {
      unit: 'minutes',
      digit: minutes,
      shuffle: minutesShuffle
    }), React__default.createElement(Separator, null), React__default.createElement(FlipUnitContainer, {
      unit: 'seconds',
      digit: seconds,
      shuffle: secondsShuffle
    }));
  }
}
const CountdownFlipClock = props => {
  const colors = useBrandColors();
  return React__default.createElement(FlipClock, Object.assign({}, props, {
    colorConfig: colors
  }));
};

const Header = ({
  trigger
}) => {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4;
  const interpolate = getInterpolate(trigger.data || {}, true);
  const countdownEndTime = trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.countdownEndTime;
  const StdHeader = ({
    text
  }) => React__default.createElement("h1", {
    className: prependClass('main-text')
  }, interpolate(text || ''));
  const texts = buildTextWithPotentiallyCountdown((trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.heading) || '');
  if (!countdownEndTime) return React__default.createElement(StdHeader, {
    text: trigger === null || trigger === void 0 ? void 0 : (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.heading
  });
  if (!('hasCountdown' in texts)) return React__default.createElement(StdHeader, {
    text: trigger === null || trigger === void 0 ? void 0 : (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.heading
  });
  return React__default.createElement("div", null, React__default.createElement(StdHeader, {
    text: texts.text1
  }), React__default.createElement("div", {
    style: {
      maxWidth: 220,
      margin: '0.4rem auto'
    }
  }, React__default.createElement(CountdownFlipClock, {
    targetDate: new Date(countdownEndTime)
  })), texts.text2 && React__default.createElement(StdHeader, {
    text: texts.text2
  }));
};
var Header$1 = memo(Header);

const Paragraph = ({
  trigger
}) => {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4;
  const countdownEndTime = trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.countdownEndTime;
  const interpolate = getInterpolate(trigger.data || {}, true);
  const StdParagraph = ({
    text
  }) => React__default.createElement("p", {
    className: prependClass('sub-text')
  }, interpolate(text || ''));
  const texts = buildTextWithPotentiallyCountdown((trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.paragraph) || '');
  if (!countdownEndTime) return React__default.createElement(StdParagraph, {
    text: trigger === null || trigger === void 0 ? void 0 : (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.paragraph
  });
  if (!('hasCountdown' in texts)) return React__default.createElement(StdParagraph, {
    text: trigger === null || trigger === void 0 ? void 0 : (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.paragraph
  });
  return React__default.createElement("div", null, React__default.createElement(StdParagraph, {
    text: texts.text1
  }), React__default.createElement("div", {
    style: {
      maxWidth: 220,
      margin: 'auto'
    }
  }, React__default.createElement(CountdownFlipClock, {
    targetDate: new Date(countdownEndTime)
  })), texts.text2 && React__default.createElement(StdParagraph, {
    text: texts.text2
  }));
};
var Paragraph$1 = memo(Paragraph);

const StandardModal = ({
  trigger,
  handleClickCallToAction,
  handleCloseModal
}) => {
  var _trigger$data, _trigger$data2, _trigger$data3;
  const {
    error
  } = useLogging();
  const isModalFullyClickable = getIsModalFullyClickable({
    trigger
  });
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const {
    textPrimary,
    backgroundPrimary
  } = useBrandColors();
  const imageURL = (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL) || '';
  const {
    imageDimensions: {
      height,
      width
    },
    setImageDimensions
  } = useModalDimensionsBasedOnImage({
    imageURL
  });
  const isImageBrokenDontShowModal = !width || !height;
  useSeen({
    trigger,
    skip: !stylesLoaded || isImageBrokenDontShowModal
  });
  const appendResponsiveBehaviour = React__default.useCallback(() => {
    return isMobile ? `` : `

@media screen and (max-width: 1400px) {
  .${prependClass('modal')} {
    height: ${1 * height}px;
    width: ${1 * width}px;
  }
}

@media screen and (max-width: 850px) {
  .${prependClass('modal')} {
    height: ${0.6 * height}px;
    width: ${0.6 * width}px;
  }
  .${prependClass('main-text')} {
    font-size: 2.4rem;
  }
  .${prependClass('sub-text')} {
    font-size: 1.3rem;
  }
}

@media screen and (max-width: 450px) {
  .${prependClass('modal')} {
    height: ${0.4 * height}px;
    width: ${0.4 * width}px;
  }
  .${prependClass('main-text')} {
    font-size: 1.6rem;
  }
  .${prependClass('sub-text')} {
    font-size: 0.9rem;
  }
}

`;
  }, [height, width, imageURL, isMobile]);
  useEffect(() => {
    const cssToApply = `
    :root {
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
      ${isModalFullyClickable ? 'cursor: pointer;' : ``}
      height: ${height}px;
      width: ${width}px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background-repeat: no-repeat;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-shadow: var(--text-shadow);
      ${isModalFullyClickable ? 'transition: box-shadow 0.3s ease-in-out;' : ''}
      ${isModalFullyClickable ? 'cursor: pointer;' : ''}
    }
    
    .${prependClass('modal')}:hover {
      ${isModalFullyClickable ? `
        filter: brightness(1.05);
        box-shadow: 0.1rem 0.1rem 10px #7b7b7b;
      ` : ''}
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
      font-size: 4rem;
      font-style: normal;
      text-align: center;
      color: ${textPrimary};
      text-shadow: var(--text-shadow);
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .${prependClass('sub-text')} {
      margin: auto;
      font-weight: 600;
      font-size: 2.2rem;
      color: ${textPrimary};
      text-align: center;
      text-transform: uppercase;
    }
    
    .${prependClass('cta')} {
      cursor: pointer;
      background-color: ${backgroundPrimary};
      border-radius: 2px;
      display: block;
      font-size: 1.3rem;
      color: ${textPrimary};
      text-align: center;
      text-transform: uppercase;
      margin: 1rem;
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
      font-size: 2rem;
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
      ${isModalFullyClickable ? '' : 'background: rgba(0, 0, 0, 0.3);'}
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
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
  }, [isModalFullyClickable, height, width, appendResponsiveBehaviour]);
  const getHandleModalActionFinal = React__default.useCallback(() => {
    if (!isModalFullyClickable) return undefined;
    return e => {
      setImageDimensions({
        width: 0,
        height: 0
      });
      handleClickCallToAction(e);
    };
  }, [handleClickCallToAction]);
  const handleClickCloseFinal = React__default.useCallback(e => {
    e.stopPropagation();
    return handleCloseModal(e);
  }, [handleCloseModal]);
  if (!stylesLoaded) {
    return null;
  }
  if (isImageBrokenDontShowModal) {
    error("StandardModal: Couldn't get image dimensions, so not showing trigger. Investigate.");
    return null;
  }
  return React__default.createElement("div", {
    className: prependClass('overlay')
  }, React__default.createElement("div", {
    onClick: getHandleModalActionFinal(),
    className: prependClass('modal'),
    style: {
      background: `url(${imageURL})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative'
    }
  }, React__default.createElement("div", {
    className: prependClass('image-darken')
  }, React__default.createElement("div", {
    className: prependClass('close-button')
  }, React__default.createElement(CloseButton, {
    onClick: handleClickCloseFinal
  })), React__default.createElement("div", {
    className: prependClass('text-container')
  }, React__default.createElement(Header$1, {
    trigger: trigger
  }), React__default.createElement(Paragraph$1, {
    trigger: trigger
  })), !isModalFullyClickable && React__default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, React__default.createElement("div", null, React__default.createElement("a", {
    href: trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL,
    className: prependClass('cta'),
    onClick: handleClickCallToAction,
    style: {
      fontSize: '1.3rem',
      padding: '0.3rem 1rem'
    }
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.buttonText))))));
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
const StonehouseCustomModal = ({
  trigger,
  handleClickCallToAction,
  handleCloseModal
}) => {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  const [stylesLoaded, setStylesLoaded] = useState(false);
  useSeen({
    trigger,
    skip: !stylesLoaded
  });
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
const StonehouseModal = props => {
  const {
    trigger
  } = props;
  const isFullyClickable = getIsModalFullyClickable({
    trigger
  });
  if (!isFullyClickable) {
    return React__default.createElement(StonehouseCustomModal, Object.assign({}, props));
  }
  return React__default.createElement(FullyClickableModal, Object.assign({}, props));
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
  const [invocationTimeStamp, setInvocationTimeStamp] = useState(null);
  const {
    mutate: collect
  } = useCollectorMutation();
  const brand = useBrand();
  useEffect(() => {
    if (!!invocationTimeStamp) return;
    const tId = setTimeout(() => {
      if (!invocationTimeStamp) {
        setInvocationTimeStamp(new Date().toISOString());
      }
    }, 500);
    return () => {
      clearTimeout(tId);
    };
  }, [invocationTimeStamp]);
  if (!open) {
    return null;
  }
  const handleCloseModal = options => {
    removeActiveTrigger(trigger.id);
    setOpen(false);
    if (options !== null && options !== void 0 && options.skipTrackingEvent) return;
    trackEvent('user_closed_trigger', trigger);
  };
  const handleClickCallToAction = e => {
    var _trigger$data, _trigger$data2;
    e.preventDefault();
    collect({
      cta: {
        variantID: trigger.id,
        shownAt: invocationTimeStamp || new Date().toISOString()
      }
    });
    trackEvent('user_clicked_button', trigger);
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_self');
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
        return React__default.createElement(StandardModal, Object.assign({}, modalProps, {
          trigger: {
            ...trigger,
            data: {
              ...trigger.data,
              backgroundURL: image
            }
          }
        }));
      }
    case 'Sizzling':
      {
        let image = isMobile ? `https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-booknow-m.jpg` : `https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-booknow.jpg`;
        if (window.location.href.includes('signup')) image = isMobile ? `https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-findoutmore-m.jpg` : `https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-findoutmore.jpg`;
        return React__default.createElement(StandardModal, Object.assign({}, modalProps, {
          trigger: {
            ...trigger,
            data: {
              ...trigger.data,
              backgroundURL: image
            }
          }
        }));
      }
    case 'Stonehouse':
      return React__default.createElement(StonehouseModal, Object.assign({}, modalProps));
    case 'Browns':
      return React__default.createElement(BrownsModal, Object.assign({}, modalProps));
    case 'C&M':
    default:
      return React__default.createElement(StandardModal, Object.assign({}, modalProps));
  }
};
const TriggerModal = ({
  trigger
}) => {
  return ReactDOM.createPortal(React__default.createElement(Modal, {
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
  multipleOfSameBehaviourSupported: false,
  invoke: trigger => {
    if (isModalDataCaptureModal(trigger)) return React__default.createElement(DataCaptureModal$1, {
      key: trigger.id,
      trigger: trigger
    });
    return React__default.createElement(TriggerModal, {
      key: trigger.id,
      trigger: trigger
    });
  }
}, {
  id: 'youtube_v1',
  behaviour: 'BEHAVIOUR_YOUTUBE',
  multipleOfSameBehaviourSupported: false,
  invoke: trigger => React__default.createElement(TriggerYoutube, {
    key: trigger.id,
    trigger: trigger
  })
}, {
  id: 'inverse_v1',
  behaviour: 'BEHAVIOUR_INVERSE_FLOW',
  multipleOfSameBehaviourSupported: false,
  invoke: trigger => React__default.createElement(TriggerInverse, {
    key: trigger.id,
    trigger: trigger
  })
}, {
  id: 'banner_v1',
  behaviour: 'BEHAVIOUR_BANNER',
  multipleOfSameBehaviourSupported: true,
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
  defaultHandlers,
  initialDelay: _initialDelay = 0,
  exitIntentTriggers: _exitIntentTriggers = true,
  idleTriggers: _idleTriggers = true,
  pageLoadTriggers: _pageLoadTriggers = true,
  config: legacy_config
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
  return React__default.createElement(ConfigProvider, {
    legacy_config: legacy_config
  }, React__default.createElement(LoggingProvider, null, React__default.createElement(QueryClientProvider, {
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
      exitIntentTriggers: _exitIntentTriggers
    }
  }, React__default.createElement(VisitorProvider, null, React__default.createElement(MixpanelProvider, null, React__default.createElement(CollectorProvider, {
    handlers: handlers
  }, React__default.createElement(ErrorBoundary, {
    onError: (error, info) => console.error(error, info),
    fallback: React__default.createElement("div", null, "An application error occurred.")
  }, children))))))));
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
  unregisterHandler: () => {}
};
const FingerprintContext = createContext({
  ...defaultFingerprintState
});

export { CollectorContext, CollectorProvider, FingerprintContext, FingerprintProvider, onCookieChanged, useCollector, useFingerprint };
//# sourceMappingURL=index.modern.js.map

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactIdleTimer = require('react-idle-timer');
var useExitIntent = require('use-exit-intent');
var zustand = require('zustand');
var ReactDOM = _interopDefault(require('react-dom'));
var mixpanel = _interopDefault(require('mixpanel-browser'));
var reactQuery = require('@tanstack/react-query');
var reactErrorBoundary = require('react-error-boundary');
var Cookies = _interopDefault(require('js-cookie'));
var psl = _interopDefault(require('psl'));
var uuid = require('uuid');
var reactDeviceDetect = require('react-device-detect');
var transcend = _interopDefault(require('lodash.get'));
var reactHookForm = require('react-hook-form');
var uniqueBy = _interopDefault(require('lodash.uniqby'));

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure " + obj);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var TEMP_isCNMBrand = function TEMP_isCNMBrand() {
  if (typeof window === 'undefined') return false;
  var isCnMBookingDomain = /^book\.[A-Za-z0-9.!@#$%^&*()-_+=~{}[\]:;<>,?/|]+\.co\.uk$/.test(window.location.host);
  return isCnMBookingDomain;
};
var _LEGACY_getBrand = function _LEGACY_getBrand() {
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
var haveBrandColorsBeenConfigured = function haveBrandColorsBeenConfigured(colors) {
  if (!colors) return false;
  if (typeof colors !== 'object') return false;
  if (Object.keys(colors).length === 0) return false;
  if (Object.values(colors).every(function (color) {
    return color === '#000000';
  })) return false;
  return true;
};

var defaultColors = {
  backgroundPrimary: '#2a3d6d',
  backgroundPrimaryDimmed: 'rgb(27,233,237)',
  backgroundSecondary: 'rgb(226,226,226)',
  shadeOfGrey: 'rgb(13,14,49)',
  textPrimary: '#ffffff',
  greyText: '#40404b'
};
var defaultConfig = {
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
var LEGACY_merge_config = function LEGACY_merge_config(config, legacy_config) {
  return {
    displayTriggerAfterSecs: ((legacy_config === null || legacy_config === void 0 ? void 0 : legacy_config.exitIntentDelay) || 0) / 1000 || config.trigger.displayTriggerAfterSecs,
    triggerCooldownSecs: ((legacy_config === null || legacy_config === void 0 ? void 0 : legacy_config.triggerCooldown) || 0) / 1000 || config.trigger.triggerCooldownSecs,
    userIdleThresholdSecs: ((legacy_config === null || legacy_config === void 0 ? void 0 : legacy_config.idleDelay) || 0) / 1000 || config.trigger.userIdleThresholdSecs
  };
};
var objStringtoObjNum = function objStringtoObjNum(obj) {
  var newObj = {};
  Object.keys(obj).forEach(function (key) {
    newObj[key] = Number(obj[key]);
  });
  return newObj;
};

var createConfigSlice = function createConfigSlice(set, get) {
  return {
    config: defaultConfig,
    setConfig: function setConfig(updatedConfigEntries) {
      var _updatedConfigEntries;
      var argColors = updatedConfigEntries === null || updatedConfigEntries === void 0 ? void 0 : (_updatedConfigEntries = updatedConfigEntries.brand) === null || _updatedConfigEntries === void 0 ? void 0 : _updatedConfigEntries.colors;
      var shouldUpdateColors = haveBrandColorsBeenConfigured(argColors);
      var legacy_config = get().difiProps.config;
      set(function (prev) {
        return {
          config: _extends({}, prev.config, updatedConfigEntries, {
            brand: _extends({}, prev.config.brand, updatedConfigEntries.brand, {
              colors: shouldUpdateColors ? _extends({}, prev.config.brand.colors || defaultColors, argColors || {}) : prev.config.brand.colors
            }),
            trigger: _extends({}, prev.config.trigger, objStringtoObjNum(LEGACY_merge_config(prev.config, legacy_config)))
          })
        };
      });
    }
  };
};

var useLogging = function useLogging() {
  return useDifiStore(function (s) {
    return s.logging;
  });
};

var uuidValidateV4 = function uuidValidateV4(uuid$1) {
  return uuid.validate(uuid$1) && uuid.version(uuid$1) === 4;
};

var validVisitorId = function validVisitorId(id) {
  var splitCookie = id.split('|');
  return uuidValidateV4(splitCookie[0]);
};

var cookieValidDays = 365;
var CnMCookie = '_cm';
var CnMIDCookie = '_cm_id';
function getCookieDomain() {
  var parsedUrl = psl.parse(location.host);
  var cookieDomain = null;
  if (!parsedUrl.error) cookieDomain = parsedUrl.domain || null;
  return cookieDomain;
}
function correctCookieSubdomain() {
  var cookie = getCookie(CnMIDCookie);
  if (!cookie) return;
  Cookies.remove(CnMIDCookie);
  setCookie(CnMIDCookie, cookie, cookieValidDays);
  return cookie;
}
var buildCookie = function buildCookie(_ref) {
  var visitorId = _ref.visitorId;
  var _getSessionIdAndEndTi = getSessionIdAndEndTime(getCookie(CnMIDCookie)),
    sessionId = _getSessionIdAndEndTi.sessionId,
    endTime = _getSessionIdAndEndTi.endTime;
  return visitorId + "|" + sessionId + "|" + endTime.toISOString();
};
var updateCookieUUID = function updateCookieUUID(cookieData, uuid) {
  if (!cookieData) return null;
  var cookieSplit = cookieData.split('|');
  if (cookieSplit.length <= 2) return null;
  var visitorId = cookieSplit[0];
  if (visitorId === uuid) return null;
  var sessionId = cookieSplit[1];
  var endTime = cookieSplit[2];
  return uuid + "|" + sessionId + "|" + endTime;
};
var updateCookie = function updateCookie(uuid) {
  if (!uuidValidateV4(uuid)) return;
  var cookie = getCookie(CnMIDCookie);
  var newCookie = updateCookieUUID(cookie, uuid);
  if (!newCookie) return;
  setCookie(CnMIDCookie, newCookie, cookieValidDays);
};
var bootstrapVisitor = function bootstrapVisitor(_ref2) {
  var setVisitor = _ref2.setVisitor,
    session = _ref2.session,
    setSession = _ref2.setSession;
  var visitor = {
    id: undefined
  };
  if (getCookie(cookieAccountJWT)) {
    visitor.jwt = getCookie(cookieAccountJWT);
  }
  if (typeof window !== 'undefined') {
    var urlParams = new URLSearchParams(window.location.search);
    var vidParam = urlParams.get('v_id');
    var visitorId = vidParam || undefined;
    if (vidParam && vidParam.includes('?')) {
      visitorId = vidParam.split('?')[0];
    }
    visitor.id = visitorId;
    var sourceId = urlParams.get('source_id');
    if (sourceId) visitor.sourceId = sourceId;
  }
  if (!visitor.id && !getCookie(CnMIDCookie) || !validVisitorId(getCookie(CnMIDCookie) || '')) {
    var _visitorId = uuid.v4();
    visitor.id = _visitorId;
  }
  if (!visitor.id && getCookie(CnMIDCookie)) {
    var c = getCookie(CnMIDCookie);
    var _c$split = c.split('|'),
      _visitorId2 = _c$split[0];
    visitor.id = _visitorId2;
  }
  var combinedCookie = buildCookie({
    visitorId: visitor.id
  });
  setCookie(CnMIDCookie, combinedCookie, cookieValidDays);
  var _getSessionIdAndEndTi2 = getSessionIdAndEndTime(getCookie(CnMIDCookie)),
    sessionId = _getSessionIdAndEndTi2.sessionId,
    endTime = _getSessionIdAndEndTi2.endTime;
  session.id = sessionId;
  session.endTime = endTime;
  setSession(session);
  setVisitor(visitor);
};
var getSessionIdAndEndTime = function getSessionIdAndEndTime(cookieData) {
  var t = new Date();
  t.setMinutes(t.getMinutes() + 30);
  var sessionId;
  var endTime = t;
  if (!cookieData || hasCookieValueExpired(cookieData)) {
    sessionId = uuid.v4();
  } else {
    var c = cookieData;
    var _c$split2 = c.split('|'),
      sessId = _c$split2[1];
    if (sessId === 'undefined' || sessId === undefined) {
      sessId = uuid.v4();
    }
    sessionId = sessId;
  }
  return {
    sessionId: sessionId,
    endTime: endTime
  };
};
var hasCookieValueExpired = function hasCookieValueExpired(cookieData) {
  if (!cookieData) return true;
  var cookieSplit = cookieData.split('|');
  if (cookieSplit.length > 1) {
    var timestampString = cookieSplit[cookieSplit.length - 1];
    var expiryTimeEpoch = Date.parse(timestampString);
    var expiryTime = new Date();
    expiryTime.setTime(expiryTimeEpoch);
    var n = new Date();
    if (n > expiryTime) {
      return true;
    }
  }
  return false;
};

var setCookie = function setCookie(name, value, expires, options) {
  return Cookies.set(name, value, _extends({
    expires: expires,
    sameSite: 'strict',
    domain: getCookieDomain() || undefined
  }, options));
};
var getCookie = function getCookie(name) {
  return Cookies.get(name);
};
var onCookieChanged = function onCookieChanged(callback, interval) {
  if (interval === void 0) {
    interval = 1000;
  }
  var lastCookie = document.cookie;
  setInterval(function () {
    var cookie = document.cookie;
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

var bootstrapSession = function bootstrapSession(_ref) {
  var appId = _ref.appId,
    setSession = _ref.setSession;
  var session = {
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

var VisitorProvider = function VisitorProvider(_ref) {
  var children = _ref.children;
  var _useFingerprint = useFingerprint$1(),
    appId = _useFingerprint.appId,
    booted = _useFingerprint.booted;
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var _useState = React.useState({}),
    session = _useState[0],
    setSession = _useState[1];
  var _useState2 = React.useState({}),
    visitor = _useState2[0],
    setVisitor = _useState2[1];
  React.useEffect(function () {
    if (!booted) {
      log('VisitorProvider: not booted');
      return;
    }
    log('VisitorProvider: booting');
    var boot = function boot() {
      try {
        return Promise.resolve(bootstrapSession({
          appId: appId,
          setSession: setSession
        })).then(function () {
          return Promise.resolve(bootstrapVisitor({
            setVisitor: setVisitor,
            session: session,
            setSession: setSession
          })).then(function () {
            var updatedCookie = correctCookieSubdomain();
            log('FingerprintContext: Correcting cookie domain to', updatedCookie);
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
    boot();
    log('VisitorProvider: booted', session, visitor);
  }, [appId, booted]);
  var setVisitorData = React__default.useCallback(function (prop) {
    setVisitor(function (visitor) {
      return _extends({}, visitor, prop);
    });
  }, [setVisitor]);
  return React__default.createElement(VisitorContext.Provider, {
    value: {
      session: session,
      visitor: visitor,
      setVisitor: setVisitorData
    }
  }, children);
};
var VisitorContext = React.createContext({
  session: {},
  visitor: {},
  setVisitor: function setVisitor() {
    return console.error('VisitorContext: setVisitor not setup properly. Check your Context order.');
  }
});
var useVisitor = function useVisitor() {
  return React.useContext(VisitorContext);
};

var queryClient = new reactQuery.QueryClient();
var cookieAccountJWT = 'b2c_token';
var useConsentCheck = function useConsentCheck(consent, consentCallback) {
  var _useState = React.useState(consent),
    consentGiven = _useState[0],
    setConsentGiven = _useState[1];
  var _useLogging = useLogging(),
    log = _useLogging.log;
  React.useEffect(function () {
    if (consent) {
      setConsentGiven(consent);
      return;
    }
    log('Fingerprint Widget Consent: ', consent);
    if (!consentCallback) return;
    var consentGivenViaCallback = consentCallback();
    var interval = setInterval(function () {
      setConsentGiven(consent);
    }, 1000);
    if (consentGivenViaCallback) {
      clearInterval(interval);
    }
    return function () {
      return clearInterval(interval);
    };
  }, [consentCallback, consent]);
  return consentGiven;
};
var FingerprintProvider = function FingerprintProvider(props) {
  _objectDestructuringEmpty(props);
  var _useStore = useStore(),
    set = _useStore.set,
    handlers = _useStore.handlers,
    addHandlers = _useStore.addHandlers,
    difiProps = _useStore.difiProps;
  var booted = difiProps.booted,
    appId = difiProps.appId,
    children = difiProps.children,
    _difiProps$consent = difiProps.consent,
    consent = _difiProps$consent === void 0 ? false : _difiProps$consent,
    consentCallback = difiProps.consentCallback,
    defaultHandlers = difiProps.defaultHandlers;
  var setBooted = function setBooted(val) {
    return set({
      difiProps: _extends({}, difiProps, {
        booted: val
      })
    });
  };
  React.useEffect(function () {
    set({
      difiProps: _extends({}, difiProps, props)
    });
    addHandlers(defaultHandlers || []);
  }, [props]);
  var consentGiven = useConsentCheck(consent, consentCallback);
  React.useEffect(function () {
    if (!props.appId) throw new Error('C&M Fingerprint: appId is required');
    if (!appId) return;
    if (booted) return;
    if (!consentGiven) return;
    var performBoot = function performBoot() {
      try {
        setBooted(true);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    performBoot();
  }, [consentGiven, booted, appId, props.appId]);
  if (!appId) {
    return null;
  }
  if (!consentGiven) {
    return children;
  }
  if (!booted) {
    return null;
  }
  return React__default.createElement(reactQuery.QueryClientProvider, {
    client: queryClient
  }, React__default.createElement(VisitorProvider, null, React__default.createElement(MixpanelProvider, null, React__default.createElement(CollectorProvider, {
    handlers: handlers
  }, React__default.createElement(reactErrorBoundary.ErrorBoundary, {
    onError: function onError(error, info) {
      return console.error(error, info);
    },
    fallback: React__default.createElement("div", null, "An application error occurred.")
  }, children)))));
};
var useFingerprint = function useFingerprint() {
  return useDifiStore(function (s) {
    return s.difiProps;
  });
};

var useFingerprint$1 = function useFingerprint$1() {
  return useFingerprint();
};

function getEnvVars() {
  var _window, _window$location, _window$location$host, _window2, _window2$location, _window2$location$hos, _window3, _window3$location, _window4, _window4$location, _window5, _window5$location;
  var isDev = false;
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

var init = function init(cfg) {
  mixpanel.init(getEnvVars().MIXPANEL_TOKEN, {
    debug: cfg.debug,
    track_pageview: true,
    persistence: 'localStorage'
  });
};
var trackEvent = function trackEvent(event, props, callback) {
  return mixpanel.track(event, props, callback);
};
var MixpanelProvider = function MixpanelProvider(_ref) {
  var children = _ref.children;
  var _useFingerprint = useFingerprint$1(),
    appId = _useFingerprint.appId;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor;
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var _useState = React.useState(false),
    initiated = _useState[0],
    setInitiated = _useState[1];
  React.useEffect(function () {
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
  var registerUserData = React__default.useCallback(function (properties) {
    log("Mixpanel: attempting to'register/override properties: " + Object.keys(properties).join(', '));
    mixpanel.people.set(properties);
  }, [log]);
  React.useEffect(function () {
    if (!visitor.cohort) {
      log('Able to register user cohort, but none provided. ');
      return;
    }
    registerUserData({
      u_cohort: visitor.cohort
    });
  }, [visitor, registerUserData]);
  React.useEffect(function () {
    if (!visitor.sourceId) return;
    registerUserData({
      sourceId: visitor.sourceId
    });
  }, [visitor, registerUserData]);
  return React__default.createElement(MixpanelContext.Provider, {
    value: {
      trackEvent: trackEvent,
      registerUserData: registerUserData,
      state: {
        initiated: initiated
      }
    }
  }, children);
};
var MixpanelContext = React.createContext({
  trackEvent: function trackEvent() {
    return console.error('Mixpanel: trackEvent not setup properly. Check your Context order.');
  },
  registerUserData: function registerUserData() {
    return console.error('Mixpanel: registerUserData not setup properly. Check your Context order.');
  },
  state: {
    initiated: false
  }
});
var useMixpanel = function useMixpanel() {
  return React.useContext(MixpanelContext);
};

var deviceInfo = {
  type: reactDeviceDetect.isMobile ? 'mobile' : 'desktop'
};

var headers = {
  'Content-Type': 'application/json'
};
var hostname = getEnvVars().FINGERPRINT_API_HOSTNAME;
var request = {
  get: function (url, params) {
    try {
      return Promise.resolve(fetch(url + '?' + new URLSearchParams(params), {
        method: 'GET',
        headers: headers
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  },
  post: function (url, body) {
    try {
      return Promise.resolve(fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  },
  patch: function (url, body) {
    try {
      return Promise.resolve(fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body)
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  },
  put: function (url, body) {
    try {
      return Promise.resolve(fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  },
  "delete": function (url) {
    try {
      return Promise.resolve(fetch(url, {
        method: 'DELETE',
        headers: headers
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }
};

function isUndefined(o) {
  return typeof o === 'undefined';
}
function getReducedSearchParams() {
  if (isUndefined(window)) return {};
  return new URLSearchParams(window.location.search).toString().split('&').reduce(function (acc, cur) {
    var _cur$split = cur.split('='),
      key = _cur$split[0],
      value = _cur$split[1];
    if (!key) return acc;
    acc[key] = value;
    return acc;
  }, {});
}
function getPagePayload() {
  if (isUndefined(window)) return null;
  var params = getReducedSearchParams();
  var hash = window.location.hash.substring(2);
  return {
    url: window.location.href,
    path: window.location.pathname,
    title: document.title,
    hash: hash,
    params: params
  };
}
function getReferrer() {
  var params = getReducedSearchParams();
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

var useConfig = function useConfig() {
  return useStore().config;
};
var useBrand = function useBrand() {
  var configBrandName = useConfig().brand.name;
  if (configBrandName) return configBrandName;
  return _LEGACY_getBrand();
};
var useTriggerConfig = function useTriggerConfig() {
  return useConfig().trigger;
};
var useBrandColors = function useBrandColors() {
  return useConfig().brand.colors || defaultColors;
};

var useCollector = function useCollector() {
  return React.useContext(CollectorContext);
};

var useSeenMutation = function useSeenMutation() {
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  var _useFingerprint = useFingerprint$1(),
    appId = _useFingerprint.appId;
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  var _useCollector = useCollector(),
    setPageTriggers = _useCollector.setPageTriggers,
    setIncompleteTriggers = _useCollector.setIncompleteTriggers,
    setConversions = _useCollector.setConversions;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor,
    setVisitor = _useVisitor.setVisitor;
  var brand = useBrand();
  var trackTriggerSeen = React__default.useCallback(function (trigger) {
    trackEvent('trigger_displayed', {
      triggerId: trigger.id,
      triggerType: trigger.invocation,
      triggerBehaviour: trigger.behaviour,
      time: new Date().toISOString(),
      brand: brand
    });
  }, [trackEvent, brand]);
  return reactQuery.useMutation(function (trigger) {
    trackTriggerSeen(trigger);
    return request.put(hostname + "/triggers/" + appId + "/" + visitor.id + "/seen", {
      seenTriggerIDs: [trigger.id],
      visitor: visitor,
      page: getPagePayload(),
      device: deviceInfo
    }).then(function (response) {
      log('Seen mutation: response', response);
      return response;
    })["catch"](function (err) {
      error('Seen mutation: error', err);
      return err;
    });
  }, {
    onSuccess: function (res) {
      try {
        return Promise.resolve(res.json()).then(function (r) {
          var _r$identifiers;
          log('Seen mutation: replacing triggers with:', r.pageTriggers);
          setPageTriggers(r.pageTriggers);
          setConversions(r.conversions || []);
          var retrievedUserId = (_r$identifiers = r.identifiers) === null || _r$identifiers === void 0 ? void 0 : _r$identifiers.main;
          if (retrievedUserId) {
            updateCookie(retrievedUserId);
            setVisitor({
              id: retrievedUserId
            });
          }
          log('Seen mutation: replacing incomplete Triggers with:', r.incompleteTriggers);
          setIncompleteTriggers(r.incompleteTriggers || []);
          return r;
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }
  });
};

var closeButtonStyles = {
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
var CloseButton = function CloseButton(_ref) {
  var onClick = _ref.onClick,
    style = _ref.style;
  var buttonStyle = _extends({}, closeButtonStyles, style);
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

var getDiffInDHMS = function getDiffInDHMS(targetDate, initialDate) {
  if (initialDate === void 0) {
    initialDate = new Date();
  }
  var diffInSeconds = getPositiveDateDiffInSec(targetDate, initialDate);
  var days = Math.floor(diffInSeconds / (24 * 60 * 60));
  var hours = Math.floor(diffInSeconds % (24 * 60 * 60) / (60 * 60));
  var minutes = Math.floor(diffInSeconds % (60 * 60) / 60);
  var seconds = diffInSeconds % 60;
  return {
    days: days,
    minutes: minutes,
    hours: hours,
    seconds: seconds
  };
};
var getPositiveDateDiffInSec = function getPositiveDateDiffInSec(date1, date2) {
  return Math.abs(Math.floor((date2.getTime() - date1.getTime()) / 1000));
};
function formatTimeStamp(targetDate) {
  var durationInSeconds = getPositiveDateDiffInSec(new Date(), targetDate);
  var days = Math.floor(durationInSeconds / (60 * 60 * 24));
  var hours = Math.floor(durationInSeconds % (60 * 60 * 24) / (60 * 60));
  var minutes = Math.floor(durationInSeconds % (60 * 60) / 60);
  var seconds = durationInSeconds % 60;
  var parts = [];
  if (days > 0) {
    parts.push(days + " day" + (days > 1 ? 's' : ''));
  }
  if (hours > 0) {
    parts.push(hours + " hour" + (hours > 1 ? 's' : ''));
  }
  if (minutes > 0) {
    parts.push(minutes + " minute" + (minutes > 1 ? 's' : ''));
  }
  if (seconds > 0) {
    parts.push(seconds + " second" + (seconds > 1 ? 's' : ''));
  }
  if (parts.length === 0) {
    return '0 sec';
  }
  if (parts.length === 1) {
    return parts[0];
  }
  var lastPart = parts.pop();
  var formattedDuration = parts.join(' ') + (" and " + lastPart);
  return formattedDuration;
}

var defualtFormatString = function defualtFormatString(val) {
  return val;
};
var getInterpolate = function getInterpolate(structure, hideMissingValues) {
  if (hideMissingValues === void 0) {
    hideMissingValues = true;
  }
  var interpolate = function interpolate(text, formatString) {
    if (formatString === void 0) {
      formatString = defualtFormatString;
    }
    var replacedText = text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, function (match, keys) {
      var value = transcend(structure, keys);
      if (formatString) value = formatString(value);
      if (!!match && !value && hideMissingValues) return '';
      return value !== undefined ? value : match;
    });
    return replacedText;
  };
  return interpolate;
};

var useCountdown = function useCountdown(_ref) {
  var onZero = _ref.onZero,
    initialTimestamp = _ref.initialTimestamp,
    interpolate = _ref.interpolate,
    _ref$formatDate = _ref.formatDate,
    formatDate = _ref$formatDate === void 0 ? formatTimeStamp : _ref$formatDate;
  var _useLogging = useLogging(),
    error = _useLogging.error;
  var _useState = React.useState(initialTimestamp || null),
    timestamp = _useState[0],
    setTimeStamp = _useState[1];
  var _useState2 = React.useState(''),
    countdown = _useState2[0],
    setCountdown = _useState2[1];
  var _useState3 = React.useState(),
    intId = _useState3[0],
    setIntId = _useState3[1];
  React.useEffect(function () {
    if (timestamp === null) return;
    var id = setInterval(function () {
      var result = formatTimeStamp(new Date(timestamp));
      setCountdown(result);
    }, 1000);
    setIntId(id);
    return function () {
      return clearInterval(id);
    };
  }, [timestamp]);
  React.useEffect(function () {
    if (!onZero) return;
    if (timestamp === null) return;
    var currentDate = new Date();
    var diff = getPositiveDateDiffInSec(currentDate, new Date(timestamp));
    if (diff <= 0) {
      onZero();
      clearInterval(intId);
    }
  }, [onZero, timestamp, intId]);
  var interpolatefunc = React.useMemo(function () {
    return getInterpolate((interpolate === null || interpolate === void 0 ? void 0 : interpolate.structure) || {});
  }, [interpolate]);
  var formattedCountdown = React.useMemo(function () {
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
    var formatVal = function formatVal(val) {
      return formatDate(new Date(val));
    };
    var interpoaltedVal = interpolatefunc(interpolate.text, formatVal);
    return interpoaltedVal;
  }, [countdown, interpolate, interpolatefunc]);
  return {
    countdown: countdown,
    setTimeStamp: setTimeStamp,
    formattedCountdown: formattedCountdown
  };
};

var useBannerStyles = function useBannerStyles() {
  var _useBrandColors = useBrandColors(),
    textPrimary = _useBrandColors.textPrimary,
    backgroundPrimaryDimmed = _useBrandColors.backgroundPrimaryDimmed;
  var styles = {
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

var resetPad = function resetPad() {
  document.body.style.paddingTop = 'inherit';
};
var getIsBannerFullyClickable = function getIsBannerFullyClickable(trigger) {
  var _trigger$data;
  var isFullyClickable = !((_trigger$data = trigger.data) !== null && _trigger$data !== void 0 && _trigger$data.marketingText);
  return isFullyClickable;
};
var useBannerContainerStyles = function useBannerContainerStyles(_ref) {
  var _trigger$data2, _extends2;
  var trigger = _ref.trigger,
    _ref$element = _ref.element,
    width = _ref$element.width,
    height = _ref$element.height;
  var position = (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.position;
  var isFullyClickable = getIsBannerFullyClickable(trigger);
  var _useBrandColors = useBrandColors(),
    backgroundPrimary = _useBrandColors.backgroundPrimary,
    textPrimary = _useBrandColors.textPrimary;
  var mutualStyles = {
    fontFamily: 'sans-serif',
    position: 'fixed',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    color: textPrimary,
    backgroundColor: backgroundPrimary,
    cursor: isFullyClickable ? 'pointer' : 'default'
  };
  var offset = 0.5 * width + 0.5 * height;
  switch (position) {
    case 'left':
      return _extends({}, mutualStyles, {
        translate: "0 -" + offset + "px",
        rotate: '90deg',
        transformOrigin: '0% 50%',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        borderRadius: '10px 10px 0 0'
      });
    case 'right':
      return _extends({}, mutualStyles, {
        translate: "0 -" + offset + "px",
        rotate: '270deg',
        transformOrigin: '100% 50%',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        borderRadius: '10px 10px 0 0'
      });
    case 'top':
    case 'bottom':
      return _extends({}, mutualStyles, (_extends2 = {}, _extends2[position] = 0, _extends2.left = 0, _extends2.width = '100%', _extends2));
    default:
      return {};
  }
};

var HorizontalBanner = function HorizontalBanner(_ref) {
  var _container$current, _container$current2, _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  var handleAction = _ref.handleAction,
    handleClose = _ref.handleClose,
    trigger = _ref.trigger;
  var styles = useBannerStyles();
  var container = React.useRef(null);
  var isFullyClickable = getIsBannerFullyClickable(trigger);
  var containerStyles = useBannerContainerStyles({
    element: {
      width: ((_container$current = container.current) === null || _container$current === void 0 ? void 0 : _container$current.clientWidth) || 0,
      height: ((_container$current2 = container.current) === null || _container$current2 === void 0 ? void 0 : _container$current2.clientHeight) || 0
    },
    trigger: trigger
  });
  var interpolate = getInterpolate(trigger.data || {});
  var _useCountdown = useCountdown({
      onZero: function onZero() {
        return handleClose({});
      },
      initialTimestamp: new Date(((_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.countdownEndTime) || ''),
      interpolate: {
        text: ((_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.marketingText) || ((_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.buttonText) || '',
        structure: trigger.data
      }
    }),
    text = _useCountdown.formattedCountdown;
  var position = (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.position;
  React.useEffect(function () {
    var _container$current3;
    var bannerHeight = (_container$current3 = container.current) === null || _container$current3 === void 0 ? void 0 : _container$current3.clientHeight;
    if (position === 'top') {
      document.body.style.paddingTop = bannerHeight + "px";
    } else if (position === 'bottom') {
      document.body.style.paddingBottom = bannerHeight + "px";
    }
    return resetPad;
  }, [container, position]);
  return React__default.createElement("div", {
    ref: container,
    style: containerStyles,
    "data-testid": "cnm-horizontal-banner-" + trigger.id
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

var _excluded = ["icon"];
var Ticket = function Ticket(props) {
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    height: '16',
    width: '18',
    viewBox: '0 0 576 512'
  }, props), React__default.createElement("path", {
    d: 'M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z'
  }));
};
var Exclamation = function Exclamation(props) {
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    height: '16',
    width: '16',
    viewBox: '0 0 512 512'
  }, props), React__default.createElement("path", {
    d: 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z'
  }));
};
var Heart = function Heart(props) {
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    height: '16',
    width: '16',
    viewBox: '0 0 512 512'
  }, props), React__default.createElement("path", {
    d: 'M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z'
  }));
};
var iconList = {
  exclamation: Exclamation,
  ticket: Ticket,
  heart: Heart
};
var Icon = function Icon(_ref) {
  var icon = _ref.icon,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useLogging = useLogging(),
    error = _useLogging.error;
  var IconComponent = iconList[icon];
  if (!icon) return null;
  if (icon && !IconComponent) {
    error('BannerIcon: iconName is not valid');
    return null;
  }
  return React__default.createElement(IconComponent, Object.assign({}, props));
};

var BannerIcon = function BannerIcon(_ref) {
  var iconName = _ref.iconName,
    IconProps = _ref.IconProps;
  var _useLogging = useLogging(),
    error = _useLogging.error;
  var _useBrandColors = useBrandColors(),
    textPrimary = _useBrandColors.textPrimary;
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

var SideBanner = function SideBanner(_ref) {
  var _trigger$data, _container$current, _container$current2, _trigger$data2, _trigger$data3;
  var handleAction = _ref.handleAction,
    handleClose = _ref.handleClose,
    trigger = _ref.trigger;
  var container = React.useRef(null);
  var isFullyClickable = getIsBannerFullyClickable(trigger);
  var shouldRenderIcon = !!((_trigger$data = trigger.data) !== null && _trigger$data !== void 0 && _trigger$data.buttonIcon);
  var styles = useBannerStyles();
  var containerStyles = useBannerContainerStyles({
    element: {
      width: ((_container$current = container.current) === null || _container$current === void 0 ? void 0 : _container$current.clientWidth) || 0,
      height: ((_container$current2 = container.current) === null || _container$current2 === void 0 ? void 0 : _container$current2.clientHeight) || 0
    },
    trigger: trigger
  });
  return React__default.createElement("div", {
    ref: container,
    style: containerStyles,
    "data-testid": "cnm-side-banner-" + trigger.id
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

var Banner = function Banner(_ref) {
  var _trigger$data3;
  var trigger = _ref.trigger;
  var _useCollector = useCollector(),
    removeActiveTrigger = _useCollector.removeActiveTrigger;
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  var _useState = React.useState(true),
    open = _useState[0],
    setOpen = _useState[1];
  var _useState2 = React.useState(false),
    hasFired = _useState2[0],
    setHasFired = _useState2[1];
  var _useSeenMutation = useSeenMutation(),
    runSeen = _useSeenMutation.mutate,
    isSuccess = _useSeenMutation.isSuccess,
    isLoading = _useSeenMutation.isLoading;
  React.useEffect(function () {
    if (!open) return;
    if (hasFired) return;
    if (isSuccess) return;
    if (isLoading) return;
    var tId = setTimeout(function () {
      runSeen(trigger);
    }, 500);
    setHasFired(true);
    return function () {
      clearTimeout(tId);
    };
  }, [open, isSuccess, isLoading]);
  if (!open) return null;
  var handleClickCallToAction = function handleClickCallToAction(e) {
    var _trigger$data, _trigger$data2;
    e.preventDefault();
    trackEvent('user_clicked_button', trigger);
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_blank');
    setOpen(false);
    resetPad();
  };
  var handleClose = function handleClose(e) {
    e === null || e === void 0 ? void 0 : e.stopPropagation();
    trackEvent('user_closed_trigger', trigger);
    removeActiveTrigger(trigger.id);
    setOpen(false);
    resetPad();
  };
  var props = {
    handleClose: handleClose,
    handleAction: handleClickCallToAction,
    trigger: trigger
  };
  var position = (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.position;
  if (position === 'left' || position === 'right') return React__default.createElement(SideBanner, Object.assign({}, props));
  return React__default.createElement(HorizontalBanner, Object.assign({}, props));
};
var TriggerBanner = function TriggerBanner(_ref2) {
  var trigger = _ref2.trigger;
  return ReactDOM.createPortal(React__default.createElement(Banner, {
    trigger: trigger
  }), document.body);
};

var randomHash = 'f' + uuid.v4().split('-')[0];
var prependClass = function prependClass(className) {
  return "f" + randomHash + "-" + className;
};
var getIsModalFullyClickable = function getIsModalFullyClickable(_ref) {
  var _trigger$data;
  var trigger = _ref.trigger;
  return !(trigger !== null && trigger !== void 0 && (_trigger$data = trigger.data) !== null && _trigger$data !== void 0 && _trigger$data.buttonText);
};
var getModalSizing = function getModalSizing(img) {
  var imageRealHeight = img.height;
  var imageRealWidth = img.width;
  var aspectRatio = imageRealWidth / imageRealHeight;
  var getMaxWidth = function getMaxWidth(num) {
    return window.innerWidth * 0.9 > num ? num : window.innerWidth * 0.9;
  };
  var getMaxHeight = function getMaxHeight(num) {
    return window.innerHeight * 0.9 > num ? num : window.innerHeight * 0.9;
  };
  var deviceSizeLimits = reactDeviceDetect.isMobile ? {
    height: getMaxHeight(1000),
    width: getMaxWidth(640)
  } : {
    height: getMaxHeight(490),
    width: getMaxWidth(819)
  };
  var widthToUse = Math.min(imageRealWidth, deviceSizeLimits.width);
  var heightToUse = widthToUse / aspectRatio;
  return {
    height: heightToUse,
    width: widthToUse
  };
};
var useModalDimensionsBasedOnImage = function useModalDimensionsBasedOnImage(_ref2) {
  var imageURL = _ref2.imageURL;
  var _useState = React.useState({
      width: 0,
      height: 0
    }),
    imageDimensions = _useState[0],
    setImageDimensions = _useState[1];
  React.useEffect(function () {
    var img = new Image();
    img.src = imageURL;
    var id = setInterval(function () {
      var modalSize = getModalSizing(img);
      if (modalSize.height || modalSize.width) {
        setImageDimensions(modalSize);
        clearInterval(id);
      }
    }, 50);
    return function () {
      clearInterval(id);
    };
  }, [imageURL]);
  return {
    imageDimensions: imageDimensions,
    setImageDimensions: setImageDimensions
  };
};
var isModalDataCaptureModal = function isModalDataCaptureModal(trigger) {
  if (!trigger) return false;
  if (!trigger.data) return false;
  if (!trigger.data.successText) return false;
  return true;
};
function splitSenseOfUrgencyText(text) {
  var split = text.split(/\{\{\s*countdownEndTime\s*\}\}/i);
  return split;
}
var buildTextWithPotentiallyCountdown = function buildTextWithPotentiallyCountdown(text) {
  var hasCountdown = false;
  var text1 = '';
  var text2 = '';
  var split = splitSenseOfUrgencyText(text);
  text1 = split[0];
  if (split.length > 1) {
    text2 = split[1];
    hasCountdown = true;
    return {
      hasCountdown: hasCountdown,
      text1: text1,
      text2: text2
    };
  } else {
    return {
      text: text1
    };
  }
};

var cnmFormPrefix = 'cnm-form';
var CnMForm = function CnMForm(props) {
  return React__default.createElement("form", Object.assign({}, props, {
    id: cnmFormPrefix + "-" + props.id
  }));
};

var useDataCaptureMutation = function useDataCaptureMutation() {
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  var _useFingerprint = useFingerprint$1(),
    appId = _useFingerprint.appId;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor;
  return reactQuery.useMutation(function (data) {
    return request.post(hostname + '/collector/' + (visitor === null || visitor === void 0 ? void 0 : visitor.id) + '/form', _extends({}, data, {
      appId: appId
    })).then(function (response) {
      log('Trigger API response', response);
      return response;
    })["catch"](function (err) {
      error('Trigger API error', err);
      return err;
    });
  }, {
    onSuccess: function onSuccess() {}
  });
};

var stringIsSubstringOf = function stringIsSubstringOf(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.toLowerCase().includes(b.toLowerCase());
};
var defaultBannedTypes = ['password', 'submit'];
var defaultBannedFieldPartialNames = ['expir', 'cvv', 'cvc', 'csv', 'csc', 'pin', 'pass', 'card'];
var getFormEntries = function getFormEntries(form, _ref) {
  var _ref$bannedFieldParti = _ref.bannedFieldPartialNames,
    bannedFieldPartialNames = _ref$bannedFieldParti === void 0 ? defaultBannedFieldPartialNames : _ref$bannedFieldParti,
    _ref$bannedTypes = _ref.bannedTypes,
    bannedTypes = _ref$bannedTypes === void 0 ? defaultBannedTypes : _ref$bannedTypes;
  var elements = Array.from(form.elements).filter(function (el) {
    if (bannedTypes.includes(el === null || el === void 0 ? void 0 : el.type)) return false;
    if (bannedFieldPartialNames.find(function (partialName) {
      if (stringIsSubstringOf(el.name, partialName)) return true;
      if (stringIsSubstringOf(el.id, partialName)) return true;
      if (stringIsSubstringOf(el.placeholder, partialName)) return true;
      return false;
    })) return false;
    return true;
  });
  var data = elements.reduce(function (result, item) {
    var fieldName = item.name;
    if (!fieldName) {
      if (item.id) {
        console.error('getFormEntries: form field has no name, falling back to id', {
          item: item
        });
        fieldName = item.id;
      } else if (item.placeholder) {
        console.error('getFormEntries: form field has no name or id, falling back to placeholder', {
          item: item
        });
        fieldName = item.placeholder;
      } else {
        console.error('getFormEntries: form field has no name, id or placeholder, fallback to type', {
          item: item
        });
        fieldName = item.type;
      }
    }
    result[fieldName] = item.value;
    return result;
  }, {});
  return data;
};

var isViewBlockingModal = false;
var fields = [{
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
var getOuterLayer = function getOuterLayer(_ref) {
  var isViewBlockingModal = _ref.isViewBlockingModal;
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
var DataCaptureModal = function DataCaptureModal(_ref2) {
  var _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  var trigger = _ref2.trigger;
  var _React$useState = React__default.useState(''),
    error = _React$useState[0],
    setError = _React$useState[1];
  var _React$useState2 = React__default.useState(0),
    retainedHeight = _React$useState2[0],
    setRetainedHeight = _React$useState2[1];
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var ref = React__default.useRef(null);
  var _useCollector = useCollector(),
    removeActiveTrigger = _useCollector.removeActiveTrigger;
  var _useState = React.useState(null),
    invocationTimeStamp = _useState[0],
    setInvocationTimeStamp = _useState[1];
  var _useSeenMutation = useSeenMutation(),
    runSeen = _useSeenMutation.mutate,
    isSeenSuccess = _useSeenMutation.isSuccess,
    isSeenLoading = _useSeenMutation.isLoading;
  var _useDataCaptureMutati = useDataCaptureMutation(),
    submit = _useDataCaptureMutati.mutate,
    isSubmissionSuccess = _useDataCaptureMutati.isSuccess,
    isSubmissionLoading = _useDataCaptureMutati.isLoading;
  React.useEffect(function () {
    if (!open) return;
    if (invocationTimeStamp) return;
    if (isSeenSuccess) return;
    if (isSeenLoading) return;
    var tId = setTimeout(function () {
      runSeen(trigger);
      if (!invocationTimeStamp) {
        setInvocationTimeStamp(new Date().toISOString());
      }
    }, 500);
    return function () {
      clearTimeout(tId);
    };
  }, [open, isSeenSuccess, isSeenLoading]);
  var handleCloseModal = function handleCloseModal() {
    removeActiveTrigger(trigger.id);
    if (!isSubmissionSuccess) trackEvent('user_closed_trigger', trigger);
  };
  var handleSubmit = function handleSubmit(e) {
    var _ref$current;
    e.preventDefault();
    setRetainedHeight(((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.clientHeight) || 0);
    setError('');
    var entries = getFormEntries(e.target, {});
    trackEvent('user_submitted_data_capture', trigger);
    var haveAllRequiredFieldsBeenSubmitted = fields.every(function (field) {
      return e.target[field.name].value;
    });
    if (!haveAllRequiredFieldsBeenSubmitted) setError('Please make sure all required fields are filled in.');
    log('DataCaptureModal', 'handleSubmit', 'submit', entries);
    submit({
      formData: entries
    });
  };
  var isButtonDisaled = isSubmissionLoading;
  var _useBrandColors = useBrandColors(),
    backgroundPrimary = _useBrandColors.backgroundPrimary,
    textPrimary = _useBrandColors.textPrimary;
  var Wrapper = function Wrapper(_ref3) {
    var _trigger$data;
    var children = _ref3.children;
    return React__default.createElement("div", {
      style: getOuterLayer({
        isViewBlockingModal: isViewBlockingModal
      })
    }, React__default.createElement("div", {
      ref: ref,
      style: {
        height: retainedHeight || undefined,
        background: "url(" + ((_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL) + ")",
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
  }, fields.map(function (field) {
    return React__default.createElement("input", {
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
    });
  }), React__default.createElement("button", {
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
var DataCaptureModal$1 = React.memo(function (_ref4) {
  var trigger = _ref4.trigger;
  return ReactDOM.createPortal(React__default.createElement(DataCaptureModal, {
    trigger: trigger
  }), document.body);
});

var useHostname = function useHostname() {
  var _window, _window$location;
  return ((_window = window) === null || _window === void 0 ? void 0 : (_window$location = _window.location) === null || _window$location === void 0 ? void 0 : _window$location.hostname) || '';
};

var useCollectorMutation = function useCollectorMutation() {
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  var _useFingerprint = useFingerprint$1(),
    appId = _useFingerprint.appId;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor,
    session = _useVisitor.session;
  var requestHost = useHostname();
  console.log('appid', {
    appId: appId,
    visitor: visitor,
    session: session
  });
  return reactQuery.useMutation(function (data) {
    return request.post(hostname + '/collector/' + (visitor === null || visitor === void 0 ? void 0 : visitor.id), _extends({}, data, {
      appId: appId,
      visitor: visitor,
      sessionId: session === null || session === void 0 ? void 0 : session.id,
      hostname: requestHost,
      device: deviceInfo
    })).then(function (response) {
      log('Collector API response', response);
      return response;
    })["catch"](function (err) {
      error('Collector API error', err);
      return err;
    });
  }, {
    onSuccess: function onSuccess() {}
  });
};

var FullyClickableModal = function FullyClickableModal(_ref) {
  var _trigger$data;
  var handleClickCallToAction = _ref.handleClickCallToAction,
    handleCloseModal = _ref.handleCloseModal,
    trigger = _ref.trigger;
  var imageURL = (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL) || '';
  var _useModalDimensionsBa = useModalDimensionsBasedOnImage({
      imageURL: imageURL
    }),
    _useModalDimensionsBa2 = _useModalDimensionsBa.imageDimensions,
    height = _useModalDimensionsBa2.height,
    width = _useModalDimensionsBa2.width;
  var _useState = React.useState(false),
    stylesLoaded = _useState[0],
    setStylesLoaded = _useState[1];
  var appendResponsiveBehaviour = React__default.useCallback(function () {
    return reactDeviceDetect.isMobile ? "." + prependClass('modal') + " {\n\n    }" : "\n@media screen and (max-width: 1400px) {\n  ." + prependClass('modal') + " {\n    height: " + 1 * height + "px;\n    width: " + 1 * width + "px;\n  }\n}\n\n@media screen and (max-width: 850px) {\n  ." + prependClass('modal') + " {\n    height: " + 0.6 * height + "px;\n    width: " + 0.6 * width + "px;\n  }\n}\n\n@media screen and (max-width: 450px) {\n  ." + prependClass('modal') + " {\n    height: " + 0.4 * height + "px;\n    width: " + 0.4 * width + "px;\n  }\n}\n";
  }, [height, width]);
  React.useEffect(function () {
    var cssToApply = "\n  \n    ." + prependClass('overlay') + " {\n      background-color: rgba(0, 0, 0, 0.7);\n      position: fixed;\n      top: 0;\n      left: 0;\n      width: 100vw;\n      height: 100vh;\n      z-index: 9999;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-weight: 500;\n      font-style: normal;\n    }\n    \n    ." + prependClass('modal') + " {\n      height: " + height + "px;\n      width: " + width + "px;\n      display: flex;\n      flex-direction: column;\n      overflow: hidden;\n      background-repeat: no-repeat;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: space-between;\n      box-shadow: var(--text-shadow);\n      " + ( 'transition: all 0.3s ease-in-out;' ) + "\n      " + ( 'cursor: pointer;' ) + "\n    }\n\n    " + ( "." + prependClass('modal') + ":hover {\n      filter: brightness(1.05);\n      box-shadow: 0.1rem 0.1rem 10px #7b7b7b;\n    }" ) + "\n    \n    \n    ." + prependClass('text-center') + " {\n      text-align: center;\n    }\n  \n    ." + prependClass('text-container') + " {\n      flex-direction: column;\n      flex: 1;\n      text-shadow: var(--text-shadow);\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('main-text') + " {\n      font-weight: 500;\n      font-size: 2rem;\n      font-style: normal;\n      text-align: center;\n      margin-bottom: 1rem;\n      fill: var(--secondary);\n      text-shadow: var(--text-shadow);\n      max-width: 400px;\n      margin-left: auto;\n      margin-right: auto;\n    \n    }\n    \n    ." + prependClass('sub-text') + " {\n      margin: auto;\n      font-weight: 600;\n      font-size: 1.2rem;\n    \n      text-align: center;\n      text-transform: uppercase;\n    }\n\n    ." + prependClass('close-button') + " {\n      border-radius: 100%;\n      background-color: white;\n      width: 2rem;\n      border: none;\n      height: 2rem;\n      position: absolute;\n      margin: 10px;\n      top: 0px;\n      right: 0px;\n      color: black;\n      font-size: 1.2rem;\n      font-weight: 300;\n      cursor: pointer;\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('close-button:hover') + " {\n      transition: all 0.3s;\n      filter: brightness(0.95);\n    }\n    \n    \n    ." + prependClass('text-shadow') + " {\n      text-shadow: var(--text-shadow);\n    }\n    \n    ." + prependClass('box-shadow') + " {\n      box-shadow: var(--text-shadow);\n    }\n    " + appendResponsiveBehaviour() + "\n\n    ";
    var styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(cssToApply));
    document.head.appendChild(styles);
    setTimeout(function () {
      setStylesLoaded(true);
    }, 500);
    return function () {
      document.head.removeChild(styles);
    };
  }, [height, width, appendResponsiveBehaviour]);
  var handleModalAction = React__default.useCallback(function (e) {
    return handleClickCallToAction(e);
  }, [handleClickCallToAction]);
  var handleClickClose = React__default.useCallback(function (e) {
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
      background: "url(" + imageURL + ")",
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

var CurlyText = function CurlyText(_ref) {
  var randomHash = _ref.randomHash,
    text = _ref.text;
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
var BrownsCustomModal = function BrownsCustomModal(props) {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  var trigger = props.trigger,
    handleClickCallToAction = props.handleClickCallToAction,
    handleCloseModal = props.handleCloseModal;
  var _useState = React.useState(false),
    stylesLoaded = _useState[0],
    setStylesLoaded = _useState[1];
  var randomHash = React.useMemo(function () {
    return uuid.v4().split('-')[0];
  }, []);
  React.useEffect(function () {
    var css = "\n      @import url(\"https://p.typekit.net/p.css?s=1&k=olr0pvp&ht=tk&f=25136&a=50913812&app=typekit&e=css\");\n\n@font-face {\n  font-family: \"proxima-nova\";\n  src: url(\"https://use.typekit.net/af/23e139/00000000000000007735e605/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3\") format(\"woff2\"), url(\"https://use.typekit.net/af/23e139/00000000000000007735e605/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3\") format(\"woff\"), url(\"https://use.typekit.net/af/23e139/00000000000000007735e605/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3\") format(\"opentype\");\n  font-display: auto;\n  font-style: normal;\n  font-weight: 500;\n  font-stretch: normal;\n}\n\n:root {\n  --primary: #b6833f;\n  --secondary: white;\n  --text-shadow: 1px 1px 10px rgba(0,0,0,1);\n}\n\n.tk-proxima-nova {\n  font-family: \"proxima-nova\", sans-serif;\n}\n\n.f" + randomHash + "-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 9999;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: \"proxima-nova\", sans-serif !important;\n  font-weight: 500;\n  font-style: normal;\n}\n\n.f" + randomHash + "-modal {\n  width: 80%;\n  max-width: 400px;\n  height: 500px;\n  overflow: hidden;\n  background-repeat: no-repeat;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  box-shadow: 0px 0px 10px rgba(0,0,0,0.5);\n}\n\n@media screen and (min-width: 768px) {\n  .f" + randomHash + "-modal {\n    width: 50%;\n    max-width: 600px;\n  }\n}\n\n.f" + randomHash + "-modalImage {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n\n\n@media screen and (max-width:768px) {\n  .f" + randomHash + "-modal {\n    width: 100vw;\n  }\n}\n\n\n.f" + randomHash + "-curlyText {\n  font-family: \"proxima-nova\", sans-serif;\n  font-weight: 500;\n  font-style: normal;\n  text-transform: uppercase;\n  text-align: center;\n  letter-spacing: 2pt;\n  fill: var(--secondary);\n  text-shadow: var(--text-shadow);\n  margin-top: -150px;\n  max-width: 400px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.f" + randomHash + "-curlyText text {\n  font-size: 1.3rem;\n}\n\n\n.f" + randomHash + "-mainText {\n  font-weight: 200;\n  font-family: \"proxima-nova\", sans-serif;\n  color: var(--secondary);\n  font-size: 2.1rem;\n  text-shadow: var(--text-shadow);\n  display: inline-block;\n  text-align: center;\n  margin-top: -4.5rem;\n}\n\n\n@media screen and (min-width: 768px) {\n  .f" + randomHash + "-curlyText {\n    margin-top: -200px;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .f" + randomHash + "-curlyText {\n    margin-top: -200px;\n  }\n\n  .f" + randomHash + "-mainText {\n    font-size: 2.4rem;\n  }\n}\n\n@media screen and (min-width: 1150px) {\n  .f" + randomHash + "-mainText {\n    font-size: 2.7rem;\n  }\n}\n\n.f" + randomHash + "-cta {\n  font-family: \"proxima-nova\", sans-serif;\n  cursor: pointer;\n  background-color: var(--secondary);\n  padding: 0.75rem 3rem;\n  border-radius: 8px;\n  display: block;\n  font-size: 1.3rem;\n  color: var(--primary);\n  text-align: center;\n  text-transform: uppercase;\n  max-width: 400px;\n  margin: 0 auto;\n  text-decoration: none;\n}\n\n.f" + randomHash + "-cta:hover {\n  transition: all 0.3s;\n  filter: brightness(0.95);\n}\n\n.f" + randomHash + "-close-button {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n}\n\n.f" + randomHash + "-close-button:hover {\n  transition: all 0.3s;\n  filter: brightness(0.95);\n}\n\n\n.f" + randomHash + "-button-container {\n  flex: 1;\n  display: grid;\n  place-content: center;\n}\n\n.f" + randomHash + "-image-darken {\n  background: rgba(0,0,0,0.2);\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 2rem;\n}\n    ";
    var styles = document.createElement('style');
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
      background: "url(" + (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL) + ")",
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
var BrownsModal = function BrownsModal(props) {
  var trigger = props.trigger;
  var isFullyClickable = getIsModalFullyClickable({
    trigger: trigger
  });
  if (!isFullyClickable) return React__default.createElement(BrownsCustomModal, Object.assign({}, props));
  return React__default.createElement(FullyClickableModal, Object.assign({}, props));
};

var fontSize = '2em';
var cardFontScaleFactor = 1.5;
var AnimatedCard = function AnimatedCard(_ref) {
  var animation = _ref.animation,
    digit = _ref.digit;
  return React__default.createElement("div", {
    className: "flipCard " + animation
  }, React__default.createElement("span", null, digit));
};
var StaticCard = function StaticCard(_ref2) {
  var position = _ref2.position,
    digit = _ref2.digit;
  return React__default.createElement("div", {
    className: position
  }, React__default.createElement("span", null, digit));
};
var FlipUnitContainer = function FlipUnitContainer(_ref3) {
  var digit = _ref3.digit,
    shuffle = _ref3.shuffle,
    unit = _ref3.unit;
  var currentDigit = digit;
  var previousDigit = digit + 1;
  if (unit !== 'hours') {
    previousDigit = previousDigit === -1 ? 59 : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit;
  }
  if (currentDigit < 10) {
    currentDigit = "0" + currentDigit;
  }
  if (previousDigit < 10) {
    previousDigit = "0" + previousDigit;
  }
  var digit1 = shuffle ? previousDigit : currentDigit;
  var digit2 = !shuffle ? previousDigit : currentDigit;
  var animation1 = shuffle ? 'fold' : 'unfold';
  var animation2 = !shuffle ? 'fold' : 'unfold';
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
var FlipClock = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(FlipClock, _React$Component);
  function FlipClock(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.state = {
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
    return _this;
  }
  var _proto = FlipClock.prototype;
  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;
    var _this$props$colorConf = this.props.colorConfig,
      textPrimary = _this$props$colorConf.textPrimary,
      backgroundPrimary = _this$props$colorConf.backgroundPrimary;
    var CSS = "\n    @import url(\"https://fonts.googleapis.com/css?family=Droid+Sans+Mono\");\n    * {\n      box-sizing: border-box;\n    }\n    \n    body {\n      margin: 0;\n    }\n    \n    .flipClock {\n      display: flex;\n      justify-content: space-between;\n    }\n    \n    .flipUnitContainer {\n      display: block;\n      position: relative;\n      width: calc(" + fontSize + " * " + cardFontScaleFactor + ");\n      height: calc(" + fontSize + " * " + cardFontScaleFactor + ");\n      perspective-origin: 50% 50%;\n      perspective: 300px;\n      background-color: " + backgroundPrimary + ";\n      border-radius: 3px;\n      box-shadow: 0px 10px 10px -10px grey;\n    }\n    \n    .upperCard, .lowerCard {\n      display: flex;\n      position: relative;\n      justify-content: center;\n      width: 100%;\n      height: 50%;\n      overflow: hidden;\n      border: 1px solid " + backgroundPrimary + ";\n    }\n    \n    .upperCard span, .lowerCard span {\n      font-size: " + fontSize + ";\n      font-family: \"Droid Sans Mono\", monospace;\n      font-weight: lighter;\n      color: " + textPrimary + ";\n    }\n    \n    .upperCard {\n      align-items: flex-end;\n      border-bottom: 0.5px solid " + backgroundPrimary + ";\n      border-top-left-radius: 3px;\n      border-top-right-radius: 3px;\n    }\n    .upperCard span {\n      transform: translateY(50%);\n    }\n    \n    .lowerCard {\n      align-items: flex-start;\n      border-top: 0.5px solid " + backgroundPrimary + ";\n      border-bottom-left-radius: 3px;\n      border-bottom-right-radius: 3px;\n    }\n    .lowerCard span {\n      transform: translateY(-50%);\n    }\n    \n    .flipCard {\n      display: flex;\n      justify-content: center;\n      position: absolute;\n      left: 0;\n      width: 100%;\n      height: 50%;\n      overflow: hidden;\n      -webkit-backface-visibility: hidden;\n              backface-visibility: hidden;\n    }\n    .flipCard span {\n      font-family: \"Droid Sans Mono\", monospace;\n      font-size: " + fontSize + ";\n      font-weight: lighter;\n      color: " + textPrimary + ";\n    }\n\n    .flipCard.unfold {\n      top: 50%;\n      align-items: flex-start;\n      transform-origin: 50% 0%;\n      transform: rotateX(180deg);\n      background-color: " + backgroundPrimary + ";\n      border-bottom-left-radius: 3px;\n      border-bottom-right-radius: 3px;\n      border: 0.5px solid " + backgroundPrimary + ";\n      border-top: 0.5px solid " + backgroundPrimary + ";\n    }\n    .flipCard.unfold span {\n      transform: translateY(-50%);\n    }\n    .flipCard.fold {\n      top: 0%;\n      align-items: flex-end;\n      transform-origin: 50% 100%;\n      transform: rotateX(0deg);\n      background-color: " + backgroundPrimary + ";\n      border-top-left-radius: 3px;\n      border-top-right-radius: 3px;\n      border: 0.5px solid " + backgroundPrimary + ";\n      border-bottom: 0.5px solid " + backgroundPrimary + ";\n    }\n    .flipCard.fold span {\n      transform: translateY(50%);\n    }\n    \n    .fold {\n      -webkit-animation: fold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;\n              animation: fold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;\n      transform-style: preserve-3d;\n    }\n    \n    .unfold {\n      -webkit-animation: unfold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;\n              animation: unfold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;\n      transform-style: preserve-3d;\n    }\n    \n    @-webkit-keyframes fold {\n      0% {\n        transform: rotateX(0deg);\n      }\n      100% {\n        transform: rotateX(-180deg);\n      }\n    }\n    \n    @keyframes fold {\n      0% {\n        transform: rotateX(0deg);\n      }\n      100% {\n        transform: rotateX(-180deg);\n      }\n    }\n    @-webkit-keyframes unfold {\n      0% {\n        transform: rotateX(180deg);\n      }\n      100% {\n        transform: rotateX(0deg);\n      }\n    }\n    @keyframes unfold {\n      0% {\n        transform: rotateX(180deg);\n      }\n      100% {\n        transform: rotateX(0deg);\n      }\n    }\n    @media screen and (max-width: 850px) {\n      .flipClock {\n        scale: 0.8\n      }\n    }\n    @media screen and (max-width: 450px) {\n      .flipClock {\n        scale: 0.5\n      }\n    }\n    ";
    this.timerID = setInterval(function () {
      return _this2.updateTime();
    }, 50);
    this.styles = document.createElement('style');
    this.styles.appendChild(document.createTextNode(CSS));
    document.head.appendChild(this.styles);
    setTimeout(function () {
      _this2.setState({
        haveStylesLoaded: true
      });
    }, 500);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    clearInterval(this.timerID);
    document.head.removeChild(this.styles);
  };
  _proto.updateTime = function updateTime() {
    var startDate = this.props.startDate || new Date();
    var diff = getDiffInDHMS(startDate, this.props.targetDate);
    var days = diff.days,
      hours = diff.hours,
      minutes = diff.minutes,
      seconds = diff.seconds;
    if (days !== this.state.days) {
      var daysShuffle = !this.state.daysShuffle;
      this.setState({
        days: days,
        daysShuffle: daysShuffle
      });
    }
    if (hours !== this.state.hours) {
      var hoursShuffle = !this.state.hoursShuffle;
      this.setState({
        hours: hours,
        hoursShuffle: hoursShuffle
      });
    }
    if (hours !== this.state.hours) {
      var _hoursShuffle = !this.state.hoursShuffle;
      this.setState({
        hours: hours,
        hoursShuffle: _hoursShuffle
      });
    }
    if (minutes !== this.state.minutes) {
      var minutesShuffle = !this.state.minutesShuffle;
      this.setState({
        minutes: minutes,
        minutesShuffle: minutesShuffle
      });
    }
    if (seconds !== this.state.seconds) {
      var secondsShuffle = !this.state.secondsShuffle;
      this.setState({
        seconds: seconds,
        secondsShuffle: secondsShuffle
      });
    }
  };
  _proto.render = function render() {
    var _this$state = this.state,
      hours = _this$state.hours,
      minutes = _this$state.minutes,
      seconds = _this$state.seconds,
      days = _this$state.days,
      daysShuffle = _this$state.daysShuffle,
      hoursShuffle = _this$state.hoursShuffle,
      minutesShuffle = _this$state.minutesShuffle,
      secondsShuffle = _this$state.secondsShuffle;
    if (!this.state.haveStylesLoaded) return null;
    var textPrimary = this.props.colorConfig.textPrimary;
    var Separator = function Separator() {
      return React__default.createElement("h1", {
        style: {
          color: textPrimary
        }
      }, ":");
    };
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
  };
  return FlipClock;
}(React__default.Component);
var CountdownFlipClock = function CountdownFlipClock(props) {
  var colors = useBrandColors();
  return React__default.createElement(FlipClock, Object.assign({}, props, {
    colorConfig: colors
  }));
};

var Header = function Header(_ref) {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4;
  var trigger = _ref.trigger;
  var interpolate = getInterpolate(trigger.data || {}, true);
  var countdownEndTime = trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.countdownEndTime;
  var StdHeader = function StdHeader(_ref2) {
    var text = _ref2.text;
    return React__default.createElement("h1", {
      className: prependClass('main-text')
    }, interpolate(text || ''));
  };
  var texts = buildTextWithPotentiallyCountdown((trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.heading) || '');
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
var Header$1 = React.memo(Header);

var Paragraph = function Paragraph(_ref) {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4;
  var trigger = _ref.trigger;
  var countdownEndTime = trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.countdownEndTime;
  var interpolate = getInterpolate(trigger.data || {}, true);
  var StdParagraph = function StdParagraph(_ref2) {
    var text = _ref2.text;
    return React__default.createElement("p", {
      className: prependClass('sub-text')
    }, interpolate(text || ''));
  };
  var texts = buildTextWithPotentiallyCountdown((trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.paragraph) || '');
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
var Paragraph$1 = React.memo(Paragraph);

var StandardModal = function StandardModal(_ref) {
  var _trigger$data, _trigger$data2, _trigger$data3;
  var trigger = _ref.trigger,
    handleClickCallToAction = _ref.handleClickCallToAction,
    handleCloseModal = _ref.handleCloseModal;
  var _useLogging = useLogging(),
    error = _useLogging.error;
  var isModalFullyClickable = getIsModalFullyClickable({
    trigger: trigger
  });
  var _useState = React.useState(false),
    stylesLoaded = _useState[0],
    setStylesLoaded = _useState[1];
  var _useBrandColors = useBrandColors(),
    textPrimary = _useBrandColors.textPrimary,
    backgroundPrimary = _useBrandColors.backgroundPrimary;
  var imageURL = (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL) || '';
  var _useModalDimensionsBa = useModalDimensionsBasedOnImage({
      imageURL: imageURL
    }),
    _useModalDimensionsBa2 = _useModalDimensionsBa.imageDimensions,
    height = _useModalDimensionsBa2.height,
    width = _useModalDimensionsBa2.width,
    setImageDimensions = _useModalDimensionsBa.setImageDimensions;
  var appendResponsiveBehaviour = React__default.useCallback(function () {
    return reactDeviceDetect.isMobile ? "" : "\n\n@media screen and (max-width: 1400px) {\n  ." + prependClass('modal') + " {\n    height: " + 1 * height + "px;\n    width: " + 1 * width + "px;\n  }\n}\n\n@media screen and (max-width: 850px) {\n  ." + prependClass('modal') + " {\n    height: " + 0.6 * height + "px;\n    width: " + 0.6 * width + "px;\n  }\n  ." + prependClass('main-text') + " {\n    font-size: 2.4rem;\n  }\n  ." + prependClass('sub-text') + " {\n    font-size: 1.3rem;\n  }\n}\n\n@media screen and (max-width: 450px) {\n  ." + prependClass('modal') + " {\n    height: " + 0.4 * height + "px;\n    width: " + 0.4 * width + "px;\n  }\n  ." + prependClass('main-text') + " {\n    font-size: 1.6rem;\n  }\n  ." + prependClass('sub-text') + " {\n    font-size: 0.9rem;\n  }\n}\n\n";
  }, [height, width, imageURL, reactDeviceDetect.isMobile]);
  React.useEffect(function () {
    var cssToApply = "\n    :root {\n      --text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);\n    }\n    \n    h1,\n    h2,\n    h3,\n    h4,\n    h5,\n    h6,\n    p,\n    a,\n    span {\n      line-height: 1.2;\n      font-family: Arial, Helvetica, sans-serif;\n    }\n    \n    ." + prependClass('overlay') + " {\n      position: fixed;\n      top: 0;\n      left: 0;\n      width: 100vw;\n      height: 100vh;\n      background-color: rgba(0, 0, 0, 0.5);\n      z-index: 9999;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-weight: 500;\n      font-style: normal;      \n    }\n    \n    ." + prependClass('modal') + " {\n      " + (isModalFullyClickable ? 'cursor: pointer;' : "") + "\n      height: " + height + "px;\n      width: " + width + "px;\n      display: flex;\n      flex-direction: column;\n      overflow: hidden;\n      background-repeat: no-repeat;\n      flex-direction: column;\n      align-items: center;\n      justify-content: space-between;\n      box-shadow: var(--text-shadow);\n      " + (isModalFullyClickable ? 'transition: box-shadow 0.3s ease-in-out;' : '') + "\n      " + (isModalFullyClickable ? 'cursor: pointer;' : '') + "\n    }\n    \n    ." + prependClass('modal') + ":hover {\n      " + (isModalFullyClickable ? "\n        filter: brightness(1.05);\n        box-shadow: 0.1rem 0.1rem 10px #7b7b7b;\n      " : '') + "\n    }\n    \n    ." + prependClass('text-center') + " {\n      text-align: center;\n    }\n  \n    ." + prependClass('text-container') + " {\n      flex-direction: column;\n      flex: 1;\n      text-shadow: var(--text-shadow);\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('main-text') + " {\n      font-weight: 500;\n      font-size: 4rem;\n      font-style: normal;\n      text-align: center;\n      color: " + textPrimary + ";\n      text-shadow: var(--text-shadow);\n      max-width: 400px;\n      margin-left: auto;\n      margin-right: auto;\n    }\n    \n    ." + prependClass('sub-text') + " {\n      margin: auto;\n      font-weight: 600;\n      font-size: 2.2rem;\n      color: " + textPrimary + ";\n      text-align: center;\n      text-transform: uppercase;\n    }\n    \n    ." + prependClass('cta') + " {\n      cursor: pointer;\n      background-color: " + backgroundPrimary + ";\n      border-radius: 2px;\n      display: block;\n      font-size: 1.3rem;\n      color: " + textPrimary + ";\n      text-align: center;\n      text-transform: uppercase;\n      margin: 1rem;\n      text-decoration: none;\n      box-shadow: 0.3rem 0.3rem white;\n    }\n    \n    ." + prependClass('cta:hover') + " {\n      transition: all 0.3s;\n      filter: brightness(0.95);\n    }\n    \n    ." + prependClass('close-button') + " {\n      border-radius: 100%;\n      background-color: white;\n      width: 2rem;\n      border: none;\n      height: 2rem;\n      position: absolute;\n      margin: 10px;\n      top: 0px;\n      right: 0px;\n      color: black;\n      font-size: 2rem;\n      font-weight: 300;\n      cursor: pointer;\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('close-button:hover') + " {\n      transition: all 0.3s;\n      filter: brightness(0.95);\n    }\n    \n    ." + prependClass('image-darken') + " {\n      " + (isModalFullyClickable ? '' : 'background: rgba(0, 0, 0, 0.3);') + "\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      width: 100%;\n    }\n    \n    ." + prependClass('text-shadow') + " {\n      text-shadow: var(--text-shadow);\n    }\n    \n    ." + prependClass('box-shadow') + " {\n      box-shadow: var(--text-shadow);\n    }\n    " + appendResponsiveBehaviour() + "\n    ";
    var styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(cssToApply));
    document.head.appendChild(styles);
    setTimeout(function () {
      setStylesLoaded(true);
    }, 500);
    return function () {
      document.head.removeChild(styles);
    };
  }, [isModalFullyClickable, height, width, appendResponsiveBehaviour]);
  var getHandleModalActionFinal = React__default.useCallback(function () {
    if (!isModalFullyClickable) return undefined;
    return function (e) {
      setImageDimensions({
        width: 0,
        height: 0
      });
      handleClickCallToAction(e);
    };
  }, [handleClickCallToAction]);
  var handleClickCloseFinal = React__default.useCallback(function (e) {
    e.stopPropagation();
    return handleCloseModal(e);
  }, [handleCloseModal]);
  if (!stylesLoaded) {
    return null;
  }
  if (!width || !height) {
    error("StandardModal: Couldn't get image dimensions, so not showing trigger. Investigate.");
    return null;
  }
  return React__default.createElement("div", {
    className: prependClass('overlay')
  }, React__default.createElement("div", {
    onClick: getHandleModalActionFinal(),
    className: prependClass('modal'),
    style: {
      background: "url(" + imageURL + ")",
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

var primaryColor = "rgb(33,147,174)";
var secondaryColor = "#e0aa00";
var callToActionColor = 'rgb(235,63,43)';
var mainGrey = 'rgb(70,70,70)';
var scaleBg = function scaleBg(scale) {
  var imageWidth = 800;
  var imageHeight = 700;
  return {
    height: imageHeight * scale,
    width: imageWidth * scale
  };
};
var StonehouseCustomModal = function StonehouseCustomModal(_ref) {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  var trigger = _ref.trigger,
    handleClickCallToAction = _ref.handleClickCallToAction,
    handleCloseModal = _ref.handleCloseModal;
  var _useState = React.useState(false),
    stylesLoaded = _useState[0],
    setStylesLoaded = _useState[1];
  React.useEffect(function () {
    var cssToApply = "\n      @font-face{\n        font-family: \"Gotham Bold\";\n        src: url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.eot?#iefix\") format(\"embedded-opentype\"),\n            url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.woff\") format(\"woff\"),\n            url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.woff2\") format(\"woff2\"),\n            url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.ttf\") format(\"truetype\"),\n            url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.svg#Gotham-Bold\") format(\"svg\");\n            font-display: auto;\n            font-style: normal;\n            font-weight: 500;\n            font-stretch: normal;\n    }\n     \n\n      :root {\n        --text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);\n      }\n  \n\n      ." + prependClass('overlay') + " {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100vw;\n        height: 100vh;\n        background-color: rgba(0, 0, 0, 0.5);\n        z-index: 9999;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        font-family: 'Gotham Bold';\n        font-weight: 500;\n        font-style: normal;\n      }\n\n      ." + prependClass('modal') + " {\n        display: flex;\n        flex-direction: column;\n        overflow: hidden;\n        background-repeat: no-repeat;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: space-between;\n        box-shadow: var(--text-shadow);\n        height: " + scaleBg(0.7).height + "px;\n        width: " + scaleBg(0.7).width + "px;\n      }\n\n      ." + prependClass('gotham-bold') + " {\n        font-family: 'Gotham Bold';\n      }\n\n      ." + prependClass('text-center') + " {\n        text-align: center;\n      }\n\n      ." + prependClass('main-text') + " {\n        line-height: 1.2;\n        font-family: 'Gotham Bold';\n        font-weight: 500;\n        font-style: normal;\n        text-transform: uppercase;\n        text-align: center;\n        margin-left: auto;\n        margin-right: auto;\n        margin-top: 0;\n        margin-bottom: -1.5rem;\n        font-size: 4.5rem;\n      }\n\n      ." + prependClass('text-container') + " {\n        display: grid;\n        place-content: center;\n        flex: 1;\n      }\n\n      ." + prependClass('sub-text') + " {\n        line-height: 1;\n        margin: auto;\n        font-weight: 600;\n        font-family: 'Gotham Bold';\n        color: " + secondaryColor + ";\n        letter-spacing: 2pt;\n        display: inline-block;\n        text-align: center;\n        font-size: 2.4rem;\n      }\n\n      ." + prependClass('cta') + " {\n        line-height: 1.2;\n        font-family: 'Gotham Bold';\n        cursor: pointer;\n        background-color: " + callToActionColor + ";\n        border-radius: 2px;\n        display: block;\n        color: white;\n        text-align: center;\n        text-transform: uppercase;\n        margin: 0 auto;\n        text-decoration: none;\n        box-shadow: -2px 2px 8px black;\n        padding: 1.2rem 1.2rem 0.2rem 1.2rem;  \n        font-size: 1.3rem;\n      }\n\n      ." + prependClass('cta:hover') + " {\n        transition: all 0.3s;\n        filter: brightness(0.95);\n      }\n\n      ." + prependClass('close-button') + " {\n        position: absolute;\n        top: 0px;\n        right: 0px;\n      }\n      ." + prependClass('close-button') + ":hover {\n        transition: all 0.3s;\n        filter: brightness(0.95);\n      }\n      \n\n      ." + prependClass('image-container') + " {\n        height: 100%;\n        display: flex;\n        flex-direction: column;\n        justify-content: space-between;\n        width: 100%;\n        padding: 4rem 1.5rem 2rem 1.5rem;\n      }\n\n      ." + prependClass('text-shadow') + " {\n        text-shadow: var(--text-shadow);\n      }\n\n      ." + prependClass('box-shadow') + " {\n        box-shadow: var(--text-shadow);\n      }\n      \n      @media screen and (max-width: 550px) {\n        ." + prependClass('modal') + " {\n          height: " + scaleBg(0.4).height + "px;\n          width: " + scaleBg(0.4).width + "px;\n        }\n        ." + prependClass('main-text') + "{\n          font-size: 2.5rem;\n          margin-bottom: -0.6rem;\n        }\n        ." + prependClass('sub-text') + "{\n          font-size: 1.9rem;\n          letter-spacing: 1.2pt;\n\n        }\n        ." + prependClass('cta') + "{\n          padding: 0.8rem 0.8rem 0rem 0.8rem;  \n          font-size: 0.8rem;\n        }\n        ." + prependClass('image-container') + " {\n          padding: 2rem 1.5rem 1rem 1.5rem;\n        }\n      }\n    ";
    var styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(cssToApply));
    document.head.appendChild(styles);
    setTimeout(function () {
      setStylesLoaded(true);
    }, 500);
    return function () {
      document.head.removeChild(styles);
    };
  }, []);
  var textColorByRoute = React__default.useMemo(function () {
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
        WebkitTextStroke: "2px " + mainGrey
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
      background: "url(" + (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL) + ")",
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
var StonehouseModal = function StonehouseModal(props) {
  var trigger = props.trigger;
  var isFullyClickable = getIsModalFullyClickable({
    trigger: trigger
  });
  if (!isFullyClickable) {
    return React__default.createElement(StonehouseCustomModal, Object.assign({}, props));
  }
  return React__default.createElement(FullyClickableModal, Object.assign({}, props));
};

var Modal = function Modal(_ref) {
  var trigger = _ref.trigger;
  var _useCollector = useCollector(),
    removeActiveTrigger = _useCollector.removeActiveTrigger;
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  var _useState = React.useState(true),
    open = _useState[0],
    setOpen = _useState[1];
  var _useState2 = React.useState(null),
    invocationTimeStamp = _useState2[0],
    setInvocationTimeStamp = _useState2[1];
  var _useCollectorMutation = useCollectorMutation(),
    collect = _useCollectorMutation.mutate;
  var brand = useBrand();
  var _useSeenMutation = useSeenMutation(),
    runSeen = _useSeenMutation.mutate,
    isSuccess = _useSeenMutation.isSuccess,
    isLoading = _useSeenMutation.isLoading;
  React.useEffect(function () {
    if (!open) return;
    if (invocationTimeStamp) return;
    if (isSuccess) return;
    if (isLoading) return;
    var tId = setTimeout(function () {
      runSeen(trigger);
      if (!invocationTimeStamp) {
        setInvocationTimeStamp(new Date().toISOString());
      }
    }, 500);
    return function () {
      clearTimeout(tId);
    };
  }, [open, isSuccess, isLoading]);
  if (!open) {
    return null;
  }
  var handleCloseModal = function handleCloseModal(options) {
    removeActiveTrigger(trigger.id);
    setOpen(false);
    if (options !== null && options !== void 0 && options.skipTrackingEvent) return;
    trackEvent('user_closed_trigger', trigger);
  };
  var handleClickCallToAction = function handleClickCallToAction(e) {
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
  var modalProps = {
    trigger: trigger,
    handleClickCallToAction: handleClickCallToAction,
    handleCloseModal: handleCloseModal
  };
  switch (brand) {
    case 'Ember':
      {
        var image = reactDeviceDetect.isMobile ? 'https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-booknow-m.jpg' : 'https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-booknow.jpg';
        if (window.location.href.includes('nationalsearch')) image = reactDeviceDetect.isMobile ? "https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-findoutmore-m.jpg" : "https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-findoutmore.jpg";
        return React__default.createElement(StandardModal, Object.assign({}, modalProps, {
          trigger: _extends({}, trigger, {
            data: _extends({}, trigger.data, {
              backgroundURL: image
            })
          })
        }));
      }
    case 'Sizzling':
      {
        var _image = reactDeviceDetect.isMobile ? "https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-booknow-m.jpg" : "https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-booknow.jpg";
        if (window.location.href.includes('signup')) _image = reactDeviceDetect.isMobile ? "https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-findoutmore-m.jpg" : "https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-findoutmore.jpg";
        return React__default.createElement(StandardModal, Object.assign({}, modalProps, {
          trigger: _extends({}, trigger, {
            data: _extends({}, trigger.data, {
              backgroundURL: _image
            })
          })
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
var TriggerModal = function TriggerModal(_ref2) {
  var trigger = _ref2.trigger;
  return ReactDOM.createPortal(React__default.createElement(Modal, {
    trigger: trigger
  }), document.body);
};

var baseUrl = 'https://bookings-bff.starship-staging.com';
var makeFullUrl = function makeFullUrl(resource, params) {
  if (params === void 0) {
    params = {};
  }
  if (resource.startsWith('/')) {
    resource = resource.substring(1);
  }
  var fullUri = baseUrl + "/" + resource;
  if (Object.keys(params).length === 0) {
    return fullUri;
  }
  return fullUri + "?" + new URLSearchParams(params).toString();
};
var Button = function Button(_ref) {
  var children = _ref.children,
    className = _ref.className,
    onClick = _ref.onClick,
    disabled = _ref.disabled,
    _ref$colour = _ref.colour,
    colour = _ref$colour === void 0 ? 'primary' : _ref$colour;
  var builtButtonClasses = "btn step-button bg-" + colour + " border-" + colour + " text-white hover:bg-" + colour + "/80 disabled:text-" + colour + "/50 disabled:border-" + colour + "/50" + (className ? ' ' + className : '');
  if (disabled) {
    builtButtonClasses += ' disabled';
  }
  return React.createElement("button", {
    disabled: disabled,
    className: builtButtonClasses,
    onClick: onClick
  }, children);
};
var Voucher = function Voucher(_ref2) {
  var details = _ref2.details;
  return React.createElement("div", null, React.createElement("h3", null, "Terms of Voucher"), React.createElement("p", {
    className: 'text-sm'
  }, details.termsAndConditions));
};
var TriggerInverse = function TriggerInverse(_ref3) {
  var onSubmit = function onSubmit(data) {
    try {
      setState({
        busy: true
      });
      try {
        if (form.campaign !== '') {
          submitVoucher(data).then(function () {
            var eventData = {
              item_name: landingPage === null || landingPage === void 0 ? void 0 : landingPage.name,
              affiliation: 'Booking Flow'
            };
            console.log(eventData);
          });
        }
      } catch (e) {}
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var submitVoucher = function submitVoucher(data) {
    try {
      var reqData = _extends({}, data, {
        bookingLink: (location === null || location === void 0 ? void 0 : location.origin) + "/" + (landingPage === null || landingPage === void 0 ? void 0 : landingPage.slug)
      });
      return Promise.resolve(fetch(makeFullUrl("campaigns/" + (form === null || form === void 0 ? void 0 : form.campaign) + "/voucher?locationID=" + (landingPage === null || landingPage === void 0 ? void 0 : landingPage.identifier)), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(reqData)
      })).then(function (response) {
        response.json().then(function (responseData) {
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
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _objectDestructuringEmpty(_ref3);
  var landingPage = {};
  var form = {};
  var location = {};
  var _React$useState = React.useState(true),
    open = _React$useState[0],
    setOpen = _React$useState[1];
  if (!open) {
    return null;
  }
  var _useForm = reactHookForm.useForm(),
    register = _useForm.register,
    handleSubmit = _useForm.handleSubmit,
    isSubmitting = _useForm.formState.isSubmitting;
  var initialState = {
    busy: false,
    complete: false,
    voucher: null,
    error: null,
    responseStatusCode: 0
  };
  var _React$useState2 = React.useState(initialState),
    state = _React$useState2[0],
    setState = _React$useState2[1];
  if (state.complete === true) {
    return React.createElement("div", {
      className: 'container'
    }, React.createElement("h2", null, "Voucher Sent!"), React.createElement("p", {
      className: 'text-md'
    }, "Good news! We've sent your voucher to the email provided!"), state.voucher && React.createElement("div", {
      className: 'col-12 mt-3'
    }, React.createElement(Voucher, {
      details: state.voucher
    })));
  }
  if (state.responseStatusCode === 409) {
    return React.createElement("div", {
      className: 'container'
    }, React.createElement("h2", {
      className: 'mt-3'
    }, "Uh-oh!"), React.createElement("p", null, "It seems that you already received this voucher. Please get in touch if this doesn't seem right:\xA0", React.createElement("a", {
      href: '/help',
      className: 'underline font-serif tracking-wide',
      onClick: function onClick() {
        return setOpen(false);
      }
    }, "contact us")));
  }
  return React.createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999
    }
  }, React.createElement("main", {
    className: 'flex-grow flex flex-col justify-center container relative'
  }, React.createElement("div", {
    className: 'w-full'
  }, React.createElement("div", {
    className: 'cms-content text-center md:text-left'
  }, React.createElement("h2", null, "Get Your Voucher"), React.createElement("p", null, "To receive your voucher, we just need a few details from you."), React.createElement("h3", {
    className: "bar-title border-l-4 border-solid border-" + (landingPage === null || landingPage === void 0 ? void 0 : landingPage.colour)
  }, "Contact Info"), React.createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, React.createElement("div", {
    className: 'grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2'
  }, React.createElement("div", null, React.createElement("label", {
    htmlFor: 'first_name'
  }, "First Name*"), React.createElement("input", Object.assign({}, register('firstName', {
    required: true,
    minLength: 2,
    maxLength: 30,
    validate: function validate(value) {
      return value.trim().length >= 2;
    }
  }), {
    type: 'text',
    className: 'form-input',
    id: 'firstName'
  }))), React.createElement("div", null, React.createElement("label", {
    htmlFor: 'last_name'
  }, "Last Name*"), React.createElement("input", Object.assign({}, register('lastName', {
    required: true,
    minLength: 2,
    maxLength: 30,
    validate: function validate(value) {
      return value.trim().length >= 2;
    }
  }), {
    type: 'text',
    className: 'form-input',
    id: 'lastName'
  }))), React.createElement("div", null, React.createElement("label", {
    htmlFor: 'email'
  }, "Email*"), React.createElement("input", Object.assign({}, register('emailAddress', {
    required: true
  }), {
    type: 'email',
    className: 'form-input',
    id: 'email'
  })))), React.createElement("div", null, React.createElement("p", null, "* Required Field")), React.createElement("div", {
    className: 'flex gap-x-6 gap-y-2 items-center flex-wrap justify-center lg:justify-start'
  }, React.createElement("div", {
    className: 'form-check'
  }, React.createElement("input", Object.assign({
    type: 'checkbox'
  }, register('terms', {
    required: true
  }), {
    className: 'form-check-input',
    id: 'terms'
  })), ' ', React.createElement("label", {
    htmlFor: 'terms',
    className: 'form-check-label'
  }, "I confirm that I have read & agreed with the", ' ', React.createElement("a", {
    href: landingPage === null || landingPage === void 0 ? void 0 : landingPage.privacyPolicy,
    target: '_blank',
    rel: 'noreferrer'
  }, "Privacy Policy"), "*")), React.createElement(Button, {
    className: 'btn mt-2 md:mt-0',
    type: 'submit',
    colour: landingPage === null || landingPage === void 0 ? void 0 : landingPage.colour,
    disabled: state.busy || isSubmitting
  }, isSubmitting || state.busy ? 'Sending Voucher...' : 'Get My Voucher')), state.error && state.responseStatusCode !== 409 && React.createElement("div", {
    className: "alert mt-5 bg-" + (landingPage === null || landingPage === void 0 ? void 0 : landingPage.colour) + "/20"
  }, "There was a problem sending your voucher. Please check your details and try again."))))));
};

var Youtube = function Youtube(_ref) {
  var _trigger$brand, _trigger$brand2, _trigger$brand3, _trigger$brand4, _trigger$data;
  var trigger = _ref.trigger;
  var _useState = React.useState(true),
    open = _useState[0],
    setOpen = _useState[1];
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
    onClick: function onClick() {
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
  }, "\xD7"), React__default.createElement("iframe", {
    src: trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.url,
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    style: {
      width: '500px',
      height: '260px',
      marginTop: '1rem'
    }
  }))));
};
var TriggerYoutube = function TriggerYoutube(_ref2) {
  var trigger = _ref2.trigger;
  return ReactDOM.createPortal(React__default.createElement(Youtube, {
    trigger: trigger
  }), document.body);
};

var clientHandlers = [{
  id: 'modal_v1',
  behaviour: 'BEHAVIOUR_MODAL',
  multipleOfSameBehaviourSupported: false,
  invoke: function invoke(trigger) {
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
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerYoutube, {
      key: trigger.id,
      trigger: trigger
    });
  }
}, {
  id: 'inverse_v1',
  behaviour: 'BEHAVIOUR_INVERSE_FLOW',
  multipleOfSameBehaviourSupported: false,
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerInverse, {
      key: trigger.id,
      trigger: trigger
    });
  }
}, {
  id: 'banner_v1',
  behaviour: 'BEHAVIOUR_BANNER',
  multipleOfSameBehaviourSupported: true,
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerBanner, {
      key: trigger.id,
      trigger: trigger
    });
  }
}];

var createHandlersSlice = function createHandlersSlice(set, get) {
  return {
    handlers: clientHandlers,
    addHandlers: function addHandlers(handlers) {
      set({
        handlers: [].concat(get().handlers, handlers)
      });
    }
  };
};

var noDebugNoLogging = {
  log: function log() {},
  warn: function warn() {},
  error: function error() {},
  info: function info() {}
};
var createLoggingSlice = function createLoggingSlice(_set, _get) {
  return {
    logging: noDebugNoLogging
  };
};

var createMutualSlice = function createMutualSlice(set, get) {
  return {
    set: set,
    get: get,
    difiProps: defaultFingerprintState
  };
};
var defaultFingerprintState = {
  appId: '',
  booted: false,
  consent: false,
  exitIntentTriggers: true,
  idleTriggers: true,
  pageLoadTriggers: true,
  initialDelay: 0,
  debug: false,
  defaultHandlers: [],
  consentCallback: function consentCallback() {
    return false;
  }
};

var createPagetriggersSlice = function createPagetriggersSlice(set, get) {
  return {
    pageTriggers: [],
    displayedTriggersIds: [],
    session: {},
    setDisplayedTriggers: function setDisplayedTriggers(triggers) {
      set(function () {
        return {
          displayedTriggersIds: triggers
        };
      });
    },
    appendTrigger: function appendTrigger(invokableTrigger) {
      set(function (prev) {
        if (prev.displayedTriggersIds.includes(invokableTrigger.id)) return prev;
        return {
          displayedTriggersIds: [].concat(prev.displayedTriggersIds, [invokableTrigger.id])
        };
      });
    },
    setPageTriggers: function setPageTriggers(triggers) {
      var displayedTriggers = get().displayedTriggersIds;
      set(function (prev) {
        var nonDismissed = prev.pageTriggers.filter(function (tr) {
          return displayedTriggers.includes(tr.id);
        });
        return {
          pageTriggers: uniqueBy([].concat(triggers || [], nonDismissed), 'id')
        };
      });
    },
    removePageTrigger: function removePageTrigger(id) {
      set(function (prev) {
        return {
          pageTriggers: prev.pageTriggers.filter(function (trigger) {
            return trigger.id !== id;
          })
        };
      });
    }
  };
};

var useDifiStore = zustand.create(function () {
  return _extends({}, createPagetriggersSlice.apply(void 0, arguments), createConfigSlice.apply(void 0, arguments), createMutualSlice.apply(void 0, arguments), createLoggingSlice.apply(void 0, arguments), createHandlersSlice.apply(void 0, arguments));
});
var useStore = function useStore() {
  return useDifiStore(function (s) {
    return s;
  });
};

var collinBrandsPathConversionMap = {
  Stonehouse: '/tablebooking/enquiry-form-completed',
  'All Bar One': '/bookings/dmnc-complete',
  Sizzling: '/tablebooking/enquiry-form-completed',
  Ember: '/tablebooking/enquiry-form-completed'
};
function useCollinsBookingComplete() {
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent,
    initiated = _useMixpanel.state.initiated;
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var brand = useBrand();
  var checkCollinsBookingComplete = React__default.useCallback(function () {
    log('useCollinsBookingComplete: checking for Collins booking complete');
    if (!initiated) {
      log('useCollinsBookingComplete, mixpanel not initiated');
      return;
    }
    if (!brand) {
      log('useCollinsBookingComplete, no brand');
      return;
    }
    var conversionPathForBrand = collinBrandsPathConversionMap[brand];
    if (!conversionPathForBrand) {
      log('useCollinsBookingComplete: no path for brand variable');
      return;
    }
    var isConversionPath = window.location.pathname.toLowerCase().includes(conversionPathForBrand.toLowerCase());
    if (!isConversionPath) {
      log('useCollinsBookingComplete: not a conversion path');
      return;
    }
    log("useCollinsBookingComplete: Collins booking complete based on path " + conversionPathForBrand + " and brand " + brand);
    trackEvent('booking_complete', {});
  }, [trackEvent, log, brand, initiated]);
  return {
    checkCollinsBookingComplete: checkCollinsBookingComplete
  };
}

var getRecursivelyPotentialButton = function getRecursivelyPotentialButton(el) {
  var _el$nodeName;
  if (!el) return null;
  if (((_el$nodeName = el.nodeName) === null || _el$nodeName === void 0 ? void 0 : _el$nodeName.toLowerCase()) === 'button') return el;
  if (el.parentElement) return getRecursivelyPotentialButton(el.parentElement);
  return null;
};
function useButtonCollector() {
  var _useCollectorMutation = useCollectorMutation(),
    collect = _useCollectorMutation.mutateAsync;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor;
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  React.useEffect(function () {
    if (isUndefined('document')) return;
    if (!visitor.id) return;
    var buttonClickListener = function buttonClickListener(e) {
      if (!e.target) return;
      var potentialButton = getRecursivelyPotentialButton(e.target);
      if (!potentialButton) return;
      var button = potentialButton;
      if (button.type === 'submit') return;
      log('useButtonCollector: button clicked', {
        button: button
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
    return function () {
      document.removeEventListener('click', buttonClickListener);
    };
  }, [visitor]);
}

var getIsVisible = function getIsVisible(selector) {
  var element = document.querySelector(selector);
  if (!element) return false;
  if (window.getComputedStyle(element).visibility === 'hidden') return false;
  if (window.getComputedStyle(element).display === 'none') return false;
  if (window.getComputedStyle(element).opacity === '0') return false;
  return true;
};

var validateSignalChain = function validateSignalChain(signals) {
  var signalPattern = signals.map(function (signal) {
    if (signal.op === 'IsOnPath') {
      var _signal$parameters = signal.parameters,
        operator = _signal$parameters[0],
        route = _signal$parameters[1];
      return getFuncByOperator(operator, route)(window.location.pathname);
    }
    if (signal.op === 'CanSeeElementOnPage') {
      var _signal$parameters2 = signal.parameters,
        itemQuerySelector = _signal$parameters2[0],
        _operator = _signal$parameters2[1],
        _route = _signal$parameters2[2];
      var isSignalOnCorrectRoute = getFuncByOperator(_operator, _route)(window.location.pathname);
      if (!isSignalOnCorrectRoute) return false;
      var isVisible = getIsVisible(itemQuerySelector);
      return isVisible;
    }
    if (signal.op === 'IsOnDomain') {
      return window.location.hostname === signal.parameters[0];
    }
    return false;
  });
  return signalPattern.every(Boolean);
};

var getFuncByOperator = function getFuncByOperator(operator, compareWith) {
  switch (operator) {
    case 'starts_with':
      return function (comparison) {
        return comparison.toLowerCase().startsWith(compareWith.toLowerCase());
      };
    case 'contains':
      return function (comparison) {
        return comparison.toLowerCase().includes(compareWith.toLowerCase());
      };
    case 'ends_with':
      return function (comparison) {
        return comparison.toLowerCase().endsWith(compareWith.toLowerCase());
      };
    case 'eq':
      return function (comparison) {
        return comparison.toLowerCase() === compareWith.toLowerCase();
      };
    default:
      return function () {
        console.error('getOperator: unknown operator', operator);
        return false;
      };
  }
};
var scanInterval = 500;
var useConversions = function useConversions() {
  var _useState = React.useState([]),
    conversions = _useState[0],
    setConversions = _useState[1];
  var _useCollectorMutation = useCollectorMutation(),
    collect = _useCollectorMutation.mutate;
  var removeById = React__default.useCallback(function (id) {
    setConversions(function (prev) {
      if (!(prev !== null && prev !== void 0 && prev.length)) return prev;
      return prev.filter(function (conversion) {
        return conversion.identifier !== id;
      });
    });
  }, [setConversions]);
  var scan = React__default.useCallback(function () {
    conversions.forEach(function (conversion) {
      var hasHappened = validateSignalChain(conversion.signals);
      if (!hasHappened) return;
      collect({
        conversion: {
          id: conversion.identifier
        }
      });
      removeById(conversion.identifier);
    });
  }, [collect, conversions, removeById]);
  React.useEffect(function () {
    if (!(conversions !== null && conversions !== void 0 && conversions.length)) return;
    var intId = setInterval(scan, scanInterval);
    return function () {
      return clearInterval(intId);
    };
  }, [scan]);
  return {
    conversions: conversions,
    setConversions: setConversions
  };
};

var useExitIntentDelay = function useExitIntentDelay(delay) {
  if (delay === void 0) {
    delay = 0;
  }
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var _useState = React.useState(false),
    hasDelayPassed = _useState[0],
    setHasDelayPassed = _useState[1];
  React.useEffect(function () {
    log("Exit intents are suspended because of initiation delay of " + delay + "ms");
    setTimeout(function () {
      setHasDelayPassed(true);
      log('Exit intents can be issued again.');
    }, delay);
  }, [delay]);
  return {
    hasDelayPassed: hasDelayPassed
  };
};

function useFormCollector() {
  var _useCollectorMutation = useCollectorMutation(),
    collect = _useCollectorMutation.mutateAsync;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor;
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  React.useEffect(function () {
    if (isUndefined('document')) return;
    if (!visitor.id) return;
    var formSubmitListener = function formSubmitListener(e) {
      var _e$target$nodeName, _form$getAttribute;
      if (((_e$target$nodeName = e.target.nodeName) === null || _e$target$nodeName === void 0 ? void 0 : _e$target$nodeName.toLowerCase()) !== 'form') return;
      var form = e === null || e === void 0 ? void 0 : e.target;
      if ((_form$getAttribute = form.getAttribute('id')) !== null && _form$getAttribute !== void 0 && _form$getAttribute.includes(cnmFormPrefix)) {
        log('Skipping form collection since this is a C&M form');
        return;
      }
      var data = getFormEntries(form, {
        bannedFieldPartialNames: [],
        bannedTypes: []
      });
      log('useFormCollector: form submitted', {
        data: data
      });
      trackEvent('form_submitted', {
        id: form.id,
        name: form.name
      });
      collect({
        form: {
          data: data
        }
      });
    };
    document.removeEventListener('submit', formSubmitListener);
    document.addEventListener('submit', formSubmitListener);
    return function () {
      document.removeEventListener('submit', formSubmitListener);
    };
  }, [visitor]);
}

var interval = 250;
var useIncompleteTriggers = function useIncompleteTriggers() {
  var _useState = React.useState([]),
    incompleteTriggers = _useState[0],
    setIncompleteTriggers = _useState[1];
  var _useState2 = React.useState([]),
    visibleTriggers = _useState2[0],
    setVisibleTriggers = _useState2[1];
  var scan = React__default.useCallback(function () {
    var validTriggers = incompleteTriggers.filter(function (trigger) {
      var shouldTrigger = validateSignalChain(trigger.signals);
      if (!shouldTrigger) return false;
      return true;
    });
    setVisibleTriggers(function (prev) {
      if (!validTriggers.length) return prev;
      return validTriggers;
    });
  }, [setVisibleTriggers, incompleteTriggers]);
  React.useEffect(function () {
    if (!incompleteTriggers.length) return;
    var intId = setInterval(scan, interval);
    return function () {
      clearInterval(intId);
    };
  }, [incompleteTriggers, getIsVisible, setVisibleTriggers]);
  return {
    incompleteTriggers: incompleteTriggers,
    setIncompleteTriggers: setIncompleteTriggers,
    setVisibleTriggers: setVisibleTriggers,
    visibleTriggers: visibleTriggers
  };
};

var selectorRateMs = 100;
function useTrackIntentlyModal(_ref) {
  var intently = _ref.intently;
  var _useState = React.useState(false),
    isVisible = _useState[0],
    setIsVisible = _useState[1];
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent,
    initiated = _useMixpanel.state.initiated;
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  var brand = useBrand();
  React.useEffect(function () {
    if (!initiated) return;
    if (!intently) return;
    var id = setInterval(function () {
      var intentlyOuterContainer = document.querySelector('smc-overlay-outer');
      if (!intentlyOuterContainer) {
        return;
      }
      var isIntentlyOuterVisible = window.getComputedStyle(intentlyOuterContainer).display === 'block';
      if (!isIntentlyOuterVisible) {
        return;
      }
      var intentlyInnerOverlay = document.querySelector('smc-overlay-inner');
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
        brand: brand
      });
      clearInterval(id);
    }, selectorRateMs);
    return function () {
      clearInterval(id);
    };
  }, [intently, log, setIsVisible, trackEvent, initiated, brand]);
  var getHandleTrackAction = function getHandleTrackAction(action) {
    return function () {
      log("useTrackIntentlyModal: user clicked " + action + " button");
      trackEvent("user_clicked_" + action + "_button", {});
    };
  };
  React.useEffect(function () {
    if (!isVisible) return;
    var closeBtn = document.querySelector('[data-close-type="x_close"]');
    var exitHandler = getHandleTrackAction('exit');
    var ctaBtn = document.querySelector('smc-input-group > span');
    var ctaHandler = getHandleTrackAction('CTA');
    if (closeBtn) closeBtn.addEventListener('click', exitHandler);else error('useTrackIntentlyModal: Could not locate close button, skipping tracking performance.');
    if (ctaBtn) ctaBtn.addEventListener('click', ctaHandler);else error('useTrackIntentlyModal: Could not locate CTA button, skipping tracking performance.');
    return function () {
      ctaBtn === null || ctaBtn === void 0 ? void 0 : ctaBtn.removeEventListener('click', ctaHandler);
      closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.removeEventListener('click', exitHandler);
    };
  }, [error, getHandleTrackAction, isVisible]);
  return {
    isVisible: isVisible,
    setIsVisible: setIsVisible
  };
}
var brandsThatSupportIntentlyRemoval = ['Browns'];
var useRemoveIntently = function useRemoveIntently(_ref2) {
  var intently = _ref2.intently;
  var _useLogging2 = useLogging(),
    log = _useLogging2.log;
  var brand = useBrand();
  React.useEffect(function () {
    if (intently) return;
    if (brand && !brandsThatSupportIntentlyRemoval.includes(brand)) {
      log("useRemoveIntently: Intently is " + intently + ", but skipping overlay removal for brand", {
        brand: brand
      });
      return;
    }
    log('useRemoveIntently: removing intently overlay');
    var runningInterval = setInterval(function () {
      var locatedIntentlyScript = document.querySelectorAll('div[id^=smc-v5-overlay-]');
      Array.prototype.forEach.call(locatedIntentlyScript, function (node) {
        node.parentNode.removeChild(node);
        log('useRemoveIntently: successfully removed intently overlay');
        clearInterval(runningInterval);
      });
    }, selectorRateMs);
    return function () {
      clearInterval(runningInterval);
    };
  }, [intently, brand, log]);
};
function useIntently() {
  var _useState2 = React.useState(true),
    intently = _useState2[0],
    setIntently = _useState2[1];
  useRemoveIntently({
    intently: intently
  });
  useTrackIntentlyModal({
    intently: intently
  });
  return {
    setIntently: setIntently,
    intently: intently
  };
}

var reattemptIntervalMs = 500;
var useRunOnPathChange = function useRunOnPathChange(func, config) {
  var _useState = React.useState(''),
    lastCollectedHref = _useState[0],
    setLastCollectedHref = _useState[1];
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var run = React__default.useCallback(function () {
    if (config !== null && config !== void 0 && config.skip) return;
    if (!location.href) return;
    if (location.href === lastCollectedHref) return;
    log('useRunOnPathChange: running' + (config === null || config === void 0 ? void 0 : config.name));
    setLastCollectedHref(location.href);
    func();
  }, [func, config, lastCollectedHref]);
  React.useEffect(function () {
    log("useRunOnPathChange: running for every path change with " + reattemptIntervalMs + " MS");
    var iId = setInterval(run, reattemptIntervalMs);
    return function () {
      return clearInterval(iId);
    };
  }, [run]);
};

function useTriggerDelay() {
  var _useState = React.useState(null),
    lastTriggerTimeStamp = _useState[0],
    setLastTriggerTimeStamp = _useState[1];
  var triggerConfig = useTriggerConfig();
  var cooldownMs = triggerConfig.triggerCooldownSecs * 1000;
  var idleDelay = triggerConfig.userIdleThresholdSecs * 1000;
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var startCooldown = React__default.useCallback(function () {
    var currentTimeStamp = Number(new Date());
    setLastTriggerTimeStamp(currentTimeStamp);
  }, [setLastTriggerTimeStamp]);
  var getRemainingCooldownMs = React__default.useCallback(function () {
    if (!lastTriggerTimeStamp) return 0;
    var currentTime = Number(new Date());
    var remainingMS = lastTriggerTimeStamp + cooldownMs - currentTime;
    if (remainingMS < 0) return 0;
    return remainingMS;
  }, [lastTriggerTimeStamp, cooldownMs]);
  var canNextTriggerOccur = React__default.useCallback(function () {
    return getRemainingCooldownMs() === 0;
  }, [getRemainingCooldownMs]);
  var getIdleStatusDelay = React__default.useCallback(function () {
    var cooldownDelay = getRemainingCooldownMs();
    var delayAdjustedForCooldown = idleDelay + cooldownDelay;
    log("Setting idle delay at " + delayAdjustedForCooldown + "ms (cooldown " + cooldownDelay + "ms + idleDelay " + idleDelay + "ms)");
    return delayAdjustedForCooldown;
  }, [idleDelay, getRemainingCooldownMs, log]);
  return {
    startCooldown: startCooldown,
    canNextTriggerOccur: canNextTriggerOccur,
    getRemainingCooldownMs: getRemainingCooldownMs,
    getIdleStatusDelay: getIdleStatusDelay
  };
}

var getVisitorId = function getVisitorId() {
  if (typeof window === 'undefined') return null;
  var urlParams = new URLSearchParams(window.location.search);
  var vid = urlParams.get('v_id');
  return vid;
};
var hasVisitorIDInURL = function hasVisitorIDInURL() {
  return getVisitorId() !== null;
};

function CollectorProvider(_ref) {
  var children = _ref.children,
    _ref$handlers = _ref.handlers,
    handlers = _ref$handlers === void 0 ? [] : _ref$handlers;
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  var _useFingerprint = useFingerprint$1(),
    initialDelay = _useFingerprint.initialDelay,
    exitIntentTriggers = _useFingerprint.exitIntentTriggers,
    idleTriggers = _useFingerprint.idleTriggers,
    pageLoadTriggers = _useFingerprint.pageLoadTriggers,
    booted = _useFingerprint.booted;
  var _useStore = useStore(),
    config = _useStore.config;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor,
    setVisitor = _useVisitor.setVisitor;
  var _useTriggerDelay = useTriggerDelay(),
    canNextTriggerOccur = _useTriggerDelay.canNextTriggerOccur,
    startCooldown = _useTriggerDelay.startCooldown,
    getRemainingCooldownMs = _useTriggerDelay.getRemainingCooldownMs,
    getIdleStatusDelay = _useTriggerDelay.getIdleStatusDelay;
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent,
    mixpanelBooted = _useMixpanel.state.initiated;
  var _useCollectorMutation = useCollectorMutation(),
    collect = _useCollectorMutation.mutateAsync;
  var _useCollinsBookingCom = useCollinsBookingComplete(),
    checkCollinsBookingComplete = _useCollinsBookingCom.checkCollinsBookingComplete;
  var _useExitIntent = useExitIntent.useExitIntent({
      cookie: {
        key: '_cm_exit',
        daysToExpire: 0
      }
    }),
    registerHandler = _useExitIntent.registerHandler,
    reRegisterExitIntent = _useExitIntent.resetState;
  var _useState = React.useState(getIdleStatusDelay()),
    idleTimeout = _useState[0],
    setIdleTimeout = _useState[1];
  var _useDifiStore = useDifiStore(function (e) {
      return e;
    }),
    removePageTrigger = _useDifiStore.removePageTrigger,
    pageTriggers = _useDifiStore.pageTriggers,
    displayedTriggersIds = _useDifiStore.displayedTriggersIds,
    setPageTriggers = _useDifiStore.setPageTriggers,
    setDisplayedTriggers = _useDifiStore.setDisplayedTriggers,
    set = _useDifiStore.set;
  var _useIntently = useIntently(),
    setIntently = _useIntently.setIntently;
  var _useState2 = React.useState(new Map()),
    foundWatchers = _useState2[0],
    setFoundWatchers = _useState2[1];
  var _useConversions = useConversions(),
    setConversions = _useConversions.setConversions;
  var brand = useBrand();
  var _useIncompleteTrigger = useIncompleteTriggers(),
    setIncompleteTriggers = _useIncompleteTrigger.setIncompleteTriggers,
    setVisibleTriggers = _useIncompleteTrigger.setVisibleTriggers,
    visibleIncompleteTriggers = _useIncompleteTrigger.visibleTriggers;
  var combinedTriggers = React__default.useMemo(function () {
    var _combinedTriggers = [].concat(pageTriggers, visibleIncompleteTriggers);
    return _combinedTriggers;
  }, [pageTriggers, visibleIncompleteTriggers]);
  var getIsBehaviourVisible = React__default.useCallback(function (type) {
    if (displayedTriggersIds.length === 0) return false;
    if (displayedTriggersIds.find(function (triggerId) {
      var _combinedTriggers$fin;
      return ((_combinedTriggers$fin = combinedTriggers.find(function (trigger) {
        return trigger.id === triggerId;
      })) === null || _combinedTriggers$fin === void 0 ? void 0 : _combinedTriggers$fin.behaviour) === type;
    })) return true;
    return false;
  }, [displayedTriggersIds, combinedTriggers]);
  var _useDifiStore2 = useDifiStore(function (s) {
      return s;
    }),
    appendTrigger = _useDifiStore2.appendTrigger;
  var setDisplayedTriggerByInvocation = React__default.useCallback(function (invocation, shouldAllowMultipleSimultaneous) {
    if (shouldAllowMultipleSimultaneous === void 0) {
      shouldAllowMultipleSimultaneous = false;
    }
    var invokableTriggers = combinedTriggers.filter(function (trigger) {
      return trigger.invocation === invocation;
    });
    invokableTriggers.forEach(function (invokableTrigger) {
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
  }, [combinedTriggers, getIsBehaviourVisible, log, appendTrigger]);
  React.useEffect(function () {
    if (!(visibleIncompleteTriggers !== null && visibleIncompleteTriggers !== void 0 && visibleIncompleteTriggers.length)) return;
    setDisplayedTriggerByInvocation('INVOCATION_ELEMENT_VISIBLE');
  }, [visibleIncompleteTriggers, setDisplayedTriggerByInvocation]);
  var getHandlerForTrigger = React__default.useCallback(function (_trigger) {
    var potentialHandler = handlers === null || handlers === void 0 ? void 0 : handlers.find(function (handler) {
      return handler.behaviour === _trigger.behaviour;
    });
    if (!potentialHandler) return null;
    return potentialHandler;
  }, [handlers]);
  var removeActiveTrigger = React.useCallback(function (id) {
    log("CollectorProvider: removing id:" + id + " from displayedTriggersIds");
    var refreshedTriggers = displayedTriggersIds.filter(function (triggerId) {
      return triggerId !== id;
    });
    setDisplayedTriggers(refreshedTriggers);
    setIncompleteTriggers(function (prev) {
      return prev.filter(function (trigger) {
        return trigger.id !== id;
      });
    });
    setVisibleTriggers(function (prev) {
      return prev.filter(function (trigger) {
        return trigger.id !== id;
      });
    });
    removePageTrigger(id);
  }, [log, displayedTriggersIds, setDisplayedTriggers, setIncompleteTriggers, setVisibleTriggers, removePageTrigger]);
  var TriggerComponent = React__default.useCallback(function () {
    if (!displayedTriggersIds) return null;
    var activeTriggers = combinedTriggers.filter(function (trigger) {
      return displayedTriggersIds.includes(trigger.id);
    });
    if (!activeTriggers) {
      error("CollectorProvider - TriggerComponent: No trigger found for displayedTriggersIds", displayedTriggersIds);
      return null;
    }
    log('CollectorProvider - TriggerComponent: available handlers include: ', handlers);
    log('CollectorProvider - TriggerComponent: activeTriggers to match are: ', activeTriggers);
    log('CollectorProvider - TriggerComponent: attempting to show trigger', activeTriggers);
    return activeTriggers.map(function (trigger) {
      var _handler$invoke;
      var handler = getHandlerForTrigger(trigger);
      if (!handler) {
        log('CollectorProvider - TriggerComponent: No handler found for trigger', trigger);
        return null;
      }
      if (!handler.invoke) {
        log('CollectorProvider - TriggerComponent: No invoke method found for handler', handler);
        return null;
      }
      var isTriggerOfSameBehaviourAlreadyVisible = getIsBehaviourVisible(trigger.behaviour);
      if (!displayedTriggersIds.includes(trigger.id) && isTriggerOfSameBehaviourAlreadyVisible && !handler.multipleOfSameBehaviourSupported) {
        log("CollectorProvider - TriggerComponent: Behaviour " + trigger.behaviour + " (triggerId: " + trigger.id + ") is already visible and does NOT support multiple triggers. Not showing.", trigger.id);
        return null;
      }
      var potentialComponent = (_handler$invoke = handler.invoke) === null || _handler$invoke === void 0 ? void 0 : _handler$invoke.call(handler, trigger);
      if (potentialComponent && React__default.isValidElement(potentialComponent)) {
        log('CollectorProvider - TriggerComponent: Potential component for trigger is valid. Mounting');
        return potentialComponent;
      }
      log('CollectorProvider: Potential component for trigger invalid. Running as regular func.');
      return null;
    });
  }, [displayedTriggersIds, log, handlers, error, getHandlerForTrigger, getIsBehaviourVisible, combinedTriggers]);
  React.useEffect(function () {
    if (!(visibleIncompleteTriggers !== null && visibleIncompleteTriggers !== void 0 && visibleIncompleteTriggers.length)) return;
    setDisplayedTriggerByInvocation('INVOCATION_ELEMENT_VISIBLE');
  }, [setDisplayedTriggerByInvocation, visibleIncompleteTriggers]);
  var fireIdleTrigger = React.useCallback(function () {
    if (!idleTriggers) return;
    log('CollectorProvider: attempting to fire idle time trigger');
    setDisplayedTriggerByInvocation('INVOCATION_IDLE_TIME');
    startCooldown();
  }, [idleTriggers, log, setDisplayedTriggerByInvocation, startCooldown]);
  var _useExitIntentDelay = useExitIntentDelay((config === null || config === void 0 ? void 0 : config.trigger.displayTriggerAfterSecs) * 1000),
    hasDelayPassed = _useExitIntentDelay.hasDelayPassed;
  var fireExitTrigger = React__default.useCallback(function () {
    if (!hasDelayPassed) {
      log("Unable to launch exit intent, because of the exit intent delay hasn't passed yet.");
      log('Re-registering handler');
      reRegisterExitIntent();
      return;
    }
    if (!canNextTriggerOccur()) {
      log("Tried to launch EXIT trigger, but can't because of cooldown, " + getRemainingCooldownMs() + "ms remaining. \n        I will attempt again when the same signal occurs after this passes.");
      log('Re-registering handler');
      reRegisterExitIntent();
      return;
    }
    log('CollectorProvider: attempting to fire exit trigger');
    setDisplayedTriggerByInvocation('INVOCATION_EXIT_INTENT');
    startCooldown();
  }, [hasDelayPassed, canNextTriggerOccur, log, setDisplayedTriggerByInvocation, startCooldown, reRegisterExitIntent, getRemainingCooldownMs]);
  React.useEffect(function () {
    if (!exitIntentTriggers) return;
    log('CollectorProvider: attempting to register exit trigger');
    registerHandler({
      id: 'clientTrigger',
      handler: fireExitTrigger
    });
  }, [exitIntentTriggers, fireExitTrigger, log, registerHandler]);
  var fireOnLoadTriggers = React.useCallback(function () {
    if (!pageLoadTriggers) return;
    if (!(combinedTriggers !== null && combinedTriggers !== void 0 && combinedTriggers.length)) return;
    log('CollectorProvider: attempting to fire on-page-load trigger');
    setDisplayedTriggerByInvocation('INVOCATION_PAGE_LOAD', true);
  }, [pageLoadTriggers, combinedTriggers, log, setDisplayedTriggerByInvocation]);
  var collectorCallback = React__default.useCallback(function (response) {
    try {
      return Promise.resolve(response.json()).then(function (payload) {
        var _payload$identifiers;
        log('Sent collector data, retrieved:', payload);
        var retrievedUserId = (_payload$identifiers = payload.identifiers) === null || _payload$identifiers === void 0 ? void 0 : _payload$identifiers.main;
        if (retrievedUserId) {
          updateCookie(retrievedUserId);
          setVisitor({
            id: retrievedUserId
          });
        }
        set(function () {
          return {
            pageTriggers: (payload === null || payload === void 0 ? void 0 : payload.pageTriggers) || [],
            config: payload === null || payload === void 0 ? void 0 : payload.config
          };
        });
        setIdleTimeout(getIdleStatusDelay());
        setIncompleteTriggers((payload === null || payload === void 0 ? void 0 : payload.incompleteTriggers) || []);
        setConversions((payload === null || payload === void 0 ? void 0 : payload.conversions) || []);
        var cohort = payload.intently ? 'intently' : 'fingerprint';
        if (visitor.cohort !== cohort) setVisitor({
          cohort: cohort
        });
        log('CollectorProvider: collected data');
        if (!payload.intently) {
          log('CollectorProvider: user is in Fingerprint cohort');
          setIntently(false);
        } else {
          log('CollectorProvider: user is in Intently cohort');
          setIntently(true);
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }, [log, set, getIdleStatusDelay, setIncompleteTriggers, setConversions, visitor.cohort, setVisitor, pageTriggers, setIntently]);
  React.useEffect(function () {
    if (!mixpanelBooted) return;
    if (hasVisitorIDInURL()) {
      log('CollectorProvider: visitor ID in URL, collecting data');
      trackEvent('abandoned_journey_landing', {
        from_email: true
      });
    }
  }, [trackEvent, log, mixpanelBooted]);
  var collectAndApplyVisitorInfo = React__default.useCallback(function () {
    if (!visitor.id) {
      log('CollectorProvider: Not yet collecting, awaiting visitor ID');
      return;
    }
    log('CollectorProvider: collecting data');
    var hash = window.location.hash.substring(3);
    var hashParams = hash.split('&').reduce(function (result, item) {
      var parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});
    if (hashParams.id_token) {
      log('CollectorProvider: user logged in event fired');
      trackEvent('user_logged_in', {
        brand: brand
      });
      collect({
        account: {
          token: hashParams.id_token
        }
      }).then(collectorCallback)["catch"](function (err) {
        error('failed to store collected data', err);
      });
    }
    collect({
      page: getPagePayload() || undefined,
      referrer: getReferrer() || undefined
    }).then(function (response) {
      if (response.status === 204) {
        setIntently(true);
        return;
      }
      collectorCallback(response);
    })["catch"](function (err) {
      error('failed to store collected data', err);
    });
  }, [visitor.id, brand, log, collect, trackEvent, error, collectorCallback, setIntently]);
  var registerWatcher = React__default.useCallback(function (configuredSelector, configuredSearch) {
    var intervalId = setInterval(function () {
      var inputs = document.querySelectorAll(configuredSelector);
      var found = false;
      inputs.forEach(function (element) {
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
          }).then(collectorCallback)["catch"](function (err) {
            error('failed to store collected data', err);
          });
          clearInterval(intervalId);
        }
      });
    }, 500);
    return intervalId;
  }, [collect, collectorCallback, error, foundWatchers, trackEvent]);
  React.useEffect(function () {
    if (!visitor.id) return;
    var intervalIds = [registerWatcher('.stage-5', '')];
    return function () {
      intervalIds.forEach(function (intervalId) {
        return clearInterval(intervalId);
      });
    };
  }, [registerWatcher, visitor]);
  var setActiveTrigger = React__default.useCallback(function (trigger) {
    log('CollectorProvider: manually setting trigger', trigger);
    setPageTriggers([trigger]);
    setDisplayedTriggerByInvocation(trigger.invocation);
  }, [log, setDisplayedTriggerByInvocation, setPageTriggers]);
  var collectorContextVal = React__default.useMemo(function () {
    return {
      setPageTriggers: setPageTriggers,
      removeActiveTrigger: removeActiveTrigger,
      setActiveTrigger: setActiveTrigger,
      setIncompleteTriggers: setIncompleteTriggers,
      trackEvent: trackEvent,
      setConversions: setConversions
    };
  }, [setPageTriggers, removeActiveTrigger, setActiveTrigger, trackEvent, setIncompleteTriggers, setConversions]);
  React.useEffect(function () {
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
  var onPresenseChange = React__default.useCallback(function (presence) {
    log('presence changed', presence);
  }, [log]);
  return React__default.createElement(reactIdleTimer.IdleTimerProvider, {
    timeout: idleTimeout,
    onPresenceChange: onPresenseChange,
    onIdle: fireIdleTrigger
  }, React__default.createElement(CollectorContext.Provider, {
    value: collectorContextVal
  }, children, TriggerComponent()));
}
var CollectorContext = React.createContext({
  setPageTriggers: function setPageTriggers() {
    console.error('setPageTriggers not implemented correctly');
  },
  removeActiveTrigger: function removeActiveTrigger() {
    console.error('removeActiveTrigger not implemented correctly');
  },
  setIncompleteTriggers: function setIncompleteTriggers() {
    console.error('setIncompleteTriggers not implemented correctly');
  },
  setActiveTrigger: function setActiveTrigger() {
    console.error('setActiveTrigger not implemented correctly');
  },
  setConversions: function setConversions() {
    console.error('setConversions not implemented correctly');
  },
  trackEvent: function trackEvent() {
    console.error('trackEvent not implemented correctly');
  }
});

exports.CollectorContext = CollectorContext;
exports.CollectorProvider = CollectorProvider;
exports.FingerprintProvider = FingerprintProvider;
exports.onCookieChanged = onCookieChanged;
exports.useCollector = useCollector;
exports.useFingerprint = useFingerprint$1;
//# sourceMappingURL=index.js.map

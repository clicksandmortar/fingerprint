function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var icons = require('@fortawesome/free-solid-svg-icons');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var reactQuery = require('@tanstack/react-query');
var React = require('react');
var React__default = _interopDefault(React);
var reactErrorBoundary = require('react-error-boundary');
var ReactDOM = _interopDefault(require('react-dom'));
var mixpanel = _interopDefault(require('mixpanel-browser'));
var Cookies = _interopDefault(require('js-cookie'));
var psl = _interopDefault(require('psl'));
var uuid = require('uuid');
var uniqueBy = _interopDefault(require('lodash.uniqby'));
var reactIdleTimer = require('react-idle-timer');
var useExitIntent = require('use-exit-intent');
var reactDeviceDetect = require('react-device-detect');
var reactHookForm = require('react-hook-form');

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
function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure " + obj);
}

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

var useFingerprint = function useFingerprint() {
  return React.useContext(FingerprintContext);
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
function ConfigProvider(_ref) {
  var children = _ref.children,
    legacy_config = _ref.legacy_config;
  var _useState = React.useState(defaultConfig),
    config = _useState[0],
    setConfigState = _useState[1];
  var log = React__default.useCallback(function () {
    if (config.script.debugMode) {
      var _console;
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }
      (_console = console).log.apply(_console, ['[ConfigProvider]'].concat(params));
    }
  }, [config, legacy_config]);
  var setConfig = React__default.useCallback(function (updatedConfigEntries) {
    var _updatedConfigEntries;
    var argColors = updatedConfigEntries === null || updatedConfigEntries === void 0 ? void 0 : (_updatedConfigEntries = updatedConfigEntries.brand) === null || _updatedConfigEntries === void 0 ? void 0 : _updatedConfigEntries.colors;
    var shouldUpdateColors = haveBrandColorsBeenConfigured(argColors);
    if (shouldUpdateColors) log('setConfig: setting brand colors from portal config', argColors);else log('setConfig: keeping colors in state || fallback to default');
    setConfigState(function (prev) {
      return _extends({}, prev, updatedConfigEntries, {
        brand: _extends({}, prev.brand, updatedConfigEntries.brand, {
          colors: shouldUpdateColors ? _extends({}, prev.brand.colors || defaultColors, argColors || {}) : prev.brand.colors
        }),
        trigger: _extends({}, prev.trigger, objStringtoObjNum(LEGACY_merge_config(prev, legacy_config)))
      });
    });
  }, [setConfigState]);
  var value = {
    config: config,
    setConfig: setConfig
  };
  React.useEffect(function () {
    log('config in use:', config);
  }, [config]);
  return React__default.createElement(ConfigContext.Provider, {
    value: value
  }, children);
}
var ConfigContext = React.createContext({
  config: defaultConfig,
  setConfig: function setConfig() {
    console.error('ConfigContext: setConfig not implemented');
  }
});

var useConfig = function useConfig() {
  return React__default.useContext(ConfigContext);
};
var useBrand = function useBrand() {
  var configBrandName = useConfig().config.brand.name;
  if (configBrandName) return configBrandName;
  return _LEGACY_getBrand();
};
var useTriggerConfig = function useTriggerConfig() {
  return useConfig().config.trigger;
};
var useBrandColors = function useBrandColors() {
  return useConfig().config.brand.colors || defaultColors;
};

var LoggingProvider = function LoggingProvider(_ref) {
  var children = _ref.children;
  var debug = useConfig().config.script.debugMode;
  var log = function log() {
    if (debug) {
      var _console;
      (_console = console).log.apply(_console, arguments);
    }
  };
  var warn = function warn() {
    if (debug) {
      var _console2;
      (_console2 = console).warn.apply(_console2, arguments);
    }
  };
  var error = function error() {
    if (debug) {
      var _console3;
      (_console3 = console).error.apply(_console3, arguments);
    }
  };
  var info = function info() {
    if (debug) {
      var _console4;
      (_console4 = console).info.apply(_console4, arguments);
    }
  };
  React.useEffect(function () {
    if (!debug) return;
    log('LoggingProvider: In Debug Mode');
  });
  return React__default.createElement(LoggingContext.Provider, {
    value: {
      log: log,
      warn: warn,
      error: error,
      info: info
    }
  }, children);
};
var LoggingContext = React.createContext({
  log: function log() {},
  warn: function warn() {},
  error: function error() {},
  info: function info() {}
});
var useLogging = function useLogging() {
  return React.useContext(LoggingContext);
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
  var _useFingerprint = useFingerprint(),
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
  var _useFingerprint = useFingerprint(),
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
  return {
    url: window.location.href,
    path: window.location.pathname,
    title: document.title,
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

var useHostname = function useHostname() {
  var _window, _window$location;
  return ((_window = window) === null || _window === void 0 ? void 0 : (_window$location = _window.location) === null || _window$location === void 0 ? void 0 : _window$location.hostname) || '';
};

var useCollectorMutation = function useCollectorMutation() {
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  var _useFingerprint = useFingerprint(),
    appId = _useFingerprint.appId;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor,
    session = _useVisitor.session;
  var requestHost = useHostname();
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

var stringIsSubstringOf = function stringIsSubstringOf(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.toLowerCase().includes(b.toLowerCase());
};
var bannedTypes = ['password', 'submit'];
var bannedFieldPartialNames = ['expir', 'cvv', 'cvc', 'csv', 'csc', 'pin', 'pass', 'card'];
function useFormCollector() {
  var _useCollectorMutation = useCollectorMutation(),
    collect = _useCollectorMutation.mutateAsync;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor;
  var _useLogging = useLogging(),
    log = _useLogging.log;
  React.useEffect(function () {
    if (isUndefined('document')) return;
    if (!visitor.id) return;
    var formSubmitListener = function formSubmitListener(e) {
      var _e$target$nodeName;
      if (((_e$target$nodeName = e.target.nodeName) === null || _e$target$nodeName === void 0 ? void 0 : _e$target$nodeName.toLowerCase()) !== 'form') return;
      var a = e === null || e === void 0 ? void 0 : e.target;
      var elements = Array.from(a.elements).filter(function (b) {
        if (bannedTypes.includes(b === null || b === void 0 ? void 0 : b.type)) return false;
        if (bannedFieldPartialNames.find(function (partialName) {
          if (stringIsSubstringOf(b.name, partialName)) return true;
          if (stringIsSubstringOf(b.id, partialName)) return true;
          if (stringIsSubstringOf(b.placeholder, partialName)) return true;
          return false;
        })) return false;
        return true;
      });
      var data = elements.reduce(function (result, item) {
        var fieldName = item.name;
        if (!fieldName) {
          if (item.id) {
            log('useFormCollector: form field has no name, falling back to id', {
              item: item
            });
            fieldName = item.id;
          } else if (item.placeholder) {
            log('useFormCollector: form field has no name or id, falling back to placeholder', {
              item: item
            });
            fieldName = item.placeholder;
          } else {
            log('useFormCollector: form field has no name, id or placeholder, fallback to type', {
              item: item
            });
            fieldName = item.type;
          }
        }
        result[fieldName] = item.value;
        return result;
      }, {});
      log('useFormCollector: form submitted', {
        data: data
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
  var _useFingerprint = useFingerprint(),
    booted = _useFingerprint.booted,
    initialDelay = _useFingerprint.initialDelay,
    exitIntentTriggers = _useFingerprint.exitIntentTriggers,
    idleTriggers = _useFingerprint.idleTriggers,
    pageLoadTriggers = _useFingerprint.pageLoadTriggers;
  var _useConfig = useConfig(),
    setConfig = _useConfig.setConfig,
    config = _useConfig.config.trigger;
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
  var _useState2 = React.useState([]),
    pageTriggers = _useState2[0],
    setPageTriggersState = _useState2[1];
  var _useIntently = useIntently(),
    setIntently = _useIntently.setIntently;
  var _useState3 = React.useState([]),
    displayTriggers = _useState3[0],
    setDisplayedTriggers = _useState3[1];
  var _useState4 = React.useState(new Map()),
    foundWatchers = _useState4[0],
    setFoundWatchers = _useState4[1];
  var _useConversions = useConversions(),
    setConversions = _useConversions.setConversions;
  var brand = useBrand();
  var _useIncompleteTrigger = useIncompleteTriggers(),
    setIncompleteTriggers = _useIncompleteTrigger.setIncompleteTriggers,
    setVisibleTriggers = _useIncompleteTrigger.setVisibleTriggers,
    visibleIncompleteTriggers = _useIncompleteTrigger.visibleTriggers;
  var combinedTriggers = React__default.useMemo(function () {
    return [].concat(pageTriggers, visibleIncompleteTriggers);
  }, [pageTriggers, visibleIncompleteTriggers]);
  var getIsBehaviourVisible = React__default.useCallback(function (type) {
    if (displayTriggers.length === 0) return false;
    if (displayTriggers.find(function (triggerId) {
      var _combinedTriggers$fin;
      return ((_combinedTriggers$fin = combinedTriggers.find(function (trigger) {
        return trigger.id === triggerId;
      })) === null || _combinedTriggers$fin === void 0 ? void 0 : _combinedTriggers$fin.behaviour) === type;
    })) return true;
    return false;
  }, [displayTriggers, combinedTriggers]);
  var setDisplayedTriggerByInvocation = React__default.useCallback(function (invocation, shouldAllowMultipleSimultaneous) {
    if (shouldAllowMultipleSimultaneous === void 0) {
      shouldAllowMultipleSimultaneous = false;
    }
    var invokableTrigger = combinedTriggers.find(function (trigger) {
      return trigger.invocation === invocation;
    });
    if (!invokableTrigger) {
      log('CollectorProvider: Trigger not invokable ', invokableTrigger);
      return;
    }
    if (!shouldAllowMultipleSimultaneous && getIsBehaviourVisible(invokableTrigger.behaviour)) {
      log('CollectorProvider: Behaviour already visible, not showing trigger', invokableTrigger);
      return;
    }
    log('CollectorProvider: Triggering behaviour', invokableTrigger);
    setDisplayedTriggers(function (prev) {
      if (prev.includes(invokableTrigger.id)) return prev;
      return [].concat(prev, [invokableTrigger.id]);
    });
  }, [combinedTriggers, getIsBehaviourVisible, log]);
  React.useEffect(function () {
    if (!(visibleIncompleteTriggers !== null && visibleIncompleteTriggers !== void 0 && visibleIncompleteTriggers.length)) return;
    setDisplayedTriggerByInvocation('INVOCATION_ELEMENT_VISIBLE');
  }, [visibleIncompleteTriggers, setPageTriggersState, setDisplayedTriggerByInvocation]);
  var setPageTriggers = React__default.useCallback(function (triggers) {
    setPageTriggersState(function (prev) {
      var nonDismissed = prev.filter(function (tr) {
        return displayTriggers.includes(tr.id);
      });
      return uniqueBy([].concat(triggers || [], nonDismissed), 'id');
    });
  }, [setPageTriggersState, displayTriggers]);
  var getHandlerForTrigger = React__default.useCallback(function (_trigger) {
    var potentialHandler = handlers === null || handlers === void 0 ? void 0 : handlers.find(function (handler) {
      return handler.behaviour === _trigger.behaviour;
    });
    if (!potentialHandler) return null;
    return potentialHandler;
  }, [handlers]);
  var removeActiveTrigger = React.useCallback(function (id) {
    log("CollectorProvider: removing id:" + id + " from displayTriggers");
    var refreshedTriggers = displayTriggers.filter(function (triggerId) {
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
    setPageTriggersState(function (prev) {
      return prev.filter(function (trigger) {
        return trigger.id !== id;
      });
    });
  }, [displayTriggers, log, setIncompleteTriggers, setVisibleTriggers, setPageTriggersState, combinedTriggers]);
  var TriggerComponent = React__default.useCallback(function () {
    if (!displayTriggers) return null;
    var activeTriggers = combinedTriggers.filter(function (trigger) {
      return displayTriggers.includes(trigger.id);
    });
    if (!activeTriggers) {
      error("No trigger found for displayTriggers", displayTriggers);
      return null;
    }
    log('CollectorProvider: available handlers include: ', handlers);
    log('CollectorProvider: activeTriggers to match are: ', activeTriggers);
    log('CollectorProvider: attempting to show trigger', activeTriggers);
    return activeTriggers.map(function (trigger) {
      var _handler$invoke;
      var handler = getHandlerForTrigger(trigger);
      if (!handler) {
        log('No handler found for trigger', trigger);
        return null;
      }
      if (!handler.invoke) {
        log('No invoke method found for handler', handler);
        return null;
      }
      var potentialComponent = (_handler$invoke = handler.invoke) === null || _handler$invoke === void 0 ? void 0 : _handler$invoke.call(handler, trigger);
      if (potentialComponent && React__default.isValidElement(potentialComponent)) {
        log('CollectorProvider: Potential component for trigger is valid. Mounting');
        return potentialComponent;
      }
      log('CollectorProvider: Potential component for trigger invalid. Running as regular func.');
      return null;
    });
  }, [displayTriggers, log, handlers, error, getHandlerForTrigger, combinedTriggers]);
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
  var _useExitIntentDelay = useExitIntentDelay((config === null || config === void 0 ? void 0 : config.displayTriggerAfterSecs) * 1000),
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
        setIdleTimeout(getIdleStatusDelay());
        setPageTriggers(payload === null || payload === void 0 ? void 0 : payload.pageTriggers);
        setConfig(payload.config);
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
  }, [log, getIdleStatusDelay, setPageTriggers, setConfig, setIncompleteTriggers, visitor.cohort, setConversions, setVisitor, setIntently]);
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

var useCollector = function useCollector() {
  return React.useContext(CollectorContext);
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

var defualtFormatString = function defualtFormatString(val) {
  return val;
};
var getInterpolate = function getInterpolate(structure) {
  var interpolate = function interpolate(text, formatString) {
    if (formatString === void 0) {
      formatString = defualtFormatString;
    }
    var replacedText = text.replace(/\{\{\s*\.?([\w]+)\s*\}\}/g, function (match, keys) {
      var value = get_1(structure, keys);
      if (formatString) value = formatString(value);
      return value !== undefined ? value : match;
    });
    return replacedText;
  };
  return interpolate;
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
var useCountdown = function useCountdown(_ref) {
  var onZero = _ref.onZero,
    initialTimestamp = _ref.initialTimestamp,
    interpolate = _ref.interpolate;
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
    return getInterpolate(interpolate === null || interpolate === void 0 ? void 0 : interpolate.structure);
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
      return formatTimeStamp(new Date(val));
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

var useSeenMutation = function useSeenMutation() {
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  var _useFingerprint = useFingerprint(),
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

var resetPad = function resetPad() {
  document.body.style.paddingTop = 'inherit';
};
var Banner = function Banner(_ref) {
  var _trigger$data3, _trigger$data4, _trigger$data5;
  var trigger = _ref.trigger;
  var container = React.useRef(null);
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
  var handleClickCallToAction = function handleClickCallToAction(e) {
    var _trigger$data, _trigger$data2;
    e.preventDefault();
    trackEvent('user_clicked_button', trigger);
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_blank');
    setOpen(false);
    resetPad();
  };
  var handleClose = function handleClose() {
    trackEvent('user_closed_trigger', trigger);
    removeActiveTrigger(trigger.id);
    setOpen(false);
    resetPad();
  };
  var _useCountdown = useCountdown({
      onZero: handleClose,
      initialTimestamp: new Date(((_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.countdownEndTime) || ''),
      interpolate: {
        text: (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.marketingText,
        structure: trigger.data
      }
    }),
    formattedCountdown = _useCountdown.formattedCountdown;
  var interpolate = React__default.useMemo(function () {
    return getInterpolate(trigger.data || {});
  }, [trigger.data]);
  React.useEffect(function () {
    var _container$current;
    var bannerHeight = (_container$current = container.current) === null || _container$current === void 0 ? void 0 : _container$current.clientHeight;
    document.body.style.paddingTop = bannerHeight + "px";
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
var TriggerBanner = function TriggerBanner(_ref2) {
  var trigger = _ref2.trigger;
  return ReactDOM.createPortal(React__default.createElement(Banner, {
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

var getModalButtonStylesBySize = function getModalButtonStylesBySize(size) {
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
var getModalButtonFlexPosition = function getModalButtonFlexPosition(position) {
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

var defaultElementSize = 'medium';
var defaultButtonPosition = 'right';
var StandardModal = function StandardModal(_ref) {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
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
  var buttonSizeStyle = getModalButtonStylesBySize(defaultElementSize);
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
    var cssToApply = "\n    :root {\n      --text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);\n    }\n    \n    h1,\n    h2,\n    h3,\n    h4,\n    h5,\n    h6,\n    p,\n    a,\n    span {\n      line-height: 1.2;\n      font-family: Arial, Helvetica, sans-serif;\n    }\n    \n    ." + prependClass('overlay') + " {\n      position: fixed;\n      top: 0;\n      left: 0;\n      width: 100vw;\n      height: 100vh;\n      background-color: rgba(0, 0, 0, 0.5);\n      z-index: 9999;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-weight: 500;\n      font-style: normal;      \n    }\n    \n    ." + prependClass('modal') + " {\n      " + (isModalFullyClickable ? 'cursor: pointer;' : "") + "\n      height: " + height + "px;\n      width: " + width + "px;\n      display: flex;\n      flex-direction: column;\n      overflow: hidden;\n      background-repeat: no-repeat;\n      flex-direction: column;\n      align-items: center;\n      justify-content: space-between;\n      box-shadow: var(--text-shadow);\n      " + (isModalFullyClickable ? 'transition: box-shadow 0.3s ease-in-out;' : '') + "\n      " + (isModalFullyClickable ? 'cursor: pointer;' : '') + "\n    }\n    \n    ." + prependClass('modal') + ":hover {\n      " + (isModalFullyClickable ? "\n        filter: brightness(1.05);\n        box-shadow: 0.1rem 0.1rem 10px #7b7b7b;\n      " : '') + "\n    }\n    \n    ." + prependClass('text-center') + " {\n      text-align: center;\n    }\n  \n    ." + prependClass('text-container') + " {\n      flex-direction: column;\n      flex: 1;\n      text-shadow: var(--text-shadow);\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('main-text') + " {\n      font-weight: 500;\n      font-size: 4rem;\n      font-style: normal;\n      text-align: center;\n      color: " + textPrimary + ";\n      text-shadow: var(--text-shadow);\n      max-width: 400px;\n      margin-left: auto;\n      margin-right: auto;\n    }\n    \n    ." + prependClass('sub-text') + " {\n      margin: auto;\n      font-weight: 600;\n      font-size: 2.2rem;\n      color: " + textPrimary + ";\n      text-align: center;\n      text-transform: uppercase;\n    }\n    \n    ." + prependClass('cta') + " {\n      cursor: pointer;\n      background-color: " + backgroundPrimary + ";\n      border-radius: 2px;\n      display: block;\n      font-size: 1.3rem;\n      color: " + textPrimary + ";\n      text-align: center;\n      text-transform: uppercase;\n      margin: 1rem;\n      text-decoration: none;\n      box-shadow: 0.3rem 0.3rem white;\n    }\n    \n    ." + prependClass('cta:hover') + " {\n      transition: all 0.3s;\n      filter: brightness(0.95);\n    }\n    \n    ." + prependClass('close-button') + " {\n      border-radius: 100%;\n      background-color: white;\n      width: 2rem;\n      border: none;\n      height: 2rem;\n      position: absolute;\n      margin: 10px;\n      top: 0px;\n      right: 0px;\n      color: black;\n      font-size: 2rem;\n      font-weight: 300;\n      cursor: pointer;\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('close-button:hover') + " {\n      transition: all 0.3s;\n      filter: brightness(0.95);\n    }\n    \n    ." + prependClass('image-darken') + " {\n      " + (isModalFullyClickable ? '' : 'background: rgba(0, 0, 0, 0.1);') + "\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      width: 100%;\n    }\n    \n    ." + prependClass('text-shadow') + " {\n      text-shadow: var(--text-shadow);\n    }\n    \n    ." + prependClass('box-shadow') + " {\n      box-shadow: var(--text-shadow);\n    }\n    " + appendResponsiveBehaviour() + "\n    ";
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
  }, React__default.createElement("h1", {
    className: prependClass('main-text')
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.heading), React__default.createElement("p", {
    className: prependClass('sub-text')
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.paragraph)), !isModalFullyClickable && React__default.createElement("div", {
    style: _extends({
      display: 'flex'
    }, getModalButtonFlexPosition(defaultButtonPosition))
  }, React__default.createElement("div", null, React__default.createElement("a", {
    href: trigger === null || trigger === void 0 ? void 0 : (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.buttonURL,
    className: prependClass('cta'),
    onClick: handleClickCallToAction,
    style: buttonSizeStyle
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.buttonText))))));
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
    var cssToApply = "\n  \n    ." + prependClass('overlay') + " {\n      background-color: rgba(0, 0, 0, 0.7);\n      position: fixed;\n      top: 0;\n      left: 0;\n      width: 100vw;\n      height: 100vh;\n      z-index: 9999;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-weight: 500;\n      font-style: normal;\n    }\n    \n    ." + prependClass('modal') + " {\n      height: " + height + "px;\n      width: " + width + "px;\n      display: flex;\n      flex-direction: column;\n      overflow: hidden;\n      background-repeat: no-repeat;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: space-between;\n      box-shadow: var(--text-shadow);\n      " + ( 'transition: all 0.3s ease-in-out;' ) + "\n      " + ( 'cursor: pointer;' ) + "\n    }\n\n    " + ( "." + prependClass('modal') + ":hover {\n      filter: brightness(1.05);\n      box-shadow: 0.1rem 0.1rem 10px #7b7b7b;\n    }" ) + "\n    \n    \n    ." + prependClass('text-center') + " {\n      text-align: center;\n    }\n  \n    ." + prependClass('text-container') + " {\n      flex-direction: column;\n      flex: 1;\n      text-shadow: var(--text-shadow);\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('main-text') + " {\n      font-weight: 500;\n      font-size: 2rem;\n      font-style: normal;\n      text-align: center;\n      margin-bottom: 1rem;\n      fill: var(--secondary);\n      text-shadow: var(--text-shadow);\n      max-width: 400px;\n      margin-left: auto;\n      margin-right: auto;\n    \n    }\n    \n    ." + prependClass('sub-text') + " {\n      margin: auto;\n      font-weight: 600;\n      font-size: 1.2rem;\n    \n      text-align: center;\n      text-transform: uppercase;\n    }\n\n    ." + prependClass('close-button') + " {\n      border-radius: 100%;\n      background-color: white;\n      width: 2rem;\n      border: none;\n      height: 2rem;\n      position: absolute;\n      margin: 10px;\n      top: 0px;\n      right: 0px;\n      color: black;\n      font-size: 1.2rem;\n      font-weight: 300;\n      cursor: pointer;\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('close-button:hover') + " {\n      transition: all 0.3s;\n      filter: brightness(0.95);\n    }\n    \n    ." + prependClass('image-darken') + " {\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      width: 100%;\n      padding: 2rem 1.5rem 1.5rem 1.5rem;\n    }\n    \n    ." + prependClass('text-shadow') + " {\n      text-shadow: var(--text-shadow);\n    }\n    \n    ." + prependClass('box-shadow') + " {\n      box-shadow: var(--text-shadow);\n    }\n    " + appendResponsiveBehaviour() + "\n\n    ";
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
  var handleClickCallToAction = function handleClickCallToAction(e) {
    var _trigger$data, _trigger$data2;
    e.preventDefault();
    collect({
      cta: {
        variantID: trigger.id,
        shownAt: invocationTimeStamp || new Date().toISOString()
      }
    });
    trackEvent('user_clicked_button', _extends({}, trigger, {
      variantName: 'MODAL'
    }));
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_self');
  };
  var handleCloseModal = function handleCloseModal() {
    trackEvent('user_closed_trigger', _extends({}, trigger, {
      variantName: 'MODAL'
    }));
    removeActiveTrigger(trigger.id);
    setOpen(false);
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
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerModal, {
      key: trigger.id,
      trigger: trigger
    });
  }
}, {
  id: 'youtube_v1',
  behaviour: 'BEHAVIOUR_YOUTUBE',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerYoutube, {
      key: trigger.id,
      trigger: trigger
    });
  }
}, {
  id: 'inverse_v1',
  behaviour: 'BEHAVIOUR_INVERSE_FLOW',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerInverse, {
      key: trigger.id,
      trigger: trigger
    });
  }
}, {
  id: 'banner_v1',
  behaviour: 'BEHAVIOUR_BANNER',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerBanner, {
      key: trigger.id,
      trigger: trigger
    });
  }
}];

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
var FingerprintProvider = function FingerprintProvider(_ref) {
  var appId = _ref.appId,
    children = _ref.children,
    _ref$consent = _ref.consent,
    consent = _ref$consent === void 0 ? false : _ref$consent,
    consentCallback = _ref.consentCallback,
    defaultHandlers = _ref.defaultHandlers,
    _ref$initialDelay = _ref.initialDelay,
    initialDelay = _ref$initialDelay === void 0 ? 0 : _ref$initialDelay,
    _ref$exitIntentTrigge = _ref.exitIntentTriggers,
    exitIntentTriggers = _ref$exitIntentTrigge === void 0 ? true : _ref$exitIntentTrigge,
    _ref$idleTriggers = _ref.idleTriggers,
    idleTriggers = _ref$idleTriggers === void 0 ? true : _ref$idleTriggers,
    _ref$pageLoadTriggers = _ref.pageLoadTriggers,
    pageLoadTriggers = _ref$pageLoadTriggers === void 0 ? true : _ref$pageLoadTriggers,
    legacy_config = _ref.config;
  var _useState2 = React.useState(false),
    booted = _useState2[0],
    setBooted = _useState2[1];
  var _useState3 = React.useState(defaultHandlers || clientHandlers),
    handlers = _useState3[0],
    setHandlers = _useState3[1];
  var consentGiven = useConsentCheck(consent, consentCallback);
  var addAnotherHandler = React__default.useCallback(function (trigger) {
    setHandlers(function (handlers) {
      return [].concat(handlers, [trigger]);
    });
  }, [setHandlers]);
  React.useEffect(function () {
    if (!appId) throw new Error('C&M Fingerprint: appId is required');
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
  }, [consentGiven]);
  if (!appId) {
    return null;
  }
  if (!consentGiven) {
    return children;
  }
  return React__default.createElement(ConfigProvider, {
    legacy_config: legacy_config
  }, React__default.createElement(LoggingProvider, null, React__default.createElement(reactQuery.QueryClientProvider, {
    client: queryClient
  }, React__default.createElement(FingerprintContext.Provider, {
    value: {
      appId: appId,
      booted: booted,
      currentTrigger: null,
      registerHandler: addAnotherHandler,
      trackEvent: function trackEvent() {
        alert('trackEvent not implemented');
      },
      trackPageView: function trackPageView() {
        alert('trackPageView not implemented');
      },
      unregisterHandler: function unregisterHandler() {
        alert('unregisterHandler not implemented');
      },
      initialDelay: initialDelay,
      idleTriggers: idleTriggers,
      pageLoadTriggers: pageLoadTriggers,
      exitIntentTriggers: exitIntentTriggers
    }
  }, React__default.createElement(VisitorProvider, null, React__default.createElement(MixpanelProvider, null, React__default.createElement(CollectorProvider, {
    handlers: handlers
  }, React__default.createElement(reactErrorBoundary.ErrorBoundary, {
    onError: function onError(error, info) {
      return console.error(error, info);
    },
    fallback: React__default.createElement("div", null, "An application error occurred.")
  }, children, React__default.createElement(reactFontawesome.FontAwesomeIcon, {
    icon: icons.faEnvelope,
    size: '10x'
  }), React__default.createElement(reactFontawesome.FontAwesomeIcon, {
    icon: icons.fa1,
    size: '10x'
  }), React__default.createElement(reactFontawesome.FontAwesomeIcon, {
    icon: icons.fa4,
    size: '10x'
  }), React__default.createElement(reactFontawesome.FontAwesomeIcon, {
    icon: icons.faArrowDownUpAcrossLine,
    size: '10x'
  }), React__default.createElement(reactFontawesome.FontAwesomeIcon, {
    icon: icons.faArrowsUpToLine,
    size: '10x'
  })))))))));
};
var defaultFingerprintState = {
  appId: '',
  booted: false,
  consent: false,
  currentTrigger: null,
  exitIntentTriggers: false,
  idleTriggers: false,
  pageLoadTriggers: false,
  initialDelay: 0,
  registerHandler: function registerHandler() {},
  trackEvent: function trackEvent() {},
  trackPageView: function trackPageView() {},
  unregisterHandler: function unregisterHandler() {}
};
var FingerprintContext = React.createContext(_extends({}, defaultFingerprintState));

exports.CollectorContext = CollectorContext;
exports.CollectorProvider = CollectorProvider;
exports.FingerprintContext = FingerprintContext;
exports.FingerprintProvider = FingerprintProvider;
exports.onCookieChanged = onCookieChanged;
exports.useCollector = useCollector;
exports.useFingerprint = useFingerprint;
//# sourceMappingURL=index.js.map

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var reactQuery = require('@tanstack/react-query');
var React = require('react');
var React__default = _interopDefault(React);
var reactErrorBoundary = require('react-error-boundary');
var ReactDOM = _interopDefault(require('react-dom'));
var mixpanel = _interopDefault(require('mixpanel-browser'));
var Cookies = _interopDefault(require('js-cookie'));
var uuid = require('uuid');
var uniqueBy = _interopDefault(require('lodash.uniqby'));
var reactIdleTimer = require('react-idle-timer');
var useExitIntent = require('use-exit-intent');
var reactHookForm = require('react-hook-form');
var reactDeviceDetect = require('react-device-detect');

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

var LoggingProvider = function LoggingProvider(_ref) {
  var debug = _ref.debug,
    children = _ref.children;
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

var setCookie = function setCookie(name, value, expires) {
  return Cookies.set(name, value, {
    expires: expires,
    sameSite: 'strict'
  });
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

var uuidValidateV4 = function uuidValidateV4(uuid$1) {
  return uuid.validate(uuid$1) && uuid.version(uuid$1) === 4;
};

var validVisitorId = function validVisitorId(id) {
  var splitCookie = id.split('|');
  return uuidValidateV4(splitCookie[0]);
};

var bootstrapVisitor = function bootstrapVisitor(_ref) {
  var setVisitor = _ref.setVisitor,
    session = _ref.session,
    setSession = _ref.setSession;
  var visitor = {
    id: undefined
  };
  if (getCookie(cookieAccountJWT)) {
    visitor.jwt = getCookie(cookieAccountJWT);
  }
  if (typeof window !== 'undefined') {
    var urlParams = new URLSearchParams(window.location.search);
    var vid = urlParams.get('v_id');
    if (vid) {
      visitor.id = vid;
    }
  }
  if (!visitor.id && !getCookie('_cm_id') || !validVisitorId(getCookie('_cm_id'))) {
    var visitorId = uuid.v4();
    visitor.id = visitorId;
  }
  if (!visitor.id && getCookie('_cm_id')) {
    var c = getCookie('_cm_id');
    var _c$split = c.split('|'),
      _visitorId = _c$split[0];
    visitor.id = _visitorId;
  }
  var _getSessionIdAndEndTi = getSessionIdAndEndTime(getCookie('_cm_id')),
    sessionId = _getSessionIdAndEndTi.sessionId,
    endTime = _getSessionIdAndEndTi.endTime;
  setCookie('_cm_id', visitor.id + "|" + sessionId + "|" + endTime.toISOString(), 365);
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
          })).then(function () {});
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
  React.useEffect(function () {
    if (!(visitor !== null && visitor !== void 0 && visitor.cohort)) {
      log('Able to register user cohort, but none provided. ');
      return;
    }
    registerUserData({
      u_cohort: visitor.cohort
    });
  }, [visitor, setInitiated]);
  var registerUserData = React__default.useCallback(function (properties) {
    log("Mixpanel: attempting to'register/override properties: " + Object.keys(properties).join(', '));
    mixpanel.people.set(properties);
  }, [log]);
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

var TEMP_isCNMBrand = function TEMP_isCNMBrand() {
  if (typeof window === 'undefined') return false;
  var isCnMBookingDomain = /^book\.[A-Za-z0-9.!@#$%^&*()-_+=~{}[\]:;<>,?/|]+\.co\.uk$/.test(window.location.host);
  return isCnMBookingDomain;
};
var getBrand = function getBrand() {
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

var collinBrandsPathConversionMap = {
  Stonehouse: '/tablebooking/enquiry-form-completed',
  'All Bar One': '/bookings/dmnc-complete',
  Sizzling: '/tablebooking/enquiry-form-completed',
  Ember: '/tablebooking/enquiry-form-completed'
};
function useCollinsBookingComplete() {
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var checkCollinsBookingComplete = React__default.useCallback(function () {
    var brand = getBrand();
    if (!brand) return;
    var conversionPathForBrand = collinBrandsPathConversionMap[brand];
    if (!conversionPathForBrand) return;
    var isConversionPath = window.location.pathname.toLowerCase().includes(conversionPathForBrand.toLowerCase());
    if (!isConversionPath) return;
    log("useCollinsBookingComplete: Collins booking complete based on path " + conversionPathForBrand + " and brand " + brand);
    trackEvent('booking_complete', {});
  }, [trackEvent, log]);
  return {
    checkCollinsBookingComplete: checkCollinsBookingComplete
  };
}

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
      hostname: requestHost
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

var stringIsSubstringOf = function stringIsSubstringOf(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.toLowerCase().includes(b.toLowerCase());
};
function isEqual(nodeList1, nodeList2) {
  if ((nodeList1 === null || nodeList1 === void 0 ? void 0 : nodeList1.length) !== (nodeList2 === null || nodeList2 === void 0 ? void 0 : nodeList2.length)) {
    return false;
  }
  var largerList = (nodeList1 === null || nodeList1 === void 0 ? void 0 : nodeList1.length) > (nodeList2 === null || nodeList2 === void 0 ? void 0 : nodeList2.length) ? nodeList1 : nodeList2;
  for (var i = 0; i < (largerList === null || largerList === void 0 ? void 0 : largerList.length); i++) {
    if (nodeList1[i] !== nodeList2[i]) {
      return false;
    }
  }
  return true;
}
var bannedTypes = ['password', 'submit'];
var bannedFieldPartialNames = ['expir', 'cvv', 'cvc', 'csv', 'csc', 'pin', 'pass', 'card'];
var scanIntervalMs = 1000;
function useFormCollector() {
  var _useCollectorMutation = useCollectorMutation(),
    collect = _useCollectorMutation.mutateAsync;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor;
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var _useState = React.useState(),
    nodeList = _useState[0],
    setNodeList = _useState[1];
  React.useEffect(function () {
    if (isUndefined('document')) return;
    var intId = setInterval(function () {
      var forms = document.querySelectorAll('form');
      if (isEqual(forms, nodeList)) return;
      setNodeList(forms);
    }, scanIntervalMs);
    return function () {
      return clearInterval(intId);
    };
  }, [setNodeList, nodeList]);
  React.useEffect(function () {
    if (!nodeList) return;
    if (!visitor.id) return;
    if (isUndefined('document')) return;
    var forms = document.querySelectorAll('form');
    var formSubmitListener = function formSubmitListener(e) {
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
        visitor: visitor,
        form: {
          data: data
        }
      });
    };
    forms.forEach(function (f) {
      return f.removeEventListener('submit', formSubmitListener);
    });
    forms.forEach(function (f) {
      return f.addEventListener('submit', formSubmitListener);
    });
    return function () {
      forms.forEach(function (f) {
        return f.removeEventListener('submit', formSubmitListener);
      });
    };
  }, [visitor, nodeList]);
}

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

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new _ListCache;
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

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
var Map$1 = _getNative(_root, 'Map');

var _Map = Map$1;

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

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;

var _Stack = Stack;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}

var _setCacheAdd = setCacheAdd;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new _MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;

var _SetCache = SetCache;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var _arraySome = arraySome;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new _SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!_arraySome(other, function(othValue, othIndex) {
            if (!_cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;

/** Built-in value references. */
var Uint8Array = _root.Uint8Array;

var _Uint8Array = Uint8Array;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = _mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$1;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

var _equalByTag = equalByTag;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush;

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

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

var _getSymbols = getSymbols;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

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
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

var isArguments_1 = isArguments;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var isLength_1 = isLength;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$1 = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag = '[object Object]',
    regexpTag$1 = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag$1 = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag$1] =
typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$9.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$6.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$a.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$7.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;

/* Built-in method references that are verified to be native. */
var DataView = _getNative(_root, 'DataView');

var _DataView = DataView;

/* Built-in method references that are verified to be native. */
var Promise$1 = _getNative(_root, 'Promise');

var _Promise = Promise$1;

/* Built-in method references that are verified to be native. */
var Set = _getNative(_root, 'Set');

var _Set = Set;

/* Built-in method references that are verified to be native. */
var WeakMap = _getNative(_root, 'WeakMap');

var _WeakMap = WeakMap;

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$2 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = _baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (_Map && getTag(new _Map) != mapTag$2) ||
    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
    (_Set && getTag(new _Set) != setTag$2) ||
    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$2;
        case mapCtorString: return mapTag$2;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$2;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var _getTag = getTag;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    objectTag$2 = '[object Object]';

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$b.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag$1 : _getTag(object),
      othTag = othIsArr ? arrayTag$1 : _getTag(other);

  objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
  othTag = othTag == argsTag$2 ? objectTag$2 : othTag;

  var objIsObj = objTag == objectTag$2,
      othIsObj = othTag == objectTag$2,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack);
    return (objIsArr || isTypedArray_1(object))
      ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
    var objIsWrapped = objIsObj && hasOwnProperty$8.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$8.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new _Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack);
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual$1(value, other) {
  return _baseIsEqual(value, other);
}

var isEqual_1 = isEqual$1;

var useIsElementVisible = function useIsElementVisible() {
  var getIsVisible = React__default.useCallback(function (selector) {
    var element = document.querySelector(selector);
    if (!element) return false;
    if (window.getComputedStyle(element).visibility === 'hidden') return false;
    if (window.getComputedStyle(element).display === 'none') return false;
    if (window.getComputedStyle(element).opacity === '0') return false;
    return true;
  }, []);
  return {
    getIsVisible: getIsVisible
  };
};

var interval = 250;
var useIncompleteTriggers = function useIncompleteTriggers() {
  var _useState = React.useState([]),
    incompleteTriggers = _useState[0],
    setIncompleteTriggers = _useState[1];
  var _useState2 = React.useState([]),
    visibleTriggers = _useState2[0],
    setVisibleTriggers = _useState2[1];
  var _useIsElementVisible = useIsElementVisible(),
    getIsVisible = _useIsElementVisible.getIsVisible;
  var visibilityQuerySelectors = React__default.useMemo(function () {
    if (!(incompleteTriggers !== null && incompleteTriggers !== void 0 && incompleteTriggers.length)) return [];
    return incompleteTriggers.map(function (trigger) {
      var _trigger$signals;
      return trigger === null || trigger === void 0 ? void 0 : (_trigger$signals = trigger.signals) === null || _trigger$signals === void 0 ? void 0 : _trigger$signals.map(function (signal) {
        var _signal$parameters;
        if ((signal === null || signal === void 0 ? void 0 : signal.op) !== 'CanSeeElementOnPage') return null;
        return {
          trigger: trigger,
          selector: signal === null || signal === void 0 ? void 0 : (_signal$parameters = signal.parameters) === null || _signal$parameters === void 0 ? void 0 : _signal$parameters.selector
        };
      });
    }).flat().filter(Boolean);
  }, [incompleteTriggers]);
  React.useEffect(function () {
    if (!visibilityQuerySelectors.length) return;
    var intId = setInterval(function () {
      var visibleItems = visibilityQuerySelectors.map(function (reducedTrigger) {
        var isElementVisible = getIsVisible(reducedTrigger.selector);
        if (isElementVisible) return reducedTrigger.trigger;
        return null;
      }).filter(Boolean);
      if (!visibleItems.length) return;
      setVisibleTriggers(function (prev) {
        var areSame = isEqual_1(visibleItems, prev);
        if (areSame) return prev;
        return visibleItems;
      });
    }, interval);
    return function () {
      clearInterval(intId);
    };
  }, [incompleteTriggers, getIsVisible, setVisibleTriggers, visibilityQuerySelectors]);
  return {
    incompleteTriggers: incompleteTriggers,
    setIncompleteTriggers: setIncompleteTriggers,
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
        brand: getBrand()
      });
      clearInterval(id);
    }, selectorRateMs);
    return function () {
      clearInterval(id);
    };
  }, [intently, log, setIsVisible, trackEvent, initiated]);
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
var useRemoveIntently = function useRemoveIntently(_ref2) {
  var intently = _ref2.intently;
  var _useLogging2 = useLogging(),
    log = _useLogging2.log;
  React.useEffect(function () {
    if (intently) return;
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
  }, [intently, log]);
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
    log('useRunOnPathChange: running for path: ', location.href);
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

var defaultTriggerCooldown = 60 * 1000;
function useTriggerDelay(cooldownMs) {
  if (cooldownMs === void 0) {
    cooldownMs = defaultTriggerCooldown;
  }
  var _useState = React.useState(null),
    lastTriggerTimeStamp = _useState[0],
    setLastTriggerTimeStamp = _useState[1];
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
  return {
    startCooldown: startCooldown,
    canNextTriggerOccur: canNextTriggerOccur,
    getRemainingCooldownMs: getRemainingCooldownMs
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

var defaultIdleStatusDelay = 5 * 1000;
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
    pageLoadTriggers = _useFingerprint.pageLoadTriggers,
    config = _useFingerprint.config;
  var configIdleDelay = config === null || config === void 0 ? void 0 : config.idleDelay;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor,
    session = _useVisitor.session,
    setVisitor = _useVisitor.setVisitor;
  var _useTriggerDelay = useTriggerDelay(config === null || config === void 0 ? void 0 : config.triggerCooldown),
    canNextTriggerOccur = _useTriggerDelay.canNextTriggerOccur,
    startCooldown = _useTriggerDelay.startCooldown,
    getRemainingCooldownMs = _useTriggerDelay.getRemainingCooldownMs;
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
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
  var getIdleStatusDelay = React__default.useCallback(function () {
    var idleDelay = configIdleDelay || defaultIdleStatusDelay;
    var cooldownDelay = getRemainingCooldownMs();
    var delayAdjustedForCooldown = idleDelay + cooldownDelay;
    log("Setting idle delay at " + delayAdjustedForCooldown + "ms (cooldown " + cooldownDelay + "ms + config.delay " + idleDelay + "ms)");
    return delayAdjustedForCooldown;
  }, [configIdleDelay, getRemainingCooldownMs, log]);
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
  var _useIncompleteTrigger = useIncompleteTriggers(),
    setIncompleteTriggers = _useIncompleteTrigger.setIncompleteTriggers,
    visibleIncompleteTriggers = _useIncompleteTrigger.visibleTriggers;
  React.useEffect(function () {
    if (!(visibleIncompleteTriggers !== null && visibleIncompleteTriggers !== void 0 && visibleIncompleteTriggers.length)) return;
    setDisplayedTriggerByInvocation('INVOCATION_ELEMENT_VISIBLE');
  }, [visibleIncompleteTriggers, setPageTriggersState]);
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
    setPageTriggersState(function (prev) {
      return prev.filter(function (trigger) {
        return trigger.id !== id;
      });
    });
  }, [displayTriggers, log, setPageTriggers]);
  var combinedTriggers = React__default.useMemo(function () {
    return [].concat(pageTriggers, visibleIncompleteTriggers);
  }, [pageTriggers, visibleIncompleteTriggers]);
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
  }, [visibleIncompleteTriggers]);
  var getIsBehaviourVisible = React__default.useCallback(function (type) {
    if (displayTriggers.length === 0) return false;
    if (displayTriggers.find(function (triggerId) {
      var _pageTriggers$find;
      return ((_pageTriggers$find = pageTriggers.find(function (trigger) {
        return trigger.id === triggerId;
      })) === null || _pageTriggers$find === void 0 ? void 0 : _pageTriggers$find.behaviour) === type;
    })) return true;
    return false;
  }, [displayTriggers, pageTriggers]);
  var setDisplayedTriggerByInvocation = React__default.useCallback(function (invocation) {
    var invokableTrigger = combinedTriggers.find(function (trigger) {
      return trigger.invocation === invocation;
    });
    if (!invokableTrigger) {
      log('CollectorProvider: Trigger not invokable ', invokableTrigger);
      return;
    }
    if (getIsBehaviourVisible(invokableTrigger.behaviour)) {
      log('CollectorProvider: Behaviour already visible, not showing trigger', invokableTrigger);
      return;
    }
    setDisplayedTriggers(function (ts) {
      return [].concat(ts, [invokableTrigger.id]);
    });
  }, [combinedTriggers, setDisplayedTriggers, getIsBehaviourVisible]);
  var fireIdleTrigger = React.useCallback(function () {
    if (!idleTriggers) return;
    log('CollectorProvider: attempting to fire idle time trigger');
    setDisplayedTriggerByInvocation('INVOCATION_IDLE_TIME');
    startCooldown();
  }, [idleTriggers, log, setDisplayedTriggerByInvocation, startCooldown]);
  var _useExitIntentDelay = useExitIntentDelay(config === null || config === void 0 ? void 0 : config.exitIntentDelay),
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
  }, [displayTriggers === null || displayTriggers === void 0 ? void 0 : displayTriggers.length, hasDelayPassed, canNextTriggerOccur, log, setDisplayedTriggerByInvocation, startCooldown, reRegisterExitIntent, getRemainingCooldownMs]);
  React.useEffect(function () {
    if (!exitIntentTriggers) return;
    log('CollectorProvider: attempting to register exit trigger');
    registerHandler({
      id: 'clientTrigger',
      handler: fireExitTrigger
    });
  }, [exitIntentTriggers, fireExitTrigger, log, registerHandler]);
  useFormCollector();
  var fireOnLoadTriggers = React.useCallback(function () {
    if (!pageLoadTriggers) return;
    if (!(pageTriggers !== null && pageTriggers !== void 0 && pageTriggers.length)) return;
    log('CollectorProvider: attempting to fire on-page-load trigger');
    setDisplayedTriggerByInvocation('INVOCATION_PAGE_LOAD');
  }, [pageLoadTriggers, log, setDisplayedTriggerByInvocation]);
  var collectAndApplyVisitorInfo = React__default.useCallback(function () {
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
    var hash = window.location.hash.substring(3);
    var hashParams = hash.split('&').reduce(function (result, item) {
      var parts = item.split('=');
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
      }).then(function (response) {
        try {
          return Promise.resolve(response.json()).then(function (payload) {
            log('Sent login collector data, retrieved:', payload);
          });
        } catch (e) {
          return Promise.reject(e);
        }
      })["catch"](function (err) {
        error('failed to store collected data', err);
      });
    }
    collect({
      page: getPagePayload() || undefined,
      referrer: getReferrer() || undefined
    }).then(function (response) {
      try {
        if (response.status === 204) {
          setIntently(true);
          return Promise.resolve();
        }
        return Promise.resolve(response.json()).then(function (payload) {
          log('Sent collector data, retrieved:', payload);
          setIdleTimeout(getIdleStatusDelay());
          setPageTriggers(payload === null || payload === void 0 ? void 0 : payload.pageTriggers);
          setIncompleteTriggers((payload === null || payload === void 0 ? void 0 : payload.incompleteTriggers) || []);
          var cohort = payload.intently ? 'intently' : 'fingerprint';
          if (visitor.cohort !== cohort) setVisitor({
            cohort: cohort
          });
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
    })["catch"](function (err) {
      error('failed to store collected data', err);
    });
    log('CollectorProvider: collected data');
  }, [collect, log, error, setVisitor, visitor, handlers, getIdleStatusDelay, setIncompleteTriggers, setIdleTimeout, trackEvent, setPageTriggers]);
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
          }).then(function (response) {
            try {
              return Promise.resolve(response.json()).then(function (payload) {
                log('Sent collector data, retrieved:', payload);
                setIdleTimeout(getIdleStatusDelay());
                setPageTriggers(payload === null || payload === void 0 ? void 0 : payload.pageTriggers);
                setIncompleteTriggers((payload === null || payload === void 0 ? void 0 : payload.incompleteTriggers) || []);
              });
            } catch (e) {
              return Promise.reject(e);
            }
          })["catch"](function (err) {
            error('failed to store collected data', err);
          });
          clearInterval(intervalId);
        }
      });
    }, 500);
    return intervalId;
  }, [collect, error, foundWatchers, getIdleStatusDelay, log, session, setIdleTimeout, trackEvent, visitor]);
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
      trackEvent: trackEvent
    };
  }, [setPageTriggers, removeActiveTrigger, setActiveTrigger, trackEvent, setIncompleteTriggers]);
  React.useEffect(function () {
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
  trackEvent: function trackEvent() {
    console.error('trackEvent not implemented correctly');
  }
});

var useCollector = function useCollector() {
  return React.useContext(CollectorContext);
};

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

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
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$1);
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
var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

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
    setIncompleteTriggers = _useCollector.setIncompleteTriggers;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor;
  var trackTriggerSeen = React__default.useCallback(function (trigger) {
    trackEvent('trigger_displayed', {
      triggerId: trigger.id,
      triggerType: trigger.invocation,
      triggerBehaviour: trigger.behaviour,
      time: new Date().toISOString(),
      brand: getBrand()
    });
  }, [trackEvent]);
  return reactQuery.useMutation(function (trigger) {
    trackTriggerSeen(trigger);
    return request.put(hostname + "/triggers/" + appId + "/" + visitor.id + "/seen", {
      seenTriggerIDs: [trigger.id],
      visitor: visitor,
      page: getPagePayload()
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
          log('Seen mutation: replacing triggers with:', r.pageTriggers);
          setPageTriggers(r.pageTriggers);
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

var getModalStylesBySize = function getModalStylesBySize(size) {
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

var FullyClickableModal = function FullyClickableModal(_ref) {
  var handleClickCallToAction = _ref.handleClickCallToAction,
    handleCloseModal = _ref.handleCloseModal,
    style = _ref.style,
    imageURL = _ref.imageURL;
  var _useState = React.useState(false),
    stylesLoaded = _useState[0],
    setStylesLoaded = _useState[1];
  var height = style.height,
    width = style.width;
  var appendResponsiveBehaviour = React__default.useCallback(function () {
    return reactDeviceDetect.isMobile ? "." + prependClass('modal') + " {\n      max-width: 95%;\n      max-height: 95%;\n    }" : "\n\n@media screen and (max-width: 1400px) {\n  ." + prependClass('modal') + " {\n    height: " + 0.8 * height + "px;\n    width: " + 0.8 * width + "px;\n  }\n}\n@media screen and (max-width: 1100px) {\n  ." + prependClass('modal') + " {\n    height: " + 0.6 * height + "px;\n    width: " + 0.6 * width + "px;\n  }\n}\n\n@media screen and (max-width: 450px) {\n  ." + prependClass('modal') + " {\n    height: " + 0.4 * height + "px;\n    width: " + 0.4 * width + "px;\n  }\n}\n\n";
  }, [style]);
  React.useEffect(function () {
    var cssToApply = "\n  \n    ." + prependClass('overlay') + " {\n      background-color: rgba(0, 0, 0, 0.7);\n      position: fixed;\n      top: 0;\n      left: 0;\n      width: 100vw;\n      height: 100vh;\n      z-index: 9999;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-weight: 500;\n      font-style: normal;\n    }\n    \n    ." + prependClass('modal') + " {\n      height: " + height + "px;\n      width: " + width + "px;\n      display: flex;\n      flex-direction: column;\n      overflow: hidden;\n      background-repeat: no-repeat;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: space-between;\n      box-shadow: var(--text-shadow);\n      " + ( 'transition: all 0.3s ease-in-out;' ) + "\n      " + ( 'cursor: pointer;' ) + "\n    }\n\n    " + ( "." + prependClass('modal') + ":hover {\n      filter: brightness(1.05);\n      box-shadow: 0.1rem 0.1rem 10px #7b7b7b;\n    }" ) + "\n    \n    \n    ." + prependClass('text-center') + " {\n      text-align: center;\n    }\n  \n    ." + prependClass('text-container') + " {\n      flex-direction: column;\n      flex: 1;\n      text-shadow: var(--text-shadow);\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('main-text') + " {\n      font-weight: 500;\n      font-size: 2rem;\n      font-style: normal;\n      text-align: center;\n      margin-bottom: 1rem;\n      fill: var(--secondary);\n      text-shadow: var(--text-shadow);\n      max-width: 400px;\n      margin-left: auto;\n      margin-right: auto;\n    \n    }\n    \n    ." + prependClass('sub-text') + " {\n      margin: auto;\n      font-weight: 600;\n      font-size: 1.2rem;\n    \n      text-align: center;\n      text-transform: uppercase;\n    }\n\n    ." + prependClass('close-button') + " {\n      border-radius: 100%;\n      background-color: white;\n      width: 2rem;\n      border: none;\n      height: 2rem;\n      position: absolute;\n      margin: 10px;\n      top: 0px;\n      right: 0px;\n      color: black;\n      font-size: 1.2rem;\n      font-weight: 300;\n      cursor: pointer;\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('close-button:hover') + " {\n      transition: all 0.3s;\n      filter: brightness(0.95);\n    }\n    \n    ." + prependClass('image-darken') + " {\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      width: 100%;\n      padding: 2rem 1.5rem 1.5rem 1.5rem;\n    }\n    \n    ." + prependClass('text-shadow') + " {\n      text-shadow: var(--text-shadow);\n    }\n    \n    ." + prependClass('box-shadow') + " {\n      box-shadow: var(--text-shadow);\n    }\n\n    " + appendResponsiveBehaviour() + "\n    ";
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
  }, [style, appendResponsiveBehaviour]);
  var handleModalAction = React__default.useCallback(function (e) {
    e.stopPropagation();
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

var defaultElementSize = 'medium';
var defaultButtonPosition = 'right';
var CnMStandardModal = function CnMStandardModal(_ref) {
  var _useFingerprint$confi, _useFingerprint$confi2, _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  var trigger = _ref.trigger,
    handleClickCallToAction = _ref.handleClickCallToAction,
    handleCloseModal = _ref.handleCloseModal;
  var modalConfig = (_useFingerprint$confi = useFingerprint().config) === null || _useFingerprint$confi === void 0 ? void 0 : (_useFingerprint$confi2 = _useFingerprint$confi.triggerConfig) === null || _useFingerprint$confi2 === void 0 ? void 0 : _useFingerprint$confi2.modal;
  var elementSize = (modalConfig === null || modalConfig === void 0 ? void 0 : modalConfig.size) || defaultElementSize;
  var _useState = React.useState(false),
    stylesLoaded = _useState[0],
    setStylesLoaded = _useState[1];
  var modalSizeStyle = getModalStylesBySize(elementSize);
  var buttonSizeStyle = getModalButtonStylesBySize(elementSize);
  React.useEffect(function () {
    var cssToApply = "\n    :root {\n      --primary: white;\n      --secondary: grey;\n      --text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);\n    }\n    \n    h1,\n    h2,\n    h3,\n    h4,\n    h5,\n    h6,\n    p,\n    a,\n    span {\n      line-height: 1.2;\n      font-family: Arial, Helvetica, sans-serif;\n    \n    }\n    \n    ." + prependClass('overlay') + " {\n      position: fixed;\n      top: 0;\n      left: 0;\n      width: 100vw;\n      height: 100vh;\n      background-color: rgba(0, 0, 0, 0.5);\n      z-index: 9999;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-weight: 500;\n      font-style: normal;\n    }\n    \n    ." + prependClass('modal') + " {\n      width: 80%;\n      height: 500px;\n      display: flex;\n      flex-direction: column;\n      overflow: hidden;\n      background-repeat: no-repeat;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: space-between;\n      box-shadow: var(--text-shadow);\n    }\n    \n    \n    ." + prependClass('text-center') + " {\n      text-align: center;\n    }\n  \n    ." + prependClass('text-container') + " {\n      flex-direction: column;\n      flex: 1;\n      text-shadow: var(--text-shadow);\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('main-text') + " {\n      font-weight: 500;\n      font-size: 2rem;\n      font-style: normal;\n      text-align: center;\n      margin-bottom: 1rem;\n      fill: var(--secondary);\n      text-shadow: var(--text-shadow);\n      max-width: 400px;\n      margin-left: auto;\n      margin-right: auto;\n    \n    }\n    \n    ." + prependClass('sub-text') + " {\n      margin: auto;\n      font-weight: 600;\n      font-size: 1.2rem;\n    \n      text-align: center;\n      text-transform: uppercase;\n    }\n    \n    ." + prependClass('cta') + " {\n      cursor: pointer;\n      background-color: var(--secondary);\n      border-radius: 2px;\n      display: block;\n      font-size: 1.3rem;\n      color: var(--primary);\n      text-align: center;\n      text-transform: uppercase;\n      margin: 0 auto;\n      text-decoration: none;\n      box-shadow: 0.3rem 0.3rem white;\n    }\n    \n    ." + prependClass('cta:hover') + " {\n      transition: all 0.3s;\n      filter: brightness(0.95);\n    }\n    \n    ." + prependClass('close-button') + " {\n      border-radius: 100%;\n      background-color: white;\n      width: 2rem;\n      border: none;\n      height: 2rem;\n      position: absolute;\n      margin: 10px;\n      top: 0px;\n      right: 0px;\n      color: black;\n      font-size: 1.2rem;\n      font-weight: 300;\n      cursor: pointer;\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('close-button:hover') + " {\n      transition: all 0.3s;\n      filter: brightness(0.95);\n    }\n    \n    ." + prependClass('image-darken') + " {\n      background: rgba(0, 0, 0, 0.1);\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      width: 100%;\n      padding: 2rem 1.5rem 1.5rem 1.5rem;\n    }\n    \n    ." + prependClass('text-shadow') + " {\n      text-shadow: var(--text-shadow);\n    }\n    \n    ." + prependClass('box-shadow') + " {\n      box-shadow: var(--text-shadow);\n    }\n    ";
    var styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(cssToApply));
    document.head.appendChild(styles);
    setTimeout(function () {
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
    style: _extends({
      background: "url(" + (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL) + ")",
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative'
    }, modalSizeStyle)
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
    style: _extends({
      display: 'flex'
    }, getModalButtonFlexPosition((modalConfig === null || modalConfig === void 0 ? void 0 : modalConfig.buttonPosition) || defaultButtonPosition))
  }, React__default.createElement("div", null, React__default.createElement("a", {
    href: trigger === null || trigger === void 0 ? void 0 : (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.buttonURL,
    className: prependClass('cta'),
    onClick: handleClickCallToAction,
    style: buttonSizeStyle
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.buttonText))))));
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
var BrownsModal = function BrownsModal(_ref2) {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  var trigger = _ref2.trigger,
    handleClickCallToAction = _ref2.handleClickCallToAction,
    handleCloseModal = _ref2.handleCloseModal;
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
var StonehouseModal = function StonehouseModal(_ref) {
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

var Modal = function Modal(_ref) {
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
  var brand = React__default.useMemo(function () {
    return getBrand();
  }, []);
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
      setHasFired(true);
    }, 1500);
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
    trackEvent('user_clicked_button', trigger);
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_self');
  };
  var handleCloseModal = function handleCloseModal() {
    trackEvent('user_closed_trigger', trigger);
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
        var style = reactDeviceDetect.isMobile ? {
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
        var _image = reactDeviceDetect.isMobile ? "https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-booknow-m.jpg" : "https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-booknow.jpg";
        if (window.location.href.includes('signup')) _image = reactDeviceDetect.isMobile ? "https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-findoutmore-m.jpg" : "https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-findoutmore.jpg";
        var _style = reactDeviceDetect.isMobile ? {
          height: 1000,
          width: 640
        } : {
          width: 819,
          height: 490
        };
        return React__default.createElement(FullyClickableModal, Object.assign({}, modalProps, {
          style: _style,
          imageURL: _image
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
    debug = _ref.debug,
    defaultHandlers = _ref.defaultHandlers,
    _ref$initialDelay = _ref.initialDelay,
    initialDelay = _ref$initialDelay === void 0 ? 0 : _ref$initialDelay,
    _ref$exitIntentTrigge = _ref.exitIntentTriggers,
    exitIntentTriggers = _ref$exitIntentTrigge === void 0 ? true : _ref$exitIntentTrigge,
    _ref$idleTriggers = _ref.idleTriggers,
    idleTriggers = _ref$idleTriggers === void 0 ? true : _ref$idleTriggers,
    _ref$pageLoadTriggers = _ref.pageLoadTriggers,
    pageLoadTriggers = _ref$pageLoadTriggers === void 0 ? true : _ref$pageLoadTriggers,
    config = _ref.config;
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
  return React__default.createElement(LoggingProvider, {
    debug: debug
  }, React__default.createElement(reactQuery.QueryClientProvider, {
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
      exitIntentTriggers: exitIntentTriggers,
      config: config
    }
  }, React__default.createElement(VisitorProvider, null, React__default.createElement(MixpanelProvider, null, React__default.createElement(CollectorProvider, {
    handlers: handlers
  }, React__default.createElement(reactErrorBoundary.ErrorBoundary, {
    onError: function onError(error, info) {
      return console.error(error, info);
    },
    fallback: React__default.createElement("div", null, "An application error occurred.")
  }, children)))))));
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
  unregisterHandler: function unregisterHandler() {},
  config: {
    idleDelay: undefined,
    triggerCooldown: 60 * 1000,
    exitIntentDelay: 0
  }
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

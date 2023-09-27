function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactQuery = require('@tanstack/react-query');
var reactIdleTimer = require('react-idle-timer');
var useExitIntent = require('use-exit-intent');
var Cookies = _interopDefault(require('js-cookie'));
var uuid = require('uuid');
var mixpanel = _interopDefault(require('mixpanel-browser'));
var Sentry = require('@sentry/react');
var reactErrorBoundary = require('react-error-boundary');
var ReactDOM = _interopDefault(require('react-dom'));
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

var headers = {
  'Content-Type': 'application/json'
};
var hostname = 'https://target-engine-api.starship-staging.com';
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

var useCollectorMutation = function useCollectorMutation() {
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  return reactQuery.useMutation(function (data) {
    var _data$visitor;
    return request.post(hostname + '/collector/' + (data === null || data === void 0 ? void 0 : (_data$visitor = data.visitor) === null || _data$visitor === void 0 ? void 0 : _data$visitor.id), data).then(function (response) {
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

var useFingerprint = function useFingerprint() {
  return React.useContext(FingerprintContext);
};

var setCookie = function setCookie(name, value, expires) {
  return Cookies.set(name, value, {
    expires: expires || 365,
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
  return uuidValidateV4(id);
};

var bootstrapVisitor = function bootstrapVisitor(_ref) {
  var setVisitor = _ref.setVisitor;
  var visitor = {
    id: undefined
  };
  if (!getCookie('_cm_id') || !validVisitorId(getCookie('_cm_id'))) {
    var visitorId = uuid.v4();
    setCookie('_cm_id', visitorId, 365);
    visitor.id = visitorId;
    setVisitor(visitor);
    return;
  }
  if (getCookie('_cm_id')) {
    visitor.id = getCookie('_cm_id');
    setVisitor(visitor);
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
            setVisitor: setVisitor
          })).then(function () {});
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
    boot();
    log('VisitorProvider: booted', session, visitor);
  }, [appId, booted]);
  return React__default.createElement(VisitorContext.Provider, {
    value: {
      session: session,
      visitor: visitor
    }
  }, children);
};
var VisitorContext = React.createContext({
  session: {},
  visitor: {}
});
var useVisitor = function useVisitor() {
  return React.useContext(VisitorContext);
};

var MIXPANEL_TOKEN = 'd122fa924e1ea97d6b98569440c65a95';
var init = function init(cfg) {
  mixpanel.init(MIXPANEL_TOKEN, {
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
  React.useEffect(function () {
    if (!appId || !visitor.id) {
      return;
    }
    log('MixpanelProvider: booting');
    init({
      debug: true
    });
    log('MixpanelProvider: registering visitor ' + visitor.id + ' to mixpanel');
    mixpanel.identify(visitor.id);
  }, [appId, visitor === null || visitor === void 0 ? void 0 : visitor.id]);
  return React__default.createElement(MixpanelContext.Provider, {
    value: {
      trackEvent: trackEvent
    }
  }, children);
};
var MixpanelContext = React.createContext({
  trackEvent: function trackEvent() {}
});
var useMixpanel = function useMixpanel() {
  return React.useContext(MixpanelContext);
};

var idleStatusAfterMs = 5 * 1000;
var CollectorProvider = function CollectorProvider(_ref) {
  var children = _ref.children,
    handlers = _ref.handlers;
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  var _useFingerprint = useFingerprint(),
    appId = _useFingerprint.appId,
    booted = _useFingerprint.booted,
    initialDelay = _useFingerprint.initialDelay,
    exitIntentTriggers = _useFingerprint.exitIntentTriggers,
    idleTriggers = _useFingerprint.idleTriggers;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor;
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  var _useCollectorMutation = useCollectorMutation(),
    collect = _useCollectorMutation.mutateAsync;
  var _useExitIntent = useExitIntent.useExitIntent({
      cookie: {
        key: '_cm_exit',
        daysToExpire: 7
      }
    }),
    registerHandler = _useExitIntent.registerHandler;
  var _useState = React.useState(idleStatusAfterMs),
    idleTimeout = _useState[0],
    setIdleTimeout = _useState[1];
  var _useState2 = React.useState([]),
    pageTriggers = _useState2[0],
    setPageTriggers = _useState2[1];
  var _useState3 = React.useState(undefined),
    displayTrigger = _useState3[0],
    setDisplayTrigger = _useState3[1];
  var _useState4 = React.useState(null),
    timeoutId = _useState4[0],
    setTimeoutId = _useState4[1];
  var showTrigger = function showTrigger(displayTrigger) {
    if (!displayTrigger) {
      return null;
    }
    var trigger = pageTriggers.find(function (trigger) {
      return trigger.type === displayTrigger && (handlers === null || handlers === void 0 ? void 0 : handlers.find(function (handler) {
        return handler.behaviour === trigger.behaviour;
      }));
    });
    log('CollectorProvider: available triggers include: ', pageTriggers);
    log('CollectorProvider: attempting to show displayTrigger', displayTrigger, trigger);
    if (!trigger) {
      error('No trigger found for displayTrigger', displayTrigger);
      return null;
    }
    log('CollectorProvider: available handlers include: ', handlers);
    log('CollectorProvider: trigger to match is: ', trigger);
    var handler = handlers === null || handlers === void 0 ? void 0 : handlers.find(function (handler) {
      return handler.behaviour === trigger.behaviour;
    });
    log('CollectorProvider: attempting to show trigger', trigger, handler);
    if (!handler) {
      error('No handler found for trigger', trigger);
      return null;
    }
    if (!handler.invoke) {
      error('No invoke method found for handler', handler);
      return null;
    }
    trackEvent('trigger_displayed', {
      triggerId: trigger.id,
      triggerType: trigger.type,
      triggerBehaviour: trigger.behaviour
    });
    return handler.invoke(trigger);
  };
  var fireIdleTrigger = React.useCallback(function () {
    if (displayTrigger) return;
    if (!idleTriggers) return;
    log('CollectorProvider: attempting to fire idle trigger', displayTrigger);
    setDisplayTrigger('idle');
  }, [pageTriggers, displayTrigger]);
  var fireExitTrigger = React.useCallback(function () {
    if (displayTrigger) return;
    log('CollectorProvider: attempting to fire exit trigger', displayTrigger);
    setDisplayTrigger('exit');
  }, []);
  React.useEffect(function () {
    if (!exitIntentTriggers) return;
    log('CollectorProvider: attempting to register exit trigger', displayTrigger);
    registerHandler({
      id: 'clientTrigger',
      handler: fireExitTrigger
    });
  }, []);
  var resetDisplayTrigger = React.useCallback(function () {
    log('CollectorProvider: resetting displayTrigger');
    setDisplayTrigger(undefined);
  }, []);
  React.useEffect(function () {
    if (!booted) {
      log('CollectorProvider: Not yet collecting, awaiting boot');
      return;
    }
    var delay = setTimeout(function () {
      if (!visitor.id) {
        log('CollectorProvider: Not yet collecting, awaiting visitor ID');
        return;
      }
      log('CollectorProvider: collecting data');
      var params = new URLSearchParams(window.location.search).toString().split('&').reduce(function (acc, cur) {
        var _cur$split = cur.split('='),
          key = _cur$split[0],
          value = _cur$split[1];
        if (!key) return acc;
        acc[key] = value;
        return acc;
      }, {});
      collect({
        appId: appId,
        visitor: visitor,
        page: {
          url: window.location.href,
          path: window.location.pathname,
          title: document.title,
          params: params
        },
        referrer: {
          url: document.referrer,
          title: '',
          utm: {
            source: params === null || params === void 0 ? void 0 : params.utm_source,
            medium: params === null || params === void 0 ? void 0 : params.utm_medium,
            campaign: params === null || params === void 0 ? void 0 : params.utm_campaign,
            term: params === null || params === void 0 ? void 0 : params.utm_term,
            content: params === null || params === void 0 ? void 0 : params.utm_content
          }
        }
      }).then(function (response) {
        log('Sent collector data, retrieved:', response);
        setIdleTimeout(idleStatusAfterMs);
        setPageTriggers(response.pageTriggers);
        if (!response.intently) {
          log('CollectorProvider: user is in Fingerprint cohort');
        } else {
          log('CollectorProvider: user is in Intently cohort');
        }
      })["catch"](function (err) {
        error('failed to store collected data', err);
      });
      log('CollectorProvider: collected data');
    }, initialDelay);
    return function () {
      clearTimeout(delay);
    };
  }, [booted, visitor]);
  React.useEffect(function () {
    if (!timeoutId) return;
    return function () {
      return clearTimeout(timeoutId);
    };
  }, [timeoutId]);
  var renderedTrigger = React__default.useMemo(function () {
    return showTrigger(displayTrigger);
  }, [showTrigger, displayTrigger]);
  return React__default.createElement(reactIdleTimer.IdleTimerProvider, {
    timeout: idleTimeout,
    onPresenceChange: function onPresenceChange(presence) {
      if (presence.type === 'active') {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      log('presence changed', presence);
    },
    onIdle: fireIdleTrigger
  }, React__default.createElement(CollectorContext.Provider, {
    value: {
      resetDisplayTrigger: resetDisplayTrigger
    }
  }, children, renderedTrigger));
};
var CollectorContext = React.createContext({
  resetDisplayTrigger: function resetDisplayTrigger() {}
});

var useCollector = function useCollector() {
  return React.useContext(CollectorContext);
};

var Modal = function Modal(_ref) {
  var _trigger$brand, _trigger$brand2, _trigger$brand3, _trigger$brand4, _trigger$brand5, _trigger$data, _trigger$brand6, _trigger$data2, _trigger$brand7, _trigger$brand8, _trigger$data5;
  var trigger = _ref.trigger;
  var _useCollector = useCollector(),
    resetDisplayTrigger = _useCollector.resetDisplayTrigger;
  var _useState = React.useState(true),
    open = _useState[0],
    setOpen = _useState[1];
  var closeModal = function closeModal() {
    setOpen(false);
    resetDisplayTrigger();
  };
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
    onClick: closeModal,
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
  }, "\xD7"), React__default.createElement("h1", {
    style: {
      textAlign: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
      marginTop: '1rem',
      color: trigger === null || trigger === void 0 ? void 0 : (_trigger$brand5 = trigger.brand) === null || _trigger$brand5 === void 0 ? void 0 : _trigger$brand5.fontColor,
      textShadow: '0 1px 2px rgba(0,0,0,0.5)'
    }
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.text), React__default.createElement("p", {
    style: {
      textAlign: 'center',
      fontSize: '1.5rem',
      color: trigger === null || trigger === void 0 ? void 0 : (_trigger$brand6 = trigger.brand) === null || _trigger$brand6 === void 0 ? void 0 : _trigger$brand6.fontColor,
      fontWeight: 500,
      marginTop: '1rem',
      textShadow: '0 1px 2px rgba(0,0,0,0.5)'
    }
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.message), React__default.createElement("div", {
    style: {
      padding: '2rem 2rem 1rem'
    }
  }, React__default.createElement("button", {
    onClick: function onClick() {
      var _trigger$data3, _trigger$data4;
      trigger !== null && trigger !== void 0 && (_trigger$data3 = trigger.data) !== null && _trigger$data3 !== void 0 && _trigger$data3.url ? window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.url) : setOpen(false);
    },
    style: {
      display: 'block',
      color: trigger === null || trigger === void 0 ? void 0 : (_trigger$brand7 = trigger.brand) === null || _trigger$brand7 === void 0 ? void 0 : _trigger$brand7.primaryColor,
      backgroundColor: trigger === null || trigger === void 0 ? void 0 : (_trigger$brand8 = trigger.brand) === null || _trigger$brand8 === void 0 ? void 0 : _trigger$brand8.fontColor,
      fontSize: '1.5rem',
      width: '100%',
      padding: '1rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 2px rgba(0,0,0,0.5)'
    }
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.button)))));
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

var clientHandlers = [{
  id: 'modal_v1',
  behaviour: 'modal',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerModal, {
      trigger: trigger
    });
  }
}, {
  id: 'youtube_v1',
  behaviour: 'youtube',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerYoutube, {
      trigger: trigger
    });
  }
}, {
  id: 'inverse_v1',
  behaviour: 'inverse_flow',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerInverse, {
      trigger: trigger
    });
  }
}];

Sentry.init({
  dsn: 'https://129339f9b28f958328e76d62fb3f0b2b@o1282674.ingest.sentry.io/4505641419014144',
  integrations: [new Sentry.BrowserTracing({
    tracePropagationTargets: ['localhost:8000', 'https:yourserver.io/api/']
  })],
  tracesSampleRate: 1.0
});
var queryClient = new reactQuery.QueryClient();
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
    idleTriggers = _ref$idleTriggers === void 0 ? true : _ref$idleTriggers;
  var _useState = React.useState(consent),
    consentGiven = _useState[0],
    setConsentGiven = _useState[1];
  var _useState2 = React.useState(false),
    booted = _useState2[0],
    setBooted = _useState2[1];
  var _useState3 = React.useState(defaultHandlers || clientHandlers),
    handlers = _useState3[0],
    setHandlers = _useState3[1];
  var registerHandler = React__default.useCallback(function (trigger) {
    setHandlers(function (handlers) {
      return [].concat(handlers, [trigger]);
    });
  }, [setHandlers]);
  React.useEffect(function () {
    if (consent) {
      setConsentGiven(consent);
      return;
    }
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
  React.useEffect(function () {
    if (!appId) {
      throw new Error('C&M Fingerprint: appId is required');
    }
    if (booted) {
      return;
    }
    if (!consentGiven) {
      return;
    }
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
  return React__default.createElement(Sentry.ErrorBoundary, {
    fallback: React__default.createElement("p", null, "An error with Fingerprint has occurred."),
    onError: function onError(error, info) {
      return console.error(error, info);
    }
  }, React__default.createElement(LoggingProvider, {
    debug: debug
  }, React__default.createElement(reactQuery.QueryClientProvider, {
    client: queryClient
  }, React__default.createElement(FingerprintContext.Provider, {
    value: {
      appId: appId,
      booted: booted,
      currentTrigger: {},
      registerHandler: registerHandler,
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
      exitIntentTriggers: exitIntentTriggers
    }
  }, React__default.createElement(VisitorProvider, null, React__default.createElement(MixpanelProvider, null, React__default.createElement(CollectorProvider, {
    handlers: handlers
  }, React__default.createElement(reactErrorBoundary.ErrorBoundary, {
    onError: function onError(error, info) {
      return console.error(error, info);
    },
    fallback: React__default.createElement("div", null, "An application error occurred.")
  }, children))))))));
};
var defaultFingerprintState = {
  appId: '',
  booted: false,
  consent: false,
  currentTrigger: {},
  exitIntentTriggers: false,
  idleTriggers: false,
  initialDelay: 0,
  registerHandler: function registerHandler() {},
  trackEvent: function trackEvent() {},
  trackPageView: function trackPageView() {},
  unregisterHandler: function unregisterHandler() {}
};
var FingerprintContext = React.createContext(_extends({}, defaultFingerprintState));

exports.FingerprintContext = FingerprintContext;
exports.FingerprintProvider = FingerprintProvider;
exports.onCookieChanged = onCookieChanged;
exports.useFingerprint = useFingerprint;
//# sourceMappingURL=index.js.map

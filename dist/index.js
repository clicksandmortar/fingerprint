function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactQuery = require('@tanstack/react-query');
var reactIdleTimer = require('react-idle-timer');
var useExitIntent = require('use-exit-intent');
var Cookies = _interopDefault(require('js-cookie'));
var uuid = require('uuid');
var mixpanel = _interopDefault(require('mixpanel-browser'));
var reactDeviceDetect = require('react-device-detect');
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
        daysToExpire: 0
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
  var _useState5 = React.useState(false),
    intently = _useState5[0],
    setIntently = _useState5[1];
  console.log('current pageTrigger', pageTriggers);
  log('CollectorProvider: user is on mobile?', reactDeviceDetect.isMobile);
  React.useEffect(function () {
    if (intently) return;
    log('CollectorProvider: removing intently overlay');
    var runningInterval = setInterval(function () {
      var children = document.querySelectorAll('div[id=smc-v5-overlay-106412]');
      Array.prototype.forEach.call(children, function (node) {
        node.parentNode.removeChild(node);
        log('CollectorProvider: successfully removed intently overlay');
        clearInterval(runningInterval);
      });
    }, 100);
    return function () {
      clearInterval(runningInterval);
    };
  }, [intently]);
  var showTrigger = function showTrigger(displayTrigger) {
    if (!displayTrigger) {
      return null;
    }
    var trigger = pageTriggers.find(function (trigger) {
      return trigger.invocation === displayTrigger && (handlers === null || handlers === void 0 ? void 0 : handlers.find(function (handler) {
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
      triggerType: trigger.invocation,
      triggerBehaviour: trigger.behaviour
    });
    return handler.invoke(trigger);
  };
  var fireIdleTrigger = React.useCallback(function () {
    if (displayTrigger) return;
    if (!idleTriggers) return;
    log('CollectorProvider: attempting to fire idle trigger');
    setDisplayTrigger('INVOCATION_IDLE_TIME');
  }, [pageTriggers, displayTrigger]);
  var fireExitTrigger = React.useCallback(function () {
    log('CollectorProvider: attempting to fire exit trigger');
    setDisplayTrigger('INVOCATION_EXIT_INTENT');
  }, []);
  React.useEffect(function () {
    if (!exitIntentTriggers) return;
    if (reactDeviceDetect.isMobile) return;
    log('CollectorProvider: attempting to register exit trigger');
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
        try {
          return Promise.resolve(response.json()).then(function (payload) {
            var _payload$pageTriggers;
            log('Sent collector data, retrieved:', payload);
            setIdleTimeout(idleStatusAfterMs);
            setPageTriggers((payload === null || payload === void 0 ? void 0 : (_payload$pageTriggers = payload.pageTriggers) === null || _payload$pageTriggers === void 0 ? void 0 : _payload$pageTriggers.filter(function (trigger) {
              return reactDeviceDetect.isMobile && trigger.invocation === 'INVOCATION_IDLE_TIME' || !reactDeviceDetect.isMobile && trigger.invocation === 'INVOCATION_EXIT_INTENT';
            })) || []);
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
  var setTrigger = function setTrigger(trigger) {
    log('CollectorProvider: manually setting trigger', trigger);
    setPageTriggers([].concat(pageTriggers, [trigger]));
    setDisplayTrigger(trigger.invocation);
  };
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
      resetDisplayTrigger: resetDisplayTrigger,
      setTrigger: setTrigger
    }
  }, children, renderedTrigger));
};
var CollectorContext = React.createContext({
  resetDisplayTrigger: function resetDisplayTrigger() {},
  setTrigger: function setTrigger() {}
});

var useCollector = function useCollector() {
  return React.useContext(CollectorContext);
};

var Modal = function Modal(_ref) {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data6;
  var trigger = _ref.trigger;
  var _useCollector = useCollector(),
    resetDisplayTrigger = _useCollector.resetDisplayTrigger;
  var _useState = React.useState(true),
    open = _useState[0],
    setOpen = _useState[1];
  var _useState2 = React.useState(false),
    stylesLoaded = _useState2[0],
    setStylesLoaded = _useState2[1];
  var closeModal = function closeModal() {
    resetDisplayTrigger();
    setOpen(false);
  };
  React.useEffect(function () {
    var css = "\n  @charset \"UTF-8\";\n  @import \"https://fonts.smct.co/Din/font.css\";\n  .variant-bg,\n  .variant-overlay-outer,\n  .variant-bar,\n  .variant-final-message,\n  .variant-success-message {\n    display: none;\n    font-family: Gotham, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  }\n  .variant-bg,\n  .variant-bar {\n    z-index: 99999999999;\n  }\n  .variant-bar,\n  .variant-handle,\n  .variant-final-message,\n  .variant-success-message-inner,\n  .variant-overlay-inner {\n    background-color: rgba(0, 0, 0, 1);\n  }\n  .variant-bar,\n  .variant-option,\n  .variant-handle,\n  .variant-final-message,\n  .variant-text-outer > .variant-text,\n  a.variant-link {\n    color: #fff;\n  }\n  .variant-bg,\n  .variant-bg * {\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n  }\n  .variant-bg * {\n    line-height: 100%;\n  }\n  .variant-overlay-inner,\n  .variant-input,\n  .variant-text,\n  .variant-text-outer,\n  .variant-item,\n  .variant-progress,\n  .variant-panel .variant-bg,\n  .variant-handle > span,\n  .variant-loader,\n  .variant-loader-single,\n  .variant-loader-double,\n  .variant-option,\n  .variant-long-close {\n    display: block;\n  }\n  .variant-text-outer,\n  .variant-option {\n    width: 50%;\n    min-width: 280px;\n    margin: auto;\n  }\n  .variant-input {\n    background-color: rgba(255, 255, 255, 0.8);\n  }\n  .variant-bg {\n    background-color: rgba(0, 0, 0, 0.6);\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    overflow-y: scroll;\n  }\n  .variant-overlay-outer {\n    position: relative;\n    transition: height 0.2s ease;\n  }\n  .variant-overlay-inner {\n    width: 700px;\n    min-height: 400px;\n    position: relative;\n    margin: 10% auto;\n    transition: all 0.2s ease;\n    padding: 10px 10px 30px;\n    min-width: 300px;\n  }\n  .variant-close {\n    border-radius: 50%;\n    color: #333;\n    cursor: pointer;\n    display: block;\n    font-size: 20px;\n    font-weight: 700;\n    height: 30px;\n    line-height: 30px;\n    position: absolute;\n    right: 10px;\n    text-align: center;\n    top: 10px;\n    width: 30px;\n    z-index: 100;\n  }\n  .variant-close a {\n    font-family: Gotham, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  }\n  .variant-close:hover {\n    background-color: rgba(255, 255, 255, 0.3);\n  }\n  .variant-close-safe {\n    text-shadow: 1px 1px 1px #000;\n    color: #fff;\n    width: 100%;\n    text-align: center;\n    cursor: pointer;\n    display: none;\n    position: fixed;\n    bottom: 30px;\n    left: 0;\n  }\n  .variant-close-safe a {\n    color: #fff !important;\n  }\n  .variant-closer {\n    cursor: pointer;\n  }\n  .variant-long-close {\n    font-size: 14px;\n    position: absolute;\n    bottom: 10px;\n    width: 100%;\n    left: 0;\n    text-align: center;\n  }\n  .variant-long-close a.variant-link {\n    width: auto;\n  }\n  a.variant-link {\n    display: inline-block;\n    text-decoration: none;\n    height: 100%;\n    width: 100%;\n  }\n  .variant-input,\n  .variant-button,\n  .variant-reveal {\n    width: 100%;\n  }\n  .variant-button,\n  .variant-cover {\n    background: #333;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n  }\n  .variant-input {\n    color: #000;\n    text-align: center;\n    border: 1px solid #333;\n    margin: 10px auto;\n    padding: 10px;\n  }\n  .variant-input::-webkit-input-placeholder,\n  .variant-input:-moz-placeholder,\n  .variant-input::-moz-placeholder,\n  .variant-input:-ms-input-placeholder {\n    color: #ccc;\n    text-transform: uppercase;\n  }\n  .variant-input:focus {\n    outline: none;\n  }\n  .variant-button {\n    border: medium none;\n    color: #fff;\n    outline: medium none;\n    display: block;\n    margin: 10px auto;\n    font-size: 20px;\n    padding: 10px;\n    cursor: pointer;\n  }\n  .variant-reveal {\n    display: block;\n    margin: 10px auto;\n    position: relative;\n    text-align: center;\n  }\n  .variant-cover,\n  .variant-code {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    padding: 10px;\n    font-size: 20px;\n  }\n  .variant-cover {\n    z-index: 2;\n    color: #fff;\n    padding: 11px;\n    cursor: pointer;\n  }\n  .variant-button:hover,\n  .variant-cover:hover {\n    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);\n  }\n  .variant-code {\n    z-index: 1;\n    border: 1px solid #333;\n    background: rgba(255, 255, 255, 0.8);\n    color: #333;\n    font-weight: 700;\n    -moz-user-select: text;\n    -webkit-user-select: text;\n    -ms-user-select: text;\n    user-select: text;\n  }\n  .variant-text {\n    text-align: center;\n    font-size: 20px;\n  }\n  .variant-text2 {\n    font-size: 40px;\n    font-weight: 700;\n  }\n  .variant-img-outer {\n    position: relative;\n    width: 100%;\n    display: block;\n  }\n  .variant-img {\n    display: block;\n    width: 100%;\n  }\n  .variant-img img {\n    border: medium none;\n    display: block;\n    margin: auto;\n    outline: medium none;\n    max-width: 100%;\n  }\n  .variant-clearfix:after {\n    visibility: hidden;\n    display: block;\n    font-size: 0;\n    content: \" \";\n    clear: both;\n    height: 0;\n  }\n  .variant-clearfix {\n    display: inline-block;\n    height: 1%;\n    display: block;\n  }\n  .variant-item {\n    height: 80px;\n    padding: 10px;\n    border-bottom: 1px dashed #ccc;\n  }\n  .variant-item .variant-item-img {\n    display: inline-block;\n    text-align: center;\n  }\n  .variant-item .variant-item-img img {\n    max-width: 60px;\n    max-height: 60px;\n  }\n  .variant-item .variant-title {\n    font-weight: 700;\n    display: inline-block;\n  }\n  .variant-item .variant-price {\n    display: inline-block;\n  }\n  .variant-item .variant-qty {\n    display: inline-block;\n  }\n  .variant-progress {\n    background-color: rgba(0, 0, 0, 0.1);\n    border-radius: 0;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;\n    height: 21px;\n    margin-bottom: 21px;\n    overflow: hidden;\n    width: 100%;\n  }\n  .variant-progress-bar {\n    background-color: #007932;\n    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15) inset;\n    color: #fff;\n    float: left;\n    font-size: 12px;\n    height: 100%;\n    line-height: 21px;\n    text-align: center;\n    transition: width 0.6s ease 0s;\n    width: 0;\n  }\n  .variant-progress .variant-progress-bar {\n    background-image: linear-gradient(\n      45deg,\n      rgba(255, 255, 255, 0.15) 25%,\n      transparent 25%,\n      transparent 50%,\n      rgba(255, 255, 255, 0.15) 50%,\n      rgba(255, 255, 255, 0.15) 75%,\n      transparent 75%,\n      transparent\n    );\n    background-size: 40px 40px;\n    animation: 0.5s linear 0s normal none infinite running\n      .variant-progress-bar-stripes;\n  }\n  @-webkit-keyframes .variant-progress-bar-stripes {\n    from {\n      background-position: 40px 0;\n    }\n    to {\n      background-position: 0 0;\n    }\n  }\n  @-o-keyframes .variant-progress-bar-stripes {\n    from {\n      background-position: 40px 0;\n    }\n    to {\n      background-position: 0 0;\n    }\n  }\n  @keyframes .variant-progress-bar-stripes {\n    from {\n      background-position: 40px 0;\n    }\n    to {\n      background-position: 0 0;\n    }\n  }\n  .variant-overlay {\n    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;\n  }\n  .variant-overlay:before,\n  .variant-overlay:after {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);\n    top: 0;\n    bottom: 0;\n    left: 10px;\n    right: 10px;\n    border-radius: 100px / 10px;\n  }\n  .variant-overlay:after {\n    right: 10px;\n    left: auto;\n    transform: skew(8deg) rotate(3deg);\n  }\n  .variant-panel .variant-bg {\n    width: 0;\n    height: 100%;\n    position: fixed;\n    z-index: 1001;\n    top: 0;\n    background-color: #111;\n    padding: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    color: #fff;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    transition: width 0.5s;\n  }\n  .variant-panel-body-cover {\n    position: fixed;\n    z-index: 1000;\n    background-color: rgba(0, 0, 0, 0.5);\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    display: none;\n  }\n  .variant-panel.variant-panel-left .variant-bg {\n    right: auto;\n  }\n  .variant-panel.variant-panel-right .variant-bg {\n    left: auto;\n  }\n  .variant-panel .variant-overlay-inner {\n    width: 90%;\n  }\n  .variant-input-group {\n    display: block;\n    text-align: center;\n  }\n  .variant-input-group input[type=\"checkbox\"],\n  .variant-input-group input[type=\"radio\"] {\n    margin-right: 3px;\n    margin-left: 10px;\n  }\n  .variant-input-error ::-webkit-input-placeholder,\n  .variant-input-error :-moz-placeholder,\n  .variant-input-error ::-moz-placeholder,\n  .variant-input-error :-ms-input-placeholder {\n    color: #d30003;\n  }\n  .variant-input-error label {\n    color: #d30003;\n  }\n  .variant-input-error input,\n  .variant-input-error select,\n  .variant-input-error textarea {\n    border-color: #d30003;\n  }\n  .variant-bar,\n  .variant-handle {\n    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.3);\n    border-bottom-left-radius: 3px;\n    border-bottom-right-radius: 3px;\n  }\n  .variant-bar {\n    display: none;\n    position: fixed;\n    top: 0;\n    left: 25%;\n    right: 25%;\n    width: 50%;\n    font-weight: 700;\n    font-size: 16px;\n    text-shadow: none;\n    text-align: center;\n    height: 30px;\n    line-height: 30px;\n    padding: 0 20px;\n  }\n  @media (max-width: 500px) {\n    .variant-bar {\n      width: 80%;\n      left: 10%;\n    }\n  }\n  .variant-bar-close {\n    cursor: pointer;\n    height: 10px;\n    line-height: 10px;\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    width: 10px;\n  }\n  .variant-handle {\n    position: absolute;\n    width: 50px;\n    margin-left: -25px;\n    height: 20px;\n    left: 50%;\n    bottom: -20px;\n    cursor: pointer;\n    line-height: 12px;\n    letter-spacing: -2px;\n  }\n  .variant-handle > span {\n    position: absolute;\n    width: 60%;\n    left: 20%;\n    height: 2px;\n    background: #fff;\n  }\n  .variant-bar1 {\n    top: 20%;\n  }\n  .variant-bar2 {\n    top: 40%;\n  }\n  .variant-bar3 {\n    top: 60%;\n  }\n  .variant-arrow-up {\n    width: 0;\n    height: 0;\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-bottom: 5px solid #000;\n  }\n  .variant-arrow-down {\n    width: 0;\n    height: 0;\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-top: 5px solid #000;\n  }\n  .variant-arrow-right {\n    width: 0;\n    height: 0;\n    border-top: 5px solid transparent;\n    border-bottom: 5px solid transparent;\n    border-left: 5px solid #000;\n  }\n  .variant-arrow-left {\n    width: 0;\n    height: 0;\n    border-top: 5px solid transparent;\n    border-bottom: 5px solid transparent;\n    border-right: 5px solid #000;\n  }\n  .variant-preview {\n    position: fixed;\n    top: 20px;\n    left: 50%;\n    margin-left: -160px;\n    width: 320px;\n    padding: 5px 10px;\n    background: #ff0;\n    color: #000;\n    font-family: Gotham, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 12px;\n    text-align: center;\n    border-radius: 5px;\n    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);\n    cursor: pointer;\n  }\n  .variant-preview-close {\n    font-size: 7px;\n    height: 3px;\n    position: absolute;\n    right: 4px;\n    top: 0;\n    width: 3px;\n  }\n  .variant-preview .variant-arrow-up {\n    position: absolute;\n    top: -20px;\n    left: 50%;\n    margin-left: -10px;\n    border-left: 20px solid transparent;\n    border-right: 20px solid transparent;\n    border-bottom: 20px solid #ff0;\n  }\n  .variant-notices {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    transition: height 0.3s ease;\n  }\n  .variant-notice-box {\n    padding: 5px 10px;\n    background: #ec6952;\n    font-size: 12px;\n    text-align: left;\n    border-radius: 5px;\n    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);\n    cursor: pointer;\n    min-height: 30px;\n    min-width: 100px;\n    max-width: 500px;\n    width: auto;\n    margin-bottom: 5px;\n    color: #fff;\n    float: right;\n    clear: both;\n    z-index: 100;\n    transition: all 0.5s ease;\n    overflow: hidden;\n  }\n  .variant-notice-box.success {\n    background: #24a233;\n  }\n  .variant-notice-box.warning {\n    background: #cf9d0f;\n  }\n  .variant-notice-box.danger {\n    background: #d30003;\n  }\n  @media screen {\n    .variant-preloader {\n      position: fixed;\n      left: -9999px;\n      top: -9999px;\n    }\n    .variant-preloader img {\n      display: block;\n    }\n  }\n  @media print {\n    .variant-preloader,\n    .variant-preloader img {\n      visibility: hidden;\n      display: none;\n    }\n  }\n  .variant-final-message {\n    border-radius: 2px;\n    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);\n    bottom: 10px;\n    font-size: 16px;\n    padding: 10px 20px;\n    position: fixed;\n    right: 10px;\n    z-index: 1e15;\n  }\n  .variant-final-message-close {\n    position: absolute;\n    top: 3px;\n    right: 1px;\n    width: 10px;\n    height: 10px;\n    cursor: pointer;\n    font-size: 10px;\n    opacity: 0.5;\n  }\n  .variant-final-message .variant-select {\n    font-weight: 700;\n  }\n  .variant-final-message:hover .variant-final-message-close {\n    opacity: 1;\n  }\n  .variant-success-message {\n    position: absolute;\n    width: 100%;\n    background: rgba(0, 0, 0, 0.5);\n    height: 100%;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: center;\n  }\n  .variant-success-message-inner {\n    background: #08ad00 none repeat scroll 0 0;\n    border-radius: 5px;\n    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);\n    color: #fff;\n    display: inline-block;\n    font-size: 30px;\n    margin: 20% auto auto;\n    padding: 10px 30px;\n    position: relative;\n  }\n  .variant-success-close {\n    position: absolute;\n    top: 5px;\n    right: 5px;\n    cursor: pointer;\n    font-size: 12px;\n  }\n  @-webkit-keyframes .variant-spin {\n    0% {\n      -webkit-transform: rotate(0deg);\n      transform: rotate(0deg);\n    }\n    100% {\n      -webkit-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }\n  @keyframes .variant-spin {\n    0% {\n      -webkit-transform: rotate(0deg);\n      transform: rotate(0deg);\n    }\n    100% {\n      -webkit-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }\n  @-webkit-keyframes .variant-pulse {\n    50% {\n      background: #fff;\n    }\n  }\n  @keyframes .variant-pulse {\n    50% {\n      background: #fff;\n    }\n  }\n  .variant-loader-bg,\n  .variant-dc-placeholder {\n    position: absolute;\n    top: 10%;\n    left: 50%;\n    background: rgba(0, 0, 0, 0.8);\n    width: 60px;\n    margin-left: -30px;\n    height: 60px;\n    z-index: 10;\n    border-radius: 10px;\n    display: none;\n  }\n  .variant-loader,\n  .variant-loader-single,\n  .variant-loader-double {\n    border-radius: 50%;\n    width: 50px;\n    height: 50px;\n    margin: 5px;\n    border: 0.25rem solid rgba(255, 255, 255, 0.2);\n    border-top-color: #fff;\n    -webkit-animation: variant-spin 1s infinite linear;\n    animation: variant-spin 1s infinite linear;\n  }\n  .variant-loader-double {\n    border-style: double;\n    border-width: 0.5rem;\n  }\n  .variant-loader-pulse {\n    -webkit-animation: variant-pulse 750ms infinite;\n    animation: variant-pulse 750ms infinite;\n    -webkit-animation-delay: 250ms;\n    animation-delay: 250ms;\n    height: 30px;\n    left: 25px;\n    position: absolute;\n    top: 14px;\n    width: 10px;\n  }\n  .variant-loader-pulse:before,\n  .variant-loader-pulse:after {\n    content: \"\";\n    position: absolute;\n    display: block;\n    height: 16px;\n    width: 6px;\n    top: 50%;\n    background: rgba(255, 255, 255, 0.2);\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    -webkit-animation: variant-pulse 750ms infinite;\n    animation: variant-pulse 750ms infinite;\n  }\n  .variant-loader-pulse:before {\n    left: -12px;\n  }\n  .variant-loader-pulse:after {\n    left: 16px;\n    -webkit-animation-delay: 500ms;\n    animation-delay: 500ms;\n  }\n  .variant-loader-bg[data-theme=\"white\"],\n  .variant-dc-placeholder {\n    background: rgba(255, 255, 255, 0.8);\n  }\n  .variant-loader-bg[data-theme=\"white\"] .variant-loader-single,\n  .variant-dc-placeholder .variant-loader-single,\n  .variant-loader-bg[data-theme=\"white\"] .variant-loader-double,\n  .variant-dc-placeholder .variant-loader-double,\n  .variant-loader-bg[data-theme=\"white\"] .variant-loader-pulse,\n  .variant-dc-placeholder .variant-loader-pulse {\n    border-color: rgba(0, 0, 0, 0.2);\n    border-top-color: #000;\n  }\n  .variant-terms {\n    background-color: #fff;\n    border: 1px solid #333;\n    border-radius: 3px;\n    bottom: 5%;\n    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);\n    left: 5%;\n    padding: 10px;\n    position: absolute;\n    right: 5%;\n    top: 5%;\n    z-index: 101;\n    display: none;\n  }\n  .variant-terms-header,\n  .variant-terms-para,\n  .variant-terms-close,\n  .variant-terms-close-x {\n    color: #333;\n    display: block;\n  }\n  .variant-terms-scroller {\n    position: absolute;\n    top: 10px;\n    left: 10px;\n    right: 10px;\n    bottom: 30px;\n    overflow: auto;\n  }\n  .variant-terms-header {\n    font-size: 20px;\n    font-weight: 700;\n    margin: 5px 0;\n    text-align: center;\n  }\n  .variant-terms-para {\n    margin: 5px 0;\n    font-size: 12px;\n  }\n  .variant-terms-close {\n    bottom: 10px;\n    cursor: pointer;\n    left: 10px;\n    position: absolute;\n    right: 10px;\n    text-align: center;\n  }\n  .variant-show-terms,\n  .variant-show-terms {\n    text-decoration: underline;\n    cursor: pointer;\n  }\n  .variant-terms[data-theme=\"dark\"] {\n    background-color: #333;\n  }\n  .variant-terms[data-theme=\"dark\"] .variant-terms-header,\n  .variant-terms[data-theme=\"dark\"] .variant-terms-para,\n  .variant-terms[data-theme=\"dark\"] .variant-terms-close,\n  .variant-terms[data-theme=\"dark\"] .variant-terms-close-x {\n    color: #fff;\n  }\n  .variant-terms-close-x {\n    position: absolute;\n    top: 5px;\n    right: 5px;\n    cursor: pointer;\n    opacity: 0.7;\n    -webkit-transition: all 0.25s ease-in-out;\n    -ms-transition: all 0.25s ease-in-out;\n    -o-transition: all 0.25s ease-in-out;\n    -moz-transition: all 0.25s ease-in-out;\n    transition: transform all 0.25s ease-in-out;\n  }\n  .variant-terms-close-x:hover {\n    opacity: 1;\n    -webkit-transform: rotate(180deg) scale(1.3);\n    -ms-transform: rotate(180deg) scale(1.3);\n    -o-transform: rotate(180deg) scale(1.3);\n    -moz-transform: rotate(180deg) scale(1.3);\n    transform: rotate(180deg) scale(1.3);\n  }\n  .variant-cp {\n    -youbkit-touch-callout: none;\n    -youbkit-user-select: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n  }\n  .variant-cp,\n  .variant-cp-msg {\n    display: none;\n  }\n  .variant-hidden-consents {\n    opacity: 0;\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    width: 1px;\n    height: 1px;\n    visibility: hidden;\n  }\n  .variant-requestNotifications .variant-agree-yes,\n  .variant-requestNotifications .variant-agree-no {\n    display: none;\n  }\n  .variant-notices {\n    padding: 10px;\n    right: 20px;\n    left: auto;\n    max-width: 300px;\n    z-index: 100;\n  }\n  .variant-dc-placeholder {\n    display: block;\n    height: 30px;\n    width: 30px;\n    top: 3px;\n  }\n  .variant-dc-placeholder > * {\n    height: 20px;\n    width: 20px;\n  }\n  .variant-shake-msg {\n    display: none;\n  }\n  .variant-animated {\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-fill-mode: both;\n    animation-fill-mode: both;\n  }\n  .variant-animated.variant-infinite {\n    -webkit-animation-iteration-count: infinite;\n    animation-iteration-count: infinite;\n  }\n  .variant-animated.variant-hinge {\n    -webkit-animation-duration: 2s;\n    animation-duration: 2s;\n  }\n  .variant-animated.variant-bounceIn,\n  .variant-animated.variant-bounceOut,\n  .variant-animated.variant-flipOutX,\n  .variant-animated.variant-flipOutY {\n    -webkit-animation-duration: 0.75s;\n    animation-duration: 0.75s;\n  }\n  @-webkit-keyframes .variant-fadeIn {\n    0% {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n  @keyframes .variant-fadeIn {\n    0% {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n  .variant-fadeIn {\n    -webkit-animation-name: variant-fadeIn;\n    animation-name: variant-fadeIn;\n  }\n  @-webkit-keyframes .variant-bounceInDown {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -3000px, 0);\n      transform: translate3d(0, -3000px, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, 25px, 0);\n      transform: translate3d(0, 25px, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(0, -10px, 0);\n      transform: translate3d(0, -10px, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(0, 5px, 0);\n      transform: translate3d(0, 5px, 0);\n    }\n    to {\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  @keyframes .variant-bounceInDown {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -3000px, 0);\n      transform: translate3d(0, -3000px, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, 25px, 0);\n      transform: translate3d(0, 25px, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(0, -10px, 0);\n      transform: translate3d(0, -10px, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(0, 5px, 0);\n      transform: translate3d(0, 5px, 0);\n    }\n    to {\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  .variant-bounceInDown {\n    -webkit-animation-name: variant-bounceInDown;\n    animation-name: variant-bounceInDown;\n  }\n  .variant-animDelay2 {\n    -webkit-animation-delay: 0.2s !important;\n    -moz-animation-delay: 0.2s !important;\n    -ms-animation-delay: 0.2s !important;\n    -o-animation-delay: 0.2s !important;\n    animation-delay: 0.2s !important;\n  }\n  .variant-animDelay6 {\n    -webkit-animation-delay: 0.6s !important;\n    -moz-animation-delay: 0.6s !important;\n    -ms-animation-delay: 0.6s !important;\n    -o-animation-delay: 0.6s !important;\n    animation-delay: 0.6s !important;\n  }\n  @-webkit-keyframes .variant-bounceInRight {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(3000px, 0, 0);\n      transform: translate3d(3000px, 0, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(-25px, 0, 0);\n      transform: translate3d(-25px, 0, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(10px, 0, 0);\n      transform: translate3d(10px, 0, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(-5px, 0, 0);\n      transform: translate3d(-5px, 0, 0);\n    }\n    to {\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  @keyframes .variant-bounceInRight {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(3000px, 0, 0);\n      transform: translate3d(3000px, 0, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(-25px, 0, 0);\n      transform: translate3d(-25px, 0, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(10px, 0, 0);\n      transform: translate3d(10px, 0, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(-5px, 0, 0);\n      transform: translate3d(-5px, 0, 0);\n    }\n    to {\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  .variant-bounceInRight {\n    -webkit-animation-name: variant-bounceInRight;\n    animation-name: variant-bounceInRight;\n  }\n  .variant-animDelay8 {\n    -webkit-animation-delay: 0.8s !important;\n    -moz-animation-delay: 0.8s !important;\n    -ms-animation-delay: 0.8s !important;\n    -o-animation-delay: 0.8s !important;\n    animation-delay: 0.8s !important;\n  }\n  .variant-animDelay10 {\n    -webkit-animation-delay: 1s !important;\n    -moz-animation-delay: 1s !important;\n    -ms-animation-delay: 1s !important;\n    -o-animation-delay: 1s !important;\n    animation-delay: 1s !important;\n  }\n  .variant-animDelay12 {\n    -webkit-animation-delay: 1.2s !important;\n    -moz-animation-delay: 1.2s !important;\n    -ms-animation-delay: 1.2s !important;\n    -o-animation-delay: 1.2s !important;\n    animation-delay: 1.2s !important;\n  }\n  .variant-animDelay4 {\n    -webkit-animation-delay: 0.4s !important;\n    -moz-animation-delay: 0.4s !important;\n    -ms-animation-delay: 0.4s !important;\n    -o-animation-delay: 0.4s !important;\n    animation-delay: 0.4s !important;\n  }\n  @-webkit-keyframes .variant-bounceInLeft {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(-3000px, 0, 0);\n      transform: translate3d(-3000px, 0, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(25px, 0, 0);\n      transform: translate3d(25px, 0, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(-10px, 0, 0);\n      transform: translate3d(-10px, 0, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(5px, 0, 0);\n      transform: translate3d(5px, 0, 0);\n    }\n    to {\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  @keyframes .variant-bounceInLeft {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(-3000px, 0, 0);\n      transform: translate3d(-3000px, 0, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(25px, 0, 0);\n      transform: translate3d(25px, 0, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(-10px, 0, 0);\n      transform: translate3d(-10px, 0, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(5px, 0, 0);\n      transform: translate3d(5px, 0, 0);\n    }\n    to {\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  .variant-bounceInLeft {\n    -webkit-animation-name: variant-bounceInLeft;\n    animation-name: variant-bounceInLeft;\n  }\n  @-webkit-keyframes .variant-fadeInLeft {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(-100%, 0, 0);\n      transform: translate3d(-100%, 0, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  @keyframes .variant-fadeInLeft {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(-100%, 0, 0);\n      transform: translate3d(-100%, 0, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  .variant-fadeInLeft {\n    -webkit-animation-name: variant-fadeInLeft;\n    animation-name: variant-fadeInLeft;\n  }\n  @-webkit-keyframes .variant-fadeInRight {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(100%, 0, 0);\n      transform: translate3d(100%, 0, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  @keyframes .variant-fadeInRight {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(100%, 0, 0);\n      transform: translate3d(100%, 0, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  .variant-fadeInRight {\n    -webkit-animation-name: variant-fadeInRight;\n    animation-name: variant-fadeInRight;\n  }\n  @-webkit-keyframes .variant-bounceInUp {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 3000px, 0);\n      transform: translate3d(0, 3000px, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, -20px, 0);\n      transform: translate3d(0, -20px, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(0, 10px, 0);\n      transform: translate3d(0, 10px, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(0, -5px, 0);\n      transform: translate3d(0, -5px, 0);\n    }\n    to {\n      -webkit-transform: translateZ(0);\n      transform: translateZ(0);\n    }\n  }\n  @keyframes .variant-bounceInUp {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 3000px, 0);\n      transform: translate3d(0, 3000px, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, -20px, 0);\n      transform: translate3d(0, -20px, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(0, 10px, 0);\n      transform: translate3d(0, 10px, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(0, -5px, 0);\n      transform: translate3d(0, -5px, 0);\n    }\n    to {\n      -webkit-transform: translateZ(0);\n      transform: translateZ(0);\n    }\n  }\n  .variant-bounceInUp {\n    -webkit-animation-name: variant-bounceInUp;\n    animation-name: variant-bounceInUp;\n  }\n  .variant-animDelay7 {\n    -webkit-animation-delay: 0.7s !important;\n    -moz-animation-delay: 0.7s !important;\n    -ms-animation-delay: 0.7s !important;\n    -o-animation-delay: 0.7s !important;\n    animation-delay: 0.7s !important;\n  }\n  .variant-animDelay9 {\n    -webkit-animation-delay: 0.9s !important;\n    -moz-animation-delay: 0.9s !important;\n    -ms-animation-delay: 0.9s !important;\n    -o-animation-delay: 0.9s !important;\n    animation-delay: 0.9s !important;\n  }\n  @-webkit-keyframes .variant-fadeInUp {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 100%, 0);\n      transform: translate3d(0, 100%, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  @keyframes .variant-fadeInUp {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 100%, 0);\n      transform: translate3d(0, 100%, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  .variant-fadeInUp {\n    -webkit-animation-name: variant-fadeInUp;\n    animation-name: variant-fadeInUp;\n  }\n  .variant-animDelay14 {\n    -webkit-animation-delay: 1.4s !important;\n    -moz-animation-delay: 1.4s !important;\n    -ms-animation-delay: 1.4s !important;\n    -o-animation-delay: 1.4s !important;\n    animation-delay: 1.4s !important;\n  }\n  .variant-animDelay1 {\n    -webkit-animation-delay: 0.1s !important;\n    -moz-animation-delay: 0.1s !important;\n    -ms-animation-delay: 0.1s !important;\n    -o-animation-delay: 0.1s !important;\n    animation-delay: 0.1s !important;\n  }\n  @-webkit-keyframes .variant-fadeInDown {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -100%, 0);\n      transform: translate3d(0, -100%, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  @keyframes .variant-fadeInDown {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -100%, 0);\n      transform: translate3d(0, -100%, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  .variant-fadeInDown {\n    -webkit-animation-name: variant-fadeInDown;\n    animation-name: variant-fadeInDown;\n  }\n  @-webkit-keyframes .variant-fadeOutUp {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -100%, 0);\n      transform: translate3d(0, -100%, 0);\n    }\n  }\n  @keyframes .variant-fadeOutUp {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -100%, 0);\n      transform: translate3d(0, -100%, 0);\n    }\n  }\n  .variant-fadeOutUp {\n    -webkit-animation-name: variant-fadeOutUp;\n    animation-name: variant-fadeOutUp;\n  }\n  @-webkit-keyframes .variant-fadeOutDown {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 100%, 0);\n      transform: translate3d(0, 100%, 0);\n    }\n  }\n  @keyframes .variant-fadeOutDown {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 100%, 0);\n      transform: translate3d(0, 100%, 0);\n    }\n  }\n  .variant-fadeOutDown {\n    -webkit-animation-name: variant-fadeOutDown;\n    animation-name: variant-fadeOutDown;\n  }\n  @-webkit-keyframes .variant-fadeOut {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n    }\n  }\n  @keyframes .variant-fadeOut {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n    }\n  }\n  .variant-fadeOut {\n    -webkit-animation-name: variant-fadeOut;\n    animation-name: variant-fadeOut;\n  }\n  @-webkit-keyframes .variant-bounceOutUp {\n    20% {\n      -webkit-transform: translate3d(0, -10px, 0);\n      transform: translate3d(0, -10px, 0);\n    }\n    40%,\n    45% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, 20px, 0);\n      transform: translate3d(0, 20px, 0);\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -2000px, 0);\n      transform: translate3d(0, -2000px, 0);\n    }\n  }\n  @keyframes .variant-bounceOutUp {\n    20% {\n      -webkit-transform: translate3d(0, -10px, 0);\n      transform: translate3d(0, -10px, 0);\n    }\n    40%,\n    45% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, 20px, 0);\n      transform: translate3d(0, 20px, 0);\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -2000px, 0);\n      transform: translate3d(0, -2000px, 0);\n    }\n  }\n  .variant-bounceOutUp {\n    -webkit-animation-name: variant-bounceOutUp;\n    animation-name: variant-bounceOutUp;\n  }\n  @-webkit-keyframes .variant-bounceOutDown {\n    20% {\n      -webkit-transform: translate3d(0, 10px, 0);\n      transform: translate3d(0, 10px, 0);\n    }\n    40%,\n    45% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, -20px, 0);\n      transform: translate3d(0, -20px, 0);\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 2000px, 0);\n      transform: translate3d(0, 2000px, 0);\n    }\n  }\n  @keyframes .variant-bounceOutDown {\n    20% {\n      -webkit-transform: translate3d(0, 10px, 0);\n      transform: translate3d(0, 10px, 0);\n    }\n    40%,\n    45% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, -20px, 0);\n      transform: translate3d(0, -20px, 0);\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 2000px, 0);\n      transform: translate3d(0, 2000px, 0);\n    }\n  }\n  .variant-bounceOutDown {\n    -webkit-animation-name: variant-bounceOutDown;\n    animation-name: variant-bounceOutDown;\n  }\n  @-webkit-keyframes .variant-rubberBand {\n    0% {\n      -webkit-transform: scaleX(1);\n      transform: scaleX(1);\n    }\n    30% {\n      -webkit-transform: scale3d(1.25, 0.75, 1);\n      transform: scale3d(1.25, 0.75, 1);\n    }\n    40% {\n      -webkit-transform: scale3d(0.75, 1.25, 1);\n      transform: scale3d(0.75, 1.25, 1);\n    }\n    50% {\n      -webkit-transform: scale3d(1.15, 0.85, 1);\n      transform: scale3d(1.15, 0.85, 1);\n    }\n    65% {\n      -webkit-transform: scale3d(0.95, 1.05, 1);\n      transform: scale3d(0.95, 1.05, 1);\n    }\n    75% {\n      -webkit-transform: scale3d(1.05, 0.95, 1);\n      transform: scale3d(1.05, 0.95, 1);\n    }\n    to {\n      -webkit-transform: scaleX(1);\n      transform: scaleX(1);\n    }\n  }\n  @keyframes .variant-rubberBand {\n    0% {\n      -webkit-transform: scaleX(1);\n      transform: scaleX(1);\n    }\n    30% {\n      -webkit-transform: scale3d(1.25, 0.75, 1);\n      transform: scale3d(1.25, 0.75, 1);\n    }\n    40% {\n      -webkit-transform: scale3d(0.75, 1.25, 1);\n      transform: scale3d(0.75, 1.25, 1);\n    }\n    50% {\n      -webkit-transform: scale3d(1.15, 0.85, 1);\n      transform: scale3d(1.15, 0.85, 1);\n    }\n    65% {\n      -webkit-transform: scale3d(0.95, 1.05, 1);\n      transform: scale3d(0.95, 1.05, 1);\n    }\n    75% {\n      -webkit-transform: scale3d(1.05, 0.95, 1);\n      transform: scale3d(1.05, 0.95, 1);\n    }\n    to {\n      -webkit-transform: scaleX(1);\n      transform: scaleX(1);\n    }\n  }\n  .variant-rubberBand {\n    -webkit-animation-name: variant-rubberBand;\n    animation-name: variant-rubberBand;\n  }\n  @-webkit-keyframes .variant-shake {\n    0%,\n    to {\n      -webkit-transform: translateZ(0);\n      transform: translateZ(0);\n    }\n    10%,\n    30%,\n    50%,\n    70%,\n    90% {\n      -webkit-transform: translate3d(-10px, 0, 0);\n      transform: translate3d(-10px, 0, 0);\n    }\n    20%,\n    40%,\n    60%,\n    80% {\n      -webkit-transform: translate3d(10px, 0, 0);\n      transform: translate3d(10px, 0, 0);\n    }\n  }\n  @keyframes .variant-shake {\n    0%,\n    to {\n      -webkit-transform: translateZ(0);\n      transform: translateZ(0);\n    }\n    10%,\n    30%,\n    50%,\n    70%,\n    90% {\n      -webkit-transform: translate3d(-10px, 0, 0);\n      transform: translate3d(-10px, 0, 0);\n    }\n    20%,\n    40%,\n    60%,\n    80% {\n      -webkit-transform: translate3d(10px, 0, 0);\n      transform: translate3d(10px, 0, 0);\n    }\n  }\n  .variant-shake {\n    -webkit-animation-name: variant-shake;\n    animation-name: variant-shake;\n  }\n  @-webkit-keyframes .variant-rollOut {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(100%, 0, 0) rotate(120deg);\n      transform: translate3d(100%, 0, 0) rotate(120deg);\n    }\n  }\n  @keyframes .variant-rollOut {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(100%, 0, 0) rotate(120deg);\n      transform: translate3d(100%, 0, 0) rotate(120deg);\n    }\n  }\n  .variant-rollOut {\n    -webkit-animation-name: variant-rollOut;\n    animation-name: variant-rollOut;\n  }\n  .variant-bg * {\n    font-family: \"DINCompPro-CondMedium\";\n  }\n  .variant-overlay-inner {\n    background-size: cover;\n    width: 420px;\n    min-height: 520px;\n    border-radius: 5px;\n    padding-bottom: 0;\n    border: 2px solid #fff;\n  }\n  .variant-text-outer,\n  .variant-option {\n    width: 380px;\n    margin: auto;\n  }\n  .variant-text1,\n  .variant-text2 {\n    font-size: 26px;\n    font-weight: 400;\n    margin: 15px auto;\n    text-align: center;\n    color: #4e5255;\n    text-transform: uppercase;\n  }\n  .variant-text1 {\n    font-size: 34px;\n    font-weight: 600;\n    margin: 25px auto 15px;\n    color: #016543;\n  }\n  .variant-button {\n    font-size: 24px;\n    padding: 10px;\n    text-transform: uppercase;\n    margin: 300px auto auto;\n    color: #fff;\n    width: 340px;\n    transition: all 0.5s ease !important;\n  }\n  .variant-button:hover {\n    background-color: #016543;\n  }\n  .variant-close {\n    font-size: 14px;\n    background-color: #fff;\n    top: -10px;\n    right: -10px;\n  }\n  .variant-close a.variant-link {\n    color: #000;\n  }\n  @media screen and (max-width: 420px) {\n    .variant-close-safe {\n      display: block;\n    }\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.95);\n      transform-origin: 5% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 420px;\n    }\n  }\n  @media screen and (max-width: 412px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.93);\n      transform-origin: 4.9% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 412px;\n    }\n  }\n  @media screen and (max-width: 403px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.91);\n      transform-origin: 4.8% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 403px;\n    }\n  }\n  @media screen and (max-width: 395px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.89);\n      transform-origin: 4.7% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 395px;\n    }\n  }\n  @media screen and (max-width: 386px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.87);\n      transform-origin: 4.6% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 386px;\n    }\n  }\n  @media screen and (max-width: 378px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.85);\n      transform-origin: 4.5% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 378px;\n    }\n  }\n  @media screen and (max-width: 370px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.84);\n      transform-origin: 4.4% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 370px;\n    }\n  }\n  @media screen and (max-width: 361px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.82);\n      transform-origin: 4.3% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 361px;\n    }\n  }\n  @media screen and (max-width: 353px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.8);\n      transform-origin: 4.2% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 353px;\n    }\n  }\n  @media screen and (max-width: 344px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.78);\n      transform-origin: 4.1% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 344px;\n    }\n  }\n  @media screen and (max-width: 336px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.76);\n      transform-origin: 4% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 336px;\n    }\n  }\n  @media screen and (max-width: 328px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.74);\n      transform-origin: 3.9% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 328px;\n    }\n  }\n  @media screen and (max-width: 319px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.72);\n      transform-origin: 3.8% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 319px;\n    }\n  }\n  @media screen and (max-width: 311px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.7);\n      transform-origin: 3.7% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 311px;\n    }\n  }\n  @media screen and (max-width: 302px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.68);\n      transform-origin: 3.6% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 302px;\n    }\n  }\n  @media screen and (max-width: 294px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.66);\n      transform-origin: 3.5% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 294px;\n    }\n  }\n  @media screen and (max-width: 286px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.65);\n      transform-origin: 3.4% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 286px;\n    }\n  }\n  @media screen and (max-width: 277px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.63);\n      transform-origin: 3.3% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 277px;\n    }\n  }\n  @media screen and (max-width: 269px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.61);\n      transform-origin: 3.2% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 269px;\n    }\n  }\n  @media screen and (max-width: 260px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.59);\n      transform-origin: 3.1% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 260px;\n    }\n  }\n  @media screen and (max-width: 252px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.57);\n      transform-origin: 3% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 252px;\n    }\n  }\n  @media screen and (max-width: 244px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.55);\n      transform-origin: 2.9% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 244px;\n    }\n  }\n  @media screen and (max-width: 235px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.53);\n      transform-origin: 2.8% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 235px;\n    }\n  }\n  @media screen and (max-width: 227px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.51);\n      transform-origin: 2.7% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 227px;\n    }\n  }\n";
    var styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(css));
    document.head.appendChild(styles);
    setStylesLoaded(true);
  });
  if (!open) {
    return null;
  }
  if (!stylesLoaded) {
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
    id: 'variant-overlay-106412',
    "data-browser": 'firefox',
    "data-device": 'desktop'
  }, React__default.createElement("div", {
    className: 'variant-bg variant-animated variant-fadeIn',
    style: {
      display: 'block'
    }
  }, React__default.createElement("div", {
    className: 'variant-overlay-outer variant-animated variant-bounceInDown variant-animDelay2',
    style: {
      display: 'block'
    }
  }, React__default.createElement("div", {
    className: 'variant-overlay-inner smc_clearfix',
    "data-bgtheme": 'dark',
    "data-changes": 'variant-overlay-inner|width,background-image,background-color',
    "data-edits": 'content6',
    style: {
      backgroundImage: "url(" + (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL) + ")",
      backgroundColor: '#f1f1f1'
    }
  }, React__default.createElement("div", {
    className: 'variant-img-outer'
  }, React__default.createElement("div", {
    className: 'variant-img variant-img1 variant-animated variant-bounceInDown variant-animDelay6',
    "data-changes": '.variant-img1|margin-top,margin-bottom,image-upload',
    "data-edits": 'content1'
  }), React__default.createElement("div", {
    className: 'variant-img variant-img2 variant-animated variant-bounceInRight variant-animDelay8',
    "data-changes": '.variant-img2|margin-top,margin-bottom,image-upload',
    "data-edits": 'content2'
  }), React__default.createElement("div", {
    className: 'variant-img variant-img3 variant-animated variant-bounceInRight variant-animDelay10',
    "data-changes": '.variant-img3|margin-top,margin-bottom,image-upload',
    "data-edits": 'content3'
  }), React__default.createElement("div", {
    className: 'variant-img variant-img4 variant-animated variant-bounceInRight variant-animDelay12',
    "data-changes": '.variant-img4|margin-top,margin-bottom,image-upload',
    "data-edits": 'content4'
  })), React__default.createElement("div", {
    className: 'variant-text-outer'
  }, React__default.createElement("div", {
    className: 'variant-text variant-text1 variant-animated variant-bounceInDown variant-animDelay4',
    "data-edits": 'text1',
    "data-changes": '.variant-text1|font-size,color,margin-top,margin-bottom',
    style: {
      color: 'white',
      marginTop: 40,
      textShadow: '0 1px 4px #000'
    }
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.heading), React__default.createElement("div", {
    className: 'variant-text variant-text2 variant-animated variant-bounceInRight variant-animDelay6',
    "data-edits": 'text2',
    "data-changes": '.variant-text2|font-size,color,margin-top,margin-bottom',
    style: {
      color: 'white',
      textShadow: '0 1px 4px #000',
      fontSize: 45
    }
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.paragraph), React__default.createElement("div", {
    className: 'variant-text variant-text3 variant-animated variant-bounceInLeft variant-animDelay8',
    "data-edits": 'text3',
    "data-changes": '.variant-text3|font-size,color,margin-top,margin-bottom'
  }), React__default.createElement("div", {
    className: 'variant-text variant-text4 variant-animated variant-bounceInRight variant-animDelay10',
    "data-edits": 'text4',
    "data-changes": '.variant-text4|font-size,color,margin-top,margin-bottom'
  })), React__default.createElement("div", {
    className: 'variant-option variant-clickRedirect',
    onClick: function onClick(e) {
      var _trigger$data4, _trigger$data5;
      e.preventDefault();
      trigger !== null && trigger !== void 0 && (_trigger$data4 = trigger.data) !== null && _trigger$data4 !== void 0 && _trigger$data4.buttonURL ? window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.buttonURL) : closeModal();
    }
  }, React__default.createElement("div", {
    className: 'variant-input-group'
  }, React__default.createElement("span", {
    className: 'variant-button variant-animated variant-fadeInRight variant-animDelay10',
    "data-edits": 'text10',
    "data-changes": '.variant-button|font-size,background-color,color'
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data6 = trigger.data) === null || _trigger$data6 === void 0 ? void 0 : _trigger$data6.buttonText))), React__default.createElement("div", {
    className: 'variant-long-close variant-animated variant-fadeInUp variant-animDelay14',
    "data-engage-class": 'variant-engaged'
  }, React__default.createElement("a", {
    "data-close-type": 'long_close',
    className: 'variant-link variant-closer',
    href: '#rdl',
    "data-engage-text": '',
    "data-edits": 'text7,text11',
    "data-changes": 'variant-long-close a.variant-link|font-size,color,margin-top,margin-bottom',
    onClick: function onClick(e) {
      e.preventDefault();
      closeModal();
    }
  })), React__default.createElement("div", {
    className: 'variant-close variant-animated variant-fadeInRight variant-animDelay4 variant-closer'
  }, React__default.createElement("a", {
    "data-close-type": 'x_close',
    className: 'variant-link',
    href: '#rdl',
    onClick: function onClick(e) {
      e.preventDefault();
      closeModal();
    }
  }, "\u2715")))), React__default.createElement("div", {
    className: 'variant-close-safe variant-closer'
  }, React__default.createElement("a", {
    "data-close-type": 'x_close',
    className: 'variant-link',
    href: '#rdl',
    onClick: function onClick(e) {
      e.preventDefault();
      closeModal();
    }
  }, "[close]")))));
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
  behaviour: 'BEHAVIOUR_MODAL',
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
  return React__default.createElement(LoggingProvider, {
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
  }, children)))))));
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

exports.CollectorContext = CollectorContext;
exports.CollectorProvider = CollectorProvider;
exports.FingerprintContext = FingerprintContext;
exports.FingerprintProvider = FingerprintProvider;
exports.onCookieChanged = onCookieChanged;
exports.useCollector = useCollector;
exports.useFingerprint = useFingerprint;
//# sourceMappingURL=index.js.map

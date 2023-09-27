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
  var _useState5 = React.useState(false),
    intently = _useState5[0],
    setIntently = _useState5[1];
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
    if (displayTrigger) return;
    log('CollectorProvider: attempting to fire exit trigger');
    setDisplayTrigger('INVOCATION_EXIT_INTENT');
  }, []);
  React.useEffect(function () {
    if (!exitIntentTriggers) return;
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
            log('Sent collector data, retrieved:', payload);
            setIdleTimeout(idleStatusAfterMs);
            setPageTriggers(payload.pageTriggers);
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
  React.useEffect(function () {
    var css = '@charset "UTF-8";@import "https://fonts.smct.co/Din/font.css";variant-bg,variant-overlay-outer,variant-bar,variant-final-message,variant-success-message{display:none;font-family:Gotham,"Helvetica Neue",Helvetica,Arial,sans-serif}variant-bg,variant-bar{z-index:99999999999}variant-bar,variant-handle,variant-final-message,variant-success-message-inner,variant-overlay-inner{background-color:rgba(0,0,0,1)}variant-bar,variant-option,variant-handle,variant-final-message,variant-text-outer > variant-text,a.variant-link{color:#fff}variant-bg,variant-bg *{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}variant-bg *{line-height:100%}variant-overlay-inner,.variant-input,variant-text,variant-text-outer,variant-item,variant-progress,.variant-panel variant-bg,variant-handle > span,variant-loader,variant-loader-single,variant-loader-double,variant-option,variant-long-close{display:block}variant-text-outer,variant-option{width:50%;min-width:280px;margin:auto}.variant-input{background-color:rgba(255,255,255,0.8)}variant-bg{background-color:rgba(0,0,0,0.6);width:100%;height:100%;position:fixed;top:0;left:0;right:0;bottom:0;overflow-y:scroll}variant-overlay-outer{position:relative;transition:height .2s ease}variant-overlay-inner{width:700px;min-height:400px;position:relative;margin:10% auto;transition:all .2s ease;padding:10px 10px 30px;min-width:300px}variant-close{border-radius:50%;color:#333;cursor:pointer;display:block;font-size:20px;font-weight:700;height:30px;line-height:30px;position:absolute;right:10px;text-align:center;top:10px;width:30px;z-index:100}variant-close a{font-family:Gotham,"Helvetica Neue",Helvetica,Arial,sans-serif}variant-close:hover{background-color:rgba(255,255,255,0.3)}variant-close-safe{text-shadow:1px 1px 1px #000;color:#fff;width:100%;text-align:center;cursor:pointer;display:none;position:fixed;bottom:30px;left:0}variant-close-safe a{color:#fff!important}.variant-closer{cursor:pointer}variant-long-close{font-size:14px;position:absolute;bottom:10px;width:100%;left:0;text-align:center}variant-long-close a.variant-link{width:auto}a.variant-link{display:inline-block;text-decoration:none;height:100%;width:100%}.variant-input,.variant-button,variant-reveal{width:100%}.variant-button,variant-cover{background:#333;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.variant-input{color:#000;text-align:center;border:1px solid #333;margin:10px auto;padding:10px}.variant-input::-webkit-input-placeholder,.variant-input:-moz-placeholder,.variant-input::-moz-placeholder,.variant-input:-ms-input-placeholder{color:#ccc;text-transform:uppercase}.variant-input:focus{outline:none}.variant-button{border:medium none;color:#fff;outline:medium none;display:block;margin:10px auto;font-size:20px;padding:10px;cursor:pointer}variant-reveal{display:block;margin:10px auto;position:relative;text-align:center}variant-cover,variant-code{position:absolute;top:0;left:0;width:100%;padding:10px;font-size:20px}variant-cover{z-index:2;color:#fff;padding:11px;cursor:pointer}.variant-button:hover,variant-cover:hover{box-shadow:0 0 6px rgba(0,0,0,0.3)}variant-code{z-index:1;border:1px solid #333;background:rgba(255,255,255,0.8);color:#333;font-weight:700;-moz-user-select:text;-webkit-user-select:text;-ms-user-select:text;user-select:text}variant-text{text-align:center;font-size:20px}.variant-text2{font-size:40px;font-weight:700}variant-img-outer{position:relative;width:100%;display:block}variant-img{display:block;width:100%}variant-img img{border:medium none;display:block;margin:auto;outline:medium none;max-width:100%}.variant-clearfix:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0}.variant-clearfix{display:inline-block;height:1%;display:block}variant-item{height:80px;padding:10px;border-bottom:1px dashed #ccc}variant-item variant-item-img{display:inline-block;text-align:center}variant-item variant-item-img img{max-width:60px;max-height:60px}variant-item variant-title{font-weight:700;display:inline-block}variant-item variant-price{display:inline-block}variant-item variant-qty{display:inline-block}variant-progress{background-color:rgba(0,0,0,0.1);border-radius:0;box-shadow:0 1px 2px rgba(0,0,0,0.1) inset;height:21px;margin-bottom:21px;overflow:hidden;width:100%}variant-progress-bar{background-color:#007932;box-shadow:0 -1px 0 rgba(0,0,0,0.15) inset;color:#fff;float:left;font-size:12px;height:100%;line-height:21px;text-align:center;transition:width .6s ease 0s;width:0}variant-progress variant-progress-bar{background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-size:40px 40px;animation:.5s linear 0s normal none infinite running variant-progress-bar-stripes}@-webkit-keyframes variant-progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@-o-keyframes variant-progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@keyframes variant-progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}variant-overlay{box-shadow:0 1px 4px rgba(0,0,0,0.3),0 0 40px rgba(0,0,0,0.1) inset}variant-overlay:before,variant-overlay:after{content:"";position:absolute;z-index:-1;box-shadow:0 0 20px rgba(0,0,0,0.8);top:0;bottom:0;left:10px;right:10px;border-radius:100px / 10px}variant-overlay:after{right:10px;left:auto;transform:skew(8deg) rotate(3deg)}.variant-panel variant-bg{width:0;height:100%;position:fixed;z-index:1001;top:0;background-color:#111;padding:0;left:0;bottom:0;right:0;color:#fff;overflow-x:hidden;overflow-y:scroll;transition:width .5s}.variant-panel-body-cover{position:fixed;z-index:1000;background-color:rgba(0,0,0,0.5);left:0;right:0;top:0;bottom:0;width:100%;height:100%;display:none}.variant-panel.variant-panel-left variant-bg{right:auto}.variant-panel.variant-panel-right variant-bg{left:auto}.variant-panel variant-overlay-inner{width:90%}variant-input-group{display:block;text-align:center}variant-input-group input[type="checkbox"],variant-input-group input[type="radio"]{margin-right:3px;margin-left:10px}.variant-input-error ::-webkit-input-placeholder,.variant-input-error :-moz-placeholder,.variant-input-error ::-moz-placeholder,.variant-input-error :-ms-input-placeholder{color:#d30003}.variant-input-error label{color:#d30003}.variant-input-error input,.variant-input-error select,.variant-input-error textarea{border-color:#d30003}variant-bar,variant-handle{box-shadow:0 6px 6px rgba(0,0,0,0.3);border-bottom-left-radius:3px;border-bottom-right-radius:3px}variant-bar{display:none;position:fixed;top:0;left:25%;right:25%;width:50%;font-weight:700;font-size:16px;text-shadow:none;text-align:center;height:30px;line-height:30px;padding:0 20px}@media (max-width: 500px){variant-bar{width:80%;left:10%}}variant-bar-close{cursor:pointer;height:10px;line-height:10px;position:absolute;right:10px;top:10px;width:10px}variant-handle{position:absolute;width:50px;margin-left:-25px;height:20px;left:50%;bottom:-20px;cursor:pointer;line-height:12px;letter-spacing:-2px}variant-handle > span{position:absolute;width:60%;left:20%;height:2px;background:#fff}.variant-bar1{top:20%}.variant-bar2{top:40%}.variant-bar3{top:60%}.variant-arrow-up{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid #000}.variant-arrow-down{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000}.variant-arrow-right{width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid #000}.variant-arrow-left{width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-right:5px solid #000}variant-preview{position:fixed;top:20px;left:50%;margin-left:-160px;width:320px;padding:5px 10px;background:#ff0;color:#000;font-family:Gotham,"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:12px;text-align:center;border-radius:5px;box-shadow:2px 2px 4px rgba(0,0,0,0.5);cursor:pointer}variant-preview-close{font-size:7px;height:3px;position:absolute;right:4px;top:0;width:3px}variant-preview .variant-arrow-up{position:absolute;top:-20px;left:50%;margin-left:-10px;border-left:20px solid transparent;border-right:20px solid transparent;border-bottom:20px solid #ff0}variant-notices{position:absolute;top:0;left:0;width:100%;transition:height .3s ease}.variant-notice-box{padding:5px 10px;background:#ec6952;font-size:12px;text-align:left;border-radius:5px;box-shadow:2px 2px 4px rgba(0,0,0,0.5);cursor:pointer;min-height:30px;min-width:100px;max-width:500px;width:auto;margin-bottom:5px;color:#fff;float:right;clear:both;z-index:100;transition:all .5s ease;overflow:hidden}.variant-notice-box.success{background:#24a233}.variant-notice-box.warning{background:#cf9d0f}.variant-notice-box.danger{background:#d30003}@media screen{variant-preloader{position:fixed;left:-9999px;top:-9999px}variant-preloader img{display:block}}@media print{variant-preloader,variant-preloader img{visibility:hidden;display:none}}variant-final-message{border-radius:2px;box-shadow:5px 5px 10px rgba(0,0,0,0.5);bottom:10px;font-size:16px;padding:10px 20px;position:fixed;right:10px;z-index:1.0E+15}variant-final-message-close{position:absolute;top:3px;right:1px;width:10px;height:10px;cursor:pointer;font-size:10px;opacity:.5}variant-final-message variant-select{font-weight:700}variant-final-message:hover variant-final-message-close{opacity:1}variant-success-message{position:absolute;width:100%;background:rgba(0,0,0,0.5);height:100%;top:0;left:0;right:0;bottom:0;text-align:center}variant-success-message-inner{background:#08ad00 none repeat scroll 0 0;border-radius:5px;box-shadow:3px 3px 10px rgba(0,0,0,0.5);color:#fff;display:inline-block;font-size:30px;margin:20% auto auto;padding:10px 30px;position:relative}variant-success-close{position:absolute;top:5px;right:5px;cursor:pointer;font-size:12px}@-webkit-keyframes variant-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes variant-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes variant-pulse{50%{background:#fff}}@keyframes variant-pulse{50%{background:#fff}}variant-loader-bg,variant-dc-placeholder{position:absolute;top:10%;left:50%;background:rgba(0,0,0,0.8);width:60px;margin-left:-30px;height:60px;z-index:10;border-radius:10px;display:none}variant-loader,variant-loader-single,variant-loader-double{border-radius:50%;width:50px;height:50px;margin:5px;border:.25rem solid rgba(255,255,255,0.2);border-top-color:#fff;-webkit-animation:variant-spin 1s infinite linear;animation:variant-spin 1s infinite linear}variant-loader-double{border-style:double;border-width:.5rem}variant-loader-pulse{-webkit-animation:variant-pulse 750ms infinite;animation:variant-pulse 750ms infinite;-webkit-animation-delay:250ms;animation-delay:250ms;height:30px;left:25px;position:absolute;top:14px;width:10px}variant-loader-pulse:before,variant-loader-pulse:after{content:"";position:absolute;display:block;height:16px;width:6px;top:50%;background:rgba(255,255,255,0.2);-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-animation:variant-pulse 750ms infinite;animation:variant-pulse 750ms infinite}variant-loader-pulse:before{left:-12px}variant-loader-pulse:after{left:16px;-webkit-animation-delay:500ms;animation-delay:500ms}variant-loader-bg[data-theme="white"],variant-dc-placeholder{background:rgba(255,255,255,0.8)}variant-loader-bg[data-theme="white"] variant-loader-single,variant-dc-placeholder variant-loader-single,variant-loader-bg[data-theme="white"] variant-loader-double,variant-dc-placeholder variant-loader-double,variant-loader-bg[data-theme="white"] variant-loader-pulse,variant-dc-placeholder variant-loader-pulse{border-color:rgba(0,0,0,0.2);border-top-color:#000}variant-terms{background-color:#fff;border:1px solid #333;border-radius:3px;bottom:5%;box-shadow:3px 3px 10px rgba(0,0,0,0.4);left:5%;padding:10px;position:absolute;right:5%;top:5%;z-index:101;display:none}variant-terms-header,variant-terms-para,variant-terms-close,variant-terms-close-x{color:#333;display:block}variant-terms-scroller{position:absolute;top:10px;left:10px;right:10px;bottom:30px;overflow:auto}variant-terms-header{font-size:20px;font-weight:700;margin:5px 0;text-align:center}variant-terms-para{margin:5px 0;font-size:12px}variant-terms-close{bottom:10px;cursor:pointer;left:10px;position:absolute;right:10px;text-align:center}variant-show-terms,.variant-show-terms{text-decoration:underline;cursor:pointer}variant-terms[data-theme="dark"]{background-color:#333}variant-terms[data-theme="dark"] variant-terms-header,variant-terms[data-theme="dark"] variant-terms-para,variant-terms[data-theme="dark"] variant-terms-close,variant-terms[data-theme="dark"] variant-terms-close-x{color:#fff}variant-terms-close-x{position:absolute;top:5px;right:5px;cursor:pointer;opacity:.7;-webkit-transition:all .25s ease-in-out;-ms-transition:all .25s ease-in-out;-o-transition:all .25s ease-in-out;-moz-transition:all .25s ease-in-out;transition:transform all .25s ease-in-out}variant-terms-close-x:hover{opacity:1;-webkit-transform:rotate(180deg) scale(1.3);-ms-transform:rotate(180deg) scale(1.3);-o-transform:rotate(180deg) scale(1.3);-moz-transform:rotate(180deg) scale(1.3);transform:rotate(180deg) scale(1.3)}variant-cp{-youbkit-touch-callout:none;-youbkit-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}variant-cp,variant-cp-msg{display:none}variant-hidden-consents{opacity:0;position:fixed;bottom:0;left:0;width:1px;height:1px;visibility:hidden}.variant-requestNotifications variant-agree-yes,.variant-requestNotifications variant-agree-no{display:none}variant-notices{padding:10px;right:20px;left:auto;max-width:300px;z-index:100}variant-dc-placeholder{display:block;height:30px;width:30px;top:3px}variant-dc-placeholder > *{height:20px;width:20px}variant-shake-msg{display:none}.variant-animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.variant-animated.variant-infinite{-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.variant-animated.variant-hinge{-webkit-animation-duration:2s;animation-duration:2s}.variant-animated.variant-bounceIn,.variant-animated.variant-bounceOut,.variant-animated.variant-flipOutX,.variant-animated.variant-flipOutY{-webkit-animation-duration:.75s;animation-duration:.75s}@-webkit-keyframes variant-fadeIn{0%{opacity:0}to{opacity:1}}@keyframes variant-fadeIn{0%{opacity:0}to{opacity:1}}.variant-fadeIn{-webkit-animation-name:variant-fadeIn;animation-name:variant-fadeIn}@-webkit-keyframes variant-bounceInDown{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)}75%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}90%{-webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)}to{-webkit-transform:none;transform:none}}@keyframes variant-bounceInDown{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)}75%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}90%{-webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)}to{-webkit-transform:none;transform:none}}.variant-bounceInDown{-webkit-animation-name:variant-bounceInDown;animation-name:variant-bounceInDown}.variant-animDelay2{-webkit-animation-delay:.2s!important;-moz-animation-delay:.2s!important;-ms-animation-delay:.2s!important;-o-animation-delay:.2s!important;animation-delay:.2s!important}.variant-animDelay6{-webkit-animation-delay:.6s!important;-moz-animation-delay:.6s!important;-ms-animation-delay:.6s!important;-o-animation-delay:.6s!important;animation-delay:.6s!important}@-webkit-keyframes variant-bounceInRight{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;-webkit-transform:translate3d(3000px,0,0);transform:translate3d(3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(-25px,0,0);transform:translate3d(-25px,0,0)}75%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}90%{-webkit-transform:translate3d(-5px,0,0);transform:translate3d(-5px,0,0)}to{-webkit-transform:none;transform:none}}@keyframes variant-bounceInRight{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;-webkit-transform:translate3d(3000px,0,0);transform:translate3d(3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(-25px,0,0);transform:translate3d(-25px,0,0)}75%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}90%{-webkit-transform:translate3d(-5px,0,0);transform:translate3d(-5px,0,0)}to{-webkit-transform:none;transform:none}}.variant-bounceInRight{-webkit-animation-name:variant-bounceInRight;animation-name:variant-bounceInRight}.variant-animDelay8{-webkit-animation-delay:.8s!important;-moz-animation-delay:.8s!important;-ms-animation-delay:.8s!important;-o-animation-delay:.8s!important;animation-delay:.8s!important}.variant-animDelay10{-webkit-animation-delay:1s!important;-moz-animation-delay:1s!important;-ms-animation-delay:1s!important;-o-animation-delay:1s!important;animation-delay:1s!important}.variant-animDelay12{-webkit-animation-delay:1.2s!important;-moz-animation-delay:1.2s!important;-ms-animation-delay:1.2s!important;-o-animation-delay:1.2s!important;animation-delay:1.2s!important}.variant-animDelay4{-webkit-animation-delay:.4s!important;-moz-animation-delay:.4s!important;-ms-animation-delay:.4s!important;-o-animation-delay:.4s!important;animation-delay:.4s!important}@-webkit-keyframes variant-bounceInLeft{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0);transform:translate3d(-3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}to{-webkit-transform:none;transform:none}}@keyframes variant-bounceInLeft{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0);transform:translate3d(-3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}to{-webkit-transform:none;transform:none}}.variant-bounceInLeft{-webkit-animation-name:variant-bounceInLeft;animation-name:variant-bounceInLeft}@-webkit-keyframes variant-fadeInLeft{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes variant-fadeInLeft{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}.variant-fadeInLeft{-webkit-animation-name:variant-fadeInLeft;animation-name:variant-fadeInLeft}@-webkit-keyframes variant-fadeInRight{0%{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes variant-fadeInRight{0%{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}.variant-fadeInRight{-webkit-animation-name:variant-fadeInRight;animation-name:variant-fadeInRight}@-webkit-keyframes variant-bounceInUp{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,3000px,0);transform:translate3d(0,3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}75%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}90%{-webkit-transform:translate3d(0,-5px,0);transform:translate3d(0,-5px,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes variant-bounceInUp{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,3000px,0);transform:translate3d(0,3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}75%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}90%{-webkit-transform:translate3d(0,-5px,0);transform:translate3d(0,-5px,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.variant-bounceInUp{-webkit-animation-name:variant-bounceInUp;animation-name:variant-bounceInUp}.variant-animDelay7{-webkit-animation-delay:.7s!important;-moz-animation-delay:.7s!important;-ms-animation-delay:.7s!important;-o-animation-delay:.7s!important;animation-delay:.7s!important}.variant-animDelay9{-webkit-animation-delay:.9s!important;-moz-animation-delay:.9s!important;-ms-animation-delay:.9s!important;-o-animation-delay:.9s!important;animation-delay:.9s!important}@-webkit-keyframes variant-fadeInUp{0%{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes variant-fadeInUp{0%{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}.variant-fadeInUp{-webkit-animation-name:variant-fadeInUp;animation-name:variant-fadeInUp}.variant-animDelay14{-webkit-animation-delay:1.4s!important;-moz-animation-delay:1.4s!important;-ms-animation-delay:1.4s!important;-o-animation-delay:1.4s!important;animation-delay:1.4s!important}.variant-animDelay1{-webkit-animation-delay:.1s!important;-moz-animation-delay:.1s!important;-ms-animation-delay:.1s!important;-o-animation-delay:.1s!important;animation-delay:.1s!important}@-webkit-keyframes variant-fadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes variant-fadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}.variant-fadeInDown{-webkit-animation-name:variant-fadeInDown;animation-name:variant-fadeInDown}@-webkit-keyframes variant-fadeOutUp{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes variant-fadeOutUp{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}.variant-fadeOutUp{-webkit-animation-name:variant-fadeOutUp;animation-name:variant-fadeOutUp}@-webkit-keyframes variant-fadeOutDown{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes variant-fadeOutDown{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}.variant-fadeOutDown{-webkit-animation-name:variant-fadeOutDown;animation-name:variant-fadeOutDown}@-webkit-keyframes variant-fadeOut{0%{opacity:1}to{opacity:0}}@keyframes variant-fadeOut{0%{opacity:1}to{opacity:0}}.variant-fadeOut{-webkit-animation-name:variant-fadeOut;animation-name:variant-fadeOut}@-webkit-keyframes variant-bounceOutUp{20%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0)}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}@keyframes variant-bounceOutUp{20%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0)}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}.variant-bounceOutUp{-webkit-animation-name:variant-bounceOutUp;animation-name:variant-bounceOutUp}@-webkit-keyframes variant-bounceOutDown{20%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}@keyframes variant-bounceOutDown{20%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}.variant-bounceOutDown{-webkit-animation-name:variant-bounceOutDown;animation-name:variant-bounceOutDown}@-webkit-keyframes variant-rubberBand{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}30%{-webkit-transform:scale3d(1.25,0.75,1);transform:scale3d(1.25,0.75,1)}40%{-webkit-transform:scale3d(0.75,1.25,1);transform:scale3d(0.75,1.25,1)}50%{-webkit-transform:scale3d(1.15,0.85,1);transform:scale3d(1.15,0.85,1)}65%{-webkit-transform:scale3d(0.95,1.05,1);transform:scale3d(0.95,1.05,1)}75%{-webkit-transform:scale3d(1.05,0.95,1);transform:scale3d(1.05,0.95,1)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes variant-rubberBand{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}30%{-webkit-transform:scale3d(1.25,0.75,1);transform:scale3d(1.25,0.75,1)}40%{-webkit-transform:scale3d(0.75,1.25,1);transform:scale3d(0.75,1.25,1)}50%{-webkit-transform:scale3d(1.15,0.85,1);transform:scale3d(1.15,0.85,1)}65%{-webkit-transform:scale3d(0.95,1.05,1);transform:scale3d(0.95,1.05,1)}75%{-webkit-transform:scale3d(1.05,0.95,1);transform:scale3d(1.05,0.95,1)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}.variant-rubberBand{-webkit-animation-name:variant-rubberBand;animation-name:variant-rubberBand}@-webkit-keyframes variant-shake{0%,to{-webkit-transform:translateZ(0);transform:translateZ(0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}@keyframes variant-shake{0%,to{-webkit-transform:translateZ(0);transform:translateZ(0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}.variant-shake{-webkit-animation-name:variant-shake;animation-name:variant-shake}@-webkit-keyframes variant-rollOut{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0) rotate(120deg);transform:translate3d(100%,0,0) rotate(120deg)}}@keyframes variant-rollOut{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0) rotate(120deg);transform:translate3d(100%,0,0) rotate(120deg)}}.variant-rollOut{-webkit-animation-name:variant-rollOut;animation-name:variant-rollOut}variant-bg *{font-family:"DINCompPro-CondMedium"}variant-overlay-inner{background-image:url(https://cdn.smct.co/79042-754.jpg);background-size:cover;width:420px;min-height:520px;border-radius:5px;padding-bottom:0;border:2px solid #fff}variant-text-outer,variant-option{width:380px;margin:auto}.variant-text1,.variant-text2{font-size:26px;font-weight:400;margin:15px auto;text-align:center;color:#4e5255;text-transform:uppercase}.variant-text1{font-size:34px;font-weight:600;margin:25px auto 15px;color:#016543}.variant-button{font-size:24px;padding:10px;text-transform:uppercase;margin:300px auto auto;color:#fff;background:#016543e6;width:340px;transition:all .5s ease!important}.variant-button:hover{background-color:#016543}variant-close{font-size:14px;background-color:#fff;top:-10px;right:-10px}variant-close a.variant-link{color:#000}@media screen and (max-width: 420px){variant-close-safe{display:block}div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.95);transform-origin:5% 0 0}variant-overlay-outer{height:420px}}@media screen and (max-width: 412px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.93);transform-origin:4.9% 0 0}variant-overlay-outer{height:412px}}@media screen and (max-width: 403px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.91);transform-origin:4.8% 0 0}variant-overlay-outer{height:403px}}@media screen and (max-width: 395px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.89);transform-origin:4.7% 0 0}variant-overlay-outer{height:395px}}@media screen and (max-width: 386px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.87);transform-origin:4.6% 0 0}variant-overlay-outer{height:386px}}@media screen and (max-width: 378px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.85);transform-origin:4.5% 0 0}variant-overlay-outer{height:378px}}@media screen and (max-width: 370px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.84);transform-origin:4.4% 0 0}variant-overlay-outer{height:370px}}@media screen and (max-width: 361px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.82);transform-origin:4.3% 0 0}variant-overlay-outer{height:361px}}@media screen and (max-width: 353px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.8);transform-origin:4.2% 0 0}variant-overlay-outer{height:353px}}@media screen and (max-width: 344px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.78);transform-origin:4.1% 0 0}variant-overlay-outer{height:344px}}@media screen and (max-width: 336px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.76);transform-origin:4% 0 0}variant-overlay-outer{height:336px}}@media screen and (max-width: 328px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.74);transform-origin:3.9% 0 0}variant-overlay-outer{height:328px}}@media screen and (max-width: 319px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.72);transform-origin:3.8% 0 0}variant-overlay-outer{height:319px}}@media screen and (max-width: 311px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.7);transform-origin:3.7% 0 0}variant-overlay-outer{height:311px}}@media screen and (max-width: 302px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.68);transform-origin:3.6% 0 0}variant-overlay-outer{height:302px}}@media screen and (max-width: 294px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.66);transform-origin:3.5% 0 0}variant-overlay-outer{height:294px}}@media screen and (max-width: 286px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.65);transform-origin:3.4% 0 0}variant-overlay-outer{height:286px}}@media screen and (max-width: 277px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.63);transform-origin:3.3% 0 0}variant-overlay-outer{height:277px}}@media screen and (max-width: 269px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.61);transform-origin:3.2% 0 0}variant-overlay-outer{height:269px}}@media screen and (max-width: 260px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.59);transform-origin:3.1% 0 0}variant-overlay-outer{height:260px}}@media screen and (max-width: 252px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.57);transform-origin:3% 0 0}variant-overlay-outer{height:252px}}@media screen and (max-width: 244px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.55);transform-origin:2.9% 0 0}variant-overlay-outer{height:244px}}@media screen and (max-width: 235px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.53);transform-origin:2.8% 0 0}variant-overlay-outer{height:235px}}@media screen and (max-width: 227px){div:not(#smct-overlay-mini-preview) variant-overlay-inner{transform:scale(0.51);transform-origin:2.7% 0 0}variant-overlay-outer{height:227px}}';
    var styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(css));
    document.head.appendChild(styles);
  });
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

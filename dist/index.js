function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactQuery = require('@tanstack/react-query');
var Cookies = _interopDefault(require('js-cookie'));
var uuid = require('uuid');
var useExitIntent = require('use-exit-intent');
var reactIdleTimer = require('react-idle-timer');
var ReactDOM = _interopDefault(require('react-dom'));
var Sentry = require('@sentry/react');

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

var setCookie = function setCookie(name, value) {
  return Cookies.set(name, value, {
    expires: 365,
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

var sendEvent = function sendEvent(data) {
  console.log('Server received event', data);
  var firstSeen = getCookie('firstSeen') ? getCookie('firstSeen') || '' : setCookie('firstSeen', new Date().toISOString()) || '';
  var lastSeen = getCookie('lastSeen') ? getCookie('lastSeen') || '' : setCookie('lastSeen', new Date().toISOString()) || '';
  setCookie('lastSeen', new Date().toISOString());
  var previousVisits = getCookie('visits') ? parseInt(getCookie('visits') || '0') : 0;
  var visits = previousVisits + 1;
  setCookie('visits', visits.toString());
  var trigger = getTrigger(_extends({}, data, {
    firstSeen: firstSeen,
    lastSeen: lastSeen,
    visits: visits
  }));
  return {
    firstSeen: new Date(firstSeen),
    lastSeen: new Date(lastSeen),
    visits: visits,
    trigger: trigger
  };
};
var getTrigger = function getTrigger(data) {
  var _data$page, _data$page2, _data$page3, _data$referrer, _data$referrer$utm, _data$page4;
  console.log('getting trigger', data);
  var trigger = {};
  var context = {
    firstSeen: data.firstSeen,
    lastSeen: data.lastSeen,
    visits: data.visits
  };
  var brand = getBrand(data === null || data === void 0 ? void 0 : (_data$page = data.page) === null || _data$page === void 0 ? void 0 : _data$page.url);
  var offer = getOffer(data === null || data === void 0 ? void 0 : (_data$page2 = data.page) === null || _data$page2 === void 0 ? void 0 : _data$page2.url);
  var url = getUrl(data === null || data === void 0 ? void 0 : (_data$page3 = data.page) === null || _data$page3 === void 0 ? void 0 : _data$page3.url);
  console.log('brand', brand, 'offer', offer, 'url', url);
  if (!brand || !offer) {
    return trigger;
  }
  if ((data === null || data === void 0 ? void 0 : (_data$referrer = data.referrer) === null || _data$referrer === void 0 ? void 0 : (_data$referrer$utm = _data$referrer.utm) === null || _data$referrer$utm === void 0 ? void 0 : _data$referrer$utm.campaign) === 'UTM_OFFER' && (data === null || data === void 0 ? void 0 : (_data$page4 = data.page) === null || _data$page4 === void 0 ? void 0 : _data$page4.path) === '/') {
    trigger.id = 'fb_ads_homepage';
    trigger.behaviour = 'modal';
    trigger.data = _extends({
      text: 'Get your ' + offer + '!',
      message: 'Find the closest location to you and complete your booking now to get ' + offer + '',
      button: 'Start Booking'
    }, url ? {
      url: url
    } : {}, context);
    trigger.brand = brand;
  }
  return trigger;
};
var getOffer = function getOffer(url) {
  if (url.includes('tobycarvery.co.uk') || url.includes('localhost:8000') || url.includes('vercel.app')) {
    return 'complimentary drink';
  }
  if (url.includes('browns-restaurants.co.uk')) {
    return 'complimentary cocktail';
  }
  if (url.includes('vintageinn.co.uk')) {
    return 'complimentary dessert';
  }
  return undefined;
};
var getUrl = function getUrl(url) {
  if (url.includes('book.') || url.includes('localhost:8000') || url.includes('vercel.app')) {
    return undefined;
  }
  if (url.includes('tobycarvery.co.uk') || url.includes('localhost:8000') || url.includes('vercel.app')) {
    return 'https://book.tobycarvery.co.uk/';
  }
  if (url.includes('browns-restaurants.co.uk')) {
    return 'https://book.browns-restaurants.co.uk/';
  }
  if (url.includes('vintageinn.co.uk')) {
    return 'https://book.vintageinn.co.uk/';
  }
  return undefined;
};
var getBrand = function getBrand(url) {
  if (url.includes('tobycarvery.co.uk') || url.includes('localhost:8000') || url.includes('vercel.app')) {
    return {
      name: 'Toby Carvery',
      fontColor: '#ffffff',
      primaryColor: '#8c1f1f',
      overlayColor: 'rgba(96,32,50,0.5)',
      backgroundImage: 'https://d26qevl4nkue45.cloudfront.net/drink-bg.png'
    };
  }
  if (url.includes('browns-restaurants.co.uk')) {
    return {
      name: 'Browns',
      fontColor: '#ffffff',
      primaryColor: '#B0A174',
      overlayColor: 'rgba(136, 121, 76, 0.5)',
      backgroundImage: 'https://d26qevl4nkue45.cloudfront.net/cocktail-bg.png'
    };
  }
  if (url.includes('vintageinn.co.uk')) {
    return {
      name: 'Vintage Inns',
      fontColor: '#ffffff',
      primaryColor: '#B0A174',
      overlayColor: 'rgba(136, 121, 76, 0.5)',
      backgroundImage: 'https://d26qevl4nkue45.cloudfront.net/dessert-bg.png'
    };
  }
};

var useCollector = function useCollector() {
  return reactQuery.useMutation(function (data) {
    console.log('Sending CollectorUpdate to Mock Collector API', data);
    return Promise.resolve(sendEvent(data));
  }, {
    onSuccess: function onSuccess() {}
  });
};

var bootstrapSession = function bootstrapSession(_ref) {
  var appId = _ref.appId,
    setSession = _ref.setSession;
  var session = {
    firstVisit: undefined
  };
  if (!getCookie('_cm') || getCookie('_cm') !== appId) {
    setCookie('_cm', appId);
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
    setCookie('_cm_id', visitorId);
    visitor.id = visitorId;
    setVisitor(visitor);
    return;
  }
  if (getCookie('_cm_id')) {
    visitor.id = getCookie('_cm_id');
    setVisitor(visitor);
  }
};

var useFingerprint = function useFingerprint() {
  return React.useContext(FingerprintContext);
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
  var _useCollector = useCollector(),
    collect = _useCollector.mutateAsync;
  var _useExitIntent = useExitIntent.useExitIntent({
      cookie: {
        key: 'cm_exit',
        daysToExpire: 7
      }
    }),
    registerHandler = _useExitIntent.registerHandler;
  var _useState = React.useState({}),
    trigger = _useState[0],
    setTrigger = _useState[1];
  var showTrigger = function showTrigger(trigger) {
    if (!trigger || !trigger.behaviour) {
      return null;
    }
    var handler = (handlers === null || handlers === void 0 ? void 0 : handlers.find(function (handler) {
      return handler.id === trigger.id && handler.behaviour === trigger.behaviour;
    })) || (handlers === null || handlers === void 0 ? void 0 : handlers.find(function (handler) {
      return handler.behaviour === trigger.behaviour;
    }));
    log('CollectorProvider: showTrigger', trigger, handler);
    if (!handler) {
      error('No handler found for trigger', trigger);
      return null;
    }
    if (!handler.invoke) {
      error('No invoke method found for handler', handler);
      return null;
    }
    return handler.invoke(trigger);
  };
  React.useEffect(function () {
    if (!exitIntentTriggers) return;
    registerHandler({
      id: 'clientTriger',
      handler: function handler() {
        log('CollectorProvider: openYoutube handler invoked for departure');
        setTrigger({
          id: 'openYoutube',
          behaviour: 'youtube',
          data: {
            url: 'https://www.youtube.com/embed/bj1BMpUnzT8?start=13'
          }
        });
      }
    });
  }, [exitIntentTriggers]);
  React.useEffect(function () {
    if (!booted) {
      log('CollectorProvider: Not yet collecting, awaiting boot');
      return;
    }
    var delay = setTimeout(function () {
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
          title: document.referrer,
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
        if (response.trigger) {
          setTrigger(response.trigger);
        }
      })["catch"](function (err) {
        error('failed to store collected data', err);
      });
      log('CollectorProvider: collected data');
      log('This will run after 1 second!');
    }, initialDelay);
    return function () {
      return clearTimeout(delay);
    };
  }, [booted]);
  return React__default.createElement(reactIdleTimer.IdleTimerProvider, {
    timeout: 1000 * 10,
    onPresenceChange: function onPresenceChange(presence) {
      return log('presence changed', presence);
    },
    onIdle: function onIdle() {
      if (!idleTriggers) return;
      log('CollectorProvider: openYoutube handler invoked for presence');
      setTrigger({
        id: 'openYoutube',
        behaviour: 'youtube',
        data: {
          url: 'https://www.youtube.com/embed/CSvFpBOe8eY?start=44'
        }
      });
    }
  }, React__default.createElement(CollectorContext.Provider, {
    value: {}
  }, children, showTrigger(trigger)));
};
var CollectorContext = React.createContext({});

var Modal = function Modal(_ref) {
  var _trigger$brand, _trigger$brand2, _trigger$brand3, _trigger$brand4, _trigger$brand5, _trigger$data, _trigger$brand6, _trigger$data2, _trigger$brand7, _trigger$brand8, _trigger$data5;
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

Sentry.init({
  dsn: 'https://129339f9b28f958328e76d62fb3f0b2b@o1282674.ingest.sentry.io/4505641419014144',
  integrations: [new Sentry.BrowserTracing({
    tracePropagationTargets: ['localhost:8000', 'https:yourserver.io/api/']
  }), new Sentry.Replay()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1,
  replaysOnErrorSampleRate: 1.0
});
var queryClient = new reactQuery.QueryClient();
var includedHandlers = [{
  id: 'modal',
  behaviour: 'modal',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerModal, {
      trigger: trigger
    });
  }
}, {
  id: 'youtube',
  behaviour: 'youtube',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerYoutube, {
      trigger: trigger
    });
  }
}];
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
    exitIntentTriggers = _ref$exitIntentTrigge === void 0 ? false : _ref$exitIntentTrigge,
    _ref$idleTriggers = _ref.idleTriggers,
    idleTriggers = _ref$idleTriggers === void 0 ? false : _ref$idleTriggers;
  var _useState = React.useState(consent),
    consentGiven = _useState[0],
    setConsentGiven = _useState[1];
  var _useState2 = React.useState(false),
    booted = _useState2[0],
    setBooted = _useState2[1];
  var _useState3 = React.useState(defaultHandlers || includedHandlers),
    handlers = _useState3[0],
    setHandlers = _useState3[1];
  var registerHandler = function registerHandler(trigger) {
    setHandlers(function (handlers) {
      return [].concat(handlers, [trigger]);
    });
  };
  React.useEffect(function () {
    if (!consentCallback) return;
    var interval = setInterval(function () {
      if (consentCallback) {
        setConsentGiven(consentCallback());
      }
    }, 1000);
    return function () {
      return clearInterval(interval);
    };
  }, []);
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
  return React__default.createElement(Sentry.ErrorBoundary, {
    fallback: React__default.createElement("p", null, "An error has occurred")
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
  }, React__default.createElement(VisitorProvider, null, React__default.createElement(CollectorProvider, {
    handlers: handlers
  }, children))))));
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

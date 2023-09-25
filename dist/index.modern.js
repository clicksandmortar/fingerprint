import { init, BrowserTracing, Replay, ErrorBoundary } from '@sentry/react';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { ErrorBoundary as ErrorBoundary$1 } from 'react-error-boundary';
import ReactDOM from 'react-dom';
import { IdleTimerProvider } from 'react-idle-timer';
import { useExitIntent } from 'use-exit-intent';
import Cookies from 'js-cookie';
import { validate, version, v4 } from 'uuid';

const Modal = ({
  trigger
}) => {
  var _trigger$brand, _trigger$brand2, _trigger$brand3, _trigger$brand4, _trigger$brand5, _trigger$data, _trigger$brand6, _trigger$data2, _trigger$brand7, _trigger$brand8, _trigger$data5;
  const [open, setOpen] = useState(true);
  if (!open) {
    return null;
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
  }, React.createElement("div", {
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
  }, React.createElement("div", {
    style: {
      backgroundColor: trigger === null || trigger === void 0 ? void 0 : (_trigger$brand2 = trigger.brand) === null || _trigger$brand2 === void 0 ? void 0 : _trigger$brand2.overlayColor,
      maxWidth: '600px',
      padding: '2rem',
      borderRadius: '0.5rem'
    }
  }, React.createElement("button", {
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
  }, "\u00D7"), React.createElement("h1", {
    style: {
      textAlign: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
      marginTop: '1rem',
      color: trigger === null || trigger === void 0 ? void 0 : (_trigger$brand5 = trigger.brand) === null || _trigger$brand5 === void 0 ? void 0 : _trigger$brand5.fontColor,
      textShadow: '0 1px 2px rgba(0,0,0,0.5)'
    }
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.text), React.createElement("p", {
    style: {
      textAlign: 'center',
      fontSize: '1.5rem',
      color: trigger === null || trigger === void 0 ? void 0 : (_trigger$brand6 = trigger.brand) === null || _trigger$brand6 === void 0 ? void 0 : _trigger$brand6.fontColor,
      fontWeight: 500,
      marginTop: '1rem',
      textShadow: '0 1px 2px rgba(0,0,0,0.5)'
    }
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.message), React.createElement("div", {
    style: {
      padding: '2rem 2rem 1rem'
    }
  }, React.createElement("button", {
    onClick: () => {
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
const TriggerModal = ({
  trigger
}) => {
  return ReactDOM.createPortal(React.createElement(Modal, {
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
  }, React.createElement("div", {
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
  }, React.createElement("div", {
    style: {
      backgroundColor: trigger === null || trigger === void 0 ? void 0 : (_trigger$brand2 = trigger.brand) === null || _trigger$brand2 === void 0 ? void 0 : _trigger$brand2.overlayColor,
      maxWidth: '600px',
      padding: '2rem',
      borderRadius: '0.5rem'
    }
  }, React.createElement("button", {
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
  }, "\u00D7"), React.createElement("iframe", {
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
  return ReactDOM.createPortal(React.createElement(Youtube, {
    trigger: trigger
  }), document.body);
};

const setCookie = (name, value) => {
  return Cookies.set(name, value, {
    expires: 365,
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

const getBrand = url => {
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

const headers = {
  'Content-Type': 'application/json'
};
const hostname = 'https://target-engine-api.starship-staging.com';
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
  return React.createElement(LoggingContext.Provider, {
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

const useCollector = () => {
  const {
    log,
    error
  } = useLogging();
  return useMutation(data => {
    var _data$visitor;
    console.log('Sending CollectorUpdate to Collector API', data);
    return request.post(hostname + '/collector/' + (data === null || data === void 0 ? void 0 : (_data$visitor = data.visitor) === null || _data$visitor === void 0 ? void 0 : _data$visitor.id), data).then(response => {
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

const useFingerprint = () => {
  return useContext(FingerprintContext);
};

const bootstrapSession = ({
  appId,
  setSession
}) => {
  const session = {
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

const uuidValidateV4 = uuid => {
  return validate(uuid) && version(uuid) === 4;
};

const validVisitorId = id => {
  return uuidValidateV4(id);
};

const bootstrapVisitor = ({
  setVisitor
}) => {
  const visitor = {
    id: undefined
  };
  if (!getCookie('_cm_id') || !validVisitorId(getCookie('_cm_id'))) {
    const visitorId = v4();
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
        setVisitor
      });
    };
    boot();
    log('VisitorProvider: booted', session, visitor);
  }, [appId, booted]);
  return React.createElement(VisitorContext.Provider, {
    value: {
      session,
      visitor
    }
  }, children);
};
const VisitorContext = createContext({
  session: {},
  visitor: {}
});
const useVisitor = () => {
  return useContext(VisitorContext);
};

const idleStatusAfterMs = 5 * 1000;
const CollectorProvider = ({
  children,
  handlers
}) => {
  const {
    log,
    error
  } = useLogging();
  const {
    appId,
    booted,
    initialDelay,
    exitIntentTriggers,
    idleTriggers
  } = useFingerprint();
  const {
    visitor
  } = useVisitor();
  const {
    mutateAsync: collect
  } = useCollector();
  const {
    registerHandler
  } = useExitIntent({
    cookie: {
      key: 'cm_exit',
      daysToExpire: 7
    }
  });
  const [trigger, setTrigger] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);
  const showTrigger = React.useCallback(trigger => {
    if (!trigger || !trigger.behaviour) {
      return null;
    }
    const handler = (handlers === null || handlers === void 0 ? void 0 : handlers.find(handler => handler.id === trigger.id && handler.behaviour === trigger.behaviour)) || (handlers === null || handlers === void 0 ? void 0 : handlers.find(handler => handler.behaviour === trigger.behaviour));
    log('CollectorProvider: showTrigger', trigger, handler);
    if (!handler) {
      error('No handler found for trigger', trigger);
      return null;
    }
    if (handler.skip) {
      log('Explicitly skipping trigger handler', trigger, handler);
      return;
    }
    if (!handler.invoke) {
      error('No invoke method found for handler', handler);
      return null;
    }
    if (handler.delay) {
      const tId = setTimeout(() => {
        var _handler$invoke;
        return (_handler$invoke = handler.invoke) === null || _handler$invoke === void 0 ? void 0 : _handler$invoke.call(handler, trigger);
      }, handler.delay);
      setTimeoutId(tId);
      return null;
    }
    return handler.invoke(trigger);
  }, [setTimeoutId, log, handlers]);
  useEffect(() => {
    if (!exitIntentTriggers) return;
    registerHandler({
      id: 'clientTriger',
      handler: () => {
        log('CollectorProvider: handler invoked for departure');
        setTrigger({
          id: 'exit_intent',
          behaviour: 'modal',
          data: {
            text: 'Before you go...',
            message: "Don't leave, there's still time to complete a booking now to get your offer",
            button: 'Start Booking'
          },
          brand: getBrand(window.location.href)
        });
      }
    });
  }, [exitIntentTriggers]);
  useEffect(() => {
    if (!booted) {
      log('CollectorProvider: Not yet collecting, awaiting boot');
      return;
    }
    const delay = setTimeout(() => {
      if (!visitor.id) {
        log('CollectorProvider: Not yet collecting, awaiting visitor ID');
        return;
      }
      log('CollectorProvider: collecting data');
      const params = new URLSearchParams(window.location.search).toString().split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=');
        if (!key) return acc;
        acc[key] = value;
        return acc;
      }, {});
      collect({
        appId,
        visitor,
        page: {
          url: window.location.href,
          path: window.location.pathname,
          title: document.title,
          params
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
      }).then(response => {
        log('Sent collector data, retrieved:', response);
        if (response.trigger) {
          setTrigger(response.trigger);
        }
      }).catch(err => {
        error('failed to store collected data', err);
      });
      log('CollectorProvider: collected data');
      log('This will run after 1 second!');
    }, initialDelay);
    return () => {
      clearTimeout(delay);
    };
  }, [booted, visitor]);
  useEffect(() => {
    if (!timeoutId) return;
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);
  const renderedTrigger = React.useMemo(() => {
    return showTrigger(trigger);
  }, [showTrigger, trigger]);
  return React.createElement(IdleTimerProvider, {
    timeout: idleStatusAfterMs,
    onPresenceChange: presence => {
      if (presence.type === 'active') {
        setTimeoutId(null);
        clearTimeout(timeoutId);
      }
      log('presence changed', presence);
    },
    onIdle: () => {
      if (!idleTriggers) return;
      log('CollectorProvider: handler invoked for presence');
      setTrigger({
        id: 'fb_ads_homepage',
        behaviour: 'modal',
        data: {
          text: 'Are you still there?',
          message: "We'd love to welcome to you to our restaurant, book now to get your offer",
          button: 'Start Booking'
        },
        brand: getBrand(window.location.href)
      });
    }
  }, React.createElement(CollectorContext.Provider, {
    value: {}
  }, children, renderedTrigger));
};
const CollectorContext = createContext({});

init({
  dsn: 'https://129339f9b28f958328e76d62fb3f0b2b@o1282674.ingest.sentry.io/4505641419014144',
  integrations: [new BrowserTracing({
    tracePropagationTargets: ['localhost:8000', 'https:yourserver.io/api/']
  }), new Replay()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1,
  replaysOnErrorSampleRate: 1.0
});
const queryClient = new QueryClient();
const includedHandlers = [{
  id: 'modal',
  behaviour: 'modal',
  invoke: trigger => React.createElement(TriggerModal, {
    trigger: trigger
  })
}, {
  id: 'youtube',
  behaviour: 'youtube',
  invoke: trigger => React.createElement(TriggerYoutube, {
    trigger: trigger
  })
}];
const FingerprintProvider = ({
  appId,
  children,
  consent: _consent = false,
  consentCallback,
  debug,
  defaultHandlers,
  initialDelay: _initialDelay = 0,
  exitIntentTriggers: _exitIntentTriggers = true,
  idleTriggers: _idleTriggers = true
}) => {
  const [consentGiven, setConsentGiven] = useState(_consent);
  const [booted, setBooted] = useState(false);
  const [handlers, setHandlers] = useState(defaultHandlers || includedHandlers);
  const registerHandler = React.useCallback(trigger => {
    setHandlers(handlers => {
      return [...handlers, trigger];
    });
  }, [setHandlers]);
  useEffect(() => {
    if (_consent) {
      setConsentGiven(_consent);
      return;
    }
    if (!consentCallback) return;
    const consentGivenViaCallback = consentCallback();
    const interval = setInterval(() => {
      setConsentGiven(_consent);
    }, 1000);
    if (consentGivenViaCallback) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [consentCallback, _consent]);
  useEffect(() => {
    if (!appId) {
      throw new Error('C&M Fingerprint: appId is required');
    }
    if (booted) {
      return;
    }
    if (!consentGiven) {
      return;
    }
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
  return React.createElement(ErrorBoundary, {
    fallback: React.createElement("p", null, "An error with Fingerprint has occurred."),
    onError: (error, info) => console.error(error, info)
  }, React.createElement(LoggingProvider, {
    debug: debug
  }, React.createElement(QueryClientProvider, {
    client: queryClient
  }, React.createElement(FingerprintContext.Provider, {
    value: {
      appId,
      booted,
      currentTrigger: {},
      registerHandler,
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
      exitIntentTriggers: _exitIntentTriggers
    }
  }, React.createElement(VisitorProvider, null, React.createElement(CollectorProvider, {
    handlers: handlers
  }, React.createElement(ErrorBoundary$1, {
    onError: (error, info) => console.error(error, info),
    fallback: React.createElement("div", null, "An application error occurred.")
  }, children)))))));
};
const defaultFingerprintState = {
  appId: '',
  booted: false,
  consent: false,
  currentTrigger: {},
  exitIntentTriggers: false,
  idleTriggers: false,
  initialDelay: 0,
  registerHandler: () => {},
  trackEvent: () => {},
  trackPageView: () => {},
  unregisterHandler: () => {}
};
const FingerprintContext = createContext({
  ...defaultFingerprintState
});

export { FingerprintContext, FingerprintProvider, onCookieChanged, useFingerprint };
//# sourceMappingURL=index.modern.js.map

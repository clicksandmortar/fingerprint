import React, { createContext, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { validate, version, v4 } from 'uuid';
import { useExitIntent } from 'use-exit-intent';
import { IdleTimerProvider } from 'react-idle-timer';
import { init, BrowserTracing, Replay, ErrorBoundary } from '@sentry/react';

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

const setCookie = (name, value) => {
  return Cookies.set(name, value, {
    expires: 365,
    sameSite: 'strict'
  });
};
const getCookie = name => {
  return Cookies.get(name);
};

const sendEvent = data => {
  console.log('Server received event', data);
  const firstSeen = getCookie('firstSeen') ? getCookie('firstSeen') || '' : setCookie('firstSeen', new Date().toISOString()) || '';
  const lastSeen = getCookie('lastSeen') ? getCookie('lastSeen') || '' : setCookie('lastSeen', new Date().toISOString()) || '';
  setCookie('lastSeen', new Date().toISOString());
  const previousVisits = getCookie('visits') ? parseInt(getCookie('visits') || '0') : 0;
  const visits = previousVisits + 1;
  setCookie('visits', visits.toString());
  const trigger = getTrigger({
    ...data,
    firstSeen,
    lastSeen,
    visits
  });
  return {
    firstSeen: new Date(firstSeen),
    lastSeen: new Date(lastSeen),
    visits,
    trigger
  };
};
const getTrigger = data => {
  var _data$page, _data$page2, _data$page3, _data$referrer, _data$referrer$utm, _data$page4;
  console.log('getting trigger', data);
  const trigger = {};
  const context = {
    firstSeen: data.firstSeen,
    lastSeen: data.lastSeen,
    visits: data.visits
  };
  const brand = getBrand(data === null || data === void 0 ? void 0 : (_data$page = data.page) === null || _data$page === void 0 ? void 0 : _data$page.url);
  const offer = getOffer(data === null || data === void 0 ? void 0 : (_data$page2 = data.page) === null || _data$page2 === void 0 ? void 0 : _data$page2.url);
  const url = getUrl(data === null || data === void 0 ? void 0 : (_data$page3 = data.page) === null || _data$page3 === void 0 ? void 0 : _data$page3.url);
  console.log('brand', brand, 'offer', offer, 'url', url);
  if (!brand || !offer) {
    return trigger;
  }
  if ((data === null || data === void 0 ? void 0 : (_data$referrer = data.referrer) === null || _data$referrer === void 0 ? void 0 : (_data$referrer$utm = _data$referrer.utm) === null || _data$referrer$utm === void 0 ? void 0 : _data$referrer$utm.campaign) === 'UTM_OFFER' && (data === null || data === void 0 ? void 0 : (_data$page4 = data.page) === null || _data$page4 === void 0 ? void 0 : _data$page4.path) === '/') {
    trigger.id = 'fb_ads_homepage';
    trigger.behaviour = 'modal';
    trigger.data = {
      text: 'Get your ' + offer + '!',
      message: 'Find the closest location to you and complete your booking now to get ' + offer + '',
      button: 'Start Booking',
      ...(url ? {
        url
      } : {}),
      ...context
    };
    trigger.brand = brand;
  }
  return trigger;
};
const getOffer = url => {
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
const getUrl = url => {
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

const useCollector = () => {
  return useMutation(data => {
    console.log('Sending CollectorUpdate to Mock Collector API', data);
    return Promise.resolve(sendEvent(data));
  }, {
    onSuccess: () => {}
  });
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

const useFingerprint = () => {
  return useContext(FingerprintContext);
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
  const showTrigger = trigger => {
    if (!trigger || !trigger.behaviour) {
      return null;
    }
    const handler = (handlers === null || handlers === void 0 ? void 0 : handlers.find(handler => handler.id === trigger.id && handler.behaviour === trigger.behaviour)) || (handlers === null || handlers === void 0 ? void 0 : handlers.find(handler => handler.behaviour === trigger.behaviour));
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
  useEffect(() => {
    console.log('exitIntentTriggers', exitIntentTriggers);
    if (!exitIntentTriggers) return;
    registerHandler({
      id: 'clientTriger',
      handler: () => {
        log('CollectorProvider: handler invoked for departure');
        setTrigger({
          id: 'modal',
          behaviour: 'modal',
          data: {
            url: 'https://www.youtube.com/embed/bj1BMpUnzT8?start=13'
          }
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
    return () => clearTimeout(delay);
  }, [booted]);
  return React.createElement(IdleTimerProvider, {
    timeout: 1000 * 10,
    onPresenceChange: presence => log('presence changed', presence),
    onIdle: () => {
      console.log('user is idle');
      if (!idleTriggers) return;
      log('CollectorProvider: handler invoked for presence');
      setTrigger({
        id: 'modal',
        behaviour: 'modal',
        data: {
          url: 'https://www.youtube.com/embed/CSvFpBOe8eY?start=44'
        }
      });
    }
  }, React.createElement(CollectorContext.Provider, {
    value: {}
  }, children, showTrigger(trigger)));
};
const CollectorContext = createContext({});

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
  exitIntentTriggers: _exitIntentTriggers = false,
  idleTriggers: _idleTriggers = false
}) => {
  const [consentGiven, setConsentGiven] = useState(_consent);
  const [booted, setBooted] = useState(false);
  const [handlers, setHandlers] = useState(defaultHandlers || includedHandlers);
  const registerHandler = trigger => {
    setHandlers(handlers => {
      return [...handlers, trigger];
    });
  };
  useEffect(() => {
    if (!consentCallback) return;
    const interval = setInterval(() => {
      if (consentCallback) {
        setConsentGiven(consentCallback());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
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
  return React.createElement(ErrorBoundary, {
    fallback: React.createElement("p", null, "An error has occurred")
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
  }, children))))));
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

const Widget = ({
  appId,
  consent,
  debug
}) => {
  return React.createElement(FingerprintProvider, {
    appId: appId,
    consent: consent,
    debug: debug
  });
};

var _document, _document$currentScri, _document2, _document2$currentScr, _document3, _document3$currentScr;
const widget = document.createElement('div');
widget.id = 'fingerprint-widget';
document.body.appendChild(widget);
const styles = document.createElement('link');
styles.rel = 'stylesheet';
styles.href = '../dist/fingerprint.css';
document.head.appendChild(styles);
ReactDOM.render(React.createElement(React.StrictMode, null, React.createElement(Widget, {
  appId: ((_document = document) === null || _document === void 0 ? void 0 : (_document$currentScri = _document.currentScript) === null || _document$currentScri === void 0 ? void 0 : _document$currentScri.getAttribute('id')) || '',
  consent: ((_document2 = document) === null || _document2 === void 0 ? void 0 : (_document2$currentScr = _document2.currentScript) === null || _document2$currentScr === void 0 ? void 0 : _document2$currentScr.getAttribute('data-consent')) === 'true',
  debug: ((_document3 = document) === null || _document3 === void 0 ? void 0 : (_document3$currentScr = _document3.currentScript) === null || _document3$currentScr === void 0 ? void 0 : _document3$currentScr.getAttribute('data-debug')) === 'true'
})), document.getElementById('fingerprint-widget'));
//# sourceMappingURL=fingerprint.modern.js.map

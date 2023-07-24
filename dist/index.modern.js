import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { validate, version, v4 } from 'uuid';

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
    throw new Error(...message);
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
  return useMutation(data => {
    console.log(data);
    return data;
  }, {
    onSuccess: () => {}
  });
};

const CollectorProvider = () => {
  const {
    log
  } = useLogging();
  const {
    mutateAsync: collect
  } = useCollector();
  useEffect(() => {
    log('CollectorProvider: collecting data');
    collect({
      type: 'pageview',
      data: {}
    }).then(response => {
      console.warn('sent collect data, retrieved:', response);
    }).catch(error => {
      console.error('failed to store collected data', error);
    });
    log('CollectorProvider: collected data');
  }, []);
  return React.createElement(CollectorContext.Provider, {
    value: {}
  });
};
const CollectorContext = createContext({});

const bootstrapSession = ({
  appId,
  setSession
}) => {
  const session = {
    firstVisit: undefined
  };
  if (!Cookies.get('_cm') || Cookies.get('_cm') !== appId) {
    Cookies.set('_cm', appId, {
      expires: 365
    });
    session.firstVisit = true;
    setSession(session);
    return;
  }
  if (Cookies.get('_cm') && Cookies.get('_cm') === appId) {
    session.firstVisit = false;
    console.log('setting firstVisit to false');
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
  if (!Cookies.get('_cm_id') || !validVisitorId(Cookies.get('_cm_id'))) {
    const visitorId = v4();
    Cookies.set('_cm_id', visitorId, {
      expires: 365
    });
    visitor.id = visitorId;
    setVisitor(visitor);
    return;
  }
  if (Cookies.get('_cm_id')) {
    visitor.id = Cookies.get('_cm_id');
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
  console.log('VisitorProvider');
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
    value: {}
  }, children);
};
const VisitorContext = createContext({});

const queryClient = new QueryClient();
const FingerprintProvider = props => {
  const {
    appId,
    debug
  } = props;
  const [booted, setBooted] = useState(false);
  useEffect(() => {
    if (!appId) {
      throw new Error('C&M Fingerprint: appId is required');
    }
    if (booted) {
      return;
    }
    const performBoot = async () => {
      setBooted(true);
    };
    performBoot();
  }, []);
  if (!appId) {
    return null;
  }
  return React.createElement(LoggingProvider, {
    debug: debug
  }, React.createElement(QueryClientProvider, {
    client: queryClient
  }, React.createElement(FingerprintContext.Provider, {
    value: {
      appId,
      booted
    }
  }, React.createElement(VisitorProvider, null, React.createElement(CollectorProvider, null)))));
};
const defaultFingerprintState = {
  appId: '',
  booted: false
};
const FingerprintContext = createContext({
  ...defaultFingerprintState
});
const useFingerprint = () => {
  return useContext(FingerprintContext);
};

export { FingerprintContext, FingerprintProvider, useFingerprint };
//# sourceMappingURL=index.modern.js.map

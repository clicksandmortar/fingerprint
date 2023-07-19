import React, { useState, useEffect, createContext, useContext } from 'react';
import Cookies from 'js-cookie';
import { validate, version, v4 } from 'uuid';

const bootstrapSession = ({
  appId,
  setSession
}) => {
  const session = {
    firstVisit: undefined
  };
  if (!Cookies.get('_cm') || Cookies.get('_cm') !== appId) {
    alert('new user');
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

const bootstrapSettings = async () => {};

const defaultFingerprintState = {
  session: {
    firstVisit: undefined
  },
  visitor: {
    id: undefined
  }
};
const FingerprintProvider = props => {
  const {
    appId,
    children,
    debug
  } = props;
  const [booted, setBooted] = useState(false);
  const [fingerprint, setFingerprint] = useState(defaultFingerprintState);
  const setSession = session => {
    console.log('setting session', session, fingerprint);
    setFingerprint({
      ...fingerprint,
      session
    });
  };
  const setVisitor = visitor => {
    console.log('setting visitor', visitor, fingerprint);
    setFingerprint({
      ...fingerprint,
      visitor
    });
  };
  useEffect(() => {
    if (!appId) {
      throw new Error('C&M Fingerprint: appId is required');
    }
    if (booted) {
      return;
    }
    const performBoot = async () => {
      await bootstrapSettings();
      await bootstrapSession({
        appId,
        setSession
      });
      await bootstrapVisitor({
        setVisitor
      });
      if (debug) {
        console.log('C&M Fingerprint Booted');
      }
      setBooted(true);
    };
    performBoot();
  }, []);
  useEffect(() => {
    if (debug) {
      console.log('C&M Fingerprint: ', fingerprint);
    }
  }, [fingerprint]);
  return React.createElement(FingerprintContext.Provider, {
    value: {
      ...fingerprint
    }
  }, children);
};
const FingerprintContext = createContext({
  ...defaultFingerprintState
});

const useFingerprint = () => {
  const {
    session
  } = useContext(FingerprintContext);
  return {
    session
  };
};

export { FingerprintContext, FingerprintProvider, useFingerprint };
//# sourceMappingURL=index.modern.js.map

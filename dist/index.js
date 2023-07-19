function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var Cookies = _interopDefault(require('js-cookie'));
var uuid = require('uuid');

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

var bootstrapSession = function bootstrapSession(_ref) {
  var appId = _ref.appId,
    setSession = _ref.setSession;
  var session = {
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
  if (!Cookies.get('_cm_id') || !validVisitorId(Cookies.get('_cm_id'))) {
    var visitorId = uuid.v4();
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

var bootstrapSettings = function bootstrapSettings() {
  return Promise.resolve();
};

var defaultFingerprintState = {
  session: {
    firstVisit: undefined
  },
  visitor: {
    id: undefined
  }
};
var FingerprintProvider = function FingerprintProvider(props) {
  var appId = props.appId,
    children = props.children,
    debug = props.debug;
  var _useState = React.useState(false),
    booted = _useState[0],
    setBooted = _useState[1];
  var _useState2 = React.useState(defaultFingerprintState),
    fingerprint = _useState2[0],
    setFingerprint = _useState2[1];
  var setSession = function setSession(session) {
    console.log('setting session', session, fingerprint);
    setFingerprint(_extends({}, fingerprint, {
      session: session
    }));
  };
  var setVisitor = function setVisitor(visitor) {
    console.log('setting visitor', visitor, fingerprint);
    setFingerprint(_extends({}, fingerprint, {
      visitor: visitor
    }));
  };
  React.useEffect(function () {
    if (!appId) {
      throw new Error('C&M Fingerprint: appId is required');
    }
    if (booted) {
      return;
    }
    var performBoot = function performBoot() {
      try {
        return Promise.resolve(bootstrapSettings()).then(function () {
          return Promise.resolve(bootstrapSession({
            appId: appId,
            setSession: setSession
          })).then(function () {
            return Promise.resolve(bootstrapVisitor({
              setVisitor: setVisitor
            })).then(function () {
              if (debug) {
                console.log('C&M Fingerprint Booted');
              }
              setBooted(true);
            });
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
    performBoot();
  }, []);
  React.useEffect(function () {
    if (debug) {
      console.log('C&M Fingerprint: ', fingerprint);
    }
  }, [fingerprint]);
  return React__default.createElement(FingerprintContext.Provider, {
    value: _extends({}, fingerprint)
  }, children);
};
var FingerprintContext = React.createContext(_extends({}, defaultFingerprintState));

var useFingerprint = function useFingerprint() {
  var _useContext = React.useContext(FingerprintContext),
    session = _useContext.session;
  return {
    session: session
  };
};

exports.FingerprintContext = FingerprintContext;
exports.FingerprintProvider = FingerprintProvider;
exports.useFingerprint = useFingerprint;
//# sourceMappingURL=index.js.map

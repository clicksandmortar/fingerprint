function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactQuery = require('@tanstack/react-query');
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
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
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
    for (var _len = arguments.length, message = new Array(_len), _key = 0; _key < _len; _key++) {
      message[_key] = arguments[_key];
    }
    if (debug) {
      var _console3;
      (_console3 = console).error.apply(_console3, message);
    }
    throw _construct(Error, message);
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

var useCollector = function useCollector() {
  return reactQuery.useMutation(function (data) {
    console.log(data);
    return data;
  }, {
    onSuccess: function onSuccess() {}
  });
};

var CollectorProvider = function CollectorProvider() {
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var _useCollector = useCollector(),
    collect = _useCollector.mutateAsync;
  React.useEffect(function () {
    log('CollectorProvider: collecting data');
    collect({
      type: 'pageview',
      data: {}
    }).then(function (response) {
      console.warn('sent collect data, retrieved:', response);
    })["catch"](function (error) {
      console.error('failed to store collected data', error);
    });
    log('CollectorProvider: collected data');
  }, []);
  return React__default.createElement(CollectorContext.Provider, {
    value: {}
  });
};
var CollectorContext = React.createContext({});

var bootstrapSession = function bootstrapSession(_ref) {
  var appId = _ref.appId,
    setSession = _ref.setSession;
  var session = {
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
  console.log('VisitorProvider');
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
    value: {}
  }, children);
};
var VisitorContext = React.createContext({});

var queryClient = new reactQuery.QueryClient();
var FingerprintProvider = function FingerprintProvider(props) {
  var appId = props.appId,
    debug = props.debug;
  var _useState = React.useState(false),
    booted = _useState[0],
    setBooted = _useState[1];
  React.useEffect(function () {
    if (!appId) {
      throw new Error('C&M Fingerprint: appId is required');
    }
    if (booted) {
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
  }, []);
  if (!appId) {
    return null;
  }
  return React__default.createElement(LoggingProvider, {
    debug: debug
  }, React__default.createElement(reactQuery.QueryClientProvider, {
    client: queryClient
  }, React__default.createElement(FingerprintContext.Provider, {
    value: {
      appId: appId,
      booted: booted
    }
  }, React__default.createElement(VisitorProvider, null, React__default.createElement(CollectorProvider, null)))));
};
var defaultFingerprintState = {
  appId: '',
  booted: false
};
var FingerprintContext = React.createContext(_extends({}, defaultFingerprintState));
var useFingerprint = function useFingerprint() {
  return React.useContext(FingerprintContext);
};

exports.FingerprintContext = FingerprintContext;
exports.FingerprintProvider = FingerprintProvider;
exports.useFingerprint = useFingerprint;
//# sourceMappingURL=index.js.map

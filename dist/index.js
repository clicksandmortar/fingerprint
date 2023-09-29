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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var uaParser_min = createCommonjsModule(function (module, exports) {
/* UAParser.js v1.0.36
   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
   MIT License */
(function(window,undefined$1){var LIBVERSION="1.0.36",EMPTY="",UNKNOWN="?",FUNC_TYPE="function",UNDEF_TYPE="undefined",OBJ_TYPE="object",STR_TYPE="string",MAJOR="major",MODEL="model",NAME="name",TYPE="type",VENDOR="vendor",VERSION="version",ARCHITECTURE="architecture",CONSOLE="console",MOBILE="mobile",TABLET="tablet",SMARTTV="smarttv",WEARABLE="wearable",EMBEDDED="embedded",UA_MAX_LENGTH=350;var AMAZON="Amazon",APPLE="Apple",ASUS="ASUS",BLACKBERRY="BlackBerry",BROWSER="Browser",CHROME="Chrome",EDGE="Edge",FIREFOX="Firefox",GOOGLE="Google",HUAWEI="Huawei",LG="LG",MICROSOFT="Microsoft",MOTOROLA="Motorola",OPERA="Opera",SAMSUNG="Samsung",SHARP="Sharp",SONY="Sony",XIAOMI="Xiaomi",ZEBRA="Zebra",FACEBOOK="Facebook",CHROMIUM_OS="Chromium OS",MAC_OS="Mac OS";var extend=function(regexes,extensions){var mergedRegexes={};for(var i in regexes){if(extensions[i]&&extensions[i].length%2===0){mergedRegexes[i]=extensions[i].concat(regexes[i]);}else {mergedRegexes[i]=regexes[i];}}return mergedRegexes},enumerize=function(arr){var enums={};for(var i=0;i<arr.length;i++){enums[arr[i].toUpperCase()]=arr[i];}return enums},has=function(str1,str2){return typeof str1===STR_TYPE?lowerize(str2).indexOf(lowerize(str1))!==-1:false},lowerize=function(str){return str.toLowerCase()},majorize=function(version){return typeof version===STR_TYPE?version.replace(/[^\d\.]/g,EMPTY).split(".")[0]:undefined$1},trim=function(str,len){if(typeof str===STR_TYPE){str=str.replace(/^\s\s*/,EMPTY);return typeof len===UNDEF_TYPE?str:str.substring(0,UA_MAX_LENGTH)}};var rgxMapper=function(ua,arrays){var i=0,j,k,p,q,matches,match;while(i<arrays.length&&!matches){var regex=arrays[i],props=arrays[i+1];j=k=0;while(j<regex.length&&!matches){if(!regex[j]){break}matches=regex[j++].exec(ua);if(!!matches){for(p=0;p<props.length;p++){match=matches[++k];q=props[p];if(typeof q===OBJ_TYPE&&q.length>0){if(q.length===2){if(typeof q[1]==FUNC_TYPE){this[q[0]]=q[1].call(this,match);}else {this[q[0]]=q[1];}}else if(q.length===3){if(typeof q[1]===FUNC_TYPE&&!(q[1].exec&&q[1].test)){this[q[0]]=match?q[1].call(this,match,q[2]):undefined$1;}else {this[q[0]]=match?match.replace(q[1],q[2]):undefined$1;}}else if(q.length===4){this[q[0]]=match?q[3].call(this,match.replace(q[1],q[2])):undefined$1;}}else {this[q]=match?match:undefined$1;}}}}i+=2;}},strMapper=function(str,map){for(var i in map){if(typeof map[i]===OBJ_TYPE&&map[i].length>0){for(var j=0;j<map[i].length;j++){if(has(map[i][j],str)){return i===UNKNOWN?undefined$1:i}}}else if(has(map[i],str)){return i===UNKNOWN?undefined$1:i}}return str};var oldSafariMap={"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"},windowsVersionMap={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"};var regexes={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[VERSION,[NAME,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[VERSION,[NAME,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[NAME,VERSION],[/opios[\/ ]+([\w\.]+)/i],[VERSION,[NAME,OPERA+" Mini"]],[/\bopr\/([\w\.]+)/i],[VERSION,[NAME,OPERA]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[NAME,VERSION],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[VERSION,[NAME,"UC"+BROWSER]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i],[VERSION,[NAME,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[VERSION,[NAME,"WeChat"]],[/konqueror\/([\w\.]+)/i],[VERSION,[NAME,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[VERSION,[NAME,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[VERSION,[NAME,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[NAME,/(.+)/,"$1 Secure "+BROWSER],VERSION],[/\bfocus\/([\w\.]+)/i],[VERSION,[NAME,FIREFOX+" Focus"]],[/\bopt\/([\w\.]+)/i],[VERSION,[NAME,OPERA+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[VERSION,[NAME,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[VERSION,[NAME,"Dolphin"]],[/coast\/([\w\.]+)/i],[VERSION,[NAME,OPERA+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[VERSION,[NAME,"MIUI "+BROWSER]],[/fxios\/([-\w\.]+)/i],[VERSION,[NAME,FIREFOX]],[/\bqihu|(qi?ho?o?|360)browser/i],[[NAME,"360 "+BROWSER]],[/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],[[NAME,/(.+)/,"$1 "+BROWSER],VERSION],[/(comodo_dragon)\/([\w\.]+)/i],[[NAME,/_/g," "],VERSION],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[NAME,VERSION],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i,/\[(linkedin)app\]/i],[NAME],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[NAME,FACEBOOK],VERSION],[/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i],[NAME,VERSION],[/\bgsa\/([\w\.]+) .*safari\//i],[VERSION,[NAME,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[VERSION,[NAME,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[VERSION,[NAME,CHROME+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[NAME,CHROME+" WebView"],VERSION],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[VERSION,[NAME,"Android "+BROWSER]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[NAME,VERSION],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[VERSION,[NAME,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[VERSION,NAME],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[NAME,[VERSION,strMapper,oldSafariMap]],[/(webkit|khtml)\/([\w\.]+)/i],[NAME,VERSION],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[NAME,"Netscape"],VERSION],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[VERSION,[NAME,FIREFOX+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[NAME,VERSION],[/(cobalt)\/([\w\.]+)/i],[NAME,[VERSION,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[ARCHITECTURE,"amd64"]],[/(ia32(?=;))/i],[[ARCHITECTURE,lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[ARCHITECTURE,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[ARCHITECTURE,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[ARCHITECTURE,"armhf"]],[/windows (ce|mobile); ppc;/i],[[ARCHITECTURE,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[ARCHITECTURE,/ower/,EMPTY,lowerize]],[/(sun4\w)[;\)]/i],[[ARCHITECTURE,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[ARCHITECTURE,lowerize]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[MODEL,[VENDOR,SAMSUNG],[TYPE,TABLET]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[MODEL,[VENDOR,SAMSUNG],[TYPE,MOBILE]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[MODEL,[VENDOR,APPLE],[TYPE,MOBILE]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[MODEL,[VENDOR,APPLE],[TYPE,TABLET]],[/(macintosh);/i],[MODEL,[VENDOR,APPLE]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[MODEL,[VENDOR,SHARP],[TYPE,MOBILE]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[MODEL,[VENDOR,HUAWEI],[TYPE,TABLET]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[MODEL,[VENDOR,HUAWEI],[TYPE,MOBILE]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[MODEL,/_/g," "],[VENDOR,XIAOMI],[TYPE,MOBILE]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[MODEL,/_/g," "],[VENDOR,XIAOMI],[TYPE,TABLET]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[MODEL,[VENDOR,"OPPO"],[TYPE,MOBILE]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[MODEL,[VENDOR,"Vivo"],[TYPE,MOBILE]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[MODEL,[VENDOR,"Realme"],[TYPE,MOBILE]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[MODEL,[VENDOR,MOTOROLA],[TYPE,MOBILE]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[MODEL,[VENDOR,MOTOROLA],[TYPE,TABLET]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[MODEL,[VENDOR,LG],[TYPE,TABLET]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[MODEL,[VENDOR,LG],[TYPE,MOBILE]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[MODEL,[VENDOR,"Lenovo"],[TYPE,TABLET]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[MODEL,/_/g," "],[VENDOR,"Nokia"],[TYPE,MOBILE]],[/(pixel c)\b/i],[MODEL,[VENDOR,GOOGLE],[TYPE,TABLET]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[MODEL,[VENDOR,GOOGLE],[TYPE,MOBILE]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[MODEL,[VENDOR,SONY],[TYPE,MOBILE]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[MODEL,"Xperia Tablet"],[VENDOR,SONY],[TYPE,TABLET]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[MODEL,[VENDOR,"OnePlus"],[TYPE,MOBILE]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[MODEL,[VENDOR,AMAZON],[TYPE,TABLET]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[MODEL,/(.+)/g,"Fire Phone $1"],[VENDOR,AMAZON],[TYPE,MOBILE]],[/(playbook);[-\w\),; ]+(rim)/i],[MODEL,VENDOR,[TYPE,TABLET]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[MODEL,[VENDOR,BLACKBERRY],[TYPE,MOBILE]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[MODEL,[VENDOR,ASUS],[TYPE,TABLET]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[MODEL,[VENDOR,ASUS],[TYPE,MOBILE]],[/(nexus 9)/i],[MODEL,[VENDOR,"HTC"],[TYPE,TABLET]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[VENDOR,[MODEL,/_/g," "],[TYPE,MOBILE]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[MODEL,[VENDOR,"Acer"],[TYPE,TABLET]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[MODEL,[VENDOR,"Meizu"],[TYPE,MOBILE]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[VENDOR,MODEL,[TYPE,TABLET]],[/(surface duo)/i],[MODEL,[VENDOR,MICROSOFT],[TYPE,TABLET]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[MODEL,[VENDOR,"Fairphone"],[TYPE,MOBILE]],[/(u304aa)/i],[MODEL,[VENDOR,"AT&T"],[TYPE,MOBILE]],[/\bsie-(\w*)/i],[MODEL,[VENDOR,"Siemens"],[TYPE,MOBILE]],[/\b(rct\w+) b/i],[MODEL,[VENDOR,"RCA"],[TYPE,TABLET]],[/\b(venue[\d ]{2,7}) b/i],[MODEL,[VENDOR,"Dell"],[TYPE,TABLET]],[/\b(q(?:mv|ta)\w+) b/i],[MODEL,[VENDOR,"Verizon"],[TYPE,TABLET]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[MODEL,[VENDOR,"Barnes & Noble"],[TYPE,TABLET]],[/\b(tm\d{3}\w+) b/i],[MODEL,[VENDOR,"NuVision"],[TYPE,TABLET]],[/\b(k88) b/i],[MODEL,[VENDOR,"ZTE"],[TYPE,TABLET]],[/\b(nx\d{3}j) b/i],[MODEL,[VENDOR,"ZTE"],[TYPE,MOBILE]],[/\b(gen\d{3}) b.+49h/i],[MODEL,[VENDOR,"Swiss"],[TYPE,MOBILE]],[/\b(zur\d{3}) b/i],[MODEL,[VENDOR,"Swiss"],[TYPE,TABLET]],[/\b((zeki)?tb.*\b) b/i],[MODEL,[VENDOR,"Zeki"],[TYPE,TABLET]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[VENDOR,"Dragon Touch"],MODEL,[TYPE,TABLET]],[/\b(ns-?\w{0,9}) b/i],[MODEL,[VENDOR,"Insignia"],[TYPE,TABLET]],[/\b((nxa|next)-?\w{0,9}) b/i],[MODEL,[VENDOR,"NextBook"],[TYPE,TABLET]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[VENDOR,"Voice"],MODEL,[TYPE,MOBILE]],[/\b(lvtel\-)?(v1[12]) b/i],[[VENDOR,"LvTel"],MODEL,[TYPE,MOBILE]],[/\b(ph-1) /i],[MODEL,[VENDOR,"Essential"],[TYPE,MOBILE]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[MODEL,[VENDOR,"Envizen"],[TYPE,TABLET]],[/\b(trio[-\w\. ]+) b/i],[MODEL,[VENDOR,"MachSpeed"],[TYPE,TABLET]],[/\btu_(1491) b/i],[MODEL,[VENDOR,"Rotor"],[TYPE,TABLET]],[/(shield[\w ]+) b/i],[MODEL,[VENDOR,"Nvidia"],[TYPE,TABLET]],[/(sprint) (\w+)/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/(kin\.[onetw]{3})/i],[[MODEL,/\./g," "],[VENDOR,MICROSOFT],[TYPE,MOBILE]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[MODEL,[VENDOR,ZEBRA],[TYPE,TABLET]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[MODEL,[VENDOR,ZEBRA],[TYPE,MOBILE]],[/smart-tv.+(samsung)/i],[VENDOR,[TYPE,SMARTTV]],[/hbbtv.+maple;(\d+)/i],[[MODEL,/^/,"SmartTV"],[VENDOR,SAMSUNG],[TYPE,SMARTTV]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[VENDOR,LG],[TYPE,SMARTTV]],[/(apple) ?tv/i],[VENDOR,[MODEL,APPLE+" TV"],[TYPE,SMARTTV]],[/crkey/i],[[MODEL,CHROME+"cast"],[VENDOR,GOOGLE],[TYPE,SMARTTV]],[/droid.+aft(\w+)( bui|\))/i],[MODEL,[VENDOR,AMAZON],[TYPE,SMARTTV]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[MODEL,[VENDOR,SHARP],[TYPE,SMARTTV]],[/(bravia[\w ]+)( bui|\))/i],[MODEL,[VENDOR,SONY],[TYPE,SMARTTV]],[/(mitv-\w{5}) bui/i],[MODEL,[VENDOR,XIAOMI],[TYPE,SMARTTV]],[/Hbbtv.*(technisat) (.*);/i],[VENDOR,MODEL,[TYPE,SMARTTV]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[VENDOR,trim],[MODEL,trim],[TYPE,SMARTTV]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[TYPE,SMARTTV]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[VENDOR,MODEL,[TYPE,CONSOLE]],[/droid.+; (shield) bui/i],[MODEL,[VENDOR,"Nvidia"],[TYPE,CONSOLE]],[/(playstation [345portablevi]+)/i],[MODEL,[VENDOR,SONY],[TYPE,CONSOLE]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[MODEL,[VENDOR,MICROSOFT],[TYPE,CONSOLE]],[/((pebble))app/i],[VENDOR,MODEL,[TYPE,WEARABLE]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[MODEL,[VENDOR,APPLE],[TYPE,WEARABLE]],[/droid.+; (glass) \d/i],[MODEL,[VENDOR,GOOGLE],[TYPE,WEARABLE]],[/droid.+; (wt63?0{2,3})\)/i],[MODEL,[VENDOR,ZEBRA],[TYPE,WEARABLE]],[/(quest( 2| pro)?)/i],[MODEL,[VENDOR,FACEBOOK],[TYPE,WEARABLE]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[VENDOR,[TYPE,EMBEDDED]],[/(aeobc)\b/i],[MODEL,[VENDOR,AMAZON],[TYPE,EMBEDDED]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[MODEL,[TYPE,MOBILE]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[MODEL,[TYPE,TABLET]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[TYPE,TABLET]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[TYPE,MOBILE]],[/(android[-\w\. ]{0,9});.+buil/i],[MODEL,[VENDOR,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[VERSION,[NAME,EDGE+"HTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[VERSION,[NAME,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[NAME,VERSION],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[VERSION,NAME]],os:[[/microsoft (windows) (vista|xp)/i],[NAME,VERSION],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[NAME,[VERSION,strMapper,windowsVersionMap]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[NAME,"Windows"],[VERSION,strMapper,windowsVersionMap]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[VERSION,/_/g,"."],[NAME,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[NAME,MAC_OS],[VERSION,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[VERSION,NAME],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[NAME,VERSION],[/\(bb(10);/i],[VERSION,[NAME,BLACKBERRY]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[VERSION,[NAME,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[VERSION,[NAME,FIREFOX+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[VERSION,[NAME,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[VERSION,[NAME,"watchOS"]],[/crkey\/([\d\.]+)/i],[VERSION,[NAME,CHROME+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[NAME,CHROMIUM_OS],VERSION],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[NAME,VERSION],[/(sunos) ?([\w\.\d]*)/i],[[NAME,"Solaris"],VERSION],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[NAME,VERSION]]};var UAParser=function(ua,extensions){if(typeof ua===OBJ_TYPE){extensions=ua;ua=undefined$1;}if(!(this instanceof UAParser)){return new UAParser(ua,extensions).getResult()}var _navigator=typeof window!==UNDEF_TYPE&&window.navigator?window.navigator:undefined$1;var _ua=ua||(_navigator&&_navigator.userAgent?_navigator.userAgent:EMPTY);var _uach=_navigator&&_navigator.userAgentData?_navigator.userAgentData:undefined$1;var _rgxmap=extensions?extend(regexes,extensions):regexes;var _isSelfNav=_navigator&&_navigator.userAgent==_ua;this.getBrowser=function(){var _browser={};_browser[NAME]=undefined$1;_browser[VERSION]=undefined$1;rgxMapper.call(_browser,_ua,_rgxmap.browser);_browser[MAJOR]=majorize(_browser[VERSION]);if(_isSelfNav&&_navigator&&_navigator.brave&&typeof _navigator.brave.isBrave==FUNC_TYPE){_browser[NAME]="Brave";}return _browser};this.getCPU=function(){var _cpu={};_cpu[ARCHITECTURE]=undefined$1;rgxMapper.call(_cpu,_ua,_rgxmap.cpu);return _cpu};this.getDevice=function(){var _device={};_device[VENDOR]=undefined$1;_device[MODEL]=undefined$1;_device[TYPE]=undefined$1;rgxMapper.call(_device,_ua,_rgxmap.device);if(_isSelfNav&&!_device[TYPE]&&_uach&&_uach.mobile){_device[TYPE]=MOBILE;}if(_isSelfNav&&_device[MODEL]=="Macintosh"&&_navigator&&typeof _navigator.standalone!==UNDEF_TYPE&&_navigator.maxTouchPoints&&_navigator.maxTouchPoints>2){_device[MODEL]="iPad";_device[TYPE]=TABLET;}return _device};this.getEngine=function(){var _engine={};_engine[NAME]=undefined$1;_engine[VERSION]=undefined$1;rgxMapper.call(_engine,_ua,_rgxmap.engine);return _engine};this.getOS=function(){var _os={};_os[NAME]=undefined$1;_os[VERSION]=undefined$1;rgxMapper.call(_os,_ua,_rgxmap.os);if(_isSelfNav&&!_os[NAME]&&_uach&&_uach.platform!="Unknown"){_os[NAME]=_uach.platform.replace(/chrome os/i,CHROMIUM_OS).replace(/macos/i,MAC_OS);}return _os};this.getResult=function(){return {ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}};this.getUA=function(){return _ua};this.setUA=function(ua){_ua=typeof ua===STR_TYPE&&ua.length>UA_MAX_LENGTH?trim(ua,UA_MAX_LENGTH):ua;return this};this.setUA(_ua);return this};UAParser.VERSION=LIBVERSION;UAParser.BROWSER=enumerize([NAME,VERSION,MAJOR]);UAParser.CPU=enumerize([ARCHITECTURE]);UAParser.DEVICE=enumerize([MODEL,VENDOR,TYPE,CONSOLE,MOBILE,SMARTTV,TABLET,WEARABLE,EMBEDDED]);UAParser.ENGINE=UAParser.OS=enumerize([NAME,VERSION]);{if(module.exports){exports=module.exports=UAParser;}exports.UAParser=UAParser;}var $=typeof window!==UNDEF_TYPE&&(window.jQuery||window.Zepto);if($&&!$.ua){var parser=new UAParser;$.ua=parser.getResult();$.ua.get=function(){return parser.getUA()};$.ua.set=function(ua){parser.setUA(ua);var result=parser.getResult();for(var prop in result){$.ua[prop]=result[prop];}};}})(typeof window==="object"?window:commonjsGlobal);
});

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }


var React__default$1 = _interopDefault(React__default);



var ClientUAInstance = new uaParser_min();
var browser = ClientUAInstance.getBrowser();
var cpu = ClientUAInstance.getCPU();
var device = ClientUAInstance.getDevice();
var engine = ClientUAInstance.getEngine();
var os = ClientUAInstance.getOS();
var ua = ClientUAInstance.getUA();
var setUa = function setUa(userAgentString) {
  return ClientUAInstance.setUA(userAgentString);
};
var parseUserAgent = function parseUserAgent(userAgent) {
  if (!userAgent) {
    console.error('No userAgent string was provided');
    return;
  }

  var UserAgentInstance = new uaParser_min(userAgent);
  return {
    UA: UserAgentInstance,
    browser: UserAgentInstance.getBrowser(),
    cpu: UserAgentInstance.getCPU(),
    device: UserAgentInstance.getDevice(),
    engine: UserAgentInstance.getEngine(),
    os: UserAgentInstance.getOS(),
    ua: UserAgentInstance.getUA(),
    setUserAgent: function setUserAgent(userAgentString) {
      return UserAgentInstance.setUA(userAgentString);
    }
  };
};

var UAHelper = /*#__PURE__*/Object.freeze({
  ClientUAInstance: ClientUAInstance,
  browser: browser,
  cpu: cpu,
  device: device,
  engine: engine,
  os: os,
  ua: ua,
  setUa: setUa,
  parseUserAgent: parseUserAgent
});

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var DeviceTypes = {
  Mobile: 'mobile',
  Tablet: 'tablet',
  SmartTv: 'smarttv',
  Console: 'console',
  Wearable: 'wearable',
  Embedded: 'embedded',
  Browser: undefined
};
var BrowserTypes = {
  Chrome: 'Chrome',
  Firefox: 'Firefox',
  Opera: 'Opera',
  Yandex: 'Yandex',
  Safari: 'Safari',
  InternetExplorer: 'Internet Explorer',
  Edge: 'Edge',
  Chromium: 'Chromium',
  Ie: 'IE',
  MobileSafari: 'Mobile Safari',
  EdgeChromium: 'Edge Chromium',
  MIUI: 'MIUI Browser',
  SamsungBrowser: 'Samsung Browser'
};
var OsTypes = {
  IOS: 'iOS',
  Android: 'Android',
  WindowsPhone: 'Windows Phone',
  Windows: 'Windows',
  MAC_OS: 'Mac OS'
};
var InitialDeviceTypes = {
  isMobile: false,
  isTablet: false,
  isBrowser: false,
  isSmartTV: false,
  isConsole: false,
  isWearable: false
};

var checkDeviceType = function checkDeviceType(type) {
  switch (type) {
    case DeviceTypes.Mobile:
      return {
        isMobile: true
      };

    case DeviceTypes.Tablet:
      return {
        isTablet: true
      };

    case DeviceTypes.SmartTv:
      return {
        isSmartTV: true
      };

    case DeviceTypes.Console:
      return {
        isConsole: true
      };

    case DeviceTypes.Wearable:
      return {
        isWearable: true
      };

    case DeviceTypes.Browser:
      return {
        isBrowser: true
      };

    case DeviceTypes.Embedded:
      return {
        isEmbedded: true
      };

    default:
      return InitialDeviceTypes;
  }
};
var setUserAgent = function setUserAgent(userAgent) {
  return setUa(userAgent);
};
var setDefaults = function setDefaults(p) {
  var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
  return p ? p : d;
};
var getNavigatorInstance = function getNavigatorInstance() {
  if (typeof window !== 'undefined') {
    if (window.navigator || navigator) {
      return window.navigator || navigator;
    }
  }

  return false;
};
var isIOS13Check = function isIOS13Check(type) {
  var nav = getNavigatorInstance();
  return nav && nav.platform && (nav.platform.indexOf(type) !== -1 || nav.platform === 'MacIntel' && nav.maxTouchPoints > 1 && !window.MSStream);
};

var browserPayload = function browserPayload(isBrowser, browser, engine, os, ua) {
  return {
    isBrowser: isBrowser,
    browserMajorVersion: setDefaults(browser.major),
    browserFullVersion: setDefaults(browser.version),
    browserName: setDefaults(browser.name),
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua)
  };
};
var mobilePayload = function mobilePayload(type, device, os, ua) {
  return _objectSpread2({}, type, {
    vendor: setDefaults(device.vendor),
    model: setDefaults(device.model),
    os: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    ua: setDefaults(ua)
  });
};
var smartTvPayload = function smartTvPayload(isSmartTV, engine, os, ua) {
  return {
    isSmartTV: isSmartTV,
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua)
  };
};
var consolePayload = function consolePayload(isConsole, engine, os, ua) {
  return {
    isConsole: isConsole,
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua)
  };
};
var wearablePayload = function wearablePayload(isWearable, engine, os, ua) {
  return {
    isWearable: isWearable,
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua)
  };
};
var embeddedPayload = function embeddedPayload(isEmbedded, device, engine, os, ua) {
  return {
    isEmbedded: isEmbedded,
    vendor: setDefaults(device.vendor),
    model: setDefaults(device.model),
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua)
  };
};

function deviceDetect(userAgent) {
  var _ref = userAgent ? parseUserAgent(userAgent) : UAHelper,
      device = _ref.device,
      browser = _ref.browser,
      engine = _ref.engine,
      os = _ref.os,
      ua = _ref.ua;

  var type = checkDeviceType(device.type);
  var isBrowser = type.isBrowser,
      isMobile = type.isMobile,
      isTablet = type.isTablet,
      isSmartTV = type.isSmartTV,
      isConsole = type.isConsole,
      isWearable = type.isWearable,
      isEmbedded = type.isEmbedded;

  if (isBrowser) {
    return browserPayload(isBrowser, browser, engine, os, ua);
  }

  if (isSmartTV) {
    return smartTvPayload(isSmartTV, engine, os, ua);
  }

  if (isConsole) {
    return consolePayload(isConsole, engine, os, ua);
  }

  if (isMobile) {
    return mobilePayload(type, device, os, ua);
  }

  if (isTablet) {
    return mobilePayload(type, device, os, ua);
  }

  if (isWearable) {
    return wearablePayload(isWearable, engine, os, ua);
  }

  if (isEmbedded) {
    return embeddedPayload(isEmbedded, device, engine, os, ua);
  }
}

var isMobileType = function isMobileType(_ref) {
  var type = _ref.type;
  return type === DeviceTypes.Mobile;
};
var isTabletType = function isTabletType(_ref2) {
  var type = _ref2.type;
  return type === DeviceTypes.Tablet;
};
var isMobileAndTabletType = function isMobileAndTabletType(_ref3) {
  var type = _ref3.type;
  return type === DeviceTypes.Mobile || type === DeviceTypes.Tablet;
};
var isSmartTVType = function isSmartTVType(_ref4) {
  var type = _ref4.type;
  return type === DeviceTypes.SmartTv;
};
var isBrowserType = function isBrowserType(_ref5) {
  var type = _ref5.type;
  return type === DeviceTypes.Browser;
};
var isWearableType = function isWearableType(_ref6) {
  var type = _ref6.type;
  return type === DeviceTypes.Wearable;
};
var isConsoleType = function isConsoleType(_ref7) {
  var type = _ref7.type;
  return type === DeviceTypes.Console;
};
var isEmbeddedType = function isEmbeddedType(_ref8) {
  var type = _ref8.type;
  return type === DeviceTypes.Embedded;
};
var getMobileVendor = function getMobileVendor(_ref9) {
  var vendor = _ref9.vendor;
  return setDefaults(vendor);
};
var getMobileModel = function getMobileModel(_ref10) {
  var model = _ref10.model;
  return setDefaults(model);
};
var getDeviceType = function getDeviceType(_ref11) {
  var type = _ref11.type;
  return setDefaults(type, 'browser');
}; // os types

var isAndroidType = function isAndroidType(_ref12) {
  var name = _ref12.name;
  return name === OsTypes.Android;
};
var isWindowsType = function isWindowsType(_ref13) {
  var name = _ref13.name;
  return name === OsTypes.Windows;
};
var isMacOsType = function isMacOsType(_ref14) {
  var name = _ref14.name;
  return name === OsTypes.MAC_OS;
};
var isWinPhoneType = function isWinPhoneType(_ref15) {
  var name = _ref15.name;
  return name === OsTypes.WindowsPhone;
};
var isIOSType = function isIOSType(_ref16) {
  var name = _ref16.name;
  return name === OsTypes.IOS;
};
var getOsVersion = function getOsVersion(_ref17) {
  var version = _ref17.version;
  return setDefaults(version);
};
var getOsName = function getOsName(_ref18) {
  var name = _ref18.name;
  return setDefaults(name);
}; // browser types

var isChromeType = function isChromeType(_ref19) {
  var name = _ref19.name;
  return name === BrowserTypes.Chrome;
};
var isFirefoxType = function isFirefoxType(_ref20) {
  var name = _ref20.name;
  return name === BrowserTypes.Firefox;
};
var isChromiumType = function isChromiumType(_ref21) {
  var name = _ref21.name;
  return name === BrowserTypes.Chromium;
};
var isEdgeType = function isEdgeType(_ref22) {
  var name = _ref22.name;
  return name === BrowserTypes.Edge;
};
var isYandexType = function isYandexType(_ref23) {
  var name = _ref23.name;
  return name === BrowserTypes.Yandex;
};
var isSafariType = function isSafariType(_ref24) {
  var name = _ref24.name;
  return name === BrowserTypes.Safari || name === BrowserTypes.MobileSafari;
};
var isMobileSafariType = function isMobileSafariType(_ref25) {
  var name = _ref25.name;
  return name === BrowserTypes.MobileSafari;
};
var isOperaType = function isOperaType(_ref26) {
  var name = _ref26.name;
  return name === BrowserTypes.Opera;
};
var isIEType = function isIEType(_ref27) {
  var name = _ref27.name;
  return name === BrowserTypes.InternetExplorer || name === BrowserTypes.Ie;
};
var isMIUIType = function isMIUIType(_ref28) {
  var name = _ref28.name;
  return name === BrowserTypes.MIUI;
};
var isSamsungBrowserType = function isSamsungBrowserType(_ref29) {
  var name = _ref29.name;
  return name === BrowserTypes.SamsungBrowser;
};
var getBrowserFullVersion = function getBrowserFullVersion(_ref30) {
  var version = _ref30.version;
  return setDefaults(version);
};
var getBrowserVersion = function getBrowserVersion(_ref31) {
  var major = _ref31.major;
  return setDefaults(major);
};
var getBrowserName = function getBrowserName(_ref32) {
  var name = _ref32.name;
  return setDefaults(name);
}; // engine types

var getEngineName = function getEngineName(_ref33) {
  var name = _ref33.name;
  return setDefaults(name);
};
var getEngineVersion = function getEngineVersion(_ref34) {
  var version = _ref34.version;
  return setDefaults(version);
};
var isElectronType = function isElectronType() {
  var nav = getNavigatorInstance();
  var ua = nav && nav.userAgent && nav.userAgent.toLowerCase();
  return typeof ua === 'string' ? /electron/.test(ua) : false;
};
var isEdgeChromiumType = function isEdgeChromiumType(ua) {
  return typeof ua === 'string' && ua.indexOf('Edg/') !== -1;
};
var getIOS13 = function getIOS13() {
  var nav = getNavigatorInstance();
  return nav && (/iPad|iPhone|iPod/.test(nav.platform) || nav.platform === 'MacIntel' && nav.maxTouchPoints > 1) && !window.MSStream;
};
var getIPad13 = function getIPad13() {
  return isIOS13Check('iPad');
};
var getIphone13 = function getIphone13() {
  return isIOS13Check('iPhone');
};
var getIPod13 = function getIPod13() {
  return isIOS13Check('iPod');
};
var getUseragent = function getUseragent(userAg) {
  return setDefaults(userAg);
};

function buildSelectorsObject(options) {
  var _ref = options ? options : UAHelper,
      device = _ref.device,
      browser = _ref.browser,
      os = _ref.os,
      engine = _ref.engine,
      ua = _ref.ua;

  return {
    isSmartTV: isSmartTVType(device),
    isConsole: isConsoleType(device),
    isWearable: isWearableType(device),
    isEmbedded: isEmbeddedType(device),
    isMobileSafari: isMobileSafariType(browser) || getIPad13(),
    isChromium: isChromiumType(browser),
    isMobile: isMobileAndTabletType(device) || getIPad13(),
    isMobileOnly: isMobileType(device),
    isTablet: isTabletType(device) || getIPad13(),
    isBrowser: isBrowserType(device),
    isDesktop: isBrowserType(device),
    isAndroid: isAndroidType(os),
    isWinPhone: isWinPhoneType(os),
    isIOS: isIOSType(os) || getIPad13(),
    isChrome: isChromeType(browser),
    isFirefox: isFirefoxType(browser),
    isSafari: isSafariType(browser),
    isOpera: isOperaType(browser),
    isIE: isIEType(browser),
    osVersion: getOsVersion(os),
    osName: getOsName(os),
    fullBrowserVersion: getBrowserFullVersion(browser),
    browserVersion: getBrowserVersion(browser),
    browserName: getBrowserName(browser),
    mobileVendor: getMobileVendor(device),
    mobileModel: getMobileModel(device),
    engineName: getEngineName(engine),
    engineVersion: getEngineVersion(engine),
    getUA: getUseragent(ua),
    isEdge: isEdgeType(browser) || isEdgeChromiumType(ua),
    isYandex: isYandexType(browser),
    deviceType: getDeviceType(device),
    isIOS13: getIOS13(),
    isIPad13: getIPad13(),
    isIPhone13: getIphone13(),
    isIPod13: getIPod13(),
    isElectron: isElectronType(),
    isEdgeChromium: isEdgeChromiumType(ua),
    isLegacyEdge: isEdgeType(browser) && !isEdgeChromiumType(ua),
    isWindows: isWindowsType(os),
    isMacOs: isMacOsType(os),
    isMIUI: isMIUIType(browser),
    isSamsungBrowser: isSamsungBrowserType(browser)
  };
}

var isSmartTV = isSmartTVType(device);
var isConsole = isConsoleType(device);
var isWearable = isWearableType(device);
var isEmbedded = isEmbeddedType(device);
var isMobileSafari = isMobileSafariType(browser) || getIPad13();
var isChromium = isChromiumType(browser);
var isMobile = isMobileAndTabletType(device) || getIPad13();
var isMobileOnly = isMobileType(device);
var isTablet = isTabletType(device) || getIPad13();
var isBrowser = isBrowserType(device);
var isDesktop = isBrowserType(device);
var isAndroid = isAndroidType(os);
var isWinPhone = isWinPhoneType(os);
var isIOS = isIOSType(os) || getIPad13();
var isChrome = isChromeType(browser);
var isFirefox = isFirefoxType(browser);
var isSafari = isSafariType(browser);
var isOpera = isOperaType(browser);
var isIE = isIEType(browser);
var osVersion = getOsVersion(os);
var osName = getOsName(os);
var fullBrowserVersion = getBrowserFullVersion(browser);
var browserVersion = getBrowserVersion(browser);
var browserName = getBrowserName(browser);
var mobileVendor = getMobileVendor(device);
var mobileModel = getMobileModel(device);
var engineName = getEngineName(engine);
var engineVersion = getEngineVersion(engine);
var getUA = getUseragent(ua);
var isEdge = isEdgeType(browser) || isEdgeChromiumType(ua);
var isYandex = isYandexType(browser);
var deviceType = getDeviceType(device);
var isIOS13 = getIOS13();
var isIPad13 = getIPad13();
var isIPhone13 = getIphone13();
var isIPod13 = getIPod13();
var isElectron = isElectronType();
var isEdgeChromium = isEdgeChromiumType(ua);
var isLegacyEdge = isEdgeType(browser) && !isEdgeChromiumType(ua);
var isWindows = isWindowsType(os);
var isMacOs = isMacOsType(os);
var isMIUI = isMIUIType(browser);
var isSamsungBrowser = isSamsungBrowserType(browser);
var getSelectorsByUserAgent = function getSelectorsByUserAgent(userAgent) {
  if (!userAgent || typeof userAgent !== 'string') {
    console.error('No valid user agent string was provided');
    return;
  }

  var _UAHelper$parseUserAg = parseUserAgent(userAgent),
      device = _UAHelper$parseUserAg.device,
      browser = _UAHelper$parseUserAg.browser,
      os = _UAHelper$parseUserAg.os,
      engine = _UAHelper$parseUserAg.engine,
      ua = _UAHelper$parseUserAg.ua;

  return buildSelectorsObject({
    device: device,
    browser: browser,
    os: os,
    engine: engine,
    ua: ua
  });
};

var AndroidView = function AndroidView(_ref) {
  var renderWithFragment = _ref.renderWithFragment,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["renderWithFragment", "children"]);

  return isAndroid ? renderWithFragment ? React__default$1.createElement(React__default.Fragment, null, children) : React__default$1.createElement("div", props, children) : null;
};
var BrowserView = function BrowserView(_ref2) {
  var renderWithFragment = _ref2.renderWithFragment,
      children = _ref2.children,
      props = _objectWithoutProperties(_ref2, ["renderWithFragment", "children"]);

  return isBrowser ? renderWithFragment ? React__default$1.createElement(React__default.Fragment, null, children) : React__default$1.createElement("div", props, children) : null;
};
var IEView = function IEView(_ref3) {
  var renderWithFragment = _ref3.renderWithFragment,
      children = _ref3.children,
      props = _objectWithoutProperties(_ref3, ["renderWithFragment", "children"]);

  return isIE ? renderWithFragment ? React__default$1.createElement(React__default.Fragment, null, children) : React__default$1.createElement("div", props, children) : null;
};
var IOSView = function IOSView(_ref4) {
  var renderWithFragment = _ref4.renderWithFragment,
      children = _ref4.children,
      props = _objectWithoutProperties(_ref4, ["renderWithFragment", "children"]);

  return isIOS ? renderWithFragment ? React__default$1.createElement(React__default.Fragment, null, children) : React__default$1.createElement("div", props, children) : null;
};
var MobileView = function MobileView(_ref5) {
  var renderWithFragment = _ref5.renderWithFragment,
      children = _ref5.children,
      props = _objectWithoutProperties(_ref5, ["renderWithFragment", "children"]);

  return isMobile ? renderWithFragment ? React__default$1.createElement(React__default.Fragment, null, children) : React__default$1.createElement("div", props, children) : null;
};
var TabletView = function TabletView(_ref6) {
  var renderWithFragment = _ref6.renderWithFragment,
      children = _ref6.children,
      props = _objectWithoutProperties(_ref6, ["renderWithFragment", "children"]);

  return isTablet ? renderWithFragment ? React__default$1.createElement(React__default.Fragment, null, children) : React__default$1.createElement("div", props, children) : null;
};
var WinPhoneView = function WinPhoneView(_ref7) {
  var renderWithFragment = _ref7.renderWithFragment,
      children = _ref7.children,
      props = _objectWithoutProperties(_ref7, ["renderWithFragment", "children"]);

  return isWinPhone ? renderWithFragment ? React__default$1.createElement(React__default.Fragment, null, children) : React__default$1.createElement("div", props, children) : null;
};
var MobileOnlyView = function MobileOnlyView(_ref8) {
  var renderWithFragment = _ref8.renderWithFragment,
      children = _ref8.children,
      props = _objectWithoutProperties(_ref8, ["renderWithFragment", "children", "viewClassName", "style"]);

  return isMobileOnly ? renderWithFragment ? React__default$1.createElement(React__default.Fragment, null, children) : React__default$1.createElement("div", props, children) : null;
};
var SmartTVView = function SmartTVView(_ref9) {
  var renderWithFragment = _ref9.renderWithFragment,
      children = _ref9.children,
      props = _objectWithoutProperties(_ref9, ["renderWithFragment", "children"]);

  return isSmartTV ? renderWithFragment ? React__default$1.createElement(React__default.Fragment, null, children) : React__default$1.createElement("div", props, children) : null;
};
var ConsoleView = function ConsoleView(_ref10) {
  var renderWithFragment = _ref10.renderWithFragment,
      children = _ref10.children,
      props = _objectWithoutProperties(_ref10, ["renderWithFragment", "children"]);

  return isConsole ? renderWithFragment ? React__default$1.createElement(React__default.Fragment, null, children) : React__default$1.createElement("div", props, children) : null;
};
var WearableView = function WearableView(_ref11) {
  var renderWithFragment = _ref11.renderWithFragment,
      children = _ref11.children,
      props = _objectWithoutProperties(_ref11, ["renderWithFragment", "children"]);

  return isWearable ? renderWithFragment ? React__default$1.createElement(React__default.Fragment, null, children) : React__default$1.createElement("div", props, children) : null;
};
var CustomView = function CustomView(_ref12) {
  var renderWithFragment = _ref12.renderWithFragment,
      children = _ref12.children,
      condition = _ref12.condition,
      props = _objectWithoutProperties(_ref12, ["renderWithFragment", "children", "viewClassName", "style", "condition"]);

  return condition ? renderWithFragment ? React__default$1.createElement(React__default.Fragment, null, children) : React__default$1.createElement("div", props, children) : null;
};

function withOrientationChange(WrappedComponent) {
  return /*#__PURE__*/function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
      var _this;

      _classCallCheck(this, _class);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props));
      _this.isEventListenerAdded = false;
      _this.handleOrientationChange = _this.handleOrientationChange.bind(_assertThisInitialized(_this));
      _this.onOrientationChange = _this.onOrientationChange.bind(_assertThisInitialized(_this));
      _this.onPageLoad = _this.onPageLoad.bind(_assertThisInitialized(_this));
      _this.state = {
        isLandscape: false,
        isPortrait: false
      };
      return _this;
    }

    _createClass(_class, [{
      key: "handleOrientationChange",
      value: function handleOrientationChange() {
        if (!this.isEventListenerAdded) {
          this.isEventListenerAdded = true;
        }

        var orientation = window.innerWidth > window.innerHeight ? 90 : 0;
        this.setState({
          isPortrait: orientation === 0,
          isLandscape: orientation === 90
        });
      }
    }, {
      key: "onOrientationChange",
      value: function onOrientationChange() {
        this.handleOrientationChange();
      }
    }, {
      key: "onPageLoad",
      value: function onPageLoad() {
        this.handleOrientationChange();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined && isMobile) {
          if (!this.isEventListenerAdded) {
            this.handleOrientationChange();
            window.addEventListener("load", this.onPageLoad, false);
          } else {
            window.removeEventListener("load", this.onPageLoad, false);
          }

          window.addEventListener("resize", this.onOrientationChange, false);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        window.removeEventListener("resize", this.onOrientationChange, false);
      }
    }, {
      key: "render",
      value: function render() {
        return React__default$1.createElement(WrappedComponent, _extends({}, this.props, {
          isLandscape: this.state.isLandscape,
          isPortrait: this.state.isPortrait
        }));
      }
    }]);

    return _class;
  }(React__default$1.Component);
}

function useMobileOrientation() {
  var _useState = React__default.useState(function () {
    var orientation = window.innerWidth > window.innerHeight ? 90 : 0;
    return {
      isPortrait: orientation === 0,
      isLandscape: orientation === 90,
      orientation: orientation === 0 ? 'portrait' : 'landscape'
    };
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var handleOrientationChange = React__default.useCallback(function () {
    var orientation = window.innerWidth > window.innerHeight ? 90 : 0;
    var next = {
      isPortrait: orientation === 0,
      isLandscape: orientation === 90,
      orientation: orientation === 0 ? 'portrait' : 'landscape'
    };
    state.orientation !== next.orientation && setState(next);
  }, [state.orientation]);
  React__default.useEffect(function () {
    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined && isMobile) {
      handleOrientationChange();
      window.addEventListener("load", handleOrientationChange, false);
      window.addEventListener("resize", handleOrientationChange, false);
    }

    return function () {
      window.removeEventListener("resize", handleOrientationChange, false);
      window.removeEventListener("load", handleOrientationChange, false);
    };
  }, [handleOrientationChange]);
  return state;
}

function useDeviceData(userAgent) {
  var hookUserAgent = userAgent ? userAgent : window.navigator.userAgent;
  return parseUserAgent(hookUserAgent);
}

function useDeviceSelectors(userAgent) {
  var hookUserAgent = userAgent ? userAgent : window.navigator.userAgent;
  var deviceData = useDeviceData(hookUserAgent);
  var selectors = buildSelectorsObject(deviceData);
  return [selectors, deviceData];
}

exports.AndroidView = AndroidView;
exports.BrowserTypes = BrowserTypes;
exports.BrowserView = BrowserView;
exports.ConsoleView = ConsoleView;
exports.CustomView = CustomView;
exports.IEView = IEView;
exports.IOSView = IOSView;
exports.MobileOnlyView = MobileOnlyView;
exports.MobileView = MobileView;
exports.OsTypes = OsTypes;
exports.SmartTVView = SmartTVView;
exports.TabletView = TabletView;
exports.WearableView = WearableView;
exports.WinPhoneView = WinPhoneView;
exports.browserName = browserName;
exports.browserVersion = browserVersion;
exports.deviceDetect = deviceDetect;
exports.deviceType = deviceType;
exports.engineName = engineName;
exports.engineVersion = engineVersion;
exports.fullBrowserVersion = fullBrowserVersion;
exports.getSelectorsByUserAgent = getSelectorsByUserAgent;
exports.getUA = getUA;
exports.isAndroid = isAndroid;
exports.isBrowser = isBrowser;
exports.isChrome = isChrome;
exports.isChromium = isChromium;
exports.isConsole = isConsole;
exports.isDesktop = isDesktop;
exports.isEdge = isEdge;
exports.isEdgeChromium = isEdgeChromium;
exports.isElectron = isElectron;
exports.isEmbedded = isEmbedded;
exports.isFirefox = isFirefox;
exports.isIE = isIE;
exports.isIOS = isIOS;
exports.isIOS13 = isIOS13;
exports.isIPad13 = isIPad13;
exports.isIPhone13 = isIPhone13;
exports.isIPod13 = isIPod13;
exports.isLegacyEdge = isLegacyEdge;
exports.isMIUI = isMIUI;
exports.isMacOs = isMacOs;
exports.isMobile = isMobile;
exports.isMobileOnly = isMobileOnly;
exports.isMobileSafari = isMobileSafari;
exports.isOpera = isOpera;
exports.isSafari = isSafari;
exports.isSamsungBrowser = isSamsungBrowser;
exports.isSmartTV = isSmartTV;
exports.isTablet = isTablet;
exports.isWearable = isWearable;
exports.isWinPhone = isWinPhone;
exports.isWindows = isWindows;
exports.isYandex = isYandex;
exports.mobileModel = mobileModel;
exports.mobileVendor = mobileVendor;
exports.osName = osName;
exports.osVersion = osVersion;
exports.parseUserAgent = parseUserAgent;
exports.setUserAgent = setUserAgent;
exports.useDeviceData = useDeviceData;
exports.useDeviceSelectors = useDeviceSelectors;
exports.useMobileOrientation = useMobileOrientation;
exports.withOrientationChange = withOrientationChange;
});

unwrapExports(lib);
var lib_44 = lib.isMobile;

var idleStatusAfterMs = 1 * 1000;
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
    if (lib_44) return;
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
              return lib_44 && trigger.invocation === 'INVOCATION_IDLE_TIME' || !lib_44 && trigger.invocation === 'INVOCATION_EXIT_INTENT';
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
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data7;
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
  console.log('trigger', trigger, trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL);
  React.useEffect(function () {
    var css = "\n  @charset \"UTF-8\";\n  @import \"https://fonts.smct.co/Din/font.css\";\n  .variant-bg,\n  .variant-overlay-outer,\n  .variant-bar,\n  .variant-final-message,\n  .variant-success-message {\n    display: none;\n    font-family: Gotham, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  }\n  .variant-bg,\n  .variant-bar {\n    z-index: 99999999999;\n  }\n  .variant-bar,\n  .variant-handle,\n  .variant-final-message,\n  .variant-success-message-inner,\n  .variant-overlay-inner {\n    background-color: rgba(0, 0, 0, 1);\n  }\n  .variant-bar,\n  .variant-option,\n  .variant-handle,\n  .variant-final-message,\n  .variant-text-outer > .variant-text,\n  a.variant-link {\n    color: #fff;\n  }\n  .variant-bg,\n  .variant-bg * {\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n  }\n  .variant-bg * {\n    line-height: 100%;\n  }\n  .variant-overlay-inner,\n  .variant-input,\n  .variant-text,\n  .variant-text-outer,\n  .variant-item,\n  .variant-progress,\n  .variant-panel .variant-bg,\n  .variant-handle > span,\n  .variant-loader,\n  .variant-loader-single,\n  .variant-loader-double,\n  .variant-option,\n  .variant-long-close {\n    display: block;\n  }\n  .variant-text-outer,\n  .variant-option {\n    width: 50%;\n    min-width: 280px;\n    margin: auto;\n  }\n  .variant-input {\n    background-color: rgba(255, 255, 255, 0.8);\n  }\n  .variant-bg {\n    background-color: rgba(0, 0, 0, 0.6);\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    overflow-y: scroll;\n  }\n  .variant-overlay-outer {\n    position: relative;\n    transition: height 0.2s ease;\n  }\n  .variant-overlay-inner {\n    width: 700px;\n    min-height: 400px;\n    position: relative;\n    margin: 10% auto;\n    transition: all 0.2s ease;\n    padding: 10px 10px 30px;\n    min-width: 300px;\n  }\n  .variant-close {\n    border-radius: 50%;\n    color: #333;\n    cursor: pointer;\n    display: block;\n    font-size: 20px;\n    font-weight: 700;\n    height: 30px;\n    line-height: 30px;\n    position: absolute;\n    right: 10px;\n    text-align: center;\n    top: 10px;\n    width: 30px;\n    z-index: 100;\n  }\n  .variant-close a {\n    font-family: Gotham, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  }\n  .variant-close:hover {\n    background-color: rgba(255, 255, 255, 0.3);\n  }\n  .variant-close-safe {\n    text-shadow: 1px 1px 1px #000;\n    color: #fff;\n    width: 100%;\n    text-align: center;\n    cursor: pointer;\n    display: none;\n    position: fixed;\n    bottom: 30px;\n    left: 0;\n  }\n  .variant-close-safe a {\n    color: #fff !important;\n  }\n  .variant-closer {\n    cursor: pointer;\n  }\n  .variant-long-close {\n    font-size: 14px;\n    position: absolute;\n    bottom: 10px;\n    width: 100%;\n    left: 0;\n    text-align: center;\n  }\n  .variant-long-close a.variant-link {\n    width: auto;\n  }\n  a.variant-link {\n    display: inline-block;\n    text-decoration: none;\n    height: 100%;\n    width: 100%;\n  }\n  .variant-input,\n  .variant-button,\n  .variant-reveal {\n    width: 100%;\n  }\n  .variant-button,\n  .variant-cover {\n    background: #333;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n  }\n  .variant-input {\n    color: #000;\n    text-align: center;\n    border: 1px solid #333;\n    margin: 10px auto;\n    padding: 10px;\n  }\n  .variant-input::-webkit-input-placeholder,\n  .variant-input:-moz-placeholder,\n  .variant-input::-moz-placeholder,\n  .variant-input:-ms-input-placeholder {\n    color: #ccc;\n    text-transform: uppercase;\n  }\n  .variant-input:focus {\n    outline: none;\n  }\n  .variant-button {\n    border: medium none;\n    color: #fff;\n    outline: medium none;\n    display: block;\n    margin: 10px auto;\n    font-size: 20px;\n    padding: 10px;\n    cursor: pointer;\n  }\n  .variant-reveal {\n    display: block;\n    margin: 10px auto;\n    position: relative;\n    text-align: center;\n  }\n  .variant-cover,\n  .variant-code {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    padding: 10px;\n    font-size: 20px;\n  }\n  .variant-cover {\n    z-index: 2;\n    color: #fff;\n    padding: 11px;\n    cursor: pointer;\n  }\n  .variant-button:hover,\n  .variant-cover:hover {\n    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);\n  }\n  .variant-code {\n    z-index: 1;\n    border: 1px solid #333;\n    background: rgba(255, 255, 255, 0.8);\n    color: #333;\n    font-weight: 700;\n    -moz-user-select: text;\n    -webkit-user-select: text;\n    -ms-user-select: text;\n    user-select: text;\n  }\n  .variant-text {\n    text-align: center;\n    font-size: 20px;\n  }\n  .variant-text2 {\n    font-size: 40px;\n    font-weight: 700;\n  }\n  .variant-img-outer {\n    position: relative;\n    width: 100%;\n    display: block;\n  }\n  .variant-img {\n    display: block;\n    width: 100%;\n  }\n  .variant-img img {\n    border: medium none;\n    display: block;\n    margin: auto;\n    outline: medium none;\n    max-width: 100%;\n  }\n  .variant-clearfix:after {\n    visibility: hidden;\n    display: block;\n    font-size: 0;\n    content: \" \";\n    clear: both;\n    height: 0;\n  }\n  .variant-clearfix {\n    display: inline-block;\n    height: 1%;\n    display: block;\n  }\n  .variant-item {\n    height: 80px;\n    padding: 10px;\n    border-bottom: 1px dashed #ccc;\n  }\n  .variant-item .variant-item-img {\n    display: inline-block;\n    text-align: center;\n  }\n  .variant-item .variant-item-img img {\n    max-width: 60px;\n    max-height: 60px;\n  }\n  .variant-item .variant-title {\n    font-weight: 700;\n    display: inline-block;\n  }\n  .variant-item .variant-price {\n    display: inline-block;\n  }\n  .variant-item .variant-qty {\n    display: inline-block;\n  }\n  .variant-progress {\n    background-color: rgba(0, 0, 0, 0.1);\n    border-radius: 0;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;\n    height: 21px;\n    margin-bottom: 21px;\n    overflow: hidden;\n    width: 100%;\n  }\n  .variant-progress-bar {\n    background-color: #007932;\n    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15) inset;\n    color: #fff;\n    float: left;\n    font-size: 12px;\n    height: 100%;\n    line-height: 21px;\n    text-align: center;\n    transition: width 0.6s ease 0s;\n    width: 0;\n  }\n  .variant-progress .variant-progress-bar {\n    background-image: linear-gradient(\n      45deg,\n      rgba(255, 255, 255, 0.15) 25%,\n      transparent 25%,\n      transparent 50%,\n      rgba(255, 255, 255, 0.15) 50%,\n      rgba(255, 255, 255, 0.15) 75%,\n      transparent 75%,\n      transparent\n    );\n    background-size: 40px 40px;\n    animation: 0.5s linear 0s normal none infinite running\n      .variant-progress-bar-stripes;\n  }\n  @-webkit-keyframes .variant-progress-bar-stripes {\n    from {\n      background-position: 40px 0;\n    }\n    to {\n      background-position: 0 0;\n    }\n  }\n  @-o-keyframes .variant-progress-bar-stripes {\n    from {\n      background-position: 40px 0;\n    }\n    to {\n      background-position: 0 0;\n    }\n  }\n  @keyframes .variant-progress-bar-stripes {\n    from {\n      background-position: 40px 0;\n    }\n    to {\n      background-position: 0 0;\n    }\n  }\n  .variant-overlay {\n    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;\n  }\n  .variant-overlay:before,\n  .variant-overlay:after {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);\n    top: 0;\n    bottom: 0;\n    left: 10px;\n    right: 10px;\n    border-radius: 100px / 10px;\n  }\n  .variant-overlay:after {\n    right: 10px;\n    left: auto;\n    transform: skew(8deg) rotate(3deg);\n  }\n  .variant-panel .variant-bg {\n    width: 0;\n    height: 100%;\n    position: fixed;\n    z-index: 1001;\n    top: 0;\n    background-color: #111;\n    padding: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    color: #fff;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    transition: width 0.5s;\n  }\n  .variant-panel-body-cover {\n    position: fixed;\n    z-index: 1000;\n    background-color: rgba(0, 0, 0, 0.5);\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    display: none;\n  }\n  .variant-panel.variant-panel-left .variant-bg {\n    right: auto;\n  }\n  .variant-panel.variant-panel-right .variant-bg {\n    left: auto;\n  }\n  .variant-panel .variant-overlay-inner {\n    width: 90%;\n  }\n  .variant-input-group {\n    display: block;\n    text-align: center;\n  }\n  .variant-input-group input[type=\"checkbox\"],\n  .variant-input-group input[type=\"radio\"] {\n    margin-right: 3px;\n    margin-left: 10px;\n  }\n  .variant-input-error ::-webkit-input-placeholder,\n  .variant-input-error :-moz-placeholder,\n  .variant-input-error ::-moz-placeholder,\n  .variant-input-error :-ms-input-placeholder {\n    color: #d30003;\n  }\n  .variant-input-error label {\n    color: #d30003;\n  }\n  .variant-input-error input,\n  .variant-input-error select,\n  .variant-input-error textarea {\n    border-color: #d30003;\n  }\n  .variant-bar,\n  .variant-handle {\n    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.3);\n    border-bottom-left-radius: 3px;\n    border-bottom-right-radius: 3px;\n  }\n  .variant-bar {\n    display: none;\n    position: fixed;\n    top: 0;\n    left: 25%;\n    right: 25%;\n    width: 50%;\n    font-weight: 700;\n    font-size: 16px;\n    text-shadow: none;\n    text-align: center;\n    height: 30px;\n    line-height: 30px;\n    padding: 0 20px;\n  }\n  @media (max-width: 500px) {\n    .variant-bar {\n      width: 80%;\n      left: 10%;\n    }\n  }\n  .variant-bar-close {\n    cursor: pointer;\n    height: 10px;\n    line-height: 10px;\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    width: 10px;\n  }\n  .variant-handle {\n    position: absolute;\n    width: 50px;\n    margin-left: -25px;\n    height: 20px;\n    left: 50%;\n    bottom: -20px;\n    cursor: pointer;\n    line-height: 12px;\n    letter-spacing: -2px;\n  }\n  .variant-handle > span {\n    position: absolute;\n    width: 60%;\n    left: 20%;\n    height: 2px;\n    background: #fff;\n  }\n  .variant-bar1 {\n    top: 20%;\n  }\n  .variant-bar2 {\n    top: 40%;\n  }\n  .variant-bar3 {\n    top: 60%;\n  }\n  .variant-arrow-up {\n    width: 0;\n    height: 0;\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-bottom: 5px solid #000;\n  }\n  .variant-arrow-down {\n    width: 0;\n    height: 0;\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-top: 5px solid #000;\n  }\n  .variant-arrow-right {\n    width: 0;\n    height: 0;\n    border-top: 5px solid transparent;\n    border-bottom: 5px solid transparent;\n    border-left: 5px solid #000;\n  }\n  .variant-arrow-left {\n    width: 0;\n    height: 0;\n    border-top: 5px solid transparent;\n    border-bottom: 5px solid transparent;\n    border-right: 5px solid #000;\n  }\n  .variant-preview {\n    position: fixed;\n    top: 20px;\n    left: 50%;\n    margin-left: -160px;\n    width: 320px;\n    padding: 5px 10px;\n    background: #ff0;\n    color: #000;\n    font-family: Gotham, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 12px;\n    text-align: center;\n    border-radius: 5px;\n    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);\n    cursor: pointer;\n  }\n  .variant-preview-close {\n    font-size: 7px;\n    height: 3px;\n    position: absolute;\n    right: 4px;\n    top: 0;\n    width: 3px;\n  }\n  .variant-preview .variant-arrow-up {\n    position: absolute;\n    top: -20px;\n    left: 50%;\n    margin-left: -10px;\n    border-left: 20px solid transparent;\n    border-right: 20px solid transparent;\n    border-bottom: 20px solid #ff0;\n  }\n  .variant-notices {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    transition: height 0.3s ease;\n  }\n  .variant-notice-box {\n    padding: 5px 10px;\n    background: #ec6952;\n    font-size: 12px;\n    text-align: left;\n    border-radius: 5px;\n    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);\n    cursor: pointer;\n    min-height: 30px;\n    min-width: 100px;\n    max-width: 500px;\n    width: auto;\n    margin-bottom: 5px;\n    color: #fff;\n    float: right;\n    clear: both;\n    z-index: 100;\n    transition: all 0.5s ease;\n    overflow: hidden;\n  }\n  .variant-notice-box.success {\n    background: #24a233;\n  }\n  .variant-notice-box.warning {\n    background: #cf9d0f;\n  }\n  .variant-notice-box.danger {\n    background: #d30003;\n  }\n  @media screen {\n    .variant-preloader {\n      position: fixed;\n      left: -9999px;\n      top: -9999px;\n    }\n    .variant-preloader img {\n      display: block;\n    }\n  }\n  @media print {\n    .variant-preloader,\n    .variant-preloader img {\n      visibility: hidden;\n      display: none;\n    }\n  }\n  .variant-final-message {\n    border-radius: 2px;\n    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);\n    bottom: 10px;\n    font-size: 16px;\n    padding: 10px 20px;\n    position: fixed;\n    right: 10px;\n    z-index: 1e15;\n  }\n  .variant-final-message-close {\n    position: absolute;\n    top: 3px;\n    right: 1px;\n    width: 10px;\n    height: 10px;\n    cursor: pointer;\n    font-size: 10px;\n    opacity: 0.5;\n  }\n  .variant-final-message .variant-select {\n    font-weight: 700;\n  }\n  .variant-final-message:hover .variant-final-message-close {\n    opacity: 1;\n  }\n  .variant-success-message {\n    position: absolute;\n    width: 100%;\n    background: rgba(0, 0, 0, 0.5);\n    height: 100%;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: center;\n  }\n  .variant-success-message-inner {\n    background: #08ad00 none repeat scroll 0 0;\n    border-radius: 5px;\n    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);\n    color: #fff;\n    display: inline-block;\n    font-size: 30px;\n    margin: 20% auto auto;\n    padding: 10px 30px;\n    position: relative;\n  }\n  .variant-success-close {\n    position: absolute;\n    top: 5px;\n    right: 5px;\n    cursor: pointer;\n    font-size: 12px;\n  }\n  @-webkit-keyframes .variant-spin {\n    0% {\n      -webkit-transform: rotate(0deg);\n      transform: rotate(0deg);\n    }\n    100% {\n      -webkit-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }\n  @keyframes .variant-spin {\n    0% {\n      -webkit-transform: rotate(0deg);\n      transform: rotate(0deg);\n    }\n    100% {\n      -webkit-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }\n  @-webkit-keyframes .variant-pulse {\n    50% {\n      background: #fff;\n    }\n  }\n  @keyframes .variant-pulse {\n    50% {\n      background: #fff;\n    }\n  }\n  .variant-loader-bg,\n  .variant-dc-placeholder {\n    position: absolute;\n    top: 10%;\n    left: 50%;\n    background: rgba(0, 0, 0, 0.8);\n    width: 60px;\n    margin-left: -30px;\n    height: 60px;\n    z-index: 10;\n    border-radius: 10px;\n    display: none;\n  }\n  .variant-loader,\n  .variant-loader-single,\n  .variant-loader-double {\n    border-radius: 50%;\n    width: 50px;\n    height: 50px;\n    margin: 5px;\n    border: 0.25rem solid rgba(255, 255, 255, 0.2);\n    border-top-color: #fff;\n    -webkit-animation: variant-spin 1s infinite linear;\n    animation: variant-spin 1s infinite linear;\n  }\n  .variant-loader-double {\n    border-style: double;\n    border-width: 0.5rem;\n  }\n  .variant-loader-pulse {\n    -webkit-animation: variant-pulse 750ms infinite;\n    animation: variant-pulse 750ms infinite;\n    -webkit-animation-delay: 250ms;\n    animation-delay: 250ms;\n    height: 30px;\n    left: 25px;\n    position: absolute;\n    top: 14px;\n    width: 10px;\n  }\n  .variant-loader-pulse:before,\n  .variant-loader-pulse:after {\n    content: \"\";\n    position: absolute;\n    display: block;\n    height: 16px;\n    width: 6px;\n    top: 50%;\n    background: rgba(255, 255, 255, 0.2);\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    -webkit-animation: variant-pulse 750ms infinite;\n    animation: variant-pulse 750ms infinite;\n  }\n  .variant-loader-pulse:before {\n    left: -12px;\n  }\n  .variant-loader-pulse:after {\n    left: 16px;\n    -webkit-animation-delay: 500ms;\n    animation-delay: 500ms;\n  }\n  .variant-loader-bg[data-theme=\"white\"],\n  .variant-dc-placeholder {\n    background: rgba(255, 255, 255, 0.8);\n  }\n  .variant-loader-bg[data-theme=\"white\"] .variant-loader-single,\n  .variant-dc-placeholder .variant-loader-single,\n  .variant-loader-bg[data-theme=\"white\"] .variant-loader-double,\n  .variant-dc-placeholder .variant-loader-double,\n  .variant-loader-bg[data-theme=\"white\"] .variant-loader-pulse,\n  .variant-dc-placeholder .variant-loader-pulse {\n    border-color: rgba(0, 0, 0, 0.2);\n    border-top-color: #000;\n  }\n  .variant-terms {\n    background-color: #fff;\n    border: 1px solid #333;\n    border-radius: 3px;\n    bottom: 5%;\n    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);\n    left: 5%;\n    padding: 10px;\n    position: absolute;\n    right: 5%;\n    top: 5%;\n    z-index: 101;\n    display: none;\n  }\n  .variant-terms-header,\n  .variant-terms-para,\n  .variant-terms-close,\n  .variant-terms-close-x {\n    color: #333;\n    display: block;\n  }\n  .variant-terms-scroller {\n    position: absolute;\n    top: 10px;\n    left: 10px;\n    right: 10px;\n    bottom: 30px;\n    overflow: auto;\n  }\n  .variant-terms-header {\n    font-size: 20px;\n    font-weight: 700;\n    margin: 5px 0;\n    text-align: center;\n  }\n  .variant-terms-para {\n    margin: 5px 0;\n    font-size: 12px;\n  }\n  .variant-terms-close {\n    bottom: 10px;\n    cursor: pointer;\n    left: 10px;\n    position: absolute;\n    right: 10px;\n    text-align: center;\n  }\n  .variant-show-terms,\n  .variant-show-terms {\n    text-decoration: underline;\n    cursor: pointer;\n  }\n  .variant-terms[data-theme=\"dark\"] {\n    background-color: #333;\n  }\n  .variant-terms[data-theme=\"dark\"] .variant-terms-header,\n  .variant-terms[data-theme=\"dark\"] .variant-terms-para,\n  .variant-terms[data-theme=\"dark\"] .variant-terms-close,\n  .variant-terms[data-theme=\"dark\"] .variant-terms-close-x {\n    color: #fff;\n  }\n  .variant-terms-close-x {\n    position: absolute;\n    top: 5px;\n    right: 5px;\n    cursor: pointer;\n    opacity: 0.7;\n    -webkit-transition: all 0.25s ease-in-out;\n    -ms-transition: all 0.25s ease-in-out;\n    -o-transition: all 0.25s ease-in-out;\n    -moz-transition: all 0.25s ease-in-out;\n    transition: transform all 0.25s ease-in-out;\n  }\n  .variant-terms-close-x:hover {\n    opacity: 1;\n    -webkit-transform: rotate(180deg) scale(1.3);\n    -ms-transform: rotate(180deg) scale(1.3);\n    -o-transform: rotate(180deg) scale(1.3);\n    -moz-transform: rotate(180deg) scale(1.3);\n    transform: rotate(180deg) scale(1.3);\n  }\n  .variant-cp {\n    -youbkit-touch-callout: none;\n    -youbkit-user-select: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n  }\n  .variant-cp,\n  .variant-cp-msg {\n    display: none;\n  }\n  .variant-hidden-consents {\n    opacity: 0;\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    width: 1px;\n    height: 1px;\n    visibility: hidden;\n  }\n  .variant-requestNotifications .variant-agree-yes,\n  .variant-requestNotifications .variant-agree-no {\n    display: none;\n  }\n  .variant-notices {\n    padding: 10px;\n    right: 20px;\n    left: auto;\n    max-width: 300px;\n    z-index: 100;\n  }\n  .variant-dc-placeholder {\n    display: block;\n    height: 30px;\n    width: 30px;\n    top: 3px;\n  }\n  .variant-dc-placeholder > * {\n    height: 20px;\n    width: 20px;\n  }\n  .variant-shake-msg {\n    display: none;\n  }\n  .variant-animated {\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-fill-mode: both;\n    animation-fill-mode: both;\n  }\n  .variant-animated.variant-infinite {\n    -webkit-animation-iteration-count: infinite;\n    animation-iteration-count: infinite;\n  }\n  .variant-animated.variant-hinge {\n    -webkit-animation-duration: 2s;\n    animation-duration: 2s;\n  }\n  .variant-animated.variant-bounceIn,\n  .variant-animated.variant-bounceOut,\n  .variant-animated.variant-flipOutX,\n  .variant-animated.variant-flipOutY {\n    -webkit-animation-duration: 0.75s;\n    animation-duration: 0.75s;\n  }\n  @-webkit-keyframes .variant-fadeIn {\n    0% {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n  @keyframes .variant-fadeIn {\n    0% {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n  .variant-fadeIn {\n    -webkit-animation-name: variant-fadeIn;\n    animation-name: variant-fadeIn;\n  }\n  @-webkit-keyframes .variant-bounceInDown {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -3000px, 0);\n      transform: translate3d(0, -3000px, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, 25px, 0);\n      transform: translate3d(0, 25px, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(0, -10px, 0);\n      transform: translate3d(0, -10px, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(0, 5px, 0);\n      transform: translate3d(0, 5px, 0);\n    }\n    to {\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  @keyframes .variant-bounceInDown {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -3000px, 0);\n      transform: translate3d(0, -3000px, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, 25px, 0);\n      transform: translate3d(0, 25px, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(0, -10px, 0);\n      transform: translate3d(0, -10px, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(0, 5px, 0);\n      transform: translate3d(0, 5px, 0);\n    }\n    to {\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  .variant-bounceInDown {\n    -webkit-animation-name: variant-bounceInDown;\n    animation-name: variant-bounceInDown;\n  }\n  .variant-animDelay2 {\n    -webkit-animation-delay: 0.2s !important;\n    -moz-animation-delay: 0.2s !important;\n    -ms-animation-delay: 0.2s !important;\n    -o-animation-delay: 0.2s !important;\n    animation-delay: 0.2s !important;\n  }\n  .variant-animDelay6 {\n    -webkit-animation-delay: 0.6s !important;\n    -moz-animation-delay: 0.6s !important;\n    -ms-animation-delay: 0.6s !important;\n    -o-animation-delay: 0.6s !important;\n    animation-delay: 0.6s !important;\n  }\n  @-webkit-keyframes .variant-bounceInRight {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(3000px, 0, 0);\n      transform: translate3d(3000px, 0, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(-25px, 0, 0);\n      transform: translate3d(-25px, 0, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(10px, 0, 0);\n      transform: translate3d(10px, 0, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(-5px, 0, 0);\n      transform: translate3d(-5px, 0, 0);\n    }\n    to {\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  @keyframes .variant-bounceInRight {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(3000px, 0, 0);\n      transform: translate3d(3000px, 0, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(-25px, 0, 0);\n      transform: translate3d(-25px, 0, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(10px, 0, 0);\n      transform: translate3d(10px, 0, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(-5px, 0, 0);\n      transform: translate3d(-5px, 0, 0);\n    }\n    to {\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  .variant-bounceInRight {\n    -webkit-animation-name: variant-bounceInRight;\n    animation-name: variant-bounceInRight;\n  }\n  .variant-animDelay8 {\n    -webkit-animation-delay: 0.8s !important;\n    -moz-animation-delay: 0.8s !important;\n    -ms-animation-delay: 0.8s !important;\n    -o-animation-delay: 0.8s !important;\n    animation-delay: 0.8s !important;\n  }\n  .variant-animDelay10 {\n    -webkit-animation-delay: 1s !important;\n    -moz-animation-delay: 1s !important;\n    -ms-animation-delay: 1s !important;\n    -o-animation-delay: 1s !important;\n    animation-delay: 1s !important;\n  }\n  .variant-animDelay12 {\n    -webkit-animation-delay: 1.2s !important;\n    -moz-animation-delay: 1.2s !important;\n    -ms-animation-delay: 1.2s !important;\n    -o-animation-delay: 1.2s !important;\n    animation-delay: 1.2s !important;\n  }\n  .variant-animDelay4 {\n    -webkit-animation-delay: 0.4s !important;\n    -moz-animation-delay: 0.4s !important;\n    -ms-animation-delay: 0.4s !important;\n    -o-animation-delay: 0.4s !important;\n    animation-delay: 0.4s !important;\n  }\n  @-webkit-keyframes .variant-bounceInLeft {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(-3000px, 0, 0);\n      transform: translate3d(-3000px, 0, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(25px, 0, 0);\n      transform: translate3d(25px, 0, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(-10px, 0, 0);\n      transform: translate3d(-10px, 0, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(5px, 0, 0);\n      transform: translate3d(5px, 0, 0);\n    }\n    to {\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  @keyframes .variant-bounceInLeft {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(-3000px, 0, 0);\n      transform: translate3d(-3000px, 0, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(25px, 0, 0);\n      transform: translate3d(25px, 0, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(-10px, 0, 0);\n      transform: translate3d(-10px, 0, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(5px, 0, 0);\n      transform: translate3d(5px, 0, 0);\n    }\n    to {\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  .variant-bounceInLeft {\n    -webkit-animation-name: variant-bounceInLeft;\n    animation-name: variant-bounceInLeft;\n  }\n  @-webkit-keyframes .variant-fadeInLeft {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(-100%, 0, 0);\n      transform: translate3d(-100%, 0, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  @keyframes .variant-fadeInLeft {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(-100%, 0, 0);\n      transform: translate3d(-100%, 0, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  .variant-fadeInLeft {\n    -webkit-animation-name: variant-fadeInLeft;\n    animation-name: variant-fadeInLeft;\n  }\n  @-webkit-keyframes .variant-fadeInRight {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(100%, 0, 0);\n      transform: translate3d(100%, 0, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  @keyframes .variant-fadeInRight {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(100%, 0, 0);\n      transform: translate3d(100%, 0, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  .variant-fadeInRight {\n    -webkit-animation-name: variant-fadeInRight;\n    animation-name: variant-fadeInRight;\n  }\n  @-webkit-keyframes .variant-bounceInUp {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 3000px, 0);\n      transform: translate3d(0, 3000px, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, -20px, 0);\n      transform: translate3d(0, -20px, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(0, 10px, 0);\n      transform: translate3d(0, 10px, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(0, -5px, 0);\n      transform: translate3d(0, -5px, 0);\n    }\n    to {\n      -webkit-transform: translateZ(0);\n      transform: translateZ(0);\n    }\n  }\n  @keyframes .variant-bounceInUp {\n    0%,\n    60%,\n    75%,\n    90%,\n    to {\n      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 3000px, 0);\n      transform: translate3d(0, 3000px, 0);\n    }\n    60% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, -20px, 0);\n      transform: translate3d(0, -20px, 0);\n    }\n    75% {\n      -webkit-transform: translate3d(0, 10px, 0);\n      transform: translate3d(0, 10px, 0);\n    }\n    90% {\n      -webkit-transform: translate3d(0, -5px, 0);\n      transform: translate3d(0, -5px, 0);\n    }\n    to {\n      -webkit-transform: translateZ(0);\n      transform: translateZ(0);\n    }\n  }\n  .variant-bounceInUp {\n    -webkit-animation-name: variant-bounceInUp;\n    animation-name: variant-bounceInUp;\n  }\n  .variant-animDelay7 {\n    -webkit-animation-delay: 0.7s !important;\n    -moz-animation-delay: 0.7s !important;\n    -ms-animation-delay: 0.7s !important;\n    -o-animation-delay: 0.7s !important;\n    animation-delay: 0.7s !important;\n  }\n  .variant-animDelay9 {\n    -webkit-animation-delay: 0.9s !important;\n    -moz-animation-delay: 0.9s !important;\n    -ms-animation-delay: 0.9s !important;\n    -o-animation-delay: 0.9s !important;\n    animation-delay: 0.9s !important;\n  }\n  @-webkit-keyframes .variant-fadeInUp {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 100%, 0);\n      transform: translate3d(0, 100%, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  @keyframes .variant-fadeInUp {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 100%, 0);\n      transform: translate3d(0, 100%, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  .variant-fadeInUp {\n    -webkit-animation-name: variant-fadeInUp;\n    animation-name: variant-fadeInUp;\n  }\n  .variant-animDelay14 {\n    -webkit-animation-delay: 1.4s !important;\n    -moz-animation-delay: 1.4s !important;\n    -ms-animation-delay: 1.4s !important;\n    -o-animation-delay: 1.4s !important;\n    animation-delay: 1.4s !important;\n  }\n  .variant-animDelay1 {\n    -webkit-animation-delay: 0.1s !important;\n    -moz-animation-delay: 0.1s !important;\n    -ms-animation-delay: 0.1s !important;\n    -o-animation-delay: 0.1s !important;\n    animation-delay: 0.1s !important;\n  }\n  @-webkit-keyframes .variant-fadeInDown {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -100%, 0);\n      transform: translate3d(0, -100%, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  @keyframes .variant-fadeInDown {\n    0% {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -100%, 0);\n      transform: translate3d(0, -100%, 0);\n    }\n    to {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  .variant-fadeInDown {\n    -webkit-animation-name: variant-fadeInDown;\n    animation-name: variant-fadeInDown;\n  }\n  @-webkit-keyframes .variant-fadeOutUp {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -100%, 0);\n      transform: translate3d(0, -100%, 0);\n    }\n  }\n  @keyframes .variant-fadeOutUp {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -100%, 0);\n      transform: translate3d(0, -100%, 0);\n    }\n  }\n  .variant-fadeOutUp {\n    -webkit-animation-name: variant-fadeOutUp;\n    animation-name: variant-fadeOutUp;\n  }\n  @-webkit-keyframes .variant-fadeOutDown {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 100%, 0);\n      transform: translate3d(0, 100%, 0);\n    }\n  }\n  @keyframes .variant-fadeOutDown {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 100%, 0);\n      transform: translate3d(0, 100%, 0);\n    }\n  }\n  .variant-fadeOutDown {\n    -webkit-animation-name: variant-fadeOutDown;\n    animation-name: variant-fadeOutDown;\n  }\n  @-webkit-keyframes .variant-fadeOut {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n    }\n  }\n  @keyframes .variant-fadeOut {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n    }\n  }\n  .variant-fadeOut {\n    -webkit-animation-name: variant-fadeOut;\n    animation-name: variant-fadeOut;\n  }\n  @-webkit-keyframes .variant-bounceOutUp {\n    20% {\n      -webkit-transform: translate3d(0, -10px, 0);\n      transform: translate3d(0, -10px, 0);\n    }\n    40%,\n    45% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, 20px, 0);\n      transform: translate3d(0, 20px, 0);\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -2000px, 0);\n      transform: translate3d(0, -2000px, 0);\n    }\n  }\n  @keyframes .variant-bounceOutUp {\n    20% {\n      -webkit-transform: translate3d(0, -10px, 0);\n      transform: translate3d(0, -10px, 0);\n    }\n    40%,\n    45% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, 20px, 0);\n      transform: translate3d(0, 20px, 0);\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -2000px, 0);\n      transform: translate3d(0, -2000px, 0);\n    }\n  }\n  .variant-bounceOutUp {\n    -webkit-animation-name: variant-bounceOutUp;\n    animation-name: variant-bounceOutUp;\n  }\n  @-webkit-keyframes .variant-bounceOutDown {\n    20% {\n      -webkit-transform: translate3d(0, 10px, 0);\n      transform: translate3d(0, 10px, 0);\n    }\n    40%,\n    45% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, -20px, 0);\n      transform: translate3d(0, -20px, 0);\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 2000px, 0);\n      transform: translate3d(0, 2000px, 0);\n    }\n  }\n  @keyframes .variant-bounceOutDown {\n    20% {\n      -webkit-transform: translate3d(0, 10px, 0);\n      transform: translate3d(0, 10px, 0);\n    }\n    40%,\n    45% {\n      opacity: 1;\n      -webkit-transform: translate3d(0, -20px, 0);\n      transform: translate3d(0, -20px, 0);\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(0, 2000px, 0);\n      transform: translate3d(0, 2000px, 0);\n    }\n  }\n  .variant-bounceOutDown {\n    -webkit-animation-name: variant-bounceOutDown;\n    animation-name: variant-bounceOutDown;\n  }\n  @-webkit-keyframes .variant-rubberBand {\n    0% {\n      -webkit-transform: scaleX(1);\n      transform: scaleX(1);\n    }\n    30% {\n      -webkit-transform: scale3d(1.25, 0.75, 1);\n      transform: scale3d(1.25, 0.75, 1);\n    }\n    40% {\n      -webkit-transform: scale3d(0.75, 1.25, 1);\n      transform: scale3d(0.75, 1.25, 1);\n    }\n    50% {\n      -webkit-transform: scale3d(1.15, 0.85, 1);\n      transform: scale3d(1.15, 0.85, 1);\n    }\n    65% {\n      -webkit-transform: scale3d(0.95, 1.05, 1);\n      transform: scale3d(0.95, 1.05, 1);\n    }\n    75% {\n      -webkit-transform: scale3d(1.05, 0.95, 1);\n      transform: scale3d(1.05, 0.95, 1);\n    }\n    to {\n      -webkit-transform: scaleX(1);\n      transform: scaleX(1);\n    }\n  }\n  @keyframes .variant-rubberBand {\n    0% {\n      -webkit-transform: scaleX(1);\n      transform: scaleX(1);\n    }\n    30% {\n      -webkit-transform: scale3d(1.25, 0.75, 1);\n      transform: scale3d(1.25, 0.75, 1);\n    }\n    40% {\n      -webkit-transform: scale3d(0.75, 1.25, 1);\n      transform: scale3d(0.75, 1.25, 1);\n    }\n    50% {\n      -webkit-transform: scale3d(1.15, 0.85, 1);\n      transform: scale3d(1.15, 0.85, 1);\n    }\n    65% {\n      -webkit-transform: scale3d(0.95, 1.05, 1);\n      transform: scale3d(0.95, 1.05, 1);\n    }\n    75% {\n      -webkit-transform: scale3d(1.05, 0.95, 1);\n      transform: scale3d(1.05, 0.95, 1);\n    }\n    to {\n      -webkit-transform: scaleX(1);\n      transform: scaleX(1);\n    }\n  }\n  .variant-rubberBand {\n    -webkit-animation-name: variant-rubberBand;\n    animation-name: variant-rubberBand;\n  }\n  @-webkit-keyframes .variant-shake {\n    0%,\n    to {\n      -webkit-transform: translateZ(0);\n      transform: translateZ(0);\n    }\n    10%,\n    30%,\n    50%,\n    70%,\n    90% {\n      -webkit-transform: translate3d(-10px, 0, 0);\n      transform: translate3d(-10px, 0, 0);\n    }\n    20%,\n    40%,\n    60%,\n    80% {\n      -webkit-transform: translate3d(10px, 0, 0);\n      transform: translate3d(10px, 0, 0);\n    }\n  }\n  @keyframes .variant-shake {\n    0%,\n    to {\n      -webkit-transform: translateZ(0);\n      transform: translateZ(0);\n    }\n    10%,\n    30%,\n    50%,\n    70%,\n    90% {\n      -webkit-transform: translate3d(-10px, 0, 0);\n      transform: translate3d(-10px, 0, 0);\n    }\n    20%,\n    40%,\n    60%,\n    80% {\n      -webkit-transform: translate3d(10px, 0, 0);\n      transform: translate3d(10px, 0, 0);\n    }\n  }\n  .variant-shake {\n    -webkit-animation-name: variant-shake;\n    animation-name: variant-shake;\n  }\n  @-webkit-keyframes .variant-rollOut {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(100%, 0, 0) rotate(120deg);\n      transform: translate3d(100%, 0, 0) rotate(120deg);\n    }\n  }\n  @keyframes .variant-rollOut {\n    0% {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n      -webkit-transform: translate3d(100%, 0, 0) rotate(120deg);\n      transform: translate3d(100%, 0, 0) rotate(120deg);\n    }\n  }\n  .variant-rollOut {\n    -webkit-animation-name: variant-rollOut;\n    animation-name: variant-rollOut;\n  }\n  .variant-bg * {\n    font-family: \"DINCompPro-CondMedium\";\n  }\n  .variant-overlay-inner {\n    background-size: cover;\n    width: 420px;\n    min-height: 520px;\n    border-radius: 5px;\n    padding-bottom: 0;\n    border: 2px solid #fff;\n  }\n  .variant-text-outer,\n  .variant-option {\n    width: 380px;\n    margin: auto;\n  }\n  .variant-text1,\n  .variant-text2 {\n    font-size: 26px;\n    font-weight: 400;\n    margin: 15px auto;\n    text-align: center;\n    color: #4e5255;\n    text-transform: uppercase;\n  }\n  .variant-text1 {\n    font-size: 34px;\n    font-weight: 600;\n    margin: 25px auto 15px;\n    color: #016543;\n  }\n  .variant-button {\n    font-size: 24px;\n    padding: 10px;\n    text-transform: uppercase;\n    margin: 300px auto auto;\n    color: #fff;\n    width: 340px;\n    transition: all 0.5s ease !important;\n  }\n  .variant-button:hover {\n    background-color: #016543;\n  }\n  .variant-close {\n    font-size: 14px;\n    background-color: #fff;\n    top: -10px;\n    right: -10px;\n  }\n  .variant-close a.variant-link {\n    color: #000;\n  }\n  @media screen and (max-width: 420px) {\n    .variant-close-safe {\n      display: block;\n    }\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.95);\n      transform-origin: 5% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 420px;\n    }\n  }\n  @media screen and (max-width: 412px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.93);\n      transform-origin: 4.9% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 412px;\n    }\n  }\n  @media screen and (max-width: 403px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.91);\n      transform-origin: 4.8% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 403px;\n    }\n  }\n  @media screen and (max-width: 395px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.89);\n      transform-origin: 4.7% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 395px;\n    }\n  }\n  @media screen and (max-width: 386px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.87);\n      transform-origin: 4.6% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 386px;\n    }\n  }\n  @media screen and (max-width: 378px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.85);\n      transform-origin: 4.5% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 378px;\n    }\n  }\n  @media screen and (max-width: 370px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.84);\n      transform-origin: 4.4% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 370px;\n    }\n  }\n  @media screen and (max-width: 361px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.82);\n      transform-origin: 4.3% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 361px;\n    }\n  }\n  @media screen and (max-width: 353px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.8);\n      transform-origin: 4.2% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 353px;\n    }\n  }\n  @media screen and (max-width: 344px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.78);\n      transform-origin: 4.1% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 344px;\n    }\n  }\n  @media screen and (max-width: 336px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.76);\n      transform-origin: 4% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 336px;\n    }\n  }\n  @media screen and (max-width: 328px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.74);\n      transform-origin: 3.9% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 328px;\n    }\n  }\n  @media screen and (max-width: 319px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.72);\n      transform-origin: 3.8% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 319px;\n    }\n  }\n  @media screen and (max-width: 311px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.7);\n      transform-origin: 3.7% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 311px;\n    }\n  }\n  @media screen and (max-width: 302px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.68);\n      transform-origin: 3.6% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 302px;\n    }\n  }\n  @media screen and (max-width: 294px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.66);\n      transform-origin: 3.5% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 294px;\n    }\n  }\n  @media screen and (max-width: 286px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.65);\n      transform-origin: 3.4% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 286px;\n    }\n  }\n  @media screen and (max-width: 277px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.63);\n      transform-origin: 3.3% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 277px;\n    }\n  }\n  @media screen and (max-width: 269px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.61);\n      transform-origin: 3.2% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 269px;\n    }\n  }\n  @media screen and (max-width: 260px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.59);\n      transform-origin: 3.1% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 260px;\n    }\n  }\n  @media screen and (max-width: 252px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.57);\n      transform-origin: 3% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 252px;\n    }\n  }\n  @media screen and (max-width: 244px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.55);\n      transform-origin: 2.9% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 244px;\n    }\n  }\n  @media screen and (max-width: 235px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.53);\n      transform-origin: 2.8% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 235px;\n    }\n  }\n  @media screen and (max-width: 227px) {\n    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {\n      transform: scale(0.51);\n      transform-origin: 2.7% 0 0;\n    }\n    .variant-overlay-outer {\n      height: 227px;\n    }\n  }\n";
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
      backgroundImage: "url(" + (trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.backgroundURL) + ")",
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
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.heading), React__default.createElement("div", {
    className: 'variant-text variant-text2 variant-animated variant-bounceInRight variant-animDelay6',
    "data-edits": 'text2',
    "data-changes": '.variant-text2|font-size,color,margin-top,margin-bottom',
    style: {
      color: 'white',
      textShadow: '0 1px 4px #000',
      fontSize: 45
    }
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.paragraph), React__default.createElement("div", {
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
      var _trigger$data5, _trigger$data6;
      e.preventDefault();
      trigger !== null && trigger !== void 0 && (_trigger$data5 = trigger.data) !== null && _trigger$data5 !== void 0 && _trigger$data5.buttonURL ? window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data6 = trigger.data) === null || _trigger$data6 === void 0 ? void 0 : _trigger$data6.buttonURL) : closeModal();
    }
  }, React__default.createElement("div", {
    className: 'variant-input-group'
  }, React__default.createElement("span", {
    className: 'variant-button variant-animated variant-fadeInRight variant-animDelay10',
    "data-edits": 'text10',
    "data-changes": '.variant-button|font-size,background-color,color'
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data7 = trigger.data) === null || _trigger$data7 === void 0 ? void 0 : _trigger$data7.buttonText))), React__default.createElement("div", {
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

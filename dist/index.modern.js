import React__default, { createContext, useContext, useState, useEffect, useCallback, createElement } from 'react';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IdleTimerProvider } from 'react-idle-timer';
import { useExitIntent } from 'use-exit-intent';
import Cookies from 'js-cookie';
import { validate, version, v4 } from 'uuid';
import mixpanel from 'mixpanel-browser';
import { init as init$1, BrowserTracing, ErrorBoundary } from '@sentry/react';
import { ErrorBoundary as ErrorBoundary$1 } from 'react-error-boundary';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';

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
  return React__default.createElement(LoggingContext.Provider, {
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

const useCollectorMutation = () => {
  const {
    log,
    error
  } = useLogging();
  return useMutation(data => {
    var _data$visitor;
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

const setCookie = (name, value, expires) => {
  return Cookies.set(name, value, {
    expires: expires || 365,
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

const bootstrapSession = ({
  appId,
  setSession
}) => {
  const session = {
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
  return React__default.createElement(VisitorContext.Provider, {
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

const MIXPANEL_TOKEN = 'd122fa924e1ea97d6b98569440c65a95';
const init = cfg => {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: cfg.debug,
    track_pageview: true,
    persistence: 'localStorage'
  });
};
const trackEvent = (event, props, callback) => {
  return mixpanel.track(event, props, callback);
};
const MixpanelProvider = ({
  children
}) => {
  const {
    appId
  } = useFingerprint();
  const {
    visitor
  } = useVisitor();
  const {
    log
  } = useLogging();
  useEffect(() => {
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
      trackEvent
    }
  }, children);
};
const MixpanelContext = createContext({
  trackEvent: () => {}
});
const useMixpanel = () => {
  return useContext(MixpanelContext);
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
    trackEvent
  } = useMixpanel();
  const {
    mutateAsync: collect
  } = useCollectorMutation();
  const {
    registerHandler
  } = useExitIntent({
    cookie: {
      key: '_cm_exit',
      daysToExpire: 0
    }
  });
  const [idleTimeout, setIdleTimeout] = useState(idleStatusAfterMs);
  const [pageTriggers, setPageTriggers] = useState([]);
  const [displayTrigger, setDisplayTrigger] = useState(undefined);
  const [timeoutId, setTimeoutId] = useState(null);
  const [intently, setIntently] = useState(false);
  console.log('current pageTrigger', pageTriggers);
  log('CollectorProvider: user is on mobile?', lib_44);
  useEffect(() => {
    if (intently) return;
    log('CollectorProvider: removing intently overlay');
    const runningInterval = setInterval(function () {
      var children = document.querySelectorAll('div[id=smc-v5-overlay-106412]');
      Array.prototype.forEach.call(children, function (node) {
        node.parentNode.removeChild(node);
        log('CollectorProvider: successfully removed intently overlay');
        clearInterval(runningInterval);
      });
    }, 100);
    return () => {
      clearInterval(runningInterval);
    };
  }, [intently]);
  const showTrigger = displayTrigger => {
    if (!displayTrigger) {
      return null;
    }
    const trigger = pageTriggers.find(trigger => trigger.invocation === displayTrigger && (handlers === null || handlers === void 0 ? void 0 : handlers.find(handler => handler.behaviour === trigger.behaviour)));
    log('CollectorProvider: available triggers include: ', pageTriggers);
    log('CollectorProvider: attempting to show displayTrigger', displayTrigger, trigger);
    if (!trigger) {
      error('No trigger found for displayTrigger', displayTrigger);
      return null;
    }
    log('CollectorProvider: available handlers include: ', handlers);
    log('CollectorProvider: trigger to match is: ', trigger);
    const handler = handlers === null || handlers === void 0 ? void 0 : handlers.find(handler => handler.behaviour === trigger.behaviour);
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
  const fireIdleTrigger = useCallback(() => {
    if (displayTrigger) return;
    if (!idleTriggers) return;
    log('CollectorProvider: attempting to fire idle trigger');
    setDisplayTrigger('INVOCATION_IDLE_TIME');
  }, [pageTriggers, displayTrigger]);
  const fireExitTrigger = useCallback(() => {
    log('CollectorProvider: attempting to fire exit trigger');
    setDisplayTrigger('INVOCATION_EXIT_INTENT');
  }, []);
  useEffect(() => {
    if (!exitIntentTriggers) return;
    if (lib_44) return;
    log('CollectorProvider: attempting to register exit trigger');
    registerHandler({
      id: 'clientTrigger',
      handler: fireExitTrigger
    });
  }, []);
  const resetDisplayTrigger = useCallback(() => {
    log('CollectorProvider: resetting displayTrigger');
    setDisplayTrigger(undefined);
  }, []);
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
          title: '',
          utm: {
            source: params === null || params === void 0 ? void 0 : params.utm_source,
            medium: params === null || params === void 0 ? void 0 : params.utm_medium,
            campaign: params === null || params === void 0 ? void 0 : params.utm_campaign,
            term: params === null || params === void 0 ? void 0 : params.utm_term,
            content: params === null || params === void 0 ? void 0 : params.utm_content
          }
        }
      }).then(async response => {
        var _payload$pageTriggers;
        const payload = await response.json();
        log('Sent collector data, retrieved:', payload);
        setIdleTimeout(idleStatusAfterMs);
        setPageTriggers((payload === null || payload === void 0 ? void 0 : (_payload$pageTriggers = payload.pageTriggers) === null || _payload$pageTriggers === void 0 ? void 0 : _payload$pageTriggers.filter(trigger => lib_44 && trigger.invocation === 'INVOCATION_IDLE_TIME' || !lib_44 && trigger.invocation === 'INVOCATION_EXIT_INTENT')) || []);
        if (!payload.intently) {
          log('CollectorProvider: user is in Fingerprint cohort');
          setIntently(false);
        } else {
          log('CollectorProvider: user is in Intently cohort');
          setIntently(true);
        }
      }).catch(err => {
        error('failed to store collected data', err);
      });
      log('CollectorProvider: collected data');
    }, initialDelay);
    return () => {
      clearTimeout(delay);
    };
  }, [booted, visitor]);
  useEffect(() => {
    if (!timeoutId) return;
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);
  const renderedTrigger = React__default.useMemo(() => {
    return showTrigger(displayTrigger);
  }, [showTrigger, displayTrigger]);
  return React__default.createElement(IdleTimerProvider, {
    timeout: idleTimeout,
    onPresenceChange: presence => {
      if (presence.type === 'active') {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      log('presence changed', presence);
    },
    onIdle: fireIdleTrigger
  }, React__default.createElement(CollectorContext.Provider, {
    value: {
      resetDisplayTrigger
    }
  }, children, renderedTrigger));
};
const CollectorContext = createContext({
  resetDisplayTrigger: () => {}
});

const useCollector = () => {
  return useContext(CollectorContext);
};

const Modal = ({
  trigger
}) => {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data7;
  const {
    resetDisplayTrigger
  } = useCollector();
  const [open, setOpen] = useState(true);
  const closeModal = () => {
    setOpen(false);
    resetDisplayTrigger();
  };
  console.log('trigger', trigger, trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL);
  useEffect(() => {
    const css = `
  @charset "UTF-8";
  @import "https://fonts.smct.co/Din/font.css";
  .variant-bg,
  .variant-overlay-outer,
  .variant-bar,
  .variant-final-message,
  .variant-success-message {
    display: none;
    font-family: Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .variant-bg,
  .variant-bar {
    z-index: 99999999999;
  }
  .variant-bar,
  .variant-handle,
  .variant-final-message,
  .variant-success-message-inner,
  .variant-overlay-inner {
    background-color: rgba(0, 0, 0, 1);
  }
  .variant-bar,
  .variant-option,
  .variant-handle,
  .variant-final-message,
  .variant-text-outer > .variant-text,
  a.variant-link {
    color: #fff;
  }
  .variant-bg,
  .variant-bg * {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .variant-bg * {
    line-height: 100%;
  }
  .variant-overlay-inner,
  .variant-input,
  .variant-text,
  .variant-text-outer,
  .variant-item,
  .variant-progress,
  .variant-panel .variant-bg,
  .variant-handle > span,
  .variant-loader,
  .variant-loader-single,
  .variant-loader-double,
  .variant-option,
  .variant-long-close {
    display: block;
  }
  .variant-text-outer,
  .variant-option {
    width: 50%;
    min-width: 280px;
    margin: auto;
  }
  .variant-input {
    background-color: rgba(255, 255, 255, 0.8);
  }
  .variant-bg {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
  }
  .variant-overlay-outer {
    position: relative;
    transition: height 0.2s ease;
  }
  .variant-overlay-inner {
    width: 700px;
    min-height: 400px;
    position: relative;
    margin: 10% auto;
    transition: all 0.2s ease;
    padding: 10px 10px 30px;
    min-width: 300px;
  }
  .variant-close {
    border-radius: 50%;
    color: #333;
    cursor: pointer;
    display: block;
    font-size: 20px;
    font-weight: 700;
    height: 30px;
    line-height: 30px;
    position: absolute;
    right: 10px;
    text-align: center;
    top: 10px;
    width: 30px;
    z-index: 100;
  }
  .variant-close a {
    font-family: Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .variant-close:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  .variant-close-safe {
    text-shadow: 1px 1px 1px #000;
    color: #fff;
    width: 100%;
    text-align: center;
    cursor: pointer;
    display: none;
    position: fixed;
    bottom: 30px;
    left: 0;
  }
  .variant-close-safe a {
    color: #fff !important;
  }
  .variant-closer {
    cursor: pointer;
  }
  .variant-long-close {
    font-size: 14px;
    position: absolute;
    bottom: 10px;
    width: 100%;
    left: 0;
    text-align: center;
  }
  .variant-long-close a.variant-link {
    width: auto;
  }
  a.variant-link {
    display: inline-block;
    text-decoration: none;
    height: 100%;
    width: 100%;
  }
  .variant-input,
  .variant-button,
  .variant-reveal {
    width: 100%;
  }
  .variant-button,
  .variant-cover {
    background: #333;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .variant-input {
    color: #000;
    text-align: center;
    border: 1px solid #333;
    margin: 10px auto;
    padding: 10px;
  }
  .variant-input::-webkit-input-placeholder,
  .variant-input:-moz-placeholder,
  .variant-input::-moz-placeholder,
  .variant-input:-ms-input-placeholder {
    color: #ccc;
    text-transform: uppercase;
  }
  .variant-input:focus {
    outline: none;
  }
  .variant-button {
    border: medium none;
    color: #fff;
    outline: medium none;
    display: block;
    margin: 10px auto;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
  }
  .variant-reveal {
    display: block;
    margin: 10px auto;
    position: relative;
    text-align: center;
  }
  .variant-cover,
  .variant-code {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    font-size: 20px;
  }
  .variant-cover {
    z-index: 2;
    color: #fff;
    padding: 11px;
    cursor: pointer;
  }
  .variant-button:hover,
  .variant-cover:hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  }
  .variant-code {
    z-index: 1;
    border: 1px solid #333;
    background: rgba(255, 255, 255, 0.8);
    color: #333;
    font-weight: 700;
    -moz-user-select: text;
    -webkit-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
  .variant-text {
    text-align: center;
    font-size: 20px;
  }
  .variant-text2 {
    font-size: 40px;
    font-weight: 700;
  }
  .variant-img-outer {
    position: relative;
    width: 100%;
    display: block;
  }
  .variant-img {
    display: block;
    width: 100%;
  }
  .variant-img img {
    border: medium none;
    display: block;
    margin: auto;
    outline: medium none;
    max-width: 100%;
  }
  .variant-clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
  .variant-clearfix {
    display: inline-block;
    height: 1%;
    display: block;
  }
  .variant-item {
    height: 80px;
    padding: 10px;
    border-bottom: 1px dashed #ccc;
  }
  .variant-item .variant-item-img {
    display: inline-block;
    text-align: center;
  }
  .variant-item .variant-item-img img {
    max-width: 60px;
    max-height: 60px;
  }
  .variant-item .variant-title {
    font-weight: 700;
    display: inline-block;
  }
  .variant-item .variant-price {
    display: inline-block;
  }
  .variant-item .variant-qty {
    display: inline-block;
  }
  .variant-progress {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    height: 21px;
    margin-bottom: 21px;
    overflow: hidden;
    width: 100%;
  }
  .variant-progress-bar {
    background-color: #007932;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15) inset;
    color: #fff;
    float: left;
    font-size: 12px;
    height: 100%;
    line-height: 21px;
    text-align: center;
    transition: width 0.6s ease 0s;
    width: 0;
  }
  .variant-progress .variant-progress-bar {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 40px 40px;
    animation: 0.5s linear 0s normal none infinite running
      .variant-progress-bar-stripes;
  }
  @-webkit-keyframes .variant-progress-bar-stripes {
    from {
      background-position: 40px 0;
    }
    to {
      background-position: 0 0;
    }
  }
  @-o-keyframes .variant-progress-bar-stripes {
    from {
      background-position: 40px 0;
    }
    to {
      background-position: 0 0;
    }
  }
  @keyframes .variant-progress-bar-stripes {
    from {
      background-position: 40px 0;
    }
    to {
      background-position: 0 0;
    }
  }
  .variant-overlay {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  }
  .variant-overlay:before,
  .variant-overlay:after {
    content: "";
    position: absolute;
    z-index: -1;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    top: 0;
    bottom: 0;
    left: 10px;
    right: 10px;
    border-radius: 100px / 10px;
  }
  .variant-overlay:after {
    right: 10px;
    left: auto;
    transform: skew(8deg) rotate(3deg);
  }
  .variant-panel .variant-bg {
    width: 0;
    height: 100%;
    position: fixed;
    z-index: 1001;
    top: 0;
    background-color: #111;
    padding: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: #fff;
    overflow-x: hidden;
    overflow-y: scroll;
    transition: width 0.5s;
  }
  .variant-panel-body-cover {
    position: fixed;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: none;
  }
  .variant-panel.variant-panel-left .variant-bg {
    right: auto;
  }
  .variant-panel.variant-panel-right .variant-bg {
    left: auto;
  }
  .variant-panel .variant-overlay-inner {
    width: 90%;
  }
  .variant-input-group {
    display: block;
    text-align: center;
  }
  .variant-input-group input[type="checkbox"],
  .variant-input-group input[type="radio"] {
    margin-right: 3px;
    margin-left: 10px;
  }
  .variant-input-error ::-webkit-input-placeholder,
  .variant-input-error :-moz-placeholder,
  .variant-input-error ::-moz-placeholder,
  .variant-input-error :-ms-input-placeholder {
    color: #d30003;
  }
  .variant-input-error label {
    color: #d30003;
  }
  .variant-input-error input,
  .variant-input-error select,
  .variant-input-error textarea {
    border-color: #d30003;
  }
  .variant-bar,
  .variant-handle {
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.3);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .variant-bar {
    display: none;
    position: fixed;
    top: 0;
    left: 25%;
    right: 25%;
    width: 50%;
    font-weight: 700;
    font-size: 16px;
    text-shadow: none;
    text-align: center;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
  }
  @media (max-width: 500px) {
    .variant-bar {
      width: 80%;
      left: 10%;
    }
  }
  .variant-bar-close {
    cursor: pointer;
    height: 10px;
    line-height: 10px;
    position: absolute;
    right: 10px;
    top: 10px;
    width: 10px;
  }
  .variant-handle {
    position: absolute;
    width: 50px;
    margin-left: -25px;
    height: 20px;
    left: 50%;
    bottom: -20px;
    cursor: pointer;
    line-height: 12px;
    letter-spacing: -2px;
  }
  .variant-handle > span {
    position: absolute;
    width: 60%;
    left: 20%;
    height: 2px;
    background: #fff;
  }
  .variant-bar1 {
    top: 20%;
  }
  .variant-bar2 {
    top: 40%;
  }
  .variant-bar3 {
    top: 60%;
  }
  .variant-arrow-up {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #000;
  }
  .variant-arrow-down {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #000;
  }
  .variant-arrow-right {
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #000;
  }
  .variant-arrow-left {
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid #000;
  }
  .variant-preview {
    position: fixed;
    top: 20px;
    left: 50%;
    margin-left: -160px;
    width: 320px;
    padding: 5px 10px;
    background: #ff0;
    color: #000;
    font-family: Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 12px;
    text-align: center;
    border-radius: 5px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  .variant-preview-close {
    font-size: 7px;
    height: 3px;
    position: absolute;
    right: 4px;
    top: 0;
    width: 3px;
  }
  .variant-preview .variant-arrow-up {
    position: absolute;
    top: -20px;
    left: 50%;
    margin-left: -10px;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #ff0;
  }
  .variant-notices {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transition: height 0.3s ease;
  }
  .variant-notice-box {
    padding: 5px 10px;
    background: #ec6952;
    font-size: 12px;
    text-align: left;
    border-radius: 5px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    min-height: 30px;
    min-width: 100px;
    max-width: 500px;
    width: auto;
    margin-bottom: 5px;
    color: #fff;
    float: right;
    clear: both;
    z-index: 100;
    transition: all 0.5s ease;
    overflow: hidden;
  }
  .variant-notice-box.success {
    background: #24a233;
  }
  .variant-notice-box.warning {
    background: #cf9d0f;
  }
  .variant-notice-box.danger {
    background: #d30003;
  }
  @media screen {
    .variant-preloader {
      position: fixed;
      left: -9999px;
      top: -9999px;
    }
    .variant-preloader img {
      display: block;
    }
  }
  @media print {
    .variant-preloader,
    .variant-preloader img {
      visibility: hidden;
      display: none;
    }
  }
  .variant-final-message {
    border-radius: 2px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    bottom: 10px;
    font-size: 16px;
    padding: 10px 20px;
    position: fixed;
    right: 10px;
    z-index: 1e15;
  }
  .variant-final-message-close {
    position: absolute;
    top: 3px;
    right: 1px;
    width: 10px;
    height: 10px;
    cursor: pointer;
    font-size: 10px;
    opacity: 0.5;
  }
  .variant-final-message .variant-select {
    font-weight: 700;
  }
  .variant-final-message:hover .variant-final-message-close {
    opacity: 1;
  }
  .variant-success-message {
    position: absolute;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
  }
  .variant-success-message-inner {
    background: #08ad00 none repeat scroll 0 0;
    border-radius: 5px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
    color: #fff;
    display: inline-block;
    font-size: 30px;
    margin: 20% auto auto;
    padding: 10px 30px;
    position: relative;
  }
  .variant-success-close {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    font-size: 12px;
  }
  @-webkit-keyframes .variant-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes .variant-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes .variant-pulse {
    50% {
      background: #fff;
    }
  }
  @keyframes .variant-pulse {
    50% {
      background: #fff;
    }
  }
  .variant-loader-bg,
  .variant-dc-placeholder {
    position: absolute;
    top: 10%;
    left: 50%;
    background: rgba(0, 0, 0, 0.8);
    width: 60px;
    margin-left: -30px;
    height: 60px;
    z-index: 10;
    border-radius: 10px;
    display: none;
  }
  .variant-loader,
  .variant-loader-single,
  .variant-loader-double {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 5px;
    border: 0.25rem solid rgba(255, 255, 255, 0.2);
    border-top-color: #fff;
    -webkit-animation: variant-spin 1s infinite linear;
    animation: variant-spin 1s infinite linear;
  }
  .variant-loader-double {
    border-style: double;
    border-width: 0.5rem;
  }
  .variant-loader-pulse {
    -webkit-animation: variant-pulse 750ms infinite;
    animation: variant-pulse 750ms infinite;
    -webkit-animation-delay: 250ms;
    animation-delay: 250ms;
    height: 30px;
    left: 25px;
    position: absolute;
    top: 14px;
    width: 10px;
  }
  .variant-loader-pulse:before,
  .variant-loader-pulse:after {
    content: "";
    position: absolute;
    display: block;
    height: 16px;
    width: 6px;
    top: 50%;
    background: rgba(255, 255, 255, 0.2);
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    -webkit-animation: variant-pulse 750ms infinite;
    animation: variant-pulse 750ms infinite;
  }
  .variant-loader-pulse:before {
    left: -12px;
  }
  .variant-loader-pulse:after {
    left: 16px;
    -webkit-animation-delay: 500ms;
    animation-delay: 500ms;
  }
  .variant-loader-bg[data-theme="white"],
  .variant-dc-placeholder {
    background: rgba(255, 255, 255, 0.8);
  }
  .variant-loader-bg[data-theme="white"] .variant-loader-single,
  .variant-dc-placeholder .variant-loader-single,
  .variant-loader-bg[data-theme="white"] .variant-loader-double,
  .variant-dc-placeholder .variant-loader-double,
  .variant-loader-bg[data-theme="white"] .variant-loader-pulse,
  .variant-dc-placeholder .variant-loader-pulse {
    border-color: rgba(0, 0, 0, 0.2);
    border-top-color: #000;
  }
  .variant-terms {
    background-color: #fff;
    border: 1px solid #333;
    border-radius: 3px;
    bottom: 5%;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
    left: 5%;
    padding: 10px;
    position: absolute;
    right: 5%;
    top: 5%;
    z-index: 101;
    display: none;
  }
  .variant-terms-header,
  .variant-terms-para,
  .variant-terms-close,
  .variant-terms-close-x {
    color: #333;
    display: block;
  }
  .variant-terms-scroller {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 30px;
    overflow: auto;
  }
  .variant-terms-header {
    font-size: 20px;
    font-weight: 700;
    margin: 5px 0;
    text-align: center;
  }
  .variant-terms-para {
    margin: 5px 0;
    font-size: 12px;
  }
  .variant-terms-close {
    bottom: 10px;
    cursor: pointer;
    left: 10px;
    position: absolute;
    right: 10px;
    text-align: center;
  }
  .variant-show-terms,
  .variant-show-terms {
    text-decoration: underline;
    cursor: pointer;
  }
  .variant-terms[data-theme="dark"] {
    background-color: #333;
  }
  .variant-terms[data-theme="dark"] .variant-terms-header,
  .variant-terms[data-theme="dark"] .variant-terms-para,
  .variant-terms[data-theme="dark"] .variant-terms-close,
  .variant-terms[data-theme="dark"] .variant-terms-close-x {
    color: #fff;
  }
  .variant-terms-close-x {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    opacity: 0.7;
    -webkit-transition: all 0.25s ease-in-out;
    -ms-transition: all 0.25s ease-in-out;
    -o-transition: all 0.25s ease-in-out;
    -moz-transition: all 0.25s ease-in-out;
    transition: transform all 0.25s ease-in-out;
  }
  .variant-terms-close-x:hover {
    opacity: 1;
    -webkit-transform: rotate(180deg) scale(1.3);
    -ms-transform: rotate(180deg) scale(1.3);
    -o-transform: rotate(180deg) scale(1.3);
    -moz-transform: rotate(180deg) scale(1.3);
    transform: rotate(180deg) scale(1.3);
  }
  .variant-cp {
    -youbkit-touch-callout: none;
    -youbkit-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .variant-cp,
  .variant-cp-msg {
    display: none;
  }
  .variant-hidden-consents {
    opacity: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 1px;
    height: 1px;
    visibility: hidden;
  }
  .variant-requestNotifications .variant-agree-yes,
  .variant-requestNotifications .variant-agree-no {
    display: none;
  }
  .variant-notices {
    padding: 10px;
    right: 20px;
    left: auto;
    max-width: 300px;
    z-index: 100;
  }
  .variant-dc-placeholder {
    display: block;
    height: 30px;
    width: 30px;
    top: 3px;
  }
  .variant-dc-placeholder > * {
    height: 20px;
    width: 20px;
  }
  .variant-shake-msg {
    display: none;
  }
  .variant-animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  .variant-animated.variant-infinite {
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  .variant-animated.variant-hinge {
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
  }
  .variant-animated.variant-bounceIn,
  .variant-animated.variant-bounceOut,
  .variant-animated.variant-flipOutX,
  .variant-animated.variant-flipOutY {
    -webkit-animation-duration: 0.75s;
    animation-duration: 0.75s;
  }
  @-webkit-keyframes .variant-fadeIn {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes .variant-fadeIn {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .variant-fadeIn {
    -webkit-animation-name: variant-fadeIn;
    animation-name: variant-fadeIn;
  }
  @-webkit-keyframes .variant-bounceInDown {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -3000px, 0);
      transform: translate3d(0, -3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-bounceInDown {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -3000px, 0);
      transform: translate3d(0, -3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-bounceInDown {
    -webkit-animation-name: variant-bounceInDown;
    animation-name: variant-bounceInDown;
  }
  .variant-animDelay2 {
    -webkit-animation-delay: 0.2s !important;
    -moz-animation-delay: 0.2s !important;
    -ms-animation-delay: 0.2s !important;
    -o-animation-delay: 0.2s !important;
    animation-delay: 0.2s !important;
  }
  .variant-animDelay6 {
    -webkit-animation-delay: 0.6s !important;
    -moz-animation-delay: 0.6s !important;
    -ms-animation-delay: 0.6s !important;
    -o-animation-delay: 0.6s !important;
    animation-delay: 0.6s !important;
  }
  @-webkit-keyframes .variant-bounceInRight {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(3000px, 0, 0);
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(-25px, 0, 0);
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
    90% {
      -webkit-transform: translate3d(-5px, 0, 0);
      transform: translate3d(-5px, 0, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-bounceInRight {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(3000px, 0, 0);
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(-25px, 0, 0);
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
    90% {
      -webkit-transform: translate3d(-5px, 0, 0);
      transform: translate3d(-5px, 0, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-bounceInRight {
    -webkit-animation-name: variant-bounceInRight;
    animation-name: variant-bounceInRight;
  }
  .variant-animDelay8 {
    -webkit-animation-delay: 0.8s !important;
    -moz-animation-delay: 0.8s !important;
    -ms-animation-delay: 0.8s !important;
    -o-animation-delay: 0.8s !important;
    animation-delay: 0.8s !important;
  }
  .variant-animDelay10 {
    -webkit-animation-delay: 1s !important;
    -moz-animation-delay: 1s !important;
    -ms-animation-delay: 1s !important;
    -o-animation-delay: 1s !important;
    animation-delay: 1s !important;
  }
  .variant-animDelay12 {
    -webkit-animation-delay: 1.2s !important;
    -moz-animation-delay: 1.2s !important;
    -ms-animation-delay: 1.2s !important;
    -o-animation-delay: 1.2s !important;
    animation-delay: 1.2s !important;
  }
  .variant-animDelay4 {
    -webkit-animation-delay: 0.4s !important;
    -moz-animation-delay: 0.4s !important;
    -ms-animation-delay: 0.4s !important;
    -o-animation-delay: 0.4s !important;
    animation-delay: 0.4s !important;
  }
  @-webkit-keyframes .variant-bounceInLeft {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-3000px, 0, 0);
      transform: translate3d(-3000px, 0, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(25px, 0, 0);
      transform: translate3d(25px, 0, 0);
    }
    75% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
    90% {
      -webkit-transform: translate3d(5px, 0, 0);
      transform: translate3d(5px, 0, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-bounceInLeft {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-3000px, 0, 0);
      transform: translate3d(-3000px, 0, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(25px, 0, 0);
      transform: translate3d(25px, 0, 0);
    }
    75% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
    90% {
      -webkit-transform: translate3d(5px, 0, 0);
      transform: translate3d(5px, 0, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-bounceInLeft {
    -webkit-animation-name: variant-bounceInLeft;
    animation-name: variant-bounceInLeft;
  }
  @-webkit-keyframes .variant-fadeInLeft {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-fadeInLeft {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-fadeInLeft {
    -webkit-animation-name: variant-fadeInLeft;
    animation-name: variant-fadeInLeft;
  }
  @-webkit-keyframes .variant-fadeInRight {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-fadeInRight {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-fadeInRight {
    -webkit-animation-name: variant-fadeInRight;
    animation-name: variant-fadeInRight;
  }
  @-webkit-keyframes .variant-bounceInUp {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 3000px, 0);
      transform: translate3d(0, 3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, -5px, 0);
      transform: translate3d(0, -5px, 0);
    }
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }
  @keyframes .variant-bounceInUp {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 3000px, 0);
      transform: translate3d(0, 3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, -5px, 0);
      transform: translate3d(0, -5px, 0);
    }
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }
  .variant-bounceInUp {
    -webkit-animation-name: variant-bounceInUp;
    animation-name: variant-bounceInUp;
  }
  .variant-animDelay7 {
    -webkit-animation-delay: 0.7s !important;
    -moz-animation-delay: 0.7s !important;
    -ms-animation-delay: 0.7s !important;
    -o-animation-delay: 0.7s !important;
    animation-delay: 0.7s !important;
  }
  .variant-animDelay9 {
    -webkit-animation-delay: 0.9s !important;
    -moz-animation-delay: 0.9s !important;
    -ms-animation-delay: 0.9s !important;
    -o-animation-delay: 0.9s !important;
    animation-delay: 0.9s !important;
  }
  @-webkit-keyframes .variant-fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-fadeInUp {
    -webkit-animation-name: variant-fadeInUp;
    animation-name: variant-fadeInUp;
  }
  .variant-animDelay14 {
    -webkit-animation-delay: 1.4s !important;
    -moz-animation-delay: 1.4s !important;
    -ms-animation-delay: 1.4s !important;
    -o-animation-delay: 1.4s !important;
    animation-delay: 1.4s !important;
  }
  .variant-animDelay1 {
    -webkit-animation-delay: 0.1s !important;
    -moz-animation-delay: 0.1s !important;
    -ms-animation-delay: 0.1s !important;
    -o-animation-delay: 0.1s !important;
    animation-delay: 0.1s !important;
  }
  @-webkit-keyframes .variant-fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-fadeInDown {
    -webkit-animation-name: variant-fadeInDown;
    animation-name: variant-fadeInDown;
  }
  @-webkit-keyframes .variant-fadeOutUp {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  @keyframes .variant-fadeOutUp {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  .variant-fadeOutUp {
    -webkit-animation-name: variant-fadeOutUp;
    animation-name: variant-fadeOutUp;
  }
  @-webkit-keyframes .variant-fadeOutDown {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }
  @keyframes .variant-fadeOutDown {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }
  .variant-fadeOutDown {
    -webkit-animation-name: variant-fadeOutDown;
    animation-name: variant-fadeOutDown;
  }
  @-webkit-keyframes .variant-fadeOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes .variant-fadeOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .variant-fadeOut {
    -webkit-animation-name: variant-fadeOut;
    animation-name: variant-fadeOut;
  }
  @-webkit-keyframes .variant-bounceOutUp {
    20% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0);
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -2000px, 0);
      transform: translate3d(0, -2000px, 0);
    }
  }
  @keyframes .variant-bounceOutUp {
    20% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0);
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -2000px, 0);
      transform: translate3d(0, -2000px, 0);
    }
  }
  .variant-bounceOutUp {
    -webkit-animation-name: variant-bounceOutUp;
    animation-name: variant-bounceOutUp;
  }
  @-webkit-keyframes .variant-bounceOutDown {
    20% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 2000px, 0);
      transform: translate3d(0, 2000px, 0);
    }
  }
  @keyframes .variant-bounceOutDown {
    20% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 2000px, 0);
      transform: translate3d(0, 2000px, 0);
    }
  }
  .variant-bounceOutDown {
    -webkit-animation-name: variant-bounceOutDown;
    animation-name: variant-bounceOutDown;
  }
  @-webkit-keyframes .variant-rubberBand {
    0% {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }
    to {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
  @keyframes .variant-rubberBand {
    0% {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }
    to {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
  .variant-rubberBand {
    -webkit-animation-name: variant-rubberBand;
    animation-name: variant-rubberBand;
  }
  @-webkit-keyframes .variant-shake {
    0%,
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
  }
  @keyframes .variant-shake {
    0%,
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
  }
  .variant-shake {
    -webkit-animation-name: variant-shake;
    animation-name: variant-shake;
  }
  @-webkit-keyframes .variant-rollOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0) rotate(120deg);
      transform: translate3d(100%, 0, 0) rotate(120deg);
    }
  }
  @keyframes .variant-rollOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0) rotate(120deg);
      transform: translate3d(100%, 0, 0) rotate(120deg);
    }
  }
  .variant-rollOut {
    -webkit-animation-name: variant-rollOut;
    animation-name: variant-rollOut;
  }
  .variant-bg * {
    font-family: "DINCompPro-CondMedium";
  }
  .variant-overlay-inner {
    background-size: cover;
    width: 420px;
    min-height: 520px;
    border-radius: 5px;
    padding-bottom: 0;
    border: 2px solid #fff;
  }
  .variant-text-outer,
  .variant-option {
    width: 380px;
    margin: auto;
  }
  .variant-text1,
  .variant-text2 {
    font-size: 26px;
    font-weight: 400;
    margin: 15px auto;
    text-align: center;
    color: #4e5255;
    text-transform: uppercase;
  }
  .variant-text1 {
    font-size: 34px;
    font-weight: 600;
    margin: 25px auto 15px;
    color: #016543;
  }
  .variant-button {
    font-size: 24px;
    padding: 10px;
    text-transform: uppercase;
    margin: 300px auto auto;
    color: #fff;
    width: 340px;
    transition: all 0.5s ease !important;
  }
  .variant-button:hover {
    background-color: #016543;
  }
  .variant-close {
    font-size: 14px;
    background-color: #fff;
    top: -10px;
    right: -10px;
  }
  .variant-close a.variant-link {
    color: #000;
  }
  @media screen and (max-width: 420px) {
    .variant-close-safe {
      display: block;
    }
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.95);
      transform-origin: 5% 0 0;
    }
    .variant-overlay-outer {
      height: 420px;
    }
  }
  @media screen and (max-width: 412px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.93);
      transform-origin: 4.9% 0 0;
    }
    .variant-overlay-outer {
      height: 412px;
    }
  }
  @media screen and (max-width: 403px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.91);
      transform-origin: 4.8% 0 0;
    }
    .variant-overlay-outer {
      height: 403px;
    }
  }
  @media screen and (max-width: 395px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.89);
      transform-origin: 4.7% 0 0;
    }
    .variant-overlay-outer {
      height: 395px;
    }
  }
  @media screen and (max-width: 386px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.87);
      transform-origin: 4.6% 0 0;
    }
    .variant-overlay-outer {
      height: 386px;
    }
  }
  @media screen and (max-width: 378px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.85);
      transform-origin: 4.5% 0 0;
    }
    .variant-overlay-outer {
      height: 378px;
    }
  }
  @media screen and (max-width: 370px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.84);
      transform-origin: 4.4% 0 0;
    }
    .variant-overlay-outer {
      height: 370px;
    }
  }
  @media screen and (max-width: 361px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.82);
      transform-origin: 4.3% 0 0;
    }
    .variant-overlay-outer {
      height: 361px;
    }
  }
  @media screen and (max-width: 353px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.8);
      transform-origin: 4.2% 0 0;
    }
    .variant-overlay-outer {
      height: 353px;
    }
  }
  @media screen and (max-width: 344px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.78);
      transform-origin: 4.1% 0 0;
    }
    .variant-overlay-outer {
      height: 344px;
    }
  }
  @media screen and (max-width: 336px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.76);
      transform-origin: 4% 0 0;
    }
    .variant-overlay-outer {
      height: 336px;
    }
  }
  @media screen and (max-width: 328px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.74);
      transform-origin: 3.9% 0 0;
    }
    .variant-overlay-outer {
      height: 328px;
    }
  }
  @media screen and (max-width: 319px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.72);
      transform-origin: 3.8% 0 0;
    }
    .variant-overlay-outer {
      height: 319px;
    }
  }
  @media screen and (max-width: 311px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.7);
      transform-origin: 3.7% 0 0;
    }
    .variant-overlay-outer {
      height: 311px;
    }
  }
  @media screen and (max-width: 302px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.68);
      transform-origin: 3.6% 0 0;
    }
    .variant-overlay-outer {
      height: 302px;
    }
  }
  @media screen and (max-width: 294px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.66);
      transform-origin: 3.5% 0 0;
    }
    .variant-overlay-outer {
      height: 294px;
    }
  }
  @media screen and (max-width: 286px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.65);
      transform-origin: 3.4% 0 0;
    }
    .variant-overlay-outer {
      height: 286px;
    }
  }
  @media screen and (max-width: 277px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.63);
      transform-origin: 3.3% 0 0;
    }
    .variant-overlay-outer {
      height: 277px;
    }
  }
  @media screen and (max-width: 269px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.61);
      transform-origin: 3.2% 0 0;
    }
    .variant-overlay-outer {
      height: 269px;
    }
  }
  @media screen and (max-width: 260px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.59);
      transform-origin: 3.1% 0 0;
    }
    .variant-overlay-outer {
      height: 260px;
    }
  }
  @media screen and (max-width: 252px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.57);
      transform-origin: 3% 0 0;
    }
    .variant-overlay-outer {
      height: 252px;
    }
  }
  @media screen and (max-width: 244px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.55);
      transform-origin: 2.9% 0 0;
    }
    .variant-overlay-outer {
      height: 244px;
    }
  }
  @media screen and (max-width: 235px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.53);
      transform-origin: 2.8% 0 0;
    }
    .variant-overlay-outer {
      height: 235px;
    }
  }
  @media screen and (max-width: 227px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.51);
      transform-origin: 2.7% 0 0;
    }
    .variant-overlay-outer {
      height: 227px;
    }
  }
`;
    const styles = document.createElement('style');
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
      backgroundImage: `url(${trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.backgroundURL})`,
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
    onClick: e => {
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
    onClick: e => {
      e.preventDefault();
      closeModal();
    }
  })), React__default.createElement("div", {
    className: 'variant-close variant-animated variant-fadeInRight variant-animDelay4 variant-closer'
  }, React__default.createElement("a", {
    "data-close-type": 'x_close',
    className: 'variant-link',
    href: '#rdl',
    onClick: e => {
      e.preventDefault();
      closeModal();
    }
  }, "\u2715")))), React__default.createElement("div", {
    className: 'variant-close-safe variant-closer'
  }, React__default.createElement("a", {
    "data-close-type": 'x_close',
    className: 'variant-link',
    href: '#rdl',
    onClick: e => {
      e.preventDefault();
      closeModal();
    }
  }, "[close]")))));
};
const TriggerModal = ({
  trigger
}) => {
  return ReactDOM.createPortal(React__default.createElement(Modal, {
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
  }, "\u00D7"), React__default.createElement("iframe", {
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
  return ReactDOM.createPortal(React__default.createElement(Youtube, {
    trigger: trigger
  }), document.body);
};

const baseUrl = 'https://bookings-bff.starship-staging.com';
const makeFullUrl = (resource, params = {}) => {
  if (resource.startsWith('/')) {
    resource = resource.substring(1);
  }
  const fullUri = `${baseUrl}/${resource}`;
  if (Object.keys(params).length === 0) {
    return fullUri;
  }
  return `${fullUri}?${new URLSearchParams(params).toString()}`;
};
const Button = ({
  children,
  className,
  onClick,
  disabled,
  colour: _colour = 'primary'
}) => {
  let builtButtonClasses = `btn step-button bg-${_colour} border-${_colour} text-white hover:bg-${_colour}/80 disabled:text-${_colour}/50 disabled:border-${_colour}/50` + (className ? ' ' + className : '');
  if (disabled) {
    builtButtonClasses += ' disabled';
  }
  return createElement("button", {
    disabled: disabled,
    className: builtButtonClasses,
    onClick: onClick
  }, children);
};
const Voucher = ({
  details
}) => {
  return createElement("div", null, createElement("h3", null, "Terms of Voucher"), createElement("p", {
    className: 'text-sm'
  }, details.termsAndConditions));
};
const TriggerInverse = ({}) => {
  const landingPage = {};
  const form = {};
  const location = {};
  const [open, setOpen] = useState(true);
  if (!open) {
    return null;
  }
  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm();
  const initialState = {
    busy: false,
    complete: false,
    voucher: null,
    error: null,
    responseStatusCode: 0
  };
  const [state, setState] = useState(initialState);
  async function submitVoucher(data) {
    const reqData = {
      ...data,
      bookingLink: `${location === null || location === void 0 ? void 0 : location.origin}/${landingPage === null || landingPage === void 0 ? void 0 : landingPage.slug}`
    };
    const response = await fetch(makeFullUrl(`campaigns/${form === null || form === void 0 ? void 0 : form.campaign}/voucher?locationID=${landingPage === null || landingPage === void 0 ? void 0 : landingPage.identifier}`), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(reqData)
    });
    response.json().then(responseData => {
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
  }
  async function onSubmit(data) {
    setState({
      busy: true
    });
    try {
      if (form.campaign !== '') {
        submitVoucher(data).then(() => {
          const eventData = {
            item_name: landingPage === null || landingPage === void 0 ? void 0 : landingPage.name,
            affiliation: 'Booking Flow'
          };
          console.log(eventData);
        });
      }
    } catch (e) {}
  }
  if (state.complete === true) {
    return createElement("div", {
      className: 'container'
    }, createElement("h2", null, "Voucher Sent!"), createElement("p", {
      className: 'text-md'
    }, "Good news! We've sent your voucher to the email provided!"), state.voucher && createElement("div", {
      className: 'col-12 mt-3'
    }, createElement(Voucher, {
      details: state.voucher
    })));
  }
  if (state.responseStatusCode === 409) {
    return createElement("div", {
      className: 'container'
    }, createElement("h2", {
      className: 'mt-3'
    }, "Uh-oh!"), createElement("p", null, "It seems that you already received this voucher. Please get in touch if this doesn't seem right:\u00A0", createElement("a", {
      href: '/help',
      className: 'underline font-serif tracking-wide',
      onClick: () => setOpen(false)
    }, "contact us")));
  }
  return createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999
    }
  }, createElement("main", {
    className: 'flex-grow flex flex-col justify-center container relative'
  }, createElement("div", {
    className: 'w-full'
  }, createElement("div", {
    className: 'cms-content text-center md:text-left'
  }, createElement("h2", null, "Get Your Voucher"), createElement("p", null, "To receive your voucher, we just need a few details from you."), createElement("h3", {
    className: `bar-title border-l-4 border-solid border-${landingPage === null || landingPage === void 0 ? void 0 : landingPage.colour}`
  }, "Contact Info"), createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("div", {
    className: 'grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2'
  }, createElement("div", null, createElement("label", {
    htmlFor: 'first_name'
  }, "First Name*"), createElement("input", Object.assign({}, register('firstName', {
    required: true,
    minLength: 2,
    maxLength: 30,
    validate: value => value.trim().length >= 2
  }), {
    type: 'text',
    className: 'form-input',
    id: 'firstName'
  }))), createElement("div", null, createElement("label", {
    htmlFor: 'last_name'
  }, "Last Name*"), createElement("input", Object.assign({}, register('lastName', {
    required: true,
    minLength: 2,
    maxLength: 30,
    validate: value => value.trim().length >= 2
  }), {
    type: 'text',
    className: 'form-input',
    id: 'lastName'
  }))), createElement("div", null, createElement("label", {
    htmlFor: 'email'
  }, "Email*"), createElement("input", Object.assign({}, register('emailAddress', {
    required: true
  }), {
    type: 'email',
    className: 'form-input',
    id: 'email'
  })))), createElement("div", null, createElement("p", null, "* Required Field")), createElement("div", {
    className: 'flex gap-x-6 gap-y-2 items-center flex-wrap justify-center lg:justify-start'
  }, createElement("div", {
    className: 'form-check'
  }, createElement("input", Object.assign({
    type: 'checkbox'
  }, register('terms', {
    required: true
  }), {
    className: 'form-check-input',
    id: 'terms'
  })), ' ', createElement("label", {
    htmlFor: 'terms',
    className: 'form-check-label'
  }, "I confirm that I have read & agreed with the", ' ', createElement("a", {
    href: landingPage === null || landingPage === void 0 ? void 0 : landingPage.privacyPolicy,
    target: '_blank',
    rel: 'noreferrer'
  }, "Privacy Policy"), "*")), createElement(Button, {
    className: 'btn mt-2 md:mt-0',
    type: 'submit',
    colour: landingPage === null || landingPage === void 0 ? void 0 : landingPage.colour,
    disabled: state.busy || isSubmitting
  }, isSubmitting || state.busy ? 'Sending Voucher...' : 'Get My Voucher')), state.error && state.responseStatusCode !== 409 && createElement("div", {
    className: `alert mt-5 bg-${landingPage === null || landingPage === void 0 ? void 0 : landingPage.colour}/20`
  }, "There was a problem sending your voucher. Please check your details and try again."))))));
};

const clientHandlers = [{
  id: 'modal_v1',
  behaviour: 'BEHAVIOUR_MODAL',
  invoke: trigger => React__default.createElement(TriggerModal, {
    trigger: trigger
  })
}, {
  id: 'youtube_v1',
  behaviour: 'youtube',
  invoke: trigger => React__default.createElement(TriggerYoutube, {
    trigger: trigger
  })
}, {
  id: 'inverse_v1',
  behaviour: 'inverse_flow',
  invoke: trigger => React__default.createElement(TriggerInverse, {
    trigger: trigger
  })
}];

init$1({
  dsn: 'https://129339f9b28f958328e76d62fb3f0b2b@o1282674.ingest.sentry.io/4505641419014144',
  integrations: [new BrowserTracing({
    tracePropagationTargets: ['localhost:8000', 'https:yourserver.io/api/']
  })],
  tracesSampleRate: 1.0
});
const queryClient = new QueryClient();
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
  const [handlers, setHandlers] = useState(defaultHandlers || clientHandlers);
  const registerHandler = React__default.useCallback(trigger => {
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
  return React__default.createElement(ErrorBoundary, {
    fallback: React__default.createElement("p", null, "An error with Fingerprint has occurred."),
    onError: (error, info) => console.error(error, info)
  }, React__default.createElement(LoggingProvider, {
    debug: debug
  }, React__default.createElement(QueryClientProvider, {
    client: queryClient
  }, React__default.createElement(FingerprintContext.Provider, {
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
  }, React__default.createElement(VisitorProvider, null, React__default.createElement(MixpanelProvider, null, React__default.createElement(CollectorProvider, {
    handlers: handlers
  }, React__default.createElement(ErrorBoundary$1, {
    onError: (error, info) => console.error(error, info),
    fallback: React__default.createElement("div", null, "An application error occurred.")
  }, children))))))));
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

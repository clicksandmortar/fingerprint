function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var reactQuery = require('@tanstack/react-query');
var React = require('react');
var React__default = _interopDefault(React);
var reactErrorBoundary = require('react-error-boundary');
var ReactDOM = _interopDefault(require('react-dom'));
var mixpanel = _interopDefault(require('mixpanel-browser'));
var Cookies = _interopDefault(require('js-cookie'));
var punycode = _interopDefault(require('punycode'));
var uuid = require('uuid');
var uniqueBy = _interopDefault(require('lodash.uniqby'));
var reactIdleTimer = require('react-idle-timer');
var useExitIntent = require('use-exit-intent');
var reactDeviceDetect = require('react-device-detect');
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

var closeButtonStyles = {
  borderRadius: '100%',
  backgroundColor: 'white',
  width: '2rem',
  border: 'none',
  height: '2rem',
  margin: 10,
  color: 'black',
  fontSize: '1.2rem',
  fontWeight: 300,
  cursor: 'pointer',
  display: 'grid',
  placeContent: 'center'
};
var CloseButton = function CloseButton(_ref) {
  var onClick = _ref.onClick,
    style = _ref.style;
  var buttonStyle = _extends({}, closeButtonStyles, style);
  return React__default.createElement("button", {
    style: buttonStyle,
    onClick: onClick
  }, React__default.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '16',
    height: '16',
    viewBox: '0 0 16 16'
  }, React__default.createElement("path", {
    fill: buttonStyle.color || buttonStyle.fill,
    fillRule: 'evenodd',
    d: 'M8.707 8l3.647-3.646a.5.5 0 0 0-.708-.708L8 7.293 4.354 3.646a.5.5 0 1 0-.708.708L7.293 8l-3.647 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8z'
  })));
};

var useFingerprint = function useFingerprint() {
  return React.useContext(FingerprintContext);
};

function getEnvVars() {
  var _window, _window$location, _window$location$host, _window2, _window2$location, _window2$location$hos, _window3, _window3$location, _window4, _window4$location, _window5, _window5$location;
  var isDev = false;
  switch (true) {
    case typeof window === 'undefined':
    case (_window = window) === null || _window === void 0 ? void 0 : (_window$location = _window.location) === null || _window$location === void 0 ? void 0 : (_window$location$host = _window$location.host) === null || _window$location$host === void 0 ? void 0 : _window$location$host.includes('localhost'):
    case (_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$location = _window2.location) === null || _window2$location === void 0 ? void 0 : (_window2$location$hos = _window2$location.host) === null || _window2$location$hos === void 0 ? void 0 : _window2$location$hos.includes('clicksandmortar.tech'):
    case (_window3 = window) === null || _window3 === void 0 ? void 0 : (_window3$location = _window3.location) === null || _window3$location === void 0 ? void 0 : _window3$location.host.startsWith('stage65-az'):
    case (_window4 = window) === null || _window4 === void 0 ? void 0 : (_window4$location = _window4.location) === null || _window4$location === void 0 ? void 0 : _window4$location.host.startsWith('test65-az'):
    case (_window5 = window) === null || _window5 === void 0 ? void 0 : (_window5$location = _window5.location) === null || _window5$location === void 0 ? void 0 : _window5$location.host.includes('vercel.app'):
      isDev = true;
      break;
    default:
      isDev = false;
  }
  if (isDev) return {
    FINGERPRINT_API_HOSTNAME: 'https://target-engine-api.starship-staging.com',
    MIXPANEL_TOKEN: 'd122fa924e1ea97d6b98569440c65a95'
  };
  return {
    FINGERPRINT_API_HOSTNAME: 'https://target-engine-api.starship-production.com',
    MIXPANEL_TOKEN: 'cfca3a93becd5735a4f04dc8e10ede27'
  };
}

var TEMP_isCNMBrand = function TEMP_isCNMBrand() {
  if (typeof window === 'undefined') return false;
  var isCnMBookingDomain = /^book\.[A-Za-z0-9.!@#$%^&*()-_+=~{}[\]:;<>,?/|]+\.co\.uk$/.test(window.location.host);
  return isCnMBookingDomain;
};
var _LEGACY_getBrand = function _LEGACY_getBrand() {
  if (typeof window === 'undefined') return null;
  if (TEMP_isCNMBrand()) return 'C&M';
  if (window.location.host.startsWith('localhost')) return 'C&M';
  if (window.location.host.includes('stonehouserestaurants.co.uk')) return 'Stonehouse';
  if (window.location.host.includes('browns-restaurants.co.uk')) return 'Browns';
  if (window.location.host.includes('sizzlingpubs.co.uk')) return 'Sizzling';
  if (window.location.host.includes('emberinns.co.uk')) return 'Ember';
  if (window.location.host.includes('allbarone.co.uk')) return 'All Bar One';
  return 'C&M';
};
var haveBrandColorsBeenConfigured = function haveBrandColorsBeenConfigured(colors) {
  if (!colors) return false;
  if (typeof colors !== 'object') return false;
  if (Object.keys(colors).length === 0) return false;
  if (Object.values(colors).every(function (color) {
    return color === '#000000';
  })) return false;
  return true;
};

var defaultColors = {
  backgroundPrimary: '#2a3d6d',
  backgroundPrimaryDimmed: 'rgb(27,233,237)',
  backgroundSecondary: 'rgb(226,226,226)',
  shadeOfGrey: 'rgb(13,14,49)',
  textPrimary: '#ffffff',
  greyText: '#40404b'
};
var defaultConfig = {
  script: {
    debugMode: false
  },
  trigger: {
    userIdleThresholdSecs: 5,
    displayTriggerAfterSecs: 5,
    triggerCooldownSecs: 60
  },
  brand: {
    name: 'C&M',
    colors: defaultColors
  }
};
var LEGACY_merge_config = function LEGACY_merge_config(config, legacy_config) {
  return {
    displayTriggerAfterSecs: ((legacy_config === null || legacy_config === void 0 ? void 0 : legacy_config.exitIntentDelay) || 0) / 1000 || config.trigger.displayTriggerAfterSecs,
    triggerCooldownSecs: ((legacy_config === null || legacy_config === void 0 ? void 0 : legacy_config.triggerCooldown) || 0) / 1000 || config.trigger.triggerCooldownSecs,
    userIdleThresholdSecs: ((legacy_config === null || legacy_config === void 0 ? void 0 : legacy_config.idleDelay) || 0) / 1000 || config.trigger.userIdleThresholdSecs
  };
};
var objStringtoObjNum = function objStringtoObjNum(obj) {
  var newObj = {};
  Object.keys(obj).forEach(function (key) {
    newObj[key] = Number(obj[key]);
  });
  return newObj;
};
function ConfigProvider(_ref) {
  var children = _ref.children,
    legacy_config = _ref.legacy_config;
  var _useState = React.useState(defaultConfig),
    config = _useState[0],
    setConfigState = _useState[1];
  var log = React__default.useCallback(function () {
    if (config.script.debugMode) {
      var _console;
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }
      (_console = console).log.apply(_console, ['[ConfigProvider]'].concat(params));
    }
  }, [config, legacy_config]);
  var setConfig = React__default.useCallback(function (updatedConfigEntries) {
    var _updatedConfigEntries;
    var argColors = updatedConfigEntries === null || updatedConfigEntries === void 0 ? void 0 : (_updatedConfigEntries = updatedConfigEntries.brand) === null || _updatedConfigEntries === void 0 ? void 0 : _updatedConfigEntries.colors;
    var shouldUpdateColors = haveBrandColorsBeenConfigured(argColors);
    if (shouldUpdateColors) log('setConfig: setting brand colors from portal config', argColors);else log('setConfig: keeping colors in state || fallback to default');
    setConfigState(function (prev) {
      return _extends({}, prev, updatedConfigEntries, {
        brand: _extends({}, prev.brand, updatedConfigEntries.brand, {
          colors: shouldUpdateColors ? _extends({}, prev.brand.colors || defaultColors, argColors || {}) : prev.brand.colors
        }),
        trigger: _extends({}, prev.trigger, objStringtoObjNum(LEGACY_merge_config(prev, legacy_config)))
      });
    });
  }, [setConfigState]);
  var value = {
    config: config,
    setConfig: setConfig
  };
  React.useEffect(function () {
    log('config in use:', config);
  }, [config]);
  return React__default.createElement(ConfigContext.Provider, {
    value: value
  }, children);
}
var ConfigContext = React.createContext({
  config: defaultConfig,
  setConfig: function setConfig() {
    console.error('ConfigContext: setConfig not implemented');
  }
});

var useConfig = function useConfig() {
  return React__default.useContext(ConfigContext);
};
var useBrand = function useBrand() {
  var configBrandName = useConfig().config.brand.name;
  if (configBrandName) return configBrandName;
  return _LEGACY_getBrand();
};
var useTriggerConfig = function useTriggerConfig() {
  return useConfig().config.trigger;
};
var useBrandColors = function useBrandColors() {
  return useConfig().config.brand.colors || defaultColors;
};

var LoggingProvider = function LoggingProvider(_ref) {
  var children = _ref.children;
  var debug = useConfig().config.script.debugMode;
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
  React.useEffect(function () {
    if (!debug) return;
    log('LoggingProvider: In Debug Mode');
  });
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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var rules = [
	"ac",
	"com.ac",
	"edu.ac",
	"gov.ac",
	"net.ac",
	"mil.ac",
	"org.ac",
	"ad",
	"nom.ad",
	"ae",
	"co.ae",
	"net.ae",
	"org.ae",
	"sch.ae",
	"ac.ae",
	"gov.ae",
	"mil.ae",
	"aero",
	"accident-investigation.aero",
	"accident-prevention.aero",
	"aerobatic.aero",
	"aeroclub.aero",
	"aerodrome.aero",
	"agents.aero",
	"aircraft.aero",
	"airline.aero",
	"airport.aero",
	"air-surveillance.aero",
	"airtraffic.aero",
	"air-traffic-control.aero",
	"ambulance.aero",
	"amusement.aero",
	"association.aero",
	"author.aero",
	"ballooning.aero",
	"broker.aero",
	"caa.aero",
	"cargo.aero",
	"catering.aero",
	"certification.aero",
	"championship.aero",
	"charter.aero",
	"civilaviation.aero",
	"club.aero",
	"conference.aero",
	"consultant.aero",
	"consulting.aero",
	"control.aero",
	"council.aero",
	"crew.aero",
	"design.aero",
	"dgca.aero",
	"educator.aero",
	"emergency.aero",
	"engine.aero",
	"engineer.aero",
	"entertainment.aero",
	"equipment.aero",
	"exchange.aero",
	"express.aero",
	"federation.aero",
	"flight.aero",
	"fuel.aero",
	"gliding.aero",
	"government.aero",
	"groundhandling.aero",
	"group.aero",
	"hanggliding.aero",
	"homebuilt.aero",
	"insurance.aero",
	"journal.aero",
	"journalist.aero",
	"leasing.aero",
	"logistics.aero",
	"magazine.aero",
	"maintenance.aero",
	"media.aero",
	"microlight.aero",
	"modelling.aero",
	"navigation.aero",
	"parachuting.aero",
	"paragliding.aero",
	"passenger-association.aero",
	"pilot.aero",
	"press.aero",
	"production.aero",
	"recreation.aero",
	"repbody.aero",
	"res.aero",
	"research.aero",
	"rotorcraft.aero",
	"safety.aero",
	"scientist.aero",
	"services.aero",
	"show.aero",
	"skydiving.aero",
	"software.aero",
	"student.aero",
	"trader.aero",
	"trading.aero",
	"trainer.aero",
	"union.aero",
	"workinggroup.aero",
	"works.aero",
	"af",
	"gov.af",
	"com.af",
	"org.af",
	"net.af",
	"edu.af",
	"ag",
	"com.ag",
	"org.ag",
	"net.ag",
	"co.ag",
	"nom.ag",
	"ai",
	"off.ai",
	"com.ai",
	"net.ai",
	"org.ai",
	"al",
	"com.al",
	"edu.al",
	"gov.al",
	"mil.al",
	"net.al",
	"org.al",
	"am",
	"co.am",
	"com.am",
	"commune.am",
	"net.am",
	"org.am",
	"ao",
	"ed.ao",
	"gv.ao",
	"og.ao",
	"co.ao",
	"pb.ao",
	"it.ao",
	"aq",
	"ar",
	"bet.ar",
	"com.ar",
	"coop.ar",
	"edu.ar",
	"gob.ar",
	"gov.ar",
	"int.ar",
	"mil.ar",
	"musica.ar",
	"mutual.ar",
	"net.ar",
	"org.ar",
	"senasa.ar",
	"tur.ar",
	"arpa",
	"e164.arpa",
	"in-addr.arpa",
	"ip6.arpa",
	"iris.arpa",
	"uri.arpa",
	"urn.arpa",
	"as",
	"gov.as",
	"asia",
	"at",
	"ac.at",
	"co.at",
	"gv.at",
	"or.at",
	"sth.ac.at",
	"au",
	"com.au",
	"net.au",
	"org.au",
	"edu.au",
	"gov.au",
	"asn.au",
	"id.au",
	"info.au",
	"conf.au",
	"oz.au",
	"act.au",
	"nsw.au",
	"nt.au",
	"qld.au",
	"sa.au",
	"tas.au",
	"vic.au",
	"wa.au",
	"act.edu.au",
	"catholic.edu.au",
	"nsw.edu.au",
	"nt.edu.au",
	"qld.edu.au",
	"sa.edu.au",
	"tas.edu.au",
	"vic.edu.au",
	"wa.edu.au",
	"qld.gov.au",
	"sa.gov.au",
	"tas.gov.au",
	"vic.gov.au",
	"wa.gov.au",
	"schools.nsw.edu.au",
	"aw",
	"com.aw",
	"ax",
	"az",
	"com.az",
	"net.az",
	"int.az",
	"gov.az",
	"org.az",
	"edu.az",
	"info.az",
	"pp.az",
	"mil.az",
	"name.az",
	"pro.az",
	"biz.az",
	"ba",
	"com.ba",
	"edu.ba",
	"gov.ba",
	"mil.ba",
	"net.ba",
	"org.ba",
	"bb",
	"biz.bb",
	"co.bb",
	"com.bb",
	"edu.bb",
	"gov.bb",
	"info.bb",
	"net.bb",
	"org.bb",
	"store.bb",
	"tv.bb",
	"*.bd",
	"be",
	"ac.be",
	"bf",
	"gov.bf",
	"bg",
	"a.bg",
	"b.bg",
	"c.bg",
	"d.bg",
	"e.bg",
	"f.bg",
	"g.bg",
	"h.bg",
	"i.bg",
	"j.bg",
	"k.bg",
	"l.bg",
	"m.bg",
	"n.bg",
	"o.bg",
	"p.bg",
	"q.bg",
	"r.bg",
	"s.bg",
	"t.bg",
	"u.bg",
	"v.bg",
	"w.bg",
	"x.bg",
	"y.bg",
	"z.bg",
	"0.bg",
	"1.bg",
	"2.bg",
	"3.bg",
	"4.bg",
	"5.bg",
	"6.bg",
	"7.bg",
	"8.bg",
	"9.bg",
	"bh",
	"com.bh",
	"edu.bh",
	"net.bh",
	"org.bh",
	"gov.bh",
	"bi",
	"co.bi",
	"com.bi",
	"edu.bi",
	"or.bi",
	"org.bi",
	"biz",
	"bj",
	"asso.bj",
	"barreau.bj",
	"gouv.bj",
	"bm",
	"com.bm",
	"edu.bm",
	"gov.bm",
	"net.bm",
	"org.bm",
	"bn",
	"com.bn",
	"edu.bn",
	"gov.bn",
	"net.bn",
	"org.bn",
	"bo",
	"com.bo",
	"edu.bo",
	"gob.bo",
	"int.bo",
	"org.bo",
	"net.bo",
	"mil.bo",
	"tv.bo",
	"web.bo",
	"academia.bo",
	"agro.bo",
	"arte.bo",
	"blog.bo",
	"bolivia.bo",
	"ciencia.bo",
	"cooperativa.bo",
	"democracia.bo",
	"deporte.bo",
	"ecologia.bo",
	"economia.bo",
	"empresa.bo",
	"indigena.bo",
	"industria.bo",
	"info.bo",
	"medicina.bo",
	"movimiento.bo",
	"musica.bo",
	"natural.bo",
	"nombre.bo",
	"noticias.bo",
	"patria.bo",
	"politica.bo",
	"profesional.bo",
	"plurinacional.bo",
	"pueblo.bo",
	"revista.bo",
	"salud.bo",
	"tecnologia.bo",
	"tksat.bo",
	"transporte.bo",
	"wiki.bo",
	"br",
	"9guacu.br",
	"abc.br",
	"adm.br",
	"adv.br",
	"agr.br",
	"aju.br",
	"am.br",
	"anani.br",
	"aparecida.br",
	"app.br",
	"arq.br",
	"art.br",
	"ato.br",
	"b.br",
	"barueri.br",
	"belem.br",
	"bhz.br",
	"bib.br",
	"bio.br",
	"blog.br",
	"bmd.br",
	"boavista.br",
	"bsb.br",
	"campinagrande.br",
	"campinas.br",
	"caxias.br",
	"cim.br",
	"cng.br",
	"cnt.br",
	"com.br",
	"contagem.br",
	"coop.br",
	"coz.br",
	"cri.br",
	"cuiaba.br",
	"curitiba.br",
	"def.br",
	"des.br",
	"det.br",
	"dev.br",
	"ecn.br",
	"eco.br",
	"edu.br",
	"emp.br",
	"enf.br",
	"eng.br",
	"esp.br",
	"etc.br",
	"eti.br",
	"far.br",
	"feira.br",
	"flog.br",
	"floripa.br",
	"fm.br",
	"fnd.br",
	"fortal.br",
	"fot.br",
	"foz.br",
	"fst.br",
	"g12.br",
	"geo.br",
	"ggf.br",
	"goiania.br",
	"gov.br",
	"ac.gov.br",
	"al.gov.br",
	"am.gov.br",
	"ap.gov.br",
	"ba.gov.br",
	"ce.gov.br",
	"df.gov.br",
	"es.gov.br",
	"go.gov.br",
	"ma.gov.br",
	"mg.gov.br",
	"ms.gov.br",
	"mt.gov.br",
	"pa.gov.br",
	"pb.gov.br",
	"pe.gov.br",
	"pi.gov.br",
	"pr.gov.br",
	"rj.gov.br",
	"rn.gov.br",
	"ro.gov.br",
	"rr.gov.br",
	"rs.gov.br",
	"sc.gov.br",
	"se.gov.br",
	"sp.gov.br",
	"to.gov.br",
	"gru.br",
	"imb.br",
	"ind.br",
	"inf.br",
	"jab.br",
	"jampa.br",
	"jdf.br",
	"joinville.br",
	"jor.br",
	"jus.br",
	"leg.br",
	"lel.br",
	"log.br",
	"londrina.br",
	"macapa.br",
	"maceio.br",
	"manaus.br",
	"maringa.br",
	"mat.br",
	"med.br",
	"mil.br",
	"morena.br",
	"mp.br",
	"mus.br",
	"natal.br",
	"net.br",
	"niteroi.br",
	"*.nom.br",
	"not.br",
	"ntr.br",
	"odo.br",
	"ong.br",
	"org.br",
	"osasco.br",
	"palmas.br",
	"poa.br",
	"ppg.br",
	"pro.br",
	"psc.br",
	"psi.br",
	"pvh.br",
	"qsl.br",
	"radio.br",
	"rec.br",
	"recife.br",
	"rep.br",
	"ribeirao.br",
	"rio.br",
	"riobranco.br",
	"riopreto.br",
	"salvador.br",
	"sampa.br",
	"santamaria.br",
	"santoandre.br",
	"saobernardo.br",
	"saogonca.br",
	"seg.br",
	"sjc.br",
	"slg.br",
	"slz.br",
	"sorocaba.br",
	"srv.br",
	"taxi.br",
	"tc.br",
	"tec.br",
	"teo.br",
	"the.br",
	"tmp.br",
	"trd.br",
	"tur.br",
	"tv.br",
	"udi.br",
	"vet.br",
	"vix.br",
	"vlog.br",
	"wiki.br",
	"zlg.br",
	"bs",
	"com.bs",
	"net.bs",
	"org.bs",
	"edu.bs",
	"gov.bs",
	"bt",
	"com.bt",
	"edu.bt",
	"gov.bt",
	"net.bt",
	"org.bt",
	"bv",
	"bw",
	"co.bw",
	"org.bw",
	"by",
	"gov.by",
	"mil.by",
	"com.by",
	"of.by",
	"bz",
	"com.bz",
	"net.bz",
	"org.bz",
	"edu.bz",
	"gov.bz",
	"ca",
	"ab.ca",
	"bc.ca",
	"mb.ca",
	"nb.ca",
	"nf.ca",
	"nl.ca",
	"ns.ca",
	"nt.ca",
	"nu.ca",
	"on.ca",
	"pe.ca",
	"qc.ca",
	"sk.ca",
	"yk.ca",
	"gc.ca",
	"cat",
	"cc",
	"cd",
	"gov.cd",
	"cf",
	"cg",
	"ch",
	"ci",
	"org.ci",
	"or.ci",
	"com.ci",
	"co.ci",
	"edu.ci",
	"ed.ci",
	"ac.ci",
	"net.ci",
	"go.ci",
	"asso.ci",
	"aéroport.ci",
	"int.ci",
	"presse.ci",
	"md.ci",
	"gouv.ci",
	"*.ck",
	"!www.ck",
	"cl",
	"co.cl",
	"gob.cl",
	"gov.cl",
	"mil.cl",
	"cm",
	"co.cm",
	"com.cm",
	"gov.cm",
	"net.cm",
	"cn",
	"ac.cn",
	"com.cn",
	"edu.cn",
	"gov.cn",
	"net.cn",
	"org.cn",
	"mil.cn",
	"公司.cn",
	"网络.cn",
	"網絡.cn",
	"ah.cn",
	"bj.cn",
	"cq.cn",
	"fj.cn",
	"gd.cn",
	"gs.cn",
	"gz.cn",
	"gx.cn",
	"ha.cn",
	"hb.cn",
	"he.cn",
	"hi.cn",
	"hl.cn",
	"hn.cn",
	"jl.cn",
	"js.cn",
	"jx.cn",
	"ln.cn",
	"nm.cn",
	"nx.cn",
	"qh.cn",
	"sc.cn",
	"sd.cn",
	"sh.cn",
	"sn.cn",
	"sx.cn",
	"tj.cn",
	"xj.cn",
	"xz.cn",
	"yn.cn",
	"zj.cn",
	"hk.cn",
	"mo.cn",
	"tw.cn",
	"co",
	"arts.co",
	"com.co",
	"edu.co",
	"firm.co",
	"gov.co",
	"info.co",
	"int.co",
	"mil.co",
	"net.co",
	"nom.co",
	"org.co",
	"rec.co",
	"web.co",
	"com",
	"coop",
	"cr",
	"ac.cr",
	"co.cr",
	"ed.cr",
	"fi.cr",
	"go.cr",
	"or.cr",
	"sa.cr",
	"cu",
	"com.cu",
	"edu.cu",
	"org.cu",
	"net.cu",
	"gov.cu",
	"inf.cu",
	"cv",
	"com.cv",
	"edu.cv",
	"int.cv",
	"nome.cv",
	"org.cv",
	"cw",
	"com.cw",
	"edu.cw",
	"net.cw",
	"org.cw",
	"cx",
	"gov.cx",
	"cy",
	"ac.cy",
	"biz.cy",
	"com.cy",
	"ekloges.cy",
	"gov.cy",
	"ltd.cy",
	"mil.cy",
	"net.cy",
	"org.cy",
	"press.cy",
	"pro.cy",
	"tm.cy",
	"cz",
	"de",
	"dj",
	"dk",
	"dm",
	"com.dm",
	"net.dm",
	"org.dm",
	"edu.dm",
	"gov.dm",
	"do",
	"art.do",
	"com.do",
	"edu.do",
	"gob.do",
	"gov.do",
	"mil.do",
	"net.do",
	"org.do",
	"sld.do",
	"web.do",
	"dz",
	"art.dz",
	"asso.dz",
	"com.dz",
	"edu.dz",
	"gov.dz",
	"org.dz",
	"net.dz",
	"pol.dz",
	"soc.dz",
	"tm.dz",
	"ec",
	"com.ec",
	"info.ec",
	"net.ec",
	"fin.ec",
	"k12.ec",
	"med.ec",
	"pro.ec",
	"org.ec",
	"edu.ec",
	"gov.ec",
	"gob.ec",
	"mil.ec",
	"edu",
	"ee",
	"edu.ee",
	"gov.ee",
	"riik.ee",
	"lib.ee",
	"med.ee",
	"com.ee",
	"pri.ee",
	"aip.ee",
	"org.ee",
	"fie.ee",
	"eg",
	"com.eg",
	"edu.eg",
	"eun.eg",
	"gov.eg",
	"mil.eg",
	"name.eg",
	"net.eg",
	"org.eg",
	"sci.eg",
	"*.er",
	"es",
	"com.es",
	"nom.es",
	"org.es",
	"gob.es",
	"edu.es",
	"et",
	"com.et",
	"gov.et",
	"org.et",
	"edu.et",
	"biz.et",
	"name.et",
	"info.et",
	"net.et",
	"eu",
	"fi",
	"aland.fi",
	"fj",
	"ac.fj",
	"biz.fj",
	"com.fj",
	"gov.fj",
	"info.fj",
	"mil.fj",
	"name.fj",
	"net.fj",
	"org.fj",
	"pro.fj",
	"*.fk",
	"com.fm",
	"edu.fm",
	"net.fm",
	"org.fm",
	"fm",
	"fo",
	"fr",
	"asso.fr",
	"com.fr",
	"gouv.fr",
	"nom.fr",
	"prd.fr",
	"tm.fr",
	"aeroport.fr",
	"avocat.fr",
	"avoues.fr",
	"cci.fr",
	"chambagri.fr",
	"chirurgiens-dentistes.fr",
	"experts-comptables.fr",
	"geometre-expert.fr",
	"greta.fr",
	"huissier-justice.fr",
	"medecin.fr",
	"notaires.fr",
	"pharmacien.fr",
	"port.fr",
	"veterinaire.fr",
	"ga",
	"gb",
	"edu.gd",
	"gov.gd",
	"gd",
	"ge",
	"com.ge",
	"edu.ge",
	"gov.ge",
	"org.ge",
	"mil.ge",
	"net.ge",
	"pvt.ge",
	"gf",
	"gg",
	"co.gg",
	"net.gg",
	"org.gg",
	"gh",
	"com.gh",
	"edu.gh",
	"gov.gh",
	"org.gh",
	"mil.gh",
	"gi",
	"com.gi",
	"ltd.gi",
	"gov.gi",
	"mod.gi",
	"edu.gi",
	"org.gi",
	"gl",
	"co.gl",
	"com.gl",
	"edu.gl",
	"net.gl",
	"org.gl",
	"gm",
	"gn",
	"ac.gn",
	"com.gn",
	"edu.gn",
	"gov.gn",
	"org.gn",
	"net.gn",
	"gov",
	"gp",
	"com.gp",
	"net.gp",
	"mobi.gp",
	"edu.gp",
	"org.gp",
	"asso.gp",
	"gq",
	"gr",
	"com.gr",
	"edu.gr",
	"net.gr",
	"org.gr",
	"gov.gr",
	"gs",
	"gt",
	"com.gt",
	"edu.gt",
	"gob.gt",
	"ind.gt",
	"mil.gt",
	"net.gt",
	"org.gt",
	"gu",
	"com.gu",
	"edu.gu",
	"gov.gu",
	"guam.gu",
	"info.gu",
	"net.gu",
	"org.gu",
	"web.gu",
	"gw",
	"gy",
	"co.gy",
	"com.gy",
	"edu.gy",
	"gov.gy",
	"net.gy",
	"org.gy",
	"hk",
	"com.hk",
	"edu.hk",
	"gov.hk",
	"idv.hk",
	"net.hk",
	"org.hk",
	"公司.hk",
	"教育.hk",
	"敎育.hk",
	"政府.hk",
	"個人.hk",
	"个��.hk",
	"箇人.hk",
	"網络.hk",
	"网络.hk",
	"组織.hk",
	"網絡.hk",
	"网絡.hk",
	"组织.hk",
	"組織.hk",
	"組织.hk",
	"hm",
	"hn",
	"com.hn",
	"edu.hn",
	"org.hn",
	"net.hn",
	"mil.hn",
	"gob.hn",
	"hr",
	"iz.hr",
	"from.hr",
	"name.hr",
	"com.hr",
	"ht",
	"com.ht",
	"shop.ht",
	"firm.ht",
	"info.ht",
	"adult.ht",
	"net.ht",
	"pro.ht",
	"org.ht",
	"med.ht",
	"art.ht",
	"coop.ht",
	"pol.ht",
	"asso.ht",
	"edu.ht",
	"rel.ht",
	"gouv.ht",
	"perso.ht",
	"hu",
	"co.hu",
	"info.hu",
	"org.hu",
	"priv.hu",
	"sport.hu",
	"tm.hu",
	"2000.hu",
	"agrar.hu",
	"bolt.hu",
	"casino.hu",
	"city.hu",
	"erotica.hu",
	"erotika.hu",
	"film.hu",
	"forum.hu",
	"games.hu",
	"hotel.hu",
	"ingatlan.hu",
	"jogasz.hu",
	"konyvelo.hu",
	"lakas.hu",
	"media.hu",
	"news.hu",
	"reklam.hu",
	"sex.hu",
	"shop.hu",
	"suli.hu",
	"szex.hu",
	"tozsde.hu",
	"utazas.hu",
	"video.hu",
	"id",
	"ac.id",
	"biz.id",
	"co.id",
	"desa.id",
	"go.id",
	"mil.id",
	"my.id",
	"net.id",
	"or.id",
	"ponpes.id",
	"sch.id",
	"web.id",
	"ie",
	"gov.ie",
	"il",
	"ac.il",
	"co.il",
	"gov.il",
	"idf.il",
	"k12.il",
	"muni.il",
	"net.il",
	"org.il",
	"im",
	"ac.im",
	"co.im",
	"com.im",
	"ltd.co.im",
	"net.im",
	"org.im",
	"plc.co.im",
	"tt.im",
	"tv.im",
	"in",
	"co.in",
	"firm.in",
	"net.in",
	"org.in",
	"gen.in",
	"ind.in",
	"nic.in",
	"ac.in",
	"edu.in",
	"res.in",
	"gov.in",
	"mil.in",
	"info",
	"int",
	"eu.int",
	"io",
	"com.io",
	"iq",
	"gov.iq",
	"edu.iq",
	"mil.iq",
	"com.iq",
	"org.iq",
	"net.iq",
	"ir",
	"ac.ir",
	"co.ir",
	"gov.ir",
	"id.ir",
	"net.ir",
	"org.ir",
	"sch.ir",
	"ایران.ir",
	"ايران.ir",
	"is",
	"net.is",
	"com.is",
	"edu.is",
	"gov.is",
	"org.is",
	"int.is",
	"it",
	"gov.it",
	"edu.it",
	"abr.it",
	"abruzzo.it",
	"aosta-valley.it",
	"aostavalley.it",
	"bas.it",
	"basilicata.it",
	"cal.it",
	"calabria.it",
	"cam.it",
	"campania.it",
	"emilia-romagna.it",
	"emiliaromagna.it",
	"emr.it",
	"friuli-v-giulia.it",
	"friuli-ve-giulia.it",
	"friuli-vegiulia.it",
	"friuli-venezia-giulia.it",
	"friuli-veneziagiulia.it",
	"friuli-vgiulia.it",
	"friuliv-giulia.it",
	"friulive-giulia.it",
	"friulivegiulia.it",
	"friulivenezia-giulia.it",
	"friuliveneziagiulia.it",
	"friulivgiulia.it",
	"fvg.it",
	"laz.it",
	"lazio.it",
	"lig.it",
	"liguria.it",
	"lom.it",
	"lombardia.it",
	"lombardy.it",
	"lucania.it",
	"mar.it",
	"marche.it",
	"mol.it",
	"molise.it",
	"piedmont.it",
	"piemonte.it",
	"pmn.it",
	"pug.it",
	"puglia.it",
	"sar.it",
	"sardegna.it",
	"sardinia.it",
	"sic.it",
	"sicilia.it",
	"sicily.it",
	"taa.it",
	"tos.it",
	"toscana.it",
	"trentin-sud-tirol.it",
	"trentin-süd-tirol.it",
	"trentin-sudtirol.it",
	"trentin-südtirol.it",
	"trentin-sued-tirol.it",
	"trentin-suedtirol.it",
	"trentino-a-adige.it",
	"trentino-aadige.it",
	"trentino-alto-adige.it",
	"trentino-altoadige.it",
	"trentino-s-tirol.it",
	"trentino-stirol.it",
	"trentino-sud-tirol.it",
	"trentino-süd-tirol.it",
	"trentino-sudtirol.it",
	"trentino-südtirol.it",
	"trentino-sued-tirol.it",
	"trentino-suedtirol.it",
	"trentino.it",
	"trentinoa-adige.it",
	"trentinoaadige.it",
	"trentinoalto-adige.it",
	"trentinoaltoadige.it",
	"trentinos-tirol.it",
	"trentinostirol.it",
	"trentinosud-tirol.it",
	"trentinosüd-tirol.it",
	"trentinosudtirol.it",
	"trentinosüdtirol.it",
	"trentinosued-tirol.it",
	"trentinosuedtirol.it",
	"trentinsud-tirol.it",
	"trentinsüd-tirol.it",
	"trentinsudtirol.it",
	"trentinsüdtirol.it",
	"trentinsued-tirol.it",
	"trentinsuedtirol.it",
	"tuscany.it",
	"umb.it",
	"umbria.it",
	"val-d-aosta.it",
	"val-daosta.it",
	"vald-aosta.it",
	"valdaosta.it",
	"valle-aosta.it",
	"valle-d-aosta.it",
	"valle-daosta.it",
	"valleaosta.it",
	"valled-aosta.it",
	"valledaosta.it",
	"vallee-aoste.it",
	"vallée-aoste.it",
	"vallee-d-aoste.it",
	"vallée-d-aoste.it",
	"valleeaoste.it",
	"valléeaoste.it",
	"valleedaoste.it",
	"valléedaoste.it",
	"vao.it",
	"vda.it",
	"ven.it",
	"veneto.it",
	"ag.it",
	"agrigento.it",
	"al.it",
	"alessandria.it",
	"alto-adige.it",
	"altoadige.it",
	"an.it",
	"ancona.it",
	"andria-barletta-trani.it",
	"andria-trani-barletta.it",
	"andriabarlettatrani.it",
	"andriatranibarletta.it",
	"ao.it",
	"aosta.it",
	"aoste.it",
	"ap.it",
	"aq.it",
	"aquila.it",
	"ar.it",
	"arezzo.it",
	"ascoli-piceno.it",
	"ascolipiceno.it",
	"asti.it",
	"at.it",
	"av.it",
	"avellino.it",
	"ba.it",
	"balsan-sudtirol.it",
	"balsan-südtirol.it",
	"balsan-suedtirol.it",
	"balsan.it",
	"bari.it",
	"barletta-trani-andria.it",
	"barlettatraniandria.it",
	"belluno.it",
	"benevento.it",
	"bergamo.it",
	"bg.it",
	"bi.it",
	"biella.it",
	"bl.it",
	"bn.it",
	"bo.it",
	"bologna.it",
	"bolzano-altoadige.it",
	"bolzano.it",
	"bozen-sudtirol.it",
	"bozen-südtirol.it",
	"bozen-suedtirol.it",
	"bozen.it",
	"br.it",
	"brescia.it",
	"brindisi.it",
	"bs.it",
	"bt.it",
	"bulsan-sudtirol.it",
	"bulsan-südtirol.it",
	"bulsan-suedtirol.it",
	"bulsan.it",
	"bz.it",
	"ca.it",
	"cagliari.it",
	"caltanissetta.it",
	"campidano-medio.it",
	"campidanomedio.it",
	"campobasso.it",
	"carbonia-iglesias.it",
	"carboniaiglesias.it",
	"carrara-massa.it",
	"carraramassa.it",
	"caserta.it",
	"catania.it",
	"catanzaro.it",
	"cb.it",
	"ce.it",
	"cesena-forli.it",
	"cesena-forlì.it",
	"cesenaforli.it",
	"cesenaforlì.it",
	"ch.it",
	"chieti.it",
	"ci.it",
	"cl.it",
	"cn.it",
	"co.it",
	"como.it",
	"cosenza.it",
	"cr.it",
	"cremona.it",
	"crotone.it",
	"cs.it",
	"ct.it",
	"cuneo.it",
	"cz.it",
	"dell-ogliastra.it",
	"dellogliastra.it",
	"en.it",
	"enna.it",
	"fc.it",
	"fe.it",
	"fermo.it",
	"ferrara.it",
	"fg.it",
	"fi.it",
	"firenze.it",
	"florence.it",
	"fm.it",
	"foggia.it",
	"forli-cesena.it",
	"forlì-cesena.it",
	"forlicesena.it",
	"forlìcesena.it",
	"fr.it",
	"frosinone.it",
	"ge.it",
	"genoa.it",
	"genova.it",
	"go.it",
	"gorizia.it",
	"gr.it",
	"grosseto.it",
	"iglesias-carbonia.it",
	"iglesiascarbonia.it",
	"im.it",
	"imperia.it",
	"is.it",
	"isernia.it",
	"kr.it",
	"la-spezia.it",
	"laquila.it",
	"laspezia.it",
	"latina.it",
	"lc.it",
	"le.it",
	"lecce.it",
	"lecco.it",
	"li.it",
	"livorno.it",
	"lo.it",
	"lodi.it",
	"lt.it",
	"lu.it",
	"lucca.it",
	"macerata.it",
	"mantova.it",
	"massa-carrara.it",
	"massacarrara.it",
	"matera.it",
	"mb.it",
	"mc.it",
	"me.it",
	"medio-campidano.it",
	"mediocampidano.it",
	"messina.it",
	"mi.it",
	"milan.it",
	"milano.it",
	"mn.it",
	"mo.it",
	"modena.it",
	"monza-brianza.it",
	"monza-e-della-brianza.it",
	"monza.it",
	"monzabrianza.it",
	"monzaebrianza.it",
	"monzaedellabrianza.it",
	"ms.it",
	"mt.it",
	"na.it",
	"naples.it",
	"napoli.it",
	"no.it",
	"novara.it",
	"nu.it",
	"nuoro.it",
	"og.it",
	"ogliastra.it",
	"olbia-tempio.it",
	"olbiatempio.it",
	"or.it",
	"oristano.it",
	"ot.it",
	"pa.it",
	"padova.it",
	"padua.it",
	"palermo.it",
	"parma.it",
	"pavia.it",
	"pc.it",
	"pd.it",
	"pe.it",
	"perugia.it",
	"pesaro-urbino.it",
	"pesarourbino.it",
	"pescara.it",
	"pg.it",
	"pi.it",
	"piacenza.it",
	"pisa.it",
	"pistoia.it",
	"pn.it",
	"po.it",
	"pordenone.it",
	"potenza.it",
	"pr.it",
	"prato.it",
	"pt.it",
	"pu.it",
	"pv.it",
	"pz.it",
	"ra.it",
	"ragusa.it",
	"ravenna.it",
	"rc.it",
	"re.it",
	"reggio-calabria.it",
	"reggio-emilia.it",
	"reggiocalabria.it",
	"reggioemilia.it",
	"rg.it",
	"ri.it",
	"rieti.it",
	"rimini.it",
	"rm.it",
	"rn.it",
	"ro.it",
	"roma.it",
	"rome.it",
	"rovigo.it",
	"sa.it",
	"salerno.it",
	"sassari.it",
	"savona.it",
	"si.it",
	"siena.it",
	"siracusa.it",
	"so.it",
	"sondrio.it",
	"sp.it",
	"sr.it",
	"ss.it",
	"suedtirol.it",
	"südtirol.it",
	"sv.it",
	"ta.it",
	"taranto.it",
	"te.it",
	"tempio-olbia.it",
	"tempioolbia.it",
	"teramo.it",
	"terni.it",
	"tn.it",
	"to.it",
	"torino.it",
	"tp.it",
	"tr.it",
	"trani-andria-barletta.it",
	"trani-barletta-andria.it",
	"traniandriabarletta.it",
	"tranibarlettaandria.it",
	"trapani.it",
	"trento.it",
	"treviso.it",
	"trieste.it",
	"ts.it",
	"turin.it",
	"tv.it",
	"ud.it",
	"udine.it",
	"urbino-pesaro.it",
	"urbinopesaro.it",
	"va.it",
	"varese.it",
	"vb.it",
	"vc.it",
	"ve.it",
	"venezia.it",
	"venice.it",
	"verbania.it",
	"vercelli.it",
	"verona.it",
	"vi.it",
	"vibo-valentia.it",
	"vibovalentia.it",
	"vicenza.it",
	"viterbo.it",
	"vr.it",
	"vs.it",
	"vt.it",
	"vv.it",
	"je",
	"co.je",
	"net.je",
	"org.je",
	"*.jm",
	"jo",
	"com.jo",
	"org.jo",
	"net.jo",
	"edu.jo",
	"sch.jo",
	"gov.jo",
	"mil.jo",
	"name.jo",
	"jobs",
	"jp",
	"ac.jp",
	"ad.jp",
	"co.jp",
	"ed.jp",
	"go.jp",
	"gr.jp",
	"lg.jp",
	"ne.jp",
	"or.jp",
	"aichi.jp",
	"akita.jp",
	"aomori.jp",
	"chiba.jp",
	"ehime.jp",
	"fukui.jp",
	"fukuoka.jp",
	"fukushima.jp",
	"gifu.jp",
	"gunma.jp",
	"hiroshima.jp",
	"hokkaido.jp",
	"hyogo.jp",
	"ibaraki.jp",
	"ishikawa.jp",
	"iwate.jp",
	"kagawa.jp",
	"kagoshima.jp",
	"kanagawa.jp",
	"kochi.jp",
	"kumamoto.jp",
	"kyoto.jp",
	"mie.jp",
	"miyagi.jp",
	"miyazaki.jp",
	"nagano.jp",
	"nagasaki.jp",
	"nara.jp",
	"niigata.jp",
	"oita.jp",
	"okayama.jp",
	"okinawa.jp",
	"osaka.jp",
	"saga.jp",
	"saitama.jp",
	"shiga.jp",
	"shimane.jp",
	"shizuoka.jp",
	"tochigi.jp",
	"tokushima.jp",
	"tokyo.jp",
	"tottori.jp",
	"toyama.jp",
	"wakayama.jp",
	"yamagata.jp",
	"yamaguchi.jp",
	"yamanashi.jp",
	"栃木.jp",
	"愛知.jp",
	"愛媛.jp",
	"兵庫.jp",
	"熊本.jp",
	"茨城.jp",
	"北海道.jp",
	"千葉.jp",
	"和歌山.jp",
	"長崎.jp",
	"長野.jp",
	"新潟.jp",
	"青森.jp",
	"静岡.jp",
	"東京.jp",
	"石川.jp",
	"埼玉.jp",
	"三重.jp",
	"京都.jp",
	"佐賀.jp",
	"大分.jp",
	"大阪.jp",
	"奈良.jp",
	"宮城.jp",
	"宮崎.jp",
	"富山.jp",
	"山口.jp",
	"山形.jp",
	"山梨.jp",
	"岩手.jp",
	"岐阜.jp",
	"岡山.jp",
	"島根.jp",
	"広島.jp",
	"徳島.jp",
	"沖縄.jp",
	"滋賀.jp",
	"神奈川.jp",
	"福井.jp",
	"福岡.jp",
	"福島.jp",
	"秋田.jp",
	"群馬.jp",
	"香川.jp",
	"高知.jp",
	"鳥取.jp",
	"鹿児島.jp",
	"*.kawasaki.jp",
	"*.kitakyushu.jp",
	"*.kobe.jp",
	"*.nagoya.jp",
	"*.sapporo.jp",
	"*.sendai.jp",
	"*.yokohama.jp",
	"!city.kawasaki.jp",
	"!city.kitakyushu.jp",
	"!city.kobe.jp",
	"!city.nagoya.jp",
	"!city.sapporo.jp",
	"!city.sendai.jp",
	"!city.yokohama.jp",
	"aisai.aichi.jp",
	"ama.aichi.jp",
	"anjo.aichi.jp",
	"asuke.aichi.jp",
	"chiryu.aichi.jp",
	"chita.aichi.jp",
	"fuso.aichi.jp",
	"gamagori.aichi.jp",
	"handa.aichi.jp",
	"hazu.aichi.jp",
	"hekinan.aichi.jp",
	"higashiura.aichi.jp",
	"ichinomiya.aichi.jp",
	"inazawa.aichi.jp",
	"inuyama.aichi.jp",
	"isshiki.aichi.jp",
	"iwakura.aichi.jp",
	"kanie.aichi.jp",
	"kariya.aichi.jp",
	"kasugai.aichi.jp",
	"kira.aichi.jp",
	"kiyosu.aichi.jp",
	"komaki.aichi.jp",
	"konan.aichi.jp",
	"kota.aichi.jp",
	"mihama.aichi.jp",
	"miyoshi.aichi.jp",
	"nishio.aichi.jp",
	"nisshin.aichi.jp",
	"obu.aichi.jp",
	"oguchi.aichi.jp",
	"oharu.aichi.jp",
	"okazaki.aichi.jp",
	"owariasahi.aichi.jp",
	"seto.aichi.jp",
	"shikatsu.aichi.jp",
	"shinshiro.aichi.jp",
	"shitara.aichi.jp",
	"tahara.aichi.jp",
	"takahama.aichi.jp",
	"tobishima.aichi.jp",
	"toei.aichi.jp",
	"togo.aichi.jp",
	"tokai.aichi.jp",
	"tokoname.aichi.jp",
	"toyoake.aichi.jp",
	"toyohashi.aichi.jp",
	"toyokawa.aichi.jp",
	"toyone.aichi.jp",
	"toyota.aichi.jp",
	"tsushima.aichi.jp",
	"yatomi.aichi.jp",
	"akita.akita.jp",
	"daisen.akita.jp",
	"fujisato.akita.jp",
	"gojome.akita.jp",
	"hachirogata.akita.jp",
	"happou.akita.jp",
	"higashinaruse.akita.jp",
	"honjo.akita.jp",
	"honjyo.akita.jp",
	"ikawa.akita.jp",
	"kamikoani.akita.jp",
	"kamioka.akita.jp",
	"katagami.akita.jp",
	"kazuno.akita.jp",
	"kitaakita.akita.jp",
	"kosaka.akita.jp",
	"kyowa.akita.jp",
	"misato.akita.jp",
	"mitane.akita.jp",
	"moriyoshi.akita.jp",
	"nikaho.akita.jp",
	"noshiro.akita.jp",
	"odate.akita.jp",
	"oga.akita.jp",
	"ogata.akita.jp",
	"semboku.akita.jp",
	"yokote.akita.jp",
	"yurihonjo.akita.jp",
	"aomori.aomori.jp",
	"gonohe.aomori.jp",
	"hachinohe.aomori.jp",
	"hashikami.aomori.jp",
	"hiranai.aomori.jp",
	"hirosaki.aomori.jp",
	"itayanagi.aomori.jp",
	"kuroishi.aomori.jp",
	"misawa.aomori.jp",
	"mutsu.aomori.jp",
	"nakadomari.aomori.jp",
	"noheji.aomori.jp",
	"oirase.aomori.jp",
	"owani.aomori.jp",
	"rokunohe.aomori.jp",
	"sannohe.aomori.jp",
	"shichinohe.aomori.jp",
	"shingo.aomori.jp",
	"takko.aomori.jp",
	"towada.aomori.jp",
	"tsugaru.aomori.jp",
	"tsuruta.aomori.jp",
	"abiko.chiba.jp",
	"asahi.chiba.jp",
	"chonan.chiba.jp",
	"chosei.chiba.jp",
	"choshi.chiba.jp",
	"chuo.chiba.jp",
	"funabashi.chiba.jp",
	"futtsu.chiba.jp",
	"hanamigawa.chiba.jp",
	"ichihara.chiba.jp",
	"ichikawa.chiba.jp",
	"ichinomiya.chiba.jp",
	"inzai.chiba.jp",
	"isumi.chiba.jp",
	"kamagaya.chiba.jp",
	"kamogawa.chiba.jp",
	"kashiwa.chiba.jp",
	"katori.chiba.jp",
	"katsuura.chiba.jp",
	"kimitsu.chiba.jp",
	"kisarazu.chiba.jp",
	"kozaki.chiba.jp",
	"kujukuri.chiba.jp",
	"kyonan.chiba.jp",
	"matsudo.chiba.jp",
	"midori.chiba.jp",
	"mihama.chiba.jp",
	"minamiboso.chiba.jp",
	"mobara.chiba.jp",
	"mutsuzawa.chiba.jp",
	"nagara.chiba.jp",
	"nagareyama.chiba.jp",
	"narashino.chiba.jp",
	"narita.chiba.jp",
	"noda.chiba.jp",
	"oamishirasato.chiba.jp",
	"omigawa.chiba.jp",
	"onjuku.chiba.jp",
	"otaki.chiba.jp",
	"sakae.chiba.jp",
	"sakura.chiba.jp",
	"shimofusa.chiba.jp",
	"shirako.chiba.jp",
	"shiroi.chiba.jp",
	"shisui.chiba.jp",
	"sodegaura.chiba.jp",
	"sosa.chiba.jp",
	"tako.chiba.jp",
	"tateyama.chiba.jp",
	"togane.chiba.jp",
	"tohnosho.chiba.jp",
	"tomisato.chiba.jp",
	"urayasu.chiba.jp",
	"yachimata.chiba.jp",
	"yachiyo.chiba.jp",
	"yokaichiba.chiba.jp",
	"yokoshibahikari.chiba.jp",
	"yotsukaido.chiba.jp",
	"ainan.ehime.jp",
	"honai.ehime.jp",
	"ikata.ehime.jp",
	"imabari.ehime.jp",
	"iyo.ehime.jp",
	"kamijima.ehime.jp",
	"kihoku.ehime.jp",
	"kumakogen.ehime.jp",
	"masaki.ehime.jp",
	"matsuno.ehime.jp",
	"matsuyama.ehime.jp",
	"namikata.ehime.jp",
	"niihama.ehime.jp",
	"ozu.ehime.jp",
	"saijo.ehime.jp",
	"seiyo.ehime.jp",
	"shikokuchuo.ehime.jp",
	"tobe.ehime.jp",
	"toon.ehime.jp",
	"uchiko.ehime.jp",
	"uwajima.ehime.jp",
	"yawatahama.ehime.jp",
	"echizen.fukui.jp",
	"eiheiji.fukui.jp",
	"fukui.fukui.jp",
	"ikeda.fukui.jp",
	"katsuyama.fukui.jp",
	"mihama.fukui.jp",
	"minamiechizen.fukui.jp",
	"obama.fukui.jp",
	"ohi.fukui.jp",
	"ono.fukui.jp",
	"sabae.fukui.jp",
	"sakai.fukui.jp",
	"takahama.fukui.jp",
	"tsuruga.fukui.jp",
	"wakasa.fukui.jp",
	"ashiya.fukuoka.jp",
	"buzen.fukuoka.jp",
	"chikugo.fukuoka.jp",
	"chikuho.fukuoka.jp",
	"chikujo.fukuoka.jp",
	"chikushino.fukuoka.jp",
	"chikuzen.fukuoka.jp",
	"chuo.fukuoka.jp",
	"dazaifu.fukuoka.jp",
	"fukuchi.fukuoka.jp",
	"hakata.fukuoka.jp",
	"higashi.fukuoka.jp",
	"hirokawa.fukuoka.jp",
	"hisayama.fukuoka.jp",
	"iizuka.fukuoka.jp",
	"inatsuki.fukuoka.jp",
	"kaho.fukuoka.jp",
	"kasuga.fukuoka.jp",
	"kasuya.fukuoka.jp",
	"kawara.fukuoka.jp",
	"keisen.fukuoka.jp",
	"koga.fukuoka.jp",
	"kurate.fukuoka.jp",
	"kurogi.fukuoka.jp",
	"kurume.fukuoka.jp",
	"minami.fukuoka.jp",
	"miyako.fukuoka.jp",
	"miyama.fukuoka.jp",
	"miyawaka.fukuoka.jp",
	"mizumaki.fukuoka.jp",
	"munakata.fukuoka.jp",
	"nakagawa.fukuoka.jp",
	"nakama.fukuoka.jp",
	"nishi.fukuoka.jp",
	"nogata.fukuoka.jp",
	"ogori.fukuoka.jp",
	"okagaki.fukuoka.jp",
	"okawa.fukuoka.jp",
	"oki.fukuoka.jp",
	"omuta.fukuoka.jp",
	"onga.fukuoka.jp",
	"onojo.fukuoka.jp",
	"oto.fukuoka.jp",
	"saigawa.fukuoka.jp",
	"sasaguri.fukuoka.jp",
	"shingu.fukuoka.jp",
	"shinyoshitomi.fukuoka.jp",
	"shonai.fukuoka.jp",
	"soeda.fukuoka.jp",
	"sue.fukuoka.jp",
	"tachiarai.fukuoka.jp",
	"tagawa.fukuoka.jp",
	"takata.fukuoka.jp",
	"toho.fukuoka.jp",
	"toyotsu.fukuoka.jp",
	"tsuiki.fukuoka.jp",
	"ukiha.fukuoka.jp",
	"umi.fukuoka.jp",
	"usui.fukuoka.jp",
	"yamada.fukuoka.jp",
	"yame.fukuoka.jp",
	"yanagawa.fukuoka.jp",
	"yukuhashi.fukuoka.jp",
	"aizubange.fukushima.jp",
	"aizumisato.fukushima.jp",
	"aizuwakamatsu.fukushima.jp",
	"asakawa.fukushima.jp",
	"bandai.fukushima.jp",
	"date.fukushima.jp",
	"fukushima.fukushima.jp",
	"furudono.fukushima.jp",
	"futaba.fukushima.jp",
	"hanawa.fukushima.jp",
	"higashi.fukushima.jp",
	"hirata.fukushima.jp",
	"hirono.fukushima.jp",
	"iitate.fukushima.jp",
	"inawashiro.fukushima.jp",
	"ishikawa.fukushima.jp",
	"iwaki.fukushima.jp",
	"izumizaki.fukushima.jp",
	"kagamiishi.fukushima.jp",
	"kaneyama.fukushima.jp",
	"kawamata.fukushima.jp",
	"kitakata.fukushima.jp",
	"kitashiobara.fukushima.jp",
	"koori.fukushima.jp",
	"koriyama.fukushima.jp",
	"kunimi.fukushima.jp",
	"miharu.fukushima.jp",
	"mishima.fukushima.jp",
	"namie.fukushima.jp",
	"nango.fukushima.jp",
	"nishiaizu.fukushima.jp",
	"nishigo.fukushima.jp",
	"okuma.fukushima.jp",
	"omotego.fukushima.jp",
	"ono.fukushima.jp",
	"otama.fukushima.jp",
	"samegawa.fukushima.jp",
	"shimogo.fukushima.jp",
	"shirakawa.fukushima.jp",
	"showa.fukushima.jp",
	"soma.fukushima.jp",
	"sukagawa.fukushima.jp",
	"taishin.fukushima.jp",
	"tamakawa.fukushima.jp",
	"tanagura.fukushima.jp",
	"tenei.fukushima.jp",
	"yabuki.fukushima.jp",
	"yamato.fukushima.jp",
	"yamatsuri.fukushima.jp",
	"yanaizu.fukushima.jp",
	"yugawa.fukushima.jp",
	"anpachi.gifu.jp",
	"ena.gifu.jp",
	"gifu.gifu.jp",
	"ginan.gifu.jp",
	"godo.gifu.jp",
	"gujo.gifu.jp",
	"hashima.gifu.jp",
	"hichiso.gifu.jp",
	"hida.gifu.jp",
	"higashishirakawa.gifu.jp",
	"ibigawa.gifu.jp",
	"ikeda.gifu.jp",
	"kakamigahara.gifu.jp",
	"kani.gifu.jp",
	"kasahara.gifu.jp",
	"kasamatsu.gifu.jp",
	"kawaue.gifu.jp",
	"kitagata.gifu.jp",
	"mino.gifu.jp",
	"minokamo.gifu.jp",
	"mitake.gifu.jp",
	"mizunami.gifu.jp",
	"motosu.gifu.jp",
	"nakatsugawa.gifu.jp",
	"ogaki.gifu.jp",
	"sakahogi.gifu.jp",
	"seki.gifu.jp",
	"sekigahara.gifu.jp",
	"shirakawa.gifu.jp",
	"tajimi.gifu.jp",
	"takayama.gifu.jp",
	"tarui.gifu.jp",
	"toki.gifu.jp",
	"tomika.gifu.jp",
	"wanouchi.gifu.jp",
	"yamagata.gifu.jp",
	"yaotsu.gifu.jp",
	"yoro.gifu.jp",
	"annaka.gunma.jp",
	"chiyoda.gunma.jp",
	"fujioka.gunma.jp",
	"higashiagatsuma.gunma.jp",
	"isesaki.gunma.jp",
	"itakura.gunma.jp",
	"kanna.gunma.jp",
	"kanra.gunma.jp",
	"katashina.gunma.jp",
	"kawaba.gunma.jp",
	"kiryu.gunma.jp",
	"kusatsu.gunma.jp",
	"maebashi.gunma.jp",
	"meiwa.gunma.jp",
	"midori.gunma.jp",
	"minakami.gunma.jp",
	"naganohara.gunma.jp",
	"nakanojo.gunma.jp",
	"nanmoku.gunma.jp",
	"numata.gunma.jp",
	"oizumi.gunma.jp",
	"ora.gunma.jp",
	"ota.gunma.jp",
	"shibukawa.gunma.jp",
	"shimonita.gunma.jp",
	"shinto.gunma.jp",
	"showa.gunma.jp",
	"takasaki.gunma.jp",
	"takayama.gunma.jp",
	"tamamura.gunma.jp",
	"tatebayashi.gunma.jp",
	"tomioka.gunma.jp",
	"tsukiyono.gunma.jp",
	"tsumagoi.gunma.jp",
	"ueno.gunma.jp",
	"yoshioka.gunma.jp",
	"asaminami.hiroshima.jp",
	"daiwa.hiroshima.jp",
	"etajima.hiroshima.jp",
	"fuchu.hiroshima.jp",
	"fukuyama.hiroshima.jp",
	"hatsukaichi.hiroshima.jp",
	"higashihiroshima.hiroshima.jp",
	"hongo.hiroshima.jp",
	"jinsekikogen.hiroshima.jp",
	"kaita.hiroshima.jp",
	"kui.hiroshima.jp",
	"kumano.hiroshima.jp",
	"kure.hiroshima.jp",
	"mihara.hiroshima.jp",
	"miyoshi.hiroshima.jp",
	"naka.hiroshima.jp",
	"onomichi.hiroshima.jp",
	"osakikamijima.hiroshima.jp",
	"otake.hiroshima.jp",
	"saka.hiroshima.jp",
	"sera.hiroshima.jp",
	"seranishi.hiroshima.jp",
	"shinichi.hiroshima.jp",
	"shobara.hiroshima.jp",
	"takehara.hiroshima.jp",
	"abashiri.hokkaido.jp",
	"abira.hokkaido.jp",
	"aibetsu.hokkaido.jp",
	"akabira.hokkaido.jp",
	"akkeshi.hokkaido.jp",
	"asahikawa.hokkaido.jp",
	"ashibetsu.hokkaido.jp",
	"ashoro.hokkaido.jp",
	"assabu.hokkaido.jp",
	"atsuma.hokkaido.jp",
	"bibai.hokkaido.jp",
	"biei.hokkaido.jp",
	"bifuka.hokkaido.jp",
	"bihoro.hokkaido.jp",
	"biratori.hokkaido.jp",
	"chippubetsu.hokkaido.jp",
	"chitose.hokkaido.jp",
	"date.hokkaido.jp",
	"ebetsu.hokkaido.jp",
	"embetsu.hokkaido.jp",
	"eniwa.hokkaido.jp",
	"erimo.hokkaido.jp",
	"esan.hokkaido.jp",
	"esashi.hokkaido.jp",
	"fukagawa.hokkaido.jp",
	"fukushima.hokkaido.jp",
	"furano.hokkaido.jp",
	"furubira.hokkaido.jp",
	"haboro.hokkaido.jp",
	"hakodate.hokkaido.jp",
	"hamatonbetsu.hokkaido.jp",
	"hidaka.hokkaido.jp",
	"higashikagura.hokkaido.jp",
	"higashikawa.hokkaido.jp",
	"hiroo.hokkaido.jp",
	"hokuryu.hokkaido.jp",
	"hokuto.hokkaido.jp",
	"honbetsu.hokkaido.jp",
	"horokanai.hokkaido.jp",
	"horonobe.hokkaido.jp",
	"ikeda.hokkaido.jp",
	"imakane.hokkaido.jp",
	"ishikari.hokkaido.jp",
	"iwamizawa.hokkaido.jp",
	"iwanai.hokkaido.jp",
	"kamifurano.hokkaido.jp",
	"kamikawa.hokkaido.jp",
	"kamishihoro.hokkaido.jp",
	"kamisunagawa.hokkaido.jp",
	"kamoenai.hokkaido.jp",
	"kayabe.hokkaido.jp",
	"kembuchi.hokkaido.jp",
	"kikonai.hokkaido.jp",
	"kimobetsu.hokkaido.jp",
	"kitahiroshima.hokkaido.jp",
	"kitami.hokkaido.jp",
	"kiyosato.hokkaido.jp",
	"koshimizu.hokkaido.jp",
	"kunneppu.hokkaido.jp",
	"kuriyama.hokkaido.jp",
	"kuromatsunai.hokkaido.jp",
	"kushiro.hokkaido.jp",
	"kutchan.hokkaido.jp",
	"kyowa.hokkaido.jp",
	"mashike.hokkaido.jp",
	"matsumae.hokkaido.jp",
	"mikasa.hokkaido.jp",
	"minamifurano.hokkaido.jp",
	"mombetsu.hokkaido.jp",
	"moseushi.hokkaido.jp",
	"mukawa.hokkaido.jp",
	"muroran.hokkaido.jp",
	"naie.hokkaido.jp",
	"nakagawa.hokkaido.jp",
	"nakasatsunai.hokkaido.jp",
	"nakatombetsu.hokkaido.jp",
	"nanae.hokkaido.jp",
	"nanporo.hokkaido.jp",
	"nayoro.hokkaido.jp",
	"nemuro.hokkaido.jp",
	"niikappu.hokkaido.jp",
	"niki.hokkaido.jp",
	"nishiokoppe.hokkaido.jp",
	"noboribetsu.hokkaido.jp",
	"numata.hokkaido.jp",
	"obihiro.hokkaido.jp",
	"obira.hokkaido.jp",
	"oketo.hokkaido.jp",
	"okoppe.hokkaido.jp",
	"otaru.hokkaido.jp",
	"otobe.hokkaido.jp",
	"otofuke.hokkaido.jp",
	"otoineppu.hokkaido.jp",
	"oumu.hokkaido.jp",
	"ozora.hokkaido.jp",
	"pippu.hokkaido.jp",
	"rankoshi.hokkaido.jp",
	"rebun.hokkaido.jp",
	"rikubetsu.hokkaido.jp",
	"rishiri.hokkaido.jp",
	"rishirifuji.hokkaido.jp",
	"saroma.hokkaido.jp",
	"sarufutsu.hokkaido.jp",
	"shakotan.hokkaido.jp",
	"shari.hokkaido.jp",
	"shibecha.hokkaido.jp",
	"shibetsu.hokkaido.jp",
	"shikabe.hokkaido.jp",
	"shikaoi.hokkaido.jp",
	"shimamaki.hokkaido.jp",
	"shimizu.hokkaido.jp",
	"shimokawa.hokkaido.jp",
	"shinshinotsu.hokkaido.jp",
	"shintoku.hokkaido.jp",
	"shiranuka.hokkaido.jp",
	"shiraoi.hokkaido.jp",
	"shiriuchi.hokkaido.jp",
	"sobetsu.hokkaido.jp",
	"sunagawa.hokkaido.jp",
	"taiki.hokkaido.jp",
	"takasu.hokkaido.jp",
	"takikawa.hokkaido.jp",
	"takinoue.hokkaido.jp",
	"teshikaga.hokkaido.jp",
	"tobetsu.hokkaido.jp",
	"tohma.hokkaido.jp",
	"tomakomai.hokkaido.jp",
	"tomari.hokkaido.jp",
	"toya.hokkaido.jp",
	"toyako.hokkaido.jp",
	"toyotomi.hokkaido.jp",
	"toyoura.hokkaido.jp",
	"tsubetsu.hokkaido.jp",
	"tsukigata.hokkaido.jp",
	"urakawa.hokkaido.jp",
	"urausu.hokkaido.jp",
	"uryu.hokkaido.jp",
	"utashinai.hokkaido.jp",
	"wakkanai.hokkaido.jp",
	"wassamu.hokkaido.jp",
	"yakumo.hokkaido.jp",
	"yoichi.hokkaido.jp",
	"aioi.hyogo.jp",
	"akashi.hyogo.jp",
	"ako.hyogo.jp",
	"amagasaki.hyogo.jp",
	"aogaki.hyogo.jp",
	"asago.hyogo.jp",
	"ashiya.hyogo.jp",
	"awaji.hyogo.jp",
	"fukusaki.hyogo.jp",
	"goshiki.hyogo.jp",
	"harima.hyogo.jp",
	"himeji.hyogo.jp",
	"ichikawa.hyogo.jp",
	"inagawa.hyogo.jp",
	"itami.hyogo.jp",
	"kakogawa.hyogo.jp",
	"kamigori.hyogo.jp",
	"kamikawa.hyogo.jp",
	"kasai.hyogo.jp",
	"kasuga.hyogo.jp",
	"kawanishi.hyogo.jp",
	"miki.hyogo.jp",
	"minamiawaji.hyogo.jp",
	"nishinomiya.hyogo.jp",
	"nishiwaki.hyogo.jp",
	"ono.hyogo.jp",
	"sanda.hyogo.jp",
	"sannan.hyogo.jp",
	"sasayama.hyogo.jp",
	"sayo.hyogo.jp",
	"shingu.hyogo.jp",
	"shinonsen.hyogo.jp",
	"shiso.hyogo.jp",
	"sumoto.hyogo.jp",
	"taishi.hyogo.jp",
	"taka.hyogo.jp",
	"takarazuka.hyogo.jp",
	"takasago.hyogo.jp",
	"takino.hyogo.jp",
	"tamba.hyogo.jp",
	"tatsuno.hyogo.jp",
	"toyooka.hyogo.jp",
	"yabu.hyogo.jp",
	"yashiro.hyogo.jp",
	"yoka.hyogo.jp",
	"yokawa.hyogo.jp",
	"ami.ibaraki.jp",
	"asahi.ibaraki.jp",
	"bando.ibaraki.jp",
	"chikusei.ibaraki.jp",
	"daigo.ibaraki.jp",
	"fujishiro.ibaraki.jp",
	"hitachi.ibaraki.jp",
	"hitachinaka.ibaraki.jp",
	"hitachiomiya.ibaraki.jp",
	"hitachiota.ibaraki.jp",
	"ibaraki.ibaraki.jp",
	"ina.ibaraki.jp",
	"inashiki.ibaraki.jp",
	"itako.ibaraki.jp",
	"iwama.ibaraki.jp",
	"joso.ibaraki.jp",
	"kamisu.ibaraki.jp",
	"kasama.ibaraki.jp",
	"kashima.ibaraki.jp",
	"kasumigaura.ibaraki.jp",
	"koga.ibaraki.jp",
	"miho.ibaraki.jp",
	"mito.ibaraki.jp",
	"moriya.ibaraki.jp",
	"naka.ibaraki.jp",
	"namegata.ibaraki.jp",
	"oarai.ibaraki.jp",
	"ogawa.ibaraki.jp",
	"omitama.ibaraki.jp",
	"ryugasaki.ibaraki.jp",
	"sakai.ibaraki.jp",
	"sakuragawa.ibaraki.jp",
	"shimodate.ibaraki.jp",
	"shimotsuma.ibaraki.jp",
	"shirosato.ibaraki.jp",
	"sowa.ibaraki.jp",
	"suifu.ibaraki.jp",
	"takahagi.ibaraki.jp",
	"tamatsukuri.ibaraki.jp",
	"tokai.ibaraki.jp",
	"tomobe.ibaraki.jp",
	"tone.ibaraki.jp",
	"toride.ibaraki.jp",
	"tsuchiura.ibaraki.jp",
	"tsukuba.ibaraki.jp",
	"uchihara.ibaraki.jp",
	"ushiku.ibaraki.jp",
	"yachiyo.ibaraki.jp",
	"yamagata.ibaraki.jp",
	"yawara.ibaraki.jp",
	"yuki.ibaraki.jp",
	"anamizu.ishikawa.jp",
	"hakui.ishikawa.jp",
	"hakusan.ishikawa.jp",
	"kaga.ishikawa.jp",
	"kahoku.ishikawa.jp",
	"kanazawa.ishikawa.jp",
	"kawakita.ishikawa.jp",
	"komatsu.ishikawa.jp",
	"nakanoto.ishikawa.jp",
	"nanao.ishikawa.jp",
	"nomi.ishikawa.jp",
	"nonoichi.ishikawa.jp",
	"noto.ishikawa.jp",
	"shika.ishikawa.jp",
	"suzu.ishikawa.jp",
	"tsubata.ishikawa.jp",
	"tsurugi.ishikawa.jp",
	"uchinada.ishikawa.jp",
	"wajima.ishikawa.jp",
	"fudai.iwate.jp",
	"fujisawa.iwate.jp",
	"hanamaki.iwate.jp",
	"hiraizumi.iwate.jp",
	"hirono.iwate.jp",
	"ichinohe.iwate.jp",
	"ichinoseki.iwate.jp",
	"iwaizumi.iwate.jp",
	"iwate.iwate.jp",
	"joboji.iwate.jp",
	"kamaishi.iwate.jp",
	"kanegasaki.iwate.jp",
	"karumai.iwate.jp",
	"kawai.iwate.jp",
	"kitakami.iwate.jp",
	"kuji.iwate.jp",
	"kunohe.iwate.jp",
	"kuzumaki.iwate.jp",
	"miyako.iwate.jp",
	"mizusawa.iwate.jp",
	"morioka.iwate.jp",
	"ninohe.iwate.jp",
	"noda.iwate.jp",
	"ofunato.iwate.jp",
	"oshu.iwate.jp",
	"otsuchi.iwate.jp",
	"rikuzentakata.iwate.jp",
	"shiwa.iwate.jp",
	"shizukuishi.iwate.jp",
	"sumita.iwate.jp",
	"tanohata.iwate.jp",
	"tono.iwate.jp",
	"yahaba.iwate.jp",
	"yamada.iwate.jp",
	"ayagawa.kagawa.jp",
	"higashikagawa.kagawa.jp",
	"kanonji.kagawa.jp",
	"kotohira.kagawa.jp",
	"manno.kagawa.jp",
	"marugame.kagawa.jp",
	"mitoyo.kagawa.jp",
	"naoshima.kagawa.jp",
	"sanuki.kagawa.jp",
	"tadotsu.kagawa.jp",
	"takamatsu.kagawa.jp",
	"tonosho.kagawa.jp",
	"uchinomi.kagawa.jp",
	"utazu.kagawa.jp",
	"zentsuji.kagawa.jp",
	"akune.kagoshima.jp",
	"amami.kagoshima.jp",
	"hioki.kagoshima.jp",
	"isa.kagoshima.jp",
	"isen.kagoshima.jp",
	"izumi.kagoshima.jp",
	"kagoshima.kagoshima.jp",
	"kanoya.kagoshima.jp",
	"kawanabe.kagoshima.jp",
	"kinko.kagoshima.jp",
	"kouyama.kagoshima.jp",
	"makurazaki.kagoshima.jp",
	"matsumoto.kagoshima.jp",
	"minamitane.kagoshima.jp",
	"nakatane.kagoshima.jp",
	"nishinoomote.kagoshima.jp",
	"satsumasendai.kagoshima.jp",
	"soo.kagoshima.jp",
	"tarumizu.kagoshima.jp",
	"yusui.kagoshima.jp",
	"aikawa.kanagawa.jp",
	"atsugi.kanagawa.jp",
	"ayase.kanagawa.jp",
	"chigasaki.kanagawa.jp",
	"ebina.kanagawa.jp",
	"fujisawa.kanagawa.jp",
	"hadano.kanagawa.jp",
	"hakone.kanagawa.jp",
	"hiratsuka.kanagawa.jp",
	"isehara.kanagawa.jp",
	"kaisei.kanagawa.jp",
	"kamakura.kanagawa.jp",
	"kiyokawa.kanagawa.jp",
	"matsuda.kanagawa.jp",
	"minamiashigara.kanagawa.jp",
	"miura.kanagawa.jp",
	"nakai.kanagawa.jp",
	"ninomiya.kanagawa.jp",
	"odawara.kanagawa.jp",
	"oi.kanagawa.jp",
	"oiso.kanagawa.jp",
	"sagamihara.kanagawa.jp",
	"samukawa.kanagawa.jp",
	"tsukui.kanagawa.jp",
	"yamakita.kanagawa.jp",
	"yamato.kanagawa.jp",
	"yokosuka.kanagawa.jp",
	"yugawara.kanagawa.jp",
	"zama.kanagawa.jp",
	"zushi.kanagawa.jp",
	"aki.kochi.jp",
	"geisei.kochi.jp",
	"hidaka.kochi.jp",
	"higashitsuno.kochi.jp",
	"ino.kochi.jp",
	"kagami.kochi.jp",
	"kami.kochi.jp",
	"kitagawa.kochi.jp",
	"kochi.kochi.jp",
	"mihara.kochi.jp",
	"motoyama.kochi.jp",
	"muroto.kochi.jp",
	"nahari.kochi.jp",
	"nakamura.kochi.jp",
	"nankoku.kochi.jp",
	"nishitosa.kochi.jp",
	"niyodogawa.kochi.jp",
	"ochi.kochi.jp",
	"okawa.kochi.jp",
	"otoyo.kochi.jp",
	"otsuki.kochi.jp",
	"sakawa.kochi.jp",
	"sukumo.kochi.jp",
	"susaki.kochi.jp",
	"tosa.kochi.jp",
	"tosashimizu.kochi.jp",
	"toyo.kochi.jp",
	"tsuno.kochi.jp",
	"umaji.kochi.jp",
	"yasuda.kochi.jp",
	"yusuhara.kochi.jp",
	"amakusa.kumamoto.jp",
	"arao.kumamoto.jp",
	"aso.kumamoto.jp",
	"choyo.kumamoto.jp",
	"gyokuto.kumamoto.jp",
	"kamiamakusa.kumamoto.jp",
	"kikuchi.kumamoto.jp",
	"kumamoto.kumamoto.jp",
	"mashiki.kumamoto.jp",
	"mifune.kumamoto.jp",
	"minamata.kumamoto.jp",
	"minamioguni.kumamoto.jp",
	"nagasu.kumamoto.jp",
	"nishihara.kumamoto.jp",
	"oguni.kumamoto.jp",
	"ozu.kumamoto.jp",
	"sumoto.kumamoto.jp",
	"takamori.kumamoto.jp",
	"uki.kumamoto.jp",
	"uto.kumamoto.jp",
	"yamaga.kumamoto.jp",
	"yamato.kumamoto.jp",
	"yatsushiro.kumamoto.jp",
	"ayabe.kyoto.jp",
	"fukuchiyama.kyoto.jp",
	"higashiyama.kyoto.jp",
	"ide.kyoto.jp",
	"ine.kyoto.jp",
	"joyo.kyoto.jp",
	"kameoka.kyoto.jp",
	"kamo.kyoto.jp",
	"kita.kyoto.jp",
	"kizu.kyoto.jp",
	"kumiyama.kyoto.jp",
	"kyotamba.kyoto.jp",
	"kyotanabe.kyoto.jp",
	"kyotango.kyoto.jp",
	"maizuru.kyoto.jp",
	"minami.kyoto.jp",
	"minamiyamashiro.kyoto.jp",
	"miyazu.kyoto.jp",
	"muko.kyoto.jp",
	"nagaokakyo.kyoto.jp",
	"nakagyo.kyoto.jp",
	"nantan.kyoto.jp",
	"oyamazaki.kyoto.jp",
	"sakyo.kyoto.jp",
	"seika.kyoto.jp",
	"tanabe.kyoto.jp",
	"uji.kyoto.jp",
	"ujitawara.kyoto.jp",
	"wazuka.kyoto.jp",
	"yamashina.kyoto.jp",
	"yawata.kyoto.jp",
	"asahi.mie.jp",
	"inabe.mie.jp",
	"ise.mie.jp",
	"kameyama.mie.jp",
	"kawagoe.mie.jp",
	"kiho.mie.jp",
	"kisosaki.mie.jp",
	"kiwa.mie.jp",
	"komono.mie.jp",
	"kumano.mie.jp",
	"kuwana.mie.jp",
	"matsusaka.mie.jp",
	"meiwa.mie.jp",
	"mihama.mie.jp",
	"minamiise.mie.jp",
	"misugi.mie.jp",
	"miyama.mie.jp",
	"nabari.mie.jp",
	"shima.mie.jp",
	"suzuka.mie.jp",
	"tado.mie.jp",
	"taiki.mie.jp",
	"taki.mie.jp",
	"tamaki.mie.jp",
	"toba.mie.jp",
	"tsu.mie.jp",
	"udono.mie.jp",
	"ureshino.mie.jp",
	"watarai.mie.jp",
	"yokkaichi.mie.jp",
	"furukawa.miyagi.jp",
	"higashimatsushima.miyagi.jp",
	"ishinomaki.miyagi.jp",
	"iwanuma.miyagi.jp",
	"kakuda.miyagi.jp",
	"kami.miyagi.jp",
	"kawasaki.miyagi.jp",
	"marumori.miyagi.jp",
	"matsushima.miyagi.jp",
	"minamisanriku.miyagi.jp",
	"misato.miyagi.jp",
	"murata.miyagi.jp",
	"natori.miyagi.jp",
	"ogawara.miyagi.jp",
	"ohira.miyagi.jp",
	"onagawa.miyagi.jp",
	"osaki.miyagi.jp",
	"rifu.miyagi.jp",
	"semine.miyagi.jp",
	"shibata.miyagi.jp",
	"shichikashuku.miyagi.jp",
	"shikama.miyagi.jp",
	"shiogama.miyagi.jp",
	"shiroishi.miyagi.jp",
	"tagajo.miyagi.jp",
	"taiwa.miyagi.jp",
	"tome.miyagi.jp",
	"tomiya.miyagi.jp",
	"wakuya.miyagi.jp",
	"watari.miyagi.jp",
	"yamamoto.miyagi.jp",
	"zao.miyagi.jp",
	"aya.miyazaki.jp",
	"ebino.miyazaki.jp",
	"gokase.miyazaki.jp",
	"hyuga.miyazaki.jp",
	"kadogawa.miyazaki.jp",
	"kawaminami.miyazaki.jp",
	"kijo.miyazaki.jp",
	"kitagawa.miyazaki.jp",
	"kitakata.miyazaki.jp",
	"kitaura.miyazaki.jp",
	"kobayashi.miyazaki.jp",
	"kunitomi.miyazaki.jp",
	"kushima.miyazaki.jp",
	"mimata.miyazaki.jp",
	"miyakonojo.miyazaki.jp",
	"miyazaki.miyazaki.jp",
	"morotsuka.miyazaki.jp",
	"nichinan.miyazaki.jp",
	"nishimera.miyazaki.jp",
	"nobeoka.miyazaki.jp",
	"saito.miyazaki.jp",
	"shiiba.miyazaki.jp",
	"shintomi.miyazaki.jp",
	"takaharu.miyazaki.jp",
	"takanabe.miyazaki.jp",
	"takazaki.miyazaki.jp",
	"tsuno.miyazaki.jp",
	"achi.nagano.jp",
	"agematsu.nagano.jp",
	"anan.nagano.jp",
	"aoki.nagano.jp",
	"asahi.nagano.jp",
	"azumino.nagano.jp",
	"chikuhoku.nagano.jp",
	"chikuma.nagano.jp",
	"chino.nagano.jp",
	"fujimi.nagano.jp",
	"hakuba.nagano.jp",
	"hara.nagano.jp",
	"hiraya.nagano.jp",
	"iida.nagano.jp",
	"iijima.nagano.jp",
	"iiyama.nagano.jp",
	"iizuna.nagano.jp",
	"ikeda.nagano.jp",
	"ikusaka.nagano.jp",
	"ina.nagano.jp",
	"karuizawa.nagano.jp",
	"kawakami.nagano.jp",
	"kiso.nagano.jp",
	"kisofukushima.nagano.jp",
	"kitaaiki.nagano.jp",
	"komagane.nagano.jp",
	"komoro.nagano.jp",
	"matsukawa.nagano.jp",
	"matsumoto.nagano.jp",
	"miasa.nagano.jp",
	"minamiaiki.nagano.jp",
	"minamimaki.nagano.jp",
	"minamiminowa.nagano.jp",
	"minowa.nagano.jp",
	"miyada.nagano.jp",
	"miyota.nagano.jp",
	"mochizuki.nagano.jp",
	"nagano.nagano.jp",
	"nagawa.nagano.jp",
	"nagiso.nagano.jp",
	"nakagawa.nagano.jp",
	"nakano.nagano.jp",
	"nozawaonsen.nagano.jp",
	"obuse.nagano.jp",
	"ogawa.nagano.jp",
	"okaya.nagano.jp",
	"omachi.nagano.jp",
	"omi.nagano.jp",
	"ookuwa.nagano.jp",
	"ooshika.nagano.jp",
	"otaki.nagano.jp",
	"otari.nagano.jp",
	"sakae.nagano.jp",
	"sakaki.nagano.jp",
	"saku.nagano.jp",
	"sakuho.nagano.jp",
	"shimosuwa.nagano.jp",
	"shinanomachi.nagano.jp",
	"shiojiri.nagano.jp",
	"suwa.nagano.jp",
	"suzaka.nagano.jp",
	"takagi.nagano.jp",
	"takamori.nagano.jp",
	"takayama.nagano.jp",
	"tateshina.nagano.jp",
	"tatsuno.nagano.jp",
	"togakushi.nagano.jp",
	"togura.nagano.jp",
	"tomi.nagano.jp",
	"ueda.nagano.jp",
	"wada.nagano.jp",
	"yamagata.nagano.jp",
	"yamanouchi.nagano.jp",
	"yasaka.nagano.jp",
	"yasuoka.nagano.jp",
	"chijiwa.nagasaki.jp",
	"futsu.nagasaki.jp",
	"goto.nagasaki.jp",
	"hasami.nagasaki.jp",
	"hirado.nagasaki.jp",
	"iki.nagasaki.jp",
	"isahaya.nagasaki.jp",
	"kawatana.nagasaki.jp",
	"kuchinotsu.nagasaki.jp",
	"matsuura.nagasaki.jp",
	"nagasaki.nagasaki.jp",
	"obama.nagasaki.jp",
	"omura.nagasaki.jp",
	"oseto.nagasaki.jp",
	"saikai.nagasaki.jp",
	"sasebo.nagasaki.jp",
	"seihi.nagasaki.jp",
	"shimabara.nagasaki.jp",
	"shinkamigoto.nagasaki.jp",
	"togitsu.nagasaki.jp",
	"tsushima.nagasaki.jp",
	"unzen.nagasaki.jp",
	"ando.nara.jp",
	"gose.nara.jp",
	"heguri.nara.jp",
	"higashiyoshino.nara.jp",
	"ikaruga.nara.jp",
	"ikoma.nara.jp",
	"kamikitayama.nara.jp",
	"kanmaki.nara.jp",
	"kashiba.nara.jp",
	"kashihara.nara.jp",
	"katsuragi.nara.jp",
	"kawai.nara.jp",
	"kawakami.nara.jp",
	"kawanishi.nara.jp",
	"koryo.nara.jp",
	"kurotaki.nara.jp",
	"mitsue.nara.jp",
	"miyake.nara.jp",
	"nara.nara.jp",
	"nosegawa.nara.jp",
	"oji.nara.jp",
	"ouda.nara.jp",
	"oyodo.nara.jp",
	"sakurai.nara.jp",
	"sango.nara.jp",
	"shimoichi.nara.jp",
	"shimokitayama.nara.jp",
	"shinjo.nara.jp",
	"soni.nara.jp",
	"takatori.nara.jp",
	"tawaramoto.nara.jp",
	"tenkawa.nara.jp",
	"tenri.nara.jp",
	"uda.nara.jp",
	"yamatokoriyama.nara.jp",
	"yamatotakada.nara.jp",
	"yamazoe.nara.jp",
	"yoshino.nara.jp",
	"aga.niigata.jp",
	"agano.niigata.jp",
	"gosen.niigata.jp",
	"itoigawa.niigata.jp",
	"izumozaki.niigata.jp",
	"joetsu.niigata.jp",
	"kamo.niigata.jp",
	"kariwa.niigata.jp",
	"kashiwazaki.niigata.jp",
	"minamiuonuma.niigata.jp",
	"mitsuke.niigata.jp",
	"muika.niigata.jp",
	"murakami.niigata.jp",
	"myoko.niigata.jp",
	"nagaoka.niigata.jp",
	"niigata.niigata.jp",
	"ojiya.niigata.jp",
	"omi.niigata.jp",
	"sado.niigata.jp",
	"sanjo.niigata.jp",
	"seiro.niigata.jp",
	"seirou.niigata.jp",
	"sekikawa.niigata.jp",
	"shibata.niigata.jp",
	"tagami.niigata.jp",
	"tainai.niigata.jp",
	"tochio.niigata.jp",
	"tokamachi.niigata.jp",
	"tsubame.niigata.jp",
	"tsunan.niigata.jp",
	"uonuma.niigata.jp",
	"yahiko.niigata.jp",
	"yoita.niigata.jp",
	"yuzawa.niigata.jp",
	"beppu.oita.jp",
	"bungoono.oita.jp",
	"bungotakada.oita.jp",
	"hasama.oita.jp",
	"hiji.oita.jp",
	"himeshima.oita.jp",
	"hita.oita.jp",
	"kamitsue.oita.jp",
	"kokonoe.oita.jp",
	"kuju.oita.jp",
	"kunisaki.oita.jp",
	"kusu.oita.jp",
	"oita.oita.jp",
	"saiki.oita.jp",
	"taketa.oita.jp",
	"tsukumi.oita.jp",
	"usa.oita.jp",
	"usuki.oita.jp",
	"yufu.oita.jp",
	"akaiwa.okayama.jp",
	"asakuchi.okayama.jp",
	"bizen.okayama.jp",
	"hayashima.okayama.jp",
	"ibara.okayama.jp",
	"kagamino.okayama.jp",
	"kasaoka.okayama.jp",
	"kibichuo.okayama.jp",
	"kumenan.okayama.jp",
	"kurashiki.okayama.jp",
	"maniwa.okayama.jp",
	"misaki.okayama.jp",
	"nagi.okayama.jp",
	"niimi.okayama.jp",
	"nishiawakura.okayama.jp",
	"okayama.okayama.jp",
	"satosho.okayama.jp",
	"setouchi.okayama.jp",
	"shinjo.okayama.jp",
	"shoo.okayama.jp",
	"soja.okayama.jp",
	"takahashi.okayama.jp",
	"tamano.okayama.jp",
	"tsuyama.okayama.jp",
	"wake.okayama.jp",
	"yakage.okayama.jp",
	"aguni.okinawa.jp",
	"ginowan.okinawa.jp",
	"ginoza.okinawa.jp",
	"gushikami.okinawa.jp",
	"haebaru.okinawa.jp",
	"higashi.okinawa.jp",
	"hirara.okinawa.jp",
	"iheya.okinawa.jp",
	"ishigaki.okinawa.jp",
	"ishikawa.okinawa.jp",
	"itoman.okinawa.jp",
	"izena.okinawa.jp",
	"kadena.okinawa.jp",
	"kin.okinawa.jp",
	"kitadaito.okinawa.jp",
	"kitanakagusuku.okinawa.jp",
	"kumejima.okinawa.jp",
	"kunigami.okinawa.jp",
	"minamidaito.okinawa.jp",
	"motobu.okinawa.jp",
	"nago.okinawa.jp",
	"naha.okinawa.jp",
	"nakagusuku.okinawa.jp",
	"nakijin.okinawa.jp",
	"nanjo.okinawa.jp",
	"nishihara.okinawa.jp",
	"ogimi.okinawa.jp",
	"okinawa.okinawa.jp",
	"onna.okinawa.jp",
	"shimoji.okinawa.jp",
	"taketomi.okinawa.jp",
	"tarama.okinawa.jp",
	"tokashiki.okinawa.jp",
	"tomigusuku.okinawa.jp",
	"tonaki.okinawa.jp",
	"urasoe.okinawa.jp",
	"uruma.okinawa.jp",
	"yaese.okinawa.jp",
	"yomitan.okinawa.jp",
	"yonabaru.okinawa.jp",
	"yonaguni.okinawa.jp",
	"zamami.okinawa.jp",
	"abeno.osaka.jp",
	"chihayaakasaka.osaka.jp",
	"chuo.osaka.jp",
	"daito.osaka.jp",
	"fujiidera.osaka.jp",
	"habikino.osaka.jp",
	"hannan.osaka.jp",
	"higashiosaka.osaka.jp",
	"higashisumiyoshi.osaka.jp",
	"higashiyodogawa.osaka.jp",
	"hirakata.osaka.jp",
	"ibaraki.osaka.jp",
	"ikeda.osaka.jp",
	"izumi.osaka.jp",
	"izumiotsu.osaka.jp",
	"izumisano.osaka.jp",
	"kadoma.osaka.jp",
	"kaizuka.osaka.jp",
	"kanan.osaka.jp",
	"kashiwara.osaka.jp",
	"katano.osaka.jp",
	"kawachinagano.osaka.jp",
	"kishiwada.osaka.jp",
	"kita.osaka.jp",
	"kumatori.osaka.jp",
	"matsubara.osaka.jp",
	"minato.osaka.jp",
	"minoh.osaka.jp",
	"misaki.osaka.jp",
	"moriguchi.osaka.jp",
	"neyagawa.osaka.jp",
	"nishi.osaka.jp",
	"nose.osaka.jp",
	"osakasayama.osaka.jp",
	"sakai.osaka.jp",
	"sayama.osaka.jp",
	"sennan.osaka.jp",
	"settsu.osaka.jp",
	"shijonawate.osaka.jp",
	"shimamoto.osaka.jp",
	"suita.osaka.jp",
	"tadaoka.osaka.jp",
	"taishi.osaka.jp",
	"tajiri.osaka.jp",
	"takaishi.osaka.jp",
	"takatsuki.osaka.jp",
	"tondabayashi.osaka.jp",
	"toyonaka.osaka.jp",
	"toyono.osaka.jp",
	"yao.osaka.jp",
	"ariake.saga.jp",
	"arita.saga.jp",
	"fukudomi.saga.jp",
	"genkai.saga.jp",
	"hamatama.saga.jp",
	"hizen.saga.jp",
	"imari.saga.jp",
	"kamimine.saga.jp",
	"kanzaki.saga.jp",
	"karatsu.saga.jp",
	"kashima.saga.jp",
	"kitagata.saga.jp",
	"kitahata.saga.jp",
	"kiyama.saga.jp",
	"kouhoku.saga.jp",
	"kyuragi.saga.jp",
	"nishiarita.saga.jp",
	"ogi.saga.jp",
	"omachi.saga.jp",
	"ouchi.saga.jp",
	"saga.saga.jp",
	"shiroishi.saga.jp",
	"taku.saga.jp",
	"tara.saga.jp",
	"tosu.saga.jp",
	"yoshinogari.saga.jp",
	"arakawa.saitama.jp",
	"asaka.saitama.jp",
	"chichibu.saitama.jp",
	"fujimi.saitama.jp",
	"fujimino.saitama.jp",
	"fukaya.saitama.jp",
	"hanno.saitama.jp",
	"hanyu.saitama.jp",
	"hasuda.saitama.jp",
	"hatogaya.saitama.jp",
	"hatoyama.saitama.jp",
	"hidaka.saitama.jp",
	"higashichichibu.saitama.jp",
	"higashimatsuyama.saitama.jp",
	"honjo.saitama.jp",
	"ina.saitama.jp",
	"iruma.saitama.jp",
	"iwatsuki.saitama.jp",
	"kamiizumi.saitama.jp",
	"kamikawa.saitama.jp",
	"kamisato.saitama.jp",
	"kasukabe.saitama.jp",
	"kawagoe.saitama.jp",
	"kawaguchi.saitama.jp",
	"kawajima.saitama.jp",
	"kazo.saitama.jp",
	"kitamoto.saitama.jp",
	"koshigaya.saitama.jp",
	"kounosu.saitama.jp",
	"kuki.saitama.jp",
	"kumagaya.saitama.jp",
	"matsubushi.saitama.jp",
	"minano.saitama.jp",
	"misato.saitama.jp",
	"miyashiro.saitama.jp",
	"miyoshi.saitama.jp",
	"moroyama.saitama.jp",
	"nagatoro.saitama.jp",
	"namegawa.saitama.jp",
	"niiza.saitama.jp",
	"ogano.saitama.jp",
	"ogawa.saitama.jp",
	"ogose.saitama.jp",
	"okegawa.saitama.jp",
	"omiya.saitama.jp",
	"otaki.saitama.jp",
	"ranzan.saitama.jp",
	"ryokami.saitama.jp",
	"saitama.saitama.jp",
	"sakado.saitama.jp",
	"satte.saitama.jp",
	"sayama.saitama.jp",
	"shiki.saitama.jp",
	"shiraoka.saitama.jp",
	"soka.saitama.jp",
	"sugito.saitama.jp",
	"toda.saitama.jp",
	"tokigawa.saitama.jp",
	"tokorozawa.saitama.jp",
	"tsurugashima.saitama.jp",
	"urawa.saitama.jp",
	"warabi.saitama.jp",
	"yashio.saitama.jp",
	"yokoze.saitama.jp",
	"yono.saitama.jp",
	"yorii.saitama.jp",
	"yoshida.saitama.jp",
	"yoshikawa.saitama.jp",
	"yoshimi.saitama.jp",
	"aisho.shiga.jp",
	"gamo.shiga.jp",
	"higashiomi.shiga.jp",
	"hikone.shiga.jp",
	"koka.shiga.jp",
	"konan.shiga.jp",
	"kosei.shiga.jp",
	"koto.shiga.jp",
	"kusatsu.shiga.jp",
	"maibara.shiga.jp",
	"moriyama.shiga.jp",
	"nagahama.shiga.jp",
	"nishiazai.shiga.jp",
	"notogawa.shiga.jp",
	"omihachiman.shiga.jp",
	"otsu.shiga.jp",
	"ritto.shiga.jp",
	"ryuoh.shiga.jp",
	"takashima.shiga.jp",
	"takatsuki.shiga.jp",
	"torahime.shiga.jp",
	"toyosato.shiga.jp",
	"yasu.shiga.jp",
	"akagi.shimane.jp",
	"ama.shimane.jp",
	"gotsu.shimane.jp",
	"hamada.shimane.jp",
	"higashiizumo.shimane.jp",
	"hikawa.shimane.jp",
	"hikimi.shimane.jp",
	"izumo.shimane.jp",
	"kakinoki.shimane.jp",
	"masuda.shimane.jp",
	"matsue.shimane.jp",
	"misato.shimane.jp",
	"nishinoshima.shimane.jp",
	"ohda.shimane.jp",
	"okinoshima.shimane.jp",
	"okuizumo.shimane.jp",
	"shimane.shimane.jp",
	"tamayu.shimane.jp",
	"tsuwano.shimane.jp",
	"unnan.shimane.jp",
	"yakumo.shimane.jp",
	"yasugi.shimane.jp",
	"yatsuka.shimane.jp",
	"arai.shizuoka.jp",
	"atami.shizuoka.jp",
	"fuji.shizuoka.jp",
	"fujieda.shizuoka.jp",
	"fujikawa.shizuoka.jp",
	"fujinomiya.shizuoka.jp",
	"fukuroi.shizuoka.jp",
	"gotemba.shizuoka.jp",
	"haibara.shizuoka.jp",
	"hamamatsu.shizuoka.jp",
	"higashiizu.shizuoka.jp",
	"ito.shizuoka.jp",
	"iwata.shizuoka.jp",
	"izu.shizuoka.jp",
	"izunokuni.shizuoka.jp",
	"kakegawa.shizuoka.jp",
	"kannami.shizuoka.jp",
	"kawanehon.shizuoka.jp",
	"kawazu.shizuoka.jp",
	"kikugawa.shizuoka.jp",
	"kosai.shizuoka.jp",
	"makinohara.shizuoka.jp",
	"matsuzaki.shizuoka.jp",
	"minamiizu.shizuoka.jp",
	"mishima.shizuoka.jp",
	"morimachi.shizuoka.jp",
	"nishiizu.shizuoka.jp",
	"numazu.shizuoka.jp",
	"omaezaki.shizuoka.jp",
	"shimada.shizuoka.jp",
	"shimizu.shizuoka.jp",
	"shimoda.shizuoka.jp",
	"shizuoka.shizuoka.jp",
	"susono.shizuoka.jp",
	"yaizu.shizuoka.jp",
	"yoshida.shizuoka.jp",
	"ashikaga.tochigi.jp",
	"bato.tochigi.jp",
	"haga.tochigi.jp",
	"ichikai.tochigi.jp",
	"iwafune.tochigi.jp",
	"kaminokawa.tochigi.jp",
	"kanuma.tochigi.jp",
	"karasuyama.tochigi.jp",
	"kuroiso.tochigi.jp",
	"mashiko.tochigi.jp",
	"mibu.tochigi.jp",
	"moka.tochigi.jp",
	"motegi.tochigi.jp",
	"nasu.tochigi.jp",
	"nasushiobara.tochigi.jp",
	"nikko.tochigi.jp",
	"nishikata.tochigi.jp",
	"nogi.tochigi.jp",
	"ohira.tochigi.jp",
	"ohtawara.tochigi.jp",
	"oyama.tochigi.jp",
	"sakura.tochigi.jp",
	"sano.tochigi.jp",
	"shimotsuke.tochigi.jp",
	"shioya.tochigi.jp",
	"takanezawa.tochigi.jp",
	"tochigi.tochigi.jp",
	"tsuga.tochigi.jp",
	"ujiie.tochigi.jp",
	"utsunomiya.tochigi.jp",
	"yaita.tochigi.jp",
	"aizumi.tokushima.jp",
	"anan.tokushima.jp",
	"ichiba.tokushima.jp",
	"itano.tokushima.jp",
	"kainan.tokushima.jp",
	"komatsushima.tokushima.jp",
	"matsushige.tokushima.jp",
	"mima.tokushima.jp",
	"minami.tokushima.jp",
	"miyoshi.tokushima.jp",
	"mugi.tokushima.jp",
	"nakagawa.tokushima.jp",
	"naruto.tokushima.jp",
	"sanagochi.tokushima.jp",
	"shishikui.tokushima.jp",
	"tokushima.tokushima.jp",
	"wajiki.tokushima.jp",
	"adachi.tokyo.jp",
	"akiruno.tokyo.jp",
	"akishima.tokyo.jp",
	"aogashima.tokyo.jp",
	"arakawa.tokyo.jp",
	"bunkyo.tokyo.jp",
	"chiyoda.tokyo.jp",
	"chofu.tokyo.jp",
	"chuo.tokyo.jp",
	"edogawa.tokyo.jp",
	"fuchu.tokyo.jp",
	"fussa.tokyo.jp",
	"hachijo.tokyo.jp",
	"hachioji.tokyo.jp",
	"hamura.tokyo.jp",
	"higashikurume.tokyo.jp",
	"higashimurayama.tokyo.jp",
	"higashiyamato.tokyo.jp",
	"hino.tokyo.jp",
	"hinode.tokyo.jp",
	"hinohara.tokyo.jp",
	"inagi.tokyo.jp",
	"itabashi.tokyo.jp",
	"katsushika.tokyo.jp",
	"kita.tokyo.jp",
	"kiyose.tokyo.jp",
	"kodaira.tokyo.jp",
	"koganei.tokyo.jp",
	"kokubunji.tokyo.jp",
	"komae.tokyo.jp",
	"koto.tokyo.jp",
	"kouzushima.tokyo.jp",
	"kunitachi.tokyo.jp",
	"machida.tokyo.jp",
	"meguro.tokyo.jp",
	"minato.tokyo.jp",
	"mitaka.tokyo.jp",
	"mizuho.tokyo.jp",
	"musashimurayama.tokyo.jp",
	"musashino.tokyo.jp",
	"nakano.tokyo.jp",
	"nerima.tokyo.jp",
	"ogasawara.tokyo.jp",
	"okutama.tokyo.jp",
	"ome.tokyo.jp",
	"oshima.tokyo.jp",
	"ota.tokyo.jp",
	"setagaya.tokyo.jp",
	"shibuya.tokyo.jp",
	"shinagawa.tokyo.jp",
	"shinjuku.tokyo.jp",
	"suginami.tokyo.jp",
	"sumida.tokyo.jp",
	"tachikawa.tokyo.jp",
	"taito.tokyo.jp",
	"tama.tokyo.jp",
	"toshima.tokyo.jp",
	"chizu.tottori.jp",
	"hino.tottori.jp",
	"kawahara.tottori.jp",
	"koge.tottori.jp",
	"kotoura.tottori.jp",
	"misasa.tottori.jp",
	"nanbu.tottori.jp",
	"nichinan.tottori.jp",
	"sakaiminato.tottori.jp",
	"tottori.tottori.jp",
	"wakasa.tottori.jp",
	"yazu.tottori.jp",
	"yonago.tottori.jp",
	"asahi.toyama.jp",
	"fuchu.toyama.jp",
	"fukumitsu.toyama.jp",
	"funahashi.toyama.jp",
	"himi.toyama.jp",
	"imizu.toyama.jp",
	"inami.toyama.jp",
	"johana.toyama.jp",
	"kamiichi.toyama.jp",
	"kurobe.toyama.jp",
	"nakaniikawa.toyama.jp",
	"namerikawa.toyama.jp",
	"nanto.toyama.jp",
	"nyuzen.toyama.jp",
	"oyabe.toyama.jp",
	"taira.toyama.jp",
	"takaoka.toyama.jp",
	"tateyama.toyama.jp",
	"toga.toyama.jp",
	"tonami.toyama.jp",
	"toyama.toyama.jp",
	"unazuki.toyama.jp",
	"uozu.toyama.jp",
	"yamada.toyama.jp",
	"arida.wakayama.jp",
	"aridagawa.wakayama.jp",
	"gobo.wakayama.jp",
	"hashimoto.wakayama.jp",
	"hidaka.wakayama.jp",
	"hirogawa.wakayama.jp",
	"inami.wakayama.jp",
	"iwade.wakayama.jp",
	"kainan.wakayama.jp",
	"kamitonda.wakayama.jp",
	"katsuragi.wakayama.jp",
	"kimino.wakayama.jp",
	"kinokawa.wakayama.jp",
	"kitayama.wakayama.jp",
	"koya.wakayama.jp",
	"koza.wakayama.jp",
	"kozagawa.wakayama.jp",
	"kudoyama.wakayama.jp",
	"kushimoto.wakayama.jp",
	"mihama.wakayama.jp",
	"misato.wakayama.jp",
	"nachikatsuura.wakayama.jp",
	"shingu.wakayama.jp",
	"shirahama.wakayama.jp",
	"taiji.wakayama.jp",
	"tanabe.wakayama.jp",
	"wakayama.wakayama.jp",
	"yuasa.wakayama.jp",
	"yura.wakayama.jp",
	"asahi.yamagata.jp",
	"funagata.yamagata.jp",
	"higashine.yamagata.jp",
	"iide.yamagata.jp",
	"kahoku.yamagata.jp",
	"kaminoyama.yamagata.jp",
	"kaneyama.yamagata.jp",
	"kawanishi.yamagata.jp",
	"mamurogawa.yamagata.jp",
	"mikawa.yamagata.jp",
	"murayama.yamagata.jp",
	"nagai.yamagata.jp",
	"nakayama.yamagata.jp",
	"nanyo.yamagata.jp",
	"nishikawa.yamagata.jp",
	"obanazawa.yamagata.jp",
	"oe.yamagata.jp",
	"oguni.yamagata.jp",
	"ohkura.yamagata.jp",
	"oishida.yamagata.jp",
	"sagae.yamagata.jp",
	"sakata.yamagata.jp",
	"sakegawa.yamagata.jp",
	"shinjo.yamagata.jp",
	"shirataka.yamagata.jp",
	"shonai.yamagata.jp",
	"takahata.yamagata.jp",
	"tendo.yamagata.jp",
	"tozawa.yamagata.jp",
	"tsuruoka.yamagata.jp",
	"yamagata.yamagata.jp",
	"yamanobe.yamagata.jp",
	"yonezawa.yamagata.jp",
	"yuza.yamagata.jp",
	"abu.yamaguchi.jp",
	"hagi.yamaguchi.jp",
	"hikari.yamaguchi.jp",
	"hofu.yamaguchi.jp",
	"iwakuni.yamaguchi.jp",
	"kudamatsu.yamaguchi.jp",
	"mitou.yamaguchi.jp",
	"nagato.yamaguchi.jp",
	"oshima.yamaguchi.jp",
	"shimonoseki.yamaguchi.jp",
	"shunan.yamaguchi.jp",
	"tabuse.yamaguchi.jp",
	"tokuyama.yamaguchi.jp",
	"toyota.yamaguchi.jp",
	"ube.yamaguchi.jp",
	"yuu.yamaguchi.jp",
	"chuo.yamanashi.jp",
	"doshi.yamanashi.jp",
	"fuefuki.yamanashi.jp",
	"fujikawa.yamanashi.jp",
	"fujikawaguchiko.yamanashi.jp",
	"fujiyoshida.yamanashi.jp",
	"hayakawa.yamanashi.jp",
	"hokuto.yamanashi.jp",
	"ichikawamisato.yamanashi.jp",
	"kai.yamanashi.jp",
	"kofu.yamanashi.jp",
	"koshu.yamanashi.jp",
	"kosuge.yamanashi.jp",
	"minami-alps.yamanashi.jp",
	"minobu.yamanashi.jp",
	"nakamichi.yamanashi.jp",
	"nanbu.yamanashi.jp",
	"narusawa.yamanashi.jp",
	"nirasaki.yamanashi.jp",
	"nishikatsura.yamanashi.jp",
	"oshino.yamanashi.jp",
	"otsuki.yamanashi.jp",
	"showa.yamanashi.jp",
	"tabayama.yamanashi.jp",
	"tsuru.yamanashi.jp",
	"uenohara.yamanashi.jp",
	"yamanakako.yamanashi.jp",
	"yamanashi.yamanashi.jp",
	"ke",
	"ac.ke",
	"co.ke",
	"go.ke",
	"info.ke",
	"me.ke",
	"mobi.ke",
	"ne.ke",
	"or.ke",
	"sc.ke",
	"kg",
	"org.kg",
	"net.kg",
	"com.kg",
	"edu.kg",
	"gov.kg",
	"mil.kg",
	"*.kh",
	"ki",
	"edu.ki",
	"biz.ki",
	"net.ki",
	"org.ki",
	"gov.ki",
	"info.ki",
	"com.ki",
	"km",
	"org.km",
	"nom.km",
	"gov.km",
	"prd.km",
	"tm.km",
	"edu.km",
	"mil.km",
	"ass.km",
	"com.km",
	"coop.km",
	"asso.km",
	"presse.km",
	"medecin.km",
	"notaires.km",
	"pharmaciens.km",
	"veterinaire.km",
	"gouv.km",
	"kn",
	"net.kn",
	"org.kn",
	"edu.kn",
	"gov.kn",
	"kp",
	"com.kp",
	"edu.kp",
	"gov.kp",
	"org.kp",
	"rep.kp",
	"tra.kp",
	"kr",
	"ac.kr",
	"co.kr",
	"es.kr",
	"go.kr",
	"hs.kr",
	"kg.kr",
	"mil.kr",
	"ms.kr",
	"ne.kr",
	"or.kr",
	"pe.kr",
	"re.kr",
	"sc.kr",
	"busan.kr",
	"chungbuk.kr",
	"chungnam.kr",
	"daegu.kr",
	"daejeon.kr",
	"gangwon.kr",
	"gwangju.kr",
	"gyeongbuk.kr",
	"gyeonggi.kr",
	"gyeongnam.kr",
	"incheon.kr",
	"jeju.kr",
	"jeonbuk.kr",
	"jeonnam.kr",
	"seoul.kr",
	"ulsan.kr",
	"kw",
	"com.kw",
	"edu.kw",
	"emb.kw",
	"gov.kw",
	"ind.kw",
	"net.kw",
	"org.kw",
	"ky",
	"com.ky",
	"edu.ky",
	"net.ky",
	"org.ky",
	"kz",
	"org.kz",
	"edu.kz",
	"net.kz",
	"gov.kz",
	"mil.kz",
	"com.kz",
	"la",
	"int.la",
	"net.la",
	"info.la",
	"edu.la",
	"gov.la",
	"per.la",
	"com.la",
	"org.la",
	"lb",
	"com.lb",
	"edu.lb",
	"gov.lb",
	"net.lb",
	"org.lb",
	"lc",
	"com.lc",
	"net.lc",
	"co.lc",
	"org.lc",
	"edu.lc",
	"gov.lc",
	"li",
	"lk",
	"gov.lk",
	"sch.lk",
	"net.lk",
	"int.lk",
	"com.lk",
	"org.lk",
	"edu.lk",
	"ngo.lk",
	"soc.lk",
	"web.lk",
	"ltd.lk",
	"assn.lk",
	"grp.lk",
	"hotel.lk",
	"ac.lk",
	"lr",
	"com.lr",
	"edu.lr",
	"gov.lr",
	"org.lr",
	"net.lr",
	"ls",
	"ac.ls",
	"biz.ls",
	"co.ls",
	"edu.ls",
	"gov.ls",
	"info.ls",
	"net.ls",
	"org.ls",
	"sc.ls",
	"lt",
	"gov.lt",
	"lu",
	"lv",
	"com.lv",
	"edu.lv",
	"gov.lv",
	"org.lv",
	"mil.lv",
	"id.lv",
	"net.lv",
	"asn.lv",
	"conf.lv",
	"ly",
	"com.ly",
	"net.ly",
	"gov.ly",
	"plc.ly",
	"edu.ly",
	"sch.ly",
	"med.ly",
	"org.ly",
	"id.ly",
	"ma",
	"co.ma",
	"net.ma",
	"gov.ma",
	"org.ma",
	"ac.ma",
	"press.ma",
	"mc",
	"tm.mc",
	"asso.mc",
	"md",
	"me",
	"co.me",
	"net.me",
	"org.me",
	"edu.me",
	"ac.me",
	"gov.me",
	"its.me",
	"priv.me",
	"mg",
	"org.mg",
	"nom.mg",
	"gov.mg",
	"prd.mg",
	"tm.mg",
	"edu.mg",
	"mil.mg",
	"com.mg",
	"co.mg",
	"mh",
	"mil",
	"mk",
	"com.mk",
	"org.mk",
	"net.mk",
	"edu.mk",
	"gov.mk",
	"inf.mk",
	"name.mk",
	"ml",
	"com.ml",
	"edu.ml",
	"gouv.ml",
	"gov.ml",
	"net.ml",
	"org.ml",
	"presse.ml",
	"*.mm",
	"mn",
	"gov.mn",
	"edu.mn",
	"org.mn",
	"mo",
	"com.mo",
	"net.mo",
	"org.mo",
	"edu.mo",
	"gov.mo",
	"mobi",
	"mp",
	"mq",
	"mr",
	"gov.mr",
	"ms",
	"com.ms",
	"edu.ms",
	"gov.ms",
	"net.ms",
	"org.ms",
	"mt",
	"com.mt",
	"edu.mt",
	"net.mt",
	"org.mt",
	"mu",
	"com.mu",
	"net.mu",
	"org.mu",
	"gov.mu",
	"ac.mu",
	"co.mu",
	"or.mu",
	"museum",
	"academy.museum",
	"agriculture.museum",
	"air.museum",
	"airguard.museum",
	"alabama.museum",
	"alaska.museum",
	"amber.museum",
	"ambulance.museum",
	"american.museum",
	"americana.museum",
	"americanantiques.museum",
	"americanart.museum",
	"amsterdam.museum",
	"and.museum",
	"annefrank.museum",
	"anthro.museum",
	"anthropology.museum",
	"antiques.museum",
	"aquarium.museum",
	"arboretum.museum",
	"archaeological.museum",
	"archaeology.museum",
	"architecture.museum",
	"art.museum",
	"artanddesign.museum",
	"artcenter.museum",
	"artdeco.museum",
	"arteducation.museum",
	"artgallery.museum",
	"arts.museum",
	"artsandcrafts.museum",
	"asmatart.museum",
	"assassination.museum",
	"assisi.museum",
	"association.museum",
	"astronomy.museum",
	"atlanta.museum",
	"austin.museum",
	"australia.museum",
	"automotive.museum",
	"aviation.museum",
	"axis.museum",
	"badajoz.museum",
	"baghdad.museum",
	"bahn.museum",
	"bale.museum",
	"baltimore.museum",
	"barcelona.museum",
	"baseball.museum",
	"basel.museum",
	"baths.museum",
	"bauern.museum",
	"beauxarts.museum",
	"beeldengeluid.museum",
	"bellevue.museum",
	"bergbau.museum",
	"berkeley.museum",
	"berlin.museum",
	"bern.museum",
	"bible.museum",
	"bilbao.museum",
	"bill.museum",
	"birdart.museum",
	"birthplace.museum",
	"bonn.museum",
	"boston.museum",
	"botanical.museum",
	"botanicalgarden.museum",
	"botanicgarden.museum",
	"botany.museum",
	"brandywinevalley.museum",
	"brasil.museum",
	"bristol.museum",
	"british.museum",
	"britishcolumbia.museum",
	"broadcast.museum",
	"brunel.museum",
	"brussel.museum",
	"brussels.museum",
	"bruxelles.museum",
	"building.museum",
	"burghof.museum",
	"bus.museum",
	"bushey.museum",
	"cadaques.museum",
	"california.museum",
	"cambridge.museum",
	"can.museum",
	"canada.museum",
	"capebreton.museum",
	"carrier.museum",
	"cartoonart.museum",
	"casadelamoneda.museum",
	"castle.museum",
	"castres.museum",
	"celtic.museum",
	"center.museum",
	"chattanooga.museum",
	"cheltenham.museum",
	"chesapeakebay.museum",
	"chicago.museum",
	"children.museum",
	"childrens.museum",
	"childrensgarden.museum",
	"chiropractic.museum",
	"chocolate.museum",
	"christiansburg.museum",
	"cincinnati.museum",
	"cinema.museum",
	"circus.museum",
	"civilisation.museum",
	"civilization.museum",
	"civilwar.museum",
	"clinton.museum",
	"clock.museum",
	"coal.museum",
	"coastaldefence.museum",
	"cody.museum",
	"coldwar.museum",
	"collection.museum",
	"colonialwilliamsburg.museum",
	"coloradoplateau.museum",
	"columbia.museum",
	"columbus.museum",
	"communication.museum",
	"communications.museum",
	"community.museum",
	"computer.museum",
	"computerhistory.museum",
	"comunicações.museum",
	"contemporary.museum",
	"contemporaryart.museum",
	"convent.museum",
	"copenhagen.museum",
	"corporation.museum",
	"correios-e-telecomunicações.museum",
	"corvette.museum",
	"costume.museum",
	"countryestate.museum",
	"county.museum",
	"crafts.museum",
	"cranbrook.museum",
	"creation.museum",
	"cultural.museum",
	"culturalcenter.museum",
	"culture.museum",
	"cyber.museum",
	"cymru.museum",
	"dali.museum",
	"dallas.museum",
	"database.museum",
	"ddr.museum",
	"decorativearts.museum",
	"delaware.museum",
	"delmenhorst.museum",
	"denmark.museum",
	"depot.museum",
	"design.museum",
	"detroit.museum",
	"dinosaur.museum",
	"discovery.museum",
	"dolls.museum",
	"donostia.museum",
	"durham.museum",
	"eastafrica.museum",
	"eastcoast.museum",
	"education.museum",
	"educational.museum",
	"egyptian.museum",
	"eisenbahn.museum",
	"elburg.museum",
	"elvendrell.museum",
	"embroidery.museum",
	"encyclopedic.museum",
	"england.museum",
	"entomology.museum",
	"environment.museum",
	"environmentalconservation.museum",
	"epilepsy.museum",
	"essex.museum",
	"estate.museum",
	"ethnology.museum",
	"exeter.museum",
	"exhibition.museum",
	"family.museum",
	"farm.museum",
	"farmequipment.museum",
	"farmers.museum",
	"farmstead.museum",
	"field.museum",
	"figueres.museum",
	"filatelia.museum",
	"film.museum",
	"fineart.museum",
	"finearts.museum",
	"finland.museum",
	"flanders.museum",
	"florida.museum",
	"force.museum",
	"fortmissoula.museum",
	"fortworth.museum",
	"foundation.museum",
	"francaise.museum",
	"frankfurt.museum",
	"franziskaner.museum",
	"freemasonry.museum",
	"freiburg.museum",
	"fribourg.museum",
	"frog.museum",
	"fundacio.museum",
	"furniture.museum",
	"gallery.museum",
	"garden.museum",
	"gateway.museum",
	"geelvinck.museum",
	"gemological.museum",
	"geology.museum",
	"georgia.museum",
	"giessen.museum",
	"glas.museum",
	"glass.museum",
	"gorge.museum",
	"grandrapids.museum",
	"graz.museum",
	"guernsey.museum",
	"halloffame.museum",
	"hamburg.museum",
	"handson.museum",
	"harvestcelebration.museum",
	"hawaii.museum",
	"health.museum",
	"heimatunduhren.museum",
	"hellas.museum",
	"helsinki.museum",
	"hembygdsforbund.museum",
	"heritage.museum",
	"histoire.museum",
	"historical.museum",
	"historicalsociety.museum",
	"historichouses.museum",
	"historisch.museum",
	"historisches.museum",
	"history.museum",
	"historyofscience.museum",
	"horology.museum",
	"house.museum",
	"humanities.museum",
	"illustration.museum",
	"imageandsound.museum",
	"indian.museum",
	"indiana.museum",
	"indianapolis.museum",
	"indianmarket.museum",
	"intelligence.museum",
	"interactive.museum",
	"iraq.museum",
	"iron.museum",
	"isleofman.museum",
	"jamison.museum",
	"jefferson.museum",
	"jerusalem.museum",
	"jewelry.museum",
	"jewish.museum",
	"jewishart.museum",
	"jfk.museum",
	"journalism.museum",
	"judaica.museum",
	"judygarland.museum",
	"juedisches.museum",
	"juif.museum",
	"karate.museum",
	"karikatur.museum",
	"kids.museum",
	"koebenhavn.museum",
	"koeln.museum",
	"kunst.museum",
	"kunstsammlung.museum",
	"kunstunddesign.museum",
	"labor.museum",
	"labour.museum",
	"lajolla.museum",
	"lancashire.museum",
	"landes.museum",
	"lans.museum",
	"läns.museum",
	"larsson.museum",
	"lewismiller.museum",
	"lincoln.museum",
	"linz.museum",
	"living.museum",
	"livinghistory.museum",
	"localhistory.museum",
	"london.museum",
	"losangeles.museum",
	"louvre.museum",
	"loyalist.museum",
	"lucerne.museum",
	"luxembourg.museum",
	"luzern.museum",
	"mad.museum",
	"madrid.museum",
	"mallorca.museum",
	"manchester.museum",
	"mansion.museum",
	"mansions.museum",
	"manx.museum",
	"marburg.museum",
	"maritime.museum",
	"maritimo.museum",
	"maryland.museum",
	"marylhurst.museum",
	"media.museum",
	"medical.museum",
	"medizinhistorisches.museum",
	"meeres.museum",
	"memorial.museum",
	"mesaverde.museum",
	"michigan.museum",
	"midatlantic.museum",
	"military.museum",
	"mill.museum",
	"miners.museum",
	"mining.museum",
	"minnesota.museum",
	"missile.museum",
	"missoula.museum",
	"modern.museum",
	"moma.museum",
	"money.museum",
	"monmouth.museum",
	"monticello.museum",
	"montreal.museum",
	"moscow.museum",
	"motorcycle.museum",
	"muenchen.museum",
	"muenster.museum",
	"mulhouse.museum",
	"muncie.museum",
	"museet.museum",
	"museumcenter.museum",
	"museumvereniging.museum",
	"music.museum",
	"national.museum",
	"nationalfirearms.museum",
	"nationalheritage.museum",
	"nativeamerican.museum",
	"naturalhistory.museum",
	"naturalhistorymuseum.museum",
	"naturalsciences.museum",
	"nature.museum",
	"naturhistorisches.museum",
	"natuurwetenschappen.museum",
	"naumburg.museum",
	"naval.museum",
	"nebraska.museum",
	"neues.museum",
	"newhampshire.museum",
	"newjersey.museum",
	"newmexico.museum",
	"newport.museum",
	"newspaper.museum",
	"newyork.museum",
	"niepce.museum",
	"norfolk.museum",
	"north.museum",
	"nrw.museum",
	"nyc.museum",
	"nyny.museum",
	"oceanographic.museum",
	"oceanographique.museum",
	"omaha.museum",
	"online.museum",
	"ontario.museum",
	"openair.museum",
	"oregon.museum",
	"oregontrail.museum",
	"otago.museum",
	"oxford.museum",
	"pacific.museum",
	"paderborn.museum",
	"palace.museum",
	"paleo.museum",
	"palmsprings.museum",
	"panama.museum",
	"paris.museum",
	"pasadena.museum",
	"pharmacy.museum",
	"philadelphia.museum",
	"philadelphiaarea.museum",
	"philately.museum",
	"phoenix.museum",
	"photography.museum",
	"pilots.museum",
	"pittsburgh.museum",
	"planetarium.museum",
	"plantation.museum",
	"plants.museum",
	"plaza.museum",
	"portal.museum",
	"portland.museum",
	"portlligat.museum",
	"posts-and-telecommunications.museum",
	"preservation.museum",
	"presidio.museum",
	"press.museum",
	"project.museum",
	"public.museum",
	"pubol.museum",
	"quebec.museum",
	"railroad.museum",
	"railway.museum",
	"research.museum",
	"resistance.museum",
	"riodejaneiro.museum",
	"rochester.museum",
	"rockart.museum",
	"roma.museum",
	"russia.museum",
	"saintlouis.museum",
	"salem.museum",
	"salvadordali.museum",
	"salzburg.museum",
	"sandiego.museum",
	"sanfrancisco.museum",
	"santabarbara.museum",
	"santacruz.museum",
	"santafe.museum",
	"saskatchewan.museum",
	"satx.museum",
	"savannahga.museum",
	"schlesisches.museum",
	"schoenbrunn.museum",
	"schokoladen.museum",
	"school.museum",
	"schweiz.museum",
	"science.museum",
	"scienceandhistory.museum",
	"scienceandindustry.museum",
	"sciencecenter.museum",
	"sciencecenters.museum",
	"science-fiction.museum",
	"sciencehistory.museum",
	"sciences.museum",
	"sciencesnaturelles.museum",
	"scotland.museum",
	"seaport.museum",
	"settlement.museum",
	"settlers.museum",
	"shell.museum",
	"sherbrooke.museum",
	"sibenik.museum",
	"silk.museum",
	"ski.museum",
	"skole.museum",
	"society.museum",
	"sologne.museum",
	"soundandvision.museum",
	"southcarolina.museum",
	"southwest.museum",
	"space.museum",
	"spy.museum",
	"square.museum",
	"stadt.museum",
	"stalbans.museum",
	"starnberg.museum",
	"state.museum",
	"stateofdelaware.museum",
	"station.museum",
	"steam.museum",
	"steiermark.museum",
	"stjohn.museum",
	"stockholm.museum",
	"stpetersburg.museum",
	"stuttgart.museum",
	"suisse.museum",
	"surgeonshall.museum",
	"surrey.museum",
	"svizzera.museum",
	"sweden.museum",
	"sydney.museum",
	"tank.museum",
	"tcm.museum",
	"technology.museum",
	"telekommunikation.museum",
	"television.museum",
	"texas.museum",
	"textile.museum",
	"theater.museum",
	"time.museum",
	"timekeeping.museum",
	"topology.museum",
	"torino.museum",
	"touch.museum",
	"town.museum",
	"transport.museum",
	"tree.museum",
	"trolley.museum",
	"trust.museum",
	"trustee.museum",
	"uhren.museum",
	"ulm.museum",
	"undersea.museum",
	"university.museum",
	"usa.museum",
	"usantiques.museum",
	"usarts.museum",
	"uscountryestate.museum",
	"usculture.museum",
	"usdecorativearts.museum",
	"usgarden.museum",
	"ushistory.museum",
	"ushuaia.museum",
	"uslivinghistory.museum",
	"utah.museum",
	"uvic.museum",
	"valley.museum",
	"vantaa.museum",
	"versailles.museum",
	"viking.museum",
	"village.museum",
	"virginia.museum",
	"virtual.museum",
	"virtuel.museum",
	"vlaanderen.museum",
	"volkenkunde.museum",
	"wales.museum",
	"wallonie.museum",
	"war.museum",
	"washingtondc.museum",
	"watchandclock.museum",
	"watch-and-clock.museum",
	"western.museum",
	"westfalen.museum",
	"whaling.museum",
	"wildlife.museum",
	"williamsburg.museum",
	"windmill.museum",
	"workshop.museum",
	"york.museum",
	"yorkshire.museum",
	"yosemite.museum",
	"youth.museum",
	"zoological.museum",
	"zoology.museum",
	"ירושלים.museum",
	"иком.museum",
	"mv",
	"aero.mv",
	"biz.mv",
	"com.mv",
	"coop.mv",
	"edu.mv",
	"gov.mv",
	"info.mv",
	"int.mv",
	"mil.mv",
	"museum.mv",
	"name.mv",
	"net.mv",
	"org.mv",
	"pro.mv",
	"mw",
	"ac.mw",
	"biz.mw",
	"co.mw",
	"com.mw",
	"coop.mw",
	"edu.mw",
	"gov.mw",
	"int.mw",
	"museum.mw",
	"net.mw",
	"org.mw",
	"mx",
	"com.mx",
	"org.mx",
	"gob.mx",
	"edu.mx",
	"net.mx",
	"my",
	"biz.my",
	"com.my",
	"edu.my",
	"gov.my",
	"mil.my",
	"name.my",
	"net.my",
	"org.my",
	"mz",
	"ac.mz",
	"adv.mz",
	"co.mz",
	"edu.mz",
	"gov.mz",
	"mil.mz",
	"net.mz",
	"org.mz",
	"na",
	"info.na",
	"pro.na",
	"name.na",
	"school.na",
	"or.na",
	"dr.na",
	"us.na",
	"mx.na",
	"ca.na",
	"in.na",
	"cc.na",
	"tv.na",
	"ws.na",
	"mobi.na",
	"co.na",
	"com.na",
	"org.na",
	"name",
	"nc",
	"asso.nc",
	"nom.nc",
	"ne",
	"net",
	"nf",
	"com.nf",
	"net.nf",
	"per.nf",
	"rec.nf",
	"web.nf",
	"arts.nf",
	"firm.nf",
	"info.nf",
	"other.nf",
	"store.nf",
	"ng",
	"com.ng",
	"edu.ng",
	"gov.ng",
	"i.ng",
	"mil.ng",
	"mobi.ng",
	"name.ng",
	"net.ng",
	"org.ng",
	"sch.ng",
	"ni",
	"ac.ni",
	"biz.ni",
	"co.ni",
	"com.ni",
	"edu.ni",
	"gob.ni",
	"in.ni",
	"info.ni",
	"int.ni",
	"mil.ni",
	"net.ni",
	"nom.ni",
	"org.ni",
	"web.ni",
	"nl",
	"no",
	"fhs.no",
	"vgs.no",
	"fylkesbibl.no",
	"folkebibl.no",
	"museum.no",
	"idrett.no",
	"priv.no",
	"mil.no",
	"stat.no",
	"dep.no",
	"kommune.no",
	"herad.no",
	"aa.no",
	"ah.no",
	"bu.no",
	"fm.no",
	"hl.no",
	"hm.no",
	"jan-mayen.no",
	"mr.no",
	"nl.no",
	"nt.no",
	"of.no",
	"ol.no",
	"oslo.no",
	"rl.no",
	"sf.no",
	"st.no",
	"svalbard.no",
	"tm.no",
	"tr.no",
	"va.no",
	"vf.no",
	"gs.aa.no",
	"gs.ah.no",
	"gs.bu.no",
	"gs.fm.no",
	"gs.hl.no",
	"gs.hm.no",
	"gs.jan-mayen.no",
	"gs.mr.no",
	"gs.nl.no",
	"gs.nt.no",
	"gs.of.no",
	"gs.ol.no",
	"gs.oslo.no",
	"gs.rl.no",
	"gs.sf.no",
	"gs.st.no",
	"gs.svalbard.no",
	"gs.tm.no",
	"gs.tr.no",
	"gs.va.no",
	"gs.vf.no",
	"akrehamn.no",
	"åkrehamn.no",
	"algard.no",
	"ålgård.no",
	"arna.no",
	"brumunddal.no",
	"bryne.no",
	"bronnoysund.no",
	"brønnøysund.no",
	"drobak.no",
	"drøbak.no",
	"egersund.no",
	"fetsund.no",
	"floro.no",
	"florø.no",
	"fredrikstad.no",
	"hokksund.no",
	"honefoss.no",
	"hønefoss.no",
	"jessheim.no",
	"jorpeland.no",
	"jørpeland.no",
	"kirkenes.no",
	"kopervik.no",
	"krokstadelva.no",
	"langevag.no",
	"langevåg.no",
	"leirvik.no",
	"mjondalen.no",
	"mjøndalen.no",
	"mo-i-rana.no",
	"mosjoen.no",
	"mosjøen.no",
	"nesoddtangen.no",
	"orkanger.no",
	"osoyro.no",
	"osøyro.no",
	"raholt.no",
	"råholt.no",
	"sandnessjoen.no",
	"sandnessjøen.no",
	"skedsmokorset.no",
	"slattum.no",
	"spjelkavik.no",
	"stathelle.no",
	"stavern.no",
	"stjordalshalsen.no",
	"stjørdalshalsen.no",
	"tananger.no",
	"tranby.no",
	"vossevangen.no",
	"afjord.no",
	"åfjord.no",
	"agdenes.no",
	"al.no",
	"ål.no",
	"alesund.no",
	"ålesund.no",
	"alstahaug.no",
	"alta.no",
	"áltá.no",
	"alaheadju.no",
	"álaheadju.no",
	"alvdal.no",
	"amli.no",
	"åmli.no",
	"amot.no",
	"åmot.no",
	"andebu.no",
	"andoy.no",
	"andøy.no",
	"andasuolo.no",
	"ardal.no",
	"årdal.no",
	"aremark.no",
	"arendal.no",
	"ås.no",
	"aseral.no",
	"åseral.no",
	"asker.no",
	"askim.no",
	"askvoll.no",
	"askoy.no",
	"askøy.no",
	"asnes.no",
	"åsnes.no",
	"audnedaln.no",
	"aukra.no",
	"aure.no",
	"aurland.no",
	"aurskog-holand.no",
	"aurskog-høland.no",
	"austevoll.no",
	"austrheim.no",
	"averoy.no",
	"averøy.no",
	"balestrand.no",
	"ballangen.no",
	"balat.no",
	"bálát.no",
	"balsfjord.no",
	"bahccavuotna.no",
	"báhccavuotna.no",
	"bamble.no",
	"bardu.no",
	"beardu.no",
	"beiarn.no",
	"bajddar.no",
	"bájddar.no",
	"baidar.no",
	"báidár.no",
	"berg.no",
	"bergen.no",
	"berlevag.no",
	"berlevåg.no",
	"bearalvahki.no",
	"bearalváhki.no",
	"bindal.no",
	"birkenes.no",
	"bjarkoy.no",
	"bjarkøy.no",
	"bjerkreim.no",
	"bjugn.no",
	"bodo.no",
	"bodø.no",
	"badaddja.no",
	"bådåddjå.no",
	"budejju.no",
	"bokn.no",
	"bremanger.no",
	"bronnoy.no",
	"brønnøy.no",
	"bygland.no",
	"bykle.no",
	"barum.no",
	"bærum.no",
	"bo.telemark.no",
	"bø.telemark.no",
	"bo.nordland.no",
	"bø.nordland.no",
	"bievat.no",
	"bievát.no",
	"bomlo.no",
	"bømlo.no",
	"batsfjord.no",
	"båtsfjord.no",
	"bahcavuotna.no",
	"báhcavuotna.no",
	"dovre.no",
	"drammen.no",
	"drangedal.no",
	"dyroy.no",
	"dyrøy.no",
	"donna.no",
	"dønna.no",
	"eid.no",
	"eidfjord.no",
	"eidsberg.no",
	"eidskog.no",
	"eidsvoll.no",
	"eigersund.no",
	"elverum.no",
	"enebakk.no",
	"engerdal.no",
	"etne.no",
	"etnedal.no",
	"evenes.no",
	"evenassi.no",
	"evenášši.no",
	"evje-og-hornnes.no",
	"farsund.no",
	"fauske.no",
	"fuossko.no",
	"fuoisku.no",
	"fedje.no",
	"fet.no",
	"finnoy.no",
	"finnøy.no",
	"fitjar.no",
	"fjaler.no",
	"fjell.no",
	"flakstad.no",
	"flatanger.no",
	"flekkefjord.no",
	"flesberg.no",
	"flora.no",
	"fla.no",
	"flå.no",
	"folldal.no",
	"forsand.no",
	"fosnes.no",
	"frei.no",
	"frogn.no",
	"froland.no",
	"frosta.no",
	"frana.no",
	"fræna.no",
	"froya.no",
	"frøya.no",
	"fusa.no",
	"fyresdal.no",
	"forde.no",
	"førde.no",
	"gamvik.no",
	"gangaviika.no",
	"gáŋgaviika.no",
	"gaular.no",
	"gausdal.no",
	"gildeskal.no",
	"gildeskål.no",
	"giske.no",
	"gjemnes.no",
	"gjerdrum.no",
	"gjerstad.no",
	"gjesdal.no",
	"gjovik.no",
	"gjøvik.no",
	"gloppen.no",
	"gol.no",
	"gran.no",
	"grane.no",
	"granvin.no",
	"gratangen.no",
	"grimstad.no",
	"grong.no",
	"kraanghke.no",
	"kråanghke.no",
	"grue.no",
	"gulen.no",
	"hadsel.no",
	"halden.no",
	"halsa.no",
	"hamar.no",
	"hamaroy.no",
	"habmer.no",
	"hábmer.no",
	"hapmir.no",
	"hápmir.no",
	"hammerfest.no",
	"hammarfeasta.no",
	"hámmárfeasta.no",
	"haram.no",
	"hareid.no",
	"harstad.no",
	"hasvik.no",
	"aknoluokta.no",
	"ákŋoluokta.no",
	"hattfjelldal.no",
	"aarborte.no",
	"haugesund.no",
	"hemne.no",
	"hemnes.no",
	"hemsedal.no",
	"heroy.more-og-romsdal.no",
	"herøy.møre-og-romsdal.no",
	"heroy.nordland.no",
	"herøy.nordland.no",
	"hitra.no",
	"hjartdal.no",
	"hjelmeland.no",
	"hobol.no",
	"hobøl.no",
	"hof.no",
	"hol.no",
	"hole.no",
	"holmestrand.no",
	"holtalen.no",
	"holtålen.no",
	"hornindal.no",
	"horten.no",
	"hurdal.no",
	"hurum.no",
	"hvaler.no",
	"hyllestad.no",
	"hagebostad.no",
	"hægebostad.no",
	"hoyanger.no",
	"høyanger.no",
	"hoylandet.no",
	"høylandet.no",
	"ha.no",
	"hå.no",
	"ibestad.no",
	"inderoy.no",
	"inderøy.no",
	"iveland.no",
	"jevnaker.no",
	"jondal.no",
	"jolster.no",
	"jølster.no",
	"karasjok.no",
	"karasjohka.no",
	"kárášjohka.no",
	"karlsoy.no",
	"galsa.no",
	"gálsá.no",
	"karmoy.no",
	"karmøy.no",
	"kautokeino.no",
	"guovdageaidnu.no",
	"klepp.no",
	"klabu.no",
	"klæbu.no",
	"kongsberg.no",
	"kongsvinger.no",
	"kragero.no",
	"kragerø.no",
	"kristiansand.no",
	"kristiansund.no",
	"krodsherad.no",
	"krødsherad.no",
	"kvalsund.no",
	"rahkkeravju.no",
	"ráhkkerávju.no",
	"kvam.no",
	"kvinesdal.no",
	"kvinnherad.no",
	"kviteseid.no",
	"kvitsoy.no",
	"kvitsøy.no",
	"kvafjord.no",
	"kvæfjord.no",
	"giehtavuoatna.no",
	"kvanangen.no",
	"kvænangen.no",
	"navuotna.no",
	"návuotna.no",
	"kafjord.no",
	"kåfjord.no",
	"gaivuotna.no",
	"gáivuotna.no",
	"larvik.no",
	"lavangen.no",
	"lavagis.no",
	"loabat.no",
	"loabát.no",
	"lebesby.no",
	"davvesiida.no",
	"leikanger.no",
	"leirfjord.no",
	"leka.no",
	"leksvik.no",
	"lenvik.no",
	"leangaviika.no",
	"leaŋgaviika.no",
	"lesja.no",
	"levanger.no",
	"lier.no",
	"lierne.no",
	"lillehammer.no",
	"lillesand.no",
	"lindesnes.no",
	"lindas.no",
	"lindås.no",
	"lom.no",
	"loppa.no",
	"lahppi.no",
	"láhppi.no",
	"lund.no",
	"lunner.no",
	"luroy.no",
	"lurøy.no",
	"luster.no",
	"lyngdal.no",
	"lyngen.no",
	"ivgu.no",
	"lardal.no",
	"lerdal.no",
	"lærdal.no",
	"lodingen.no",
	"lødingen.no",
	"lorenskog.no",
	"lørenskog.no",
	"loten.no",
	"løten.no",
	"malvik.no",
	"masoy.no",
	"måsøy.no",
	"muosat.no",
	"muosát.no",
	"mandal.no",
	"marker.no",
	"marnardal.no",
	"masfjorden.no",
	"meland.no",
	"meldal.no",
	"melhus.no",
	"meloy.no",
	"meløy.no",
	"meraker.no",
	"meråker.no",
	"moareke.no",
	"moåreke.no",
	"midsund.no",
	"midtre-gauldal.no",
	"modalen.no",
	"modum.no",
	"molde.no",
	"moskenes.no",
	"moss.no",
	"mosvik.no",
	"malselv.no",
	"målselv.no",
	"malatvuopmi.no",
	"málatvuopmi.no",
	"namdalseid.no",
	"aejrie.no",
	"namsos.no",
	"namsskogan.no",
	"naamesjevuemie.no",
	"nååmesjevuemie.no",
	"laakesvuemie.no",
	"nannestad.no",
	"narvik.no",
	"narviika.no",
	"naustdal.no",
	"nedre-eiker.no",
	"nes.akershus.no",
	"nes.buskerud.no",
	"nesna.no",
	"nesodden.no",
	"nesseby.no",
	"unjarga.no",
	"unjárga.no",
	"nesset.no",
	"nissedal.no",
	"nittedal.no",
	"nord-aurdal.no",
	"nord-fron.no",
	"nord-odal.no",
	"norddal.no",
	"nordkapp.no",
	"davvenjarga.no",
	"davvenjárga.no",
	"nordre-land.no",
	"nordreisa.no",
	"raisa.no",
	"ráisa.no",
	"nore-og-uvdal.no",
	"notodden.no",
	"naroy.no",
	"nærøy.no",
	"notteroy.no",
	"nøtterøy.no",
	"odda.no",
	"oksnes.no",
	"øksnes.no",
	"oppdal.no",
	"oppegard.no",
	"oppegård.no",
	"orkdal.no",
	"orland.no",
	"ørland.no",
	"orskog.no",
	"ørskog.no",
	"orsta.no",
	"ørsta.no",
	"os.hedmark.no",
	"os.hordaland.no",
	"osen.no",
	"osteroy.no",
	"osterøy.no",
	"ostre-toten.no",
	"østre-toten.no",
	"overhalla.no",
	"ovre-eiker.no",
	"øvre-eiker.no",
	"oyer.no",
	"øyer.no",
	"oygarden.no",
	"øygarden.no",
	"oystre-slidre.no",
	"øystre-slidre.no",
	"porsanger.no",
	"porsangu.no",
	"porsáŋgu.no",
	"porsgrunn.no",
	"radoy.no",
	"radøy.no",
	"rakkestad.no",
	"rana.no",
	"ruovat.no",
	"randaberg.no",
	"rauma.no",
	"rendalen.no",
	"rennebu.no",
	"rennesoy.no",
	"rennesøy.no",
	"rindal.no",
	"ringebu.no",
	"ringerike.no",
	"ringsaker.no",
	"rissa.no",
	"risor.no",
	"risør.no",
	"roan.no",
	"rollag.no",
	"rygge.no",
	"ralingen.no",
	"rælingen.no",
	"rodoy.no",
	"rødøy.no",
	"romskog.no",
	"rømskog.no",
	"roros.no",
	"røros.no",
	"rost.no",
	"røst.no",
	"royken.no",
	"røyken.no",
	"royrvik.no",
	"røyrvik.no",
	"rade.no",
	"råde.no",
	"salangen.no",
	"siellak.no",
	"saltdal.no",
	"salat.no",
	"sálát.no",
	"sálat.no",
	"samnanger.no",
	"sande.more-og-romsdal.no",
	"sande.møre-og-romsdal.no",
	"sande.vestfold.no",
	"sandefjord.no",
	"sandnes.no",
	"sandoy.no",
	"sandøy.no",
	"sarpsborg.no",
	"sauda.no",
	"sauherad.no",
	"sel.no",
	"selbu.no",
	"selje.no",
	"seljord.no",
	"sigdal.no",
	"siljan.no",
	"sirdal.no",
	"skaun.no",
	"skedsmo.no",
	"ski.no",
	"skien.no",
	"skiptvet.no",
	"skjervoy.no",
	"skjervøy.no",
	"skierva.no",
	"skiervá.no",
	"skjak.no",
	"skjåk.no",
	"skodje.no",
	"skanland.no",
	"skånland.no",
	"skanit.no",
	"skánit.no",
	"smola.no",
	"smøla.no",
	"snillfjord.no",
	"snasa.no",
	"snåsa.no",
	"snoasa.no",
	"snaase.no",
	"snåase.no",
	"sogndal.no",
	"sokndal.no",
	"sola.no",
	"solund.no",
	"songdalen.no",
	"sortland.no",
	"spydeberg.no",
	"stange.no",
	"stavanger.no",
	"steigen.no",
	"steinkjer.no",
	"stjordal.no",
	"stjørdal.no",
	"stokke.no",
	"stor-elvdal.no",
	"stord.no",
	"stordal.no",
	"storfjord.no",
	"omasvuotna.no",
	"strand.no",
	"stranda.no",
	"stryn.no",
	"sula.no",
	"suldal.no",
	"sund.no",
	"sunndal.no",
	"surnadal.no",
	"sveio.no",
	"svelvik.no",
	"sykkylven.no",
	"sogne.no",
	"søgne.no",
	"somna.no",
	"sømna.no",
	"sondre-land.no",
	"søndre-land.no",
	"sor-aurdal.no",
	"sør-aurdal.no",
	"sor-fron.no",
	"sør-fron.no",
	"sor-odal.no",
	"sør-odal.no",
	"sor-varanger.no",
	"sør-varanger.no",
	"matta-varjjat.no",
	"mátta-várjjat.no",
	"sorfold.no",
	"sørfold.no",
	"sorreisa.no",
	"sørreisa.no",
	"sorum.no",
	"sørum.no",
	"tana.no",
	"deatnu.no",
	"time.no",
	"tingvoll.no",
	"tinn.no",
	"tjeldsund.no",
	"dielddanuorri.no",
	"tjome.no",
	"tjøme.no",
	"tokke.no",
	"tolga.no",
	"torsken.no",
	"tranoy.no",
	"tranøy.no",
	"tromso.no",
	"tromsø.no",
	"tromsa.no",
	"romsa.no",
	"trondheim.no",
	"troandin.no",
	"trysil.no",
	"trana.no",
	"træna.no",
	"trogstad.no",
	"trøgstad.no",
	"tvedestrand.no",
	"tydal.no",
	"tynset.no",
	"tysfjord.no",
	"divtasvuodna.no",
	"divttasvuotna.no",
	"tysnes.no",
	"tysvar.no",
	"tysvær.no",
	"tonsberg.no",
	"tønsberg.no",
	"ullensaker.no",
	"ullensvang.no",
	"ulvik.no",
	"utsira.no",
	"vadso.no",
	"vadsø.no",
	"cahcesuolo.no",
	"čáhcesuolo.no",
	"vaksdal.no",
	"valle.no",
	"vang.no",
	"vanylven.no",
	"vardo.no",
	"vardø.no",
	"varggat.no",
	"várggát.no",
	"vefsn.no",
	"vaapste.no",
	"vega.no",
	"vegarshei.no",
	"vegårshei.no",
	"vennesla.no",
	"verdal.no",
	"verran.no",
	"vestby.no",
	"vestnes.no",
	"vestre-slidre.no",
	"vestre-toten.no",
	"vestvagoy.no",
	"vestvågøy.no",
	"vevelstad.no",
	"vik.no",
	"vikna.no",
	"vindafjord.no",
	"volda.no",
	"voss.no",
	"varoy.no",
	"værøy.no",
	"vagan.no",
	"vågan.no",
	"voagat.no",
	"vagsoy.no",
	"vågsøy.no",
	"vaga.no",
	"vågå.no",
	"valer.ostfold.no",
	"våler.østfold.no",
	"valer.hedmark.no",
	"våler.hedmark.no",
	"*.np",
	"nr",
	"biz.nr",
	"info.nr",
	"gov.nr",
	"edu.nr",
	"org.nr",
	"net.nr",
	"com.nr",
	"nu",
	"nz",
	"ac.nz",
	"co.nz",
	"cri.nz",
	"geek.nz",
	"gen.nz",
	"govt.nz",
	"health.nz",
	"iwi.nz",
	"kiwi.nz",
	"maori.nz",
	"mil.nz",
	"māori.nz",
	"net.nz",
	"org.nz",
	"parliament.nz",
	"school.nz",
	"om",
	"co.om",
	"com.om",
	"edu.om",
	"gov.om",
	"med.om",
	"museum.om",
	"net.om",
	"org.om",
	"pro.om",
	"onion",
	"org",
	"pa",
	"ac.pa",
	"gob.pa",
	"com.pa",
	"org.pa",
	"sld.pa",
	"edu.pa",
	"net.pa",
	"ing.pa",
	"abo.pa",
	"med.pa",
	"nom.pa",
	"pe",
	"edu.pe",
	"gob.pe",
	"nom.pe",
	"mil.pe",
	"org.pe",
	"com.pe",
	"net.pe",
	"pf",
	"com.pf",
	"org.pf",
	"edu.pf",
	"*.pg",
	"ph",
	"com.ph",
	"net.ph",
	"org.ph",
	"gov.ph",
	"edu.ph",
	"ngo.ph",
	"mil.ph",
	"i.ph",
	"pk",
	"com.pk",
	"net.pk",
	"edu.pk",
	"org.pk",
	"fam.pk",
	"biz.pk",
	"web.pk",
	"gov.pk",
	"gob.pk",
	"gok.pk",
	"gon.pk",
	"gop.pk",
	"gos.pk",
	"info.pk",
	"pl",
	"com.pl",
	"net.pl",
	"org.pl",
	"aid.pl",
	"agro.pl",
	"atm.pl",
	"auto.pl",
	"biz.pl",
	"edu.pl",
	"gmina.pl",
	"gsm.pl",
	"info.pl",
	"mail.pl",
	"miasta.pl",
	"media.pl",
	"mil.pl",
	"nieruchomosci.pl",
	"nom.pl",
	"pc.pl",
	"powiat.pl",
	"priv.pl",
	"realestate.pl",
	"rel.pl",
	"sex.pl",
	"shop.pl",
	"sklep.pl",
	"sos.pl",
	"szkola.pl",
	"targi.pl",
	"tm.pl",
	"tourism.pl",
	"travel.pl",
	"turystyka.pl",
	"gov.pl",
	"ap.gov.pl",
	"ic.gov.pl",
	"is.gov.pl",
	"us.gov.pl",
	"kmpsp.gov.pl",
	"kppsp.gov.pl",
	"kwpsp.gov.pl",
	"psp.gov.pl",
	"wskr.gov.pl",
	"kwp.gov.pl",
	"mw.gov.pl",
	"ug.gov.pl",
	"um.gov.pl",
	"umig.gov.pl",
	"ugim.gov.pl",
	"upow.gov.pl",
	"uw.gov.pl",
	"starostwo.gov.pl",
	"pa.gov.pl",
	"po.gov.pl",
	"psse.gov.pl",
	"pup.gov.pl",
	"rzgw.gov.pl",
	"sa.gov.pl",
	"so.gov.pl",
	"sr.gov.pl",
	"wsa.gov.pl",
	"sko.gov.pl",
	"uzs.gov.pl",
	"wiih.gov.pl",
	"winb.gov.pl",
	"pinb.gov.pl",
	"wios.gov.pl",
	"witd.gov.pl",
	"wzmiuw.gov.pl",
	"piw.gov.pl",
	"wiw.gov.pl",
	"griw.gov.pl",
	"wif.gov.pl",
	"oum.gov.pl",
	"sdn.gov.pl",
	"zp.gov.pl",
	"uppo.gov.pl",
	"mup.gov.pl",
	"wuoz.gov.pl",
	"konsulat.gov.pl",
	"oirm.gov.pl",
	"augustow.pl",
	"babia-gora.pl",
	"bedzin.pl",
	"beskidy.pl",
	"bialowieza.pl",
	"bialystok.pl",
	"bielawa.pl",
	"bieszczady.pl",
	"boleslawiec.pl",
	"bydgoszcz.pl",
	"bytom.pl",
	"cieszyn.pl",
	"czeladz.pl",
	"czest.pl",
	"dlugoleka.pl",
	"elblag.pl",
	"elk.pl",
	"glogow.pl",
	"gniezno.pl",
	"gorlice.pl",
	"grajewo.pl",
	"ilawa.pl",
	"jaworzno.pl",
	"jelenia-gora.pl",
	"jgora.pl",
	"kalisz.pl",
	"kazimierz-dolny.pl",
	"karpacz.pl",
	"kartuzy.pl",
	"kaszuby.pl",
	"katowice.pl",
	"kepno.pl",
	"ketrzyn.pl",
	"klodzko.pl",
	"kobierzyce.pl",
	"kolobrzeg.pl",
	"konin.pl",
	"konskowola.pl",
	"kutno.pl",
	"lapy.pl",
	"lebork.pl",
	"legnica.pl",
	"lezajsk.pl",
	"limanowa.pl",
	"lomza.pl",
	"lowicz.pl",
	"lubin.pl",
	"lukow.pl",
	"malbork.pl",
	"malopolska.pl",
	"mazowsze.pl",
	"mazury.pl",
	"mielec.pl",
	"mielno.pl",
	"mragowo.pl",
	"naklo.pl",
	"nowaruda.pl",
	"nysa.pl",
	"olawa.pl",
	"olecko.pl",
	"olkusz.pl",
	"olsztyn.pl",
	"opoczno.pl",
	"opole.pl",
	"ostroda.pl",
	"ostroleka.pl",
	"ostrowiec.pl",
	"ostrowwlkp.pl",
	"pila.pl",
	"pisz.pl",
	"podhale.pl",
	"podlasie.pl",
	"polkowice.pl",
	"pomorze.pl",
	"pomorskie.pl",
	"prochowice.pl",
	"pruszkow.pl",
	"przeworsk.pl",
	"pulawy.pl",
	"radom.pl",
	"rawa-maz.pl",
	"rybnik.pl",
	"rzeszow.pl",
	"sanok.pl",
	"sejny.pl",
	"slask.pl",
	"slupsk.pl",
	"sosnowiec.pl",
	"stalowa-wola.pl",
	"skoczow.pl",
	"starachowice.pl",
	"stargard.pl",
	"suwalki.pl",
	"swidnica.pl",
	"swiebodzin.pl",
	"swinoujscie.pl",
	"szczecin.pl",
	"szczytno.pl",
	"tarnobrzeg.pl",
	"tgory.pl",
	"turek.pl",
	"tychy.pl",
	"ustka.pl",
	"walbrzych.pl",
	"warmia.pl",
	"warszawa.pl",
	"waw.pl",
	"wegrow.pl",
	"wielun.pl",
	"wlocl.pl",
	"wloclawek.pl",
	"wodzislaw.pl",
	"wolomin.pl",
	"wroclaw.pl",
	"zachpomor.pl",
	"zagan.pl",
	"zarow.pl",
	"zgora.pl",
	"zgorzelec.pl",
	"pm",
	"pn",
	"gov.pn",
	"co.pn",
	"org.pn",
	"edu.pn",
	"net.pn",
	"post",
	"pr",
	"com.pr",
	"net.pr",
	"org.pr",
	"gov.pr",
	"edu.pr",
	"isla.pr",
	"pro.pr",
	"biz.pr",
	"info.pr",
	"name.pr",
	"est.pr",
	"prof.pr",
	"ac.pr",
	"pro",
	"aaa.pro",
	"aca.pro",
	"acct.pro",
	"avocat.pro",
	"bar.pro",
	"cpa.pro",
	"eng.pro",
	"jur.pro",
	"law.pro",
	"med.pro",
	"recht.pro",
	"ps",
	"edu.ps",
	"gov.ps",
	"sec.ps",
	"plo.ps",
	"com.ps",
	"org.ps",
	"net.ps",
	"pt",
	"net.pt",
	"gov.pt",
	"org.pt",
	"edu.pt",
	"int.pt",
	"publ.pt",
	"com.pt",
	"nome.pt",
	"pw",
	"co.pw",
	"ne.pw",
	"or.pw",
	"ed.pw",
	"go.pw",
	"belau.pw",
	"py",
	"com.py",
	"coop.py",
	"edu.py",
	"gov.py",
	"mil.py",
	"net.py",
	"org.py",
	"qa",
	"com.qa",
	"edu.qa",
	"gov.qa",
	"mil.qa",
	"name.qa",
	"net.qa",
	"org.qa",
	"sch.qa",
	"re",
	"asso.re",
	"com.re",
	"nom.re",
	"ro",
	"arts.ro",
	"com.ro",
	"firm.ro",
	"info.ro",
	"nom.ro",
	"nt.ro",
	"org.ro",
	"rec.ro",
	"store.ro",
	"tm.ro",
	"www.ro",
	"rs",
	"ac.rs",
	"co.rs",
	"edu.rs",
	"gov.rs",
	"in.rs",
	"org.rs",
	"ru",
	"rw",
	"ac.rw",
	"co.rw",
	"coop.rw",
	"gov.rw",
	"mil.rw",
	"net.rw",
	"org.rw",
	"sa",
	"com.sa",
	"net.sa",
	"org.sa",
	"gov.sa",
	"med.sa",
	"pub.sa",
	"edu.sa",
	"sch.sa",
	"sb",
	"com.sb",
	"edu.sb",
	"gov.sb",
	"net.sb",
	"org.sb",
	"sc",
	"com.sc",
	"gov.sc",
	"net.sc",
	"org.sc",
	"edu.sc",
	"sd",
	"com.sd",
	"net.sd",
	"org.sd",
	"edu.sd",
	"med.sd",
	"tv.sd",
	"gov.sd",
	"info.sd",
	"se",
	"a.se",
	"ac.se",
	"b.se",
	"bd.se",
	"brand.se",
	"c.se",
	"d.se",
	"e.se",
	"f.se",
	"fh.se",
	"fhsk.se",
	"fhv.se",
	"g.se",
	"h.se",
	"i.se",
	"k.se",
	"komforb.se",
	"kommunalforbund.se",
	"komvux.se",
	"l.se",
	"lanbib.se",
	"m.se",
	"n.se",
	"naturbruksgymn.se",
	"o.se",
	"org.se",
	"p.se",
	"parti.se",
	"pp.se",
	"press.se",
	"r.se",
	"s.se",
	"t.se",
	"tm.se",
	"u.se",
	"w.se",
	"x.se",
	"y.se",
	"z.se",
	"sg",
	"com.sg",
	"net.sg",
	"org.sg",
	"gov.sg",
	"edu.sg",
	"per.sg",
	"sh",
	"com.sh",
	"net.sh",
	"gov.sh",
	"org.sh",
	"mil.sh",
	"si",
	"sj",
	"sk",
	"sl",
	"com.sl",
	"net.sl",
	"edu.sl",
	"gov.sl",
	"org.sl",
	"sm",
	"sn",
	"art.sn",
	"com.sn",
	"edu.sn",
	"gouv.sn",
	"org.sn",
	"perso.sn",
	"univ.sn",
	"so",
	"com.so",
	"edu.so",
	"gov.so",
	"me.so",
	"net.so",
	"org.so",
	"sr",
	"ss",
	"biz.ss",
	"com.ss",
	"edu.ss",
	"gov.ss",
	"me.ss",
	"net.ss",
	"org.ss",
	"sch.ss",
	"st",
	"co.st",
	"com.st",
	"consulado.st",
	"edu.st",
	"embaixada.st",
	"mil.st",
	"net.st",
	"org.st",
	"principe.st",
	"saotome.st",
	"store.st",
	"su",
	"sv",
	"com.sv",
	"edu.sv",
	"gob.sv",
	"org.sv",
	"red.sv",
	"sx",
	"gov.sx",
	"sy",
	"edu.sy",
	"gov.sy",
	"net.sy",
	"mil.sy",
	"com.sy",
	"org.sy",
	"sz",
	"co.sz",
	"ac.sz",
	"org.sz",
	"tc",
	"td",
	"tel",
	"tf",
	"tg",
	"th",
	"ac.th",
	"co.th",
	"go.th",
	"in.th",
	"mi.th",
	"net.th",
	"or.th",
	"tj",
	"ac.tj",
	"biz.tj",
	"co.tj",
	"com.tj",
	"edu.tj",
	"go.tj",
	"gov.tj",
	"int.tj",
	"mil.tj",
	"name.tj",
	"net.tj",
	"nic.tj",
	"org.tj",
	"test.tj",
	"web.tj",
	"tk",
	"tl",
	"gov.tl",
	"tm",
	"com.tm",
	"co.tm",
	"org.tm",
	"net.tm",
	"nom.tm",
	"gov.tm",
	"mil.tm",
	"edu.tm",
	"tn",
	"com.tn",
	"ens.tn",
	"fin.tn",
	"gov.tn",
	"ind.tn",
	"info.tn",
	"intl.tn",
	"mincom.tn",
	"nat.tn",
	"net.tn",
	"org.tn",
	"perso.tn",
	"tourism.tn",
	"to",
	"com.to",
	"gov.to",
	"net.to",
	"org.to",
	"edu.to",
	"mil.to",
	"tr",
	"av.tr",
	"bbs.tr",
	"bel.tr",
	"biz.tr",
	"com.tr",
	"dr.tr",
	"edu.tr",
	"gen.tr",
	"gov.tr",
	"info.tr",
	"mil.tr",
	"k12.tr",
	"kep.tr",
	"name.tr",
	"net.tr",
	"org.tr",
	"pol.tr",
	"tel.tr",
	"tsk.tr",
	"tv.tr",
	"web.tr",
	"nc.tr",
	"gov.nc.tr",
	"tt",
	"co.tt",
	"com.tt",
	"org.tt",
	"net.tt",
	"biz.tt",
	"info.tt",
	"pro.tt",
	"int.tt",
	"coop.tt",
	"jobs.tt",
	"mobi.tt",
	"travel.tt",
	"museum.tt",
	"aero.tt",
	"name.tt",
	"gov.tt",
	"edu.tt",
	"tv",
	"tw",
	"edu.tw",
	"gov.tw",
	"mil.tw",
	"com.tw",
	"net.tw",
	"org.tw",
	"idv.tw",
	"game.tw",
	"ebiz.tw",
	"club.tw",
	"網路.tw",
	"組織.tw",
	"商業.tw",
	"tz",
	"ac.tz",
	"co.tz",
	"go.tz",
	"hotel.tz",
	"info.tz",
	"me.tz",
	"mil.tz",
	"mobi.tz",
	"ne.tz",
	"or.tz",
	"sc.tz",
	"tv.tz",
	"ua",
	"com.ua",
	"edu.ua",
	"gov.ua",
	"in.ua",
	"net.ua",
	"org.ua",
	"cherkassy.ua",
	"cherkasy.ua",
	"chernigov.ua",
	"chernihiv.ua",
	"chernivtsi.ua",
	"chernovtsy.ua",
	"ck.ua",
	"cn.ua",
	"cr.ua",
	"crimea.ua",
	"cv.ua",
	"dn.ua",
	"dnepropetrovsk.ua",
	"dnipropetrovsk.ua",
	"donetsk.ua",
	"dp.ua",
	"if.ua",
	"ivano-frankivsk.ua",
	"kh.ua",
	"kharkiv.ua",
	"kharkov.ua",
	"kherson.ua",
	"khmelnitskiy.ua",
	"khmelnytskyi.ua",
	"kiev.ua",
	"kirovograd.ua",
	"km.ua",
	"kr.ua",
	"krym.ua",
	"ks.ua",
	"kv.ua",
	"kyiv.ua",
	"lg.ua",
	"lt.ua",
	"lugansk.ua",
	"lutsk.ua",
	"lv.ua",
	"lviv.ua",
	"mk.ua",
	"mykolaiv.ua",
	"nikolaev.ua",
	"od.ua",
	"odesa.ua",
	"odessa.ua",
	"pl.ua",
	"poltava.ua",
	"rivne.ua",
	"rovno.ua",
	"rv.ua",
	"sb.ua",
	"sebastopol.ua",
	"sevastopol.ua",
	"sm.ua",
	"sumy.ua",
	"te.ua",
	"ternopil.ua",
	"uz.ua",
	"uzhgorod.ua",
	"vinnica.ua",
	"vinnytsia.ua",
	"vn.ua",
	"volyn.ua",
	"yalta.ua",
	"zaporizhzhe.ua",
	"zaporizhzhia.ua",
	"zhitomir.ua",
	"zhytomyr.ua",
	"zp.ua",
	"zt.ua",
	"ug",
	"co.ug",
	"or.ug",
	"ac.ug",
	"sc.ug",
	"go.ug",
	"ne.ug",
	"com.ug",
	"org.ug",
	"uk",
	"ac.uk",
	"co.uk",
	"gov.uk",
	"ltd.uk",
	"me.uk",
	"net.uk",
	"nhs.uk",
	"org.uk",
	"plc.uk",
	"police.uk",
	"*.sch.uk",
	"us",
	"dni.us",
	"fed.us",
	"isa.us",
	"kids.us",
	"nsn.us",
	"ak.us",
	"al.us",
	"ar.us",
	"as.us",
	"az.us",
	"ca.us",
	"co.us",
	"ct.us",
	"dc.us",
	"de.us",
	"fl.us",
	"ga.us",
	"gu.us",
	"hi.us",
	"ia.us",
	"id.us",
	"il.us",
	"in.us",
	"ks.us",
	"ky.us",
	"la.us",
	"ma.us",
	"md.us",
	"me.us",
	"mi.us",
	"mn.us",
	"mo.us",
	"ms.us",
	"mt.us",
	"nc.us",
	"nd.us",
	"ne.us",
	"nh.us",
	"nj.us",
	"nm.us",
	"nv.us",
	"ny.us",
	"oh.us",
	"ok.us",
	"or.us",
	"pa.us",
	"pr.us",
	"ri.us",
	"sc.us",
	"sd.us",
	"tn.us",
	"tx.us",
	"ut.us",
	"vi.us",
	"vt.us",
	"va.us",
	"wa.us",
	"wi.us",
	"wv.us",
	"wy.us",
	"k12.ak.us",
	"k12.al.us",
	"k12.ar.us",
	"k12.as.us",
	"k12.az.us",
	"k12.ca.us",
	"k12.co.us",
	"k12.ct.us",
	"k12.dc.us",
	"k12.de.us",
	"k12.fl.us",
	"k12.ga.us",
	"k12.gu.us",
	"k12.ia.us",
	"k12.id.us",
	"k12.il.us",
	"k12.in.us",
	"k12.ks.us",
	"k12.ky.us",
	"k12.la.us",
	"k12.ma.us",
	"k12.md.us",
	"k12.me.us",
	"k12.mi.us",
	"k12.mn.us",
	"k12.mo.us",
	"k12.ms.us",
	"k12.mt.us",
	"k12.nc.us",
	"k12.ne.us",
	"k12.nh.us",
	"k12.nj.us",
	"k12.nm.us",
	"k12.nv.us",
	"k12.ny.us",
	"k12.oh.us",
	"k12.ok.us",
	"k12.or.us",
	"k12.pa.us",
	"k12.pr.us",
	"k12.sc.us",
	"k12.tn.us",
	"k12.tx.us",
	"k12.ut.us",
	"k12.vi.us",
	"k12.vt.us",
	"k12.va.us",
	"k12.wa.us",
	"k12.wi.us",
	"k12.wy.us",
	"cc.ak.us",
	"cc.al.us",
	"cc.ar.us",
	"cc.as.us",
	"cc.az.us",
	"cc.ca.us",
	"cc.co.us",
	"cc.ct.us",
	"cc.dc.us",
	"cc.de.us",
	"cc.fl.us",
	"cc.ga.us",
	"cc.gu.us",
	"cc.hi.us",
	"cc.ia.us",
	"cc.id.us",
	"cc.il.us",
	"cc.in.us",
	"cc.ks.us",
	"cc.ky.us",
	"cc.la.us",
	"cc.ma.us",
	"cc.md.us",
	"cc.me.us",
	"cc.mi.us",
	"cc.mn.us",
	"cc.mo.us",
	"cc.ms.us",
	"cc.mt.us",
	"cc.nc.us",
	"cc.nd.us",
	"cc.ne.us",
	"cc.nh.us",
	"cc.nj.us",
	"cc.nm.us",
	"cc.nv.us",
	"cc.ny.us",
	"cc.oh.us",
	"cc.ok.us",
	"cc.or.us",
	"cc.pa.us",
	"cc.pr.us",
	"cc.ri.us",
	"cc.sc.us",
	"cc.sd.us",
	"cc.tn.us",
	"cc.tx.us",
	"cc.ut.us",
	"cc.vi.us",
	"cc.vt.us",
	"cc.va.us",
	"cc.wa.us",
	"cc.wi.us",
	"cc.wv.us",
	"cc.wy.us",
	"lib.ak.us",
	"lib.al.us",
	"lib.ar.us",
	"lib.as.us",
	"lib.az.us",
	"lib.ca.us",
	"lib.co.us",
	"lib.ct.us",
	"lib.dc.us",
	"lib.fl.us",
	"lib.ga.us",
	"lib.gu.us",
	"lib.hi.us",
	"lib.ia.us",
	"lib.id.us",
	"lib.il.us",
	"lib.in.us",
	"lib.ks.us",
	"lib.ky.us",
	"lib.la.us",
	"lib.ma.us",
	"lib.md.us",
	"lib.me.us",
	"lib.mi.us",
	"lib.mn.us",
	"lib.mo.us",
	"lib.ms.us",
	"lib.mt.us",
	"lib.nc.us",
	"lib.nd.us",
	"lib.ne.us",
	"lib.nh.us",
	"lib.nj.us",
	"lib.nm.us",
	"lib.nv.us",
	"lib.ny.us",
	"lib.oh.us",
	"lib.ok.us",
	"lib.or.us",
	"lib.pa.us",
	"lib.pr.us",
	"lib.ri.us",
	"lib.sc.us",
	"lib.sd.us",
	"lib.tn.us",
	"lib.tx.us",
	"lib.ut.us",
	"lib.vi.us",
	"lib.vt.us",
	"lib.va.us",
	"lib.wa.us",
	"lib.wi.us",
	"lib.wy.us",
	"pvt.k12.ma.us",
	"chtr.k12.ma.us",
	"paroch.k12.ma.us",
	"ann-arbor.mi.us",
	"cog.mi.us",
	"dst.mi.us",
	"eaton.mi.us",
	"gen.mi.us",
	"mus.mi.us",
	"tec.mi.us",
	"washtenaw.mi.us",
	"uy",
	"com.uy",
	"edu.uy",
	"gub.uy",
	"mil.uy",
	"net.uy",
	"org.uy",
	"uz",
	"co.uz",
	"com.uz",
	"net.uz",
	"org.uz",
	"va",
	"vc",
	"com.vc",
	"net.vc",
	"org.vc",
	"gov.vc",
	"mil.vc",
	"edu.vc",
	"ve",
	"arts.ve",
	"bib.ve",
	"co.ve",
	"com.ve",
	"e12.ve",
	"edu.ve",
	"firm.ve",
	"gob.ve",
	"gov.ve",
	"info.ve",
	"int.ve",
	"mil.ve",
	"net.ve",
	"nom.ve",
	"org.ve",
	"rar.ve",
	"rec.ve",
	"store.ve",
	"tec.ve",
	"web.ve",
	"vg",
	"vi",
	"co.vi",
	"com.vi",
	"k12.vi",
	"net.vi",
	"org.vi",
	"vn",
	"com.vn",
	"net.vn",
	"org.vn",
	"edu.vn",
	"gov.vn",
	"int.vn",
	"ac.vn",
	"biz.vn",
	"info.vn",
	"name.vn",
	"pro.vn",
	"health.vn",
	"vu",
	"com.vu",
	"edu.vu",
	"net.vu",
	"org.vu",
	"wf",
	"ws",
	"com.ws",
	"net.ws",
	"org.ws",
	"gov.ws",
	"edu.ws",
	"yt",
	"امارات",
	"հայ",
	"বাংলা",
	"бг",
	"البحرين",
	"бел",
	"中国",
	"中國",
	"الجزائر",
	"مصر",
	"ею",
	"ευ",
	"موريتانيا",
	"გე",
	"ελ",
	"香港",
	"公司.香港",
	"教育.香港",
	"政府.香港",
	"個人.香港",
	"網絡.香港",
	"組織.香港",
	"ಭಾರತ",
	"ଭାରତ",
	"ভাৰত",
	"भारतम्",
	"भारोत",
	"ڀارت",
	"ഭാരതം",
	"भारत",
	"بارت",
	"بھارت",
	"భారత్",
	"ભારત",
	"ਭਾਰਤ",
	"ভারত",
	"இந்தியா",
	"ایران",
	"ايران",
	"عراق",
	"الاردن",
	"한국",
	"қаз",
	"ລາວ",
	"ලංකා",
	"இலங்கை",
	"المغرب",
	"мкд",
	"мон",
	"澳門",
	"澳门",
	"مليسيا",
	"عمان",
	"پاکستان",
	"پاكستان",
	"فلسطين",
	"срб",
	"пр.срб",
	"орг.срб",
	"обр.срб",
	"од.срб",
	"упр.срб",
	"ак.срб",
	"рф",
	"قطر",
	"السعودية",
	"السعودیة",
	"السعودیۃ",
	"السعوديه",
	"سودان",
	"新加坡",
	"சிங்கப்பூர்",
	"سورية",
	"سوريا",
	"ไทย",
	"ศึกษา.ไทย",
	"ธุรกิจ.ไทย",
	"รัฐบาล.ไทย",
	"ทหาร.ไทย",
	"เน็ต.ไทย",
	"องค์กร.ไทย",
	"تونس",
	"台灣",
	"台湾",
	"臺灣",
	"укр",
	"اليمن",
	"xxx",
	"ye",
	"com.ye",
	"edu.ye",
	"gov.ye",
	"net.ye",
	"mil.ye",
	"org.ye",
	"ac.za",
	"agric.za",
	"alt.za",
	"co.za",
	"edu.za",
	"gov.za",
	"grondar.za",
	"law.za",
	"mil.za",
	"net.za",
	"ngo.za",
	"nic.za",
	"nis.za",
	"nom.za",
	"org.za",
	"school.za",
	"tm.za",
	"web.za",
	"zm",
	"ac.zm",
	"biz.zm",
	"co.zm",
	"com.zm",
	"edu.zm",
	"gov.zm",
	"info.zm",
	"mil.zm",
	"net.zm",
	"org.zm",
	"sch.zm",
	"zw",
	"ac.zw",
	"co.zw",
	"gov.zw",
	"mil.zw",
	"org.zw",
	"aaa",
	"aarp",
	"abarth",
	"abb",
	"abbott",
	"abbvie",
	"abc",
	"able",
	"abogado",
	"abudhabi",
	"academy",
	"accenture",
	"accountant",
	"accountants",
	"aco",
	"actor",
	"adac",
	"ads",
	"adult",
	"aeg",
	"aetna",
	"afl",
	"africa",
	"agakhan",
	"agency",
	"aig",
	"airbus",
	"airforce",
	"airtel",
	"akdn",
	"alfaromeo",
	"alibaba",
	"alipay",
	"allfinanz",
	"allstate",
	"ally",
	"alsace",
	"alstom",
	"amazon",
	"americanexpress",
	"americanfamily",
	"amex",
	"amfam",
	"amica",
	"amsterdam",
	"analytics",
	"android",
	"anquan",
	"anz",
	"aol",
	"apartments",
	"app",
	"apple",
	"aquarelle",
	"arab",
	"aramco",
	"archi",
	"army",
	"art",
	"arte",
	"asda",
	"associates",
	"athleta",
	"attorney",
	"auction",
	"audi",
	"audible",
	"audio",
	"auspost",
	"author",
	"auto",
	"autos",
	"avianca",
	"aws",
	"axa",
	"azure",
	"baby",
	"baidu",
	"banamex",
	"bananarepublic",
	"band",
	"bank",
	"bar",
	"barcelona",
	"barclaycard",
	"barclays",
	"barefoot",
	"bargains",
	"baseball",
	"basketball",
	"bauhaus",
	"bayern",
	"bbc",
	"bbt",
	"bbva",
	"bcg",
	"bcn",
	"beats",
	"beauty",
	"beer",
	"bentley",
	"berlin",
	"best",
	"bestbuy",
	"bet",
	"bharti",
	"bible",
	"bid",
	"bike",
	"bing",
	"bingo",
	"bio",
	"black",
	"blackfriday",
	"blockbuster",
	"blog",
	"bloomberg",
	"blue",
	"bms",
	"bmw",
	"bnpparibas",
	"boats",
	"boehringer",
	"bofa",
	"bom",
	"bond",
	"boo",
	"book",
	"booking",
	"bosch",
	"bostik",
	"boston",
	"bot",
	"boutique",
	"box",
	"bradesco",
	"bridgestone",
	"broadway",
	"broker",
	"brother",
	"brussels",
	"bugatti",
	"build",
	"builders",
	"business",
	"buy",
	"buzz",
	"bzh",
	"cab",
	"cafe",
	"cal",
	"call",
	"calvinklein",
	"cam",
	"camera",
	"camp",
	"cancerresearch",
	"canon",
	"capetown",
	"capital",
	"capitalone",
	"car",
	"caravan",
	"cards",
	"care",
	"career",
	"careers",
	"cars",
	"casa",
	"case",
	"cash",
	"casino",
	"catering",
	"catholic",
	"cba",
	"cbn",
	"cbre",
	"cbs",
	"center",
	"ceo",
	"cern",
	"cfa",
	"cfd",
	"chanel",
	"channel",
	"charity",
	"chase",
	"chat",
	"cheap",
	"chintai",
	"christmas",
	"chrome",
	"church",
	"cipriani",
	"circle",
	"cisco",
	"citadel",
	"citi",
	"citic",
	"city",
	"cityeats",
	"claims",
	"cleaning",
	"click",
	"clinic",
	"clinique",
	"clothing",
	"cloud",
	"club",
	"clubmed",
	"coach",
	"codes",
	"coffee",
	"college",
	"cologne",
	"comcast",
	"commbank",
	"community",
	"company",
	"compare",
	"computer",
	"comsec",
	"condos",
	"construction",
	"consulting",
	"contact",
	"contractors",
	"cooking",
	"cookingchannel",
	"cool",
	"corsica",
	"country",
	"coupon",
	"coupons",
	"courses",
	"cpa",
	"credit",
	"creditcard",
	"creditunion",
	"cricket",
	"crown",
	"crs",
	"cruise",
	"cruises",
	"cuisinella",
	"cymru",
	"cyou",
	"dabur",
	"dad",
	"dance",
	"data",
	"date",
	"dating",
	"datsun",
	"day",
	"dclk",
	"dds",
	"deal",
	"dealer",
	"deals",
	"degree",
	"delivery",
	"dell",
	"deloitte",
	"delta",
	"democrat",
	"dental",
	"dentist",
	"desi",
	"design",
	"dev",
	"dhl",
	"diamonds",
	"diet",
	"digital",
	"direct",
	"directory",
	"discount",
	"discover",
	"dish",
	"diy",
	"dnp",
	"docs",
	"doctor",
	"dog",
	"domains",
	"dot",
	"download",
	"drive",
	"dtv",
	"dubai",
	"dunlop",
	"dupont",
	"durban",
	"dvag",
	"dvr",
	"earth",
	"eat",
	"eco",
	"edeka",
	"education",
	"email",
	"emerck",
	"energy",
	"engineer",
	"engineering",
	"enterprises",
	"epson",
	"equipment",
	"ericsson",
	"erni",
	"esq",
	"estate",
	"etisalat",
	"eurovision",
	"eus",
	"events",
	"exchange",
	"expert",
	"exposed",
	"express",
	"extraspace",
	"fage",
	"fail",
	"fairwinds",
	"faith",
	"family",
	"fan",
	"fans",
	"farm",
	"farmers",
	"fashion",
	"fast",
	"fedex",
	"feedback",
	"ferrari",
	"ferrero",
	"fiat",
	"fidelity",
	"fido",
	"film",
	"final",
	"finance",
	"financial",
	"fire",
	"firestone",
	"firmdale",
	"fish",
	"fishing",
	"fit",
	"fitness",
	"flickr",
	"flights",
	"flir",
	"florist",
	"flowers",
	"fly",
	"foo",
	"food",
	"foodnetwork",
	"football",
	"ford",
	"forex",
	"forsale",
	"forum",
	"foundation",
	"fox",
	"free",
	"fresenius",
	"frl",
	"frogans",
	"frontdoor",
	"frontier",
	"ftr",
	"fujitsu",
	"fun",
	"fund",
	"furniture",
	"futbol",
	"fyi",
	"gal",
	"gallery",
	"gallo",
	"gallup",
	"game",
	"games",
	"gap",
	"garden",
	"gay",
	"gbiz",
	"gdn",
	"gea",
	"gent",
	"genting",
	"george",
	"ggee",
	"gift",
	"gifts",
	"gives",
	"giving",
	"glass",
	"gle",
	"global",
	"globo",
	"gmail",
	"gmbh",
	"gmo",
	"gmx",
	"godaddy",
	"gold",
	"goldpoint",
	"golf",
	"goo",
	"goodyear",
	"goog",
	"google",
	"gop",
	"got",
	"grainger",
	"graphics",
	"gratis",
	"green",
	"gripe",
	"grocery",
	"group",
	"guardian",
	"gucci",
	"guge",
	"guide",
	"guitars",
	"guru",
	"hair",
	"hamburg",
	"hangout",
	"haus",
	"hbo",
	"hdfc",
	"hdfcbank",
	"health",
	"healthcare",
	"help",
	"helsinki",
	"here",
	"hermes",
	"hgtv",
	"hiphop",
	"hisamitsu",
	"hitachi",
	"hiv",
	"hkt",
	"hockey",
	"holdings",
	"holiday",
	"homedepot",
	"homegoods",
	"homes",
	"homesense",
	"honda",
	"horse",
	"hospital",
	"host",
	"hosting",
	"hot",
	"hoteles",
	"hotels",
	"hotmail",
	"house",
	"how",
	"hsbc",
	"hughes",
	"hyatt",
	"hyundai",
	"ibm",
	"icbc",
	"ice",
	"icu",
	"ieee",
	"ifm",
	"ikano",
	"imamat",
	"imdb",
	"immo",
	"immobilien",
	"inc",
	"industries",
	"infiniti",
	"ing",
	"ink",
	"institute",
	"insurance",
	"insure",
	"international",
	"intuit",
	"investments",
	"ipiranga",
	"irish",
	"ismaili",
	"ist",
	"istanbul",
	"itau",
	"itv",
	"jaguar",
	"java",
	"jcb",
	"jeep",
	"jetzt",
	"jewelry",
	"jio",
	"jll",
	"jmp",
	"jnj",
	"joburg",
	"jot",
	"joy",
	"jpmorgan",
	"jprs",
	"juegos",
	"juniper",
	"kaufen",
	"kddi",
	"kerryhotels",
	"kerrylogistics",
	"kerryproperties",
	"kfh",
	"kia",
	"kids",
	"kim",
	"kinder",
	"kindle",
	"kitchen",
	"kiwi",
	"koeln",
	"komatsu",
	"kosher",
	"kpmg",
	"kpn",
	"krd",
	"kred",
	"kuokgroup",
	"kyoto",
	"lacaixa",
	"lamborghini",
	"lamer",
	"lancaster",
	"lancia",
	"land",
	"landrover",
	"lanxess",
	"lasalle",
	"lat",
	"latino",
	"latrobe",
	"law",
	"lawyer",
	"lds",
	"lease",
	"leclerc",
	"lefrak",
	"legal",
	"lego",
	"lexus",
	"lgbt",
	"lidl",
	"life",
	"lifeinsurance",
	"lifestyle",
	"lighting",
	"like",
	"lilly",
	"limited",
	"limo",
	"lincoln",
	"linde",
	"link",
	"lipsy",
	"live",
	"living",
	"llc",
	"llp",
	"loan",
	"loans",
	"locker",
	"locus",
	"loft",
	"lol",
	"london",
	"lotte",
	"lotto",
	"love",
	"lpl",
	"lplfinancial",
	"ltd",
	"ltda",
	"lundbeck",
	"luxe",
	"luxury",
	"macys",
	"madrid",
	"maif",
	"maison",
	"makeup",
	"man",
	"management",
	"mango",
	"map",
	"market",
	"marketing",
	"markets",
	"marriott",
	"marshalls",
	"maserati",
	"mattel",
	"mba",
	"mckinsey",
	"med",
	"media",
	"meet",
	"melbourne",
	"meme",
	"memorial",
	"men",
	"menu",
	"merckmsd",
	"miami",
	"microsoft",
	"mini",
	"mint",
	"mit",
	"mitsubishi",
	"mlb",
	"mls",
	"mma",
	"mobile",
	"moda",
	"moe",
	"moi",
	"mom",
	"monash",
	"money",
	"monster",
	"mormon",
	"mortgage",
	"moscow",
	"moto",
	"motorcycles",
	"mov",
	"movie",
	"msd",
	"mtn",
	"mtr",
	"music",
	"mutual",
	"nab",
	"nagoya",
	"natura",
	"navy",
	"nba",
	"nec",
	"netbank",
	"netflix",
	"network",
	"neustar",
	"new",
	"news",
	"next",
	"nextdirect",
	"nexus",
	"nfl",
	"ngo",
	"nhk",
	"nico",
	"nike",
	"nikon",
	"ninja",
	"nissan",
	"nissay",
	"nokia",
	"northwesternmutual",
	"norton",
	"now",
	"nowruz",
	"nowtv",
	"nra",
	"nrw",
	"ntt",
	"nyc",
	"obi",
	"observer",
	"office",
	"okinawa",
	"olayan",
	"olayangroup",
	"oldnavy",
	"ollo",
	"omega",
	"one",
	"ong",
	"onl",
	"online",
	"ooo",
	"open",
	"oracle",
	"orange",
	"organic",
	"origins",
	"osaka",
	"otsuka",
	"ott",
	"ovh",
	"page",
	"panasonic",
	"paris",
	"pars",
	"partners",
	"parts",
	"party",
	"passagens",
	"pay",
	"pccw",
	"pet",
	"pfizer",
	"pharmacy",
	"phd",
	"philips",
	"phone",
	"photo",
	"photography",
	"photos",
	"physio",
	"pics",
	"pictet",
	"pictures",
	"pid",
	"pin",
	"ping",
	"pink",
	"pioneer",
	"pizza",
	"place",
	"play",
	"playstation",
	"plumbing",
	"plus",
	"pnc",
	"pohl",
	"poker",
	"politie",
	"porn",
	"pramerica",
	"praxi",
	"press",
	"prime",
	"prod",
	"productions",
	"prof",
	"progressive",
	"promo",
	"properties",
	"property",
	"protection",
	"pru",
	"prudential",
	"pub",
	"pwc",
	"qpon",
	"quebec",
	"quest",
	"racing",
	"radio",
	"read",
	"realestate",
	"realtor",
	"realty",
	"recipes",
	"red",
	"redstone",
	"redumbrella",
	"rehab",
	"reise",
	"reisen",
	"reit",
	"reliance",
	"ren",
	"rent",
	"rentals",
	"repair",
	"report",
	"republican",
	"rest",
	"restaurant",
	"review",
	"reviews",
	"rexroth",
	"rich",
	"richardli",
	"ricoh",
	"ril",
	"rio",
	"rip",
	"rocher",
	"rocks",
	"rodeo",
	"rogers",
	"room",
	"rsvp",
	"rugby",
	"ruhr",
	"run",
	"rwe",
	"ryukyu",
	"saarland",
	"safe",
	"safety",
	"sakura",
	"sale",
	"salon",
	"samsclub",
	"samsung",
	"sandvik",
	"sandvikcoromant",
	"sanofi",
	"sap",
	"sarl",
	"sas",
	"save",
	"saxo",
	"sbi",
	"sbs",
	"sca",
	"scb",
	"schaeffler",
	"schmidt",
	"scholarships",
	"school",
	"schule",
	"schwarz",
	"science",
	"scot",
	"search",
	"seat",
	"secure",
	"security",
	"seek",
	"select",
	"sener",
	"services",
	"ses",
	"seven",
	"sew",
	"sex",
	"sexy",
	"sfr",
	"shangrila",
	"sharp",
	"shaw",
	"shell",
	"shia",
	"shiksha",
	"shoes",
	"shop",
	"shopping",
	"shouji",
	"show",
	"showtime",
	"silk",
	"sina",
	"singles",
	"site",
	"ski",
	"skin",
	"sky",
	"skype",
	"sling",
	"smart",
	"smile",
	"sncf",
	"soccer",
	"social",
	"softbank",
	"software",
	"sohu",
	"solar",
	"solutions",
	"song",
	"sony",
	"soy",
	"spa",
	"space",
	"sport",
	"spot",
	"srl",
	"stada",
	"staples",
	"star",
	"statebank",
	"statefarm",
	"stc",
	"stcgroup",
	"stockholm",
	"storage",
	"store",
	"stream",
	"studio",
	"study",
	"style",
	"sucks",
	"supplies",
	"supply",
	"support",
	"surf",
	"surgery",
	"suzuki",
	"swatch",
	"swiss",
	"sydney",
	"systems",
	"tab",
	"taipei",
	"talk",
	"taobao",
	"target",
	"tatamotors",
	"tatar",
	"tattoo",
	"tax",
	"taxi",
	"tci",
	"tdk",
	"team",
	"tech",
	"technology",
	"temasek",
	"tennis",
	"teva",
	"thd",
	"theater",
	"theatre",
	"tiaa",
	"tickets",
	"tienda",
	"tiffany",
	"tips",
	"tires",
	"tirol",
	"tjmaxx",
	"tjx",
	"tkmaxx",
	"tmall",
	"today",
	"tokyo",
	"tools",
	"top",
	"toray",
	"toshiba",
	"total",
	"tours",
	"town",
	"toyota",
	"toys",
	"trade",
	"trading",
	"training",
	"travel",
	"travelchannel",
	"travelers",
	"travelersinsurance",
	"trust",
	"trv",
	"tube",
	"tui",
	"tunes",
	"tushu",
	"tvs",
	"ubank",
	"ubs",
	"unicom",
	"university",
	"uno",
	"uol",
	"ups",
	"vacations",
	"vana",
	"vanguard",
	"vegas",
	"ventures",
	"verisign",
	"versicherung",
	"vet",
	"viajes",
	"video",
	"vig",
	"viking",
	"villas",
	"vin",
	"vip",
	"virgin",
	"visa",
	"vision",
	"viva",
	"vivo",
	"vlaanderen",
	"vodka",
	"volkswagen",
	"volvo",
	"vote",
	"voting",
	"voto",
	"voyage",
	"vuelos",
	"wales",
	"walmart",
	"walter",
	"wang",
	"wanggou",
	"watch",
	"watches",
	"weather",
	"weatherchannel",
	"webcam",
	"weber",
	"website",
	"wedding",
	"weibo",
	"weir",
	"whoswho",
	"wien",
	"wiki",
	"williamhill",
	"win",
	"windows",
	"wine",
	"winners",
	"wme",
	"wolterskluwer",
	"woodside",
	"work",
	"works",
	"world",
	"wow",
	"wtc",
	"wtf",
	"xbox",
	"xerox",
	"xfinity",
	"xihuan",
	"xin",
	"कॉम",
	"セール",
	"佛山",
	"慈善",
	"集团",
	"在线",
	"点看",
	"คอม",
	"八卦",
	"موقع",
	"公益",
	"公司",
	"香格里拉",
	"网站",
	"移动",
	"我爱你",
	"москва",
	"католик",
	"онлайн",
	"сайт",
	"联通",
	"קום",
	"时尚",
	"微博",
	"淡马锡",
	"ファッション",
	"орг",
	"नेट",
	"ストア",
	"アマゾン",
	"삼성",
	"商标",
	"商店",
	"商城",
	"дети",
	"ポイント",
	"新闻",
	"家電",
	"كوم",
	"中文网",
	"中信",
	"娱乐",
	"谷歌",
	"電訊盈科",
	"购物",
	"クラウド",
	"通販",
	"网店",
	"संगठन",
	"餐厅",
	"网络",
	"ком",
	"亚马逊",
	"诺基亚",
	"食品",
	"飞利浦",
	"手机",
	"ارامكو",
	"العليان",
	"اتصالات",
	"بازار",
	"ابوظبي",
	"كاثوليك",
	"همراه",
	"닷컴",
	"政府",
	"شبكة",
	"بيتك",
	"عرب",
	"机构",
	"组织机构",
	"健康",
	"招聘",
	"рус",
	"大拿",
	"みんな",
	"グーグル",
	"世界",
	"書籍",
	"网址",
	"닷넷",
	"コム",
	"天主教",
	"游戏",
	"vermögensberater",
	"vermögensberatung",
	"企业",
	"信息",
	"嘉里大酒店",
	"嘉里",
	"广东",
	"政务",
	"xyz",
	"yachts",
	"yahoo",
	"yamaxun",
	"yandex",
	"yodobashi",
	"yoga",
	"yokohama",
	"you",
	"youtube",
	"yun",
	"zappos",
	"zara",
	"zero",
	"zip",
	"zone",
	"zuerich",
	"cc.ua",
	"inf.ua",
	"ltd.ua",
	"611.to",
	"graphox.us",
	"*.devcdnaccesso.com",
	"adobeaemcloud.com",
	"*.dev.adobeaemcloud.com",
	"hlx.live",
	"adobeaemcloud.net",
	"hlx.page",
	"hlx3.page",
	"beep.pl",
	"airkitapps.com",
	"airkitapps-au.com",
	"airkitapps.eu",
	"aivencloud.com",
	"barsy.ca",
	"*.compute.estate",
	"*.alces.network",
	"kasserver.com",
	"altervista.org",
	"alwaysdata.net",
	"cloudfront.net",
	"*.compute.amazonaws.com",
	"*.compute-1.amazonaws.com",
	"*.compute.amazonaws.com.cn",
	"us-east-1.amazonaws.com",
	"cn-north-1.eb.amazonaws.com.cn",
	"cn-northwest-1.eb.amazonaws.com.cn",
	"elasticbeanstalk.com",
	"ap-northeast-1.elasticbeanstalk.com",
	"ap-northeast-2.elasticbeanstalk.com",
	"ap-northeast-3.elasticbeanstalk.com",
	"ap-south-1.elasticbeanstalk.com",
	"ap-southeast-1.elasticbeanstalk.com",
	"ap-southeast-2.elasticbeanstalk.com",
	"ca-central-1.elasticbeanstalk.com",
	"eu-central-1.elasticbeanstalk.com",
	"eu-west-1.elasticbeanstalk.com",
	"eu-west-2.elasticbeanstalk.com",
	"eu-west-3.elasticbeanstalk.com",
	"sa-east-1.elasticbeanstalk.com",
	"us-east-1.elasticbeanstalk.com",
	"us-east-2.elasticbeanstalk.com",
	"us-gov-west-1.elasticbeanstalk.com",
	"us-west-1.elasticbeanstalk.com",
	"us-west-2.elasticbeanstalk.com",
	"*.elb.amazonaws.com",
	"*.elb.amazonaws.com.cn",
	"awsglobalaccelerator.com",
	"s3.amazonaws.com",
	"s3-ap-northeast-1.amazonaws.com",
	"s3-ap-northeast-2.amazonaws.com",
	"s3-ap-south-1.amazonaws.com",
	"s3-ap-southeast-1.amazonaws.com",
	"s3-ap-southeast-2.amazonaws.com",
	"s3-ca-central-1.amazonaws.com",
	"s3-eu-central-1.amazonaws.com",
	"s3-eu-west-1.amazonaws.com",
	"s3-eu-west-2.amazonaws.com",
	"s3-eu-west-3.amazonaws.com",
	"s3-external-1.amazonaws.com",
	"s3-fips-us-gov-west-1.amazonaws.com",
	"s3-sa-east-1.amazonaws.com",
	"s3-us-gov-west-1.amazonaws.com",
	"s3-us-east-2.amazonaws.com",
	"s3-us-west-1.amazonaws.com",
	"s3-us-west-2.amazonaws.com",
	"s3.ap-northeast-2.amazonaws.com",
	"s3.ap-south-1.amazonaws.com",
	"s3.cn-north-1.amazonaws.com.cn",
	"s3.ca-central-1.amazonaws.com",
	"s3.eu-central-1.amazonaws.com",
	"s3.eu-west-2.amazonaws.com",
	"s3.eu-west-3.amazonaws.com",
	"s3.us-east-2.amazonaws.com",
	"s3.dualstack.ap-northeast-1.amazonaws.com",
	"s3.dualstack.ap-northeast-2.amazonaws.com",
	"s3.dualstack.ap-south-1.amazonaws.com",
	"s3.dualstack.ap-southeast-1.amazonaws.com",
	"s3.dualstack.ap-southeast-2.amazonaws.com",
	"s3.dualstack.ca-central-1.amazonaws.com",
	"s3.dualstack.eu-central-1.amazonaws.com",
	"s3.dualstack.eu-west-1.amazonaws.com",
	"s3.dualstack.eu-west-2.amazonaws.com",
	"s3.dualstack.eu-west-3.amazonaws.com",
	"s3.dualstack.sa-east-1.amazonaws.com",
	"s3.dualstack.us-east-1.amazonaws.com",
	"s3.dualstack.us-east-2.amazonaws.com",
	"s3-website-us-east-1.amazonaws.com",
	"s3-website-us-west-1.amazonaws.com",
	"s3-website-us-west-2.amazonaws.com",
	"s3-website-ap-northeast-1.amazonaws.com",
	"s3-website-ap-southeast-1.amazonaws.com",
	"s3-website-ap-southeast-2.amazonaws.com",
	"s3-website-eu-west-1.amazonaws.com",
	"s3-website-sa-east-1.amazonaws.com",
	"s3-website.ap-northeast-2.amazonaws.com",
	"s3-website.ap-south-1.amazonaws.com",
	"s3-website.ca-central-1.amazonaws.com",
	"s3-website.eu-central-1.amazonaws.com",
	"s3-website.eu-west-2.amazonaws.com",
	"s3-website.eu-west-3.amazonaws.com",
	"s3-website.us-east-2.amazonaws.com",
	"t3l3p0rt.net",
	"tele.amune.org",
	"apigee.io",
	"siiites.com",
	"appspacehosted.com",
	"appspaceusercontent.com",
	"appudo.net",
	"on-aptible.com",
	"user.aseinet.ne.jp",
	"gv.vc",
	"d.gv.vc",
	"user.party.eus",
	"pimienta.org",
	"poivron.org",
	"potager.org",
	"sweetpepper.org",
	"myasustor.com",
	"cdn.prod.atlassian-dev.net",
	"translated.page",
	"myfritz.net",
	"onavstack.net",
	"*.awdev.ca",
	"*.advisor.ws",
	"ecommerce-shop.pl",
	"b-data.io",
	"backplaneapp.io",
	"balena-devices.com",
	"rs.ba",
	"*.banzai.cloud",
	"app.banzaicloud.io",
	"*.backyards.banzaicloud.io",
	"base.ec",
	"official.ec",
	"buyshop.jp",
	"fashionstore.jp",
	"handcrafted.jp",
	"kawaiishop.jp",
	"supersale.jp",
	"theshop.jp",
	"shopselect.net",
	"base.shop",
	"*.beget.app",
	"betainabox.com",
	"bnr.la",
	"bitbucket.io",
	"blackbaudcdn.net",
	"of.je",
	"bluebite.io",
	"boomla.net",
	"boutir.com",
	"boxfuse.io",
	"square7.ch",
	"bplaced.com",
	"bplaced.de",
	"square7.de",
	"bplaced.net",
	"square7.net",
	"shop.brendly.rs",
	"browsersafetymark.io",
	"uk0.bigv.io",
	"dh.bytemark.co.uk",
	"vm.bytemark.co.uk",
	"cafjs.com",
	"mycd.eu",
	"drr.ac",
	"uwu.ai",
	"carrd.co",
	"crd.co",
	"ju.mp",
	"ae.org",
	"br.com",
	"cn.com",
	"com.de",
	"com.se",
	"de.com",
	"eu.com",
	"gb.net",
	"hu.net",
	"jp.net",
	"jpn.com",
	"mex.com",
	"ru.com",
	"sa.com",
	"se.net",
	"uk.com",
	"uk.net",
	"us.com",
	"za.bz",
	"za.com",
	"ar.com",
	"hu.com",
	"kr.com",
	"no.com",
	"qc.com",
	"uy.com",
	"africa.com",
	"gr.com",
	"in.net",
	"web.in",
	"us.org",
	"co.com",
	"aus.basketball",
	"nz.basketball",
	"radio.am",
	"radio.fm",
	"c.la",
	"certmgr.org",
	"cx.ua",
	"discourse.group",
	"discourse.team",
	"cleverapps.io",
	"clerk.app",
	"clerkstage.app",
	"*.lcl.dev",
	"*.lclstage.dev",
	"*.stg.dev",
	"*.stgstage.dev",
	"clickrising.net",
	"c66.me",
	"cloud66.ws",
	"cloud66.zone",
	"jdevcloud.com",
	"wpdevcloud.com",
	"cloudaccess.host",
	"freesite.host",
	"cloudaccess.net",
	"cloudcontrolled.com",
	"cloudcontrolapp.com",
	"*.cloudera.site",
	"pages.dev",
	"trycloudflare.com",
	"workers.dev",
	"wnext.app",
	"co.ca",
	"*.otap.co",
	"co.cz",
	"c.cdn77.org",
	"cdn77-ssl.net",
	"r.cdn77.net",
	"rsc.cdn77.org",
	"ssl.origin.cdn77-secure.org",
	"cloudns.asia",
	"cloudns.biz",
	"cloudns.club",
	"cloudns.cc",
	"cloudns.eu",
	"cloudns.in",
	"cloudns.info",
	"cloudns.org",
	"cloudns.pro",
	"cloudns.pw",
	"cloudns.us",
	"cnpy.gdn",
	"codeberg.page",
	"co.nl",
	"co.no",
	"webhosting.be",
	"hosting-cluster.nl",
	"ac.ru",
	"edu.ru",
	"gov.ru",
	"int.ru",
	"mil.ru",
	"test.ru",
	"dyn.cosidns.de",
	"dynamisches-dns.de",
	"dnsupdater.de",
	"internet-dns.de",
	"l-o-g-i-n.de",
	"dynamic-dns.info",
	"feste-ip.net",
	"knx-server.net",
	"static-access.net",
	"realm.cz",
	"*.cryptonomic.net",
	"cupcake.is",
	"curv.dev",
	"*.customer-oci.com",
	"*.oci.customer-oci.com",
	"*.ocp.customer-oci.com",
	"*.ocs.customer-oci.com",
	"cyon.link",
	"cyon.site",
	"fnwk.site",
	"folionetwork.site",
	"platform0.app",
	"daplie.me",
	"localhost.daplie.me",
	"dattolocal.com",
	"dattorelay.com",
	"dattoweb.com",
	"mydatto.com",
	"dattolocal.net",
	"mydatto.net",
	"biz.dk",
	"co.dk",
	"firm.dk",
	"reg.dk",
	"store.dk",
	"dyndns.dappnode.io",
	"*.dapps.earth",
	"*.bzz.dapps.earth",
	"builtwithdark.com",
	"demo.datadetect.com",
	"instance.datadetect.com",
	"edgestack.me",
	"ddns5.com",
	"debian.net",
	"deno.dev",
	"deno-staging.dev",
	"dedyn.io",
	"deta.app",
	"deta.dev",
	"*.rss.my.id",
	"*.diher.solutions",
	"discordsays.com",
	"discordsez.com",
	"jozi.biz",
	"dnshome.de",
	"online.th",
	"shop.th",
	"drayddns.com",
	"shoparena.pl",
	"dreamhosters.com",
	"mydrobo.com",
	"drud.io",
	"drud.us",
	"duckdns.org",
	"bip.sh",
	"bitbridge.net",
	"dy.fi",
	"tunk.org",
	"dyndns-at-home.com",
	"dyndns-at-work.com",
	"dyndns-blog.com",
	"dyndns-free.com",
	"dyndns-home.com",
	"dyndns-ip.com",
	"dyndns-mail.com",
	"dyndns-office.com",
	"dyndns-pics.com",
	"dyndns-remote.com",
	"dyndns-server.com",
	"dyndns-web.com",
	"dyndns-wiki.com",
	"dyndns-work.com",
	"dyndns.biz",
	"dyndns.info",
	"dyndns.org",
	"dyndns.tv",
	"at-band-camp.net",
	"ath.cx",
	"barrel-of-knowledge.info",
	"barrell-of-knowledge.info",
	"better-than.tv",
	"blogdns.com",
	"blogdns.net",
	"blogdns.org",
	"blogsite.org",
	"boldlygoingnowhere.org",
	"broke-it.net",
	"buyshouses.net",
	"cechire.com",
	"dnsalias.com",
	"dnsalias.net",
	"dnsalias.org",
	"dnsdojo.com",
	"dnsdojo.net",
	"dnsdojo.org",
	"does-it.net",
	"doesntexist.com",
	"doesntexist.org",
	"dontexist.com",
	"dontexist.net",
	"dontexist.org",
	"doomdns.com",
	"doomdns.org",
	"dvrdns.org",
	"dyn-o-saur.com",
	"dynalias.com",
	"dynalias.net",
	"dynalias.org",
	"dynathome.net",
	"dyndns.ws",
	"endofinternet.net",
	"endofinternet.org",
	"endoftheinternet.org",
	"est-a-la-maison.com",
	"est-a-la-masion.com",
	"est-le-patron.com",
	"est-mon-blogueur.com",
	"for-better.biz",
	"for-more.biz",
	"for-our.info",
	"for-some.biz",
	"for-the.biz",
	"forgot.her.name",
	"forgot.his.name",
	"from-ak.com",
	"from-al.com",
	"from-ar.com",
	"from-az.net",
	"from-ca.com",
	"from-co.net",
	"from-ct.com",
	"from-dc.com",
	"from-de.com",
	"from-fl.com",
	"from-ga.com",
	"from-hi.com",
	"from-ia.com",
	"from-id.com",
	"from-il.com",
	"from-in.com",
	"from-ks.com",
	"from-ky.com",
	"from-la.net",
	"from-ma.com",
	"from-md.com",
	"from-me.org",
	"from-mi.com",
	"from-mn.com",
	"from-mo.com",
	"from-ms.com",
	"from-mt.com",
	"from-nc.com",
	"from-nd.com",
	"from-ne.com",
	"from-nh.com",
	"from-nj.com",
	"from-nm.com",
	"from-nv.com",
	"from-ny.net",
	"from-oh.com",
	"from-ok.com",
	"from-or.com",
	"from-pa.com",
	"from-pr.com",
	"from-ri.com",
	"from-sc.com",
	"from-sd.com",
	"from-tn.com",
	"from-tx.com",
	"from-ut.com",
	"from-va.com",
	"from-vt.com",
	"from-wa.com",
	"from-wi.com",
	"from-wv.com",
	"from-wy.com",
	"ftpaccess.cc",
	"fuettertdasnetz.de",
	"game-host.org",
	"game-server.cc",
	"getmyip.com",
	"gets-it.net",
	"go.dyndns.org",
	"gotdns.com",
	"gotdns.org",
	"groks-the.info",
	"groks-this.info",
	"ham-radio-op.net",
	"here-for-more.info",
	"hobby-site.com",
	"hobby-site.org",
	"home.dyndns.org",
	"homedns.org",
	"homeftp.net",
	"homeftp.org",
	"homeip.net",
	"homelinux.com",
	"homelinux.net",
	"homelinux.org",
	"homeunix.com",
	"homeunix.net",
	"homeunix.org",
	"iamallama.com",
	"in-the-band.net",
	"is-a-anarchist.com",
	"is-a-blogger.com",
	"is-a-bookkeeper.com",
	"is-a-bruinsfan.org",
	"is-a-bulls-fan.com",
	"is-a-candidate.org",
	"is-a-caterer.com",
	"is-a-celticsfan.org",
	"is-a-chef.com",
	"is-a-chef.net",
	"is-a-chef.org",
	"is-a-conservative.com",
	"is-a-cpa.com",
	"is-a-cubicle-slave.com",
	"is-a-democrat.com",
	"is-a-designer.com",
	"is-a-doctor.com",
	"is-a-financialadvisor.com",
	"is-a-geek.com",
	"is-a-geek.net",
	"is-a-geek.org",
	"is-a-green.com",
	"is-a-guru.com",
	"is-a-hard-worker.com",
	"is-a-hunter.com",
	"is-a-knight.org",
	"is-a-landscaper.com",
	"is-a-lawyer.com",
	"is-a-liberal.com",
	"is-a-libertarian.com",
	"is-a-linux-user.org",
	"is-a-llama.com",
	"is-a-musician.com",
	"is-a-nascarfan.com",
	"is-a-nurse.com",
	"is-a-painter.com",
	"is-a-patsfan.org",
	"is-a-personaltrainer.com",
	"is-a-photographer.com",
	"is-a-player.com",
	"is-a-republican.com",
	"is-a-rockstar.com",
	"is-a-socialist.com",
	"is-a-soxfan.org",
	"is-a-student.com",
	"is-a-teacher.com",
	"is-a-techie.com",
	"is-a-therapist.com",
	"is-an-accountant.com",
	"is-an-actor.com",
	"is-an-actress.com",
	"is-an-anarchist.com",
	"is-an-artist.com",
	"is-an-engineer.com",
	"is-an-entertainer.com",
	"is-by.us",
	"is-certified.com",
	"is-found.org",
	"is-gone.com",
	"is-into-anime.com",
	"is-into-cars.com",
	"is-into-cartoons.com",
	"is-into-games.com",
	"is-leet.com",
	"is-lost.org",
	"is-not-certified.com",
	"is-saved.org",
	"is-slick.com",
	"is-uberleet.com",
	"is-very-bad.org",
	"is-very-evil.org",
	"is-very-good.org",
	"is-very-nice.org",
	"is-very-sweet.org",
	"is-with-theband.com",
	"isa-geek.com",
	"isa-geek.net",
	"isa-geek.org",
	"isa-hockeynut.com",
	"issmarterthanyou.com",
	"isteingeek.de",
	"istmein.de",
	"kicks-ass.net",
	"kicks-ass.org",
	"knowsitall.info",
	"land-4-sale.us",
	"lebtimnetz.de",
	"leitungsen.de",
	"likes-pie.com",
	"likescandy.com",
	"merseine.nu",
	"mine.nu",
	"misconfused.org",
	"mypets.ws",
	"myphotos.cc",
	"neat-url.com",
	"office-on-the.net",
	"on-the-web.tv",
	"podzone.net",
	"podzone.org",
	"readmyblog.org",
	"saves-the-whales.com",
	"scrapper-site.net",
	"scrapping.cc",
	"selfip.biz",
	"selfip.com",
	"selfip.info",
	"selfip.net",
	"selfip.org",
	"sells-for-less.com",
	"sells-for-u.com",
	"sells-it.net",
	"sellsyourhome.org",
	"servebbs.com",
	"servebbs.net",
	"servebbs.org",
	"serveftp.net",
	"serveftp.org",
	"servegame.org",
	"shacknet.nu",
	"simple-url.com",
	"space-to-rent.com",
	"stuff-4-sale.org",
	"stuff-4-sale.us",
	"teaches-yoga.com",
	"thruhere.net",
	"traeumtgerade.de",
	"webhop.biz",
	"webhop.info",
	"webhop.net",
	"webhop.org",
	"worse-than.tv",
	"writesthisblog.com",
	"ddnss.de",
	"dyn.ddnss.de",
	"dyndns.ddnss.de",
	"dyndns1.de",
	"dyn-ip24.de",
	"home-webserver.de",
	"dyn.home-webserver.de",
	"myhome-server.de",
	"ddnss.org",
	"definima.net",
	"definima.io",
	"ondigitalocean.app",
	"*.digitaloceanspaces.com",
	"bci.dnstrace.pro",
	"ddnsfree.com",
	"ddnsgeek.com",
	"giize.com",
	"gleeze.com",
	"kozow.com",
	"loseyourip.com",
	"ooguy.com",
	"theworkpc.com",
	"casacam.net",
	"dynu.net",
	"accesscam.org",
	"camdvr.org",
	"freeddns.org",
	"mywire.org",
	"webredirect.org",
	"myddns.rocks",
	"blogsite.xyz",
	"dynv6.net",
	"e4.cz",
	"eero.online",
	"eero-stage.online",
	"elementor.cloud",
	"elementor.cool",
	"en-root.fr",
	"mytuleap.com",
	"tuleap-partners.com",
	"encr.app",
	"encoreapi.com",
	"onred.one",
	"staging.onred.one",
	"eu.encoway.cloud",
	"eu.org",
	"al.eu.org",
	"asso.eu.org",
	"at.eu.org",
	"au.eu.org",
	"be.eu.org",
	"bg.eu.org",
	"ca.eu.org",
	"cd.eu.org",
	"ch.eu.org",
	"cn.eu.org",
	"cy.eu.org",
	"cz.eu.org",
	"de.eu.org",
	"dk.eu.org",
	"edu.eu.org",
	"ee.eu.org",
	"es.eu.org",
	"fi.eu.org",
	"fr.eu.org",
	"gr.eu.org",
	"hr.eu.org",
	"hu.eu.org",
	"ie.eu.org",
	"il.eu.org",
	"in.eu.org",
	"int.eu.org",
	"is.eu.org",
	"it.eu.org",
	"jp.eu.org",
	"kr.eu.org",
	"lt.eu.org",
	"lu.eu.org",
	"lv.eu.org",
	"mc.eu.org",
	"me.eu.org",
	"mk.eu.org",
	"mt.eu.org",
	"my.eu.org",
	"net.eu.org",
	"ng.eu.org",
	"nl.eu.org",
	"no.eu.org",
	"nz.eu.org",
	"paris.eu.org",
	"pl.eu.org",
	"pt.eu.org",
	"q-a.eu.org",
	"ro.eu.org",
	"ru.eu.org",
	"se.eu.org",
	"si.eu.org",
	"sk.eu.org",
	"tr.eu.org",
	"uk.eu.org",
	"us.eu.org",
	"eurodir.ru",
	"eu-1.evennode.com",
	"eu-2.evennode.com",
	"eu-3.evennode.com",
	"eu-4.evennode.com",
	"us-1.evennode.com",
	"us-2.evennode.com",
	"us-3.evennode.com",
	"us-4.evennode.com",
	"twmail.cc",
	"twmail.net",
	"twmail.org",
	"mymailer.com.tw",
	"url.tw",
	"onfabrica.com",
	"apps.fbsbx.com",
	"ru.net",
	"adygeya.ru",
	"bashkiria.ru",
	"bir.ru",
	"cbg.ru",
	"com.ru",
	"dagestan.ru",
	"grozny.ru",
	"kalmykia.ru",
	"kustanai.ru",
	"marine.ru",
	"mordovia.ru",
	"msk.ru",
	"mytis.ru",
	"nalchik.ru",
	"nov.ru",
	"pyatigorsk.ru",
	"spb.ru",
	"vladikavkaz.ru",
	"vladimir.ru",
	"abkhazia.su",
	"adygeya.su",
	"aktyubinsk.su",
	"arkhangelsk.su",
	"armenia.su",
	"ashgabad.su",
	"azerbaijan.su",
	"balashov.su",
	"bashkiria.su",
	"bryansk.su",
	"bukhara.su",
	"chimkent.su",
	"dagestan.su",
	"east-kazakhstan.su",
	"exnet.su",
	"georgia.su",
	"grozny.su",
	"ivanovo.su",
	"jambyl.su",
	"kalmykia.su",
	"kaluga.su",
	"karacol.su",
	"karaganda.su",
	"karelia.su",
	"khakassia.su",
	"krasnodar.su",
	"kurgan.su",
	"kustanai.su",
	"lenug.su",
	"mangyshlak.su",
	"mordovia.su",
	"msk.su",
	"murmansk.su",
	"nalchik.su",
	"navoi.su",
	"north-kazakhstan.su",
	"nov.su",
	"obninsk.su",
	"penza.su",
	"pokrovsk.su",
	"sochi.su",
	"spb.su",
	"tashkent.su",
	"termez.su",
	"togliatti.su",
	"troitsk.su",
	"tselinograd.su",
	"tula.su",
	"tuva.su",
	"vladikavkaz.su",
	"vladimir.su",
	"vologda.su",
	"channelsdvr.net",
	"u.channelsdvr.net",
	"edgecompute.app",
	"fastly-terrarium.com",
	"fastlylb.net",
	"map.fastlylb.net",
	"freetls.fastly.net",
	"map.fastly.net",
	"a.prod.fastly.net",
	"global.prod.fastly.net",
	"a.ssl.fastly.net",
	"b.ssl.fastly.net",
	"global.ssl.fastly.net",
	"fastvps-server.com",
	"fastvps.host",
	"myfast.host",
	"fastvps.site",
	"myfast.space",
	"fedorainfracloud.org",
	"fedorapeople.org",
	"cloud.fedoraproject.org",
	"app.os.fedoraproject.org",
	"app.os.stg.fedoraproject.org",
	"conn.uk",
	"copro.uk",
	"hosp.uk",
	"mydobiss.com",
	"fh-muenster.io",
	"filegear.me",
	"filegear-au.me",
	"filegear-de.me",
	"filegear-gb.me",
	"filegear-ie.me",
	"filegear-jp.me",
	"filegear-sg.me",
	"firebaseapp.com",
	"fireweb.app",
	"flap.id",
	"onflashdrive.app",
	"fldrv.com",
	"fly.dev",
	"edgeapp.net",
	"shw.io",
	"flynnhosting.net",
	"forgeblocks.com",
	"id.forgerock.io",
	"framer.app",
	"framercanvas.com",
	"*.frusky.de",
	"ravpage.co.il",
	"0e.vc",
	"freebox-os.com",
	"freeboxos.com",
	"fbx-os.fr",
	"fbxos.fr",
	"freebox-os.fr",
	"freeboxos.fr",
	"freedesktop.org",
	"freemyip.com",
	"wien.funkfeuer.at",
	"*.futurecms.at",
	"*.ex.futurecms.at",
	"*.in.futurecms.at",
	"futurehosting.at",
	"futuremailing.at",
	"*.ex.ortsinfo.at",
	"*.kunden.ortsinfo.at",
	"*.statics.cloud",
	"independent-commission.uk",
	"independent-inquest.uk",
	"independent-inquiry.uk",
	"independent-panel.uk",
	"independent-review.uk",
	"public-inquiry.uk",
	"royal-commission.uk",
	"campaign.gov.uk",
	"service.gov.uk",
	"api.gov.uk",
	"gehirn.ne.jp",
	"usercontent.jp",
	"gentapps.com",
	"gentlentapis.com",
	"lab.ms",
	"cdn-edges.net",
	"ghost.io",
	"gsj.bz",
	"githubusercontent.com",
	"githubpreview.dev",
	"github.io",
	"gitlab.io",
	"gitapp.si",
	"gitpage.si",
	"glitch.me",
	"nog.community",
	"co.ro",
	"shop.ro",
	"lolipop.io",
	"angry.jp",
	"babyblue.jp",
	"babymilk.jp",
	"backdrop.jp",
	"bambina.jp",
	"bitter.jp",
	"blush.jp",
	"boo.jp",
	"boy.jp",
	"boyfriend.jp",
	"but.jp",
	"candypop.jp",
	"capoo.jp",
	"catfood.jp",
	"cheap.jp",
	"chicappa.jp",
	"chillout.jp",
	"chips.jp",
	"chowder.jp",
	"chu.jp",
	"ciao.jp",
	"cocotte.jp",
	"coolblog.jp",
	"cranky.jp",
	"cutegirl.jp",
	"daa.jp",
	"deca.jp",
	"deci.jp",
	"digick.jp",
	"egoism.jp",
	"fakefur.jp",
	"fem.jp",
	"flier.jp",
	"floppy.jp",
	"fool.jp",
	"frenchkiss.jp",
	"girlfriend.jp",
	"girly.jp",
	"gloomy.jp",
	"gonna.jp",
	"greater.jp",
	"hacca.jp",
	"heavy.jp",
	"her.jp",
	"hiho.jp",
	"hippy.jp",
	"holy.jp",
	"hungry.jp",
	"icurus.jp",
	"itigo.jp",
	"jellybean.jp",
	"kikirara.jp",
	"kill.jp",
	"kilo.jp",
	"kuron.jp",
	"littlestar.jp",
	"lolipopmc.jp",
	"lolitapunk.jp",
	"lomo.jp",
	"lovepop.jp",
	"lovesick.jp",
	"main.jp",
	"mods.jp",
	"mond.jp",
	"mongolian.jp",
	"moo.jp",
	"namaste.jp",
	"nikita.jp",
	"nobushi.jp",
	"noor.jp",
	"oops.jp",
	"parallel.jp",
	"parasite.jp",
	"pecori.jp",
	"peewee.jp",
	"penne.jp",
	"pepper.jp",
	"perma.jp",
	"pigboat.jp",
	"pinoko.jp",
	"punyu.jp",
	"pupu.jp",
	"pussycat.jp",
	"pya.jp",
	"raindrop.jp",
	"readymade.jp",
	"sadist.jp",
	"schoolbus.jp",
	"secret.jp",
	"staba.jp",
	"stripper.jp",
	"sub.jp",
	"sunnyday.jp",
	"thick.jp",
	"tonkotsu.jp",
	"under.jp",
	"upper.jp",
	"velvet.jp",
	"verse.jp",
	"versus.jp",
	"vivian.jp",
	"watson.jp",
	"weblike.jp",
	"whitesnow.jp",
	"zombie.jp",
	"heteml.net",
	"cloudapps.digital",
	"london.cloudapps.digital",
	"pymnt.uk",
	"homeoffice.gov.uk",
	"ro.im",
	"goip.de",
	"run.app",
	"a.run.app",
	"web.app",
	"*.0emm.com",
	"appspot.com",
	"*.r.appspot.com",
	"codespot.com",
	"googleapis.com",
	"googlecode.com",
	"pagespeedmobilizer.com",
	"publishproxy.com",
	"withgoogle.com",
	"withyoutube.com",
	"*.gateway.dev",
	"cloud.goog",
	"translate.goog",
	"*.usercontent.goog",
	"cloudfunctions.net",
	"blogspot.ae",
	"blogspot.al",
	"blogspot.am",
	"blogspot.ba",
	"blogspot.be",
	"blogspot.bg",
	"blogspot.bj",
	"blogspot.ca",
	"blogspot.cf",
	"blogspot.ch",
	"blogspot.cl",
	"blogspot.co.at",
	"blogspot.co.id",
	"blogspot.co.il",
	"blogspot.co.ke",
	"blogspot.co.nz",
	"blogspot.co.uk",
	"blogspot.co.za",
	"blogspot.com",
	"blogspot.com.ar",
	"blogspot.com.au",
	"blogspot.com.br",
	"blogspot.com.by",
	"blogspot.com.co",
	"blogspot.com.cy",
	"blogspot.com.ee",
	"blogspot.com.eg",
	"blogspot.com.es",
	"blogspot.com.mt",
	"blogspot.com.ng",
	"blogspot.com.tr",
	"blogspot.com.uy",
	"blogspot.cv",
	"blogspot.cz",
	"blogspot.de",
	"blogspot.dk",
	"blogspot.fi",
	"blogspot.fr",
	"blogspot.gr",
	"blogspot.hk",
	"blogspot.hr",
	"blogspot.hu",
	"blogspot.ie",
	"blogspot.in",
	"blogspot.is",
	"blogspot.it",
	"blogspot.jp",
	"blogspot.kr",
	"blogspot.li",
	"blogspot.lt",
	"blogspot.lu",
	"blogspot.md",
	"blogspot.mk",
	"blogspot.mr",
	"blogspot.mx",
	"blogspot.my",
	"blogspot.nl",
	"blogspot.no",
	"blogspot.pe",
	"blogspot.pt",
	"blogspot.qa",
	"blogspot.re",
	"blogspot.ro",
	"blogspot.rs",
	"blogspot.ru",
	"blogspot.se",
	"blogspot.sg",
	"blogspot.si",
	"blogspot.sk",
	"blogspot.sn",
	"blogspot.td",
	"blogspot.tw",
	"blogspot.ug",
	"blogspot.vn",
	"goupile.fr",
	"gov.nl",
	"awsmppl.com",
	"günstigbestellen.de",
	"günstigliefern.de",
	"fin.ci",
	"free.hr",
	"caa.li",
	"ua.rs",
	"conf.se",
	"hs.zone",
	"hs.run",
	"hashbang.sh",
	"hasura.app",
	"hasura-app.io",
	"pages.it.hs-heilbronn.de",
	"hepforge.org",
	"herokuapp.com",
	"herokussl.com",
	"ravendb.cloud",
	"myravendb.com",
	"ravendb.community",
	"ravendb.me",
	"development.run",
	"ravendb.run",
	"homesklep.pl",
	"secaas.hk",
	"hoplix.shop",
	"orx.biz",
	"biz.gl",
	"col.ng",
	"firm.ng",
	"gen.ng",
	"ltd.ng",
	"ngo.ng",
	"edu.scot",
	"sch.so",
	"hostyhosting.io",
	"häkkinen.fi",
	"*.moonscale.io",
	"moonscale.net",
	"iki.fi",
	"ibxos.it",
	"iliadboxos.it",
	"impertrixcdn.com",
	"impertrix.com",
	"smushcdn.com",
	"wphostedmail.com",
	"wpmucdn.com",
	"tempurl.host",
	"wpmudev.host",
	"dyn-berlin.de",
	"in-berlin.de",
	"in-brb.de",
	"in-butter.de",
	"in-dsl.de",
	"in-dsl.net",
	"in-dsl.org",
	"in-vpn.de",
	"in-vpn.net",
	"in-vpn.org",
	"biz.at",
	"info.at",
	"info.cx",
	"ac.leg.br",
	"al.leg.br",
	"am.leg.br",
	"ap.leg.br",
	"ba.leg.br",
	"ce.leg.br",
	"df.leg.br",
	"es.leg.br",
	"go.leg.br",
	"ma.leg.br",
	"mg.leg.br",
	"ms.leg.br",
	"mt.leg.br",
	"pa.leg.br",
	"pb.leg.br",
	"pe.leg.br",
	"pi.leg.br",
	"pr.leg.br",
	"rj.leg.br",
	"rn.leg.br",
	"ro.leg.br",
	"rr.leg.br",
	"rs.leg.br",
	"sc.leg.br",
	"se.leg.br",
	"sp.leg.br",
	"to.leg.br",
	"pixolino.com",
	"na4u.ru",
	"iopsys.se",
	"ipifony.net",
	"iservschule.de",
	"mein-iserv.de",
	"schulplattform.de",
	"schulserver.de",
	"test-iserv.de",
	"iserv.dev",
	"iobb.net",
	"mel.cloudlets.com.au",
	"cloud.interhostsolutions.be",
	"users.scale.virtualcloud.com.br",
	"mycloud.by",
	"alp1.ae.flow.ch",
	"appengine.flow.ch",
	"es-1.axarnet.cloud",
	"diadem.cloud",
	"vip.jelastic.cloud",
	"jele.cloud",
	"it1.eur.aruba.jenv-aruba.cloud",
	"it1.jenv-aruba.cloud",
	"keliweb.cloud",
	"cs.keliweb.cloud",
	"oxa.cloud",
	"tn.oxa.cloud",
	"uk.oxa.cloud",
	"primetel.cloud",
	"uk.primetel.cloud",
	"ca.reclaim.cloud",
	"uk.reclaim.cloud",
	"us.reclaim.cloud",
	"ch.trendhosting.cloud",
	"de.trendhosting.cloud",
	"jele.club",
	"amscompute.com",
	"clicketcloud.com",
	"dopaas.com",
	"hidora.com",
	"paas.hosted-by-previder.com",
	"rag-cloud.hosteur.com",
	"rag-cloud-ch.hosteur.com",
	"jcloud.ik-server.com",
	"jcloud-ver-jpc.ik-server.com",
	"demo.jelastic.com",
	"kilatiron.com",
	"paas.massivegrid.com",
	"jed.wafaicloud.com",
	"lon.wafaicloud.com",
	"ryd.wafaicloud.com",
	"j.scaleforce.com.cy",
	"jelastic.dogado.eu",
	"fi.cloudplatform.fi",
	"demo.datacenter.fi",
	"paas.datacenter.fi",
	"jele.host",
	"mircloud.host",
	"paas.beebyte.io",
	"sekd1.beebyteapp.io",
	"jele.io",
	"cloud-fr1.unispace.io",
	"jc.neen.it",
	"cloud.jelastic.open.tim.it",
	"jcloud.kz",
	"upaas.kazteleport.kz",
	"cloudjiffy.net",
	"fra1-de.cloudjiffy.net",
	"west1-us.cloudjiffy.net",
	"jls-sto1.elastx.net",
	"jls-sto2.elastx.net",
	"jls-sto3.elastx.net",
	"faststacks.net",
	"fr-1.paas.massivegrid.net",
	"lon-1.paas.massivegrid.net",
	"lon-2.paas.massivegrid.net",
	"ny-1.paas.massivegrid.net",
	"ny-2.paas.massivegrid.net",
	"sg-1.paas.massivegrid.net",
	"jelastic.saveincloud.net",
	"nordeste-idc.saveincloud.net",
	"j.scaleforce.net",
	"jelastic.tsukaeru.net",
	"sdscloud.pl",
	"unicloud.pl",
	"mircloud.ru",
	"jelastic.regruhosting.ru",
	"enscaled.sg",
	"jele.site",
	"jelastic.team",
	"orangecloud.tn",
	"j.layershift.co.uk",
	"phx.enscaled.us",
	"mircloud.us",
	"myjino.ru",
	"*.hosting.myjino.ru",
	"*.landing.myjino.ru",
	"*.spectrum.myjino.ru",
	"*.vps.myjino.ru",
	"jotelulu.cloud",
	"*.triton.zone",
	"*.cns.joyent.com",
	"js.org",
	"kaas.gg",
	"khplay.nl",
	"ktistory.com",
	"kapsi.fi",
	"keymachine.de",
	"kinghost.net",
	"uni5.net",
	"knightpoint.systems",
	"koobin.events",
	"oya.to",
	"kuleuven.cloud",
	"ezproxy.kuleuven.be",
	"co.krd",
	"edu.krd",
	"krellian.net",
	"webthings.io",
	"git-repos.de",
	"lcube-server.de",
	"svn-repos.de",
	"leadpages.co",
	"lpages.co",
	"lpusercontent.com",
	"lelux.site",
	"co.business",
	"co.education",
	"co.events",
	"co.financial",
	"co.network",
	"co.place",
	"co.technology",
	"app.lmpm.com",
	"linkyard.cloud",
	"linkyard-cloud.ch",
	"members.linode.com",
	"*.nodebalancer.linode.com",
	"*.linodeobjects.com",
	"ip.linodeusercontent.com",
	"we.bs",
	"*.user.localcert.dev",
	"localzone.xyz",
	"loginline.app",
	"loginline.dev",
	"loginline.io",
	"loginline.services",
	"loginline.site",
	"servers.run",
	"lohmus.me",
	"krasnik.pl",
	"leczna.pl",
	"lubartow.pl",
	"lublin.pl",
	"poniatowa.pl",
	"swidnik.pl",
	"glug.org.uk",
	"lug.org.uk",
	"lugs.org.uk",
	"barsy.bg",
	"barsy.co.uk",
	"barsyonline.co.uk",
	"barsycenter.com",
	"barsyonline.com",
	"barsy.club",
	"barsy.de",
	"barsy.eu",
	"barsy.in",
	"barsy.info",
	"barsy.io",
	"barsy.me",
	"barsy.menu",
	"barsy.mobi",
	"barsy.net",
	"barsy.online",
	"barsy.org",
	"barsy.pro",
	"barsy.pub",
	"barsy.ro",
	"barsy.shop",
	"barsy.site",
	"barsy.support",
	"barsy.uk",
	"*.magentosite.cloud",
	"mayfirst.info",
	"mayfirst.org",
	"hb.cldmail.ru",
	"cn.vu",
	"mazeplay.com",
	"mcpe.me",
	"mcdir.me",
	"mcdir.ru",
	"mcpre.ru",
	"vps.mcdir.ru",
	"mediatech.by",
	"mediatech.dev",
	"hra.health",
	"miniserver.com",
	"memset.net",
	"messerli.app",
	"*.cloud.metacentrum.cz",
	"custom.metacentrum.cz",
	"flt.cloud.muni.cz",
	"usr.cloud.muni.cz",
	"meteorapp.com",
	"eu.meteorapp.com",
	"co.pl",
	"*.azurecontainer.io",
	"azurewebsites.net",
	"azure-mobile.net",
	"cloudapp.net",
	"azurestaticapps.net",
	"1.azurestaticapps.net",
	"centralus.azurestaticapps.net",
	"eastasia.azurestaticapps.net",
	"eastus2.azurestaticapps.net",
	"westeurope.azurestaticapps.net",
	"westus2.azurestaticapps.net",
	"csx.cc",
	"mintere.site",
	"forte.id",
	"mozilla-iot.org",
	"bmoattachments.org",
	"net.ru",
	"org.ru",
	"pp.ru",
	"hostedpi.com",
	"customer.mythic-beasts.com",
	"caracal.mythic-beasts.com",
	"fentiger.mythic-beasts.com",
	"lynx.mythic-beasts.com",
	"ocelot.mythic-beasts.com",
	"oncilla.mythic-beasts.com",
	"onza.mythic-beasts.com",
	"sphinx.mythic-beasts.com",
	"vs.mythic-beasts.com",
	"x.mythic-beasts.com",
	"yali.mythic-beasts.com",
	"cust.retrosnub.co.uk",
	"ui.nabu.casa",
	"pony.club",
	"of.fashion",
	"in.london",
	"of.london",
	"from.marketing",
	"with.marketing",
	"for.men",
	"repair.men",
	"and.mom",
	"for.mom",
	"for.one",
	"under.one",
	"for.sale",
	"that.win",
	"from.work",
	"to.work",
	"cloud.nospamproxy.com",
	"netlify.app",
	"4u.com",
	"ngrok.io",
	"nh-serv.co.uk",
	"nfshost.com",
	"*.developer.app",
	"noop.app",
	"*.northflank.app",
	"*.build.run",
	"*.code.run",
	"*.database.run",
	"*.migration.run",
	"noticeable.news",
	"dnsking.ch",
	"mypi.co",
	"n4t.co",
	"001www.com",
	"ddnslive.com",
	"myiphost.com",
	"forumz.info",
	"16-b.it",
	"32-b.it",
	"64-b.it",
	"soundcast.me",
	"tcp4.me",
	"dnsup.net",
	"hicam.net",
	"now-dns.net",
	"ownip.net",
	"vpndns.net",
	"dynserv.org",
	"now-dns.org",
	"x443.pw",
	"now-dns.top",
	"ntdll.top",
	"freeddns.us",
	"crafting.xyz",
	"zapto.xyz",
	"nsupdate.info",
	"nerdpol.ovh",
	"blogsyte.com",
	"brasilia.me",
	"cable-modem.org",
	"ciscofreak.com",
	"collegefan.org",
	"couchpotatofries.org",
	"damnserver.com",
	"ddns.me",
	"ditchyourip.com",
	"dnsfor.me",
	"dnsiskinky.com",
	"dvrcam.info",
	"dynns.com",
	"eating-organic.net",
	"fantasyleague.cc",
	"geekgalaxy.com",
	"golffan.us",
	"health-carereform.com",
	"homesecuritymac.com",
	"homesecuritypc.com",
	"hopto.me",
	"ilovecollege.info",
	"loginto.me",
	"mlbfan.org",
	"mmafan.biz",
	"myactivedirectory.com",
	"mydissent.net",
	"myeffect.net",
	"mymediapc.net",
	"mypsx.net",
	"mysecuritycamera.com",
	"mysecuritycamera.net",
	"mysecuritycamera.org",
	"net-freaks.com",
	"nflfan.org",
	"nhlfan.net",
	"no-ip.ca",
	"no-ip.co.uk",
	"no-ip.net",
	"noip.us",
	"onthewifi.com",
	"pgafan.net",
	"point2this.com",
	"pointto.us",
	"privatizehealthinsurance.net",
	"quicksytes.com",
	"read-books.org",
	"securitytactics.com",
	"serveexchange.com",
	"servehumour.com",
	"servep2p.com",
	"servesarcasm.com",
	"stufftoread.com",
	"ufcfan.org",
	"unusualperson.com",
	"workisboring.com",
	"3utilities.com",
	"bounceme.net",
	"ddns.net",
	"ddnsking.com",
	"gotdns.ch",
	"hopto.org",
	"myftp.biz",
	"myftp.org",
	"myvnc.com",
	"no-ip.biz",
	"no-ip.info",
	"no-ip.org",
	"noip.me",
	"redirectme.net",
	"servebeer.com",
	"serveblog.net",
	"servecounterstrike.com",
	"serveftp.com",
	"servegame.com",
	"servehalflife.com",
	"servehttp.com",
	"serveirc.com",
	"serveminecraft.net",
	"servemp3.com",
	"servepics.com",
	"servequake.com",
	"sytes.net",
	"webhop.me",
	"zapto.org",
	"stage.nodeart.io",
	"pcloud.host",
	"nyc.mn",
	"static.observableusercontent.com",
	"cya.gg",
	"omg.lol",
	"cloudycluster.net",
	"omniwe.site",
	"service.one",
	"nid.io",
	"opensocial.site",
	"opencraft.hosting",
	"orsites.com",
	"operaunite.com",
	"tech.orange",
	"authgear-staging.com",
	"authgearapps.com",
	"skygearapp.com",
	"outsystemscloud.com",
	"*.webpaas.ovh.net",
	"*.hosting.ovh.net",
	"ownprovider.com",
	"own.pm",
	"*.owo.codes",
	"ox.rs",
	"oy.lc",
	"pgfog.com",
	"pagefrontapp.com",
	"pagexl.com",
	"*.paywhirl.com",
	"bar0.net",
	"bar1.net",
	"bar2.net",
	"rdv.to",
	"art.pl",
	"gliwice.pl",
	"krakow.pl",
	"poznan.pl",
	"wroc.pl",
	"zakopane.pl",
	"pantheonsite.io",
	"gotpantheon.com",
	"mypep.link",
	"perspecta.cloud",
	"lk3.ru",
	"on-web.fr",
	"bc.platform.sh",
	"ent.platform.sh",
	"eu.platform.sh",
	"us.platform.sh",
	"*.platformsh.site",
	"*.tst.site",
	"platter-app.com",
	"platter-app.dev",
	"platterp.us",
	"pdns.page",
	"plesk.page",
	"pleskns.com",
	"dyn53.io",
	"onporter.run",
	"co.bn",
	"postman-echo.com",
	"pstmn.io",
	"mock.pstmn.io",
	"httpbin.org",
	"prequalifyme.today",
	"xen.prgmr.com",
	"priv.at",
	"prvcy.page",
	"*.dweb.link",
	"protonet.io",
	"chirurgiens-dentistes-en-france.fr",
	"byen.site",
	"pubtls.org",
	"pythonanywhere.com",
	"eu.pythonanywhere.com",
	"qoto.io",
	"qualifioapp.com",
	"qbuser.com",
	"cloudsite.builders",
	"instances.spawn.cc",
	"instantcloud.cn",
	"ras.ru",
	"qa2.com",
	"qcx.io",
	"*.sys.qcx.io",
	"dev-myqnapcloud.com",
	"alpha-myqnapcloud.com",
	"myqnapcloud.com",
	"*.quipelements.com",
	"vapor.cloud",
	"vaporcloud.io",
	"rackmaze.com",
	"rackmaze.net",
	"g.vbrplsbx.io",
	"*.on-k3s.io",
	"*.on-rancher.cloud",
	"*.on-rio.io",
	"readthedocs.io",
	"rhcloud.com",
	"app.render.com",
	"onrender.com",
	"repl.co",
	"id.repl.co",
	"repl.run",
	"resindevice.io",
	"devices.resinstaging.io",
	"hzc.io",
	"wellbeingzone.eu",
	"wellbeingzone.co.uk",
	"adimo.co.uk",
	"itcouldbewor.se",
	"git-pages.rit.edu",
	"rocky.page",
	"биз.рус",
	"ком.рус",
	"крым.рус",
	"мир.рус",
	"мск.рус",
	"орг.рус",
	"самара.рус",
	"сочи.рус",
	"спб.рус",
	"я.рус",
	"*.builder.code.com",
	"*.dev-builder.code.com",
	"*.stg-builder.code.com",
	"sandcats.io",
	"logoip.de",
	"logoip.com",
	"fr-par-1.baremetal.scw.cloud",
	"fr-par-2.baremetal.scw.cloud",
	"nl-ams-1.baremetal.scw.cloud",
	"fnc.fr-par.scw.cloud",
	"functions.fnc.fr-par.scw.cloud",
	"k8s.fr-par.scw.cloud",
	"nodes.k8s.fr-par.scw.cloud",
	"s3.fr-par.scw.cloud",
	"s3-website.fr-par.scw.cloud",
	"whm.fr-par.scw.cloud",
	"priv.instances.scw.cloud",
	"pub.instances.scw.cloud",
	"k8s.scw.cloud",
	"k8s.nl-ams.scw.cloud",
	"nodes.k8s.nl-ams.scw.cloud",
	"s3.nl-ams.scw.cloud",
	"s3-website.nl-ams.scw.cloud",
	"whm.nl-ams.scw.cloud",
	"k8s.pl-waw.scw.cloud",
	"nodes.k8s.pl-waw.scw.cloud",
	"s3.pl-waw.scw.cloud",
	"s3-website.pl-waw.scw.cloud",
	"scalebook.scw.cloud",
	"smartlabeling.scw.cloud",
	"dedibox.fr",
	"schokokeks.net",
	"gov.scot",
	"service.gov.scot",
	"scrysec.com",
	"firewall-gateway.com",
	"firewall-gateway.de",
	"my-gateway.de",
	"my-router.de",
	"spdns.de",
	"spdns.eu",
	"firewall-gateway.net",
	"my-firewall.org",
	"myfirewall.org",
	"spdns.org",
	"seidat.net",
	"sellfy.store",
	"senseering.net",
	"minisite.ms",
	"magnet.page",
	"biz.ua",
	"co.ua",
	"pp.ua",
	"shiftcrypto.dev",
	"shiftcrypto.io",
	"shiftedit.io",
	"myshopblocks.com",
	"myshopify.com",
	"shopitsite.com",
	"shopware.store",
	"mo-siemens.io",
	"1kapp.com",
	"appchizi.com",
	"applinzi.com",
	"sinaapp.com",
	"vipsinaapp.com",
	"siteleaf.net",
	"bounty-full.com",
	"alpha.bounty-full.com",
	"beta.bounty-full.com",
	"small-web.org",
	"vp4.me",
	"try-snowplow.com",
	"srht.site",
	"stackhero-network.com",
	"musician.io",
	"novecore.site",
	"static.land",
	"dev.static.land",
	"sites.static.land",
	"storebase.store",
	"vps-host.net",
	"atl.jelastic.vps-host.net",
	"njs.jelastic.vps-host.net",
	"ric.jelastic.vps-host.net",
	"playstation-cloud.com",
	"apps.lair.io",
	"*.stolos.io",
	"spacekit.io",
	"customer.speedpartner.de",
	"myspreadshop.at",
	"myspreadshop.com.au",
	"myspreadshop.be",
	"myspreadshop.ca",
	"myspreadshop.ch",
	"myspreadshop.com",
	"myspreadshop.de",
	"myspreadshop.dk",
	"myspreadshop.es",
	"myspreadshop.fi",
	"myspreadshop.fr",
	"myspreadshop.ie",
	"myspreadshop.it",
	"myspreadshop.net",
	"myspreadshop.nl",
	"myspreadshop.no",
	"myspreadshop.pl",
	"myspreadshop.se",
	"myspreadshop.co.uk",
	"api.stdlib.com",
	"storj.farm",
	"utwente.io",
	"soc.srcf.net",
	"user.srcf.net",
	"temp-dns.com",
	"supabase.co",
	"supabase.in",
	"supabase.net",
	"su.paba.se",
	"*.s5y.io",
	"*.sensiosite.cloud",
	"syncloud.it",
	"dscloud.biz",
	"direct.quickconnect.cn",
	"dsmynas.com",
	"familyds.com",
	"diskstation.me",
	"dscloud.me",
	"i234.me",
	"myds.me",
	"synology.me",
	"dscloud.mobi",
	"dsmynas.net",
	"familyds.net",
	"dsmynas.org",
	"familyds.org",
	"vpnplus.to",
	"direct.quickconnect.to",
	"tabitorder.co.il",
	"taifun-dns.de",
	"beta.tailscale.net",
	"ts.net",
	"gda.pl",
	"gdansk.pl",
	"gdynia.pl",
	"med.pl",
	"sopot.pl",
	"site.tb-hosting.com",
	"edugit.io",
	"s3.teckids.org",
	"telebit.app",
	"telebit.io",
	"*.telebit.xyz",
	"gwiddle.co.uk",
	"*.firenet.ch",
	"*.svc.firenet.ch",
	"reservd.com",
	"thingdustdata.com",
	"cust.dev.thingdust.io",
	"cust.disrec.thingdust.io",
	"cust.prod.thingdust.io",
	"cust.testing.thingdust.io",
	"reservd.dev.thingdust.io",
	"reservd.disrec.thingdust.io",
	"reservd.testing.thingdust.io",
	"tickets.io",
	"arvo.network",
	"azimuth.network",
	"tlon.network",
	"torproject.net",
	"pages.torproject.net",
	"bloxcms.com",
	"townnews-staging.com",
	"tbits.me",
	"12hp.at",
	"2ix.at",
	"4lima.at",
	"lima-city.at",
	"12hp.ch",
	"2ix.ch",
	"4lima.ch",
	"lima-city.ch",
	"trafficplex.cloud",
	"de.cool",
	"12hp.de",
	"2ix.de",
	"4lima.de",
	"lima-city.de",
	"1337.pictures",
	"clan.rip",
	"lima-city.rocks",
	"webspace.rocks",
	"lima.zone",
	"*.transurl.be",
	"*.transurl.eu",
	"*.transurl.nl",
	"site.transip.me",
	"tuxfamily.org",
	"dd-dns.de",
	"diskstation.eu",
	"diskstation.org",
	"dray-dns.de",
	"draydns.de",
	"dyn-vpn.de",
	"dynvpn.de",
	"mein-vigor.de",
	"my-vigor.de",
	"my-wan.de",
	"syno-ds.de",
	"synology-diskstation.de",
	"synology-ds.de",
	"typedream.app",
	"pro.typeform.com",
	"uber.space",
	"*.uberspace.de",
	"hk.com",
	"hk.org",
	"ltd.hk",
	"inc.hk",
	"name.pm",
	"sch.tf",
	"biz.wf",
	"sch.wf",
	"org.yt",
	"virtualuser.de",
	"virtual-user.de",
	"upli.io",
	"urown.cloud",
	"dnsupdate.info",
	"lib.de.us",
	"2038.io",
	"vercel.app",
	"vercel.dev",
	"now.sh",
	"router.management",
	"v-info.info",
	"voorloper.cloud",
	"neko.am",
	"nyaa.am",
	"be.ax",
	"cat.ax",
	"es.ax",
	"eu.ax",
	"gg.ax",
	"mc.ax",
	"us.ax",
	"xy.ax",
	"nl.ci",
	"xx.gl",
	"app.gp",
	"blog.gt",
	"de.gt",
	"to.gt",
	"be.gy",
	"cc.hn",
	"blog.kg",
	"io.kg",
	"jp.kg",
	"tv.kg",
	"uk.kg",
	"us.kg",
	"de.ls",
	"at.md",
	"de.md",
	"jp.md",
	"to.md",
	"indie.porn",
	"vxl.sh",
	"ch.tc",
	"me.tc",
	"we.tc",
	"nyan.to",
	"at.vg",
	"blog.vu",
	"dev.vu",
	"me.vu",
	"v.ua",
	"*.vultrobjects.com",
	"wafflecell.com",
	"*.webhare.dev",
	"reserve-online.net",
	"reserve-online.com",
	"bookonline.app",
	"hotelwithflight.com",
	"wedeploy.io",
	"wedeploy.me",
	"wedeploy.sh",
	"remotewd.com",
	"pages.wiardweb.com",
	"wmflabs.org",
	"toolforge.org",
	"wmcloud.org",
	"panel.gg",
	"daemon.panel.gg",
	"messwithdns.com",
	"woltlab-demo.com",
	"myforum.community",
	"community-pro.de",
	"diskussionsbereich.de",
	"community-pro.net",
	"meinforum.net",
	"affinitylottery.org.uk",
	"raffleentry.org.uk",
	"weeklylottery.org.uk",
	"wpenginepowered.com",
	"js.wpenginepowered.com",
	"wixsite.com",
	"editorx.io",
	"half.host",
	"xnbay.com",
	"u2.xnbay.com",
	"u2-local.xnbay.com",
	"cistron.nl",
	"demon.nl",
	"xs4all.space",
	"yandexcloud.net",
	"storage.yandexcloud.net",
	"website.yandexcloud.net",
	"official.academy",
	"yolasite.com",
	"ybo.faith",
	"yombo.me",
	"homelink.one",
	"ybo.party",
	"ybo.review",
	"ybo.science",
	"ybo.trade",
	"ynh.fr",
	"nohost.me",
	"noho.st",
	"za.net",
	"za.org",
	"bss.design",
	"basicserver.io",
	"virtualserver.io",
	"enterprisecloud.nu"
];

var rules$1 = {
  __proto__: null,
  'default': rules
};

var require$$0 = getCjsExportFromNamespace(rules$1);

var psl = createCommonjsModule(function (module, exports) {





var internals = {};


//
// Read rules from file.
//
internals.rules = require$$0.map(function (rule) {

  return {
    rule: rule,
    suffix: rule.replace(/^(\*\.|\!)/, ''),
    punySuffix: -1,
    wildcard: rule.charAt(0) === '*',
    exception: rule.charAt(0) === '!'
  };
});


//
// Check is given string ends with `suffix`.
//
internals.endsWith = function (str, suffix) {

  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};


//
// Find rule for a given domain.
//
internals.findRule = function (domain) {

  var punyDomain = punycode.toASCII(domain);
  return internals.rules.reduce(function (memo, rule) {

    if (rule.punySuffix === -1){
      rule.punySuffix = punycode.toASCII(rule.suffix);
    }
    if (!internals.endsWith(punyDomain, '.' + rule.punySuffix) && punyDomain !== rule.punySuffix) {
      return memo;
    }
    // This has been commented out as it never seems to run. This is because
    // sub tlds always appear after their parents and we never find a shorter
    // match.
    //if (memo) {
    //  var memoSuffix = Punycode.toASCII(memo.suffix);
    //  if (memoSuffix.length >= punySuffix.length) {
    //    return memo;
    //  }
    //}
    return rule;
  }, null);
};


//
// Error codes and messages.
//
exports.errorCodes = {
  DOMAIN_TOO_SHORT: 'Domain name too short.',
  DOMAIN_TOO_LONG: 'Domain name too long. It should be no more than 255 chars.',
  LABEL_STARTS_WITH_DASH: 'Domain name label can not start with a dash.',
  LABEL_ENDS_WITH_DASH: 'Domain name label can not end with a dash.',
  LABEL_TOO_LONG: 'Domain name label should be at most 63 chars long.',
  LABEL_TOO_SHORT: 'Domain name label should be at least 1 character long.',
  LABEL_INVALID_CHARS: 'Domain name label can only contain alphanumeric characters or dashes.'
};


//
// Validate domain name and throw if not valid.
//
// From wikipedia:
//
// Hostnames are composed of series of labels concatenated with dots, as are all
// domain names. Each label must be between 1 and 63 characters long, and the
// entire hostname (including the delimiting dots) has a maximum of 255 chars.
//
// Allowed chars:
//
// * `a-z`
// * `0-9`
// * `-` but not as a starting or ending character
// * `.` as a separator for the textual portions of a domain name
//
// * http://en.wikipedia.org/wiki/Domain_name
// * http://en.wikipedia.org/wiki/Hostname
//
internals.validate = function (input) {

  // Before we can validate we need to take care of IDNs with unicode chars.
  var ascii = punycode.toASCII(input);

  if (ascii.length < 1) {
    return 'DOMAIN_TOO_SHORT';
  }
  if (ascii.length > 255) {
    return 'DOMAIN_TOO_LONG';
  }

  // Check each part's length and allowed chars.
  var labels = ascii.split('.');
  var label;

  for (var i = 0; i < labels.length; ++i) {
    label = labels[i];
    if (!label.length) {
      return 'LABEL_TOO_SHORT';
    }
    if (label.length > 63) {
      return 'LABEL_TOO_LONG';
    }
    if (label.charAt(0) === '-') {
      return 'LABEL_STARTS_WITH_DASH';
    }
    if (label.charAt(label.length - 1) === '-') {
      return 'LABEL_ENDS_WITH_DASH';
    }
    if (!/^[a-z0-9\-]+$/.test(label)) {
      return 'LABEL_INVALID_CHARS';
    }
  }
};


//
// Public API
//


//
// Parse domain.
//
exports.parse = function (input) {

  if (typeof input !== 'string') {
    throw new TypeError('Domain name must be a string.');
  }

  // Force domain to lowercase.
  var domain = input.slice(0).toLowerCase();

  // Handle FQDN.
  // TODO: Simply remove trailing dot?
  if (domain.charAt(domain.length - 1) === '.') {
    domain = domain.slice(0, domain.length - 1);
  }

  // Validate and sanitise input.
  var error = internals.validate(domain);
  if (error) {
    return {
      input: input,
      error: {
        message: exports.errorCodes[error],
        code: error
      }
    };
  }

  var parsed = {
    input: input,
    tld: null,
    sld: null,
    domain: null,
    subdomain: null,
    listed: false
  };

  var domainParts = domain.split('.');

  // Non-Internet TLD
  if (domainParts[domainParts.length - 1] === 'local') {
    return parsed;
  }

  var handlePunycode = function () {

    if (!/xn--/.test(domain)) {
      return parsed;
    }
    if (parsed.domain) {
      parsed.domain = punycode.toASCII(parsed.domain);
    }
    if (parsed.subdomain) {
      parsed.subdomain = punycode.toASCII(parsed.subdomain);
    }
    return parsed;
  };

  var rule = internals.findRule(domain);

  // Unlisted tld.
  if (!rule) {
    if (domainParts.length < 2) {
      return parsed;
    }
    parsed.tld = domainParts.pop();
    parsed.sld = domainParts.pop();
    parsed.domain = [parsed.sld, parsed.tld].join('.');
    if (domainParts.length) {
      parsed.subdomain = domainParts.pop();
    }
    return handlePunycode();
  }

  // At this point we know the public suffix is listed.
  parsed.listed = true;

  var tldParts = rule.suffix.split('.');
  var privateParts = domainParts.slice(0, domainParts.length - tldParts.length);

  if (rule.exception) {
    privateParts.push(tldParts.shift());
  }

  parsed.tld = tldParts.join('.');

  if (!privateParts.length) {
    return handlePunycode();
  }

  if (rule.wildcard) {
    tldParts.unshift(privateParts.pop());
    parsed.tld = tldParts.join('.');
  }

  if (!privateParts.length) {
    return handlePunycode();
  }

  parsed.sld = privateParts.pop();
  parsed.domain = [parsed.sld,  parsed.tld].join('.');

  if (privateParts.length) {
    parsed.subdomain = privateParts.join('.');
  }

  return handlePunycode();
};


//
// Get domain.
//
exports.get = function (domain) {

  if (!domain) {
    return null;
  }
  return exports.parse(domain).domain || null;
};


//
// Check whether domain belongs to a known public suffix.
//
exports.isValid = function (domain) {

  var parsed = exports.parse(domain);
  return Boolean(parsed.domain && parsed.listed);
};
});

var uuidValidateV4 = function uuidValidateV4(uuid$1) {
  return uuid.validate(uuid$1) && uuid.version(uuid$1) === 4;
};

var validVisitorId = function validVisitorId(id) {
  var splitCookie = id.split('|');
  return uuidValidateV4(splitCookie[0]);
};

var cookieValidDays = 365;
var CnMCookie = '_cm';
var CnMIDCookie = '_cm_id';
function getCookieDomain() {
  var parsedUrl = psl.parse(location.host);
  var cookieDomain = null;
  if (!parsedUrl.error) cookieDomain = parsedUrl.domain || null;
  return cookieDomain;
}
function correctCookieSubdomain() {
  var cookie = getCookie(CnMIDCookie);
  if (!cookie) return;
  Cookies.remove(CnMIDCookie);
  setCookie(CnMIDCookie, cookie, cookieValidDays);
  return cookie;
}
var buildCookie = function buildCookie(_ref) {
  var visitorId = _ref.visitorId;
  var _getSessionIdAndEndTi = getSessionIdAndEndTime(getCookie(CnMIDCookie)),
    sessionId = _getSessionIdAndEndTi.sessionId,
    endTime = _getSessionIdAndEndTi.endTime;
  return visitorId + "|" + sessionId + "|" + endTime.toISOString();
};
var updateCookieUUID = function updateCookieUUID(cookieData, uuid) {
  if (!cookieData) return null;
  var cookieSplit = cookieData.split('|');
  if (cookieSplit.length <= 2) return null;
  var visitorId = cookieSplit[0];
  if (visitorId === uuid) return null;
  var sessionId = cookieSplit[1];
  var endTime = cookieSplit[2];
  return uuid + "|" + sessionId + "|" + endTime;
};
var updateCookie = function updateCookie(uuid) {
  if (!uuidValidateV4(uuid)) return;
  var cookie = getCookie(CnMIDCookie);
  var newCookie = updateCookieUUID(cookie, uuid);
  if (!newCookie) return;
  setCookie(CnMIDCookie, newCookie, cookieValidDays);
};
var bootstrapVisitor = function bootstrapVisitor(_ref2) {
  var setVisitor = _ref2.setVisitor,
    session = _ref2.session,
    setSession = _ref2.setSession;
  var visitor = {
    id: undefined
  };
  if (getCookie(cookieAccountJWT)) {
    visitor.jwt = getCookie(cookieAccountJWT);
  }
  if (typeof window !== 'undefined') {
    var urlParams = new URLSearchParams(window.location.search);
    var vid = urlParams.get('v_id');
    if (vid) visitor.id = vid;
    var sourceId = urlParams.get('source_id');
    if (sourceId) visitor.sourceId = sourceId;
  }
  if (!visitor.id && !getCookie(CnMIDCookie) || !validVisitorId(getCookie(CnMIDCookie))) {
    var visitorId = uuid.v4();
    visitor.id = visitorId;
  }
  if (!visitor.id && getCookie(CnMIDCookie)) {
    var c = getCookie(CnMIDCookie);
    var _c$split = c.split('|'),
      _visitorId = _c$split[0];
    visitor.id = _visitorId;
  }
  var combinedCookie = buildCookie({
    visitorId: visitor.id
  });
  setCookie(CnMIDCookie, combinedCookie, cookieValidDays);
  var _getSessionIdAndEndTi2 = getSessionIdAndEndTime(getCookie(CnMIDCookie)),
    sessionId = _getSessionIdAndEndTi2.sessionId,
    endTime = _getSessionIdAndEndTi2.endTime;
  session.id = sessionId;
  session.endTime = endTime;
  setSession(session);
  setVisitor(visitor);
};
var getSessionIdAndEndTime = function getSessionIdAndEndTime(cookieData) {
  var t = new Date();
  t.setMinutes(t.getMinutes() + 30);
  var sessionId;
  var endTime = t;
  if (!cookieData || hasCookieValueExpired(cookieData)) {
    sessionId = uuid.v4();
  } else {
    var c = cookieData;
    var _c$split2 = c.split('|'),
      sessId = _c$split2[1];
    if (sessId === 'undefined' || sessId === undefined) {
      sessId = uuid.v4();
    }
    sessionId = sessId;
  }
  return {
    sessionId: sessionId,
    endTime: endTime
  };
};
var hasCookieValueExpired = function hasCookieValueExpired(cookieData) {
  if (!cookieData) return true;
  var cookieSplit = cookieData.split('|');
  if (cookieSplit.length > 1) {
    var timestampString = cookieSplit[cookieSplit.length - 1];
    var expiryTimeEpoch = Date.parse(timestampString);
    var expiryTime = new Date();
    expiryTime.setTime(expiryTimeEpoch);
    var n = new Date();
    if (n > expiryTime) {
      return true;
    }
  }
  return false;
};

var setCookie = function setCookie(name, value, expires, options) {
  return Cookies.set(name, value, _extends({
    expires: expires,
    sameSite: 'strict',
    domain: getCookieDomain() || undefined
  }, options));
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
  if (!getCookie(CnMCookie) || getCookie(CnMCookie) !== appId) {
    setCookie(CnMCookie, appId, cookieValidDays);
    setSession(session);
    return;
  }
  if (getCookie(CnMCookie) && getCookie(CnMCookie) === appId) {
    session.firstVisit = false;
    setSession(session);
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
            setVisitor: setVisitor,
            session: session,
            setSession: setSession
          })).then(function () {
            var updatedCookie = correctCookieSubdomain();
            log('FingerprintContext: Correcting cookie domain to', updatedCookie);
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
    boot();
    log('VisitorProvider: booted', session, visitor);
  }, [appId, booted]);
  var setVisitorData = React__default.useCallback(function (prop) {
    setVisitor(function (visitor) {
      return _extends({}, visitor, prop);
    });
  }, [setVisitor]);
  return React__default.createElement(VisitorContext.Provider, {
    value: {
      session: session,
      visitor: visitor,
      setVisitor: setVisitorData
    }
  }, children);
};
var VisitorContext = React.createContext({
  session: {},
  visitor: {},
  setVisitor: function setVisitor() {
    return console.error('VisitorContext: setVisitor not setup properly. Check your Context order.');
  }
});
var useVisitor = function useVisitor() {
  return React.useContext(VisitorContext);
};

var init = function init(cfg) {
  mixpanel.init(getEnvVars().MIXPANEL_TOKEN, {
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
  var _useState = React.useState(false),
    initiated = _useState[0],
    setInitiated = _useState[1];
  React.useEffect(function () {
    if (!appId || !visitor.id) {
      return;
    }
    log('MixpanelProvider: booting');
    init({
      debug: true
    });
    setInitiated(true);
    log('MixpanelProvider: registering visitor ' + visitor.id + ' to mixpanel');
    mixpanel.identify(visitor.id);
  }, [appId, visitor === null || visitor === void 0 ? void 0 : visitor.id]);
  var registerUserData = React__default.useCallback(function (properties) {
    log("Mixpanel: attempting to'register/override properties: " + Object.keys(properties).join(', '));
    mixpanel.people.set(properties);
  }, [log]);
  React.useEffect(function () {
    if (!visitor.cohort) {
      log('Able to register user cohort, but none provided. ');
      return;
    }
    registerUserData({
      u_cohort: visitor.cohort
    });
  }, [visitor, registerUserData]);
  React.useEffect(function () {
    if (!visitor.sourceId) return;
    registerUserData({
      sourceId: visitor.sourceId
    });
  }, [visitor, registerUserData]);
  return React__default.createElement(MixpanelContext.Provider, {
    value: {
      trackEvent: trackEvent,
      registerUserData: registerUserData,
      state: {
        initiated: initiated
      }
    }
  }, children);
};
var MixpanelContext = React.createContext({
  trackEvent: function trackEvent() {
    return console.error('Mixpanel: trackEvent not setup properly. Check your Context order.');
  },
  registerUserData: function registerUserData() {
    return console.error('Mixpanel: registerUserData not setup properly. Check your Context order.');
  },
  state: {
    initiated: false
  }
});
var useMixpanel = function useMixpanel() {
  return React.useContext(MixpanelContext);
};

var collinBrandsPathConversionMap = {
  Stonehouse: '/tablebooking/enquiry-form-completed',
  'All Bar One': '/bookings/dmnc-complete',
  Sizzling: '/tablebooking/enquiry-form-completed',
  Ember: '/tablebooking/enquiry-form-completed'
};
function useCollinsBookingComplete() {
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var brand = useBrand();
  var checkCollinsBookingComplete = React__default.useCallback(function () {
    if (!brand) return;
    var conversionPathForBrand = collinBrandsPathConversionMap[brand];
    if (!conversionPathForBrand) return;
    var isConversionPath = window.location.pathname.toLowerCase().includes(conversionPathForBrand.toLowerCase());
    if (!isConversionPath) return;
    log("useCollinsBookingComplete: Collins booking complete based on path " + conversionPathForBrand + " and brand " + brand);
    trackEvent('booking_complete', {});
  }, [trackEvent, log, brand]);
  return {
    checkCollinsBookingComplete: checkCollinsBookingComplete
  };
}

function isUndefined(o) {
  return typeof o === 'undefined';
}
function getReducedSearchParams() {
  if (isUndefined(window)) return {};
  return new URLSearchParams(window.location.search).toString().split('&').reduce(function (acc, cur) {
    var _cur$split = cur.split('='),
      key = _cur$split[0],
      value = _cur$split[1];
    if (!key) return acc;
    acc[key] = value;
    return acc;
  }, {});
}
function getPagePayload() {
  if (isUndefined(window)) return null;
  var params = getReducedSearchParams();
  return {
    url: window.location.href,
    path: window.location.pathname,
    title: document.title,
    params: params
  };
}
function getReferrer() {
  var params = getReducedSearchParams();
  return {
    url: document.referrer,
    title: '',
    utm: {
      source: params === null || params === void 0 ? void 0 : params.utm_source,
      medium: params === null || params === void 0 ? void 0 : params.utm_medium,
      campaign: params === null || params === void 0 ? void 0 : params.utm_campaign,
      term: params === null || params === void 0 ? void 0 : params.utm_term,
      content: params === null || params === void 0 ? void 0 : params.utm_content
    }
  };
}

var deviceInfo = {
  type: reactDeviceDetect.isMobile ? 'mobile' : 'desktop'
};

var headers = {
  'Content-Type': 'application/json'
};
var hostname = getEnvVars().FINGERPRINT_API_HOSTNAME;
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

var useHostname = function useHostname() {
  var _window, _window$location;
  return ((_window = window) === null || _window === void 0 ? void 0 : (_window$location = _window.location) === null || _window$location === void 0 ? void 0 : _window$location.hostname) || '';
};

var useCollectorMutation = function useCollectorMutation() {
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  var _useFingerprint = useFingerprint(),
    appId = _useFingerprint.appId;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor,
    session = _useVisitor.session;
  var requestHost = useHostname();
  return reactQuery.useMutation(function (data) {
    return request.post(hostname + '/collector/' + (visitor === null || visitor === void 0 ? void 0 : visitor.id), _extends({}, data, {
      appId: appId,
      visitor: visitor,
      sessionId: session === null || session === void 0 ? void 0 : session.id,
      hostname: requestHost,
      device: deviceInfo
    })).then(function (response) {
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

var getRecursivelyPotentialButton = function getRecursivelyPotentialButton(el) {
  var _el$nodeName;
  if (!el) return null;
  if (((_el$nodeName = el.nodeName) === null || _el$nodeName === void 0 ? void 0 : _el$nodeName.toLowerCase()) === 'button') return el;
  if (el.parentElement) return getRecursivelyPotentialButton(el.parentElement);
  return null;
};
function useButtonCollector() {
  var _useCollectorMutation = useCollectorMutation(),
    collect = _useCollectorMutation.mutateAsync;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor;
  var _useLogging = useLogging(),
    log = _useLogging.log;
  React.useEffect(function () {
    if (isUndefined('document')) return;
    if (!visitor.id) return;
    var buttonClickListener = function buttonClickListener(e) {
      if (!e.target) return;
      var potentialButton = getRecursivelyPotentialButton(e.target);
      if (!potentialButton) return;
      var button = potentialButton;
      if (button.type === 'submit') return;
      log('useButtonCollector: button clicked', {
        button: button
      });
      collect({
        button: {
          id: button.id,
          selector: button.innerText
        }
      });
    };
    document.addEventListener('click', buttonClickListener);
    return function () {
      document.removeEventListener('click', buttonClickListener);
    };
  }, [visitor]);
}

var useExitIntentDelay = function useExitIntentDelay(delay) {
  if (delay === void 0) {
    delay = 0;
  }
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var _useState = React.useState(false),
    hasDelayPassed = _useState[0],
    setHasDelayPassed = _useState[1];
  React.useEffect(function () {
    log("Exit intents are suspended because of initiation delay of " + delay + "ms");
    setTimeout(function () {
      setHasDelayPassed(true);
      log('Exit intents can be issued again.');
    }, delay);
  }, [delay]);
  return {
    hasDelayPassed: hasDelayPassed
  };
};

var stringIsSubstringOf = function stringIsSubstringOf(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.toLowerCase().includes(b.toLowerCase());
};
var bannedTypes = ['password', 'submit'];
var bannedFieldPartialNames = ['expir', 'cvv', 'cvc', 'csv', 'csc', 'pin', 'pass', 'card'];
function useFormCollector() {
  var _useCollectorMutation = useCollectorMutation(),
    collect = _useCollectorMutation.mutateAsync;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor;
  var _useLogging = useLogging(),
    log = _useLogging.log;
  React.useEffect(function () {
    if (isUndefined('document')) return;
    if (!visitor.id) return;
    var formSubmitListener = function formSubmitListener(e) {
      var _e$target$nodeName;
      if (((_e$target$nodeName = e.target.nodeName) === null || _e$target$nodeName === void 0 ? void 0 : _e$target$nodeName.toLowerCase()) !== 'form') return;
      var a = e === null || e === void 0 ? void 0 : e.target;
      var elements = Array.from(a.elements).filter(function (b) {
        if (bannedTypes.includes(b === null || b === void 0 ? void 0 : b.type)) return false;
        if (bannedFieldPartialNames.find(function (partialName) {
          if (stringIsSubstringOf(b.name, partialName)) return true;
          if (stringIsSubstringOf(b.id, partialName)) return true;
          if (stringIsSubstringOf(b.placeholder, partialName)) return true;
          return false;
        })) return false;
        return true;
      });
      var data = elements.reduce(function (result, item) {
        var fieldName = item.name;
        if (!fieldName) {
          if (item.id) {
            log('useFormCollector: form field has no name, falling back to id', {
              item: item
            });
            fieldName = item.id;
          } else if (item.placeholder) {
            log('useFormCollector: form field has no name or id, falling back to placeholder', {
              item: item
            });
            fieldName = item.placeholder;
          } else {
            log('useFormCollector: form field has no name, id or placeholder, fallback to type', {
              item: item
            });
            fieldName = item.type;
          }
        }
        result[fieldName] = item.value;
        return result;
      }, {});
      log('useFormCollector: form submitted', {
        data: data
      });
      collect({
        form: {
          data: data
        }
      });
    };
    document.removeEventListener('submit', formSubmitListener);
    document.addEventListener('submit', formSubmitListener);
    return function () {
      document.removeEventListener('submit', formSubmitListener);
    };
  }, [visitor]);
}

var getFuncByOperator = function getFuncByOperator(operator, compareWith) {
  switch (operator) {
    case 'starts_with':
      return function (comparison) {
        return comparison.toLowerCase().startsWith(compareWith.toLowerCase());
      };
    case 'contains':
      return function (comparison) {
        return comparison.toLowerCase().includes(compareWith.toLowerCase());
      };
    case 'ends_with':
      return function (comparison) {
        return comparison.toLowerCase().endsWith(compareWith.toLowerCase());
      };
    case 'eq':
      return function (comparison) {
        return comparison.toLowerCase() === compareWith.toLowerCase();
      };
    default:
      return function () {
        console.error('getOperator: unknown operator', operator);
        return false;
      };
  }
};
var scanInterval = 500;
var useConversions = function useConversions() {
  var _useState = React.useState([]),
    conversions = _useState[0],
    setConversions = _useState[1];
  var _useCollectorMutation = useCollectorMutation(),
    collect = _useCollectorMutation.mutate;
  var removeById = React__default.useCallback(function (id) {
    setConversions(function (prev) {
      if (!(prev !== null && prev !== void 0 && prev.length)) return prev;
      return prev.filter(function (conversion) {
        return conversion.identifier !== id;
      });
    });
  }, [setConversions]);
  var scan = React__default.useCallback(function () {
    conversions.forEach(function (conversion) {
      var hasHappened = validateSignalChain(conversion.signals);
      if (!hasHappened) return;
      collect({
        conversion: {
          id: conversion.identifier
        }
      });
      removeById(conversion.identifier);
    });
  }, [collect, conversions, removeById]);
  React.useEffect(function () {
    if (!(conversions !== null && conversions !== void 0 && conversions.length)) return;
    var intId = setInterval(scan, scanInterval);
    return function () {
      return clearInterval(intId);
    };
  }, [scan]);
  return {
    conversions: conversions,
    setConversions: setConversions
  };
};

var getIsVisible = function getIsVisible(selector) {
  var element = document.querySelector(selector);
  if (!element) return false;
  if (window.getComputedStyle(element).visibility === 'hidden') return false;
  if (window.getComputedStyle(element).display === 'none') return false;
  if (window.getComputedStyle(element).opacity === '0') return false;
  return true;
};

var validateSignalChain = function validateSignalChain(signals) {
  var signalPattern = signals.map(function (signal) {
    if (signal.op === 'IsOnPath') {
      var _signal$parameters = signal.parameters,
        operator = _signal$parameters[0],
        route = _signal$parameters[1];
      return getFuncByOperator(operator, route)(window.location.pathname);
    }
    if (signal.op === 'CanSeeElementOnPage') {
      var _signal$parameters2 = signal.parameters,
        itemQuerySelector = _signal$parameters2[0],
        _operator = _signal$parameters2[1],
        _route = _signal$parameters2[2];
      var isSignalOnCorrectRoute = getFuncByOperator(_operator, _route)(window.location.pathname);
      if (!isSignalOnCorrectRoute) return false;
      var isVisible = getIsVisible(itemQuerySelector);
      return isVisible;
    }
    if (signal.op === 'IsOnDomain') {
      return window.location.hostname === signal.parameters[0];
    }
    return false;
  });
  return signalPattern.every(Boolean);
};

var interval = 250;
var useIncompleteTriggers = function useIncompleteTriggers() {
  var _useState = React.useState([]),
    incompleteTriggers = _useState[0],
    setIncompleteTriggers = _useState[1];
  var _useState2 = React.useState([]),
    visibleTriggers = _useState2[0],
    setVisibleTriggers = _useState2[1];
  var scan = React__default.useCallback(function () {
    var validTriggers = incompleteTriggers.filter(function (trigger) {
      var shouldTrigger = validateSignalChain(trigger.signals);
      if (!shouldTrigger) return false;
      return true;
    });
    setVisibleTriggers(function (prev) {
      if (!validTriggers.length) return prev;
      return validTriggers;
    });
  }, [setVisibleTriggers, incompleteTriggers]);
  React.useEffect(function () {
    if (!incompleteTriggers.length) return;
    var intId = setInterval(scan, interval);
    return function () {
      clearInterval(intId);
    };
  }, [incompleteTriggers, getIsVisible, setVisibleTriggers]);
  return {
    incompleteTriggers: incompleteTriggers,
    setIncompleteTriggers: setIncompleteTriggers,
    setVisibleTriggers: setVisibleTriggers,
    visibleTriggers: visibleTriggers
  };
};

var selectorRateMs = 100;
function useTrackIntentlyModal(_ref) {
  var intently = _ref.intently;
  var _useState = React.useState(false),
    isVisible = _useState[0],
    setIsVisible = _useState[1];
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent,
    initiated = _useMixpanel.state.initiated;
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  var brand = useBrand();
  React.useEffect(function () {
    if (!initiated) return;
    if (!intently) return;
    var id = setInterval(function () {
      var intentlyOuterContainer = document.querySelector('smc-overlay-outer');
      if (!intentlyOuterContainer) {
        return;
      }
      var isIntentlyOuterVisible = window.getComputedStyle(intentlyOuterContainer).display === 'block';
      if (!isIntentlyOuterVisible) {
        return;
      }
      var intentlyInnerOverlay = document.querySelector('smc-overlay-inner');
      if (!intentlyInnerOverlay) {
        return;
      }
      log('useTrackIntentlyModal: Located Intently modal. Measuring performance');
      setIsVisible(true);
      trackEvent('trigger_displayed', {
        triggerId: 'Intently',
        triggerType: 'INVOCATION_EXIT_INTENT',
        triggerBehaviour: 'BEHAVIOUR_MODAL',
        time: new Date().toISOString(),
        brand: brand
      });
      clearInterval(id);
    }, selectorRateMs);
    return function () {
      clearInterval(id);
    };
  }, [intently, log, setIsVisible, trackEvent, initiated, brand]);
  var getHandleTrackAction = function getHandleTrackAction(action) {
    return function () {
      log("useTrackIntentlyModal: user clicked " + action + " button");
      trackEvent("user_clicked_" + action + "_button", {});
    };
  };
  React.useEffect(function () {
    if (!isVisible) return;
    var closeBtn = document.querySelector('[data-close-type="x_close"]');
    var exitHandler = getHandleTrackAction('exit');
    var ctaBtn = document.querySelector('smc-input-group > span');
    var ctaHandler = getHandleTrackAction('CTA');
    if (closeBtn) closeBtn.addEventListener('click', exitHandler);else error('useTrackIntentlyModal: Could not locate close button, skipping tracking performance.');
    if (ctaBtn) ctaBtn.addEventListener('click', ctaHandler);else error('useTrackIntentlyModal: Could not locate CTA button, skipping tracking performance.');
    return function () {
      ctaBtn === null || ctaBtn === void 0 ? void 0 : ctaBtn.removeEventListener('click', ctaHandler);
      closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.removeEventListener('click', exitHandler);
    };
  }, [error, getHandleTrackAction, isVisible]);
  return {
    isVisible: isVisible,
    setIsVisible: setIsVisible
  };
}
var brandsThatSupportIntentlyRemoval = ['Browns'];
var useRemoveIntently = function useRemoveIntently(_ref2) {
  var intently = _ref2.intently;
  var _useLogging2 = useLogging(),
    log = _useLogging2.log;
  var brand = useBrand();
  React.useEffect(function () {
    if (intently) return;
    if (brand && !brandsThatSupportIntentlyRemoval.includes(brand)) {
      log("useRemoveIntently: Intently is " + intently + ", but skipping overlay removal for brand", {
        brand: brand
      });
      return;
    }
    log('useRemoveIntently: removing intently overlay');
    var runningInterval = setInterval(function () {
      var locatedIntentlyScript = document.querySelectorAll('div[id^=smc-v5-overlay-]');
      Array.prototype.forEach.call(locatedIntentlyScript, function (node) {
        node.parentNode.removeChild(node);
        log('useRemoveIntently: successfully removed intently overlay');
        clearInterval(runningInterval);
      });
    }, selectorRateMs);
    return function () {
      clearInterval(runningInterval);
    };
  }, [intently, brand, log]);
};
function useIntently() {
  var _useState2 = React.useState(true),
    intently = _useState2[0],
    setIntently = _useState2[1];
  useRemoveIntently({
    intently: intently
  });
  useTrackIntentlyModal({
    intently: intently
  });
  return {
    setIntently: setIntently,
    intently: intently
  };
}

var reattemptIntervalMs = 500;
var useRunOnPathChange = function useRunOnPathChange(func, config) {
  var _useState = React.useState(''),
    lastCollectedHref = _useState[0],
    setLastCollectedHref = _useState[1];
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var run = React__default.useCallback(function () {
    if (config !== null && config !== void 0 && config.skip) return;
    if (!location.href) return;
    if (location.href === lastCollectedHref) return;
    log('useRunOnPathChange: running for path: ', location.href);
    setLastCollectedHref(location.href);
    func();
  }, [func, config, lastCollectedHref]);
  React.useEffect(function () {
    log("useRunOnPathChange: running for every path change with " + reattemptIntervalMs + " MS");
    var iId = setInterval(run, reattemptIntervalMs);
    return function () {
      return clearInterval(iId);
    };
  }, [run]);
};

function useTriggerDelay() {
  var _useState = React.useState(null),
    lastTriggerTimeStamp = _useState[0],
    setLastTriggerTimeStamp = _useState[1];
  var triggerConfig = useTriggerConfig();
  var cooldownMs = triggerConfig.triggerCooldownSecs * 1000;
  var idleDelay = triggerConfig.userIdleThresholdSecs * 1000;
  var _useLogging = useLogging(),
    log = _useLogging.log;
  var startCooldown = React__default.useCallback(function () {
    var currentTimeStamp = Number(new Date());
    setLastTriggerTimeStamp(currentTimeStamp);
  }, [setLastTriggerTimeStamp]);
  var getRemainingCooldownMs = React__default.useCallback(function () {
    if (!lastTriggerTimeStamp) return 0;
    var currentTime = Number(new Date());
    var remainingMS = lastTriggerTimeStamp + cooldownMs - currentTime;
    if (remainingMS < 0) return 0;
    return remainingMS;
  }, [lastTriggerTimeStamp, cooldownMs]);
  var canNextTriggerOccur = React__default.useCallback(function () {
    return getRemainingCooldownMs() === 0;
  }, [getRemainingCooldownMs]);
  var getIdleStatusDelay = React__default.useCallback(function () {
    var cooldownDelay = getRemainingCooldownMs();
    var delayAdjustedForCooldown = idleDelay + cooldownDelay;
    log("Setting idle delay at " + delayAdjustedForCooldown + "ms (cooldown " + cooldownDelay + "ms + idleDelay " + idleDelay + "ms)");
    return delayAdjustedForCooldown;
  }, [idleDelay, getRemainingCooldownMs, log]);
  return {
    startCooldown: startCooldown,
    canNextTriggerOccur: canNextTriggerOccur,
    getRemainingCooldownMs: getRemainingCooldownMs,
    getIdleStatusDelay: getIdleStatusDelay
  };
}

var getVisitorId = function getVisitorId() {
  if (typeof window === 'undefined') return null;
  var urlParams = new URLSearchParams(window.location.search);
  var vid = urlParams.get('v_id');
  return vid;
};
var hasVisitorIDInURL = function hasVisitorIDInURL() {
  return getVisitorId() !== null;
};

function CollectorProvider(_ref) {
  var children = _ref.children,
    _ref$handlers = _ref.handlers,
    handlers = _ref$handlers === void 0 ? [] : _ref$handlers;
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  var _useFingerprint = useFingerprint(),
    booted = _useFingerprint.booted,
    initialDelay = _useFingerprint.initialDelay,
    exitIntentTriggers = _useFingerprint.exitIntentTriggers,
    idleTriggers = _useFingerprint.idleTriggers,
    pageLoadTriggers = _useFingerprint.pageLoadTriggers;
  var _useConfig = useConfig(),
    setConfig = _useConfig.setConfig,
    config = _useConfig.config.trigger;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor,
    setVisitor = _useVisitor.setVisitor;
  var _useTriggerDelay = useTriggerDelay(),
    canNextTriggerOccur = _useTriggerDelay.canNextTriggerOccur,
    startCooldown = _useTriggerDelay.startCooldown,
    getRemainingCooldownMs = _useTriggerDelay.getRemainingCooldownMs,
    getIdleStatusDelay = _useTriggerDelay.getIdleStatusDelay;
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  var _useCollectorMutation = useCollectorMutation(),
    collect = _useCollectorMutation.mutateAsync;
  var _useCollinsBookingCom = useCollinsBookingComplete(),
    checkCollinsBookingComplete = _useCollinsBookingCom.checkCollinsBookingComplete;
  var _useExitIntent = useExitIntent.useExitIntent({
      cookie: {
        key: '_cm_exit',
        daysToExpire: 0
      }
    }),
    registerHandler = _useExitIntent.registerHandler,
    reRegisterExitIntent = _useExitIntent.resetState;
  var _useState = React.useState(getIdleStatusDelay()),
    idleTimeout = _useState[0],
    setIdleTimeout = _useState[1];
  var _useState2 = React.useState([]),
    pageTriggers = _useState2[0],
    setPageTriggersState = _useState2[1];
  var _useIntently = useIntently(),
    setIntently = _useIntently.setIntently;
  var _useState3 = React.useState([]),
    displayTriggers = _useState3[0],
    setDisplayedTriggers = _useState3[1];
  var _useState4 = React.useState(new Map()),
    foundWatchers = _useState4[0],
    setFoundWatchers = _useState4[1];
  var _useConversions = useConversions(),
    setConversions = _useConversions.setConversions;
  var brand = useBrand();
  var _useIncompleteTrigger = useIncompleteTriggers(),
    setIncompleteTriggers = _useIncompleteTrigger.setIncompleteTriggers,
    setVisibleTriggers = _useIncompleteTrigger.setVisibleTriggers,
    visibleIncompleteTriggers = _useIncompleteTrigger.visibleTriggers;
  var combinedTriggers = React__default.useMemo(function () {
    return [].concat(pageTriggers, visibleIncompleteTriggers);
  }, [pageTriggers, visibleIncompleteTriggers]);
  var getIsBehaviourVisible = React__default.useCallback(function (type) {
    if (displayTriggers.length === 0) return false;
    if (displayTriggers.find(function (triggerId) {
      var _combinedTriggers$fin;
      return ((_combinedTriggers$fin = combinedTriggers.find(function (trigger) {
        return trigger.id === triggerId;
      })) === null || _combinedTriggers$fin === void 0 ? void 0 : _combinedTriggers$fin.behaviour) === type;
    })) return true;
    return false;
  }, [displayTriggers, combinedTriggers]);
  var setDisplayedTriggerByInvocation = React__default.useCallback(function (invocation, shouldAllowMultipleSimultaneous) {
    if (shouldAllowMultipleSimultaneous === void 0) {
      shouldAllowMultipleSimultaneous = false;
    }
    var invokableTrigger = combinedTriggers.find(function (trigger) {
      return trigger.invocation === invocation;
    });
    if (!invokableTrigger) {
      log('CollectorProvider: Trigger not invokable ', invokableTrigger);
      return;
    }
    if (!shouldAllowMultipleSimultaneous && getIsBehaviourVisible(invokableTrigger.behaviour)) {
      log('CollectorProvider: Behaviour already visible, not showing trigger', invokableTrigger);
      return;
    }
    log('CollectorProvider: Triggering behaviour', invokableTrigger);
    setDisplayedTriggers(function (prev) {
      if (prev.includes(invokableTrigger.id)) return prev;
      return [].concat(prev, [invokableTrigger.id]);
    });
  }, [combinedTriggers, getIsBehaviourVisible, log]);
  React.useEffect(function () {
    if (!(visibleIncompleteTriggers !== null && visibleIncompleteTriggers !== void 0 && visibleIncompleteTriggers.length)) return;
    setDisplayedTriggerByInvocation('INVOCATION_ELEMENT_VISIBLE');
  }, [visibleIncompleteTriggers, setPageTriggersState, setDisplayedTriggerByInvocation]);
  var setPageTriggers = React__default.useCallback(function (triggers) {
    setPageTriggersState(function (prev) {
      var nonDismissed = prev.filter(function (tr) {
        return displayTriggers.includes(tr.id);
      });
      return uniqueBy([].concat(triggers || [], nonDismissed), 'id');
    });
  }, [setPageTriggersState, displayTriggers]);
  var getHandlerForTrigger = React__default.useCallback(function (_trigger) {
    var potentialHandler = handlers === null || handlers === void 0 ? void 0 : handlers.find(function (handler) {
      return handler.behaviour === _trigger.behaviour;
    });
    if (!potentialHandler) return null;
    return potentialHandler;
  }, [handlers]);
  var removeActiveTrigger = React.useCallback(function (id) {
    log("CollectorProvider: removing id:" + id + " from displayTriggers");
    var refreshedTriggers = displayTriggers.filter(function (triggerId) {
      return triggerId !== id;
    });
    setDisplayedTriggers(refreshedTriggers);
    setIncompleteTriggers(function (prev) {
      return prev.filter(function (trigger) {
        return trigger.id !== id;
      });
    });
    setVisibleTriggers(function (prev) {
      return prev.filter(function (trigger) {
        return trigger.id !== id;
      });
    });
    setPageTriggersState(function (prev) {
      return prev.filter(function (trigger) {
        return trigger.id !== id;
      });
    });
  }, [displayTriggers, log, setIncompleteTriggers, setVisibleTriggers, setPageTriggersState, combinedTriggers]);
  var TriggerComponent = React__default.useCallback(function () {
    if (!displayTriggers) return null;
    var activeTriggers = combinedTriggers.filter(function (trigger) {
      return displayTriggers.includes(trigger.id);
    });
    if (!activeTriggers) {
      error("No trigger found for displayTriggers", displayTriggers);
      return null;
    }
    log('CollectorProvider: available handlers include: ', handlers);
    log('CollectorProvider: activeTriggers to match are: ', activeTriggers);
    log('CollectorProvider: attempting to show trigger', activeTriggers);
    return activeTriggers.map(function (trigger) {
      var _handler$invoke;
      var handler = getHandlerForTrigger(trigger);
      if (!handler) {
        log('No handler found for trigger', trigger);
        return null;
      }
      if (!handler.invoke) {
        log('No invoke method found for handler', handler);
        return null;
      }
      var potentialComponent = (_handler$invoke = handler.invoke) === null || _handler$invoke === void 0 ? void 0 : _handler$invoke.call(handler, trigger);
      if (potentialComponent && React__default.isValidElement(potentialComponent)) {
        log('CollectorProvider: Potential component for trigger is valid. Mounting');
        return potentialComponent;
      }
      log('CollectorProvider: Potential component for trigger invalid. Running as regular func.');
      return null;
    });
  }, [displayTriggers, log, handlers, error, getHandlerForTrigger, combinedTriggers]);
  React.useEffect(function () {
    if (!(visibleIncompleteTriggers !== null && visibleIncompleteTriggers !== void 0 && visibleIncompleteTriggers.length)) return;
    setDisplayedTriggerByInvocation('INVOCATION_ELEMENT_VISIBLE');
  }, [setDisplayedTriggerByInvocation, visibleIncompleteTriggers]);
  var fireIdleTrigger = React.useCallback(function () {
    if (!idleTriggers) return;
    log('CollectorProvider: attempting to fire idle time trigger');
    setDisplayedTriggerByInvocation('INVOCATION_IDLE_TIME');
    startCooldown();
  }, [idleTriggers, log, setDisplayedTriggerByInvocation, startCooldown]);
  var _useExitIntentDelay = useExitIntentDelay((config === null || config === void 0 ? void 0 : config.displayTriggerAfterSecs) * 1000),
    hasDelayPassed = _useExitIntentDelay.hasDelayPassed;
  var fireExitTrigger = React__default.useCallback(function () {
    if (!hasDelayPassed) {
      log("Unable to launch exit intent, because of the exit intent delay hasn't passed yet.");
      log('Re-registering handler');
      reRegisterExitIntent();
      return;
    }
    if (!canNextTriggerOccur()) {
      log("Tried to launch EXIT trigger, but can't because of cooldown, " + getRemainingCooldownMs() + "ms remaining. \n        I will attempt again when the same signal occurs after this passes.");
      log('Re-registering handler');
      reRegisterExitIntent();
      return;
    }
    log('CollectorProvider: attempting to fire exit trigger');
    setDisplayedTriggerByInvocation('INVOCATION_EXIT_INTENT');
    startCooldown();
  }, [hasDelayPassed, canNextTriggerOccur, log, setDisplayedTriggerByInvocation, startCooldown, reRegisterExitIntent, getRemainingCooldownMs]);
  React.useEffect(function () {
    if (!exitIntentTriggers) return;
    log('CollectorProvider: attempting to register exit trigger');
    registerHandler({
      id: 'clientTrigger',
      handler: fireExitTrigger
    });
  }, [exitIntentTriggers, fireExitTrigger, log, registerHandler]);
  var fireOnLoadTriggers = React.useCallback(function () {
    if (!pageLoadTriggers) return;
    if (!(combinedTriggers !== null && combinedTriggers !== void 0 && combinedTriggers.length)) return;
    log('CollectorProvider: attempting to fire on-page-load trigger');
    setDisplayedTriggerByInvocation('INVOCATION_PAGE_LOAD', true);
  }, [pageLoadTriggers, combinedTriggers, log, setDisplayedTriggerByInvocation]);
  var collectorCallback = React__default.useCallback(function (response) {
    try {
      return Promise.resolve(response.json()).then(function (payload) {
        var _payload$identifiers;
        log('Sent collector data, retrieved:', payload);
        var retrievedUserId = (_payload$identifiers = payload.identifiers) === null || _payload$identifiers === void 0 ? void 0 : _payload$identifiers.main;
        if (retrievedUserId) {
          updateCookie(retrievedUserId);
          setVisitor({
            id: retrievedUserId
          });
        }
        setIdleTimeout(getIdleStatusDelay());
        setPageTriggers(payload === null || payload === void 0 ? void 0 : payload.pageTriggers);
        setConfig(payload.config);
        setIncompleteTriggers((payload === null || payload === void 0 ? void 0 : payload.incompleteTriggers) || []);
        setConversions((payload === null || payload === void 0 ? void 0 : payload.conversions) || []);
        var cohort = payload.intently ? 'intently' : 'fingerprint';
        if (visitor.cohort !== cohort) setVisitor({
          cohort: cohort
        });
        log('CollectorProvider: collected data');
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
  }, [log, getIdleStatusDelay, setPageTriggers, setConfig, setIncompleteTriggers, visitor.cohort, setConversions, setVisitor, setIntently]);
  React.useEffect(function () {
    if (hasVisitorIDInURL()) {
      trackEvent('abandoned_journey_landing', {
        from_email: true
      });
    }
  }, [trackEvent]);
  var collectAndApplyVisitorInfo = React__default.useCallback(function () {
    if (!visitor.id) {
      log('CollectorProvider: Not yet collecting, awaiting visitor ID');
      return;
    }
    log('CollectorProvider: collecting data');
    var hash = window.location.hash.substring(3);
    var hashParams = hash.split('&').reduce(function (result, item) {
      var parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});
    if (hashParams.id_token) {
      log('CollectorProvider: user logged in event fired');
      trackEvent('user_logged_in', {
        brand: brand
      });
      collect({
        account: {
          token: hashParams.id_token
        }
      }).then(collectorCallback)["catch"](function (err) {
        error('failed to store collected data', err);
      });
    }
    collect({
      page: getPagePayload() || undefined,
      referrer: getReferrer() || undefined
    }).then(function (response) {
      if (response.status === 204) {
        setIntently(true);
        return;
      }
      collectorCallback(response);
    })["catch"](function (err) {
      error('failed to store collected data', err);
    });
  }, [visitor.id, brand, log, collect, trackEvent, error, collectorCallback, setIntently]);
  var registerWatcher = React__default.useCallback(function (configuredSelector, configuredSearch) {
    var intervalId = setInterval(function () {
      var inputs = document.querySelectorAll(configuredSelector);
      var found = false;
      inputs.forEach(function (element) {
        if (configuredSearch === '' && window.getComputedStyle(element).display !== 'none') {
          found = true;
        } else if (element.textContent === configuredSearch) {
          found = true;
        }
        if (found && !foundWatchers[configuredSelector]) {
          trackEvent('booking_complete', {});
          foundWatchers[configuredSelector] = true;
          setFoundWatchers(foundWatchers);
          collect({
            elements: [{
              path: window.location.pathname,
              selector: configuredSelector
            }]
          }).then(collectorCallback)["catch"](function (err) {
            error('failed to store collected data', err);
          });
          clearInterval(intervalId);
        }
      });
    }, 500);
    return intervalId;
  }, [collect, collectorCallback, error, foundWatchers, trackEvent]);
  React.useEffect(function () {
    if (!visitor.id) return;
    var intervalIds = [registerWatcher('.stage-5', '')];
    return function () {
      intervalIds.forEach(function (intervalId) {
        return clearInterval(intervalId);
      });
    };
  }, [registerWatcher, visitor]);
  var setActiveTrigger = React__default.useCallback(function (trigger) {
    log('CollectorProvider: manually setting trigger', trigger);
    setPageTriggers([trigger]);
    setDisplayedTriggerByInvocation(trigger.invocation);
  }, [log, setDisplayedTriggerByInvocation, setPageTriggers]);
  var collectorContextVal = React__default.useMemo(function () {
    return {
      setPageTriggers: setPageTriggers,
      removeActiveTrigger: removeActiveTrigger,
      setActiveTrigger: setActiveTrigger,
      setIncompleteTriggers: setIncompleteTriggers,
      trackEvent: trackEvent,
      setConversions: setConversions
    };
  }, [setPageTriggers, removeActiveTrigger, setActiveTrigger, trackEvent, setIncompleteTriggers, setConversions]);
  React.useEffect(function () {
    fireOnLoadTriggers();
  }, [fireOnLoadTriggers]);
  useRunOnPathChange(checkCollinsBookingComplete, {
    skip: !booted,
    delay: initialDelay
  });
  useRunOnPathChange(collectAndApplyVisitorInfo, {
    skip: !booted,
    delay: initialDelay
  });
  useRunOnPathChange(fireOnLoadTriggers, {
    skip: !booted,
    delay: initialDelay
  });
  useFormCollector();
  useButtonCollector();
  var onPresenseChange = React__default.useCallback(function (presence) {
    log('presence changed', presence);
  }, [log]);
  return React__default.createElement(reactIdleTimer.IdleTimerProvider, {
    timeout: idleTimeout,
    onPresenceChange: onPresenseChange,
    onIdle: fireIdleTrigger
  }, React__default.createElement(CollectorContext.Provider, {
    value: collectorContextVal
  }, children, TriggerComponent()));
}
var CollectorContext = React.createContext({
  setPageTriggers: function setPageTriggers() {
    console.error('setPageTriggers not implemented correctly');
  },
  removeActiveTrigger: function removeActiveTrigger() {
    console.error('removeActiveTrigger not implemented correctly');
  },
  setIncompleteTriggers: function setIncompleteTriggers() {
    console.error('setIncompleteTriggers not implemented correctly');
  },
  setActiveTrigger: function setActiveTrigger() {
    console.error('setActiveTrigger not implemented correctly');
  },
  setConversions: function setConversions() {
    console.error('setConversions not implemented correctly');
  },
  trackEvent: function trackEvent() {
    console.error('trackEvent not implemented correctly');
  }
});

var useCollector = function useCollector() {
  return React.useContext(CollectorContext);
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol = _root.Symbol;

var _Symbol = Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol_1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/* Built-in method references that are verified to be native. */
var Map$1 = _getNative(_root, 'Map');

var _Map = Map$1;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache;

var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize_1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = _memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }
  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }
  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = _castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get;

var defualtFormatString = function defualtFormatString(val) {
  return val;
};
var getInterpolate = function getInterpolate(structure) {
  var interpolate = function interpolate(text, formatString) {
    if (formatString === void 0) {
      formatString = defualtFormatString;
    }
    var replacedText = text.replace(/\{\{\s*\.?([\w]+)\s*\}\}/g, function (match, keys) {
      var value = get_1(structure, keys);
      if (formatString) value = formatString(value);
      return value !== undefined ? value : match;
    });
    return replacedText;
  };
  return interpolate;
};

var getPositiveDateDiffInSec = function getPositiveDateDiffInSec(date1, date2) {
  return Math.abs(Math.floor((date2.getTime() - date1.getTime()) / 1000));
};
function formatTimeStamp(targetDate) {
  var durationInSeconds = getPositiveDateDiffInSec(new Date(), targetDate);
  var days = Math.floor(durationInSeconds / (60 * 60 * 24));
  var hours = Math.floor(durationInSeconds % (60 * 60 * 24) / (60 * 60));
  var minutes = Math.floor(durationInSeconds % (60 * 60) / 60);
  var seconds = durationInSeconds % 60;
  var parts = [];
  if (days > 0) {
    parts.push(days + " day" + (days > 1 ? 's' : ''));
  }
  if (hours > 0) {
    parts.push(hours + " hour" + (hours > 1 ? 's' : ''));
  }
  if (minutes > 0) {
    parts.push(minutes + " minute" + (minutes > 1 ? 's' : ''));
  }
  if (seconds > 0) {
    parts.push(seconds + " second" + (seconds > 1 ? 's' : ''));
  }
  if (parts.length === 0) {
    return '0 sec';
  }
  if (parts.length === 1) {
    return parts[0];
  }
  var lastPart = parts.pop();
  var formattedDuration = parts.join(' ') + (" and " + lastPart);
  return formattedDuration;
}
var useCountdown = function useCountdown(_ref) {
  var onZero = _ref.onZero,
    initialTimestamp = _ref.initialTimestamp,
    interpolate = _ref.interpolate;
  var _useLogging = useLogging(),
    error = _useLogging.error;
  var _useState = React.useState(initialTimestamp || null),
    timestamp = _useState[0],
    setTimeStamp = _useState[1];
  var _useState2 = React.useState(''),
    countdown = _useState2[0],
    setCountdown = _useState2[1];
  var _useState3 = React.useState(),
    intId = _useState3[0],
    setIntId = _useState3[1];
  React.useEffect(function () {
    if (timestamp === null) return;
    var id = setInterval(function () {
      var result = formatTimeStamp(new Date(timestamp));
      setCountdown(result);
    }, 1000);
    setIntId(id);
    return function () {
      return clearInterval(id);
    };
  }, [timestamp]);
  React.useEffect(function () {
    if (!onZero) return;
    if (timestamp === null) return;
    var currentDate = new Date();
    var diff = getPositiveDateDiffInSec(currentDate, new Date(timestamp));
    if (diff <= 0) {
      onZero();
      clearInterval(intId);
    }
  }, [onZero, timestamp, intId]);
  var interpolatefunc = React.useMemo(function () {
    return getInterpolate(interpolate === null || interpolate === void 0 ? void 0 : interpolate.structure);
  }, [interpolate]);
  var formattedCountdown = React.useMemo(function () {
    if (!interpolate) {
      error('No interpolation provided to timer. Rendering just countdown.');
      return countdown;
    }
    if (!interpolatefunc) {
      error("interpolatefunc couldn't be created. Rendering just countdown.");
      return countdown;
    }
    if (!(interpolate !== null && interpolate !== void 0 && interpolate.text)) {
      error('No text provided to timer interpolation. Rendering just countdown.');
      return countdown;
    }
    var formatVal = function formatVal(val) {
      return formatTimeStamp(new Date(val));
    };
    var interpoaltedVal = interpolatefunc(interpolate.text, formatVal);
    return interpoaltedVal;
  }, [countdown, interpolate, interpolatefunc]);
  return {
    countdown: countdown,
    setTimeStamp: setTimeStamp,
    formattedCountdown: formattedCountdown
  };
};

var useSeenMutation = function useSeenMutation() {
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  var _useFingerprint = useFingerprint(),
    appId = _useFingerprint.appId;
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  var _useCollector = useCollector(),
    setPageTriggers = _useCollector.setPageTriggers,
    setIncompleteTriggers = _useCollector.setIncompleteTriggers,
    setConversions = _useCollector.setConversions;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor,
    setVisitor = _useVisitor.setVisitor;
  var brand = useBrand();
  var trackTriggerSeen = React__default.useCallback(function (trigger) {
    trackEvent('trigger_displayed', {
      triggerId: trigger.id,
      triggerType: trigger.invocation,
      triggerBehaviour: trigger.behaviour,
      time: new Date().toISOString(),
      brand: brand
    });
  }, [trackEvent, brand]);
  return reactQuery.useMutation(function (trigger) {
    trackTriggerSeen(trigger);
    return request.put(hostname + "/triggers/" + appId + "/" + visitor.id + "/seen", {
      seenTriggerIDs: [trigger.id],
      visitor: visitor,
      page: getPagePayload(),
      device: deviceInfo
    }).then(function (response) {
      log('Seen mutation: response', response);
      return response;
    })["catch"](function (err) {
      error('Seen mutation: error', err);
      return err;
    });
  }, {
    onSuccess: function (res) {
      try {
        return Promise.resolve(res.json()).then(function (r) {
          var _r$identifiers;
          log('Seen mutation: replacing triggers with:', r.pageTriggers);
          setPageTriggers(r.pageTriggers);
          setConversions(r.conversions || []);
          var retrievedUserId = (_r$identifiers = r.identifiers) === null || _r$identifiers === void 0 ? void 0 : _r$identifiers.main;
          if (retrievedUserId) {
            updateCookie(retrievedUserId);
            setVisitor({
              id: retrievedUserId
            });
          }
          log('Seen mutation: replacing incomplete Triggers with:', r.incompleteTriggers);
          setIncompleteTriggers(r.incompleteTriggers || []);
          return r;
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }
  });
};

var resetPad = function resetPad() {
  document.body.style.paddingTop = 'inherit';
};
var Banner = function Banner(_ref) {
  var _trigger$data3, _trigger$data4, _trigger$data5;
  var trigger = _ref.trigger;
  var container = React.useRef(null);
  var _useCollector = useCollector(),
    removeActiveTrigger = _useCollector.removeActiveTrigger;
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  var _useState = React.useState(true),
    open = _useState[0],
    setOpen = _useState[1];
  var _useState2 = React.useState(false),
    hasFired = _useState2[0],
    setHasFired = _useState2[1];
  var _useSeenMutation = useSeenMutation(),
    runSeen = _useSeenMutation.mutate,
    isSuccess = _useSeenMutation.isSuccess,
    isLoading = _useSeenMutation.isLoading;
  React.useEffect(function () {
    if (!open) return;
    if (hasFired) return;
    if (isSuccess) return;
    if (isLoading) return;
    var tId = setTimeout(function () {
      runSeen(trigger);
    }, 500);
    setHasFired(true);
    return function () {
      clearTimeout(tId);
    };
  }, [open, isSuccess, isLoading]);
  var handleClickCallToAction = function handleClickCallToAction(e) {
    var _trigger$data, _trigger$data2;
    e.preventDefault();
    trackEvent('user_clicked_button', trigger);
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_blank');
    setOpen(false);
    resetPad();
  };
  var handleClose = function handleClose() {
    trackEvent('user_closed_trigger', trigger);
    removeActiveTrigger(trigger.id);
    setOpen(false);
    resetPad();
  };
  var _useCountdown = useCountdown({
      onZero: handleClose,
      initialTimestamp: new Date(((_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.countdownEndTime) || ''),
      interpolate: {
        text: (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.marketingText,
        structure: trigger.data
      }
    }),
    formattedCountdown = _useCountdown.formattedCountdown;
  var interpolate = React__default.useMemo(function () {
    return getInterpolate(trigger.data || {});
  }, [trigger.data]);
  React.useEffect(function () {
    var _container$current;
    var bannerHeight = (_container$current = container.current) === null || _container$current === void 0 ? void 0 : _container$current.clientHeight;
    document.body.style.paddingTop = bannerHeight + "px";
    return resetPad;
  }, [container, formattedCountdown]);
  if (!open) return null;
  if (!formattedCountdown) return null;
  return React__default.createElement("div", {
    ref: container,
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      background: 'linear-gradient(90deg, rgba(200,41,223,1) 0%, #1f62ff 100%)',
      display: 'flex',
      alignItems: 'center'
    }
  }, React__default.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '1000px',
      margin: '0 auto'
    }
  }, React__default.createElement("p", {
    style: {
      lineHeight: '30px',
      margin: '10px',
      color: 'white',
      fontWeight: 600
    }
  }, formattedCountdown), React__default.createElement("button", {
    onClick: handleClickCallToAction,
    style: {
      border: 'none',
      color: 'white',
      backgroundColor: '#EA3385',
      padding: '5px 10px',
      margin: '10px 0',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  }, interpolate(((_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.buttonText) || ''))),  React__default.createElement(CloseButton, {
    onClick: handleClose,
    style: {
      background: 'transparent',
      color: 'white'
    }
  }));
};
var TriggerBanner = function TriggerBanner(_ref2) {
  var trigger = _ref2.trigger;
  return ReactDOM.createPortal(React__default.createElement(Banner, {
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

var getModalButtonStylesBySize = function getModalButtonStylesBySize(size) {
  switch (size) {
    case 'small':
      {
        return {
          fontSize: '1.3rem',
          padding: '0.3rem 1rem'
        };
      }
    case 'medium':
      {
        return {
          fontSize: '1.3rem',
          padding: '0.3rem 1rem'
        };
      }
    case 'large':
      {
        return {
          fontSize: '1.3rem',
          padding: '0.3rem 1rem'
        };
      }
    case 'full':
      {
        return {
          fontSize: '1.5rem',
          padding: '0.5rem 1.2rem'
        };
      }
  }
};
var getModalButtonFlexPosition = function getModalButtonFlexPosition(position) {
  switch (position) {
    case 'left':
      return {
        justifyContent: 'flex-start'
      };
    case 'right':
      return {
        justifyContent: 'flex-end'
      };
    case 'center':
      return {
        justifyContent: 'center'
      };
  }
};
var randomHash = 'f' + uuid.v4().split('-')[0];
var prependClass = function prependClass(className) {
  return "f" + randomHash + "-" + className;
};
var getIsModalFullyClickable = function getIsModalFullyClickable(_ref) {
  var _trigger$data;
  var trigger = _ref.trigger;
  return !(trigger !== null && trigger !== void 0 && (_trigger$data = trigger.data) !== null && _trigger$data !== void 0 && _trigger$data.buttonText);
};
var getModalSizing = function getModalSizing(img) {
  var imageRealHeight = img.height;
  var imageRealWidth = img.width;
  var aspectRatio = imageRealWidth / imageRealHeight;
  var getMaxWidth = function getMaxWidth(num) {
    return window.innerWidth * 0.9 > num ? num : window.innerWidth * 0.9;
  };
  var getMaxHeight = function getMaxHeight(num) {
    return window.innerHeight * 0.9 > num ? num : window.innerHeight * 0.9;
  };
  var deviceSizeLimits = reactDeviceDetect.isMobile ? {
    height: getMaxHeight(1000),
    width: getMaxWidth(640)
  } : {
    height: getMaxHeight(490),
    width: getMaxWidth(819)
  };
  var widthToUse = Math.min(imageRealWidth, deviceSizeLimits.width);
  var heightToUse = widthToUse / aspectRatio;
  return {
    height: heightToUse,
    width: widthToUse
  };
};
var useModalDimensionsBasedOnImage = function useModalDimensionsBasedOnImage(_ref2) {
  var imageURL = _ref2.imageURL;
  var _useState = React.useState({
      width: 0,
      height: 0
    }),
    imageDimensions = _useState[0],
    setImageDimensions = _useState[1];
  React.useEffect(function () {
    var img = new Image();
    img.src = imageURL;
    var id = setInterval(function () {
      var modalSize = getModalSizing(img);
      if (modalSize.height || modalSize.width) {
        setImageDimensions(modalSize);
        clearInterval(id);
      }
    }, 50);
    return function () {
      clearInterval(id);
    };
  }, [imageURL]);
  return {
    imageDimensions: imageDimensions,
    setImageDimensions: setImageDimensions
  };
};

var defaultElementSize = 'medium';
var defaultButtonPosition = 'right';
var StandardModal = function StandardModal(_ref) {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  var trigger = _ref.trigger,
    handleClickCallToAction = _ref.handleClickCallToAction,
    handleCloseModal = _ref.handleCloseModal;
  var _useLogging = useLogging(),
    error = _useLogging.error;
  var isModalFullyClickable = getIsModalFullyClickable({
    trigger: trigger
  });
  var _useState = React.useState(false),
    stylesLoaded = _useState[0],
    setStylesLoaded = _useState[1];
  var buttonSizeStyle = getModalButtonStylesBySize(defaultElementSize);
  var _useBrandColors = useBrandColors(),
    textPrimary = _useBrandColors.textPrimary,
    backgroundPrimary = _useBrandColors.backgroundPrimary;
  var imageURL = (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL) || '';
  var _useModalDimensionsBa = useModalDimensionsBasedOnImage({
      imageURL: imageURL
    }),
    _useModalDimensionsBa2 = _useModalDimensionsBa.imageDimensions,
    height = _useModalDimensionsBa2.height,
    width = _useModalDimensionsBa2.width,
    setImageDimensions = _useModalDimensionsBa.setImageDimensions;
  var appendResponsiveBehaviour = React__default.useCallback(function () {
    return reactDeviceDetect.isMobile ? "" : "\n\n@media screen and (max-width: 1400px) {\n  ." + prependClass('modal') + " {\n    height: " + 1 * height + "px;\n    width: " + 1 * width + "px;\n  }\n}\n\n@media screen and (max-width: 850px) {\n  ." + prependClass('modal') + " {\n    height: " + 0.6 * height + "px;\n    width: " + 0.6 * width + "px;\n  }\n  ." + prependClass('main-text') + " {\n    font-size: 2.4rem;\n  }\n  ." + prependClass('sub-text') + " {\n    font-size: 1.3rem;\n  }\n}\n\n@media screen and (max-width: 450px) {\n  ." + prependClass('modal') + " {\n    height: " + 0.4 * height + "px;\n    width: " + 0.4 * width + "px;\n  }\n  ." + prependClass('main-text') + " {\n    font-size: 1.6rem;\n  }\n  ." + prependClass('sub-text') + " {\n    font-size: 0.9rem;\n  }\n}\n\n";
  }, [height, width, imageURL, reactDeviceDetect.isMobile]);
  React.useEffect(function () {
    var cssToApply = "\n    :root {\n      --text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);\n    }\n    \n    h1,\n    h2,\n    h3,\n    h4,\n    h5,\n    h6,\n    p,\n    a,\n    span {\n      line-height: 1.2;\n      font-family: Arial, Helvetica, sans-serif;\n    }\n    \n    ." + prependClass('overlay') + " {\n      position: fixed;\n      top: 0;\n      left: 0;\n      width: 100vw;\n      height: 100vh;\n      background-color: rgba(0, 0, 0, 0.5);\n      z-index: 9999;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-weight: 500;\n      font-style: normal;      \n    }\n    \n    ." + prependClass('modal') + " {\n      " + (isModalFullyClickable ? 'cursor: pointer;' : "") + "\n      height: " + height + "px;\n      width: " + width + "px;\n      display: flex;\n      flex-direction: column;\n      overflow: hidden;\n      background-repeat: no-repeat;\n      flex-direction: column;\n      align-items: center;\n      justify-content: space-between;\n      box-shadow: var(--text-shadow);\n      " + (isModalFullyClickable ? 'transition: box-shadow 0.3s ease-in-out;' : '') + "\n      " + (isModalFullyClickable ? 'cursor: pointer;' : '') + "\n    }\n    \n    ." + prependClass('modal') + ":hover {\n      " + (isModalFullyClickable ? "\n        filter: brightness(1.05);\n        box-shadow: 0.1rem 0.1rem 10px #7b7b7b;\n      " : '') + "\n    }\n    \n    ." + prependClass('text-center') + " {\n      text-align: center;\n    }\n  \n    ." + prependClass('text-container') + " {\n      flex-direction: column;\n      flex: 1;\n      text-shadow: var(--text-shadow);\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('main-text') + " {\n      font-weight: 500;\n      font-size: 4rem;\n      font-style: normal;\n      text-align: center;\n      color: " + textPrimary + ";\n      text-shadow: var(--text-shadow);\n      max-width: 400px;\n      margin-left: auto;\n      margin-right: auto;\n    }\n    \n    ." + prependClass('sub-text') + " {\n      margin: auto;\n      font-weight: 600;\n      font-size: 2.2rem;\n      color: " + textPrimary + ";\n      text-align: center;\n      text-transform: uppercase;\n    }\n    \n    ." + prependClass('cta') + " {\n      cursor: pointer;\n      background-color: " + backgroundPrimary + ";\n      border-radius: 2px;\n      display: block;\n      font-size: 1.3rem;\n      color: " + textPrimary + ";\n      text-align: center;\n      text-transform: uppercase;\n      margin: 1rem;\n      text-decoration: none;\n      box-shadow: 0.3rem 0.3rem white;\n    }\n    \n    ." + prependClass('cta:hover') + " {\n      transition: all 0.3s;\n      filter: brightness(0.95);\n    }\n    \n    ." + prependClass('close-button') + " {\n      border-radius: 100%;\n      background-color: white;\n      width: 2rem;\n      border: none;\n      height: 2rem;\n      position: absolute;\n      margin: 10px;\n      top: 0px;\n      right: 0px;\n      color: black;\n      font-size: 2rem;\n      font-weight: 300;\n      cursor: pointer;\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('close-button:hover') + " {\n      transition: all 0.3s;\n      filter: brightness(0.95);\n    }\n    \n    ." + prependClass('image-darken') + " {\n      " + (isModalFullyClickable ? '' : 'background: rgba(0, 0, 0, 0.1);') + "\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      width: 100%;\n    }\n    \n    ." + prependClass('text-shadow') + " {\n      text-shadow: var(--text-shadow);\n    }\n    \n    ." + prependClass('box-shadow') + " {\n      box-shadow: var(--text-shadow);\n    }\n    " + appendResponsiveBehaviour() + "\n    ";
    var styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(cssToApply));
    document.head.appendChild(styles);
    setTimeout(function () {
      setStylesLoaded(true);
    }, 500);
    return function () {
      document.head.removeChild(styles);
    };
  }, [isModalFullyClickable, height, width, appendResponsiveBehaviour]);
  var getHandleModalActionFinal = React__default.useCallback(function () {
    if (!isModalFullyClickable) return undefined;
    return function (e) {
      setImageDimensions({
        width: 0,
        height: 0
      });
      handleClickCallToAction(e);
    };
  }, [handleClickCallToAction]);
  var handleClickCloseFinal = React__default.useCallback(function (e) {
    e.stopPropagation();
    return handleCloseModal(e);
  }, [handleCloseModal]);
  if (!stylesLoaded) {
    return null;
  }
  if (!width || !height) {
    error("StandardModal: Couldn't get image dimensions, so not showing trigger. Investigate.");
    return null;
  }
  return React__default.createElement("div", {
    className: prependClass('overlay')
  }, React__default.createElement("div", {
    onClick: getHandleModalActionFinal(),
    className: prependClass('modal'),
    style: {
      background: "url(" + imageURL + ")",
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative'
    }
  }, React__default.createElement("div", {
    className: prependClass('image-darken')
  }, React__default.createElement("div", {
    className: prependClass('close-button')
  }, React__default.createElement(CloseButton, {
    onClick: handleClickCloseFinal
  })), React__default.createElement("div", {
    className: prependClass('text-container')
  }, React__default.createElement("h1", {
    className: prependClass('main-text')
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.heading), React__default.createElement("p", {
    className: prependClass('sub-text')
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.paragraph)), !isModalFullyClickable && React__default.createElement("div", {
    style: _extends({
      display: 'flex'
    }, getModalButtonFlexPosition(defaultButtonPosition))
  }, React__default.createElement("div", null, React__default.createElement("a", {
    href: trigger === null || trigger === void 0 ? void 0 : (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.buttonURL,
    className: prependClass('cta'),
    onClick: handleClickCallToAction,
    style: buttonSizeStyle
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.buttonText))))));
};

var FullyClickableModal = function FullyClickableModal(_ref) {
  var _trigger$data;
  var handleClickCallToAction = _ref.handleClickCallToAction,
    handleCloseModal = _ref.handleCloseModal,
    trigger = _ref.trigger;
  var imageURL = (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL) || '';
  var _useModalDimensionsBa = useModalDimensionsBasedOnImage({
      imageURL: imageURL
    }),
    _useModalDimensionsBa2 = _useModalDimensionsBa.imageDimensions,
    height = _useModalDimensionsBa2.height,
    width = _useModalDimensionsBa2.width;
  var _useState = React.useState(false),
    stylesLoaded = _useState[0],
    setStylesLoaded = _useState[1];
  var appendResponsiveBehaviour = React__default.useCallback(function () {
    return reactDeviceDetect.isMobile ? "." + prependClass('modal') + " {\n\n    }" : "\n@media screen and (max-width: 1400px) {\n  ." + prependClass('modal') + " {\n    height: " + 1 * height + "px;\n    width: " + 1 * width + "px;\n  }\n}\n\n@media screen and (max-width: 850px) {\n  ." + prependClass('modal') + " {\n    height: " + 0.6 * height + "px;\n    width: " + 0.6 * width + "px;\n  }\n}\n\n@media screen and (max-width: 450px) {\n  ." + prependClass('modal') + " {\n    height: " + 0.4 * height + "px;\n    width: " + 0.4 * width + "px;\n  }\n}\n";
  }, [height, width]);
  React.useEffect(function () {
    var cssToApply = "\n  \n    ." + prependClass('overlay') + " {\n      background-color: rgba(0, 0, 0, 0.7);\n      position: fixed;\n      top: 0;\n      left: 0;\n      width: 100vw;\n      height: 100vh;\n      z-index: 9999;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-weight: 500;\n      font-style: normal;\n    }\n    \n    ." + prependClass('modal') + " {\n      height: " + height + "px;\n      width: " + width + "px;\n      display: flex;\n      flex-direction: column;\n      overflow: hidden;\n      background-repeat: no-repeat;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: space-between;\n      box-shadow: var(--text-shadow);\n      " + ( 'transition: all 0.3s ease-in-out;' ) + "\n      " + ( 'cursor: pointer;' ) + "\n    }\n\n    " + ( "." + prependClass('modal') + ":hover {\n      filter: brightness(1.05);\n      box-shadow: 0.1rem 0.1rem 10px #7b7b7b;\n    }" ) + "\n    \n    \n    ." + prependClass('text-center') + " {\n      text-align: center;\n    }\n  \n    ." + prependClass('text-container') + " {\n      flex-direction: column;\n      flex: 1;\n      text-shadow: var(--text-shadow);\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('main-text') + " {\n      font-weight: 500;\n      font-size: 2rem;\n      font-style: normal;\n      text-align: center;\n      margin-bottom: 1rem;\n      fill: var(--secondary);\n      text-shadow: var(--text-shadow);\n      max-width: 400px;\n      margin-left: auto;\n      margin-right: auto;\n    \n    }\n    \n    ." + prependClass('sub-text') + " {\n      margin: auto;\n      font-weight: 600;\n      font-size: 1.2rem;\n    \n      text-align: center;\n      text-transform: uppercase;\n    }\n\n    ." + prependClass('close-button') + " {\n      border-radius: 100%;\n      background-color: white;\n      width: 2rem;\n      border: none;\n      height: 2rem;\n      position: absolute;\n      margin: 10px;\n      top: 0px;\n      right: 0px;\n      color: black;\n      font-size: 1.2rem;\n      font-weight: 300;\n      cursor: pointer;\n      display: grid;\n      place-content: center;\n    }\n    \n    ." + prependClass('close-button:hover') + " {\n      transition: all 0.3s;\n      filter: brightness(0.95);\n    }\n    \n    ." + prependClass('image-darken') + " {\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      width: 100%;\n      padding: 2rem 1.5rem 1.5rem 1.5rem;\n    }\n    \n    ." + prependClass('text-shadow') + " {\n      text-shadow: var(--text-shadow);\n    }\n    \n    ." + prependClass('box-shadow') + " {\n      box-shadow: var(--text-shadow);\n    }\n    " + appendResponsiveBehaviour() + "\n\n    ";
    var styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(cssToApply));
    document.head.appendChild(styles);
    setTimeout(function () {
      setStylesLoaded(true);
    }, 500);
    return function () {
      document.head.removeChild(styles);
    };
  }, [height, width, appendResponsiveBehaviour]);
  var handleModalAction = React__default.useCallback(function (e) {
    return handleClickCallToAction(e);
  }, [handleClickCallToAction]);
  var handleClickClose = React__default.useCallback(function (e) {
    e.stopPropagation();
    return handleCloseModal(e);
  }, [handleCloseModal]);
  if (!stylesLoaded) {
    return null;
  }
  return React__default.createElement("div", {
    className: prependClass('overlay')
  }, React__default.createElement("div", {
    className: prependClass('modal'),
    onClick: handleModalAction,
    style: {
      background: "url(" + imageURL + ")",
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative'
    }
  }, React__default.createElement("div", {
    className: prependClass('close-button')
  }, React__default.createElement(CloseButton, {
    onClick: handleClickClose
  }))));
};

var CurlyText = function CurlyText(_ref) {
  var randomHash = _ref.randomHash,
    text = _ref.text;
  return React__default.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    version: '1.1',
    viewBox: '0 0 500 500',
    className: 'f' + randomHash + '-curlyText'
  }, React__default.createElement("defs", null, React__default.createElement("path", {
    id: 'textPath',
    d: 'M 0 500 A 175,100 0 0 1 500,500'
  })), React__default.createElement("text", {
    x: '0',
    y: '0',
    textAnchor: 'middle'
  }, React__default.createElement("textPath", {
    xlinkHref: '#textPath',
    fill: 'white',
    startOffset: '50%'
  }, text)));
};
var BrownsCustomModal = function BrownsCustomModal(props) {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  var trigger = props.trigger,
    handleClickCallToAction = props.handleClickCallToAction,
    handleCloseModal = props.handleCloseModal;
  var _useState = React.useState(false),
    stylesLoaded = _useState[0],
    setStylesLoaded = _useState[1];
  var randomHash = React.useMemo(function () {
    return uuid.v4().split('-')[0];
  }, []);
  React.useEffect(function () {
    var css = "\n      @import url(\"https://p.typekit.net/p.css?s=1&k=olr0pvp&ht=tk&f=25136&a=50913812&app=typekit&e=css\");\n\n@font-face {\n  font-family: \"proxima-nova\";\n  src: url(\"https://use.typekit.net/af/23e139/00000000000000007735e605/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3\") format(\"woff2\"), url(\"https://use.typekit.net/af/23e139/00000000000000007735e605/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3\") format(\"woff\"), url(\"https://use.typekit.net/af/23e139/00000000000000007735e605/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3\") format(\"opentype\");\n  font-display: auto;\n  font-style: normal;\n  font-weight: 500;\n  font-stretch: normal;\n}\n\n:root {\n  --primary: #b6833f;\n  --secondary: white;\n  --text-shadow: 1px 1px 10px rgba(0,0,0,1);\n}\n\n.tk-proxima-nova {\n  font-family: \"proxima-nova\", sans-serif;\n}\n\n.f" + randomHash + "-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 9999;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: \"proxima-nova\", sans-serif !important;\n  font-weight: 500;\n  font-style: normal;\n}\n\n.f" + randomHash + "-modal {\n  width: 80%;\n  max-width: 400px;\n  height: 500px;\n  overflow: hidden;\n  background-repeat: no-repeat;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  box-shadow: 0px 0px 10px rgba(0,0,0,0.5);\n}\n\n@media screen and (min-width: 768px) {\n  .f" + randomHash + "-modal {\n    width: 50%;\n    max-width: 600px;\n  }\n}\n\n.f" + randomHash + "-modalImage {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n\n\n@media screen and (max-width:768px) {\n  .f" + randomHash + "-modal {\n    width: 100vw;\n  }\n}\n\n\n.f" + randomHash + "-curlyText {\n  font-family: \"proxima-nova\", sans-serif;\n  font-weight: 500;\n  font-style: normal;\n  text-transform: uppercase;\n  text-align: center;\n  letter-spacing: 2pt;\n  fill: var(--secondary);\n  text-shadow: var(--text-shadow);\n  margin-top: -150px;\n  max-width: 400px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.f" + randomHash + "-curlyText text {\n  font-size: 1.3rem;\n}\n\n\n.f" + randomHash + "-mainText {\n  font-weight: 200;\n  font-family: \"proxima-nova\", sans-serif;\n  color: var(--secondary);\n  font-size: 2.1rem;\n  text-shadow: var(--text-shadow);\n  display: inline-block;\n  text-align: center;\n  margin-top: -4.5rem;\n}\n\n\n@media screen and (min-width: 768px) {\n  .f" + randomHash + "-curlyText {\n    margin-top: -200px;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .f" + randomHash + "-curlyText {\n    margin-top: -200px;\n  }\n\n  .f" + randomHash + "-mainText {\n    font-size: 2.4rem;\n  }\n}\n\n@media screen and (min-width: 1150px) {\n  .f" + randomHash + "-mainText {\n    font-size: 2.7rem;\n  }\n}\n\n.f" + randomHash + "-cta {\n  font-family: \"proxima-nova\", sans-serif;\n  cursor: pointer;\n  background-color: var(--secondary);\n  padding: 0.75rem 3rem;\n  border-radius: 8px;\n  display: block;\n  font-size: 1.3rem;\n  color: var(--primary);\n  text-align: center;\n  text-transform: uppercase;\n  max-width: 400px;\n  margin: 0 auto;\n  text-decoration: none;\n}\n\n.f" + randomHash + "-cta:hover {\n  transition: all 0.3s;\n  filter: brightness(0.95);\n}\n\n.f" + randomHash + "-close-button {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n}\n\n.f" + randomHash + "-close-button:hover {\n  transition: all 0.3s;\n  filter: brightness(0.95);\n}\n\n\n.f" + randomHash + "-button-container {\n  flex: 1;\n  display: grid;\n  place-content: center;\n}\n\n.f" + randomHash + "-image-darken {\n  background: rgba(0,0,0,0.2);\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 2rem;\n}\n    ";
    var styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(css));
    document.head.appendChild(styles);
    setStylesLoaded(true);
  }, [randomHash]);
  if (!stylesLoaded) {
    return null;
  }
  return React__default.createElement("div", {
    className: 'f' + randomHash + '-overlay'
  }, React__default.createElement("div", {
    className: 'f' + randomHash + '-modal',
    style: {
      background: "url(" + (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL) + ")",
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      height: 500
    }
  }, React__default.createElement("div", {
    className: 'f' + randomHash + '-image-darken'
  }, React__default.createElement("div", {
    className: 'f' + randomHash + '-close-button'
  }, React__default.createElement(CloseButton, {
    onClick: handleCloseModal
  })), React__default.createElement(CurlyText, {
    text: trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.heading,
    randomHash: randomHash
  }), React__default.createElement("div", {
    style: {
      flex: 1
    },
    className: 'f' + randomHash + '--spacer'
  }), React__default.createElement("div", {
    style: {
      flex: 1,
      marginTop: -150,
      textTransform: 'uppercase',
      textAlign: 'center',
      letterSpacing: '2pt'
    }
  }, React__default.createElement("span", {
    className: 'f' + randomHash + '-mainText'
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.paragraph)), React__default.createElement("div", {
    className: 'f' + randomHash + '-buttonContainer'
  }, React__default.createElement("a", {
    href: trigger === null || trigger === void 0 ? void 0 : (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.buttonURL,
    className: 'f' + randomHash + '-cta',
    onClick: handleClickCallToAction
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.buttonText)))));
};
var BrownsModal = function BrownsModal(props) {
  var trigger = props.trigger;
  var isFullyClickable = getIsModalFullyClickable({
    trigger: trigger
  });
  if (!isFullyClickable) return React__default.createElement(BrownsCustomModal, Object.assign({}, props));
  return React__default.createElement(FullyClickableModal, Object.assign({}, props));
};

var primaryColor = "rgb(33,147,174)";
var secondaryColor = "#e0aa00";
var callToActionColor = 'rgb(235,63,43)';
var mainGrey = 'rgb(70,70,70)';
var scaleBg = function scaleBg(scale) {
  var imageWidth = 800;
  var imageHeight = 700;
  return {
    height: imageHeight * scale,
    width: imageWidth * scale
  };
};
var StonehouseCustomModal = function StonehouseCustomModal(_ref) {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  var trigger = _ref.trigger,
    handleClickCallToAction = _ref.handleClickCallToAction,
    handleCloseModal = _ref.handleCloseModal;
  var _useState = React.useState(false),
    stylesLoaded = _useState[0],
    setStylesLoaded = _useState[1];
  React.useEffect(function () {
    var cssToApply = "\n      @font-face{\n        font-family: \"Gotham Bold\";\n        src: url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.eot?#iefix\") format(\"embedded-opentype\"),\n            url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.woff\") format(\"woff\"),\n            url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.woff2\") format(\"woff2\"),\n            url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.ttf\") format(\"truetype\"),\n            url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.svg#Gotham-Bold\") format(\"svg\");\n            font-display: auto;\n            font-style: normal;\n            font-weight: 500;\n            font-stretch: normal;\n    }\n     \n\n      :root {\n        --text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);\n      }\n  \n\n      ." + prependClass('overlay') + " {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100vw;\n        height: 100vh;\n        background-color: rgba(0, 0, 0, 0.5);\n        z-index: 9999;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        font-family: 'Gotham Bold';\n        font-weight: 500;\n        font-style: normal;\n      }\n\n      ." + prependClass('modal') + " {\n        display: flex;\n        flex-direction: column;\n        overflow: hidden;\n        background-repeat: no-repeat;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: space-between;\n        box-shadow: var(--text-shadow);\n        height: " + scaleBg(0.7).height + "px;\n        width: " + scaleBg(0.7).width + "px;\n      }\n\n      ." + prependClass('gotham-bold') + " {\n        font-family: 'Gotham Bold';\n      }\n\n      ." + prependClass('text-center') + " {\n        text-align: center;\n      }\n\n      ." + prependClass('main-text') + " {\n        line-height: 1.2;\n        font-family: 'Gotham Bold';\n        font-weight: 500;\n        font-style: normal;\n        text-transform: uppercase;\n        text-align: center;\n        margin-left: auto;\n        margin-right: auto;\n        margin-top: 0;\n        margin-bottom: -1.5rem;\n        font-size: 4.5rem;\n      }\n\n      ." + prependClass('text-container') + " {\n        display: grid;\n        place-content: center;\n        flex: 1;\n      }\n\n      ." + prependClass('sub-text') + " {\n        line-height: 1;\n        margin: auto;\n        font-weight: 600;\n        font-family: 'Gotham Bold';\n        color: " + secondaryColor + ";\n        letter-spacing: 2pt;\n        display: inline-block;\n        text-align: center;\n        font-size: 2.4rem;\n      }\n\n      ." + prependClass('cta') + " {\n        line-height: 1.2;\n        font-family: 'Gotham Bold';\n        cursor: pointer;\n        background-color: " + callToActionColor + ";\n        border-radius: 2px;\n        display: block;\n        color: white;\n        text-align: center;\n        text-transform: uppercase;\n        margin: 0 auto;\n        text-decoration: none;\n        box-shadow: -2px 2px 8px black;\n        padding: 1.2rem 1.2rem 0.2rem 1.2rem;  \n        font-size: 1.3rem;\n      }\n\n      ." + prependClass('cta:hover') + " {\n        transition: all 0.3s;\n        filter: brightness(0.95);\n      }\n\n      ." + prependClass('close-button') + " {\n        position: absolute;\n        top: 0px;\n        right: 0px;\n      }\n      ." + prependClass('close-button') + ":hover {\n        transition: all 0.3s;\n        filter: brightness(0.95);\n      }\n      \n\n      ." + prependClass('image-container') + " {\n        height: 100%;\n        display: flex;\n        flex-direction: column;\n        justify-content: space-between;\n        width: 100%;\n        padding: 4rem 1.5rem 2rem 1.5rem;\n      }\n\n      ." + prependClass('text-shadow') + " {\n        text-shadow: var(--text-shadow);\n      }\n\n      ." + prependClass('box-shadow') + " {\n        box-shadow: var(--text-shadow);\n      }\n      \n      @media screen and (max-width: 550px) {\n        ." + prependClass('modal') + " {\n          height: " + scaleBg(0.4).height + "px;\n          width: " + scaleBg(0.4).width + "px;\n        }\n        ." + prependClass('main-text') + "{\n          font-size: 2.5rem;\n          margin-bottom: -0.6rem;\n        }\n        ." + prependClass('sub-text') + "{\n          font-size: 1.9rem;\n          letter-spacing: 1.2pt;\n\n        }\n        ." + prependClass('cta') + "{\n          padding: 0.8rem 0.8rem 0rem 0.8rem;  \n          font-size: 0.8rem;\n        }\n        ." + prependClass('image-container') + " {\n          padding: 2rem 1.5rem 1rem 1.5rem;\n        }\n      }\n    ";
    var styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(cssToApply));
    document.head.appendChild(styles);
    setTimeout(function () {
      setStylesLoaded(true);
    }, 500);
    return function () {
      document.head.removeChild(styles);
    };
  }, []);
  var textColorByRoute = React__default.useMemo(function () {
    if (location.href.includes('tablebooking')) return {
      heading: {
        color: 'white'
      },
      paragraph: {
        color: secondaryColor
      }
    };
    return {
      heading: {
        color: primaryColor,
        WebkitTextStroke: "2px " + mainGrey
      },
      paragraph: {
        color: mainGrey
      }
    };
  }, []);
  if (!stylesLoaded) {
    return null;
  }
  return React__default.createElement("div", {
    className: prependClass('overlay')
  }, React__default.createElement("div", {
    className: prependClass('modal'),
    style: {
      background: "url(" + (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL) + ")",
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative'
    }
  }, React__default.createElement("div", {
    className: prependClass('image-container')
  }, React__default.createElement("div", {
    className: prependClass('close-button')
  }, React__default.createElement(CloseButton, {
    onClick: handleCloseModal
  })), React__default.createElement("div", {
    className: prependClass('text-container')
  }, React__default.createElement("h1", {
    className: prependClass('main-text'),
    style: textColorByRoute.heading
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.heading), React__default.createElement("span", {
    className: prependClass('sub-text'),
    style: textColorByRoute.paragraph
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.paragraph)), React__default.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, React__default.createElement("div", null, React__default.createElement("a", {
    href: trigger === null || trigger === void 0 ? void 0 : (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.buttonURL,
    className: prependClass('cta'),
    onClick: handleClickCallToAction
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.buttonText))))));
};
var StonehouseModal = function StonehouseModal(props) {
  var trigger = props.trigger;
  var isFullyClickable = getIsModalFullyClickable({
    trigger: trigger
  });
  if (!isFullyClickable) {
    return React__default.createElement(StonehouseCustomModal, Object.assign({}, props));
  }
  return React__default.createElement(FullyClickableModal, Object.assign({}, props));
};

var Modal = function Modal(_ref) {
  var trigger = _ref.trigger;
  var _useCollector = useCollector(),
    removeActiveTrigger = _useCollector.removeActiveTrigger;
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  var _useState = React.useState(true),
    open = _useState[0],
    setOpen = _useState[1];
  var _useState2 = React.useState(null),
    invocationTimeStamp = _useState2[0],
    setInvocationTimeStamp = _useState2[1];
  var _useCollectorMutation = useCollectorMutation(),
    collect = _useCollectorMutation.mutate;
  var brand = useBrand();
  var _useSeenMutation = useSeenMutation(),
    runSeen = _useSeenMutation.mutate,
    isSuccess = _useSeenMutation.isSuccess,
    isLoading = _useSeenMutation.isLoading;
  React.useEffect(function () {
    if (!open) return;
    if (invocationTimeStamp) return;
    if (isSuccess) return;
    if (isLoading) return;
    var tId = setTimeout(function () {
      runSeen(trigger);
      setInvocationTimeStamp(new Date().toISOString());
    }, 1500);
    return function () {
      clearTimeout(tId);
    };
  }, [open, isSuccess, isLoading]);
  if (!open) {
    return null;
  }
  var handleClickCallToAction = function handleClickCallToAction(e) {
    var _trigger$data, _trigger$data2;
    e.preventDefault();
    collect({
      cta: {
        variantID: trigger.id,
        shownAt: invocationTimeStamp || ''
      }
    });
    trackEvent('user_clicked_button', _extends({}, trigger, {
      variantName: 'MODAL'
    }));
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_self');
  };
  var handleCloseModal = function handleCloseModal() {
    trackEvent('user_closed_trigger', _extends({}, trigger, {
      variantName: 'MODAL'
    }));
    removeActiveTrigger(trigger.id);
    setOpen(false);
  };
  var modalProps = {
    trigger: trigger,
    handleClickCallToAction: handleClickCallToAction,
    handleCloseModal: handleCloseModal
  };
  switch (brand) {
    case 'Ember':
      {
        var image = reactDeviceDetect.isMobile ? 'https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-booknow-m.jpg' : 'https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-booknow.jpg';
        if (window.location.href.includes('nationalsearch')) image = reactDeviceDetect.isMobile ? "https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-findoutmore-m.jpg" : "https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-findoutmore.jpg";
        return React__default.createElement(StandardModal, Object.assign({}, modalProps, {
          trigger: _extends({}, trigger, {
            data: _extends({}, trigger.data, {
              backgroundURL: image
            })
          })
        }));
      }
    case 'Sizzling':
      {
        var _image = reactDeviceDetect.isMobile ? "https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-booknow-m.jpg" : "https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-booknow.jpg";
        if (window.location.href.includes('signup')) _image = reactDeviceDetect.isMobile ? "https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-findoutmore-m.jpg" : "https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-findoutmore.jpg";
        return React__default.createElement(StandardModal, Object.assign({}, modalProps, {
          trigger: _extends({}, trigger, {
            data: _extends({}, trigger.data, {
              backgroundURL: _image
            })
          })
        }));
      }
    case 'Stonehouse':
      return React__default.createElement(StonehouseModal, Object.assign({}, modalProps));
    case 'Browns':
      return React__default.createElement(BrownsModal, Object.assign({}, modalProps));
    case 'C&M':
    default:
      return React__default.createElement(StandardModal, Object.assign({}, modalProps));
  }
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

var clientHandlers = [{
  id: 'modal_v1',
  behaviour: 'BEHAVIOUR_MODAL',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerModal, {
      key: trigger.id,
      trigger: trigger
    });
  }
}, {
  id: 'youtube_v1',
  behaviour: 'BEHAVIOUR_YOUTUBE',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerYoutube, {
      key: trigger.id,
      trigger: trigger
    });
  }
}, {
  id: 'inverse_v1',
  behaviour: 'BEHAVIOUR_INVERSE_FLOW',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerInverse, {
      key: trigger.id,
      trigger: trigger
    });
  }
}, {
  id: 'banner_v1',
  behaviour: 'BEHAVIOUR_BANNER',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerBanner, {
      key: trigger.id,
      trigger: trigger
    });
  }
}];

var queryClient = new reactQuery.QueryClient();
var cookieAccountJWT = 'b2c_token';
var useConsentCheck = function useConsentCheck(consent, consentCallback) {
  var _useState = React.useState(consent),
    consentGiven = _useState[0],
    setConsentGiven = _useState[1];
  var _useLogging = useLogging(),
    log = _useLogging.log;
  React.useEffect(function () {
    if (consent) {
      setConsentGiven(consent);
      return;
    }
    log('Fingerprint Widget Consent: ', consent);
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
  return consentGiven;
};
var FingerprintProvider = function FingerprintProvider(_ref) {
  var appId = _ref.appId,
    children = _ref.children,
    _ref$consent = _ref.consent,
    consent = _ref$consent === void 0 ? false : _ref$consent,
    consentCallback = _ref.consentCallback,
    defaultHandlers = _ref.defaultHandlers,
    _ref$initialDelay = _ref.initialDelay,
    initialDelay = _ref$initialDelay === void 0 ? 0 : _ref$initialDelay,
    _ref$exitIntentTrigge = _ref.exitIntentTriggers,
    exitIntentTriggers = _ref$exitIntentTrigge === void 0 ? true : _ref$exitIntentTrigge,
    _ref$idleTriggers = _ref.idleTriggers,
    idleTriggers = _ref$idleTriggers === void 0 ? true : _ref$idleTriggers,
    _ref$pageLoadTriggers = _ref.pageLoadTriggers,
    pageLoadTriggers = _ref$pageLoadTriggers === void 0 ? true : _ref$pageLoadTriggers,
    legacy_config = _ref.config;
  var _useState2 = React.useState(false),
    booted = _useState2[0],
    setBooted = _useState2[1];
  var _useState3 = React.useState(defaultHandlers || clientHandlers),
    handlers = _useState3[0],
    setHandlers = _useState3[1];
  var consentGiven = useConsentCheck(consent, consentCallback);
  var addAnotherHandler = React__default.useCallback(function (trigger) {
    setHandlers(function (handlers) {
      return [].concat(handlers, [trigger]);
    });
  }, [setHandlers]);
  React.useEffect(function () {
    if (!appId) throw new Error('C&M Fingerprint: appId is required');
    if (booted) return;
    if (!consentGiven) return;
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
  return React__default.createElement(ConfigProvider, {
    legacy_config: legacy_config
  }, React__default.createElement(LoggingProvider, null, React__default.createElement(reactQuery.QueryClientProvider, {
    client: queryClient
  }, React__default.createElement(FingerprintContext.Provider, {
    value: {
      appId: appId,
      booted: booted,
      currentTrigger: null,
      registerHandler: addAnotherHandler,
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
      pageLoadTriggers: pageLoadTriggers,
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
  currentTrigger: null,
  exitIntentTriggers: false,
  idleTriggers: false,
  pageLoadTriggers: false,
  initialDelay: 0,
  registerHandler: function registerHandler() {},
  trackEvent: function trackEvent() {},
  trackPageView: function trackPageView() {},
  unregisterHandler: function unregisterHandler() {}
};
var FingerprintContext = React.createContext(_extends({}, defaultFingerprintState));

exports.CollectorContext = CollectorContext;
exports.CollectorProvider = CollectorProvider;
exports.FingerprintContext = FingerprintContext;
exports.FingerprintProvider = FingerprintProvider;
exports.onCookieChanged = onCookieChanged;
exports.useCollector = useCollector;
exports.useFingerprint = useFingerprint;
//# sourceMappingURL=index.js.map

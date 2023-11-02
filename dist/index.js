function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var reactQuery = require('@tanstack/react-query');
var React = require('react');
var React__default = _interopDefault(React);
var reactErrorBoundary = require('react-error-boundary');
var reactHookForm = require('react-hook-form');
var ReactDOM = _interopDefault(require('react-dom'));
var uuid = require('uuid');
var mixpanel = _interopDefault(require('mixpanel-browser'));
var Cookies = _interopDefault(require('js-cookie'));
var uniqueBy = _interopDefault(require('lodash.uniqby'));
var reactIdleTimer = require('react-idle-timer');
var useExitIntent = require('use-exit-intent');

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
var BrownsModal = function BrownsModal(_ref2) {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  var trigger = _ref2.trigger,
    handleClickCallToAction = _ref2.handleClickCallToAction,
    handleCloseModal = _ref2.handleCloseModal;
  var _useState = React.useState(false),
    stylesLoaded = _useState[0],
    setStylesLoaded = _useState[1];
  var randomHash = React.useMemo(function () {
    return uuid.v4().split('-')[0];
  }, []);
  React.useEffect(function () {
    var css = "\n      @import url(\"https://p.typekit.net/p.css?s=1&k=olr0pvp&ht=tk&f=25136&a=50913812&app=typekit&e=css\");\n\n@font-face {\n  font-family: \"proxima-nova\";\n  src: url(\"https://use.typekit.net/af/23e139/00000000000000007735e605/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3\") format(\"woff2\"), url(\"https://use.typekit.net/af/23e139/00000000000000007735e605/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3\") format(\"woff\"), url(\"https://use.typekit.net/af/23e139/00000000000000007735e605/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3\") format(\"opentype\");\n  font-display: auto;\n  font-style: normal;\n  font-weight: 500;\n  font-stretch: normal;\n}\n\n:root {\n  --primary: #b6833f;\n  --secondary: white;\n  --text-shadow: 1px 1px 10px rgba(0,0,0,1);\n}\n\n.tk-proxima-nova {\n  font-family: \"proxima-nova\", sans-serif;\n}\n\n.f" + randomHash + "-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 9999;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: \"proxima-nova\", sans-serif !important;\n  font-weight: 500;\n  font-style: normal;\n}\n\n.f" + randomHash + "-modal {\n  width: 80%;\n  max-width: 400px;\n  height: 500px;\n  overflow: hidden;\n  background-repeat: no-repeat;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  box-shadow: 0px 0px 10px rgba(0,0,0,0.5);\n}\n\n@media screen and (min-width: 768px) {\n  .f" + randomHash + "-modal {\n    width: 50%;\n    max-width: 600px;\n  }\n}\n\n.f" + randomHash + "-modalImage {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n\n\n@media screen and (max-width:768px) {\n  .f" + randomHash + "-modal {\n    width: 100vw;\n  }\n}\n\n\n.f" + randomHash + "-curlyText {\n  font-family: \"proxima-nova\", sans-serif;\n  font-weight: 500;\n  font-style: normal;\n  text-transform: uppercase;\n  text-align: center;\n  letter-spacing: 2pt;\n  fill: var(--secondary);\n  text-shadow: var(--text-shadow);\n  margin-top: -150px;\n  max-width: 400px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.f" + randomHash + "-curlyText text {\n  font-size: 1.3rem;\n}\n\n\n.f" + randomHash + "-mainText {\n  font-weight: 200;\n  font-family: \"proxima-nova\", sans-serif;\n  color: var(--secondary);\n  font-size: 2.1rem;\n  text-shadow: var(--text-shadow);\n  display: inline-block;\n  text-align: center;\n  margin-top: -4.5rem;\n}\n\n\n@media screen and (min-width: 768px) {\n  .f" + randomHash + "-curlyText {\n    margin-top: -200px;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .f" + randomHash + "-curlyText {\n    margin-top: -200px;\n  }\n\n  .f" + randomHash + "-mainText {\n    font-size: 2.4rem;\n  }\n}\n\n@media screen and (min-width: 1150px) {\n  .f" + randomHash + "-mainText {\n    font-size: 2.7rem;\n  }\n}\n\n.f" + randomHash + "-cta {\n  font-family: \"proxima-nova\", sans-serif;\n  cursor: pointer;\n  background-color: var(--secondary);\n  padding: 0.75rem 3rem;\n  border-radius: 8px;\n  display: block;\n  font-size: 1.3rem;\n  color: var(--primary);\n  text-align: center;\n  text-transform: uppercase;\n  max-width: 400px;\n  margin: 0 auto;\n  text-decoration: none;\n}\n\n.f" + randomHash + "-cta:hover {\n  transition: all 0.3s;\n  filter: brightness(0.95);\n}\n\n.f" + randomHash + "-close-button {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n}\n\n.f" + randomHash + "-button-container {\n  flex: 1;\n  display: grid;\n  place-content: center;\n}\n\n.f" + randomHash + "-image-darken {\n  background: rgba(0,0,0,0.2);\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 2rem;\n}\n    ";
    var styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(css));
    document.head.appendChild(styles);
    setStylesLoaded(true);
  });
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

var randomHash = 'f' + uuid.v4().split('-')[0];
var prependClass = function prependClass(className) {
  return "f" + randomHash + "-" + className;
};
var StonehouseModal = function StonehouseModal(_ref) {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  var trigger = _ref.trigger,
    handleClickCallToAction = _ref.handleClickCallToAction,
    handleCloseModal = _ref.handleCloseModal;
  var _useState = React.useState(false),
    stylesLoaded = _useState[0],
    setStylesLoaded = _useState[1];
  React.useEffect(function () {
    var cssToApply = "\n      @font-face{\n        font-family: \"Gotham Bold\";\n        src: url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.eot?#iefix\") format(\"embedded-opentype\"),\n            url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.woff\") format(\"woff\"),\n            url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.woff2\") format(\"woff2\"),\n            url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.ttf\") format(\"truetype\"),\n            url(\"https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.svg#Gotham-Bold\") format(\"svg\");\n            font-display: auto;\n            font-style: normal;\n            font-weight: 500;\n            font-stretch: normal;\n    }\n     \n\n      :root {\n        --primary: white;\n        --secondary: #e0aa00;\n        --text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);\n      }\n      h1, h2, h3, h4, h5, h6, p, a, span {\n        line-height: 1.2;\n      }\n\n      ." + prependClass('overlay') + " {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100vw;\n        height: 100vh;\n        background-color: rgba(0, 0, 0, 0.5);\n        z-index: 9999;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        font-family: 'Gotham Bold';\n        font-weight: 500;\n        font-style: normal;\n      }\n\n      ." + prependClass('modal') + " {\n        width: 80%;\n        height: 500px;\n        display: flex;\n        flex-direction: column;\n        overflow: hidden;\n        background-repeat: no-repeat;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: space-between;\n        box-shadow: var(--text-shadow);\n      }\n\n      ." + prependClass('gotham-bold') + " {\n        font-family: 'Gotham Bold';\n      }\n\n      ." + prependClass('text-center') + " {\n        text-align: center;\n      }\n\n      @media screen and (min-width: 768px) {\n        ." + prependClass('modal') + " {\n          max-width: 600px;\n        }\n      }\n\n      @media screen and (max-width: 768px) {\n        ." + prependClass('modal') + " {\n          width: 95vw;\n          max-width: 600px;\n        }\n      }\n\n      ." + prependClass('main-text') + " {\n        flex: 1;\n        font-family: 'Gotham Bold';\n        font-weight: 500;\n        font-size: 3rem;\n        font-style: normal;\n        text-transform: uppercase;\n        text-align: center;\n        letter-spacing: 2pt;\n        fill: var(--secondary);\n        text-shadow: var(--text-shadow);\n        max-width: 400px;\n        margin-left: auto;\n        margin-right: auto;\n        margin-bottom: -10px;\n      }\n\n      ." + prependClass('text-container') + " {\n        display: flex;\n        justify-content: center;\n        flex-direction: column;\n        text-shadow: var(--text-shadow);\n      }\n\n      ." + prependClass('sub-text') + " {\n        margin: auto;\n        font-weight: 600;\n        font-family: 'Gotham Bold';\n        font-size: 0.6rem;\n        letter-spacing: 2pt;\n\n        display: inline-block;\n        text-align: center;\n        text-transform: uppercase;\n      }\n\n      ." + prependClass('cta') + " {\n        font-family: 'Gotham Bold';\n        cursor: pointer;\n        background-color: var(--secondary);\n        padding: 0.75rem 1rem 0 1rem;\n        border-radius: 2px;\n        display: block;\n        font-size: 1.3rem;\n        color: var(--primary);\n        text-align: center;\n        text-transform: uppercase;\n        max-width: 400px;\n        margin: 0 auto;\n        text-decoration: none;\n        box-shadow: 0.3rem 0.3rem white;\n      }\n\n      ." + prependClass('cta:hover') + " {\n        transition: all 0.3s;\n        filter: brightness(0.95);\n      }\n\n      ." + prependClass('close-button') + " {\n        position: absolute;\n        top: 0px;\n        right: 0px;\n      }\n\n      ." + prependClass('image-darken') + " {\n        background: rgba(0, 0, 0, 0.1);\n        height: 100%;\n        display: flex;\n        flex-direction: column;\n        justify-content: space-between;\n        width: 100%;\n        padding: 2rem 1.5rem 1.5rem 1.5rem;\n      }\n\n      ." + prependClass('text-shadow') + " {\n        text-shadow: var(--text-shadow);\n      }\n\n      ." + prependClass('box-shadow') + " {\n        box-shadow: var(--text-shadow);\n      }\n    ";
    var styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(cssToApply));
    document.head.appendChild(styles);
    setTimeout(function () {
      setStylesLoaded(true);
    }, 500);
  }, [randomHash]);
  if (!stylesLoaded) {
    return null;
  }
  var TwoForTenThing = function TwoForTenThing() {
    return React__default.createElement("div", {
      style: {
        position: 'absolute',
        left: '10%',
        top: 250
      }
    }, React__default.createElement("div", {
      className: prependClass("box-shadow"),
      style: {
        borderRadius: '100%',
        height: 100,
        width: 100,
        border: '2px solid white',
        display: 'grid',
        placeContent: 'center',
        transform: 'rotate(-10deg)'
      }
    }, React__default.createElement("h4", {
      className: prependClass('gotham-bold') + " " + prependClass('text-center') + " " + prependClass('text-shadow')
    }, "2 for"), React__default.createElement("h1", {
      className: prependClass('gotham-bold') + " " + prependClass('text-center') + " " + prependClass('text-shadow'),
      style: {
        marginLeft: 15,
        marginBottom: -10
      }
    }, "10*"), React__default.createElement("h6", {
      className: prependClass('gotham-bold') + " " + prependClass('text-center') + " " + prependClass('text-shadow')
    }, "COCKTAILS")));
  };
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
    className: prependClass('image-darken')
  }, React__default.createElement("div", {
    className: prependClass('close-button')
  }, React__default.createElement(CloseButton, {
    onClick: handleCloseModal
  })), React__default.createElement("div", {
    className: prependClass('text-container')
  }, React__default.createElement("h1", {
    className: prependClass('main-text')
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.heading), React__default.createElement("span", {
    className: prependClass('sub-text')
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.paragraph)), React__default.createElement("div", null, React__default.createElement(TwoForTenThing, null)), React__default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, React__default.createElement("div", null, React__default.createElement("a", {
    href: trigger === null || trigger === void 0 ? void 0 : (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.buttonURL,
    className: prependClass('cta'),
    onClick: handleClickCallToAction
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.buttonText))))));
};

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

var useFingerprint = function useFingerprint() {
  return React.useContext(FingerprintContext);
};

function getEnvVars() {
  var _window, _window$location, _window$location$host, _window2, _window2$location, _window2$location$hos, _window3, _window3$location, _window4, _window4$location;
  var isDev = false;
  switch (true) {
    case typeof window === 'undefined':
    case (_window = window) === null || _window === void 0 ? void 0 : (_window$location = _window.location) === null || _window$location === void 0 ? void 0 : (_window$location$host = _window$location.host) === null || _window$location$host === void 0 ? void 0 : _window$location$host.includes('localhost'):
    case (_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$location = _window2.location) === null || _window2$location === void 0 ? void 0 : (_window2$location$hos = _window2$location.host) === null || _window2$location$hos === void 0 ? void 0 : _window2$location$hos.includes('clicksandmortar.tech'):
    case (_window3 = window) === null || _window3 === void 0 ? void 0 : (_window3$location = _window3.location) === null || _window3$location === void 0 ? void 0 : _window3$location.host.startsWith('stage65-az'):
    case (_window4 = window) === null || _window4 === void 0 ? void 0 : (_window4$location = _window4.location) === null || _window4$location === void 0 ? void 0 : _window4$location.host.startsWith('test65-az'):
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

var setCookie = function setCookie(name, value, expires) {
  return Cookies.set(name, value, {
    expires: expires,
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
  var splitCookie = id.split('|');
  return uuidValidateV4(splitCookie[0]);
};

var bootstrapVisitor = function bootstrapVisitor(_ref) {
  var setVisitor = _ref.setVisitor,
    session = _ref.session,
    setSession = _ref.setSession;
  var visitor = {
    id: undefined
  };
  if (getCookie(cookieAccountJWT)) {
    visitor.jwt = getCookie(cookieAccountJWT);
  }
  if (typeof window !== 'undefined') {
    var urlParams = new URLSearchParams(window.location.search);
    var vid = urlParams.get('v_id');
    if (vid) {
      visitor.id = vid;
    }
  }
  if (!visitor.id && !getCookie('_cm_id') || !validVisitorId(getCookie('_cm_id'))) {
    var visitorId = uuid.v4();
    visitor.id = visitorId;
  }
  if (!visitor.id && getCookie('_cm_id')) {
    var c = getCookie('_cm_id');
    var _c$split = c.split('|'),
      _visitorId = _c$split[0];
    visitor.id = _visitorId;
  }
  var _getSessionIdAndEndTi = getSessionIdAndEndTime(getCookie('_cm_id')),
    sessionId = _getSessionIdAndEndTi.sessionId,
    endTime = _getSessionIdAndEndTi.endTime;
  setCookie('_cm_id', visitor.id + "|" + sessionId + "|" + endTime.toISOString(), 365);
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
          })).then(function () {});
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
    boot();
    log('VisitorProvider: booted', session, visitor);
  }, [appId, booted]);
  var setVisitorData = React__default.useCallback(function (prop) {
    setVisitor(_extends({}, visitor, prop));
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
  React.useEffect(function () {
    if (!(visitor !== null && visitor !== void 0 && visitor.cohort)) {
      log('Able to register user cohort, but none provided. ');
      return;
    }
    registerUserData({
      u_cohort: visitor.cohort
    });
  }, [visitor]);
  var registerUserData = React__default.useCallback(function (properties) {
    log("Mixpanel: attempting to'register/override properties: " + Object.keys(properties).join(', '));
    mixpanel.people.set(properties);
  }, [log]);
  return React__default.createElement(MixpanelContext.Provider, {
    value: {
      trackEvent: trackEvent,
      registerUserData: registerUserData
    }
  }, children);
};
var MixpanelContext = React.createContext({
  trackEvent: function trackEvent() {
    return console.error('Mixpanel: trackEvent not setup properly. Check your Context order.');
  },
  registerUserData: function registerUserData() {
    return console.error('Mixpanel: registerUserData not setup properly. Check your Context order.');
  }
});
var useMixpanel = function useMixpanel() {
  return React.useContext(MixpanelContext);
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

var defaultTriggerCooldown = 60 * 1000;
function useTriggerDelay(cooldownMs) {
  if (cooldownMs === void 0) {
    cooldownMs = defaultTriggerCooldown;
  }
  var _useState = React.useState(null),
    lastTriggerTimeStamp = _useState[0],
    setLastTriggerTimeStamp = _useState[1];
  var startCooldown = React__default.useCallback(function () {
    var currentTimeStamp = Number(new Date());
    setLastTriggerTimeStamp(currentTimeStamp);
  }, [setLastTriggerTimeStamp]);
  var getRemainingCooldownMs = React__default.useCallback(function () {
    if (!lastTriggerTimeStamp) return 0;
    var currentTime = Number(new Date());
    var remainingMS = lastTriggerTimeStamp + cooldownMs - currentTime;
    return remainingMS;
  }, [lastTriggerTimeStamp, cooldownMs]);
  var canNextTriggerOccur = React__default.useCallback(function () {
    return getRemainingCooldownMs() <= 0;
  }, [getRemainingCooldownMs]);
  return {
    startCooldown: startCooldown,
    canNextTriggerOccur: canNextTriggerOccur,
    getRemainingCooldownMs: getRemainingCooldownMs
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

var defaultIdleStatusDelay = 5 * 1000;
function CollectorProvider(_ref) {
  var children = _ref.children,
    _ref$handlers = _ref.handlers,
    handlers = _ref$handlers === void 0 ? [] : _ref$handlers;
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  var _useFingerprint = useFingerprint(),
    appId = _useFingerprint.appId,
    booted = _useFingerprint.booted,
    initialDelay = _useFingerprint.initialDelay,
    exitIntentTriggers = _useFingerprint.exitIntentTriggers,
    idleTriggers = _useFingerprint.idleTriggers,
    pageLoadTriggers = _useFingerprint.pageLoadTriggers,
    config = _useFingerprint.config;
  var configIdleDelay = config === null || config === void 0 ? void 0 : config.idleDelay;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor,
    session = _useVisitor.session,
    setVisitor = _useVisitor.setVisitor;
  var _useTriggerDelay = useTriggerDelay(config === null || config === void 0 ? void 0 : config.triggerCooldown),
    canNextTriggerOccur = _useTriggerDelay.canNextTriggerOccur,
    startCooldown = _useTriggerDelay.startCooldown,
    getRemainingCooldownMs = _useTriggerDelay.getRemainingCooldownMs;
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
    registerHandler = _useExitIntent.registerHandler,
    reRegisterExitIntent = _useExitIntent.resetState;
  var getIdleStatusDelay = React__default.useCallback(function () {
    var idleDelay = configIdleDelay || defaultIdleStatusDelay;
    var cooldownDelay = getRemainingCooldownMs();
    var delayAdjustedForCooldown = idleDelay + cooldownDelay;
    log("Setting idle delay at " + delayAdjustedForCooldown + "ms (cooldown " + cooldownDelay + "ms + config.delay " + idleDelay + "ms)");
    return delayAdjustedForCooldown;
  }, [getRemainingCooldownMs, configIdleDelay]);
  var _useState = React.useState(getIdleStatusDelay()),
    idleTimeout = _useState[0],
    setIdleTimeout = _useState[1];
  var _useState2 = React.useState([]),
    pageTriggers = _useState2[0],
    setPageTriggers = _useState2[1];
  var _useState3 = React.useState(undefined),
    displayTrigger = _useState3[0],
    setDisplayTrigger = _useState3[1];
  var _useState4 = React.useState(false),
    intently = _useState4[0],
    setIntently = _useState4[1];
  var _useState5 = React.useState(new Map()),
    foundWatchers = _useState5[0],
    setFoundWatchers = _useState5[1];
  var addPageTriggers = function addPageTriggers(triggers) {
    setPageTriggers(function (prev) {
      return uniqueBy([].concat(prev, triggers || []), 'id');
    });
  };
  React.useEffect(function () {
    if (intently) return;
    log('CollectorProvider: removing intently overlay');
    var runningInterval = setInterval(function () {
      var locatedIntentlyScript = document.querySelectorAll('div[id^=smc-v5-overlay-]');
      Array.prototype.forEach.call(locatedIntentlyScript, function (node) {
        node.parentNode.removeChild(node);
        log('CollectorProvider: successfully removed intently overlay');
        clearInterval(runningInterval);
      });
    }, 100);
    return function () {
      clearInterval(runningInterval);
    };
  }, [intently, log]);
  var resetDisplayTrigger = React.useCallback(function () {
    log('CollectorProvider: resetting displayTrigger');
    setDisplayTrigger(undefined);
  }, [log]);
  var TriggerComponent = React__default.useCallback(function () {
    var _handler$invoke, _handler;
    if (!displayTrigger) return null;
    var handler;
    var trigger = pageTriggers.find(function (_trigger) {
      var potentialTrigger = _trigger.invocation === displayTrigger;
      var potentialHandler = handlers === null || handlers === void 0 ? void 0 : handlers.find(function (handler) {
        return handler.behaviour === _trigger.behaviour;
      });
      handler = potentialHandler;
      return potentialTrigger && potentialHandler;
    });
    if (!trigger) {
      error("No trigger found for displayTrigger", displayTrigger);
      return null;
    }
    log('CollectorProvider: available handlers include: ', handlers);
    log('CollectorProvider: trigger to match is: ', trigger);
    log('CollectorProvider: attempting to show trigger', trigger, handler);
    if (!handler) {
      log('No handler found for trigger', trigger);
      return null;
    }
    if (!handler.invoke) {
      log('No invoke method found for handler', handler);
      return null;
    }
    var potentialComponent = (_handler$invoke = (_handler = handler).invoke) === null || _handler$invoke === void 0 ? void 0 : _handler$invoke.call(_handler, trigger);
    if (potentialComponent && React__default.isValidElement(potentialComponent)) {
      log('CollectorProvider: Potential component for trigger is valid. Mounting');
      return potentialComponent;
    }
    log('CollectorProvider: Potential component for trigger invalid. Running as regular func.');
    return null;
  }, [log, displayTrigger, pageTriggers, handlers, getRemainingCooldownMs, error, startCooldown, resetDisplayTrigger]);
  var fireIdleTrigger = React.useCallback(function () {
    if (!idleTriggers) return;
    log('CollectorProvider: attempting to fire idle time trigger');
    setDisplayTrigger('INVOCATION_IDLE_TIME');
    startCooldown();
  }, [idleTriggers, log, setDisplayTrigger, startCooldown, displayTrigger]);
  var _useExitIntentDelay = useExitIntentDelay(config === null || config === void 0 ? void 0 : config.exitIntentDelay),
    hasDelayPassed = _useExitIntentDelay.hasDelayPassed;
  var launchExitTrigger = React__default.useCallback(function () {
    if (displayTrigger) return;
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
    setDisplayTrigger('INVOCATION_EXIT_INTENT');
    startCooldown();
  }, [log, canNextTriggerOccur, getRemainingCooldownMs, reRegisterExitIntent, hasDelayPassed, displayTrigger]);
  React.useEffect(function () {
    if (!exitIntentTriggers) return;
    log('CollectorProvider: attempting to register exit trigger');
    registerHandler({
      id: 'clientTrigger',
      handler: launchExitTrigger
    });
  }, [exitIntentTriggers, launchExitTrigger, log, registerHandler]);
  var fireOnLoadTriggers = React.useCallback(function () {
    log({
      pageLoadTriggers: pageLoadTriggers
    });
    if (!pageLoadTriggers) return;
    if (displayTrigger) return;
    log('CollectorProvider: attempting to fire on-page-load trigger');
    setDisplayTrigger('INVOCATION_PAGE_LOAD');
    startCooldown();
  }, [pageLoadTriggers, log, setDisplayTrigger, startCooldown, displayTrigger]);
  React.useEffect(function () {
    if (!booted) {
      log('CollectorProvider: Not yet collecting, awaiting boot');
      return;
    }
    var delay = setTimeout(function () {
      fireOnLoadTriggers();
      if (!visitor.id) {
        log('CollectorProvider: Not yet collecting, awaiting visitor ID');
        return;
      }
      log('CollectorProvider: collecting data');
      if (hasVisitorIDInURL()) {
        trackEvent('abandoned_journey_landing', {
          from_email: true
        });
      }
      var params = new URLSearchParams(window.location.search).toString().split('&').reduce(function (acc, cur) {
        var _cur$split = cur.split('='),
          key = _cur$split[0],
          value = _cur$split[1];
        if (!key) return acc;
        acc[key] = value;
        return acc;
      }, {});
      var hash = window.location.hash.substring(3);
      var hashParams = hash.split('&').reduce(function (result, item) {
        var parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
      }, {});
      if (hashParams.id_token) {
        log('CollectorProvider: user logged in event fired');
        trackEvent('user_logged_in', {});
        collect({
          appId: appId,
          visitor: visitor,
          sessionId: session === null || session === void 0 ? void 0 : session.id,
          account: {
            token: hashParams.id_token
          }
        }).then(function (response) {
          try {
            return Promise.resolve(response.json()).then(function (payload) {
              log('Sent login collector data, retrieved:', payload);
            });
          } catch (e) {
            return Promise.reject(e);
          }
        })["catch"](function (err) {
          error('failed to store collected data', err);
        });
      }
      collect({
        appId: appId,
        visitor: visitor,
        sessionId: session === null || session === void 0 ? void 0 : session.id,
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
          if (response.status === 204) {
            setIntently(true);
            return Promise.resolve();
          }
          return Promise.resolve(response.json()).then(function (payload) {
            log('Sent collector data, retrieved:', payload);
            setIdleTimeout(getIdleStatusDelay());
            addPageTriggers(payload === null || payload === void 0 ? void 0 : payload.pageTriggers);
            var cohort = payload.intently ? 'intently' : 'fingerprint';
            setVisitor({
              cohort: cohort
            });
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
  }, [fireOnLoadTriggers, appId, booted, collect, error, handlers, initialDelay, getIdleStatusDelay, setIdleTimeout, log, trackEvent, visitor, session === null || session === void 0 ? void 0 : session.id]);
  
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
            appId: appId,
            visitor: visitor,
            sessionId: session === null || session === void 0 ? void 0 : session.id,
            elements: [{
              path: window.location.pathname,
              selector: configuredSelector
            }]
          }).then(function (response) {
            try {
              return Promise.resolve(response.json()).then(function (payload) {
                log('Sent collector data, retrieved:', payload);
                setIdleTimeout(getIdleStatusDelay());
                addPageTriggers(payload === null || payload === void 0 ? void 0 : payload.pageTriggers);
              });
            } catch (e) {
              return Promise.reject(e);
            }
          })["catch"](function (err) {
            error('failed to store collected data', err);
          });
          clearInterval(intervalId);
        }
      });
    }, 500);
    return intervalId;
  }, [appId, collect, error, foundWatchers, getIdleStatusDelay, log, session, setIdleTimeout, trackEvent, visitor]);
  React.useEffect(function () {
    if (!visitor.id) return;
    var intervalIds = [registerWatcher('.stage-5', '')];
    return function () {
      intervalIds.forEach(function (intervalId) {
        return clearInterval(intervalId);
      });
    };
  }, [registerWatcher, visitor]);
  var setTrigger = React__default.useCallback(function (trigger) {
    log('CollectorProvider: manually setting trigger', trigger);
    addPageTriggers([trigger]);
    setDisplayTrigger(trigger.invocation);
  }, [log, setDisplayTrigger, addPageTriggers]);
  var collectorContextVal = React__default.useMemo(function () {
    return {
      addPageTriggers: addPageTriggers,
      resetDisplayTrigger: resetDisplayTrigger,
      setTrigger: setTrigger,
      trackEvent: trackEvent
    };
  }, [resetDisplayTrigger, setTrigger, trackEvent]);
  return React__default.createElement(reactIdleTimer.IdleTimerProvider, {
    timeout: idleTimeout,
    onPresenceChange: function onPresenceChange(presence) {
      log('presence changed', presence);
    },
    onIdle: fireIdleTrigger
  }, React__default.createElement(CollectorContext.Provider, {
    value: collectorContextVal
  }, children), React__default.createElement(TriggerComponent, null));
}
var CollectorContext = React.createContext({
  addPageTriggers: function addPageTriggers() {},
  resetDisplayTrigger: function resetDisplayTrigger() {},
  setTrigger: function setTrigger() {},
  trackEvent: function trackEvent() {}
});

var useCollector = function useCollector() {
  return React.useContext(CollectorContext);
};

var getBrand = function getBrand() {
  if (typeof window === 'undefined') return null;
  if (window.location.host.startsWith('localhost')) return 'Stonehouse';
  if (window.location.host.includes('stonehouserestaurants.co.uk')) return 'Stonehouse';
  if (window.location.host.includes('browns-restaurants.co.uk')) return 'Browns';
  return null;
};

var Modal = function Modal(_ref) {
  var trigger = _ref.trigger;
  var _useLogging = useLogging(),
    log = _useLogging.log,
    error = _useLogging.error;
  var _useCollector = useCollector(),
    resetDisplayTrigger = _useCollector.resetDisplayTrigger;
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  var _useFingerprint = useFingerprint(),
    appId = _useFingerprint.appId;
  var _useVisitor = useVisitor(),
    visitor = _useVisitor.visitor;
  var _useState = React.useState(true),
    open = _useState[0],
    setOpen = _useState[1];
  var _useState2 = React.useState(false),
    stylesLoaded = _useState2[0],
    setStylesLoaded = _useState2[1];
  var _useState3 = React.useState(false),
    hasFired = _useState3[0],
    setHasFired = _useState3[1];
  var brand = React__default.useMemo(function () {
    return getBrand();
  }, []);
  var randomHash = React.useMemo(function () {
    return uuid.v4().split('-')[0];
  }, []);
  React.useEffect(function () {
    if (!open) return;
    if (hasFired) return;
    try {
      request.put(hostname + "/triggers/" + appId + "/" + visitor.id + "/seen", {
        seenTriggerIDs: [trigger.id]
      }).then(log);
    } catch (e) {
      error(e);
    }
    trackEvent('trigger_displayed', {
      triggerId: trigger.id,
      triggerType: trigger.invocation,
      triggerBehaviour: trigger.behaviour,
      time: new Date().toISOString(),
      brand: brand
    });
    setHasFired(true);
  }, [open]);
  React.useEffect(function () {
    var css = "\n      @import url(\"https://p.typekit.net/p.css?s=1&k=olr0pvp&ht=tk&f=25136&a=50913812&app=typekit&e=css\");\n\n@font-face {\n  font-family: \"proxima-nova\";\n  src: url(\"https://use.typekit.net/af/23e139/00000000000000007735e605/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3\") format(\"woff2\"), url(\"https://use.typekit.net/af/23e139/00000000000000007735e605/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3\") format(\"woff\"), url(\"https://use.typekit.net/af/23e139/00000000000000007735e605/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3\") format(\"opentype\");\n  font-display: auto;\n  font-style: normal;\n  font-weight: 500;\n  font-stretch: normal;\n}\n\n:root {\n  --primary: #b6833f;\n  --secondary: white;\n  --text-shadow: 1px 1px 10px rgba(0,0,0,1);\n}\n\n.tk-proxima-nova {\n  font-family: \"proxima-nova\", sans-serif;\n}\n\n.f" + randomHash + "-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 9999;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: \"proxima-nova\", sans-serif !important;\n  font-weight: 500;\n  font-style: normal;\n}\n\n.f" + randomHash + "-modal {\n  width: 80%;\n  max-width: 400px;\n  height: 500px;\n  overflow: hidden;\n  background-repeat: no-repeat;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  box-shadow: 0px 0px 10px rgba(0,0,0,0.5);\n}\n\n@media screen and (min-width: 768px) {\n  .f" + randomHash + "-modal {\n    width: 50%;\n    max-width: 600px;\n  }\n}\n\n.f" + randomHash + "-modalImage {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n\n\n@media screen and (max-width:768px) {\n  .f" + randomHash + "-modal {\n    width: 100vw;\n  }\n}\n\n\n.f" + randomHash + "-curlyText {\n  font-family: \"proxima-nova\", sans-serif;\n  font-weight: 500;\n  font-style: normal;\n  text-transform: uppercase;\n  text-align: center;\n  letter-spacing: 2pt;\n  fill: var(--secondary);\n  text-shadow: var(--text-shadow);\n  margin-top: -150px;\n  max-width: 400px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.f" + randomHash + "-curlyText text {\n  font-size: 1.3rem;\n}\n\n\n.f" + randomHash + "-mainText {\n  font-weight: 200;\n  font-family: \"proxima-nova\", sans-serif;\n  color: var(--secondary);\n  font-size: 2.1rem;\n  text-shadow: var(--text-shadow);\n  display: inline-block;\n  text-align: center;\n  margin-top: -4.5rem;\n}\n\n\n@media screen and (min-width: 768px) {\n  .f" + randomHash + "-curlyText {\n    margin-top: -200px;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .f" + randomHash + "-curlyText {\n    margin-top: -200px;\n  }\n\n  .f" + randomHash + "-mainText {\n    font-size: 2.4rem;\n  }\n}\n\n@media screen and (min-width: 1150px) {\n  .f" + randomHash + "-mainText {\n    font-size: 2.7rem;\n  }\n}\n\n.f" + randomHash + "-cta {\n  font-family: \"proxima-nova\", sans-serif;\n  cursor: pointer;\n  background-color: var(--secondary);\n  padding: 0.75rem 3rem;\n  border-radius: 8px;\n  display: block;\n  font-size: 1.3rem;\n  color: var(--primary);\n  text-align: center;\n  text-transform: uppercase;\n  max-width: 400px;\n  margin: 0 auto;\n  text-decoration: none;\n}\n\n.f" + randomHash + "-cta:hover {\n  transition: all 0.3s;\n  filter: brightness(0.95);\n}\n\n.f" + randomHash + "-close-button {\n  border-radius: 100%;\n  background-color: var(--secondary);\n  width: 2rem;\n  height: 2rem;\n  position: absolute;\n  margin: 10px;\n  top: 0px;\n  right: 0px;\n  color: black;\n  font-size: 1.2rem;\n  font-weight: 300;\n  cursor: pointer;\n}\n\n.f" + randomHash + "-button-container {\n  flex: 1;\n  display: grid;\n  place-content: center;\n}\n\n.f" + randomHash + "-image-darken {\n  background: rgba(0,0,0,0.2);\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 2rem;\n}\n    ";
    var styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(css));
    document.head.appendChild(styles);
    setStylesLoaded(true);
  });
  if (!stylesLoaded) {
    return null;
  }
  if (!open) {
    return null;
  }
  var handleClickCallToAction = function handleClickCallToAction(e) {
    var _trigger$data, _trigger$data2;
    e.preventDefault();
    trackEvent('user_clicked_button', trigger);
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_self');
  };
  var handleCloseModal = function handleCloseModal() {
    trackEvent('user_closed_trigger', trigger);
    resetDisplayTrigger();
    setOpen(false);
  };
  if (brand === 'Stonehouse') return React__default.createElement(StonehouseModal, {
    trigger: trigger,
    handleClickCallToAction: handleClickCallToAction,
    handleCloseModal: handleCloseModal
  });
  if (brand === 'Browns') return React__default.createElement(BrownsModal, {
    trigger: trigger,
    handleClickCallToAction: handleClickCallToAction,
    handleCloseModal: handleCloseModal
  });
  return null;
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

var bannerHeight = 50;
var Banner = function Banner(_ref) {
  var _trigger$data3, _trigger$data4, _trigger$data5, _trigger$data6;
  var trigger = _ref.trigger;
  var _useCollector = useCollector(),
    resetDisplayTrigger = _useCollector.resetDisplayTrigger;
  var _useMixpanel = useMixpanel(),
    trackEvent = _useMixpanel.trackEvent;
  var _useState = React.useState(true),
    open = _useState[0],
    setOpen = _useState[1];
  var resetPad = function resetPad() {
    document.body.style.paddingTop = 'inherit';
  };
  React.useEffect(function () {
    document.body.style.paddingTop = bannerHeight + "px";
    return resetPad;
  }, []);
  var handleClickCallToAction = function handleClickCallToAction(e) {
    var _trigger$data, _trigger$data2;
    e.preventDefault();
    trackEvent('user_clicked_button', trigger);
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_self');
  };
  var handleClose = function handleClose() {
    trackEvent('user_closed_trigger', trigger);
    resetDisplayTrigger();
    setOpen(false);
    resetPad();
  };
  if (!open) return null;
  return React__default.createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: bannerHeight + "px",
      backgroundColor: '#6811B2',
      display: 'flex'
    }
  }, React__default.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      maxWidth: '1000px',
      margin: '0 auto'
    }
  }, React__default.createElement("div", null, React__default.createElement("p", {
    style: {
      margin: '10px 0 0 0',
      lineHeight: '12px',
      color: 'white',
      fontWeight: 600
    }
  }, (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.heading), ((_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.paragraph) && React__default.createElement("p", {
    style: {
      margin: '10px 0',
      color: 'white',
      fontSize: 12,
      fontWeight: 400
    }
  }, (_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.paragraph)), React__default.createElement("button", {
    onClick: handleClickCallToAction,
    style: {
      color: 'white',
      backgroundColor: '#EA3385',
      padding: '5px 10px',
      height: '30px',
      margin: '10px 0',
      borderRadius: '5px'
    }
  }, (_trigger$data6 = trigger.data) === null || _trigger$data6 === void 0 ? void 0 : _trigger$data6.buttonText)),  React__default.createElement(CloseButton, {
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
  behaviour: 'BEHAVIOUR_YOUTUBE',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerYoutube, {
      trigger: trigger
    });
  }
}, {
  id: 'inverse_v1',
  behaviour: 'BEHAVIOUR_INVERSE_FLOW',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerInverse, {
      trigger: trigger
    });
  }
}, {
  id: 'banner_v1',
  behaviour: 'BEHAVIOUR_BANNER',
  invoke: function invoke(trigger) {
    return React__default.createElement(TriggerBanner, {
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
    debug = _ref.debug,
    defaultHandlers = _ref.defaultHandlers,
    _ref$initialDelay = _ref.initialDelay,
    initialDelay = _ref$initialDelay === void 0 ? 0 : _ref$initialDelay,
    _ref$exitIntentTrigge = _ref.exitIntentTriggers,
    exitIntentTriggers = _ref$exitIntentTrigge === void 0 ? true : _ref$exitIntentTrigge,
    _ref$idleTriggers = _ref.idleTriggers,
    idleTriggers = _ref$idleTriggers === void 0 ? true : _ref$idleTriggers,
    _ref$pageLoadTriggers = _ref.pageLoadTriggers,
    pageLoadTriggers = _ref$pageLoadTriggers === void 0 ? true : _ref$pageLoadTriggers,
    config = _ref.config;
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
  return React__default.createElement(LoggingProvider, {
    debug: debug
  }, React__default.createElement(reactQuery.QueryClientProvider, {
    client: queryClient
  }, React__default.createElement(FingerprintContext.Provider, {
    value: {
      appId: appId,
      booted: booted,
      currentTrigger: {},
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
      exitIntentTriggers: exitIntentTriggers,
      config: config
    }
  }, React__default.createElement(VisitorProvider, null, React__default.createElement(MixpanelProvider, null, React__default.createElement(CollectorProvider, {
    handlers: handlers
  }, React__default.createElement(reactErrorBoundary.ErrorBoundary, {
    onError: function onError(error, info) {
      return console.error(error, info);
    },
    fallback: React__default.createElement("div", null, "An application error occurred.")
  }, children)))))));
};
var defaultFingerprintState = {
  appId: '',
  booted: false,
  consent: false,
  currentTrigger: {},
  exitIntentTriggers: false,
  idleTriggers: false,
  pageLoadTriggers: false,
  initialDelay: 0,
  registerHandler: function registerHandler() {},
  trackEvent: function trackEvent() {},
  trackPageView: function trackPageView() {},
  unregisterHandler: function unregisterHandler() {},
  config: {
    idleDelay: undefined,
    triggerCooldown: 60 * 1000,
    exitIntentDelay: 0
  }
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

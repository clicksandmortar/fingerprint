import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React__default, { useState, createElement, useMemo, useEffect, createContext, useContext, useCallback, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';
import { v4, validate, version } from 'uuid';
import mixpanel from 'mixpanel-browser';
import Cookies from 'js-cookie';
import uniqueBy from 'lodash.uniqby';
import { IdleTimerProvider } from 'react-idle-timer';
import { useExitIntent } from 'use-exit-intent';

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

const closeButtonStyles = {
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
const CloseButton = ({
  onClick,
  style
}) => {
  const buttonStyle = {
    ...closeButtonStyles,
    ...style
  };
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

const CurlyText = ({
  randomHash,
  text
}) => {
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
const BrownsModal = ({
  trigger,
  handleClickCallToAction,
  handleCloseModal
}) => {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const randomHash = useMemo(() => {
    return v4().split('-')[0];
  }, []);
  useEffect(() => {
    const css = `
      @import url("https://p.typekit.net/p.css?s=1&k=olr0pvp&ht=tk&f=25136&a=50913812&app=typekit&e=css");

@font-face {
  font-family: "proxima-nova";
  src: url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"), url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"), url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 500;
  font-stretch: normal;
}

:root {
  --primary: #b6833f;
  --secondary: white;
  --text-shadow: 1px 1px 10px rgba(0,0,0,1);
}

.tk-proxima-nova {
  font-family: "proxima-nova", sans-serif;
}

.f` + randomHash + `-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "proxima-nova", sans-serif !important;
  font-weight: 500;
  font-style: normal;
}

.f` + randomHash + `-modal {
  width: 80%;
  max-width: 400px;
  height: 500px;
  overflow: hidden;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
}

@media screen and (min-width: 768px) {
  .f` + randomHash + `-modal {
    width: 50%;
    max-width: 600px;
  }
}

.f` + randomHash + `-modalImage {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}


@media screen and (max-width:768px) {
  .f` + randomHash + `-modal {
    width: 100vw;
  }
}


.f` + randomHash + `-curlyText {
  font-family: "proxima-nova", sans-serif;
  font-weight: 500;
  font-style: normal;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 2pt;
  fill: var(--secondary);
  text-shadow: var(--text-shadow);
  margin-top: -150px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.f` + randomHash + `-curlyText text {
  font-size: 1.3rem;
}


.f` + randomHash + `-mainText {
  font-weight: 200;
  font-family: "proxima-nova", sans-serif;
  color: var(--secondary);
  font-size: 2.1rem;
  text-shadow: var(--text-shadow);
  display: inline-block;
  text-align: center;
  margin-top: -4.5rem;
}


@media screen and (min-width: 768px) {
  .f` + randomHash + `-curlyText {
    margin-top: -200px;
  }
}

@media screen and (min-width: 1024px) {
  .f` + randomHash + `-curlyText {
    margin-top: -200px;
  }

  .f` + randomHash + `-mainText {
    font-size: 2.4rem;
  }
}

@media screen and (min-width: 1150px) {
  .f` + randomHash + `-mainText {
    font-size: 2.7rem;
  }
}

.f` + randomHash + `-cta {
  font-family: "proxima-nova", sans-serif;
  cursor: pointer;
  background-color: var(--secondary);
  padding: 0.75rem 3rem;
  border-radius: 8px;
  display: block;
  font-size: 1.3rem;
  color: var(--primary);
  text-align: center;
  text-transform: uppercase;
  max-width: 400px;
  margin: 0 auto;
  text-decoration: none;
}

.f` + randomHash + `-cta:hover {
  transition: all 0.3s;
  filter: brightness(0.95);
}

.f` + randomHash + `-close-button {
  position: absolute;
  top: 0px;
  right: 0px;
}

.f` + randomHash + `-button-container {
  flex: 1;
  display: grid;
  place-content: center;
}

.f` + randomHash + `-image-darken {
  background: rgba(0,0,0,0.2);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}
    `;
    const styles = document.createElement('style');
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
      background: `url(${trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL})`,
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

const randomHash = 'f' + v4().split('-')[0];
const prependClass = className => `f${randomHash}-${className}`;
const StonehouseModal = ({
  trigger,
  handleClickCallToAction,
  handleCloseModal
}) => {
  var _trigger$data, _trigger$data2, _trigger$data3, _trigger$data4, _trigger$data5;
  const [stylesLoaded, setStylesLoaded] = useState(false);
  useEffect(() => {
    const cssToApply = `
      @font-face{
        font-family: "Gotham Bold";
        src: url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.eot?#iefix") format("embedded-opentype"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.woff") format("woff"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.woff2") format("woff2"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.ttf") format("truetype"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.svg#Gotham-Bold") format("svg");
            font-display: auto;
            font-style: normal;
            font-weight: 500;
            font-stretch: normal;
    }
     

      :root {
        --primary: white;
        --secondary: #e0aa00;
        --text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      }
      h1, h2, h3, h4, h5, h6, p, a, span {
        line-height: 1.2;
      }

      .${prependClass('overlay')} {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Gotham Bold';
        font-weight: 500;
        font-style: normal;
      }

      .${prependClass('modal')} {
        width: 80%;
        height: 500px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        box-shadow: var(--text-shadow);
      }

      .${prependClass('gotham-bold')} {
        font-family: 'Gotham Bold';
      }

      .${prependClass('text-center')} {
        text-align: center;
      }

      @media screen and (min-width: 768px) {
        .${prependClass('modal')} {
          max-width: 600px;
        }
      }

      @media screen and (max-width: 768px) {
        .${prependClass('modal')} {
          width: 95vw;
          max-width: 600px;
        }
      }

      .${prependClass('main-text')} {
        flex: 1;
        font-family: 'Gotham Bold';
        font-weight: 500;
        font-size: 3rem;
        font-style: normal;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 2pt;
        fill: var(--secondary);
        text-shadow: var(--text-shadow);
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: -10px;
      }

      .${prependClass('text-container')} {
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-shadow: var(--text-shadow);
      }

      .${prependClass('sub-text')} {
        margin: auto;
        font-weight: 600;
        font-family: 'Gotham Bold';
        font-size: 0.6rem;
        letter-spacing: 2pt;

        display: inline-block;
        text-align: center;
        text-transform: uppercase;
      }

      .${prependClass('cta')} {
        font-family: 'Gotham Bold';
        cursor: pointer;
        background-color: var(--secondary);
        padding: 0.75rem 1rem 0 1rem;
        border-radius: 2px;
        display: block;
        font-size: 1.3rem;
        color: var(--primary);
        text-align: center;
        text-transform: uppercase;
        max-width: 400px;
        margin: 0 auto;
        text-decoration: none;
        box-shadow: 0.3rem 0.3rem white;
      }

      .${prependClass('cta:hover')} {
        transition: all 0.3s;
        filter: brightness(0.95);
      }

      .${prependClass('close-button')} {
        position: absolute;
        top: 0px;
        right: 0px;
      }

      .${prependClass('image-darken')} {
        background: rgba(0, 0, 0, 0.1);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        padding: 2rem 1.5rem 1.5rem 1.5rem;
      }

      .${prependClass('text-shadow')} {
        text-shadow: var(--text-shadow);
      }

      .${prependClass('box-shadow')} {
        box-shadow: var(--text-shadow);
      }
    `;
    const styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(cssToApply));
    document.head.appendChild(styles);
    setTimeout(() => {
      setStylesLoaded(true);
    }, 500);
  }, [randomHash]);
  if (!stylesLoaded) {
    return null;
  }
  const TwoForTenThing = () => React__default.createElement("div", {
    style: {
      position: 'absolute',
      left: '10%',
      top: 250
    }
  }, React__default.createElement("div", {
    className: prependClass(`box-shadow`),
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
    className: `${prependClass('gotham-bold')} ${prependClass('text-center')} ${prependClass('text-shadow')}`
  }, "2 for"), React__default.createElement("h1", {
    className: `${prependClass('gotham-bold')} ${prependClass('text-center')} ${prependClass('text-shadow')}`,
    style: {
      marginLeft: 15,
      marginBottom: -10
    }
  }, "10*"), React__default.createElement("h6", {
    className: `${prependClass('gotham-bold')} ${prependClass('text-center')} ${prependClass('text-shadow')}`
  }, "COCKTAILS")));
  return React__default.createElement("div", {
    className: prependClass('overlay')
  }, React__default.createElement("div", {
    className: prependClass('modal'),
    style: {
      background: `url(${trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.backgroundURL})`,
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
  useEffect(() => {
    if (!debug) return;
    log('LoggingProvider: In Debug Mode');
  });
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

const useFingerprint = () => {
  return useContext(FingerprintContext);
};

function getEnvVars() {
  var _window, _window$location, _window$location$host, _window2, _window2$location, _window2$location$hos, _window3, _window3$location, _window4, _window4$location;
  let isDev = false;
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

const setCookie = (name, value, expires) => {
  return Cookies.set(name, value, {
    expires: expires,
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
  const splitCookie = id.split('|');
  return uuidValidateV4(splitCookie[0]);
};

const bootstrapVisitor = ({
  setVisitor,
  session,
  setSession
}) => {
  const visitor = {
    id: undefined
  };
  if (getCookie(cookieAccountJWT)) {
    visitor.jwt = getCookie(cookieAccountJWT);
  }
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const vid = urlParams.get('v_id');
    if (vid) {
      visitor.id = vid;
    }
  }
  if (!visitor.id && !getCookie('_cm_id') || !validVisitorId(getCookie('_cm_id'))) {
    const visitorId = v4();
    visitor.id = visitorId;
  }
  if (!visitor.id && getCookie('_cm_id')) {
    const c = getCookie('_cm_id');
    const [visitorId] = c.split('|');
    visitor.id = visitorId;
  }
  const {
    sessionId,
    endTime
  } = getSessionIdAndEndTime(getCookie('_cm_id'));
  setCookie('_cm_id', `${visitor.id}|${sessionId}|${endTime.toISOString()}`, 365);
  session.id = sessionId;
  session.endTime = endTime;
  setSession(session);
  setVisitor(visitor);
};
const getSessionIdAndEndTime = cookieData => {
  const t = new Date();
  t.setMinutes(t.getMinutes() + 30);
  let sessionId;
  const endTime = t;
  if (!cookieData || hasCookieValueExpired(cookieData)) {
    sessionId = v4();
  } else {
    const c = cookieData;
    let [, sessId] = c.split('|');
    if (sessId === 'undefined' || sessId === undefined) {
      sessId = v4();
    }
    sessionId = sessId;
  }
  return {
    sessionId,
    endTime
  };
};
const hasCookieValueExpired = cookieData => {
  if (!cookieData) return true;
  const cookieSplit = cookieData.split('|');
  if (cookieSplit.length > 1) {
    const timestampString = cookieSplit[cookieSplit.length - 1];
    const expiryTimeEpoch = Date.parse(timestampString);
    const expiryTime = new Date();
    expiryTime.setTime(expiryTimeEpoch);
    const n = new Date();
    if (n > expiryTime) {
      return true;
    }
  }
  return false;
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
        setVisitor,
        session,
        setSession
      });
    };
    boot();
    log('VisitorProvider: booted', session, visitor);
  }, [appId, booted]);
  const setVisitorData = React__default.useCallback(prop => {
    setVisitor({
      ...visitor,
      ...prop
    });
  }, [setVisitor]);
  return React__default.createElement(VisitorContext.Provider, {
    value: {
      session,
      visitor,
      setVisitor: setVisitorData
    }
  }, children);
};
const VisitorContext = createContext({
  session: {},
  visitor: {},
  setVisitor: () => console.error('VisitorContext: setVisitor not setup properly. Check your Context order.')
});
const useVisitor = () => {
  return useContext(VisitorContext);
};

const init = cfg => {
  mixpanel.init(getEnvVars().MIXPANEL_TOKEN, {
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
  useEffect(() => {
    if (!(visitor !== null && visitor !== void 0 && visitor.cohort)) {
      log('Able to register user cohort, but none provided. ');
      return;
    }
    registerUserData({
      u_cohort: visitor.cohort
    });
  }, [visitor]);
  const registerUserData = React__default.useCallback(properties => {
    log(`Mixpanel: attempting to'register/override properties: ${Object.keys(properties).join(', ')}`);
    mixpanel.people.set(properties);
  }, [log]);
  return React__default.createElement(MixpanelContext.Provider, {
    value: {
      trackEvent,
      registerUserData
    }
  }, children);
};
const MixpanelContext = createContext({
  trackEvent: () => console.error('Mixpanel: trackEvent not setup properly. Check your Context order.'),
  registerUserData: () => console.error('Mixpanel: registerUserData not setup properly. Check your Context order.')
});
const useMixpanel = () => {
  return useContext(MixpanelContext);
};

const headers = {
  'Content-Type': 'application/json'
};
const hostname = getEnvVars().FINGERPRINT_API_HOSTNAME;
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

const useExitIntentDelay = (delay = 0) => {
  const {
    log
  } = useLogging();
  const [hasDelayPassed, setHasDelayPassed] = useState(false);
  useEffect(() => {
    log(`Exit intents are suspended because of initiation delay of ${delay}ms`);
    setTimeout(() => {
      setHasDelayPassed(true);
      log('Exit intents can be issued again.');
    }, delay);
  }, [delay]);
  return {
    hasDelayPassed
  };
};

const defaultTriggerCooldown = 60 * 1000;
function useTriggerDelay(cooldownMs = defaultTriggerCooldown) {
  const [lastTriggerTimeStamp, setLastTriggerTimeStamp] = useState(null);
  const startCooldown = React__default.useCallback(() => {
    const currentTimeStamp = Number(new Date());
    setLastTriggerTimeStamp(currentTimeStamp);
  }, [setLastTriggerTimeStamp]);
  const getRemainingCooldownMs = React__default.useCallback(() => {
    if (!lastTriggerTimeStamp) return 0;
    const currentTime = Number(new Date());
    const remainingMS = lastTriggerTimeStamp + cooldownMs - currentTime;
    return remainingMS;
  }, [lastTriggerTimeStamp, cooldownMs]);
  const canNextTriggerOccur = React__default.useCallback(() => {
    return getRemainingCooldownMs() <= 0;
  }, [getRemainingCooldownMs]);
  return {
    startCooldown,
    canNextTriggerOccur,
    getRemainingCooldownMs
  };
}

const fakeTriggers = [{
  id: 'exit-trigger-id',
  invocation: 'INVOCATION_EXIT_INTENT',
  behaviour: 'BEHAVIOUR_MODAL',
  data: {
    backgroundURL: 'https://cdn.fingerprint.host/browns-three-plates-800.jpg',
    buttonText: 'Click me',
    buttonURL: 'http://www.google.com',
    heading: 'This is an EXIT_INTENT',
    paragraph: 'And so is this'
  }
}, {
  id: 'idle-trigger-id',
  invocation: 'INVOCATION_IDLE_TIME',
  behaviour: 'BEHAVIOUR_MODAL',
  data: {
    backgroundURL: 'https://cdn.fingerprint.host/browns-lamb-shank-800.jpg',
    buttonText: 'Click me',
    buttonURL: 'http://www.google.com',
    heading: 'This is an IDLE_TIME',
    paragraph: 'And so is this'
  }
}, {
  id: '7af0fc17-6508-4b5a-9003-1039fc473250',
  invocation: 'INVOCATION_PAGE_LOAD',
  behaviour: 'BEHAVIOUR_BANNER',
  data: {
    buttonText: 'Click Here',
    buttonURL: 'https://google.com',
    countdownEndTime: '2024-03-31T23:59',
    marketingText: 'Testing for {{ countdownEndTime }}'
  }
}];

const getVisitorId = () => {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  const vid = urlParams.get('v_id');
  return vid;
};
const hasVisitorIDInURL = () => {
  return getVisitorId() !== null;
};

const defaultIdleStatusDelay = 5 * 1000;
function CollectorProvider({
  children,
  handlers = []
}) {
  const {
    log,
    error
  } = useLogging();
  const {
    appId,
    booted,
    initialDelay,
    exitIntentTriggers,
    idleTriggers,
    pageLoadTriggers,
    config
  } = useFingerprint();
  const configIdleDelay = config === null || config === void 0 ? void 0 : config.idleDelay;
  const {
    visitor,
    session,
    setVisitor
  } = useVisitor();
  const {
    canNextTriggerOccur,
    startCooldown,
    getRemainingCooldownMs
  } = useTriggerDelay(config === null || config === void 0 ? void 0 : config.triggerCooldown);
  const {
    trackEvent
  } = useMixpanel();
  const {
    mutateAsync: collect
  } = useCollectorMutation();
  const {
    registerHandler,
    resetState: reRegisterExitIntent
  } = useExitIntent({
    cookie: {
      key: '_cm_exit',
      daysToExpire: 0
    }
  });
  const getIdleStatusDelay = React__default.useCallback(() => {
    const idleDelay = configIdleDelay || defaultIdleStatusDelay;
    const cooldownDelay = getRemainingCooldownMs();
    const delayAdjustedForCooldown = idleDelay + cooldownDelay;
    log(`Setting idle delay at ${delayAdjustedForCooldown}ms (cooldown ${cooldownDelay}ms + config.delay ${idleDelay}ms)`);
    return delayAdjustedForCooldown;
  }, [configIdleDelay, getRemainingCooldownMs, log]);
  const [idleTimeout, setIdleTimeout] = useState(getIdleStatusDelay());
  const [pageTriggers, setPageTriggers] = useState([]);
  const [displayTriggers, setDisplayedTriggers] = useState([]);
  const [intently, setIntently] = useState(false);
  const [foundWatchers, setFoundWatchers] = useState(new Map());
  const addPageTriggers = React__default.useCallback(triggers => {
    setPageTriggers(prev => uniqueBy([...prev, ...(triggers || [])], 'id'));
  }, [setPageTriggers]);
  useEffect(() => {
    if (intently) return;
    log('CollectorProvider: removing intently overlay');
    const runningInterval = setInterval(() => {
      const locatedIntentlyScript = document.querySelectorAll('div[id^=smc-v5-overlay-]');
      Array.prototype.forEach.call(locatedIntentlyScript, node => {
        node.parentNode.removeChild(node);
        log('CollectorProvider: successfully removed intently overlay');
        clearInterval(runningInterval);
      });
    }, 100);
    return () => {
      clearInterval(runningInterval);
    };
  }, [intently, log]);
  const getHandlerForTrigger = React__default.useCallback(_trigger => {
    const potentialHandler = handlers === null || handlers === void 0 ? void 0 : handlers.find(handler => handler.behaviour === _trigger.behaviour);
    if (!potentialHandler) return null;
    return potentialHandler;
  }, [handlers]);
  const removeActiveTrigger = useCallback(id => {
    log(`CollectorProvider: removing id:${id} from displayTriggers`);
    const refreshedTriggers = displayTriggers.filter(triggerId => triggerId !== id);
    setDisplayedTriggers(refreshedTriggers);
  }, [displayTriggers, log]);
  const TriggerComponent = React__default.useCallback(() => {
    if (!displayTriggers) return null;
    const activeTriggers = pageTriggers.filter(trigger => displayTriggers.includes(trigger.id));
    if (!activeTriggers) {
      error(`No trigger found for displayTriggers`, displayTriggers);
      return null;
    }
    log('CollectorProvider: available handlers include: ', handlers);
    log('CollectorProvider: activeTriggers to match are: ', activeTriggers);
    log('CollectorProvider: attempting to show trigger', activeTriggers);
    return activeTriggers.map(trigger => {
      var _handler$invoke;
      const handler = getHandlerForTrigger(trigger);
      if (!handler) {
        log('No handler found for trigger', trigger);
        return null;
      }
      if (!handler.invoke) {
        log('No invoke method found for handler', handler);
        return null;
      }
      const potentialComponent = (_handler$invoke = handler.invoke) === null || _handler$invoke === void 0 ? void 0 : _handler$invoke.call(handler, trigger);
      if (potentialComponent && React__default.isValidElement(potentialComponent)) {
        log('CollectorProvider: Potential component for trigger is valid. Mounting');
        return potentialComponent;
      }
      log('CollectorProvider: Potential component for trigger invalid. Running as regular func.');
      return null;
    });
  }, [displayTriggers, pageTriggers, log, handlers, error, getHandlerForTrigger]);
  const setDisplayedTriggerByInvocation = React__default.useCallback(invocation => {
    const invokableTrigger = pageTriggers.find(trigger => trigger.invocation === invocation);
    if (invokableTrigger) setDisplayedTriggers(ts => [...ts, invokableTrigger.id]);
  }, [pageTriggers, setDisplayedTriggers]);
  const fireIdleTrigger = useCallback(() => {
    if (!idleTriggers) return;
    log('CollectorProvider: attempting to fire idle time trigger');
    setDisplayedTriggerByInvocation('INVOCATION_IDLE_TIME');
    startCooldown();
  }, [idleTriggers, log, setDisplayedTriggerByInvocation, startCooldown]);
  const {
    hasDelayPassed
  } = useExitIntentDelay(config === null || config === void 0 ? void 0 : config.exitIntentDelay);
  const fireExitTrigger = React__default.useCallback(() => {
    if (displayTriggers !== null && displayTriggers !== void 0 && displayTriggers.length) return;
    if (!hasDelayPassed) {
      log(`Unable to launch exit intent, because of the exit intent delay hasn't passed yet.`);
      log('Re-registering handler');
      reRegisterExitIntent();
      return;
    }
    if (!canNextTriggerOccur()) {
      log(`Tried to launch EXIT trigger, but can't because of cooldown, ${getRemainingCooldownMs()}ms remaining. 
        I will attempt again when the same signal occurs after this passes.`);
      log('Re-registering handler');
      reRegisterExitIntent();
      return;
    }
    log('CollectorProvider: attempting to fire exit trigger');
    setDisplayedTriggerByInvocation('INVOCATION_EXIT_INTENT');
    startCooldown();
  }, [displayTriggers === null || displayTriggers === void 0 ? void 0 : displayTriggers.length, hasDelayPassed, canNextTriggerOccur, log, setDisplayedTriggerByInvocation, startCooldown, reRegisterExitIntent, getRemainingCooldownMs]);
  useEffect(() => {
    if (!exitIntentTriggers) return;
    log('CollectorProvider: attempting to register exit trigger');
    registerHandler({
      id: 'clientTrigger',
      handler: fireExitTrigger
    });
  }, [exitIntentTriggers, fireExitTrigger, log, registerHandler]);
  const fireOnLoadTriggers = useCallback(() => {
    if (!pageLoadTriggers) return;
    if (!(pageTriggers !== null && pageTriggers !== void 0 && pageTriggers.length)) return;
    log('CollectorProvider: attempting to fire on-page-load trigger');
    setDisplayedTriggerByInvocation('INVOCATION_PAGE_LOAD');
  }, [pageLoadTriggers, log, setDisplayedTriggerByInvocation]);
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
      if (hasVisitorIDInURL()) {
        trackEvent('abandoned_journey_landing', {
          from_email: true
        });
      }
      const params = new URLSearchParams(window.location.search).toString().split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=');
        if (!key) return acc;
        acc[key] = value;
        return acc;
      }, {});
      const hash = window.location.hash.substring(3);
      const hashParams = hash.split('&').reduce((result, item) => {
        const parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
      }, {});
      if (hashParams.id_token) {
        log('CollectorProvider: user logged in event fired');
        trackEvent('user_logged_in', {});
        collect({
          appId,
          visitor,
          sessionId: session === null || session === void 0 ? void 0 : session.id,
          account: {
            token: hashParams.id_token
          }
        }).then(async response => {
          const payload = await response.json();
          log('Sent login collector data, retrieved:', payload);
        }).catch(err => {
          error('failed to store collected data', err);
        });
      }
      collect({
        appId,
        visitor,
        sessionId: session === null || session === void 0 ? void 0 : session.id,
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
        if (response.status === 204) {
          setIntently(true);
          return;
        }
        const payload = await response.json();
        log('Sent collector data, retrieved:', payload);
        setIdleTimeout(getIdleStatusDelay());
        addPageTriggers(fakeTriggers);
        const cohort = payload.intently ? 'intently' : 'fingerprint';
        setVisitor({
          cohort
        });
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
  }, [appId, booted, collect, error, setVisitor, handlers, initialDelay, getIdleStatusDelay, setIdleTimeout, log, trackEvent, visitor, session === null || session === void 0 ? void 0 : session.id, fireOnLoadTriggers, addPageTriggers]);
  const registerWatcher = React__default.useCallback((configuredSelector, configuredSearch) => {
    const intervalId = setInterval(() => {
      const inputs = document.querySelectorAll(configuredSelector);
      let found = false;
      inputs.forEach(element => {
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
            appId,
            visitor,
            sessionId: session === null || session === void 0 ? void 0 : session.id,
            elements: [{
              path: window.location.pathname,
              selector: configuredSelector
            }]
          }).then(async response => {
            const payload = await response.json();
            log('Sent collector data, retrieved:', payload);
            setIdleTimeout(getIdleStatusDelay());
            addPageTriggers(payload === null || payload === void 0 ? void 0 : payload.pageTriggers);
          }).catch(err => {
            error('failed to store collected data', err);
          });
          clearInterval(intervalId);
        }
      });
    }, 500);
    return intervalId;
  }, [appId, collect, error, foundWatchers, getIdleStatusDelay, log, session, setIdleTimeout, trackEvent, visitor]);
  useEffect(() => {
    if (!visitor.id) return;
    const intervalIds = [registerWatcher('.stage-5', '')];
    return () => {
      intervalIds.forEach(intervalId => clearInterval(intervalId));
    };
  }, [registerWatcher, visitor]);
  const setTrigger = React__default.useCallback(trigger => {
    log('CollectorProvider: manually setting trigger', trigger);
    addPageTriggers([trigger]);
    setDisplayedTriggerByInvocation(trigger.invocation);
  }, [log, setDisplayedTriggerByInvocation, addPageTriggers]);
  const collectorContextVal = React__default.useMemo(() => ({
    addPageTriggers,
    removeActiveTrigger,
    setTrigger,
    trackEvent
  }), [addPageTriggers, removeActiveTrigger, setTrigger, trackEvent]);
  useEffect(() => {
    fireOnLoadTriggers();
  }, [fireOnLoadTriggers]);
  return React__default.createElement(IdleTimerProvider, {
    timeout: idleTimeout,
    onPresenceChange: presence => {
      log('presence changed', presence);
    },
    onIdle: fireIdleTrigger
  }, React__default.createElement(CollectorContext.Provider, {
    value: collectorContextVal
  }, children, React__default.createElement(TriggerComponent, null)));
}
const CollectorContext = createContext({
  addPageTriggers: () => {},
  removeActiveTrigger: () => {},
  setTrigger: () => {},
  trackEvent: () => {}
});

const useCollector = () => {
  return useContext(CollectorContext);
};

const getBrand = () => {
  if (typeof window === 'undefined') return null;
  if (window.location.host.startsWith('localhost')) return 'Stonehouse';
  if (window.location.host.includes('stonehouserestaurants.co.uk')) return 'Stonehouse';
  if (window.location.host.includes('browns-restaurants.co.uk')) return 'Browns';
  return null;
};

const Modal = ({
  trigger
}) => {
  const {
    log,
    error
  } = useLogging();
  const {
    removeActiveTrigger
  } = useCollector();
  const {
    trackEvent
  } = useMixpanel();
  const {
    appId
  } = useFingerprint();
  const {
    visitor
  } = useVisitor();
  const [open, setOpen] = useState(true);
  const [hasFired, setHasFired] = useState(false);
  const brand = React__default.useMemo(() => {
    return getBrand();
  }, []);
  useEffect(() => {
    if (!open) return;
    if (hasFired) return;
    try {
      request.put(`${hostname}/triggers/${appId}/${visitor.id}/seen`, {
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
      brand
    });
    setHasFired(true);
  }, [open]);
  if (!open) {
    return null;
  }
  const handleClickCallToAction = e => {
    var _trigger$data, _trigger$data2;
    e.preventDefault();
    trackEvent('user_clicked_button', trigger);
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_self');
  };
  const handleCloseModal = () => {
    trackEvent('user_closed_trigger', trigger);
    removeActiveTrigger(trigger.id);
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

const resetPad = () => {
  document.body.style.paddingTop = 'inherit';
};
const Banner = ({
  trigger
}) => {
  var _trigger$data3, _trigger$data4;
  const container = useRef(null);
  const {
    removeActiveTrigger
  } = useCollector();
  const {
    trackEvent
  } = useMixpanel();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    var _container$current;
    const bannerHeight = (_container$current = container.current) === null || _container$current === void 0 ? void 0 : _container$current.clientHeight;
    document.body.style.paddingTop = `${bannerHeight}px`;
    return resetPad;
  }, [container]);
  const handleClickCallToAction = e => {
    var _trigger$data, _trigger$data2;
    e.preventDefault();
    trackEvent('user_clicked_button', trigger);
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_blank');
    setOpen(false);
    resetPad();
  };
  const handleClose = () => {
    trackEvent('user_closed_trigger', trigger);
    removeActiveTrigger(trigger.id);
    setOpen(false);
    resetPad();
  };
  if (!open) return null;
  return React__default.createElement("div", {
    ref: container,
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#6811B2',
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
  }, (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.marketingText), React__default.createElement("button", {
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
  }, (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.buttonText)),  React__default.createElement(CloseButton, {
    onClick: handleClose,
    style: {
      background: 'transparent',
      color: 'white'
    }
  }));
};
const TriggerBanner = ({
  trigger
}) => {
  return ReactDOM.createPortal(React__default.createElement(Banner, {
    trigger: trigger
  }), document.body);
};

const clientHandlers = [{
  id: 'modal_v1',
  behaviour: 'BEHAVIOUR_MODAL',
  invoke: trigger => React__default.createElement(TriggerModal, {
    trigger: trigger
  })
}, {
  id: 'youtube_v1',
  behaviour: 'BEHAVIOUR_YOUTUBE',
  invoke: trigger => React__default.createElement(TriggerYoutube, {
    trigger: trigger
  })
}, {
  id: 'inverse_v1',
  behaviour: 'BEHAVIOUR_INVERSE_FLOW',
  invoke: trigger => React__default.createElement(TriggerInverse, {
    trigger: trigger
  })
}, {
  id: 'banner_v1',
  behaviour: 'BEHAVIOUR_BANNER',
  invoke: trigger => React__default.createElement(TriggerBanner, {
    trigger: trigger
  })
}];

const queryClient = new QueryClient();
const cookieAccountJWT = 'b2c_token';
const useConsentCheck = (consent, consentCallback) => {
  const [consentGiven, setConsentGiven] = useState(consent);
  const {
    log
  } = useLogging();
  useEffect(() => {
    if (consent) {
      setConsentGiven(consent);
      return;
    }
    log('Fingerprint Widget Consent: ', consent);
    if (!consentCallback) return;
    const consentGivenViaCallback = consentCallback();
    const interval = setInterval(() => {
      setConsentGiven(consent);
    }, 1000);
    if (consentGivenViaCallback) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [consentCallback, consent]);
  return consentGiven;
};
const FingerprintProvider = ({
  appId,
  children,
  consent: _consent = false,
  consentCallback,
  debug,
  defaultHandlers,
  initialDelay: _initialDelay = 0,
  exitIntentTriggers: _exitIntentTriggers = true,
  idleTriggers: _idleTriggers = true,
  pageLoadTriggers: _pageLoadTriggers = true,
  config
}) => {
  const [booted, setBooted] = useState(false);
  const [handlers, setHandlers] = useState(defaultHandlers || clientHandlers);
  const consentGiven = useConsentCheck(_consent, consentCallback);
  const addAnotherHandler = React__default.useCallback(trigger => {
    setHandlers(handlers => {
      return [...handlers, trigger];
    });
  }, [setHandlers]);
  useEffect(() => {
    if (!appId) throw new Error('C&M Fingerprint: appId is required');
    if (booted) return;
    if (!consentGiven) return;
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
  return React__default.createElement(LoggingProvider, {
    debug: debug
  }, React__default.createElement(QueryClientProvider, {
    client: queryClient
  }, React__default.createElement(FingerprintContext.Provider, {
    value: {
      appId,
      booted,
      currentTrigger: null,
      registerHandler: addAnotherHandler,
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
      pageLoadTriggers: _pageLoadTriggers,
      exitIntentTriggers: _exitIntentTriggers,
      config
    }
  }, React__default.createElement(VisitorProvider, null, React__default.createElement(MixpanelProvider, null, React__default.createElement(CollectorProvider, {
    handlers: handlers
  }, React__default.createElement(ErrorBoundary, {
    onError: (error, info) => console.error(error, info),
    fallback: React__default.createElement("div", null, "An application error occurred.")
  }, children)))))));
};
const defaultFingerprintState = {
  appId: '',
  booted: false,
  consent: false,
  currentTrigger: null,
  exitIntentTriggers: false,
  idleTriggers: false,
  pageLoadTriggers: false,
  initialDelay: 0,
  registerHandler: () => {},
  trackEvent: () => {},
  trackPageView: () => {},
  unregisterHandler: () => {},
  config: {
    idleDelay: undefined,
    triggerCooldown: 60 * 1000,
    exitIntentDelay: 0
  }
};
const FingerprintContext = createContext({
  ...defaultFingerprintState
});

export { CollectorContext, CollectorProvider, FingerprintContext, FingerprintProvider, onCookieChanged, useCollector, useFingerprint };
//# sourceMappingURL=index.modern.js.map

import {
  QueryClient,
  QueryClientProvider,
  useMutation
} from '@tanstack/react-query'
import Cookies from 'js-cookie'
import uniqueBy from 'lodash.uniqby'
import mixpanel from 'mixpanel-browser'
import React__default, {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { isMobile } from 'react-device-detect'
import ReactDOM from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'
import { IdleTimerProvider } from 'react-idle-timer'
import { useExitIntent } from 'use-exit-intent'
import { v4, validate, version } from 'uuid'

const baseUrl = 'https://bookings-bff.starship-staging.com'
const makeFullUrl = (resource, params = {}) => {
  if (resource.startsWith('/')) {
    resource = resource.substring(1)
  }
  const fullUri = `${baseUrl}/${resource}`
  if (Object.keys(params).length === 0) {
    return fullUri
  }
  return `${fullUri}?${new URLSearchParams(params).toString()}`
}
const Button = ({
  children,
  className,
  onClick,
  disabled,
  colour: _colour = 'primary'
}) => {
  let builtButtonClasses =
    `btn step-button bg-${_colour} border-${_colour} text-white hover:bg-${_colour}/80 disabled:text-${_colour}/50 disabled:border-${_colour}/50` +
    (className ? ' ' + className : '')
  if (disabled) {
    builtButtonClasses += ' disabled'
  }
  return createElement(
    'button',
    {
      disabled: disabled,
      className: builtButtonClasses,
      onClick: onClick
    },
    children
  )
}
const Voucher = ({ details }) => {
  return createElement(
    'div',
    null,
    createElement('h3', null, 'Terms of Voucher'),
    createElement(
      'p',
      {
        className: 'text-sm'
      },
      details.termsAndConditions
    )
  )
}
const TriggerInverse = ({}) => {
  const landingPage = {}
  const form = {}
  const location = {}
  const [open, setOpen] = useState(true)
  if (!open) {
    return null
  }
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()
  const initialState = {
    busy: false,
    complete: false,
    voucher: null,
    error: null,
    responseStatusCode: 0
  }
  const [state, setState] = useState(initialState)
  async function submitVoucher(data) {
    const reqData = {
      ...data,
      bookingLink: `${
        location === null || location === void 0 ? void 0 : location.origin
      }/${
        landingPage === null || landingPage === void 0
          ? void 0
          : landingPage.slug
      }`
    }
    const response = await fetch(
      makeFullUrl(
        `campaigns/${
          form === null || form === void 0 ? void 0 : form.campaign
        }/voucher?locationID=${
          landingPage === null || landingPage === void 0
            ? void 0
            : landingPage.identifier
        }`
      ),
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(reqData)
      }
    )
    response.json().then((responseData) => {
      if (response.ok) {
        setState({
          busy: false,
          complete: true,
          voucher: responseData.voucher
        })
      } else {
        setState({
          busy: false,
          error: responseData,
          responseStatusCode: response.status
        })
      }
    })
  }
  async function onSubmit(data) {
    setState({
      busy: true
    })
    try {
      if (form.campaign !== '') {
        submitVoucher(data).then(() => {
          const eventData = {
            item_name:
              landingPage === null || landingPage === void 0
                ? void 0
                : landingPage.name,
            affiliation: 'Booking Flow'
          }
          console.log(eventData)
        })
      }
    } catch (e) {}
  }
  if (state.complete === true) {
    return createElement(
      'div',
      {
        className: 'container'
      },
      createElement('h2', null, 'Voucher Sent!'),
      createElement(
        'p',
        {
          className: 'text-md'
        },
        "Good news! We've sent your voucher to the email provided!"
      ),
      state.voucher &&
        createElement(
          'div',
          {
            className: 'col-12 mt-3'
          },
          createElement(Voucher, {
            details: state.voucher
          })
        )
    )
  }
  if (state.responseStatusCode === 409) {
    return createElement(
      'div',
      {
        className: 'container'
      },
      createElement(
        'h2',
        {
          className: 'mt-3'
        },
        'Uh-oh!'
      ),
      createElement(
        'p',
        null,
        "It seems that you already received this voucher. Please get in touch if this doesn't seem right:\u00A0",
        createElement(
          'a',
          {
            href: '/help',
            className: 'underline font-serif tracking-wide',
            onClick: () => setOpen(false)
          },
          'contact us'
        )
      )
    )
  }
  return createElement(
    'div',
    {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999
      }
    },
    createElement(
      'main',
      {
        className: 'flex-grow flex flex-col justify-center container relative'
      },
      createElement(
        'div',
        {
          className: 'w-full'
        },
        createElement(
          'div',
          {
            className: 'cms-content text-center md:text-left'
          },
          createElement('h2', null, 'Get Your Voucher'),
          createElement(
            'p',
            null,
            'To receive your voucher, we just need a few details from you.'
          ),
          createElement(
            'h3',
            {
              className: `bar-title border-l-4 border-solid border-${
                landingPage === null || landingPage === void 0
                  ? void 0
                  : landingPage.colour
              }`
            },
            'Contact Info'
          ),
          createElement(
            'form',
            {
              onSubmit: handleSubmit(onSubmit)
            },
            createElement(
              'div',
              {
                className: 'grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2'
              },
              createElement(
                'div',
                null,
                createElement(
                  'label',
                  {
                    htmlFor: 'first_name'
                  },
                  'First Name*'
                ),
                createElement(
                  'input',
                  Object.assign(
                    {},
                    register('firstName', {
                      required: true,
                      minLength: 2,
                      maxLength: 30,
                      validate: (value) => value.trim().length >= 2
                    }),
                    {
                      type: 'text',
                      className: 'form-input',
                      id: 'firstName'
                    }
                  )
                )
              ),
              createElement(
                'div',
                null,
                createElement(
                  'label',
                  {
                    htmlFor: 'last_name'
                  },
                  'Last Name*'
                ),
                createElement(
                  'input',
                  Object.assign(
                    {},
                    register('lastName', {
                      required: true,
                      minLength: 2,
                      maxLength: 30,
                      validate: (value) => value.trim().length >= 2
                    }),
                    {
                      type: 'text',
                      className: 'form-input',
                      id: 'lastName'
                    }
                  )
                )
              ),
              createElement(
                'div',
                null,
                createElement(
                  'label',
                  {
                    htmlFor: 'email'
                  },
                  'Email*'
                ),
                createElement(
                  'input',
                  Object.assign(
                    {},
                    register('emailAddress', {
                      required: true
                    }),
                    {
                      type: 'email',
                      className: 'form-input',
                      id: 'email'
                    }
                  )
                )
              )
            ),
            createElement(
              'div',
              null,
              createElement('p', null, '* Required Field')
            ),
            createElement(
              'div',
              {
                className:
                  'flex gap-x-6 gap-y-2 items-center flex-wrap justify-center lg:justify-start'
              },
              createElement(
                'div',
                {
                  className: 'form-check'
                },
                createElement(
                  'input',
                  Object.assign(
                    {
                      type: 'checkbox'
                    },
                    register('terms', {
                      required: true
                    }),
                    {
                      className: 'form-check-input',
                      id: 'terms'
                    }
                  )
                ),
                ' ',
                createElement(
                  'label',
                  {
                    htmlFor: 'terms',
                    className: 'form-check-label'
                  },
                  'I confirm that I have read & agreed with the',
                  ' ',
                  createElement(
                    'a',
                    {
                      href:
                        landingPage === null || landingPage === void 0
                          ? void 0
                          : landingPage.privacyPolicy,
                      target: '_blank',
                      rel: 'noreferrer'
                    },
                    'Privacy Policy'
                  ),
                  '*'
                )
              ),
              createElement(
                Button,
                {
                  className: 'btn mt-2 md:mt-0',
                  type: 'submit',
                  colour:
                    landingPage === null || landingPage === void 0
                      ? void 0
                      : landingPage.colour,
                  disabled: state.busy || isSubmitting
                },
                isSubmitting || state.busy
                  ? 'Sending Voucher...'
                  : 'Get My Voucher'
              )
            ),
            state.error &&
              state.responseStatusCode !== 409 &&
              createElement(
                'div',
                {
                  className: `alert mt-5 bg-${
                    landingPage === null || landingPage === void 0
                      ? void 0
                      : landingPage.colour
                  }/20`
                },
                'There was a problem sending your voucher. Please check your details and try again.'
              )
          )
        )
      )
    )
  )
}

const CurlyText = ({ randomHash, text }) => {
  return React__default.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      xmlnsXlink: 'http://www.w3.org/1999/xlink',
      version: '1.1',
      viewBox: '0 0 500 500',
      className: 'f' + randomHash + '-curlyText'
    },
    React__default.createElement(
      'defs',
      null,
      React__default.createElement('path', {
        id: 'textPath',
        d: 'M 0 500 A 175,100 0 0 1 500,500'
      })
    ),
    React__default.createElement(
      'text',
      {
        x: '0',
        y: '0',
        textAnchor: 'middle'
      },
      React__default.createElement(
        'textPath',
        {
          xlinkHref: '#textPath',
          fill: 'white',
          startOffset: '50%'
        },
        text
      )
    )
  )
}
const BrownsModal = ({
  trigger,
  handleClickCallToAction,
  handleCloseModal
}) => {
  var _trigger$data,
    _trigger$data2,
    _trigger$data3,
    _trigger$data4,
    _trigger$data5
  const [stylesLoaded, setStylesLoaded] = useState(false)
  const randomHash = useMemo(() => {
    return v4().split('-')[0]
  }, [])
  useEffect(() => {
    const css =
      `
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

.f` +
      randomHash +
      `-overlay {
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

.f` +
      randomHash +
      `-modal {
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
  .f` +
      randomHash +
      `-modal {
    width: 50%;
    max-width: 600px;
  }
}

.f` +
      randomHash +
      `-modalImage {
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
  .f` +
      randomHash +
      `-modal {
    width: 100vw;
  }
}


.f` +
      randomHash +
      `-curlyText {
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

.f` +
      randomHash +
      `-curlyText text {
  font-size: 1.3rem;
}


.f` +
      randomHash +
      `-mainText {
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
  .f` +
      randomHash +
      `-curlyText {
    margin-top: -200px;
  }
}

@media screen and (min-width: 1024px) {
  .f` +
      randomHash +
      `-curlyText {
    margin-top: -200px;
  }

  .f` +
      randomHash +
      `-mainText {
    font-size: 2.4rem;
  }
}

@media screen and (min-width: 1150px) {
  .f` +
      randomHash +
      `-mainText {
    font-size: 2.7rem;
  }
}

.f` +
      randomHash +
      `-cta {
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

.f` +
      randomHash +
      `-cta:hover {
  transition: all 0.3s;
  filter: brightness(0.95);
}

.f` +
      randomHash +
      `-close-button {
  border-radius: 100%;
  background-color: var(--secondary);
  width: 2rem;
  height: 2rem;
  position: absolute;
  margin: 10px;
  top: 0px;
  right: 0px;
  color: black;
  font-size: 1.2rem;
  font-weight: 300;
  cursor: pointer;
}

.f` +
      randomHash +
      `-button-container {
  flex: 1;
  display: grid;
  place-content: center;
}

.f` +
      randomHash +
      `-image-darken {
  background: rgba(0,0,0,0.2);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}
    `
    const styles = document.createElement('style')
    styles.type = 'text/css'
    styles.appendChild(document.createTextNode(css))
    document.head.appendChild(styles)
    setStylesLoaded(true)
  })
  if (!stylesLoaded) {
    return null
  }
  return React__default.createElement(
    'div',
    {
      className: 'f' + randomHash + '-overlay'
    },
    React__default.createElement(
      'div',
      {
        className: 'f' + randomHash + '-modal',
        style: {
          background: `url(${
            trigger === null || trigger === void 0
              ? void 0
              : (_trigger$data = trigger.data) === null ||
                _trigger$data === void 0
              ? void 0
              : _trigger$data.backgroundURL
          })`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative',
          height: 500
        }
      },
      React__default.createElement(
        'div',
        {
          className: 'f' + randomHash + '-image-darken'
        },
        React__default.createElement(
          'button',
          {
            className: 'f' + randomHash + '-close-button',
            onClick: handleCloseModal
          },
          React__default.createElement(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              width: '16',
              height: '16',
              viewBox: '0 0 16 16'
            },
            React__default.createElement('path', {
              fill: '#000',
              fillRule: 'evenodd',
              d: 'M8.707 8l3.647-3.646a.5.5 0 0 0-.708-.708L8 7.293 4.354 3.646a.5.5 0 1 0-.708.708L7.293 8l-3.647 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8z'
            })
          )
        ),
        React__default.createElement(CurlyText, {
          text:
            trigger === null || trigger === void 0
              ? void 0
              : (_trigger$data2 = trigger.data) === null ||
                _trigger$data2 === void 0
              ? void 0
              : _trigger$data2.heading,
          randomHash: randomHash
        }),
        React__default.createElement('div', {
          style: {
            flex: 1
          },
          className: 'f' + randomHash + '--spacer'
        }),
        React__default.createElement(
          'div',
          {
            style: {
              flex: 1,
              marginTop: -150,
              textTransform: 'uppercase',
              textAlign: 'center',
              letterSpacing: '2pt'
            }
          },
          React__default.createElement(
            'span',
            {
              className: 'f' + randomHash + '-mainText'
            },
            trigger === null || trigger === void 0
              ? void 0
              : (_trigger$data3 = trigger.data) === null ||
                _trigger$data3 === void 0
              ? void 0
              : _trigger$data3.paragraph
          )
        ),
        React__default.createElement(
          'div',
          {
            className: 'f' + randomHash + '-buttonContainer'
          },
          React__default.createElement(
            'a',
            {
              href:
                trigger === null || trigger === void 0
                  ? void 0
                  : (_trigger$data4 = trigger.data) === null ||
                    _trigger$data4 === void 0
                  ? void 0
                  : _trigger$data4.buttonURL,
              className: 'f' + randomHash + '-cta',
              onClick: handleClickCallToAction
            },
            trigger === null || trigger === void 0
              ? void 0
              : (_trigger$data5 = trigger.data) === null ||
                _trigger$data5 === void 0
              ? void 0
              : _trigger$data5.buttonText
          )
        )
      )
    )
  )
}

const randomHash = 'f' + v4().split('-')[0]
const prependClass = (className) => `f${randomHash}-${className}`
const StonehouseModal = ({
  trigger,
  handleClickCallToAction,
  handleCloseModal
}) => {
  var _trigger$data,
    _trigger$data2,
    _trigger$data3,
    _trigger$data4,
    _trigger$data5
  const [stylesLoaded, setStylesLoaded] = useState(false)
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
        border-radius: 100%;
        background-color: white;
        width: 2rem;
        border: none;
        height: 2rem;
        position: absolute;
        margin: 10px;
        top: 0px;
        right: 0px;
        color: black;
        font-size: 1.2rem;
        font-weight: 300;
        cursor: pointer;
        display: grid;
        place-content: center;
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
    `
    const styles = document.createElement('style')
    styles.type = 'text/css'
    styles.appendChild(document.createTextNode(cssToApply))
    document.head.appendChild(styles)
    setTimeout(() => {
      setStylesLoaded(true)
    }, 500)
  }, [randomHash])
  if (!stylesLoaded) {
    return null
  }
  const TwoForTenThing = () =>
    React__default.createElement(
      'div',
      {
        style: {
          position: 'absolute',
          left: '10%',
          top: 250
        }
      },
      React__default.createElement(
        'div',
        {
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
        },
        React__default.createElement(
          'h4',
          {
            className: `${prependClass('gotham-bold')} ${prependClass(
              'text-center'
            )} ${prependClass('text-shadow')}`
          },
          '2 for'
        ),
        React__default.createElement(
          'h1',
          {
            className: `${prependClass('gotham-bold')} ${prependClass(
              'text-center'
            )} ${prependClass('text-shadow')}`,
            style: {
              marginLeft: 15,
              marginBottom: -10
            }
          },
          '10*'
        ),
        React__default.createElement(
          'h6',
          {
            className: `${prependClass('gotham-bold')} ${prependClass(
              'text-center'
            )} ${prependClass('text-shadow')}`
          },
          'COCKTAILS'
        )
      )
    )
  return React__default.createElement(
    'div',
    {
      className: prependClass('overlay')
    },
    React__default.createElement(
      'div',
      {
        className: prependClass('modal'),
        style: {
          background: `url(${
            trigger === null || trigger === void 0
              ? void 0
              : (_trigger$data = trigger.data) === null ||
                _trigger$data === void 0
              ? void 0
              : _trigger$data.backgroundURL
          })`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative'
        }
      },
      React__default.createElement(
        'div',
        {
          className: prependClass('image-darken')
        },
        React__default.createElement(
          'button',
          {
            className: prependClass('close-button'),
            onClick: handleCloseModal
          },
          React__default.createElement(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              width: '20',
              height: '20',
              viewBox: '0 0 16 16'
            },
            React__default.createElement('path', {
              fill: '#000',
              fillRule: 'evenodd',
              d: 'M8.707 8l3.647-3.646a.5.5 0 0 0-.708-.708L8 7.293 4.354 3.646a.5.5 0 1 0-.708.708L7.293 8l-3.647 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8z'
            })
          )
        ),
        React__default.createElement(
          'div',
          {
            className: prependClass('text-container')
          },
          React__default.createElement(
            'h1',
            {
              className: prependClass('main-text')
            },
            trigger === null || trigger === void 0
              ? void 0
              : (_trigger$data2 = trigger.data) === null ||
                _trigger$data2 === void 0
              ? void 0
              : _trigger$data2.heading
          ),
          React__default.createElement(
            'span',
            {
              className: prependClass('sub-text')
            },
            trigger === null || trigger === void 0
              ? void 0
              : (_trigger$data3 = trigger.data) === null ||
                _trigger$data3 === void 0
              ? void 0
              : _trigger$data3.paragraph
          )
        ),
        React__default.createElement(
          'div',
          null,
          React__default.createElement(TwoForTenThing, null)
        ),
        React__default.createElement(
          'div',
          {
            style: {
              display: 'flex',
              justifyContent: 'flex-end'
            }
          },
          React__default.createElement(
            'div',
            null,
            React__default.createElement(
              'a',
              {
                href:
                  trigger === null || trigger === void 0
                    ? void 0
                    : (_trigger$data4 = trigger.data) === null ||
                      _trigger$data4 === void 0
                    ? void 0
                    : _trigger$data4.buttonURL,
                className: prependClass('cta'),
                onClick: handleClickCallToAction
              },
              trigger === null || trigger === void 0
                ? void 0
                : (_trigger$data5 = trigger.data) === null ||
                  _trigger$data5 === void 0
                ? void 0
                : _trigger$data5.buttonText
            )
          )
        )
      )
    )
  )
}

const LoggingProvider = ({ debug, children }) => {
  const log = (...message) => {
    if (debug) {
      console.log(...message)
    }
  }
  const warn = (...message) => {
    if (debug) {
      console.warn(...message)
    }
  }
  const error = (...message) => {
    if (debug) {
      console.error(...message)
    }
  }
  const info = (...message) => {
    if (debug) {
      console.info(...message)
    }
  }
  useEffect(() => {
    if (!debug) return
    log('LoggingProvider: In Debug Mode')
  })
  return React__default.createElement(
    LoggingContext.Provider,
    {
      value: {
        log,
        warn,
        error,
        info
      }
    },
    children
  )
}
const LoggingContext = createContext({
  log: () => {},
  warn: () => {},
  error: () => {},
  info: () => {}
})
const useLogging = () => {
  return useContext(LoggingContext)
}

const setCookie = (name, value, expires) => {
  return Cookies.set(name, value, {
    expires: expires,
    sameSite: 'strict'
  })
}
const getCookie = (name) => {
  return Cookies.get(name)
}
const onCookieChanged = (callback, interval = 1000) => {
  let lastCookie = document.cookie
  setInterval(() => {
    const cookie = document.cookie
    if (cookie !== lastCookie) {
      try {
        callback({
          oldValue: lastCookie,
          newValue: cookie
        })
      } finally {
        lastCookie = cookie
      }
    }
  }, interval)
}

const bootstrapSession = ({ appId, setSession }) => {
  const session = {
    firstVisit: undefined
  }
  const t = new Date()
  t.setMinutes(t.getMinutes() + 30)
  if (
    !getCookie('_cm_session') ||
    hasCookieValueExpired(getCookie('_cm_session'))
  ) {
    session.id = v4()
  } else {
    const c = getCookie('_cm_session')
    const [sessionId] = c.split('|')
    session.id = sessionId
  }
  session.endTime = t
  setCookie(
    '_cm_session',
    `${session.id}|${session.endTime.toISOString()}`,
    undefined
  )
  if (!getCookie('_cm') || getCookie('_cm') !== appId) {
    setCookie('_cm', appId, 365)
    setSession(session)
    return
  }
  if (getCookie('_cm') && getCookie('_cm') === appId) {
    session.firstVisit = false
    setSession(session)
  }
}
const hasCookieValueExpired = (cookieData) => {
  if (!cookieData) return true
  const [, timestampString] = cookieData.split('|')
  const expiryTimeEpoch = Date.parse(timestampString)
  const expiryTime = new Date()
  expiryTime.setTime(expiryTimeEpoch)
  const n = new Date()
  if (n > expiryTime) {
    return true
  }
  return false
}

const uuidValidateV4 = (uuid) => {
  return validate(uuid) && version(uuid) === 4
}

const validVisitorId = (id) => {
  return uuidValidateV4(id)
}

const bootstrapVisitor = ({ setVisitor }) => {
  const visitor = {
    id: undefined
  }
  if (getCookie(cookieAccountJWT)) {
    visitor.jwt = getCookie(cookieAccountJWT)
  }
  if (!getCookie('_cm_id') || !validVisitorId(getCookie('_cm_id'))) {
    const visitorId = v4()
    setCookie('_cm_id', visitorId, 365)
    visitor.id = visitorId
    setVisitor(visitor)
    return
  }
  if (getCookie('_cm_id')) {
    visitor.id = getCookie('_cm_id')
    setVisitor(visitor)
  }
}

const useFingerprint = () => {
  return useContext(FingerprintContext)
}

const VisitorProvider = ({ children }) => {
  const { appId, booted } = useFingerprint()
  const { log } = useLogging()
  const [session, setSession] = useState({})
  const [visitor, setVisitor] = useState({})
  useEffect(() => {
    if (!booted) {
      log('VisitorProvider: not booted')
      return
    }
    log('VisitorProvider: booting')
    const boot = async () => {
      await bootstrapSession({
        appId,
        setSession
      })
      await bootstrapVisitor({
        setVisitor
      })
    }
    boot()
    log('VisitorProvider: booted', session, visitor)
  }, [appId, booted])
  return React__default.createElement(
    VisitorContext.Provider,
    {
      value: {
        session,
        visitor
      }
    },
    children
  )
}
const VisitorContext = createContext({
  session: {},
  visitor: {}
})
const useVisitor = () => {
  return useContext(VisitorContext)
}

function getEnvVars() {
  let isDev = false
  if (typeof window === 'undefined') {
    isDev = true
  } else {
    var _window,
      _window$location,
      _window$location$host,
      _window2,
      _window2$location
    if (
      (_window = window) !== null &&
      _window !== void 0 &&
      (_window$location = _window.location) !== null &&
      _window$location !== void 0 &&
      (_window$location$host = _window$location.host) !== null &&
      _window$location$host !== void 0 &&
      _window$location$host.includes('localhost')
    )
      isDev = true
    if (
      ((_window2 = window) === null || _window2 === void 0
        ? void 0
        : (_window2$location = _window2.location) === null ||
          _window2$location === void 0
        ? void 0
        : _window2$location.host) === `stage65-az.harvester.co.uk`
    )
      isDev = true
  }
  if (isDev)
    return {
      FINGERPRINT_API_HOSTNAME:
        'https://target-engine-api.starship-staging.com',
      MIXPANEL_TOKEN: 'd122fa924e1ea97d6b98569440c65a95'
    }
  return {
    FINGERPRINT_API_HOSTNAME:
      'https://target-engine-api.starship-production.com',
    MIXPANEL_TOKEN: 'cfca3a93becd5735a4f04dc8e10ede27'
  }
}

const headers = {
  'Content-Type': 'application/json'
}
const hostname = getEnvVars().FINGERPRINT_API_HOSTNAME
const request = {
  get: async (url, params) => {
    return await fetch(url + '?' + new URLSearchParams(params), {
      method: 'GET',
      headers
    })
  },
  post: async (url, body) => {
    return await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
  },
  patch: async (url, body) => {
    return await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    })
  },
  put: async (url, body) => {
    return await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    })
  },
  delete: async (url) => {
    return await fetch(url, {
      method: 'DELETE',
      headers
    })
  }
}

const useCollectorMutation = () => {
  const { log, error } = useLogging()
  return useMutation(
    (data) => {
      var _data$visitor
      return request
        .post(
          hostname +
            '/collector/' +
            (data === null || data === void 0
              ? void 0
              : (_data$visitor = data.visitor) === null ||
                _data$visitor === void 0
              ? void 0
              : _data$visitor.id),
          data
        )
        .then((response) => {
          log('Collector API response', response)
          return response
        })
        .catch((err) => {
          error('Collector API error', err)
          return err
        })
    },
    {
      onSuccess: () => {}
    }
  )
}

const init = (cfg) => {
  mixpanel.init(getEnvVars().MIXPANEL_TOKEN, {
    debug: cfg.debug,
    track_pageview: true,
    persistence: 'localStorage'
  })
}
const trackEvent = (event, props, callback) => {
  return mixpanel.track(event, props, callback)
}
const MixpanelProvider = ({ children }) => {
  const { appId } = useFingerprint()
  const { visitor } = useVisitor()
  const { log } = useLogging()
  useEffect(() => {
    if (!appId || !visitor.id) {
      return
    }
    log('MixpanelProvider: booting')
    init({
      debug: true
    })
    log('MixpanelProvider: registering visitor ' + visitor.id + ' to mixpanel')
    mixpanel.identify(visitor.id)
  }, [appId, visitor === null || visitor === void 0 ? void 0 : visitor.id])
  return React__default.createElement(
    MixpanelContext.Provider,
    {
      value: {
        trackEvent
      }
    },
    children
  )
}
const MixpanelContext = createContext({
  trackEvent: () => {}
})
const useMixpanel = () => {
  return useContext(MixpanelContext)
}

const defaultIdleStatusDelay = 5 * 1000
function CollectorProvider({ children, handlers = [] }) {
  const { log, error } = useLogging()
  const {
    appId,
    booted,
    initialDelay,
    exitIntentTriggers,
    idleTriggers,
    config
  } = useFingerprint()
  const { visitor, session } = useVisitor()
  const { trackEvent } = useMixpanel()
  const { mutateAsync: collect } = useCollectorMutation()
  const { registerHandler } = useExitIntent({
    cookie: {
      key: '_cm_exit',
      daysToExpire: 0
    }
  })
  const [idleTimeout, setIdleTimeout] = useState(
    (config === null || config === void 0 ? void 0 : config.idleDelay) ||
      defaultIdleStatusDelay
  )
  const [pageTriggers, setPageTriggers] = useState([])
  const [displayTrigger, setDisplayTrigger] = useState(undefined)
  const [intently, setIntently] = useState(false)
  const addPageTriggers = (triggers) => {
    setPageTriggers((prev) => uniqueBy([...prev, ...triggers], 'id'))
  }
  log('CollectorProvider: user is on mobile?', isMobile)
  const shouldLaunchIdleTriggers = isMobile
  useEffect(() => {
    if (intently) return
    log('CollectorProvider: removing intently overlay')
    const runningInterval = setInterval(() => {
      const locatedIntentlyScript = document.querySelectorAll(
        'div[id^=smc-v5-overlay-]'
      )
      Array.prototype.forEach.call(locatedIntentlyScript, (node) => {
        node.parentNode.removeChild(node)
        log('CollectorProvider: successfully removed intently overlay')
        clearInterval(runningInterval)
      })
    }, 100)
    return () => {
      clearInterval(runningInterval)
    }
  }, [intently, log])
  const TriggerComponent = React__default.useCallback(() => {
    var _handler$invoke, _handler
    if (!displayTrigger) return null
    let handler
    const trigger = pageTriggers.find((_trigger) => {
      var _ref
      const potentialTrigger = _trigger.invocation === displayTrigger
      const potentialHandler =
        (_ref = [...handlers, ...clientHandlers]) === null || _ref === void 0
          ? void 0
          : _ref.find((handler) => handler.behaviour === _trigger.behaviour)
      handler = potentialHandler
      return potentialTrigger && potentialHandler
    })
    if (!trigger) {
      error(`No trigger found for displayTrigger`, displayTrigger)
      return null
    }
    log('CollectorProvider: attempting to show trigger', trigger, handler)
    if (!handler) {
      log('No handler found for trigger', trigger)
      return null
    }
    if (!handler.invoke) {
      log('No invoke method found for handler', handler)
      return null
    }
    const potentialComponent =
      (_handler$invoke = (_handler = handler).invoke) === null ||
      _handler$invoke === void 0
        ? void 0
        : _handler$invoke.call(_handler, trigger)
    if (potentialComponent && React__default.isValidElement(potentialComponent))
      return potentialComponent
    return null
  }, [displayTrigger, error, handlers, log, pageTriggers, handlers])
  const fireIdleTrigger = useCallback(() => {
    if (!idleTriggers) return
    if (!shouldLaunchIdleTriggers) return
    log('CollectorProvider: attempting to fire idle trigger')
    setDisplayTrigger('INVOCATION_IDLE_TIME')
  }, [idleTriggers, log, shouldLaunchIdleTriggers])
  const fireExitTrigger = useCallback(() => {
    log('CollectorProvider: attempting to fire exit trigger')
    setDisplayTrigger('INVOCATION_EXIT_INTENT')
  }, [log, exitIntentTriggers, setDisplayTrigger])
  useEffect(() => {
    if (!exitIntentTriggers) return
    log('CollectorProvider: attempting to register exit trigger')
    registerHandler({
      id: 'clientTrigger',
      handler: fireExitTrigger
    })
  }, [exitIntentTriggers, fireExitTrigger, log, registerHandler])
  const resetDisplayTrigger = useCallback(() => {
    log('CollectorProvider: resetting displayTrigger')
    setDisplayTrigger(undefined)
  }, [log])
  useEffect(() => {
    if (!booted) {
      log('CollectorProvider: Not yet collecting, awaiting boot')
      return
    }
    const delay = setTimeout(() => {
      if (!visitor.id) {
        log('CollectorProvider: Not yet collecting, awaiting visitor ID')
        return
      }
      log('CollectorProvider: collecting data')
      const params = new URLSearchParams(window.location.search)
        .toString()
        .split('&')
        .reduce((acc, cur) => {
          const [key, value] = cur.split('=')
          if (!key) return acc
          acc[key] = value
          return acc
        }, {})
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
            source:
              params === null || params === void 0 ? void 0 : params.utm_source,
            medium:
              params === null || params === void 0 ? void 0 : params.utm_medium,
            campaign:
              params === null || params === void 0
                ? void 0
                : params.utm_campaign,
            term:
              params === null || params === void 0 ? void 0 : params.utm_term,
            content:
              params === null || params === void 0 ? void 0 : params.utm_content
          }
        }
      })
        .then(async (response) => {
          if (response.status === 204) {
            setIntently(true)
            return
          }
          const payload = await response.json()
          log('Sent collector data, retrieved:', payload)
          setIdleTimeout(
            (config === null || config === void 0
              ? void 0
              : config.idleDelay) || defaultIdleStatusDelay
          )
          addPageTriggers(
            payload === null || payload === void 0
              ? void 0
              : payload.pageTriggers
          )
          if (!payload.intently) {
            log('CollectorProvider: user is in Fingerprint cohort')
            setIntently(false)
            trackEvent('user_cohort', {
              cohort: 'fingerprint'
            })
          } else {
            log('CollectorProvider: user is in Intently cohort')
            setIntently(true)
            trackEvent('user_cohort', {
              cohort: 'intently'
            })
          }
        })
        .catch((err) => {
          error('failed to store collected data', err)
        })
      log('CollectorProvider: collected data')
    }, initialDelay)
    return () => {
      clearTimeout(delay)
    }
  }, [
    appId,
    booted,
    collect,
    error,
    handlers,
    initialDelay,
    log,
    trackEvent,
    visitor
  ])
  const setTrigger = React__default.useCallback(
    (trigger) => {
      log('CollectorProvider: manually setting trigger', trigger)
      addPageTriggers([trigger])
      setDisplayTrigger(trigger.invocation)
    },
    [log, pageTriggers, setDisplayTrigger, addPageTriggers]
  )
  const collectorContextVal = React__default.useMemo(
    () => ({
      resetDisplayTrigger,
      setTrigger,
      trackEvent
    }),
    [resetDisplayTrigger, setTrigger, trackEvent]
  )
  return React__default.createElement(
    IdleTimerProvider,
    {
      timeout: idleTimeout,
      onPresenceChange: (presence) => {
        log('presence changed', presence)
      },
      onIdle: fireIdleTrigger
    },
    React__default.createElement(
      CollectorContext.Provider,
      {
        value: collectorContextVal
      },
      children
    ),
    React__default.createElement(TriggerComponent, null)
  )
}
const CollectorContext = createContext({
  resetDisplayTrigger: () => {},
  setTrigger: () => {},
  trackEvent: () => {}
})

const useCollector = () => {
  return useContext(CollectorContext)
}

const getBrand = () => {
  if (typeof window === 'undefined') return null
  if (window.location.host === 'localhost:3000') return 'Stonehouse'
  if (window.location.host === 'www.stonehouserestaurants.co.uk')
    return 'Stonehouse'
  if (window.location.host === 'www.browns-restaurants.co.uk') return 'Browns'
  return null
}

const Modal = ({ trigger }) => {
  const { log, error } = useLogging()
  const { resetDisplayTrigger, trackEvent } = useCollector()
  const { appId } = useFingerprint()
  const { visitor } = useVisitor()
  const [open, setOpen] = useState(true)
  const brand = React__default.useMemo(() => {
    return getBrand()
  }, [])
  useEffect(() => {
    if (!open) return
    try {
      request
        .put(`${hostname}/triggers/${appId}/${visitor.id}/seen`, {
          seenTriggerIDs: [trigger.id]
        })
        .then(log)
    } catch (e) {
      error(e)
    }
    trackEvent('trigger_displayed', {
      triggerId: trigger.id,
      triggerType: trigger.invocation,
      brand
    })
  }, [open])
  if (!open) {
    return null
  }
  const handleClickCallToAction = (e) => {
    var _trigger$data, _trigger$data2
    e.preventDefault()
    trackEvent('user_clicked_button', trigger)
    ;(trigger === null || trigger === void 0
      ? void 0
      : (_trigger$data = trigger.data) === null || _trigger$data === void 0
      ? void 0
      : _trigger$data.buttonURL) &&
      window.open(
        trigger === null || trigger === void 0
          ? void 0
          : (_trigger$data2 = trigger.data) === null ||
            _trigger$data2 === void 0
          ? void 0
          : _trigger$data2.buttonURL,
        '_self'
      )
  }
  const handleCloseModal = () => {
    trackEvent('user_closed_trigger', trigger)
    resetDisplayTrigger()
    setOpen(false)
  }
  if (brand === 'Stonehouse')
    return React__default.createElement(StonehouseModal, {
      trigger: trigger,
      handleClickCallToAction: handleClickCallToAction,
      handleCloseModal: handleCloseModal
    })
  if (brand === 'Browns')
    return React__default.createElement(BrownsModal, {
      trigger: trigger,
      handleClickCallToAction: handleClickCallToAction,
      handleCloseModal: handleCloseModal
    })
  return null
}
const TriggerModal = ({ trigger }) => {
  return ReactDOM.createPortal(
    React__default.createElement(Modal, {
      trigger: trigger
    }),
    document.body
  )
}

const Youtube = ({ trigger }) => {
  var _trigger$brand,
    _trigger$brand2,
    _trigger$brand3,
    _trigger$brand4,
    _trigger$data
  const [open, setOpen] = useState(true)
  if (!open) {
    return null
  }
  return React__default.createElement(
    'div',
    {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999
      }
    },
    React__default.createElement(
      'div',
      {
        style: {
          background:
            "#fff url('" +
            (trigger === null || trigger === void 0
              ? void 0
              : (_trigger$brand = trigger.brand) === null ||
                _trigger$brand === void 0
              ? void 0
              : _trigger$brand.backgroundImage) +
            "') no-repeat center center",
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
      },
      React__default.createElement(
        'div',
        {
          style: {
            backgroundColor:
              trigger === null || trigger === void 0
                ? void 0
                : (_trigger$brand2 = trigger.brand) === null ||
                  _trigger$brand2 === void 0
                ? void 0
                : _trigger$brand2.overlayColor,
            maxWidth: '600px',
            padding: '2rem',
            borderRadius: '0.5rem'
          }
        },
        React__default.createElement(
          'button',
          {
            onClick: () => {
              setOpen(false)
            },
            style: {
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              fontSize: '2rem',
              backgroundColor:
                trigger === null || trigger === void 0
                  ? void 0
                  : (_trigger$brand3 = trigger.brand) === null ||
                    _trigger$brand3 === void 0
                  ? void 0
                  : _trigger$brand3.fontColor,
              color:
                trigger === null || trigger === void 0
                  ? void 0
                  : (_trigger$brand4 = trigger.brand) === null ||
                    _trigger$brand4 === void 0
                  ? void 0
                  : _trigger$brand4.primaryColor,
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0 1rem'
            }
          },
          '\u00D7'
        ),
        React__default.createElement('iframe', {
          src:
            trigger === null || trigger === void 0
              ? void 0
              : (_trigger$data = trigger.data) === null ||
                _trigger$data === void 0
              ? void 0
              : _trigger$data.url,
          allow:
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
          style: {
            width: '500px',
            height: '260px',
            marginTop: '1rem'
          }
        })
      )
    )
  )
}
const TriggerYoutube = ({ trigger }) => {
  return ReactDOM.createPortal(
    React__default.createElement(Youtube, {
      trigger: trigger
    }),
    document.body
  )
}

const clientHandlers = [
  {
    id: 'modal_v1',
    behaviour: 'BEHAVIOUR_MODAL',
    invoke: (trigger) =>
      React__default.createElement(TriggerModal, {
        trigger: trigger
      })
  },
  {
    id: 'youtube_v1',
    behaviour: 'BEHAVIOUR_YOUTUBE',
    invoke: (trigger) =>
      React__default.createElement(TriggerYoutube, {
        trigger: trigger
      })
  },
  {
    id: 'inverse_v1',
    behaviour: 'BEHAVIOUR_INVERSE_FLOW',
    invoke: (trigger) =>
      React__default.createElement(TriggerInverse, {
        trigger: trigger
      })
  }
]

const queryClient = new QueryClient()
const cookieAccountJWT = 'b2c_token'
const useConsentCheck = (consent, consentCallback) => {
  const [consentGiven, setConsentGiven] = useState(consent)
  useEffect(() => {
    if (consent) {
      setConsentGiven(consent)
      return
    }
    log('Fingerprint Widget Consent: ', consent)
    if (!consentCallback) return
    const consentGivenViaCallback = consentCallback()
    const interval = setInterval(() => {
      setConsentGiven(consent)
    }, 1000)
    if (consentGivenViaCallback) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [consentCallback, consent])
  return consentGiven
}
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
  config
}) => {
  const [booted, setBooted] = useState(false)
  const [handlers, setHandlers] = useState(defaultHandlers || clientHandlers)
  const consentGiven = useConsentCheck(_consent, consentCallback)
  const addAnotherHandler = React__default.useCallback(
    (trigger) => {
      setHandlers((handlers) => {
        return [...handlers, trigger]
      })
    },
    [setHandlers]
  )
  useEffect(() => {
    if (!appId) throw new Error('C&M Fingerprint: appId is required')
    if (booted) return
    if (!consentGiven) return
    const performBoot = async () => {
      setBooted(true)
    }
    performBoot()
  }, [consentGiven])
  if (!appId) {
    return null
  }
  if (!consentGiven) {
    return children
  }
  return React__default.createElement(
    LoggingProvider,
    {
      debug: debug
    },
    React__default.createElement(
      QueryClientProvider,
      {
        client: queryClient
      },
      React__default.createElement(
        FingerprintContext.Provider,
        {
          value: {
            appId,
            booted,
            currentTrigger: {},
            registerHandler: addAnotherHandler,
            trackEvent: () => {
              alert('trackEvent not implemented')
            },
            trackPageView: () => {
              alert('trackPageView not implemented')
            },
            unregisterHandler: () => {
              alert('unregisterHandler not implemented')
            },
            initialDelay: _initialDelay,
            idleTriggers: _idleTriggers,
            exitIntentTriggers: _exitIntentTriggers,
            config
          }
        },
        React__default.createElement(
          VisitorProvider,
          null,
          React__default.createElement(
            MixpanelProvider,
            null,
            React__default.createElement(
              CollectorProvider,
              {
                handlers: handlers
              },
              React__default.createElement(
                ErrorBoundary,
                {
                  onError: (error, info) => console.error(error, info),
                  fallback: React__default.createElement(
                    'div',
                    null,
                    'An application error occurred.'
                  )
                },
                children
              )
            )
          )
        )
      )
    )
  )
}
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
  unregisterHandler: () => {},
  config: {
    idleDelay: undefined,
    trackIdleOnDesktop: false
  }
}
const FingerprintContext = createContext({
  ...defaultFingerprintState
})

export {
  CollectorContext,
  CollectorProvider,
  FingerprintContext,
  FingerprintProvider,
  onCookieChanged,
  useCollector,
  useFingerprint
}
//# sourceMappingURL=index.modern.js.map

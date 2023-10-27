# Fingerprint

> The C&M Fingerprint is an intelligence platform that captures and recognises your users/customers across all touchpoints — including non-digital. It provides insights and signals of user behaviours that power the C&M revenue management platform: improving attraction, acquisition, conversion and upsell opportunities.

This package provides a React component that can be used to integrate the C&M Fingerprint into your React application, and start tracking user behaviour.

Additionally, this repository includes a build script that can be used to build a static version of the Fingerprint that can be included in any website.

The following README focuses on the React component, but you can find more information about the embeddable script tag in the [README](./example/README.md) of the `examples` directory.

## Install Package

```bash
yarn add "git+ssh://git@github.com:clicksandmortar/fingerprint.git#main"
```

Or, if you'd like to develop this package locally, you can use `yarn link`:

```bash
# In the fingerprint directory
yarn link

# In the project directory
yarn link fingerprint
```

## Development (Coming Soon)

You'll need a .env file for development, copy the .env.example file and fill in the values.

## Usage

Simply wrap your app in the `FingerprintProvider` component:

```tsx
import React, { Component } from 'react'

import { FingerprintProvider } from 'fingerprint'
import 'fingerprint/dist/index.css'

const App = () => {
  return (
    <FingerprintProvider
      // Required
      appId='b2a2b2a2b2a2b2a2b2a2b2a2b2a2b2a2'
      // Optional
      consent={true}
      consentCallback={() => {}}
      debug={process.env.NODE_ENV === 'development'}
      defaultHandlers={[]}
      initialDelay={0}
      // Coming soon
      minimumDelay={15000}
    >
      <YourApp />
    </FingerprintProvider>
  )
}

export default App
```

## How it works

### Events

The Fingerprint will track the following events:

- Page views
- Interaction (Page & Component) (coming soon)
- Clicks (coming soon)
- Scrolls (coming soon)
- Form submissions (coming soon)
- Custom events (coming soon)

### Triggers

The Fingerprint will use tracked user visits and events to trigger behaviours based on what has been configured and what is likely to create a conversion.

Example behaviours include displaying a modal, displaying a banner, or changing the state of a component, when a condition is met:

- a user visits a specific page
- a user has visited a certain number of pages
- a user returns to the website after a certain amount of time
- a user has been inactive/idle for a certain amount of time
- a user is about to leave the webpage without converting

Triggers can be configured via the Fingerprint dashboard using a combination of one or more conditions:

- Page URL
- First or repeat visit
- Number of pages visited
- Time spent on website
- Time since last visit
- Time since last conversion
- Time since last page view
- Time since last interaction
  etc.

Only one server-side request is made per page view, and the Fingerprint will then use the data that has been returned to determine which server-side behaviour should be triggered.

Client-side behaviours can also be triggered, and these can be configured via the Fingerprint dashboard using a combination of one or more conditions:

- Page URL
- Interaction with a specific component
- Click on a specific element
- Scroll to a specific element

When using a combination of server and client-side triggers, it's important to note that the server trigger is nearly always evaluated first. This is because the server trigger is evaluated as soon as the page loads, whereas the client trigger is evaluated when the user interacts with the page.

Additionally, an appropriate minimum delay time between triggers should be configured to ensure the user isn't bombarded with triggers. The default minimum delay time is 15 seconds, but this should be adjusted based on the average page view duration.

### Handlers

When a behaviour is triggered, the Fingerprint will invoke a handler that has been registered for that behaviour.

A behaviour handler is a function that can either:

- returns a React component that will be rendered when the behaviour is triggered, via React Portals
- invokes change within the current component, for instance opening a modal or changing the state of a component

When a behaviour handler is registered, it will be invoked whenever the behaviour is triggered.

### Cookie Consent

The Fingerprint will not start tracking data until the user has consented to the use of cookies. This is to ensure that the Fingerprint is GDPR compliant.

You can implement your own cookie consent logic and pass the consent status to the Fingerprint via the `consent` prop:

```tsx
import React, { Component } from 'react'

import { FingerprintProvider } from 'fingerprint'
import 'fingerprint/dist/index.css'

const App = () => {
  const [consent, setConsent] = useState(false)

  return (
    <FingerprintProvider consent={consent}>
      <YourApp />
    </FingerprintProvider>
  )
}

export default App
```

Alternatively, you can use the `useCookieConsent` hook to implement your own cookie consent logic:

```tsx
import React, { Component } from 'react'

import { FingerprintProvider, useCookieConsent } from 'fingerprint'
import 'fingerprint/dist/index.css'

const App = () => {
  const { consent, setConsent } = useCookieConsent()

  return (
    <FingerprintProvider consent={consent}>
      <YourApp />
    </FingerprintProvider>
  )
}

export default App
```

## API

### FingerprintProvider

#### Note: a lot of these fields are going to be moved to BE and configurable from Portal #soon

| Prop                     | Type       | Default     | Description                                                                                                                                                           |
| ------------------------ | ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appId                    | `string`   | `undefined` | The application ID to use for fingerprint tracking. Fingerprint will not start tracking data until this is set, and has been validated by the server.                 |
| debug                    | `boolean`  | `false`     | Whether or not to log debug information to the console. When set to true this will log all fingerprint events to the console. When false, only errors will be logged. |
| defaultHandlers          | `object`   | `{}`        | A map of default handlers to use for behaviours that don't have a handler registered. Set this to an empty object to disable the default handlers.                    |
| initialDelay             | `number`   | `0`         | The initial delay in milliseconds before the Fingerprint will start tracking data and provide the first trigger.                                                      |
| minimumDelay             | `number`   | `15000`     | The minimum delay in milliseconds between triggers.                                                                                                                   |
| consent                  | `boolean`  | `false`     | Whether or not the user has consented to the use of cookies.                                                                                                          |
| consentCallback          | `function` | `undefined` | A callback function that will be invoked every second to check the consent status. The return value of this function will be used to determine the consent status.    |
| exitIntentTriggers       | `boolean`  | `false`     | Whether or not to use exit intent to trigger behaviours.                                                                                                              |
| idleTriggers             | `boolean`  | `false`     | Whether or not to use idle time to trigger behaviours.                                                                                                                |
| config                   | `object`   | `undefined` | Config params where future optional parameters can be nested                                                                                                          |
| config.exitIntentDelay   | `number`   | `0`         | time (ms) before exit intents CAN start to fire idle                                                                                                                          |
| config.idleDelay         | `number`   | `undefined` | time (ms) before the user is considered idle                                                                                                                          |
| config.triggerCooldown   | `number`   | `60 000`    | cooldown (ms) preventing triggers from being fired even if conditions are met

### useFingerprint

This hook provides access to the fingerprint instance, and exposes methods to:

- Register behaviour handlers
- Track custom events (coming soon)

```tsx
import React, { Component } from 'react'

import { useFingerprint } from 'fingerprint'

const App = () => {
  const {
    appId,
    booted,
    currentTrigger,
    registerHandler,
    trackEvent,
    trackPageView,
    unregisterHandler
  } = useFingerprint()

  return (
    <div>
      <p>Your Application</p>
    </div>
  )
}
```

### useCookieConsent (coming soon)

This hook provides access to the cookie consent instance, and exposes methods to:

- Set the consent status

```tsx
import React, { Component } from 'react'

import { useCookieConsent } from 'fingerprint'

const App = () => {
  const { consent, setConsent } = useCookieConsent()

  return (
    <div>
      <p>Your Application</p>
    </div>
  )
}
```

#### appId

The application ID that was passed to the `FingerprintProvider` component.

#### booted

A boolean value that indicates whether or not the fingerprint has been booted. This will be `false` until the fingerprint has been booted, and will then be `true` for the remainder of the application lifecycle.

#### currentTrigger (coming soon)

The current trigger that has been triggered. This will be `undefined` until a trigger has been triggered, and will then return a trigger object with the following shape:

```ts
{
  behaviour: string // The behaviour that was triggered
  // TBC
}
```

#### registerHandler

This function can be used to register a behaviour handler.

A behaviour handler is a function that can either:

- returns a React component that will be rendered when the behaviour is triggered, via React Portals
- invokes change within the current component, for instance opening a modal or changing the state of a component
- registers a React Portal that will be rendered when the behaviour is triggered, somewhere other than the root of the DOM

When a behaviour handler is registered, it will be invoked whenever a matching behaviour is triggered. A match is determined by the behaviour type (i.e. `modal`) and if set, the trigger identifier (i.e. `welcome_on_homepage`). Where no matching trigger identifier is set, the behaviour handler will be invoked for all triggers of that type.

If a behaviour handler returns a React component, it will be rendered via a React Portal, and will be rendered either at the root of the application or at the root of the DOM, unless otherwise specified.

If a behaviour handler invokes change within the current component, it will be invoked within the current component, and will have access to the current component's state and props.

Where a handler hasn't been registered for a behaviour, the behaviour will invoke the default handler, unless otherwise specified to the FingerprintProvider in the `defaultHandlers` prop.

Note: When using the `registerHandler` function, you should ensure that you are not registering the same behaviour handler multiple times, and that you are unregistering the behaviour handler when the component that registered it is unmounted. This is to ensure that the behaviour handler is not invoked multiple times, and that it is not invoked when the component that registered it is unmounted.

```tsx
import React, { Component } from 'react'

import { useFingerprint } from 'fingerprint'

const YourComponent = () => {
  const [showBanner, setShowBanner] = useState(false)
  const { registerHandler, currentTrigger } = useFingerprint()

  useEffect(() => {
    registerHandler({
      behaviour: 'modal',
      invoke: (trigger: Trigger) => <Modal />
    })

    registerHandler({
      id: 'welcome_on_homepage',
      behaviour: 'modal',
      invoke: (trigger: Trigger) => <HomepageWelcomeModal />
    })

    registerHandler({
      behaviour: 'banner',
      invoke: (trigger: Trigger) => setShowBanner(true)
    })

    return () => {
      unregisterHandler({
        behaviour: 'modal'
      })

      unregisterHandler({
        id: 'welcome_on_homepage',
        behaviour: 'modal'
      })

      unregisterHandler({
        behaviour: 'banner'
      })
    }
  }, [])

  return (
    <div>
      <p>Hello World</p>

      {showBanner && <Banner trigger={currentTrigger}>}
    </div>
  )
}
```

#### trackEvent (coming soon)

This function can be used to track custom events.

```tsx
import React, { Component } from 'react'

import { useFingerprint } from 'fingerprint'

const YourComponent = () => {
  const { trackEvent } = useFingerprint()

  const handleClick = () => {
    trackEvent({
      // TBC
    })
  }

  return (
    <div>
      <p>Hello World</p>

      <button onClick={handleClick}>Click Me</button>
    </div>
  )
}
```

#### trackPageView (coming soon)

This function can be used to track page views.

```tsx
import React, { Component } from 'react'

import { useFingerprint } from 'fingerprint'

const YourComponent = () => {
  const { trackPageView } = useFingerprint()

  useEffect(() => {
    trackPageView({
      // TBC
    })
  }, [])

  return (
    <div>
      <p>Hello World</p>
    </div>
  )
}
```

#### unregisterHandler

This function can be used to unregister a behaviour handler. This is useful when you want to unregister a behaviour handler that was registered within a component that has since been unmounted.

```tsx
import React, { Component } from 'react'

import { useFingerprint } from 'fingerprint'

const YourComponent = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { registerHandler, unregisterHandler } = useFingerprint()

  useEffect(() => {
    registerHandler({
      behaviour: 'modal',
      invoke: () => setModalOpen(true)
    })

    return () => {
      unregisterHandler({
        behaviour: 'modal'
      })
    }
  }, [])

  return (
    <div>
      <p>Hello World</p>

      {modalOpen && <Modal setModalOpen={setModalOpen} />}
    </div>
  )
}
```

## Deployments

To deploy, run the following AWS CLI command whilst in the 'dist' directory:

`aws s3 cp . s3://cam-cdn-fingerprint-script-staging-origin/ --recursive --exclude "*" --include="fingerprint.*"`

This will deploy the fingerprint files to the bucket that is is publicly accessible via the following URL:

https://d26qevl4nkue45.cloudfront.net/fingerprint.js

You can then embed the fingerprint script in any website using the following script tag:

````javascript
<!-- C&M Fingerprint Embed Code -->
  <script>
    ;(function (f, i, n, g, e, rp, ri, nt) {
      p = i.createElement(n)
      r = i.getElementsByTagName(n)[0]
      p.src = g
      p.id = e
      p.setAttribute('data-debug', rp)
      p.setAttribute('data-consent', ri)
      r.parentNode.insertBefore(p, r)
    })(
      window,
      document,
      'script',
      'https://d26qevl4nkue45.cloudfront.net/fingerprint.js',
      'b2a2b2a2b2a2b2a2b2a2b2a2b2a2b2a2',
      true, // Set to false to disable debug mode
      true // Set to false to disable consent
    )
  </script>
<!-- End C&M Fingerprint Embed Code -->```
````

## Testing

Looking to test the Fingerprint on a production website? You can dynamically inject the Fingerprint script into any website by enabling a Greasemonkey/Tampermonkey script.

To do this, create a new script in Greasemonkey/Tampermonkey, and paste the following code:

```javascript
// ==UserScript==
// @name     Embed C&M Fingerprint
// @version  1
// @grant    none
// @match *://*.harvester.co.uk/*
// ==/UserScript==

;(function (f, i, n, g, e, rp, ri, nt) {
  p = i.createElement(n)
  r = i.getElementsByTagName(n)[0]
  p.src = g
  p.id = e
  p.setAttribute('data-debug', rp)
  r.parentNode.insertBefore(p, r)
})(
  window,
  document,
  'script',
  'https://d26qevl4nkue45.cloudfront.net/fingerprint.js',
  'b2a2b2a2b2a2b2a2b2a2b2a2b2a2b2a2',
  true // Set to false to disable debug mode
)
```

You can then enable the script on any website by updating the `@match` URL, and the Fingerprint will be injected onto subsequent page views.

# Fingerprint

> The C&M Fingerprint is an intelligence platform that captures and recognises your users/customers across all touchpoints — including non-digital. It provides insights and signals of user behaviours that power the C&M revenue management platform: improving attraction, acquisition, conversion and upsell opportunities.

This package provides a React component that can be used to integrate the C&M Fingerprint into your React application, and start tracking user behaviour.

Additionally, this repository includes a build script that can be used to build a static version of the Fingerprint that can be included in any website.

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

## Development

To start developing the Fingerprint, run the following command:

```bash
yarn start
```
This will start a Difi in --watch mode and update the build on every code change.
_Do note that the code does NOT get updated if parcel encounters a typescript error_

If the target app is a React app (see [Usage](#usage)), it should also start auto-refreshing on Difi changes.

## Tooling

It is recommended you have the following extensions installed:
- ESLint (with Prettier) package for your editor
- React dev tools browser extension - general component debugging
- Redux dev tools browser extension - zustand store debugging.

Please note that the redux state history feature currently crashes the app. This is likely due to a compatibility issue between the slice pattern of zustand and the redux dev tools. Further investigation to be done.

## Debugging

Use the tools above to aid in your debugging experience.

There are logs scattered all over the app to help you debug via the browser console. Make sure you configure the trading entity's `debug` flag to `true` to see them.

## Building

We have 2 different build scripts:
`yarn build:fingerprint` - builds the static script embedable onto any website
`yarn build` - runs parcel and creates the difi package, usable by React. 

## Usage

Simply wrap your app in the `FingerprintProvider` component:

```tsx
import React, { Component } from 'react'

import { FingerprintProvider } from 'fingerprint'
import 'fingerprint/dist/index.css'

const App = () => {
  return (
    <FingerprintProvider
      appId='b2a2b2a2b2a2b2a2b2a2b2a2b2a2b2a2'
      consent={true}
    >
      <YourApp />
    </FingerprintProvider>
  )
}

export default App
```

## How it works

Upon mount of the `FingerprintProvider` component, the Fingerprint will make a request to the collector's `/collect` endpoint to retrieve the app configuration, triggers, conversion info and more. This and subsequent calls to the collector are later used to drive the behaviour of the entire DiFi app.

## State management

### History

Up until recently we have used the `React.Context` API to manage our app's state. However, as the app grew, it became a nightmare to manage state and pass around necessary props to all our components. Not only that, but the components up in the HTML tree never saw the necessary state and had to have features recreated. Example (all of these wrappers are `React.Contexts`):

```tsx
<Config>                     // ❌ <- would never have access to logging
  <Logging>                  // ❌ <- would never have access to Fingerprint logic
    <FingerprintProvider>    // ❌ <- would never have access to Collector
      <Collector>            // ❌ <- API calls and 90% of the logic, A.K.A a huge problem
        {children}           // ✅ <- target App has access to all of the above.
      <Collector>
    </FingerprintProvider>
  </Logging>
</Config>
```
and a bunch more issues making our code impossible to maintain.

So to alleviate that, we migrated to using a store solution - `Zustand` in this case.

### How Zustand works

Evertything we need for state management sits inside `src/beautifulSugar`.

The store follows the slice pattern, see `src/beautifulSugar/slices` - you can read more in the [Zustand docs](https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md)

If you need to add a new piece of state:
- Create a slice file
- Follow the pattern in the other slices
- Update the `DifiStore` type to include the slice's type definition
- Append the slice to the combiner in `src/beautifulSugar/store.ts`

### Using state

_Unless more than one component needs the state to be reachable, try to avoid overcrowding the store. If you need to break your component down into smaller chunks, use hooks instead._

#### Getting values
All of the same React patterns apply when working with Zustand. Generally, you can use the `useEntireStore` hook to get access to the entire store object, and then select the data you need:

```
const { pageTriggers } = useEntireStore()
```

If that doesn't satisfy your needs or TS is giving you problems, the payload includes the `get` function that allows you to get the value of any item in the store. Follow the `Zustand` docs for more info.

#### Setting values

You can either set values by using the `set` setter (also in the payload of `useEntireStore`), or by creating a handler inside the slice to do that. 

When using `set()`, treat it the same way you would treat `setState` in a `React Class Component` - the data is immutable and you can update the state with just the top level key-values.


```tsx
const { set } = useEntireStore()

const someHandler = () => {
  set({ 
    // no need to include the entire state
    pageTriggers: {
      ...pageTriggers, 
      ...newTriggers
    }
  })

  // OR 

  set(prevState => ({ 
    ...prevState,
    // do include the entire state
    pageTriggers: {
      ...prevState.pageTriggers, 
      ...newTriggers
    }
  }))
}
```

### Events

The Fingerprint will track the following events:

- Page views
- Interactions:
  - Button clicks
  - Form submissions
  - Page navigation (BE)
- Form submissions
- Triggered behaviours
- Custom events (coming soon?)

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
- Type of device (mobile, desktop)
- etc.

One server-side request is made per page view, and the Fingerprint will then use the data that has been returned to determine which server-side behaviour should be triggered.

Once a trigger has occured, the collector's `/seen` endpoint is pinged and the trigger data is updated and used as the new source of truth. `/dismiss` is called for some triggers with the same outcome

Client-side behaviours (a.k.a Incomplete Triggers) are front-end driven behaviours that run when certain client conditions are met. These can be configured via the Fingerprint dashboard using a combination of one or more conditions:

- Page URL
- Visibility of a specific element

When using a combination of server and client-side triggers, it's important to keep in mind when each trigger can potentially occur on the page. There are restrictions set in place in code to prevent multiple triggers of the same kind from occuring simultaneously, but it's important to keep this in mind when configuring triggers to avoid a super annoying UX.

Additionally, an appropriate minimum delay time between triggers should be configured to ensure the user isn't bombarded with triggers. The default minimum delay time is 15 seconds, but this should be adjusted based on the average page view duration.

### Handlers

When a behaviour is triggered, the Fingerprint will invoke a handler that has been registered for that behaviour.

A behaviour handler is a function that can either:

- returns a React component that will be rendered when the behaviour is triggered, via React Portals, like opening a popup or banner
- invokes change within the current component or changing the state of a component

When a behaviour handler is registered, it will be invoked whenever the behaviour is triggered.

Out of the box we support the behvaiours listed in `src/client/handler.tsx` and allow React apps using the `Fingerprint` wrapper to add their own handlers in the `defaultHandlers` prop.

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

### User behaviours

#### Page views and interactions

We use Mixpanel to track page views and interactions. To use it, run `trackEvent(EVENT_NAME, payload)` wherever is needed. If you are using a new type of event or editing an existing one, make sure to update the event documentation. How to do that you can find on this [Notion page](https://www.notion.so/clicksandmortar/Mixpanel-Events-Reporting-Guidelines-06944d425dad4aaeb94a04ea9a999f3d?pvs=4)


#### Conversions

Similar to `Incomplete triggers`, we use DiFi to track conversions. A conversion can be set up in the DiFi dashboard, and once that's done:
- once the `/collector` is called on the applicable plage, it will return the `conversions: []` as part of its response
- the data is then used by `src/hooks/useConversion.ts` to determine if a conversion has occured based on page URL and/or visible elements.
- Once a conversion occurs, the hook pings `/collector` with the conversion ID and the conversion is marked as complete and removed from the conversions state.

#### Form submissions and button clicks

To gain more insight into users' preferences, we retain **some** of the information they enter in forms (we filter out PII and payment info before keeping it).

We also track which buttons the users clicks on. At the moment, this is used to determine abandoned journeys so we can chase up with an email, increasing conversions. 

Both of these are sent as part of the `/collector` payload.

### Cookie integrations (to be added)


## API (more to be added)

### FingerprintProvider


| Prop                     | Type       | Default     | Description                                                                                                                                                           |
| ------------------------ | ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appId                    | `string`   | `undefined` | The application ID (in most cases = `TradingEntity.id`) to use for fingerprint tracking. Fingerprint will not start tracking data until this is set, and has been validated by the server.                 |
| defaultHandlers          | `object`   | `{}`        | A map of default handlers to use for behaviours that don't have a handler registered. Set this to an empty object to disable the default handlers.                    |
| initialDelay             | `number`   | `0`         | The initial delay in milliseconds before the Fingerprint will start tracking data and provide the first trigger.                                                      |
| consent                  | `boolean`  | `false`     | Whether or not the user has consented to the use of cookies.                                                                                                          |
| consentCallback          | `function` | `undefined` | A callback function that will be invoked every second to check the consent status. The return value of this function will be used to determine the consent status.    |
| exitIntentTriggers       | `boolean`  | `false`     | Whether or not to use exit intent to trigger behaviours.                                                                                                              |
| idleTriggers             | `boolean`  | `false`     | Whether or not to use idle time to trigger behaviours.                                                                                                                |
| pageLoadTriggers         | `boolean`  | `false`     | Whether or not to trigger behaviours on page load                                                                                                                     |


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


## Deployments

### Prod
The fingerprint script gets automatically built upon every merge into main and is deployed to `cdn.fingerprint.host`. Note that the script doesn't get updated if testing using Github actions fails - see [Testing](#testing)

### CI/CD

To help with testing and catching errors early, every commit that is part of a PR gets built and hosted on `https://cdn.development.fingerprint-staging.host/{{FULL_COMMIT_HASH}}/fingerprint.js`. This URL can later be used to test in prod - see [Manual Testing](#manual-testing)
### Manual deploy

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

### Manual Testing

#### Please note that this approach may fail on some domains based on their security policy. 

Looking to test the Fingerprint on a production website? You can dynamically inject the Fingerprint script into any website by enabling a Greasemonkey/Tampermonkey script.

To do this, create a new script in Greasemonkey/Tampermonkey, and paste the following code:

```javascript
// ==UserScript==
// @name     Embed C&M Fingerprint
// @version  1
// @grant    none
// @match *://*.clicksandmortar.tech/*
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
  'https://cdn.development.fingerprint-staging.host/{{ FULL_COMMIT_HASH }}/fingerprint.js', // or use whatever script version / prod URL you want to test
  'b2a2b2a2b2a2b2a2b2a2b2a2b2a2b2a2',
  true, // Set to false to disable debug mode
  true // Set to false to disable consent
)
```

You can then enable the script on any website by updating the `@match` URL, and the Fingerprint will be injected onto subsequent page views.


## Automated testing

Like any other C&M frontend package, automated testing is performed by `Percy + Playwright` through `Github Actions`. The workflow can be found in `.github/workflows/playwright.yml`. (`Jest` will likely be added to the mix soon)

Playwright docs [here](https://playwright.dev/docs/intro)

It is recommended you run tests locally before pushing, to save yourself build time in the cloud. 
The testing utility also has a lot of helpful debugging features.

To do that:

- Run `yarn test:playwright`. It will launch the testing suite.
- Once there, hit the green button to run tests
- Explore the app to debug any occuring issues
### Structure 
Currently all tests sit in `src/utils/__test__` for simplicity along with:
- a `testHelpers.ts` file which contains some helper functions for the tests
- `*.fake.ts` with a fake responses from the server and trigger objects.

Rather than being separated by files, the tests are currently separated by concern (e.g. visitor.test.tsx contains all tests related to the visitor object). This may change in the future.

### Tests

- There is no consistent way of writing tests currently - follow existing examples or refer to the Playwright docs.
- We test on 3 browsers - 2 desktop and 1 mobile. If you have platform specific behaviours (e.g. mobile modal vs desktop modal) then make sure your tests cover both or run on the appropriate "hardware"
- You are welcome to edit the `response.fake.ts` file to change the response from the server. 
- Mocking the `/seen`, `/trigger/...` or `/dismiss` endpoints is not implemented yet - feel free to add a helper to do this.

### Issues and limitations

#### `test.step` misbehaves occasionally
`test.step` is a function provided by Playwright that allows you to group tests together. It is buggy and sometimes causes tests to fail. If you are having issues with tests failing, try removing the `test.step` function and see if that fixes it.
Because of that, some tests are shoved together in a single `test` function. This is not ideal and should be fixed eventually.
Likely due to the fact we want to parallelise tests, while test.step is not designed to be run consequently if a value relies on its result or if it has side effects.
#### We don't have access to Window or Location
so we have to use this hack to gain access to them:
```tsx
const loc = await page.evaluate(() => location)
globalThis.location = loc
```
This doesn't work for all tests, so we have to use a combination of this and mocking the window object entirely:
```tsx
setDom(`optional.url/here`)
```
this creates a mock jsDom for the URL (defaults to the one in `playwright.config.ts`), then sets the global document and window to the ones returned by
creating JSDom. Bear in mind we become logically disconnected from the actual playwright browser page. 

#### Refactoring needed
A lot of our functions do not follow SOLID principles and are not very testable. This is because they handle a lot of logic and side effects. Ideally we would refactor these to be more testable and have less side effects.
A few good examples of that




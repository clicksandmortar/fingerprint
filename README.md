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
      debug={process.env.NODE_ENV === 'development'}
    >
      <YourApp />
    </FingerprintProvider>
  )
}

export default App
```

## API

### FingerprintProvider

| Prop  | Type      | Default     | Description                                                                                                                                                           |
| ----- | --------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appId | `string`  | `undefined` | The application ID to use for fingerprint tracking. Fingerprint will not start tracking data until this is set, and has been validated by the server.                 |
| debug | `boolean` | `false`     | Whether or not to log debug information to the console. When set to true this will log all fingerprint events to the console. When false, only errors will be logged. |

## License

MIT © [clicksandmortar](https://github.com/clicksandmortar)

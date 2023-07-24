# fingerprint

> Clicks &amp; Mortar Fingerprint Tracking &amp; Triggers

## Install

```bash
yard add fingerprint
```

## Usage

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

## License

MIT © [clicksandmortar](https://github.com/clicksandmortar)

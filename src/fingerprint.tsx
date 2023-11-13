import React from 'react'
import { createRoot } from 'react-dom/client'
import { Widget } from './widget/Widget'

// Creates widget container
// <div id='fingerprint-widget'></div>
const widget = document.createElement('div')
widget.id = 'fingerprint-widget'
document.body.appendChild(widget)

// Embeds widget styles
// @todo this should be provided by CDN
// const styles = document.createElement('link')
// styles.rel = 'stylesheet'
// // @todo update parcel to use the hashed styles
// // @todo automatically strip any non-namespaced styles
// styles.href = '../dist/fingerprint.css'
// document.head.appendChild(styles)

console.log('Fingerprint Widget Loaded')

// Renders widget
export const render = () => {
  const container = document.getElementById('fingerprint-widget')
  const root = createRoot(container!)

  root.render(
    <React.StrictMode>
      <Widget
        appId={document?.currentScript?.getAttribute('id') || ''}
        tenantId={document?.currentScript?.getAttribute('data-tenant') || ''}
        // The follow props are deprecated and will be removed in a future release.
        consent={
          document?.currentScript?.getAttribute('data-consent') === 'true'
        }
        debug={document?.currentScript?.getAttribute('data-debug') === 'false'}
      />
    </React.StrictMode>
  )
}

render()

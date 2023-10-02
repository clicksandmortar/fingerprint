import React from 'react'
import ReactDOM from 'react-dom'
import './styles.module.css'
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
ReactDOM.render(
  <React.StrictMode>
    <Widget
      appId={document?.currentScript?.getAttribute('id') || ''}
      consent={
        document?.currentScript?.getAttribute('data-consent') === 'false'
      }
      // @todo Revert this from 'false' to 'true'
      debug={document?.currentScript?.getAttribute('data-debug') === 'false'}
    />
  </React.StrictMode>,
  document.getElementById('fingerprint-widget')
)

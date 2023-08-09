# Embeddable Fingerprint

This package provides an embeddable script tag that can be used to integrate the C&M Fingerprint into any website, and start tracking user behaviour.

## Installation Instrutions

To install the Fingerprint on your website, simply copy the script tag provided from the C&M portal (which should look similar to the below) onto your website, before the closing `</body>` tag.

```html
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
    '../dist/fingerprint.js',
    '{ YOUR APP ID }',
    { DEBUG }, // Set to false to disable debug mode. Always set to false in production.
    true // Set to true when cookies are allowed.
  )
</script>
<!-- End C&M Fingerprint Embed Code -->
```

## Usage

Once the script tag has been added to your website, the Fingerprint will automatically start tracking user behaviour.

## Cookie Consent

The Fingerprint does not currently expose any cookie consent functionality. If you require cookie consent, you will need to implement this yourself. Our recommendation is to implement the Fingerprint Embed Code using a Tag Manager (such as Google Tag Manager), and then use the Tag Manager to implement cookie consent.

## Parameters

The script tag accepts the following parameters:

| Parameter         | Type      | Default     | Description                                                                                                                                                           |
| ----------------- | --------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{ YOUR APP ID }` | `string`  | `undefined` | The application ID to use for fingerprint tracking. Fingerprint will not start tracking data until this is set, and has been validated by the server.                 |
| `{ DEBUG }`       | `boolean` | `false`     | Whether or not to log debug information to the console. When set to true this will log all fingerprint events to the console. When false, only errors will be logged. |

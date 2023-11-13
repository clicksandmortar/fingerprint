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
    r.parentNode.insertBefore(p, r)
  })(
    window,
    document,
    'script',
    'https://cdn.fingerprint.host/fingerprint.js',
    '{ YOUR TRADING UNIT ID }'
  )
</script>
<!-- End C&M Fingerprint Embed Code -->
```

## Usage

Once the script tag has been added to your website, the Fingerprint will automatically start tracking user behaviour.

## Cookie Consent

The Fingerprint does not currently expose any cookie consent functionality. If you require cookie consent, you will need to implement this yourself. Our recommendation is to implement the Fingerprint Embed Code using a Tag Manager (such as Google Tag Manager), and then use the Tag Manager to implement cookie consent.

## Parameters

The script tag no longer accepts parameters. All configuration should be made in the C&M portal.

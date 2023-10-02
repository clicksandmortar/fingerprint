import mixpanel, { Callback, Config, Dict } from 'mixpanel-browser';
import './App.css';

const MIXPANEL_TOKEN_STAGING = 'd122fa924e1ea97d6b98569440c65a95'

// Note: This is configured to track an event for every page view automatically.
// We also recommend using localStorage instead of the default cookie for persistence.

const init = (cfg: Partial<Config>) => {
  // TODO: Create environment separation
  mixpanel.init(MIXPANEL_TOKEN_STAGING,
    {
      debug: cfg.debug,
      track_pageview: true,
      persistence: 'localStorage',
    }
  );
}

// Set this to a unique identifier for the user performing the event.
// eg: their ID in your database or their email address.
const identify = (id: string) => {
  return mixpanel.identify(id)
}

// TODO: remove?
init({ debug: true })
identify('simon@clicksandmortar.tech')

enum Event {
  POPUP_DISPLAYED = 'Pop-up Displayed',
  BUTTON_CLICKED = 'Button Clicked',
  CONVERSION_MADE = 'Conversion Made',
}

enum Domain {
  ORDERING = 'Ordering',
  BOOKING = 'Booking',
  GIFT_CARR = 'Gift Card'
}

// Track an event. It can be anything, but in this example, we're tracking a Signed Up event.
// Include a property about the signup, like the Signup Type
const trackEvent = (event: Event, props: { domain: Domain, extras?: Dict }, cb?: Callback): void => {
  return mixpanel.track(event.toString(), {
    'Domain': props.domain.toString(),
    ...props.extras,
  }, cb)
}

const mouseEvent = (t: React.MouseEvent<HTMLElement>) => {
  trackEvent(Event.BUTTON_CLICKED,
    {
      domain: Domain.BOOKING,
      extras: {
        'MyProp': 'value'
      }
    }
  )
}

const bookingPopupDisplayed = () => {
  trackEvent(Event.POPUP_DISPLAYED, {
    domain: Domain.BOOKING,
  })
}



function App() {
  return (

  );
}

export default App;
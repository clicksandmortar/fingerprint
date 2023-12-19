import { BannerTrigger } from '../../behaviours/Banner/Banner.types'
import { IncompleteTrigger, Trigger } from '../../client/types'

const banner: Trigger = {
  id: '7af0fc17-6508-4b5a-9003-1039fc473250',
  invocation: 'INVOCATION_PAGE_LOAD',
  behaviour: 'BEHAVIOUR_BANNER',
  data: {
    buttonText: 'Run',
    buttonURL: 'https://google.com'
  }
}

export const fakeBanners: BannerTrigger[] = [
  {
    ...banner,
    id: `position: 'left',`,
    data: {
      ...banner.data,
      position: 'left',
      buttonIcon: 'ticket',
      marketingText: 'AAAA!'
    }
  },
  {
    ...banner,
    id: `position: 'top',`,
    data: {
      ...banner.data,
      position: 'top',
      buttonText: 'Clickable'
    }
  },
  {
    ...banner,
    id: `countdownEndTime: '2024-03-31T23:59',`,
    data: {
      ...banner.data,
      marketingText:
        'You only have {{ countdownEndTime }} before the horse comes',
      countdownEndTime: '2024-03-31T23:59',
      position: 'bottom'
      // buttonIcon: 'FaCoffee'
    }
  },
  {
    ...banner,
    id: `position: 'right',`,
    data: {
      ...banner.data,
      position: 'right',
      buttonText: 'CLickable thing',
      buttonIcon: 'heart'
    }
  }
]
// @ts-ignore
export const fakeTriggers: Trigger[] = [
  ...fakeBanners,
  {
    id: 'exit-trigger-id',
    invocation: 'INVOCATION_EXIT_INTENT',
    behaviour: 'BEHAVIOUR_MODAL',
    data: {
      backgroundURL: 'https://cdn.fingerprint.host/browns-three-plates-800.jpg',
      buttonText: 'Purchase now (EXIT INTENT)',
      buttonURL: 'http://www.google.com',
      heading: '25% Off Gift Cards',
      paragraph: 'Get 25% off a gift card, if you buy today!'
    }
  },
  {
    id: 'modal-trigger-id-idle',
    invocation: 'INVOCATION_IDLE_TIME',
    behaviour: 'BEHAVIOUR_MODAL',
    data: {
      backgroundURL: 'https://cdn.fingerprint.host/browns-lamb-shank-800.jpg',
      buttonText: 'Click me',
      buttonURL: 'http://www.google.com',
      heading: 'This is an IDLE_TIME',
      paragraph: 'And so is this'
    }
  }
]

export const fakeCountdownModal: Trigger = {
  id: 'modal-trigger-urgency',
  invocation: 'INVOCATION_PAGE_LOAD',
  behaviour: 'BEHAVIOUR_MODAL',
  data: {
    backgroundURL:
      'https://shopus.parelli.com/cdn/shop/articles/2023-07-31-how-much-do-horses-weigh.png?v=1690553380',
    buttonText: 'Click me',
    buttonURL: 'http://www.google.com',
    heading: 'Only {{countdownEndTime}} left to horse around!',
    paragraph: 'Use it wisely',
    countdownEndTime: '2024-01-31T23:59'
  }
}

export const fakeIncompleteTriggers: IncompleteTrigger[] = [
  {
    id: 'incomplete-1',
    behaviour: 'BEHAVIOUR_MODAL',
    brand: 'whatever',
    invocation: 'INVOCATION_ELEMENT_VISIBLE',
    data: {
      backgroundURL: 'https://cdn.fingerprint.host/browns-three-plates-800.jpg',
      buttonText: 'Click me',
      buttonURL: 'http://www.google.com',
      heading: 'This should fire only when',
      paragraph: 'a user sees the element with className "bla-bla" '
    },
    signals: [
      {
        op: 'CanSeeElementOnPage',
        parameters: ['.bla-bla', 'contains', '/']
      }
    ]
  }
]

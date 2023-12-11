import { IncompleteTrigger, Trigger } from '../../client/types'

export const fakeTriggers: Trigger[] = [
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
  },
  {
    id: 'banner-trigger-id-bottom',
    invocation: 'INVOCATION_PAGE_LOAD',
    behaviour: 'BEHAVIOUR_BANNER',
    data: {
      position: 'bottom',
      buttonText: 'Run',
      buttonURL: 'https://google.com',
      countdownEndTime: '2024-03-31T23:59',
      marketingText:
        'You only have {{ countdownEndTime }} before the horse comes'
    }
  },
  {
    id: 'banner-trigger-id-top',
    invocation: 'INVOCATION_PAGE_LOAD',
    behaviour: 'BEHAVIOUR_BANNER',
    data: {
      position: 'top',
      buttonText: 'Run',
      buttonURL: 'https://google.com',
      countdownEndTime: '2024-03-31T23:59',
      marketingText:
        'You only have {{ countdownEndTime }} before the horse comes'
    }
  },
  {
    id: 'banner-trigger-id-right',
    invocation: 'INVOCATION_PAGE_LOAD',
    behaviour: 'BEHAVIOUR_BANNER',
    data: {
      position: 'right',
      buttonText: 'Run',
      buttonURL: 'https://google.com',
      countdownEndTime: '2024-03-31T23:59',
      marketingText:
        'You only have {{ countdownEndTime }} before the horse comes'
    }
  },
  {
    id: 'banner-trigger-id-left',
    invocation: 'INVOCATION_PAGE_LOAD',
    behaviour: 'BEHAVIOUR_BANNER',
    data: {
      position: 'left',
      buttonText: 'Run',
      buttonURL: 'https://google.com',
      countdownEndTime: '2024-03-31T23:59',
      marketingText:
        'You only have {{ countdownEndTime }} before the horse comes'
    }
  }
]

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

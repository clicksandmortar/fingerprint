import { IncompleteTrigger, Trigger } from '../../client/types'

export const fakeTriggers: Trigger[] = [
  {
    id: 'exit-trigger-id',
    invocation: 'INVOCATION_EXIT_INTENT',
    behaviour: 'BEHAVIOUR_MODAL',
    data: {
      backgroundURL: 'https://cdn.fingerprint.host/browns-three-plates-800.jpg',
      buttonText: 'Click me',
      buttonURL: 'http://www.google.com',
      heading: 'This is an EXIT_INTENT',
      paragraph: 'And so is this'
    }
  },
  {
    id: 'idle-trigger-id',
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
    id: '7af0fc17-6508-4b5a-9003-1039fc473250',
    invocation: 'INVOCATION_PAGE_LOAD',
    behaviour: 'BEHAVIOUR_BANNER',
    data: {
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
        parameters: {
          selector: '.bla-bla'
        }
      }
    ]
  }
]

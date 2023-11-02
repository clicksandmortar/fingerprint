import { Trigger } from '../../client/types'

export const fakeTriggers: Trigger[] = [
  {
    id: 'sample_id',
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
    id: 'sample_id_2',
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
    id: 'sample_id_3',
    invocation: 'INVOCATION_PAGE_LOAD',
    behaviour: 'BEHAVIOUR_BANNER',
    data: {
      buttonText: 'Click me',
      buttonURL: 'http://www.google.com',
      heading: 'This is an BEHAVIOUR_BANNER',
      paragraph: 'on INVOCATION_PAGE_LOAD'
    }
  }
]

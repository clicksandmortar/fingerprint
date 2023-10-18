import React from 'react'
import TriggerInverse from '../behaviours/TriggerInverse'
import { TriggerModal } from '../behaviours/TriggerModal'
import { TriggerYoutube } from '../behaviours/TriggerYoutube'
import { Trigger } from './types'

// @todo refactor where this lives
type TriggerCallback = (
  trigger: Trigger
) => void | JSX.Element | React.ReactPortal

// @todo refactor where this lives
export type Handler = {
  id?: string
  invocation?:
    | 'INVOCATION_UNSPECIFIED'
    | 'INVOCATION_IDLE_TIME'
    | 'INVOCATION_EXIT_INTENT'
    | 'INVOCATION_PAGE_LOAD'
  behaviour?: string
  delay?: number
  invoke?: TriggerCallback
}

export const clientHandlers: Handler[] = [
  {
    id: 'modal_v1',
    behaviour: 'BEHAVIOUR_MODAL',
    invoke: (trigger: Trigger) => <TriggerModal trigger={trigger} />
  },
  {
    id: 'youtube_v1',
    behaviour: 'BEHAVIOUR_YOUTUBE',
    invoke: (trigger: Trigger) => <TriggerYoutube trigger={trigger} />
  },
  {
    id: 'inverse_v1',
    behaviour: 'BEHAVIOUR_INVERSE_FLOW',
    invoke: (trigger: Trigger) => <TriggerInverse trigger={trigger} />
  }
]

import { Trigger } from './types'
import { TriggerModal } from '../behaviours/TriggerModal'
import { TriggerYoutube } from '../behaviours/TriggerYoutube'
import TriggerInverse from '../behaviours/TriggerInverse'
import React from 'react'

// @todo refactor where this lives
type TriggerCallback = (
  trigger: Trigger
) => void | JSX.Element | React.ReactPortal

// @todo refactor where this lives
export type Handler = {
  id?: string
  type?: 'exit' | 'idle' | 'default'
  behaviour?: string
  invoke?: TriggerCallback
}

export const clientHandlers: Handler[] = [
  {
    id: 'modal_v1',
    behaviour: 'modal',
    invoke: (trigger: Trigger) => <TriggerModal trigger={trigger} />
  },
  {
    id: 'youtube_v1',
    behaviour: 'youtube',
    invoke: (trigger: Trigger) => <TriggerYoutube trigger={trigger} />
  },
  {
    id: 'inverse_v1',
    behaviour: 'inverse_flow',
    invoke: (trigger: Trigger) => <TriggerInverse trigger={trigger} />
  }
]

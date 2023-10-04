import React from 'react'
import TriggerInverse from '../behaviours/TriggerInverse'
import { TriggerModal } from '../behaviours/TriggerModal'
import { TriggerYoutube } from '../behaviours/TriggerYoutube'
import { Trigger } from './types'

export const clientHandlers: Trigger[] = [
  {
    id: 'modal_v1',
    // behaviour: 'modal',
    invoke: (trigger: Trigger) => <TriggerModal trigger={trigger} />
  },
  {
    id: 'youtube_v1',
    // behaviour: 'youtube',
    invoke: (trigger: Trigger) => <TriggerYoutube trigger={trigger} />
  },
  {
    id: 'inverse_v1',
    // behaviour: 'inverse_flow',
    invoke: (trigger: Trigger) => <TriggerInverse trigger={trigger} />
  }
]

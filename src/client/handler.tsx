import React from 'react'
import TriggerInverse from '../behaviours/TriggerInverse'
import { TriggerModal } from '../behaviours/TriggerModal'
import { TriggerYoutube } from '../behaviours/TriggerYoutube'
import { APITrigger, Handler, Trigger } from './types'

export type ClientTrigger = Pick<Handler, 'id' | 'invoke'> &
  Pick<APITrigger, 'behaviour'>

export const clientHandlers: ClientTrigger[] = [
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

import React from 'react'
import { TriggerBanner } from '../behaviours/TriggerBanner'
import TriggerInverse from '../behaviours/TriggerInverse'
import { TriggerModal } from '../behaviours/TriggerModal'
import { TriggerYoutube } from '../behaviours/TriggerYoutube'
import { Trigger } from './types'

export type ClientTrigger = Pick<Trigger, 'id' | 'invoke' | 'behaviour'>

export const clientHandlers: ClientTrigger[] = [
  {
    id: 'modal_v1',
    behaviour: 'BEHAVIOUR_MODAL',
    invoke: (trigger: Trigger) => (
      <TriggerModal key={trigger.id} trigger={trigger} />
    )
  },
  {
    id: 'youtube_v1',
    behaviour: 'BEHAVIOUR_YOUTUBE',
    invoke: (trigger: Trigger) => (
      <TriggerYoutube key={trigger.id} trigger={trigger} />
    )
  },
  {
    id: 'inverse_v1',
    behaviour: 'BEHAVIOUR_INVERSE_FLOW',
    invoke: (trigger: Trigger) => (
      <TriggerInverse key={trigger.id} trigger={trigger} />
    )
  },
  {
    id: 'banner_v1',
    behaviour: 'BEHAVIOUR_BANNER',
    invoke: (trigger: Trigger) => (
      <TriggerBanner key={trigger.id} trigger={trigger} />
    )
  }
]

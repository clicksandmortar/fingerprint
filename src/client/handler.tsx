import React from 'react'
import { TriggerBanner } from '../behaviours/Banner/TriggerBanner'
import TriggerInverse from '../behaviours/TriggerInverse'
import { TriggerModal } from '../behaviours/TriggerModal'
import { TriggerYoutube } from '../behaviours/TriggerYoutube'
import { Trigger } from './types'

export type ClientTrigger = Pick<
  Trigger,
  'id' | 'invoke' | 'behaviour' | 'multipleOfSameBehaviourSupported'
>

// a word for "possible to have multiple of the same kind":

export const clientHandlers: ClientTrigger[] = [
  {
    id: 'modal_v1',
    behaviour: 'BEHAVIOUR_MODAL',
    multipleOfSameBehaviourSupported: false,
    invoke: (trigger: Trigger) => (
      <TriggerModal key={trigger.id} trigger={trigger} />
    )
  },
  {
    id: 'youtube_v1',
    behaviour: 'BEHAVIOUR_YOUTUBE',
    multipleOfSameBehaviourSupported: false,
    invoke: (trigger: Trigger) => (
      <TriggerYoutube key={trigger.id} trigger={trigger} />
    )
  },
  {
    id: 'inverse_v1',
    behaviour: 'BEHAVIOUR_INVERSE_FLOW',
    multipleOfSameBehaviourSupported: false,
    invoke: (trigger: Trigger) => (
      <TriggerInverse key={trigger.id} trigger={trigger} />
    )
  },
  {
    id: 'banner_v1',
    behaviour: 'BEHAVIOUR_BANNER',
    multipleOfSameBehaviourSupported: true,
    invoke: (trigger: Trigger) => (
      <TriggerBanner key={trigger.id} trigger={trigger} />
    )
  }
]

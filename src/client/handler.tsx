import React from 'react'
import { BannerTrigger } from '../behaviours/Banner/Banner.types'
import { TriggerBanner } from '../behaviours/Banner/TriggerBanner'
import { isModalDataCaptureModal } from '../behaviours/Modal/helpers'
import DataCaptureModal from '../behaviours/Modal/modals/DataCaptureModal'
import { TriggerModal } from '../behaviours/Modal/TriggerModal'
import TriggerInverse from '../behaviours/TriggerInverse'
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
    invoke: (trigger: Trigger) => {
      // TODO: this should become a separate handler / behaviour in the future?
      if (isModalDataCaptureModal(trigger))
        return <DataCaptureModal key={trigger.id} trigger={trigger} />

      return <TriggerModal key={trigger.id} trigger={trigger} />
    }
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
      <TriggerBanner key={trigger.id} trigger={trigger as BannerTrigger} />
    )
  }
]

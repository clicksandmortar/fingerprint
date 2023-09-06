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

// @todo legacy hangover, remove when using server configured triggers
export const getBrand = (url: string): any => {
  // if url contains tobycarvery.co.uk return Toby Carvery
  if (
    url.includes('tobycarvery.co.uk') ||
    url.includes('localhost:8000') ||
    url.includes('vercel.app')
  ) {
    return {
      name: 'Toby Carvery',
      fontColor: '#ffffff',
      primaryColor: '#8c1f1f',
      overlayColor: 'rgba(96,32,50,0.5)',
      backgroundImage: 'https://d26qevl4nkue45.cloudfront.net/drink-bg.png'
    }
  }

  // if url contains browns-restaurants.co.uk return Browns
  if (url.includes('browns-restaurants.co.uk')) {
    return {
      name: 'Browns',
      fontColor: '#ffffff',
      primaryColor: '#B0A174',
      overlayColor: 'rgba(136, 121, 76, 0.5)',
      backgroundImage: 'https://d26qevl4nkue45.cloudfront.net/cocktail-bg.png'
    }
  }

  // if url contains vintageinn.co.uk return Vintage Inns
  if (url.includes('vintageinn.co.uk')) {
    return {
      name: 'Vintage Inns',
      fontColor: '#ffffff',
      primaryColor: '#B0A174',
      overlayColor: 'rgba(136, 121, 76, 0.5)',
      backgroundImage: 'https://d26qevl4nkue45.cloudfront.net/dessert-bg.png'
    }
  }
}

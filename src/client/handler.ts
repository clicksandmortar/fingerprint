import { CollectorResponse, CollectorUpdate, Trigger } from './types'
import { getCookie, setCookie } from '../utils/cookies'

// Local implementation of collector which does not make a network request
// This is a mock implementation of the collector which returns a CollectorResponse
// based on the data passed in. This is useful for testing the collector without
// having to make a network request.
export const sendEvent = (data: CollectorUpdate): CollectorResponse => {
  console.log('Server received event', data)

  const firstSeen: string = getCookie('firstSeen')
    ? getCookie('firstSeen') || ''
    : setCookie('firstSeen', new Date().toISOString()) || ''

  const lastSeen: string = getCookie('lastSeen')
    ? getCookie('lastSeen') || ''
    : setCookie('lastSeen', new Date().toISOString()) || ''

  // Always update last seen
  setCookie('lastSeen', new Date().toISOString())

  // Get visits from Cookies or set to 0
  const previousVisits: number = getCookie('visits')
    ? parseInt(getCookie('visits') || '0')
    : 0

  const visits: number = previousVisits + 1

  // Always update visits
  setCookie('visits', visits.toString())

  const trigger = getTrigger({
    ...data,
    firstSeen,
    lastSeen,
    visits
  })

  return {
    firstSeen: new Date(firstSeen),
    lastSeen: new Date(lastSeen),
    visits,
    trigger
  }
}

const getTrigger = (data: any): Trigger => {
  const trigger: Trigger = {}
  const context = {
    firstSeen: data.firstSeen,
    lastSeen: data.lastSeen,
    visits: data.visits
  }

  // User lands on any page, with a UTM parameter
  if (data?.referrer?.utm?.campaign) {
    trigger.id = 'utm_campaign'
    trigger.behaviour = 'modal'
    trigger.data = {
      text: 'Welcome, you arrived from campaign: ' + data.referrer.utm.campaign,
      ...context
    }
    return trigger
  }

  // User lands on the homepage, and it's their first visit
  if (data.visits === 1 && data.page.path === '/') {
    trigger.id = 'welcome_on_homepage'
    trigger.behaviour = 'modal'
    trigger.data = {
      text: 'Welcome to the homepage!',
      ...context
    }
    return trigger
  }

  // User lands on the homepage, and it's not their first visit
  if (data.visits > 1 && data.page.path === '/') {
    trigger.id = 'welcome_back_on_homepage'
    trigger.behaviour = 'modal'
    trigger.data = {
      text: 'Welcome back to the homepage!',
      ...context
    }
    return trigger
  }

  // User lands on any page, and it's their first visit
  if (data.visits === 1) {
    trigger.id = 'welcome_any_page'
    trigger.behaviour = 'modal'
    trigger.data = {
      text: 'Welcome to the site!',
      ...context
    }
    return trigger
  }

  // User lands on any page, and it's not their first visit
  if (data.visits > 1) {
    trigger.id = 'welcome_any_page'
    trigger.behaviour = 'modal'
    trigger.data = {
      text: 'Welcome back to the site!',
      ...context
    }
    return trigger
  }

  return trigger
}

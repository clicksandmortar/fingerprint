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

  const trigger = getTrigger(firstSeen, lastSeen, visits)

  return {
    firstSeen: new Date(firstSeen),
    lastSeen: new Date(lastSeen),
    visits,
    trigger
  }
}

const getTrigger = (
  firstSeen: string,
  lastSeen: string,
  visits: number
): { [key: string]: string } => {
  const trigger: Trigger = {}

  if (visits === 1) {
    trigger.behaviour = 'modal'
    trigger.text = 'Welcome to the site!'
  }

  if (visits > 1) {
    const firstSeenDate = new Date(firstSeen)
    const now = new Date()
    const diff = now.getTime() - firstSeenDate.getTime()
    const seconds = Math.floor(diff / 1000)
    if (seconds > 30) {
      trigger.behaviour = 'modal'
      trigger.text = "You've been with us since " + lastSeen
    } else {
      trigger.behaviour = 'modal'
      trigger.text = 'Welcome back to the site! We last saw you on ' + lastSeen
    }
  }

  return trigger
}

import { APITrigger, Trigger } from '../client/types'

// determine whether a trigger object is an APITrigger instance.
// use this to distinguish between APITriggers and manual Handlers
export function isTriggerAnApiTrigger(t: Trigger): t is APITrigger {
  if (!t) return false

  if (typeof t !== 'object') return false
  if (Array.isArray(t)) return false

  if (!('behaviour' in t)) return false
  if (!t.behaviour) return false

  return true
}

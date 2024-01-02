import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { BannerTrigger } from '../../behaviours/Banner/Banner.types'
import { DataCaptureTrigger } from '../../behaviours/Modal/Modal.types'
import { Trigger } from '../../client/types'
import { useLogging } from '../../context/LoggingContext'
import { useMixpanel } from '../../context/MixpanelContext'
import { useVisitor } from '../../context/VisitorContext'
import { deviceInfo } from '../../utils/device'
import { hostname, request } from '../../utils/http'
import { getPagePayload } from '../../utils/page'
import { updateCookie } from '../../visitors/bootstrap'
import { useBrand } from '../useBrandConfig'
import { useCollector } from '../useCollector'
import { useFingerprint } from '../useFingerprint'

export const useSeenMutation = () => {
  const { log, error } = useLogging()
  const { appId } = useFingerprint()
  const { trackEvent } = useMixpanel()
  const { setPageTriggers, setIncompleteTriggers, setConversions } =
    useCollector()

  const { visitor, setVisitor } = useVisitor()
  const brand = useBrand()

  const trackTriggerSeen = React.useCallback(
    (trigger: Trigger) => {
      trackEvent('trigger_displayed', {
        triggerId: trigger.id,
        triggerType: trigger.invocation,
        triggerBehaviour: trigger.behaviour,
        time: new Date().toISOString(),
        brand
      })
    },
    [trackEvent, brand]
  )

  return useMutation<Response, {}, unknown, unknown>(
    (trigger: Trigger) => {
      trackTriggerSeen(trigger)

      return request
        .put(`${hostname}/triggers/${appId}/${visitor.id}/seen`, {
          seenTriggerIDs: [trigger.id],
          visitor,
          page: getPagePayload(),
          device: deviceInfo
        })
        .then((response) => {
          log('Seen mutation: response', response)
          return response
        })
        .catch((err) => {
          error('Seen mutation: error', err)
          return err
        })
    },
    {
      // TODO: merge this and collecor callback into one thing when we no longer require
      // setting intently - thats the only differentiator between the callbacks
      onSuccess: async (res) => {
        const r = await res.json()

        log('Seen mutation: replacing triggers with:', r.pageTriggers)
        setPageTriggers(r.pageTriggers)
        setConversions(r.conversions || [])

        const retrievedUserId = r.identifiers?.main
        if (retrievedUserId) {
          updateCookie(retrievedUserId)
          setVisitor({ id: retrievedUserId })
        }

        log(
          'Seen mutation: replacing incomplete Triggers with:',
          r.incompleteTriggers
        )

        setIncompleteTriggers(r.incompleteTriggers || [])
        return r
      }
    }
  )
}

export const useSeen = ({
  trigger,
  skip
}: {
  trigger: Trigger | BannerTrigger | DataCaptureTrigger
  skip: boolean
}) => {
  const [hasFired, setHasFired] = useState<boolean>(false)

  const { mutate: runSeen, ...mutationRest } = useSeenMutation()

  useEffect(() => {
    if (skip) return
    if (hasFired) return
    if (mutationRest.isSuccess) return
    if (mutationRest.isLoading) return

    // seen gets called multiple times since Collector currently
    // like to over-rerender componets. This timeout prevents from firing a ton
    // even with this, Banner can still re-issue the same request since all components
    // get re-rendered and unlike Modal, Banner gets to stay.
    //  @Ed to deal with at a later point
    const tId = setTimeout(() => {
      runSeen(trigger)
      setHasFired(true)
    }, 500)

    return () => {
      clearTimeout(tId)
    }
  }, [mutationRest, skip, hasFired, runSeen, setHasFired])

  // NOTE: do not export the actual mutation
  // just statuses - to prevent from running multiple times by accident
  return mutationRest
}

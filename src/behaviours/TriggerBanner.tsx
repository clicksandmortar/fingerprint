import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { Trigger } from '../client/types'
import CloseButton from '../components/CloseButton'
import { useMixpanel } from '../context/MixpanelContext'
import { useCollector } from '../hooks/useCollector'
import useCountdown from '../hooks/useCountdown'
import { getInterpolate } from '../hooks/useInterpolate'
import { useSeenMutation } from '../hooks/useSeenMutation'
import { getBrand } from '../utils/brand'

type Props = {
  trigger: Trigger
}

const resetPad = () => {
  document.body.style.paddingTop = 'inherit'
}

const Banner = ({ trigger }: Props) => {
  const container = useRef<null | HTMLDivElement>(null)

  const { removeActiveTrigger } = useCollector()
  const { trackEvent } = useMixpanel()
  const [open, setOpen] = useState(true)

  const [hasFired, setHasFired] = useState(false)

  const brand = React.useMemo(() => {
    return getBrand()
  }, [])

  const { mutate: runSeen, isSuccess, isLoading } = useSeenMutation()

  // @Todo: @Ed - extract into a reusable piece, or move the logic to TriggerComponent
  useEffect(() => {
    if (!open) return
    if (hasFired) return
    if (isSuccess) return
    if (isLoading) return

    // seen gets called multiple times since Collector currently
    // like to over-rerender componets. This timeout prevents from firing a ton
    // even with this, Banner can still re-issue the same request since all components
    // get re-rendered and unlike Modal, Banner gets to stay.
    //  @Ed to deal with at a later point
    const tId = setTimeout(() => {
      runSeen(trigger)
    }, 500)

    trackEvent('trigger_displayed', {
      triggerId: trigger.id,
      triggerType: trigger.invocation,
      triggerBehaviour: trigger.behaviour,
      time: new Date().toISOString(),
      brand
    })
    setHasFired(true)
    return () => {
      clearTimeout(tId)
    }
  }, [open, isSuccess, isLoading])

  const canBeDismissed = true

  const handleClickCallToAction = (e: any) => {
    e.preventDefault()
    trackEvent('user_clicked_button', trigger)
    trigger?.data?.buttonURL && window.open(trigger?.data?.buttonURL, '_blank')
    // if they navigated to the other page, makes sense to hide it
    setOpen(false)
    resetPad()
  }

  const handleClose = () => {
    trackEvent('user_closed_trigger', trigger)
    removeActiveTrigger(trigger.id)
    setOpen(false)
    resetPad()
  }

  const { formattedCountdown } = useCountdown({
    onZero: handleClose,
    initialTimestamp: new Date(trigger.data?.countdownEndTime || ''),
    interpolate: {
      text: trigger.data?.marketingText,
      structure: trigger.data as Record<string, unknown>
    }
  })

  const interpolate = React.useMemo(
    () => getInterpolate(trigger.data || {}),
    [trigger.data]
  )

  useEffect(() => {
    const bannerHeight = container.current?.clientHeight
    document.body.style.paddingTop = `${bannerHeight}px`

    return resetPad
  }, [container, formattedCountdown])

  if (!open) return null

  // temporary solution. Takes a few cycles for the countdown to kick in,
  // we dont want to show an empty div in its place
  if (!formattedCountdown) return null

  return (
    // @TODO: convert to CSS?
    // TODO: colors are hardcoded for now. check this Draft PR before changing the colors here
    // https://github.com/clicksandmortar/fingerprint/pull/64
    <div
      ref={container}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background:
          'linear-gradient(90deg, rgba(200,41,223,1) 0%, #1f62ff 100%)',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        <p
          style={{
            lineHeight: '30px',
            margin: '10px',
            color: 'white',
            fontWeight: 600
          }}
        >
          {formattedCountdown}
        </p>

        <button
          onClick={handleClickCallToAction}
          style={{
            border: 'none',
            color: 'white',
            backgroundColor: '#EA3385',
            padding: '5px 10px',
            margin: '10px 0',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {interpolate(trigger.data?.buttonText || '')}
        </button>
      </div>
      {canBeDismissed && (
        <CloseButton
          onClick={handleClose}
          style={{ background: 'transparent', color: 'white' }}
        />
      )}
    </div>
  )
}

export const TriggerBanner = ({ trigger }: Props) => {
  return ReactDOM.createPortal(<Banner trigger={trigger} />, document.body)
}

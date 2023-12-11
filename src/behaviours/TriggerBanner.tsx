import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { Trigger } from '../client/types'
import CloseButton from '../components/CloseButton'
import { useMixpanel } from '../context/MixpanelContext'
import { useCollector } from '../hooks/useCollector'
import useCountdown from '../hooks/useCountdown'
import { getInterpolate } from '../hooks/useInterpolate'
import { useSeenMutation } from '../hooks/useSeenMutation'

type Position = 'top' | 'bottom' | 'left' | 'right'

type Props = {
  trigger: Trigger
}

const resetPad = () => {
  document.body.style.paddingTop = 'inherit'
}

const getBannerStylesByPosition = ({
  position,
  element: { width, height }
}: {
  position: Position
  element: { width: number; height: number }
}) => {
  const offset = 0.5 * width + 0.5 * height

  const mutualStyles: React.CSSProperties = {
    fontFamily: 'sans-serif',
    position: 'fixed',
    padding: '5px',
    background: 'linear-gradient(90deg, rgba(200,41,223,1) 0%, #1f62ff 100%)',
    display: 'flex',
    alignItems: 'center'
  }

  switch (position) {
    case 'left':
      return {
        ...mutualStyles,
        translate: `0 -${offset}px`,
        rotate: '90deg',
        transformOrigin: '0% 50%',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        borderRadius: '10px 10px 0 0'
      }
    case 'right':
      return {
        ...mutualStyles,
        translate: `0 -${offset}px`,
        rotate: '270deg',
        transformOrigin: '100% 50%',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        borderRadius: '10px 10px 0 0'
      }
    case 'top':
    case 'bottom':
      return {
        ...mutualStyles,
        [position]: 0,
        left: 0,
        width: '100%'
      }
  }
}
const canBeDismissed = true

const Banner = ({ trigger }: Props) => {
  // const position = trigger.data?.position as Position
  const { removeActiveTrigger } = useCollector()
  const { trackEvent } = useMixpanel()
  const [open, setOpen] = useState(true)

  const [hasFired, setHasFired] = useState(false)

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

    setHasFired(true)
    return () => {
      clearTimeout(tId)
    }
  }, [open, isSuccess, isLoading])

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

  const position = trigger.data?.position as Position

  const container = useRef<null | HTMLDivElement>(null)

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

  // temporary solution. Takes a few cycles for the countdown to kick in,
  // we dont want to show an empty div in its place
  if (!formattedCountdown) return null

  useEffect(() => {
    const bannerHeight = container.current?.clientHeight

    if (position === 'top') {
      document.body.style.paddingTop = `${bannerHeight}px`
    } else if (position === 'bottom') {
      document.body.style.paddingBottom = `${bannerHeight}px`
    }

    return resetPad
  }, [container, formattedCountdown])

  if (!open) return null

  // since the rotation position is pivoting around a corner, we need to calculate
  // the width of the container and then use that to offset the translate slightly to center it properly

  const containerStyles = getBannerStylesByPosition({
    position,
    element: {
      width: container.current?.clientWidth || 0,
      height: container.current?.clientHeight || 0
    }
  })

  return (
    <div ref={container} style={containerStyles}>
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
            margin: '0px 10px',
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
            margin: '0px 10px',
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
          style={{ background: 'transparent', color: 'white', margin: 0 }}
        />
      )}
    </div>
  )
}

export const TriggerBanner = ({ trigger }: Props) => {
  return ReactDOM.createPortal(<Banner trigger={trigger} />, document.body)
}

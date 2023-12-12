import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Trigger } from '../../client/types'
import CloseButton from '../../components/CloseButton'
import { Icon } from '../../components/Icon/Icon'
import { IconName } from '../../components/Icon/Icon.types'
import { useMixpanel } from '../../context/MixpanelContext'
import { useBrandColors } from '../../hooks/useBrandConfig'
import { useCollector } from '../../hooks/useCollector'
import useCountdown from '../../hooks/useCountdown'
import { getInterpolate } from '../../hooks/useInterpolate'
import { useSeenMutation } from '../../hooks/useSeenMutation'
import { Position, resetPad, useBannerContainerStyles } from './utils'

type Props = {
  trigger: Trigger
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

  const containerStyles = useBannerContainerStyles({
    position,
    element: {
      width: container.current?.clientWidth || 0,
      height: container.current?.clientHeight || 0
    }
  })
  const { backgroundPrimaryDimmed, textPrimary } = useBrandColors()

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
        {!!trigger.data?.icon && (
          <Icon icon={trigger.data.icon as IconName} size='20' />
        )}

        <span
          style={{
            lineHeight: '1.2rem',
            margin: '0px 10px',
            color: textPrimary,
            fontWeight: 400,
            fontSize: '1rem'
          }}
        >
          {formattedCountdown}
        </span>

        <button
          onClick={handleClickCallToAction}
          style={{
            border: 'none',
            color: textPrimary,
            backgroundColor: backgroundPrimaryDimmed,
            padding: '5px 10px',
            margin: '0px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          {interpolate(trigger.data?.buttonText || '')}
        </button>
      </div>
      {canBeDismissed && (
        <CloseButton
          onClick={handleClose}
          style={{ background: 'transparent', color: textPrimary, margin: 0 }}
        />
      )}
    </div>
  )
}

export const TriggerBanner = ({ trigger }: Props) => {
  return ReactDOM.createPortal(<Banner trigger={trigger} />, document.body)
}

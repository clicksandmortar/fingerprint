import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useSeenMutation } from '../../hooks/api/useSeenMutation'
import { useCollector } from '../../hooks/useCollector'
import { useTracking } from '../../hooks/useTracking'
import { BannerTrigger } from './Banner.types'
import HorizontalBanner from './Components/HorizontalBanner'
import SideBanner from './Components/SideBanner'
import { Position, resetPad } from './utils'

const Banner = ({ trigger }: { trigger: BannerTrigger }) => {
  const { removeActiveTrigger } = useCollector()
  const { trackEvent } = useTracking()
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

  if (!open) return null

  const handleClickCallToAction = (e: any) => {
    e.preventDefault()
    trackEvent('user_clicked_button', trigger)
    trigger?.data?.buttonURL && window.open(trigger?.data?.buttonURL, '_blank')
    // if they navigated to the other page, makes sense to hide it
    setOpen(false)
    resetPad()
  }

  const handleClose = (e?: any) => {
    e?.stopPropagation()
    trackEvent('user_closed_trigger', trigger)
    removeActiveTrigger(trigger.id)
    setOpen(false)
    resetPad()
  }

  const props = {
    handleClose: handleClose,
    handleAction: handleClickCallToAction,
    trigger: trigger
  }

  const position = trigger.data?.position as Position

  if (position === 'left' || position === 'right')
    return <SideBanner {...props} />

  return <HorizontalBanner {...props} />
}

export const TriggerBanner = ({ trigger }: { trigger: BannerTrigger }) => {
  return ReactDOM.createPortal(<Banner trigger={trigger} />, document.body)
}

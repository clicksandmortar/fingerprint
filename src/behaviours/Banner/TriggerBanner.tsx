import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useEntireStore } from '../../beautifulSugar/store'
import { useSeen } from '../../hooks/api/useSeenMutation'
import { useTracking } from '../../hooks/useTracking'
import { BannerTrigger } from './Banner.types'
import HorizontalBanner from './Components/HorizontalBanner'
import SideBanner from './Components/SideBanner'
import { Position, resetPad } from './utils'

const Banner = ({ trigger }: { trigger: BannerTrigger }) => {
  const { removeActiveTrigger } = useEntireStore()
  const { trackEvent } = useTracking()
  const [open, setOpen] = useState(true)

  useSeen({ trigger, skip: !open })

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

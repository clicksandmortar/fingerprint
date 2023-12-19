import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Trigger } from '../../client/types'
import { useMixpanel } from '../../context/MixpanelContext'
import { useCollectorMutation } from '../../hooks/api/useCollectorMutation'
import { useSeenMutation } from '../../hooks/api/useSeenMutation'
import { useCollector } from '../../hooks/useCollector'
import { HandleCloseOptions } from './Modal.types'
import CnMModal from './modals/StandardModal'

type Props = {
  trigger: Trigger
}

const Modal = ({ trigger }: Props) => {
  const { removeActiveTrigger } = useCollector()
  const { trackEvent } = useMixpanel()
  const [open, setOpen] = useState(true)
  const [invocationTimeStamp, setInvocationTimeStamp] = useState<null | string>(
    null
  )

  const { mutate: collect } = useCollectorMutation()

  const { mutate: runSeen, isSuccess, isLoading } = useSeenMutation()

  useEffect(() => {
    if (!open) return
    if (invocationTimeStamp) return
    if (isSuccess) return
    if (isLoading) return

    // seen gets called multiple times since Collector currently
    // like to over-rerender componets. This timeout prevents from firing a ton
    const tId = setTimeout(() => {
      runSeen(trigger)
      if (!invocationTimeStamp) {
        setInvocationTimeStamp(new Date().toISOString())
      }
    }, 500)

    return () => {
      clearTimeout(tId)
    }
  }, [open, isSuccess, isLoading])

  if (!open) {
    return null
  }

  const handleCloseModal = (options?: HandleCloseOptions) => {
    // collect({
    //   exit: {
    //     variantID: trigger.id,
    //     shownAt: invocationTimeStamp || ''
    //   }
    // })
    removeActiveTrigger(trigger.id)
    setOpen(false)

    if (options?.skipTrackingEvent) return

    trackEvent('user_closed_trigger', trigger)
  }

  const handleClickCallToAction = (e: any) => {
    e.preventDefault()
    collect({
      cta: {
        variantID: trigger.id,
        shownAt: invocationTimeStamp || new Date().toISOString()
      }
    })
    trackEvent('user_clicked_button', trigger)
    trigger?.data?.buttonURL && window.open(trigger?.data?.buttonURL, '_self')
  }

  const modalProps = {
    trigger: trigger,
    handleClickCallToAction: handleClickCallToAction,
    handleCloseModal: handleCloseModal
  }

  return <CnMModal {...modalProps} />
}

export const TriggerModal = ({ trigger }: Props) => {
  return ReactDOM.createPortal(<Modal trigger={trigger} />, document.body)
}

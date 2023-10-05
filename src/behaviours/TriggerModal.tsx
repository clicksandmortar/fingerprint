import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Trigger } from '../client/types'
import { BrownsModal } from '../components/hardcoded-modals/browns'
import StonehouseModal from '../components/hardcoded-modals/stonehouse'
import { useLogging } from '../context/LoggingContext'
import { useVisitor } from '../context/VisitorContext'
import { useCollector } from '../hooks/useCollector'
import { useFingerprint } from '../hooks/useFingerprint'
import { getBrand } from '../utils/hack_getBrand'
import { hostname, request } from '../utils/http'

type Props = {
  trigger: Trigger
}

const Modal = ({ trigger }: Props) => {
  const { log, error } = useLogging()
  const { resetDisplayTrigger, trackEvent } = useCollector()
  const { appId } = useFingerprint()
  const { visitor } = useVisitor()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (!open) return

    try {
      request
        .put(`${hostname}/triggers/${appId}/${visitor.id}/seen`, {
          seenTriggerIDs: [trigger.id]
        })
        .then(log)
    } catch (e) {
      error(e)
    }

    trackEvent('trigger_displayed', {
      triggerId: trigger.id,
      triggerType: trigger.invocation,
      triggerBehaviour: trigger.behaviour
    })
  }, [])

  const brand = React.useMemo(() => {
    return getBrand()
  }, [])

  if (!open) {
    return null
  }

  const handleClickCallToAction = (e: any) => {
    e.preventDefault()
    trackEvent('user_clicked_button', trigger)
    trigger?.data?.buttonURL && window.open(trigger?.data?.buttonURL, '_self')
  }

  const handleCloseModal = () => {
    trackEvent('user_closed_trigger', trigger)
    resetDisplayTrigger()
    setOpen(false)
  }

  if (brand === 'Stonehouse')
    return (
      <StonehouseModal
        trigger={trigger}
        handleClickCallToAction={handleClickCallToAction}
        handleCloseModal={handleCloseModal}
      />
    )
  if (brand === 'Browns')
    return (
      <BrownsModal
        trigger={trigger}
        handleClickCallToAction={handleClickCallToAction}
        handleCloseModal={handleCloseModal}
      />
    )

  return null
}

export const TriggerModal = ({ trigger }: Props) => {
  return ReactDOM.createPortal(<Modal trigger={trigger} />, document.body)
}

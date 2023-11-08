import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Trigger } from '../client/types'
import CnMStandardModal from '../components/modals/StandardModal'
import { BrownsModal } from '../components/modals/browns'
import StonehouseModal from '../components/modals/stonehouse'
import { useMixpanel } from '../context/MixpanelContext'
import { useCollector } from '../hooks/useCollector'
import useOnTriggerActivation from '../hooks/useOnTriggerActivation'
import { getBrand } from '../utils/brand'

type Props = {
  trigger: Trigger
}

const Modal = ({ trigger }: Props) => {
  const { removeActiveTrigger } = useCollector()
  const { trackEvent } = useMixpanel()
  const [open, setOpen] = useState(true)
  const [hasFired, setHasFired] = useState(false)

  const brand = React.useMemo(() => {
    return getBrand()
  }, [])

  const onActivation = useOnTriggerActivation(trigger)
  useEffect(() => {
    if (!open) return
    if (hasFired) return

    onActivation()
    setHasFired(true)
  }, [open, hasFired, setHasFired, onActivation])

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
    removeActiveTrigger(trigger.id)
    setOpen(false)
  }

  if (brand === 'C&M')
    return (
      <CnMStandardModal
        trigger={trigger}
        handleClickCallToAction={handleClickCallToAction}
        handleCloseModal={handleCloseModal}
      />
    )
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

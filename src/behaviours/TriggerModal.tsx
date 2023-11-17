import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import ReactDOM from 'react-dom'
import { Trigger } from '../client/types'
import FullyClickableModal from '../components/modals/FullyClickableModal'
import CnMStandardModal from '../components/modals/StandardModal'
import { BrownsModal } from '../components/modals/browns'
import StonehouseModal from '../components/modals/stonehouse'
import { useBrand } from '../context/Config'
import { useMixpanel } from '../context/MixpanelContext'
import { useCollector } from '../hooks/useCollector'
import { useSeenMutation } from '../hooks/useSeenMutation'

type Props = {
  trigger: Trigger
}

const Modal = ({ trigger }: Props) => {
  const { removeActiveTrigger } = useCollector()
  const { trackEvent } = useMixpanel()
  const [open, setOpen] = useState(true)
  const [hasFired, setHasFired] = useState(false)

  const brand = useBrand()
  const { mutate: runSeen, isSuccess, isLoading } = useSeenMutation()

  useEffect(() => {
    if (!open) return
    if (hasFired) return
    if (isSuccess) return
    if (isLoading) return

    // seen gets called multiple times since Collector currently
    // like to over-rerender componets. This timeout prevents from firing a ton
    const tId = setTimeout(() => {
      runSeen(trigger)
      setHasFired(true)
    }, 1500)

    return () => {
      clearTimeout(tId)
    }
  }, [open, isSuccess, isLoading])

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

  const modalProps = {
    trigger: trigger,
    handleClickCallToAction: handleClickCallToAction,
    handleCloseModal: handleCloseModal
  }

  switch (brand) {
    // NOTE: these are just temp for go-live, soon we will combine all of these into one modal
    // with support for all underlying behaviours + potential scale config
    case 'Ember': {
      // /tablebooking > Christmas + BOOK NOW
      let image = isMobile
        ? 'https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-booknow-m.jpg'
        : 'https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-booknow.jpg'

      // /nationalsearch > Christmas + FIND OUT MORE
      if (window.location.href.includes('nationalsearch'))
        image = isMobile
          ? `https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-findoutmore-m.jpg`
          : `https://cdn.fingerprint.host/assets/ember/emb-2023-intentlyscreen-christmas-findoutmore.jpg`

      const style = isMobile
        ? { height: 1000, width: 640 } // 1.56x
        : { width: 813, height: 490 } // original image is { width: 1381, height: 828 }, scaled down to 490w
      return (
        <FullyClickableModal {...modalProps} style={style} imageURL={image} />
      )
    }
    case 'Sizzling': {
      // Find A Pub  > Christmas  + BOOK NOW
      let image = isMobile
        ? `https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-booknow-m.jpg`
        : `https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-booknow.jpg`

      // Sign Up  > Christmas  + FIND OUT MORE
      if (window.location.href.includes('signup'))
        image = isMobile
          ? `https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-findoutmore-m.jpg`
          : `https://cdn.fingerprint.host/assets/sizzling/siz-2023-intentlyscreen-christmas-findoutmore.jpg`

      const style = isMobile
        ? { height: 1000, width: 640 } // 1.56x
        : { width: 819, height: 490 } // original image is { width: 1246, height: 747 }, scaled down to 490w
      return (
        <FullyClickableModal {...modalProps} style={style} imageURL={image} />
      )
    }
    case 'Stonehouse':
      return <StonehouseModal {...modalProps} />
    case 'Browns':
      return <BrownsModal {...modalProps} />
    case 'C&M':
    default:
      return <CnMStandardModal {...modalProps} />
  }
}

export const TriggerModal = ({ trigger }: Props) => {
  return ReactDOM.createPortal(<Modal trigger={trigger} />, document.body)
}

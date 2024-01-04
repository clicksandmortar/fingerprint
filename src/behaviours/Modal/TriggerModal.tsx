import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import ReactDOM from 'react-dom'
import { useEntireStore } from '../../beautifulSugar/store'
import { Trigger } from '../../client/types'
import { useCollectorMutation } from '../../hooks/api/useCollectorMutation'
import { useBrand } from '../../hooks/useBrandConfig'
import { useTracking } from '../../hooks/useTracking'
import { HandleCloseOptions } from './Modal.types'
import { BrownsModal } from './modals/browns'
import CnMStandardModal from './modals/StandardModal'
import StonehouseModal from './modals/stonehouse'

type Props = {
  trigger: Trigger
}

const Modal = ({ trigger }: Props) => {
  const { removeActiveTrigger } = useEntireStore()
  const { trackEvent } = useTracking()
  const [open, setOpen] = useState(true)
  const [invocationTimeStamp, setInvocationTimeStamp] = useState<null | string>(
    null
  )

  const { mutate: collect } = useCollectorMutation()

  const brand = useBrand()

  useEffect(() => {
    if (!!invocationTimeStamp) return

    const tId = setTimeout(() => {
      if (!invocationTimeStamp) {
        setInvocationTimeStamp(new Date().toISOString())
      }
    }, 500)

    return () => {
      clearTimeout(tId)
    }
  }, [invocationTimeStamp])

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

      return (
        <CnMStandardModal
          {...modalProps}
          trigger={{
            ...trigger,
            // override.... because branding.
            data: {
              ...trigger.data,
              backgroundURL: image
            }
          }}
        />
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

      return (
        <CnMStandardModal
          {...modalProps}
          trigger={{
            ...trigger,
            // override.... because branding.
            data: { ...trigger.data, backgroundURL: image }
          }}
        />
      )
    }
    // we can soon phase out these 2 brand specific ones
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

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { Trigger } from '../client/types'
import CloseButton from '../components/CloseButton'
import { useMixpanel } from '../context/MixpanelContext'
import { useCollector } from '../hooks/useCollector'

type Props = {
  trigger: Trigger
}

const bannerHeight = 50

const Banner = ({ trigger }: Props) => {
  // const { log, error } = useLogging()
  const { resetDisplayTrigger } = useCollector()
  const { trackEvent } = useMixpanel()
  // const { appId } = useFingerprint()
  // const { visitor } = useVisitor()
  const [open, setOpen] = useState(true)

  const resetPad = () => {
    document.body.style.paddingTop = 'inherit'
  }

  useEffect(() => {
    document.body.style.paddingTop = `${bannerHeight}px`

    return resetPad
  }, [])

  const canBeDismissed = true

  const handleClickCallToAction = (e: any) => {
    e.preventDefault()
    trackEvent('user_clicked_button', trigger)
    trigger?.data?.buttonURL && window.open(trigger?.data?.buttonURL, '_self')
  }

  const handleClose = () => {
    trackEvent('user_closed_trigger', trigger)
    resetDisplayTrigger()
    setOpen(false)
    resetPad()
  }

  if (!open) return null

  return (
    // @TODO: convert to CSS?
    // TODO: colors are hardcoded for now. check this Draft PR before changing the colors here
    // https://github.com/clicksandmortar/fingerprint/pull/64
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: `${bannerHeight}px`,
        backgroundColor: '#6811B2',
        display: 'flex'
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        <div>
          <p
            style={{
              margin: '10px 0 0 0',
              lineHeight: '12px',
              color: 'white',
              fontWeight: 600
            }}
          >
            {trigger.data?.heading}
          </p>
          {trigger.data?.paragraph && (
            <p
              style={{
                margin: '10px 0',
                color: 'white',
                fontSize: 12,
                fontWeight: 400
              }}
            >
              {trigger.data?.paragraph}
            </p>
          )}
        </div>
        <button
          onClick={handleClickCallToAction}
          style={{
            color: 'white',
            backgroundColor: '#EA3385',
            padding: '5px 10px',
            height: '30px',
            margin: '10px 0',
            borderRadius: '5px'
          }}
        >
          {trigger.data?.buttonText}
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

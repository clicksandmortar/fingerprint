import React, { useState } from 'react'
import { Trigger } from '../client/types'
import ReactDOM from 'react-dom'

type Props = {
  trigger: Trigger
}

const Youtube = ({ trigger }: Props) => {
  const [open, setOpen] = useState(true)

  if (!open) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999
      }}
    >
      <div
        style={{
          background:
            "#fff url('" +
            trigger?.brand?.backgroundImage +
            "') no-repeat center center",
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          backgroundColor: '#fff',
          borderRadius: '0.5rem',
          padding: 0,
          boxShadow: '0 0 1rem rgba(0,0,0,0.5)',
          border: '3px solid white',
          zIndex: 9999
        }}
      >
        {/** Overlay div with semi transparent background */}
        <div
          style={{
            backgroundColor: trigger?.brand?.overlayColor,
            maxWidth: '600px',
            padding: '2rem',
            borderRadius: '0.5rem'
          }}
        >
          {/** Close button */}
          <button
            onClick={() => {
              setOpen(false)
            }}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              fontSize: '2rem',
              backgroundColor: trigger?.brand?.fontColor,
              color: trigger?.brand?.primaryColor,
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0 1rem'
            }}
          >
            &times;
          </button>
          <iframe
            src={trigger?.data?.url}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            style={{ width: '500px', height: '260px', marginTop: '1rem' }}
          />
        </div>
      </div>
    </div>
  )
}

export const TriggerYoutube = ({ trigger }: Props): React.ReactPortal => {
  return ReactDOM.createPortal(<Youtube trigger={trigger} />, document.body)
}

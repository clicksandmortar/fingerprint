import React, { useState } from 'react'
import { Trigger } from '../client/types'
import ReactDOM from 'react-dom'

type Props = {
  trigger: Trigger
}

const Modal = ({ trigger }: Props) => {
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
          <h1
            style={{
              textAlign: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
              marginTop: '1rem',
              color: trigger?.brand?.fontColor,
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            {trigger?.data?.text}
          </h1>
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.5rem',
              color: trigger?.brand?.fontColor,
              fontWeight: 500,
              marginTop: '1rem',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            {trigger?.data?.message}
          </p>
          <div style={{ padding: '2rem 2rem 1rem' }}>
            <button
              onClick={() => {
                trigger?.data?.url
                  ? window.open(trigger?.data?.url)
                  : setOpen(false)
              }}
              style={{
                display: 'block',
                color: trigger?.brand?.primaryColor,
                backgroundColor: trigger?.brand?.fontColor,
                fontSize: '1.5rem',
                width: '100%',
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {trigger?.data?.button}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const TriggerModal = ({ trigger }: Props) => {
  return ReactDOM.createPortal(<Modal trigger={trigger} />, document.body)
}

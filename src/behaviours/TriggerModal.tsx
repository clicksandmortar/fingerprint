import React from 'react'
import { Trigger } from '../client/types'
import ReactDOM from 'react-dom'

type Props = {
  trigger: Trigger
}

export const TriggerModal = ({ trigger }: Props) => {
  return ReactDOM.createPortal(
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
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '0.5rem',
          boxShadow: '0 0 1rem rgba(0,0,0,0.5)',
          zIndex: 9999
        }}
      >
        <h1>{trigger.text}</h1>
      </div>
    </div>,
    document.body
  )
}

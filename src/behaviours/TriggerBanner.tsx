import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Trigger } from '../client/types'

type Props = {
  trigger: Trigger
}

const Banner = ({ trigger }: Props) => {
  console.log(trigger)

  useEffect(() => {
    document.body.style.paddingTop = '50px'

    return () => {
      document.body.style.paddingTop = 'inherit'
    }
  }, [])

  return (
    // full width banner fixed to the top of the screen
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '50px',
        backgroundColor: '#6811B2'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        <p
          style={{
            lineHeight: '30px',
            margin: '10px 0',
            color: 'white',
            fontWeight: 600
          }}
        >
          ❗️ Check out our latest Black Friday Offers. Gift cards. Money off
          food. Good stuff 💪
        </p>
        <a
          href='#'
          style={{
            color: 'white',
            backgroundColor: '#EA3385',
            padding: '5px 10px',
            height: '30px',
            margin: '10px 0',
            borderRadius: '5px'
          }}
        >
          Shop Now
        </a>
      </div>
    </div>
  )
}

export const TriggerBanner = ({ trigger }: Props) => {
  return ReactDOM.createPortal(<Banner trigger={trigger} />, document.body)
}

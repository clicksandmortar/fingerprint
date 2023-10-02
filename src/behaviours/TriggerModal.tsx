import React, { useEffect, useMemo, useState } from 'react'
import { Trigger } from '../client/types'
import ReactDOM from 'react-dom'
import { useCollector } from '../hooks/useCollector'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  trigger: Trigger
}

const CurlyText = ({ randomHash, text }: { randomHash: string; text: any }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      version='1.1'
      viewBox='0 0 500 500'
      className={randomHash + '-curlyText'}
    >
      <defs>
        <path id='textPath' d='M 0 500 A 175,100 0 0 1 500,500' />
      </defs>
      <text x='0' y='0' textAnchor='middle'>
        <textPath xlinkHref='#textPath' fill='white' startOffset='50%'>
          {text}
        </textPath>
      </text>
    </svg>
  )
}

const Modal = ({ trigger }: Props) => {
  const { resetDisplayTrigger, trackEvent } = useCollector()
  const [open, setOpen] = useState(true)
  const [stylesLoaded, setStylesLoaded] = useState(false)

  const closeModal = () => {
    trackEvent('user_closed_trigger', trigger)
    resetDisplayTrigger()
    setOpen(false)
  }

  const redirectUser = (e: any) => {
    e.preventDefault()
    trackEvent('user_clicked_button', trigger)
    trigger?.data?.buttonURL && window.open(trigger?.data?.buttonURL, '_self')
  }

  const randomHash = useMemo(() => {
    return uuidv4().split('-')[0]
  }, [])

  useEffect(() => {
    const css =
      `
      @import url("https://p.typekit.net/p.css?s=1&k=olr0pvp&ht=tk&f=25136&a=50913812&app=typekit&e=css");

@font-face {
  font-family: "proxima-nova";
  src: url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"), url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"), url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 500;
  font-stretch: normal;
}

:root {
  --primary: #b6833f;
  --secondary: white;
  --text-shadow: 1px 1px 10px rgba(0,0,0,1);
}

.tk-proxima-nova {
  font-family: "proxima-nova", sans-serif;
}

.` +
      randomHash +
      `overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "proxima-nova", sans-serif !important;
  font-weight: 500;
  font-style: normal;
}

.` +
      randomHash +
      `modal {
  width: 80%;
  max-width: 400px;
  height: 500px;
  overflow: hidden;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
}

@media screen and (min-width: 768px) {
  .modal {
    width: 50%;
    max-width: 600px;
  }
}

.` +
      randomHash +
      `modalImage {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}


@media screen and (max-width:768px) {
  .modal {
    width: 100vw;
  }
}


.` +
      randomHash +
      `curlyText {
  font-family: "proxima-nova", sans-serif;
  font-weight: 500;
  font-style: normal;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 2pt;
  fill: var(--secondary);
  text-shadow: var(--text-shadow);
  margin-top: -150px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.` +
      randomHash +
      `curlyText text {
  font-size: 1.3rem;
}


.` +
      randomHash +
      `mainText {
  font-weight: 200;
  font-family: "proxima-nova", sans-serif;
  color: var(--secondary);
  font-size: 2.1rem;
  text-shadow: var(--text-shadow);
  display: inline-block;
  text-align: center;
  margin-top: -4.5rem;
}


@media screen and (min-width: 768px) {
  .curlyText {
    margin-top: -200px;
  }
}

@media screen and (min-width: 1024px) {
  .curlyText {
    margin-top: -200px;
  }

  .mainText {
    font-size: 2.4rem;
  }
}

@media screen and (min-width: 1150px) {
  .mainText {
    font-size: 2.7rem;
  }
}

.` +
      randomHash +
      `cta {
  font-family: "proxima-nova", sans-serif;
  cursor: pointer;
  background-color: var(--secondary);
  padding: 0.75rem 3rem;
  border-radius: 8px;
  display: block;
  font-size: 1.3rem;
  color: var(--primary);
  text-align: center;
  text-transform: uppercase;
  max-width: 400px;
  margin: 0 auto;
  text-decoration: none;
}

.` +
      randomHash +
      `cta:hover {
  transition: all 0.3s;
  filter: brightness(0.95);
}

.` +
      randomHash +
      `close-button {
  border-radius: 100%;
  background-color: var(--secondary);
  width: 2rem;
  height: 2rem;
  position: absolute;
  margin: 10px;
  top: 0px;
  right: 0px;
  color: black;
  font-size: 1.2rem;
  font-weight: 300;
  cursor: pointer;
}

.` +
      randomHash +
      `button-container {
  flex: 1;
  display: grid;
  place-content: center;
}

.` +
      randomHash +
      `image-darken {
  background: rgba(0,0,0,0.2);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}
    `
    const styles = document.createElement('style')
    styles.type = 'text/css'
    styles.appendChild(document.createTextNode(css))
    document.head.appendChild(styles)
    setStylesLoaded(true)
  })

  if (!stylesLoaded) {
    return null
  }

  if (!open) {
    return null
  }

  return (
    <div className={randomHash + '-overlay'}>
      <div
        className={randomHash + '-modal'}
        style={{
          background: `url(${trigger?.data?.backgroundURL})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative',
          height: 500
        }}
      >
        <div className={randomHash + '-image-darken'}>
          <button className={randomHash + '-close-button'} onClick={closeModal}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
            >
              <path
                fill='#000'
                fillRule='evenodd'
                d='M8.707 8l3.647-3.646a.5.5 0 0 0-.708-.708L8 7.293 4.354 3.646a.5.5 0 1 0-.708.708L7.293 8l-3.647 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8z'
              />
            </svg>
          </button>

          <CurlyText text={trigger?.data?.heading} randomHash={randomHash} />

          <div style={{ flex: 1 }} className={randomHash + '--spacer'} />
          <div
            style={{
              flex: 1,
              marginTop: -150,
              textTransform: 'uppercase',
              textAlign: 'center',
              letterSpacing: '2pt'
            }}
          >
            <span className={randomHash + '-mainText'}>
              {trigger?.data?.paragraph}
            </span>
          </div>
          <div className={randomHash + '-buttonContainer'}>
            <a
              href={trigger?.data?.buttonURL}
              className={randomHash + '-cta'}
              onClick={(e) => redirectUser(e)}
            >
              {trigger?.data?.buttonText}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export const TriggerModal = ({ trigger }: Props) => {
  return ReactDOM.createPortal(<Modal trigger={trigger} />, document.body)
}

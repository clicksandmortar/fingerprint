// @todo: Kill this with fire 🔥
import React, { useEffect, useState } from 'react'
import { Trigger } from '../../../client/types'
import { useFingerprint } from '../../../hooks/useFingerprint'
import FullyClickableModal from '../FullyClickableModal'
import {
  ButtonPosition,
  ModalSize,
  getIsModalFullyClickable,
  getModalButtonFlexPosition,
  getModalButtonStylesBySize,
  getModalStylesBySize,
  prependClass
} from './helpers'

type Props = {
  trigger: Trigger
  handleClickCallToAction: (e: any) => void
  handleCloseModal: (e: any) => void
}

const defaultElementSize: ModalSize = 'medium'
const defaultButtonPosition: ButtonPosition = 'right'

const BasicModal = ({
  trigger,
  handleClickCallToAction,
  handleCloseModal
}: Props) => {
  const modalConfig = useFingerprint().config?.triggerConfig?.modal
  const elementSize = modalConfig?.size || defaultElementSize

  const isModalFullyClickable = getIsModalFullyClickable({ trigger })
  const [stylesLoaded, setStylesLoaded] = useState(false)

  const modalSizeStyle = getModalStylesBySize(elementSize)
  const buttonSizeStyle = getModalButtonStylesBySize(elementSize)

  useEffect(() => {
    // @todo: note that because of the font being screwed up a bit on all of these host urls,
    // I had to apply some negative margins to make it look passable. Apologies if you have to maintain it.
    // The other alternatives were either CORS-blocked, or would require a diff packager (in case of local file)
    const cssToApply = `
    :root {
      --primary: white;
      --secondary: grey;
      --text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    a,
    span {
      line-height: 1.2;
      font-family: Arial, Helvetica, sans-serif;
    
    }
    
    .${prependClass('overlay')} {
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
      font-weight: 500;
      font-style: normal;
    }
    
    .${prependClass('modal')} {
      ${
        isModalFullyClickable
          ? 'cursor: pointer; '
          : `
        width: 80%;
        height: 500px;
      `
      }
    
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-shadow: var(--text-shadow);
    }
    
    
    .${prependClass('text-center')} {
      text-align: center;
    }
  
    .${prependClass('text-container')} {
      flex-direction: column;
      flex: 1;
      text-shadow: var(--text-shadow);
      display: grid;
      place-content: center;
    }
    
    .${prependClass('main-text')} {
      font-weight: 500;
      font-size: 2rem;
      font-style: normal;
      text-align: center;
      margin-bottom: 1rem;
      fill: var(--secondary);
      text-shadow: var(--text-shadow);
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    
    }
    
    .${prependClass('sub-text')} {
      margin: auto;
      font-weight: 600;
      font-size: 1.2rem;
    
      text-align: center;
      text-transform: uppercase;
    }
    
    .${prependClass('cta')} {
      cursor: pointer;
      background-color: var(--secondary);
      border-radius: 2px;
      display: block;
      font-size: 1.3rem;
      color: var(--primary);
      text-align: center;
      text-transform: uppercase;
      margin: 0 auto;
      text-decoration: none;
      box-shadow: 0.3rem 0.3rem white;
    }
    
    .${prependClass('cta:hover')} {
      transition: all 0.3s;
      filter: brightness(0.95);
    }
    
    .${prependClass('close-button')} {
      border-radius: 100%;
      background-color: white;
      width: 2rem;
      border: none;
      height: 2rem;
      position: absolute;
      margin: 10px;
      top: 0px;
      right: 0px;
      color: black;
      font-size: 1.2rem;
      font-weight: 300;
      cursor: pointer;
      display: grid;
      place-content: center;
    }
    
    .${prependClass('close-button:hover')} {
      transition: all 0.3s;
      filter: brightness(0.95);
    }
    
    .${prependClass('image-darken')} {
      background: rgba(0, 0, 0, 0.1);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      padding: 2rem 1.5rem 1.5rem 1.5rem;
    }
    
    .${prependClass('text-shadow')} {
      text-shadow: var(--text-shadow);
    }
    
    .${prependClass('box-shadow')} {
      box-shadow: var(--text-shadow);
    }
    `

    const styles = document.createElement('style')
    styles.type = 'text/css'
    styles.appendChild(document.createTextNode(cssToApply))
    document.head.appendChild(styles)
    setTimeout(() => {
      setStylesLoaded(true)
    }, 500)
  }, [])

  if (!stylesLoaded) {
    return null
  }

  return (
    <div className={prependClass('overlay')}>
      <div
        className={prependClass('modal')}
        style={{
          background: `url(${trigger?.data?.backgroundURL})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative',
          ...modalSizeStyle
        }}
      >
        <div className={prependClass('image-darken')}>
          <button
            className={prependClass('close-button')}
            onClick={handleCloseModal}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 16 16'
            >
              <path
                fill='#000'
                fillRule='evenodd'
                d='M8.707 8l3.647-3.646a.5.5 0 0 0-.708-.708L8 7.293 4.354 3.646a.5.5 0 1 0-.708.708L7.293 8l-3.647 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8z'
              />
            </svg>
          </button>

          <div className={prependClass('text-container')}>
            <h1 className={prependClass('main-text')}>
              {trigger?.data?.heading}
            </h1>
            <p className={prependClass('sub-text')}>
              {trigger?.data?.paragraph}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              ...getModalButtonFlexPosition(
                modalConfig?.buttonPosition || defaultButtonPosition
              )
            }}
          >
            <div>
              <a
                href={trigger?.data?.buttonURL}
                className={prependClass('cta')}
                onClick={handleClickCallToAction}
                style={buttonSizeStyle}
              >
                {trigger?.data?.buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StandardModal = (props: Props) => {
  const isModalFullyClickable = getIsModalFullyClickable({
    trigger: props.trigger
  })

  if (isModalFullyClickable)
    // this is the one that follows the typical scale behaviour of assets so far
    return <FullyClickableModal {...props} />

  return <BasicModal {...props} />
}

export default StandardModal

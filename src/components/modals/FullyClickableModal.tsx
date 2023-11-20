/**
 * Didnt spend too much time makeing this proper, since it will get merged with
 * the standard modal soon
 */
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Trigger } from '../../client/types'
import CloseButton from '../CloseButton'
import { prependClass } from './StandardModal/helpers'

type Props = {
  trigger: Trigger
  handleClickCallToAction: (e: any) => void
  handleCloseModal: (e: any) => void
  style: { width: number; height: number }
  imageURL: string
}

const FullyClickableModal = ({
  // trigger,
  handleClickCallToAction,
  handleCloseModal,
  style,
  imageURL
}: Props) => {
  const [stylesLoaded, setStylesLoaded] = useState(false)
  const { height, width } = style

  const appendResponsiveBehaviour = React.useCallback(() => {
    return isMobile
      ? `.${prependClass('modal')} {
      max-width: 95%;
      max-height: 95%;
    }`
      : `

@media screen and (max-width: 1400px) {
  .${prependClass('modal')} {
    height: ${0.8 * height}px;
    width: ${0.8 * width}px;
  }
}
@media screen and (max-width: 1100px) {
  .${prependClass('modal')} {
    height: ${0.6 * height}px;
    width: ${0.6 * width}px;
  }
}

@media screen and (max-width: 450px) {
  .${prependClass('modal')} {
    height: ${0.4 * height}px;
    width: ${0.4 * width}px;
  }
}

`
  }, [style])

  // TODO:reminder:
  const isEntireModalClickable = true

  useEffect(() => {
    // @todo: note that because of the font being screwed up a bit on all of these host urls,
    // I had to apply some negative margins to make it look passable. Apologies if you have to maintain it.
    // The other alternatives were either CORS-blocked, or would require a diff packager (in case of local file)
    const cssToApply = `
  
    .${prependClass('overlay')} {
      background-color: rgba(0, 0, 0, 0.7);
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      font-style: normal;
    }
    
    .${prependClass('modal')} {
      height: ${height}px;
      width: ${width}px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-shadow: var(--text-shadow);
      ${isEntireModalClickable ? 'transition: all 0.3s ease-in-out;' : ''}
      ${isEntireModalClickable ? 'cursor: pointer;' : ''}
    }

    ${
      isEntireModalClickable
        ? `.${prependClass('modal')}:hover {
      filter: brightness(1.05);
      box-shadow: 0.1rem 0.1rem 10px #7b7b7b;
    }`
        : ''
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

    ${appendResponsiveBehaviour()}
    `

    const styles = document.createElement('style')
    styles.type = 'text/css'
    styles.appendChild(document.createTextNode(cssToApply))
    document.head.appendChild(styles)
    setTimeout(() => {
      setStylesLoaded(true)
    }, 500)

    return () => {
      document.head.removeChild(styles)
    }
  }, [style, appendResponsiveBehaviour])

  const handleModalAction = React.useCallback(
    (e: any) => {
      e.stopPropagation()
      return handleClickCallToAction(e)
    },
    [handleClickCallToAction]
  )

  const handleClickClose = React.useCallback(
    (e: any) => {
      e.stopPropagation()
      return handleCloseModal(e)
    },
    [handleCloseModal]
  )

  if (!stylesLoaded) {
    return null
  }

  return (
    <div className={prependClass('overlay')}>
      <div
        className={prependClass('modal')}
        onClick={handleModalAction}
        style={{
          background: `url(${imageURL})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative'
        }}
      >
        <div className={prependClass('close-button')}>
          <CloseButton onClick={handleClickClose} />
        </div>
      </div>
    </div>
  )
}
export default FullyClickableModal
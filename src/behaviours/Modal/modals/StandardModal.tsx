/**
 * Why is this modal standard?
 * Well, long ago, when we were young and naive, we thought that we could
 * make a modal that would work for all use cases. We were wrong.
 * We had to implement modals for each brand to prove we were better than a certain
 * competitor. We succeeded. This name remains as a reminder of a dark time in Difi's
 * history.
 */
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import CloseButton from '../../../components/CloseButton'
import { useSeen } from '../../../hooks/api/useSeenMutation'
import { useBrandColors } from '../../../hooks/useBrandConfig'
import { useLogging } from '../../../hooks/useLogging'
import {
  getIsModalFullyClickable,
  prependClass,
  useModalDimensionsBasedOnImage
} from '../helpers'
import { ModalProps } from '../Modal.types'
import Header from './components/Header'
import Paragraph from './components/Paragraph'

const StandardModal = ({
  trigger,
  handleClickCallToAction,
  handleCloseModal
}: ModalProps) => {
  const { error } = useLogging()
  const isModalFullyClickable = getIsModalFullyClickable({ trigger })
  const [stylesLoaded, setStylesLoaded] = useState(false)

  const { textPrimary, backgroundPrimary } = useBrandColors()
  const imageURL = trigger?.data?.backgroundURL || ''
  const {
    imageDimensions: { height, width },
    setImageDimensions
  } = useModalDimensionsBasedOnImage({
    imageURL
  })

  const isImageBrokenDontShowModal = !width || !height

  useSeen({ trigger, skip: !stylesLoaded || isImageBrokenDontShowModal })

  const appendResponsiveBehaviour = React.useCallback(() => {
    return isMobile
      ? ``
      : `

@media screen and (max-width: 1400px) {
  .${prependClass('modal')} {
    height: ${1 * height}px;
    width: ${1 * width}px;
  }
}

@media screen and (max-width: 850px) {
  .${prependClass('modal')} {
    height: ${0.6 * height}px;
    width: ${0.6 * width}px;
  }
  .${prependClass('main-text')} {
    font-size: 2.4rem;
  }
  .${prependClass('sub-text')} {
    font-size: 1.3rem;
  }
}

@media screen and (max-width: 450px) {
  .${prependClass('modal')} {
    height: ${0.4 * height}px;
    width: ${0.4 * width}px;
  }
  .${prependClass('main-text')} {
    font-size: 1.6rem;
  }
  .${prependClass('sub-text')} {
    font-size: 0.9rem;
  }
}

`
  }, [height, width, imageURL, isMobile])

  useEffect(() => {
    // @todo: note that because of the font being screwed up a bit on all of these host urls,
    // I had to apply some negative margins to make it look passable. Apologies if you have to maintain it.
    // The other alternatives were either CORS-blocked, or would require a diff packager (in case of local file)
    const cssToApply = `
    :root {
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
      ${isModalFullyClickable ? 'cursor: pointer;' : ``}
      height: ${height}px;
      width: ${width}px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background-repeat: no-repeat;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-shadow: var(--text-shadow);
      ${isModalFullyClickable ? 'transition: box-shadow 0.3s ease-in-out;' : ''}
      ${isModalFullyClickable ? 'cursor: pointer;' : ''}
    }
    
    .${prependClass('modal')}:hover {
      ${
        isModalFullyClickable
          ? `
        filter: brightness(1.05);
        box-shadow: 0.1rem 0.1rem 10px #7b7b7b;
      `
          : ''
      }
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
      font-size: 4rem;
      font-style: normal;
      text-align: center;
      color: ${textPrimary};
      text-shadow: var(--text-shadow);
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .${prependClass('sub-text')} {
      margin: auto;
      font-weight: 600;
      font-size: 2.2rem;
      color: ${textPrimary};
      text-align: center;
      text-transform: uppercase;
    }
    
    .${prependClass('cta')} {
      cursor: pointer;
      background-color: ${backgroundPrimary};
      border-radius: 2px;
      display: block;
      font-size: 1.3rem;
      color: ${textPrimary};
      text-align: center;
      text-transform: uppercase;
      margin: 1rem;
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
      font-size: 2rem;
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
      ${isModalFullyClickable ? '' : 'background: rgba(0, 0, 0, 0.3);'}
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
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
  }, [isModalFullyClickable, height, width, appendResponsiveBehaviour])

  const getHandleModalActionFinal = React.useCallback(() => {
    if (!isModalFullyClickable) return undefined

    return (e: any) => {
      setImageDimensions({ width: 0, height: 0 })
      handleClickCallToAction(e)
    }
  }, [handleClickCallToAction])

  const handleClickCloseFinal = React.useCallback(
    (e: any) => {
      e.stopPropagation()
      return handleCloseModal(e)
    },
    [handleCloseModal]
  )

  if (!stylesLoaded) {
    return null
  }

  if (isImageBrokenDontShowModal) {
    error(
      "StandardModal: Couldn't get image dimensions, so not showing trigger. Investigate."
    )
    return null
  }

  return (
    <div className={prependClass('overlay')}>
      <div
        onClick={getHandleModalActionFinal()}
        className={prependClass('modal')}
        style={{
          background: `url(${imageURL})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative'
        }}
      >
        <div className={prependClass('image-darken')}>
          <div className={prependClass('close-button')}>
            <CloseButton onClick={handleClickCloseFinal} />
          </div>

          <div className={prependClass('text-container')}>
            <Header trigger={trigger} />
            <Paragraph trigger={trigger} />
          </div>

          {!isModalFullyClickable && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <div>
                <a
                  href={trigger?.data?.buttonURL}
                  className={prependClass('cta')}
                  onClick={handleClickCallToAction}
                  style={{
                    fontSize: '1.3rem',
                    padding: '0.3rem 1rem'
                  }}
                >
                  {trigger?.data?.buttonText}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StandardModal

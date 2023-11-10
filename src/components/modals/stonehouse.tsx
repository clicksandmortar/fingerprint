// @todo: Kill this with fire 🔥
import React, { useEffect, useState } from 'react'
import { Trigger } from '../../client/types'
import CloseButton from '../CloseButton'
import { prependClass } from './StandardModal/helpers'

type Props = {
  trigger: Trigger
  handleClickCallToAction: (e: any) => void
  handleCloseModal: (e: any) => void
}
const primaryColor = `rgb(33,147,174)`
const secondaryColor = `#e0aa00`
const callToActionColor = 'rgb(235,63,43)'
const mainGrey = 'rgb(70,70,70)'

const scaleBg = (scale: number) => {
  // todo: based on images for the campaign of 800x700.
  // we could make more programmatic, but only if we plan to change the image.
  const imageWidth = 800
  const imageHeight = 700

  return {
    height: imageHeight * scale,
    width: imageWidth * scale
  }
}

const StonehouseModal = ({
  trigger,
  handleClickCallToAction,
  handleCloseModal
}: Props) => {
  const [stylesLoaded, setStylesLoaded] = useState(false)

  useEffect(() => {
    // @todo: note that because of the font being screwed up a bit on all of these host urls,
    // I had to apply some negative margins to make it look passable. Apologies if you have to maintain it.
    // The other alternatives were either CORS-blocked, or would require a diff packager (in case of local file)
    const cssToApply = `
      @font-face{
        font-family: "Gotham Bold";
        src: url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.eot?#iefix") format("embedded-opentype"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.woff") format("woff"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.woff2") format("woff2"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.ttf") format("truetype"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.svg#Gotham-Bold") format("svg");
            font-display: auto;
            font-style: normal;
            font-weight: 500;
            font-stretch: normal;
    }
     

      :root {
        --text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
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
        font-family: 'Gotham Bold';
        font-weight: 500;
        font-style: normal;
      }

      .${prependClass('modal')} {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        box-shadow: var(--text-shadow);
        height: ${scaleBg(0.7).height}px;
        width: ${scaleBg(0.7).width}px;
      }

      .${prependClass('gotham-bold')} {
        font-family: 'Gotham Bold';
      }

      .${prependClass('text-center')} {
        text-align: center;
      }

      .${prependClass('main-text')} {
        line-height: 1.2;
        font-family: 'Gotham Bold';
        font-weight: 500;
        font-style: normal;
        text-transform: uppercase;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
        margin-bottom: -1.5rem;
        font-size: 4.5rem;
      }

      .${prependClass('text-container')} {
        display: grid;
        place-content: center;
        flex: 1;
      }

      .${prependClass('sub-text')} {
        line-height: 1;
        margin: auto;
        font-weight: 600;
        font-family: 'Gotham Bold';
        color: ${secondaryColor};
        letter-spacing: 2pt;
        display: inline-block;
        text-align: center;
        font-size: 2.4rem;
      }

      .${prependClass('cta')} {
        line-height: 1.2;
        font-family: 'Gotham Bold';
        cursor: pointer;
        background-color: ${callToActionColor};
        border-radius: 2px;
        display: block;
        color: white;
        text-align: center;
        text-transform: uppercase;
        margin: 0 auto;
        text-decoration: none;
        box-shadow: -2px 2px 8px black;
        padding: 1.2rem 1.2rem 0.2rem 1.2rem;  
        font-size: 1.3rem;
      }

      .${prependClass('cta:hover')} {
        transition: all 0.3s;
        filter: brightness(0.95);
      }

      .${prependClass('close-button')} {
        position: absolute;
        top: 0px;
        right: 0px;
      }
      .${prependClass('close-button')}:hover {
        transition: all 0.3s;
        filter: brightness(0.95);
      }
      

      .${prependClass('image-container')} {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        padding: 4rem 1.5rem 2rem 1.5rem;
      }

      .${prependClass('text-shadow')} {
        text-shadow: var(--text-shadow);
      }

      .${prependClass('box-shadow')} {
        box-shadow: var(--text-shadow);
      }
      
      @media screen and (max-width: 550px) {
        .${prependClass('modal')} {
          height: ${scaleBg(0.4).height}px;
          width: ${scaleBg(0.4).width}px;
        }
        .${prependClass('main-text')}{
          font-size: 2.5rem;
          margin-bottom: -0.6rem;
        }
        .${prependClass('sub-text')}{
          font-size: 1.9rem;
          letter-spacing: 1.2pt;

        }
        .${prependClass('cta')}{
          padding: 0.8rem 0.8rem 0rem 0.8rem;  
          font-size: 0.8rem;
        }
        .${prependClass('image-container')} {
          padding: 2rem 1.5rem 1rem 1.5rem;
        }
      }
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
  }, [])

  // When I am summoned by the Lord for the Final Judgment
  // I hope he never brings up the decision to write this:
  const textColorByRoute = React.useMemo((): {
    paragraph: React.CSSProperties
    heading: React.CSSProperties
  } => {
    if (location.href.includes('tablebooking'))
      return {
        heading: { color: 'white' },
        paragraph: { color: secondaryColor }
      }

    // else - nationalsearch
    return {
      heading: {
        color: primaryColor,
        WebkitTextStroke: `2px ${mainGrey}`
      },
      paragraph: { color: mainGrey }
    }
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
          position: 'relative'
        }}
      >
        <div className={prependClass('image-container')}>
          <div className={prependClass('close-button')}>
            <CloseButton onClick={handleCloseModal} />
          </div>

          <div className={prependClass('text-container')}>
            <h1
              className={prependClass('main-text')}
              style={textColorByRoute.heading}
            >
              {trigger?.data?.heading}
            </h1>
            <span
              className={prependClass('sub-text')}
              style={textColorByRoute.paragraph}
            >
              {trigger?.data?.paragraph}
            </span>
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div>
              <a
                href={trigger?.data?.buttonURL}
                className={prependClass('cta')}
                onClick={handleClickCallToAction}
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
export default StonehouseModal

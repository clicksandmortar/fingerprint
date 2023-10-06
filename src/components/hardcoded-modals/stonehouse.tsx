// @todo: Kill this with fire 🔥
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { APITrigger } from '../../client/types'

type Props = {
  trigger: APITrigger
  handleClickCallToAction: (e: any) => void
  handleCloseModal: (e: any) => void
}

const randomHash = 'f' + uuidv4().split('-')[0]

const prependClass = (className: string) => `f${randomHash}-${className}`

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
        --primary: white;
        --secondary: #e0aa00;
        --text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      }
      h1, h2, h3, h4, h5, h6, p, a, span {
        line-height: 1.2;
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
        width: 80%;
        height: 500px;
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

      .${prependClass('gotham-bold')} {
        font-family: 'Gotham Bold';
      }

      .${prependClass('text-center')} {
        text-align: center;
      }

      @media screen and (min-width: 768px) {
        .${prependClass('modal')} {
          max-width: 600px;
        }
      }

      @media screen and (max-width: 768px) {
        .${prependClass('modal')} {
          width: 95vw;
          max-width: 600px;
        }
      }

      .${prependClass('main-text')} {
        flex: 1;
        font-family: 'Gotham Bold';
        font-weight: 500;
        font-size: 3rem;
        font-style: normal;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 2pt;
        fill: var(--secondary);
        text-shadow: var(--text-shadow);
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: -10px;
      }

      .${prependClass('text-container')} {
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-shadow: var(--text-shadow);
      }

      .${prependClass('sub-text')} {
        margin: auto;
        font-weight: 600;
        font-family: 'Gotham Bold';
        font-size: 0.6rem;
        letter-spacing: 2pt;

        display: inline-block;
        text-align: center;
        text-transform: uppercase;
      }

      .${prependClass('cta')} {
        font-family: 'Gotham Bold';
        cursor: pointer;
        background-color: var(--secondary);
        padding: 0.75rem 1rem 0 1rem;
        border-radius: 2px;
        display: block;
        font-size: 1.3rem;
        color: var(--primary);
        text-align: center;
        text-transform: uppercase;
        max-width: 400px;
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
  }, [randomHash])

  if (!stylesLoaded) {
    return null
  }

  const TwoForTenThing = () => (
    <div style={{ position: 'absolute', left: '10%', top: 250 }}>
      <div
        className={prependClass(`box-shadow`)}
        style={{
          borderRadius: '100%',
          height: 100,
          width: 100,
          border: '2px solid white',
          display: 'grid',
          placeContent: 'center',
          transform: 'rotate(-10deg)'
        }}
      >
        <h4
          className={`${prependClass('gotham-bold')} ${prependClass(
            'text-center'
          )} ${prependClass('text-shadow')}`}
        >
          2 for
        </h4>
        <h1
          className={`${prependClass('gotham-bold')} ${prependClass(
            'text-center'
          )} ${prependClass('text-shadow')}`}
          style={{ marginLeft: 15, marginBottom: -10 }}
        >
          10*
        </h1>
        <h6
          className={`${prependClass('gotham-bold')} ${prependClass(
            'text-center'
          )} ${prependClass('text-shadow')}`}
        >
          COCKTAILS
        </h6>
      </div>
    </div>
  )

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
            <span className={prependClass('sub-text')}>
              {trigger?.data?.paragraph}
            </span>
          </div>
          <div>
            <TwoForTenThing />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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

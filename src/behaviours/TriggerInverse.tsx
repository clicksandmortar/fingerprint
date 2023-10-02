import * as React from 'react'
import { useForm } from 'react-hook-form'

const baseUrl = 'https://bookings-bff.starship-staging.com'

const makeFullUrl = (resource: any, params = {}) => {
  if (resource.startsWith('/')) {
    resource = resource.substring(1)
  }

  const fullUri = `${baseUrl}/${resource}`

  if (Object.keys(params).length === 0) {
    return fullUri
  }

  return `${fullUri}?${new URLSearchParams(params).toString()}`
}

const Button = ({
  children,
  className,
  onClick,
  disabled,
  colour = 'primary'
}: any) => {
  let builtButtonClasses =
    `btn step-button bg-${colour} border-${colour} text-white hover:bg-${colour}/80 disabled:text-${colour}/50 disabled:border-${colour}/50` +
    (className ? ' ' + className : '')

  if (disabled) {
    builtButtonClasses += ' disabled'
  }

  return (
    <button
      disabled={disabled}
      className={builtButtonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const Voucher = ({ details }: any) => {
  return (
    <div>
      <h3>Terms of Voucher</h3>
      <p className='text-sm'>{details.termsAndConditions}</p>
    </div>
  )
}

const TriggerInverse = ({}: any) => {
  const landingPage: any = {}
  const form: any = {}
  const location: any = {}
  const [open, setOpen] = React.useState(true)

  if (!open) {
    return null
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()
  const initialState = {
    busy: false,
    complete: false,
    voucher: null,
    error: null,
    responseStatusCode: 0
  }
  const [state, setState] = React.useState(initialState)

  async function submitVoucher(data: any) {
    const reqData = {
      ...data,
      bookingLink: `${location?.origin}/${landingPage?.slug}`
    }
    const response = await fetch(
      makeFullUrl(
        `campaigns/${form?.campaign}/voucher?locationID=${landingPage?.identifier}`
      ),
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(reqData)
      }
    )
    response.json().then((responseData) => {
      if (response.ok) {
        // @ts-ignore
        setState({
          busy: false,
          complete: true,
          voucher: responseData.voucher
        })
      } else {
        // @ts-ignore
        setState({
          busy: false,
          error: responseData,
          responseStatusCode: response.status
        })
      }
    })
  }

  async function onSubmit(data: any) {
    // @ts-ignore
    setState({
      busy: true
    })
    try {
      if (form.campaign !== '') {
        submitVoucher(data).then(() => {
          const eventData = {
            item_name: landingPage?.name,
            affiliation: 'Booking Flow'
          }
          console.log(eventData)
          // navigate(`/${landingPage?.slug}`)
        })
      }
    } catch (e) {}
  }

  if (state.complete === true) {
    return (
      <div className='container'>
        <h2>Voucher Sent!</h2>
        <p className='text-md'>
          Good news! We've sent your voucher to the email provided!
        </p>
        {state.voucher && (
          <div className='col-12 mt-3'>
            <Voucher details={state.voucher} />
          </div>
        )}
      </div>
    )
  }

  if (state.responseStatusCode === 409) {
    return (
      <div className='container'>
        <h2 className='mt-3'>Uh-oh!</h2>
        <p>
          It seems that you already received this voucher. Please get in touch
          if this doesn't seem right:&nbsp;
          <a
            href='/help'
            className='underline font-serif tracking-wide'
            onClick={() => setOpen(false)}
          >
            contact us
          </a>
        </p>
      </div>
    )
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
      <main className='flex-grow flex flex-col justify-center container relative'>
        <div className='w-full'>
          <div className='cms-content text-center md:text-left'>
            <h2>Get Your Voucher</h2>
            <p>To receive your voucher, we just need a few details from you.</p>
            <h3
              className={`bar-title border-l-4 border-solid border-${landingPage?.colour}`}
            >
              Contact Info
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2'>
                <div>
                  <label htmlFor='first_name'>First Name*</label>
                  <input
                    {...register('firstName', {
                      required: true,
                      minLength: 2,
                      maxLength: 30,
                      validate: (value) => value.trim().length >= 2
                    })}
                    type='text'
                    className='form-input'
                    id='firstName'
                  />
                </div>
                <div>
                  <label htmlFor='last_name'>Last Name*</label>
                  <input
                    {...register('lastName', {
                      required: true,
                      minLength: 2,
                      maxLength: 30,
                      validate: (value) => value.trim().length >= 2
                    })}
                    type='text'
                    className='form-input'
                    id='lastName'
                  />
                </div>
                <div>
                  <label htmlFor='email'>Email*</label>
                  <input
                    {...register('emailAddress', { required: true })}
                    type='email'
                    className='form-input'
                    id='email'
                  />
                </div>
              </div>
              <div>
                <p>* Required Field</p>
              </div>

              <div className='flex gap-x-6 gap-y-2 items-center flex-wrap justify-center lg:justify-start'>
                <div className='form-check'>
                  <input
                    type='checkbox'
                    {...register('terms', { required: true })}
                    className='form-check-input'
                    id='terms'
                  />{' '}
                  <label htmlFor='terms' className='form-check-label'>
                    I confirm that I have read & agreed with the{' '}
                    <a
                      href={landingPage?.privacyPolicy}
                      target='_blank'
                      rel='noreferrer'
                    >
                      Privacy Policy
                    </a>
                    *
                  </label>
                </div>
                <Button
                  className='btn mt-2 md:mt-0'
                  type='submit'
                  colour={landingPage?.colour}
                  disabled={state.busy || isSubmitting}
                >
                  {isSubmitting || state.busy
                    ? 'Sending Voucher...'
                    : 'Get My Voucher'}
                </Button>
              </div>
              {state.error && state.responseStatusCode !== 409 && (
                <div className={`alert mt-5 bg-${landingPage?.colour}/20`}>
                  There was a problem sending your voucher. Please check your
                  details and try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
export default TriggerInverse

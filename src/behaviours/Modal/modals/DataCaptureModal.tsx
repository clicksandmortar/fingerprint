import React, { PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import CloseButton from '../../../components/CloseButton'
import CnMForm from '../../../components/CnMForm'
import { useLogging } from '../../../context/LoggingContext'
import { useMixpanel } from '../../../context/MixpanelContext'
import { useBrandColors } from '../../../hooks/useBrandConfig'
import { useCollector } from '../../../hooks/useCollector'
import { useCollectorMutation } from '../../../hooks/useCollectorMutation'
import { getFormEntries } from '../../../utils/forms'
import { DataCaptureModalField, DataCaptureTrigger } from '../Modal.types'

// TODO: switch this to true to make the modal appear on the right and non-block :)
// Eventually we want to move it to Portal and make it dynamic
const isViewBlockingModal = false

// fields are not hardcoded to only be these. Once we make it dynamic, as long as the shape
// is the same, just use trigger.data.fields or whatever
const fields: DataCaptureModalField[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    required: false
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true
  }
]

const getOuterLayer = ({
  isViewBlockingModal
}: {
  isViewBlockingModal: boolean
}): React.CSSProperties => {
  if (isViewBlockingModal) {
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
      display: 'grid',
      placeContent: 'center'
    }
  }

  return {
    zIndex: 999,
    position: 'fixed',
    right: '3vw',
    top: '50%',
    transform: 'translateY(-50%)'
  }
}
type Props = { trigger: DataCaptureTrigger }

const DataCaptureModal = ({ trigger }: Props) => {
  const [hasSubmitted, setHasSubmitted] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')
  const [retainedHeight, setRetainedHeight] = React.useState<number>(0)

  const { trackEvent } = useMixpanel()
  const { log } = useLogging()
  const ref = React.useRef<HTMLDivElement>(null)
  const { removeActiveTrigger } = useCollector()

  const handleCloseModal = () => {
    removeActiveTrigger(trigger.id)

    if (!hasSubmitted) trackEvent('user_closed_trigger', trigger)
    // Enable this if we find value in tracking the "close after submission"
    // else trackEvent('user_dismissed_trigger_after_conversion', trigger)
  }

  const { mutate: submit } = useCollectorMutation()

  const handleSubmit = (e: any) => {
    e.preventDefault()

    setRetainedHeight(ref.current?.clientHeight || 0)
    setError('')
    setHasSubmitted(true)

    const entries = getFormEntries(e.target)

    trackEvent('user_submitted_data_capture', trigger)

    const haveAllRequiredFieldsBeenSubmitted = fields.every((field) => {
      return e.target[field.name].value
    })

    if (!haveAllRequiredFieldsBeenSubmitted)
      setError('Please make sure all required fields are filled in.')

    log('DataCaptureModal', 'handleSubmit', 'submit', entries)
    submit(entries)
    // Perform form submission logic here
    // e.g., post form info to useCollectorMutation
    // Hide the form and show the submission text
    // You can use state or CSS classes to toggle visibility
  }

  const { backgroundPrimary, textPrimary } = useBrandColors()

  const Wrapper = ({ children }: PropsWithChildren<{}>) => (
    <div style={getOuterLayer({ isViewBlockingModal })}>
      <div
        ref={ref}
        style={{
          height: retainedHeight || undefined,
          background: `url(${trigger.data?.backgroundURL})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '16px',
          width: '400px',
          maxWidth: '94vw',
          position: 'relative'
        }}
      >
        <div style={{ position: 'absolute', top: 5, right: 5 }}>
          <CloseButton onClick={handleCloseModal} />
        </div>
        <div
          style={{
            borderRadius: '10px',
            background: 'rgba(0, 0, 0, 0.45)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )

  if (hasSubmitted)
    return (
      <Wrapper>
        <h1>{trigger.data?.successText}</h1>
      </Wrapper>
    )

  return (
    <Wrapper>
      <h1
        style={{
          fontSize: '1.5rem',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          color: textPrimary
        }}
      >
        {trigger.data?.heading}
      </h1>
      <p
        style={{
          fontSize: '0.9rem',
          lineHeight: 1.5,
          marginBottom: '1rem',
          color: textPrimary
        }}
      >
        {trigger.data?.paragraph}
      </p>
      <CnMForm
        onSubmit={handleSubmit}
        style={{ display: 'grid' }}
        id={trigger.id}
      >
        {fields.map((field) => (
          <input
            key={field.name}
            name={field.name}
            placeholder={field.label + (field.required ? ' *' : '')}
            type={field.type}
            required={field.required}
            style={{
              backgroundColor: 'white',
              color: '#222',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '1rem 0.4rem',
              fontSize: '0.8rem',
              outline: 'none',
              marginBottom: '0.4rem'
            }}
          />
        ))}

        <button
          style={{
            marginTop: '0.7rem',
            backgroundColor: backgroundPrimary,
            color: textPrimary,
            borderRadius: '4px',
            padding: '1rem 0.4rem',
            fontSize: '0.8rem',
            outline: 'none',
            cursor: 'pointer',
            border: 'none',
            letterSpacing: '0.05rem',
            textTransform: 'uppercase'
          }}
          type='submit'
        >
          {trigger.data?.buttonText}
        </button>
      </CnMForm>
      {error && (
        <p
          style={{
            fontSize: '0.9rem',
            lineHeight: 1.5,
            marginBottom: '1rem',
            color: '#aa2f2f'
          }}
        >
          {error}
        </p>
      )}
    </Wrapper>
  )
}

// TODO: rethink. we can potentially get rid of portals entirely in this app, since the styling is
// position: fixed/absolute in all cases anyway. Keeping for now since we know it works
export default ({ trigger }: Props) => {
  return ReactDOM.createPortal(
    <DataCaptureModal trigger={trigger} />,
    document.body
  )
}

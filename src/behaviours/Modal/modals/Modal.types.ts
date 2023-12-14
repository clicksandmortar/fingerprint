import { Trigger } from '../../../client/types'

export type ModalProps<T = Trigger> = {
  trigger: T
  handleClickCallToAction: (e: any) => void
  handleCloseModal: (e: any) => void
}

export type DataCaptureTrigger = Omit<Trigger, 'data'> & {
  data?: {
    heading?: string
    paragraph?: string
    backgroundURL?: string
    buttonText?: string
    successText?: string
    errorText?: string
  }
}

export type DataCaptureModalField = {
  name: string
  label: string
  type: string
  required: boolean
}

export type HandleCloseOptions = {
  skipTrackingEvent?: boolean
}

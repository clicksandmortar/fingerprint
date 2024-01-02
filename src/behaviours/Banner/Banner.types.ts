import { Trigger } from '../../client/types'
import { Icon } from '../../components/Icon'
import { Position } from './utils'

export type BannerTrigger = Omit<Trigger, 'data'> & {
  data: {
    position: Position
    buttonURL?: string
    marketingText?: string
    buttonText?: string
    // can be anything else in the furture, or dynamic. adjust as needed
    countdownEndTime?: string
    buttonIcon?: Icon
  }
}

export type BannerProps = {
  trigger: BannerTrigger
  handleAction: (e: any) => void
  handleClose: (e: any) => void
}

import { Trigger } from '../../client/types'

export type BannerProps = {
  trigger: Trigger
  handleAction: (e: any) => void
  handleClose: (e: any) => void
}

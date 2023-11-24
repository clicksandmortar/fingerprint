import { isMobile } from 'react-device-detect'

export type DeviceInfo = {
  type: 'mobile' | 'desktop' | 'tablet'
}

export const deviceInfo: DeviceInfo = {
  type: isMobile ? 'mobile' : 'desktop'
}

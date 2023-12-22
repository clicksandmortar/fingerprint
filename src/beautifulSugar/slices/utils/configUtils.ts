import { PropsWithChildren } from 'react'
import { Config } from '../../../client/types'
import { FingerprintProviderProps } from '../../../context/FingerprintContext'
import { _LEGACY_getBrand } from '../../../utils/brand'
import { getEnvVars } from '../../../utils/getEnvVars'

// 27 233 237 - dimmed, 41 100 249 - main, 13 14 49 - text Secondary, white primary, 226 226 226 greyBg, some dark grey text ?

// follows the colors of the C&M logo. Mostly
export const defaultColors: NonNullable<Config['brand']['colors']> = {
  backgroundPrimary: '#2a3d6d', // the original C&M one was too bright - 'rgb(144, 175, 255)',
  backgroundPrimaryDimmed: 'rgb(27,233,237)',
  backgroundSecondary: 'rgb(226,226,226)',
  shadeOfGrey: 'rgb(13,14,49)',
  textPrimary: '#ffffff',
  greyText: '#40404b'
}

export const defaultConfig: Config = {
  script: {
    debugMode: getEnvVars().isDev
  },
  trigger: {
    userIdleThresholdSecs: 5,
    displayTriggerAfterSecs: 5, // currently used only for exit itnent, but might make sense to use for all triggers
    triggerCooldownSecs: 60
  },
  brand: {
    name: _LEGACY_getBrand() || 'C&M',
    colors: defaultColors
  }
}

// Treat legacy config as a priority if there is a value in the legacy config
// otherwise, use the one from the portal
//
// Also note that the Portal config uses seconds, while the LEGACY config uses milliseconds, so /1000
export const LEGACY_merge_config = (
  config: Config,
  legacy_config: Props['legacy_config']
): Config['trigger'] => ({
  displayTriggerAfterSecs:
    (legacy_config?.exitIntentDelay || 0) / 1000 ||
    config.trigger.displayTriggerAfterSecs,
  triggerCooldownSecs:
    (legacy_config?.triggerCooldown || 0) / 1000 ||
    config.trigger.triggerCooldownSecs,
  userIdleThresholdSecs:
    (legacy_config?.idleDelay || 0) / 1000 ||
    config.trigger.userIdleThresholdSecs
})

type Props = PropsWithChildren<{
  legacy_config?: FingerprintProviderProps['config']
}>

// having to do this because the config is stored as a string
// in the database.
export const objStringtoObjNum = (obj: any) => {
  const newObj: any = {}

  Object.keys(obj).forEach((key) => {
    newObj[key] = Number(obj[key])
  })

  return newObj
}

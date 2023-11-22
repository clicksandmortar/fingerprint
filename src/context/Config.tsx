import React, { PropsWithChildren, createContext, useState } from 'react'
import { Config } from '../client/types'
import { FingerprintProviderProps } from './FingerprintContext'

// 27 233 237 - dimmed, 41 100 249 - main, 13 14 49 - text Secondary, white primary, 226 226 226 greyBg, some dark grey text ?

// follows the colors of the C&M logo. Mostly
export const defaultColors = {
  backgroundPrimary: '#2a3d6d', // the original C&M one was too bright - 'rgb(144, 175, 255)',
  backgroundPrimaryDimmed: 'rgb(27,233,237)',
  backgroundSecondary: 'rgb(226,226,226)',
  shadeOfGrey: 'rgb(13,14,49)',
  textPrimary: '#ffffff',
  greyText: '#40404b'
}

const defaultConfig: Config = {
  script: {
    debugMode: false
  },
  trigger: {
    userIdleThresholdSecs: 5,
    displayTriggerAfterSecs: 5, // currently used only for exit itnent, but might make sense to use for all triggers
    triggerCooldownSecs: 60
  },
  brand: {
    name: 'C&M',
    colors: defaultColors
  }
}

// Treat legacy config as a priority if there is a value in the legacy config
// otherwise, use the one from the portal
//
// Also note that the Portal config uses seconds, while the LEGACY config uses milliseconds, so /1000
const LEGACY_merge_config = (
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
const objStringtoObjNum = (obj: any) => {
  const newObj: any = {}

  Object.keys(obj).forEach((key) => {
    newObj[key] = Number(obj[key])
  })

  return newObj
}

// NOTE that this is the top level wrapper
// so log along with some other stuff won't work here.
export function ConfigProvider({ children, legacy_config }: Props) {
  const [config, setConfig] = useState<Config>(defaultConfig)

  const triggerConfig = LEGACY_merge_config(config, legacy_config)

  const setConfigEntry = React.useCallback(
    (updatedConfigEntries: Partial<Config>) => {
      const shouldUpdateColors =
        Object.keys(updatedConfigEntries?.brand?.colors || {}).length > 0

      setConfig((prev) => {
        return {
          ...prev,
          ...updatedConfigEntries,
          brand: {
            ...prev.brand,
            ...updatedConfigEntries.brand,
            // there is a chance that config.brand.colors isn't returned
            // when its not configured. In that case, we want to use either the colors already
            // in the config state, or the default colors
            colors: shouldUpdateColors
              ? {
                  ...(prev.brand.colors || defaultColors),
                  ...(updatedConfigEntries?.brand?.colors || {})
                }
              : prev.brand.colors
          },
          trigger: {
            ...prev.trigger,
            // the stars aligned in the shittiest-most way making it so that the BE returns these as strings
            ...objStringtoObjNum(triggerConfig)
          },
          script: {
            debugMode: true
          }
        }
      })
    },
    [setConfig, triggerConfig]
  )

  const value: ConfigContextType = {
    config,
    setConfigEntry
  }

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  )
}

type ConfigContextType = {
  config: Config
  setConfigEntry: (config: Partial<Config>) => void
}

export const ConfigContext = createContext<ConfigContextType>({
  config: defaultConfig,
  setConfigEntry: () => {
    console.error('ConfigContext: setConfigEntry not implemented')
  }
})

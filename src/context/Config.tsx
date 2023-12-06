import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState
} from 'react'
import { Config } from '../client/types'
import { _LEGACY_getBrand, haveBrandColorsBeenConfigured } from '../utils/brand'
import { FingerprintProviderProps } from './FingerprintContext'

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
    name: _LEGACY_getBrand() || 'C&M',
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
export function ConfigProvider({ children, legacy_config }: Props) {
  const [config, setConfigState] = useState<Config>(defaultConfig)

  // NOTE that this is the top level wrapper
  // so log along with some other stuff won't work here.
  const log = React.useCallback(
    (...params) => {
      if (config.script.debugMode) {
        console.log('[ConfigProvider]', ...params)
      } else () => {}
    },
    [config, legacy_config]
  )

  // This is super messy. I know. Once we get rid of the legacy behaviour this should become
  //  much clearer
  const setConfig = React.useCallback(
    (updatedConfigEntries: Partial<Config>) => {
      // if the colors have been configured, we want to use the colors from the portal
      // if not - keep the default ones
      const argColors = updatedConfigEntries?.brand?.colors
      const shouldUpdateColors = haveBrandColorsBeenConfigured(argColors)

      if (shouldUpdateColors)
        log('setConfig: setting brand colors from portal config', argColors)
      else log('setConfig: keeping colors in state || fallback to default')

      setConfigState((prev) => {
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
                  // defaultColors here are just a fallback to keep TS happy. No need for them realistically. @TODO: look into
                  ...(prev.brand.colors || defaultColors),
                  ...(argColors || {})
                }
              : prev.brand.colors
          },
          trigger: {
            ...prev.trigger,
            // the stars aligned in the shittiest-most way making it so that the BE returns these as strings
            ...objStringtoObjNum(LEGACY_merge_config(prev, legacy_config))
          }
        }
      })
    },
    [setConfigState]
  )

  const value: ConfigContextType = {
    config,
    setConfig
  }

  useEffect(() => {
    log('config in use:', config)
  }, [config])

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  )
}

type ConfigContextType = {
  config: Config
  setConfig: (config: Partial<Config>) => void
}

export const ConfigContext = createContext<ConfigContextType>({
  config: defaultConfig,
  setConfig: () => {
    console.error('ConfigContext: setConfig not implemented')
  }
})

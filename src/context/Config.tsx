import React, { PropsWithChildren, createContext, useState } from 'react'
import { Config } from '../client/types'

const defaultColors = {
  backgroundPrimary: 'grey',
  backgroundPrimaryDimmed: '',
  backgroundSecondary: '',
  shadeOfGrey: '',
  textPrimary: 'white',
  greyText: ''
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

type Props = PropsWithChildren<{}>

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
export function ConfigProvider({ children }: Props) {
  const [config, setConfig] = useState<Config>(defaultConfig)

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
            ...objStringtoObjNum(updatedConfigEntries?.trigger)
          }
        }
      })
    },
    []
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

export const useConfig = () => React.useContext(ConfigContext)

export const useBrand = () => useConfig().config.brand.name
export const useTriggerConfig = () => useConfig().config.trigger
export const useScriptConfig = () => useConfig().config.script

export const useBrandColors = (): typeof defaultColors => {
  // if the color object isn't set in state, likely it isn't configured on the backend
  // use the default colors in that case
  const colors = useConfig().config.brand.colors

  if (!colors) return defaultColors
  if (!Object.keys(colors).length) return defaultColors

  return colors
}

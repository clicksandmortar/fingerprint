import React from 'react'
import { Config } from '../client/types'
import { ConfigContext, defaultColors } from '../context/Config'
import {
  SupportedBrand,
  _LEGACY_getBrand,
  haveBrandColorsBeenConfigured
} from '../utils/brand'

export const useConfig = () => React.useContext(ConfigContext)

export const useBrand = (): SupportedBrand | null => {
  const configBrandName = useConfig().config.brand.name

  if (configBrandName) return configBrandName
  // fallback for cases when the brand name is not set in the backend - default to original domain-check behavior
  return _LEGACY_getBrand()
}
export const useTriggerConfig = () => useConfig().config.trigger
export const useScriptConfig = () => useConfig().config.script

export const useBrandColors = (): NonNullable<Config['brand']['colors']> => {
  // if the color object isn't set in state, likely it isn't configured on the backend
  // use the default colors in that case
  const colors = useConfig().config.brand.colors

  return React.useMemo(() => {
    // when the key is not returned by the backend.
    if (!colors) return defaultColors
    // when it's an empty object
    if (!Object.keys(colors).length) return defaultColors
    // when it's been at least partially configured
    if (haveBrandColorsBeenConfigured(colors)) return colors

    return defaultColors // default fallback
  }, [colors])
}

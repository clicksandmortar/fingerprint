import React from 'react'
import { Config } from '../client/types'
import { ConfigContext, defaultColors } from '../context/Config'
import { SupportedBrand, _LEGACY_getBrand } from '../utils/brand'

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
  // fallback to default colors. We may want to get rid of this fallback in the future
  return useConfig().config.brand.colors || defaultColors
}

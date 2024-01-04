import { StateCreator } from 'zustand';
import { Config } from '../../client/types';
import { haveBrandColorsBeenConfigured } from '../../utils/brand';
import {
  defaultColors,
  defaultConfig,
} from '../../utils/configUtils';
import { DifiStore } from '../store';
import { Get, Set } from '../types';

export type ConfigSlice = {
  config: Config
  setConfig: (updatedConfigEntries: Partial<Config>) => void
}

export const createConfigSlice: StateCreator<DifiStore, [], [], ConfigSlice> = (
  set: Set,
  get: Get,
) => ({
  config: defaultConfig,
  setConfig: (updatedConfigEntries: Partial<Config>) => {
    const {
      logging: { log },
    } = get();
    // if the colors have been configured, we want to use the colors from the portal
    // if not - keep the default ones
    const argColors = updatedConfigEntries?.brand?.colors;
    const shouldUpdateColors = haveBrandColorsBeenConfigured(argColors);

    if (shouldUpdateColors) {
      log('setConfig: setting brand colors from portal config', argColors);
    } else {
      log('setConfig: keeping colors in state || fallback to default');
    }

    set((prev) => ({
      config: {
        ...prev.config,
        ...updatedConfigEntries,
        brand: {
          ...prev.config.brand,
          ...updatedConfigEntries.brand,
          // there is a chance that config.brand.colors isn't returned
          // when its not configured. In that case, we want to use either the colors already
          // in the config state, or the default colors
          colors: shouldUpdateColors
            ? {
              // defaultColors here are just a fallback to keep TS happy. No need for them really.@TODO: investigate
              ...(prev.config.brand.colors || defaultColors),
              ...(argColors || {}),
            }
            : prev.config.brand.colors,
        },
      },
    }));
  },
});

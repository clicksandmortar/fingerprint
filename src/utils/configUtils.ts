import { Config } from '../client/types';
import { _LEGACY_getBrand } from './brand';
import { getEnvVars } from './getEnvVars';

// 27 233 237 - dimmed, 41 100 249 - main, 13 14 49 - text Secondary, white primary, 226 226 226 greyBg, some dark grey text ?

// follows the colors of the C&M logo. Mostly
export const defaultColors: NonNullable<Config['brand']['colors']> = {
  backgroundPrimary: '#2a3d6d', // the original C&M one was too bright - 'rgb(144, 175, 255)',
  backgroundPrimaryDimmed: 'rgb(27,233,237)',
  backgroundSecondary: 'rgb(226,226,226)',
  shadeOfGrey: 'rgb(13,14,49)',
  textPrimary: '#ffffff',
  greyText: '#40404b',
};

export const defaultConfig: Config = {
  script: {
    debugMode: getEnvVars().isDev,
  },
  trigger: {
    userIdleThresholdSecs: 5,
    displayTriggerAfterSecs: 5, // currently used only for exit itnent, but might make sense to use for all triggers
    triggerCooldownSecs: 60,
  },
  brand: {
    name: _LEGACY_getBrand() || 'C&M',
    colors: defaultColors,
  },
};

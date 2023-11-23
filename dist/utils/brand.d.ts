import { Config } from '../client/types';
export declare type SupportedBrand = 'Browns' | 'Stonehouse' | 'C&M' | 'Sizzling' | 'All Bar One' | 'Ember';
export declare const _LEGACY_getBrand: () => SupportedBrand | null;
/**
 * By default all brand colors are set to #000000.
 */
export declare const haveBrandColorsBeenConfigured: (colors: Config['brand']['colors']) => boolean;

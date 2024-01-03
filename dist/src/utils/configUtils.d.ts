import { PropsWithChildren } from 'react';
import { Config } from '../client/types';
import { FingerprintProviderProps } from '../context/FingerprintContext';
export declare const defaultColors: NonNullable<Config['brand']['colors']>;
export declare const defaultConfig: Config;
export declare const LEGACY_merge_config: (config: Config, legacy_config: Props['legacy_config']) => Config['trigger'];
declare type Props = PropsWithChildren<{
    legacy_config?: FingerprintProviderProps['config'];
}>;
export {};

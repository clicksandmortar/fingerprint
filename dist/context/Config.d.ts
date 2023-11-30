import React, { PropsWithChildren } from 'react';
import { Config, ConfigResponseIBlameBlixenkrone } from '../client/types';
import { FingerprintProviderProps } from './FingerprintContext';
declare type ConfigInBothFormats = Config | ConfigResponseIBlameBlixenkrone;
export declare const defaultColors: NonNullable<Config['brand']['colors']>;
declare type Props = PropsWithChildren<{
    legacy_config?: FingerprintProviderProps['config'];
}>;
export declare function ConfigProvider({ children, legacy_config }: Props): React.JSX.Element;
declare type ConfigContextType = {
    config: Config;
    setConfig: (config: Partial<ConfigInBothFormats>) => void;
};
export declare const ConfigContext: React.Context<ConfigContextType>;
export {};

import React, { PropsWithChildren } from 'react';
import { Config } from '../client/types';
import { FingerprintProviderProps } from './FingerprintContext';
export declare const defaultColors: NonNullable<Config['brand']['colors']>;
declare type Props = PropsWithChildren<{
    legacy_config?: FingerprintProviderProps['config'];
}>;
export declare function ConfigProvider({ children, legacy_config }: Props): React.JSX.Element;
declare type ConfigContextType = {
    config: Config;
    setConfig: (config: Partial<Config>) => void;
};
export declare const ConfigContext: React.Context<ConfigContextType>;
export {};

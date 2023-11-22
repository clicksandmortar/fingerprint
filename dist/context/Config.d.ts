import React, { PropsWithChildren } from 'react';
import { Config } from '../client/types';
import { FingerprintProviderProps } from './FingerprintContext';
export declare const defaultColors: {
    backgroundPrimary: string;
    backgroundPrimaryDimmed: string;
    backgroundSecondary: string;
    shadeOfGrey: string;
    textPrimary: string;
    greyText: string;
};
declare type Props = PropsWithChildren<{
    legacy_config?: FingerprintProviderProps['config'];
}>;
export declare function ConfigProvider({ children, legacy_config }: Props): React.JSX.Element;
declare type ConfigContextType = {
    config: Config;
    setConfigEntry: (config: Partial<Config>) => void;
};
export declare const ConfigContext: React.Context<ConfigContextType>;
export {};

import React, { PropsWithChildren } from 'react';
import { Config } from '../client/types';
export declare const defaultColors: {
    backgroundPrimary: string;
    backgroundPrimaryDimmed: string;
    backgroundSecondary: string;
    shadeOfGrey: string;
    textPrimary: string;
    greyText: string;
};
declare type Props = PropsWithChildren<{}>;
export declare function ConfigProvider({ children }: Props): React.JSX.Element;
declare type ConfigContextType = {
    config: Config;
    setConfigEntry: (config: Partial<Config>) => void;
};
export declare const ConfigContext: React.Context<ConfigContextType>;
export {};

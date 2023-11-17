import React, { PropsWithChildren } from 'react';
import { Config } from '../client/types';
declare const defaultColors: {
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
export declare const useConfig: () => ConfigContextType;
export declare const useBrand: () => import("../utils/brand").SupportedBrand;
export declare const useTriggerConfig: () => {
    userIdleThresholdSecs: number;
    displayTriggerAfterSecs: number;
    triggerCooldownSecs: number;
};
export declare const useScriptConfig: () => {
    debugMode: boolean;
};
export declare const useBrandColors: () => typeof defaultColors;
export {};

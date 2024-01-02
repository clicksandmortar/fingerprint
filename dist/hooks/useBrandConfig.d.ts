import { Config } from '../client/types';
import { SupportedBrand } from '../utils/brand';
export declare const useConfig: () => {
    config: Config;
    setConfig: (config: Partial<Config> | Partial<import("../client/types").ConfigResponseIBlameBlixenkrone>) => void;
};
export declare const useBrand: () => SupportedBrand | null;
export declare const useTriggerConfig: () => {
    userIdleThresholdSecs: number;
    displayTriggerAfterSecs: number;
    triggerCooldownSecs: number;
};
export declare const useScriptConfig: () => {
    debugMode: boolean;
};
export declare const useBrandColors: () => NonNullable<Config['brand']['colors']>;

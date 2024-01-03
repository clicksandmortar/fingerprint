declare type EnvVars = {
    isDev: boolean;
    FINGERPRINT_API_HOSTNAME: string;
    MIXPANEL_TOKEN: string;
};
export declare function getEnvVars(): EnvVars;
export {};

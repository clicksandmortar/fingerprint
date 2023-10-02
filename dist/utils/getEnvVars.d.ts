declare type EnvVars = {
    FINGERPRINT_API_HOSTNAME: string;
    MIXPANEL_TOKEN: string;
    SENTRY_DSN: string;
};
export declare function getEnvVars(): EnvVars;
export {};

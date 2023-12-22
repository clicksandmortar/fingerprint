export declare type Logging = {
    log: (...message: any) => void;
    warn: (...message: any) => void;
    error: (...message: any) => void;
    info: (...message: any) => void;
};
export declare const getLoggingContext: (isDebugMode?: boolean | undefined) => Logging;
export declare const useLogging: () => Logging;

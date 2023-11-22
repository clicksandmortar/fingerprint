import React from 'react';
export declare type LoggingProviderProps = {
    children?: React.ReactNode;
};
export declare type LoggingContextInterface = {
    log: (...message: any) => void;
    warn: (...message: any) => void;
    error: (...message: any) => void;
    info: (...message: any) => void;
};
export declare const LoggingProvider: ({ children }: LoggingProviderProps) => React.JSX.Element;
export declare const LoggingContext: React.Context<LoggingContextInterface>;
export declare const useLogging: () => LoggingContextInterface;

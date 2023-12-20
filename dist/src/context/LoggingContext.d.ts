import React from 'react';
export declare type LoggingProviderProps = {
    children?: React.ReactNode;
};
export declare const useLogging: () => {
    log: (...message: any) => void;
    warn: (...message: any) => void;
    error: (...message: any) => void;
    info: (...message: any) => void;
};

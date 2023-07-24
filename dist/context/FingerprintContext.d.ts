import React from 'react';
export declare type FingerprintProviderProps = {
    appId?: string;
    children?: React.ReactNode;
    debug?: boolean;
};
export declare const FingerprintProvider: (props: FingerprintProviderProps) => React.JSX.Element | null;
export interface FingerprintContextInterface {
    appId: string;
    booted: boolean;
}
export declare const FingerprintContext: React.Context<FingerprintContextInterface>;
export declare const useFingerprint: () => FingerprintContextInterface;

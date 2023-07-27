import React from 'react';
import { PageView, Trigger } from '../client/types';
declare type TriggerCallback = (trigger: Trigger) => void | JSX.Element | React.ReactPortal;
export declare type Handler = {
    id?: string;
    behaviour?: string;
    invoke?: TriggerCallback;
};
export declare type FingerprintProviderProps = {
    appId?: string;
    children?: React.ReactNode;
    debug?: boolean;
    defaultHandlers?: Handler[];
};
export declare const FingerprintProvider: ({ appId, children, debug, defaultHandlers }: FingerprintProviderProps) => React.JSX.Element | null;
export interface FingerprintContextInterface {
    appId: string;
    booted: boolean;
    currentTrigger: Trigger;
    registerHandler: (trigger: Trigger) => void;
    trackEvent: (event: Event) => void;
    trackPageView: (pageView: PageView) => void;
    unregisterHandler: (trigger: Trigger) => void;
}
export declare const FingerprintContext: React.Context<FingerprintContextInterface>;
export declare const useFingerprint: () => FingerprintContextInterface;
export {};

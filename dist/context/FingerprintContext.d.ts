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
    consent?: boolean;
    consentCallback?: () => boolean;
    debug?: boolean;
    defaultHandlers?: Handler[];
    initialDelay?: number;
    exitIntentTriggers?: boolean;
    idleTriggers?: boolean;
};
export declare const FingerprintProvider: ({ appId, children, consent, consentCallback, debug, defaultHandlers, initialDelay, exitIntentTriggers, idleTriggers }: FingerprintProviderProps) => React.JSX.Element | null;
export interface FingerprintContextInterface {
    appId: string;
    booted: boolean;
    consent?: boolean;
    currentTrigger: Trigger;
    exitIntentTriggers: boolean;
    idleTriggers: boolean;
    initialDelay: number;
    registerHandler: (trigger: Trigger) => void;
    trackEvent: (event: Event) => void;
    trackPageView: (pageView: PageView) => void;
    unregisterHandler: (trigger: Trigger) => void;
}
export declare const FingerprintContext: React.Context<FingerprintContextInterface>;
export {};

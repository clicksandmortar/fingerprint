import React from 'react';
import { PageView, Trigger } from '../client/types';
import { Handler } from '../client/handler';
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
export declare const FingerprintProvider: ({ appId, children, consent, consentCallback, debug, defaultHandlers, initialDelay, exitIntentTriggers, idleTriggers }: FingerprintProviderProps) => {} | null | undefined;
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

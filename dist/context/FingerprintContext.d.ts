import React from 'react';
import { PageView, Trigger } from '../client/types';
export declare const cookieAccountJWT = "b2c_token";
export declare type FingerprintProviderProps = {
    appId?: string;
    children?: React.ReactNode;
    consent?: boolean;
    consentCallback?: () => boolean;
    debug?: boolean;
    defaultHandlers?: Trigger[];
    initialDelay?: number;
    exitIntentTriggers?: boolean;
    idleTriggers?: boolean;
    config?: {
        exitIntentDelay?: number;
        idleDelay?: number;
        triggerCooldown?: number;
    };
};
export declare const FingerprintProvider: ({ appId, children, consent, consentCallback, debug, defaultHandlers, initialDelay, exitIntentTriggers, idleTriggers, config }: FingerprintProviderProps) => {} | null | undefined;
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
    config: FingerprintProviderProps['config'];
}
export declare const FingerprintContext: React.Context<FingerprintContextInterface>;

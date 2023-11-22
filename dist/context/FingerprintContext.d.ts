import React from 'react';
import { FingerprintConfig, PageView, Trigger } from '../client/types';
export declare const cookieAccountJWT = "b2c_token";
export declare type FingerprintProviderProps = {
    appId?: string;
    children?: React.ReactNode;
    consent?: boolean;
    consentCallback?: () => boolean;
    /**
     * @deprecated
     * Please use the portal to configure these values. Until then this will act as override
     */
    debug?: boolean;
    defaultHandlers?: Trigger[];
    initialDelay?: number;
    exitIntentTriggers?: boolean;
    idleTriggers?: boolean;
    pageLoadTriggers?: boolean;
    /**
     * @deprecated
     * Please use the portal to configure these values. Until then this will act as override
     */
    config?: FingerprintConfig;
};
export declare const FingerprintProvider: ({ appId, children, consent, consentCallback, debug: legacy_debug, defaultHandlers, initialDelay, exitIntentTriggers, idleTriggers, pageLoadTriggers, config: legacy_config }: FingerprintProviderProps) => {} | null | undefined;
export interface FingerprintContextInterface {
    appId: string;
    booted: boolean;
    consent?: boolean;
    currentTrigger: Trigger | null;
    exitIntentTriggers: boolean;
    idleTriggers: boolean;
    pageLoadTriggers: boolean;
    initialDelay: number;
    registerHandler: (trigger: Trigger) => void;
    trackEvent: (event: Event) => void;
    trackPageView: (pageView: PageView) => void;
    unregisterHandler: (trigger: Trigger) => void;
}
export declare const FingerprintContext: React.Context<FingerprintContextInterface>;

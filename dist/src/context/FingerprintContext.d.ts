import React from 'react';
import { LEGACY_FingerprintConfig, PageView, Trigger } from '../client/types';
export declare const cookieAccountJWT = "b2c_token";
export declare type FingerprintProviderProps = {
    appId?: string;
    children?: React.ReactNode;
    consent?: boolean;
    consentCallback?: () => boolean;
    /**
     * @deprecated
     * This debug param is no longer used.
     * Please use the portal to configure these values.
     */
    debug: never;
    defaultHandlers?: Trigger[];
    initialDelay?: number;
    exitIntentTriggers?: boolean;
    idleTriggers?: boolean;
    pageLoadTriggers?: boolean;
    /**
     * @deprecated
     * Please use the portal to configure these values. Until then this will act as override
     */
    config?: LEGACY_FingerprintConfig;
};
export declare const FingerprintProvider: (props: FingerprintProviderProps) => {} | null | undefined;
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

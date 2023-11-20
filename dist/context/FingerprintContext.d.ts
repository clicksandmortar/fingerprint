import React from 'react';
import { FingerprintConfig, Trigger } from '../client/types';
export declare const cookieAccountJWT = "b2c_token";
export declare type FingerprintProviderProps = {
    appId?: string;
    tenantId?: string;
    children?: React.ReactNode;
    consent?: boolean;
    consentCallback?: () => boolean;
    debug?: boolean;
    defaultHandlers?: Trigger[];
    initialDelay?: number;
    exitIntentTriggers?: boolean;
    idleTriggers?: boolean;
    pageLoadTriggers?: boolean;
    config?: FingerprintConfig;
};
export declare const FingerprintProvider: ({ appId, tenantId, children, consent, consentCallback, debug, defaultHandlers, initialDelay, exitIntentTriggers, idleTriggers, pageLoadTriggers, config }: FingerprintProviderProps) => number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
export interface FingerprintContextInterface {
    appId: string;
    tenantId?: string;
    booted: boolean;
    consent?: boolean;
    currentTrigger: Trigger | null;
    exitIntentTriggers: boolean;
    idleTriggers: boolean;
    pageLoadTriggers: boolean;
    initialDelay: number;
    registerHandler: (trigger: Trigger) => void;
    config?: FingerprintConfig;
}
export declare const FingerprintContext: React.Context<FingerprintContextInterface>;

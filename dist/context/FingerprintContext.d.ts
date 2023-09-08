import React from 'react';
import { PageView, Trigger } from '../client/types';
declare type TriggerCallback = (trigger: Trigger) => void | JSX.Element | React.ReactPortal;
export declare type Handler = {
    /**
     * currently supports idle, exit etc, until we agree on a list
     */
    id?: string;
    /**
     * modal | youtube, etc. string until we agree on a list
     */
    behaviour?: string;
    /**
     * function to be triggered once the id condition is met
     */
    invoke?: TriggerCallback;
    /**
     * useful primarily for "idle" id. Trigger the action only after the user has been inactive for a certain time.
     * interval is cleared when the user becomes active and re-set once idle again
     */
    delay?: number;
    /**
     * performance. don't run the logic if an explicit skip condition is provided
     */
    skip?: boolean;
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
export {};

import React, { PropsWithChildren } from 'react';
import { Handler } from '../client/handler';
import { LEGACY_FingerprintConfig } from '../client/types';
export declare const cookieAccountJWT = "b2c_token";
export declare type FingerprintProviderProps = PropsWithChildren<{
    appId?: string;
    consent?: boolean;
    consentCallback?: () => boolean;
    /**
     * @deprecated
     * This debug param is no longer used.
     * Please use the portal to configure these values.
     */
    debug: never;
    defaultHandlers?: Handler[];
    initialDelay?: number;
    exitIntentTriggers?: boolean;
    idleTriggers?: boolean;
    pageLoadTriggers?: boolean;
    /**
     * @deprecated
     * Please use the portal to configure these values. Until then this will act as override
     */
    config?: LEGACY_FingerprintConfig;
}>;
export declare const FingerprintProvider: (props: FingerprintProviderProps) => {} | null | undefined;
export declare const useFingerprint: () => Pick<import("../beautifulSugar/slices/mutualSlice").FingerprintContextInterface & {
    appId?: string | undefined;
    consent?: boolean | undefined;
    consentCallback?: (() => boolean) | undefined;
    /**
     * @deprecated
     * This debug param is no longer used.
     * Please use the portal to configure these values.
     */
    debug: never;
    defaultHandlers?: Pick<import("../client/types").Trigger, "id" | "invoke" | "behaviour" | "multipleOfSameBehaviourSupported">[] | undefined;
    initialDelay?: number | undefined;
    exitIntentTriggers?: boolean | undefined;
    idleTriggers?: boolean | undefined;
    pageLoadTriggers?: boolean | undefined;
    /**
     * @deprecated
     * Please use the portal to configure these values. Until then this will act as override
     */
    config?: LEGACY_FingerprintConfig | undefined;
} & {
    children?: React.ReactNode;
}, "appId" | "booted" | "consent" | "exitIntentTriggers" | "idleTriggers" | "pageLoadTriggers" | "initialDelay" | "consentCallback" | "defaultHandlers" | "config" | "children"> & import("zustand/esm/vanilla").StoreApi<import("../beautifulSugar/types").DifiStore>;

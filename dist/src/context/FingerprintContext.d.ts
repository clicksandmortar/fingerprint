import React, { ReactElement } from "react";
import { Handler } from "../client/handler";
import { LEGACY_FingerprintConfig } from "../client/types";
/** * @todo - extract */
export declare type FingerprintProviderProps = {
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
    children: ReactElement | null | ReactElement;
};
export declare function FingerprintProvider(props: FingerprintProviderProps): React.JSX.Element | null;

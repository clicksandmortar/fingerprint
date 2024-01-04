import React, { ReactElement } from 'react';
import { Handler } from '../client/handler';
export declare type FingerprintProviderProps = {
    appId?: string;
    consent?: boolean;
    consentCallback?: () => boolean;
    defaultHandlers?: Handler[];
    initialDelay?: number;
    exitIntentTriggers?: boolean;
    idleTriggers?: boolean;
    pageLoadTriggers?: boolean;
    children: ReactElement | null | ReactElement;
};
export declare function FingerprintProvider(props: FingerprintProviderProps): React.JSX.Element | null;

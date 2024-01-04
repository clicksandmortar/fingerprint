import { Callback } from 'mixpanel-browser';
import React from 'react';
import { RegistrableUserProperties } from '../utils/types';
export declare type MixpanelProviderProps = {
    children?: React.ReactNode;
};
export declare const useMixpanel: () => {
    trackEvent: (event: string, props: any, callback?: Callback | undefined) => void;
    registerUserData: (properties: RegistrableUserProperties) => void;
    state: {
        initiated: boolean;
    };
};

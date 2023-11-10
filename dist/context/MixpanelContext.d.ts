import { Callback } from 'mixpanel-browser';
import React from 'react';
import { RegistrableUserProperties } from '../utils/types';
export declare type MixpanelProviderProps = {
    children?: React.ReactNode;
};
export declare const MixpanelProvider: ({ children }: MixpanelProviderProps) => React.JSX.Element;
export declare type MixpanelContextInterface = {
    trackEvent: (event: string, props: any, callback?: Callback) => void;
    registerUserData: (props: RegistrableUserProperties) => void;
    state: {
        initiated: boolean;
    };
};
export declare const MixpanelContext: React.Context<MixpanelContextInterface>;
export declare const useMixpanel: () => MixpanelContextInterface;

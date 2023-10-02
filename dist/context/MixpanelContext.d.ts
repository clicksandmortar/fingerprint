import { Callback } from 'mixpanel-browser';
import React from 'react';
export declare type MixpanelProviderProps = {
    children?: React.ReactNode;
};
export declare const MixpanelProvider: ({ children }: MixpanelProviderProps) => React.JSX.Element;
export declare type MixpanelContextInterface = {
    trackEvent: (event: string, props: any, callback?: Callback) => void;
};
export declare const MixpanelContext: React.Context<MixpanelContextInterface>;
export declare const useMixpanel: () => MixpanelContextInterface;

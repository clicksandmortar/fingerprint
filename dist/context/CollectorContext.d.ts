import React from 'react';
import { BehaviourHandler } from '../client/handler';
import { Trigger } from '../client/types';
export declare type CollectorProviderProps = {
    children?: React.ReactNode;
    handlers?: BehaviourHandler[];
};
export declare function CollectorProvider({ children, handlers }: CollectorProviderProps): React.JSX.Element;
export declare type CollectorContextInterface = {
    resetDisplayTrigger: () => void;
    setTrigger: (trigger: Trigger) => void;
    trackEvent: (event: string, properties?: any) => void;
};
export declare const CollectorContext: React.Context<CollectorContextInterface>;

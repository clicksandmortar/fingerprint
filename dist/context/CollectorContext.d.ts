import React from 'react';
import { Trigger } from '../client/types';
export declare type CollectorProviderProps = {
    children?: React.ReactNode;
    handlers?: Trigger[];
};
export declare function CollectorProvider({ children, handlers }: CollectorProviderProps): React.JSX.Element;
export declare type CollectorContextInterface = {
    addPageTriggers: (triggers: Trigger[]) => void;
    resetDisplayTrigger: () => void;
    setTrigger: (trigger: Trigger) => void;
    setIntently: (bool: boolean) => void;
    trackEvent: (event: string, properties?: any) => void;
};
export declare const CollectorContext: React.Context<CollectorContextInterface>;

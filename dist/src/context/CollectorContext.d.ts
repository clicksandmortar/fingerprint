import React from 'react';
import { Conversion, IncompleteTrigger, Trigger } from '../client/types';
export declare type CollectorProviderProps = {
    children?: React.ReactNode;
    handlers?: Trigger[];
};
export declare function CollectorProvider({ children, handlers }: CollectorProviderProps): React.JSX.Element;
export declare type CollectorContextInterface = {
    setPageTriggers: (triggers: Trigger[]) => void;
    setIncompleteTriggers: (triggers: IncompleteTrigger[]) => void;
    removeActiveTrigger: (id: Trigger['id']) => void;
    setActiveTrigger: (trigger: Trigger) => void;
    setConversions: (conversion: Conversion[]) => void;
    trackEvent: (event: string, properties?: any) => void;
};
export declare const CollectorContext: React.Context<CollectorContextInterface>;

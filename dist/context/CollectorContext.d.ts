import React from 'react';
import { Trigger } from '../client/types';
export declare type CollectorProviderProps = {
    children?: React.ReactNode;
    handlers?: Trigger[];
};
export declare function CollectorProvider({ children, handlers }: CollectorProviderProps): React.JSX.Element;
export declare type CollectorContextInterface = {
    addPageTriggers: (triggers: Trigger[]) => void;
    setPageTriggers: (triggers: Trigger[]) => void;
    removeActiveTrigger: (id: Trigger['id']) => void;
    setActiveTrigger: (trigger: Trigger) => void;
    trackEvent: (event: string, properties?: any) => void;
};
export declare const CollectorContext: React.Context<CollectorContextInterface>;

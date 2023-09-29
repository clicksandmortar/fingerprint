import React from 'react';
import { Handler } from '../client/handler';
import { Trigger } from '../client/types';
export declare type CollectorProviderProps = {
    children?: React.ReactNode;
    handlers?: Handler[];
};
export declare const CollectorProvider: ({ children, handlers }: CollectorProviderProps) => React.JSX.Element;
export declare type CollectorContextInterface = {
    resetDisplayTrigger: () => void;
    setTrigger: (trigger: Trigger) => void;
};
export declare const CollectorContext: React.Context<CollectorContextInterface>;

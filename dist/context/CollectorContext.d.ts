import React from 'react';
import { Handler } from '../client/handler';
export declare type CollectorProviderProps = {
    children?: React.ReactNode;
    handlers?: Handler[];
};
export declare const CollectorProvider: ({ children, handlers }: CollectorProviderProps) => React.JSX.Element;
export declare type CollectorContextInterface = {
    resetDisplayTrigger: () => void;
};
export declare const CollectorContext: React.Context<CollectorContextInterface>;

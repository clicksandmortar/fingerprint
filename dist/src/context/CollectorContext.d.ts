import React from 'react';
import { Trigger } from '../client/types';
export declare type CollectorProviderProps = {
    children?: React.ReactNode;
    handlers?: Trigger[];
};
export declare function CollectorProvider({ children }: CollectorProviderProps): React.JSX.Element;

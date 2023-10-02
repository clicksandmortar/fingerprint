import React from 'react';
import { Trigger } from './types';
declare type TriggerCallback = (trigger: Trigger) => void | JSX.Element | React.ReactPortal;
export declare type Handler = {
    id?: string;
    invocation?: 'INVOCATION_UNSPECIFIED' | 'INVOCATION_IDLE_TIME' | 'INVOCATION_EXIT_INTENT' | 'INVOCATION_PAGE_LOAD';
    behaviour?: string;
    invoke?: TriggerCallback;
};
export declare const clientHandlers: Handler[];
export {};

import { Trigger } from './types';
import React from 'react';
declare type TriggerCallback = (trigger: Trigger) => void | JSX.Element | React.ReactPortal;
export declare type Handler = {
    id?: string;
    type?: 'exit' | 'idle' | 'default';
    behaviour?: string;
    invoke?: TriggerCallback;
};
export declare const clientHandlers: Handler[];
export declare const getBrand: (url: string) => any;
export {};

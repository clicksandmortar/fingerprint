import React from 'react';
import { Trigger } from './types';
export declare type BehaviourHandler = Pick<Trigger, 'id' | 'behaviour'> & {
    invoke: (trigger: Trigger) => void | JSX.Element | React.ReactPortal;
};
export declare const clientHandlers: BehaviourHandler[];

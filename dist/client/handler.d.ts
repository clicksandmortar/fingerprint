import { Trigger } from './types';
export declare type ClientTrigger = Pick<Trigger, 'id' | 'invoke' | 'behaviour' | 'multipleOfSameBehaviourSupported'>;
export declare const clientHandlers: ClientTrigger[];

import { Trigger } from './types';
export declare type Handler = Pick<Trigger, 'id' | 'invoke' | 'behaviour' | 'multipleOfSameBehaviourSupported'>;
export declare const clientHandlers: Handler[];

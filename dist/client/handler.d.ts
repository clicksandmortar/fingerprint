import { APITrigger, Handler } from './types';
export declare type ClientTrigger = Pick<Handler, 'id' | 'invoke'> & Pick<APITrigger, 'behaviour'>;
export declare const clientHandlers: ClientTrigger[];

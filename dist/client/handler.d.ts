import { CollectorResponse, CollectorUpdate } from './types';
export declare const sendEvent: (data: CollectorUpdate) => CollectorResponse;
export declare const getOffer: (url: string) => string | undefined;
export declare const getUrl: (url: string) => string | undefined;
export declare const getBrand: (url: string) => any;

import { Visitor } from '../visitors/types';
export declare type CollectorUpdate = {
    appId: string;
    visitor: Visitor;
    page: Page;
    referrer: Referrer;
};
export declare type Page = {
    url: string;
    path: string;
    title: string;
    params?: {
        [key: string]: string;
    };
};
export declare type Referrer = {
    url: string;
    title: string;
    params?: {
        [key: string]: string;
    };
    utm?: {
        source?: string;
        medium?: string;
        campaign?: string;
        content?: string;
        term?: string;
    };
};
export declare type CollectorResponse = {
    firstSeen: Date;
    lastSeen: Date;
    visits: number;
    trigger: Trigger;
};
export declare type Trigger = {
    id?: string;
    type?: 'idle' | 'exit' | 'default';
    behaviour?: string;
    data?: {
        [key: string]: string;
    };
    brand?: any;
};
export declare type PageView = {
    page: Page;
    referrer: Referrer;
    viewedAt: Date;
};

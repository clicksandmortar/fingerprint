/// <reference types="react" />
import { Visitor } from '../visitors/types';
export declare type CollectorUpdate = {
    appId: string;
    visitor: Visitor;
    sessionId: string | undefined;
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
    pageTriggers: Trigger[];
    intently: boolean;
};
export declare type MutualTriggerProps = {
    id?: string;
    invocation?: 'INVOCATION_UNSPECIFIED' | 'INVOCATION_IDLE_TIME' | 'INVOCATION_EXIT_INTENT' | 'INVOCATION_PAGE_LOAD';
    data?: {
        [key: string]: string;
    };
    brand?: any;
};
export declare type Handler = MutualTriggerProps & {
    invoke?: (trigger: Trigger) => void | JSX.Element | React.ReactNode;
};
export declare type APITrigger = MutualTriggerProps & {
    behaviour?: 'BEHAVIOUR_MODAL' | 'BEHAVIOUR_YOUTUBE' | 'BEHAVIOUR_INVERSE_FLOW';
};
export declare type Trigger = APITrigger | Handler;
export declare type PageView = {
    page: Page;
    referrer: Referrer;
    viewedAt: Date;
};

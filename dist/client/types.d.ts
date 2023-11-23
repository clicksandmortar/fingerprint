/// <reference types="react" />
import { SupportedBrand } from '../utils/brand';
import { Visitor } from '../visitors/types';
export declare type CollectorUpdate = {
    appId?: string;
    visitor?: Visitor;
    sessionId?: string | undefined;
    page?: Page | undefined;
    referrer?: Referrer | undefined;
    elements?: PageElement[] | undefined;
    account?: Account | undefined;
    form?: Form | undefined;
    button?: Button | undefined;
};
export declare type Button = {
    id?: string;
    selector?: string;
    path?: string;
};
export declare type Form = {
    data: {
        [key: string]: any;
    };
};
export declare type Account = {
    token: string;
};
export declare type PageElement = {
    selector: string;
    path: string;
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
export declare type IncompleteTrigger = Trigger & {
    signals: [{
        op: 'CanSeeElementOnPage';
        parameters: {
            selector: string;
        };
    }];
};
export declare type CollectorVisitorResponse = {
    firstSeen: Date;
    lastSeen: Date;
    visits: number;
    pageTriggers: Trigger[];
    config: Config;
    incompleteTriggers?: IncompleteTrigger[];
    intently: boolean;
};
export declare type Invocation = 'INVOCATION_UNSPECIFIED' | 'INVOCATION_IDLE_TIME' | 'INVOCATION_EXIT_INTENT' | 'INVOCATION_PAGE_LOAD' | 'INVOCATION_ELEMENT_VISIBLE';
export declare type Trigger = {
    id: string;
    invocation?: Invocation;
    data?: {
        [key: string]: string;
    };
    invoke?: (trigger: Trigger) => void | JSX.Element | React.ReactNode;
    behaviour?: 'BEHAVIOUR_MODAL' | 'BEHAVIOUR_YOUTUBE' | 'BEHAVIOUR_INVERSE_FLOW' | 'BEHAVIOUR_BANNER';
    brand?: any;
};
export declare type PageView = {
    page: Page;
    referrer: Referrer;
    viewedAt: Date;
};
export declare type FingerprintConfig = {
    exitIntentDelay?: number;
    idleDelay?: number;
    triggerCooldown?: number;
};
declare type ScriptConfig = {
    debugMode: boolean;
};
declare type TriggerConfig = {
    userIdleThresholdSecs: number;
    displayTriggerAfterSecs: number;
    triggerCooldownSecs: number;
};
declare type BrandConfig = {
    name: SupportedBrand;
    colors?: {
        backgroundPrimary: string;
        backgroundPrimaryDimmed: string;
        backgroundSecondary: string;
        shadeOfGrey: string;
        textPrimary: string;
        greyText: string;
    };
};
export declare type Config = {
    script: ScriptConfig;
    trigger: TriggerConfig;
    brand: BrandConfig;
};
export {};

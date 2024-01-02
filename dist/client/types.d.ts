/// <reference types="react" />
import { SupportedBrand } from '../utils/brand';
import { DeviceInfo } from '../utils/device';
import { Visitor } from '../visitors/types';
export declare type Interaction = {
    variantID: string;
    shownAt: string;
};
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
    conversion?: {
        id: string;
    };
    device?: DeviceInfo | undefined;
    cta?: Interaction;
    exit?: Interaction;
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
export declare type Operator = 'starts_with' | 'contains' | 'ends_with' | 'eq';
export declare type ComparisonFunc = (comparison: string) => boolean;
export declare type IsOnPathSignal = {
    op: 'IsOnPath';
    parameters: [Operator, string];
};
export declare type IsOnDomainSignal = {
    op: 'IsOnDomain';
    parameters: [string];
};
export declare type CanSeeElementOnPageSignal = {
    op: 'CanSeeElementOnPage';
    parameters: [string, // selector
    Operator, // operator
    string];
};
export declare type FESignal = IsOnPathSignal | IsOnDomainSignal | CanSeeElementOnPageSignal;
export declare type Conversion = {
    identifier: string;
    signals: FESignal[];
    analyticsEvent: string;
};
export declare type IncompleteTrigger = Trigger & {
    signals: FESignal[];
};
export declare type CollectorVisitorResponse = {
    firstSeen: string;
    lastSeen: string;
    visits: {
        host: 3;
        path: 3;
    };
    pageTriggers: Trigger[];
    config: ConfigResponseIBlameBlixenkrone;
    incompleteTriggers?: IncompleteTrigger[];
    intently: boolean;
    identifiers?: {
        main?: string;
    };
    conversions: Conversion[];
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
    variantID?: string;
    variantName?: string;
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
declare type ObjectMap<T, F, W> = {
    [K in keyof T]: T[K] extends F ? W : T[K];
};
export declare type Config = {
    script: ScriptConfig;
    trigger: TriggerConfig;
    brand: BrandConfig;
};
export declare type ConfigResponseIBlameBlixenkrone = {
    script: ScriptConfig;
    trigger: ObjectMap<TriggerConfig, number, string>;
    brand: BrandConfig;
};
export {};

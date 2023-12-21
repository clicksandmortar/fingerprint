/// <reference types="react" />
export declare const useFingerprint: () => Pick<import("../beautifulSugar/slices/mutualSlice").FingerprintContextInterface & {
    appId?: string | undefined;
    consent?: boolean | undefined;
    consentCallback?: (() => boolean) | undefined;
    debug: never;
    defaultHandlers?: Pick<import("../client/types").Trigger, "id" | "invoke" | "behaviour" | "multipleOfSameBehaviourSupported">[] | undefined;
    initialDelay?: number | undefined;
    exitIntentTriggers?: boolean | undefined;
    idleTriggers?: boolean | undefined;
    pageLoadTriggers?: boolean | undefined;
    config?: import("../client/types").LEGACY_FingerprintConfig | undefined;
} & {
    children?: import("react").ReactNode;
}, "appId" | "booted" | "consent" | "exitIntentTriggers" | "idleTriggers" | "pageLoadTriggers" | "initialDelay" | "consentCallback" | "defaultHandlers" | "config" | "children"> & import("zustand/esm/vanilla").StoreApi<import("../beautifulSugar/store").DifiStore>;

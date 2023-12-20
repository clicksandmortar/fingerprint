/// <reference types="react" />
export declare const useFingerprint: () => Pick<import("react").PropsWithChildren<{
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
}>, "appId" | "consent" | "consentCallback" | "defaultHandlers" | "initialDelay" | "exitIntentTriggers" | "idleTriggers" | "pageLoadTriggers" | "config" | "children"> & import("zustand/esm/vanilla").StoreApi<import("../beautifulSugar/types").DifiStore>;

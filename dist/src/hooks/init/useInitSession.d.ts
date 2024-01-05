import React from 'react';
export declare type VisitorProviderProps = {
    children?: React.ReactNode;
};
export declare const useInitSession: () => void;
export declare const useSession: () => import("../../beautifulSugar/slices/pageTriggersSlice").PageTriggersSlice & import("../../beautifulSugar/slices/configSlice").ConfigSlice & import("../../beautifulSugar/slices/mutualSlice").MutualSlice & import("../../beautifulSugar/slices/handlersSlice").HandlersSlice & import("../../beautifulSugar/slices/visitorSlice").VisitorSlice & import("../../beautifulSugar/slices/trackingSlice").TrackingSlice & import("../../beautifulSugar/slices/incompleteTriggersSlice").IncompleteTriggersSlice & import("../../beautifulSugar/slices/temp_intentlySlice").IntentlySlice & import("../../beautifulSugar/slices/idleTimeSlice").IdleTimeSlice & import("../../beautifulSugar/slices/conversionsSlice").ConversionsSlice & import("../../beautifulSugar/slices/loggingSlice").LoggingSlice & import("../../beautifulSugar/slices/utilitySlice").UtilitySlice & import("zustand/esm/vanilla").StoreApi<import("../../beautifulSugar/store").DifiStore>;

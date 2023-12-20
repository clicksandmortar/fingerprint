import React from 'react';
export declare type VisitorProviderProps = {
    children?: React.ReactNode;
};
export declare const useInitSession: () => void;
export declare const useSession: () => import("../../beautifulSugar/slices/pageTriggersSlice").PageTriggersSlice & import("../../beautifulSugar/slices/configSlice").ConfigSlice & import("../../beautifulSugar/slices/mutualSlice").MutualSlice & import("../useLogging").LoggingSlice & import("../../beautifulSugar/slices/handlersSlice").HandlersSlice & import("../../beautifulSugar/slices/visitorSlice").VisitorSlice & import("zustand/esm/vanilla").StoreApi<import("../../beautifulSugar/types").DifiStore>;

import React from 'react';
export declare type VisitorProviderProps = {
    children?: React.ReactNode;
};
export declare const useInitVisitor: () => null;
export declare const useVisitor: () => import("../../beautifulSugar/slices/pageTriggersSlice").PageTriggersSlice & import("../../beautifulSugar/slices/configSlice").ConfigSlice & import("../../beautifulSugar/slices/mutualSlice").MutualSlice & import("../useLogging").LoggingSlice & import("../../beautifulSugar/slices/handlersSlice").HandlersSlice & import("../../beautifulSugar/slices/visitorSlice").VisitorSlice & import("zustand/esm/vanilla").StoreApi<import("../../beautifulSugar/types").DifiStore>;

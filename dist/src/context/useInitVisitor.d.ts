import React from 'react';
import { Session } from '../sessions/types';
import { Visitor } from '../visitors/types';
export declare type VisitorProviderProps = {
    children?: React.ReactNode;
};
export declare const useInitSession: () => void;
export declare const useInitVisitor: () => null;
export declare type VisitorContextInterface = {
    session: Session;
    visitor: Visitor;
    setVisitor: (visitor: Partial<Visitor>) => void;
};
export declare const useVisitor: () => import("../beautifulSugar/slices/pageTriggersSlice").PageTriggersSlice & import("../beautifulSugar/slices/configSlice").ConfigSlice & import("../beautifulSugar/slices/mutualSlice").MutualSlice & import("../hooks/useLogging").LoggingSlice & import("../beautifulSugar/slices/handlersSlice").HandlersSlice & import("../beautifulSugar/slices/visitorSlice").VisitorSlice & import("zustand/esm/vanilla").StoreApi<import("../beautifulSugar/types").DifiStore>;

import { UseDifiStore } from './types';
export declare const useDifiStore: UseDifiStore;
export declare const useStore: () => import("./slices/pageTriggersSlice").PageTriggersSlice & import("./slices/configSlice").ConfigSlice & import("./slices/mutualSlice").MutualSlice & import("../hooks/useLogging").LoggingSlice & import("./slices/handlersSlice").HandlersSlice & import("./slices/visitorSlice").VisitorSlice & import("zustand/esm/vanilla").StoreApi<import("./types").DifiStore>;

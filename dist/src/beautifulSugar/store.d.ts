import { UseDifiStore } from './types';
export declare const useDifiStore: UseDifiStore;
export declare const useStore: () => import("./slices/pageTriggersSlice").PageTriggersSlice & import("./slices/configSlice").ConfigSlice & import("./slices/mutual").MutualSlice & import("./slices/loggingSlice").LoggingSlice & import("zustand/esm/vanilla").StoreApi<import("./types").DifiStore>;

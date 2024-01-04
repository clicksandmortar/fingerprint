import { ConfigSlice } from './slices/configSlice';
import { ConversionsSlice } from './slices/conversionsSlice';
import { HandlersSlice } from './slices/handlersSlice';
import { IdleTimeSlice } from './slices/idleTimeSlice';
import { IncompleteTriggersSlice } from './slices/incompleteTriggersSlice';
import { LoggingSlice } from './slices/loggingSlice';
import { MutualSlice } from './slices/mutualSlice';
import { PageTriggersSlice } from './slices/pageTriggersSlice';
import { IntentlySlice } from './slices/temp_intentlySlice';
import { TrackingSlice } from './slices/trackingSlice';
import { VisitorSlice } from './slices/visitorSlice';
import { UseDifiStore } from './types';
import { UtilitySlice } from './slices/utilitySlice';
export declare type DifiStore = PageTriggersSlice & ConfigSlice & MutualSlice & HandlersSlice & VisitorSlice & TrackingSlice & IncompleteTriggersSlice & IntentlySlice & IdleTimeSlice & ConversionsSlice & LoggingSlice & UtilitySlice;
export declare const useDifiStore: UseDifiStore;
export declare const useEntireStore: () => PageTriggersSlice & ConfigSlice & MutualSlice & HandlersSlice & VisitorSlice & TrackingSlice & IncompleteTriggersSlice & IntentlySlice & IdleTimeSlice & ConversionsSlice & LoggingSlice & UtilitySlice & import("zustand/esm/vanilla").StoreApi<DifiStore>;

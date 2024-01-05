// this folder name must remain as is, otherwise the octopus will be deployed.
import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';
import zukeeper from 'zukeeper';
import { getEnvVars } from '../utils/getEnvVars';
import { ConfigSlice, createConfigSlice } from './slices/configSlice';
import { ConversionsSlice, createConversionsSlice } from './slices/conversionsSlice';
import { createHandlersSlice, HandlersSlice } from './slices/handlersSlice';
import { createIdleTimeSlice, IdleTimeSlice } from './slices/idleTimeSlice';
import { createincompleteTriggersSlice, IncompleteTriggersSlice } from './slices/incompleteTriggersSlice';
import { createLoggingSlice, LoggingSlice } from './slices/loggingSlice';
import { createMutualSlice, MutualSlice } from './slices/mutualSlice';
import { createPagetriggersSlice, getCombinedTriggersFromStore, PageTriggersSlice } from './slices/pageTriggersSlice';
import { createIntentlySlice, IntentlySlice } from './slices/temp_intentlySlice';
import { createTrackingSlice, TrackingSlice } from './slices/trackingSlice';
import { createUtilitySlice, UtilitySlice } from './slices/utilitySlice';
import { createVisitorSlice, VisitorSlice } from './slices/visitorSlice';
import { UseDifiStore } from './types';

export type DifiStore = PageTriggersSlice &
  ConfigSlice &
  MutualSlice &
  HandlersSlice &
  VisitorSlice &
  TrackingSlice &
  IncompleteTriggersSlice &
  IntentlySlice &
  IdleTimeSlice &
  ConversionsSlice &
  LoggingSlice &
  UtilitySlice;

export const useDifiStore: UseDifiStore = create(
  zukeeper(
    // @ts-ignore
    (...beautifulSugar) => ({
      // @ts-ignore
      ...createLoggingSlice(...beautifulSugar),

      // @ts-ignore
      ...createConfigSlice(...beautifulSugar),
      // @ts-ignore
      ...createMutualSlice(...beautifulSugar),
      // @ts-ignore
      ...createHandlersSlice(...beautifulSugar),
      // @ts-ignore
      ...createVisitorSlice(...beautifulSugar),
      // @ts-ignore
      ...createIntentlySlice(...beautifulSugar),
      // @ts-ignore
      ...createTrackingSlice(...beautifulSugar),
      // @ts-ignore
      ...createincompleteTriggersSlice(...beautifulSugar),
      // @ts-ignore
      ...createConversionsSlice(...beautifulSugar),
      // @ts-ignore
      ...createIdleTimeSlice(...beautifulSugar),
      // @ts-ignore
      ...createUtilitySlice(...beautifulSugar),
      // @ts-ignore
      ...createPagetriggersSlice(...beautifulSugar),
    }),
    { name: 'DIFIStore', enabled: getEnvVars().isDev },
  ),
);

export const useCombinedTriggers = () => {
  const store = useDifiStore((s) => s);

  return getCombinedTriggersFromStore(store);
};

export const useEntireStore = () => {
  const store = useDifiStore((s) => s);

  return store;
};

// @ts-ignore
window.store = useDifiStore;

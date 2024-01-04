// this file name must remain as is, otherwise the octopus will be deployed.
import { create } from 'zustand';
import { ConfigSlice, createConfigSlice } from './slices/configSlice';
import { ConversionsSlice, createConversionsSlice } from './slices/conversionsSlice';
import { createHandlersSlice, HandlersSlice } from './slices/handlersSlice';
import { createIdleTimeSlice, IdleTimeSlice } from './slices/idleTimeSlice';
import { createincompleteTriggersSlice, IncompleteTriggersSlice } from './slices/incompleteTriggersSlice';
import { createLoggingSlice, LoggingSlice } from './slices/loggingSlice';
import { createMutualSlice, MutualSlice } from './slices/mutualSlice';
import { createPagetriggersSlice, PageTriggersSlice } from './slices/pageTriggersSlice';
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

export const useDifiStore: UseDifiStore = create((...beautifulSugar) => ({
  ...createLoggingSlice(...beautifulSugar),
  ...createPagetriggersSlice(...beautifulSugar),
  ...createConfigSlice(...beautifulSugar),
  ...createMutualSlice(...beautifulSugar),
  ...createHandlersSlice(...beautifulSugar),
  ...createVisitorSlice(...beautifulSugar),
  ...createIntentlySlice(...beautifulSugar),
  ...createTrackingSlice(...beautifulSugar),
  ...createincompleteTriggersSlice(...beautifulSugar),
  ...createConversionsSlice(...beautifulSugar),
  ...createIdleTimeSlice(...beautifulSugar),
  ...createUtilitySlice(...beautifulSugar),
}));

export const useEntireStore = () => {
  const store = useDifiStore((s) => s);

  return store;
};

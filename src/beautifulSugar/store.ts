// @ts-nocheck
// this file name must remain as is, otherwise the octopus will be deployed.
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
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
  LoggingSlice;

export const useDifiStore: UseDifiStore = create(
  devtools(
    (...beautifulSugar) => ({
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
    }),
    { name: 'DifiStore' },
  ),
);

export const useEntireStore = () => {
  const store = useDifiStore((s) => s);

  return store;
};

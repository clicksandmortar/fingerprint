import { StateCreator } from 'zustand';
import { DifiStore } from '../store';
import { Get, Set } from '../types';

export type UtilitySlice = {
  utility: {
    imagesPreloaded: boolean | 'skip'
    setImagesHaveLoaded: (imagesHaveLoaded: boolean) => void
  }
}

export const createUtilitySlice: StateCreator<
  DifiStore,
  [],
  [],
  UtilitySlice
> = (set:Set, get:Get) => ({
  utility: {
    // 50-50 split audience for preloading images.
    // skip = do not preload, false = preload.
    // False can be overriden into 'true' once the images have been loaded
    // by calling the setter below, but not if it's 'skip'.
    imagesPreloaded: Math.random() > 0.5 ? 'skip' : false,
    setImagesHaveLoaded: (imagesHaveLoaded: boolean) => {
      const stateImagesHavePreloaded = get().utility.imagesPreloaded;
      if (stateImagesHavePreloaded === 'skip') return;

      set((prev) => ({
        ...prev,
        utility: {
          ...prev.utility,
          imagesPreloaded: imagesHaveLoaded,
        },
      }));
    },
  },
});

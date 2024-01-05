import { StateCreator } from 'zustand';
import { DifiStore } from '../store';
export declare type UtilitySlice = {
    utility: {
        imagesPreloaded: boolean | 'skip';
        setImagesHaveLoaded: (imagesHaveLoaded: boolean) => void;
    };
};
export declare const createUtilitySlice: StateCreator<DifiStore, [], [], UtilitySlice>;

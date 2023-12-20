import { StateCreator } from 'zustand';
import { DifiStore } from '../store';
export declare type TrackingSlice = {
    tracking: {
        initiated: boolean;
        setInitiated: (val: boolean) => void;
    };
};
export declare const createTrackingSlice: StateCreator<DifiStore, [], [], TrackingSlice>;

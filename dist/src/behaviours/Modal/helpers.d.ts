/// <reference types="react" />
import { Trigger } from '../../client/types';
import { DataCaptureTrigger } from './Modal.types';
export declare const randomHash: string;
export declare const prependClass: (className: string) => string;
export declare const getIsModalFullyClickable: ({ trigger }: {
    trigger: Trigger;
}) => boolean;
export declare const useModalDimensionsBasedOnImage: ({ imageURL }: {
    imageURL: string;
}) => {
    imageDimensions: {
        width: number;
        height: number;
    };
    setImageDimensions: import("react").Dispatch<import("react").SetStateAction<{
        width: number;
        height: number;
    }>>;
};
export declare const isModalDataCaptureModal: (trigger: any) => trigger is DataCaptureTrigger;
export declare function splitSenseOfUrgencyText(text: string): string[];
export declare const buildTextWithPotentiallyCountdown: (text: string) => {
    text: string;
} | {
    text1: string;
    hasCountdown: boolean;
    text2?: string | undefined;
};

import { CSSProperties } from 'react';
import { Trigger } from '../../../client/types';
export declare type ModalSize = 'small' | 'medium' | 'large' | 'full';
export declare type ButtonPosition = 'left' | 'center' | 'right';
export declare const getModalStylesBySize: (size: ModalSize) => CSSProperties;
export declare const getModalButtonStylesBySize: (size: ModalSize) => CSSProperties;
export declare const getModalButtonFlexPosition: (position: ButtonPosition) => CSSProperties;
export declare const randomHash = "cnm-behaviour";
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

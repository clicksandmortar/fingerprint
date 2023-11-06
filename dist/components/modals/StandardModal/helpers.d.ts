import { CSSProperties } from 'react';
export declare type ModalSize = 'small' | 'medium' | 'large' | 'full';
export declare type ButtonPosition = 'left' | 'center' | 'right';
export declare type TriggerConfig = {
    modal?: {
        size?: ModalSize;
        textShadow?: boolean;
        textColor?: string;
        buttonPosition?: ButtonPosition;
    };
    banner?: {};
    youtube?: {};
    inverseFlow?: {};
};
export declare const getModalStylesBySize: (size: ModalSize) => CSSProperties;
export declare const getModalButtonStylesBySize: (size: ModalSize) => CSSProperties;
export declare const getModalButtonFlexPosition: (position: ButtonPosition) => CSSProperties;
export declare const randomHash: string;
export declare const prependClass: (className: string) => string;

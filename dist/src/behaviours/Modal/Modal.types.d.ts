import { Trigger } from '../../client/types';
export declare type ModalProps<T = Trigger> = {
    trigger: T;
    handleClickCallToAction: (e: any) => void;
    handleCloseModal: (e: any) => void;
};
export declare type DataCaptureTrigger = Omit<Trigger, 'data'> & {
    data?: {
        heading?: string;
        paragraph?: string;
        backgroundURL?: string;
        buttonText?: string;
        successText?: string;
        errorText?: string;
    };
};
export declare type DataCaptureModalField = {
    name: string;
    label: string;
    type: string;
    required: boolean;
};
export declare type HandleCloseOptions = {
    skipTrackingEvent?: boolean;
};

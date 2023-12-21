import { Callback } from 'mixpanel-browser';
import { RegistrableUserProperties } from '../../utils/types';
export declare const useTracking: () => {
    trackEvent: (event: string, props: any, callback?: Callback | undefined) => void;
    registerUserData: (properties: RegistrableUserProperties) => void;
    state: {
        initiated: boolean;
    };
};

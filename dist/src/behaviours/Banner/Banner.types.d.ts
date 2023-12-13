import { Trigger } from '../../client/types';
import { IconName } from '../../components/Icon/Icon.types';
import { Position } from './utils';
export declare type BannerTrigger = Omit<Trigger, 'data'> & {
    data: {
        position: Position;
        buttonURL?: string;
        marketingText?: string;
        buttonText?: string;
        countdownEndTime?: string;
        buttonIcon?: IconName;
    };
};
export declare type BannerProps = {
    trigger: BannerTrigger;
    handleAction: (e: any) => void;
    handleClose: (e: any) => void;
};

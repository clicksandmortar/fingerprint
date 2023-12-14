import { Trigger } from '../../client/types';
import { Icon } from '../../components/Icon';
import { Position } from './utils';
export declare type BannerTrigger = Omit<Trigger, 'data'> & {
    data: {
        position: Position;
        buttonURL?: string;
        marketingText?: string;
        buttonText?: string;
        countdownEndTime?: string;
        buttonIcon?: Icon;
    };
};
export declare type BannerProps = {
    trigger: BannerTrigger;
    handleAction: (e: any) => void;
    handleClose: (e: any) => void;
};

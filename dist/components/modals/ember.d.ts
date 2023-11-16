import React from 'react';
import { Trigger } from '../../client/types';
declare type Props = {
    trigger: Trigger;
    handleClickCallToAction: (e: any) => void;
    handleCloseModal: (e: any) => void;
    style: {
        width: number;
        height: number;
    };
};
declare const FullyClickableModal: ({ trigger, handleClickCallToAction, handleCloseModal, style }: Props) => React.JSX.Element | null;
export default FullyClickableModal;

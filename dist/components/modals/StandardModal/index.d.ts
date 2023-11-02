import React from 'react';
import { Trigger } from '../../../client/types';
declare type Props = {
    trigger: Trigger;
    handleClickCallToAction: (e: any) => void;
    handleCloseModal: (e: any) => void;
};
declare const CnMStandardModal: ({ trigger, handleClickCallToAction, handleCloseModal }: Props) => React.JSX.Element | null;
export default CnMStandardModal;

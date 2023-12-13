/**
 * @deprecated
 *
 * This file is used by a few campaigns. Once they are over, use the StdModal and delete this file
 *
 */
import React from 'react';
import { Trigger } from '../../client/types';
declare type Props = {
    handleClickCallToAction: (e: any) => void;
    handleCloseModal: (e: any) => void;
    trigger: Trigger;
};
declare const FullyClickableModal: ({ handleClickCallToAction, handleCloseModal, trigger }: Props) => React.JSX.Element | null;
export default FullyClickableModal;

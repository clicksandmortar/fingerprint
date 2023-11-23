/**
 * Didnt spend too much time makeing this proper, since it will get merged with
 * the standard modal soon
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

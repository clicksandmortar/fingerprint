/**
 * Didnt spend too much time makeing this proper, since it will get merged with
 * the standard modal soon
 */
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
    imageURL: string;
};
declare const FullyClickableModal: ({ handleClickCallToAction, handleCloseModal, style, imageURL }: Props) => React.JSX.Element | null;
export default FullyClickableModal;

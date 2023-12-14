import React from 'react';
import { Trigger } from '../../../client/types';
declare type Props = {
    trigger: Trigger;
    handleClickCallToAction: (e: any) => void;
    handleCloseModal: (e: any) => void;
};
export declare const StonehouseModal: (props: Props) => React.JSX.Element;
export default StonehouseModal;

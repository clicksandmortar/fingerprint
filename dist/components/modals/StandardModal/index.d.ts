import React from 'react';
import { Trigger } from '../../../client/types';
declare type Props = {
    trigger: Trigger;
    handleClickCallToAction: (e: any) => void;
    handleCloseModal: (e: any) => void;
};
declare const StandardModal: (props: Props) => React.JSX.Element;
export default StandardModal;

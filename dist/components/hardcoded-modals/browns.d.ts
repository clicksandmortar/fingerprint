import React from 'react';
import { APITrigger } from '../../client/types';
declare type Props = {
    trigger: APITrigger;
    handleClickCallToAction: (e: any) => void;
    handleCloseModal: (e: any) => void;
};
export declare const BrownsModal: ({ trigger, handleClickCallToAction, handleCloseModal }: Props) => React.JSX.Element | null;
export {};

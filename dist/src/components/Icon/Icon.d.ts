import React from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { IconName } from './Icon.types';
declare type typesPropsIcon = {
    icon: IconName;
} & IconBaseProps;
export declare function IcomEl({ icon, ...props }: typesPropsIcon): JSX.Element;
export declare const Icon: React.MemoExoticComponent<typeof IcomEl>;
export {};

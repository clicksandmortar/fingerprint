import React from 'react';
import { IconBaseProps } from 'react-icons/lib';
declare type typesPropsIcon = {
    icon: string;
} & IconBaseProps;
export declare function IcomEl({ icon, ...props }: typesPropsIcon): JSX.Element;
export declare const Icon: React.MemoExoticComponent<typeof IcomEl>;
export {};

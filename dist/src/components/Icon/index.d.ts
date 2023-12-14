import React from 'react';
export declare type IconProps = Omit<React.HTMLProps<SVGElement>, 'ref'> & {
    fill?: string;
};
export declare const iconList: Record<Icon, React.FC>;
export declare type Icon = 'exclamation' | 'ticket' | 'heart';
declare type Props = {
    icon: Icon;
} & IconProps;
export declare const Icon: ({ icon, ...props }: Props) => React.JSX.Element | null;
export {};

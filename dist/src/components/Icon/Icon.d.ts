import { IconBaseProps } from 'react-icons/lib';
import { IconName } from './Icon.types';
export declare type IconProps = {
    icon: IconName;
} & IconBaseProps;
export declare function IconEl({ icon, ...props }: IconProps): JSX.Element;
export declare const Icon: (props: {
    icon: string;
}) => JSX.Element | null;

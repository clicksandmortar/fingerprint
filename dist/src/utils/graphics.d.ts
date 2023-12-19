/// <reference types="react" />
import { IconName } from '@fortawesome/fontawesome-svg-core';
export declare type Icon = IconName;
export declare function getIcon(key: IconName): any;
export declare const getReactIcon: (key: string) => (props: import("react-icons").IconBaseProps) => import("react").JSX.Element;

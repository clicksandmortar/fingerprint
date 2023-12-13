/// <reference types="react" />
import * as libIcons from 'react-icons/lib';
import { IconName } from './Icon.types';
export declare const getIcon: (name: IconName) => libIcons.IconType | libIcons.IconManifestType[] | typeof libIcons.GenIcon | libIcons.IconContext | import("react").Context<libIcons.IconContext> | null;

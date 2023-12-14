/// <reference types="react" />
import { Trigger } from '../client/types';
declare type Props = {
    trigger: Trigger;
};
declare const useActivationSeen: ({ trigger }: Props) => {
    open: boolean;
    setOpen: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
export default useActivationSeen;

/// <reference types="react" />
declare type InterpolateVal = {
    structure: Record<string, unknown>;
    text?: string;
};
declare type Props = {
    onZero?: () => void;
    initialTimestamp?: Date;
    interpolate?: InterpolateVal;
};
declare const useCountdown: ({ onZero, initialTimestamp, interpolate }: Props) => {
    countdown: string;
    setTimeStamp: import("react").Dispatch<import("react").SetStateAction<Date | null>>;
    formattedCountdown: string;
};
export default useCountdown;

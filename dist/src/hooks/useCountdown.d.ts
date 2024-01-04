/// <reference types="react" />
declare type InterpolateVal = {
    structure: Record<string, unknown>;
    text?: string;
};
declare type Props = {
    onZero?: () => void;
    initialTimestamp?: Date;
    interpolate?: InterpolateVal;
    formatDate?: (targetDate: Date) => string;
};
declare const useCountdown: ({ onZero, initialTimestamp, interpolate, formatDate, }: Props) => {
    countdown: string;
    setTimeStamp: import("react").Dispatch<import("react").SetStateAction<Date | null>>;
    formattedCountdown: string | null;
};
export default useCountdown;

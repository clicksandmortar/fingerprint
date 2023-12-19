/// <reference types="node" />
import React from 'react';
declare type FlipClockProps = {
    targetDate: Date;
    startDate?: Date;
};
declare type State = {
    hours: number;
    hoursShuffle: boolean;
    days: number;
    daysShuffle: boolean;
    minutes: number;
    minutesShuffle: boolean;
    seconds: number;
    secondsShuffle: boolean;
    haveStylesLoaded: boolean;
};
export declare class CountdownFlipClock extends React.Component<FlipClockProps, State> {
    constructor(props: FlipClockProps);
    timerID: NodeJS.Timer;
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateTime(): void;
    render(): React.JSX.Element | null;
}
export {};

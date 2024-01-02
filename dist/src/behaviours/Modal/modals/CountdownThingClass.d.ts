import React from 'react';
declare type FlipClockProps = {
    targetDate: Date;
    startDate?: Date;
};
export declare class FlipClock2 extends React.Component<FlipClockProps> {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateTime(): void;
    render(): React.JSX.Element | null;
}
export {};

import React from 'react';
import { useBrandColors } from '../../hooks/useBrandConfig';
export declare type FlipClockProps = {
    targetDate: Date;
    startDate?: Date;
};
declare type Props = FlipClockProps;
export declare type ConfigHOCProps = {
    colorConfig: ReturnType<typeof useBrandColors>;
};
declare function CountdownFlipClock(props: Props): React.JSX.Element;
export default CountdownFlipClock;

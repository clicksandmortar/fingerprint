import React from 'react';
import { Conversion, IncompleteTrigger, Trigger } from '../client/types';
export declare const validateSignals: (signals: Conversion['signals']) => boolean;
declare const useIncompleteTriggers: () => {
    incompleteTriggers: IncompleteTrigger[];
    setIncompleteTriggers: React.Dispatch<React.SetStateAction<IncompleteTrigger[]>>;
    visibleTriggers: Trigger[];
};
export default useIncompleteTriggers;

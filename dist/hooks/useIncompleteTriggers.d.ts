import React from 'react';
import { IncompleteTrigger, Trigger } from '../client/types';
declare const useIncompleteTriggers: () => {
    incompleteTriggers: IncompleteTrigger[];
    setIncompleteTriggers: React.Dispatch<React.SetStateAction<IncompleteTrigger[]>>;
    visibleTriggers: Trigger[];
};
export default useIncompleteTriggers;

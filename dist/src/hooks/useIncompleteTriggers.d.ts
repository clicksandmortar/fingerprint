import React from 'react';
import { IncompleteTrigger, Trigger } from '../client/types';
declare const useIncompleteTriggers: () => {
    incompleteTriggers: IncompleteTrigger[];
    setIncompleteTriggers: React.Dispatch<React.SetStateAction<IncompleteTrigger[]>>;
    setVisibleTriggers: React.Dispatch<React.SetStateAction<Trigger[]>>;
    visibleTriggers: Trigger[];
};
export default useIncompleteTriggers;

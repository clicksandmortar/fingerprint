import React from 'react';
import { IncompleteTrigger, Trigger } from '../client/types';
/**
 * Some triggers rely on Frontend signals (like visibility of an element) to determine whether they should be invoked or not.
 * This hook drives the logic for those triggers inside (currently) the Collector.
 */
declare const useIncompleteTriggers: () => {
    incompleteTriggers: IncompleteTrigger[];
    setIncompleteTriggers: React.Dispatch<React.SetStateAction<IncompleteTrigger[]>>;
    visibleTriggers: Trigger[];
};
export default useIncompleteTriggers;

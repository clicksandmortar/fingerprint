import { IncompleteTrigger, Trigger } from '../client/types';
declare const useIncompleteTriggers: () => {
    incompleteTriggers: IncompleteTrigger[];
    setIncompleteTriggers: (triggers: IncompleteTrigger[]) => void;
    visibleTriggers: Trigger[];
};
export default useIncompleteTriggers;

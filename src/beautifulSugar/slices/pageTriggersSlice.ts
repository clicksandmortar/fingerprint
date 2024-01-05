import uniqueBy from 'lodash.uniqby';
import { StateCreator } from 'zustand';
import { Trigger } from '../../client/types';
import { DifiStore } from '../store';
import { Get, Set } from '../types';

export function getCombinedTriggersFromStore(store: DifiStore) {
  return [...store.pageTriggers, ...store.visibleTriggersIssuedByIncomplete] || [];
}

export type PageTriggersSlice = {
  pageTriggers: Trigger[];
  displayedTriggersIds: Trigger['id'][];
  addDisplayedTrigger: (invokableTrigger: Trigger) => void;
  setDisplayedTriggers: (triggers: Trigger['id'][]) => void;
  setPageTriggers: (triggers: Trigger[]) => void;
  removePageTrigger: (id: Trigger['id']) => void;
  removeActiveTrigger: (id: Trigger['id']) => void;
  setDisplayedTriggerByInvocation: (
    invocation: Trigger['invocation'],
    shouldAllowMultipleSimultaneous?: boolean,
  ) => void;
  getIsBehaviourVisible: (type: Trigger['behaviour']) => boolean;
  setActiveTrigger: (trigger: Trigger) => void;
  // getCombinedTriggers: () => Trigger[];
};

export const createPagetriggersSlice: StateCreator<DifiStore, [], [], PageTriggersSlice> = (set: Set, get: Get) => ({
  pageTriggers: [],
  displayedTriggersIds: [],
  setDisplayedTriggers: (triggers: Trigger['id'][]) => {
    set(() => ({
      displayedTriggersIds: triggers,
    }));
  },
  addDisplayedTrigger: (invokableTrigger: Trigger) => {
    set((prev: DifiStore) => {
      if (prev.displayedTriggersIds.includes(invokableTrigger.id)) return prev;

      return {
        displayedTriggersIds: [...prev.displayedTriggersIds, invokableTrigger.id],
      };
    });
  },
  setPageTriggers: (triggers: Trigger[]) => {
    const displayedTriggers = get().displayedTriggersIds;

    set((prev: PageTriggersSlice) => {
      const nonDismissed = prev.pageTriggers.filter((tr) => displayedTriggers.includes(tr.id));
      // no pageTriggers = no triggers, rather than missing key.
      // serverside omition. Means we set pagetriggers to nothing.
      return {
        pageTriggers: uniqueBy<Trigger>([...(triggers || []), ...nonDismissed], 'id'),
      };
    });
  },
  removePageTrigger: (id: Trigger['id']) => {
    set((prev: PageTriggersSlice) => ({
      pageTriggers: prev.pageTriggers.filter((trigger) => trigger.id !== id),
    }));
  },
  removeActiveTrigger: (id: Trigger['id']) => {
    const {
      displayedTriggersIds,
      setDisplayedTriggers,
      incompleteTriggers,
      setIncompleteTriggers,
      visibleTriggersIssuedByIncomplete,
      setVisibleTriggersIssuedByIncomplete,
      removePageTrigger,
      logging: { log },
    } = get();

    log(`CollectorProvider: removing id:${id} from displayedTriggersIds`);

    const filteredTriggers = displayedTriggersIds.filter((triggerId: Trigger['id']) => triggerId !== id);
    setDisplayedTriggers(filteredTriggers);

    const filteredIncompleteTriggers = incompleteTriggers.filter((trigger) => trigger.id !== id);
    setIncompleteTriggers(filteredIncompleteTriggers);

    const filteredVisibleIncompleteTriggers = visibleTriggersIssuedByIncomplete.filter((trigger) => trigger.id !== id);

    setVisibleTriggersIssuedByIncomplete(filteredVisibleIncompleteTriggers);

    removePageTrigger(id);
  },
  setDisplayedTriggerByInvocation: (invocation: Trigger['invocation'], shouldAllowMultipleSimultaneous = false) => {
    const {
      addDisplayedTrigger,
      getIsBehaviourVisible,
      logging: { log },
    } = get();

    const combinedTriggers = getCombinedTriggersFromStore(get());
    const invokableTriggers = combinedTriggers.filter((trigger) => trigger.invocation === invocation);

    invokableTriggers.forEach((invokableTrigger) => {
      if (!invokableTrigger) {
        log('CollectorProvider: Trigger not invokable ', invokableTrigger);
        return;
      }

      if (invokableTrigger.behaviour === 'BEHAVIOUR_BANNER') {
        // @TODO: special case for banners. we should probably defione this in the handler
        log('Banners can be stacked up, setting as visible.', invokableTrigger);
        addDisplayedTrigger(invokableTrigger);
        return;
      }

      if (!shouldAllowMultipleSimultaneous && getIsBehaviourVisible(invokableTrigger.behaviour)) {
        log('CollectorProvider: Behaviour already visible, not showing trigger', invokableTrigger);
        return;
      }

      log('CollectorProvider: Triggering behaviour', invokableTrigger);
      // if the trigger is already in the list, don't add it again
      addDisplayedTrigger(invokableTrigger);
    });
  },

  getIsBehaviourVisible: (type: Trigger['behaviour']) => {
    const { displayedTriggersIds } = get();

    if (displayedTriggersIds.length === 0) return false;

    if (
      displayedTriggersIds.find(
        (triggerId: Trigger['id']) => getCombinedTriggersFromStore(get()).find((trigger) => trigger.id === triggerId)?.behaviour === type,
      )
    ) {
      return true;
    }

    return false;
  },
  setActiveTrigger: (trigger: Trigger) => {
    const {
      setPageTriggers,
      setDisplayedTriggerByInvocation,
      logging: { log },
    } = get();
    log('CollectorProvider: manually setting trigger', trigger);
    setPageTriggers([trigger]);
    setDisplayedTriggerByInvocation(trigger.invocation);
  },
});

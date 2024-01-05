import React from 'react';
import { useCombinedTriggers, useEntireStore } from '../beautifulSugar/store';

function Activation() {
  const {
    displayedTriggersIds,
    handlers,
    getHandlerForTrigger,

    getIsBehaviourVisible,
    logging: { log, error },
  } = useEntireStore();

  const combinedTriggers = useCombinedTriggers();

  if (!displayedTriggersIds) return null;

  const activeTriggers = combinedTriggers.filter((trigger) => displayedTriggersIds.includes(trigger.id));

  if (!activeTriggers) {
    error('Collector - TriggerComponent: No trigger found for displayedTriggersIds', displayedTriggersIds);
    return null;
  }

  log('Collector - TriggerComponent: available handlers include: ', handlers);
  log('Collector - TriggerComponent: activeTriggers to match are: ', activeTriggers);

  log('Collector - TriggerComponent: attempting to show trigger', activeTriggers);

  const visibleComponents = activeTriggers.map((trigger) => {
    const handler = getHandlerForTrigger(trigger);

    if (!handler) {
      log('Collector - TriggerComponent: No handler found for trigger', trigger);
      return null;
    }
    if (!handler.invoke) {
      log('Collector - TriggerComponent: No invoke method found for handler', handler);
      return null;
    }

    const isTriggerOfSameBehaviourAlreadyVisible = getIsBehaviourVisible(trigger.behaviour);

    if (
      // this check is only necessary because we run through multiple render cycles
      // when we place a component on the page
      !displayedTriggersIds.includes(trigger.id) &&
      // ---
      isTriggerOfSameBehaviourAlreadyVisible &&
      !handler.multipleOfSameBehaviourSupported
    ) {
      log(
        `Collector - TriggerComponent: Behaviour ${trigger.behaviour} (triggerId: ${trigger.id}) is already visible and does NOT support multiple triggers. Not showing.`,
        trigger.id,
      );
      return null;
    }

    const potentialComponent = handler.invoke?.(trigger);

    if (potentialComponent && React.isValidElement(potentialComponent)) {
      log('Collector - TriggerComponent: Potential component for trigger is valid. Mounting');
      return potentialComponent;
    }

    log('Collector: Potential component for trigger invalid. Running as regular func.');

    return null;
  });

  // eslint-disable-next-line react/jsx-fragments
  return <React.Fragment>{visibleComponents}</React.Fragment>;
}

export default React.memo(Activation);

import { useInitSession } from '../hooks/init/useInitSession';
import { useTrackingInit } from '../hooks/init/useInitTracking';
import { useInitVisitor } from '../hooks/init/useInitVisitor';
import { useCollinsBookingComplete } from '../hooks/mab/useCollinsBookingComplete';
import useButtonCollector from '../hooks/useButtonCollector';
import { useCollector } from '../hooks/useCollector';
import useConversions from '../hooks/useConversions';
import useFormCollector from '../hooks/useFormCollector';
import useImagePreload from '../hooks/useImagePreload';
import useIncompleteTriggers from '../hooks/useIncompleteTriggers';
import useIntently from '../hooks/useIntently';
import useWatchers from '../hooks/useWatchers';

// Keeping as a component just because it makes the code abit cleaner.
// Can just be a regular hook for all intents and purposes.
function Runners() {
  useTrackingInit();
  useInitVisitor();
  useInitSession();
  useIncompleteTriggers();
  useFormCollector();
  useButtonCollector();
  useIntently();
  useWatchers();
  useConversions();
  useCollinsBookingComplete();
  useCollector();

  // Note: this currently blocks triggers from appearing until all images have loaded.
  // This can in theory mean that a user misses a trigger because of a slow connection, but should be
  // a super rare case.
  useImagePreload();

  return null;
}

export default Runners;

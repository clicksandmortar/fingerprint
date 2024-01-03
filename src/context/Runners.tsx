import { useInitSession } from "../hooks/init/useInitSession";
import { useTrackingInit } from "../hooks/init/useInitTracking";
import { useInitVisitor } from "../hooks/init/useInitVisitor";
import { useCollinsBookingComplete } from "../hooks/mab/useCollinsBookingComplete";
import useButtonCollector from "../hooks/useButtonCollector";
import { useCollector } from "../hooks/useCollector";
import useConversions from "../hooks/useConversions";
import useFormCollector from "../hooks/useFormCollector";
import useIncompleteTriggers from "../hooks/useIncompleteTriggers";
import useIntently from "../hooks/useIntently";
import useWatchers from "../hooks/useWatchers";

// Keeping as a component just because it makes the code abit cleaner.
// Can just be a regular hook for all intents and purposes.
const Runners = () => {
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

  return null;
};

export default Runners;

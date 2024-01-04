import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useEntireStore } from '../../beautifulSugar/store';
import { useDismissMutation } from '../../hooks/api/useDismissMutation';
import { useSeen } from '../../hooks/api/useSeenMutation';
import { useTracking } from '../../hooks/useTracking';
import { BannerTrigger } from './Banner.types';
import HorizontalBanner from './Components/HorizontalBanner';
import SideBanner from './Components/SideBanner';
import { Position, resetPad } from './utils';

/**
 * Banner with text and a button if its horizontal, or clickable text if its vertical
 * Renders on the edge of the screen and follows the user as they scroll until they dismiss it.
 */
function Banner({ trigger }: { trigger: BannerTrigger }) {
  const { removeActiveTrigger } = useEntireStore();
  const { trackEvent } = useTracking();
  const [open, setOpen] = useState(true);
  const { dismissTrigger } = useDismissMutation();

  useSeen({ trigger, skip: !open });

  if (!open) return null;
  /** Runs when user does what we intend them to do */
  const handleClickCallToAction = (e: any) => {
    e.preventDefault();
    trackEvent('user_clicked_button', trigger);
    if (trigger?.data?.buttonURL) {
      window.open(trigger?.data?.buttonURL, '_blank');
    }
    // if they navigated to the other page, makes sense to hide it
    setOpen(false);
    resetPad();
  };

  /** Run when the banner is dismissed */
  const handleClose = (e?: any) => {
    e?.stopPropagation();
    trackEvent('user_closed_trigger', trigger);
    removeActiveTrigger(trigger.id);
    setOpen(false);
    dismissTrigger({
      triggerId: trigger.id,
    });
    // if applicable:
    resetPad();
  };

  const props = {
    handleClose,
    handleAction: handleClickCallToAction,
    trigger,
  };

  const position = trigger.data?.position as Position;

  if (position === 'left' || position === 'right') return <SideBanner {...props} />;

  return <HorizontalBanner {...props} />;
}

export const TriggerBanner = ({ trigger }: { trigger: BannerTrigger }) => ReactDOM.createPortal(<Banner trigger={trigger} />, document.body);

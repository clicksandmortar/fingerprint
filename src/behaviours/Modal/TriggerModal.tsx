import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useEntireStore } from '../../beautifulSugar/store';
import { Trigger } from '../../client/types';
import { useCollectorMutation } from '../../hooks/api/useCollectorMutation';
import { useTracking } from '../../hooks/useTracking';
import { HandleCloseOptions } from './Modal.types';
import StandardModal from './modals/StandardModal';

type Props = {
  trigger: Trigger
}

function Modal({ trigger }: Props) {
  const { removeActiveTrigger } = useEntireStore();
  const { trackEvent } = useTracking();
  const [open, setOpen] = useState(true);
  const [invocationTimeStamp, setInvocationTimeStamp] = useState<null | string>(
    null,
  );

  const { mutate: collect } = useCollectorMutation();

  useEffect(() => {
    if (!!invocationTimeStamp) return;

    const tId = setTimeout(() => {
      if (!invocationTimeStamp) {
        setInvocationTimeStamp(new Date().toISOString());
      }
    }, 500);

    return () => {
      clearTimeout(tId);
    };
  }, [invocationTimeStamp]);

  if (!open) {
    return null;
  }

  const handleCloseModal = (options?: HandleCloseOptions) => {
    // collect({
    //   exit: {
    //     variantID: trigger.id,
    //     shownAt: invocationTimeStamp || ''
    //   }
    // })
    removeActiveTrigger(trigger.id);
    setOpen(false);

    if (options?.skipTrackingEvent) return;

    trackEvent('user_closed_trigger', trigger);
  };

  const handleClickCallToAction = (e: any) => {
    e.preventDefault();
    collect({
      cta: {
        variantID: trigger.id,
        shownAt: invocationTimeStamp || new Date().toISOString(),
      },
    });
    trackEvent('user_clicked_button', trigger);
    trigger?.data?.buttonURL && window.open(trigger?.data?.buttonURL, '_self');
  };

  const modalProps = {
    trigger,
    handleClickCallToAction,
    handleCloseModal,
  };

  return <StandardModal {...modalProps} />;
}

export const TriggerModal = ({ trigger }: Props) => ReactDOM.createPortal(<Modal trigger={trigger} />, document.body);

import React, { useRef } from 'react';
import CloseButton from '../../../components/CloseButton';
import { useBannerStyles } from '../Banner.styles';
import { BannerProps } from '../Banner.types';
import {
  getCanBeDismissed,
  getIsBannerFullyClickable,
  useBannerContainerStyles,
} from '../utils';
import BannerIcon from './BannerIcon';

function SideBanner({ handleAction, handleClose, trigger }: BannerProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const isFullyClickable = getIsBannerFullyClickable(trigger);
  const shouldRenderIcon = !!trigger.data?.buttonIcon;
  const canBeDismissed = getCanBeDismissed();
  const styles = useBannerStyles();

  const containerStyles = useBannerContainerStyles({
    element: {
      width: container.current?.clientWidth || 0,
      height: container.current?.clientHeight || 0,
    },
    trigger,
  });

  return (
    <div
      ref={container}
      style={containerStyles}
      data-testid={`cnm-side-banner-${trigger.id}`}
    >
      <div
        onClick={isFullyClickable ? handleAction : undefined}
        style={styles.contentContainer}
      >
        {shouldRenderIcon && (
          <div style={styles.iconContainer}>
            <BannerIcon iconName={trigger.data?.buttonIcon} />
          </div>
        )}

        <span style={styles.text}>{trigger.data?.buttonText}</span>
      </div>
      {canBeDismissed && (
        <CloseButton onClick={handleClose} style={styles.closeButton} />
      )}
    </div>
  );
}

export default SideBanner;

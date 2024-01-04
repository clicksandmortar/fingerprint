import React from 'react';
import { Icon, IconProps } from '../../../components/Icon';
import { useBrandColors } from '../../../hooks/useBrandConfig';
import { useLogging } from '../../../hooks/useLogging';

type Props = {
  iconName?: Icon
  IconProps?: IconProps
}

function BannerIcon({ iconName, IconProps }: Props) {
  const { error } = useLogging();
  const { textPrimary } = useBrandColors();
  // This breks typical component context rules, but keeping here for now for cleanliness
  if (!iconName) {
    error('BannerIcon: iconName not provided');
    return null;
  }

  return (
    <Icon
      icon={iconName}
      height={16}
      width={16}
      fill={textPrimary}
      {...IconProps}
    />
  );
}

export default BannerIcon;

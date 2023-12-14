import React from 'react'
import { Icon, IconProps } from '../../../components/Icon'
import { useLogging } from '../../../context/LoggingContext'
import { useBrandColors } from '../../../hooks/useBrandConfig'

type Props = {
  iconName?: Icon
  IconProps?: IconProps
}

const BannerIcon = ({ iconName, IconProps }: Props) => {
  const { error } = useLogging()
  const { textPrimary } = useBrandColors()
  // This breks typical component context rules, but keeping here for now for cleanliness
  if (!iconName) {
    error('BannerIcon: iconName not provided')
    return null
  }

  return (
    <Icon
      icon={iconName}
      height={16}
      width={'auto'}
      fill={textPrimary}
      {...IconProps}
    />
  )
}

export default BannerIcon

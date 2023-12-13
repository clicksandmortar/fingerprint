import React from 'react'
import { Icon, IconProps } from '../../../components/Icon/Icon'
import { IconName } from '../../../components/Icon/Icon.types'
import { useLogging } from '../../../context/LoggingContext'

type Props = {
  iconName?: string
  IconProps?: IconProps
}

const BannerIcon = ({ iconName, IconProps }: Props) => {
  const { error } = useLogging()

  // This breks typical component context rules, but keeping here for now for cleanliness
  if (!iconName) {
    error('BannerIcon: iconName not provided')
    return null
  }

  return <Icon icon={iconName as IconName} size='20' {...IconProps} />
}

export default BannerIcon

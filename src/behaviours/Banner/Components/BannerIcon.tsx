import React from 'react'
import { IconProps } from '../../../components/Icon/Icon'
import IconFA from '../../../components/Icon/IconFA'
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

  return <IconFA icon={iconName} {...IconProps} />
}

export default BannerIcon

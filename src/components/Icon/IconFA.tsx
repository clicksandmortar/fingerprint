import * as icons from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
import React from 'react'

const IconFA = (props: { icon: string }): JSX.Element | null => {
  const iconName = props.icon as keyof typeof icons

  const Component = FontAwesomeIcon({
    icon: iconName as FontAwesomeIconProps['icon'],
    size: '2x'
  })

  if (!Component) return null
  if (!React.isValidElement(Component)) return null

  return Component
}
export default IconFA

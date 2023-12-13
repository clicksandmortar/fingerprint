import loadable from '@loadable/component'
import React from 'react'
import { IconBaseProps } from 'react-icons/lib'
import { IconName } from './Icon.types'
import IconFA from './IconFA'

export type IconProps = {
  icon: IconName
} & IconBaseProps

// Sadly, doing a {...allIcons}[name] results in very bad performance, so here's a solution that is not testable.

// Modified solution from https://github.com/react-icons/react-icons/issues/594#issuecomment-1236237124
// Dynamically imports only the junk we need
export function IconEl({ icon, ...props }: IconProps): JSX.Element {
  const lib = icon
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(' ')[0]
    .toLocaleLowerCase()

  const ElementIcon = loadable(() => import(`react-icons/${lib}/index.js`), {
    resolveComponent: (el: JSX.Element) =>
      // follow up comment experienced issues with some icons, so we use the default export if needbe
      el[icon] != null ? el[icon] : el[Object.keys(el['default'])[0]]
  })

  return <ElementIcon {...props} />
}

// @NOTE: memo is necessary here to avoid flashing during re-renders
// export const Icon = React.memo(IconEl)
export const Icon = IconFA

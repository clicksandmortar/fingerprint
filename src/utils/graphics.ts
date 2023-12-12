import * as icons from '@fortawesome/free-solid-svg-icons'

export type Icon = keyof typeof icons

export function getIcon(key: Icon) {
  if (!(key in icons)) throw new Error(`Icon ${key} not found`)

  return icons[key]
}

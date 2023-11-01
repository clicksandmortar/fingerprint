import transcend from 'lodash/get'

export type NestedKeyOf<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T]: NestedKeyOf<T[K]>
    }
  : keyof T

const defualtFormatString = (val: string): string => val

export const useGetInterpolate = () => {
  const interpolate = (
    text: string,
    structure: Record<string, unknown>,
    formatString = defualtFormatString
  ) => {
    const replacedText = text.replace(/\{\{\.([\w.]+)\}\}/g, (match, keys) => {
      let value = transcend(structure, keys)

      if (formatString) value = formatString(value as string)

      return value !== undefined ? value : match
    })

    return replacedText
  }

  return interpolate
}

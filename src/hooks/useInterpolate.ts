import transcend from 'lodash.get'

const defualtFormatString = (val: string): string => val

export const getInterpolate = (structure: Record<string, unknown>) => {
  const interpolate = (text: string, formatString = defualtFormatString) => {
    const replacedText = text.replace(
      /\{\{\s*\.?([\w]+)\s*\}\}/g,
      (match, keys) => {
        let value = transcend(structure, keys) as string

        if (formatString) value = formatString(value as string)

        return value !== undefined ? value : match
      }
    )

    return replacedText
  }

  return interpolate
}

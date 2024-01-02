import transcend from 'lodash.get'

const defualtFormatString = (val: string): string => val

export const getInterpolate = (
  structure: Record<string, unknown>,
  hideMissingValues = true
) => {
  const interpolate = (
    text: string,
    formatString = defualtFormatString
  ): string | null => {
    // TOOD: think if we should make configurable, whether to hide the entire string or not when its missing values
    // let isInterpolationMalformed = false

    const replacedText = text.replace(
      // /\{\{\s*\.?([\w]+)\s*\}\}/g,
      /\{\{\s*([\w.]+)\s*\}\}/g,
      (match, keys) => {
        let value = transcend(structure, keys) as string

        if (formatString) value = formatString(value as string)

        if (!!match && !value && hideMissingValues) return ''
        // isInterpolationMalformed = true

        return value !== undefined ? value : match
      }
    )

    // if (isInterpolationMalformed) return null

    return replacedText
  }
  return interpolate
}

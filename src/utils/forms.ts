const stringIsSubstringOf = (a: string, b: string) => {
  if (a === b) return true
  if (!a || !b) return false

  return a.toLowerCase().includes(b.toLowerCase())
}

const bannedTypes = ['password', 'submit']
const bannedFieldPartialNames = [
  'expir',
  'cvv',
  'cvc',
  'csv',
  'csc',
  'pin',
  'pass',
  'card'
]
export const getFormEntries = (form: HTMLFormElement) => {
  const elements = Array.from(form.elements).filter((el: HTMLFormElement) => {
    if (bannedTypes.includes(el?.type)) return false

    if (
      bannedFieldPartialNames.find((partialName) => {
        if (stringIsSubstringOf(el.name, partialName)) return true
        if (stringIsSubstringOf(el.id, partialName)) return true
        if (stringIsSubstringOf(el.placeholder, partialName)) return true
        return false
      })
    )
      return false

    return true
  })

  const data = elements.reduce((result: any, item: any) => {
    let fieldName = item.name

    if (!fieldName) {
      if (item.id) {
        console.error(
          'getFormEntries: form field has no name, falling back to id',
          {
            item
          }
        )
        fieldName = item.id
      } else if (item.placeholder) {
        console.error(
          'getFormEntries: form field has no name or id, falling back to placeholder',
          { item }
        )
        fieldName = item.placeholder
      } else {
        console.error(
          'getFormEntries: form field has no name, id or placeholder, fallback to type',
          { item }
        )
        fieldName = item.type
      }
    }
    result[fieldName] = item.value
    return result
  }, {})

  return data
}

import { test } from '@playwright/test'
import { getInterpolate } from '../getInterpolate'

const structute = {
  data: {
    header: 'This should work: {{ animal }}',
    subHeader: 'Missing text here {{ missingText }}',
    nestedText:
      'He banan {{ nested.text }}, he orang: {{nested.even.more.peach}}, but most importantly, he coco NUTT {{ coconut }}',
    animal: 'Capybara',
    countdownEndTime: 'Whatever',
    coconut: '🥥',
    nested: {
      even: { more: { peach: '🍑' } },
      text: '🍌'
    }
  }
}

test.describe('[unit] getInterpolate', async () => {
  const interpolate = getInterpolate(structute.data)

  test('interpolates a working string', async () => {
    test
      .expect(interpolate(structute.data.header))
      .toEqual('This should work: Capybara')
  })
  test('Missing values are removed from the text', async () => {
    test
      .expect(interpolate(structute.data.subHeader))
      .toEqual('Missing text here ')
  })
  test('Supports various levels of nesting', async () => {
    test
      .expect(interpolate(structute.data.nestedText))
      .toEqual(
        'He banan 🍌, he orang: 🍑, but most importantly, he coco NUTT 🥥'
      )
  })
})

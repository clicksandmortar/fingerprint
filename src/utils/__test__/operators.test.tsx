import { expect, test } from '@playwright/test'
import { getFuncByOperator } from '../../hooks/useConversions'

test.describe('getFuncByOperator', async () => {
  test('contains operator', async () => {
    const containsOperator = getFuncByOperator('contains', 'difi')

    const result1 = containsOperator('difibrilator')
    expect(result1).toEqual(true)
    const result2 = containsOperator('DIFI')
    expect(result2).toEqual(true)
    const result3 = containsOperator('defe the jeffe')
    expect(result3).toEqual(false)
  })
  test('equals operator', async () => {
    const equalsOperator = getFuncByOperator('eq', '/fingerprint')

    const result1 = equalsOperator('/fingerprint')
    expect(result1).toEqual(true)
    const result2 = equalsOperator('/FINGERPRINT')
    expect(result2).toEqual(true)
    const result3 = equalsOperator('/pringlefit')
    expect(result3).toEqual(false)
  })
  test('endsWith operator', async () => {
    const endsWithOperator = getFuncByOperator('ends_with', 'fingerprint')

    const result1 = endsWithOperator('/digital-fingerprint')
    expect(result1).toEqual(true)
    const result2 = endsWithOperator('THIS IS LA FINGERPRINT')
    expect(result2).toEqual(true)
    const result3 = endsWithOperator(
      'fingerprint is not the end of this string'
    )
    expect(result3).toEqual(false)
  })

  test('startsWith operator', async () => {
    const startsWithOperator = getFuncByOperator('starts_with', 'fingerprint')

    const result1 = startsWithOperator('fingerprinters')
    expect(result1).toEqual(true)
    const result2 = startsWithOperator('FINGERPRINT LALALA')
    expect(result2).toEqual(true)
    const result3 = startsWithOperator('/fingerprint')
    expect(result3).toEqual(false)
  })
})

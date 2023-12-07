import { expect, test } from '@playwright/test'

import { Browser, chromium } from 'playwright'
import { FESignal } from '../../client/types'
import { validateSignalChain } from '../signals'

let browser: Browser

import { setDom } from './testHelpers'

test.beforeAll(async () => {
  browser = await chromium.launch()
  setDom()
})

test.afterAll(async () => {
  // await browser.close()
})

test.describe('validateSignalChain', async () => {
  test('validateSignalChain - IsOnPath & IsOnDomain', async () => {
    const page = await browser.newPage()

    await page.goto('http://localhost:3000/test')
    await page.waitForURL('http://localhost:3000/test')

    const correctSignals: FESignal[] = [
      {
        op: 'IsOnPath',
        parameters: ['contains', 'test']
      },
      {
        op: 'IsOnDomain',
        parameters: ['localhost']
      }
    ]

    const incorrectSignals: FESignal[] = [
      {
        op: 'IsOnPath',
        parameters: ['contains', 'bababooey']
      },
      {
        op: 'IsOnDomain',
        parameters: ['localhost']
      }
    ]

    const location = window.location
    expect(location.href).toEqual('http://localhost:3000/test')

    const areCorrectSignalsValid = validateSignalChain(correctSignals)
    expect(areCorrectSignalsValid).toEqual(true)

    const areIncorrectSignalsValid = validateSignalChain(incorrectSignals)
    expect(areIncorrectSignalsValid).toEqual(false)
  })

  test('validateSignalChain - CanSeeElementOnPage', async () => {
    const page = await browser.newPage()

    await page.goto('http://localhost:3000/test', { waitUntil: 'networkidle' })
    await page.pause()

    const signal: FESignal[] = [
      {
        op: 'CanSeeElementOnPage',
        parameters: ['body', 'contains', '/test']
      }
    ]

    const correct1 = validateSignalChain(signal)
    expect(correct1).toEqual(true)

    const incorrectSignalNoElement: FESignal[] = [
      {
        op: 'CanSeeElementOnPage',
        parameters: [
          '#this_id_is_so_unlikely_to_exist_i_am_awkward_banana',
          'contains',
          ''
        ]
      }
    ]
    const incorrectSignalWrongPath: FESignal[] = [
      {
        op: 'CanSeeElementOnPage',
        parameters: ['body', 'eq', '/whateverthehell']
      }
    ]

    const incorrect1 = validateSignalChain(incorrectSignalNoElement)
    expect(incorrect1).toEqual(false)

    const incorrect2 = validateSignalChain(incorrectSignalWrongPath)
    expect(incorrect2).toEqual(false)
  })
})

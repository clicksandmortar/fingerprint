// @ts-check
import { expect, test } from '@playwright/test'
import { FESignal } from '../../client/types'

import { Browser, chromium } from 'playwright'
import { validateSignalChain } from '../signals'

let browser: Browser
let window: Window & typeof globalThis

test.beforeAll(async () => {
  browser = await chromium.launch()
})

test.afterAll(async () => {
  await browser.close()
})

test.describe('validateSignalChain', async () => {
  test('validateSignalChain - example', async () => {
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/test')
    await page.waitForURL('http://localhost:3000/test')

    page.evaluate(() => {
      console.log(window)
    })
    const signals: FESignal[] = [
      {
        // will have more later
        op: 'IsOnPath',
        parameters: ['contains', 'test']
      }
    ]
    const areSignalsValid = validateSignalChain(signals)
    expect(areSignalsValid).toEqual(true)
  })
  test('test title', ({}) => {
    expect(1 + 1).toEqual(2)
  })
})

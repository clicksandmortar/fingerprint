import { test } from '@playwright/test'

import { Browser, webkit } from 'playwright'
import { prepPage } from '../../utils/__dev__/helpers'

let browser: Browser

test.beforeAll(async () => {
  browser = await webkit.launch()
})

test.describe('[behaviour] Difi script', async () => {
  test('is operational', async () => {
    const page = await prepPage(browser)

    const pageHasDifi = await page.content().then((content) => {
      return content.includes('fingerprint.js')
    })

    test.expect(pageHasDifi).toEqual(true)

    await page.waitForTimeout(4000)

    const modalElement = await page.evaluate(async () => {
      const modal = document.querySelector('[class$="-modal"]')
      return modal
    })

    test.expect(modalElement).toBeTruthy()
  })
  // Currently only testing that a modal is mounted.

  // TOOD: add tests for:
  // 1. Mobile only signals
  // 2. Desktop only signals
  // 3. Banners
  //
})

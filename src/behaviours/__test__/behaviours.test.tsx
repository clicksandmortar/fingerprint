import { test } from '@playwright/test'

import { Browser, chromium } from 'playwright'
import { prepPage } from '../../utils/__test__/testHelpers'

let browser: Browser

test.beforeAll(async () => {
  browser = await chromium.launch()
})

test.describe('Difi script', async () => {
  test('is operational', async () => {
    const page = await prepPage(browser)

    test.step('go to a page with difi', async () => {
      const pageHasDifi = await page.content().then((content) => {
        return content.includes('fingerprint.js')
      })

      test.expect(pageHasDifi).toEqual(true)
    })

    test.step('a modal is mounted on load', async () => {
      await page.waitForTimeout(4000)

      const modalElement = await page.evaluate(async () => {
        const modal = document.querySelector('[class$="-modal"]')
        return modal
      })

      test.expect(modalElement).toBeTruthy()
    })
  })
  // Currently only testing that a modal is mounted.

  // TOOD: add tests for:
  // 1. Mobile only signals
  // 2. Desktop only signals
  // 3. Banners
  //
})

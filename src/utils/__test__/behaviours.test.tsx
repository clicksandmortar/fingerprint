import { test } from '@playwright/test'
import { Browser, webkit } from 'playwright'
import { testBaseURL } from '../../../playwright.config'
import { CollectorVisitorResponse } from '../../client/types'
import { getPage, prepPage } from '../../utils/__dev__/helpers'
import { fakeCollectorResp } from '../__dev__/response.fake'

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
  test('banners render', async () => {
    const page = await getPage(browser)

    await page.route('*/**/collector/**', async (route) => {
      const json: CollectorVisitorResponse = {
        ...fakeCollectorResp,
        pageTriggers: []
      }

      await route.fulfill({ json })
    })
    await page.goto(testBaseURL, {
      waitUntil: 'networkidle',
      timeout: 60000
    })

    // await page.waitForTimeout(4000)

    const banners = await page.evaluate(async () => {
      const elementsWTestId = document.querySelectorAll('[data-testid]')

      const _banners = Array.from(elementsWTestId).filter((element) => {
        return element.getAttribute('data-testid')?.includes('cnm-banner')
      })

      return _banners
    })

    test.expect(banners.length).toBe(3)
  })

  // Currently only testing that a modal is mounted.

  // TOOD: add tests for:
  // 1. Mobile only signals
  // 2. Desktop only signals
  // 3. Banners
  //
})
